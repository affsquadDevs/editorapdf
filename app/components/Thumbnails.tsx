'use client';

import { useEffect, useState, useRef } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';

interface ThumbnailData {
  pageId: string;
  dataUrl: string;
}

export default function Thumbnails() {
  const { pages, selectedPageId, setSelectedPageId, originalFile, reorderPages } = usePdfStore();
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Generate thumbnails when PDF is loaded
  useEffect(() => {
    if (!originalFile || pages.length === 0) {
      setThumbnails([]);
      return;
    }

    const generateThumbnails = async () => {
      setIsLoading(true);
      try {
        const pdfDoc = await loadPdfDocument(originalFile);
        const thumbnailPromises = pages.map(async (page) => {
          const dataUrl = await renderPageToDataUrl(
            pdfDoc,
            page.index + 1,
            150,
            page.rotation
          );
          return { pageId: page.id, dataUrl };
        });
        
        const results = await Promise.all(thumbnailPromises);
        setThumbnails(results);
      } catch (err) {
        console.error('Error generating thumbnails:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateThumbnails();
  }, [originalFile, pages.length]); // Only regenerate if file or page count changes

  // Update thumbnail when page rotation changes
  useEffect(() => {
    if (!originalFile || thumbnails.length === 0) return;

    const updateRotatedThumbnails = async () => {
      const pdfDoc = await loadPdfDocument(originalFile);
      
      for (const page of pages) {
        const existingThumbnail = thumbnails.find((t) => t.pageId === page.id);
        if (!existingThumbnail) continue;
        
        // Check if rotation changed (simple check - could be optimized)
        const newDataUrl = await renderPageToDataUrl(
          pdfDoc,
          page.index + 1,
          150,
          page.rotation
        );
        
        if (newDataUrl !== existingThumbnail.dataUrl) {
          setThumbnails((prev) =>
            prev.map((t) =>
              t.pageId === page.id ? { ...t, dataUrl: newDataUrl } : t
            )
          );
        }
      }
    };

    updateRotatedThumbnails();
  }, [pages.map(p => `${p.id}-${p.rotation}`).join(',')]); // Update when any rotation changes

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null) return;
    
    if (draggedIndex !== dropIndex) {
      reorderPages(draggedIndex, dropIndex);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const visiblePages = pages.filter((p) => !p.deleted);

  if (pages.length === 0) {
    return null;
  }

  return (
    <div className="w-72 glass border-r border-surface-700/50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-surface-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-surface-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Pages
          </h2>
          <span className="badge-primary">{visiblePages.length}</span>
        </div>
      </div>
      
      {/* Thumbnails List */}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="spinner-lg text-primary-400" />
            <p className="text-sm text-surface-400">Loading thumbnails...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {visiblePages.map((page, index) => {
              const thumbnail = thumbnails.find((t) => t.pageId === page.id);
              const isSelected = page.id === selectedPageId;
              const isDragging = draggedIndex === index;
              const isDropTarget = dragOverIndex === index;
              
              return (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedPageId(page.id)}
                  className={`
                    thumbnail-item p-2 transition-all duration-200
                    ${isSelected ? 'thumbnail-selected' : ''}
                    ${isDragging ? 'opacity-50 scale-95' : ''}
                    ${isDropTarget && !isDragging ? 'border-primary-400 border-dashed scale-[1.02]' : ''}
                  `}
                >
                  {/* Page Number Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`
                      text-xs font-medium px-2 py-0.5 rounded-md
                      ${isSelected 
                        ? 'bg-primary-500/20 text-primary-300' 
                        : 'bg-surface-700/50 text-surface-400'
                      }
                    `}>
                      Page {index + 1}
                    </span>
                    
                    {/* Rotation Badge */}
                    {page.rotation !== 0 && (
                      <span className="flex items-center gap-1 text-xs text-surface-400 bg-surface-700/50 px-1.5 py-0.5 rounded">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {page.rotation}°
                      </span>
                    )}
                  </div>
                  
                  {/* Thumbnail Image */}
                  <div className="relative rounded-lg overflow-hidden bg-white shadow-lg">
                    {thumbnail ? (
                      <img
                        src={thumbnail.dataUrl}
                        alt={`Page ${index + 1}`}
                        className="w-full"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full aspect-[8.5/11] bg-surface-700 flex items-center justify-center">
                        <div className="spinner text-primary-400" />
                      </div>
                    )}
                    
                    {/* Selected Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary-500/10 pointer-events-none" />
                    )}
                  </div>
                  
                  {/* Drag Handle Indicator */}
                  <div className="flex justify-center mt-2">
                    <div className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Footer Hint */}
      <div className="px-4 py-3 border-t border-surface-700/50">
        <p className="text-xs text-surface-500 text-center">
          Drag to reorder pages
        </p>
      </div>
    </div>
  );
}
