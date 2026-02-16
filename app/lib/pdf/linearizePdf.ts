import { PDFDocument } from 'pdf-lib';

/**
 * Linearize PDF for fast web viewing
 * Note: pdf-lib doesn't have direct linearization support
 * This is a simplified implementation that optimizes the PDF structure
 */
export async function linearizePdf(file: File): Promise<Uint8Array> {
  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Save with optimization options
  // pdf-lib automatically applies some optimizations
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  // Note: True linearization (fast web view) requires specific PDF structure
  // that pdf-lib doesn't fully support. For production, consider using
  // server-side tools like qpdf or pdftk for full linearization.

  return pdfBytes;
}

/**
 * Download linearized PDF
 */
export function downloadLinearizedPdf(pdfBytes: Uint8Array, filename: string): void {
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
