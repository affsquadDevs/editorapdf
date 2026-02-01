import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import MobileMenu from '../../components/MobileMenu'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/how-to-edit-a-pdf-online`

export const metadata: Metadata = {
  title: 'How to Edit a PDF Online - Step-by-Step Guide | EditoraPDF Blog',
  description: 'Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.',
  openGraph: {
    title: 'How to Edit a PDF Online - Step-by-Step Guide',
    description: 'Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.',
    url: postUrl,
    images: [
      {
        url: `${siteUrl}/blog1.png`,
        width: 1200,
        height: 630,
        alt: 'Step-by-step guide on how to edit a PDF file online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Edit a PDF Online - Step-by-Step Guide',
    description: 'Learn how to edit PDF files online without installing software.',
    images: [`${siteUrl}/blog1.png`],
  },
}

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I edit a PDF online without installing software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many PDF edits can be done directly in your browser without installing any software, including adding text, images, shapes, and reordering pages.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of edits can I make to a PDF online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Online PDF editors typically support visual edits such as adding text, inserting images, drawing shapes, highlighting content, rotating pages, and deleting pages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is editing a PDF online safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Browser-based PDF editors process files locally during editing. Users should always review edited documents carefully and keep backups of important files.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit scanned PDF documents online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scanned PDFs are treated as images. Text inside scanned documents cannot be edited unless optical character recognition (OCR) is applied.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there file size limits for editing PDFs online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most online PDF editors support files up to a certain size. For best performance, documents under 25 MB and fewer than 50 pages are recommended.',
      },
    },
  ],
}

// Breadcrumbs Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${postUrl}#breadcrumbs`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How to Edit a PDF Online',
      item: postUrl,
    },
  ],
}

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#article`,
  headline: 'How to Edit a PDF Online',
  description: 'Step-by-step guide on how to edit a PDF file online without installing software',
  image: `${siteUrl}/blog1.png`,
  author: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
    },
  },
  datePublished: '2024-01-01',
  dateModified: '2024-01-01',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
}

