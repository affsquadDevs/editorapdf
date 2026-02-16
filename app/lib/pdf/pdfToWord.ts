import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfToWordOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  preserveFormatting?: boolean; // Try to preserve basic formatting
  includeImages?: boolean; // Include images as placeholders (not fully supported)
}

/**
 * Convert PDF to Word (DOCX) document
 */
export async function pdfToWord(
  file: File,
  options: PdfToWordOptions = {}
): Promise<Uint8Array> {
  const { pageRange, preserveFormatting = true, includeImages = false } = options;

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

  // Try to import docx library
  let docx: any;
  try {
    const docxModule = await import('docx');
    docx = docxModule;
  } catch (err) {
    throw new Error('docx library is not installed. Please run: npm install docx');
  }

  // Extract text from all pages
  const allTexts: Array<{ page: number; texts: any[] }> = [];
  
  for (const pageNumber of pagesToConvert) {
    const extractedTexts = await extractTextFromPage(pdfDoc, pageNumber);
    
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
    
    // Convert to docx paragraphs
    const pageTexts: any[] = [];
    
    for (const line of lines) {
      // Sort items in line by X position (left to right)
      line.items.sort((a, b) => a.x - b.x);
      
      // Create text runs for the line
      const textRuns: any[] = [];
      let currentRun: { text: string; size?: number; bold?: boolean; font?: string } | null = null;
      
      for (const item of line.items) {
        const fontSize = Math.round(item.fontSize * 2); // Convert to half-points (docx uses half-points)
        const isBold = item.fontName?.toLowerCase().includes('bold') || false;
        const fontFamily = item.fontName || 'Arial';
        
        // Group consecutive items with same formatting
        if (currentRun && 
            currentRun.size === fontSize && 
            currentRun.bold === isBold && 
            currentRun.font === fontFamily) {
          currentRun.text += item.text;
        } else {
          if (currentRun) {
            const runOptions: any = {
              text: currentRun.text,
            };
            if (currentRun.size) runOptions.size = currentRun.size;
            if (currentRun.bold) runOptions.bold = true;
            if (currentRun.font) runOptions.font = currentRun.font;
            textRuns.push(new docx.TextRun(runOptions));
          }
          currentRun = {
            text: item.text,
            size: fontSize,
            bold: isBold,
            font: fontFamily,
          };
        }
      }
      
      // Add last run
      if (currentRun) {
        const runOptions: any = {
          text: currentRun.text,
        };
        if (currentRun.size) runOptions.size = currentRun.size;
        if (currentRun.bold) runOptions.bold = true;
        if (currentRun.font) runOptions.font = currentRun.font;
        textRuns.push(new docx.TextRun(runOptions));
      }
      
      // Create paragraph from text runs
      if (textRuns.length > 0) {
        pageTexts.push(new docx.Paragraph({
          children: textRuns,
          spacing: {
            after: 200, // 10pt spacing after paragraph
          },
        }));
      }
    }
    
    // Add page break before next page (except for last page)
    // Note: pageBreakBefore is set on the first paragraph of the next page, not here
    
    allTexts.push({ page: pageNumber, texts: pageTexts });
  }

  // Combine all paragraphs with page breaks
  const allParagraphs: any[] = [];
  for (let i = 0; i < allTexts.length; i++) {
    const pageData = allTexts[i];
    
    // Add page break before first paragraph of each page (except first)
    if (i > 0 && pageData.texts.length > 0) {
      // Add a page break paragraph before the page content
      allParagraphs.push(new docx.Paragraph({
        children: [new docx.TextRun('')],
        pageBreakBefore: true,
      }));
    }
    
    // Add all paragraphs from this page
    allParagraphs.push(...pageData.texts);
  }

  // If no text was extracted, add a message
  if (allParagraphs.length === 0) {
    allParagraphs.push(new docx.Paragraph({
      children: [
        new docx.TextRun({
          text: 'No text content found in PDF. This PDF may contain only images or scanned content.',
          italics: true,
        } as any),
      ],
    }));
  }

  // Create document
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: allParagraphs,
      },
    ],
  });

  // Generate DOCX file
  const buffer = await docx.Packer.toBuffer(doc);
  return new Uint8Array(buffer);
}

/**
 * Download Word document
 */
export function downloadWord(docxBytes: Uint8Array, filename: string): void {
  const blob = new Blob([docxBytes], { 
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
