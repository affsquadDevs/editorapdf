'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import QRCode from 'qrcode';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { useAppTranslations } from '../i18n/TranslationProvider';

import { MM_TO_PT } from '../lib/pdf/pdfUnits';

export interface QrCodePreviewProps {
  pdfFile: File;
  qrContent: string;
  /** Square size in millimeters (PDF points derived as mm * 2.83465). */
  sizeMm: number;
  /** Normalized center: x,y in [0,1]; y=0 top, y=1 bottom (matches addQrCode). */
  position: { x: number; y: number };
  onPositionChange: (p: { x: number; y: number }) => void;
  onSizeMmChange: (mm: number) => void;
  previewPage: number;
  onPreviewPageChange: (page: number) => void;
}

function getDisplayArea(img: HTMLImageElement, rect: DOMRect) {
  if (!img.naturalWidth || !img.naturalHeight) {
    return { width: rect.width, height: rect.height, offsetX: 0, offsetY: 0 };
  }
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const rectAspect = rect.width / rect.height;
  if (imgAspect > rectAspect) {
    const width = rect.width;
    const height = rect.width / imgAspect;
    return { width, height, offsetX: 0, offsetY: (rect.height - height) / 2 };
  }
  const width = rect.height * imgAspect;
  const height = rect.height;
  return { width, height, offsetX: (rect.width - width) / 2, offsetY: 0 };
}