export default function BlogPost() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />

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
              
              <Link href="/edit" className="btn-primary btn-md hidden sm:flex">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit PDF
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-surface-300">How to Edit a PDF Online</li>
            </ol>
          </div>
        </nav>

        {/* Hero Image with Title Overlay */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
          <img
            src="/blog1.png"
            alt="Step-by-step guide on how to edit a PDF file online"
            className="w-full h-full object-cover shadow-[inset_0_0_200px_100px_rgba(0,0,0,0.8),0_0_100px_50px_rgba(0,0,0,0.6)]"
            style={{
              boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />
          
          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                How to Edit a PDF Online
              </h1>
              <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Step-by-step guide to editing PDFs directly in your browser — no software required
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Article Intro */}
            <div className="mb-8">
              <p className="text-xl text-surface-300 leading-relaxed mb-4">
                Editing a PDF used to mean installing heavy software or paying for expensive licenses. Today, many common PDF edits can be done directly in your browser — quickly, safely, and without installing anything.
              </p>
              <p className="text-lg text-surface-400">
                This guide explains how to edit a PDF online step by step, what types of edits are supported, and what you should keep in mind before exporting your final document.
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">What Does "Editing a PDF Online" Actually Mean?</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Online PDF editing usually refers to making visual and structural changes to an existing PDF file, such as:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Adding new text</li>
                  <li>Placing images (for example, logos or signatures)</li>
                  <li>Highlighting or covering parts of a document</li>
                  <li>Drawing shapes or annotations</li>
                  <li>Reordering, rotating, or deleting pages</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  Unlike word processors, PDFs are not designed to be rewritten line by line. Most online editors work by adding editable layers on top of the original document, which is ideal for corrections, notes, and updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 1: Open Your PDF in the Editor</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  To start editing a PDF online:
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Click <strong className="text-white">Edit PDF</strong></li>
                  <li>Select a PDF file from your device or drag and drop it into the editor</li>
                  <li>The document opens directly in your browser</li>
                </ol>
                <p className="text-surface-300 leading-relaxed">
                  EditoraPDF supports PDF files up to 25 MB and works best with documents under 50 pages.
                  <br />
                  No account is required, and no installation is needed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 2: Navigate Between Pages</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Once your file is open, you can:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>See all pages in the left sidebar</li>
                  <li>Click any page to jump to it</li>
                  <li>Use navigation arrows to move page by page</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  If needed, pages can be reordered by dragging them into a new position, helping you restructure documents like contracts or reports.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 3: Add or Edit Text</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  To insert text into a PDF:
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Select the <strong className="text-white">Text tool</strong></li>
                  <li>Click anywhere on the page</li>
                  <li>Type your text</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You can adjust:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Font (for example, Helvetica)</li>
                  <li>Font size</li>
                  <li>Bold or italic style</li>
                  <li>Text color</li>
                  <li>Background color (optional)</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  This is useful for:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Fixing typos</li>
                  <li>Adding missing information</li>
                  <li>Filling in prepared document templates</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 4: Insert Images</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You can also add images to a PDF, such as:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Company logos</li>
                  <li>Stamps</li>
                  <li>Scanned signatures</li>
                  <li>Illustrations or icons</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  After inserting an image, you can:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Resize it using percentage controls</li>
                  <li>Adjust height and width</li>
                  <li>Rotate it by 90° increments</li>
                  <li>Remove it if needed</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  Images are placed exactly where you position them on the page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 5: Use Shapes and Highlights</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The Shape tool allows you to draw simple elements on the page, such as:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Rectangles</li>
                  <li>Circles</li>
                  <li>Lines</li>
                  <li>Arrows</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Shapes can be used to:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Highlight important sections</li>
                  <li>Cover sensitive information</li>
                  <li>Add visual emphasis</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You can customize:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Color</li>
                  <li>Opacity (for example, semi-transparent highlights)</li>
                  <li>Outline or filled styles</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 6: Rotate or Delete Pages</h2>
                <p className="text-surface-300 leading-relaxed">
                  If a page is scanned sideways or included by mistake, you can:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Rotate pages</li>
                  <li>Delete individual pages</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  This is especially useful when cleaning up scanned documents or merging content from different sources.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step 7: Export and Download Your PDF</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  When you're finished editing:
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Click <strong className="text-white">Download PDF</strong></li>
                  <li>Your updated file is saved to your device</li>
                </ol>
                <p className="text-surface-300 leading-relaxed">
                  The editing process happens locally in your browser. Once you download the file, it remains on your device.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Important Limitations to Keep in Mind</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Online PDF editors are powerful, but not unlimited.
                  <br />
                  Before editing, it's good to know that:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Very complex PDFs (especially interactive forms) may have limited editing support</li>
                  <li>Scanned PDFs are treated as images unless OCR is applied</li>
                  <li>Online editors are best for visual edits, not full document rewriting</li>
                  <li>Always review the final document before using it for legal, financial, or professional purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">When Is Online PDF Editing the Right Choice?</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Editing a PDF online is ideal when you need to:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Make quick corrections</li>
                  <li>Add notes or annotations</li>
                  <li>Insert images or signatures</li>
                  <li>Reorder or remove pages</li>
                  <li>Avoid installing software on your device</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  For simple, everyday document updates, browser-based editing is often the fastest and most practical option.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Final Thoughts</h2>
                <p className="text-surface-300 leading-relaxed">
                  Online PDF editing makes it easier to work with documents without unnecessary tools or setup. By understanding what edits are supported and how to apply them correctly, you can save time while keeping your documents accurate and organized.
                  <br />
                  <br />
                  If you're ready to make changes, you can{' '}
                  <Link href="/edit" className="text-primary-400 hover:text-primary-300 underline">
                    open your file and start editing directly in your browser
                  </Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I edit a PDF online without installing software?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes. Many PDF edits can be done directly in your web browser without installing any software. Online PDF editors allow you to add text, insert images, draw shapes, reorder pages, and make other visual edits without downloading additional programs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What types of edits can I make to a PDF online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Online PDF editors typically support visual and structural edits, such as adding text boxes, inserting images, drawing shapes or highlights, rotating pages, deleting pages, and reordering pages within a document.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Is editing a PDF online safe?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Browser-based PDF editors process files locally during editing. However, users should always review edited documents carefully and keep backups of important files, especially before using them for official or professional purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I edit scanned PDF documents online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Scanned PDF files are treated as images. Text inside scanned documents cannot be edited unless optical character recognition (OCR) is applied. Without OCR, you can still add text, images, or highlights on top of scanned pages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Are there file size limits for editing PDFs online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Most online PDF editors support files up to a certain size. For best performance, documents under 25 MB and fewer than 50 pages are recommended.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Do I need to create an account to edit a PDF online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Many online PDF editors allow users to edit documents without creating an account. This makes it easier to make quick edits without registration or sign-up.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-surface-700/50">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>

        {/* Footer with Social Links */}
        <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
          <div className="max-w-5xl mx-auto space-y-3">
            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
              <p className="text-xs text-surface-400 leading-relaxed">
                <strong className="text-surface-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our{' '}
                <Link href="/terms" className="text-primary-400 hover:text-primary-300 underline">
                  Terms
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-surface-500">
                © {new Date().getFullYear()} EditoraPDF. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-surface-500">Follow us:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/people/Editorapdf/61587362633003/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.threads.com/@editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Threads"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@EditoraPDF"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Subscribe on YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
