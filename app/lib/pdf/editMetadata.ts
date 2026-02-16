import { PDFDocument } from 'pdf-lib';

export interface MetadataOptions {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
}

/**
 * Edit PDF metadata
 */
export async function editMetadata(
  file: File,
  options: MetadataOptions = {}
): Promise<Uint8Array> {
  const {
    title,
    author,
    subject,
    keywords,
    creator,
    producer,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Update metadata
  if (title !== undefined) pdfDoc.setTitle(title);
  if (author !== undefined) pdfDoc.setAuthor(author);
  if (subject !== undefined) pdfDoc.setSubject(subject);
  if (keywords !== undefined) pdfDoc.setKeywords(keywords);
  if (creator !== undefined) pdfDoc.setCreator(creator);
  if (producer !== undefined) pdfDoc.setProducer(producer);

  return await pdfDoc.save();
}

/**
 * Get PDF metadata
 */
export async function getMetadata(file: File): Promise<MetadataOptions> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const keywordsValue = pdfDoc.getKeywords();
  return {
    title: pdfDoc.getTitle(),
    author: pdfDoc.getAuthor(),
    subject: pdfDoc.getSubject(),
    keywords: keywordsValue ? keywordsValue.split(',').map(k => k.trim()) : undefined,
    creator: pdfDoc.getCreator(),
    producer: pdfDoc.getProducer(),
  };
}

/**
 * Download PDF with updated metadata
 */
export function downloadMetadataPdf(pdfBytes: Uint8Array, filename: string): void {
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