export default function QrCodePreview({
  pdfFile,
  qrContent,
  sizeMm,
  position,
  onPositionChange,
  onSizeMmChange,
  previewPage,
  onPreviewPageChange,
}: QrCodePreviewProps) {
  const { t } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [overlayPx, setOverlayPx] = useState<{ left: number; top: number; size: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!qrContent.trim()) {
        setQrDataUrl(null);
        return;
      }
      try {
        const url = await QRCode.toDataURL(qrContent.trim(), {
          errorCorrectionLevel: 'M',
          margin: 1,
          width: 320,
        });
        if (!cancelled) setQrDataUrl(url);
      } catch {
        if (!cancelled) setQrDataUrl(null);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [qrContent]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const pdfDoc = await loadPdfDocument(pdfFile);
        const n = pdfDoc.numPages;
        if (cancelled) return;
        setTotalPages(n);
        const pageNum = Math.min(Math.max(1, previewPage), n);
        if (pageNum !== previewPage) {
          onPreviewPageChange(pageNum);
        }

        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        setPdfPageSize({ width: viewport.width, height: viewport.height });
        const maxWidth = 900;
        const scale = maxWidth / viewport.width;
        setRenderScale(scale);
        const dataUrl = await renderPageToDataUrl(pdfDoc, pageNum, maxWidth, 0);
        if (!cancelled) setPageImage(dataUrl);
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : 'Failed to load PDF');
          setPageImage(null);
          setPdfPageSize(null);
          setRenderScale(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-fetch when file or page index changes
  }, [pdfFile, previewPage]);

  const normalizedToOverlay = useCallback(() => {
    const img = imageRef.current;
    if (!img?.complete || !pdfPageSize || renderScale == null || img.naturalWidth === 0) {
      setOverlayPx(null);
      return;
    }
    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);
    const pdfX = position.x * pdfPageSize.width;
    const pdfY = position.y * pdfPageSize.height;
    const renderedX = pdfX * renderScale;
    const renderedY = pdfY * renderScale;
    const rw = display.width / img.naturalWidth;
    const rh = display.height / img.naturalHeight;
    const centerX = display.offsetX + renderedX * rw;
    const centerY = display.offsetY + renderedY * rh;
    const sizePt = sizeMm * MM_TO_PT;
    const sizeRendered = sizePt * renderScale;
    const sizeDisplay = sizeRendered * rw;
    setOverlayPx({
      left: centerX - sizeDisplay / 2,
      top: centerY - sizeDisplay / 2,
      size: Math.max(24, sizeDisplay),
    });
  }, [position, pdfPageSize, renderScale, sizeMm]);

  useEffect(() => {
    normalizedToOverlay();
    window.addEventListener('resize', normalizedToOverlay);
    return () => window.removeEventListener('resize', normalizedToOverlay);
  }, [normalizedToOverlay, pageImage]);

  const pixelToNormalized = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const img = imageRef.current;
    if (!img?.complete || !pdfPageSize || renderScale == null || img.naturalWidth === 0) return null;
    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);
    const relX = clientX - rect.left - display.offsetX;
    const relY = clientY - rect.top - display.offsetY;
    if (relX < 0 || relY < 0 || relX > display.width || relY > display.height) return null;
    const rx = img.naturalWidth / display.width;
    const ry = img.naturalHeight / display.height;
    const renderedX = relX * rx;
    const renderedY = relY * ry;
    const pdfX = renderedX / renderScale;
    const pdfY = renderedY / renderScale;
    return {
      x: Math.max(0, Math.min(1, pdfX / pdfPageSize.width)),
      y: Math.max(0, Math.min(1, pdfY / pdfPageSize.height)),
    };
  };

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const n = pixelToNormalized(ev.clientX, ev.clientY);
      if (n) onPositionChange(n);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startMm = sizeMm;

    const onMove = (ev: PointerEvent) => {
      const img = imageRef.current;
      if (!img?.complete || renderScale == null) return;
      const rect = img.getBoundingClientRect();
      const display = getDisplayArea(img, rect);
      const deltaClient = ev.clientX - startX;
      const deltaRendered = deltaClient * (img.naturalWidth / display.width);
      const deltaPdfPt = deltaRendered / renderScale;
      const deltaMm = deltaPdfPt / MM_TO_PT;
      const next = Math.round((startMm + deltaMm) * 10) / 10;
      onSizeMmChange(Math.max(8, Math.min(120, next)));
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className="rounded-xl bg-surface-800/40 border border-surface-700/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-surface-700/40 bg-surface-900/30">
        <p className="text-sm font-medium text-surface-200">
          {tr('tools.qrCode.previewTitle', 'Preview — drag QR to move, corner to resize')}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-lg hover:bg-surface-700/50 text-surface-400 disabled:opacity-40"
              disabled={previewPage <= 1}
              onClick={() => onPreviewPageChange(Math.max(1, previewPage - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-surface-500 tabular-nums">
              {previewPage} / {totalPages}
            </span>
            <button
              type="button"
              className="p-1 rounded-lg hover:bg-surface-700/50 text-surface-400 disabled:opacity-40"
              disabled={previewPage >= totalPages}
              onClick={() => onPreviewPageChange(Math.min(totalPages, previewPage + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      <div ref={containerRef} className="relative flex justify-center p-4 bg-surface-900/40 min-h-[200px]">
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-sm text-surface-500">
            {tr('tools.qrCode.previewLoading', 'Loading page…')}
          </div>
        )}
        {loadError && !isLoading && (
          <p className="text-sm text-error-400 py-8">{loadError}</p>
        )}
        {pageImage && !loadError && (
          <div className="relative inline-block select-none">
            <img
              ref={imageRef}
              src={pageImage}
              alt="PDF preview"
              className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-lg block"
              onLoad={normalizedToOverlay}
              draggable={false}
            />
            {qrDataUrl && overlayPx && (
              <div
                className="absolute border-2 border-primary-400/90 rounded-md shadow-lg cursor-move touch-none bg-white/95"
                style={{
                  left: overlayPx.left,
                  top: overlayPx.top,
                  width: overlayPx.size,
                  height: overlayPx.size,
                }}
                onPointerDown={startDrag}
                role="presentation"
              >
                <img src={qrDataUrl} alt="" className="w-full h-full object-contain p-0.5 pointer-events-none" draggable={false} />
                <button
                  type="button"
                  className="absolute -right-1 -bottom-1 w-4 h-4 bg-primary-500 border-2 border-surface-900 rounded-sm cursor-nwse-resize shadow"
                  aria-label={tr('tools.qrCode.resizeHandle', 'Resize')}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    startResize(e);
                  }}
                />
              </div>
            )}
            {!qrDataUrl && qrContent.trim() && (
              <p className="absolute inset-0 flex items-center justify-center text-xs text-surface-500 bg-surface-900/60 rounded-lg">
                {tr('tools.qrCode.invalidContent', 'Could not generate QR for this text')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
