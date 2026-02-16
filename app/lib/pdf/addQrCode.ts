import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface QrCodeOptions {
  content: string; // QR code content
  pageRange?: string;
  position?: { x: number; y: number }; // Normalized 0-1 coordinates
  size?: number; // Size in points
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

  // Try to import qrcode
  let QRCode: any;
  try {
    QRCode = await import('qrcode' as any);
  } catch (err) {
    throw new Error('qrcode library is not installed. Please run: npm install qrcode');
  }

  // Generate QR code as data URL
  const qrDataUrl = await QRCode.toDataURL(content, {
    width: size * 4, // Higher resolution for better quality
    margin: 1,
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
    pagesToModify = parsePageRange(pageRange, totalPages).map(p => p - 1);
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
