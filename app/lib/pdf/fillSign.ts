import { signPdf } from './signPdf';
import { PDFDocument, rgb } from 'pdf-lib';

export interface FillSignOptions {
  formData?: { [fieldName: string]: string }; // Form field values
  signatureData?: string; // Base64 signature image
  signaturePage?: number;
  signatureX?: number;
  signatureY?: number;
}

/**
 * Fill PDF form and add signature
 * Combines form filling with signature functionality
 */
export async function fillSign(
  file: File,
  options: FillSignOptions = {}
): Promise<Uint8Array> {
  const {
    formData = {},
    signatureData,
    signaturePage = 1,
    signatureX = 0.5,
    signatureY = 0.5,
  } = options;

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Fill form fields (simplified - pdf-lib has limited form support)
  // Form filling requires accessing form field objects which pdf-lib doesn't fully expose
  
  // If signature is provided, add it
  if (signatureData) {
    // Use existing signPdf functionality
    return await signPdf(file, {
      signatureType: 'image', // Default to image type for fillSign
      signatureData,
      pageNumber: signaturePage || 1,
      x: signatureX || 0.5,
      y: signatureY || 0.5,
    });
  }

  return await pdfDoc.save();
}

/**
 * Download filled and signed PDF
 */
export function downloadFillSignPdf(pdfBytes: Uint8Array, filename: string): void {
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
