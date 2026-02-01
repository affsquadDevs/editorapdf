'use client';

import { useState, useRef, useEffect } from 'react';
import { usePdfStore } from '../store/pdfStore';
import ConfirmDialog from './ConfirmDialog';
import SignaturePad from './SignaturePad';
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
    selectedShapeStyle,
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
    saveHistory,
    selectedItems,
    selectItem,
    clearSelection,
  } = usePdfStore();

  const [editingOverlayId, setEditingOverlayId] = useState<string | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingShapeId, setEditingShapeId] = useState<string | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);
  const [resizeDirection, setResizeDirection] = useState<'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    boxWidth: 0,
    boxHeight: 0,
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [drawEnd, setDrawEnd] = useState({ x: 0, y: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; itemId: string | null; itemType: 'text' | 'image' | 'shape' }>({
    isOpen: false,
    itemId: null,
    itemType: 'text',
  });
  const [signaturePadOpen, setSignaturePadOpen] = useState(false);
  const [signaturePadPosition, setSignaturePadPosition] = useState({ x: 0, y: 0 });
  
  const measureTextBox = (
    text: string,
    fontSizePx: number,
    fontFamily: string,
    fontWeight: string,
    fontStyle: string
  ) => {
    // Padding around text inside the box:
    // top/left = 2px, bottom/right = 4px (user asked +2px on bottom & right)
    const paddingTop = 2;
    const paddingLeft = 2;
    const paddingBottom = 4;
    const paddingRight = 4;
    const lineHeight = 1; // keep consistent with rendered text
    const roundPx = (v: number) => Math.round(v * 2) / 2; // 0.5px steps -> less jitter
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return {
        widthPx: 60 + paddingLeft + paddingRight,
        heightPx: Math.ceil(fontSizePx * lineHeight) + paddingTop + paddingBottom,
      };
    }
    ctx.font = `${fontStyle} ${fontWeight} ${fontSizePx}px ${fontFamily}`;
    const lines = (text || '').split('\n');
    const metrics = lines.map((line) => ctx.measureText(line));
    const textWidth = roundPx(Math.max(0, ...metrics.map((m) => m.width)));
    // Use tighter measurement when available
    const ascent = (metrics[0] as any)?.actualBoundingBoxAscent;
    const descent = (metrics[0] as any)?.actualBoundingBoxDescent;
    const hasTight = typeof ascent === 'number' && typeof descent === 'number';
    const lineCount = Math.max(1, lines.length);
    const rawLineHeight = hasTight ? ascent + descent : fontSizePx * lineHeight;
    const rawHeight = rawLineHeight * lineCount;
    const textHeight = roundPx(rawHeight);
    return {
      widthPx: Math.max(4, textWidth + paddingLeft + paddingRight),
      heightPx: Math.max(4, textHeight + paddingTop + paddingBottom),
    };
  };

  const updateTextOverlayWithAutoFit = (overlay: TextOverlay, updates: Partial<TextOverlay>) => {
    const next: TextOverlay = { ...overlay, ...updates };

    // Auto-fit only for "content affects size" changes
    const affectsSize =
      updates.text !== undefined ||
      updates.fontSize !== undefined ||
      updates.fontFamily !== undefined ||
      updates.fontWeight !== undefined ||
      updates.fontStyle !== undefined;

    if (!affectsSize) {
      updateTextOverlay(overlay.id, updates);
      return;
    }

    const fontFamily = next.fontFamily || 'Helvetica';
    const fontWeight = next.fontWeight || 'normal';
    const fontStyle = next.fontStyle || 'normal';
    const fontSize = next.fontSize || 16;

    const { widthPx, heightPx } = measureTextBox(
      next.text || '',
      fontSize * zoom,
      fontFamily,
      fontWeight,
      fontStyle
    );
    const denomW = Math.max(1, pageWidth * zoom);
    const denomH = Math.max(1, pageHeight * zoom);

    updateTextOverlay(overlay.id, {
      ...updates,
      autoFit: true,
      boxWidth: Math.min(1, Math.max(0.001, widthPx / denomW)),
      boxHeight: Math.min(1, Math.max(0.001, heightPx / denomH)),
    });
  };

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
    // Don't add new items if clicking on existing overlay items or edit panel
    if (target.closest('.overlay-item') || target.closest('.edit-panel')) return;

    // Якщо панель редагування зображення відкрита, не додаємо нове зображення
    // Користувач повинен спочатку закрити панель (клікнути на порожнє місце або кнопку Done)
    if (editingImageId) {
      if (editMode === 'image') {
        // В режимі додавання зображення - закриваємо панель, але не додаємо нове
        setEditingImageId(null);
        return;
      } else {
        // В інших режимах - просто закриваємо панель
        setEditingImageId(null);
      }
    }

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (editMode === 'text') {
      // Add new text with white box by default
      const defaultText = 'New Text';
      const fontSize = 16;
      const fontFamily = 'Helvetica';
      const fontWeight = 'normal';
      const fontStyle = 'normal';
      const { widthPx, heightPx } = measureTextBox(
        defaultText,
        fontSize * zoom,
        fontFamily,
        fontWeight,
        fontStyle
      );
      const denomW = Math.max(1, pageWidth * zoom);
      const denomH = Math.max(1, pageHeight * zoom);
      // Allow very small boxes by default, so we don't cover surrounding PDF text
      const boxWidth = Math.min(1, Math.max(0.001, widthPx / denomW));
      const boxHeight = Math.min(1, Math.max(0.001, heightPx / denomH));

      addTextOverlay(pageId, {
        x,
        y,
        text: defaultText,
        fontSize,
        color: '#000000',
        isOriginal: false,
        autoFit: true,
        fontFamily,
        fontWeight,
        fontStyle,
        textAlign: 'left',
        backgroundColor: '#ffffff',
        boxWidth,
        boxHeight,
      });
      saveHistory(); // Save state after adding text
      
      // Автоматично перемикаємося в режим Select після додавання тексту
      setEditMode('none');
      
      // Автоматично перемикаємося в режим Select після додавання тексту
      setTimeout(() => {
        const { setEditMode } = usePdfStore.getState();
        setEditMode('none');
      }, 0);
      // Після додавання тексту автоматично переходимо в режим вибору
      setEditMode('none');
    } else if (editMode === 'image') {
      // Відкриваємо діалог вибору файлу для додавання нового зображення
      fileInputRef.current?.click();
      (window as any).__pendingImagePosition = { x, y };
    } else if (editMode === 'signature') {
      // Відкриваємо блок малювання підпису у місці кліку
      setSignaturePadPosition({ x, y });
      setSignaturePadOpen(true);
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
        });
        saveHistory(); // Save state after adding image
        
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
      const baseColor = selectedShapeType === 'highlight' ? '#ffff0080' : '#3b82f6';
      const isFilled =
        selectedShapeStyle === 'filled' && (selectedShapeType === 'rectangle' || selectedShapeType === 'circle');
      addShapeOverlay(pageId, {
        type: selectedShapeType,
        x: Math.min(drawStart.x, drawEnd.x),
        y: Math.min(drawStart.y, drawEnd.y),
        width,
        height,
        color: baseColor,
        lineWidth: 2,
        fillEnabled: selectedShapeType === 'highlight' ? true : isFilled,
        strokeEnabled: selectedShapeType === 'highlight' ? false : true,
        fillColor: selectedShapeType === 'highlight' ? baseColor : isFilled ? baseColor : undefined,
      });
      saveHistory(); // Save state after adding shape
    }

    setIsDrawing(false);
  };

  // Handle item dragging (mouse)
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

    // Handle Ctrl+Click for multi-select
    if (e.ctrlKey || e.metaKey) {
      if (selectedItems.includes(itemId)) {
        // Deselect if already selected
        const { deselectItem } = usePdfStore.getState();
        deselectItem(itemId);
      } else {
        // Add to selection
        selectItem(itemId, true);
      }
      return;
    }

    // Single select
    selectItem(itemId, false);

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

  // Handle item dragging (touch)
  const handleItemTouchStart = (e: React.TouchEvent, itemId: string, itemX: number, itemY: number) => {
    e.stopPropagation();
    
    if ((e.target as HTMLElement).closest('.resize-handle') ||
        (e.target as HTMLElement).closest('.edit-panel') ||
        (e.target as HTMLElement).tagName === 'INPUT' || 
        (e.target as HTMLElement).tagName === 'BUTTON' ||
        (e.target as HTMLElement).tagName === 'SELECT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA') {
      return;
    }

    const touch = e.touches[0];
    if (!touch) return;

    // Single select
    selectItem(itemId, false);

    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = itemX * rect.width;
    const currentY = itemY * rect.height;

    setDraggingItemId(itemId);
    setDragOffset({
      x: touch.clientX - currentX,
      y: touch.clientY - currentY,
    });
  };

  // Handle resize - змінюємо розмір білого фону (boxWidth/boxHeight) для тексту (mouse)
  const handleResizeMouseDown = (e: React.MouseEvent, overlay: TextOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Manual resize disables auto-fit for this overlay
    updateTextOverlay(overlay.id, { autoFit: false });
    
    setResizingItemId(overlay.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: (overlay.boxWidth || 0.2) * rect.width,
      boxHeight: (overlay.boxHeight || 0.05) * rect.height,
      x: overlay.x * rect.width,
      y: overlay.y * rect.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  // Handle resize for text (touch)
  const handleResizeTouchStart = (e: React.TouchEvent, overlay: TextOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const touch = e.touches[0];
    updateTextOverlay(overlay.id, { autoFit: false });
    
    setResizingItemId(overlay.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: (overlay.boxWidth || 0.2) * rect.width,
      boxHeight: (overlay.boxHeight || 0.05) * rect.height,
      x: overlay.x * rect.width,
      y: overlay.y * rect.height,
      mouseX: touch.clientX,
      mouseY: touch.clientY,
    });
  };

  // Handle image resize (mouse)
  const handleImageResizeMouseDown = (e: React.MouseEvent, image: ImageOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setResizingItemId(image.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: image.width * rect.width,
      boxHeight: image.height * rect.height,
      x: image.x * rect.width,
      y: image.y * rect.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  // Handle image resize (touch)
  const handleImageResizeTouchStart = (e: React.TouchEvent, image: ImageOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const touch = e.touches[0];
    setResizingItemId(image.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: image.width * rect.width,
      boxHeight: image.height * rect.height,
      x: image.x * rect.width,
      y: image.y * rect.height,
      mouseX: touch.clientX,
      mouseY: touch.clientY,
    });
  };

  // Handle shape resize (mouse)
  const handleShapeResizeMouseDown = (e: React.MouseEvent, shape: ShapeOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setResizingItemId(shape.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: shape.width * rect.width,
      boxHeight: shape.height * rect.height,
      x: shape.x * rect.width,
      y: shape.y * rect.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  // Handle shape resize (touch)
  const handleShapeResizeTouchStart = (e: React.TouchEvent, shape: ShapeOverlay, direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.stopPropagation();
    
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    setResizingItemId(shape.id);
    setResizeDirection(direction);
    setResizeStart({
      boxWidth: shape.width * rect.width,
      boxHeight: shape.height * rect.height,
      x: shape.x * rect.width,
      y: shape.y * rect.height,
      mouseX: touch.clientX,
      mouseY: touch.clientY,
    });
  };

  // Dragging effect (mouse and touch)
  useEffect(() => {
    if (!draggingItemId) return;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = Math.max(0, Math.min(1, (clientX - dragOffset.x) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - dragOffset.y) / rect.height));

      if (draggingItemId.startsWith('text-') || draggingItemId.startsWith('overlay-')) {
        updateTextOverlay(draggingItemId, { x, y });
      } else if (draggingItemId.startsWith('image-')) {
        updateImageOverlay(draggingItemId, { x, y });
      } else if (draggingItemId.startsWith('shape-')) {
        updateShapeOverlay(draggingItemId, { x, y });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setDraggingItemId(null);
      saveHistory(); // Save state after drag
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [draggingItemId, dragOffset, updateTextOverlay, updateImageOverlay, updateShapeOverlay]);

  // Resizing effect - змінюємо boxWidth/boxHeight для тексту або width/height для зображень
  // Простір додається з тієї сторони, за яку тягнемо
  useEffect(() => {
    if (!resizingItemId || !resizeDirection) return;

    const handleResize = (clientX: number, clientY: number) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const deltaX = clientX - resizeStart.mouseX;
      const deltaY = clientY - resizeStart.mouseY;

      let newBoxWidth = resizeStart.boxWidth;
      let newBoxHeight = resizeStart.boxHeight;
      let newX = resizeStart.x;
      let newY = resizeStart.y;

      // Мінімальні розміри
      let minWidth = 30;
      let minHeight = 30;
      if (resizingItemId.startsWith('text-') || resizingItemId.startsWith('overlay-')) {
        const overlay = overlays.find((o) => o.id === resizingItemId);
        if (overlay) {
          const fontFamily = overlay.fontFamily || 'Helvetica';
          const fontWeight = overlay.fontWeight || 'normal';
          const fontStyle = overlay.fontStyle || 'normal';
          const fontSize = overlay.fontSize || 16;
          const { widthPx, heightPx } = measureTextBox(
            overlay.text || '',
            fontSize * zoom,
            fontFamily,
            fontWeight,
            fontStyle
          );
          minWidth = Math.max(4, widthPx);
          minHeight = Math.max(4, heightPx);
        }
      }

      // Обробка кутів (діагональний ресайз)
      if (resizeDirection === 'top-left') {
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth - deltaX);
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight - deltaY);
        newX = resizeStart.x + (resizeStart.boxWidth - newBoxWidth);
        newY = resizeStart.y + (resizeStart.boxHeight - newBoxHeight);
      } else if (resizeDirection === 'top-right') {
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth + deltaX);
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight - deltaY);
        newY = resizeStart.y + (resizeStart.boxHeight - newBoxHeight);
      } else if (resizeDirection === 'bottom-left') {
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth - deltaX);
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight + deltaY);
        newX = resizeStart.x + (resizeStart.boxWidth - newBoxWidth);
      } else if (resizeDirection === 'bottom-right') {
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth + deltaX);
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight + deltaY);
      }
      // Обробка сторін
      else if (resizeDirection === 'left') {
        // Тягнемо ліво → простір додається зліва, блок залишається на місці справа
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth - deltaX);
        newX = resizeStart.x + (resizeStart.boxWidth - newBoxWidth);
      } else if (resizeDirection === 'right') {
        // Тягнемо право → простір додається справа
        newBoxWidth = Math.max(minWidth, resizeStart.boxWidth + deltaX);
      } else if (resizeDirection === 'top') {
        // Тягнемо вгору → простір додається зверху, блок залишається на місці знизу
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight - deltaY);
        newY = resizeStart.y + (resizeStart.boxHeight - newBoxHeight);
      } else if (resizeDirection === 'bottom') {
        // Тягнемо вниз → простір додається знизу
        newBoxHeight = Math.max(minHeight, resizeStart.boxHeight + deltaY);
      }

      // Конвертуємо в нормалізовані координати (0-1)
      const normalizedBoxWidth = Math.min(1, newBoxWidth / rect.width);
      const normalizedBoxHeight = Math.min(1, newBoxHeight / rect.height);
      const normalizedX = Math.max(0, Math.min(1, newX / rect.width));
      const normalizedY = Math.max(0, Math.min(1, newY / rect.height));

      // Визначаємо, чи це текст, зображення чи shape
      if (resizingItemId.startsWith('text-') || resizingItemId.startsWith('overlay-')) {
        // Ресайз тексту
      updateTextOverlay(resizingItemId, {
        boxWidth: normalizedBoxWidth,
        boxHeight: normalizedBoxHeight,
        x: normalizedX,
        y: normalizedY,
      });
      } else if (resizingItemId.startsWith('image-')) {
        // Ресайз зображення
        updateImageOverlay(resizingItemId, {
          width: normalizedBoxWidth,
          height: normalizedBoxHeight,
          x: normalizedX,
          y: normalizedY,
        });
      } else if (resizingItemId.startsWith('shape-')) {
        // Ресайз shape
        updateShapeOverlay(resizingItemId, {
          width: normalizedBoxWidth,
          height: normalizedBoxHeight,
          x: normalizedX,
          y: normalizedY,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleResize(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      if (e.touches.length > 0) {
        handleResize(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setResizingItemId(null);
      setResizeDirection(null);
      saveHistory(); // Save state after resize
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [resizingItemId, resizeDirection, resizeStart, updateTextOverlay, updateImageOverlay, updateShapeOverlay, overlays, zoom]);

  // Handle signature save
  const handleSignatureSave = (dataUrl: string) => {
    if (!pageId) return;
    
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const width = 0.2; // 20% of page width
      const height = width / aspectRatio;

      addImageOverlay(pageId, {
        x: signaturePadPosition.x,
        y: signaturePadPosition.y,
        width,
        height,
        dataUrl,
        rotation: 0,
        isSignature: true, // Mark as signature for transparent background
      });
      saveHistory();
      
      // Switch to image mode so user can move/resize the signature
      setEditMode('image');
    };
    img.src = dataUrl;
    
    setSignaturePadOpen(false);
  };

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
    saveHistory(); // Save state after delete
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
          ${editMode === 'signature' ? 'cursor-crosshair' : ''}
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
          
          const boxWidth = (overlay.boxWidth || 0.2) * 100;
          const boxHeight = (overlay.boxHeight || 0.05) * 100;
          
          return (
            <div
              key={overlay.id}
              className={`
                overlay-item group absolute
                ${isDragging ? 'opacity-70 cursor-grabbing' : 'cursor-move'}
                ${isEditing ? 'z-10' : 'z-0'}
                ring-2 ring-transparent
                ${isEditing ? 'ring-blue-500' : 'group-hover:ring-blue-500'}
              `}
              style={{
                left: `${overlay.x * 100}%`,
                top: `${overlay.y * 100}%`,
                width: `${boxWidth}%`,
                height: `${boxHeight}%`,
              }}
              onMouseDown={(e) => handleItemMouseDown(e, overlay.id, overlay.x, overlay.y)}
              onTouchStart={(e) => handleItemTouchStart(e, overlay.id, overlay.x, overlay.y)}
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle')) return;
                // В режимі Select (none) - не відкриваємо панель редагування автоматично
                // Тільки в режимі Text або подвійний клік відкриває панель
                if (editMode === 'text') {
                  setEditingOverlayId(isEditing ? null : overlay.id);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle')) return;
                // Подвійний клік завжди відкриває панель редагування
                setEditingOverlayId(isEditing ? null : overlay.id);
              }}
            >
              {/* White Box Background - рівно по тексту + 2px padding */}
              {overlay.backgroundColor && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: isEditing && editingOverlayId === overlay.id
                      ? 'rgba(255, 255, 0, 0.4)' // Напівпрозорий жовтий під час редагування (як маркер)
                      : overlay.backgroundColor,
                  }}
                />
              )}

              {/* Text Content - рівно по розміру тексту з 2px padding */}
              <div
                className="relative w-full h-full flex break-words"
                style={{
                  // Scale padding with zoom so text remains visually centered at different zoom levels
                  padding: `${Math.max(1, Math.round(2 * zoom))}px ${Math.max(1, Math.round(4 * zoom))}px ${Math.max(
                    1,
                    Math.round(4 * zoom)
                  )}px ${Math.max(1, Math.round(2 * zoom))}px`,
                  alignItems: 'center',
                  justifyContent:
                    (overlay.textAlign || 'left') === 'center'
                      ? 'center'
                      : (overlay.textAlign || 'left') === 'right'
                        ? 'flex-end'
                        : 'flex-start',
                  fontSize: `${overlay.fontSize * zoom}px`,
                  lineHeight: '1',
                  color: overlay.color,
                  fontFamily: overlay.fontFamily || 'Helvetica',
                  fontWeight: overlay.fontWeight || 'normal',
                  fontStyle: overlay.fontStyle || 'normal',
                  textAlign: overlay.textAlign || 'left',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {overlay.text}
              </div>

              {/* Resize Handles - 4 сторони + 4 кути */}
              {/* Top */}
              <div
                className="resize-handle absolute -top-0.5 left-0 right-0 h-2 md:h-1 cursor-n-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'top')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'top')}
                title="Drag up to expand from top"
              />
              
              {/* Bottom */}
              <div
                className="resize-handle absolute -bottom-0.5 left-0 right-0 h-2 md:h-1 cursor-s-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'bottom')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'bottom')}
                title="Drag down to expand from bottom"
              />
              
              {/* Left */}
              <div
                className="resize-handle absolute -left-0.5 top-0 bottom-0 w-2 md:w-1 cursor-w-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'left')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'left')}
                title="Drag left to expand from left"
              />
              
              {/* Right */}
              <div
                className="resize-handle absolute -right-0.5 top-0 bottom-0 w-2 md:w-1 cursor-e-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'right')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'right')}
                title="Drag right to expand from right"
              />
              
              {/* Corners */}
              {/* Top Left */}
              <div
                className="resize-handle absolute -top-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-nw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'top-left')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'top-left')}
                title="Drag to resize from top-left"
              />
              
              {/* Top Right */}
              <div
                className="resize-handle absolute -top-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-ne-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'top-right')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'top-right')}
                title="Drag to resize from top-right"
              />
              
              {/* Bottom Left */}
              <div
                className="resize-handle absolute -bottom-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-sw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'bottom-left')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'bottom-left')}
                title="Drag to resize from bottom-left"
              />
              
              {/* Bottom Right */}
              <div
                className="resize-handle absolute -bottom-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-se-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleResizeMouseDown(e, overlay, 'bottom-right')}
                onTouchStart={(e) => handleResizeTouchStart(e, overlay, 'bottom-right')}
                title="Drag to resize from bottom-right"
              />

              {/* Edit Panel */}
              {isEditing && (
                <div className="edit-panel absolute top-full left-0 mt-3 bg-surface-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 min-w-[380px] z-[15] border border-surface-600/50 animate-fade-in-down">
                  <div className="space-y-4">
                    {/* Text Input */}
                    <div>
                      <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Text</label>
                      <textarea
                        value={overlay.text}
                        onChange={(e) => updateTextOverlayWithAutoFit(overlay, { text: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        rows={3}
                        autoFocus
                        placeholder="Enter text..."
                      />
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Font</label>
                      <div className="relative">
                        <select
                          value={overlay.fontFamily || 'Helvetica'}
                          onChange={(e) => updateTextOverlayWithAutoFit(overlay, { fontFamily: e.target.value })}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.value} value={font.value} className="bg-surface-800 text-surface-100">
                              {font.label}
                            </option>
                          ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Font Size & Style */}
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Size</label>
                        <input
                          type="number"
                          value={overlay.fontSize}
                          onChange={(e) =>
                            updateTextOverlayWithAutoFit(overlay, { fontSize: parseInt(e.target.value) || 16 })
                          }
                          min="8"
                          max="72"
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        />
                      </div>

                      <div className="flex gap-2 items-end">
                        <button
                          onClick={() =>
                            updateTextOverlayWithAutoFit(overlay, {
                              fontWeight: overlay.fontWeight === 'bold' ? 'normal' : 'bold',
                            })
                          }
                          className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                            overlay.fontWeight === 'bold' 
                              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                              : 'bg-surface-700/50 text-surface-300 border border-surface-600 hover:border-surface-500'
                          }`}
                          title="Bold"
                        >
                          B
                        </button>
                        <button
                          onClick={() =>
                            updateTextOverlayWithAutoFit(overlay, {
                              fontStyle: overlay.fontStyle === 'italic' ? 'normal' : 'italic',
                            })
                          }
                          className={`w-11 h-11 rounded-xl text-sm italic transition-all ${
                            overlay.fontStyle === 'italic' 
                              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                              : 'bg-surface-700/50 text-surface-300 border border-surface-600 hover:border-surface-500'
                          }`}
                          title="Italic"
                        >
                          I
                        </button>
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Text Color</label>
                      <div className="relative">
                        <input
                          type="color"
                          value={overlay.color}
                          onChange={(e) => updateTextOverlay(overlay.id, { color: e.target.value })}
                          className="w-full h-12 bg-surface-700/50 border border-surface-600 rounded-xl cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all [&::-webkit-color-swatch-wrapper]:p-1.5 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div>
                      <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Background</label>
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="color"
                            value={overlay.backgroundColor || '#ffffff'}
                            onChange={(e) => updateTextOverlay(overlay.id, { backgroundColor: e.target.value })}
                            className="w-full h-12 bg-surface-700/50 border border-surface-600 rounded-xl cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all [&::-webkit-color-swatch-wrapper]:p-1.5 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                          />
                        </div>
                        <button
                          onClick={() => updateTextOverlay(overlay.id, {
                            backgroundColor: overlay.backgroundColor ? undefined : '#ffffff'
                          })}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            overlay.backgroundColor 
                              ? 'bg-error-500/20 text-error-400 border border-error-500/30 hover:bg-error-500/30' 
                              : 'bg-surface-700/50 text-surface-300 border border-surface-600 hover:border-surface-500'
                          }`}
                        >
                          {overlay.backgroundColor ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-surface-600/50">
                      <button
                        onClick={() => handleDeleteClick(overlay.id, 'text')}
                        className="px-5 py-2.5 bg-error-500/20 text-error-400 rounded-xl text-sm font-medium border border-error-500/30 hover:bg-error-500/30 transition-all"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditingOverlayId(null)}
                        className="flex-1 px-5 py-2.5 bg-surface-600 text-surface-100 rounded-xl text-sm font-medium hover:bg-surface-500 transition-all"
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
          const isResizing = resizingItemId === image.id;
          const isEditing = editingImageId === image.id;
          
          return (
            <div
              key={image.id}
              className={`
                overlay-item group absolute
                ${isDragging ? 'opacity-70 cursor-grabbing' : 'cursor-move'}
                ${isResizing ? 'z-10' : 'z-0'}
                ring-2 ring-transparent
                ${isEditing ? 'ring-blue-500' : 'group-hover:ring-blue-500'}
              `}
              style={{
                left: `${image.x * 100}%`,
                top: `${image.y * 100}%`,
                width: `${image.width * 100}%`,
                height: `${image.height * 100}%`,
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button') || target.closest('.edit-panel')) return;
                handleItemMouseDown(e, image.id, image.x, image.y);
              }}
              onTouchStart={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button') || target.closest('.edit-panel')) return;
                handleItemTouchStart(e, image.id, image.x, image.y);
              }}
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button')) return;
                if (editMode === 'none') {
                  // Закриваємо інші панелі редагування перед відкриттям нової
                  if (editingImageId !== image.id) {
                    setEditingImageId(image.id);
                  } else {
                    setEditingImageId(null);
                  }
                } else if (editMode === 'image') {
                  // В режимі додавання зображення закриваємо панель редагування
                  setEditingImageId(null);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button')) return;
                // Подвійний клік завжди відкриває/закриває панель редагування
                setEditingImageId(editingImageId === image.id ? null : image.id);
              }}
            >
              <img
                src={image.dataUrl}
                alt="Overlay"
                className={`w-full h-full object-contain rounded pointer-events-none ${
                  image.isSignature 
                    ? '' // No border for signatures (transparent background)
                    : 'border-2 border-blue-400'
                }`}
                draggable={false}
                style={{
                  transform: `rotate(${image.rotation || 0}deg)`,
                  transformOrigin: 'center center',
                  backgroundColor: image.isSignature ? 'transparent' : undefined,
                }}
              />
              
              {/* Resize Handles - 4 сторони + 4 кути */}
              {/* Top */}
              <div
                className="resize-handle absolute -top-0.5 left-0 right-0 h-2 md:h-1 cursor-n-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'top')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'top')}
                title="Drag up to resize from top"
              />
              
              {/* Bottom */}
              <div
                className="resize-handle absolute -bottom-0.5 left-0 right-0 h-2 md:h-1 cursor-s-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'bottom')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'bottom')}
                title="Drag down to resize from bottom"
              />
              
              {/* Left */}
              <div
                className="resize-handle absolute -left-0.5 top-0 bottom-0 w-2 md:w-1 cursor-w-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'left')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'left')}
                title="Drag left to resize from left"
              />
              
              {/* Right */}
              <div
                className="resize-handle absolute -right-0.5 top-0 bottom-0 w-2 md:w-1 cursor-e-resize bg-blue-600 hover:bg-blue-700 opacity-60 md:opacity-20 md:hover:opacity-60 active:opacity-100 transition-opacity z-10 touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'right')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'right')}
                title="Drag right to resize from right"
              />
              
              {/* Corners */}
              {/* Top Left */}
              <div
                className="resize-handle absolute -top-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-nw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'top-left')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'top-left')}
                title="Drag to resize from top-left"
              />
              
              {/* Top Right */}
              <div
                className="resize-handle absolute -top-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-ne-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'top-right')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'top-right')}
                title="Drag to resize from top-right"
              />
              
              {/* Bottom Left */}
              <div
                className="resize-handle absolute -bottom-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-sw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'bottom-left')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'bottom-left')}
                title="Drag to resize from bottom-left"
              />
              
              {/* Bottom Right */}
              <div
                className="resize-handle absolute -bottom-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-se-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleImageResizeMouseDown(e, image, 'bottom-right')}
                onTouchStart={(e) => handleImageResizeTouchStart(e, image, 'bottom-right')}
                title="Drag to resize from bottom-right"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId(editingImageId === image.id ? null : image.id);
                }}
                className={`settings-button absolute -top-2 -left-2 bg-white/90 text-gray-800 w-8 h-8 rounded-md border border-gray-200 hover:bg-white flex items-center justify-center shadow-sm backdrop-blur z-20 transition-all ${
                  isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
                title="Settings"
                style={{ lineHeight: '1' }}
              >
                <span className="text-base">⚙</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(image.id, 'image');
                }}
                className={`delete-button absolute -top-2 -right-2 bg-white/90 text-red-600 w-8 h-8 rounded-md border border-gray-200 hover:bg-white flex items-center justify-center shadow-sm backdrop-blur z-20 transition-all ${
                  isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
                title="Delete"
              >
                <span className="text-base">✕</span>
              </button>

              {/* Edit Panel */}
              {editingImageId === image.id && (
                <div className="edit-panel absolute top-full left-0 mt-3 bg-surface-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 min-w-[340px] z-[15] border border-surface-600/50 animate-fade-in-down">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-surface-100">Image Settings</span>
                    </div>
                    
                    {/* Width */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                        <span>Width</span>
                        <span className="text-primary-400 font-mono">{(image.width * 100).toFixed(1)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.05"
                        max="1"
                        step="0.01"
                        value={image.width}
                        onChange={(e) => updateImageOverlay(image.id, { width: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                      <input
                        type="number"
                        min="5"
                        max="100"
                        step="0.1"
                        value={(image.width * 100).toFixed(1)}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val >= 5 && val <= 100) {
                            updateImageOverlay(image.id, { width: val / 100 });
                          }
                        }}
                        className="w-full mt-2 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                      />
                    </div>

                    {/* Height */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                        <span>Height</span>
                        <span className="text-primary-400 font-mono">{(image.height * 100).toFixed(1)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.05"
                        max="1"
                        step="0.01"
                        value={image.height}
                        onChange={(e) => updateImageOverlay(image.id, { height: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                      <input
                        type="number"
                        min="5"
                        max="100"
                        step="0.1"
                        value={(image.height * 100).toFixed(1)}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val >= 5 && val <= 100) {
                            updateImageOverlay(image.id, { height: val / 100 });
                          }
                        }}
                        className="w-full mt-2 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                      />
                    </div>

                    {/* Rotation */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                        <span>Rotation</span>
                        <span className="text-primary-400 font-mono">{image.rotation || 0}°</span>
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="1"
                          value={image.rotation || 0}
                          onChange={(e) => updateImageOverlay(image.id, { rotation: parseInt(e.target.value) })}
                          className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <input
                          type="number"
                          min="0"
                          max="360"
                          step="1"
                          value={image.rotation || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 0 && val <= 360) {
                              updateImageOverlay(image.id, { rotation: val });
                            }
                          }}
                          className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        />
                        <button
                          onClick={() => {
                            const currentRotation = image.rotation || 0;
                            const newRotation = (currentRotation + 90) % 360;
                            updateImageOverlay(image.id, { rotation: newRotation });
                          }}
                          className="px-3 py-2 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-xl text-sm font-medium hover:bg-primary-500/30 transition-all"
                          title="Rotate 90°"
                        >
                          ↻ 90°
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-surface-600/50">
                      <button
                        onClick={() => handleDeleteClick(image.id, 'image')}
                        className="px-5 py-2.5 bg-error-500/20 text-error-400 rounded-xl text-sm font-medium border border-error-500/30 hover:bg-error-500/30 transition-all"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditingImageId(null)}
                        className="flex-1 px-5 py-2.5 bg-surface-600 text-surface-100 rounded-xl text-sm font-medium hover:bg-surface-500 transition-all"
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

        {/* Render Shapes */}
        {shapes.map((shape) => {
          const isDragging = draggingItemId === shape.id;
          const isEditing = editingShapeId === shape.id;
          const opacity = shape.opacity !== undefined ? shape.opacity : (shape.type === 'highlight' ? 0.3 : 1);
          const strokeEnabled = shape.type === 'highlight' ? false : shape.strokeEnabled !== false;
          const fillEnabled =
            shape.type === 'highlight'
              ? true
              : shape.fillEnabled !== undefined
                ? shape.fillEnabled
                : !!shape.fillColor;
          const effectiveFill = fillEnabled ? (shape.fillColor || 'none') : 'none';
          const effectiveStroke = strokeEnabled ? shape.color : 'none';
          
          return (
            <div
              key={shape.id}
              className={`
                overlay-item group absolute
                ${isDragging ? 'opacity-70 cursor-grabbing' : 'cursor-move'}
                ${isEditing ? 'z-10' : 'z-0'}
                ring-2 ring-transparent
                ${isEditing ? 'ring-blue-500' : 'group-hover:ring-blue-500'}
              `}
              style={{
                left: `${shape.x * 100}%`,
                top: `${shape.y * 100}%`,
                width: `${shape.width * 100}%`,
                height: `${shape.height * 100}%`,
              }}
              data-shape-width={shape.width * pageWidth * zoom}
              data-shape-height={shape.height * pageHeight * zoom}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button') || target.closest('.edit-panel')) return;
                handleItemMouseDown(e, shape.id, shape.x, shape.y);
              }}
              onTouchStart={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button') || target.closest('.edit-panel')) return;
                handleItemTouchStart(e, shape.id, shape.x, shape.y);
              }}
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button')) return;
                if (editMode === 'none') {
                  setEditingShapeId(editingShapeId === shape.id ? null : shape.id);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target.closest('.edit-panel') || target.closest('.resize-handle') || target.closest('.settings-button') || target.closest('.delete-button')) return;
                setEditingShapeId(editingShapeId === shape.id ? null : shape.id);
              }}
            >
              <svg 
                width="100%" 
                height="100%" 
                style={{ overflow: 'visible' }}
                viewBox={`0 0 ${shape.width * pageWidth * zoom} ${shape.height * pageHeight * zoom}`}
                preserveAspectRatio="none"
              >
                {shape.type === 'rectangle' && (
                  <rect
                    width="100%"
                    height="100%"
                    fill={effectiveFill}
                    fillOpacity={opacity}
                    stroke={effectiveStroke}
                    strokeWidth={shape.lineWidth || 2}
                    strokeDasharray={shape.dashArray?.join(' ')}
                  />
                )}
                {shape.type === 'circle' && (
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fill={effectiveFill}
                    fillOpacity={opacity}
                    stroke={effectiveStroke}
                    strokeWidth={shape.lineWidth || 2}
                    strokeDasharray={shape.dashArray?.join(' ')}
                  />
                )}
                {shape.type === 'line' && (
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke={effectiveStroke}
                    strokeWidth={shape.lineWidth || 2}
                    strokeDasharray={shape.dashArray?.join(' ')}
                    opacity={opacity}
                  />
                )}
                {shape.type === 'arrow' && (() => {
                  // Розраховуємо розмір контейнера в пікселях
                  const containerWidthPx = shape.width * pageWidth * zoom;
                  const containerHeightPx = shape.height * pageHeight * zoom;
                  
                  // Розраховуємо довжину стрілки для пропорційної голівки
                  const arrowLength = Math.sqrt(containerWidthPx * containerWidthPx + containerHeightPx * containerHeightPx);
                  const headSize = Math.max(12, Math.min(35, arrowLength / 7));
                  
                  // Використовуємо координати в межах viewBox
                  const lineWidth = shape.lineWidth || 2;
                  
                  return (
                    <>
                      <defs>
                        <marker
                          id={`arrowhead-${shape.id}`}
                          markerWidth={headSize}
                          markerHeight={headSize}
                          refX={headSize - lineWidth}
                          refY={headSize / 2}
                          orient="auto"
                          markerUnits="userSpaceOnUse"
                        >
                          <polygon
                            points={`0,0 ${headSize},${headSize / 2} 0,${headSize}`}
                            fill={effectiveStroke}
                            opacity={opacity}
                          />
                        </marker>
                      </defs>
                    <line
                      x1="0"
                        y1="0"
                        x2={containerWidthPx}
                        y2={containerHeightPx}
                      stroke={effectiveStroke}
                        strokeWidth={lineWidth}
                        strokeDasharray={shape.dashArray?.join(' ')}
                        opacity={opacity}
                        markerEnd={`url(#arrowhead-${shape.id})`}
                    />
                  </>
                  );
                })()}
                {shape.type === 'highlight' && (
                  <rect
                    width="100%"
                    height="100%"
                    fill={shape.fillColor || shape.color}
                    fillOpacity={opacity}
                    stroke="none"
                  />
                )}
              </svg>
              
              {/* Resize Handles - 4 кути */}
              {/* Top Left */}
              <div
                className="resize-handle absolute -top-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-nw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleShapeResizeMouseDown(e, shape, 'top-left')}
                onTouchStart={(e) => handleShapeResizeTouchStart(e, shape, 'top-left')}
                title="Drag to resize from top-left"
              />
              
              {/* Top Right */}
              <div
                className="resize-handle absolute -top-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-ne-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleShapeResizeMouseDown(e, shape, 'top-right')}
                onTouchStart={(e) => handleShapeResizeTouchStart(e, shape, 'top-right')}
                title="Drag to resize from top-right"
              />
              
              {/* Bottom Left */}
              <div
                className="resize-handle absolute -bottom-1.5 -left-1.5 w-6 h-6 md:w-3 md:h-3 cursor-sw-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleShapeResizeMouseDown(e, shape, 'bottom-left')}
                onTouchStart={(e) => handleShapeResizeTouchStart(e, shape, 'bottom-left')}
                title="Drag to resize from bottom-left"
              />
              
              {/* Bottom Right */}
              <div
                className="resize-handle absolute -bottom-1.5 -right-1.5 w-6 h-6 md:w-3 md:h-3 cursor-se-resize bg-blue-600 hover:bg-blue-700 rounded-full opacity-60 md:opacity-0 md:hover:opacity-100 active:opacity-100 transition-opacity z-10 shadow-lg touch-none"
                onMouseDown={(e) => handleShapeResizeMouseDown(e, shape, 'bottom-right')}
                onTouchStart={(e) => handleShapeResizeTouchStart(e, shape, 'bottom-right')}
                title="Drag to resize from bottom-right"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingShapeId(editingShapeId === shape.id ? null : shape.id);
                }}
                className={`settings-button absolute -top-2 -left-2 bg-white/90 text-gray-800 w-8 h-8 rounded-md border border-gray-200 hover:bg-white flex items-center justify-center shadow-sm backdrop-blur z-20 transition-all ${
                  isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
                title="Settings"
                style={{ lineHeight: '1' }}
              >
                <span className="text-base">⚙</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(shape.id, 'shape');
                }}
                className={`delete-button absolute -top-2 -right-2 bg-white/90 text-red-600 w-8 h-8 rounded-md border border-gray-200 hover:bg-white flex items-center justify-center shadow-sm backdrop-blur z-20 transition-all ${
                  isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
                title="Delete"
              >
                <span className="text-base">✕</span>
              </button>

              {/* Edit Panel */}
              {editingShapeId === shape.id && (
                <div className="edit-panel absolute top-full left-0 mt-3 bg-surface-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 min-w-[360px] z-[15] border border-surface-600/50 animate-fade-in-down">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-surface-100">Shape Settings</span>
                    </div>
                    
                    {/* Border Color */}
                    <div>
                      <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                        {shape.type === 'highlight' ? 'Color' : 'Border Color'}
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={shape.color}
                          onChange={(e) => updateShapeOverlay(shape.id, { color: e.target.value })}
                          className="w-14 h-11 bg-surface-700/50 border border-surface-600 rounded-xl cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all [&::-webkit-color-swatch-wrapper]:p-1.5 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                        />
                        <input
                          type="text"
                          value={shape.color}
                          onChange={(e) => updateShapeOverlay(shape.id, { color: e.target.value })}
                          className="flex-1 px-3 py-2.5 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Outline toggle */}
                    {shape.type !== 'highlight' && (
                      <div>
                        <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Outline</label>
                        <button
                          onClick={() => updateShapeOverlay(shape.id, { strokeEnabled: shape.strokeEnabled === false })}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            shape.strokeEnabled === false
                              ? 'bg-surface-700/50 text-surface-400 border border-surface-600'
                              : 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                          }`}
                          title={shape.strokeEnabled === false ? 'Enable outline' : 'Disable outline'}
                        >
                          {shape.strokeEnabled === false ? 'Outline: OFF' : 'Outline: ON'}
                        </button>
                      </div>
                    )}

                    {/* Fill Color (for rectangle and circle) */}
                    {(shape.type === 'rectangle' || shape.type === 'circle') && (
                      <div>
                        <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                          Fill
                        </label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            value={shape.fillColor || shape.color || '#ffffff'}
                            onChange={(e) => updateShapeOverlay(shape.id, { fillColor: e.target.value, fillEnabled: true })}
                            className="w-14 h-11 bg-surface-700/50 border border-surface-600 rounded-xl cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all disabled:opacity-50 [&::-webkit-color-swatch-wrapper]:p-1.5 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                            disabled={shape.fillEnabled === false}
                          />
                          <input
                            type="text"
                            value={shape.fillColor || ''}
                            onChange={(e) => updateShapeOverlay(shape.id, { fillColor: e.target.value, fillEnabled: true })}
                            className="flex-1 px-3 py-2.5 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all disabled:opacity-50"
                            placeholder="none"
                            disabled={shape.fillEnabled === false}
                          />
                          <button
                            onClick={() => updateShapeOverlay(shape.id, {
                              fillEnabled: shape.fillEnabled === false ? true : false,
                              fillColor:
                                shape.fillEnabled === false
                                  ? (shape.fillColor || shape.color || '#ffffff')
                                  : shape.fillColor,
                            })}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              shape.fillEnabled === false 
                                ? 'bg-surface-700/50 text-surface-400 border border-surface-600' 
                                : 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            }`}
                            title={shape.fillEnabled === false ? 'Enable fill' : 'Disable fill'}
                          >
                            {shape.fillEnabled === false ? 'OFF' : 'ON'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Line Width */}
                    {shape.type !== 'highlight' && (
                      <div>
                        <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                          <span>Line Width</span>
                          <span className="text-primary-400 font-mono">{shape.lineWidth || 2}px</span>
                        </label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={shape.lineWidth || 2}
                            onChange={(e) => updateShapeOverlay(shape.id, { lineWidth: parseFloat(e.target.value) })}
                            className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                          />
                          <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.5"
                            value={shape.lineWidth || 2}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val) && val >= 1 && val <= 10) {
                                updateShapeOverlay(shape.id, { lineWidth: val });
                              }
                            }}
                            className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {/* Opacity */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">
                        <span>Opacity</span>
                        <span className="text-primary-400 font-mono">{Math.round((opacity) * 100)}%</span>
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={opacity}
                          onChange={(e) => updateShapeOverlay(shape.id, { opacity: parseFloat(e.target.value) })}
                          className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="5"
                          value={Math.round(opacity * 100)}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 0 && val <= 100) {
                              updateShapeOverlay(shape.id, { opacity: val / 100 });
                            }
                          }}
                          className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Line Style (for lines, arrows, rectangles, circles) */}
                    {shape.type !== 'highlight' && (
                      <div>
                        <label className="block text-xs font-medium text-surface-300 mb-2 uppercase tracking-wider">Line Style</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateShapeOverlay(shape.id, { dashArray: undefined })}
                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              !shape.dashArray 
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                                : 'bg-surface-700/50 text-surface-400 border border-surface-600 hover:border-surface-500'
                            }`}
                          >
                            Solid
                          </button>
                          <button
                            onClick={() => updateShapeOverlay(shape.id, { dashArray: [5, 5] })}
                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              shape.dashArray?.join(',') === '5,5' 
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                                : 'bg-surface-700/50 text-surface-400 border border-surface-600 hover:border-surface-500'
                            }`}
                          >
                            Dashed
                          </button>
                          <button
                            onClick={() => updateShapeOverlay(shape.id, { dashArray: [2, 2] })}
                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              shape.dashArray?.join(',') === '2,2' 
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                                : 'bg-surface-700/50 text-surface-400 border border-surface-600 hover:border-surface-500'
                            }`}
                          >
                            Dotted
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-surface-600/50">
                      <button
                        onClick={() => handleDeleteClick(shape.id, 'shape')}
                        className="px-5 py-2.5 bg-error-500/20 text-error-400 rounded-xl text-sm font-medium border border-error-500/30 hover:bg-error-500/30 transition-all"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditingShapeId(null)}
                        className="flex-1 px-5 py-2.5 bg-surface-600 text-surface-100 rounded-xl text-sm font-medium hover:bg-surface-500 transition-all"
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

      {/* Signature Pad */}
      {signaturePadOpen && (
        <SignaturePad
          isOpen={signaturePadOpen}
          onClose={() => setSignaturePadOpen(false)}
          onSave={handleSignatureSave}
          position={signaturePadPosition}
          pageWidth={pageWidth}
          pageHeight={pageHeight}
          zoom={zoom}
        />
      )}

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
