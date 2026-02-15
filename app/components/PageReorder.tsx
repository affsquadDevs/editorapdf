'use client';

import { useState, useEffect } from 'react';
import { GripVertical, ChevronDown, ArrowUp, ArrowDown, X } from 'lucide-react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';

interface PageOrder {
  originalIndex: number; // Original page number (1-based)
  position: number; // Target position (1-based)
}

interface PageReorderProps {
  totalPages: number;
  pdfFile: File | null;
  onChange: (order: number[]) => void; // Array of original indices in new order
}

export default function PageReorder({
  totalPages,
  pdfFile,
  onChange,
}: PageReorderProps) {
  const [pageOrder, setPageOrder] = useState<PageOrder[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
  const [thumbnails, setThumbnails] = useState<{ [pageNumber: number]: string }>({});
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(false);
  const [fullSizeImages, setFullSizeImages] = useState<{ [pageNumber: number]: string }>({});
  const [isLoadingFullSize, setIsLoadingFullSize] = useState<{ [pageNumber: number]: boolean }>({});
  const [selectedPage, setSelectedPage] = useState<number | null>(null);

  // Initialize page order
  useEffect(() => {
    const initialOrder: PageOrder[] = Array.from({ length: totalPages }, (_, i) => ({
      originalIndex: i + 1,
      position: i + 1,
    }));
    setPageOrder(initialOrder);
  }, [totalPages]);

  // Generate thumbnails
  useEffect(() => {
    if (!pdfFile || totalPages === 0) {
      setThumbnails({});
      return;
    }

    const generateThumbnails = async () => {
      setIsLoadingThumbnails(true);
      try {
        const pdfDoc = await loadPdfDocument(pdfFile);
        const thumbnailPromises = Array.from({ length: totalPages }, async (_, i) => {
          const pageNumber = i + 1;
          try {
            const dataUrl = await renderPageToDataUrl(pdfDoc, pageNumber, 120, 0);
            return { pageNumber, dataUrl };
          } catch (err) {
            console.error(`Error generating thumbnail for page ${pageNumber}:`, err);
            return { pageNumber, dataUrl: '' };
          }
        });
        
        const results = await Promise.all(thumbnailPromises);
        const thumbnailsMap: { [pageNumber: number]: string } = {};
        results.forEach(({ pageNumber, dataUrl }) => {
          thumbnailsMap[pageNumber] = dataUrl;
        });
        setThumbnails(thumbnailsMap);
      } catch (err) {
        console.error('Error generating thumbnails:', err);
      } finally {
        setIsLoadingThumbnails(false);
      }
    };

    generateThumbnails();
  }, [pdfFile, totalPages]);

  // Load full-size image when page is selected
  useEffect(() => {
    if (!pdfFile || selectedPage === null) return;
    
    // If already loaded, don't reload
    if (fullSizeImages[selectedPage]) return;

    const loadFullSize = async () => {
      setIsLoadingFullSize(prev => ({ ...prev, [selectedPage]: true }));
      try {
        const pdfDoc = await loadPdfDocument(pdfFile);
        const dataUrl = await renderPageToDataUrl(pdfDoc, selectedPage, 800, 0);
        setFullSizeImages(prev => ({ ...prev, [selectedPage]: dataUrl }));
      } catch (err) {
        console.error(`Error loading full-size image for page ${selectedPage}:`, err);
      } finally {
        setIsLoadingFullSize(prev => ({ ...prev, [selectedPage]: false }));
      }
    };

    loadFullSize();
  }, [pdfFile, selectedPage, fullSizeImages]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPage !== null) {
        setSelectedPage(null);
      }
    };

    if (selectedPage !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedPage]);

  // Notify parent of order changes
  useEffect(() => {
    if (pageOrder.length === 0) return;
    
    // Sort by position and return original indices
    const sorted = [...pageOrder].sort((a, b) => a.position - b.position);
    const order = sorted.map(p => p.originalIndex - 1); // Convert to 0-based
    onChange(order);
  }, [pageOrder, onChange]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Reorder pages
    const newOrder = [...pageOrder];
    const [moved] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, moved);

    // Update positions
    const updated = newOrder.map((page, idx) => ({
      ...page,
      position: idx + 1,
    }));

    setPageOrder(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= pageOrder.length) return;

    const newOrder = [...pageOrder];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];

    // Update positions
    const updated = newOrder.map((page, idx) => ({
      ...page,
      position: idx + 1,
    }));

    setPageOrder(updated);
  };

  const setPagePosition = (originalIndex: number, newPosition: number) => {
    if (newPosition < 1 || newPosition > totalPages) return;

    const currentItem = pageOrder.find(p => p.originalIndex === originalIndex);
    if (!currentItem) return;

    const currentPosition = currentItem.position;
    
    // If moving to same position, do nothing
    if (currentPosition === newPosition) {
      setIsOpen({});
      return;
    }

    // Update all positions
    const updated = pageOrder.map(page => {
      if (page.originalIndex === originalIndex) {
        return { ...page, position: newPosition };
      }
      
      // Adjust other pages' positions
      if (newPosition > currentPosition) {
        // Moving down: shift pages between old and new position up
        if (page.position > currentPosition && page.position <= newPosition) {
          return { ...page, position: page.position - 1 };
        }
      } else {
        // Moving up: shift pages between new and old position down
        if (page.position >= newPosition && page.position < currentPosition) {
          return { ...page, position: page.position + 1 };
        }
      }
      
      return page;
    });

    setPageOrder(updated);
    setIsOpen({});
  };

  const toggleDropdown = (position: number) => {
    setIsOpen(prev => ({
      ...prev,
      [position]: !prev[position],
    }));
  };

  const sortedOrder = [...pageOrder].sort((a, b) => a.position - b.position);

  if (pageOrder.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
        <p className="text-sm text-surface-400">Loading pages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-surface-400">
          Drag pages to reorder or use position selectors
        </p>
        <button
          type="button"
          onClick={() => {
            const reset: PageOrder[] = Array.from({ length: totalPages }, (_, i) => ({
              originalIndex: i + 1,
              position: i + 1,
            }));
            setPageOrder(reset);
          }}
          className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Reset Order
        </button>
      </div>

      <div className="space-y-2">
        {sortedOrder.map((page, displayIndex) => {
          const isDragging = draggedIndex === displayIndex;
          const isDragOver = dragOverIndex === displayIndex;
          
          return (
            <div
              key={`${page.originalIndex}-${page.position}`}
              draggable
              onDragStart={() => handleDragStart(displayIndex)}
              onDragOver={(e) => handleDragOver(e, displayIndex)}
              onDrop={(e) => handleDrop(e, displayIndex)}
              onDragEnd={handleDragEnd}
              className={`
                p-3 rounded-lg border-2 transition-all
                ${isDragging ? 'opacity-50 border-primary-500/50 bg-primary-500/10' : ''}
                ${isDragOver ? 'border-primary-500 bg-primary-500/20' : 'border-surface-700/50 bg-surface-800/50'}
                ${!isDragging && !isDragOver ? 'hover:border-primary-500/30 cursor-move' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Drag handle */}
                <div className="text-surface-500 cursor-grab active:cursor-grabbing">
                  <GripVertical size={20} strokeWidth={2} />
                </div>

                {/* Thumbnail preview */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPage(page.originalIndex);
                  }}
                  className="relative w-20 h-28 rounded-lg border-2 border-surface-700/50 bg-surface-900/70 flex-shrink-0 overflow-hidden flex items-center justify-center shadow-sm hover:border-primary-500/50 transition-colors cursor-pointer group"
                >
                  {isLoadingThumbnails ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                  ) : thumbnails[page.originalIndex] ? (
                    <>
                      <img
                        src={thumbnails[page.originalIndex]}
                        alt={`Page ${page.originalIndex}`}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-xs text-white font-medium bg-black/60 px-2 py-1 rounded transition-opacity">
                          Click to view
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-surface-500 text-center p-2 font-medium">
                      Page {page.originalIndex}
                    </div>
                  )}
                </button>

                {/* Page info */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-xs text-surface-500">Page</span>
                    <span className="text-sm font-semibold text-surface-200">
                      {page.originalIndex}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-surface-500">→</span>
                    <span className="text-xs text-surface-500">Position</span>
                    
                    {/* Position selector */}
                    <div className="relative flex-1 max-w-[120px]">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(page.position)}
                        className="w-full px-3 py-1.5 rounded-lg bg-surface-900/70 border border-surface-600/50 text-surface-200 text-sm font-medium hover:border-primary-500/50 transition-all flex items-center justify-between"
                      >
                        <span>{page.position}</span>
                        <ChevronDown size={14} className="text-surface-400" />
                      </button>
                      {isOpen[page.position] && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => toggleDropdown(page.position)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg bg-surface-800 border border-surface-700 shadow-xl z-20">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pos => (
                              <button
                                key={pos}
                                type="button"
                                onClick={() => {
                                  setPagePosition(page.originalIndex, pos);
                                  toggleDropdown(page.position);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-500/20 transition-colors ${
                                  pos === page.position
                                    ? 'bg-primary-500/30 text-primary-300 font-medium'
                                    : 'text-surface-300'
                                }`}
                              >
                                Position {pos}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Move buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => movePage(displayIndex, 'up')}
                    disabled={displayIndex === 0}
                    className="p-1.5 rounded-lg hover:bg-primary-500/10 text-surface-400 hover:text-primary-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp size={16} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePage(displayIndex, 'down')}
                    disabled={displayIndex === sortedOrder.length - 1}
                    className="p-1.5 rounded-lg hover:bg-primary-500/10 text-surface-400 hover:text-primary-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview */}
      <div className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
        <p className="text-xs font-semibold text-primary-300 mb-2">New Page Order:</p>
        <div className="flex flex-wrap gap-1.5">
          {sortedOrder.map((page, idx) => (
            <span
              key={page.originalIndex}
              className="px-2 py-1 rounded bg-surface-800/50 text-xs font-medium text-surface-300"
            >
              {page.originalIndex}
              {idx < sortedOrder.length - 1 && (
                <span className="text-surface-500 ml-1">→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Full-size page modal */}
      {selectedPage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[95vh] w-full bg-surface-900 rounded-xl border border-surface-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-surface-700/50 bg-surface-800/50">
              <div>
                <h3 className="text-lg font-semibold text-surface-200">
                  Page {selectedPage} Preview
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  Click outside or press ESC to close
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPage(null)}
                className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-surface-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-auto max-h-[calc(95vh-80px)] flex items-center justify-center bg-surface-900">
              {isLoadingFullSize[selectedPage] ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
                  <p className="text-sm text-surface-400">Loading page...</p>
                </div>
              ) : fullSizeImages[selectedPage] ? (
                <img
                  src={fullSizeImages[selectedPage]}
                  alt={`Page ${selectedPage} full size`}
                  className="max-w-full max-h-[calc(95vh-120px)] object-contain rounded-lg shadow-lg"
                  draggable={false}
                />
              ) : (
                <div className="text-center py-20">
                  <p className="text-sm text-surface-400">Failed to load page preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
