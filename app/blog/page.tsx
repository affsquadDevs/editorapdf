import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'

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
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Split PDF Files Online */}
            <Link href="/blog/how-to-split-pdf-files-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Duplicate Pages in PDF */}
            <Link href="/blog/how-to-insert-duplicate-pages-in-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-warning-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How We Built Open-Source PDF Editor */}
            <Link href="/blog/how-we-built-open-source-pdf-editor" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Why We Made EditoraPDF Open Source */}
            <Link href="/blog/why-we-made-editorapdf-open-source" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-success-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Technology Behind Privacy-First PDF Editing */}
            <Link href="/blog/technology-behind-privacy-first-pdf-editing" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Contributing to Open Source Guide */}
            <Link href="/blog/contributing-to-open-source-beginners-guide" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-warning-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Open-Source vs Closed-Source PDF Editors */}
            <Link href="/blog/open-source-vs-closed-source-pdf-editors" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Markdown Converter */}
            <Link href="/blog/pdf-to-markdown" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to HTML Converter */}
            <Link href="/blog/pdf-to-html" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Text Converter */}
            <Link href="/blog/pdf-to-text" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-success-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Digital Signature */}
            <Link href="/blog/digital-signature" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Headers and Footers to PDF */}
            <Link href="/blog/how-to-add-headers-and-footers-to-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-warning-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Page Numbers to PDF */}
            <Link href="/blog/how-to-add-page-numbers-to-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12m-4.5 4.5h15m0 0l-4.5-4.5m4.5 4.5l-4.5 4.5" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Watermark to PDF */}
            <Link href="/blog/how-to-add-watermark-to-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Compress PDF Online */}
            <Link href="/blog/how-to-compress-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-success-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3 3V15" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert Images to PDF */}
            <Link href="/blog/how-to-convert-images-to-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to CSV */}
            <Link href="/blog/how-to-convert-pdf-to-csv-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-success-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Excel */}
            <Link href="/blog/how-to-convert-pdf-to-excel-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Word */}
            <Link href="/blog/how-to-convert-pdf-to-word-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Delete Pages from PDF */}
            <Link href="/blog/how-to-delete-pages-from-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-error-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-error-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Extract Pages from PDF */}
            <Link href="/blog/how-to-extract-pages-from-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Blank Pages in PDF */}
            <Link href="/blog/how-to-insert-blank-pages-in-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-warning-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Redact PDF Online */}
            <Link href="/blog/how-to-redact-pdf-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-error-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-error-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reorder PDF Pages */}
            <Link href="/blog/how-to-reorder-pdf-pages" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m6-16.5L21 7.5m0 0L16.5 12M21 7.5v13.5" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reverse PDF Page Order */}
            <Link href="/blog/how-to-reverse-pdf-page-order" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m6-16.5L21 7.5m0 0L16.5 12M21 7.5v13.5" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Rotate PDF Pages */}
            <Link href="/blog/how-to-rotate-pdf-pages-online" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-warning-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Sanitize PDF */}
            <Link href="/blog/how-to-sanitize-pdf" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-success-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Bookmarks */}
            <Link href="/blog/split-by-bookmarks" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Size */}
            <Link href="/blog/split-by-size" className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-accent-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
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
