import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Configure PDF.js worker
// This must be set before any PDF operations
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export interface PageInfo {
  index: number;
  width: number;
  height: number;
}

/**
 * Load a PDF document from a file
 */
export async function loadPdfDocument(file: File): Promise<PDFDocumentProxy> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  return loadingTask.promise;
}

/**
 * Get information about all pages in a PDF
 */
export async function getPdfPagesInfo(
  pdfDoc: PDFDocumentProxy
): Promise<PageInfo[]> {
  const pagesInfo: PageInfo[] = [];
  
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    // Use PDF.js default rotation (page.rotate) for size, so it matches the rendered canvas.
    const viewport = page.getViewport({ scale: 1 });
    pagesInfo.push({
      index: i - 1,
      width: viewport.width,
      height: viewport.height,
    });
  }
  
  return pagesInfo;
}

/**
 * Render a PDF page to a canvas
 */
export async function renderPageToCanvas(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale: number = 1,
  rotation: number = 0
): Promise<void> {
  const page = await pdfDoc.getPage(pageNumber);
  // Important: if we pass `rotation: 0`, PDF.js will override the page's inherent rotation
  // and some PDFs appear upside-down. So when the user rotation is 0, don't pass rotation
  // at all and let PDF.js use its default (page.rotate).
  const viewport =
    rotation === 0
      ? page.getViewport({ scale })
      : page.getViewport({ scale, rotation: ((page.rotate || 0) + rotation) % 360 });
  
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  
  await page.render(renderContext).promise;
}

/**
 * Render a PDF page as a data URL (for thumbnails)
 */
export async function renderPageToDataUrl(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  maxWidth: number = 150,
  rotation: number = 0
): Promise<string> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport =
    rotation === 0
      ? page.getViewport({ scale: 1 })
      : page.getViewport({ scale: 1, rotation: ((page.rotate || 0) + rotation) % 360 });
  
  const scale = maxWidth / viewport.width;
  const scaledViewport =
    rotation === 0
      ? page.getViewport({ scale })
      : page.getViewport({ scale, rotation: ((page.rotate || 0) + rotation) % 360 });
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.height = scaledViewport.height;
  canvas.width = scaledViewport.width;
  
  const renderContext = {
    canvasContext: context,
    viewport: scaledViewport,
  };
  
  await page.render(renderContext).promise;
  
  return canvas.toDataURL();
}

/**
 * Get a single page from PDF document
 */
export async function getPdfPage(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number
): Promise<PDFPageProxy> {
  return pdfDoc.getPage(pageNumber);
}
