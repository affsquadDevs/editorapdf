'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { X, Move, Info, Copy, Check } from 'lucide-react';
import type { WatermarkConfig } from '../lib/pdf/addWatermark';

interface WatermarkPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  pdfFile: File | null;
  watermarks: WatermarkConfig[];
  onWatermarksUpdate: (watermarks: WatermarkConfig[]) => void;
  currentPage?: number;
}

export default function WatermarkPreview({
  isOpen,
  onClose,
  pdfFile,
  watermarks,
  onWatermarksUpdate,
  currentPage: initialPage,
}: WatermarkPreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage || 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draggingWatermark, setDraggingWatermark] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [previewPositions, setPreviewPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [selectedWatermarkId, setSelectedWatermarkId] = useState<string | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef<number>(0);
  const [imageDimensions, setImageDimensions] = useState<Map<string, { width: number; height: number }>>(new Map());

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
        
        const pageNum = initialPage || currentPage;
        if (pageNum > pageCount || pageNum < 1) {
          setCurrentPage(1);
        } else {
          setCurrentPage(pageNum);
        }

        const pageToRender = pageNum > pageCount || pageNum < 1 ? 1 : pageNum;

        // Get real PDF page dimensions
        const page = await pdfDoc.getPage(pageToRender);
        const viewport = page.getViewport({ scale: 1 });
        const pdfWidth = viewport.width;
        const pdfHeight = viewport.height;
        setPdfPageSize({ width: pdfWidth, height: pdfHeight });

        // Calculate render scale (maxWidth=1200)
        const maxWidth = 1200;
        const scale = maxWidth / pdfWidth;
        setRenderScale(scale);

        // Render page to image
        const dataUrl = await renderPageToDataUrl(pdfDoc, pageToRender, maxWidth, 0);
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
  }, [isOpen, pdfFile, currentPage, initialPage]);

  // Load image dimensions for image watermarks
  useEffect(() => {
    const loadImageDimensions = async () => {
      const newDimensions = new Map<string, { width: number; height: number }>();
      
      for (const watermark of watermarks) {
        if (watermark.type === 'image' && watermark.imageDataUrl) {
          try {
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = watermark.imageDataUrl!;
            });
            // Store dimensions in pixels
            newDimensions.set(watermark.id, { width: img.width, height: img.height });
          } catch (error) {
            console.error(`Failed to load image for watermark ${watermark.id}:`, error);
          }
        }
      }
      
      setImageDimensions(newDimensions);
    };

    if (isOpen && watermarks.length > 0) {
      loadImageDimensions();
    }
  }, [isOpen, watermarks]);

  // Calculate displayed image area
  const getDisplayArea = (img: HTMLImageElement, rect: DOMRect) => {
    if (!img.naturalWidth || !img.naturalHeight) {
      return { width: rect.width, height: rect.height, offsetX: 0, offsetY: 0 };
    }

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const rectAspect = rect.width / rect.height;

    let displayWidth: number;
    let displayHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imgAspect > rectAspect) {
      // Image is wider - fit to width
      displayWidth = rect.width;
      displayHeight = rect.width / imgAspect;
      offsetX = 0;
      offsetY = (rect.height - displayHeight) / 2;
    } else {
      // Image is taller - fit to height
      displayHeight = rect.height;
      displayWidth = rect.height * imgAspect;
      offsetX = (rect.width - displayWidth) / 2;
      offsetY = 0;
    }

    return { width: displayWidth, height: displayHeight, offsetX, offsetY };
  };

  // Convert PDF points to displayed pixels (for size calculations)
  // Same approach as normalizedToPixel in SignaturePositionSelector
  const pdfPointsToDisplayPixels = (points: number, isWidth: boolean = true): number => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return points;
    }

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    // Step 1: PDF points -> rendered image pixels
    const renderedPx = points * renderScale;

    // Step 2: Rendered pixels -> displayed pixels
    const renderedToDisplay = isWidth 
      ? display.width / img.naturalWidth 
      : display.height / img.naturalHeight;
    
    return renderedPx * renderedToDisplay;
  };

  // Convert PDF coordinates (0-1) to pixel coordinates
  // pdfX, pdfY are in PDF format where y: 0 = bottom, 1 = top
  // Returns screen coordinates where y: 0 = top, 1 = bottom
  // Uses the same approach as normalizedToPixel in SignaturePositionSelector
  const pdfToPixel = (pdfX: number, pdfY: number): { x: number; y: number } => {
    const img = imageRef.current;
    if (!img || !img.complete || !pdfPageSize || !renderScale || img.naturalWidth === 0) {
      return { x: 0, y: 0 };
    }

    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);

    // Step 1: Convert normalized PDF coordinates (0-1) to PDF coordinates in points
    // pdfY is in PDF format (0 = bottom, 1 = top), convert to screen format (0 = top, 1 = bottom)
    const screenY = 1 - pdfY;
    
    const pdfXPoints = pdfX * pdfPageSize.width;
    const pdfYPoints = screenY * pdfPageSize.height; // Now in screen format (0 = top)

    // Step 2: Convert PDF coordinates to rendered image coordinates
    const renderedX = pdfXPoints * renderScale;
    const renderedY = pdfYPoints * renderScale;

    // Step 3: Convert rendered coordinates to displayed coordinates
    const renderedToDisplayX = display.width / img.naturalWidth;
    const renderedToDisplayY = display.height / img.naturalHeight;
    const pixelX = display.offsetX + renderedX * renderedToDisplayX;
    const pixelY = display.offsetY + renderedY * renderedToDisplayY;

    return { x: pixelX, y: pixelY };
  };

  // Convert pixel coordinates to PDF coordinates (0-1)
  const pixelToPdf = (pixelX: number, pixelY: number): { x: number; y: number } => {
    if (!imageRef.current || !pdfPageSize || !renderScale) {
      return { x: 0.5, y: 0.5 };
    }

    const rect = imageRef.current.getBoundingClientRect();
    const displayArea = getDisplayArea(imageRef.current, rect);

    const relativeX = pixelX - displayArea.offsetX;
    const relativeY = pixelY - displayArea.offsetY;

    const pdfX = Math.max(0, Math.min(1, relativeX / displayArea.width));
    const pdfY = Math.max(0, Math.min(1, 1 - relativeY / displayArea.height)); // Flip Y

    return { x: pdfX, y: pdfY };
  };

  // Calculate watermark position
  // Returns normalized coordinates (0-1) in PDF format where:
  // x: 0 = left, 1 = right
  // y: 0 = bottom (PDF), 1 = top (PDF)
  // pdfToPixel will convert these to screen coordinates (y: 0 = top)
  const getWatermarkPosition = (watermark: WatermarkConfig): { x: number; y: number } => {
    // Use preview position if dragging
    if (draggingWatermark === watermark.id) {
      const previewPos = previewPositions.get(watermark.id);
      if (previewPos) {
        return previewPos;
      }
    }
    
    if (watermark.position === 'custom' && watermark.customX !== undefined && watermark.customY !== undefined) {
      // customY is already in PDF format (0 = bottom, 1 = top) from pixelToPdf
      return { x: watermark.customX, y: watermark.customY };
    }

    // Default positions in PDF format (y: 0 = bottom, 1 = top)
    // This matches calculateWatermarkPosition in addWatermark.ts
    switch (watermark.position) {
      case 'center':
        return { x: 0.5, y: 0.5 };
      case 'top-left':
        return { x: 0.1, y: 0.9 }; // 90% from bottom = top area
      case 'top-right':
        return { x: 0.9, y: 0.9 }; // 90% from bottom = top area
      case 'bottom-left':
        return { x: 0.1, y: 0.1 }; // 10% from bottom = bottom area
      case 'bottom-right':
        return { x: 0.9, y: 0.1 }; // 10% from bottom = bottom area
      case 'diagonal':
        return { x: 0.5, y: 0.5 };
      default:
        return { x: 0.5, y: 0.5 };
    }
  };

  const handleMouseDown = (e: React.MouseEvent, watermarkId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDraggingWatermark(watermarkId);
    setDragStart({ x, y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingWatermark || !dragStart || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pdfPos = pixelToPdf(x, y);
    
    // Update preview position immediately for smooth dragging
    setPreviewPositions(prev => {
      const newMap = new Map(prev);
      newMap.set(draggingWatermark, pdfPos);
      return newMap;
    });

    // Throttle actual state update to reduce re-renders
    const now = Date.now();
    if (now - throttleRef.current >= 50) {
      const updatedWatermarks = watermarks.map(w => {
        if (w.id === draggingWatermark) {
          return {
            ...w,
            position: 'custom' as const,
            customX: pdfPos.x,
            customY: pdfPos.y,
          };
        }
        return w;
      });
      onWatermarksUpdate(updatedWatermarks);
      throttleRef.current = now;
    }
  }, [draggingWatermark, dragStart, watermarks, onWatermarksUpdate]);

  const handleMouseUp = useCallback(() => {
    if (draggingWatermark && dragStart && imageRef.current) {
      // Final update on mouse up
      const rect = imageRef.current.getBoundingClientRect();
      const finalPos = previewPositions.get(draggingWatermark);
      if (finalPos) {
        const updatedWatermarks = watermarks.map(w => {
          if (w.id === draggingWatermark) {
            return {
              ...w,
              position: 'custom' as const,
              customX: finalPos.x,
              customY: finalPos.y,
            };
          }
          return w;
        });
        onWatermarksUpdate(updatedWatermarks);
      }
    }
    
    setDraggingWatermark(null);
    setDragStart(null);
    setPreviewPositions(new Map());
    
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = null;
    }
  }, [draggingWatermark, dragStart, previewPositions, watermarks, onWatermarksUpdate]);

  // Global mouse handlers for dragging (works even when mouse leaves the element)
  useEffect(() => {
    if (!draggingWatermark) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !dragStart) return;

      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within image bounds
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }

      const pdfPos = pixelToPdf(x, y);
      
      // Update preview position immediately
      setPreviewPositions(prev => {
        const newMap = new Map(prev);
        newMap.set(draggingWatermark, pdfPos);
        return newMap;
      });

      // Throttle actual state update
      const now = Date.now();
      if (now - throttleRef.current >= 50) {
        const updatedWatermarks = watermarks.map(w => {
          if (w.id === draggingWatermark) {
            return {
              ...w,
              position: 'custom' as const,
              customX: pdfPos.x,
              customY: pdfPos.y,
            };
          }
          return w;
        });
        onWatermarksUpdate(updatedWatermarks);
        throttleRef.current = now;
      }
    };

    const handleGlobalMouseUp = () => {
      if (draggingWatermark && previewPositions.has(draggingWatermark)) {
        const finalPos = previewPositions.get(draggingWatermark);
        if (finalPos) {
          const updatedWatermarks = watermarks.map(w => {
            if (w.id === draggingWatermark) {
              return {
                ...w,
                position: 'custom' as const,
                customX: finalPos.x,
                customY: finalPos.y,
              };
            }
            return w;
          });
          onWatermarksUpdate(updatedWatermarks);
        }
      }
      
      setDraggingWatermark(null);
      setDragStart(null);
      setPreviewPositions(new Map());
      
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
        updateTimeoutRef.current = null;
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [draggingWatermark, dragStart, previewPositions, watermarks, onWatermarksUpdate]);

  // Auto-select first watermark if none selected
  useEffect(() => {
    if (isOpen && watermarks.length > 0 && !selectedWatermarkId) {
      setSelectedWatermarkId(watermarks[0].id);
    }
  }, [isOpen, watermarks, selectedWatermarkId]);

  const selectedWatermark = watermarks.find(w => w.id === selectedWatermarkId);

  const updateWatermark = useCallback((updates: Partial<WatermarkConfig>) => {
    if (!selectedWatermarkId) return;
    
    const updatedWatermarks = watermarks.map(w => 
      w.id === selectedWatermarkId ? { ...w, ...updates } : w
    );
    onWatermarksUpdate(updatedWatermarks);
  }, [selectedWatermarkId, watermarks, onWatermarksUpdate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full h-full max-w-7xl max-h-[95vh] m-4 bg-surface-900 rounded-xl border border-surface-700 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-700">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-surface-200">Watermark Preview</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <Move size={14} className="text-primary-400" />
              <span className="text-xs text-primary-300">Drag watermarks to reposition</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-800 text-surface-400 hover:text-surface-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 p-3 border-b border-surface-700 bg-surface-800/50">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-surface-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="max-w-full max-h-[calc(95vh-200px)] object-contain rounded-lg shadow-lg select-none"
                draggable={false}
                style={{ display: 'block', userSelect: 'none' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              
              {/* Render watermarks */}
              {watermarks
                .filter(watermark => {
                  // Only show watermarks that apply to current page
                  if (watermark.pages && watermark.pages.length > 0) {
                    return watermark.pages.includes(currentPage);
                  }
                  return true; // Show if applies to all pages
                })
                .map((watermark) => {
                  const pos = getWatermarkPosition(watermark);
                  const pixelPos = pdfToPixel(pos.x, pos.y);
                  
                  return (
                    <div
                      key={watermark.id}
                      style={{
                        position: 'absolute',
                        left: `${pixelPos.x}px`,
                        top: `${pixelPos.y}px`,
                        transform: `translate(-50%, -50%) rotate(${watermark.rotation}deg)`,
                        opacity: watermark.opacity / 100,
                        cursor: draggingWatermark === watermark.id ? 'grabbing' : 'grab',
                        pointerEvents: 'all',
                        transition: draggingWatermark === watermark.id ? 'none' : 'transform 0.1s ease-out',
                        zIndex: draggingWatermark === watermark.id ? 100 : selectedWatermarkId === watermark.id ? 20 : 10,
                        outline: selectedWatermarkId === watermark.id ? '2px solid rgb(139 92 246 / 0.6)' : 'none',
                        outlineOffset: '4px',
                        borderRadius: selectedWatermarkId === watermark.id ? '4px' : '0',
                      }}
                      onMouseDown={(e) => {
                        setSelectedWatermarkId(watermark.id);
                        handleMouseDown(e, watermark.id);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWatermarkId(watermark.id);
                      }}
                      className="group"
                      title={`Click to select, drag to move${watermark.pages && watermark.pages.length < totalPages ? ` (Pages: ${watermark.pages.join(', ')})` : ' (All pages)'}`}
                    >
                    {watermark.type === 'text' && watermark.text ? (() => {
                      const img = imageRef.current;
                      if (!pdfPageSize || !renderScale || !img || !img.complete || img.naturalWidth === 0) {
                        return (
                          <div
                            style={{
                              fontSize: `${(watermark.fontSize || 48) * (96 / 72)}px`,
                              color: watermark.color 
                                ? `rgb(${Math.round(watermark.color.r * 255)}, ${Math.round(watermark.color.g * 255)}, ${Math.round(watermark.color.b * 255)})`
                                : 'rgb(179, 179, 179)',
                              whiteSpace: 'nowrap',
                              userSelect: 'none',
                              lineHeight: '1',
                            }}
                          >
                            {watermark.text}
                          </div>
                        );
                      }

                      // PDF fontSize is in points (1 point = 1/72 inch)
                      // Convert PDF points to displayed pixels using the same approach as signatures
                      const fontSizePt = watermark.fontSize || 48;
                      const displayFontSizePx = pdfPointsToDisplayPixels(fontSizePt, true);
                      
                      return (
                        <div
                          style={{
                            fontSize: `${displayFontSizePx}px`,
                            color: watermark.color 
                              ? `rgb(${Math.round(watermark.color.r * 255)}, ${Math.round(watermark.color.g * 255)}, ${Math.round(watermark.color.b * 255)})`
                              : 'rgb(179, 179, 179)',
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                            lineHeight: '1',
                          }}
                        >
                          {watermark.text}
                        </div>
                      );
                    })(                    ) : watermark.type === 'image' && watermark.imageDataUrl ? (() => {
                      // Get image dimensions in pixels (from loaded image)
                      const imgDims = imageDimensions.get(watermark.id);
                      const img = imageRef.current;
                      if (!imgDims || !pdfPageSize || !renderScale || !img || !img.complete || img.naturalWidth === 0) {
                        return (
                          <img
                            src={watermark.imageDataUrl}
                            alt="Watermark"
                            style={{
                              width: 'auto',
                              height: 'auto',
                              maxWidth: '200px',
                              userSelect: 'none',
                            }}
                          />
                        );
                      }

                      // In PDF: pdf-lib embedPng/embedJpg treats image pixels as points (1:1 ratio at 72 DPI)
                      // So: imageEmbed.scale(scale) returns dimensions in points
                      // We need to simulate the same calculation:
                      // 1. Original image dimensions in points = image pixels (for pdf-lib)
                      // 2. Apply scale to get scaled dimensions in points
                      // 3. Convert points to displayed pixels using pdfPointsToDisplayPixels
                      
                      // Step 1: Get original image dimensions in points (pdf-lib: 1 pixel = 1 point)
                      const imageWidthPoints = imgDims.width;
                      const imageHeightPoints = imgDims.height;
                      
                      // Step 2: Apply scale (same as PDF: imageEmbed.scale(scale))
                      const scale = watermark.scale || 0.5;
                      const scaledWidthPoints = imageWidthPoints * scale;
                      const scaledHeightPoints = imageHeightPoints * scale;
                      
                      // Step 3: Convert PDF points to displayed pixels using the same method as signatures
                      const displayWidthPx = pdfPointsToDisplayPixels(scaledWidthPoints, true);
                      const displayHeightPx = pdfPointsToDisplayPixels(scaledHeightPoints, false);
                      
                      return (
                        <img
                          src={watermark.imageDataUrl}
                          alt="Watermark"
                          style={{
                            width: `${displayWidthPx}px`,
                            height: `${displayHeightPx}px`,
                            userSelect: 'none',
                            objectFit: 'fill',
                            display: 'block',
                          }}
                        />
                      );
                    })() : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Control Panel */}
        {selectedWatermark && (
          <div className="border-t border-surface-700 bg-surface-800/50 p-4 max-h-[40vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-200">
                Edit Watermark {watermarks.findIndex(w => w.id === selectedWatermarkId) + 1}
              </h3>
              <div className="flex items-center gap-2">
                {/* Duplicate button */}
                <button
                  onClick={() => {
                    const newWatermark: WatermarkConfig = {
                      ...selectedWatermark,
                      id: `watermark-${Date.now()}`,
                      // Copy pages from original, or apply to all pages if original applies to all
                      pages: selectedWatermark.pages && selectedWatermark.pages.length > 0 
                        ? [...selectedWatermark.pages] 
                        : undefined, // undefined means all pages
                    };
                    const updatedWatermarks = [...watermarks, newWatermark];
                    onWatermarksUpdate(updatedWatermarks);
                    setSelectedWatermarkId(newWatermark.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/40 text-primary-300 text-xs font-medium transition-colors flex items-center gap-1.5"
                  title="Duplicate watermark"
                >
                  <Copy size={12} />
                  Duplicate
                </button>
                {watermarks.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const currentIndex = watermarks.findIndex(w => w.id === selectedWatermarkId);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : watermarks.length - 1;
                        setSelectedWatermarkId(watermarks[prevIndex].id);
                      }}
                      className="px-2 py-1 rounded-lg bg-surface-700 hover:bg-surface-600 text-surface-300 text-xs"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = watermarks.findIndex(w => w.id === selectedWatermarkId);
                        const nextIndex = currentIndex < watermarks.length - 1 ? currentIndex + 1 : 0;
                        setSelectedWatermarkId(watermarks[nextIndex].id);
                      }}
                      className="px-2 py-1 rounded-lg bg-surface-700 hover:bg-surface-600 text-surface-300 text-xs"
                    >
                      Next →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Pages Selection */}
            {totalPages > 1 && (
              <div className="mb-4 p-3 rounded-lg bg-surface-700/30 border border-surface-600/50">
                <label className="text-xs font-medium text-surface-300 mb-2 block">Apply to Pages</label>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // If pages is undefined or empty, it means all pages are selected
                      const isAllPages = !selectedWatermark.pages || selectedWatermark.pages.length === 0;
                      const isSelected = isAllPages || (selectedWatermark.pages && selectedWatermark.pages.includes(pageNum));
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            const isAllPagesMode = !selectedWatermark.pages || selectedWatermark.pages.length === 0;
                            const currentPages = isAllPagesMode 
                              ? Array.from({ length: totalPages }, (_, i) => i + 1)
                              : selectedWatermark.pages!;
                            let newPages: number[] | undefined;
                            
                            if (isSelected) {
                              // Remove page
                              newPages = currentPages.filter(p => p !== pageNum);
                              // If no pages left or only one page left, set to undefined (all pages)
                              if (newPages.length === 0 || newPages.length === 1) {
                                newPages = undefined; // undefined means all pages
                              }
                            } else {
                              // Add page
                              newPages = [...currentPages, pageNum].sort((a, b) => a - b);
                              // If all pages are selected, set to undefined
                              if (newPages.length === totalPages) {
                                newPages = undefined; // undefined means all pages
                              }
                            }
                            
                            updateWatermark({ pages: newPages });
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                              : 'bg-surface-700/50 border border-surface-600/30 text-surface-400 hover:bg-surface-700/70'
                          } ${pageNum === currentPage ? 'ring-2 ring-info-500/50' : ''}`}
                          title={`Page ${pageNum}${pageNum === currentPage ? ' (current)' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-1 ml-auto">
                    <button
                      onClick={() => {
                        // Select all pages (set to undefined)
                        updateWatermark({ pages: undefined });
                      }}
                      className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                        (!selectedWatermark.pages || selectedWatermark.pages.length === 0)
                          ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                          : 'bg-surface-700 hover:bg-surface-600 text-surface-300'
                      }`}
                      title="Select all pages"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        // Select only current page
                        updateWatermark({ pages: [currentPage] });
                      }}
                      className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                        selectedWatermark.pages && selectedWatermark.pages.length === 1 && selectedWatermark.pages[0] === currentPage
                          ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                          : 'bg-surface-700 hover:bg-surface-600 text-surface-300'
                      }`}
                      title="Select current page only"
                    >
                      Current
                    </button>
                  </div>
                </div>
                <p className="text-xs text-surface-500 mt-2">
                  {selectedWatermark.pages && selectedWatermark.pages.length > 0 && selectedWatermark.pages.length < totalPages
                    ? `Applied to pages: ${selectedWatermark.pages.join(', ')}`
                    : 'Applied to all pages'}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Rotation */}
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2">
                  <span>Rotation</span>
                  <span className="text-primary-400 font-mono">{selectedWatermark.rotation}°</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={selectedWatermark.rotation}
                    onChange={(e) => updateWatermark({ rotation: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <input
                    type="number"
                    min="-90"
                    max="90"
                    value={selectedWatermark.rotation}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= -90 && val <= 90) {
                        updateWatermark({ rotation: val });
                      }
                    }}
                    className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* Size */}
              {selectedWatermark.type === 'text' ? (
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2">
                    <span>Font Size</span>
                    <span className="text-primary-400 font-mono">{selectedWatermark.fontSize || 48}px</span>
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="range"
                      min="12"
                      max="120"
                      value={selectedWatermark.fontSize || 48}
                      onChange={(e) => updateWatermark({ fontSize: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <input
                      type="number"
                      min="12"
                      max="120"
                      value={selectedWatermark.fontSize || 48}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 12 && val <= 120) {
                          updateWatermark({ fontSize: val });
                        }
                      }}
                      className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2">
                    <span>Scale</span>
                    <span className="text-primary-400 font-mono">{Math.round((selectedWatermark.scale || 0.5) * 100)}%</span>
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={(selectedWatermark.scale || 0.5) * 100}
                      onChange={(e) => updateWatermark({ scale: parseInt(e.target.value) / 100 })}
                      className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={Math.round((selectedWatermark.scale || 0.5) * 100)}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 10 && val <= 100) {
                          updateWatermark({ scale: val / 100 });
                        }
                      }}
                      className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Opacity */}
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-surface-300 mb-2">
                  <span>Opacity</span>
                  <span className="text-primary-400 font-mono">{selectedWatermark.opacity}%</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={selectedWatermark.opacity}
                    onChange={(e) => updateWatermark({ opacity: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={selectedWatermark.opacity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 10 && val <= 100) {
                        updateWatermark({ opacity: val });
                      }
                    }}
                    className="w-20 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* Text content (only for text watermarks) */}
              {selectedWatermark.type === 'text' && (
                <div>
                  <label className="text-xs font-medium text-surface-300 mb-2 block">Text</label>
                  <input
                    type="text"
                    value={selectedWatermark.text || ''}
                    onChange={(e) => updateWatermark({ text: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder="Watermark text"
                  />
                </div>
              )}

              {/* Color (only for text watermarks) */}
              {selectedWatermark.type === 'text' && (
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="text-xs font-medium text-surface-300 mb-3 block">Color</label>
                  
                  {/* Color Picker with Preview */}
                  <div className="space-y-4">
                    {/* Main Color Picker */}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0">
                        <label className="text-xs text-surface-400 mb-2 block">Picker</label>
                        <div className="relative">
                          <input
                            type="color"
                            value={
                              selectedWatermark.color
                                ? `#${Math.round(selectedWatermark.color.r * 255).toString(16).padStart(2, '0')}${Math.round(selectedWatermark.color.g * 255).toString(16).padStart(2, '0')}${Math.round(selectedWatermark.color.b * 255).toString(16).padStart(2, '0')}`
                                : '#b3b3b3'
                            }
                            onChange={(e) => {
                              const hex = e.target.value;
                              const r = parseInt(hex.slice(1, 3), 16) / 255;
                              const g = parseInt(hex.slice(3, 5), 16) / 255;
                              const b = parseInt(hex.slice(5, 7), 16) / 255;
                              updateWatermark({ color: { r, g, b } });
                            }}
                            className="w-20 h-20 rounded-xl border-2 border-surface-600 cursor-pointer hover:border-primary-500 transition-colors shadow-lg"
                            style={{
                              backgroundColor: selectedWatermark.color
                                ? `rgb(${Math.round(selectedWatermark.color.r * 255)}, ${Math.round(selectedWatermark.color.g * 255)}, ${Math.round(selectedWatermark.color.b * 255)})`
                                : '#b3b3b3'
                            }}
                          />
                          <div 
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              background: `linear-gradient(135deg, 
                                rgba(${Math.round((selectedWatermark.color?.r || 0.7) * 255)}, ${Math.round((selectedWatermark.color?.g || 0.7) * 255)}, ${Math.round((selectedWatermark.color?.b || 0.7) * 255)}, 0.3),
                                rgba(${Math.round((selectedWatermark.color?.r || 0.7) * 255)}, ${Math.round((selectedWatermark.color?.g || 0.7) * 255)}, ${Math.round((selectedWatermark.color?.b || 0.7) * 255)}, 0.1)
                              )`,
                              border: '2px solid rgba(139, 92, 246, 0.3)'
                            }}
                          />
                        </div>
                      </div>

                      {/* RGB Sliders */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-surface-300">Red</label>
                            <span className="text-primary-400 font-mono text-xs">
                              {Math.round((selectedWatermark.color?.r || 0.7) * 255)}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <input
                              type="range"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.r || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) / 255;
                                const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                updateWatermark({ color: { ...currentColor, r: val } });
                              }}
                              className="flex-1 h-2 bg-gradient-to-r from-black to-red-500 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-red-500/50 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                            />
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.r || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 0 && val <= 255) {
                                  const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                  updateWatermark({ color: { ...currentColor, r: val / 255 } });
                                }
                              }}
                              className="w-16 px-2 py-1.5 bg-surface-700/50 border border-surface-600 rounded-lg text-xs text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-surface-300">Green</label>
                            <span className="text-primary-400 font-mono text-xs">
                              {Math.round((selectedWatermark.color?.g || 0.7) * 255)}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <input
                              type="range"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.g || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) / 255;
                                const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                updateWatermark({ color: { ...currentColor, g: val } });
                              }}
                              className="flex-1 h-2 bg-gradient-to-r from-black to-green-500 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-green-500/50 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                            />
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.g || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 0 && val <= 255) {
                                  const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                  updateWatermark({ color: { ...currentColor, g: val / 255 } });
                                }
                              }}
                              className="w-16 px-2 py-1.5 bg-surface-700/50 border border-surface-600 rounded-lg text-xs text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-surface-300">Blue</label>
                            <span className="text-primary-400 font-mono text-xs">
                              {Math.round((selectedWatermark.color?.b || 0.7) * 255)}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <input
                              type="range"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.b || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) / 255;
                                const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                updateWatermark({ color: { ...currentColor, b: val } });
                              }}
                              className="flex-1 h-2 bg-gradient-to-r from-black to-blue-500 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/50 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                            />
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={Math.round((selectedWatermark.color?.b || 0.7) * 255)}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 0 && val <= 255) {
                                  const currentColor = selectedWatermark.color || { r: 0.7, g: 0.7, b: 0.7 };
                                  updateWatermark({ color: { ...currentColor, b: val / 255 } });
                                }
                              }}
                              className="w-16 px-2 py-1.5 bg-surface-700/50 border border-surface-600 rounded-lg text-xs text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hex Input */}
                    <div>
                      <label className="text-xs font-medium text-surface-300 mb-2 block">Hex Color</label>
                      <div className="flex gap-2 items-center">
                        <span className="text-surface-400 font-mono text-sm">#</span>
                        <input
                          type="text"
                          value={
                            selectedWatermark.color
                              ? `${Math.round(selectedWatermark.color.r * 255).toString(16).padStart(2, '0')}${Math.round(selectedWatermark.color.g * 255).toString(16).padStart(2, '0')}${Math.round(selectedWatermark.color.b * 255).toString(16).padStart(2, '0')}`
                              : 'b3b3b3'
                          }
                          onChange={(e) => {
                            const hex = e.target.value.replace('#', '').trim();
                            if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
                              const r = parseInt(hex.slice(0, 2), 16) / 255;
                              const g = parseInt(hex.slice(2, 4), 16) / 255;
                              const b = parseInt(hex.slice(4, 6), 16) / 255;
                              updateWatermark({ color: { r, g, b } });
                            }
                          }}
                          placeholder="b3b3b3"
                          className="flex-1 px-3 py-2 bg-surface-700/50 border border-surface-600 rounded-lg text-sm text-surface-100 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all uppercase"
                          maxLength={6}
                        />
                        <div 
                          className="w-12 h-10 rounded-lg border-2 border-surface-600 shadow-lg"
                          style={{
                            backgroundColor: selectedWatermark.color
                              ? `rgb(${Math.round(selectedWatermark.color.r * 255)}, ${Math.round(selectedWatermark.color.g * 255)}, ${Math.round(selectedWatermark.color.b * 255)})`
                              : '#b3b3b3'
                          }}
                        />
                      </div>
                    </div>

                    {/* Quick Color Presets */}
                    <div>
                      <label className="text-xs font-medium text-surface-300 mb-2 block">Quick Colors</label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { r: 0.7, g: 0.7, b: 0.7, name: 'Gray' },
                          { r: 1, g: 1, b: 1, name: 'White' },
                          { r: 0, g: 0, b: 0, name: 'Black' },
                          { r: 1, g: 0, b: 0, name: 'Red' },
                          { r: 0, g: 0, b: 1, name: 'Blue' },
                          { r: 0, g: 1, b: 0, name: 'Green' },
                          { r: 1, g: 1, b: 0, name: 'Yellow' },
                          { r: 1, g: 0, b: 1, name: 'Magenta' },
                          { r: 0, g: 1, b: 1, name: 'Cyan' },
                          { r: 1, g: 0.5, b: 0, name: 'Orange' },
                        ].map((color) => {
                          const isSelected = selectedWatermark.color && 
                            Math.abs((selectedWatermark.color.r * 255) - (color.r * 255)) < 2 &&
                            Math.abs((selectedWatermark.color.g * 255) - (color.g * 255)) < 2 &&
                            Math.abs((selectedWatermark.color.b * 255) - (color.b * 255)) < 2;
                          return (
                            <button
                              key={color.name}
                              onClick={() => updateWatermark({ color: { r: color.r, g: color.g, b: color.b } })}
                              className={`h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                                isSelected
                                  ? 'border-primary-500 ring-2 ring-primary-500/50 shadow-lg shadow-primary-500/30'
                                  : 'border-surface-600 hover:border-primary-500/50'
                              }`}
                              style={{ 
                                backgroundColor: `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`
                              }}
                              title={color.name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-surface-700 bg-surface-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xs text-surface-400">
                {watermarks.length} watermark{watermarks.length !== 1 ? 's' : ''}
                {selectedWatermarkId && ` • Selected: ${watermarks.findIndex(w => w.id === selectedWatermarkId) + 1}`}
              </p>
              {draggingWatermark && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-info-500/10 border border-info-500/20">
                  <Info size={12} className="text-info-400" />
                  <span className="text-xs text-info-300">Dragging watermark...</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
