import { PDFDocument } from 'pdf-lib';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { parsePageRange } from './splitPdf';

export type BarcodeFormat =
  | 'CODE128'
  | 'CODE39'
  | 'EAN13'
  | 'UPC'
  | 'ITF14'
  | 'QR';

export interface BarcodeOptions {
  data: string;
  type?: BarcodeFormat;
  pageRange?: string;
  /** Normalized center: x,y in [0,1]; y=0 top, y=1 bottom. */
  position?: { x: number; y: number };
  /** Width and height in PDF points (72 pt = 1 inch). */
  width?: number;
  height?: number;
  pageNumber?: number;
}

const DIGITS_ONLY = /^\d+$/;

function validateData(data: string, format: BarcodeFormat): void {
  const t = data.trim();
  if (!t) throw new Error('Barcode data is required');
  switch (format) {
    case 'EAN13':
      if (!DIGITS_ONLY.test(t) || (t.length !== 12 && t.length !== 13)) {
        throw new Error('EAN-13 requires 12 or 13 digits');
      }
      break;
    case 'UPC':
      if (!DIGITS_ONLY.test(t) || (t.length !== 11 && t.length !== 12)) {
        throw new Error('UPC-A requires 11 or 12 digits');
      }
      break;
    case 'ITF14':
      if (!DIGITS_ONLY.test(t) || (t.length !== 13 && t.length !== 14)) {
        throw new Error('ITF-14 requires 13 or 14 digits');
      }
      break;
    default:
      break;
  }
}

/**
 * Renders barcode or QR to PNG bytes (browser canvas).
 * Used by addBarcode and the preview component.
 */
export async function renderBarcodeToPngBytes(
  data: string,
  format: BarcodeFormat,
  pixelBarHeight: number
): Promise<Uint8Array> {
  const trimmed = data.trim();
  if (!trimmed) {
    throw new Error('Barcode data is required');
  }
  validateData(trimmed, format);

  if (format === 'QR') {
    const dataUrl = await QRCode.toDataURL(trimmed, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: Math.min(512, Math.max(128, pixelBarHeight * 4)),
    });
    const base64Data = dataUrl.split(',')[1];
    return Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  }

  const canvas = document.createElement('canvas');
  const jsFormat =
    format === 'ITF14' ? 'ITF14' : format === 'UPC' ? 'UPC' : format;

  try {
    JsBarcode(canvas, trimmed, {
      format: jsFormat as string,
      width: 2,
      height: Math.max(40, Math.min(200, pixelBarHeight)),
      displayValue: true,
      margin: 10,
      background: '#ffffff',
      lineColor: '#000000',
    });
  } catch (e) {
    throw new Error(
      e instanceof Error ? e.message : 'Could not generate this barcode for the given data'
    );
  }

  const barcodeDataUrl = canvas.toDataURL('image/png');
  const base64Data = barcodeDataUrl.split(',')[1];
  return Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
}

/**
 * Add barcode (linear or QR) to PDF pages.
 */
export async function addBarcode(file: File, options: BarcodeOptions): Promise<Uint8Array> {
  const {
    data,
    type = 'CODE128',
    pageRange,
    position = { x: 0.5, y: 0.92 },
    width = 200,
    height = 56,
    pageNumber,
  } = options;

  validateData(data, type);

  const pixelBarHeight = Math.max(40, Math.min(200, Math.round(height * 1.5)));
  const imageBytes = await renderBarcodeToPngBytes(data, type, pixelBarHeight);

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  let pagesToModify: number[] = [];
  if (pageNumber) {
    pagesToModify = [pageNumber - 1];
  } else if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToModify = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToModify = parsePageRange(pageRange, totalPages);
  }

  const barcodeImage = await pdfDoc.embedPng(imageBytes);

  for (const pageIndex of pagesToModify) {
    const page = pdfDoc.getPage(pageIndex);
    const { width: pageWidth, height: pageHeight } = page.getSize();

    const x = position.x * pageWidth - width / 2;
    const y = pageHeight - position.y * pageHeight - height / 2;

    page.drawImage(barcodeImage, {
      x,
      y,
      width,
      height,
    });
  }

  return pdfDoc.save();
}

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
