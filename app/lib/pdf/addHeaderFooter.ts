import { PDFDocument, rgb } from 'pdf-lib';
import { parsePageRange } from './splitPdf';

export interface HeaderFooterOptions {
  headerText?: string;
  footerText?: string;
  headerImage?: File;
  footerImage?: File;
  pageRange?: string;
  fontSize?: number;
  includePageNumbers?: boolean;
  pageNumberFormat?: string;
}

/**
 * Add header and footer to PDF
 */
export async function addHeaderFooter(
  file: File,
  options: HeaderFooterOptions = {}
): Promise<Uint8Array> {
  const {
    headerText,
    footerText,
    headerImage,
    footerImage,
    pageRange,
    fontSize = 10,
    includePageNumbers = false,
    pageNumberFormat = '{page}',
  } = options;

  if (!headerText && !footerText && !headerImage && !footerImage && !includePageNumbers) {
    throw new Error('At least one header or footer element must be provided');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Parse page range
  let pagesToModify: number[] = [];
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    pagesToModify = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    pagesToModify = parsePageRange(pageRange, totalPages).map(p => p - 1);
  }

  const font = await pdfDoc.embedFont('Helvetica');

  // Load images if provided
  let headerImgEmbed: any = null;
  let footerImgEmbed: any = null;

  if (headerImage) {
    const imgArrayBuffer = await headerImage.arrayBuffer();
    const imgBytes = new Uint8Array(imgArrayBuffer);
    if (headerImage.type === 'image/png') {
      headerImgEmbed = await pdfDoc.embedPng(imgBytes);
    } else if (headerImage.type === 'image/jpeg' || headerImage.type === 'image/jpg') {
      headerImgEmbed = await pdfDoc.embedJpg(imgBytes);
    }
  }

  if (footerImage) {
    const imgArrayBuffer = await footerImage.arrayBuffer();
    const imgBytes = new Uint8Array(imgArrayBuffer);
    if (footerImage.type === 'image/png') {
      footerImgEmbed = await pdfDoc.embedPng(imgBytes);
    } else if (footerImage.type === 'image/jpeg' || footerImage.type === 'image/jpg') {
      footerImgEmbed = await pdfDoc.embedJpg(imgBytes);
    }
  }

  // Add header and footer to each page
  for (let i = 0; i < pagesToModify.length; i++) {
    const pageIndex = pagesToModify[i];
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();

    // Header
    if (headerText) {
      const headerY = height - 30;
      page.drawText(headerText, {
        x: 50,
        y: headerY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    }

    if (headerImgEmbed) {
      const imgDims = headerImgEmbed.scale(0.1);
      page.drawImage(headerImgEmbed, {
        x: 50,
        y: height - imgDims.height - 20,
        width: imgDims.width,
        height: imgDims.height,
      });
    }

    // Footer
    if (footerText) {
      page.drawText(footerText, {
        x: 50,
        y: 30,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    }

    if (footerImgEmbed) {
      const imgDims = footerImgEmbed.scale(0.1);
      page.drawImage(footerImgEmbed, {
        x: 50,
        y: 20,
        width: imgDims.width,
        height: imgDims.height,
      });
    }

    // Page numbers
    if (includePageNumbers) {
      const pageNumber = i + 1;
      const pageText = pageNumberFormat.replace(/{page}/g, String(pageNumber));
      const textWidth = font.widthOfTextAtSize(pageText, fontSize);
      page.drawText(pageText, {
        x: width - textWidth - 50,
        y: 30,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Download PDF with header/footer
 */
export function downloadHeaderFooterPdf(pdfBytes: Uint8Array, filename: string): void {
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
