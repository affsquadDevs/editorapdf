import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface PageNumberOptions {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  format?: string; // Format string, e.g., "{page} of {total}" or "Page {page}"
  startNumber?: number; // Starting page number
  fontSize?: number;
  pageRange?: string; // Pages to number (default: all)
}

/**
 * Add page numbers to PDF
 */
export async function addPageNumbers(
  file: File,
  options: PageNumberOptions = {}
): Promise<Uint8Array> {
  const {
    position = 'bottom-center',
    format = '{page}',
    startNumber = 1,
    fontSize = 12,
    pageRange,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToNumber: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToNumber = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToNumber = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  const font = await pdfDoc.embedFont('Helvetica');

  // Add page numbers
  for (let i = 0; i < pagesToNumber.length; i++) {
    const pageIndex = pagesToNumber[i];
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();
    
    const pageNumber = startNumber + i;
    const total = pagesToNumber.length;
    
    // Format page number text
    let pageText = format
      .replace(/{page}/g, String(pageNumber))
      .replace(/{total}/g, String(total));

    // Calculate position
    const textWidth = font.widthOfTextAtSize(pageText, fontSize);
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top-left':
        x = 50;
        y = height - 30;
        break;
      case 'top-center':
        x = (width - textWidth) / 2;
        y = height - 30;
        break;
      case 'top-right':
        x = width - textWidth - 50;
        y = height - 30;
        break;
      case 'bottom-left':
        x = 50;
        y = 30;
        break;
      case 'bottom-center':
        x = (width - textWidth) / 2;
        y = 30;
        break;
      case 'bottom-right':
        x = width - textWidth - 50;
        y = 30;
        break;
    }

    page.drawText(pageText, {
      x,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  return await pdfDoc.save();
}

/**
 * Download numbered PDF
 */
export function downloadNumberedPdf(pdfBytes: Uint8Array, filename: string): void {
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
