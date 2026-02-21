'use client';

import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { usePdfStore } from '../store/pdfStore';
import { loadPdfDocument } from '../lib/pdf/pdfRender';
import { extractTextFromPage } from '../lib/pdf/pdfExtract';

interface Props {
  pageId: string;
  pageWidth: number;
  pageHeight: number;
  zoom: number;
  rotation: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function EditableTextLayer({
  pageId,
  pageWidth,
  pageHeight,
  zoom,
  rotation,
  canvasRef,
}: Props) {
  const {
    originalFile,
    editableTextMode,
    pages,
    addTextOverlay,
    updateTextOverlay,
    deleteTextOverlay,
  } = usePdfStore();

  const layerRef = useRef<HTMLDivElement>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [extractedTexts, setExtractedTexts] = useState<Map<string, any>>(new Map());
  const [noTextFound, setNoTextFound] = useState(false);
  const [isRunningOcr, setIsRunningOcr] = useState(false);

  const page = pages.find((p) => p.id === pageId);
  const pageIndex = page?.index ?? 0;

  // Extract text from PDF when mode is enabled
  // Only extract once per page when mode is enabled
  useEffect(() => {
    if (!editableTextMode || !originalFile || !page) return;

    // Check if we already have original text overlays for this page
    const hasOriginalText = page.overlays.some((o) => o.isOriginal);
    if (hasOriginalText) {
      // Already extracted, skip
      return;
    }

    const extractText = async () => {
      setIsExtracting(true);
      try {
        const pdfDoc = await loadPdfDocument(originalFile);
        // Extract text from page
        const texts = await extractTextFromPage(pdfDoc, pageIndex + 1);

        // Check if no text was found
        if (texts.length === 0) {
          setNoTextFound(true);
        } else {
          setNoTextFound(false);
          // Store extracted texts
          const textMap = new Map<string, any>();
          texts.forEach((text) => {
            textMap.set(text.id, text);
          });
          setExtractedTexts(textMap);

          // Add to store as overlays if they don't exist
          texts.forEach((text) => {
            // Check if overlay already exists
            const existing = page.overlays.find((o) => o.id === text.id);
            if (!existing) {
              // Map fontName to fontFamily and set defaults
              const fontName = text.fontName || 'Helvetica';
              let fontFamily = fontName;
              // Extract base font name (remove -Bold, -Italic, etc.)
              if (fontName.includes('-')) {
                fontFamily = fontName.split('-')[0];
              }
              
              addTextOverlay(
                pageId,
                {
                  x: text.x,
                  y: text.y,
                  text: text.text,
                  fontSize: text.fontSize,
                  color: '#000000',
                  fontFamily: fontFamily,
                  fontWeight: fontName.toLowerCase().includes('bold') ? 'bold' : 'normal',
                  fontStyle: fontName.toLowerCase().includes('italic') || fontName.toLowerCase().includes('oblique') ? 'italic' : 'normal',
                  textAlign: 'left',
                  boxWidth: text.width, // Use extracted width from PDF
                  boxHeight: text.height, // Use extracted height from PDF
                  isOriginal: true,
                }
              );
            }
          });
        }
      } catch (err) {
        console.error('Error extracting text:', err);
      } finally {
        setIsExtracting(false);
      }
    };

    extractText();
  }, [editableTextMode, originalFile, pageId, pageIndex, page, addTextOverlay, zoom]);

  // Manual OCR trigger function with professional settings
  const runOCR = useCallback(async () => {
    if (!canvasRef.current || !page) return;

    setIsRunningOcr(true);
    setNoTextFound(false);
    try {
      const canvas = canvasRef.current;
      
      // Use Tesseract.js worker for better performance and control
      const { createWorker, PSM } = await import('tesseract.js');
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            // Progress updates can be shown here if needed
          }
        },
      });
      
