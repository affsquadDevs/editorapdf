import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface ComparisonResult {
  pagesMatch: boolean;
  totalPages1: number;
  totalPages2: number;
  textDifferences: Array<{
    page: number;
    differences: string[];
  }>;
  identical: boolean;
}

/**
 * Compare two PDF files
 */
export async function comparePdfs(
  file1: File,
  file2: File
): Promise<ComparisonResult> {
  const pdfDoc1 = await loadPdfDocument(file1);
  const pdfDoc2 = await loadPdfDocument(file2);

  const totalPages1 = pdfDoc1.numPages;
  const totalPages2 = pdfDoc2.numPages;
  const pagesMatch = totalPages1 === totalPages2;

  const textDifferences: Array<{ page: number; differences: string[] }> = [];
  let identical = true;

  const minPages = Math.min(totalPages1, totalPages2);

  for (let i = 1; i <= minPages; i++) {
    const texts1 = await extractTextFromPage(pdfDoc1, i);
    const texts2 = await extractTextFromPage(pdfDoc2, i);

    const text1 = texts1.map(t => t.text).join(' ');
    const text2 = texts2.map(t => t.text).join(' ');

    if (text1 !== text2) {
      identical = false;
      textDifferences.push({
        page: i,
        differences: [
          `Page ${i}: Text content differs`,
          `File 1 length: ${text1.length} characters`,
          `File 2 length: ${text2.length} characters`,
        ],
      });
    }
  }

  if (totalPages1 !== totalPages2) {
    identical = false;
  }

  return {
    pagesMatch,
    totalPages1,
    totalPages2,
    textDifferences,
    identical,
  };
}
