'use client';

import { useState } from 'react';
import { usePdfStore } from '../store/pdfStore';
import ConfirmDialog from './ConfirmDialog';

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
    undo,
    redo,
    history,
    historyIndex,
  } = usePdfStore();

  const selectedPage = pages.find((p) => p.id === selectedPageId);
  const activePages = pages.filter((p) => !p.deleted);
  const hasPages = pages.length > 0;

  const [confirmDeletePageOpen, setConfirmDeletePageOpen] = useState(false);
  const [cannotDeleteLastOpen, setCannotDeleteLastOpen] = useState(false);

  const handleRotate = () => {
    if (selectedPageId) {
      rotatePage(selectedPageId, 90);
    }
  };

  const handleDelete = () => {
    if (selectedPageId && activePages.length > 1) {
      setConfirmDeletePageOpen(true);
    } else if (activePages.length === 1) {
      setCannotDeleteLastOpen(true);
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
    <>
      <div className="glass border-b border-surface-700/50 px-2 sm:px-4 py-2 sm:py-3 overflow-x-auto">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-max">
          {/* File Info */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {hasPages && (
              <>
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* File Icon */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-error-500/10 border border-error-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-surface-100 line-clamp-1 max-w-[200px]">
                      {fileName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-surface-400">
                      <span>{formatFileSize(fileSize)}</span>
                      <span className="w-1 h-1 rounded-full bg-surface-600" />
                      <span>{activePages.length} {activePages.length === 1 ? 'page' : 'pages'}</span>
                    </div>
                  </div>
                  {/* Mobile: Show only file name */}
                  <div className="sm:hidden">
                    <p className="text-xs font-medium text-surface-100 line-clamp-1 max-w-[120px]">
                      {fileName}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Undo/Redo */}
            {hasPages && (
              <div className="toolbar-group">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="btn-icon-sm btn-ghost"
                  title="Undo (Ctrl+Z)"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="btn-icon-sm btn-ghost"
                  title="Redo (Ctrl+Shift+Z)"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Text Extraction Toggle (only before PDF is loaded) */}
            {!hasPages && (
              <label className="flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-800/50 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={extractTextOnLoad}
                  onChange={(e) => setExtractTextOnLoad(e.target.checked)}
                  className="checkbox"
                />
                <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">
                  Extract text from PDF
                </span>
              </label>
            )}

            {hasPages && (
              <>
                {/* Zoom Controls */}
                <div className="toolbar-group">
                  <button
                    onClick={handleZoomOut}
                    disabled={!hasPages || zoom <= 0.5}
                    className="btn-icon-sm btn-ghost"
                    title="Zoom out"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                    </svg>
                  </button>
                  
                  <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium text-surface-200 min-w-[3rem] sm:min-w-[4rem] text-center font-mono">
                    {Math.round(zoom * 100)}%
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    disabled={!hasPages || zoom >= 3}
                    className="btn-icon-sm btn-ghost"
                    title="Zoom in"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </button>
                </div>

                {/* Divider */}
                <div className="divider-vertical h-8 mx-1" />

                {/* Rotate */}
                <button
                  onClick={handleRotate}
                  disabled={!selectedPageId}
                  className="btn-sm btn-secondary"
                  title="Rotate page 90° clockwise"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Rotate</span>
                </button>

                {/* Delete */}
                <button
                  onClick={handleDelete}
                  disabled={!selectedPageId || activePages.length <= 1}
                  className="btn-sm btn-danger"
                  title="Delete page"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDeletePageOpen}
        title="Delete page?"
        message="Are you sure you want to delete this page? This action can be undone."
        confirmText="Delete Page"
        cancelText="Cancel"
        type="danger"
        onCancel={() => setConfirmDeletePageOpen(false)}
        onConfirm={() => {
          if (selectedPageId) deletePage(selectedPageId);
          setConfirmDeletePageOpen(false);
        }}
      />

      <ConfirmDialog
        isOpen={cannotDeleteLastOpen}
        title="Cannot delete page"
        message="You can't delete the last remaining page. A document must have at least one page."
        confirmText="Understood"
        type="info"
        showCancel={false}
        onCancel={() => setCannotDeleteLastOpen(false)}
        onConfirm={() => setCannotDeleteLastOpen(false)}
      />
    </>
  );
}
