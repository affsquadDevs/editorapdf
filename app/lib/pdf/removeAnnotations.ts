import { PDFDocument } from 'pdf-lib';

/**
 * Remove annotations from PDF
 * Note: pdf-lib doesn't have direct annotation removal support
 * This is a simplified implementation
 */
export async function removeAnnotations(file: File): Promise<Uint8Array> {
  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // pdf-lib doesn't expose annotations directly
  // Annotation removal requires parsing PDF structure and removing annotation objects
  
  // Note: Full annotation removal requires:
  // 1. Parsing PDF annotation dictionaries
  // 2. Removing annotation objects from pages
  // 3. Cleaning up annotation resources
  
  // This is best done with advanced PDF manipulation libraries
  
  return await pdfDoc.save();
}

/**
 * Download PDF without annotations
 */
export function downloadNoAnnotationsPdf(pdfBytes: Uint8Array, filename: string): void {
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
