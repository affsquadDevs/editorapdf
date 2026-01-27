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

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {progress && (
            <span className={progress.includes('failed') ? 'text-red-600' : 'text-blue-600'}>
              {progress}
            </span>
          )}
        </div>
        
        <button
          onClick={handleExport}
          disabled={!hasPages || isExporting}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Exporting...
            </>
          ) : (
            <>
              ↓ Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
