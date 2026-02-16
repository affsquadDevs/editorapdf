import { loadPdfDocument, renderPageToDataUrl } from './pdfRender';
import { PDFDocument, rgb } from 'pdf-lib';

export interface OcrOptions {
  language?: string; // OCR language code (e.g., 'eng', 'ukr', 'rus')
  pageRange?: string;
}

/**
 * Perform OCR on PDF and add text layer
 * Note: This uses Tesseract.js for client-side OCR
 */
export async function ocrPdf(
  file: File,
  options: OcrOptions = {}
): Promise<Uint8Array> {
  const {
    language = 'eng',
    pageRange,
  } = options;

  // Try to import Tesseract
  let Tesseract: any;
  try {
    const tesseractModule = await import('tesseract.js');
    Tesseract = tesseractModule.default || tesseractModule;
  } catch (err) {
    throw new Error('tesseract.js library is not installed. Please run: npm install tesseract.js');
  }

  // Load PDF
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToOcr: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToOcr = Array.from({ length: totalPages }, (_, i) => i + 1);
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
            if (!pagesToOcr.includes(i)) {
              pagesToOcr.push(i);
            }
          }
        }
      } else {
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToOcr.includes(pageNum)) {
            pagesToOcr.push(pageNum);
          }
        }
      }
    }
    pagesToOcr.sort((a, b) => a - b);
  }

  // Create new PDF with OCR text
  const newPdfDoc = await PDFDocument.create();
  const font = await newPdfDoc.embedFont('Helvetica');

  // Process each page
  for (const pageNumber of pagesToOcr) {
    try {
      // Render page as image
      const pageImage = await renderPageToDataUrl(pdfDoc, pageNumber, 1920, 0);

      // Perform OCR
      let ocrResult: any;
      if (Tesseract.createWorker) {
        const worker = await Tesseract.createWorker(language);
        ocrResult = await worker.recognize(pageImage);
        await worker.terminate();
      } else {
        ocrResult = await Tesseract.recognize(pageImage, language);
      }
      const { text, words } = ocrResult.data;

      // Create new page with same dimensions
      const page = await pdfDoc.getPage(pageNumber - 1);
      const viewport = page.getViewport({ scale: 1 });
      const width = viewport.width;
      const height = viewport.height;
      const newPage = newPdfDoc.addPage([width, height]);

      // Copy original page content (simplified - would need to render original)
      // For now, we add OCR text as overlay
      if (words && words.length > 0) {
        for (const word of words) {
          const bbox = word.bbox;
          // Convert OCR coordinates to PDF coordinates
          const x = (bbox.x0 / 1920) * width;
          const y = height - (bbox.y0 / (1920 * (height / width))) * height;

          newPage.drawText(word.text, {
            x,
            y,
            size: 10,
            color: rgb(0, 0, 0),
            opacity: 0, // Invisible text layer for searchability
          });
        }
      }
    } catch (err) {
      console.error(`Error performing OCR on page ${pageNumber}:`, err);
    }
  }

  return await newPdfDoc.save();
}

/**
 * Download OCR'd PDF
 */
export function downloadOcrPdf(pdfBytes: Uint8Array, filename: string): void {
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
