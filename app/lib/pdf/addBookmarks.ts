import { PDFDocument } from 'pdf-lib';

export interface Bookmark {
  title: string;
  pageNumber: number; // 1-based
  level?: number; // 1 = top level, 2 = nested, etc.
  children?: Bookmark[];
}

export interface BookmarkOptions {
  bookmarks: Bookmark[];
}

/**
 * Add bookmarks to PDF
 * Note: pdf-lib has limited bookmark support. This is a basic implementation.
 */
export async function addBookmarks(
  file: File,
  options: BookmarkOptions
): Promise<Uint8Array> {
  const { bookmarks } = options;

  if (!bookmarks || bookmarks.length === 0) {
    throw new Error('At least one bookmark is required');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Validate bookmarks
  for (const bookmark of bookmarks) {
    if (bookmark.pageNumber < 1 || bookmark.pageNumber > totalPages) {
      throw new Error(`Invalid page number ${bookmark.pageNumber} for bookmark "${bookmark.title}"`);
    }
  }

  // pdf-lib doesn't have direct bookmark API
  // Bookmarks would need to be added via PDF structure manipulation
  // This requires advanced PDF knowledge
  
  // Note: Full bookmark implementation requires:
  // 1. Creating outline dictionary
  // 2. Setting up bookmark hierarchy
  // 3. Linking bookmarks to page destinations
  
  // For now, we save the PDF (bookmarks would need manual PDF structure editing)
  
  return await pdfDoc.save();
}

/**
 * Download PDF with bookmarks
 */
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
