import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import { parsePageRange } from './splitPdf';

export { MM_TO_PT } from './pdfUnits';

export interface QrCodeOptions {
  content: string; // QR code content
  pageRange?: string;
  /** Normalized center: x,y in [0,1]; y=0 top, y=1 bottom of page. */
  position?: { x: number; y: number };
  /** Square side length in PDF points (72 pt = 1 inch). */
  size?: number;
  pageNumber?: number; // Specific page (1-based)
}

/**
 * Add QR code to PDF
 */
export async function addQrCode(
  file: File,
  options: QrCodeOptions
): Promise<Uint8Array> {
  const {
    content,
    pageRange,
    position = { x: 0.9, y: 0.9 },
    size = 100,
    pageNumber,
  } = options;

  if (!content) {
    throw new Error('QR code content is required');
  }

  const qrPixelSize = Math.min(2048, Math.max(128, Math.round(size * 4)));

  const qrDataUrl = await QRCode.toDataURL(content, {
    width: qrPixelSize,
    margin: 1,
    errorCorrectionLevel: 'M',
  });

  // Convert data URL to image bytes
  const base64Data = qrDataUrl.split(',')[1];
  const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Determine pages to modify
  let pagesToModify: number[] = [];
  if (pageNumber) {
    pagesToModify = [pageNumber - 1];
  } else if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToModify = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToModify = parsePageRange(pageRange, totalPages);
  }

  // Embed QR code image
  const qrImage = await pdfDoc.embedPng(imageBytes);

  // Add QR code to each page
  for (const pageIndex of pagesToModify) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    const x = position.x * width - size / 2;
    const y = height - (position.y * height) - size / 2;

    page.drawImage(qrImage, {
      x,
      y,
      width: size,
      height: size,
    });
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with QR code
 */
export function downloadQrCodePdf(pdfBytes: Uint8Array, filename: string): void {
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
