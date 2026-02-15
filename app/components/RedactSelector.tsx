'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { X, Trash2 } from 'lucide-react';
import type { RedactionArea } from '../lib/pdf/redactPdf';

interface RedactSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  pdfFile: File | null;
  onRedactionsSelected: (redactions: RedactionArea[]) => void;
}

export default function RedactSelector({
  isOpen,
  onClose,
  pdfFile,
  onRedactionsSelected,
}: RedactSelectorProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [redactions, setRedactions] = useState<RedactionArea[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<{ x: number; y: number } | null>(null);
  const [selectedRedactionId, setSelectedRedactionId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load and render PDF page
  useEffect(() => {
    if (!isOpen || !pdfFile) return;

    const loadAndRender = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const pdfDoc = await loadPdfDocument(pdfFile);
        const pageCount = pdfDoc.numPages;
        setTotalPages(pageCount);
        
        if (currentPage > pageCount || currentPage < 1) {
          setCurrentPage(1);
        }

        // Get real PDF page dimensions
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });
        setPdfPageSize({ width: viewport.width, height: viewport.height });

        // Calculate render scale (maxWidth=1200)
        const maxWidth = 1200;
        const scale = maxWidth / viewport.width;
        setRenderScale(scale);

        // Render page to image
        const dataUrl = await renderPageToDataUrl(pdfDoc, currentPage, maxWidth, 0);
        setPageImage(dataUrl);
      } catch (error) {
        console.error('Error loading/rendering PDF:', error);
        setLoadError(error instanceof Error ? error.message : 'Failed to load PDF');
        setPageImage(null);
        setPdfPageSize(null);
        setRenderScale(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAndRender();
  }, [isOpen, pdfFile, currentPage]);

  // Filter redactions for current page
  const currentPageRedactions = redactions.filter(r => r.pageNumber === currentPage);

  // Calculate displayed image area (accounting for object-fit: contain)
  const getDisplayArea = (img: HTMLImageElement, rect: DOMRect) => {
    if (!img.naturalWidth || !img.naturalHeight) {
      return { width: rect.width, height: rect.height, offsetX: 0, offsetY: 0 };
    }

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const rectAspect = rect.width / rect.height;

    if (imgAspect > rectAspect) {
      const width = rect.width;
      const height = rect.width / imgAspect;
      return {
        width,
        height,
        offsetX: 0,
        offsetY: (rect.height - height) / 2,
      };
    } else {
      const width = rect.height * imgAspect;
      const height = rect.height;
      return {
        width,
        height,
        offsetX: (rect.width - width) / 2,
        offsetY: 0,
      };
    }
  };

  // Convert click position to normalized coordinates (0-1)
  const clickToNormalized = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) return null;

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    const clickX = clientX - rect.left - display.offsetX;
    const clickY = clientY - rect.top - display.offsetY;

    if (clickX < 0 || clickX > display.width || clickY < 0 || clickY > display.height) {
      return null;
    }

    const displayToRenderedX = img.naturalWidth / display.width;
    const displayToRenderedY = img.naturalHeight / display.height;
    const renderedX = clickX * displayToRenderedX;
    const renderedY = clickY * displayToRenderedY;

    const pdfScale = img.naturalWidth / pdfPageSize.width;
    const pdfX = renderedX / pdfScale;
    const pdfY = renderedY / pdfScale;

    const x = Math.max(0, Math.min(1, pdfX / pdfPageSize.width));
    const y = Math.max(0, Math.min(1, pdfY / pdfPageSize.height));

    return { x, y };
  };

  // Convert normalized coordinates to pixel position for display
  const normalizedToPixel = (normalized: { x: number; y: number; width: number; height: number }): { x: number; y: number; width: number; height: number } | null => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return null;
    }

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    const pdfX = normalized.x * pdfPageSize.width;
    const pdfY = normalized.y * pdfPageSize.height;
    const pdfWidth = normalized.width * pdfPageSize.width;
    const pdfHeight = normalized.height * pdfPageSize.height;

    const pdfScale = img.naturalWidth / pdfPageSize.width;
    const renderedX = pdfX * pdfScale;
    const renderedY = pdfY * pdfScale;
    const renderedWidth = pdfWidth * pdfScale;
    const renderedHeight = pdfHeight * pdfScale;

    const renderedToDisplayX = display.width / img.naturalWidth;
    const renderedToDisplayY = display.height / img.naturalHeight;
    const pixelX = display.offsetX + renderedX * renderedToDisplayX;
    const pixelY = display.offsetY + renderedY * renderedToDisplayY;
    const pixelWidth = renderedWidth * renderedToDisplayX;
    const pixelHeight = renderedHeight * renderedToDisplayY;

    return { x: pixelX, y: pixelY, width: pixelWidth, height: pixelHeight };
  };

  // Handle mouse down - start drawing
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.button !== 0) return; // Only left mouse button
    
    const normalized = clickToNormalized(e.clientX, e.clientY);
    if (normalized) {
      setIsDrawing(true);
      setDrawStart(normalized);
      setDrawCurrent(normalized);
      setSelectedRedactionId(null);
    }
  };

  // Handle mouse move - update drawing
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isDrawing && drawStart) {
      const normalized = clickToNormalized(e.clientX, e.clientY);
      if (normalized) {
        setDrawCurrent(normalized);
      }
    }
  };

  // Handle mouse up - finish drawing
  const handleMouseUp = () => {
    if (isDrawing && drawStart && drawCurrent) {
      // Calculate rectangle bounds
      const x = Math.min(drawStart.x, drawCurrent.x);
      const y = Math.min(drawStart.y, drawCurrent.y);
      const width = Math.abs(drawCurrent.x - drawStart.x);
      const height = Math.abs(drawCurrent.y - drawStart.y);

      // Only add if rectangle is large enough
      if (width > 0.01 && height > 0.01) {
        const newRedaction: RedactionArea = {
          pageNumber: currentPage,
          x,
          y,
          width,
          height,
        };
        setRedactions([...redactions, newRedaction]);
      }

      setIsDrawing(false);
      setDrawStart(null);
      setDrawCurrent(null);
    }
  };

  // Delete redaction
  const handleDeleteRedaction = (index: number) => {
    const pageRedactions = redactions.filter(r => r.pageNumber === currentPage);
    const globalIndex = redactions.findIndex(r => 
      r.pageNumber === currentPage && 
      r.x === pageRedactions[index].x &&
      r.y === pageRedactions[index].y
    );
    if (globalIndex !== -1) {
      setRedactions(redactions.filter((_, i) => i !== globalIndex));
    }
  };

  // Delete all redactions on current page
  const handleClearPage = () => {
    setRedactions(redactions.filter(r => r.pageNumber !== currentPage));
  };

  // Delete all redactions
  const handleClearAll = () => {
    setRedactions([]);
  };

  const handleConfirm = () => {
    if (redactions.length > 0) {
      onRedactionsSelected(redactions);
      onClose();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsDrawing(false);
      setDrawStart(null);
      setDrawCurrent(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setIsDrawing(false);
      setDrawStart(null);
      setDrawCurrent(null);
    }
  };

  // Calculate drawing rectangle for preview
  const getDrawingRect = () => {
    if (!drawStart || !drawCurrent) return null;
    
    const x = Math.min(drawStart.x, drawCurrent.x);
    const y = Math.min(drawStart.y, drawCurrent.y);
    const width = Math.abs(drawCurrent.x - drawStart.x);
    const height = Math.abs(drawCurrent.y - drawStart.y);

    return normalizedToPixel({ x, y, width, height });
  };

  if (!isOpen || !pdfFile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-5xl max-h-[95vh] w-full bg-surface-900 rounded-xl border border-surface-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-700/50 bg-surface-800/50">
          <div>
            <h3 className="text-lg font-semibold text-surface-200">
              Redact PDF
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              Click and drag to select areas to redact (black out)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-surface-200 transition-colors"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 p-3 border-b border-surface-700/50 bg-surface-800/30">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Previous
            </button>
            <span className="text-sm text-surface-300 font-medium">
              Page {currentPage} of {totalPages} ({currentPageRedactions.length} redactions)
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Next
            </button>
          </div>
        )}

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-6 bg-surface-900 flex items-center justify-center min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-error-500/30 border-t-error-500 rounded-full animate-spin mb-4" />
              <p className="text-sm text-surface-400">Loading page...</p>
            </div>
          ) : loadError ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-surface-400 mb-2">Failed to load PDF</p>
              <p className="text-xs text-surface-500">{loadError}</p>
            </div>
          ) : pageImage ? (
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={pageImage}
                alt={`Page ${currentPage}`}
                className="max-w-full max-h-[calc(95vh-200px)] object-contain rounded-lg shadow-lg cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                draggable={false}
                style={{ touchAction: 'none', display: 'block' }}
              />
              
              {/* Drawing preview */}
              {getDrawingRect() && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${getDrawingRect()!.x}px`,
                    top: `${getDrawingRect()!.y}px`,
                    width: `${getDrawingRect()!.width}px`,
                    height: `${getDrawingRect()!.height}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '2px dashed #ef4444',
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}
                />
              )}

              {/* Redaction previews */}
              {currentPageRedactions.map((redaction, index) => {
                const rect = normalizedToPixel(redaction);
                if (!rect) return null;
                
                return (
                  <div
                    key={`${redaction.pageNumber}-${redaction.x}-${redaction.y}-${index}`}
                    style={{
                      position: 'absolute',
                      left: `${rect.x}px`,
                      top: `${rect.y}px`,
                      width: `${rect.width}px`,
                      height: `${rect.height}px`,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: selectedRedactionId === `${index}` ? '2px solid #ef4444' : '1px solid #666',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRedactionId(`${index}`);
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRedaction(index);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 rounded-full flex items-center justify-center text-white hover:bg-error-600 transition-colors z-30"
                      title="Delete redaction"
                    >
                      <X size={12} strokeWidth={2} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-surface-400">No PDF loaded</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-surface-700/50 bg-surface-800/50">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearPage}
              disabled={currentPageRedactions.length === 0}
              className="px-3 py-1.5 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
            >
              Clear Page
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={redactions.length === 0}
              className="px-3 py-1.5 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
            >
              Clear All
            </button>
            <span className="text-xs text-surface-400">
              Total: {redactions.length} redaction{redactions.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={redactions.length === 0}
              className="px-4 py-2 rounded-lg bg-error-500 hover:bg-error-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Apply Redaction ({redactions.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
