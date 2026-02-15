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
import { rotatePages, downloadPdf as downloadRotatePdf } from '../lib/pdf/rotatePages';
import { insertBlankPages, downloadPdf as downloadInsertBlankPdf } from '../lib/pdf/insertBlankPages';
import { duplicatePages, downloadPdf as downloadDuplicatePdf } from '../lib/pdf/duplicatePages';
import { reversePageOrder, downloadPdf as downloadReversePdf } from '../lib/pdf/reversePageOrder';
import { splitBySizeString, downloadSplitPdfs as downloadSplitBySizePdfs, formatBytes, parseSizeToBytes } from '../lib/pdf/splitBySize';
import { splitByBookmarksSimple, downloadSplitPdfs as downloadSplitByBookmarksPdfs, getBookmarkInfo } from '../lib/pdf/splitByBookmarks';
import { signPdf, downloadSignedPdf } from '../lib/pdf/signPdf';
import { loadPdfDocument, getPdfPagesInfo } from '../lib/pdf/pdfRender';
import { exportPdf } from '../lib/pdf/exportPdf';
import { usePdfStore } from '../store/pdfStore';
import PageRangeSelector from './PageRangeSelector';
import PageSelector from './PageSelector';
import PageReorder from './PageReorder';
import PageRotate from './PageRotate';
import SignaturePad from './SignaturePad';
import SignaturePositionSelector from './SignaturePositionSelector';
import RedactSelector from './RedactSelector';
import { redactPdf, downloadRedactedPdf, type RedactionArea } from '../lib/pdf/redactPdf';

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
  const [pageRotations, setPageRotations] = useState<{ [pageNumber: number]: number }>({}); // For rotate: map of page number to rotation
  const [insertPosition, setInsertPosition] = useState<'beginning' | 'end' | 'after'>('end'); // For insert-blank: position to insert
  const [numberOfBlankPages, setNumberOfBlankPages] = useState<number>(1); // For insert-blank: number of blank pages
  const [afterPageNumber, setAfterPageNumber] = useState<number>(1); // For insert-blank: page number when position is 'after'
  const [duplicatePageRange, setDuplicatePageRange] = useState<string>(''); // For duplicate-pages: page range to duplicate
  const [numberOfCopies, setNumberOfCopies] = useState<number>(1); // For duplicate-pages: number of copies
  const [maxFileSize, setMaxFileSize] = useState<string>('10 MB'); // For split-by-size: maximum file size (preset)
  const [customSizeValue, setCustomSizeValue] = useState<string>('10'); // For split-by-size: custom size number
  const [customSizeUnit, setCustomSizeUnit] = useState<string>('MB'); // For split-by-size: custom size unit (KB, MB, GB)
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false); // For split-by-size: whether to use custom size
  const [minSizeBytes, setMinSizeBytes] = useState<number | null>(null); // For split-by-size: minimum size (size of largest page)
  const [bookmarkLevel, setBookmarkLevel] = useState<number>(1); // For split-by-bookmarks: bookmark level to split at
  const [bookmarkInfo, setBookmarkInfo] = useState<{ hasBookmarks: boolean; levels: number[]; count: number; bookmarks: Array<{ title: string; pageIndex: number; level: number }> } | null>(null); // For split-by-bookmarks: bookmark info
  const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'image'>('draw'); // For sign: signature type
  const [signatureData, setSignatureData] = useState<string>(''); // For sign: signature data (data URL or text)
  const [signaturePage, setSignaturePage] = useState<number>(1); // For sign: page number (1-based)
  const [signatureX, setSignatureX] = useState<number>(0.5); // For sign: X position (0-1)
  const [signatureY, setSignatureY] = useState<number>(0.5); // For sign: Y position (0-1)
  const [typedSignature, setTypedSignature] = useState<string>(''); // For sign: typed signature text
  const [signatureFontSize, setSignatureFontSize] = useState<number>(24); // For sign: font size for typed signature
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState<boolean>(false);
  const [isPositionSelectorOpen, setIsPositionSelectorOpen] = useState<boolean>(false);
  const [isRedactSelectorOpen, setIsRedactSelectorOpen] = useState<boolean>(false);
  const [redactions, setRedactions] = useState<RedactionArea[]>([]);
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
      
      // Load total pages for rotate tool
      if (tool.id === 'rotate' && validFiles[0].type === 'application/pdf') {
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
      
      // Load total pages for insert-blank tool
      if (tool.id === 'insert-blank' && validFiles[0].type === 'application/pdf') {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const arrayBuffer = await validFiles[0].arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const total = pdf.getPageCount();
          setTotalPages(total);
          // Set default after page number to last page
          setAfterPageNumber(total);
        } catch (err) {
          console.error('Error loading PDF:', err);
        }
      }
      
      // Load total pages for duplicate-pages tool
      if (tool.id === 'duplicate-pages' && validFiles[0].type === 'application/pdf') {
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
      
      // Load bookmark info for split-by-bookmarks tool
      if (tool.id === 'split-by-bookmarks' && validFiles[0].type === 'application/pdf') {
        setBookmarkInfo(null); // Reset first to show loading
        (async () => {
          try {
            const info = await getBookmarkInfo(validFiles[0]);
            setBookmarkInfo(info);
            if (info.hasBookmarks && info.levels.length > 0) {
              // Set default level to first available level
              setBookmarkLevel(info.levels[0]);
            }
          } catch (err) {
            console.error('Error loading bookmark info:', err);
            setBookmarkInfo({ hasBookmarks: false, levels: [], count: 0, bookmarks: [] });
          }
        })();
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
    if ((tool.id === 'split' || tool.id === 'extract-pages' || tool.id === 'delete-pages' || tool.id === 'reorder' || tool.id === 'rotate' || tool.id === 'insert-blank' || tool.id === 'duplicate-pages' || tool.id === 'split-by-size') && index === 0) {
      setTotalPages(null);
      setPageRangeWarning(null);
      setPageRange('');
      setPageOrder([]);
      setPageRotations({});
      setInsertPosition('end');
      setNumberOfBlankPages(1);
      setAfterPageNumber(1);
      setDuplicatePageRange('');
      setNumberOfCopies(1);
      setMaxFileSize('10 MB');
      setCustomSizeValue('10');
      setCustomSizeUnit('MB');
      setUseCustomSize(false);
      setMinSizeBytes(null);
    setBookmarkLevel(1);
    setBookmarkInfo(null);
    setSignatureType('draw');
    setSignatureData('');
    setSignaturePage(1);
    setSignatureX(0.5);
    setSignatureY(0.5);
    setTypedSignature('');
    setSignatureFontSize(24);
    setIsSignaturePadOpen(false);
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
    } else if (tool.id === 'rotate') {
      // Real rotate pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to rotate pages');
        return;
      }

      if (Object.keys(pageRotations).length === 0) {
        setError('Please select at least one page and set rotation angle');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await rotatePages(file, pageRotations);
        
        console.log('Rotate pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error rotating pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to rotate pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'duplicate-pages') {
      // Real duplicate pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to duplicate pages');
        return;
      }

      if (!duplicatePageRange.trim()) {
        setError('Please specify which pages to duplicate');
        return;
      }

      if (numberOfCopies < 1 || numberOfCopies > 10) {
        setError('Number of copies must be between 1 and 10');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await duplicatePages(file, duplicatePageRange, numberOfCopies);
        
        console.log('Duplicate pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error duplicating pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to duplicate pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'insert-blank') {
      // Real insert blank pages implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to insert blank pages');
        return;
      }

      if (numberOfBlankPages < 1 || numberOfBlankPages > 100) {
        setError('Number of blank pages must be between 1 and 100');
        return;
      }

      if (insertPosition === 'after' && (!totalPages || afterPageNumber < 1 || afterPageNumber > totalPages)) {
        setError(`Page number must be between 1 and ${totalPages || 'N/A'}`);
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await insertBlankPages(
          file,
          insertPosition,
          numberOfBlankPages,
          insertPosition === 'after' ? afterPageNumber : undefined
        );
        
        console.log('Insert blank pages successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error inserting blank pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to insert blank pages. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'split-by-size') {
      // Real split by size implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to split by size');
        return;
      }

      // Determine which size to use (custom or preset)
      const sizeToUse = useCustomSize 
        ? `${customSizeValue} ${customSizeUnit}`
        : maxFileSize;
      
      if (useCustomSize) {
        // Validate custom size
        const sizeNum = parseFloat(customSizeValue);
        if (isNaN(sizeNum) || sizeNum <= 0) {
          setError('Please enter a valid size number');
          return;
        }
        
        try {
          const customSizeBytes = parseSizeToBytes(sizeToUse);
          
          if (minSizeBytes && customSizeBytes < minSizeBytes) {
            const minSizeStr = formatBytes(minSizeBytes);
            setError(`Size must be at least ${minSizeStr} (size of largest page). Please enter a larger value.`);
            return;
          }
        } catch (err) {
          setError('Invalid size. Please check your input.');
          return;
        }
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const splitResults = await splitBySizeString(file, sizeToUse);
        
        // Generate filenames
        const baseName = file.name.replace(/\.pdf$/i, '');
        const results = splitResults.map((bytes, index) => {
          const filename = `${baseName}_part_${index + 1}_of_${splitResults.length}.pdf`;
          return { bytes, filename };
        });

        console.log(`Split by size successful: ${results.length} files created`);
        results.forEach((r, i) => {
          console.log(`  File ${i + 1}: ${r.filename} (${formatBytes(r.bytes.length)})`);
        });
        
        setSplitPdfResults(results);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error splitting PDF by size:', err);
        setError(err instanceof Error ? err.message : 'Failed to split PDF by size. Please try again.');
        setIsComplete(false);
        setSplitPdfResults(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'sign') {
      // Real sign PDF implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to sign');
        return;
      }

      if (signatureType === 'type' && !typedSignature.trim()) {
        setError('Please enter your signature text');
        return;
      } else if (signatureType !== 'type' && (!signatureData || signatureData.trim().length === 0)) {
        setError('Please create or upload a signature');
        return;
      }

      if (!signaturePage || signaturePage < 1) {
        setError('Please select a page for the signature by clicking "Select Position on PDF"');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const signatureToUse = signatureType === 'type' ? typedSignature : signatureData;
        
        const pdfBytes = await signPdf(file, {
          signatureType: signatureType,
          signatureData: signatureToUse,
          pageNumber: signaturePage,
          x: signatureX,
          y: signatureY,
          fontSize: signatureType === 'type' ? signatureFontSize : undefined,
        });
        
        console.log('Signing successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error signing PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to sign PDF. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'reverse-order') {
      // Real reverse page order implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to reverse page order');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await reversePageOrder(file);
        
        console.log('Reverse page order successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error reversing page order:', err);
        setError(err instanceof Error ? err.message : 'Failed to reverse page order. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'redact') {
      // Real redact PDF implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to redact');
        return;
      }

      if (redactions.length === 0) {
        setError('Please select areas to redact by clicking "Select Areas to Redact"');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const pdfBytes = await redactPdf({
          file,
          redactions,
        });
        
        console.log('Redaction successful, bytes:', pdfBytes.length);
        setProcessedPdfBytes(pdfBytes);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error redacting PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to redact PDF. Please try again.');
        setIsComplete(false);
        setProcessedPdfBytes(null);
      } finally {
        setIsProcessing(false);
      }
    } else if (tool.id === 'split-by-bookmarks') {
      // Real split by bookmarks implementation
      if (files.length === 0) {
        setError('Please upload a PDF file to split by bookmarks');
        return;
      }

      if (!bookmarkInfo || !bookmarkInfo.hasBookmarks) {
        setError('No bookmarks found in PDF. Please ensure your PDF has bookmarks/outline structure.');
        return;
      }

      if (!bookmarkInfo.levels.includes(bookmarkLevel)) {
        setError(`No bookmarks found at level ${bookmarkLevel}. Available levels: ${bookmarkInfo.levels.join(', ')}`);
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const file = files[0];
        const result = await splitByBookmarksSimple(file, bookmarkLevel);
        
        // Generate filenames based on bookmark titles
        const baseName = file.name.replace(/\.pdf$/i, '');
        const results = result.map((bytes, index) => {
          // Use sanitized bookmark title or default name
          const sanitizedTitle = bookmarkInfo.bookmarks?.[index]?.title
            ?.replace(/[^a-zA-Z0-9\s-_]/g, '')
            .trim()
            .substring(0, 50) || `bookmark_${index + 1}`;
          const filename = `${baseName}_${sanitizedTitle}.pdf`;
          return { bytes, filename };
        });

        console.log(`Split by bookmarks successful: ${results.length} files created`);
        results.forEach((r, i) => {
          console.log(`  File ${i + 1}: ${r.filename} (${formatBytes(r.bytes.length)})`);
        });
        
        setSplitPdfResults(results);
        setIsComplete(true);
        setError(null);
      } catch (err) {
        console.error('Error splitting PDF by bookmarks:', err);
        setError(err instanceof Error ? err.message : 'Failed to split PDF by bookmarks. Please try again.');
        setIsComplete(false);
        setSplitPdfResults(null);
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
    setPageRotations({});
    setInsertPosition('end');
    setNumberOfBlankPages(1);
    setAfterPageNumber(1);
    setDuplicatePageRange('');
    setNumberOfCopies(1);
    setMaxFileSize('10 MB');
    setSignatureType('draw');
    setSignatureData('');
    setSignaturePage(1);
    setSignatureX(0.5);
    setSignatureY(0.5);
    setTypedSignature('');
    setSignatureFontSize(24);
    setIsSignaturePadOpen(false);
    setIsPositionSelectorOpen(false);
    setIsRedactSelectorOpen(false);
    setRedactions([]);
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
    } else if (tool.id === 'split' || tool.id === 'split-by-size' || tool.id === 'split-by-bookmarks') {
      if (!splitPdfResults || splitPdfResults.length === 0) {
        console.error('Split PDF results not available');
        setError('Split PDFs are not ready. Please try splitting again.');
        return;
      }
      
      try {
        if (tool.id === 'split') {
          await downloadSplitPdfs(splitPdfResults);
        } else if (tool.id === 'split-by-size') {
          await downloadSplitBySizePdfs(splitPdfResults);
        } else {
          await downloadSplitByBookmarksPdfs(splitPdfResults);
        }
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
    } else if (tool.id === 'rotate') {
      if (!processedPdfBytes) {
        console.error('Rotated PDF bytes not available');
        setError('Rotated PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'rotated';
      const filename = `${baseName}_rotated.pdf`;
      
      try {
        downloadRotatePdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'insert-blank') {
      if (!processedPdfBytes) {
        console.error('Updated PDF bytes not available');
        setError('Updated PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'updated';
      const filename = `${baseName}_updated.pdf`;
      
      try {
        downloadInsertBlankPdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'duplicate-pages') {
      if (!processedPdfBytes) {
        console.error('Updated PDF bytes not available');
        setError('Updated PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'updated';
      const filename = `${baseName}_updated.pdf`;
      
      try {
        downloadDuplicatePdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'sign') {
      if (!processedPdfBytes) {
        console.error('Signed PDF bytes not available');
        setError('Signed PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'signed';
      const filename = `${baseName}_signed.pdf`;
      
      try {
        downloadSignedPdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading signed PDF:', err);
        setError('Failed to download signed PDF. Please try again.');
      }
    } else if (tool.id === 'reverse-order') {
      if (!processedPdfBytes) {
        console.error('Reversed PDF bytes not available');
        setError('Reversed PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'reversed';
      const filename = `${baseName}_reversed.pdf`;
      
      try {
        downloadReversePdf(processedPdfBytes, filename);
      } catch (err) {
        console.error('Error downloading PDF:', err);
        setError('Failed to download PDF. Please try again.');
      }
    } else if (tool.id === 'redact') {
      if (!processedPdfBytes) {
        console.error('Redacted PDF bytes not available');
        setError('Redacted PDF is not ready. Please try again.');
        return;
      }
      
      // Generate filename from input file
      const baseName = files.length > 0 
        ? files[0].name.replace(/\.pdf$/i, '') 
        : 'redacted';
      const filename = `${baseName}_redacted.pdf`;
      
      try {
        downloadRedactedPdf(processedPdfBytes, filename);
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
    <div className="w-full max-w-3xl mx-auto animate-fade-in" >
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
                  ((tool.id === 'split' || tool.id === 'split-by-size' || tool.id === 'split-by-bookmarks') && (!splitPdfResults || splitPdfResults.length === 0)) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !processedPdfBytes) ||
                  (tool.id === 'reorder' && !processedPdfBytes) ||
                  (tool.id === 'rotate' && !processedPdfBytes)
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={handleDownload}
                disabled={
                  (tool.id === 'merge' && !mergedPdfBytes) ||
                  ((tool.id === 'split' || tool.id === 'split-by-size' || tool.id === 'split-by-bookmarks') && (!splitPdfResults || splitPdfResults.length === 0)) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !processedPdfBytes) ||
                  (tool.id === 'reorder' && !processedPdfBytes) ||
                  (tool.id === 'rotate' && !processedPdfBytes)
                }
              >
                <FileText size={20} strokeWidth={2} />
                Download {config.resultLabel}
                {(tool.id === 'split' || tool.id === 'split-by-size' || tool.id === 'split-by-bookmarks') && splitPdfResults && splitPdfResults.length > 0 && (
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
            {(tool.id === 'split' || tool.id === 'split-by-size' || tool.id === 'split-by-bookmarks') && (!splitPdfResults || splitPdfResults.length === 0) && (
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
            {tool.id === 'rotate' && !processedPdfBytes && (
              <p className="text-xs text-warning-400 text-center mt-2">
                Rotated PDF is not ready. Please try again.
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

              {/* Rotate pages */}
              {tool.id === 'rotate' && totalPages && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-medium text-surface-200 mb-2">
                    Rotate Pages
                  </p>
                  <p className="text-xs text-surface-400 mb-3">
                    Select pages and choose rotation angle. Click on thumbnails to preview.
                  </p>
                  <PageRotate
                    totalPages={totalPages}
                    pdfFile={files.length > 0 ? files[0] : null}
                    onChange={setPageRotations}
                  />
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

              {/* Signature settings for sign */}
              {tool.id === 'sign' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-3">Signature Type</p>
                    <div className="flex gap-2">
                      {(['draw', 'type', 'image'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setSignatureType(type);
                            setSignatureData('');
                            setTypedSignature('');
                            if (type !== 'type') {
                              setSignatureFontSize(24);
                            }
                          }}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            signatureType === type 
                              ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' 
                              : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'
                          }`}
                        >
                          {type === 'draw' ? 'Draw' : type === 'type' ? 'Type' : 'Upload Image'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {signatureType === 'draw' && (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setIsSignaturePadOpen(true)}
                        className="w-full px-4 py-3 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-300 hover:bg-primary-500/20 transition-all text-sm font-medium"
                      >
                        {signatureData ? 'Edit Signature' : 'Draw Signature'}
                      </button>
                      {signatureData && (
                        <div className="relative">
                          <img 
                            src={signatureData} 
                            alt="Signature" 
                            className="w-full h-32 object-contain bg-white rounded-lg border border-surface-600/50"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSignatureData('');
                              setIsSignaturePadOpen(false);
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-error-500/20 hover:bg-error-500/30 text-error-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {signatureType === 'type' && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-surface-200 mb-2">Enter Your Name</p>
                        <input
                          type="text"
                          value={typedSignature}
                          onChange={(e) => setTypedSignature(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-200 mb-2">Font Size</p>
                        <input
                          type="number"
                          value={signatureFontSize}
                          onChange={(e) => setSignatureFontSize(Math.max(8, Math.min(72, parseInt(e.target.value) || 24)))}
                          min="8"
                          max="72"
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                        />
                      </div>
                      {typedSignature && (
                        <div className="p-4 rounded-lg border border-surface-600/50 aspect-square flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
                          <p className="font-bold text-black text-center" style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontSize: `${signatureFontSize}px`
                          }}>
                            {typedSignature}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {signatureType === 'image' && (
                    <div className="space-y-3">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const dataUrl = event.target?.result as string;
                                setSignatureData(dataUrl);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <div className="w-full px-4 py-3 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-300 hover:bg-primary-500/20 transition-all text-sm font-medium text-center cursor-pointer">
                          {signatureData ? 'Change Image' : 'Upload Signature Image'}
                        </div>
                      </label>
                      {signatureData && (
                        <div className="relative">
                          <img 
                            src={signatureData} 
                            alt="Signature" 
                            className="w-full h-32 object-contain bg-white rounded-lg border border-surface-600/50"
                          />
                          <button
                            type="button"
                            onClick={() => setSignatureData('')}
                            className="absolute top-2 right-2 p-1 rounded-full bg-error-500/20 hover:bg-error-500/30 text-error-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Position selector */}
                  {files.length > 0 && (signatureData || (signatureType === 'type' && typedSignature.trim())) && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-surface-200 mb-2">Signature Position</p>
                        <button
                          type="button"
                          onClick={() => setIsPositionSelectorOpen(true)}
                          className="w-full px-4 py-3 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-300 hover:bg-primary-500/20 transition-all text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <FileText size={18} />
                          {signaturePage && (signatureX !== 0.5 || signatureY !== 0.5)
                            ? `Page ${signaturePage} - Position (${signatureX.toFixed(2)}, ${signatureY.toFixed(2)})`
                            : 'Select Position on PDF'}
                        </button>
                        {signaturePage && totalPages && (
                          <p className="text-xs text-surface-500 mt-1">
                            Current: Page {signaturePage} of {totalPages} at ({signatureX.toFixed(2)}, {signatureY.toFixed(2)})
                          </p>
                        )}
                        <p className="text-xs text-surface-400 mt-1">
                          Click to open PDF preview and select where to place your signature
                        </p>
                      </div>
                    </div>
                  )}
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
                      {[
                        { label: 'Beginning', value: 'beginning' as const },
                        { label: 'End', value: 'end' as const },
                        { label: 'After Page...', value: 'after' as const }
                      ].map((pos) => (
                        <button
                          key={pos.value}
                          onClick={() => setInsertPosition(pos.value)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            insertPosition === pos.value
                              ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                              : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                    {insertPosition === 'after' && totalPages && (
                      <div className="mt-3">
                        <p className="text-xs text-surface-400 mb-1.5">After which page?</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={afterPageNumber}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) {
                                // Allow typing, but clamp to valid range
                                const clamped = Math.max(1, Math.min(totalPages, val));
                                setAfterPageNumber(clamped);
                              } else if (e.target.value === '') {
                                // Allow empty input while typing
                                setAfterPageNumber(1);
                              }
                            }}
                            onBlur={(e) => {
                              // Ensure valid value on blur
                              const val = parseInt(e.target.value);
                              if (isNaN(val) || val < 1) {
                                setAfterPageNumber(1);
                              } else if (val > totalPages) {
                                setAfterPageNumber(totalPages);
                              }
                            }}
                            min={1}
                            max={totalPages}
                            className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                          />
                          <span className="text-xs text-surface-500">of {totalPages}</span>
                        </div>
                        <p className="text-xs text-surface-500 mt-1.5">
                          Blank pages will be inserted after page {afterPageNumber}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-surface-200">Number of Blank Pages</p>
                      <span className="text-xs text-surface-500">
                        {numberOfBlankPages} {numberOfBlankPages === 1 ? 'page' : 'pages'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={numberOfBlankPages}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            // Allow typing, but clamp to valid range
                            const clamped = Math.max(1, Math.min(100, val));
                            setNumberOfBlankPages(clamped);
                          } else if (e.target.value === '') {
                            // Allow empty input while typing
                            setNumberOfBlankPages(1);
                          }
                        }}
                        onBlur={(e) => {
                          // Ensure valid value on blur
                          const val = parseInt(e.target.value);
                          if (isNaN(val) || val < 1) {
                            setNumberOfBlankPages(1);
                          } else if (val > 100) {
                            setNumberOfBlankPages(100);
                          }
                        }}
                        min={1}
                        max={100}
                        className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => setNumberOfBlankPages(Math.max(1, numberOfBlankPages - 1))}
                          className="px-3 py-1.5 rounded-lg bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                          disabled={numberOfBlankPages <= 1}
                        >
                          −
                        </button>
                        <button
                          onClick={() => setNumberOfBlankPages(Math.min(100, numberOfBlankPages + 1))}
                          className="px-3 py-1.5 rounded-lg bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                          disabled={numberOfBlankPages >= 100}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-surface-500 mt-2">
                      {insertPosition === 'beginning' && `Will add ${numberOfBlankPages} blank ${numberOfBlankPages === 1 ? 'page' : 'pages'} at the beginning of your PDF`}
                      {insertPosition === 'end' && `Will add ${numberOfBlankPages} blank ${numberOfBlankPages === 1 ? 'page' : 'pages'} at the end of your PDF`}
                      {insertPosition === 'after' && totalPages && `Will add ${numberOfBlankPages} blank ${numberOfBlankPages === 1 ? 'page' : 'pages'} after page ${afterPageNumber}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Duplicate pages */}
              {tool.id === 'duplicate-pages' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-surface-200">Select Pages to Duplicate</p>
                      {totalPages && (
                        <span className="text-xs text-surface-500">Total: {totalPages} pages</span>
                      )}
                    </div>
                    {totalPages ? (
                      <PageSelector
                        totalPages={totalPages}
                        value={duplicatePageRange}
                        onChange={setDuplicatePageRange}
                      />
                    ) : (
                      <p className="text-xs text-surface-400">Upload a PDF file to select pages</p>
                    )}
                    <p className="text-xs text-surface-500 mt-3">
                      Each selected page will be duplicated right after its original in the PDF.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-surface-200">Number of Copies</p>
                      <span className="text-xs text-surface-500">
                        {numberOfCopies} {numberOfCopies === 1 ? 'copy' : 'copies'} per page
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={numberOfCopies}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            const clamped = Math.max(1, Math.min(10, val));
                            setNumberOfCopies(clamped);
                          } else if (e.target.value === '') {
                            setNumberOfCopies(1);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (isNaN(val) || val < 1) {
                            setNumberOfCopies(1);
                          } else if (val > 10) {
                            setNumberOfCopies(10);
                          }
                        }}
                        min={1}
                        max={10}
                        className="w-24 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => setNumberOfCopies(Math.max(1, numberOfCopies - 1))}
                          className="px-3 py-1.5 rounded-lg bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                          disabled={numberOfCopies <= 1}
                        >
                          −
                        </button>
                        <button
                          onClick={() => setNumberOfCopies(Math.min(10, numberOfCopies + 1))}
                          className="px-3 py-1.5 rounded-lg bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                          disabled={numberOfCopies >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {duplicatePageRange && totalPages && (() => {
                      try {
                        const pages = parsePageRange(duplicatePageRange, totalPages);
                        const totalNewPages = pages.length * numberOfCopies;
                        return pages.length > 0 ? (
                          <p className="text-xs text-primary-400 mt-2 font-medium">
                            ✓ Will create {totalNewPages} duplicate {totalNewPages === 1 ? 'page' : 'pages'} ({pages.length} original {pages.length === 1 ? 'page' : 'pages'} × {numberOfCopies} {numberOfCopies === 1 ? 'copy' : 'copies'})
                          </p>
                        ) : null;
                      } catch {
                        return null;
                      }
                    })()}
                  </div>
                </div>
              )}

              {/* Split by size */}
              {tool.id === 'split-by-size' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-3">Max File Size Per Part</p>
                    
                    {/* Quick presets */}
                    <div className="mb-4">
                      <p className="text-xs text-surface-400 mb-2">Quick presets:</p>
                      <div className="flex flex-wrap gap-2">
                        {['5 MB', '10 MB', '25 MB', '50 MB', '100 MB'].map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setMaxFileSize(s);
                              setUseCustomSize(false);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              !useCustomSize && maxFileSize === s
                                ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                                : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Custom size input */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-surface-300">Or set custom size:</p>
                        <button
                          onClick={() => setUseCustomSize(!useCustomSize)}
                          className={`text-xs px-3 py-1 rounded-lg transition-all ${
                            useCustomSize
                              ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40'
                              : 'bg-surface-700/30 text-surface-400 border border-surface-600/30 hover:bg-surface-700/50'
                          }`}
                        >
                          {useCustomSize ? 'Using Custom' : 'Use Custom'}
                        </button>
                      </div>
                      
                      {useCustomSize && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={customSizeValue}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) > 0)) {
                                  setCustomSizeValue(val);
                                }
                              }}
                              min="0.1"
                              step="0.1"
                              placeholder="10"
                              className="flex-1 px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                            />
                            <select
                              value={customSizeUnit}
                              onChange={(e) => setCustomSizeUnit(e.target.value)}
                              className="px-4 py-2.5 rounded-lg bg-surface-900/50 border border-surface-600/50 text-surface-200 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                            >
                              <option value="KB">KB</option>
                              <option value="MB">MB</option>
                              <option value="GB">GB</option>
                            </select>
                          </div>
                          
                          {/* Validation feedback */}
                          {customSizeValue && (() => {
                            try {
                              const sizeNum = parseFloat(customSizeValue);
                              if (isNaN(sizeNum) || sizeNum <= 0) {
                                return (
                                  <p className="text-xs text-error-400">
                                    ⚠ Please enter a valid number
                                  </p>
                                );
                              }
                              
                              const customSizeStr = `${customSizeValue} ${customSizeUnit}`;
                              const customSizeBytes = parseSizeToBytes(customSizeStr);
                              const isValid = !minSizeBytes || customSizeBytes >= minSizeBytes;
                              
                              if (!isValid && minSizeBytes) {
                                return (
                                  <p className="text-xs text-error-400">
                                    ⚠ Size must be at least {formatBytes(minSizeBytes)} (largest page size)
                                  </p>
                                );
                              }
                              
                              return (
                                <p className="text-xs text-primary-400">
                                  ✓ Valid size: {customSizeStr}
                                </p>
                              );
                            } catch {
                              return (
                                <p className="text-xs text-error-400">
                                  ⚠ Invalid size
                                </p>
                              );
                            }
                          })()}
                        </div>
                      )}
                    </div>
                    
                    {/* File info and preview */}
                    {files.length > 0 && (
                      <div className="p-3 rounded-lg bg-surface-900/50 border border-surface-700/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-surface-400">Original file size:</span>
                          <span className="text-xs font-medium text-surface-200">{formatBytes(files[0].size)}</span>
                        </div>
                        
                        {minSizeBytes && (
                          <div className="flex items-center justify-between pt-2 border-t border-surface-700/50">
                            <span className="text-xs text-surface-400">Minimum size (largest page):</span>
                            <span className="text-xs font-medium text-warning-400">{formatBytes(minSizeBytes)}</span>
                          </div>
                        )}
                        
                        {files[0].size > 0 && (() => {
                          try {
                            const sizeToUse = useCustomSize 
                              ? `${customSizeValue} ${customSizeUnit}`
                              : maxFileSize;
                            const maxBytes = parseSizeToBytes(sizeToUse);
                            const estimatedParts = Math.ceil(files[0].size / maxBytes);
                            
                            if (estimatedParts === 1) {
                              return (
                                <div className="flex items-center justify-between pt-2 border-t border-surface-700/50">
                                  <span className="text-xs text-surface-400">Result:</span>
                                  <span className="text-xs font-medium text-success-400">
                                    ✓ File fits in one part ({sizeToUse})
                                  </span>
                                </div>
                              );
                            }
                            
                            return (
                              <div className="flex items-center justify-between pt-2 border-t border-surface-700/50">
                                <span className="text-xs text-surface-400">Estimated parts:</span>
                                <span className="text-xs font-medium text-primary-400">
                                  {estimatedParts} {estimatedParts === 1 ? 'file' : 'files'} (max {sizeToUse} each)
                                </span>
                              </div>
                            );
                          } catch {
                            return null;
                          }
                        })()}
                      </div>
                    )}
                    
                    <p className="text-xs text-surface-500 mt-3">
                      PDF will be split into multiple files, each not exceeding the selected size. Useful for email attachments or file size limits.
                    </p>
                  </div>
                </div>
              )}

              {/* Split by bookmarks */}
              {tool.id === 'split-by-bookmarks' && (
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-3">Split at Bookmark Level</p>
                    
                    {!bookmarkInfo && files.length > 0 && (
                      <p className="text-xs text-surface-400 mb-3">Loading bookmark information...</p>
                    )}
                    
                    {bookmarkInfo && !bookmarkInfo.hasBookmarks && (
                      <div className="p-3 rounded-lg bg-error-500/10 border border-error-500/20">
                        <p className="text-xs text-error-400 font-medium mb-1">⚠ No bookmarks found</p>
                        <p className="text-xs text-surface-400">
                          This PDF does not have bookmarks/outline structure. Please use a PDF with bookmarks or try a different tool.
                        </p>
                      </div>
                    )}
                    
                    {bookmarkInfo && bookmarkInfo.hasBookmarks && (
                      <>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-surface-400">Available levels:</p>
                            <span className="text-xs font-medium text-primary-400">
                              {bookmarkInfo.count} {bookmarkInfo.count === 1 ? 'bookmark' : 'bookmarks'} found
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bookmarkInfo.levels.map((level) => {
                              const levelNames: { [key: number]: string } = {
                                1: 'Level 1 (Chapters)',
                                2: 'Level 2 (Sections)',
                                3: 'Level 3 (Sub-sections)',
                                4: 'Level 4',
                                5: 'Level 5',
                              };
                              const levelName = levelNames[level] || `Level ${level}`;
                              const countAtLevel = bookmarkInfo.bookmarks?.filter(b => b.level === level).length || 0;
                              
                              return (
                                <button
                                  key={level}
                                  onClick={() => setBookmarkLevel(level)}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    bookmarkLevel === level
                                      ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                                      : 'bg-surface-700/30 border border-surface-600/30 text-surface-400 hover:bg-surface-700/50'
                                  }`}
                                >
                                  {levelName}
                                  {countAtLevel > 0 && (
                                    <span className="ml-2 text-xs opacity-75">({countAtLevel})</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                        {bookmarkInfo.bookmarks && bookmarkInfo.bookmarks.length > 0 && (
                          <div className="p-3 rounded-lg bg-surface-900/50 border border-surface-700/50 max-h-48 overflow-y-auto">
                            <p className="text-xs text-surface-400 mb-2">Bookmarks at level {bookmarkLevel}:</p>
                            <div className="space-y-1">
                              {bookmarkInfo.bookmarks
                                .filter(b => b.level === bookmarkLevel)
                                .slice(0, 10)
                                .map((bookmark, idx) => (
                                  <div key={idx} className="text-xs text-surface-300 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                                    <span className="truncate">{bookmark.title}</span>
                                    <span className="text-surface-500">(page {bookmark.pageIndex + 1})</span>
                                  </div>
                                ))}
                              {bookmarkInfo.bookmarks.filter(b => b.level === bookmarkLevel).length > 10 && (
                                <p className="text-xs text-surface-500 mt-1">
                                  ... and {bookmarkInfo.bookmarks.filter(b => b.level === bookmarkLevel).length - 10} more
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <p className="text-xs text-surface-500 mt-3">
                          PDF will be split at each bookmark of level {bookmarkLevel}. Each bookmark will create a separate PDF file.
                        </p>
                      </>
                    )}
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
                  <div>
                    <p className="text-sm font-medium text-surface-200 mb-2">Select Areas to Redact</p>
                    <p className="text-xs text-surface-400 mb-3">
                      Click "Select Areas" to draw rectangles over sensitive information that should be permanently blacked out.
                    </p>
                    <button
                      onClick={() => setIsRedactSelectorOpen(true)}
                      className="w-full px-4 py-2.5 rounded-lg bg-error-500/20 border border-error-500/40 text-error-300 hover:bg-error-500/30 transition-colors text-sm font-medium"
                    >
                      Select Areas to Redact
                    </button>
                  </div>
                  {redactions.length > 0 && (
                    <div className="p-3 rounded-lg bg-surface-900/50 border border-surface-600/50">
                      <p className="text-xs text-surface-300 mb-1">
                        {redactions.length} redaction area{redactions.length !== 1 ? 's' : ''} selected
                      </p>
                      <button
                        onClick={() => setRedactions([])}
                        className="text-xs text-error-400 hover:text-error-300 transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
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
                  (tool.id === 'split-by-size' && files.length === 0) ||
                  (tool.id === 'split-by-bookmarks' && (!bookmarkInfo || !bookmarkInfo.hasBookmarks)) ||
                  ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !pageRange.trim()) ||
                  (tool.id === 'reorder' && (!totalPages || pageOrder.length === 0)) ||
                  (tool.id === 'rotate' && (!totalPages || Object.keys(pageRotations).length === 0))
                }
                className={`
                  w-full btn-primary btn-lg font-semibold justify-center
                  ${isProcessing ? 'opacity-75 cursor-wait' : ''}
                  ${(config.acceptMultiple && files.length < 2) || (tool.id === 'split' && !pageRange.trim()) || (tool.id === 'split-by-size' && files.length === 0) || ((tool.id === 'delete-pages' || tool.id === 'extract-pages') && !pageRange.trim()) || (tool.id === 'reorder' && (!totalPages || pageOrder.length === 0)) || (tool.id === 'rotate' && (!totalPages || Object.keys(pageRotations).length === 0)) ? 'opacity-50 cursor-not-allowed' : ''}
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

      {/* Signature Pad Modal */}
      {tool.id === 'sign' && isSignaturePadOpen && (
        <SignaturePad
          isOpen={isSignaturePadOpen}
          onClose={() => setIsSignaturePadOpen(false)}
          onSave={(dataUrl) => {
            setSignatureData(dataUrl);
            setIsSignaturePadOpen(false);
            // Automatically open position selector after saving signature
            if (files.length > 0) {
              setTimeout(() => {
                setIsPositionSelectorOpen(true);
              }, 100);
            }
          }}
          position={{ x: signatureX, y: signatureY }}
          pageWidth={800}
          pageHeight={1000}
          zoom={1}
        />
      )}

      {/* Signature Position Selector */}
      {tool.id === 'sign' && isPositionSelectorOpen && files.length > 0 && (
        <SignaturePositionSelector
          isOpen={isPositionSelectorOpen}
          onClose={() => setIsPositionSelectorOpen(false)}
          pdfFile={files[0]}
          signatureData={
            signatureType === 'type' 
              ? (() => {
                  // Create a temporary canvas for typed signature preview
                  const canvas = document.createElement('canvas');
                  canvas.width = 400;
                  canvas.height = 150;
                  const ctx = canvas.getContext('2d');
                  if (ctx && typedSignature) {
                    // Transparent background
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#000000';
                    ctx.font = `${signatureFontSize * 2}px Helvetica, Arial, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);
                    return canvas.toDataURL();
                  }
                  return '';
                })()
              : signatureData
          }
          signatureType={signatureType}
          onPositionSelected={(pageNumber, x, y) => {
            setSignaturePage(pageNumber);
            setSignatureX(x);
            setSignatureY(y);
            setIsPositionSelectorOpen(false);
          }}
        />
      )}

      {/* Redact Selector */}
      {tool.id === 'redact' && isRedactSelectorOpen && files.length > 0 && (
        <RedactSelector
          isOpen={isRedactSelectorOpen}
          onClose={() => setIsRedactSelectorOpen(false)}
          pdfFile={files[0]}
          onRedactionsSelected={(newRedactions) => {
            setRedactions(newRedactions);
            setIsRedactSelectorOpen(false);
          }}
        />
      )}
    </div>
  );
}
