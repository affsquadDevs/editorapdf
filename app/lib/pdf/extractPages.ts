import { PDFDocument } from 'pdf-lib';
import { parsePageRange } from './splitPdf';
import { downloadPdf } from './deletePages';

/**
 * Extract pages from a PDF into a new PDF
 * @param file PDF file
 * @param pageRangeString Page range string (e.g., "1-3, 5, 8-10")
 * @returns PDF bytes with extracted pages
 */
export async function extractPages(
  file: File,
  pageRangeString: string
): Promise<Uint8Array> {
  if (!pageRangeString.trim()) {
    throw new Error('Please specify which pages to extract');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Parse page ranges to get all pages to extract
  const pagesToExtract = parsePageRange(pageRangeString, totalPages);

  if (pagesToExtract.length === 0) {
    throw new Error('No valid pages found in the specified range');
  }

  // Create new PDF with extracted pages
  const newPdf = await PDFDocument.create();
  
  // Copy pages from source PDF
  const copiedPages = await newPdf.copyPages(sourcePdf, pagesToExtract);
  
  // Add pages to new PDF
  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  // Save the PDF
  return newPdf.save();
}

export { downloadPdf };
