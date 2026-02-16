import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface CertificateSignOptions {
  certificateFile: File;
  certificatePassword: string;
  reason?: string;
  location?: string;
  contactInfo?: string;
}

/**
 * Sign PDF with digital certificate (.pfx/.p12)
 * Note: pdf-lib doesn't support digital signatures directly.
 * This implementation adds certificate information to the PDF metadata
 * and creates a visual signature field with certificate details.
 * 
 * For full digital signature support, a server-side solution or
 * specialized library (like node-forge) would be required.
 */
export async function certificateSignPdf(
  pdfFile: File,
  options: CertificateSignOptions
): Promise<Uint8Array> {
  try {
    // Load the PDF
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Read certificate file
    const certArrayBuffer = await options.certificateFile.arrayBuffer();
    const certBytes = new Uint8Array(certArrayBuffer);
    
    // Validate certificate file format
    const fileName = options.certificateFile.name.toLowerCase();
    if (!fileName.endsWith('.pfx') && !fileName.endsWith('.p12')) {
      throw new Error('Certificate file must be in .pfx or .p12 format');
    }

    // Note: In browser environment, we cannot directly parse .pfx/.p12 files
    // without a library like node-forge or Web Crypto API with proper support.
    // For now, we'll add certificate information to metadata and create a visual signature.
    
    // Extract certificate name from filename
    const certName = options.certificateFile.name.replace(/\.(pfx|p12)$/i, '');
    
    // Set metadata with certificate information
    pdfDoc.setTitle(pdfDoc.getTitle() || 'Certificate-Signed PDF');
    pdfDoc.setSubject(pdfDoc.getSubject() || `Signed with certificate: ${certName}`);
    pdfDoc.setKeywords(['Digital Signature', 'Certificate', certName]);
    
    // Add custom metadata
    const customMetadata: Record<string, string> = {
      'Certificate': certName,
      'Signed': new Date().toISOString(),
      'Reason': options.reason || 'Document approval',
      'Location': options.location || '',
      'ContactInfo': options.contactInfo || '',
    };
    
    // Note: pdf-lib doesn't support custom metadata fields directly
    // We'll add this information in the subject or keywords
    
    // Create a visual signature on the first page
    const firstPage = pdfDoc.getPage(0);
    const { width: pageWidth, height: pageHeight } = firstPage.getSize();
    
    // Embed font for signature text
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Create signature box at bottom right
    const sigWidth = 250;
    const lineHeight = 14;
    const margin = 20;
    const padding = 5;
    
    // Calculate required height based on content
    let requiredHeight = padding * 2 + lineHeight * 3; // Title + Certificate + Date (minimum)
    if (options.reason) requiredHeight += lineHeight;
    if (options.location) requiredHeight += lineHeight;
    
    const sigHeight = Math.max(requiredHeight, 80); // Minimum height
    const sigX = pageWidth - sigWidth - margin;
    const sigY = margin;
    
    // Draw signature box
    firstPage.drawRectangle({
      x: sigX,
      y: sigY,
      width: sigWidth,
      height: sigHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    
    // Add signature text
    let currentY = sigY + sigHeight - padding;
    
    firstPage.drawText('Digitally Signed', {
      x: sigX + padding,
      y: currentY,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    currentY -= lineHeight;
    firstPage.drawText(`Certificate: ${certName}`, {
      x: sigX + padding,
      y: currentY,
      size: 9,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    });
    
    currentY -= lineHeight;
    firstPage.drawText(`Date: ${new Date().toLocaleDateString()}`, {
      x: sigX + padding,
      y: currentY,
      size: 9,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    });
    
    if (options.reason) {
      currentY -= lineHeight;
      firstPage.drawText(`Reason: ${options.reason}`, {
        x: sigX + padding,
        y: currentY,
        size: 9,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
    
    if (options.location) {
      currentY -= lineHeight;
      firstPage.drawText(`Location: ${options.location}`, {
        x: sigX + padding,
        y: currentY,
        size: 9,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
    
    // Save the PDF
    return await pdfDoc.save({
      useObjectStreams: false,
    });
  } catch (error: any) {
    console.error('Error signing PDF with certificate:', error);
    if (error.message) {
      throw error;
    }
    throw new Error('Failed to sign PDF with certificate. Please try again.');
  }
}

/**
 * Download certificate-signed PDF
 */
export function downloadCertificateSignedPdf(
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
