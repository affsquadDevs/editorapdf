import { PDFDocument } from 'pdf-lib';

export type InsertPosition = 'beginning' | 'end' | 'after';

/**
 * Insert blank pages into a PDF
 * @param file PDF file
 * @param position Where to insert: 'beginning', 'end', or 'after'
 * @param numberOfPages Number of blank pages to insert
 * @param afterPageNumber If position is 'after', the page number after which to insert (1-based)
 * @returns PDF bytes with blank pages inserted
 */
export async function insertBlankPages(
  file: File,
  position: InsertPosition,
  numberOfPages: number,
  afterPageNumber?: number
): Promise<Uint8Array> {
  if (numberOfPages < 1 || numberOfPages > 100) {
    throw new Error('Number of pages must be between 1 and 100');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Validate afterPageNumber if position is 'after'
  if (position === 'after') {
    if (afterPageNumber === undefined || afterPageNumber < 1 || afterPageNumber > totalPages) {
      throw new Error(`Page number must be between 1 and ${totalPages}`);
    }
  }

  // Get the dimensions of the first page to match blank page size
  const firstPage = sourcePdf.getPage(0);
  const { width, height } = firstPage.getSize();

  // Create new PDF
  const newPdf = await PDFDocument.create();

  // Copy all pages from source PDF
  const copiedPages = await newPdf.copyPages(sourcePdf, Array.from({ length: totalPages }, (_, i) => i));

  if (position === 'beginning') {
    // Add blank pages first
    for (let i = 0; i < numberOfPages; i++) {
      newPdf.addPage([width, height]);
    }
    // Then add all original pages
    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });
  } else if (position === 'end') {
    // Add all original pages first
    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });
    // Then add blank pages at the end
    for (let i = 0; i < numberOfPages; i++) {
      newPdf.addPage([width, height]);
    }
  } else if (position === 'after') {
    // Add pages before the insertion point
    for (let i = 0; i < afterPageNumber!; i++) {
      newPdf.addPage(copiedPages[i]);
    }
    // Add blank pages
    for (let i = 0; i < numberOfPages; i++) {
      newPdf.addPage([width, height]);
    }
    // Add remaining pages
    for (let i = afterPageNumber!; i < copiedPages.length; i++) {
      newPdf.addPage(copiedPages[i]);
    }
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
