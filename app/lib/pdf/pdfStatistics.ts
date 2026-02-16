import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfStatistics {
  pageCount: number;
  fileSize: number;
  wordCount: number;
  characterCount: number;
  imageCount: number;
  fonts: string[];
  pdfVersion: string;
  hasMetadata: boolean;
  isEncrypted: boolean;
}

/**
 * Get PDF statistics
 */
export async function getPdfStatistics(file: File): Promise<PdfStatistics> {
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Extract text from all pages for word/character count
  let totalWords = 0;
  let totalChars = 0;
  const fonts = new Set<string>();

  for (let i = 1; i <= totalPages; i++) {
    const texts = await extractTextFromPage(pdfDoc, i);
    for (const text of texts) {
      totalChars += text.text.length;
      totalWords += text.text.split(/\s+/).filter(w => w.length > 0).length;
      if (text.fontName) {
        fonts.add(text.fontName);
      }
    }
  }

  return {
    pageCount: totalPages,
    fileSize: file.size,
    wordCount: totalWords,
    characterCount: totalChars,
    imageCount: 0, // Would need image extraction
    fonts: Array.from(fonts),
    pdfVersion: '1.4', // Default, would need to extract from PDF
    hasMetadata: true, // Would need to check
    isEncrypted: false, // Would need to check
  };
}
