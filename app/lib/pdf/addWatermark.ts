import { PDFDocument, rgb, PDFPage, PDFFont, degrees, StandardFonts } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface WatermarkConfig {
  id: string;
  type: 'text' | 'image';
  text?: string;
  imageFile?: File;
  imageDataUrl?: string;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'diagonal' | 'custom';
  customX?: number; // 0-1 for custom position
  customY?: number; // 0-1 for custom position
  opacity: number; // 0-100
  rotation: number; // degrees
  fontSize?: number; // for text watermarks
  color?: { r: number; g: number; b: number }; // RGB 0-1
  scale?: number; // for image watermarks (0-1)
  pages?: number[]; // Specific pages to apply this watermark (1-based). If not set, applies to all pages
}

export interface WatermarkOptions {
  watermarks?: WatermarkConfig[]; // Array of watermarks to apply
  pageRange?: string; // Pages to apply watermark (default: all)
  // Legacy support for single watermark
  text?: string;
  image?: File;
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'diagonal';
  opacity?: number; // 0-1
  rotation?: number;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

/**
 * Calculate watermark position based on position type
 */
function calculateWatermarkPosition(
  position: WatermarkConfig['position'],
  width: number,
  height: number,
  watermarkWidth: number,
  watermarkHeight: number,
  customX?: number,
  customY?: number
): { x: number; y: number } {
  if (position === 'custom' && customX !== undefined && customY !== undefined) {
    return {
      x: customX * width,
      y: customY * height,
    };
  }

  switch (position) {
    case 'center':
      return {
        x: width / 2, // Center X
        y: height / 2, // Center Y
      };
    case 'top-left':
      return {
        x: width * 0.1, // Center X of watermark at 10% from left
        y: height * 0.9, // Center Y of watermark at 90% from bottom
      };
    case 'top-right':
      return {
        x: width * 0.9, // Center X of watermark at 90% from left
        y: height * 0.9, // Center Y of watermark at 90% from bottom
      };
    case 'bottom-left':
      return {
        x: width * 0.1, // Center X of watermark at 10% from left
        y: height * 0.1, // Center Y of watermark at 10% from bottom
      };
    case 'bottom-right':
      return {
        x: width * 0.9, // Center X of watermark at 90% from left
        y: height * 0.1, // Center Y of watermark at 10% from bottom
      };
    case 'diagonal':
      return {
        x: width / 2, // Center X
        y: height / 2, // Center Y
      };
    default:
      return {
        x: width / 2, // Center X
        y: height / 2, // Center Y
      };
  }
}

/**
 * Add watermark to PDF
 */
export async function addWatermark(
  file: File,
  options: WatermarkOptions = {}
): Promise<Uint8Array> {
  // Support both new (watermarks array) and legacy (single watermark) formats
  let watermarks: WatermarkConfig[] = [];
  
  if (options.watermarks && options.watermarks.length > 0) {
    // New format: multiple watermarks
    watermarks = options.watermarks;
  } else if (options.text || options.image) {
    // Legacy format: single watermark
    watermarks = [{
      id: 'legacy-1',
      type: options.text ? 'text' : 'image',
      text: options.text,
      imageFile: options.image,
      position: options.position || 'diagonal',
      opacity: (options.opacity || 0.3) * 100,
      rotation: options.rotation || -45,
      fontSize: options.fontSize || 48,
      color: options.color || { r: 0.7, g: 0.7, b: 0.7 },
      scale: 0.5,
    }];
  } else {
    throw new Error('Either watermarks array or text/image must be provided');
  }

  if (watermarks.length === 0) {
    throw new Error('At least one watermark must be provided');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToWatermark: number[] = [];
  if (!options.pageRange || options.pageRange.trim() === '' || options.pageRange.toLowerCase() === 'all') {
    pagesToWatermark = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToWatermark = parsePageRange(options.pageRange, totalPages).map(p => p - 1); // Convert to 0-based
  }

  // Embed fonts and images once
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const embeddedImages: Map<string, any> = new Map();
  
  // Get font metrics for accurate text positioning
  // Helvetica baseline is approximately at 0.2 * fontSize from bottom
  // To center text vertically: centerY - fontSize/2 + baselineOffset
  const getTextBaselineY = (centerY: number, fontSize: number): number => {
    // For Helvetica, baseline is roughly at 20% of fontSize from bottom
    // To center: subtract half height and add baseline offset
    const baselineOffset = fontSize * 0.2;
    return centerY - fontSize / 2 + baselineOffset;
  };

  // Pre-process image watermarks
  for (const watermark of watermarks) {
    if (watermark.type === 'image') {
      let imageBytes: Uint8Array;
      let imageType: string;
      
      if (watermark.imageFile) {
        // Use imageFile if available
        const imageArrayBuffer = await watermark.imageFile.arrayBuffer();
        imageBytes = new Uint8Array(imageArrayBuffer);
        imageType = watermark.imageFile.type;
      } else if (watermark.imageDataUrl) {
        // Use imageDataUrl if imageFile is not available (e.g., loaded from localStorage)
        const base64Data = watermark.imageDataUrl.split(',')[1] || watermark.imageDataUrl;
        const binaryString = atob(base64Data);
        imageBytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          imageBytes[i] = binaryString.charCodeAt(i);
        }
        // Detect image type from data URL
        if (watermark.imageDataUrl.includes('image/png')) {
          imageType = 'image/png';
        } else if (watermark.imageDataUrl.includes('image/jpeg') || watermark.imageDataUrl.includes('image/jpg')) {
          imageType = 'image/jpeg';
        } else {
          throw new Error('Unsupported image format. Use PNG or JPEG.');
        }
      } else {
        continue; // Skip if no image data
      }
      
      let imageEmbed: any;
      if (imageType === 'image/png') {
        imageEmbed = await pdfDoc.embedPng(imageBytes);
      } else if (imageType === 'image/jpeg' || imageType === 'image/jpg') {
        imageEmbed = await pdfDoc.embedJpg(imageBytes);
      } else {
        throw new Error('Unsupported image format. Use PNG or JPEG.');
      }
      
      embeddedImages.set(watermark.id, imageEmbed);
    }
  }

  // Apply all watermarks to each page
  for (const pageIndex of pagesToWatermark) {
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();
    const pageNumber = pageIndex + 1; // Convert to 1-based

    for (const watermark of watermarks) {
      // Check if this watermark should be applied to this page
      if (watermark.pages && watermark.pages.length > 0) {
        // If watermark has specific pages, only apply if this page is in the list
        if (!watermark.pages.includes(pageNumber)) {
          continue;
        }
      }
      // Otherwise, apply to all pages (default behavior)
      if (watermark.type === 'text' && watermark.text) {
        // Text watermark
        const fontSize = watermark.fontSize || 48;
        const textWidth = font.widthOfTextAtSize(watermark.text, fontSize);
        const textHeight = fontSize;
        
        const pos = calculateWatermarkPosition(
          watermark.position,
          width,
          height,
          textWidth,
          textHeight,
          watermark.customX,
          watermark.customY
        );

        // In preview: pos is center (0-1), we use translate(-50%, -50%)
        // calculateWatermarkPosition returns center in PDF coordinates
        // pdf-lib drawText uses baseline (bottom of text) as Y coordinate
        // For horizontal centering: X = centerX - textWidth/2
        const textX = pos.x - textWidth / 2;
        // For vertical centering: pdf-lib baseline is at bottom of text
        // To center: Y = centerY - fontSize/2 + (fontSize * 0.2) where 0.2 is approximate baseline ratio
        // Simplified: Y = centerY - fontSize * 0.3
        const textY = pos.y - fontSize * 0.3;
        
        page.drawText(watermark.text, {
          x: textX,
          y: textY,
          size: fontSize,
          color: rgb(
            watermark.color?.r || 0.7,
            watermark.color?.g || 0.7,
            watermark.color?.b || 0.7
          ),
          opacity: watermark.opacity / 100,
          rotate: degrees(watermark.rotation),
        });
      } else if (watermark.type === 'image') {
        // Image watermark
        const imageEmbed = embeddedImages.get(watermark.id);
        if (!imageEmbed) continue;

        const scale = watermark.scale || 0.5;
        const imageDims = imageEmbed.scale(scale);
        
        const pos = calculateWatermarkPosition(
          watermark.position,
          width,
          height,
          imageDims.width,
          imageDims.height,
          watermark.customX,
          watermark.customY
        );

        // In preview, pos is the center position (0-1), and we use translate(-50%, -50%)
        // In PDF, calculateWatermarkPosition returns center position in PDF coordinates
        // pdf-lib drawImage uses bottom-left origin, so we need to adjust for centering
        // Subtract half width/height to get bottom-left corner from center
        const imageX = pos.x - imageDims.width / 2;
        const imageY = pos.y - imageDims.height / 2;
        
        page.drawImage(imageEmbed, {
          x: imageX,
          y: imageY,
          width: imageDims.width,
          height: imageDims.height,
          opacity: watermark.opacity / 100,
          rotate: degrees(watermark.rotation),
        });
      }
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
