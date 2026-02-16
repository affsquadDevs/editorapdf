import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import type { PdfPage, TextOverlay, ImageOverlay, ShapeOverlay } from '@/app/store/pdfStore';

/**
 * Export edited PDF with all modifications applied
 */
export async function exportPdf(
  originalFile: File,
  pages: PdfPage[]
): Promise<Uint8Array> {
  const arrayBuffer = await originalFile.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer);
  const pdfDoc = await PDFDocument.create();
  
  // Embed all standard fonts with variants
  const fonts: Record<string, any> = {
    Helvetica: await pdfDoc.embedFont(StandardFonts.Helvetica),
    'Helvetica-Bold': await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    'Helvetica-Oblique': await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
    'Helvetica-BoldOblique': await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique),
    Times: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    'Times-Bold': await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
    'Times-Italic': await pdfDoc.embedFont(StandardFonts.TimesRomanItalic),
    'Times-BoldItalic': await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic),
    Courier: await pdfDoc.embedFont(StandardFonts.Courier),
    'Courier-Bold': await pdfDoc.embedFont(StandardFonts.CourierBold),
    'Courier-Oblique': await pdfDoc.embedFont(StandardFonts.CourierOblique),
    'Courier-BoldOblique': await pdfDoc.embedFont(StandardFonts.CourierBoldOblique),
  };
  
  const activePages = pages.filter((p) => !p.deleted);
  
  for (const page of activePages) {
    const [copiedPage] = await pdfDoc.copyPages(srcPdf, [page.index]);
    
    const currentRotation = copiedPage.getRotation().angle;
    copiedPage.setRotation(degrees(currentRotation + page.rotation));
    
    pdfDoc.addPage(copiedPage);
    
    const { width, height } = copiedPage.getSize();
    
    // Apply text overlays
    for (const overlay of page.overlays.filter((o) => !o.hidden)) {
      await applyTextOverlay(copiedPage, overlay, width, height, fonts);
    }
    
    // Apply image overlays
    for (const image of page.images.filter((img) => !img.deleted)) {
      await applyImageOverlay(pdfDoc, copiedPage, image, width, height);
    }
    
    // Apply shape overlays
    for (const shape of page.shapes) {
      applyShapeOverlay(copiedPage, shape, width, height);
    }
  }
  
  return pdfDoc.save();
}

/**
 * Get appropriate PDF font based on family, weight, and style
 */
function getPdfFont(fonts: Record<string, any>, overlay: TextOverlay): any {
  const family = overlay.fontFamily || 'Helvetica';
  const weight = overlay.fontWeight || 'normal';
  const style = overlay.fontStyle || 'normal';
  
  let baseName = 'Helvetica';
  if (family.toLowerCase().includes('san francisco') || family.toLowerCase().includes('sf pro')) {
    // San Francisco maps to Helvetica for PDF export (pdf-lib only supports standard fonts)
    baseName = 'Helvetica';
  } else if (family.toLowerCase().includes('times') || family.toLowerCase().includes('georgia')) {
    baseName = 'Times';
  } else if (family.toLowerCase().includes('courier')) {
    baseName = 'Courier';
  }
  
  let fontKey = baseName;
  if (weight === 'bold' && style === 'italic') {
    fontKey += baseName === 'Helvetica' ? '-BoldOblique' : baseName === 'Times' ? '-BoldItalic' : '-BoldOblique';
  } else if (weight === 'bold') {
    fontKey += '-Bold';
  } else if (style === 'italic') {
    fontKey += baseName === 'Helvetica' ? '-Oblique' : baseName === 'Times' ? '-Italic' : '-Oblique';
  }
  
  return fonts[fontKey] || fonts.Helvetica;
}

/**
 * Apply a text overlay to a PDF page
 */
