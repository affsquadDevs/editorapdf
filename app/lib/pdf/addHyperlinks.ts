import {
  PDFDocument,
  PDFDict,
  PDFName,
  PDFString,
  rgb,
  StandardFonts,
} from 'pdf-lib';

/** Top-left origin: x,y in [0,1]; y grows downward from top. w,h are fractions of page width/height. */
export interface HyperlinkRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Hyperlink {
  url: string;
  pageNumber: number;
  /** Optional visible label drawn inside the link rectangle */
  label?: string;
  rect: HyperlinkRect;
  fontSize?: number;
}

export interface HyperlinkOptions {
  hyperlinks: Hyperlink[];
}

const MIN_DIM = 0.02;

function clampRect(r: HyperlinkRect): HyperlinkRect {
  let { x, y, w, h } = r;
  w = Math.max(MIN_DIM, Math.min(1, w));
  h = Math.max(MIN_DIM, Math.min(1, h));
  x = Math.max(0, Math.min(1 - w, x));
  y = Math.max(0, Math.min(1 - h, y));
  return { x, y, w, h };
}

/** Ensure http(s):// or mailto: */
export function normalizeUrl(input: string): string {
  const s = input.trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s) || /^mailto:/i.test(s)) return s;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(s)) return `https://${s}`;
  return s;
}

function validateUrlForPdf(uri: string): void {
  if (!uri) throw new Error('URL is required for each link');
  if (!/^https?:\/\//i.test(uri) && !/^mailto:/i.test(uri)) {
    throw new Error(`Unsupported URL scheme: ${uri}. Use http(s) or mailto:.`);
  }
}

/**
 * PDF user space: origin bottom-left. Rect is [llx lly urx ury].
 * Input rect uses top-left origin (y from top), normalized.
 */
function normalizedRectToPdf(
  rect: HyperlinkRect,
  pageWidth: number,
  pageHeight: number,
): [number, number, number, number] {
  const { x, y, w, h } = clampRect(rect);
  const llx = x * pageWidth;
  const urx = (x + w) * pageWidth;
  const ury = pageHeight - y * pageHeight;
  const lly = pageHeight - (y + h) * pageHeight;
  return [llx, lly, urx, ury];
}

/**
 * Add clickable URI link annotations. Optionally draws label text inside each rectangle.
 */
export async function addHyperlinks(
  file: File,
  options: HyperlinkOptions,
): Promise<Uint8Array> {
  const { hyperlinks } = options;

  if (!hyperlinks || hyperlinks.length === 0) {
    throw new Error('At least one hyperlink is required');
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const link of hyperlinks) {
    const uri = normalizeUrl(link.url);
    validateUrlForPdf(uri);

    if (link.pageNumber < 1 || link.pageNumber > totalPages) {
      throw new Error(
        `Invalid page number ${link.pageNumber} for link "${uri}"`,
      );
    }

    const page = pdfDoc.getPage(link.pageNumber - 1);
    const { width, height } = page.getSize();
    const rect = clampRect(link.rect);
    const [llx, lly, urx, ury] = normalizedRectToPdf(rect, width, height);

    const context = pdfDoc.context;
    const annotDict = PDFDict.withContext(context);
    annotDict.set(PDFName.of('Type'), PDFName.of('Annot'));
    annotDict.set(PDFName.of('Subtype'), PDFName.of('Link'));
    annotDict.set(PDFName.of('Rect'), context.obj([llx, lly, urx, ury]));
    annotDict.set(PDFName.of('Border'), context.obj([0, 0, 0]));

    const actionDict = PDFDict.withContext(context);
    actionDict.set(PDFName.of('Type'), PDFName.of('Action'));
    actionDict.set(PDFName.of('S'), PDFName.of('URI'));
    actionDict.set(PDFName.of('URI'), PDFString.of(uri));
    annotDict.set(PDFName.of('A'), actionDict);

    const annotRef = context.register(annotDict);
    page.node.addAnnot(annotRef);

    const label = (link.label ?? '').trim();
    if (label) {
      const boxH = ury - lly;
      let fontSize = Math.min(
        48,
        Math.max(6, link.fontSize ?? Math.min(14, boxH * 0.55)),
      );
      fontSize = Math.min(fontSize, boxH * 0.65);
      const textY = Math.max(lly + 1, ury - fontSize * 0.88);
      page.drawText(label, {
        x: llx + 2,
        y: textY,
        size: fontSize,
        font,
        color: rgb(0, 0.2, 0.75),
        maxWidth: Math.max(10, urx - llx - 4),
      });
    }
  }

  return pdfDoc.save();
}

export function downloadHyperlinkedPdf(pdfBytes: Uint8Array, filename: string): void {
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
