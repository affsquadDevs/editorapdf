import { PDFDocument } from 'pdf-lib';

/**
 * Merge multiple PDF files into a single PDF document
 * @param files Array of PDF files to merge
 * @returns Uint8Array of the merged PDF
 */
export async function mergePdf(files: File[]): Promise<Uint8Array> {
  if (files.length < 2) {
    throw new Error('At least 2 PDF files are required to merge');
  }

  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  // Process each PDF file
  for (const file of files) {
    try {
      // Load the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      // Copy all pages from this PDF to the merged PDF
      const pageIndices = pdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);

      // Add each copied page to the merged PDF
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      throw new Error(`Failed to process ${file.name}. Make sure it's a valid PDF file.`);
    }
  }

  // Save and return the merged PDF
  return mergedPdf.save();
}

/**
 * Download merged PDF file
 * @param pdfBytes The PDF bytes to download
 * @param filename Optional filename (defaults to 'merged.pdf')
 */
export function downloadMergedPdf(pdfBytes: Uint8Array, filename: string = 'merged.pdf'): void {
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
    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}
