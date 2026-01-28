import { create } from 'zustand';

export interface TextOverlay {
  id: string;
  pageId: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  text: string;
  fontSize: number;
  color: string;
  isOriginal?: boolean; // true if extracted from original PDF
  hidden?: boolean; // hide original text when editing
  autoFit?: boolean; // auto-fit boxWidth/boxHeight to text while editing (disabled after manual resize)
  // Font & background options to better match original PDF appearance
  fontFamily?: string; // e.g. 'Helvetica', 'Times', 'Courier', 'Arial', etc.
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string; // e.g. '#ffffff' for white redaction box
  boxWidth?: number; // normalized (0-1) width of white box / text area
  boxHeight?: number; // normalized (0-1) height of white box / text area
}

export interface ImageOverlay {
  id: string;
  pageId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
  rotation?: number; // rotation in degrees (0-360)
  deleted?: boolean;
}

export interface ShapeOverlay {
  id: string;
  pageId: string;
  type: 'rectangle' | 'circle' | 'line' | 'arrow' | 'highlight';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  lineWidth?: number;
  fillColor?: string; // колір заливки
  fillEnabled?: boolean; // якщо false -> заливку не малюємо навіть якщо fillColor заданий
  strokeEnabled?: boolean; // якщо false -> обрис/лінію не малюємо
  opacity?: number; // прозорість (0-1)
  dashArray?: number[]; // стиль лінії [dash, gap] для пунктирної лінії
}

export interface PdfPage {
  id: string;
  index: number; // original index
  rotation: number; // 0, 90, 180, 270
  deleted: boolean;
  overlays: TextOverlay[];
  images: ImageOverlay[];
  shapes: ShapeOverlay[];
  width: number;
  height: number;
}

type HistoryEntry = {
  pages: PdfPage[];
  timestamp: number;
};

interface PdfState {
  originalFile: File | null;
  originalFileUrl: string | null;
  pages: PdfPage[];
  selectedPageId: string | null;
  zoom: number;
  fileName: string;
  fileSize: number;
  isExporting: boolean;
  editMode: 'text' | 'image' | 'shape' | 'none';
  selectedShapeType: ShapeOverlay['type'];
  selectedShapeStyle: 'outline' | 'filled';
  extractTextOnLoad: boolean;
  
  // History for Undo/Redo
  history: HistoryEntry[];
  historyIndex: number;
  
  // Multi-select
  selectedItems: string[]; // IDs of selected overlays/images/shapes
  clipboard: {
    type: 'text' | 'image' | 'shape';
    data: any;
  } | null;

