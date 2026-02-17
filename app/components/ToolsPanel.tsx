'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToolView from './ToolView';
import {
  // Organize & Pages
  FilePlus2, Scissors, Trash2, FileOutput, GripVertical, RotateCw,
  FileUp, Copy, ArrowDownUp, HardDrive, Bookmark,
  // Security & Protection
  Lock, LockOpen, PenTool, EyeOff, SlidersHorizontal, ShieldAlert,
  Award,
  // Convert
  Image, FileImage, FileText, Table, AlignLeft, TableProperties,
  Code, Hash, Presentation, Globe, FileUp as FileUpload, Sheet,
  // Edit & Enhance
  Minimize2, Droplets, ListOrdered, PanelTop, Palette, Crop,
  Maximize2, Contrast, Moon, Layers, MessageSquareX,
  // Content & Media
  ImageDown, ImageOff, Zap, QrCode, ScanBarcode, BookMarked,
  Link2, Paperclip,
  // Forms & Signing
  PenLine, Stamp, Binary, ListChecks,
  // OCR & Text
  ScanText, Search,
  // Analyze & Optimize
  GitCompareArrows, Wrench, Info, BarChart3, Bolt, Paintbrush,
  Users, Archive, Printer, BadgeCheck,
} from 'lucide-react';

export interface PdfTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  comingSoon?: boolean;
}

interface ToolCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  tools: PdfTool[];
}

const ICON_SIZE = 24;
const ICON_STROKE = 1.75;

