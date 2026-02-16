import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface BarcodeOptions {
  data: string; // Barcode data
  type?: 'CODE128' | 'EAN13' | 'CODE39' | 'ITF14';
  pageRange?: string;
  position?: { x: number; y: number };
  width?: number;
  height?: number;
  pageNumber?: number;
}

/**
 * Add barcode to PDF
 */
export async function addBarcode(
  file: File,
  options: BarcodeOptions
): Promise<Uint8Array> {
  const {
    data,
    type = 'CODE128',
    pageRange,
    position = { x: 0.5, y: 0.9 },
    width = 200,
    height = 50,
    pageNumber,
  } = options;

  if (!data) {
    throw new Error('Barcode data is required');
  }

  // Try to import jsbarcode
  let JsBarcode: any;
  try {
    const jsbarcodeModule = await import('jsbarcode');
    JsBarcode = jsbarcodeModule.default || jsbarcodeModule;
  } catch (err) {
    throw new Error('jsbarcode library is not installed. Please run: npm install jsbarcode');
  }

  // Create canvas for barcode
  const canvas = document.createElement('canvas');
  if (typeof JsBarcode === 'function') {
    JsBarcode(canvas, data, {
      format: type,
      width: 2,
      height: height,
      displayValue: true,
    });
  } else {
    throw new Error('Failed to initialize jsbarcode');
  }

  // Convert canvas to image bytes
  const barcodeDataUrl = canvas.toDataURL('image/png');
  const base64Data = barcodeDataUrl.split(',')[1];
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

  // Embed barcode image
  const barcodeImage = await pdfDoc.embedPng(imageBytes);

  // Add barcode to each page
  for (const pageIndex of pagesToModify) {
    const page = pdfDoc.getPage(pageIndex);
    const { width: pageWidth, height: pageHeight } = page.getSize();

    const x = position.x * pageWidth - width / 2;
    const y = pageHeight - (position.y * pageHeight) - height / 2;

    page.drawImage(barcodeImage, {
      x,
      y,
      width: width,
      height: height,
    });
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with barcode
 */
export function downloadBarcodePdf(pdfBytes: Uint8Array, filename: string): void {
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
