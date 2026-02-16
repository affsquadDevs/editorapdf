import { PDFDocument } from 'pdf-lib';

export interface ImagesToPdfOptions {
  pageSize?: 'A4' | 'Letter' | 'A3' | 'A5' | 'Custom';
  orientation?: 'portrait' | 'landscape';
  fitToPage?: boolean; // If true, images are scaled to fit page; if false, page is sized to image
  margin?: number; // Margin in points (1 point = 1/72 inch)
  customWidth?: number; // Custom width in points (only if pageSize is 'Custom')
  customHeight?: number; // Custom height in points (only if pageSize is 'Custom')
}

/**
 * Convert images to PDF
 */
export async function imagesToPdf(
  imageFiles: File[],
  options: ImagesToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    pageSize = 'A4',
    orientation = 'portrait',
    fitToPage = true,
    margin = 0,
    customWidth,
    customHeight,
  } = options;

  if (imageFiles.length === 0) {
    throw new Error('No image files provided');
  }

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Define page dimensions based on page size
  const getPageDimensions = (): { width: number; height: number } => {
    if (pageSize === 'Custom' && customWidth && customHeight) {
      return { width: customWidth, height: customHeight };
    }

    // Standard page sizes in points (1 point = 1/72 inch)
    const dimensions: Record<string, { width: number; height: number }> = {
      A4: { width: 595, height: 842 },
      Letter: { width: 612, height: 792 },
      A3: { width: 842, height: 1191 },
      A5: { width: 420, height: 595 },
    };

    const dims = dimensions[pageSize] || dimensions.A4;
    return orientation === 'landscape'
      ? { width: dims.height, height: dims.width }
      : dims;
  };

  const pageDims = getPageDimensions();
  const availableWidth = pageDims.width - margin * 2;
  const availableHeight = pageDims.height - margin * 2;

  // Process each image
  for (const imageFile of imageFiles) {
    try {
      // Read image file
      const arrayBuffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Embed image based on type
      let embeddedImage;
      const mimeType = imageFile.type.toLowerCase();

      if (mimeType.includes('png')) {
        embeddedImage = await pdfDoc.embedPng(uint8Array);
      } else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
        embeddedImage = await pdfDoc.embedJpg(uint8Array);
      } else if (mimeType.includes('webp')) {
        // WebP support - try to embed as PNG (pdf-lib doesn't support WebP directly)
        // Convert WebP to canvas first
        const img = new Image();
        const blob = new Blob([uint8Array], { type: 'image/webp' });
        const url = URL.createObjectURL(blob);
        
        embeddedImage = await new Promise<any>((resolve, reject) => {
          img.onload = async () => {
            try {
              // Create canvas and convert to PNG
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                URL.revokeObjectURL(url);
                reject(new Error('Could not get canvas context'));
                return;
              }
              ctx.drawImage(img, 0, 0);
              
              const pngBlob = await new Promise<Blob>((blobResolve, blobReject) => {
                canvas.toBlob((blob) => {
                  if (!blob) {
                    blobReject(new Error('Failed to convert WebP to PNG'));
                  } else {
                    blobResolve(blob);
                  }
                }, 'image/png');
              });
              
              const buffer = await pngBlob.arrayBuffer();
              const pngImage = await pdfDoc.embedPng(new Uint8Array(buffer));
              URL.revokeObjectURL(url);
              resolve(pngImage);
            } catch (err) {
              URL.revokeObjectURL(url);
              reject(err);
            }
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load WebP image'));
          };
          img.src = url;
        });
      } else {
        // Try PNG first, then JPEG
        try {
          embeddedImage = await pdfDoc.embedPng(uint8Array);
        } catch {
          try {
            embeddedImage = await pdfDoc.embedJpg(uint8Array);
          } catch {
            throw new Error(`Unsupported image format: ${imageFile.type || imageFile.name}`);
          }
        }
      }

      // Get image dimensions
      const imageDims = embeddedImage.scale(1);

      // Calculate dimensions for the image on the page
      let imageWidth: number;
      let imageHeight: number;
      let pageWidth: number;
      let pageHeight: number;

      if (fitToPage) {
        // Scale image to fit within available page area
        const scaleX = availableWidth / imageDims.width;
        const scaleY = availableHeight / imageDims.height;
        const scale = Math.min(scaleX, scaleY, 1); // Don't scale up

        imageWidth = imageDims.width * scale;
        imageHeight = imageDims.height * scale;
        pageWidth = pageDims.width;
        pageHeight = pageDims.height;
      } else {
        // Page size matches image size (with optional margin)
        imageWidth = imageDims.width;
        imageHeight = imageDims.height;
        pageWidth = imageDims.width + margin * 2;
        pageHeight = imageDims.height + margin * 2;
      }

      // Create a new page
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Calculate position to center image (if fitToPage) or add margin
      const x = fitToPage
        ? margin + (availableWidth - imageWidth) / 2
        : margin;
      const y = fitToPage
        ? pageHeight - margin - imageHeight - (availableHeight - imageHeight) / 2
        : pageHeight - margin - imageHeight;

      // Draw image on page
      page.drawImage(embeddedImage, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      });
    } catch (err) {
      console.error(`Error processing image ${imageFile.name}:`, err);
      throw new Error(`Failed to process image ${imageFile.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  // Generate PDF bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Download PDF file
 */
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
