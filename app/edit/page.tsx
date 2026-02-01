'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePdfStore } from '../store/pdfStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useAutosave } from '../hooks/useAutosave';
import UploadArea from '../components/UploadArea';
import Toolbar from '../components/Toolbar';
import EditToolbar from '../components/EditToolbar';
import Thumbnails from '../components/Thumbnails';
import PdfViewer from '../components/PdfViewer';
import ExportButton from '../components/ExportButton';
import ConfirmDialog from '../components/ConfirmDialog';

const siteUrl = 'https://editorapdf.com';

export default function EditPage() {
  const { pages, reset } = usePdfStore();
  const hasPages = pages.length > 0;
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Enable autosave
  useAutosave();

  return (
    <>
      <main className="h-screen flex flex-col" role="main">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-surface-700/50" role="banner">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Logo & Brand */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.svg" 
                  alt="EditoraPDF Logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                />
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                <Link href="/" className="nav-link">
                  Home
                </Link>
                <Link href="/how-it-works" className="nav-link">
                  How It Works
                </Link>
                <Link href="/about" className="nav-link">
                  About
                </Link>
                <Link href="/blog" className="nav-link">
                  Blog
                </Link>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </nav>
              
              {/* Close Button when PDF is open */}
              {hasPages && (
                <button
                  onClick={() => setConfirmCloseOpen(true)}
                  className="btn-ghost btn-md group"
                  aria-label="Close PDF document"
                >
                  <svg className="w-5 h-5 text-surface-400 group-hover:text-error-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-5xl w-full">
              {/* Upload Area */}
              <div className="mb-16 animate-fade-in-up delay-100" role="region" aria-label="PDF Upload">
                <UploadArea />
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
            // Redirect to home after closing
            window.location.href = '/';
          }}
        />
      </main>
    </>
  );
}
