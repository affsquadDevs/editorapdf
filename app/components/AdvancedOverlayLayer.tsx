'use client';

import { useState, useRef, useEffect } from 'react';
import { usePdfStore } from '../store/pdfStore';
import ConfirmDialog from './ConfirmDialog';
import type { TextOverlay, ImageOverlay, ShapeOverlay } from '../store/pdfStore';

interface Props {
  pageId: string;
  pageWidth: number;
  pageHeight: number;
  zoom: number;
}

// Available fonts
const FONT_OPTIONS = [
  { value: 'Helvetica', label: 'Helvetica (Sans)' },
  { value: 'Arial', label: 'Arial (Sans)' },
  { value: 'Times', label: 'Times (Serif)' },
  { value: 'Georgia', label: 'Georgia (Serif)' },
  { value: 'Courier', label: 'Courier (Mono)' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Impact', label: 'Impact' },
];

export default function AdvancedOverlayLayer({ pageId, pageWidth, pageHeight, zoom }: Props) {
  const {
    pages,
    editMode,
    selectedShapeType,
    addTextOverlay,
    updateTextOverlay,
    deleteTextOverlay,
    addImageOverlay,
    updateImageOverlay,
    deleteImageOverlay,
    addShapeOverlay,
    updateShapeOverlay,
    deleteShapeOverlay,
    setEditMode,
  } = usePdfStore();

  const [editingOverlayId, setEditingOverlayId] = useState<string | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    fontSize: 16,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [drawEnd, setDrawEnd] = useState({ x: 0, y: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; itemId: string | null; itemType: 'text' | 'image' | 'shape' }>({
    isOpen: false,
    itemId: null,
    itemType: 'text',
  });
  
  const layerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const page = pages.find((p) => p.id === pageId);
  const overlays = page?.overlays || [];
  const images = page?.images.filter((img) => !img.deleted) || [];
  const shapes = page?.shapes || [];

  // Handle layer click for adding new items
  const handleLayerClick = (e: React.MouseEvent) => {
    if (draggingItemId || resizingItemId || isDrawing) return;
    
    const target = e.target as HTMLElement;
    // Don't add new text if clicking on existing overlay items or edit panel
    if (target.closest('.overlay-item') || target.closest('.edit-panel')) return;

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (editMode === 'text') {
      // Add new text with white box by default
      addTextOverlay(pageId, {
        x,
        y,
        text: 'New Text',
        fontSize: 16,
        color: '#000000',
        isOriginal: false,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        backgroundColor: '#ffffff',
        boxWidth: 0.25, // 25% of page width by default
        boxHeight: 0.05, // 5% of page height by default
      });
      // Після додавання тексту автоматично переходимо в режим вибору
      setEditMode('none');
    } else if (editMode === 'image') {
      fileInputRef.current?.click();
      (window as any).__pendingImagePosition = { x, y };
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const pos = (window as any).__pendingImagePosition || { x: 0.5, y: 0.5 };
        const aspectRatio = img.width / img.height;
        const width = 0.2;
        const height = width / aspectRatio;

        addImageOverlay(pageId, {
          x: pos.x,
          y: pos.y,
          width,
          height,
          dataUrl,
          originalWidth: img.width,
          originalHeight: img.height,
        });
        
        delete (window as any).__pendingImagePosition;
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    
    e.target.value = '';
  };

  // Handle shape drawing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (editMode !== 'shape') return;
    if ((e.target as HTMLElement).closest('.overlay-item')) return;

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setIsDrawing(true);
    setDrawStart({ x, y });
    setDrawEnd({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setDrawEnd({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    const width = Math.abs(drawEnd.x - drawStart.x);
    const height = Math.abs(drawEnd.y - drawStart.y);

    if (width > 0.01 && height > 0.01) {
      addShapeOverlay(pageId, {
        type: selectedShapeType,
        x: Math.min(drawStart.x, drawEnd.x),
        y: Math.min(drawStart.y, drawEnd.y),
        width,
        height,
        color: selectedShapeType === 'highlight' ? '#ffff0080' : '#3b82f6',
        lineWidth: 2,
      });
    }

    setIsDrawing(false);
  };

  // Handle item dragging
  const handleItemMouseDown = (e: React.MouseEvent, itemId: string, itemX: number, itemY: number) => {
    e.stopPropagation();
    
    if ((e.target as HTMLElement).closest('.resize-handle') ||
        (e.target as HTMLElement).closest('.edit-panel') ||
        (e.target as HTMLElement).tagName === 'INPUT' || 
        (e.target as HTMLElement).tagName === 'BUTTON' ||
        (e.target as HTMLElement).tagName === 'SELECT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA') {
      return;
    }

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = itemX * rect.width;
    const currentY = itemY * rect.height;

    setDraggingItemId(itemId);
    setDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
  };

  // Handle resize
  const handleResizeMouseDown = (e: React.MouseEvent, overlay: TextOverlay) => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setResizingItemId(overlay.id);
    setResizeStart({
      width: (overlay.boxWidth || 0.25) * rect.width,
      height: (overlay.boxHeight || 0.05) * rect.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
      fontSize: overlay.fontSize,
    });
  };

  // Dragging effect
  useEffect(() => {
    if (!draggingItemId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = Math.max(0, Math.min(1, (e.clientX - dragOffset.x) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - dragOffset.y) / rect.height));

      if (draggingItemId.startsWith('text-') || draggingItemId.startsWith('overlay-')) {
        updateTextOverlay(draggingItemId, { x, y });
      } else if (draggingItemId.startsWith('image-')) {
        updateImageOverlay(draggingItemId, { x, y });
      } else if (draggingItemId.startsWith('shape-')) {
        updateShapeOverlay(draggingItemId, { x, y });
      }
    };

    const handleMouseUp = () => {
      setDraggingItemId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingItemId, dragOffset, updateTextOverlay, updateImageOverlay, updateShapeOverlay]);

  // Resizing effect
  useEffect(() => {
    if (!resizingItemId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;

      const newWidth = Math.max(60, resizeStart.width + deltaX);
      const newHeight = Math.max(32, resizeStart.height + deltaY);

      const boxWidth = newWidth / rect.width;
      const boxHeight = newHeight / rect.height;

      // Масштабуємо шрифт пропорційно зміні ширини боксу
      const widthScale = newWidth / Math.max(1, resizeStart.width);
      const newFontSize = Math.max(6, resizeStart.fontSize * widthScale);

      updateTextOverlay(resizingItemId, {
        boxWidth: Math.min(1, boxWidth),
        boxHeight: Math.min(1, boxHeight),
        fontSize: newFontSize,
      });
    };

    const handleMouseUp = () => {
      setResizingItemId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingItemId, resizeStart, updateTextOverlay]);

  // Handle delete confirmation
  const handleDeleteClick = (itemId: string, itemType: 'text' | 'image' | 'shape') => {
    setDeleteConfirm({ isOpen: true, itemId, itemType });
  };

  const confirmDelete = () => {
    if (!deleteConfirm.itemId) return;

    if (deleteConfirm.itemType === 'text') {
      deleteTextOverlay(deleteConfirm.itemId);
      setEditingOverlayId(null);
    } else if (deleteConfirm.itemType === 'image') {
      deleteImageOverlay(deleteConfirm.itemId);
    } else if (deleteConfirm.itemType === 'shape') {
      deleteShapeOverlay(deleteConfirm.itemId);
    }

    setDeleteConfirm({ isOpen: false, itemId: null, itemType: 'text' });
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Overlay Layer */}
      <div
        ref={layerRef}
        onClick={handleLayerClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`
          absolute inset-0
          ${editMode === 'text' ? 'cursor-crosshair' : ''}
          ${editMode === 'image' ? 'cursor-copy' : ''}
          ${editMode === 'shape' ? 'cursor-crosshair' : ''}
        `}
        style={{
          width: `${pageWidth * zoom}px`,
          height: `${pageHeight * zoom}px`,
        }}
      >
        {/* Render Text Overlays */}
        {overlays.map((overlay) => {
          if (overlay.hidden) return null;
          
          const isEditing = editingOverlayId === overlay.id;
          const isDragging = draggingItemId === overlay.id;
          const isResizing = resizingItemId === overlay.id;
          
          const boxWidth = (overlay.boxWidth || 0.25) * 100;
          const boxHeight = (overlay.boxHeight || 0.05) * 100;

          return (
            <div
              key={overlay.id}
              className={`
                overlay-item absolute
                ${isDragging ? 'opacity-70 cursor-grabbing' : 'cursor-move'}
                ${isEditing ? 'ring-2 ring-blue-500 z-10' : 'z-0'}
              `}
              style={{
                left: `${overlay.x * 100}%`,
                top: `${overlay.y * 100}%`,
                width: `${boxWidth}%`,
                minHeight: `${boxHeight}%`,
              }}
              onMouseDown={(e) => handleItemMouseDown(e, overlay.id, overlay.x, overlay.y)}
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                // Не змінюємо режим редагування, якщо клік стався всередині панелі редагування
                if (target.closest('.edit-panel')) return;
                if (editMode === 'none' || editMode === 'text') {
                  setEditingOverlayId(isEditing ? null : overlay.id);
                }
              }}
            >
              {/* White Box Background (no border, мінімальні відступи) */}
              {overlay.backgroundColor && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: overlay.backgroundColor,
                  }}
                />
              )}

              {/* Text Content – відступи ~2px з усіх боків */}
              <div
                className="relative break-words"
                style={{
                  padding: '2px',
                  fontSize: `${overlay.fontSize * zoom}px`,
                  color: overlay.color,
                  fontFamily: overlay.fontFamily || 'Helvetica',
                  fontWeight: overlay.fontWeight || 'normal',
                  fontStyle: overlay.fontStyle || 'normal',
                  textAlign: overlay.textAlign || 'left',
                  lineHeight: '1.2',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {overlay.text}
              </div>

              {/* Resize Handle */}
              <div
                className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-blue-600 rounded-tl hover:bg-blue-700 flex items-center justify-center"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, overlay)}
                title="Drag to resize"
              >
                {/* Стандартна «діагональна» іконка ресайзу як у графічних редакторах */} 
                <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 13L13 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M11 13L13 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Edit Panel */}
              {isEditing && (
                <div className="edit-panel absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4 min-w-[350px] z-20 border border-gray-200">
                  <div className="space-y-3">
                    {/* Text Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
                      <textarea
                        value={overlay.text}
                        onChange={(e) => updateTextOverlay(overlay.id, { text: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                        rows={3}
                        autoFocus
                      />
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Font</label>
                      <select
                        value={overlay.fontFamily || 'Helvetica'}
                        onChange={(e) => updateTextOverlay(overlay.id, { fontFamily: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      >
                        {FONT_OPTIONS.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size & Style */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                        <input
                          type="number"
                          value={overlay.fontSize}
                          onChange={(e) => updateTextOverlay(overlay.id, { fontSize: parseInt(e.target.value) || 16 })}
                          min="8"
                          max="72"
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      <div className="flex gap-1 items-end">
                        <button
                          onClick={() => updateTextOverlay(overlay.id, {
                            fontWeight: overlay.fontWeight === 'bold' ? 'normal' : 'bold'
                          })}
                          className={`px-3 py-2 rounded text-sm font-bold ${
                            overlay.fontWeight === 'bold' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                          title="Bold"
                        >
                          B
                        </button>
                        <button
                          onClick={() => updateTextOverlay(overlay.id, {
                            fontStyle: overlay.fontStyle === 'italic' ? 'normal' : 'italic'
                          })}
                          className={`px-3 py-2 rounded text-sm italic ${
                            overlay.fontStyle === 'italic' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                          title="Italic"
                        >
                          I
                        </button>
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
                      <input
                        type="color"
                        value={overlay.color}
                        onChange={(e) => updateTextOverlay(overlay.id, { color: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>

                    {/* Background Color */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Background</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={overlay.backgroundColor || '#ffffff'}
                          onChange={(e) => updateTextOverlay(overlay.id, { backgroundColor: e.target.value })}
                          className="flex-1 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <button
                          onClick={() => updateTextOverlay(overlay.id, {
                            backgroundColor: overlay.backgroundColor ? undefined : '#ffffff'
                          })}
                          className={`px-3 py-2 rounded text-sm ${
                            overlay.backgroundColor ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {overlay.backgroundColor ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <button
                        onClick={() => handleDeleteClick(overlay.id, 'text')}
                        className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditingOverlayId(null)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Render Images */}
        {images.map((image) => {
          const isDragging = draggingItemId === image.id;
          
          return (
            <div
              key={image.id}
              className={`overlay-item absolute ${isDragging ? 'opacity-70' : ''}`}
              style={{
                left: `${image.x * 100}%`,
                top: `${image.y * 100}%`,
                width: `${image.width * 100}%`,
                height: `${image.height * 100}%`,
                cursor: isDragging ? 'grabbing' : 'move',
              }}
              onMouseDown={(e) => handleItemMouseDown(e, image.id, image.x, image.y)}
            >
              <img
                src={image.dataUrl}
                alt="Overlay"
                className="w-full h-full object-contain border-2 border-blue-400 rounded"
                draggable={false}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(image.id, 'image');
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs hover:bg-red-700 flex items-center justify-center shadow-lg"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* Render Shapes */}
        {shapes.map((shape) => {
          const isDragging = draggingItemId === shape.id;
          
          return (
            <div
              key={shape.id}
              className={`overlay-item absolute ${isDragging ? 'opacity-70' : ''}`}
              style={{
                left: `${shape.x * 100}%`,
                top: `${shape.y * 100}%`,
                width: `${shape.width * 100}%`,
                height: `${shape.height * 100}%`,
                cursor: isDragging ? 'grabbing' : 'move',
              }}
              onMouseDown={(e) => handleItemMouseDown(e, shape.id, shape.x, shape.y)}
            >
              <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                {shape.type === 'rectangle' && (
                  <rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke={shape.color}
                    strokeWidth={shape.lineWidth || 2}
                  />
                )}
                {shape.type === 'circle' && (
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fill="none"
                    stroke={shape.color}
                    strokeWidth={shape.lineWidth || 2}
                  />
                )}
                {shape.type === 'line' && (
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke={shape.color}
                    strokeWidth={shape.lineWidth || 2}
                  />
                )}
                {shape.type === 'arrow' && (
                  <>
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke={shape.color}
                      strokeWidth={shape.lineWidth || 2}
                    />
                    <polygon
                      points="90,40 100,50 90,60"
                      fill={shape.color}
                    />
                  </>
                )}
                {shape.type === 'highlight' && (
                  <rect
                    width="100%"
                    height="100%"
                    fill={shape.color}
                    opacity="0.3"
                  />
                )}
              </svg>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(shape.id, 'shape');
                }}
                className="absolute -top-6 right-0 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 shadow-lg"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* Drawing Preview */}
        {isDrawing && (
          <div
            className="absolute border-2 border-dashed border-blue-500 bg-blue-100 bg-opacity-20"
            style={{
              left: `${Math.min(drawStart.x, drawEnd.x) * 100}%`,
              top: `${Math.min(drawStart.y, drawEnd.y) * 100}%`,
              width: `${Math.abs(drawEnd.x - drawStart.x) * 100}%`,
              height: `${Math.abs(drawEnd.y - drawStart.y) * 100}%`,
            }}
          />
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Item"
        message={`Are you sure you want to delete this ${deleteConfirm.itemType}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, itemId: null, itemType: 'text' })}
      />
    </div>
  );
}
