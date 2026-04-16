'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/pdfRender';
import { useAppTranslations } from '../i18n/TranslationProvider';

export type HyperlinkPreviewRect = { x: number; y: number; w: number; h: number };

export interface HyperlinkPreviewRow {
  id: string;
  url: string;
  label: string;
  pageNumber: number;
  rect: HyperlinkPreviewRect;
}

export interface HyperlinkPreviewProps {
  pdfFile: File;
  rows: HyperlinkPreviewRow[];
  selectedId: string;
  onSelectId: (id: string) => void;
  onRectChange: (id: string, rect: HyperlinkPreviewRect) => void;
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

const MIN_N = 0.02;

function clampRect(r: HyperlinkPreviewRect): HyperlinkPreviewRect {
  let { x, y, w, h } = r;
  w = Math.max(MIN_N, Math.min(1, w));
  h = Math.max(MIN_N, Math.min(1, h));
  x = Math.max(0, Math.min(1 - w, x));
  y = Math.max(0, Math.min(1 - h, y));
  return { x, y, w, h };
}

export default function HyperlinkPreview({
  pdfFile,
  rows,
  selectedId,
  onSelectId,
  onRectChange,
  previewPage,
  onPreviewPageChange,
}: HyperlinkPreviewProps) {
  const { t } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));

  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [renderScale, setRenderScale] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [overlayBoxes, setOverlayBoxes] = useState<
    Record<string, { left: number; top: number; width: number; height: number }>
  >({});

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

  const pixelToNormalized = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
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
    },
    [pdfPageSize, renderScale],
  );

  const updateOverlays = useCallback(() => {
    const img = imageRef.current;
    if (!img?.complete || !pdfPageSize || renderScale == null || img.naturalWidth === 0) {
      setOverlayBoxes({});
      return;
    }
    const rect = img.getBoundingClientRect();
    const display = getDisplayArea(img, rect);
    const rw = display.width / img.naturalWidth;
    const rh = display.height / img.naturalHeight;
    const next: Record<string, { left: number; top: number; width: number; height: number }> = {};
    for (const row of rows) {
      if (row.pageNumber !== previewPage) continue;
      const pdfLeft = row.rect.x * pdfPageSize.width;
      const pdfTop = row.rect.y * pdfPageSize.height;
      const pdfW = row.rect.w * pdfPageSize.width;
      const pdfH = row.rect.h * pdfPageSize.height;
      const renderedLeft = pdfLeft * renderScale;
      const renderedTop = pdfTop * renderScale;
      const renderedW = pdfW * renderScale;
      const renderedH = pdfH * renderScale;
      next[row.id] = {
        left: display.offsetX + renderedLeft * rw,
        top: display.offsetY + renderedTop * rh,
        width: renderedW * rw,
        height: renderedH * rh,
      };
    }
    setOverlayBoxes(next);
  }, [rows, pdfPageSize, renderScale, previewPage]);

  useEffect(() => {
    updateOverlays();
    window.addEventListener('resize', updateOverlays);
    return () => window.removeEventListener('resize', updateOverlays);
  }, [updateOverlays, pageImage]);

  const startDrag = (e: React.PointerEvent, row: HyperlinkPreviewRow) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectId(row.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const start = pixelToNormalized(e.clientX, e.clientY);
    const startRect = { ...row.rect };
    if (!start) return;

    const onMove = (ev: PointerEvent) => {
      const now = pixelToNormalized(ev.clientX, ev.clientY);
      if (!now) return;
      const dx = now.x - start.x;
      const dy = now.y - start.y;
      onRectChange(
        row.id,
        clampRect({
          x: startRect.x + dx,
          y: startRect.y + dy,
          w: startRect.w,
          h: startRect.h,
        }),
      );
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const startResize = (e: React.PointerEvent, row: HyperlinkPreviewRow) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectId(row.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const startRect = { ...row.rect };

    const onMove = (ev: PointerEvent) => {
      const br = pixelToNormalized(ev.clientX, ev.clientY);
      if (!br) return;
      let newW = br.x - startRect.x;
      let newH = br.y - startRect.y;
      newW = Math.max(MIN_N, Math.min(1 - startRect.x, newW));
      newH = Math.max(MIN_N, Math.min(1 - startRect.y, newH));
      onRectChange(row.id, clampRect({ ...startRect, w: newW, h: newH }));
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const onPage = rows.filter((r) => r.pageNumber === previewPage);

  return (
    <div className="rounded-xl bg-surface-800/40 border border-surface-700/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-surface-700/40 bg-surface-900/30">
        <p className="text-sm font-medium text-surface-200">
          {tr('tools.hyperlinks.previewTitle', 'Preview — drag area to move, corner to resize')}
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
      <div className="relative flex justify-center p-4 bg-surface-900/40 min-h-[200px]">
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-sm text-surface-500">
            {tr('tools.hyperlinks.previewLoading', 'Loading page…')}
          </div>
        )}
        {loadError && !isLoading && <p className="text-sm text-error-400 py-8">{loadError}</p>}
        {pageImage && !loadError && (
          <div className="relative inline-block select-none">
            <img
              ref={imageRef}
              src={pageImage}
              alt="PDF preview"
              className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-lg block"
              onLoad={updateOverlays}
              draggable={false}
            />
            {onPage.map((row) => {
              const box = overlayBoxes[row.id];
              if (!box) return null;
              const selected = row.id === selectedId;
              return (
                <div
                  key={row.id}
                  className={`absolute border-2 rounded-md touch-none ${
                    selected
                      ? 'border-primary-400 bg-primary-500/15 cursor-move'
                      : 'border-info-400/80 bg-info-500/10 cursor-pointer'
                  }`}
                  style={{
                    left: box.left,
                    top: box.top,
                    width: Math.max(24, box.width),
                    height: Math.max(24, box.height),
                  }}
                  onPointerDown={(e) => startDrag(e, row)}
                  role="presentation"
                >
                  {selected && (
                    <button
                      type="button"
                      className="absolute -right-1 -bottom-1 w-4 h-4 bg-primary-500 border-2 border-surface-900 rounded-sm cursor-nwse-resize shadow z-10"
                      aria-label={tr('tools.hyperlinks.resizeHandle', 'Resize')}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        startResize(e, row);
                      }}
                    />
                  )}
                  {row.label.trim() && (
                    <span className="pointer-events-none absolute inset-1 flex items-start justify-start text-left text-[10px] sm:text-xs text-primary-200/90 break-words overflow-hidden leading-tight p-0.5">
                      {row.label}
                    </span>
                  )}
                </div>
              );
            })}
            {onPage.length === 0 && (
              <p className="absolute inset-0 flex items-center justify-center text-xs text-surface-500 bg-surface-900/40 rounded-lg pointer-events-none">
                {tr('tools.hyperlinks.noLinksOnPage', 'No links on this page — add one or switch page')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
