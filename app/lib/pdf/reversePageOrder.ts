import { PDFDocument } from 'pdf-lib';

/**
 * Reverse the order of all pages in a PDF
 * @param file PDF file
 * @returns PDF bytes with pages in reversed order
 */
export async function reversePageOrder(
  file: File
): Promise<Uint8Array> {
  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  if (totalPages === 0) {
    throw new Error('PDF has no pages to reverse');
  }

  // Create new PDF
  const newPdf = await PDFDocument.create();

  // Copy all pages from source PDF
  const copiedPages = await newPdf.copyPages(
    sourcePdf,
    Array.from({ length: totalPages }, (_, i) => i)
  );

  // Add pages in reversed order
  for (let i = copiedPages.length - 1; i >= 0; i--) {
    newPdf.addPage(copiedPages[i]);
  }

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
