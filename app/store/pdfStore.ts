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
  extractTextOnLoad: boolean;

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
  setExtractTextOnLoad: (extract: boolean) => void;
  setIsExporting: (isExporting: boolean) => void;
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
  // By default behave more like a simple \"Word for PDF\":
  // do NOT auto-extract original text (user can turn it on in the toolbar)
  extractTextOnLoad: false,
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

  setExtractTextOnLoad: (extract) => set({ extractTextOnLoad: extract }),

  setIsExporting: (isExporting) => set({ isExporting }),

  reset: () => set(initialState),
}));
