import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfToTextOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  preserveLineBreaks?: boolean; // Preserve line breaks from PDF
  includePageNumbers?: boolean; // Include page numbers in output
  separator?: string; // Separator between pages (default: "\n\n")
}

/**
 * Convert PDF to plain text file
 */
export async function pdfToText(
  file: File,
  options: PdfToTextOptions = {}
): Promise<string> {
  const { 
    pageRange, 
    preserveLineBreaks = true, 
    includePageNumbers = false,
    separator = '\n\n'
  } = options;

  // Load PDF document
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToConvert: number[] = [];
  
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    // Convert all pages
    pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // Parse page range (e.g., "1-5", "1,3,5", "1-3,5,7-9")
    const parts = pageRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        // Range (e.g., "1-5")
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, totalPages));
          const rangeEnd = Math.max(1, Math.min(end, totalPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            if (!pagesToConvert.includes(i)) {
              pagesToConvert.push(i);
            }
          }
        }
      } else {
        // Single page
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToConvert.includes(pageNum)) {
            pagesToConvert.push(pageNum);
          }
        }
      }
    }
    // Sort pages
    pagesToConvert.sort((a, b) => a - b);
  }

  if (pagesToConvert.length === 0) {
    throw new Error('No valid pages to convert');
  }

  // Extract text from all pages
  const pageTexts: string[] = [];
  
  for (const pageNumber of pagesToConvert) {
    const extractedTexts = await extractTextFromPage(pdfDoc, pageNumber);
    
    if (extractedTexts.length === 0) {
      // Empty page
      if (includePageNumbers) {
        pageTexts.push(`[Page ${pageNumber}]\n(No text content found)`);
      } else {
        pageTexts.push('');
      }
      continue;
    }

    // Group texts by approximate Y position (same line)
    const lines: Array<{ y: number; items: any[] }> = [];
    
    for (const text of extractedTexts) {
      // Find line with similar Y position (within 0.02 tolerance)
      let foundLine = false;
      for (const line of lines) {
        if (Math.abs(line.y - text.y) < 0.02) {
          line.items.push(text);
          foundLine = true;
          break;
        }
      }
      
      if (!foundLine) {
        lines.push({ y: text.y, items: [text] });
      }
    }
    
    // Sort lines by Y position (top to bottom)
    lines.sort((a, b) => b.y - a.y);
    
    // Build text for this page
    const pageLines: string[] = [];
    
    if (includePageNumbers) {
      pageLines.push(`[Page ${pageNumber}]`);
    }
    
    for (const line of lines) {
      // Sort items in line by X position (left to right)
      line.items.sort((a, b) => a.x - b.x);
      
      // Combine text items in the line
      const lineText = line.items.map(item => item.text).join(preserveLineBreaks ? ' ' : '');
      pageLines.push(lineText);
    }
    
    pageTexts.push(pageLines.join('\n'));
  }

  // Combine all pages
  const fullText = pageTexts.join(separator);
  
  // If no text was extracted, return a message
  if (fullText.trim().length === 0) {
    return 'No text content found in PDF. This PDF may contain only images or scanned content.\nTry using OCR to extract text first.';
  }

  return fullText;
}

/**
 * Convert text string to Uint8Array (UTF-8 encoded)
 */
export function textToUint8Array(text: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

/**
 * Download text file
 */
export function downloadText(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
