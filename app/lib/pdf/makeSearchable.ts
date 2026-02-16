import { ocrPdf, OcrOptions } from './ocrPdf';

/**
 * Make PDF searchable by adding OCR text layer
 * This is essentially the same as OCR but with focus on searchability
 */
export async function makeSearchable(
  file: File,
  options: OcrOptions = {}
): Promise<Uint8Array> {
  return await ocrPdf(file, options);
}

/**
 * Download searchable PDF
 */
export function downloadSearchablePdf(pdfBytes: Uint8Array, filename: string): void {
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
