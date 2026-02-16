import { PDFDocument } from 'pdf-lib';

/**
 * Repair corrupted PDF
 * Attempts to fix common PDF issues by reloading and saving
 */
export async function repairPdf(file: File): Promise<Uint8Array> {
  try {
    // Load PDF with error recovery
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: false,
      capNumbers: true, // Cap numbers to prevent overflow
    });

    // Save PDF - this can fix some structural issues
    return await pdfDoc.save({
      useObjectStreams: false, // Disable object streams for compatibility
      addDefaultPage: false,
    });
  } catch (err) {
    throw new Error(`Failed to repair PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

/**
 * Download repaired PDF
 */
export function downloadRepairedPdf(pdfBytes: Uint8Array, filename: string): void {
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
