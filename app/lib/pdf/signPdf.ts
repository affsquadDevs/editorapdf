import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export interface SignatureOptions {
  signatureType: 'draw' | 'type' | 'image';
  signatureData: string; // Data URL for draw/image, text for type
  pageNumber: number; // 1-based page number
  x: number; // X position (0-1 normalized)
  y: number; // Y position (0-1 normalized)
  width?: number; // Width in points (optional, defaults to 200)
  height?: number; // Height in points (optional, defaults to 80)
  fontSize?: number; // Font size for typed signatures (optional, defaults to 24)
  fontFamily?: string; // Font family for typed signatures (optional, defaults to 'Helvetica')
}

/**
 * Convert data URL to image bytes
 */
async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
}

/**
 * Add signature to PDF
 */
export async function signPdf(
  file: File,
  options: SignatureOptions
): Promise<Uint8Array> {
  if (!options.signatureData || options.signatureData.trim().length === 0) {
    throw new Error('Signature data is required');
  }

  if (options.pageNumber < 1) {
    throw new Error('Page number must be at least 1');
  }

  try {
    // Load the PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const totalPages = pdfDoc.getPageCount();
    if (options.pageNumber > totalPages) {
      throw new Error(`Page number ${options.pageNumber} exceeds total pages (${totalPages})`);
    }

    // Get the target page (0-based index)
    const page = pdfDoc.getPage(options.pageNumber - 1);
    const { width: pageWidth, height: pageHeight } = page.getSize();

    // Calculate signature dimensions
    const sigWidth = options.width || 200;
    const sigHeight = options.height || 80;
    
    // Calculate position (convert from normalized 0-1 to PDF coordinates)
    // PDF coordinates: bottom-left is (0, 0), Y increases upward
    // options.x and options.y are normalized (0-1) where:
    // - x: 0 = left, 1 = right
    // - y: 0 = top (screen), 1 = bottom (screen)
    // We need to convert to PDF coordinates where y=0 is bottom
    const pdfX = options.x * pageWidth;
    const pdfY = (1 - options.y) * pageHeight; // Flip Y: screen top (0) -> PDF bottom (pageHeight)

    if (options.signatureType === 'draw' || options.signatureType === 'image') {
      // Handle image signature (drawn or uploaded)
      const imageBytes = await dataUrlToBytes(options.signatureData);
      
      // Embed the image
      let image;
      try {
        image = await pdfDoc.embedPng(imageBytes);
      } catch (pngError) {
        // If PNG fails, try JPEG
        try {
          image = await pdfDoc.embedJpg(imageBytes);
        } catch (jpegError) {
          throw new Error('Failed to embed image. Please ensure the image is in PNG or JPEG format.');
        }
      }

      // Get image dimensions
      const imgDims = image.scale(1);
      
      // Calculate scale to fit within specified dimensions
      const scaleX = sigWidth / imgDims.width;
      const scaleY = sigHeight / imgDims.height;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up
      
      const scaledWidth = imgDims.width * scale;
      const scaledHeight = imgDims.height * scale;
      
      // Position the signature so that the CENTER of the signature is at the clicked point
      // pdfX, pdfY represent the clicked point in PDF coordinates
      // drawImage uses bottom-left corner, so we need to adjust
      const imageX = pdfX - scaledWidth / 2;  // Center horizontally
      const imageY = pdfY - scaledHeight / 2;  // Center vertically (pdfY is from bottom)

      // Draw the image
      page.drawImage(image, {
        x: imageX,
        y: imageY,
        width: scaledWidth,
        height: scaledHeight,
      });
    } else if (options.signatureType === 'type') {
      // Handle typed signature
      const fontSize = options.fontSize || 24;
      const fontFamily = options.fontFamily || 'Helvetica';
      
      // Embed font
      let font;
      try {
        switch (fontFamily.toLowerCase()) {
          case 'helvetica':
            font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            break;
          case 'times':
            font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            break;
          case 'courier':
            font = await pdfDoc.embedFont(StandardFonts.Courier);
            break;
          default:
            font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        }
      } catch (error) {
        throw new Error('Failed to embed font');
      }

      // Draw the text signature
      // Position text so that its center is at the clicked point
      // We need to measure the text width to center it horizontally
      const textWidth = font.widthOfTextAtSize(options.signatureData, fontSize);
      const textX = pdfX - textWidth / 2; // Center horizontally
      const textY = pdfY - fontSize / 2; // Center vertically (pdfY is from bottom)
      
      page.drawText(options.signatureData, {
        x: textX,
        y: textY,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    }

    // Save the PDF
    return await pdfDoc.save();
  } catch (error: any) {
    console.error('Error signing PDF:', error);
    if (error.message) {
      throw error;
    }
    throw new Error('Failed to sign PDF. Please try again.');
  }
}

/**
 * Download signed PDF
 */
export function downloadSignedPdf(
  pdfBytes: Uint8Array,
  filename: string
): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
