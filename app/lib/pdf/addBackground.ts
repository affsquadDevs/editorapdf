import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface BackgroundOptions {
  color?: { r: number; g: number; b: number }; // RGB color
  image?: File; // Background image
  pageRange?: string;
  opacity?: number;
}

/**
 * Add background to PDF pages
 */
export async function addBackground(
  file: File,
  options: BackgroundOptions = {}
): Promise<Uint8Array> {
  const {
    color,
    image,
    pageRange,
    opacity = 1,
  } = options;

  if (!color && !image) {
    throw new Error('Either color or image must be provided');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToModify: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToModify = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToModify = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  // Load background image if provided
  let bgImageEmbed: any = null;
  if (image) {
    const imgArrayBuffer = await image.arrayBuffer();
    const imgBytes = new Uint8Array(imgArrayBuffer);
    if (image.type === 'image/png') {
      bgImageEmbed = await pdfDoc.embedPng(imgBytes);
    } else if (image.type === 'image/jpeg' || image.type === 'image/jpg') {
      bgImageEmbed = await pdfDoc.embedJpg(imgBytes);
    }
  }

  // Apply background to each page
  for (const pageIndex of pagesToModify) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    if (color) {
      // Color background
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(color.r, color.g, color.b),
        opacity,
      });
    } else if (bgImageEmbed) {
      // Image background
      const imgDims = bgImageEmbed.scaleToFit(width, height);
      page.drawImage(bgImageEmbed, {
        x: 0,
        y: 0,
        width: imgDims.width,
        height: imgDims.height,
        opacity,
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with background
 */
export function downloadBackgroundPdf(pdfBytes: Uint8Array, filename: string): void {
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
