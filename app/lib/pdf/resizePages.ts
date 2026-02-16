import { PDFDocument } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface ResizeOptions {
  pageSize?: 'A4' | 'Letter' | 'Legal' | 'A3' | 'custom';
  customSize?: { width: number; height: number };
  pageRange?: string;
  scaleContent?: boolean;
}

const PAGE_SIZES: { [key: string]: { width: number; height: number } } = {
  A4: { width: 595, height: 842 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
  A3: { width: 842, height: 1191 },
};

/**
 * Resize PDF pages
 */
export async function resizePages(
  file: File,
  options: ResizeOptions = {}
): Promise<Uint8Array> {
  const {
    pageSize = 'A4',
    customSize,
    pageRange,
    scaleContent = true,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Determine target size
  let targetWidth: number;
  let targetHeight: number;

  if (pageSize === 'custom' && customSize) {
    targetWidth = customSize.width;
    targetHeight = customSize.height;
  } else {
    const size = PAGE_SIZES[pageSize];
    if (!size) {
      throw new Error(`Invalid page size: ${pageSize}`);
    }
    targetWidth = size.width;
    targetHeight = size.height;
  }

  // Parse page range
  let pagesToResize: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToResize = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToResize = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  // Resize each page
  for (const pageIndex of pagesToResize) {
    const page = pdfDoc.getPage(pageIndex);
    const { width: currentWidth, height: currentHeight } = page.getSize();

    if (scaleContent) {
      // Scale content to fit new size
      const scaleX = targetWidth / currentWidth;
      const scaleY = targetHeight / currentHeight;
      const scale = Math.min(scaleX, scaleY);

      page.scaleContent(scale, scale);
    }

    // Set new page size
    page.setSize(targetWidth, targetHeight);
  }

  return await pdfDoc.save();
}

/**
 * Download resized PDF
 */
export function downloadResizedPdf(pdfBytes: Uint8Array, filename: string): void {
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
