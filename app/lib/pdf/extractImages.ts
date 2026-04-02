import * as pdfjsLib from 'pdfjs-dist';
import { loadPdfDocument } from './pdfRender';

export interface ExtractImagesOptions {
  pageRange?: string;
  format?: 'PNG' | 'JPEG';
  quality?: number; // For JPEG, 0-1
}

export interface ExtractedImageFile {
  dataUrl: string;
  pageNumber: number;
  index: number;
  format: string;
}

/**
 * Extract embedded images from PDF
 * This function extracts actual embedded images from PDF pages, not page renders
 */
export async function extractImages(
  file: File,
  options: ExtractImagesOptions = {}
): Promise<ExtractedImageFile[]> {
  const {
    pageRange,
    format = 'PNG',
    quality = 0.92,
  } = options;

  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToExtract: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToExtract = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const parts = pageRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, totalPages));
          const rangeEnd = Math.max(1, Math.min(end, totalPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            if (!pagesToExtract.includes(i)) {
              pagesToExtract.push(i);
            }
          }
        }
      } else {
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToExtract.includes(pageNum)) {
            pagesToExtract.push(pageNum);
          }
        }
      }
    }
    pagesToExtract.sort((a, b) => a - b);
  }

  const extractedImages: ExtractedImageFile[] = [];
  let imageIndex = 0;

  // Extract embedded images from each page
  for (const pageNumber of pagesToExtract) {
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const operatorList = await page.getOperatorList();
      // `PDFPageProxy` typings in `pdfjs-dist` don't expose internal `resources`,
      // but some builds/runtime objects may still have it. Keep this best-effort.
      const pageResources = (page as any)?.resources;
      
      // Track which images we've already extracted to avoid duplicates
      const extractedImageNames = new Set<string>();
      
      // Look for image operations in the operator list
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        const fn = operatorList.fnArray[i];
        
        // Check for image operations
        if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
          try {
            const args = operatorList.argsArray[i];
            const imageName = args[0];
            
            // Skip if we've already extracted this image
            if (extractedImageNames.has(imageName)) {
              continue;
            }
            
            // Try to get the image from page resources
            if (pageResources && typeof pageResources.get === 'function') {
              try {
                const xObject = await pageResources.get('XObject');
                
                if (xObject && typeof xObject.get === 'function') {
                  const imageObj = await xObject.get(imageName);
                  
                  if (imageObj) {
                    // Create canvas to render the image
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    if (ctx) {
                      // Get image dimensions
                      const width = imageObj.width || 100;
                      const height = imageObj.height || 100;
                      
                      canvas.width = width;
                      canvas.height = height;
                      
                      // Create viewport for rendering
                      const viewport = {
                        width: width,
                        height: height,
                        scale: 1,
                        rotation: 0,
                        offsetX: 0,
                        offsetY: 0,
                      };
                      
                      // Render the image object to canvas
                      const renderContext = {
                        canvasContext: ctx,
                        viewport: viewport,
                      };
                      
                      try {
                        // Try to render the image
                        await imageObj.startRendering(renderContext);
                        
                        // Convert canvas to data URL
                        const dataUrl = canvas.toDataURL(
                          format === 'JPEG' ? `image/jpeg` : `image/png`,
                          format === 'JPEG' ? quality : undefined
                        );
                        
                        if (dataUrl && dataUrl !== 'data:,') {
                          extractedImages.push({
                            dataUrl,
                            pageNumber,
                            index: imageIndex++,
                            format: format,
                          });
                          extractedImageNames.add(imageName);
                        }
                      } catch (renderErr) {
                        console.debug(`Could not render image ${imageName} from page ${pageNumber}:`, renderErr);
                      }
                    }
                  }
                }
              } catch (xObjectErr) {
                console.debug(`Could not access XObject for image ${imageName}:`, xObjectErr);
              }
            }
          } catch (imgErr) {
            console.debug(`Error processing image operation:`, imgErr);
          }
        }
      }
    } catch (err) {
      console.error(`Error extracting images from page ${pageNumber}:`, err);
      // Continue with next page instead of failing completely
    }
  }

  // If no embedded images were found, return empty array
  // (Don't fall back to rendering pages as images - that's not what extract images should do)
  if (extractedImages.length === 0) {
    console.warn('No embedded images found in the specified pages. The PDF may not contain extractable embedded images.');
  }

  return extractedImages;
}

/**
 * Download extracted images as ZIP
 */
export async function downloadExtractedImages(
  images: ExtractedImageFile[],
  baseName: string
): Promise<void> {
  if (images.length === 0) {
    throw new Error('No images to download');
  }

  // Use JSZip for multiple images
  let JSZip: any;
  try {
    const jszipModule = await import('jszip');
    JSZip = jszipModule.default || jszipModule;
  } catch (err) {
    // Fallback: download first image
    const img = document.createElement('a');
    img.href = images[0].dataUrl;
    img.download = `${baseName}_page_${images[0].pageNumber}.png`;
    img.click();
    return;
  }

  const zip = new JSZip();

  for (const image of images) {
    // Convert data URL to blob
    const response = await fetch(image.dataUrl);
    const blob = await response.blob();
    const filename = `${baseName}_page_${image.pageNumber}_${image.index}.${image.format.toLowerCase()}`;
    zip.file(filename, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${baseName}_images.zip`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
