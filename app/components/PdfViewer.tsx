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
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">No pages to display</div>
      </div>
    );
  }

  const currentPageNumber = activePages.findIndex((p) => p.id === selectedPageId) + 1;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Pagination Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPageNumber === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Page</span>
          <select
            value={selectedPageId || ''}
            onChange={handlePageJump}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {activePages.map((page, index) => (
              <option key={page.id} value={page.id}>
                {index + 1}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600">of {activePages.length}</span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPageNumber === activePages.length}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Canvas Display Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-center">
          <div className="relative inline-block">
            {isRendering && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="text-gray-600">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  Rendering...
                </div>
              </div>
            )}
            
            <canvas
              ref={canvasRef}
              className="shadow-lg bg-white"
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
