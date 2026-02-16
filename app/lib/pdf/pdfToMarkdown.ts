import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfToMarkdownOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  preserveFormatting?: boolean; // Try to preserve basic formatting
  detectHeadings?: boolean; // Auto-detect headings
}

/**
 * Escape Markdown special characters
 */
function escapeMarkdown(text: string): string {
  // Escape special Markdown characters
  return text
    .replace(/\*/g, '\\*')
    .replace(/#/g, '\\#')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/_/g, '\\_')
    .replace(/`/g, '\\`');
}

/**
 * Convert PDF to Markdown format
 */
export async function pdfToMarkdown(
  file: File,
  options: PdfToMarkdownOptions = {}
): Promise<string> {
  const { 
    pageRange, 
    preserveFormatting = true,
    detectHeadings = true
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
  const markdownParts: string[] = [];
  
  for (const pageNumber of pagesToConvert) {
    const extractedTexts = await extractTextFromPage(pdfDoc, pageNumber);
    
    if (extractedTexts.length === 0) {
      if (pagesToConvert.length > 1) {
        markdownParts.push(`\n## Page ${pageNumber}\n\n*(No text content found)*\n`);
      } else {
        markdownParts.push('*(No text content found)*\n');
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
    
    // Add page header if multiple pages
    if (pagesToConvert.length > 1) {
      markdownParts.push(`\n## Page ${pageNumber}\n\n`);
    }
    
    for (const line of lines) {
      // Sort items in line by X position (left to right)
      line.items.sort((a, b) => a.x - b.x);
      
      // Determine heading level based on font size
      const avgFontSize = line.items.reduce((sum, item) => sum + item.fontSize, 0) / line.items.length;
      const isBold = line.items.some(item => item.fontName?.toLowerCase().includes('bold'));
      
      let markdownLine = '';
      
      if (detectHeadings && (avgFontSize > 16 || (avgFontSize > 14 && isBold))) {
        // Large text - treat as heading
        const headingLevel = avgFontSize > 20 ? 1 : avgFontSize > 18 ? 2 : 3;
        const headingPrefix = '#'.repeat(headingLevel) + ' ';
        const lineText = line.items.map(item => item.text).join(' ');
        markdownLine = headingPrefix + lineText + '\n';
      } else {
        // Regular paragraph
        if (preserveFormatting) {
          // Try to preserve formatting
          const formattedParts: string[] = [];
          for (const item of line.items) {
            let text = item.text;
            const isBoldItem = item.fontName?.toLowerCase().includes('bold');
            const isItalic = item.fontName?.toLowerCase().includes('italic');
            
            if (isBoldItem && isItalic) {
              text = `***${text}***`;
            } else if (isBoldItem) {
              text = `**${text}**`;
            } else if (isItalic) {
              text = `*${text}*`;
            }
            
            formattedParts.push(text);
          }
          markdownLine = formattedParts.join(' ') + '\n';
        } else {
          const lineText = line.items.map(item => item.text).join(' ');
          markdownLine = lineText + '\n';
        }
      }
      
      markdownParts.push(markdownLine);
    }
    
    // Add separator between pages
    if (pageNumber < pagesToConvert[pagesToConvert.length - 1]) {
      markdownParts.push('\n---\n');
    }
  }

  // Combine all parts
  const markdown = markdownParts.join('\n');
  
  // If no text was extracted, return a message
  if (markdown.trim().length === 0 || markdown.trim() === '*(No text content found)*') {
    return '# PDF to Markdown\n\nNo text content found in PDF. This PDF may contain only images or scanned content.\n\nTry using OCR to extract text first.';
  }

  return markdown;
}

/**
 * Download Markdown file
 */
export function downloadMarkdown(markdown: string, filename: string): void {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
