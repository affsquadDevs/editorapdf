import { PDFDocument, rgb } from 'pdf-lib';

export interface WordToPdfOptions {
  preserveFormatting?: boolean;
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Check if file is a valid DOCX file (ZIP archive with specific signature)
 */
function isValidDocx(arrayBuffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(arrayBuffer);
  // DOCX files start with ZIP signature: PK\x03\x04 (most common) or PK\x05\x06 (empty archive)
  // Also check for PK\x07\x08 (spanned archive) and PK\x30\x30 (data descriptor)
  if (bytes.length < 4) return false;
  
  // Standard ZIP signatures
  const isZip = bytes[0] === 0x50 && bytes[1] === 0x4B; // "PK"
  if (!isZip) return false;
  
  // Check for various ZIP local file header signatures
  const zipSignatures = [
    [0x03, 0x04], // Local file header
    [0x05, 0x06], // Empty archive
    [0x07, 0x08], // Spanned archive
    [0x30, 0x30], // Data descriptor
  ];
  
  return zipSignatures.some(sig => bytes[2] === sig[0] && bytes[3] === sig[1]);
}

/**
 * Check if file is an old DOC format (OLE2 compound document)
 */
function isOldDocFormat(arrayBuffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(arrayBuffer);
  // Old DOC files start with OLE2 signature: D0 CF 11 E0 A1 B1 1A E1
  if (bytes.length < 8) return false;
  return bytes[0] === 0xD0 && bytes[1] === 0xCF && 
         bytes[2] === 0x11 && bytes[3] === 0xE0 &&
         bytes[4] === 0xA1 && bytes[5] === 0xB1 &&
         bytes[6] === 0x1A && bytes[7] === 0xE1;
}

/**
 * Convert Word (DOCX) to PDF
 * Note: Only DOCX format is supported. Old DOC format is not supported.
 */
export async function wordToPdf(
  file: File,
  options: WordToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    preserveFormatting = true,
    pageSize = 'A4',
    orientation = 'portrait',
  } = options;

  // Validate file type by extension
  const fileName = file.name.toLowerCase();
  const isDocx = fileName.endsWith('.docx');
  const isDoc = fileName.endsWith('.doc');
  
  if (!isDocx && !isDoc) {
    throw new Error('Unsupported file format. Please upload a .doc or .docx file.');
  }

  // Read Word document
  const arrayBuffer = await file.arrayBuffer();
  
  // Validate file format by content
  if (isOldDocFormat(arrayBuffer)) {
    throw new Error('Old DOC format (.doc) is not supported. Please convert your document to DOCX format first, or use Microsoft Word to save it as DOCX.');
  }
  
  // Check if file is valid DOCX (ZIP format)
  if (!isValidDocx(arrayBuffer)) {
    // Get first few bytes for better error message
    const bytes = new Uint8Array(arrayBuffer.slice(0, 8));
    const hexSignature = Array.from(bytes).map(b => `\\x${b.toString(16).padStart(2, '0')}`).join('');
    throw new Error(`Invalid or corrupted DOCX file. The file does not appear to be a valid Word document. Expected ZIP signature (PK), but found: ${hexSignature}. Please ensure you are uploading a valid .docx file.`);
  }

  // Try to import mammoth
  let mammoth: any;
  try {
    mammoth = await import('mammoth');
  } catch (err) {
    throw new Error('mammoth library is not installed. Please run: npm install mammoth');
  }

  try {
    // Convert DOCX to HTML
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    
    // Check for warnings
    if (result.messages && result.messages.length > 0) {
      console.warn('Conversion warnings:', result.messages);
    }

    // Create PDF from HTML content
    const pdfDoc = await PDFDocument.create();

  // Page dimensions
  const pageDimensions: { [key: string]: { width: number; height: number } } = {
    A4: { width: 595, height: 842 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
  };

  const dimensions = pageDimensions[pageSize];
  if (orientation === 'landscape') {
    [dimensions.width, dimensions.height] = [dimensions.height, dimensions.width];
  }

  const page = pdfDoc.addPage([dimensions.width, dimensions.height]);

  // Extract text from HTML (simplified)
  const textContent = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Add text to PDF
  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const margin = 50;
  const maxWidth = dimensions.width - margin * 2;
  const maxHeight = dimensions.height - margin * 2;
  
  const words = textContent.split(' ');
  let currentPage = page;
  let y = dimensions.height - margin;
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const estimatedWidth = testLine.length * fontSize * 0.6;

    if (estimatedWidth > maxWidth && currentLine) {
      currentPage.drawText(currentLine, {
        x: margin,
        y: y,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
      currentLine = word;

      if (y < margin) {
        currentPage = pdfDoc.addPage([dimensions.width, dimensions.height]);
        y = dimensions.height - margin;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    currentPage.drawText(currentLine, {
      x: margin,
      y: y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  return await pdfDoc.save();
  } catch (err: any) {
    // Handle mammoth-specific errors
    const errorMessage = err?.message || String(err) || 'Unknown error';
    
    // Check for various mammoth error patterns
    if (errorMessage.includes('Corrupted zip') || 
        errorMessage.includes('unexpected signature') ||
        errorMessage.includes('bug: unexpected signature') ||
        errorMessage.includes('not a zip file') ||
        errorMessage.includes('Expected') && errorMessage.includes('signature')) {
      throw new Error('Invalid DOCX file format. The file may be corrupted, in an unsupported format, or not a valid Word document. Please ensure you are uploading a valid .docx file created with Microsoft Word or compatible software.');
    }
    
    // Re-throw our custom errors as-is
    if (err instanceof Error && (
      err.message.includes('Old DOC format') ||
      err.message.includes('Invalid or corrupted DOCX') ||
      err.message.includes('Unsupported file format')
    )) {
      throw err;
    }
    
    // For other errors, provide a user-friendly message
    throw new Error(`Failed to convert Word document to PDF: ${errorMessage}`);
  }
}

/**
 * Download PDF file
 */
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
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
