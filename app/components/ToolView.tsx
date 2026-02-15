'use client';

import { useState, useCallback, useRef } from 'react';
import type { PdfTool } from './ToolsPanel';
import {
  ArrowLeft, CheckCircle, Upload, X, FileText, Plus,
  CircleCheck, GripVertical, Zap
} from 'lucide-react';
import { mergePdf, downloadMergedPdf } from '../lib/pdf/mergePdf';
import { splitPdf, parsePageRange, downloadSplitPdfs } from '../lib/pdf/splitPdf';
import { deletePages, downloadPdf as downloadDeletePdf } from '../lib/pdf/deletePages';
import { extractPages, downloadPdf as downloadExtractPdf } from '../lib/pdf/extractPages';
import { loadPdfDocument, getPdfPagesInfo } from '../lib/pdf/pdfRender';
import { exportPdf } from '../lib/pdf/exportPdf';
import { usePdfStore } from '../store/pdfStore';
import PageRangeSelector from './PageRangeSelector';
import PageSelector from './PageSelector';
import PageReorder from './PageReorder';

interface ToolViewProps {
  tool: PdfTool;
  onBack: () => void;
}

// Tool-specific configurations
const toolConfigs: Record<string, {
  acceptMultiple: boolean;
  acceptTypes?: string;
  uploadLabel: string;
  uploadDescription: string;
  actionLabel: string;
  resultLabel: string;
  steps: string[];
}> = {
  // ── Organize & Pages ──
  merge:             { acceptMultiple: true,  uploadLabel: 'Drop PDF files here to merge',           uploadDescription: 'You can upload multiple PDF files at once',              actionLabel: 'Merge PDFs',            resultLabel: 'Merged PDF',        steps: ['Upload 2 or more PDF files', 'Drag to reorder if needed', 'Click "Merge PDFs" to combine'] },
  split:             { acceptMultiple: false, uploadLabel: 'Drop a PDF file to split',               uploadDescription: 'Upload the PDF you want to split into parts',           actionLabel: 'Split PDF',             resultLabel: 'Split Files',       steps: ['Upload a PDF file', 'Select pages or page ranges', 'Click "Split PDF" to create separate files'] },
  'delete-pages':    { acceptMultiple: false, uploadLabel: 'Drop a PDF file to remove pages',        uploadDescription: 'Upload the PDF from which you want to delete pages',    actionLabel: 'Delete Selected Pages', resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Select pages to delete', 'Click "Delete Selected Pages" to apply'] },
  'extract-pages':   { acceptMultiple: false, uploadLabel: 'Drop a PDF file to extract pages',       uploadDescription: 'Upload the PDF from which you want to extract pages',   actionLabel: 'Extract Pages',         resultLabel: 'Extracted PDF',     steps: ['Upload a PDF file', 'Select pages to extract', 'Click "Extract Pages" to create a new PDF'] },
  reorder:           { acceptMultiple: false, uploadLabel: 'Drop a PDF file to reorder pages',       uploadDescription: 'Upload the PDF you want to rearrange',                  actionLabel: 'Save New Order',        resultLabel: 'Reordered PDF',     steps: ['Upload a PDF file', 'Drag & drop pages to reorder', 'Click "Save New Order" to apply'] },
  rotate:            { acceptMultiple: false, uploadLabel: 'Drop a PDF file to rotate pages',        uploadDescription: 'Upload the PDF with pages you want to rotate',          actionLabel: 'Rotate & Save',         resultLabel: 'Rotated PDF',       steps: ['Upload a PDF file', 'Select rotation angle per page', 'Click "Rotate & Save" to apply'] },
  'insert-blank':    { acceptMultiple: false, uploadLabel: 'Drop a PDF to insert blank pages',       uploadDescription: 'Upload the PDF where you want to add empty pages',      actionLabel: 'Insert Blank Pages',    resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Choose positions for blank pages', 'Click "Insert Blank Pages" to apply'] },
  'duplicate-pages': { acceptMultiple: false, uploadLabel: 'Drop a PDF to duplicate pages',          uploadDescription: 'Upload the PDF with pages you want to duplicate',       actionLabel: 'Duplicate Pages',       resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Select pages to duplicate', 'Click "Duplicate Pages" to apply'] },
  'reverse-order':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to reverse page order',       uploadDescription: 'Upload the PDF to flip the page order',                 actionLabel: 'Reverse Order',         resultLabel: 'Reversed PDF',      steps: ['Upload a PDF file', 'Preview the reversed order', 'Click "Reverse Order" to apply'] },
  'split-by-size':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to split by size',            uploadDescription: 'Upload the PDF to split into size-limited parts',       actionLabel: 'Split by Size',         resultLabel: 'Split Files',       steps: ['Upload a PDF file', 'Set max file size per part', 'Click "Split by Size" to split'] },
  'split-by-bookmarks': { acceptMultiple: false, uploadLabel: 'Drop a PDF to split by bookmarks',   uploadDescription: 'Upload a PDF with bookmarks/chapters to split',         actionLabel: 'Split by Bookmarks',    resultLabel: 'Split Files',       steps: ['Upload a PDF with bookmarks', 'Choose bookmark level to split at', 'Click "Split by Bookmarks"'] },

  // ── Security & Protection ──
  encrypt:           { acceptMultiple: false, uploadLabel: 'Drop a PDF file to encrypt',             uploadDescription: 'Upload the PDF you want to protect with a password',    actionLabel: 'Encrypt PDF',           resultLabel: 'Encrypted PDF',     steps: ['Upload a PDF file', 'Set owner and user passwords', 'Choose encryption level & click "Encrypt PDF"'] },
  unlock:            { acceptMultiple: false, uploadLabel: 'Drop a password-protected PDF',          uploadDescription: 'Upload the PDF you want to unlock',                     actionLabel: 'Unlock PDF',            resultLabel: 'Unlocked PDF',      steps: ['Upload a protected PDF file', 'Enter the current password', 'Click "Unlock PDF" to remove protection'] },
  sign:              { acceptMultiple: false, uploadLabel: 'Drop a PDF file to sign',                uploadDescription: 'Upload the PDF you want to add a digital signature to', actionLabel: 'Apply Signature',       resultLabel: 'Signed PDF',        steps: ['Upload a PDF file', 'Draw, type, or upload your signature', 'Place the signature and click "Apply Signature"'] },
  redact:            { acceptMultiple: false, uploadLabel: 'Drop a PDF file to redact',              uploadDescription: 'Upload the PDF with sensitive content to black out',     actionLabel: 'Apply Redaction',       resultLabel: 'Redacted PDF',      steps: ['Upload a PDF file', 'Select areas or text to redact', 'Click "Apply Redaction" — this is permanent'] },
  permissions:       { acceptMultiple: false, uploadLabel: 'Drop a PDF file to set permissions',     uploadDescription: 'Upload the PDF you want to restrict',                   actionLabel: 'Apply Permissions',     resultLabel: 'Restricted PDF',    steps: ['Upload a PDF file', 'Choose what to restrict (print, copy, edit)', 'Click "Apply Permissions" to save'] },
  'remove-hidden-data': { acceptMultiple: false, uploadLabel: 'Drop a PDF to sanitize',             uploadDescription: 'Upload the PDF to remove all hidden data',              actionLabel: 'Sanitize PDF',          resultLabel: 'Sanitized PDF',     steps: ['Upload a PDF file', 'Review hidden data found', 'Click "Sanitize PDF" to remove all hidden content'] },
  certificate:       { acceptMultiple: false, uploadLabel: 'Drop a PDF to certificate-sign',         uploadDescription: 'Upload the PDF and your .pfx/.p12 certificate',         actionLabel: 'Sign with Certificate', resultLabel: 'Certificate-Signed PDF', steps: ['Upload a PDF file', 'Upload your digital certificate (.pfx/.p12)', 'Click "Sign with Certificate"'] },

  // ── Convert ──
  'pdf-to-images':   { acceptMultiple: false, uploadLabel: 'Drop a PDF file to convert',             uploadDescription: 'Upload the PDF you want to convert to images',          actionLabel: 'Convert to Images',     resultLabel: 'Image Files',       steps: ['Upload a PDF file', 'Choose image format & quality', 'Click "Convert to Images" to download'] },
  'images-to-pdf':   { acceptMultiple: true,  acceptTypes: '.png,.jpg,.jpeg,.webp,.gif,.bmp,image/*', uploadLabel: 'Drop image files here', uploadDescription: 'Upload PNG, JPEG, WebP images to combine into PDF', actionLabel: 'Create PDF', resultLabel: 'Combined PDF', steps: ['Upload image files', 'Drag to reorder if needed', 'Click "Create PDF" to combine'] },
  'pdf-to-word':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to Word',          uploadDescription: 'Upload the PDF you want to convert to DOCX',            actionLabel: 'Convert to Word',       resultLabel: 'Word Document',     steps: ['Upload a PDF file', 'Choose formatting options', 'Click "Convert to Word" to download .docx'] },
  'pdf-to-excel':    { acceptMultiple: false, uploadLabel: 'Drop a PDF with tables',                 uploadDescription: 'Upload the PDF with tables to extract to Excel',        actionLabel: 'Convert to Excel',      resultLabel: 'Excel Spreadsheet', steps: ['Upload a PDF with tables', 'Select pages with tables', 'Click "Convert to Excel" to download .xlsx'] },
  'pdf-to-text':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to extract text',             uploadDescription: 'Upload the PDF to extract all text content',            actionLabel: 'Extract Text',          resultLabel: 'Text File',         steps: ['Upload a PDF file', 'Choose pages to extract from', 'Click "Extract Text" to download .txt'] },
  'pdf-to-csv':      { acceptMultiple: false, uploadLabel: 'Drop a PDF with tables',                 uploadDescription: 'Upload the PDF to extract tables as CSV',               actionLabel: 'Extract to CSV',        resultLabel: 'CSV Files',         steps: ['Upload a PDF with tables', 'Select tables to extract', 'Click "Extract to CSV" to download'] },
  'pdf-to-html':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to HTML',          uploadDescription: 'Upload the PDF to convert into a web page',             actionLabel: 'Convert to HTML',       resultLabel: 'HTML File',         steps: ['Upload a PDF file', 'Choose conversion options', 'Click "Convert to HTML" to download'] },
  'pdf-to-markdown': { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to Markdown',      uploadDescription: 'Upload the PDF to extract content as Markdown',         actionLabel: 'Convert to Markdown',   resultLabel: 'Markdown File',     steps: ['Upload a PDF file', 'Preview extracted content', 'Click "Convert to Markdown" to download .md'] },
  'pdf-to-pptx':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to PowerPoint',    uploadDescription: 'Upload the PDF to convert to presentation slides',      actionLabel: 'Convert to PowerPoint', resultLabel: 'PowerPoint File',   steps: ['Upload a PDF file', 'Choose slide options', 'Click "Convert to PowerPoint" to download .pptx'] },
  'html-to-pdf':     { acceptMultiple: false, acceptTypes: '.html,.htm,text/html', uploadLabel: 'Drop an HTML file', uploadDescription: 'Upload HTML file to convert to PDF', actionLabel: 'Convert to PDF', resultLabel: 'PDF Document', steps: ['Upload HTML file or enter a URL', 'Configure page size & margins', 'Click "Convert to PDF" to download'] },
  'word-to-pdf':     { acceptMultiple: false, acceptTypes: '.doc,.docx', uploadLabel: 'Drop a Word document', uploadDescription: 'Upload .doc or .docx file to convert to PDF', actionLabel: 'Convert to PDF', resultLabel: 'PDF Document', steps: ['Upload a Word document', 'Preview conversion settings', 'Click "Convert to PDF" to download'] },
  'excel-to-pdf':    { acceptMultiple: false, acceptTypes: '.xls,.xlsx', uploadLabel: 'Drop an Excel file', uploadDescription: 'Upload .xls or .xlsx file to convert to PDF', actionLabel: 'Convert to PDF', resultLabel: 'PDF Document', steps: ['Upload an Excel spreadsheet', 'Choose sheets to include', 'Click "Convert to PDF" to download'] },

  // ── Edit & Enhance ──
  compress:          { acceptMultiple: false, uploadLabel: 'Drop a PDF file to compress',            uploadDescription: 'Upload the PDF you want to reduce in size',             actionLabel: 'Compress PDF',          resultLabel: 'Compressed PDF',    steps: ['Upload a PDF file', 'Choose compression level', 'Click "Compress PDF" to reduce size'] },
  'add-watermark':   { acceptMultiple: false, uploadLabel: 'Drop a PDF file to watermark',           uploadDescription: 'Upload the PDF you want to add a watermark to',         actionLabel: 'Add Watermark',         resultLabel: 'Watermarked PDF',   steps: ['Upload a PDF file', 'Configure watermark text or image', 'Click "Add Watermark" to apply'] },
  'page-numbers':    { acceptMultiple: false, uploadLabel: 'Drop a PDF to add page numbers',         uploadDescription: 'Upload the PDF you want to number',                     actionLabel: 'Add Page Numbers',      resultLabel: 'Numbered PDF',      steps: ['Upload a PDF file', 'Choose position, style, and starting number', 'Click "Add Page Numbers" to apply'] },
  'header-footer':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to add headers/footers',      uploadDescription: 'Upload the PDF to add custom header and footer',        actionLabel: 'Apply Header & Footer', resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Enter header and footer text', 'Click "Apply Header & Footer" to save'] },
  'add-background':  { acceptMultiple: false, uploadLabel: 'Drop a PDF to add a background',         uploadDescription: 'Upload the PDF to add a color or image background',     actionLabel: 'Apply Background',      resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Choose background color or image', 'Click "Apply Background" to apply'] },
  crop:              { acceptMultiple: false, uploadLabel: 'Drop a PDF file to crop',                uploadDescription: 'Upload the PDF with pages to crop or trim',             actionLabel: 'Crop Pages',            resultLabel: 'Cropped PDF',       steps: ['Upload a PDF file', 'Set crop margins or draw crop area', 'Click "Crop Pages" to apply'] },
  resize:            { acceptMultiple: false, uploadLabel: 'Drop a PDF file to resize',              uploadDescription: 'Upload the PDF to change page dimensions',              actionLabel: 'Resize Pages',          resultLabel: 'Resized PDF',       steps: ['Upload a PDF file', 'Choose target page size (A4, Letter, custom)', 'Click "Resize Pages" to apply'] },
  grayscale:         { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to grayscale',     uploadDescription: 'Upload the PDF to convert to black & white',            actionLabel: 'Convert to Grayscale',  resultLabel: 'Grayscale PDF',     steps: ['Upload a PDF file', 'Preview grayscale conversion', 'Click "Convert to Grayscale" to apply'] },
  'invert-colors':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to invert colors',            uploadDescription: 'Upload the PDF to invert colors (dark mode)',           actionLabel: 'Invert Colors',         resultLabel: 'Inverted PDF',      steps: ['Upload a PDF file', 'Preview inverted output', 'Click "Invert Colors" to apply'] },
  flatten:           { acceptMultiple: false, uploadLabel: 'Drop a PDF file to flatten',             uploadDescription: 'Upload a PDF with forms or annotations to flatten',     actionLabel: 'Flatten PDF',           resultLabel: 'Flattened PDF',     steps: ['Upload a PDF file', 'Choose what to flatten (forms, annotations, or both)', 'Click "Flatten PDF" to apply'] },
  'remove-annotations': { acceptMultiple: false, uploadLabel: 'Drop a PDF to remove annotations',   uploadDescription: 'Upload the PDF to strip all comments and highlights',   actionLabel: 'Remove Annotations',    resultLabel: 'Clean PDF',         steps: ['Upload a PDF file', 'Review annotations to remove', 'Click "Remove Annotations" to apply'] },

  // ── Content & Media ──
  'extract-images':  { acceptMultiple: false, uploadLabel: 'Drop a PDF to extract images',           uploadDescription: 'Upload the PDF to pull out all embedded images',        actionLabel: 'Extract Images',        resultLabel: 'Image Files',       steps: ['Upload a PDF file', 'Choose image format (PNG/JPEG)', 'Click "Extract Images" to download all'] },
  'remove-images':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to remove images',            uploadDescription: 'Upload the PDF to strip all images (keep text)',        actionLabel: 'Remove Images',         resultLabel: 'Text-Only PDF',     steps: ['Upload a PDF file', 'Preview text-only result', 'Click "Remove Images" to apply'] },
  'optimize-images': { acceptMultiple: false, uploadLabel: 'Drop a PDF to optimize images',          uploadDescription: 'Upload the PDF to downscale/optimize embedded images',  actionLabel: 'Optimize Images',       resultLabel: 'Optimized PDF',     steps: ['Upload a PDF file', 'Choose quality/resolution target', 'Click "Optimize Images" to apply'] },
  'add-qr-code':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to add a QR code',            uploadDescription: 'Upload the PDF to insert QR codes on pages',            actionLabel: 'Add QR Code',           resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Enter QR content (URL, text) & position', 'Click "Add QR Code" to apply'] },
  'add-barcode':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to add a barcode',            uploadDescription: 'Upload the PDF to insert barcodes on pages',            actionLabel: 'Add Barcode',           resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Enter barcode data & choose type', 'Click "Add Barcode" to apply'] },
  'add-bookmarks':   { acceptMultiple: false, uploadLabel: 'Drop a PDF to add bookmarks',            uploadDescription: 'Upload the PDF to create or edit bookmarks',            actionLabel: 'Save Bookmarks',        resultLabel: 'Bookmarked PDF',    steps: ['Upload a PDF file', 'Add/edit bookmark entries', 'Click "Save Bookmarks" to apply'] },
  'add-hyperlinks':  { acceptMultiple: false, uploadLabel: 'Drop a PDF to add hyperlinks',           uploadDescription: 'Upload the PDF to add clickable links',                 actionLabel: 'Apply Links',           resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Add link areas with URLs', 'Click "Apply Links" to save'] },
  'add-attachments': { acceptMultiple: false, uploadLabel: 'Drop a PDF to embed attachments',        uploadDescription: 'Upload the PDF to embed files inside it',               actionLabel: 'Embed Files',           resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Add files to embed', 'Click "Embed Files" to save'] },

  // ── Forms & Signing ──
  'fill-sign':       { acceptMultiple: false, uploadLabel: 'Drop a PDF form to fill & sign',         uploadDescription: 'Upload the PDF form you want to fill out',              actionLabel: 'Save Filled PDF',       resultLabel: 'Filled PDF',        steps: ['Upload a PDF form', 'Fill in fields and add your signature', 'Click "Save Filled PDF" to download'] },
  stamp:             { acceptMultiple: false, uploadLabel: 'Drop a PDF file to stamp',               uploadDescription: 'Upload the PDF to add a stamp',                        actionLabel: 'Apply Stamp',           resultLabel: 'Stamped PDF',       steps: ['Upload a PDF file', 'Choose stamp type, text, and placement', 'Click "Apply Stamp" to save'] },
  'bates-numbering': { acceptMultiple: false, uploadLabel: 'Drop a PDF for Bates numbering',         uploadDescription: 'Upload the PDF to add sequential Bates numbers',        actionLabel: 'Apply Bates Numbers',   resultLabel: 'Numbered PDF',      steps: ['Upload a PDF file', 'Set prefix, starting number, and position', 'Click "Apply Bates Numbers"'] },
  'create-form':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to add form fields',          uploadDescription: 'Upload the PDF to add interactive form fields',          actionLabel: 'Save Form PDF',         resultLabel: 'Form PDF',          steps: ['Upload a PDF file', 'Add text fields, checkboxes, dropdowns', 'Click "Save Form PDF" to download'] },

  // ── OCR & Text ──
  ocr:               { acceptMultiple: false, uploadLabel: 'Drop a scanned PDF or image',            uploadDescription: 'Upload a scanned document to extract text via OCR',     actionLabel: 'Run OCR',               resultLabel: 'Recognized PDF',    steps: ['Upload a scanned PDF or image', 'Select language for recognition', 'Click "Run OCR" to extract text'] },
  'searchable-pdf':  { acceptMultiple: false, uploadLabel: 'Drop a scanned PDF',                     uploadDescription: 'Upload a scanned PDF to add searchable text layer',     actionLabel: 'Make Searchable',       resultLabel: 'Searchable PDF',    steps: ['Upload a scanned PDF', 'Select recognition language', 'Click "Make Searchable" to add text layer'] },

  // ── Analyze & Optimize ──
  compare:           { acceptMultiple: true,  uploadLabel: 'Drop two PDF files to compare',          uploadDescription: 'Upload two PDF files to highlight differences',         actionLabel: 'Compare PDFs',          resultLabel: 'Comparison Report', steps: ['Upload exactly 2 PDF files', 'Review comparison settings', 'Click "Compare PDFs" to see differences'] },
  repair:            { acceptMultiple: false, uploadLabel: 'Drop a corrupted PDF file',              uploadDescription: 'Upload the PDF that is damaged or won\'t open',         actionLabel: 'Repair PDF',            resultLabel: 'Repaired PDF',      steps: ['Upload the corrupted PDF file', 'Wait for automatic analysis', 'Click "Repair PDF" to attempt recovery'] },
  metadata:          { acceptMultiple: false, uploadLabel: 'Drop a PDF to edit metadata',            uploadDescription: 'Upload the PDF to view or modify document properties',  actionLabel: 'Save Metadata',         resultLabel: 'Updated PDF',       steps: ['Upload a PDF file', 'Edit title, author, subject, keywords', 'Click "Save Metadata" to apply changes'] },
  'pdf-statistics':  { acceptMultiple: false, uploadLabel: 'Drop a PDF to analyze',                  uploadDescription: 'Upload the PDF to see detailed stats',                  actionLabel: 'Analyze PDF',           resultLabel: 'Analysis Report',   steps: ['Upload a PDF file', 'Wait for automatic analysis', 'View page count, word count, fonts, images, file size breakdown'] },
  linearize:         { acceptMultiple: false, uploadLabel: 'Drop a PDF to linearize',                uploadDescription: 'Upload the PDF to optimize for fast web viewing',       actionLabel: 'Linearize PDF',         resultLabel: 'Linearized PDF',    steps: ['Upload a PDF file', 'Preview optimization', 'Click "Linearize PDF" to apply'] },
  'color-space':     { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert colors',           uploadDescription: 'Upload the PDF to convert between RGB and CMYK',        actionLabel: 'Convert Colors',        resultLabel: 'Converted PDF',     steps: ['Upload a PDF file', 'Choose target color space (RGB or CMYK)', 'Click "Convert Colors" to apply'] },
  accessibility:     { acceptMultiple: false, uploadLabel: 'Drop a PDF for accessibility check',     uploadDescription: 'Upload the PDF to check WCAG/508 compliance',           actionLabel: 'Check Accessibility',   resultLabel: 'Accessibility Report', steps: ['Upload a PDF file', 'Run automated checks', 'Review accessibility issues and recommendations'] },
  pdfa:              { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to PDF/A',         uploadDescription: 'Upload the PDF to convert to archival format',          actionLabel: 'Convert to PDF/A',      resultLabel: 'PDF/A Document',    steps: ['Upload a PDF file', 'Choose PDF/A conformance level', 'Click "Convert to PDF/A" to save'] },
  pdfx:              { acceptMultiple: false, uploadLabel: 'Drop a PDF to convert to PDF/X',         uploadDescription: 'Upload the PDF for print-ready output',                 actionLabel: 'Convert to PDF/X',      resultLabel: 'PDF/X Document',    steps: ['Upload a PDF file', 'Choose PDF/X profile', 'Click "Convert to PDF/X" to save'] },
  validate:          { acceptMultiple: false, uploadLabel: 'Drop a PDF to validate',                 uploadDescription: 'Upload the PDF to check structure and compliance',       actionLabel: 'Validate PDF',          resultLabel: 'Validation Report', steps: ['Upload a PDF file', 'Choose validation profile', 'Click "Validate PDF" to check compliance'] },
};

export default function ToolView({ tool, onBack }: ToolViewProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mergedPdfBytes, setMergedPdfBytes] = useState<Uint8Array | null>(null);
  const [splitPdfResults, setSplitPdfResults] = useState<Array<{ bytes: Uint8Array; filename: string }> | null>(null);
  const [processedPdfBytes, setProcessedPdfBytes] = useState<Uint8Array | null>(null);
  const [pageRange, setPageRange] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [pageRangeWarning, setPageRangeWarning] = useState<string | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]); // For reorder: array of original indices in new order
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setOriginalFile, setPages, setSelectedPageId, pages: storePages, originalFile: storeOriginalFile } = usePdfStore();

  const config = toolConfigs[tool.id] || toolConfigs.merge;

  const handleFiles = useCallback(async (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles);
    if (validFiles.length === 0) return;

    if (config.acceptMultiple) {
      setFiles(prev => [...prev, ...validFiles]);
    } else {
      setFiles([validFiles[0]]);
      
      // Load total pages for tools that need it
      if ((tool.id === 'split' || tool.id === 'extract-pages' || tool.id === 'delete-pages') 
          && validFiles[0].type === 'application/pdf') {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const arrayBuffer = await validFiles[0].arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const total = pdf.getPageCount();
          setTotalPages(total);
        } catch (err) {
          console.error('Error loading PDF:', err);
        }
      }
      
      // Load total pages for reorder tool
      if (tool.id === 'reorder' && validFiles[0].type === 'application/pdf') {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const arrayBuffer = await validFiles[0].arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const total = pdf.getPageCount();
          setTotalPages(total);
          // Initialize order as 1, 2, 3, ...
          setPageOrder(Array.from({ length: total }, (_, i) => i));
        } catch (err) {
          console.error('Error loading PDF:', err);
        }
      }
    }
  }, [config.acceptMultiple, tool.id]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if ((tool.id === 'split' || tool.id === 'extract-pages' || tool.id === 'delete-pages' || tool.id === 'reorder') && index === 0) {
      setTotalPages(null);
      setPageRangeWarning(null);
      setPageRange('');
      setPageOrder([]);
    }
  };

  // Validate page range in real-time for split tool (with debounce)
  const validatePageRange = useCallback(async (range: string) => {
    if (tool.id !== 'split' || !range.trim() || files.length === 0) {
      setPageRangeWarning(null);
      return;
    }

    try {
      // Load PDF to get total pages (only once)
      if (!totalPages) {
        const { PDFDocument } = await import('pdf-lib');
        const file = files[0];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const total = pdf.getPageCount();
        setTotalPages(total);
      }

      if (!totalPages) return;

      // Parse and validate
      const rangeParts = range.split(',').map(p => p.trim()).filter(p => p.length > 0);
      const allSelectedPages = new Set<number>();

      for (const part of rangeParts) {
        try {
          const pageIndices = parsePageRange(part, totalPages);
          pageIndices.forEach(idx => allSelectedPages.add(idx));
        } catch (err) {
          // Ignore parsing errors during typing
        }
      }

      // Check if all pages are selected
      if (allSelectedPages.size === totalPages) {
        setPageRangeWarning(`⚠️ You selected all ${totalPages} pages. Split requires selecting only some pages to create separate files. Please specify fewer pages.`);
      } else if (allSelectedPages.size > totalPages * 0.9) {
        setPageRangeWarning(`⚠️ You selected ${allSelectedPages.size} out of ${totalPages} pages. Consider selecting fewer pages for a meaningful split.`);
      } else {
        setPageRangeWarning(null);
      }
    } catch (err) {
      // Ignore parsing errors during typing
      setPageRangeWarning(null);
    }
  }, [tool.id, files, totalPages]);

  const handlePageRangeChange = (value: string) => {
    setPageRange(value);
    if (tool.id === 'split') {
      // Clear previous timeout
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
      // Debounce validation
      validationTimeoutRef.current = setTimeout(() => {
        validatePageRange(value);
      }, 500);
    }
  };

  const handleProcess = async () => {
    if (tool.id === 'merge') {
      // Real merge PDF implementation
      if (files.length < 2) {
        setError('Please add at least 2 PDF files to merge');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const mergedBytes = await mergePdf(files);
        console.log('Merge successful, bytes:', mergedBytes.length);
        setMergedPdfBytes(mergedBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error merging PDFs:', err);
        setError(err instanceof Error ? err.message : 'Failed to merge PDF files. Please try again.');
        setIsComplete(false);
        setMergedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'split') {
      // Real split PDF implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to split');
        return;
      }

      if (!pageRange.trim()) {
        setError('Please enter page ranges (e.g., "1-3, 5, 8-10")');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        
        // Load PDF to get total pages
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const totalPages = pdf.getPageCount();

        // Parse page ranges - split by commas to get separate ranges
        const rangeParts = pageRange.split(',').map(p => p.trim()).filter(p => p.length > 0);
        const ranges: number[][] = [];
        const allSelectedPages = new Set<number>();

        for (const part of rangeParts) {
          const pageIndices = parsePageRange(part, totalPages);
          if (pageIndices.length > 0) {
            ranges.push(pageIndices);
            pageIndices.forEach(idx => allSelectedPages.add(idx));
          }
        }
        
        if (ranges.length === 0) {
          throw new Error('No valid pages found in the specified range');
        }

        // Validation: Check if user selected all pages (which would just be the same file)
        if (allSelectedPages.size === totalPages && ranges.length === 1) {
          throw new Error(`You selected all ${totalPages} pages. To split a PDF, you need to select only some pages, not all of them. For example, use "1-5" to split pages 1-5 into one file, and the rest will remain.`);
        }

        // Validation: Check if only one range that covers all pages
        if (ranges.length === 1 && ranges[0].length === totalPages) {
          throw new Error(`You selected all ${totalPages} pages in one range. To split a PDF, specify multiple ranges separated by commas. For example: "1-3, 5-7" will create 2 separate files.`);
        }

        // Split PDF
        const splitResults = await splitPdf(file, ranges);

        // Generate filenames
        const baseName = file.name.replace(/\.pdf$/i, '');
        const results = splitResults.map((bytes, index) => {
          const range = ranges[index];
          const startPage = range[0] + 1;
          const endPage = range[range.length - 1] + 1;
          const filename = range.length === 1
            ? `${baseName}_page_${startPage}.pdf`
            : `${baseName}_pages_${startPage}-${endPage}.pdf`;
          
          return { bytes, filename };
        });

        console.log(`Split successful: ${results.length} files created`);
        results.forEach((r, i) => {
          console.log(`  File ${i + 1}: ${r.filename} (${r.bytes.length} bytes)`);
        });
        
        setSplitPdfResults(results);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error splitting PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to split PDF. Please check your page ranges and try again.');
        setIsComplete(false);
        setSplitPdfResults(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'delete-pages') {
      // Real delete pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to delete pages from');
        return;
      }

      if (!pageRange.trim()) {
        setError('Please select pages to delete');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await deletePages(file, pageRange);
        
        console.log('Delete pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error deleting pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'extract-pages') {
      // Real extract pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to extract pages from');
        return;
      }

      if (!pageRange.trim()) {
        setError('Please select pages to extract');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await extractPages(file, pageRange);
        
        console.log('Extract pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error extracting pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to extract pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'reorder') {
      // Real reorder pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to reorder');
        return;
      }

      if (!totalPages || pageOrder.length === 0) {
        setError('PDF pages are not loaded. Please try uploading again.');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(arrayBuffer);
        
        // Create new PDF with reordered pages
        const newPdf = await PDFDocument.create();
        
        // Copy pages in new order
        for (const originalIndex of pageOrder) {
          const [copiedPage] = await newPdf.copyPages(sourcePdf, [originalIndex]);
          newPdf.addPage(copiedPage);
        }
        
        const pdfBytes = await newPdf.save();
        
        console.log('Reorder pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error reordering pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to reorder pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Stub for other tools
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setIsComplete(false);
    setIsProcessing(false);
    setMergedPdfBytes(null);
    setSplitPdfResults(null);
    setProcessedPdfBytes(null);
    setPageRange('');
    setError(null);
    setTotalPages(null);
    setPageRangeWarning(null);
    setPageOrder([]);
  };

  const handleDownload = async () => {
    if (tool.id === 'merge') {
      if (!mergedPdfBytes) {
        console.error('Merged PDF bytes not available');
        setError('Merged PDF is not ready. Please try merging again.');
        return;
      }
      
      // Generate filename from input files
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'merged';
      const filename = files.length > 1 
        ? `${baseName}_merged.pdf`
        : `${baseName}.pdf`;
      
      try {
        downloadMergedPdf(mergedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'split') {
      if (!splitPdfResults || splitPdfResults.length === 0) {
        console.error('Split PDF results not available');
        setError('Split PDFs are not ready. Please try splitting again.');
        return;
      }
      
      try {
        await downloadSplitPdfs(splitPdfResults);
      } catch (err) {
        console.error('Error downloading split PDFs:', err);
        setError('Failed to download PDFs. Please try again.');
      }
    } else if (tool.id === 'delete-pages' || tool.id === 'extract-pages') {
      if (!processedPdfBytes) {
        console.error('Processed PDF bytes not available');
        setError(`${tool.id === 'delete-pages' ? 'Updated' : 'Extracted'} PDF is not ready. Please try again.`);
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : tool.id === 'delete-pages' ? 'updated' : 'extracted';
      const filename = tool.id === 'delete-pages'
        ? `${baseName}_updated.pdf`
        : `${baseName}_extracted.pdf`;
      
      try {
        if (tool.id === 'delete-pages') {
          downloadDeletePdf(processedPdfBytes, filename);
        } else {
          downloadExtractPdf(processedPdfBytes, filename);
        }
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'reorder') {
      if (!processedPdfBytes) {
        console.error('Reordered PDF bytes not available');
        setError('Reordered PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'reordered';
      const filename = `${baseName}_reordered.pdf`;
      
      try {
        downloadDeletePdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else {
      // Stub for other tools
      alert('This is a stub — download functionality will be implemented soon!');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const acceptAttr = config.acceptTypes || '.pdf,application/pdf';

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Back button & Title */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors mb-4 group"
        >
          <ArrowLeft size={20} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Tools</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-500/15 flex items-center justify-center text-primary-400">
            {tool.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{tool.title}</h2>
            <p className="text-surface-400 text-sm">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="mb-6 p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-surface-200 mb-2">How it works:</p>
            <ol className="space-y-1">
              {config.steps.map((step, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-surface-400">
                  <span className={`
                    flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center
                    ${idx === 0 && files.length > 0 ? 'bg-success-500/20 text-success-400' : ''}
                    ${idx === 0 && files.length === 0 ? 'bg-primary-500/20 text-primary-400' : ''}
                    ${idx === 1 && files.length > 0 && !isComplete ? 'bg-primary-500/20 text-primary-400' : ''}
                    ${idx === 1 && (files.length === 0 || isComplete) ? 'bg-surface-700/50 text-surface-500' : ''}
                    ${idx === 2 && isComplete ? 'bg-success-500/20 text-success-400' : ''}
                    ${idx === 2 && !isComplete ? 'bg-surface-700/50 text-surface-500' : ''}
                  `}>
                    {(idx === 0 && files.length > 0) || (idx === 2 && isComplete) ? (
                      <CircleCheck size={12} strokeWidth={3} />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <span className={
                    (idx === 0 && files.length > 0) || (idx === 2 && isComplete)
                      ? 'text-success-400 line-through'
                      : ''
                  }>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Completed state */}
      {isComplete ? (
        <div className="animate-fade-in">
          <div className="p-8 rounded-2xl border border-success-500/30 bg-success-500/5 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-500/20 flex items-center justify-center">
              <CircleCheck size={32} strokeWidth={2} className="text-success-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Done!</h3>
            <p className="text-surface-400 mb-6">
              Your {config.resultLabel.toLowerCase()} is ready to download.
            </p>

            {/* Download button */}
            <div className="flex items-center justify-center gap-3">
              <button
                className={`btn-primary btn-lg ${
                  (tool.id === 'merge' && !mergedPdfBytes) || 
                  (tool.id === 'split' && (!splitPdfResults || splitPdfResults.length === 0)) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !processedPdfBytes) ||
                  (tool.id === 'reorder' && !processedPdfBytes)
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={handleDownload}
                disabled={
                  (tool.id === 'merge' && !mergedPdfBytes) ||
                  (tool.id === 'split' && (!splitPdfResults || splitPdfResults.length === 0)) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !processedPdfBytes) ||
                  (tool.id === 'reorder' && !processedPdfBytes)
                }
              >
                <FileText size={20} strokeWidth={2} />
                Download {config.resultLabel}
                {tool.id === 'split' && splitPdfResults && splitPdfResults.length > 0 && (
                  <span className="ml-2 text-xs">({splitPdfResults.length} files)</span>
                )}
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary btn-lg"
              >
                Start Over
              </button>
            </div>
            {tool.id === 'merge' && !mergedPdfBytes && (
              <p className="text-xs text-warning-400 text-center mt-2">
                Merged PDF is not ready. Please try merging again.
              </p>
            )}
            {tool.id === 'split' && (!splitPdfResults || splitPdfResults.length === 0) && (
              <p className="text-xs text-warning-400 text-center mt-2">
                Split PDFs are not ready. Please try splitting again.
              </p>
            )}
            {(tool.id === 'delete-pages' || tool.id === 'extract-pages') && !processedPdfBytes && (
              <p className="text-xs text-warning-400 text-center mt-2">
                {tool.id === 'delete-pages' ? 'Updated' : 'Extracted'} PDF is not ready. Please try again.
              </p>
            )}
            {tool.id === 'reorder' && !processedPdfBytes && (
              <p className="text-xs text-warning-400 text-center mt-2">
                Reordered PDF is not ready. Please try again.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              upload-zone p-8 min-h-[200px] mb-4
              ${isDragging ? 'upload-zone-active' : ''}
            `}
          >
            <input
              type="file"
              accept={acceptAttr}
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id={`tool-file-input-${tool.id}`}
              multiple={config.acceptMultiple}
            />

            <label htmlFor={`tool-file-input-${tool.id}`} className="cursor-pointer w-full">
              <div className="space-y-4 text-center">
                <div className={`
                  relative w-16 h-16 mx-auto rounded-2xl transition-all duration-300
                  ${isDragging ? 'bg-primary-500/20 scale-110' : 'bg-surface-700/50'}
                  flex items-center justify-center
                `}>
                  <svg
                    className={`w-8 h-8 transition-colors duration-200 ${isDragging ? 'text-primary-400' : 'text-surface-400'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  {isDragging && (
                    <div className="absolute inset-0 rounded-2xl bg-primary-500/20 animate-pulse" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-base font-medium text-surface-200">
                    {isDragging ? 'Drop here!' : config.uploadLabel}
                  </p>
                  <p className="text-sm text-surface-500">{config.uploadDescription}</p>
                </div>

                <span className="btn btn-md btn-primary inline-flex font-semibold">
                  <Upload size={16} strokeWidth={2} />
                  Choose {config.acceptMultiple ? 'Files' : 'File'}
                </span>
              </div>
            </label>
          </div>

          {/* Files list */}
          {files.length > 0 && (
            <div className="mb-6 space-y-2 animate-fade-in">
              <p className="text-sm font-medium text-surface-300 mb-2">
                {files.length} file{files.length > 1 ? 's' : ''} selected:
              </p>
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-800/50 border border-surface-700/50 group"
                >
                  {/* File icon */}
                  <div className="w-10 h-10 rounded-lg bg-error-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} strokeWidth={1.5} className="text-error-400" />
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-200 truncate">{file.name}</p>
                    <p className="text-xs text-surface-500">{formatFileSize(file.size)}</p>
                  </div>

                  {/* Reorder handle (for multi-file tools) */}
                  {config.acceptMultiple && files.length > 1 && (
                    <div className="text-surface-500 cursor-grab" title="Drag to reorder">
                      <GripVertical size={16} strokeWidth={2} />
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFile(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-error-500/10 text-surface-500 hover:text-error-400 transition-all"
                    title="Remove file"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>
              ))}

              {/* Add more files button (for multi-file tools) */}
              {config.acceptMultiple && (
                <label
                  htmlFor={`tool-file-input-${tool.id}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-surface-700/50 hover:border-primary-500/30 text-surface-500 hover:text-primary-400 cursor-pointer transition-colors"
                >
                  <Plus size={16} strokeWidth={2} />
                  <span className="text-sm font-medium">Add More Files</span>
                </label>
              )}
            </div>
          )}

          {/* Tool-specific options stub */}
          {files.length > 0 && (
            <div className="mb-6 animate-fade-in">
              {/* Reorder pages */}
              {tool.id === 'reorder' && totalPages && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-2">
                    Reorder Pages
                  </p>
                  <p className="text-xs text-surface-400 mb-3">
                    Drag pages to reorder or use position selectors to set the order
                  </p>
                  <PageReorder
                    totalPages={totalPages}
                    pdfFile={files.length > 0 ? files[0] : null}
                    onChange={setPageOrder}
                  />
                </div>
              )}
              
              {/* Compression level */}
              {tool.id === 'compress' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Compression Level</p>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <button
                        key={level}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${level === 'Medium' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rotation angle */}
              {tool.id === 'rotate' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Rotation Angle</p>
                  <div className="flex gap-2">
                    {['90° CW', '180°', '90° CCW'].map((angle) => (
                      <button
                        key={angle}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${angle === '90° CW' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {angle}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Image format for pdf-to-images */}
              {tool.id === 'pdf-to-images' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Image Format</p>
                  <div className="flex gap-2">
                    {['PNG', 'JPEG', 'WebP'].map((format) => (
                      <button
                        key={format}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${format === 'PNG' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Page range for split/extract/delete */}
              {(tool.id === 'split' || tool.id === 'extract-pages' || tool.id === 'delete-pages') && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">
                      {tool.id === 'split' ? 'Pages to Split Into Separate Files' : tool.id === 'extract-pages' ? 'Pages to Extract' : 'Pages to Delete'}
                    </p>
                    {tool.id === 'split' && (
                      <p className="text-xs text-surface-400 mb-3">
                        Select which pages should be split into separate PDF files. Each range will create a new file.
                      </p>
                    )}
                    {(tool.id === 'extract-pages' || tool.id === 'delete-pages') && (
                      <p className="text-xs text-surface-400 mb-3">
                        {tool.id === 'extract-pages' 
                          ? 'Click on pages to select which ones to extract into a new PDF file.'
                          : 'Click on pages to select which ones to delete from the PDF.'}
                      </p>
                    )}
                    
                    {tool.id === 'split' ? (
                      <PageRangeSelector
                        totalPages={totalPages}
                        value={pageRange}
                        onChange={handlePageRangeChange}
                        onWarningChange={setPageRangeWarning}
                      />
                    ) : (
                      <PageSelector
                        totalPages={totalPages}
                        value={pageRange}
                        onChange={handlePageRangeChange}
                      />
                    )}
                    
                    {pageRangeWarning && (
                      <div className="mt-2 p-2 rounded-lg bg-warning-500/10 border border-warning-500/20">
                        <p className="text-xs text-warning-300">{pageRangeWarning}</p>
                      </div>
                    )}
                    {totalPages && !pageRangeWarning && pageRange.trim() && (
                      <p className="text-xs text-success-400 mt-2">
                        ✓ PDF has {totalPages} page{totalPages !== 1 ? 's' : ''}. Your selection looks good!
                      </p>
                    )}
                  </div>
                  
                  {tool.id === 'split' && (
                    <div className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <p className="text-xs font-semibold text-primary-300 mb-2">📋 How it works:</p>
                      <ul className="text-xs text-surface-400 space-y-1.5 list-disc list-inside">
                        <li>Each range you add creates a separate PDF file</li>
                        <li>Use "From page" and "To page" to select a range (e.g., pages 1-5)</li>
                        <li>If "From" and "To" are the same, it creates a file with a single page</li>
                        <li>You can add multiple ranges to split the PDF into multiple files</li>
                      </ul>
                    </div>
                  )}
                  
                  {tool.id === 'split' && (
                    <p className="text-xs text-surface-500">
                      ⚠️ Note: You cannot select all pages - split requires selecting only some pages to create separate files.
                    </p>
                  )}
                  {(tool.id === 'extract-pages' || tool.id === 'delete-pages') && (
                    <p className="text-xs text-surface-500">
                      {tool.id === 'delete-pages' 
                        ? '⚠️ Note: You cannot delete all pages - at least one page must remain.'
                        : 'Select one or more pages to extract into a new PDF file.'}
                    </p>
                  )}
                </div>
              )}

              {/* Encryption settings */}
              {tool.id === 'encrypt' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Encryption Level</p>
                    <div className="flex gap-2">
                      {['AES-128', 'AES-256'].map((enc) => (
                        <button
                          key={enc}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${enc === 'AES-256' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                        >
                          {enc}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">User Password (to open)</p>
                    <input
                      type="password"
                      placeholder="Enter password to open the PDF"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Owner Password (for permissions)</p>
                    <input
                      type="password"
                      placeholder="Enter owner password (optional)"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Unlock password */}
              {tool.id === 'unlock' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-2">Current Password</p>
                  <input
                    type="password"
                    placeholder="Enter the password to unlock the PDF"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                  />
                </div>
              )}

              {/* Signature type for sign */}
              {tool.id === 'sign' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-3">Signature Type</p>
                  <div className="flex gap-2">
                    {['Draw', 'Type', 'Upload Image'].map((type) => (
                      <button
                        key={type}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === 'Draw' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="h-32 rounded-lg border-2 border-dashed border-surface-600/50 flex items-center justify-center text-surface-500 text-sm">
                    Draw your signature here (stub)
                  </div>
                </div>
              )}

              {/* Permissions checkboxes */}
              {tool.id === 'permissions' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <p className="text-sm font-medium text-surface-200 mb-3">Restrict Actions</p>
                  {['Prevent Printing', 'Prevent Copying Text', 'Prevent Editing', 'Prevent Annotations', 'Prevent Form Filling'].map((perm) => (
                    <label key={perm} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/25" />
                      <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">{perm}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Watermark options */}
              {tool.id === 'add-watermark' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Watermark Text</p>
                    <input
                      type="text"
                      placeholder="e.g. CONFIDENTIAL, DRAFT"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Opacity</p>
                      <input type="range" min="10" max="100" defaultValue="30" className="w-full" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Angle</p>
                      <input type="range" min="-90" max="90" defaultValue="-45" className="w-full" />
                    </div>
                  </div>
                </div>
              )}

              {/* Page numbers options */}
              {tool.id === 'page-numbers' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Position</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['Top Left', 'Top Center', 'Top Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map((pos) => (
                        <button
                          key={pos}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${pos === 'Bottom Center' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Start From</p>
                    <input
                      type="number"
                      defaultValue={1}
                      min={1}
                      className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Stamp options */}
              {tool.id === 'stamp' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Stamp Type</p>
                  <div className="flex flex-wrap gap-2">
                    {['APPROVED', 'DRAFT', 'CONFIDENTIAL', 'FINAL', 'COPY', 'VOID', 'RECEIVED', 'Custom...'].map((s) => (
                      <button
                        key={s}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${s === 'APPROVED' ? 'bg-success-500/20 border border-success-500/40 text-success-300' : s === 'Custom...' ? 'bg-primary-500/10 border border-primary-500/30 text-primary-400' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resize / page size */}
              {tool.id === 'resize' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Target Page Size</p>
                  <div className="flex flex-wrap gap-2">
                    {['A4', 'A3', 'A5', 'Letter', 'Legal', 'Tabloid', 'Custom'].map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${size === 'A4' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata fields */}
              {tool.id === 'metadata' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  {['Title', 'Author', 'Subject', 'Keywords', 'Creator'].map((field) => (
                    <div key={field}>
                      <p className="text-sm font-medium text-surface-200 mb-1">{field}</p>
                      <input
                        type="text"
                        placeholder={`Enter ${field.toLowerCase()}...`}
                        className="w-full px-4 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Flatten options */}
              {tool.id === 'flatten' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <p className="text-sm font-medium text-surface-200 mb-3">What to Flatten</p>
                  {['Form Fields', 'Annotations', 'Comments', 'All Layers'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" defaultChecked={opt === 'All Layers'} className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/25" />
                      <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Header/Footer text */}
              {tool.id === 'header-footer' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Header Text</p>
                    <input
                      type="text"
                      placeholder="e.g. Company Name — Confidential"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Footer Text</p>
                    <input
                      type="text"
                      placeholder="e.g. Page {page} of {total}"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Insert blank page - position */}
              {tool.id === 'insert-blank' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Insert Position</p>
                    <div className="flex gap-2">
                      {['Beginning', 'End', 'After Page...'].map((pos) => (
                        <button key={pos} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${pos === 'End' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{pos}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Number of Blank Pages</p>
                    <input type="number" defaultValue={1} min={1} max={100} className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                </div>
              )}

              {/* Duplicate pages */}
              {tool.id === 'duplicate-pages' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Pages to Duplicate</p>
                    <input type="text" placeholder="e.g. 1, 3-5, 8" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    <p className="text-xs text-surface-500 mt-2">Enter page numbers or ranges. Each selected page will be duplicated.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Number of Copies</p>
                    <input type="number" defaultValue={1} min={1} max={10} className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                </div>
              )}

              {/* Split by size */}
              {tool.id === 'split-by-size' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Max File Size Per Part</p>
                  <div className="flex gap-2">
                    {['5 MB', '10 MB', '25 MB', '50 MB'].map((s) => (
                      <button key={s} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${s === '10 MB' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Split by bookmarks */}
              {tool.id === 'split-by-bookmarks' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Split at Bookmark Level</p>
                  <div className="flex gap-2">
                    {['Level 1 (Chapters)', 'Level 2 (Sections)', 'Level 3 (Sub-sections)'].map((l) => (
                      <button key={l} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${l.startsWith('Level 1') ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{l}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sanitize / Remove hidden data */}
              {tool.id === 'remove-hidden-data' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <p className="text-sm font-medium text-surface-200 mb-3">Remove Hidden Data</p>
                  {['Metadata (author, title, dates)', 'JavaScript & Actions', 'Embedded Files & Attachments', 'Comments & Annotations', 'Form Field Data', 'Hidden Layers', 'Cross-references & Links'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/25" />
                      <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Redact options */}
              {tool.id === 'redact' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Redaction Method</p>
                  <div className="flex gap-2">
                    {['Select Text', 'Draw Rectangle', 'Find & Redact'].map((m) => (
                      <button key={m} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${m === 'Select Text' ? 'bg-error-500/20 border border-error-500/40 text-error-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{m}</button>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Search for Text to Redact</p>
                    <input type="text" placeholder="e.g. SSN, email addresses, phone numbers..." className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                  <p className="text-xs text-error-400/80">⚠️ Redaction is permanent and cannot be undone</p>
                </div>
              )}

              {/* Background options */}
              {tool.id === 'add-background' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Background Type</p>
                    <div className="flex gap-2">
                      {['Solid Color', 'Image'].map((t) => (
                        <button key={t} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${t === 'Solid Color' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Color</p>
                    <div className="flex gap-2">
                      {['#FFFFFF', '#F5F5DC', '#F0F8FF', '#FFF8DC', '#F0FFF0'].map((c) => (
                        <button key={c} className="w-10 h-10 rounded-lg border-2 border-surface-600 hover:border-primary-400 transition-all" style={{ backgroundColor: c }}></button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Opacity</p>
                    <input type="range" min="10" max="100" defaultValue="100" className="w-full" />
                  </div>
                </div>
              )}

              {/* Invert colors */}
              {tool.id === 'invert-colors' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <p className="text-sm font-medium text-surface-200 mb-3">Inversion Mode</p>
                  <div className="flex gap-2">
                    {['Full Invert', 'Dark Mode (Smart)', 'Sepia'].map((m) => (
                      <button key={m} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${m === 'Dark Mode (Smart)' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Remove annotations options */}
              {tool.id === 'remove-annotations' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-3">
                  <p className="text-sm font-medium text-surface-200 mb-3">Annotations to Remove</p>
                  {['Highlights', 'Sticky Notes', 'Text Comments', 'Drawing Markups', 'Stamps', 'Ink (Freehand)', 'All Annotations'].map((a) => (
                    <label key={a} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" defaultChecked={a === 'All Annotations'} className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/25" />
                      <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">{a}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Crop page options */}
              {tool.id === 'crop' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Crop Margins (mm)</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Top', 'Bottom', 'Left', 'Right'].map((side) => (
                      <div key={side}>
                        <p className="text-xs text-surface-400 mb-1">{side}</p>
                        <input type="number" defaultValue={0} min={0} className="w-full px-3 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                      </div>
                    ))}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/25" />
                    <span className="text-sm text-surface-300 group-hover:text-surface-100 transition-colors">Apply to all pages</span>
                  </label>
                </div>
              )}

              {/* Extract images format */}
              {tool.id === 'extract-images' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Output Format</p>
                  <div className="flex gap-2">
                    {['Original', 'PNG', 'JPEG'].map((f) => (
                      <button key={f} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${f === 'Original' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{f}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optimize images quality */}
              {tool.id === 'optimize-images' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Target Quality</p>
                    <div className="flex gap-2">
                      {['Screen (72 DPI)', 'eBook (150 DPI)', 'Print (300 DPI)'].map((q) => (
                        <button key={q} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${q.includes('150') ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{q}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Image Quality</p>
                    <input type="range" min="10" max="100" defaultValue="75" className="w-full" />
                    <div className="flex justify-between text-xs text-surface-500 mt-1"><span>Low (Small)</span><span>High (Large)</span></div>
                  </div>
                </div>
              )}

              {/* QR Code options */}
              {tool.id === 'add-qr-code' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">QR Content</p>
                    <input type="text" placeholder="https://example.com or any text" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Size (mm)</p>
                      <input type="number" defaultValue={30} min={10} max={100} className="w-full px-3 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Page</p>
                      <input type="text" placeholder="All or 1,3-5" className="w-full px-3 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Position</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['Top Left', 'Top Center', 'Top Right', 'Center Left', 'Center', 'Center Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map((pos) => (
                        <button key={pos} className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${pos === 'Bottom Right' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{pos}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Barcode options */}
              {tool.id === 'add-barcode' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Barcode Type</p>
                    <div className="flex flex-wrap gap-2">
                      {['Code 128', 'Code 39', 'EAN-13', 'UPC-A', 'QR Code', 'DataMatrix'].map((t) => (
                        <button key={t} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${t === 'Code 128' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Barcode Data</p>
                    <input type="text" placeholder="Enter barcode data..." className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                </div>
              )}

              {/* Bookmark editor */}
              {tool.id === 'add-bookmarks' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Add Bookmarks</p>
                  <div className="space-y-2">
                    {['Chapter 1', 'Chapter 2', 'Chapter 3'].map((ch, i) => (
                      <div key={ch} className="flex items-center gap-2">
                        <input type="text" defaultValue={ch} className="flex-1 px-3 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                        <span className="text-xs text-surface-500">→ Page</span>
                        <input type="number" defaultValue={i * 5 + 1} min={1} className="w-16 px-2 py-2 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm text-center focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                      </div>
                    ))}
                  </div>
                  <button className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1">
                    <Plus size={16} strokeWidth={2} />
                    Add Bookmark
                  </button>
                </div>
              )}

              {/* Hyperlink options */}
              {tool.id === 'add-hyperlinks' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Add Hyperlink</p>
                  <div>
                    <p className="text-xs text-surface-400 mb-1">Link Text / Area</p>
                    <input type="text" placeholder="Text to make clickable..." className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                  <div>
                    <p className="text-xs text-surface-400 mb-1">URL</p>
                    <input type="url" placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                </div>
              )}

              {/* Bates numbering options */}
              {tool.id === 'bates-numbering' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Prefix</p>
                      <input type="text" placeholder="e.g. DOC-" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Starting Number</p>
                      <input type="number" defaultValue={1} min={1} className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-200 mb-2">Suffix</p>
                      <input type="text" placeholder="(optional)" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Number of Digits</p>
                    <div className="flex gap-2">
                      {['4', '5', '6', '8'].map((d) => (
                        <button key={d} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${d === '6' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{d} digits</button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-surface-500">Preview: DOC-000001</p>
                </div>
              )}

              {/* Color space conversion */}
              {tool.id === 'color-space' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Convert From → To</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex gap-2">
                      {['RGB → CMYK', 'CMYK → RGB'].map((conv) => (
                        <button key={conv} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${conv.startsWith('RGB') ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{conv}</button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-surface-500">CMYK is required for professional print. RGB is standard for web.</p>
                </div>
              )}

              {/* PDF statistics info */}
              {tool.id === 'pdf-statistics' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Statistics to Gather</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Page Count', 'Word Count', 'Character Count', 'Image Count', 'Font List', 'File Size Breakdown', 'Color Profile', 'PDF Version'].map((stat) => (
                      <div key={stat} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-700/20 border border-surface-700/30">
                        <CircleCheck size={16} strokeWidth={2} className="text-info-400" />
                        <span className="text-sm text-surface-300">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linearize info */}
              {tool.id === 'linearize' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-start gap-3">
                    <Zap size={20} strokeWidth={2} className="text-success-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-200">Fast Web View</p>
                      <p className="text-xs text-surface-400 mt-1">Linearization restructures the PDF so it can start displaying in a web browser before the entire file has downloaded. This is ideal for PDFs served over the internet.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* PDF/A conformance */}
              {tool.id === 'pdfa' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">PDF/A Conformance Level</p>
                  <div className="flex flex-wrap gap-2">
                    {['PDF/A-1b', 'PDF/A-1a', 'PDF/A-2b', 'PDF/A-2a', 'PDF/A-3b'].map((l) => (
                      <button key={l} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${l === 'PDF/A-2b' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{l}</button>
                    ))}
                  </div>
                  <p className="text-xs text-surface-500 mt-3">PDF/A-2b is the most common for archival. PDF/A-3b supports embedded files.</p>
                </div>
              )}

              {/* PDF/X profile */}
              {tool.id === 'pdfx' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">PDF/X Profile</p>
                  <div className="flex flex-wrap gap-2">
                    {['PDF/X-1a', 'PDF/X-3', 'PDF/X-4'].map((p) => (
                      <button key={p} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${p === 'PDF/X-4' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{p}</button>
                    ))}
                  </div>
                  <p className="text-xs text-surface-500 mt-3">PDF/X-4 is recommended for modern print workflows. PDF/X-1a for legacy compatibility.</p>
                </div>
              )}

              {/* Grayscale mode */}
              {tool.id === 'grayscale' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Grayscale Method</p>
                  <div className="flex gap-2">
                    {['Luminosity', 'Average', 'Desaturation'].map((m) => (
                      <button key={m} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${m === 'Luminosity' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fill & Sign */}
              {tool.id === 'fill-sign' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <p className="text-sm font-medium text-surface-200 mb-2">Signature</p>
                  <div className="flex gap-2 mb-3">
                    {['Draw', 'Type', 'Upload Image'].map((type) => (
                      <button key={type} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === 'Draw' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{type}</button>
                    ))}
                  </div>
                  <div className="h-24 rounded-lg border-2 border-dashed border-surface-600/50 flex items-center justify-center text-surface-500 text-sm">
                    Draw or type your signature here (stub)
                  </div>
                </div>
              )}

              {/* Validate profile */}
              {tool.id === 'validate' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-3">Validation Profile</p>
                  <div className="flex flex-wrap gap-2">
                    {['PDF Structure', 'PDF/A-1b', 'PDF/A-2b', 'PDF/X-4', 'WCAG 2.1'].map((p) => (
                      <button key={p} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${p === 'PDF Structure' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'}`}>{p}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificate signing */}
              {tool.id === 'certificate' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Certificate File (.pfx / .p12)</p>
                    <div className="h-16 rounded-lg border-2 border-dashed border-surface-600/50 flex items-center justify-center text-surface-500 text-sm cursor-pointer hover:border-primary-500/30 transition-colors">
                      Click or drop your certificate file here
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Certificate Password</p>
                    <input type="password" placeholder="Enter certificate password" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Reason for Signing</p>
                    <input type="text" placeholder="e.g. Document approval" className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl border border-error-500/30 bg-error-500/5 animate-fade-in">
              <div className="flex items-start gap-3">
                <X size={20} strokeWidth={2} className="text-error-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-error-300 mb-1">Error</p>
                  <p className="text-sm text-error-400/80">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-error-400 hover:text-error-300 transition-colors"
                  aria-label="Dismiss error"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* Action Button */}
          {files.length > 0 && (
            <div className="animate-fade-in">
              <button
                onClick={handleProcess}
                disabled={
                  isProcessing || 
                  (config.acceptMultiple && files.length < 2) ||
                  (tool.id === 'split' && !pageRange.trim()) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !pageRange.trim()) ||
                  (tool.id === 'reorder' && (!totalPages || pageOrder.length === 0))
                }
                className={`
                  w-full btn-primary btn-lg font-semibold justify-center
                  ${isProcessing ? 'opacity-75 cursor-wait' : ''}
                  ${(config.acceptMultiple && files.length < 2) || (tool.id === 'split' && !pageRange.trim()) || ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !pageRange.trim()) || (tool.id === 'reorder' && (!totalPages || pageOrder.length === 0)) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner-sm" />
                    Processing...
                  </>
                ) : (
                  <>
                    {tool.icon}
                    {config.actionLabel}
                  </>
                )}
              </button>
              {config.acceptMultiple && files.length < 2 && (
                <p className="text-xs text-surface-500 text-center mt-2">
                  Please add at least 2 files
                </p>
              )}
              {tool.id === 'split' && !pageRange.trim() && (
                <p className="text-xs text-surface-500 text-center mt-2">
                  Please enter page ranges (e.g., "1-3, 5, 8-10")
                </p>
              )}
              {(tool.id === 'delete-pages' || tool.id === 'extract-pages') && !pageRange.trim() && (
                <p className="text-xs text-surface-500 text-center mt-2">
                  Please select pages to {tool.id === 'delete-pages' ? 'delete' : 'extract'}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
