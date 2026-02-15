'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { X } from 'lucide-react';

interface SignaturePositionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  pdfFile: File | null;
  signatureData: string;
  signatureType: 'draw' | 'type' | 'image';
  onPositionSelected: (pageNumber: number, x: number, y: number) => void;
}

export default function SignaturePositionSelector({
  isOpen,
  onClose,
  pdfFile,
  signatureData,
  signatureType,
  onPositionSelected,
}: SignaturePositionSelectorProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [signaturePos, setSignaturePos] = useState<{ x: number; y: number } | null>(null);
  const [signaturePixelPos, setSignaturePixelPos] = useState<{ x: number; y: number } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load signature preview
  useEffect(() => {
    if (!signatureData || signatureData.trim().length === 0) {
      setSignaturePreview(null);
      return;
    }
    setSignaturePreview(signatureData);
  }, [signatureData]);

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
        const pdfWidth = viewport.width;
        const pdfHeight = viewport.height;
        setPdfPageSize({ width: pdfWidth, height: pdfHeight });

        // Calculate render scale (maxWidth=1200)
        const maxWidth = 1200;
        const scale = maxWidth / pdfWidth;
        setRenderScale(scale);

        // Render page to image
        const dataUrl = await renderPageToDataUrl(pdfDoc, currentPage, maxWidth, 0);
        setPageImage(dataUrl);
        setSignaturePos(null);
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

  // Calculate displayed image area (accounting for object-fit: contain)
  const getDisplayArea = (img: HTMLImageElement, rect: DOMRect) => {
    if (!img.naturalWidth || !img.naturalHeight) {
      return { width: rect.width, height: rect.height, offsetX: 0, offsetY: 0 };
    }

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const rectAspect = rect.width / rect.height;

    if (imgAspect > rectAspect) {
      // Image is wider - fits to width
      const width = rect.width;
      const height = rect.width / imgAspect;
      return {
        width,
        height,
        offsetX: 0,
        offsetY: (rect.height - height) / 2,
      };
    } else {
      // Image is taller - fits to height
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
  // x: 0 = left, 1 = right
  // y: 0 = top, 1 = bottom (screen coordinates, will be flipped in signPdf)
  const clickToNormalized = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return null;
    }

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    // Step 1: Get click position relative to displayed image area
    const clickX = clientX - rect.left - display.offsetX;
    const clickY = clientY - rect.top - display.offsetY;

    // Check if click is within image bounds
    if (clickX < 0 || clickX > display.width || clickY < 0 || clickY > display.height) {
      return null;
    }

    // Step 2: Convert displayed coordinates to rendered image coordinates (naturalWidth/naturalHeight)
    // display.width/height is the CSS displayed size
    // naturalWidth/height is the actual image pixel size
    const displayToRenderedX = img.naturalWidth / display.width;
    const displayToRenderedY = img.naturalHeight / display.height;
    const renderedX = clickX * displayToRenderedX;
    const renderedY = clickY * displayToRenderedY;

    // Step 3: Convert rendered image coordinates to PDF coordinates
    // The rendered image was created with: renderedWidth = pdfWidth * renderScale
    // So: pdfCoordinate = renderedCoordinate / renderScale
    const pdfX = renderedX / renderScale;
    const pdfY = renderedY / renderScale;

    // Step 4: Normalize to 0-1 range
    const x = Math.max(0, Math.min(1, pdfX / pdfPageSize.width));
    const y = Math.max(0, Math.min(1, pdfY / pdfPageSize.height));

    return { x, y };
  };

  // Convert normalized coordinates to pixel position for display
  const normalizedToPixel = (normalized: { x: number; y: number }): { x: number; y: number } | null => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return null;
    }

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    // Step 1: Convert normalized to PDF coordinates
    const pdfX = normalized.x * pdfPageSize.width;
    const pdfY = normalized.y * pdfPageSize.height;

    // Step 2: Convert PDF coordinates to rendered image coordinates
    const renderedX = pdfX * renderScale;
    const renderedY = pdfY * renderScale;

    // Step 3: Convert rendered coordinates to displayed coordinates
    const renderedToDisplayX = display.width / img.naturalWidth;
    const renderedToDisplayY = display.height / img.naturalHeight;
    const pixelX = display.offsetX + renderedX * renderedToDisplayX;
    const pixelY = display.offsetY + renderedY * renderedToDisplayY;

    return { x: pixelX, y: pixelY };
  };

  // Update signature preview position
  useEffect(() => {
    if (!signaturePos || !imageRef.current) {
      setSignaturePixelPos(null);
      return;
    }

    const updatePosition = () => {
      const pixelPos = normalizedToPixel(signaturePos);
      if (pixelPos) {
        setSignaturePixelPos(pixelPos);
      }
    };

    if (imageRef.current.complete) {
      updatePosition();
    } else {
      imageRef.current.addEventListener('load', updatePosition);
    }

    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', updatePosition);
      }
    };
  }, [signaturePos, pageImage, pdfPageSize, renderScale]);

  // Handle image click
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const normalized = clickToNormalized(e.clientX, e.clientY);
    if (normalized) {
      setSignaturePos(normalized);
    }
  };

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setDragging(true);
    handleImageClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (dragging) {
      const normalized = clickToNormalized(e.clientX, e.clientY);
      if (normalized) {
        setSignaturePos(normalized);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleConfirm = () => {
    if (signaturePos) {
      onPositionSelected(currentPage, signaturePos.x, signaturePos.y);
      onClose();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSignaturePos(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSignaturePos(null);
    }
  };

  if (!isOpen || !pdfFile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-5xl max-h-[95vh] w-full bg-surface-900 rounded-xl border border-surface-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-700/50 bg-surface-800/50">
          <div>
            <h3 className="text-lg font-semibold text-surface-200">
              Select Signature Position
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              Click on the page to place your signature, or drag to move it
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
              Page {currentPage} of {totalPages}
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
              <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
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
                onClick={handleImageClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                draggable={false}
                style={{ touchAction: 'none', display: 'block' }}
              />
              {/* Signature preview */}
              {signaturePreview && signaturePixelPos && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${signaturePixelPos.x}px`,
                    top: `${signaturePixelPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  <img
                    src={signaturePreview}
                    alt="Signature preview"
                    className="opacity-80"
                    style={{
                      width: '200px',
                      height: '80px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              )}
              {signaturePos && (
                <div className="absolute top-2 left-2 px-3 py-1.5 rounded-lg bg-primary-500/20 border border-primary-500/40 text-primary-300 text-xs font-medium z-10">
                  Position: X={signaturePos.x.toFixed(3)}, Y={signaturePos.y.toFixed(3)}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-surface-400">No PDF loaded</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-surface-700/50 bg-surface-800/50">
          <p className="text-xs text-surface-400">
            {signaturePos 
              ? 'Click "Confirm Position" to place signature here'
              : 'Click on the page to place your signature'}
          </p>
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
              disabled={!signaturePos}
              className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Confirm Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
