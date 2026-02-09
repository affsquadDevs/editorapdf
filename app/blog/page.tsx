import type { Metadata } from 'next'
import Link from 'next/link'
import MobileMenu from '../components/MobileMenu'

export const metadata: Metadata = {
  title: 'Blog - Tips & Guides',
  description: 'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.',
}

export default function BlogPage() {
  return (
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
  )
}
