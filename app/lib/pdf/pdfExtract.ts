import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

export interface ExtractedText {
  id: string;
  text: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  width: number; // normalized
  height: number; // normalized
  fontSize: number;
  fontName: string;
  transform: number[];
}

export interface ExtractedImage {
  id: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  width: number; // normalized
  height: number; // normalized
  dataUrl: string;
  originalWidth: number;
  originalHeight: number;
}

/**
 * Extract all text items from a PDF page with positioning
 */
export async function extractTextFromPage(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number
): Promise<ExtractedText[]> {
  try {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    
    const extractedTexts: ExtractedText[] = [];
    
    textContent.items.forEach((item: any, index: number) => {
      if (item.str && item.str.trim()) {
        const tx = item.transform;
        
        // Get position - PDF coordinates start from bottom-left
        // tx[4] is X position, tx[5] is Y position from bottom
        const x = tx[4] / viewport.width;
        const y = (viewport.height - tx[5]) / viewport.height; // Convert from bottom to top
        const width = (item.width || 0) / viewport.width;
        const fontSize = Math.abs(tx[0]) || 12;
        const height = fontSize / viewport.height;
        
        extractedTexts.push({
          id: `text-${pageNumber}-${index}`,
          text: item.str,
          x,
          y,
          width,
          height,
          fontSize: fontSize,
          fontName: item.fontName || 'Helvetica',
          transform: tx,
        });
      }
    });
    
    return extractedTexts;
  } catch (err) {
    console.error('Error extracting text:', err);
    return [];
  }
}

/**
 * Extract images from a PDF page
 */
export async function extractImagesFromPage(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number
): Promise<ExtractedImage[]> {
  try {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const operatorList = await page.getOperatorList();
    
    const images: ExtractedImage[] = [];
    let imageIndex = 0;
    
    // Look for image operations in the operator list
    for (let i = 0; i < operatorList.fnArray.length; i++) {
      const fn = operatorList.fnArray[i];
      
      // paintImageXObject operation
      if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
        try {
          // This is a simplified extraction - full implementation would need more work
          const args = operatorList.argsArray[i];
          
          // Create a placeholder for now
          // Full implementation would extract actual image data
          images.push({
            id: `image-${pageNumber}-${imageIndex}`,
            x: 0.1 + (imageIndex * 0.1),
            y: 0.1 + (imageIndex * 0.1),
            width: 0.3,
            height: 0.3,
            dataUrl: '', // Would contain actual image data
            originalWidth: 100,
            originalHeight: 100,
          });
          
          imageIndex++;
        } catch (err) {
          console.error('Error extracting individual image:', err);
        }
      }
    }
    
    return images;
  } catch (err) {
    console.error('Error extracting images:', err);
    return [];
  }
}

/**
 * Render page with text layer overlay for selection
 */
export async function getPageTextLayer(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  scale: number = 1
): Promise<{
  textContent: any;
  viewport: any;
}> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const textContent = await page.getTextContent();
  
  return {
    textContent,
    viewport,
  };
}
