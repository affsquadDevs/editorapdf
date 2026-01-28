'use client';

import { useEffect, useRef, useState } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { loadPdfDocument, renderPageToCanvas } from '../lib/pdf/pdfRender';
import AdvancedOverlayLayer from './AdvancedOverlayLayer';

export default function PdfViewer() {
  const { pages, selectedPageId, originalFile, zoom, setSelectedPageId } = usePdfStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);

  const selectedPage = pages.find((p) => p.id === selectedPageId);
  const activePages = pages.filter((p) => !p.deleted);

  // Navigate to next non-deleted page if current page is deleted
  useEffect(() => {
    if (selectedPage?.deleted && activePages.length > 0) {
      setSelectedPageId(activePages[0].id);
    }
  }, [selectedPage?.deleted, activePages, setSelectedPageId]);

  // Render the selected page
  useEffect(() => {
    if (!originalFile || !selectedPage || !canvasRef.current) return;

    const renderPage = async () => {
      setIsRendering(true);
      try {
        const pdfDoc = await loadPdfDocument(originalFile);
        await renderPageToCanvas(
          pdfDoc,
          selectedPage.index + 1,
          canvasRef.current!,
          zoom,
          selectedPage.rotation
        );
      } catch (err) {
        console.error('Error rendering page:', err);
      } finally {
        setIsRendering(false);
      }
    };

    renderPage();
  }, [originalFile, selectedPage?.id, selectedPage?.index, selectedPage?.rotation, zoom]);

  const handlePrevPage = () => {
    if (!selectedPage) return;
    const currentIndex = activePages.findIndex((p) => p.id === selectedPageId);
    if (currentIndex > 0) {
      setSelectedPageId(activePages[currentIndex - 1].id);
    }
  };

  const handleNextPage = () => {
    if (!selectedPage) return;
    const currentIndex = activePages.findIndex((p) => p.id === selectedPageId);
    if (currentIndex < activePages.length - 1) {
      setSelectedPageId(activePages[currentIndex + 1].id);
    }
  };

  const handlePageJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPageId(pageId);
  };

  if (!selectedPage || activePages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-900/50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-surface-400">No pages to display</p>
        </div>
      </div>
    );
  }

  const currentPageNumber = activePages.findIndex((p) => p.id === selectedPageId) + 1;

  return (
    <div className="flex-1 flex flex-col bg-surface-900/30">
      {/* Pagination Controls */}
      <div className="glass border-b border-surface-700/50 px-4 py-2.5">
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPageNumber === 1}
            className="btn-icon-sm btn-ghost"
            title="Previous page"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Page Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-800/50">
            <span className="text-xs text-surface-400 font-medium">Page</span>
            <select
              value={selectedPageId || ''}
              onChange={handlePageJump}
              className="bg-transparent text-sm font-medium text-surface-100 focus:outline-none cursor-pointer appearance-none text-center min-w-[2.5rem] pr-1"
            >
              {activePages.map((page, index) => (
                <option key={page.id} value={page.id} className="bg-surface-800 text-surface-100">
                  {index + 1}
                </option>
              ))}
            </select>
            <span className="text-xs text-surface-500">of</span>
            <span className="text-sm font-medium text-surface-300">{activePages.length}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPageNumber === activePages.length}
            className="btn-icon-sm btn-ghost"
            title="Next page"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Keyboard Hint */}
          <div className="hidden lg:flex items-center gap-1 ml-4 text-xs text-surface-500">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-700 text-surface-400 font-mono">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-700 text-surface-400 font-mono">→</kbd>
            <span className="ml-1">to navigate</span>
          </div>
        </div>
      </div>

      {/* Canvas Display Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-center">
          <div className="relative inline-block">
            {/* Loading Overlay */}
            {isRendering && (
              <div className="absolute inset-0 bg-surface-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="spinner-lg text-primary-400" />
                  <span className="text-sm text-surface-300">Rendering page...</span>
                </div>
              </div>
            )}
            
            {/* PDF Canvas */}
            <canvas
              ref={canvasRef}
              className="pdf-canvas-container"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* Advanced Overlay Layer */}
            {selectedPage && (
              <AdvancedOverlayLayer
                pageId={selectedPage.id}
                pageWidth={selectedPage.width}
                pageHeight={selectedPage.height}
                zoom={zoom}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
