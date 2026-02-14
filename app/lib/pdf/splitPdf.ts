import { PDFDocument } from 'pdf-lib';

/**
 * Parse page range string (e.g., "1-3, 5, 8-10") into array of page indices
 * @param rangeString Page range string
 * @param totalPages Total number of pages in PDF
 * @returns Array of page indices (0-based)
 */
export function parsePageRange(rangeString: string, totalPages: number): number[] {
  const pages: number[] = [];
  const parts = rangeString.split(',').map(p => p.trim()).filter(p => p.length > 0);

  for (const part of parts) {
    if (part.includes('-')) {
      // Range like "1-3"
      const [start, end] = part.split('-').map(s => parseInt(s.trim(), 10));
      if (isNaN(start) || isNaN(end)) {
        throw new Error(`Invalid range: ${part}`);
      }
      // Convert to 0-based and ensure valid range
      const startIdx = Math.max(0, Math.min(start - 1, totalPages - 1));
      const endIdx = Math.max(0, Math.min(end - 1, totalPages - 1));
      
      if (startIdx > endIdx) {
        throw new Error(`Invalid range: start (${start}) must be <= end (${end})`);
      }
      
      for (let i = startIdx; i <= endIdx; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    } else {
      // Single page number
      const pageNum = parseInt(part, 10);
      if (isNaN(pageNum)) {
        throw new Error(`Invalid page number: ${part}`);
      }
      // Convert to 0-based
      const pageIdx = Math.max(0, Math.min(pageNum - 1, totalPages - 1));
      if (!pages.includes(pageIdx)) {
        pages.push(pageIdx);
      }
    }
  }

  return pages.sort((a, b) => a - b);
}

/**
 * Split a PDF into multiple PDFs based on page ranges
 * @param file PDF file to split
 * @param ranges Array of page ranges (each range is an array of page indices)
 * @returns Array of PDF bytes (Uint8Array) for each split
 */
export async function splitPdf(
  file: File,
  ranges: number[][]
): Promise<Uint8Array[]> {
  if (ranges.length === 0) {
    throw new Error('At least one page range is required');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  // Validate all ranges
  for (const range of ranges) {
    for (const pageIdx of range) {
      if (pageIdx < 0 || pageIdx >= totalPages) {
        throw new Error(`Page index ${pageIdx + 1} is out of range (1-${totalPages})`);
      }
    }
  }

  const splitPdfs: Uint8Array[] = [];

  // Create a PDF for each range
  for (const range of ranges) {
    const newPdf = await PDFDocument.create();
    
    // Copy pages from source PDF
    const copiedPages = await newPdf.copyPages(sourcePdf, range);
    
    // Add pages to new PDF
    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    // Save the PDF
    const pdfBytes = await newPdf.save();
    splitPdfs.push(pdfBytes);
  }

  return splitPdfs;
}

/**
 * Download multiple PDF files one by one
 * @param pdfFiles Array of objects with bytes and filename
 * @param delayMs Delay between downloads in milliseconds (default: 1500ms)
 */
export async function downloadSplitPdfs(
  pdfFiles: Array<{ bytes: Uint8Array; filename: string }>,
  delayMs: number = 1500
): Promise<void> {
  console.log(`Starting download of ${pdfFiles.length} files`);
  
  // Download files sequentially with delay
  for (let i = 0; i < pdfFiles.length; i++) {
    const file = pdfFiles[i];
    console.log(`Downloading file ${i + 1}/${pdfFiles.length}: ${file.filename}`);
    
    try {
      // @ts-ignore - Uint8Array is compatible with Blob constructor
      const blob = new Blob([file.bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Clean up immediately after click
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      // Wait before next download (except for last file)
      if (i < pdfFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`Error downloading ${file.filename}:`, error);
      // Continue with next file even if one fails
    }
  }
  
  console.log('All downloads initiated');
}

/**
 * Download a single PDF file
 * @param pdfBytes PDF bytes to download
 * @param filename Filename for the download
 */
export function downloadSplitPdf(pdfBytes: Uint8Array, filename: string): void {
  try {
    // @ts-ignore - Uint8Array is compatible with Blob constructor
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}
