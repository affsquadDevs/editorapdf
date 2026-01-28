'use client';

import { useState, useRef, useEffect } from 'react';
import { usePdfStore } from '../store/pdfStore';
import type { TextOverlay } from '../store/pdfStore';
import ConfirmDialog from './ConfirmDialog';

interface Props {
  pageId: string;
  pageWidth: number;
  pageHeight: number;
  zoom: number;
}

export default function TextOverlayLayer({ pageId, pageWidth, pageHeight, zoom }: Props) {
  const { pages, addTextOverlay, updateTextOverlay, deleteTextOverlay } = usePdfStore();
  const [isAddingText, setIsAddingText] = useState(false);
  const [editingOverlayId, setEditingOverlayId] = useState<string | null>(null);
  const [draggingOverlayId, setDraggingOverlayId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const page = pages.find((p) => p.id === pageId);
  const overlays = page?.overlays || [];

  const handleLayerClick = (e: React.MouseEvent) => {
    if (!isAddingText || draggingOverlayId || editingOverlayId) return;
    
    // Don't add text if clicking on an existing overlay
    if ((e.target as HTMLElement).closest('.text-overlay')) return;

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Get click position relative to the layer
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Add new text overlay
    addTextOverlay(pageId, {
      x,
      y,
      text: 'New Text',
      fontSize: 16,
      color: '#000000',
    });

    setIsAddingText(false);
  };

  const handleOverlayMouseDown = (e: React.MouseEvent, overlay: TextOverlay) => {
    e.stopPropagation();
    
    // Don't start drag if clicking input or buttons
    if ((e.target as HTMLElement).tagName === 'INPUT' || 
        (e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const overlayX = overlay.x * rect.width;
    const overlayY = overlay.y * rect.height;

    setDraggingOverlayId(overlay.id);
    setDragOffset({
      x: e.clientX - overlayX,
      y: e.clientY - overlayY,
    });
  };

  useEffect(() => {
    if (!draggingOverlayId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - dragOffset.x) / rect.width;
      const y = (e.clientY - dragOffset.y) / rect.height;

      // Clamp to bounds
      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));

      updateTextOverlay(draggingOverlayId, { x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setDraggingOverlayId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingOverlayId, dragOffset, updateTextOverlay]);

  return (
    <>
    <div className="absolute top-0 left-0 w-full">
      {/* Add Text Mode Toggle */}
      <div className="absolute -top-12 left-0 z-20">
        <button
          onClick={() => setIsAddingText(!isAddingText)}
          className={`
            px-4 py-2 rounded shadow transition-colors
            ${isAddingText 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {isAddingText ? '✓ Click page to add text' : '+ Add Text'}
        </button>
      </div>

      {/* Overlay Layer */}
      <div
        ref={layerRef}
        onClick={handleLayerClick}
        className={`
          absolute inset-0
          ${isAddingText ? 'cursor-crosshair bg-blue-500 bg-opacity-5' : ''}
        `}
        style={{
          width: `${pageWidth * zoom}px`,
          height: `${pageHeight * zoom}px`,
        }}
      >
        {overlays.map((overlay) => {
          const isEditing = editingOverlayId === overlay.id;
          const isDragging = draggingOverlayId === overlay.id;

          return (
            <div
              key={overlay.id}
              className={`
                text-overlay absolute
                ${isDragging ? 'opacity-70' : ''}
                ${isEditing ? 'ring-2 ring-blue-500' : ''}
              `}
              style={{
                left: `${overlay.x * 100}%`,
                top: `${overlay.y * 100}%`,
                fontSize: `${overlay.fontSize * zoom}px`,
                color: overlay.color,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={(e) => handleOverlayMouseDown(e, overlay)}
            >
              {isEditing ? (
                <div className="bg-white rounded shadow-lg p-3 min-w-[250px]" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={overlay.text}
                      onChange={(e) =>
                        updateTextOverlay(overlay.id, { text: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      autoFocus
                    />
                    
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={overlay.fontSize}
                        onChange={(e) =>
                          updateTextOverlay(overlay.id, {
                            fontSize: parseInt(e.target.value) || 16,
                          })
                        }
                        min="8"
                        max="72"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        title="Font size"
                      />
                      
                      <input
                        type="color"
                        value={overlay.color}
                        onChange={(e) =>
                          updateTextOverlay(overlay.id, { color: e.target.value })
                        }
                        className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                        title="Text color"
                      />
                      
                      <button
                        onClick={() => {
                          setDeleteConfirmId(overlay.id);
                        }}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                      
                      <button
                        onClick={() => setEditingOverlayId(null)}
                        className="px-2 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingOverlayId(overlay.id);
                  }}
                  className="px-1 hover:bg-blue-100 hover:bg-opacity-50 rounded"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {overlay.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    
    <ConfirmDialog
      isOpen={deleteConfirmId !== null}
      title="Delete text?"
      message="Are you sure you want to delete this text overlay?"
      confirmText="Delete"
      cancelText="Cancel"
      type="danger"
      onCancel={() => setDeleteConfirmId(null)}
      onConfirm={() => {
        if (deleteConfirmId) {
          deleteTextOverlay(deleteConfirmId);
          setEditingOverlayId(null);
        }
        setDeleteConfirmId(null);
      }}
    />
    </>
  );
}