async function applyTextOverlay(
  page: any,
  overlay: TextOverlay,
  pageWidth: number,
  pageHeight: number,
  fonts: Record<string, any>
): Promise<void> {
  if (overlay.isOriginal && !overlay.hidden) {
    return;
  }
  
  const font = getPdfFont(fonts, overlay);
  
  // Draw background box if backgroundColor is set
  if (overlay.backgroundColor) {
    const boxX = overlay.x * pageWidth;
    const boxY = pageHeight - (overlay.y * pageHeight) - ((overlay.boxHeight || 0.05) * pageHeight);
    const boxW = (overlay.boxWidth || 0.25) * pageWidth;
    const boxH = (overlay.boxHeight || 0.05) * pageHeight;
    
    const bgColor = hexToRgb(overlay.backgroundColor);
    page.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxW,
      height: boxH,
      color: rgb(bgColor.r / 255, bgColor.g / 255, bgColor.b / 255),
      borderWidth: 0,
    });
  }
  
  // Calculate text position with padding
  const padding = 4;
  const x = overlay.x * pageWidth + padding;
  const boxWidth = (overlay.boxWidth || 0.25) * pageWidth - (padding * 2);
  
  const color = hexToRgb(overlay.color);
  const lines = overlay.text.split('\n');
  let fontSize = overlay.fontSize;
  
  // Auto-reduce font size if text doesn't fit in box
  if (overlay.backgroundColor && boxWidth > 0) {
    let maxLineWidth = 0;
    for (const line of lines) {
      if (line.trim()) {
        const lineWidth = font.widthOfTextAtSize(line, fontSize);
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
      }
    }
    
    while (maxLineWidth > boxWidth && fontSize > 6) {
      fontSize -= 0.5;
      maxLineWidth = 0;
      for (const line of lines) {
        if (line.trim()) {
          const lineWidth = font.widthOfTextAtSize(line, fontSize);
          maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }
      }
    }
  }
  
  // Draw text lines
  let currentY = pageHeight - (overlay.y * pageHeight) - fontSize - padding;
  const lineHeight = fontSize * 1.4;
  
  for (const line of lines) {
    if (line.trim()) {
      page.drawText(line, {
        x,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(color.r / 255, color.g / 255, color.b / 255),
      });
    }
    currentY -= lineHeight;
  }
}

/**
 * Apply an image overlay to a PDF page
 */
async function applyImageOverlay(
  pdfDoc: any,
  page: any,
  image: ImageOverlay,
  pageWidth: number,
  pageHeight: number
): Promise<void> {
  try {
    const imageBytes = dataUrlToBytes(image.dataUrl);
    
    let embeddedImage;
    if (image.dataUrl.includes('image/png')) {
      embeddedImage = await pdfDoc.embedPng(imageBytes);
    } else if (image.dataUrl.includes('image/jpeg') || image.dataUrl.includes('image/jpg')) {
      embeddedImage = await pdfDoc.embedJpg(imageBytes);
    } else {
      embeddedImage = await pdfDoc.embedPng(imageBytes);
    }
    
    const x = image.x * pageWidth;
    const y = pageHeight - (image.y * pageHeight) - (image.height * pageHeight);
    const width = image.width * pageWidth;
    const height = image.height * pageHeight;
    const rotation = image.rotation || 0;
    
    if (rotation !== 0) {
      // Calculate center point for rotation
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      
      // Convert rotation to radians
      const angleRad = (rotation * Math.PI) / 180;
      const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);
      
      // Create transformation matrix for rotation around center
      // PDF transformation matrix: [a b c d e f]
      // a = cos, b = sin, c = -sin, d = cos, e = tx, f = ty
      const tx = centerX - centerX * cos + centerY * sin;
      const ty = centerY - centerX * sin - centerY * cos;
      
      // Save graphics state
      page.pushGraphicsState();
      
      // Apply transformation matrix [a b c d e f] for rotation around center
      // a = cos, b = sin, c = -sin, d = cos, e = tx, f = ty
      page.pushOperators(
        page.doc.context.operators.pushGraphicsState(),
        page.doc.context.operators.transform([cos, sin, -sin, cos, tx, ty])
      );
      
      // Draw image
      page.drawImage(embeddedImage, { x, y, width, height });
      
      // Restore graphics state
      page.pushOperators(page.doc.context.operators.popGraphicsState());
      page.popGraphicsState();
    } else {
      // No rotation, draw normally
      page.drawImage(embeddedImage, { x, y, width, height });
    }
  } catch (err) {
    console.error('Error applying image overlay:', err);
  }
}

/**
 * Apply a shape overlay to a PDF page
 */
