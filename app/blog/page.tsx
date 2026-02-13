import type { Metadata } from 'next'
import Link from 'next/link'
import MobileMenu from '../components/MobileMenu'

export const metadata: Metadata = {
  title: 'Blog - Tips & Guides',
  description: 'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.',
}

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-10 glass border-b border-surface-700/50" role="banner">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <MobileMenu />
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img src="/logo.svg" alt="EditoraPDF Logo" width={120} height={40} className="h-10 w-auto" />
                </Link>
              </div>
              
              <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/how-it-works" className="nav-link">How It Works</Link>
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/blog" className="nav-link text-primary-400">Blog</Link>
                <Link href="/contact" className="nav-link">Contact</Link>
              </nav>
              
              <Link href="/" className="btn-primary btn-md hidden sm:flex">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit PDF
              </Link>
            </div>
          </div>
        </header>

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
