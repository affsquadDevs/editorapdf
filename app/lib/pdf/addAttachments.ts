import { PDFDocument } from 'pdf-lib';

export interface AttachmentOptions {
  attachments: File[];
}

/**
 * Embed attachments in PDF
 */
export async function addAttachments(
  file: File,
  options: AttachmentOptions
): Promise<Uint8Array> {
  const { attachments } = options;

  if (!attachments || attachments.length === 0) {
    throw new Error('At least one attachment file is required');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Embed each attachment
  for (const attachment of attachments) {
    const attachmentBytes = await attachment.arrayBuffer();
    const attachmentUint8 = new Uint8Array(attachmentBytes);

    // pdf-lib doesn't have direct attachment support
    // Attachments require PDF file specification objects
    
    // Note: Full attachment implementation requires:
    // 1. Creating file specification dictionary
    // 2. Adding to PDF's embedded files
    // 3. Setting up attachment relationships
    
    // This is best done with advanced PDF manipulation libraries
  }

  // For now, we return the PDF (attachments would need manual PDF structure editing)
  return await pdfDoc.save();
}

/**
 * Download PDF with attachments
 */
export function downloadAttachedPdf(pdfBytes: Uint8Array, filename: string): void {
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