function applyShapeOverlay(
  page: any,
  shape: ShapeOverlay,
  pageWidth: number,
  pageHeight: number
): void {
  const x = shape.x * pageWidth;
  const y = pageHeight - (shape.y * pageHeight) - (shape.height * pageHeight);
  const width = shape.width * pageWidth;
  const height = shape.height * pageHeight;
  const color = hexToRgb(shape.color);
  const rgbColor = rgb(color.r / 255, color.g / 255, color.b / 255);
  const opacity = shape.opacity !== undefined ? shape.opacity : (shape.type === 'highlight' ? 0.3 : 1);
  
  const strokeEnabled = shape.type === 'highlight' ? false : shape.strokeEnabled !== false;
  const fillEnabled =
    shape.type === 'highlight'
      ? true
      : shape.fillEnabled !== undefined
        ? shape.fillEnabled
        : !!shape.fillColor;

  // Parse fill color if present
  let fillRgbColor = undefined;
  if (fillEnabled && shape.fillColor) {
    const fillColor = hexToRgb(shape.fillColor);
    fillRgbColor = rgb(fillColor.r / 255, fillColor.g / 255, fillColor.b / 255);
  }
  
  if (shape.type === 'rectangle') {
    page.drawRectangle({
      x, y, width, height,
      color: fillRgbColor,
      borderColor: strokeEnabled ? rgbColor : undefined,
      borderWidth: strokeEnabled ? (shape.lineWidth || 2) : 0,
      opacity: fillRgbColor ? opacity : 1,
      borderOpacity: strokeEnabled ? opacity : 1,
      // Note: pdf-lib doesn't support dashArray, so dashed lines won't show in export
    });
  } else if (shape.type === 'circle') {
    page.drawEllipse({
      x: x + width / 2,
      y: y + height / 2,
      xScale: width / 2,
      yScale: height / 2,
      color: fillRgbColor,
      borderColor: strokeEnabled ? rgbColor : undefined,
      borderWidth: strokeEnabled ? (shape.lineWidth || 2) : 0,
      opacity: fillRgbColor ? opacity : 1,
      borderOpacity: strokeEnabled ? opacity : 1,
    });
  } else if (shape.type === 'line') {
    if (!strokeEnabled) return;
    page.drawLine({
      start: { x, y: y + height },
      end: { x: x + width, y },
      color: rgbColor,
      thickness: shape.lineWidth || 2,
      opacity,
    });
  } else if (shape.type === 'arrow') {
    if (!strokeEnabled) return;
    // Малюємо стрілку від (x, y + height) до (x + width, y)
    const startX = x;
    const startY = y + height;
    const endX = x + width;
    const endY = y;
    
    // Малюємо основну лінію
    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
      color: rgbColor,
      thickness: shape.lineWidth || 2,
      opacity,
    });
    
    // Розраховуємо кут стрілки
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowLength = Math.min(20, Math.sqrt(width * width + height * height) / 5);
    const arrowAngle = Math.PI / 6; // 30 градусів
    
    // Верхня частина голівки стрілки
    const arrow1X = endX - arrowLength * Math.cos(angle - arrowAngle);
    const arrow1Y = endY - arrowLength * Math.sin(angle - arrowAngle);
    
    // Нижня частина голівки стрілки
    const arrow2X = endX - arrowLength * Math.cos(angle + arrowAngle);
    const arrow2Y = endY - arrowLength * Math.sin(angle + arrowAngle);
    
    page.drawLine({
      start: { x: endX, y: endY },
      end: { x: arrow1X, y: arrow1Y },
      color: rgbColor,
      thickness: shape.lineWidth || 2,
      opacity,
    });
    
    page.drawLine({
      start: { x: endX, y: endY },
      end: { x: arrow2X, y: arrow2Y },
      color: rgbColor,
      thickness: shape.lineWidth || 2,
      opacity,
    });
  } else if (shape.type === 'highlight') {
    const highlightColor = shape.fillColor ? hexToRgb(shape.fillColor) : color;
    page.drawRectangle({
      x, y, width, height,
      color: rgb(highlightColor.r / 255, highlightColor.g / 255, highlightColor.b / 255),
      opacity,
    });
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace('#', '').substring(0, 6);
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
  // @ts-ignore - Uint8Array is compatible with Blob constructor
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
