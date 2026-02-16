import { PDFDocument, rgb } from 'pdf-lib';

export interface RedactionArea {
  pageNumber: number; // 1-based
  x: number; // Normalized 0-1 (left position)
  y: number; // Normalized 0-1 (top position, screen coordinates)
  width: number; // Normalized 0-1
  height: number; // Normalized 0-1
}

export interface RedactPdfOptions {
  file: File;
  redactions: RedactionArea[];
}

/**
 * Redact PDF by drawing black rectangles over specified areas
 */
export async function redactPdf(options: RedactPdfOptions): Promise<Uint8Array> {
  if (!options.redactions || options.redactions.length === 0) {
    throw new Error('No redaction areas specified');
  }

  try {
    // Load the PDF
    const arrayBuffer = await options.file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const totalPages = pdfDoc.getPageCount();

    // Group redactions by page
    const redactionsByPage: Record<number, RedactionArea[]> = {};
    for (const redaction of options.redactions) {
      if (redaction.pageNumber < 1 || redaction.pageNumber > totalPages) {
        continue; // Skip invalid page numbers
      }
      
      if (!redactionsByPage[redaction.pageNumber]) {
        redactionsByPage[redaction.pageNumber] = [];
      }
      redactionsByPage[redaction.pageNumber].push(redaction);
    }

    // Apply redactions to each page
    for (const pageNumStr in redactionsByPage) {
      const pageNumber = parseInt(pageNumStr);
      const page = pdfDoc.getPage(pageNumber - 1); // 0-based index
      const { width: pageWidth, height: pageHeight } = page.getSize();

      const pageRedactions = redactionsByPage[pageNumber];

      for (const redaction of pageRedactions) {
        // Convert normalized coordinates to PDF coordinates
        // PDF coordinates: bottom-left is (0, 0), Y increases upward
        // Normalized: x (0-1 left to right), y (0-1 top to bottom, screen coordinates)
        const pdfX = redaction.x * pageWidth;
        const pdfY = (1 - redaction.y) * pageHeight; // Flip Y: screen top (0) -> PDF bottom (pageHeight)
        
        const pdfWidth = redaction.width * pageWidth;
        const pdfHeight = redaction.height * pageHeight;

        // Adjust Y position: drawRectangle uses bottom-left corner
        const rectY = pdfY - pdfHeight;

        // Draw black rectangle to redact the area
        page.drawRectangle({
          x: pdfX,
          y: rectY,
          width: pdfWidth,
          height: pdfHeight,
          color: rgb(0, 0, 0), // Black
          borderWidth: 0,
        });
      }
    }

    // Save the PDF
    return await pdfDoc.save();
  } catch (error: any) {
    console.error('Error redacting PDF:', error);
    if (error.message) {
      throw error;
    }
    throw new Error('Failed to redact PDF. Please try again.');
  }
}

/**
 * Download redacted PDF
 */
export function downloadRedactedPdf(
  pdfBytes: Uint8Array,
  filename: string
): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
