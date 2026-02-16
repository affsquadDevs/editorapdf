import { loadPdfDocument, renderPageToCanvas } from './pdfRender';

export type ImageFormat = 'PNG' | 'JPEG' | 'WebP';

export interface PdfToImagesOptions {
  format: ImageFormat;
  quality?: number; // 0-1 for JPEG/WebP, ignored for PNG
  scale?: number; // Scale factor (1 = original size, 2 = double size, etc.)
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
}

export interface ImageResult {
  dataUrl: string;
  filename: string;
  pageNumber: number;
}

/**
 * Convert PDF pages to images
 */
export async function pdfToImages(
  file: File,
  options: PdfToImagesOptions
): Promise<ImageResult[]> {
  const { format, quality = 0.92, scale = 2, pageRange } = options;

  // Load PDF document
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToConvert: number[] = [];
  
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    // Convert all pages
    pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // Parse page range (e.g., "1-5", "1,3,5", "1-3,5,7-9")
    const parts = pageRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        // Range (e.g., "1-5")
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, totalPages));
          const rangeEnd = Math.max(1, Math.min(end, totalPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            if (!pagesToConvert.includes(i)) {
              pagesToConvert.push(i);
            }
          }
        }
      } else {
        // Single page
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToConvert.includes(pageNum)) {
            pagesToConvert.push(pageNum);
          }
        }
      }
    }
    // Sort pages
    pagesToConvert.sort((a, b) => a - b);
  }

  if (pagesToConvert.length === 0) {
    throw new Error('No valid pages to convert');
  }

  // Convert each page
  const results: ImageResult[] = [];
  const baseName = file.name.replace(/\.pdf$/i, '');

  for (const pageNumber of pagesToConvert) {
    // Create canvas
    const canvas = document.createElement('canvas');
    
    // Render page to canvas
    await renderPageToCanvas(pdfDoc, pageNumber, canvas, scale);

    // Convert canvas to image
    let dataUrl: string;
    let extension: string;

    switch (format) {
      case 'PNG':
        dataUrl = canvas.toDataURL('image/png');
        extension = 'png';
        break;
      case 'JPEG':
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        extension = 'jpg';
        break;
      case 'WebP':
        // WebP support check
        if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/webp', quality);
          extension = 'webp';
        } else {
          // Fallback to JPEG if WebP not supported
          console.warn('WebP not supported, falling back to JPEG');
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          extension = 'jpg';
        }
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Generate filename
    const filename = pagesToConvert.length === 1
      ? `${baseName}.${extension}`
      : `${baseName}_page_${pageNumber}.${extension}`;

    results.push({
      dataUrl,
      filename,
      pageNumber,
    });
  }

  return results;
}

/**
 * Download images as files (sequential download with proper delays)
 */
export async function downloadImages(images: ImageResult[]): Promise<void> {
  if (images.length === 0) return;
  
  // For single image, download immediately
  if (images.length === 1) {
    const image = images[0];
    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = image.filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    // Clean up after a short delay
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
    return;
  }

  // For multiple images, download sequentially with proper delays
  // Use async/await to ensure each download completes before starting the next
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    
    // Convert data URL to Blob URL for better browser compatibility
    const response = await fetch(image.dataUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = image.filename;
    link.style.display = 'none';
    
    // Append to body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Wait a bit before cleaning up and starting next download
    // Longer delay helps browsers process the download properly
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        // Clean up
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(blobUrl);
        resolve();
      }, 800); // 800ms delay between downloads to ensure browser processes each one
    });
  }
}

/**
 * Download images as a ZIP file (requires JSZip, falls back to sequential download)
 */
export async function downloadImagesAsZip(images: ImageResult[]): Promise<void> {
  // Only try to use JSZip on client side
  if (typeof window === 'undefined') {
    // Server-side: use sequential download
    await downloadImages(images);
    return;
  }

  try {
    // Try to dynamically import JSZip
    const jszipModule = await import('jszip');
    const JSZip = jszipModule.default;
    const zip = new JSZip();

    console.log(`Creating ZIP archive with ${images.length} image(s)...`);

    // Add all images to zip
    for (const image of images) {
      try {
        // Extract base64 data
        const base64Data = image.dataUrl.split(',')[1];
        if (!base64Data) {
          console.error(`Invalid data URL for image: ${image.filename}`);
          continue;
        }
        
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        zip.file(image.filename, binaryData);
        console.log(`Added to ZIP: ${image.filename} (${binaryData.length} bytes)`);
      } catch (imageError) {
        console.error(`Error adding image ${image.filename} to ZIP:`, imageError);
        // Continue with other images even if one fails
      }
    }

    // Check if any files were added
    const fileCount = Object.keys(zip.files).length;
    if (fileCount === 0) {
      throw new Error('No images were added to ZIP archive');
    }

    console.log(`ZIP archive created with ${fileCount} file(s)`);

    // Generate zip file
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    console.log(`ZIP file size: ${zipBlob.size} bytes`);
    
    // Download zip
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    const baseName = images[0].filename.replace(/_\d+\.\w+$/, '').replace(/\.\w+$/, '');
    link.download = `${baseName}_images.zip`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up after a delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
    
    console.log(`Downloaded ZIP archive: ${link.download}`);
  } catch (err) {
    console.error('Error creating ZIP file, falling back to sequential download:', err);
    // Fallback to individual downloads
    await downloadImages(images);
  }
}
