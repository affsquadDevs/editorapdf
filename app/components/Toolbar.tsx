'use client';

import { usePdfStore } from '../store/pdfStore';

export default function Toolbar() {
  const {
    pages,
    selectedPageId,
    zoom,
    setZoom,
    rotatePage,
    deletePage,
    fileName,
    fileSize,
    extractTextOnLoad,
    setExtractTextOnLoad,
  } = usePdfStore();

  const selectedPage = pages.find((p) => p.id === selectedPageId);
  const activePages = pages.filter((p) => !p.deleted);
  const hasPages = pages.length > 0;

  const handleRotate = () => {
    if (selectedPageId) {
      rotatePage(selectedPageId, 90);
    }
  };

  const handleDelete = () => {
    if (selectedPageId && activePages.length > 1) {
      if (confirm('Are you sure you want to delete this page?')) {
        deletePage(selectedPageId);
      }
    } else if (activePages.length === 1) {
      alert('Cannot delete the last page');
    }
  };

  const handleZoomIn = () => setZoom(zoom + 0.25);
  const handleZoomOut = () => setZoom(zoom - 0.25);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* File Info */}
        <div className="flex items-center gap-4">
          {hasPages && (
            <>
              <div className="text-sm">
                <span className="font-medium">{fileName}</span>
                <span className="text-gray-500 ml-2">
                  {formatFileSize(fileSize)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {activePages.length} {activePages.length === 1 ? 'page' : 'pages'}
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Text Extraction Toggle (only before PDF is loaded) */}
          {!hasPages && (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={extractTextOnLoad}
                onChange={(e) => setExtractTextOnLoad(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700">Extract text from PDF</span>
            </label>
          )}

          {hasPages && (
            <>
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border border-gray-300 rounded">
                <button
                  onClick={handleZoomOut}
                  disabled={!hasPages || zoom <= 0.5}
                  className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom out"
                >
                  −
                </button>
                <span className="px-2 text-sm font-medium min-w-[4rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={!hasPages || zoom >= 3}
                  className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom in"
                >
                  +
                </button>
              </div>

              {/* Rotate */}
              <button
                onClick={handleRotate}
                disabled={!selectedPageId}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Rotate page 90° clockwise"
              >
                ↻ Rotate
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={!selectedPageId || activePages.length <= 1}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Delete page"
              >
                Delete Page
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
