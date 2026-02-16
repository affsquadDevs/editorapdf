import { PDFDocument, rgb, PDFPage, PDFFont, degrees } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface WatermarkOptions {
  text?: string; // Watermark text
  image?: File; // Watermark image
  pageRange?: string; // Pages to apply watermark (default: all)
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'diagonal';
  opacity?: number; // 0-1
  rotation?: number; // Rotation angle in degrees
  fontSize?: number; // For text watermarks
  color?: { r: number; g: number; b: number }; // RGB color
}

/**
 * Add watermark to PDF
 */
export async function addWatermark(
  file: File,
  options: WatermarkOptions = {}
): Promise<Uint8Array> {
  const {
    text,
    image,
    pageRange,
    position = 'diagonal',
    opacity = 0.3,
    rotation = -45,
    fontSize = 48,
    color = { r: 0.7, g: 0.7, b: 0.7 },
  } = options;

  if (!text && !image) {
    throw new Error('Either text or image must be provided for watermark');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToWatermark: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToWatermark = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToWatermark = parsePageRange(pageRange, totalPages).map(p => p - 1); // Convert to 0-based
  }

  // Load watermark image if provided
  let watermarkImage: Uint8Array | null = null;
  if (image) {
    const imageArrayBuffer = await image.arrayBuffer();
    watermarkImage = new Uint8Array(imageArrayBuffer);
  }

  // Apply watermark to each page
  for (const pageIndex of pagesToWatermark) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    if (text) {
      // Text watermark
      const font = await pdfDoc.embedFont('Helvetica');
      
      // Calculate position
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textHeight = fontSize;
      
      let x = 0;
      let y = 0;
      
      switch (position) {
        case 'center':
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
          break;
        case 'top-left':
          x = width * 0.1;
          y = height * 0.9;
          break;
        case 'top-right':
          x = width * 0.9 - textWidth;
          y = height * 0.9;
          break;
        case 'bottom-left':
          x = width * 0.1;
          y = height * 0.1;
          break;
        case 'bottom-right':
          x = width * 0.9 - textWidth;
          y = height * 0.1;
          break;
        case 'diagonal':
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
          break;
      }

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        color: rgb(color.r, color.g, color.b),
        opacity,
        rotate: degrees(rotation),
      });
    } else if (watermarkImage && image) {
      // Image watermark
      let imageEmbed: any;
      const imageType = image.type;
      
      if (imageType === 'image/png') {
        imageEmbed = await pdfDoc.embedPng(watermarkImage);
      } else if (imageType === 'image/jpeg' || imageType === 'image/jpg') {
        imageEmbed = await pdfDoc.embedJpg(watermarkImage);
      } else {
        throw new Error('Unsupported image format. Use PNG or JPEG.');
      }

      const imageDims = imageEmbed.scale(0.5); // Scale to 50% of original
      
      let x = 0;
      let y = 0;
      
      switch (position) {
        case 'center':
          x = (width - imageDims.width) / 2;
          y = (height - imageDims.height) / 2;
          break;
        case 'top-left':
          x = width * 0.1;
          y = height * 0.9 - imageDims.height;
          break;
        case 'top-right':
          x = width * 0.9 - imageDims.width;
          y = height * 0.9 - imageDims.height;
          break;
        case 'bottom-left':
          x = width * 0.1;
          y = height * 0.1;
          break;
        case 'bottom-right':
          x = width * 0.9 - imageDims.width;
          y = height * 0.1;
          break;
        case 'diagonal':
          x = (width - imageDims.width) / 2;
          y = (height - imageDims.height) / 2;
          break;
      }

      page.drawImage(imageEmbed, {
        x,
        y,
        width: imageDims.width,
        height: imageDims.height,
        opacity,
        rotate: degrees(rotation),
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Download watermarked PDF
 */
export function downloadWatermarkedPdf(pdfBytes: Uint8Array, filename: string): void {
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
