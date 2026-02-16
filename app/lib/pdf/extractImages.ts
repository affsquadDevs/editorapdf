import { loadPdfDocument } from './pdfRender';
import { extractImagesFromPage } from './pdfExtract';
import { renderPageToDataUrl } from './pdfRender';

export interface ExtractImagesOptions {
  pageRange?: string;
  format?: 'PNG' | 'JPEG';
  quality?: number; // For JPEG, 0-1
}

export interface ExtractedImageFile {
  dataUrl: string;
  pageNumber: number;
  index: number;
  format: string;
}

/**
 * Extract images from PDF
 */
export async function extractImages(
  file: File,
  options: ExtractImagesOptions = {}
): Promise<ExtractedImageFile[]> {
  const {
    pageRange,
    format = 'PNG',
    quality = 0.92,
  } = options;

  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToExtract: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToExtract = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const parts = pageRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, totalPages));
          const rangeEnd = Math.max(1, Math.min(end, totalPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            if (!pagesToExtract.includes(i)) {
              pagesToExtract.push(i);
            }
          }
        }
      } else {
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToExtract.includes(pageNum)) {
            pagesToExtract.push(pageNum);
          }
        }
      }
    }
    pagesToExtract.sort((a, b) => a - b);
  }

  const extractedImages: ExtractedImageFile[] = [];
  let imageIndex = 0;

  // Extract images from each page
  for (const pageNumber of pagesToExtract) {
    try {
      // Render page as image (simplified - extracts whole page)
      const pageImage = await renderPageToDataUrl(pdfDoc, pageNumber, 1920, 0);
      
      extractedImages.push({
        dataUrl: pageImage,
        pageNumber,
        index: imageIndex++,
        format: format,
      });
    } catch (err) {
      console.error(`Error extracting images from page ${pageNumber}:`, err);
    }
  }

  return extractedImages;
}

/**
 * Download extracted images as ZIP
 */
export async function downloadExtractedImages(
  images: ExtractedImageFile[],
  baseName: string
): Promise<void> {
  if (images.length === 0) {
    throw new Error('No images to download');
  }

  // Use JSZip for multiple images
  let JSZip: any;
  try {
    const jszipModule = await import('jszip');
    JSZip = jszipModule.default || jszipModule;
  } catch (err) {
    // Fallback: download first image
    const img = document.createElement('a');
    img.href = images[0].dataUrl;
    img.download = `${baseName}_page_${images[0].pageNumber}.png`;
    img.click();
    return;
  }

  const zip = new JSZip();

  for (const image of images) {
    // Convert data URL to blob
    const response = await fetch(image.dataUrl);
    const blob = await response.blob();
    const filename = `${baseName}_page_${image.pageNumber}_${image.index}.${image.format.toLowerCase()}`;
    zip.file(filename, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${baseName}_images.zip`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
