import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface StampOptions {
  text?: string;
  image?: File;
  pageRange?: string;
  position?: { x: number; y: number };
  size?: number;
  rotation?: number;
  color?: { r: number; g: number; b: number };
}

/**
 * Add stamp to PDF
 */
export async function addStamp(
  file: File,
  options: StampOptions = {}
): Promise<Uint8Array> {
  const {
    text,
    image,
    pageRange,
    position = { x: 0.5, y: 0.5 },
    size = 100,
    rotation = 0,
    color = { r: 1, g: 0, b: 0 }, // Red by default
  } = options;

  if (!text && !image) {
    throw new Error('Either text or image must be provided for stamp');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToStamp: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToStamp = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToStamp = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  // Load stamp image if provided
  let stampImage: any = null;
  if (image) {
    const imgArrayBuffer = await image.arrayBuffer();
    const imgBytes = new Uint8Array(imgArrayBuffer);
    if (image.type === 'image/png') {
      stampImage = await pdfDoc.embedPng(imgBytes);
    } else if (image.type === 'image/jpeg' || image.type === 'image/jpg') {
      stampImage = await pdfDoc.embedJpg(imgBytes);
    }
  }

  const font = await pdfDoc.embedFont('Helvetica-Bold');

  // Add stamp to each page
  for (const pageIndex of pagesToStamp) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    const x = position.x * width - size / 2;
    const y = height - (position.y * height) - size / 2;

    if (text) {
      // Text stamp
      page.drawText(text, {
        x,
        y,
        size: size * 0.6,
        color: rgb(color.r, color.g, color.b),
        rotate: degrees(rotation),
      });
    } else if (stampImage) {
      // Image stamp
      const imgDims = stampImage.scale(size / 100);
      page.drawImage(stampImage, {
        x,
        y,
        width: imgDims.width,
        height: imgDims.height,
        rotate: degrees(rotation),
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with stamp
 */
export function downloadStampedPdf(pdfBytes: Uint8Array, filename: string): void {
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
