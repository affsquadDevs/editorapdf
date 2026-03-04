'use client'

import Link from 'next/link'
import Script from 'next/script'
import Header from '../components/Header'
import {
  FilePlus2, Scissors, GripVertical, RotateCw, Trash2,
  Lock, LockOpen, PenTool, EyeOff, Shield,
  Image, FileText, Table, Code, AlignLeft,
  Minimize2, Droplets, PenLine, QrCode, Info,
  ArrowRight, Zap, Globe, Sparkles, CheckCircle,
  X, Search, PenSquare, Layers,
  Download, Upload, Eye, Key, Lock,
  Image, Sheet, Code2, FileText as TypeIcon,
  Compress, ImageDown, Bookmark, Link2,
  Stamp, BarChart3, Settings,
} from 'lucide-react'

const siteUrl = 'https://editorapdf.com'

export default function HowItWorksPage() {
  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use EditoraPDF - Complete Guide',
    description: 'Step-by-step guide to using EditoraPDF, a free browser-based PDF editor with 55+ tools',
    image: `${siteUrl}/og/og-image.png`,
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Your PDF',
        text: 'Click "Edit PDF" or drag and drop your PDF file. EditoraPDF supports files up to 25MB and processes everything locally in your browser.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Your Tool',
        text: 'Select from 55+ PDF tools organized by category: Organize & Pages, Security & Protection, Convert, Edit & Content, and more.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Make Your Changes',
        text: 'Edit text, add images, annotate, reorder pages, convert formats, sign documents, or apply any of our powerful PDF tools.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Export Your PDF',
        text: 'Click "Export" to download your edited PDF with all changes applied. Your file stays on your device the entire time.',
      },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id="jsonld-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        strategy="lazyOnload"
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 p-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                How EditoraPDF Works
              </h1>
              <p className="text-lg text-surface-400 max-w-2xl mx-auto mb-6">
                Edit PDF documents online in seconds. No installation, no signup, complete privacy. Discover all 55+ tools and features.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-surface-400">
                <div className="flex items-center gap-2">
                  <Zap size={16} strokeWidth={2} className="text-primary-400" />
                  <span>Instant Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} strokeWidth={2} className="text-success-400" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} strokeWidth={2} className="text-accent-400" />
                  <span>55+ Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} strokeWidth={2} className="text-info-400" />
                  <span>No Uploads</span>
                </div>
              </div>
            </div>

            {/* Quick Start Steps */}
            <section className="mb-16" aria-labelledby="quick-start-heading">
              <h2 id="quick-start-heading" className="text-3xl font-bold text-white mb-8 text-center">
                Quick Start Guide
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Upload Your PDF',
                    description: 'Click "Edit PDF" on the homepage or drag and drop your PDF file directly into the browser. EditoraPDF supports files up to 25MB and processes everything locally — your file never leaves your device.',
                    icon: <Upload size={24} strokeWidth={2} />,
                    features: ['Drag & drop support', 'Files up to 25MB', 'All formats supported', 'Instant processing'],
                  },
                  {
                    step: 2,
                    title: 'Choose Your Tool',
                    description: 'Select from 55+ PDF tools organized by category. Whether you need to merge files, convert formats, sign documents, or edit content, we have the right tool for your task.',
                    icon: <Settings size={24} strokeWidth={2} />,
                    features: ['55+ specialized tools', 'Organized by category', 'One-click access', 'No learning curve'],
                  },
                  {
                    step: 3,
                    title: 'Make Your Changes',
                    description: 'Use our powerful editor to edit text, add images, annotate, reorder pages, rotate, delete, convert formats, sign documents, compress files, and more. All tools work instantly in your browser.',
                    icon: <PenSquare size={24} strokeWidth={2} />,
                    features: ['Real-time preview', 'Multiple edits at once', 'Undo/redo support', 'Instant results'],
                  },
                  {
                    step: 4,
                    title: 'Export & Download',
                    description: 'Click "Export" to download your edited PDF with all changes applied. Your file stays on your device the entire time — no uploads, no tracking, no data collection.',
                    icon: <Download size={24} strokeWidth={2} />,
                    features: ['Instant download', 'Original quality preserved', 'All changes applied', 'No watermarks'],
                  },
                ].map((item) => (
                  <div key={item.step} className="card p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-primary-400 font-bold text-sm">STEP {item.step}</span>
                          <div className="flex-1 h-px bg-surface-700/50"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-surface-400 leading-relaxed mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/50 border border-surface-700/50 text-xs text-surface-300"
                            >
                              <CheckCircle size={12} strokeWidth={2} className="text-success-400" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Features by Category */}
            <section className="mb-16" aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-3xl font-bold text-white mb-8 text-center">
                Complete Feature Guide
              </h2>
              <p className="text-center text-surface-400 mb-12 max-w-2xl mx-auto">
                EditoraPDF offers 55+ powerful PDF tools organized into categories. Here's everything you can do:
              </p>

              <div className="space-y-12">
                {/* Category 1: Organize & Pages */}
                <div className="card p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                      <GripVertical size={24} strokeWidth={2} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Organize & Pages</h3>
                      <p className="text-sm text-surface-400">11 tools for managing PDF pages</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Merge PDF', desc: 'Combine multiple PDF files into one document', icon: <FilePlus2 size={20} /> },
                      { name: 'Split PDF', desc: 'Separate PDF into multiple files by pages or bookmarks', icon: <Scissors size={20} /> },
                      { name: 'Reorder Pages', desc: 'Drag and drop to rearrange page order', icon: <GripVertical size={20} /> },
                      { name: 'Rotate Pages', desc: 'Rotate pages 90°, 180°, or 270°', icon: <RotateCw size={20} /> },
                      { name: 'Delete Pages', desc: 'Remove unwanted pages from your PDF', icon: <Trash2 size={20} /> },
                      { name: 'Extract Pages', desc: 'Extract specific pages into a new PDF', icon: <CheckCircle size={20} /> },
                      { name: 'Insert Pages', desc: 'Add blank pages or insert from another PDF', icon: <FilePlus2 size={20} /> },
                      { name: 'Duplicate Pages', desc: 'Copy pages within the same document', icon: <Layers size={20} /> },
                      { name: 'Reverse Order', desc: 'Flip the entire document page order', icon: <RotateCw size={20} /> },
                      { name: 'Crop Pages', desc: 'Trim margins and crop page content', icon: <Image size={20} /> },
                      { name: 'Resize Pages', desc: 'Change page dimensions (A4, Letter, etc.)', icon: <FileText size={20} /> },
                    ].map((tool, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/30 border border-surface-700/50 hover:border-primary-500/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center text-primary-400">
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                          <p className="text-sm text-surface-400">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2: Security & Protection */}
                <div className="card p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-success-500/20 border border-success-500/30 flex items-center justify-center">
                      <Shield size={24} strokeWidth={2} className="text-success-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Security & Protection</h3>
                      <p className="text-sm text-surface-400">7 tools for securing and protecting PDFs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Sign PDF', desc: 'Add digital signatures with drawing or image', icon: <PenSquare size={20} /> },
                      { name: 'Certificate Sign', desc: 'Add X.509 certificate-based signatures', icon: <CheckCircle size={20} /> },
                      { name: 'Redact PDF', desc: 'Permanently black out sensitive information', icon: <EyeOff size={20} /> },
                      { name: 'Password Protect', desc: 'Add password protection to your PDF', icon: <Key size={20} /> },
                      { name: 'Remove Password', desc: 'Unlock password-protected PDFs', icon: <LockOpen size={20} /> },
                      { name: 'Sanitize PDF', desc: 'Remove hidden data and metadata', icon: <X size={20} /> },
                      { name: 'Flatten PDF', desc: 'Make PDF non-editable by flattening forms', icon: <Lock size={20} /> },
                    ].map((tool, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/30 border border-surface-700/50 hover:border-success-500/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-success-500/15 flex items-center justify-center text-success-400">
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                          <p className="text-sm text-surface-400">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 3: Convert */}
                <div className="card p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
                      <ArrowRight size={24} strokeWidth={2} className="text-accent-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Convert Formats</h3>
                      <p className="text-sm text-surface-400">12+ conversion formats available</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'PDF to Images', desc: 'Convert PDF pages to PNG, JPEG, or WebP', icon: <Image size={20} /> },
                      { name: 'Images to PDF', desc: 'Combine images into a single PDF document', icon: <ImageDown size={20} /> },
                      { name: 'PDF to Word', desc: 'Convert PDF to editable DOCX format', icon: <FileText size={20} /> },
                      { name: 'Word to PDF', desc: 'Convert DOCX files to PDF format', icon: <FileText size={20} /> },
                      { name: 'PDF to Excel', desc: 'Extract tables to XLSX format', icon: <Table size={20} /> },
                      { name: 'Excel to PDF', desc: 'Convert spreadsheet files to PDF', icon: <Sheet size={20} /> },
                      { name: 'PDF to Text', desc: 'Extract plain text from PDF documents', icon: <AlignLeft size={20} /> },
                      { name: 'PDF to HTML', desc: 'Convert PDF to web-friendly HTML format', icon: <Code size={20} /> },
                      { name: 'HTML to PDF', desc: 'Convert web pages to PDF documents', icon: <Code2 size={20} /> },
                      { name: 'PDF to CSV', desc: 'Extract data tables to CSV format', icon: <Sheet size={20} /> },
                      { name: 'PDF to Markdown', desc: 'Convert PDF content to Markdown format', icon: <TypeIcon size={20} /> },
                      { name: 'PDF to PPTX', desc: 'Convert PDF to PowerPoint presentation', icon: <FileText size={20} /> },
                    ].map((tool, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/30 border border-surface-700/50 hover:border-accent-500/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center text-accent-400">
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                          <p className="text-sm text-surface-400">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 4: Edit & Content */}
                <div className="card p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-info-500/20 border border-info-500/30 flex items-center justify-center">
                      <Sparkles size={24} strokeWidth={2} className="text-info-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Edit, Content & Analyze</h3>
                      <p className="text-sm text-surface-400">25+ tools for editing and enhancing PDFs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Edit Text', desc: 'Edit existing text or add new text anywhere', icon: <PenLine size={20} /> },
                      { name: 'Add Images', desc: 'Insert images from your device into PDF', icon: <ImageDown size={20} /> },
                      { name: 'Add Shapes', desc: 'Draw rectangles, circles, lines, arrows', icon: <PenTool size={20} /> },
                      { name: 'Add Watermark', desc: 'Add text or image watermarks to pages', icon: <Droplets size={20} /> },
                      { name: 'Add Page Numbers', desc: 'Insert page numbers with custom formatting', icon: <FileText size={20} /> },
                      { name: 'Add Headers & Footers', desc: 'Insert headers and footers on pages', icon: <FileText size={20} /> },
                      { name: 'Compress PDF', desc: 'Reduce file size without losing quality', icon: <Compress size={20} /> },
                      { name: 'Fill & Sign Forms', desc: 'Fill PDF forms and add signatures', icon: <CheckCircle size={20} /> },
                      { name: 'Add QR Code', desc: 'Insert QR codes into your PDF', icon: <QrCode size={20} /> },
                      { name: 'Add Barcode', desc: 'Insert barcodes for inventory or tracking', icon: <BarChart3 size={20} /> },
                      { name: 'Add Bookmarks', desc: 'Create navigation bookmarks in PDF', icon: <Bookmark size={20} /> },
                      { name: 'Add Hyperlinks', desc: 'Insert clickable links in PDF', icon: <Link2 size={20} /> },
                      { name: 'Add Stamps', desc: 'Add approval stamps or custom stamps', icon: <Stamp size={20} /> },
                      { name: 'Bates Numbering', desc: 'Add sequential numbering for legal docs', icon: <FileText size={20} /> },
                      { name: 'Edit Metadata', desc: 'Modify PDF title, author, keywords', icon: <Info size={20} /> },
                      { name: 'Extract Images', desc: 'Extract all images from PDF', icon: <Image size={20} /> },
                      { name: 'Remove Images', desc: 'Delete images from PDF pages', icon: <X size={20} /> },
                      { name: 'Optimize Images', desc: 'Compress images within PDF', icon: <Compress size={20} /> },
                      { name: 'Grayscale PDF', desc: 'Convert PDF to grayscale', icon: <Image size={20} /> },
                      { name: 'Invert Colors', desc: 'Invert PDF colors for dark mode', icon: <Image size={20} /> },
                      { name: 'Remove Annotations', desc: 'Delete comments and annotations', icon: <X size={20} /> },
                      { name: 'OCR PDF', desc: 'Make scanned PDFs searchable with OCR', icon: <Search size={20} /> },
                      { name: 'Compare PDFs', desc: 'Compare two PDF files for differences', icon: <CheckCircle size={20} /> },
                      { name: 'Repair PDF', desc: 'Fix corrupted or damaged PDF files', icon: <CheckCircle size={20} /> },
                      { name: 'PDF Statistics', desc: 'Analyze PDF structure and content', icon: <BarChart3 size={20} /> },
                    ].map((tool, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/30 border border-surface-700/50 hover:border-info-500/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-info-500/15 flex items-center justify-center text-info-400">
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                          <p className="text-sm text-surface-400">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy & Security Section */}
            <section className="mb-16" aria-labelledby="privacy-heading">
              <div className="card p-6 md:p-8 bg-gradient-to-br from-success-500/5 via-surface-800/60 to-primary-500/5 border-success-500/20">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-success-500/20 border border-success-500/30 flex items-center justify-center">
                      <Shield size={32} strokeWidth={2} className="text-success-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 id="privacy-heading" className="text-2xl font-bold text-white mb-4">
                      Privacy & Security First
                    </h2>
                    <p className="text-surface-300 leading-relaxed mb-6">
                      EditoraPDF is designed with privacy as the core principle. All PDF processing happens locally in your browser using client-side JavaScript libraries (PDF.js and pdf-lib). Your files never leave your device, are never uploaded to our servers, and we don't collect any personal information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        '100% client-side processing',
                        'No file uploads to servers',
                        'No account creation required',
                        'No data collection or tracking',
                        'No cookies for tracking',
                        'Open source code (MIT License)',
                        'Works completely offline',
                        'Automatic data cleanup on close',
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={18} strokeWidth={2} className="text-success-400 flex-shrink-0" />
                          <span className="text-sm text-surface-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section className="mb-16" aria-labelledby="technical-heading">
              <h2 id="technical-heading" className="text-3xl font-bold text-white mb-8 text-center">
                How It Works Technically
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Browser-Based Processing',
                    description: 'EditoraPDF uses Mozilla\'s PDF.js library to render PDFs directly in your browser. All parsing, rendering, and manipulation happens client-side using JavaScript. This means zero server dependency and complete privacy.',
                  },
                  {
                    title: 'PDF Manipulation',
                    description: 'We use pdf-lib, a powerful JavaScript library for creating and modifying PDF documents. It handles all PDF operations including merging, splitting, rotating, adding content, and exporting — all without server interaction.',
                  },
                  {
                    title: 'File Handling',
                    description: 'Files are loaded into browser memory using the File API. They\'re processed entirely in RAM and never written to disk on our servers. When you close the browser tab, all data is automatically cleared.',
                  },
                  {
                    title: 'No Backend Required',
                    description: 'Unlike traditional PDF editors, EditoraPDF requires no backend server for processing. Everything runs in your browser, making it faster, more secure, and completely free to operate.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="card p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-surface-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Browser Compatibility */}
            <section className="mb-16" aria-labelledby="compatibility-heading">
              <div className="card p-6 md:p-8">
                <h2 id="compatibility-heading" className="text-2xl font-bold text-white mb-6">
                  Browser Compatibility
                </h2>
                <p className="text-surface-400 mb-6">
                  EditoraPDF works in all modern browsers that support JavaScript and the File API:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Google Chrome', version: '90+' },
                    { name: 'Mozilla Firefox', version: '88+' },
                    { name: 'Microsoft Edge', version: '90+' },
                    { name: 'Safari', version: '14+' },
                    { name: 'Opera', version: '76+' },
                    { name: 'Brave', version: '1.20+' },
                    { name: 'Vivaldi', version: '4.0+' },
                    { name: 'Chromium', version: '90+' },
                  ].map((browser, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                      <div className="font-semibold text-white mb-1">{browser.name}</div>
                      <div className="text-sm text-surface-400">{browser.version}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section className="mb-16" aria-labelledby="limitations-heading">
              <div className="card p-6 md:p-8 border-warning-500/20 bg-warning-500/5">
                <h2 id="limitations-heading" className="text-2xl font-bold text-warning-300 mb-4">
                  Current Limitations
                </h2>
                <p className="text-surface-300 mb-6">
                  While EditoraPDF is powerful, there are some limitations due to browser-based processing:
                </p>
                <ul className="space-y-3">
                  {[
                    'Maximum file size: 25MB (recommended: under 50 pages for best performance)',
                    'Encrypted/password-protected PDFs require password entry before editing',
                    'Complex PDFs with advanced forms may have limited editing capabilities',
                    'Very large PDFs (100+ pages) may take longer to process',
                    'OCR (Optical Character Recognition) for scanned PDFs is limited',
                    'Some advanced PDF features (3D content, multimedia) may not be fully supported',
                  ].map((limitation, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-warning-400 mt-1">•</span>
                      <span className="text-surface-300">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center">
              <div className="card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-surface-300 mb-8 max-w-2xl mx-auto">
                  Start editing PDF documents online right now. No signup required, no installation needed, complete privacy guaranteed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="btn-primary btn-lg inline-flex items-center gap-2">
                    <PenSquare size={20} strokeWidth={2} />
                    Edit PDF Now
                  </Link>
                  <Link href="/tools" className="btn-secondary btn-lg inline-flex items-center gap-2">
                    <Sparkles size={20} strokeWidth={2} />
                    Explore All Tools
                  </Link>
                </div>
                <p className="text-sm text-surface-500 mt-6">
                  100% free &bull; No signup &bull; Processed on your device &bull; Open source
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
