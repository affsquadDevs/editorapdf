import { loadPdfDocument, renderPageToDataUrl } from './pdfRender';

export interface PdfToPptxOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  slideLayout?: 'full' | 'title-content'; // Slide layout
  includeText?: boolean; // Include extracted text
}

/**
 * Convert PDF to PowerPoint (PPTX) presentation
 */
export async function pdfToPptx(
  file: File,
  options: PdfToPptxOptions = {}
): Promise<Uint8Array> {
  const { 
    pageRange, 
    slideLayout = 'full',
    includeText = true
  } = options;

  // Try to import pptxgenjs
  let PptxGenJS: any;
  try {
    const pptxModule = await import('pptxgenjs');
    PptxGenJS = pptxModule.default || pptxModule;
  } catch (err) {
    throw new Error('pptxgenjs library is not installed. Please run: npm install pptxgenjs');
  }

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

  // Create PowerPoint presentation
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 16:9 aspect ratio

  // Convert each page to a slide
  for (const pageNumber of pagesToConvert) {
    try {
      // Render PDF page as image
      const imageDataUrl = await renderPageToDataUrl(pdfDoc, pageNumber, 1920, 0);
      
      // Create slide
      const slide = pptx.addSlide();
      
      if (slideLayout === 'full') {
        // Full page image
        slide.addImage({
          data: imageDataUrl,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
        });
      } else {
        // Title and content layout
        slide.addText(`Page ${pageNumber}`, {
          x: 0.5,
          y: 0.3,
          w: 9,
          h: 0.5,
          fontSize: 24,
          bold: true,
        });
        
        slide.addImage({
          data: imageDataUrl,
          x: 0.5,
          y: 1,
          w: 9,
          h: 5.5,
        });
      }
    } catch (err) {
      console.error(`Error converting page ${pageNumber}:`, err);
      // Add error slide
      const slide = pptx.addSlide();
      slide.addText(`Error converting page ${pageNumber}`, {
        x: 1,
        y: 3,
        w: 8,
        h: 1,
        fontSize: 18,
        color: 'FF0000',
      });
    }
  }

  // Generate PPTX file
  const pptxBuffer = await pptx.write({ outputType: 'array' });
  return new Uint8Array(pptxBuffer);
}

/**
 * Download PowerPoint file
 */
export function downloadPptx(pptxBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pptxBytes as BlobPart], { 
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
