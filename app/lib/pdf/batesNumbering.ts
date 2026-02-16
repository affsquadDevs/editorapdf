import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface BatesOptions {
  prefix?: string;
  suffix?: string;
  startNumber?: number;
  digits?: number; // Number of digits (padding with zeros)
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  fontSize?: number;
  pageRange?: string;
}

/**
 * Add Bates numbering to PDF
 */
export async function batesNumbering(
  file: File,
  options: BatesOptions = {}
): Promise<Uint8Array> {
  const {
    prefix = '',
    suffix = '',
    startNumber = 1,
    digits = 6,
    position = 'bottom-right',
    fontSize = 10,
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

  // Add Bates numbers
  for (let i = 0; i < pagesToNumber.length; i++) {
    const pageIndex = pagesToNumber[i];
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    // Format number with padding
    const number = startNumber + i;
    const paddedNumber = String(number).padStart(digits, '0');
    const batesText = `${prefix}${paddedNumber}${suffix}`;

    // Calculate position
    const textWidth = font.widthOfTextAtSize(batesText, fontSize);
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top-left':
        x = 50;
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
      case 'bottom-right':
        x = width - textWidth - 50;
        y = 30;
        break;
    }

    page.drawText(batesText, {
      x,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with Bates numbering
 */
export function downloadBatesPdf(pdfBytes: Uint8Array, filename: string): void {
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
