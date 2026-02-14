import { PDFDocument } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

/**
 * Delete pages from a PDF
 * @param file PDF file
 * @param pageRangeString Page range string (e.g., "1-3, 5, 8-10")
 * @returns PDF bytes with pages removed
 */
export async function deletePages(
  file: File,
  pageRangeString: string
): Promise<Uint8Array> {
  if (!pageRangeString.trim()) {
    throw new Error('Please specify which pages to delete');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Parse page ranges to get all pages to delete
  const pagesToDelete = parsePageRange(pageRangeString, totalPages);

  if (pagesToDelete.length === 0) {
    throw new Error('No valid pages found in the specified range');
  }

  // Check if trying to delete all pages
  if (pagesToDelete.length === totalPages) {
    throw new Error(`Cannot delete all ${totalPages} pages. At least one page must remain.`);
  }

  // Create new PDF with remaining pages
  const newPdf = await PDFDocument.create();
  
  // Copy all pages except the ones to delete
  const pagesToKeep: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (!pagesToDelete.includes(i)) {
      pagesToKeep.push(i);
    }
  }

  if (pagesToKeep.length === 0) {
    throw new Error('Cannot delete all pages. At least one page must remain.');
  }

  // Copy remaining pages
  const copiedPages = await newPdf.copyPages(sourcePdf, pagesToKeep);
  
  // Add pages to new PDF
  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  // Save the PDF
  return newPdf.save();
}

/**
 * Download a PDF file
 * @param pdfBytes PDF bytes to download
 * @param filename Filename for the download
 */
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
  try {
    // @ts-ignore - Uint8Array is compatible with Blob constructor
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}
