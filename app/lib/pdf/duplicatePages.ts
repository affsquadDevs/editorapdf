import { PDFDocument } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

/**
 * Duplicate pages in a PDF
 * @param file PDF file
 * @param pageRangeString Page range string (e.g., "1-3, 5, 8-10")
 * @param numberOfCopies Number of times to duplicate each selected page (default: 1)
 * @returns PDF bytes with duplicated pages
 */
export async function duplicatePages(
  file: File,
  pageRangeString: string,
  numberOfCopies: number = 1
): Promise<Uint8Array> {
  if (!pageRangeString.trim()) {
    throw new Error('Please specify which pages to duplicate');
  }

  if (numberOfCopies < 1 || numberOfCopies > 10) {
    throw new Error('Number of copies must be between 1 and 10');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Parse page ranges to get all pages to duplicate
  const pagesToDuplicate = parsePageRange(pageRangeString, totalPages);

  if (pagesToDuplicate.length === 0) {
    throw new Error('No valid pages found in the specified range');
  }

  // Create new PDF
  const newPdf = await PDFDocument.create();

  // Copy all pages from source PDF
  const copiedPages = await newPdf.copyPages(sourcePdf, Array.from({ length: totalPages }, (_, i) => i));

  // Build the new page order: original pages + duplicated pages inserted after their originals
  const newPageOrder: number[] = [];
  
  for (let i = 0; i < totalPages; i++) {
    // Add the original page
    newPageOrder.push(i);
    
    // If this page should be duplicated, add the duplicates right after it
    if (pagesToDuplicate.includes(i)) {
      for (let copy = 0; copy < numberOfCopies; copy++) {
        newPageOrder.push(i); // Duplicate the same page
      }
    }
  }

  // Add pages in the new order
  newPageOrder.forEach((pageIndex) => {
    newPdf.addPage(copiedPages[pageIndex]);
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
    const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
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
