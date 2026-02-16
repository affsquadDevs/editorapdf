import { PDFDocument, rgb } from 'pdf-lib';

export interface WordToPdfOptions {
  preserveFormatting?: boolean;
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Convert Word (DOCX) to PDF
 */
export async function wordToPdf(
  file: File,
  options: WordToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    preserveFormatting = true,
    pageSize = 'A4',
    orientation = 'portrait',
  } = options;

  // Try to import mammoth
  let mammoth: any;
  try {
    mammoth = await import('mammoth');
  } catch (err) {
    throw new Error('mammoth library is not installed. Please run: npm install mammoth');
  }

  // Read Word document
  const arrayBuffer = await file.arrayBuffer();
  
  // Convert DOCX to HTML
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;

  // Create PDF from HTML content
  const pdfDoc = await PDFDocument.create();

  // Page dimensions
  const pageDimensions: { [key: string]: { width: number; height: number } } = {
    A4: { width: 595, height: 842 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
  };

  const dimensions = pageDimensions[pageSize];
  if (orientation === 'landscape') {
    [dimensions.width, dimensions.height] = [dimensions.height, dimensions.width];
  }

  const page = pdfDoc.addPage([dimensions.width, dimensions.height]);

  // Extract text from HTML (simplified)
  const textContent = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Add text to PDF
  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const margin = 50;
  const maxWidth = dimensions.width - margin * 2;
  const maxHeight = dimensions.height - margin * 2;
  
  const words = textContent.split(' ');
  let y = dimensions.height - margin;
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const estimatedWidth = testLine.length * fontSize * 0.6;

    if (estimatedWidth > maxWidth && currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y: y,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
      currentLine = word;

      if (y < margin) {
        const newPage = pdfDoc.addPage([dimensions.width, dimensions.height]);
        y = dimensions.height - margin;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    page.drawText(currentLine, {
      x: margin,
      y: y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  return await pdfDoc.save();
}

/**
 * Download PDF file
 */
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
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
