import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface Hyperlink {
  text: string;
  url: string;
  pageNumber: number; // 1-based
  position?: { x: number; y: number }; // Normalized 0-1
  fontSize?: number;
}

export interface HyperlinkOptions {
  hyperlinks: Hyperlink[];
}

/**
 * Add hyperlinks to PDF
 * Note: pdf-lib has limited hyperlink support. This adds text that looks like links.
 */
export async function addHyperlinks(
  file: File,
  options: HyperlinkOptions
): Promise<Uint8Array> {
  const { hyperlinks } = options;

  if (!hyperlinks || hyperlinks.length === 0) {
    throw new Error('At least one hyperlink is required');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  const font = await pdfDoc.embedFont('Helvetica');

  // Add hyperlinks (as text annotations - true hyperlinks require PDF structure manipulation)
  for (const link of hyperlinks) {
    if (link.pageNumber < 1 || link.pageNumber > totalPages) {
      continue; // Skip invalid page numbers
    }

    const page = pdfDoc.getPage(link.pageNumber - 1);
    const { width, height } = page.getSize();

    const fontSize = link.fontSize || 12;
    const x = link.position?.x ? link.position.x * width : width * 0.1;
    const y = link.position?.y ? height - (link.position.y * height) : height * 0.9;

    // Draw link text (styled to look like a link)
    page.drawText(link.text || link.url, {
      x,
      y,
      size: fontSize,
      color: rgb(0, 0, 1), // Blue color
      // Note: True clickable hyperlinks require PDF annotation objects
      // which pdf-lib doesn't fully support
    });
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with hyperlinks
 */
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
