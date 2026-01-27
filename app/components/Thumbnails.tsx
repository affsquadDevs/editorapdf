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
    <div className="w-64 bg-gray-100 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Pages ({visiblePages.length})
        </h2>
        
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            Loading thumbnails...
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
                    relative cursor-move rounded border-2 p-2 transition-all
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                    ${isDragging ? 'opacity-50' : ''}
                    ${isDropTarget ? 'border-blue-400 border-dashed' : ''}
                  `}
                >
                  <div className="text-xs text-gray-600 mb-1">
                    Page {index + 1}
                  </div>
                  
                  {thumbnail ? (
                    <img
                      src={thumbnail.dataUrl}
                      alt={`Page ${index + 1}`}
                      className="w-full rounded shadow-sm"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full aspect-[8.5/11] bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  )}
                  
                  {page.rotation !== 0 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      {page.rotation}°
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
