import { PDFDocument, degrees } from 'pdf-lib';

/**
 * Rotate pages in a PDF
 * @param file PDF file
 * @param rotations Map of page number (1-based) to rotation angle (0, 90, 180, 270)
 * @returns PDF bytes with rotated pages
 */
export async function rotatePages(
  file: File,
  rotations: { [pageNumber: number]: number }
): Promise<Uint8Array> {
  if (Object.keys(rotations).length === 0) {
    throw new Error('Please select at least one page to rotate');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Validate rotations
  for (const pageNumberStr of Object.keys(rotations)) {
    const pageNumber = parseInt(pageNumberStr, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      throw new Error(`Invalid page number: ${pageNumber}`);
    }
    const rotation = rotations[pageNumber];
    if (![0, 90, 180, 270].includes(rotation)) {
      throw new Error(`Invalid rotation angle: ${rotation}. Must be 0, 90, 180, or 270.`);
    }
  }

  // Create new PDF
  const newPdf = await PDFDocument.create();
  
  // Copy all pages and apply rotations
  for (let i = 0; i < totalPages; i++) {
    const pageNumber = i + 1;
    const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
    
    // Apply rotation if specified
    if (rotations[pageNumber] !== undefined && rotations[pageNumber] !== 0) {
      const currentRotation = copiedPage.getRotation().angle;
      copiedPage.setRotation(degrees((currentRotation + rotations[pageNumber]) % 360));
    }
    
    newPdf.addPage(copiedPage);
  }

  // Save the PDF
  return newPdf.save();
}

export { downloadPdf } from './deletePages';