  // Actions
  setOriginalFile: (file: File, fileUrl: string) => void;
  setPages: (pages: PdfPage[]) => void;
  setSelectedPageId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  reorderPages: (sourceIndex: number, destinationIndex: number) => void;
  deletePage: (pageId: string) => void;
  rotatePage: (pageId: string, degrees: number) => void;
  addTextOverlay: (pageId: string, overlay: Omit<TextOverlay, 'id' | 'pageId'>) => void;
  updateTextOverlay: (overlayId: string, updates: Partial<TextOverlay>) => void;
  deleteTextOverlay: (overlayId: string) => void;
  addImageOverlay: (pageId: string, image: Omit<ImageOverlay, 'id' | 'pageId'>) => void;
  updateImageOverlay: (imageId: string, updates: Partial<ImageOverlay>) => void;
  deleteImageOverlay: (imageId: string) => void;
  addShapeOverlay: (pageId: string, shape: Omit<ShapeOverlay, 'id' | 'pageId'>) => void;
  updateShapeOverlay: (shapeId: string, updates: Partial<ShapeOverlay>) => void;
  deleteShapeOverlay: (shapeId: string) => void;
  setEditMode: (mode: 'text' | 'image' | 'shape' | 'none') => void;
  setSelectedShapeType: (type: ShapeOverlay['type']) => void;
  setSelectedShapeStyle: (style: 'outline' | 'filled') => void;
  setExtractTextOnLoad: (extract: boolean) => void;
  setIsExporting: (isExporting: boolean) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  
  // Multi-select actions
  selectItem: (id: string, append?: boolean) => void;
  deselectItem: (id: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  deleteSelected: () => void;
  
  // Clipboard actions
  copySelected: () => void;
  pasteClipboard: () => void;
  duplicateSelected: () => void;
  
  reset: () => void;
}

const initialState = {
  originalFile: null,
  originalFileUrl: null,
  pages: [],
  selectedPageId: null,
  zoom: 1,
  fileName: '',
  fileSize: 0,
  isExporting: false,
  editMode: 'none' as const,
  selectedShapeType: 'rectangle' as const,
  selectedShapeStyle: 'outline' as const,
  // By default behave more like a simple \"Word for PDF\":
  // do NOT auto-extract original text (user can turn it on in the toolbar)
  extractTextOnLoad: false,
  history: [] as HistoryEntry[],
  historyIndex: -1,
  selectedItems: [] as string[],
  clipboard: null as any,
};

export const usePdfStore = create<PdfState>((set) => ({
  ...initialState,

  setOriginalFile: (file, fileUrl) =>
    set({
      originalFile: file,
      originalFileUrl: fileUrl,
      fileName: file.name,
      fileSize: file.size,
    }),

  setPages: (pages) => set({ pages }),

  setSelectedPageId: (id) => set({ selectedPageId: id }),

  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3, zoom)) }),

  reorderPages: (sourceIndex, destinationIndex) =>
    set((state) => {
      const newPages = [...state.pages];
      const [movedPage] = newPages.splice(sourceIndex, 1);
      newPages.splice(destinationIndex, 0, movedPage);
      return { pages: newPages };
    }),

  deletePage: (pageId) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId ? { ...page, deleted: true } : page
      ),
    })),

  rotatePage: (pageId, degrees) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? { ...page, rotation: (page.rotation + degrees) % 360 }
          : page
      ),
    })),

  addTextOverlay: (pageId, overlay) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              overlays: [
                ...page.overlays,
                {
                  ...overlay,
                  id: `overlay-${Date.now()}-${Math.random()}`,
                  pageId,
                },
              ],
            }
          : page
      ),
    })),

  updateTextOverlay: (overlayId, updates) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        overlays: page.overlays.map((overlay) =>
          overlay.id === overlayId ? { ...overlay, ...updates } : overlay
        ),
      })),
    })),

  deleteTextOverlay: (overlayId) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        overlays: page.overlays.filter((overlay) => overlay.id !== overlayId),
      })),
    })),

  addImageOverlay: (pageId, image) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              images: [
                ...page.images,
                {
                  ...image,
                  id: `image-${Date.now()}-${Math.random()}`,
                  pageId,
                },
              ],
            }
          : page
      ),
    })),

  updateImageOverlay: (imageId, updates) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        images: page.images.map((img) =>
          img.id === imageId ? { ...img, ...updates } : img
        ),
      })),
    })),

  deleteImageOverlay: (imageId) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        images: page.images.map((img) =>
          img.id === imageId ? { ...img, deleted: true } : img
        ),
      })),
    })),

  addShapeOverlay: (pageId, shape) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              shapes: [
                ...page.shapes,
                {
                  ...shape,
                  id: `shape-${Date.now()}-${Math.random()}`,
                  pageId,
                },
              ],
            }
          : page
      ),
    })),

  updateShapeOverlay: (shapeId, updates) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        shapes: page.shapes.map((shape) =>
          shape.id === shapeId ? { ...shape, ...updates } : shape
        ),
      })),
    })),

  deleteShapeOverlay: (shapeId) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        shapes: page.shapes.filter((shape) => shape.id !== shapeId),
      })),
    })),

  setEditMode: (mode) => set({ editMode: mode }),

  setSelectedShapeType: (type) => set({ selectedShapeType: type }),

  setSelectedShapeStyle: (style) => set({ selectedShapeStyle: style }),

  setExtractTextOnLoad: (extract) => set({ extractTextOnLoad: extract }),

  setIsExporting: (isExporting) => set({ isExporting }),

  // History
  saveHistory: () =>
    set((state) => {
      const newEntry: HistoryEntry = {
        pages: JSON.parse(JSON.stringify(state.pages)),
        timestamp: Date.now(),
      };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newEntry);
      // Limit history to 50 entries
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          pages: JSON.parse(JSON.stringify(state.history[newIndex].pages)),
          historyIndex: newIndex,
        };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          pages: JSON.parse(JSON.stringify(state.history[newIndex].pages)),
          historyIndex: newIndex,
        };
      }
      return state;
    }),

  // Multi-select
  selectItem: (id, append = false) =>
    set((state) => ({
      selectedItems: append
        ? state.selectedItems.includes(id)
          ? state.selectedItems
          : [...state.selectedItems, id]
        : [id],
    })),

  deselectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
    })),

  clearSelection: () => set({ selectedItems: [] }),

  selectAll: () =>
    set((state) => {
      const currentPage = state.pages.find((p) => p.id === state.selectedPageId);
      if (!currentPage) return state;

      const allIds = [
        ...currentPage.overlays.map((o) => o.id),
        ...currentPage.images.filter((i) => !i.deleted).map((i) => i.id),
        ...currentPage.shapes.map((s) => s.id),
      ];

      return { selectedItems: allIds };
    }),

  deleteSelected: () =>
    set((state) => {
      const newPages = state.pages.map((page) => ({
        ...page,
        overlays: page.overlays.filter((o) => !state.selectedItems.includes(o.id)),
        images: page.images.map((i) =>
          state.selectedItems.includes(i.id) ? { ...i, deleted: true } : i
        ),
        shapes: page.shapes.filter((s) => !state.selectedItems.includes(s.id)),
      }));

      return {
        pages: newPages,
        selectedItems: [],
      };
    }),

  // Clipboard
  copySelected: () =>
    set((state) => {
      if (state.selectedItems.length === 0) return state;

      const currentPage = state.pages.find((p) => p.id === state.selectedPageId);
      if (!currentPage) return state;

      const copiedItems: any[] = [];

      state.selectedItems.forEach((id) => {
        const overlay = currentPage.overlays.find((o) => o.id === id);
        const image = currentPage.images.find((i) => i.id === id);
        const shape = currentPage.shapes.find((s) => s.id === id);

        if (overlay) copiedItems.push({ type: 'text', data: overlay });
        if (image) copiedItems.push({ type: 'image', data: image });
        if (shape) copiedItems.push({ type: 'shape', data: shape });
      });

      return {
        clipboard: {
          type: 'multiple' as any,
          data: copiedItems,
        },
      };
    }),

  pasteClipboard: () =>
    set((state) => {
      if (!state.clipboard || !state.selectedPageId) return state;

      const { addTextOverlay, addImageOverlay, addShapeOverlay } = usePdfStore.getState();

      const items = state.clipboard.data;
      if (Array.isArray(items)) {
        items.forEach((item: any) => {
          const offset = 0.02; // Small offset for pasted items
          if (item.type === 'text') {
            addTextOverlay(state.selectedPageId!, {
              ...item.data,
              x: Math.min(1, item.data.x + offset),
              y: Math.min(1, item.data.y + offset),
            });
          } else if (item.type === 'image') {
            addImageOverlay(state.selectedPageId!, {
              ...item.data,
              x: Math.min(1, item.data.x + offset),
              y: Math.min(1, item.data.y + offset),
            });
          } else if (item.type === 'shape') {
            addShapeOverlay(state.selectedPageId!, {
              ...item.data,
              x: Math.min(1, item.data.x + offset),
              y: Math.min(1, item.data.y + offset),
            });
          }
        });
      }

      return state;
    }),

  duplicateSelected: () =>
    set((state) => {
      const { copySelected, pasteClipboard } = usePdfStore.getState();
      copySelected();
      pasteClipboard();
      return state;
    }),

  reset: () => set(initialState),
}));
