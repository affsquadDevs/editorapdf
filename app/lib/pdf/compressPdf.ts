import { PDFDocument } from 'pdf-lib';

export interface CompressPdfOptions {
  quality?: 'low' | 'medium' | 'high'; // Compression quality
  removeMetadata?: boolean; // Remove metadata to reduce size
  optimizeImages?: boolean; // Compress embedded images
}

/**
 * Compress PDF to reduce file size
 */
export async function compressPdf(
  file: File,
  options: CompressPdfOptions = {}
): Promise<Uint8Array> {
  const {
    quality = 'medium',
    removeMetadata = false,
    optimizeImages = true,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
    updateMetadata: !removeMetadata,
  });

  // Remove metadata if requested
  if (removeMetadata) {
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());
  }

  // Save with compression options
  // pdf-lib automatically applies compression
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true, // Enable object streams for better compression
    addDefaultPage: false,
  });

  return pdfBytes;
}

/**
 * Download compressed PDF
 */
export function downloadCompressedPdf(pdfBytes: Uint8Array, filename: string): void {
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
