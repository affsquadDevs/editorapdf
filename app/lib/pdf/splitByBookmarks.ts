import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
if (typeof window !== 'undefined') {
  // Use CDN for worker or local build
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  } catch (e) {
    // Fallback to unpkg if cdnjs fails
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  }
}

interface Bookmark {
  title: string;
  pageIndex: number; // 0-based
  level: number; // 1-based (1 = top level, 2 = nested, etc.)
  children?: Bookmark[];
}

/**
 * Extract bookmarks from PDF using pdfjs
 */
async function extractBookmarksFromPdfjs(file: File): Promise<Bookmark[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Configure pdfjs with error handling
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0, // Reduce console output
    });
    
    const pdf = await loadingTask.promise;
    
    const bookmarks: Bookmark[] = [];
    
    try {
      const outline = await pdf.getOutline();
      if (!outline || outline.length === 0) {
        return bookmarks;
      }
      
      // Recursive function to extract bookmarks
      const extractBookmark = async (item: any, level: number = 1): Promise<Bookmark[]> => {
        const result: Bookmark[] = [];
        
        if (!item || !Array.isArray(item)) {
          return result;
        }
        
        for (const bookmark of item) {
          if (!bookmark) continue;
          
          let pageIndex = 0;
          
          // Get destination page
          if (bookmark.dest) {
            try {
              // Resolve destination to get page number
              const dest = await pdf.getDestination(bookmark.dest);
              if (dest && dest.length > 0) {
                const pageRef = dest[0];
                const page = await pdf.getPageIndex(pageRef);
                pageIndex = Math.max(0, page); // Ensure non-negative
              }
            } catch (e) {
              // Try alternative method
              try {
                if (Array.isArray(bookmark.dest) && bookmark.dest.length > 0) {
                  const pageRef = bookmark.dest[0];
                  if (pageRef) {
                    const page = await pdf.getPageIndex(pageRef);
                    pageIndex = Math.max(0, page);
                  }
                }
              } catch (e2) {
                // If we can't resolve, use 0 as default
                console.warn('Could not resolve bookmark destination, using page 0:', e2);
                pageIndex = 0;
              }
            }
          }
          
          const bookmarkItem: Bookmark = {
            title: bookmark.title || 'Untitled',
            pageIndex: pageIndex,
            level: level,
          };
          
          // Recursively extract children
          if (bookmark.items && Array.isArray(bookmark.items) && bookmark.items.length > 0) {
            try {
              bookmarkItem.children = await extractBookmark(bookmark.items, level + 1);
            } catch (e) {
              console.warn('Error extracting child bookmarks:', e);
              bookmarkItem.children = [];
            }
          }
          
          result.push(bookmarkItem);
        }
        
        return result;
      };
      
      const extracted = await extractBookmark(outline, 1);
      return extracted;
    } catch (e) {
      console.error('Error getting outline:', e);
      return [];
    } finally {
      // Clean up
      try {
        await pdf.destroy();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  } catch (e) {
    console.error('Error loading PDF for bookmark extraction:', e);
    return [];
  }
}

/**
 * Flatten bookmarks to a single array with all levels
 */
function flattenBookmarks(bookmarks: Bookmark[]): Bookmark[] {
  const result: Bookmark[] = [];
  
  for (const bookmark of bookmarks) {
    result.push(bookmark);
    if (bookmark.children && bookmark.children.length > 0) {
      result.push(...flattenBookmarks(bookmark.children));
    }
  }
  
  return result;
}

/**
 * Split PDF by bookmarks at a specific level
 * @param file PDF file to split
 * @param bookmarkLevel Level of bookmarks to split at (1 = top level, 2 = second level, etc.)
 * @returns Object with PDF bytes array and bookmark titles
 */
