'use client';

import { useState, useEffect } from 'react';
import { RotateCw, ChevronDown, X, Check } from 'lucide-react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';

interface PageRotation {
  pageNumber: number;
  rotation: number; // 0, 90, 180, 270
  selected: boolean;
}

interface PageRotateProps {
  totalPages: number;
  pdfFile: File | null;
  onChange: (rotations: { [pageNumber: number]: number }) => void; // Map of page number to rotation
}

const ROTATION_OPTIONS = [
  { value: 0, label: '0° (No rotation)' },
  { value: 90, label: '90° Clockwise' },
  { value: 180, label: '180°' },
  { value: 270, label: '90° Counter-clockwise' },
];

export default function PageRotate({
  totalPages,
  pdfFile,
  onChange,
}: PageRotateProps) {
  const [pages, setPages] = useState<PageRotation[]>([]);
  const [thumbnails, setThumbnails] = useState<{ [pageNumber: number]: string }>({});
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(false);
  const [fullSizeImages, setFullSizeImages] = useState<{ [key: string]: string }>({});
  const [isLoadingFullSize, setIsLoadingFullSize] = useState<{ [key: string]: boolean }>({});
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<{ [pageNumber: number]: boolean }>({});

  // Initialize pages
  useEffect(() => {
    const initialPages: PageRotation[] = Array.from({ length: totalPages }, (_, i) => ({
      pageNumber: i + 1,
      rotation: 0,
      selected: false,
    }));
    setPages(initialPages);
  }, [totalPages]);

  // Generate thumbnails (always without rotation, we'll apply rotation via CSS)
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

  // Notify parent of rotation changes
  useEffect(() => {
    const rotations: { [pageNumber: number]: number } = {};
    pages.forEach(page => {
      if (page.rotation !== 0) {
        rotations[page.pageNumber] = page.rotation;
      }
    });
    onChange(rotations);
  }, [pages, onChange]);

  // Load full-size image with rotation when page is selected
  useEffect(() => {
    if (!pdfFile || selectedPage === null) return;
    
    const page = pages.find(p => p.pageNumber === selectedPage);
    if (!page) return;

    const key = `${selectedPage}-${page.rotation}`;
    
    // If already loaded, don't reload
    if (fullSizeImages[key]) return;

    const loadFullSize = async () => {
      setIsLoadingFullSize(prev => ({ ...prev, [key]: true }));
      try {
        const pdfDoc = await loadPdfDocument(pdfFile);
        const dataUrl = await renderPageToDataUrl(pdfDoc, selectedPage, 800, page.rotation);
        setFullSizeImages(prev => ({ ...prev, [key]: dataUrl }));
      } catch (err) {
        console.error(`Error loading full-size image for page ${selectedPage}:`, err);
      } finally {
        setIsLoadingFullSize(prev => ({ ...prev, [key]: false }));
      }
    };

    loadFullSize();
  }, [pdfFile, selectedPage, pages, fullSizeImages]);

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

  const togglePageSelection = (pageNumber: number) => {
    setPages(prev => prev.map(page => 
      page.pageNumber === pageNumber 
        ? { ...page, selected: !page.selected }
        : page
    ));
  };

  const setPageRotation = (pageNumber: number, rotation: number) => {
    setPages(prev => prev.map(page => 
      page.pageNumber === pageNumber 
        ? { ...page, rotation }
        : page
    ));
    setIsOpen({});
  };

  const selectAll = () => {
    setPages(prev => prev.map(page => ({ ...page, selected: true })));
  };

  const clearSelection = () => {
    setPages(prev => prev.map(page => ({ ...page, selected: false })));
  };

  const applyRotationToAll = (rotation: number) => {
    setPages(prev => prev.map(page => ({ ...page, rotation })));
  };

  const toggleDropdown = (pageNumber: number) => {
    setIsOpen(prev => ({
      ...prev,
      [pageNumber]: !prev[pageNumber],
    }));
  };

  const selectedCount = pages.filter(p => p.selected).length;
  const hasRotations = pages.some(p => p.rotation !== 0);

  if (pages.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
        <p className="text-sm text-surface-400">Loading pages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-400">
            {selectedCount > 0 ? `${selectedCount} page${selectedCount !== 1 ? 's' : ''} selected` : 'No pages selected'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Select All
          </button>
          {selectedCount > 0 && (
            <>
              <span className="text-surface-600">|</span>
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-surface-400 hover:text-surface-300 font-medium transition-colors"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Apply to all */}
      {selectedCount > 0 && (
        <div className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
          <p className="text-xs font-semibold text-primary-300 mb-2">Apply rotation to all selected pages:</p>
          <div className="flex gap-2">
            {ROTATION_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  pages.forEach(page => {
                    if (page.selected) {
                      setPageRotation(page.pageNumber, value);
                    }
                  });
                }}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:border-primary-500/50 hover:bg-primary-500/10"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pages grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {pages.map((page) => {
          const isSelected = page.selected;
          const hasRotation = page.rotation !== 0;
          
          return (
            <div
              key={page.pageNumber}
              className={`
                p-3 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-primary-500 bg-primary-500/20' 
                  : 'border-surface-700/50 bg-surface-800/50'
                }
                ${hasRotation ? 'ring-2 ring-warning-500/30' : ''}
              `}
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => setSelectedPage(page.pageNumber)}
                className="relative w-full aspect-[3/4] rounded-lg border border-surface-700/50 bg-surface-900/70 overflow-hidden flex items-center justify-center shadow-sm hover:border-primary-500/50 transition-colors cursor-pointer group mb-2"
              >
                {isLoadingThumbnails ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                  </div>
                ) : thumbnails[page.pageNumber] ? (
                  <>
                    <img
                      src={thumbnails[page.pageNumber]}
                      alt={`Page ${page.pageNumber}`}
                      className="w-full h-full object-contain"
                      style={{ transform: `rotate(${page.rotation}deg)` }}
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
                    Page {page.pageNumber}
                  </div>
                )}
              </button>

              {/* Page info and controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-surface-300">
                    Page {page.pageNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePageSelection(page.pageNumber)}
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                      ${isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-surface-800 border-surface-600'
                      }
                    `}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                  </button>
                </div>

                {/* Rotation selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(page.pageNumber)}
                    className={`
                      w-full px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between
                      ${hasRotation
                        ? 'bg-warning-500/20 border border-warning-500/40 text-warning-300'
                        : 'bg-surface-900/70 border border-surface-600/50 text-surface-300'
                      }
                    `}
                  >
                    <span className="flex items-center gap-1">
                      <RotateCw size={12} strokeWidth={2} />
                      {page.rotation}°
                    </span>
                    <ChevronDown size={12} className="text-surface-400" />
                  </button>
                  {isOpen[page.pageNumber] && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => toggleDropdown(page.pageNumber)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg bg-surface-800 border border-surface-700 shadow-xl z-20">
                        {ROTATION_OPTIONS.map(({ value, label }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setPageRotation(page.pageNumber, value);
                              toggleDropdown(page.pageNumber);
                            }}
                            className={`w-full px-3 py-2 text-left text-xs hover:bg-primary-500/20 transition-colors ${
                              value === page.rotation
                                ? 'bg-primary-500/30 text-primary-300 font-medium'
                                : 'text-surface-300'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {hasRotations && (
        <div className="p-3 rounded-lg bg-warning-500/10 border border-warning-500/20">
          <p className="text-xs font-semibold text-warning-300 mb-1">
            ⚠️ Pages with rotation applied:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pages
              .filter(p => p.rotation !== 0)
              .map(page => (
                <span
                  key={page.pageNumber}
                  className="px-2 py-1 rounded bg-surface-800/50 text-xs font-medium text-surface-300"
                >
                  Page {page.pageNumber}: {page.rotation}°
                </span>
              ))}
          </div>
        </div>
      )}

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
                  Rotation: {pages.find(p => p.pageNumber === selectedPage)?.rotation || 0}° • Click outside or press ESC to close
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
              {(() => {
                const page = pages.find(p => p.pageNumber === selectedPage);
                const key = page ? `${selectedPage}-${page.rotation}` : `${selectedPage}-0`;
                const isLoading = isLoadingFullSize[key];
                const image = fullSizeImages[key];

                return isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
                    <p className="text-sm text-surface-400">Loading page...</p>
                  </div>
                ) : image ? (
                  <img
                    src={image}
                    alt={`Page ${selectedPage} full size`}
                    className="max-w-full max-h-[calc(95vh-120px)] object-contain rounded-lg shadow-lg"
                    draggable={false}
                  />
                ) : (
                  <div className="text-center py-20">
                    <p className="text-sm text-surface-400">Failed to load page preview</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
