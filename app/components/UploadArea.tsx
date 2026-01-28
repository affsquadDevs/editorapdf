'use client';

import { useCallback, useState } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { loadPdfDocument, getPdfPagesInfo } from '../lib/pdf/pdfRender';
import { extractTextFromPage } from '../lib/pdf/pdfExtract';
import type { PdfPage, TextOverlay } from '../store/pdfStore';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setOriginalFile, setPages, setSelectedPageId, extractTextOnLoad } = usePdfStore();

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds 25MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Create object URL for the file
        const fileUrl = URL.createObjectURL(file);
        
        // Load PDF document
        const pdfDoc = await loadPdfDocument(file);
        const pagesInfo = await getPdfPagesInfo(pdfDoc);
        
        // Create pages array with optional text extraction
        const pages: PdfPage[] = await Promise.all(
          pagesInfo.map(async (info, idx) => {
            let textOverlays: TextOverlay[] = [];
            
            // Extract text from page only if enabled
            if (extractTextOnLoad) {
              try {
                const extractedTexts = await extractTextFromPage(pdfDoc, idx + 1);
                
                // Convert extracted text to overlays
                textOverlays = extractedTexts.map((text) => ({
                  id: text.id,
                  pageId: `page-${idx}`,
                  x: text.x,
                  y: text.y,
                  text: text.text,
                  fontSize: text.fontSize,
                  color: '#000000',
                  isOriginal: true,
                  hidden: false,
                  fontFamily: 'helvetica',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  textAlign: 'left',
                  maxWidth: 0.3,
                }));
              } catch (err) {
                console.warn('Failed to extract text from page', idx + 1, err);
              }
            }
            
            return {
              id: `page-${idx}`,
              index: idx,
              rotation: 0,
              deleted: false,
              overlays: textOverlays,
              images: [],
              shapes: [],
              width: info.width,
              height: info.height,
            };
          })
        );
        
        // Update store
        setOriginalFile(file, fileUrl);
        setPages(pages);
        setSelectedPageId(pages[0]?.id || null);
        
        // Save initial state for undo/redo
        const { saveHistory } = usePdfStore.getState();
        setTimeout(() => saveHistory(), 0);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. The file may be corrupted or encrypted.');
        setIsLoading(false);
      }
    },
    [setOriginalFile, setPages, setSelectedPageId, extractTextOnLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          upload-zone p-12 min-h-[280px]
          ${isDragging ? 'upload-zone-active' : ''}
          ${error ? 'border-error-500/50 bg-error-500/5' : ''}
        `}
      >
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
          disabled={isLoading}
        />
        
        <label htmlFor="file-input" className="cursor-pointer w-full">
          <div className="space-y-6 text-center">
            {/* Icon */}
            <div className={`
              relative w-20 h-20 mx-auto rounded-2xl
              transition-all duration-300
              ${isDragging 
                ? 'bg-primary-500/20 scale-110' 
                : 'bg-surface-700/50'
              }
              flex items-center justify-center
            `}>
              {isLoading ? (
                <div className="spinner-lg text-primary-400" />
              ) : (
                <>
                  <svg 
                    className={`w-10 h-10 transition-colors duration-200 ${
                      isDragging ? 'text-primary-400' : 'text-surface-400'
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                    />
                  </svg>
                  
                  {/* Animated glow when dragging */}
                  {isDragging && (
                    <div className="absolute inset-0 rounded-2xl bg-primary-500/20 animate-pulse" />
                  )}
                </>
              )}
            </div>
            
            {/* Text Content */}
            {isLoading ? (
              <div className="space-y-2">
                <p className="text-lg font-medium text-surface-200">Processing your PDF...</p>
                <p className="text-sm text-surface-400">This may take a moment</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-surface-200">
                    {isDragging ? 'Drop your PDF here' : 'Drop PDF here or click to upload'}
                  </p>
                  <p className="text-sm text-surface-500">
                    Maximum file size: 25MB
                  </p>
                </div>
                
                {/* Upload Button */}
                <div className="pt-2">
                  <span className={`
                    btn btn-md inline-flex
                    ${isDragging 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                    }
                  `}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose File
                  </span>
                </div>
              </>
            )}
          </div>
        </label>
        
        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-error-500/10 border border-error-500/20">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-error-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm text-error-300">{error}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Supported Formats */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-surface-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span>Your files stay on your device — nothing is uploaded to any server</span>
      </div>
    </div>
  );
}
