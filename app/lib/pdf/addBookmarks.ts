import {
  PDFDocument,
  PDFDict,
  PDFName,
  PDFNumber,
  PDFString,
  PDFRef,
} from 'pdf-lib';

export interface Bookmark {
  title: string;
  pageNumber: number; // 1-based
  level?: number;
  children?: Bookmark[];
}

export interface BookmarkOptions {
  bookmarks: Bookmark[];
  /** If true (default), replace existing document outline. */
  replaceExisting?: boolean;
}

function sanitizeTitle(title: string): string {
  const t = title.replace(/\r\n/g, ' ').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '').trim();
  return t.length > 0 ? t.slice(0, 500) : 'Untitled';
}

function validateBookmarks(items: Bookmark[], totalPages: number): void {
  for (const bm of items) {
    if (bm.pageNumber < 1 || bm.pageNumber > totalPages) {
      throw new Error(
        `Invalid page number ${bm.pageNumber} for bookmark "${bm.title}"`,
      );
    }
    if (bm.children?.length) {
      validateBookmarks(bm.children, totalPages);
    }
  }
}

/**
 * Build outline tree: returns First/Last refs and total outline items in this subtree.
 */
function outlineSubtree(
  items: Bookmark[],
  parentRef: PDFRef,
  pdfDoc: PDFDocument,
): { first: PDFRef | null; last: PDFRef | null; totalItems: number } {
  const context = pdfDoc.context;
  let prevRef: PDFRef | null = null;
  let firstRef: PDFRef | null = null;
  let lastRef: PDFRef | null = null;
  let sumTotal = 0;

  for (const bm of items) {
    const page = pdfDoc.getPage(bm.pageNumber - 1);
    const dest = context.obj([page.ref, 'XYZ', null, null, null]);
    const dict = PDFDict.withContext(context);
    dict.set(PDFName.of('Title'), PDFString.of(sanitizeTitle(bm.title)));
    dict.set(PDFName.of('Parent'), parentRef);
    dict.set(PDFName.of('Dest'), dest);

    if (prevRef) {
      dict.set(PDFName.of('Prev'), prevRef);
    }
    const itemRef = context.register(dict);
    if (prevRef) {
      context.lookup(prevRef, PDFDict).set(PDFName.of('Next'), itemRef);
    }
    if (!firstRef) firstRef = itemRef;
    lastRef = itemRef;
    prevRef = itemRef;

    let childSubtreeTotal = 0;
    if (bm.children?.length) {
      const sub = outlineSubtree(bm.children, itemRef, pdfDoc);
      dict.set(PDFName.of('First'), sub.first!);
      dict.set(PDFName.of('Last'), sub.last!);
      dict.set(PDFName.of('Count'), PDFNumber.of(sub.totalItems));
      childSubtreeTotal = sub.totalItems;
    }
    sumTotal += 1 + childSubtreeTotal;
  }

  return { first: firstRef, last: lastRef, totalItems: sumTotal };
}

/**
 * Add or replace PDF bookmarks (document outline).
 */
export async function addBookmarks(
  file: File,
  options: BookmarkOptions,
): Promise<Uint8Array> {
  const { bookmarks, replaceExisting = true } = options;

  if (!bookmarks || bookmarks.length === 0) {
    throw new Error('At least one bookmark is required');
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  validateBookmarks(bookmarks, totalPages);

  const context = pdfDoc.context;

  if (replaceExisting) {
    pdfDoc.catalog.delete(PDFName.of('Outlines'));
  }

  const rootDict = PDFDict.withContext(context);
  rootDict.set(PDFName.of('Type'), PDFName.of('Outlines'));
  const rootRef = context.register(rootDict);

  const result = outlineSubtree(bookmarks, rootRef, pdfDoc);
  if (!result.first || !result.last) {
    throw new Error('Failed to create outline');
  }

  rootDict.set(PDFName.of('First'), result.first);
  rootDict.set(PDFName.of('Last'), result.last);
  rootDict.set(PDFName.of('Count'), PDFNumber.of(result.totalItems));

  pdfDoc.catalog.set(PDFName.of('Outlines'), rootRef);

  return pdfDoc.save();
}

export function downloadBookmarkedPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
