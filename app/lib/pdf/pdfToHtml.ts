import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfToHtmlOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  includeImages?: boolean; // Include images as base64
  preserveFormatting?: boolean; // Try to preserve basic formatting
  cssStyle?: string; // Custom CSS styles
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Convert PDF to HTML document
 */
export async function pdfToHtml(
  file: File,
  options: PdfToHtmlOptions = {}
): Promise<string> {
  const { 
    pageRange, 
    includeImages = false,
    preserveFormatting = true,
    cssStyle = ''
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
  const pageContents: Array<{ page: number; html: string }> = [];
  
  for (const pageNumber of pagesToConvert) {
    const extractedTexts = await extractTextFromPage(pdfDoc, pageNumber);
    
    if (extractedTexts.length === 0) {
      pageContents.push({ 
        page: pageNumber, 
        html: '<div class="pdf-page"><p class="empty-page">(No text content found)</p></div>' 
      });
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
    
    // Build HTML for this page
    const pageHtml: string[] = [];
    pageHtml.push(`<div class="pdf-page" data-page="${pageNumber}">`);
    
    for (const line of lines) {
      // Sort items in line by X position (left to right)
      line.items.sort((a, b) => a.x - b.x);
      
      // Determine if this might be a heading (larger font, bold)
      const avgFontSize = line.items.reduce((sum, item) => sum + item.fontSize, 0) / line.items.length;
      const isHeading = avgFontSize > 14 || line.items.some(item => 
        item.fontName?.toLowerCase().includes('bold')
      );
      
      const tag = isHeading ? 'h2' : 'p';
      const lineText = line.items.map(item => escapeHtml(item.text)).join(' ');
      
      if (preserveFormatting) {
        // Try to preserve formatting
        let formattedText = '';
        for (const item of line.items) {
          const text = escapeHtml(item.text);
          const isBold = item.fontName?.toLowerCase().includes('bold');
          if (isBold) {
            formattedText += `<strong>${text}</strong> `;
          } else {
            formattedText += `${text} `;
          }
        }
        pageHtml.push(`  <${tag} class="pdf-line">${formattedText.trim()}</${tag}>`);
      } else {
        pageHtml.push(`  <${tag} class="pdf-line">${lineText}</${tag}>`);
      }
    }
    
    pageHtml.push('</div>');
    pageContents.push({ page: pageNumber, html: pageHtml.join('\n') });
  }

  // Combine all pages into HTML document
  const htmlParts: string[] = [];
  
  htmlParts.push('<!DOCTYPE html>');
  htmlParts.push('<html lang="en">');
  htmlParts.push('<head>');
  htmlParts.push('  <meta charset="UTF-8">');
  htmlParts.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  htmlParts.push('  <title>PDF to HTML Conversion</title>');
  htmlParts.push('  <style>');
  htmlParts.push('    body {');
  htmlParts.push('      font-family: Arial, sans-serif;');
  htmlParts.push('      max-width: 800px;');
  htmlParts.push('      margin: 0 auto;');
  htmlParts.push('      padding: 20px;');
  htmlParts.push('      line-height: 1.6;');
  htmlParts.push('      color: #333;');
  htmlParts.push('    }');
  htmlParts.push('    .pdf-page {');
  htmlParts.push('      margin-bottom: 40px;');
  htmlParts.push('      padding: 20px;');
  htmlParts.push('      border: 1px solid #ddd;');
  htmlParts.push('      border-radius: 4px;');
  htmlParts.push('      background: #fff;');
  htmlParts.push('    }');
  htmlParts.push('    .pdf-line {');
  htmlParts.push('      margin: 8px 0;');
  htmlParts.push('    }');
  htmlParts.push('    .empty-page {');
  htmlParts.push('      color: #999;');
  htmlParts.push('      font-style: italic;');
  htmlParts.push('    }');
  htmlParts.push('    h2 {');
  htmlParts.push('      color: #2c3e50;');
  htmlParts.push('      margin-top: 20px;');
  htmlParts.push('    }');
  if (cssStyle) {
    htmlParts.push(`    ${cssStyle}`);
  }
  htmlParts.push('  </style>');
  htmlParts.push('</head>');
  htmlParts.push('<body>');
  
  // Add page contents
  pageContents.forEach(({ html }) => {
    htmlParts.push(html);
  });
  
  htmlParts.push('</body>');
  htmlParts.push('</html>');

  return htmlParts.join('\n');
}

/**
 * Download HTML file
 */
export function downloadHtml(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
