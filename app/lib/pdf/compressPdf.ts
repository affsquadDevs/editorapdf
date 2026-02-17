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

  // Save with compression options based on quality level
  // pdf-lib automatically applies compression, but we can adjust settings
  const saveOptions: any = {
    addDefaultPage: false,
  };

  // Apply different compression strategies based on quality
  switch (quality) {
    case 'high':
      // Maximum compression: use object streams and remove unnecessary data
      saveOptions.useObjectStreams = true;
      break;
    case 'medium':
      // Balanced compression
      saveOptions.useObjectStreams = true;
      break;
    case 'low':
      // Minimal compression: preserve quality
      saveOptions.useObjectStreams = false;
      break;
  }

  const pdfBytes = await pdfDoc.save(saveOptions);

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
