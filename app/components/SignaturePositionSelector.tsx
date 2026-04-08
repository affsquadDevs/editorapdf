'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { X } from 'lucide-react';
import { useAppTranslations } from '../i18n/TranslationProvider';

interface SignaturePositionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  pdfFile: File | null;
  signatureData: string;
  signatureType: 'draw' | 'type' | 'image';
  onPositionSelected: (pageNumber: number, x: number, y: number, widthPts?: number, heightPts?: number) => void;
}

export default function SignaturePositionSelector({
  isOpen,
  onClose,
  pdfFile,
  signatureData,
  signatureType,
  onPositionSelected,
}: SignaturePositionSelectorProps) {
  const { t } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [draggingOverlay, setDraggingOverlay] = useState(false);
  const draggingOverlayRef = useRef<boolean>(false);
  const [signaturePos, setSignaturePos] = useState<{ x: number; y: number } | null>(null);
  const [signaturePixelPos, setSignaturePixelPos] = useState<{ x: number; y: number } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Resizable box size in displayed pixels (initialized after image load)
  const [boxSizePx, setBoxSizePx] = useState<{ width: number; height: number } | null>(null);
  const [resizing, setResizing] = useState(false);
  const resizingRef = useRef<boolean>(false);
  const [activeHandle, setActiveHandle] = useState<'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | null>(null);
  const startResizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startCenterX: number;
    startCenterY: number;
    aspect: number;
    shiftKey: boolean;
  } | null>(null);
  const [signatureNatural, setSignatureNatural] = useState<{ width: number; height: number } | null>(null);
  // rAF throttle for resize to avoid jank
  const resizeRafIdRef = useRef<number | null>(null);
  const pendingSizeRef = useRef<{ width: number; height: number } | null>(null);
  const pendingCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Load signature preview
  useEffect(() => {
    if (!signatureData || signatureData.trim().length === 0) {
      setSignaturePreview(null);
      return;
    }
    setSignaturePreview(signatureData);
    // Measure natural size (for aspect ratio lock)
    const img = new Image();
    img.onload = () => {
      setSignatureNatural({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = signatureData;
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
        setBoxSizePx(null);
      } catch (error) {
        console.error('Error loading/rendering PDF:', error);
        setLoadError(error instanceof Error ? error.message : tr('tools.sign.positionSelector.failed', 'Failed to load PDF'));
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

  // Convert displayed pixel center back to normalized coordinates
  const pixelToNormalized = (pixel: { x: number; y: number }): { x: number; y: number } | null => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return null;
    }
    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);
    const relX = pixel.x - display.offsetX;
    const relY = pixel.y - display.offsetY;
    const displayToRenderedX = img.naturalWidth / display.width;
    const displayToRenderedY = img.naturalHeight / display.height;
    const renderedX = relX * displayToRenderedX;
    const renderedY = relY * displayToRenderedY;
    const pdfX = renderedX / renderScale;
    const pdfY = renderedY / renderScale;
    const x = Math.max(0, Math.min(1, pdfX / pdfPageSize.width));
    const y = Math.max(0, Math.min(1, pdfY / pdfPageSize.height));
    return { x, y };
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
      // Initialize default box size (200x80 pt) mapped to displayed pixels once we can measure image
      if (imageRef.current && !boxSizePx && pdfPageSize && renderScale) {
        const rect = imageRef.current.getBoundingClientRect();
        const display = getDisplayArea(imageRef.current, rect);
        const renderedToDisplayX = display.width / imageRef.current.naturalWidth;
        const renderedToDisplayY = display.height / imageRef.current.naturalHeight;
        const defaultWidthPts = 200;
        const defaultHeightPts = 80;
        const displayedWidth = defaultWidthPts * renderScale * renderedToDisplayX;
        const displayedHeight = defaultHeightPts * renderScale * renderedToDisplayY;
        setBoxSizePx({
          width: Math.max(40, displayedWidth),
          height: Math.max(20, displayedHeight),
        });
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
  }, [signaturePos, pageImage, pdfPageSize, renderScale, boxSizePx]);

  // Handle image click
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const normalized = clickToNormalized(e.clientX, e.clientY);
    if (normalized) {
      setSignaturePos(normalized);
    }
  };

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (resizingRef.current) return;
    setDragging(true);
    handleImageClick(e);
    // Track drag on window to allow moving while holding even if cursor leaves image
    const onMove = (ev: MouseEvent) => {
      if (!dragging) return;
      const normalized = clickToNormalized(ev.clientX, ev.clientY);
      if (normalized) {
        setSignaturePos(normalized);
      }
    };
    const onUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
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
    setResizing(false);
    resizingRef.current = false;
    setDraggingOverlay(false);
    draggingOverlayRef.current = false;
  };

  const handleConfirm = () => {
    if (signaturePos) {
      // Convert displayed px box size back to PDF points
      let widthPts: number | undefined;
      let heightPts: number | undefined;
      if (imageRef.current && boxSizePx && pdfPageSize && renderScale) {
        const rect = imageRef.current.getBoundingClientRect();
        const display = getDisplayArea(imageRef.current, rect);
        const renderedToDisplayX = display.width / imageRef.current.naturalWidth;
        const renderedToDisplayY = display.height / imageRef.current.naturalHeight;
        const renderedWidth = boxSizePx.width / renderedToDisplayX;
        const renderedHeight = boxSizePx.height / renderedToDisplayY;
        widthPts = renderedWidth / renderScale;
        heightPts = renderedHeight / renderScale;
      }
      onPositionSelected(currentPage, signaturePos.x, signaturePos.y, widthPts, heightPts);
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
              {tr('tools.sign.positionSelector.title', 'Select Signature Position')}
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              {tr('tools.sign.positionSelector.subtitle', 'Click on the page to place your signature, or drag to move it')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-surface-200 transition-colors"
            aria-label={tr('tools.sign.positionSelector.close', 'Close')}
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
              {tr('tools.sign.positionSelector.previous', 'Previous')}
            </button>
            <span className="text-sm text-surface-300 font-medium">
              {tr('tools.sign.positionSelector.page', 'Page')} {currentPage} {tr('tools.sign.positionSelector.of', 'of')} {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {tr('tools.sign.positionSelector.next', 'Next')}
            </button>
          </div>
        )}

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-6 bg-surface-900 flex items-center justify-center min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
              <p className="text-sm text-surface-400">{tr('tools.sign.positionSelector.loading', 'Loading page...')}</p>
            </div>
          ) : loadError ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-surface-400 mb-2">{tr('tools.sign.positionSelector.failed', 'Failed to load PDF')}</p>
              <p className="text-xs text-surface-500">{loadError}</p>
            </div>
          ) : pageImage ? (
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={pageImage}
                alt={`${tr('tools.sign.positionSelector.page', 'Page')} ${currentPage}`}
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
                    pointerEvents: 'auto',
                    zIndex: 10,
                  }}
                  onMouseDown={(e) => {
                    // Start dragging the overlay (move)
                    if (resizing) return;
                    e.stopPropagation();
                    setDraggingOverlay(true);
                    draggingOverlayRef.current = true;
                    const onMove = (ev: MouseEvent) => {
                      if (!draggingOverlayRef.current) return;
                      const normalized = clickToNormalized(ev.clientX, ev.clientY);
                      if (normalized) {
                        setSignaturePos(normalized);
                      }
                    };
                    const onUp = () => {
                      setDraggingOverlay(false);
                      draggingOverlayRef.current = false;
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: `${boxSizePx?.width || 200}px`,
                      height: `${boxSizePx?.height || 80}px`,
                      border: '1px dashed rgba(168, 85, 247, 0.6)',
                      background: 'transparent',
                      borderRadius: '4px',
                      cursor: draggingOverlay ? 'grabbing' : 'move',
                    }}
                  >
                    <img
                      src={signaturePreview}
                      alt={tr('tools.sign.positionSelector.previewAlt', 'Signature preview')}
                      className="opacity-80"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                      draggable={false}
                    />
                    {/* Resize handles (8) */}
                    {(['nw','n','ne','e','se','s','sw','w'] as const).map((h) => {
                      const styles: Record<string, React.CSSProperties> = {
                        nw: { left: -6, top: -6, cursor: 'nwse-resize' },
                        n:  { left: '50%', top: -6, transform: 'translateX(-50%)', cursor: 'ns-resize' },
                        ne: { right: -6, top: -6, cursor: 'nesw-resize' },
                        e:  { right: -6, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
                        se: { right: -6, bottom: -6, cursor: 'nwse-resize' },
                        s:  { left: '50%', bottom: -6, transform: 'translateX(-50%)', cursor: 'ns-resize' },
                        sw: { left: -6, bottom: -6, cursor: 'nesw-resize' },
                        w:  { left: -6, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
                      };
                      return (
                        <div
                          key={h}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setResizing(true);
                            resizingRef.current = true;
                            setActiveHandle(h);
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startSize = { ...(boxSizePx || { width: 200, height: 80 }) };
                            const center = signaturePixelPos || { x: 0, y: 0 };
                            const aspect = signatureNatural && signatureNatural.height !== 0
                              ? signatureNatural.width / signatureNatural.height
                              : startSize.width / Math.max(1, startSize.height);
                            startResizeRef.current = {
                              startX,
                              startY,
                              startWidth: startSize.width,
                              startHeight: startSize.height,
                              startCenterX: center.x,
                              startCenterY: center.y,
                              aspect,
                              shiftKey: e.shiftKey,
                            };
                            // Try to capture pointer so we don't lose move events
                            try {
                              (e.currentTarget as any).setPointerCapture?.((e as any).pointerId);
                            } catch {}
                            const onMove = (ev: MouseEvent) => {
                              ev.preventDefault();
                              if (!resizingRef.current || !startResizeRef.current) return;
                              const { startX, startY, startWidth, startHeight, startCenterX, startCenterY, aspect, shiftKey } = startResizeRef.current;
                              const dx = ev.clientX - startX;
                              const dy = ev.clientY - startY;
                              // Compute proposed size change per handle
                              let newW = startWidth;
                              let newH = startHeight;
                              let centerX = startCenterX;
                              let centerY = startCenterY;
                              const lockAspect = !shiftKey;
                              const applyAspect = (w: number, h: number, handle: string) => {
                                if (!lockAspect) return { w, h };
                                // Fit to aspect based on the dominant delta
                                if (Math.abs(w - startWidth) > Math.abs(h - startHeight)) {
                                  h = w / aspect;
                                } else {
                                  w = h * aspect;
                                }
                                return { w, h };
                              };
                              const adjustCenter = (handle: string, dW: number, dH: number) => {
                                // Opposite side fixed: move center by half the delta in that axis
                                switch (handle) {
                                  case 'e':  centerX = startCenterX + dW / 2; break;
                                  case 'w':  centerX = startCenterX - dW / 2; break;
                                  case 's':  centerY = startCenterY + dH / 2; break;
                                  case 'n':  centerY = startCenterY - dH / 2; break;
                                  case 'se': centerX = startCenterX + dW / 2; centerY = startCenterY + dH / 2; break;
                                  case 'ne': centerX = startCenterX + dW / 2; centerY = startCenterY - dH / 2; break;
                                  case 'sw': centerX = startCenterX - dW / 2; centerY = startCenterY + dH / 2; break;
                                  case 'nw': centerX = startCenterX - dW / 2; centerY = startCenterY - dH / 2; break;
                                }
                              };
                              // Derive tentative dimensions based on handle
                              switch (h) {
                                case 'e':  newW = startWidth + dx; break;
                                case 'w':  newW = startWidth - dx; break;
                                case 's':  newH = startHeight + dy; break;
                                case 'n':  newH = startHeight - dy; break;
                                case 'se': newW = startWidth + dx; newH = startHeight + dy; break;
                                case 'ne': newW = startWidth + dx; newH = startHeight - dy; break;
                                case 'sw': newW = startWidth - dx; newH = startHeight + dy; break;
                                case 'nw': newW = startWidth - dx; newH = startHeight - dy; break;
                              }
                              // Enforce minimums
                              newW = Math.max(40, newW);
                              newH = Math.max(20, newH);
                              // Apply aspect lock if needed
                              const sized = applyAspect(newW, newH, h);
                              newW = sized.w;
                              newH = sized.h;
                              adjustCenter(h, newW - startWidth, newH - startHeight);
                              // Contain within displayed image bounds
                              if (imageRef.current) {
                                const rect = imageRef.current.getBoundingClientRect();
                                const display = getDisplayArea(imageRef.current, rect);
                                const halfW = newW / 2;
                                const halfH = newH / 2;
                                // Clamp center so the box stays inside
                                centerX = Math.max(display.offsetX + halfW, Math.min(display.offsetX + display.width - halfW, centerX));
                                centerY = Math.max(display.offsetY + halfH, Math.min(display.offsetY + display.height - halfH, centerY));
                              }
                              // Throttle state updates via rAF
                              pendingSizeRef.current = { width: newW, height: newH };
                              pendingCenterRef.current = { x: centerX, y: centerY };
                              if (resizeRafIdRef.current == null) {
                                resizeRafIdRef.current = requestAnimationFrame(() => {
                                  resizeRafIdRef.current = null;
                                  const ps = pendingSizeRef.current;
                                  const pc = pendingCenterRef.current;
                                  if (ps) setBoxSizePx(ps);
                                  if (pc) {
                                    const norm = pixelToNormalized(pc);
                                    if (norm) setSignaturePos(norm);
                                  }
                                });
                              }
                            };
                            const cancel = () => {
                              setResizing(false);
                              resizingRef.current = false;
                              setActiveHandle(null);
                              startResizeRef.current = null;
                              if (resizeRafIdRef.current != null) {
                                cancelAnimationFrame(resizeRafIdRef.current);
                                resizeRafIdRef.current = null;
                              }
                              document.removeEventListener('mousemove', onMove);
                              document.removeEventListener('mouseup', cancel);
                              window.removeEventListener('blur', cancel);
                              document.removeEventListener('mouseleave', cancel);
                            };
                            document.addEventListener('mousemove', onMove, { passive: false });
                            document.addEventListener('mouseup', cancel);
                            window.addEventListener('blur', cancel);
                            document.addEventListener('mouseleave', cancel);
                          }}
                          style={{
                            position: 'absolute',
                            width: '12px',
                            height: '12px',
                            background: 'rgba(168,85,247,0.95)',
                            borderRadius: '3px',
                            ...styles[h],
                          }}
                          title={tr('tools.sign.positionSelector.resize', 'Drag to resize')}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Position hint removed for cleaner UI */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-surface-400">{tr('tools.sign.positionSelector.noPdf', 'No PDF loaded')}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-surface-700/50 bg-surface-800/50">
          <p className="text-xs text-surface-400">
            {signaturePos 
              ? tr('tools.sign.positionSelector.confirmHint', 'Click "Confirm Position" to place signature here')
              : tr('tools.sign.positionSelector.clickToPlace', 'Click on the page to place your signature')}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-700/30 hover:bg-surface-700/50 text-surface-300 transition-colors text-sm font-medium"
            >
              {tr('tools.sign.positionSelector.cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!signaturePos}
              className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {tr('tools.sign.positionSelector.confirm', 'Confirm Position')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
