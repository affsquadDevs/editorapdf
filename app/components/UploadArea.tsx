'use client';

import { useCallback, useState } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { loadPdfDocument, getPdfPagesInfo } from '../lib/pdf/pdfRender';
import { extractTextFromPage } from '../lib/pdf/pdfExtract';
import type { PdfPage } from '../store/pdfStore';

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
            let textOverlays = [];
            
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
    <div className="w-full max-w-2xl mx-auto p-8">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center
          transition-colors cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${error ? 'border-red-300 bg-red-50' : ''}
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
        
        <label htmlFor="file-input" className="cursor-pointer">
          <div className="space-y-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            {isLoading ? (
              <div className="text-gray-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Loading PDF...
              </div>
            ) : (
              <>
                <div className="text-lg font-medium text-gray-700">
                  Drop PDF here or click to upload
                </div>
                <div className="text-sm text-gray-500">
                  Maximum file size: 25MB
                </div>
              </>
            )}
          </div>
        </label>
        
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 rounded p-3">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
