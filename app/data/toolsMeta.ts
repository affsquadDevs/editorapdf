/**
 * Lightweight tool metadata for server-side use (generateMetadata).
 * No React icons — safe to import in Server Components.
 * Keep titles/descriptions in sync with ToolsPanel.tsx.
 */

export interface ToolMeta {
  id: string;
  title: string;
  description: string;
}

export const toolsMeta: Record<string, ToolMeta> = {
  // Organize & Pages
  'merge':             { id: 'merge',             title: 'Merge PDF',              description: 'Combine multiple PDF files into one document' },
  'split':             { id: 'split',             title: 'Split PDF',              description: 'Split a PDF into separate files by page ranges' },
  'delete-pages':      { id: 'delete-pages',      title: 'Delete Pages',           description: 'Remove specific pages from your PDF' },
  'extract-pages':     { id: 'extract-pages',     title: 'Extract Pages',          description: 'Extract specific pages into a new PDF' },
  'reorder':           { id: 'reorder',           title: 'Reorder Pages',          description: 'Drag & drop to rearrange PDF pages' },
  'rotate':            { id: 'rotate',            title: 'Rotate Pages',           description: 'Rotate all or specific pages in your PDF' },
  'insert-blank':      { id: 'insert-blank',      title: 'Insert Blank Pages',     description: 'Add empty pages at specific positions' },
  'duplicate-pages':   { id: 'duplicate-pages',   title: 'Duplicate Pages',        description: 'Duplicate specific pages within a PDF' },
  'reverse-order':     { id: 'reverse-order',     title: 'Reverse Page Order',     description: 'Flip the order of all pages in your PDF' },
  'split-by-size':     { id: 'split-by-size',     title: 'Split by Size',          description: 'Split PDF so each part fits a size limit' },
  'split-by-bookmarks':{ id: 'split-by-bookmarks',title: 'Split by Bookmarks',     description: 'Split PDF based on bookmark/chapter structure' },
  // Security & Protection
  'sign':              { id: 'sign',              title: 'Digital Signature',      description: 'Add a digital signature or e-sign your PDF' },
  'redact':            { id: 'redact',            title: 'Redact PDF',             description: 'Permanently black out sensitive information' },
  'remove-hidden-data':{ id: 'remove-hidden-data',title: 'Sanitize PDF',           description: 'Remove hidden data, metadata, and scripts for safe sharing' },
  'certificate':       { id: 'certificate',       title: 'Certificate Sign',       description: 'Sign PDF with X.509 digital certificate' },
  // Convert
  'pdf-to-images':     { id: 'pdf-to-images',     title: 'PDF to Images',          description: 'Convert PDF pages to PNG, JPEG, or WebP' },
  'images-to-pdf':     { id: 'images-to-pdf',     title: 'Images to PDF',          description: 'Combine images (PNG, JPEG, WebP) into a PDF' },
  'pdf-to-word':       { id: 'pdf-to-word',       title: 'PDF to Word',            description: 'Convert PDF to editable DOCX document' },
  'pdf-to-excel':      { id: 'pdf-to-excel',      title: 'PDF to Excel',           description: 'Extract tables from PDF to XLSX spreadsheet' },
  'pdf-to-text':       { id: 'pdf-to-text',       title: 'PDF to Text',            description: 'Extract all text content from PDF to TXT' },
  'pdf-to-csv':        { id: 'pdf-to-csv',        title: 'PDF to CSV',             description: 'Extract tabular data from PDF to CSV files' },
  'pdf-to-html':       { id: 'pdf-to-html',       title: 'PDF to HTML',            description: 'Convert PDF document to a web page' },
  'pdf-to-markdown':   { id: 'pdf-to-markdown',   title: 'PDF to Markdown',        description: 'Convert PDF content to Markdown format' },
  // Edit & Enhance
  'compress':          { id: 'compress',          title: 'Compress PDF',           description: 'Reduce file size while maintaining quality' },
  'add-watermark':     { id: 'add-watermark',     title: 'Add Watermark',          description: 'Overlay text or image watermark on pages' },
  'page-numbers':      { id: 'page-numbers',      title: 'Add Page Numbers',       description: 'Insert page numbers with custom positioning' },
  'crop':              { id: 'crop',              title: 'Crop Pages',             description: 'Crop or trim PDF page margins' },
  'resize':            { id: 'resize',            title: 'Resize Pages',           description: 'Change page size (A4, Letter, custom)' },
  'grayscale':         { id: 'grayscale',         title: 'Grayscale PDF',          description: 'Convert colored PDF to black & white' },
  'invert-colors':     { id: 'invert-colors',     title: 'Invert Colors',          description: 'Invert PDF colors for dark mode reading' },
  'flatten':           { id: 'flatten',           title: 'Flatten PDF',            description: 'Flatten form fields and annotations into content' },
  'remove-annotations':{ id: 'remove-annotations',title: 'Remove Annotations',     description: 'Strip all comments, highlights, and notes' },
  // Content & Media
  'extract-images':    { id: 'extract-images',    title: 'Extract Images',         description: 'Pull out all embedded images from a PDF' },
  'remove-images':     { id: 'remove-images',     title: 'Remove Images',          description: 'Strip all images from PDF, keep text only' },
  'optimize-images':   { id: 'optimize-images',   title: 'Optimize Images',        description: 'Downscale and optimize images inside PDF' },
  'add-qr-code':       { id: 'add-qr-code',       title: 'Add QR Code',            description: 'Insert QR codes with links or text onto pages' },
  'add-barcode':       { id: 'add-barcode',       title: 'Add Barcode',            description: 'Insert barcodes (Code128, EAN, UPC) into PDF' },
  'add-bookmarks':     { id: 'add-bookmarks',     title: 'Add Bookmarks',          description: 'Create or edit bookmarks and table of contents' },
  'add-hyperlinks':    { id: 'add-hyperlinks',    title: 'Add Hyperlinks',         description: 'Add or edit clickable links in your PDF' },
  'add-attachments':   { id: 'add-attachments',   title: 'Embed Attachments',      description: 'Embed files (images, docs, data) inside PDF' },
};