      // Professional OCR settings for better recognition
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO, // Automatic page segmentation
        tessedit_char_whitelist: '', // Allow all characters
        preserve_interword_spaces: '1', // Preserve spaces between words
        tessedit_ocr_engine_mode: '1', // Use LSTM OCR engine (best quality)
      });
      
      const result = await worker.recognize(canvas);
      await worker.terminate();

      const ocrTexts: any[] = [];
      if (result.data.words) {
        result.data.words.forEach((word: any, index: number) => {
          if (word.text && word.text.trim()) {
            const bbox = word.bbox;
            const x = bbox.x0 / canvas.width;
            const y = bbox.y0 / canvas.height;
            const width = (bbox.x1 - bbox.x0) / canvas.width;
            const height = (bbox.y1 - bbox.y0) / canvas.height;

            ocrTexts.push({
              id: `ocr-${pageIndex}-${index}`,
              text: word.text,
              x,
              y,
              width,
              height,
              fontSize: height * canvas.height,
              fontName: 'Helvetica',
              transform: [height * canvas.height, 0, 0, height * canvas.height, bbox.x0, canvas.height - bbox.y0],
              color: '#000000',
              fontFamily: 'Helvetica',
              fontWeight: 'normal' as const,
              fontStyle: 'normal' as const,
            });
          }
        });
      }

      // Store OCR texts
      const textMap = new Map<string, any>();
      ocrTexts.forEach((text) => {
        textMap.set(text.id, text);
      });
      setExtractedTexts(textMap);

      // Add to store as overlays
      ocrTexts.forEach((text) => {
        // Check if overlay already exists
        const existing = page.overlays.find((o) => o.id === text.id);
        if (!existing) {
          addTextOverlay(
            pageId,
            {
              x: text.x,
              y: text.y,
              text: text.text,
              fontSize: text.fontSize,
              color: text.color || '#000000',
              fontFamily: text.fontFamily || 'Helvetica',
              fontWeight: text.fontWeight || 'normal',
              fontStyle: text.fontStyle || 'normal',
              textAlign: 'left',
              boxWidth: text.width,
              boxHeight: text.height,
              isOriginal: true,
            }
          );
        }
      });
    } catch (ocrError) {
      console.error('OCR error:', ocrError);
      setNoTextFound(true);
    } finally {
      setIsRunningOcr(false);
    }
  }, [canvasRef, page, pageIndex, pageId, addTextOverlay]);

  // Helper function to get font fallback chain
  const getFontFallback = useCallback((fontFamily: string): string => {
    const family = fontFamily?.toLowerCase() || '';
    if (family.includes('times')) return 'Times New Roman, serif';
    if (family.includes('courier')) return 'Courier New, monospace';
    if (family.includes('arial') || family.includes('helvetica')) return 'Arial, Helvetica, sans-serif';
    if (family.includes('georgia')) return 'Georgia, serif';
    if (family.includes('verdana')) return 'Verdana, sans-serif';
    if (family.includes('comic')) return 'Comic Sans MS, cursive';
    if (family.includes('trebuchet')) return 'Trebuchet MS, sans-serif';
    if (family.includes('calibri')) return 'Calibri, sans-serif';
    return 'Arial, Helvetica, sans-serif';
  }, []);

  // Get original text overlays for this page
  const originalTextOverlays = useMemo(() => {
    return page?.overlays.filter((o) => o.isOriginal) || [];
  }, [page?.overlays]);

  // Handle text div click to edit
  const handleTextClick = useCallback((e: React.MouseEvent, overlayId: string) => {
    e.stopPropagation();
    setEditingId(overlayId);
  }, []);

  // Handle text change
  const handleTextChange = useCallback((overlayId: string, newText: string) => {
    updateTextOverlay(overlayId, { text: newText });
  }, [updateTextOverlay]);

  // Handle text blur (exit edit mode)
  const handleTextBlur = useCallback((overlayId: string) => {
    setEditingId(null);
    const overlay = page?.overlays.find((o) => o.id === overlayId);
    if (overlay && !overlay.text.trim()) {
      // Delete empty text overlays
      deleteTextOverlay(overlayId);
    }
  }, [page?.overlays, deleteTextOverlay]);

  // Handle key down (ESC to exit, Delete/Backspace to remove)
  const handleKeyDown = useCallback((e: React.KeyboardEvent, overlayId: string) => {
    if (e.key === 'Escape') {
      setEditingId(null);
      (e.currentTarget as HTMLElement).blur();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      const overlay = page?.overlays.find((o) => o.id === overlayId);
      if (overlay && (!overlay.text || overlay.text.length <= 1)) {
        e.preventDefault();
        deleteTextOverlay(overlayId);
        setEditingId(null);
      }
    }
  }, [page?.overlays, deleteTextOverlay]);

  if (!editableTextMode || !page) return null;

  // Canvas dimensions match the scaled viewport
  const canvas = canvasRef.current;
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  return (
    <div
      ref={layerRef}
      className="absolute left-0 top-0 pointer-events-none"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
        zIndex: 5, // Ensure EditableTextLayer is above canvas but below AdvancedOverlayLayer when needed
      }}
    >
      {isExtracting && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-900/50 backdrop-blur-sm z-10">
          <div className="text-sm text-surface-300">Extracting text...</div>
        </div>
      )}

      {noTextFound && !isExtracting && !isRunningOcr && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-900/50 backdrop-blur-sm z-10">
          <div className="bg-surface-800 rounded-lg p-6 max-w-md mx-4 text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-surface-100 mb-2">No text found</h3>
            <p className="text-sm text-surface-400 mb-4">
              This PDF page doesn't contain extractable text. You can use OCR to recognize text from the image.
            </p>
            <button
              onClick={runOCR}
              className="btn-md btn-primary"
            >
              Run OCR
            </button>
          </div>
        </div>
      )}

      {isRunningOcr && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-900/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="spinner-lg text-primary-400 mx-auto mb-3" />
            <div className="text-sm text-surface-300">Running OCR...</div>
          </div>
        </div>
      )}

      {originalTextOverlays.map((overlay) => {
        const isEditing = editingId === overlay.id;
        
        // Positions are normalized (0-1) based on viewport at zoom scale
        // overlay.x: 0 = left, 1 = right (normalized)
        // overlay.y: 0 = top, 1 = bottom (normalized, baseline position)
        const x = overlay.x * canvasWidth;
        
        // overlay.y is the baseline position from top (0 = top, 1 = bottom)
        // Convert baseline to pixel coordinates
        const baselineY = overlay.y * canvasHeight;
        
        // Font size is already in the correct scale (extracted with zoom scale)
        const fontSize = overlay.fontSize;
        
        // Calculate top position from baseline
        // In PDF, overlay.y is the baseline position (0 = top, 1 = bottom)
        // In HTML/CSS, we position from the top of the element
        // The baseline is typically at about 75-85% of font height from the top
        // For most standard fonts, baseline is at ~0.8 * fontSize from top
        // So: top = baselineY - (fontSize * baselineRatio)
        // We use 0.8 as standard baseline ratio for most fonts
        const baselineRatio = 0.8; // Baseline is at 80% of font height from top
        const top = baselineY - (fontSize * baselineRatio);
        
        // Calculate width from overlay.boxWidth (normalized 0-1) or use text width
        // boxWidth is the width of the text as extracted from PDF
        const textWidth = overlay.boxWidth 
          ? overlay.boxWidth * canvasWidth 
          : undefined; // If no width specified, let text determine width naturally
        
        // Calculate height from overlay.boxHeight (normalized 0-1) or use fontSize
        const textHeight = overlay.boxHeight 
          ? overlay.boxHeight * canvasHeight 
          : fontSize;

        return (
          <div
            key={overlay.id}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling to parent layers
              handleTextClick(e, overlay.id);
            }}
            onBlur={() => handleTextBlur(overlay.id)}
            onKeyDown={(e) => handleKeyDown(e, overlay.id)}
            onInput={(e) => {
              const newText = e.currentTarget.textContent || '';
              handleTextChange(overlay.id, newText);
            }}
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent other layers from handling the event
            }}
            className={`
              absolute pointer-events-auto
              transition-all duration-150
              ${isEditing 
                ? 'outline outline-2 outline-primary-500 outline-offset-1 bg-primary-500/10 rounded px-1' 
                : 'hover:outline hover:outline-1 hover:outline-primary-400/50 hover:outline-offset-0 rounded cursor-text'
              }
            `}
            style={{
              zIndex: isEditing ? 10 : 6, // Higher z-index when editing
              left: `${x}px`,
              top: `${top}px`,
              fontSize: `${fontSize}px`,
              // Use extracted width from PDF if available
              width: textWidth !== undefined ? `${textWidth}px` : 'auto',
              // Use extracted height from PDF if available
              height: textHeight !== undefined ? `${textHeight}px` : 'auto',
              // Ensure font family is applied - use fallback chain
              fontFamily: overlay.fontFamily 
                ? `${overlay.fontFamily}, ${getFontFallback(overlay.fontFamily)}`
                : 'Helvetica, Arial, sans-serif',
              fontWeight: overlay.fontWeight || 'normal',
              fontStyle: overlay.fontStyle || 'normal',
              color: overlay.color || '#000000',
              textAlign: overlay.textAlign || 'left',
              transformOrigin: 'left bottom',
              whiteSpace: 'pre', // Preserve whitespace and line breaks
              minWidth: '2px', // Minimum width for empty text
              minHeight: `${fontSize}px`, // Minimum height
              overflow: 'hidden', // Prevent text from overflowing the box
            }}
          >
            {overlay.text}
          </div>
        );
      })}
    </div>
  );
}
