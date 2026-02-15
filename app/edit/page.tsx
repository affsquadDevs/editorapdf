'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePdfStore } from '../store/pdfStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useAutosave } from '../hooks/useAutosave';
import UploadArea from '../components/UploadArea';
import Toolbar from '../components/Toolbar';
import { FileText, X, PenSquare, Wrench } from 'lucide-react';
import EditToolbar from '../components/EditToolbar';
import ConfirmDialog from '../components/ConfirmDialog';
import Header from '../components/Header';
import ToolsPanel from '../components/ToolsPanel';

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
          <FileText size={32} strokeWidth={1.5} className="text-surface-500" />
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

type ActiveTab = 'editor' | 'tools';

export default function EditPage() {
  const { pages, reset } = usePdfStore();
  const hasPages = pages.length > 0;
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('editor');

  // Handle ?tab=tools URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'tools') {
        setActiveTab('tools');
      }
    }
  }, []);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Enable autosave
  useAutosave();

  return (
    <>
      <main className="h-screen h-[100dvh] flex flex-col" role="main">
        <Header 
          showCloseButton={hasPages}
          onClose={() => setConfirmCloseOpen(true)}
          closeButtonLabel="Close PDF"
        />

        {/* Main Content */}
        {!hasPages ? (
          /* Empty State - Upload Area with Tabs */
          <div className="flex-1 flex flex-col overflow-auto">
            {/* Tab Switcher */}
            <div className="sticky top-0 z-10 border-b border-surface-700/50 bg-surface-900/80 backdrop-blur-sm">
              <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`
                      relative px-5 py-3.5 text-sm font-semibold transition-all duration-200
                      ${activeTab === 'editor'
                        ? 'text-primary-400'
                        : 'text-surface-400 hover:text-surface-200'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <PenSquare size={16} strokeWidth={2} />
                      Edit PDF
                    </div>
                    {activeTab === 'editor' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('tools')}
                    className={`
                      relative px-5 py-3.5 text-sm font-semibold transition-all duration-200
                      ${activeTab === 'tools'
                        ? 'text-primary-400'
                        : 'text-surface-400 hover:text-surface-200'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Wrench size={16} strokeWidth={2} />
                      PDF Tools
                      <span className="px-1.5 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    </div>
                    {activeTab === 'tools' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="max-w-5xl w-full">
                {activeTab === 'editor' ? (
                  /* Upload Area */
                  <div className="mb-16 animate-fade-in-up delay-100" role="region" aria-label="PDF Upload">
                    <UploadArea />
                  </div>
                ) : (
                  /* PDF Tools Panel */
                  <div className="mb-16" role="region" aria-label="PDF Tools">
                    <ToolsPanel />
                  </div>
                )}
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