const toolCategories: ToolCategory[] = [
  // ═══════════════════════════════════════════
  // 1. ORGANIZE & PAGES
  // ═══════════════════════════════════════════
  {
    id: 'organize',
    title: 'Organize & Pages',
    icon: <GripVertical size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'merge', title: 'Merge PDF', description: 'Combine multiple PDF files into one document', color: 'primary',
        icon: <FilePlus2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'split', title: 'Split PDF', description: 'Split a PDF into separate files by page ranges', color: 'accent',
        icon: <Scissors size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'delete-pages', title: 'Delete Pages', description: 'Remove specific pages from your PDF', color: 'error',
        icon: <Trash2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'extract-pages', title: 'Extract Pages', description: 'Extract specific pages into a new PDF', color: 'info',
        icon: <FileOutput size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'reorder', title: 'Reorder Pages', description: 'Drag & drop to rearrange PDF pages', color: 'primary',
        icon: <GripVertical size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'rotate', title: 'Rotate Pages', description: 'Rotate all or specific pages in your PDF', color: 'warning',
        icon: <RotateCw size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'insert-blank', title: 'Insert Blank Pages', description: 'Add empty pages at specific positions', color: 'accent',
        icon: <FileUp size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'duplicate-pages', title: 'Duplicate Pages', description: 'Duplicate specific pages within a PDF', color: 'success',
        icon: <Copy size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'reverse-order', title: 'Reverse Page Order', description: 'Flip the order of all pages in your PDF', color: 'info',
        icon: <ArrowDownUp size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'split-by-size', title: 'Split by Size', description: 'Split PDF so each part fits a size limit (e.g. 10 MB)', color: 'warning',
        icon: <HardDrive size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'split-by-bookmarks', title: 'Split by Bookmarks', description: 'Split PDF based on bookmark/chapter structure', color: 'error',
        icon: <Bookmark size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 2. SECURITY & PROTECTION
  // ═══════════════════════════════════════════
  {
    id: 'security',
    title: 'Security & Protection',
    icon: <Lock size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'sign', title: 'Digital Signature', description: 'Add a digital signature or e-sign your PDF', color: 'primary',
        icon: <PenTool size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'redact', title: 'Redact PDF', description: 'Permanently black out sensitive information', color: 'error',
        icon: <EyeOff size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'remove-hidden-data', title: 'Sanitize PDF', description: 'Remove hidden data, metadata, scripts for safe sharing', color: 'accent',
        icon: <ShieldAlert size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'certificate', title: 'Certificate Sign', description: 'Sign PDF with X.509 digital certificate', color: 'accent',
        icon: <Award size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 3. CONVERT
  // ═══════════════════════════════════════════
  {
    id: 'convert',
    title: 'Convert',
    icon: <ArrowDownUp size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'pdf-to-images', title: 'PDF to Images', description: 'Convert PDF pages to PNG, JPEG, or WebP', color: 'accent',
        icon: <Image size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'images-to-pdf', title: 'Images to PDF', description: 'Combine images (PNG, JPEG, WebP) into a PDF', color: 'primary',
        icon: <FileImage size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-word', title: 'PDF to Word', description: 'Convert PDF to editable DOCX document', color: 'info',
        icon: <FileText size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-excel', title: 'PDF to Excel', description: 'Extract tables from PDF to XLSX spreadsheet', color: 'success',
        icon: <Table size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-text', title: 'PDF to Text', description: 'Extract all text content from PDF to TXT', color: 'accent',
        icon: <AlignLeft size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-csv', title: 'PDF to CSV', description: 'Extract tabular data from PDF to CSV files', color: 'success',
        icon: <TableProperties size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-html', title: 'PDF to HTML', description: 'Convert PDF document to a web page', color: 'error',
        icon: <Code size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-markdown', title: 'PDF to Markdown', description: 'Convert PDF content to Markdown format', color: 'primary',
        icon: <Hash size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-to-pptx', title: 'PDF to PowerPoint', description: 'Convert PDF pages to PPTX presentation', color: 'warning', comingSoon: true,
        icon: <Presentation size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'html-to-pdf', title: 'HTML to PDF', description: 'Convert any webpage or HTML file to PDF', color: 'error', comingSoon: true,
        icon: <Globe size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'word-to-pdf', title: 'Word to PDF', description: 'Convert DOCX / DOC documents to PDF', color: 'info', comingSoon: true,
        icon: <FileUp size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'excel-to-pdf', title: 'Excel to PDF', description: 'Convert XLSX spreadsheets to PDF', color: 'success', comingSoon: true,
        icon: <Sheet size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 4. EDIT & ENHANCE
  // ═══════════════════════════════════════════
  {
    id: 'edit',
    title: 'Edit & Enhance',
    icon: <PenLine size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'compress', title: 'Compress PDF', description: 'Reduce file size while maintaining quality', color: 'success', comingSoon: true,
        icon: <Minimize2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-watermark', title: 'Add Watermark', description: 'Overlay text or image watermark on pages', color: 'info', comingSoon: true,
        icon: <Droplets size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'page-numbers', title: 'Add Page Numbers', description: 'Insert page numbers with custom positioning', color: 'primary', comingSoon: true,
        icon: <ListOrdered size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'crop', title: 'Crop Pages', description: 'Crop or trim PDF page margins', color: 'error', comingSoon: true,
        icon: <Crop size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'resize', title: 'Resize Pages', description: 'Change page size (A4, Letter, custom)', color: 'info', comingSoon: true,
        icon: <Maximize2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'grayscale', title: 'Grayscale PDF', description: 'Convert colored PDF to black & white', color: 'primary', comingSoon: true,
        icon: <Contrast size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'invert-colors', title: 'Invert Colors', description: 'Invert PDF colors for dark mode reading', color: 'accent', comingSoon: true,
        icon: <Moon size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'flatten', title: 'Flatten PDF', description: 'Flatten form fields and annotations into content', color: 'warning', comingSoon: true,
        icon: <Layers size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'remove-annotations', title: 'Remove Annotations', description: 'Strip all comments, highlights, and notes', color: 'error', comingSoon: true,
        icon: <MessageSquareX size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 5. CONTENT & MEDIA
  // ═══════════════════════════════════════════
  {
    id: 'content',
    title: 'Content & Media',
    icon: <Image size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'extract-images', title: 'Extract Images', description: 'Pull out all embedded images from a PDF', color: 'accent', comingSoon: true,
        icon: <ImageDown size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'remove-images', title: 'Remove Images', description: 'Strip all images from PDF, keep text only', color: 'error', comingSoon: true,
        icon: <ImageOff size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'optimize-images', title: 'Optimize Images', description: 'Downscale and optimize images inside PDF', color: 'success', comingSoon: true,
        icon: <Zap size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-qr-code', title: 'Add QR Code', description: 'Insert QR codes with links or text onto pages', color: 'primary', comingSoon: true,
        icon: <QrCode size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-barcode', title: 'Add Barcode', description: 'Insert barcodes (Code128, EAN, UPC) into PDF', color: 'warning', comingSoon: true,
        icon: <ScanBarcode size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-bookmarks', title: 'Add Bookmarks', description: 'Create or edit bookmarks and table of contents', color: 'info', comingSoon: true,
        icon: <BookMarked size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-hyperlinks', title: 'Add Hyperlinks', description: 'Add or edit clickable links in your PDF', color: 'accent', comingSoon: true,
        icon: <Link2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'add-attachments', title: 'Embed Attachments', description: 'Embed files (images, docs, data) inside PDF', color: 'primary', comingSoon: true,
        icon: <Paperclip size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 6. FORMS & SIGNING
  // ═══════════════════════════════════════════
  {
    id: 'forms',
    title: 'Forms & Signing',
    icon: <PenLine size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'fill-sign', title: 'Fill & Sign', description: 'Fill out forms and add your signature', color: 'primary', comingSoon: true,
        icon: <PenLine size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'stamp', title: 'Add Stamp', description: 'Place stamps: Approved, Draft, Confidential, etc.', color: 'error', comingSoon: true,
        icon: <Stamp size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'bates-numbering', title: 'Bates Numbering', description: 'Add sequential Bates numbers for legal documents', color: 'warning', comingSoon: true,
        icon: <Binary size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'create-form', title: 'Create Form', description: 'Add interactive form fields to PDF', color: 'accent', comingSoon: true,
        icon: <ListChecks size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 7. OCR & TEXT
  // ═══════════════════════════════════════════
  {
    id: 'ocr',
    title: 'OCR & Text',
    icon: <ScanText size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'ocr', title: 'OCR — Text Recognition', description: 'Extract text from scanned documents & images', color: 'warning', comingSoon: true,
        icon: <ScanText size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'searchable-pdf', title: 'Make Searchable', description: 'Convert scanned PDF into searchable text layer', color: 'info', comingSoon: true,
        icon: <Search size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },

  // ═══════════════════════════════════════════
  // 8. ANALYZE & OPTIMIZE
  // ═══════════════════════════════════════════
  {
    id: 'analyze',
    title: 'Analyze & Optimize',
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
    tools: [
      {
        id: 'compare', title: 'Compare PDFs', description: 'Highlight differences between two PDF files', color: 'accent', comingSoon: true,
        icon: <GitCompareArrows size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'repair', title: 'Repair PDF', description: 'Fix corrupted or damaged PDF files', color: 'error', comingSoon: true,
        icon: <Wrench size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'metadata', title: 'Edit Metadata', description: 'View & edit title, author, keywords, dates', color: 'primary', comingSoon: true,
        icon: <Info size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdf-statistics', title: 'PDF Statistics', description: 'Count pages, words, images, fonts, file breakdown', color: 'info', comingSoon: true,
        icon: <BarChart3 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'linearize', title: 'Linearize (Fast Web)', description: 'Optimize PDF for fast web viewing', color: 'success', comingSoon: true,
        icon: <Bolt size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'color-space', title: 'Convert Color Space', description: 'Convert between RGB and CMYK for print', color: 'warning', comingSoon: true,
        icon: <Paintbrush size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'accessibility', title: 'Accessibility Check', description: 'Check PDF for WCAG / Section 508 compliance', color: 'accent', comingSoon: true,
        icon: <Users size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdfa', title: 'PDF/A Conversion', description: 'Convert to PDF/A archival standard', color: 'success', comingSoon: true,
        icon: <Archive size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'pdfx', title: 'PDF/X (Print-Ready)', description: 'Convert to PDF/X standard for professional print', color: 'warning', comingSoon: true,
        icon: <Printer size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
      {
        id: 'validate', title: 'Validate PDF', description: 'Check PDF structure, compliance, and integrity', color: 'primary', comingSoon: true,
        icon: <BadgeCheck size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
      },
    ],
  },
];

// Flatten all tools for lookup
export const allTools = toolCategories.flatMap(c => c.tools);

// Export toolCategories for use in routes
export { toolCategories };

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string; hoverBorder: string }> = {
  primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20', text: 'text-primary-400', iconBg: 'bg-primary-500/15', hoverBorder: 'hover:border-primary-500/40' },
  accent:  { bg: 'bg-accent-500/5',  border: 'border-accent-500/20',  text: 'text-accent-400',  iconBg: 'bg-accent-500/15',  hoverBorder: 'hover:border-accent-500/40' },
  success: { bg: 'bg-success-500/5', border: 'border-success-500/20', text: 'text-success-400', iconBg: 'bg-success-500/15', hoverBorder: 'hover:border-success-500/40' },
  error:   { bg: 'bg-error-500/5',   border: 'border-error-500/20',   text: 'text-error-400',   iconBg: 'bg-error-500/15',   hoverBorder: 'hover:border-error-500/40' },
  warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20', text: 'text-warning-400', iconBg: 'bg-warning-500/15', hoverBorder: 'hover:border-warning-500/40' },
  info:    { bg: 'bg-info-500/5',    border: 'border-info-500/20',    text: 'text-info-400',    iconBg: 'bg-info-500/15',    hoverBorder: 'hover:border-info-500/40' },
};

export default function ToolsPanel() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = activeCategory
    ? toolCategories.filter(c => c.id === activeCategory)
    : toolCategories;

  const totalTools = allTools.length;
  const availableTools = allTools.filter(t => !t.comingSoon).length;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">PDF Tools</h2>
        <p className="text-surface-400 text-base max-w-2xl mx-auto mb-4">
          {totalTools} specialized tools for every PDF task. All processing happens locally in your browser.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-surface-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success-500"></span>
            {availableTools} available
          </span>
          <span className="text-surface-700">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-surface-600"></span>
            {totalTools - availableTools} coming soon
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${!activeCategory ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300 shadow-sm' : 'bg-surface-800/40 border border-surface-700/50 text-surface-400 hover:text-surface-200 hover:border-surface-600/50'}`}
        >
          All Tools
        </button>
        {toolCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300 shadow-sm' : 'bg-surface-800/40 border border-surface-700/50 text-surface-400 hover:text-surface-200 hover:border-surface-600/50'}`}
          >
            {cat.icon}
            <span className="hidden sm:inline">{cat.title}</span>
            <span className="sm:hidden">{cat.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Categories & Tools */}
      <div className="space-y-10">
        {visibleCategories.map(category => (
          <div key={category.id} className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-surface-300">
                {category.icon}
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex-1 h-px bg-surface-700/50"></div>
              <span className="text-xs text-surface-500 font-medium">{category.tools.length} tools</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool, index) => {
                const colors = colorMap[tool.color] || colorMap.primary;
                const commonProps = {
                  className: `relative group text-left p-5 rounded-2xl border transition-all duration-200 ${colors.bg} ${colors.border} ${colors.hoverBorder} ${tool.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer'} animate-fade-in-up`,
                  style: { animationDelay: `${index * 40}ms` } as React.CSSProperties,
                };
                
                const content = (
                  <>
                    {tool.comingSoon && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-surface-700/80 border border-surface-600/50 text-[10px] font-semibold text-surface-300 uppercase tracking-wider">Soon</div>
                    )}
                    <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-3 ${colors.text} transition-transform duration-200 group-hover:scale-110`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-surface-100">{tool.title}</h3>
                    <p className="text-sm text-surface-400 leading-relaxed">{tool.description}</p>
                    {!tool.comingSoon && (
                      <div className={`absolute bottom-4 right-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      </div>
                    )}
                  </>
                );
                
                return tool.comingSoon ? (
                  <div key={tool.id} {...commonProps}>
                    {content}
                  </div>
                ) : (
                  <Link key={tool.id} href={`/tools/${tool.id}`} {...commonProps}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <div className="mt-10 flex items-center justify-center gap-2 text-xs text-surface-500">
        <Lock size={14} strokeWidth={2} />
        <span>All tools process files locally — your documents never leave your device</span>
      </div>
    </div>
  );
}
