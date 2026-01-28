'use client';

import { useState } from 'react';
import { usePdfStore } from './store/pdfStore';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useAutosave } from './hooks/useAutosave';
import UploadArea from './components/UploadArea';
import Toolbar from './components/Toolbar';
import EditToolbar from './components/EditToolbar';
import Thumbnails from './components/Thumbnails';
import PdfViewer from './components/PdfViewer';
import ExportButton from './components/ExportButton';
import ConfirmDialog from './components/ConfirmDialog';

export default function Home() {
  const { pages, reset } = usePdfStore();
  const hasPages = pages.length > 0;
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Enable autosave
  useAutosave();

  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 glass border-b border-surface-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success-500 border-2 border-surface-900" />
              </div>
              
              {/* Brand Name */}
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Docu<span className="text-gradient">Flow</span>
                </h1>
                <p className="text-xs text-surface-400 -mt-0.5">Professional PDF Editor</p>
              </div>
            </div>
            
            {/* Close Button */}
            {hasPages && (
              <button
                onClick={() => setConfirmCloseOpen(true)}
                className="btn-ghost btn-md group"
              >
                <svg className="w-5 h-5 text-surface-400 group-hover:text-error-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-surface-300 group-hover:text-surface-100">Close PDF</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {!hasPages ? (
        /* Empty State - Upload Area */
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <div className="max-w-5xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                100% Private — No server uploads
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Edit PDFs with{' '}
                <span className="text-gradient">Professional</span>
                <br />
                Grade Tools
              </h2>
              
              <p className="text-lg text-surface-400 max-w-2xl mx-auto">
                All processing happens locally in your browser. Your documents never leave your device.
                Enterprise-level security by design.
              </p>
            </div>
            
            {/* Upload Area */}
            <div className="mb-16 animate-fade-in-up delay-100">
              <UploadArea />
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'View & Navigate',
                  description: 'Render pages with crystal clarity, zoom seamlessly, and navigate with smart thumbnails',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  ),
                  title: 'Edit & Annotate',
                  description: 'Reorder, rotate, delete pages. Add text, images, shapes, and highlights',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  ),
                  title: 'Export Instantly',
                  description: 'Download your edited PDF with all changes applied. No quality loss guaranteed',
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="feature-card animate-fade-in-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Limitations Notice */}
            <div className="card p-5 border-warning-500/20 bg-warning-500/5 animate-fade-in delay-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-warning-300 mb-2">Current Limitations</h4>
                  <ul className="text-sm text-surface-400 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Maximum file size: 25MB
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Works best with PDFs under 50 pages
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Complex PDFs with forms may not render perfectly
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Encrypted/password-protected PDFs are not supported
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Editor View */
        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar />
          <EditToolbar />
          
          <div className="flex-1 flex overflow-hidden">
            <Thumbnails />
            <PdfViewer />
          </div>
          
          <ExportButton />
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmCloseOpen}
        title="Close current PDF?"
        message="All unsaved changes will be lost. Make sure to export your document first."
        confirmText="Close Document"
        cancelText="Keep Editing"
        type="warning"
        onCancel={() => setConfirmCloseOpen(false)}
        onConfirm={() => {
          reset();
          setConfirmCloseOpen(false);
        }}
      />
    </main>
  );
}
