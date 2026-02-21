import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import {
  FilePlus2, Scissors, Copy, Github, ShieldCheck, Lock,
  FileText, Hash, Eye, BarChart3, ArrowRight, User,
  ListOrdered, Droplets, Image, FileImage, Table, Code,
  Minimize2, Trash2, RotateCw, Bookmark, FileOutput, GripVertical,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Tips & Guides',
  description: 'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.',
  alternates: {
    canonical: 'https://editorapdf.com/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 p-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Resources</h1>
              <p className="text-lg text-surface-400 max-w-2xl mx-auto">
                Tips, tutorials, and guides to help you master PDF editing
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post: How to Merge PDF Files Online */}
            <Link href="/blog/how-to-merge-pdf-files-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FilePlus2 className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Merge PDF Files Online: Complete Guide to Combining PDF Documents
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to combine multiple PDF files into one document using free online tools. Step-by-step guide with tips, best practices, and FAQs.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Split PDF Files Online */}
            <Link href="/blog/how-to-split-pdf-files-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scissors className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Split PDF Files Online: Complete Guide to Dividing PDF Documents
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to divide large PDF files into smaller documents using free online tools. Step-by-step guide covering page ranges, file size, and bookmarks.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Duplicate Pages in PDF */}
            <Link href="/blog/how-to-insert-duplicate-pages-in-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Copy className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to duplicate and copy pages in PDF files using free online tools. Step-by-step guide covering individual pages, page ranges, and insertion positioning.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How We Built Open-Source PDF Editor */}
            <Link href="/blog/how-we-built-open-source-pdf-editor" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Github className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Open Source</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Technical</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How We Built a Free Open-Source PDF Editor with Next.js
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Technical deep dive into building EditoraPDF - learn about our tech stack, architecture decisions, and open-source development process.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Why We Made EditoraPDF Open Source */}
            <Link href="/blog/why-we-made-editorapdf-open-source" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Open Source</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Philosophy</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  Why We Made EditoraPDF Open Source
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  The principles, philosophy, and vision behind making EditoraPDF free and open source forever.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Technology Behind Privacy-First PDF Editing */}
            <Link href="/blog/technology-behind-privacy-first-pdf-editing" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Privacy</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Technology</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  The Technology Behind Privacy-First PDF Editing
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Explore how client-side processing, PDF.js, and modern web technologies enable truly private PDF editing without server uploads.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Contributing to Open Source Guide */}
            <Link href="/blog/contributing-to-open-source-beginners-guide" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Open Source</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  Contributing to Open Source: A Beginner's Guide with EditoraPDF
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to contribute to open-source projects using EditoraPDF as an example. Step-by-step guide for first-time contributors.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Open-Source vs Closed-Source PDF Editors */}
            <Link href="/blog/open-source-vs-closed-source-pdf-editors" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Comparison</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Analysis</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  Comparing Open-Source vs. Closed-Source PDF Editors
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  A comprehensive comparison of open-source and proprietary PDF editors. Learn the pros, cons, and which is right for you.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Markdown Converter */}
            <Link href="/blog/pdf-to-markdown" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Hash className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  PDF to Markdown Converter: Complete Guide to Transforming PDF Documents
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert PDF documents into Markdown format using free online tools. Perfect for documentation, blogs, and version control.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Edit a PDF Online */}
            <Link href="/blog/how-to-edit-a-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <img
                  src="/blog1.png"
                  alt="Step-by-step guide on how to edit a PDF file online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Edit a PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Is It Safe to Edit PDFs Online? */}
            <Link href="/blog/is-it-safe-to-edit-pdfs-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <img
                  src="/blog2.png"
                  alt="Is It Safe to Edit PDFs Online."
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  Is It Safe to Edit PDFs Online?
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to HTML Converter */}
            <Link href="/blog/pdf-to-html" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Convert PDF to HTML Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert PDF files to HTML format online. Free, secure PDF to HTML converter. Transform PDF documents into web pages without software installation.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Text Converter */}
            <Link href="/blog/pdf-to-text" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  PDF to Text Converter - Extract Text from PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Convert PDF to text online for free. Extract text from PDF files instantly with our secure PDF to text converter. No software installation required.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Digital Signature */}
            <Link href="/blog/digital-signature" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Security</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Add Digital Signatures to PDFs Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to add digital signatures to PDF documents online. Free, secure, and easy-to-use e-signature tool. Sign PDFs electronically without software installation.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Headers and Footers to PDF */}
            <Link href="/blog/how-to-add-headers-and-footers-to-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Add Headers and Footers to PDF
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to add headers and footers to PDF documents online. Free, secure, and easy-to-use PDF header footer tool. Add page numbers, dates, text, and custom content.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Page Numbers to PDF */}
            <Link href="/blog/how-to-add-page-numbers-to-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ListOrdered className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Add Page Numbers to PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to add page numbers to PDF documents online. Free, secure, and easy-to-use PDF page numbering tool. Number PDF pages without software installation.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Watermark to PDF */}
            <Link href="/blog/how-to-add-watermark-to-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplets className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Add Watermark to PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to add watermarks to PDF documents online. Free, secure, and easy-to-use PDF watermark tool. Add text or image watermarks without software installation.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Compress PDF Online */}
            <Link href="/blog/how-to-compress-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Minimize2 className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Compress PDF Files Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to compress PDF files to reduce file size online. Free, secure, and easy-to-use PDF compression tool. Shrink PDFs without losing quality.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert Images to PDF */}
            <Link href="/blog/how-to-convert-images-to-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Convert Images to PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert images to PDF format online. Free, secure, and easy-to-use image to PDF converter. Combine multiple images into one PDF document.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to CSV */}
            <Link href="/blog/how-to-convert-pdf-to-csv-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Table className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Convert PDF to CSV Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert PDF files to CSV format online. Free, secure, and easy-to-use PDF to CSV converter. Extract tables and data from PDFs to spreadsheets.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Excel */}
            <Link href="/blog/how-to-convert-pdf-to-excel-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Table className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Convert PDF to Excel Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert PDF files to Excel format online. Free, secure, and easy-to-use PDF to Excel converter. Extract tables and data from PDFs to spreadsheets.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Word */}
            <Link href="/blog/how-to-convert-pdf-to-word-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Converter</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Convert PDF to Word Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to convert PDF files to Word format online. Free, secure, and easy-to-use PDF to Word converter. Edit PDF content in Microsoft Word.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Delete Pages from PDF */}
            <Link href="/blog/how-to-delete-pages-from-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-error-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trash2 className="w-24 h-24 text-error-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-error-500/20 text-error-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Delete Pages from PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to delete pages from PDF documents online. Free, secure, and easy-to-use PDF page deletion tool. Remove unwanted pages without software installation.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Extract Pages from PDF */}
            <Link href="/blog/how-to-extract-pages-from-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileOutput className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Extract Pages from PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to extract pages from PDF documents online. Free, secure, and easy-to-use PDF page extraction tool. Save specific pages as separate PDF files.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Blank Pages in PDF */}
            <Link href="/blog/how-to-insert-blank-pages-in-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FilePlus2 className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Insert Blank Pages in PDF
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to insert blank pages into PDF documents online. Free, secure, and easy-to-use PDF page insertion tool. Add empty pages anywhere in your document.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Redact PDF Online */}
            <Link href="/blog/how-to-redact-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-error-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="w-24 h-24 text-error-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-error-500/20 text-error-300 text-xs font-medium">Security</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Redact PDF Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to redact sensitive information from PDF documents online. Free, secure, and easy-to-use PDF redaction tool. Permanently remove text and images.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reorder PDF Pages */}
            <Link href="/blog/how-to-reorder-pdf-pages" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GripVertical className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Reorder PDF Pages Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to reorder pages in PDF documents online. Free, secure, and easy-to-use PDF page reordering tool. Rearrange pages with drag and drop.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reverse PDF Page Order */}
            <Link href="/blog/how-to-reverse-pdf-page-order" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GripVertical className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Reverse PDF Page Order Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to reverse the page order of PDF documents online. Free, secure, and easy-to-use PDF page reversal tool. Flip your document pages.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Rotate PDF Pages */}
            <Link href="/blog/how-to-rotate-pdf-pages-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCw className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Rotate PDF Pages Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to rotate pages in PDF documents online. Free, secure, and easy-to-use PDF page rotation tool. Rotate pages 90, 180, or 270 degrees.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Sanitize PDF */}
            <Link href="/blog/how-to-sanitize-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">Security</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Sanitize PDF Files Online
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to sanitize PDF files to remove hidden metadata and sensitive information. Free, secure, and easy-to-use PDF sanitization tool.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Bookmarks */}
            <Link href="/blog/split-by-bookmarks" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bookmark className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Split PDF by Bookmarks
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to split PDF files by bookmarks automatically. Free, secure online tool that divides PDFs using bookmark structure. No software installation required.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Size */}
            <Link href="/blog/split-by-size" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scissors className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">PDF Tools</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  How to Split PDF by Size
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  Learn how to split PDF files by file size automatically. Free, secure online tool that divides large PDFs into smaller files based on size limits.
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
