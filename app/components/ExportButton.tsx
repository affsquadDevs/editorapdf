'use client';

import { useState } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { exportPdf, downloadPdf } from '../lib/pdf/exportPdf';

export default function ExportButton() {
  const { originalFile, pages, fileName, isExporting, setIsExporting } = usePdfStore();
  const [progress, setProgress] = useState('');

  const hasPages = pages.length > 0 && pages.some((p) => !p.deleted);

  const handleExport = async () => {
    if (!originalFile || !hasPages) return;

    setIsExporting(true);
    setProgress('Preparing export...');

    try {
      // Export the PDF
      setProgress('Generating PDF...');
      const pdfBytes = await exportPdf(originalFile, pages);
      
      // Download the file
      setProgress('Downloading...');
      const exportFileName = fileName.replace('.pdf', '_edited.pdf');
      downloadPdf(pdfBytes, exportFileName);
      
      setProgress('Export complete!');
      
      // Clear progress after a delay
      setTimeout(() => {
        setProgress('');
        setIsExporting(false);
      }, 2000);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      setProgress('Export failed. Please try again.');
      setTimeout(() => {
        setProgress('');
        setIsExporting(false);
      }, 3000);
    }
  };

  const getProgressIcon = () => {
    if (progress.includes('complete')) {
      return (
        <svg className="w-4 h-4 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (progress.includes('failed')) {
      return (
        <svg className="w-4 h-4 text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      );
    }
    return <div className="spinner text-primary-400" />;
  };

  return (
    <div 
      className="glass border-t border-surface-700/50 px-2 sm:px-4 py-2 sm:py-3"
      style={{
        paddingBottom: `max(0.5rem, calc(0.5rem + env(safe-area-inset-bottom, 0px)))`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Progress Status */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {progress && (
            <div className="flex items-center gap-2 animate-fade-in min-w-0">
              {getProgressIcon()}
              <span className={`text-xs sm:text-sm font-medium truncate ${
                progress.includes('failed') 
                  ? 'text-error-400' 
                  : progress.includes('complete')
                    ? 'text-success-400'
                    : 'text-primary-400'
              }`}>
                {progress}
              </span>
            </div>
          )}
          
          {!progress && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-surface-400 hidden sm:flex">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span className="hidden md:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-surface-700 text-surface-300 text-xs font-mono">Ctrl+S</kbd> to export</span>
            </div>
          )}
        </div>
        
        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={!hasPages || isExporting}
          data-export-button
          className="btn-lg btn-success group flex-shrink-0"
          title="Export PDF (Ctrl+S)"
        >
          {isExporting ? (
            <>
              <div className="spinner text-white" />
              <span className="hidden sm:inline">Exporting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