export async function splitByBookmarks(
  file: File,
  bookmarkLevel: number = 1
): Promise<{ pdfs: Uint8Array[]; titles: string[] }> {
  if (bookmarkLevel < 1 || bookmarkLevel > 10) {
    throw new Error('Bookmark level must be between 1 and 10');
  }

  // Load the source PDF
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();

  if (totalPages === 0) {
    throw new Error('PDF has no pages to split');
  }

  // Extract bookmarks using pdfjs
  const allBookmarks = await extractBookmarksFromPdfjs(file);
  
  if (allBookmarks.length === 0) {
    throw new Error('No bookmarks found in PDF. Please ensure your PDF has bookmarks/outline structure.');
  }

  // Filter bookmarks by level
  const bookmarksAtLevel = flattenBookmarks(allBookmarks).filter(b => b.level === bookmarkLevel);
  
  if (bookmarksAtLevel.length === 0) {
    // If no bookmarks at requested level, try to find the deepest level
    const allLevels = flattenBookmarks(allBookmarks).map(b => b.level);
    const maxLevel = Math.max(...allLevels);
    const minLevel = Math.min(...allLevels);
    
    if (bookmarkLevel > maxLevel) {
      throw new Error(`No bookmarks found at level ${bookmarkLevel}. Maximum level in this PDF is ${maxLevel}.`);
    }
    
    if (bookmarkLevel < minLevel) {
      throw new Error(`No bookmarks found at level ${bookmarkLevel}. Minimum level in this PDF is ${minLevel}.`);
    }
    
    throw new Error(`No bookmarks found at level ${bookmarkLevel}. Available levels: ${[...new Set(allLevels)].sort().join(', ')}`);
  }

  // Sort bookmarks by page index
  bookmarksAtLevel.sort((a, b) => a.pageIndex - b.pageIndex);

  // Create page ranges for each bookmark
  const ranges: number[][] = [];
  const bookmarkTitles: string[] = [];
  
  for (let i = 0; i < bookmarksAtLevel.length; i++) {
    const bookmark = bookmarksAtLevel[i];
    let startPage = Math.max(0, Math.min(bookmark.pageIndex, totalPages - 1));
    
    // End page is either the start of the next bookmark, or the end of the document
    let endPage: number;
    if (i < bookmarksAtLevel.length - 1) {
      endPage = Math.max(startPage, Math.min(bookmarksAtLevel[i + 1].pageIndex - 1, totalPages - 1));
    } else {
      endPage = totalPages - 1;
    }
    
    // Ensure valid range
    if (startPage > endPage) {
      startPage = endPage;
    }
    
    // Create range for this bookmark
    const range: number[] = [];
    for (let page = startPage; page <= endPage && page < totalPages; page++) {
      range.push(page);
    }
    
    if (range.length > 0) {
      ranges.push(range);
      bookmarkTitles.push(bookmark.title);
    }
  }

  if (ranges.length === 0) {
    throw new Error('Could not create page ranges from bookmarks.');
  }

  // Create PDFs for each range
  const splitPdfs: Uint8Array[] = [];
  
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

  return { pdfs: splitPdfs, titles: bookmarkTitles };
}

/**
 * Split PDF by bookmarks using bookmark level (simplified interface)
 */
export async function splitByBookmarksSimple(
  file: File,
  bookmarkLevel: number = 1
): Promise<Uint8Array[]> {
  const result = await splitByBookmarks(file, bookmarkLevel);
  return result.pdfs;
}

/**
 * Get bookmark information from PDF (for preview)
 */
export async function getBookmarkInfo(file: File): Promise<{ hasBookmarks: boolean; levels: number[]; count: number; bookmarks: Bookmark[] }> {
  // Add timeout to prevent infinite loading
  const timeoutPromise = new Promise<{ hasBookmarks: boolean; levels: number[]; count: number; bookmarks: Bookmark[] }>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout loading bookmarks')), 10000); // 10 second timeout
  });

  try {
    const bookmarksPromise = (async () => {
      try {
        const bookmarks = await extractBookmarksFromPdfjs(file);
        const hasBookmarks = bookmarks.length > 0;
        
        if (!hasBookmarks) {
          return {
            hasBookmarks: false,
            levels: [],
            count: 0,
            bookmarks: [],
          };
        }
        
        // Get all levels from flattened bookmarks
        const allBookmarks = flattenBookmarks(bookmarks);
        const levels = [...new Set(allBookmarks.map(b => b.level))].sort((a, b) => a - b);
        
        return {
          hasBookmarks: true,
          levels,
          count: allBookmarks.length,
          bookmarks: allBookmarks,
        };
      } catch (e) {
        console.error('Error extracting bookmarks:', e);
        throw e;
      }
    })();

    // Race between actual operation and timeout
    return await Promise.race([bookmarksPromise, timeoutPromise]);
  } catch (e) {
    console.error('Error getting bookmark info:', e);
    return {
      hasBookmarks: false,
      levels: [],
      count: 0,
      bookmarks: [],
    };
  }
}

export type { Bookmark };

/**
 * Download multiple PDF files one by one
 */
export async function downloadSplitPdfs(
  pdfFiles: Array<{ bytes: Uint8Array; filename: string }>,
  delayMs: number = 1500
): Promise<void> {
  console.log(`Starting download of ${pdfFiles.length} files`);
  
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
      
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      if (i < pdfFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`Error downloading ${file.filename}:`, error);
    }
  }
  
  console.log('All downloads initiated');
}
