import { PDFDocument } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface CropOptions {
  pageRange?: string;
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  customCrop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Crop PDF pages
 */
export async function cropPages(
  file: File,
  options: CropOptions = {}
): Promise<Uint8Array> {
  const {
    pageRange,
    margins,
    customCrop,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToCrop: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToCrop = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToCrop = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  // Apply cropping to each page
  for (const pageIndex of pagesToCrop) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    if (customCrop) {
      // Custom crop box
      page.setCropBox(
        customCrop.x,
        customCrop.y,
        customCrop.width,
        customCrop.height
      );
    } else if (margins) {
      // Crop using margins
      const top = margins.top || 0;
      const right = margins.right || 0;
      const bottom = margins.bottom || 0;
      const left = margins.left || 0;

      page.setCropBox(
        left,
        bottom,
        width - left - right,
        height - top - bottom
      );
    }
  }

  return await pdfDoc.save();
}

/**
 * Download cropped PDF
 */
export function downloadCroppedPdf(pdfBytes: Uint8Array, filename: string): void {
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
