import { PDFDocument } from 'pdf-lib';

/**
 * Convert size string (e.g., "10 MB") to bytes
 */
export function parseSizeToBytes(sizeStr: string): number {
  const sizeStrLower = sizeStr.trim().toUpperCase();
  const match = sizeStrLower.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB)?$/);
  
  if (!match) {
    throw new Error(`Invalid size format: ${sizeStr}`);
  }
  
  const value = parseFloat(match[1]);
  const unit = match[2] || 'B';
  
  switch (unit) {
    case 'GB':
      return Math.floor(value * 1024 * 1024 * 1024);
    case 'MB':
      return Math.floor(value * 1024 * 1024);
    case 'KB':
      return Math.floor(value * 1024);
    case 'B':
    default:
      return Math.floor(value);
  }
}

/**
 * Split a PDF into multiple PDFs based on file size limit
 * @param file PDF file to split
 * @param maxSizeBytes Maximum size in bytes for each split PDF
 * @returns Array of PDF bytes (Uint8Array) for each split
 */
export async function splitBySize(
  file: File,
  maxSizeBytes: number
): Promise<Uint8Array[]> {
  if (maxSizeBytes <= 0) {
    throw new Error('Maximum size must be greater than 0');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  if (totalPages === 0) {
    throw new Error('PDF has no pages to split');
  }

  // Check if entire PDF is smaller than max size
  const entirePdf = await PDFDocument.create();
  const allCopiedPages = await entirePdf.copyPages(
    sourcePdf,
    Array.from({ length: totalPages }, (_, i) => i)
  );
  allCopiedPages.forEach((page) => {
    entirePdf.addPage(page);
  });
  const entirePdfBytes = await entirePdf.save();

  if (entirePdfBytes.length <= maxSizeBytes) {
    // PDF is already small enough, return as single file
    return [entirePdfBytes];
  }

  const splitPdfs: Uint8Array[] = [];
  let currentPageIndex = 0;

  // Split PDF by adding pages until size limit is reached
  while (currentPageIndex < totalPages) {
    const pagesInCurrentPdf: number[] = [];
    let lastValidPdfBytes: Uint8Array | null = null;

    // Add pages one by one until we exceed the size limit
    while (currentPageIndex < totalPages) {
      // Try adding the next page
      const testPages = [...pagesInCurrentPdf, currentPageIndex];
      const testPdf = await PDFDocument.create();
      
      const copiedPages = await testPdf.copyPages(sourcePdf, testPages);
      copiedPages.forEach((page) => {
        testPdf.addPage(page);
      });
      
      const testBytes = await testPdf.save();
      const testSize = testBytes.length;

      // Check if adding this page would exceed the limit
      if (testSize > maxSizeBytes) {
        // If we have pages already, use the last valid PDF
        if (pagesInCurrentPdf.length > 0 && lastValidPdfBytes) {
          splitPdfs.push(lastValidPdfBytes);
          break;
        }
        
        // If even a single page exceeds the limit, we must include it
        // (better to have one oversized file than fail completely)
        if (pagesInCurrentPdf.length === 0) {
          splitPdfs.push(testBytes);
          currentPageIndex++;
          break;
        }
      } else {
        // Size is still within limit, save this as the last valid PDF
        pagesInCurrentPdf.push(currentPageIndex);
        lastValidPdfBytes = testBytes;
        currentPageIndex++;

        // If this is the last page, we're done - use this PDF
        if (currentPageIndex >= totalPages) {
          splitPdfs.push(testBytes);
          break;
        }
      }
    }

    // If we exited the loop but still have a valid PDF that wasn't added
    if (lastValidPdfBytes && !splitPdfs.includes(lastValidPdfBytes)) {
      splitPdfs.push(lastValidPdfBytes);
    }
  }

  if (splitPdfs.length === 0) {
    throw new Error('Failed to split PDF. Size limit might be too small for a single page.');
  }

  return splitPdfs;
}

/**
 * Split PDF by size using size string (e.g., "10 MB")
 */
export async function splitBySizeString(
  file: File,
  sizeString: string
): Promise<Uint8Array[]> {
  const maxSizeBytes = parseSizeToBytes(sizeString);
  return splitBySize(file, maxSizeBytes);
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
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
