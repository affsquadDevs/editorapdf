'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePdfStore } from '../store/pdfStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useAutosave } from '../hooks/useAutosave';
import UploadArea from '../components/UploadArea';
import Toolbar from '../components/Toolbar';
import EditToolbar from '../components/EditToolbar';
import ConfirmDialog from '../components/ConfirmDialog';
import MobileMenu from '../components/MobileMenu';

// Dynamic imports for PDF components - only load when needed
const Thumbnails = dynamic(() => import('../components/Thumbnails'), {
  ssr: false,
  loading: () => <div className="w-64 bg-surface-800/50 animate-pulse" />,
});

const PdfViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-surface-900/30">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-800 flex items-center justify-center animate-pulse">
          <svg className="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-surface-400">Loading PDF viewer...</p>
      </div>
    </div>
  ),
});

const ExportButton = dynamic(() => import('../components/ExportButton'), {
  ssr: false,
});

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
      <main className="h-screen h-[100dvh] flex flex-col" role="main">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-surface-700/50" role="banner">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <MobileMenu />
                
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img 
                    src="/logo.svg" 
                    alt="EditoraPDF Logo" 
                    width={120} 
                    height={40} 
                    className="h-10 w-auto"
                    loading="eager"
                    fetchPriority="high"
                  />
                </Link>
              </div>
              
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
            
            <div className="flex-1 flex overflow-hidden relative">
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
