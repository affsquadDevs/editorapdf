export interface HtmlToPdfOptions {
  pageSize?: 'A4' | 'Letter' | 'Legal' | 'A3';
  orientation?: 'portrait' | 'landscape';
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  printBackground?: boolean;
}

/**
 * Convert HTML to PDF
 * Note: This is a simplified implementation. For production, consider using
 * server-side rendering with Puppeteer or similar tools.
 */
export async function htmlToPdf(
  htmlContent: string | File,
  options: HtmlToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    pageSize = 'A4',
    orientation = 'portrait',
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    printBackground = true,
  } = options;

  // Get HTML content
  let html: string;
  if (htmlContent instanceof File) {
    html = await htmlContent.text();
  } else {
    html = htmlContent;
  }

  // For client-side, we'll use pdf-lib to create a basic PDF
  // This is a simplified implementation
  const { PDFDocument, rgb } = await import('pdf-lib');

  // Create new PDF
  const pdfDoc = await PDFDocument.create();

  // Page dimensions based on size
  const pageDimensions: { [key: string]: { width: number; height: number } } = {
    A4: { width: 595, height: 842 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
    A3: { width: 842, height: 1191 },
  };

  const dimensions = pageDimensions[pageSize];
  if (orientation === 'landscape') {
    [dimensions.width, dimensions.height] = [dimensions.height, dimensions.width];
  }

  const page = pdfDoc.addPage([dimensions.width, dimensions.height]);

  // Extract text from HTML (simplified - just strip HTML tags)
  const textContent = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Add text to PDF (simplified implementation)
  // In production, use proper HTML rendering
  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const marginLeft = margin.left ?? 20;
  const marginRight = margin.right ?? 20;
  const marginTop = margin.top ?? 20;
  const marginBottom = margin.bottom ?? 20;
  const maxWidth = dimensions.width - marginLeft - marginRight;
  const maxHeight = dimensions.height - marginTop - marginBottom;
  
  const words = textContent.split(' ');
  let y = dimensions.height - marginTop;
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    // Simple width estimation (not accurate, but works for basic cases)
    const estimatedWidth = testLine.length * fontSize * 0.6;

    if (estimatedWidth > maxWidth && currentLine) {
      // Add line to PDF
      page.drawText(currentLine, {
        x: marginLeft,
        y: y,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
      currentLine = word;

      // Check if we need a new page
      if (y < marginBottom) {
        const newPage = pdfDoc.addPage([dimensions.width, dimensions.height]);
        y = dimensions.height - marginTop;
      }
    } else {
      currentLine = testLine;
    }
  }

  // Add remaining text
  if (currentLine) {
    page.drawText(currentLine, {
      x: marginLeft,
      y: y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  // Save PDF
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
