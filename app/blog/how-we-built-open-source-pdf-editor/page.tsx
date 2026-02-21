import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/how-we-built-open-source-pdf-editor`

export const metadata: Metadata = {
  title: 'How We Built a Free Open-Source PDF Editor with Next.js | EditoraPDF',
  description: 'Technical deep dive into building EditoraPDF - a free, open-source PDF editor with Next.js 14, TypeScript, PDF.js, and pdf-lib. Learn about our architecture, challenges, and solutions.',
  keywords: [
    'open source PDF editor',
    'Next.js PDF editor',
    'TypeScript PDF editor',
    'PDF.js tutorial',
    'pdf-lib tutorial',
    'build PDF editor',
    'React PDF editor',
    'browser-based PDF',
    'client-side PDF processing',
    'web PDF editor development',
  ],
  openGraph: {
    title: 'How We Built a Free Open-Source PDF Editor with Next.js',
    description: 'Technical deep dive into building EditoraPDF - learn about our tech stack, architecture decisions, and open-source development process.',
    url: postUrl,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'How we built EditoraPDF - open source PDF editor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Built a Free Open-Source PDF Editor with Next.js',
    description: 'Technical deep dive into building EditoraPDF with Next.js, TypeScript, PDF.js, and pdf-lib.',
    images: [`${siteUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: postUrl,
  },
}

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#article`,
  headline: 'How We Built a Free Open-Source PDF Editor with Next.js',
  description: 'Complete technical guide on building a browser-based PDF editor using Next.js, TypeScript, PDF.js, and pdf-lib',
  image: `${siteUrl}/og/og-image.png`,
  author: {
    '@type': 'Organization',
    name: 'EditoraPDF Team',
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
  datePublished: '2026-02-13',
  dateModified: '2026-02-13',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
  articleSection: 'Technology',
  keywords: 'open source, Next.js, PDF editor, TypeScript, React, PDF.js, pdf-lib, web development',
  dependencies: 'Next.js 14, TypeScript 5, React 18, PDF.js 3, pdf-lib 1.17',
  proficiencyLevel: 'Intermediate',
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
      name: 'How We Built Open-Source PDF Editor',
      item: postUrl,
    },
  ],
}

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What technology stack is EditoraPDF built with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EditoraPDF is built with Next.js 14, TypeScript, React 18, PDF.js for rendering, pdf-lib for manipulation, Zustand for state management, and Tailwind CSS for styling. It is completely open source under MIT license.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why did you choose Next.js for a PDF editor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js provides excellent performance, SEO capabilities, static export support, and great developer experience. The App Router makes it easy to build fast, SEO-friendly applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EditoraPDF really open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, EditoraPDF is 100% open source under the MIT License. The complete source code is available on GitHub at https://github.com/affsquadDevs/editorapdf',
      },
    },
    {
      '@type': 'Question',
      name: 'How does client-side PDF processing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF.js renders PDFs to HTML canvas in the browser, while pdf-lib manipulates the PDF structure. All processing happens locally in the user browser using JavaScript, ensuring privacy and security.',
      },
    },
  ],
}

export default function BlogPost() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen flex flex-col">
        <Header />

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
              <li className="text-surface-300">How We Built Open-Source PDF Editor</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-br from-primary-500/10 via-surface-800 to-accent-500/10 border-b border-surface-700/50">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
                Open Source
              </span>
              <span className="px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/40 text-accent-300 text-sm font-medium">
                Technical
              </span>
              <span className="text-sm text-surface-400">
                Published: February 13, 2026
              </span>
              <span className="text-sm text-surface-400">
                10 min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How We Built a Free Open-Source PDF Editor with Next.js
            </h1>
            <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
              A technical deep dive into building EditoraPDF — our journey from idea to production-ready open-source PDF editor
            </p>
            
            {/* GitHub CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/affsquadDevs/editorapdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View Source on GitHub
              </a>
              <a
                href="https://github.com/affsquadDevs/editorapdf/stargazers"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-md"
              >
                ⭐ Star the Project
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Article Intro */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-surface-300 leading-relaxed mb-8">
                When we set out to build EditoraPDF, we had one clear goal: create a <strong className="text-white">completely free, open-source PDF editor</strong> that respects user privacy and works entirely in the browser. No servers, no uploads, no tracking — just pure client-side processing.
              </p>
              <p className="text-lg text-surface-400 mb-12">
                This is the story of how we built it, the technical challenges we faced, and the decisions we made along the way. Whether you're a developer looking to build something similar or just curious about open-source development, this post will give you a complete inside look.
              </p>

              {/* The Vision */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">The Vision: Privacy-First PDF Editing</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Most PDF editors today require you to upload your documents to their servers. For sensitive documents like contracts, medical records, or financial statements, this is a privacy nightmare.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  We wanted to build something different:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><strong className="text-white">100% client-side processing</strong> — files never leave your browser</li>
                  <li><strong className="text-white">No installation required</strong> — works directly in web browsers</li>
                  <li><strong className="text-white">No signup or tracking</strong> — completely anonymous usage</li>
                  <li><strong className="text-white">Open source</strong> — transparent code anyone can audit</li>
                  <li><strong className="text-white">Free forever</strong> — no paywalls or subscriptions</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  With these principles in mind, we started evaluating technologies that could make this vision a reality.
                </p>
              </section>

              {/* Tech Stack */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Choosing the Tech Stack</h2>
                
                <h3 className="text-2xl font-semibold text-primary-300 mb-4">Frontend Framework: Next.js 14</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  We chose <strong className="text-white">Next.js 14</strong> with the new App Router for several reasons:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><strong className="text-white">Excellent SEO capabilities</strong> — server-side rendering and metadata management out of the box</li>
                  <li><strong className="text-white">Static export support</strong> — deploy anywhere (Vercel, Netlify, GitHub Pages)</li>
                  <li><strong className="text-white">TypeScript integration</strong> — type safety and better developer experience</li>
                  <li><strong className="text-white">Performance optimization</strong> — automatic code splitting, image optimization</li>
                  <li><strong className="text-white">Developer experience</strong> — hot reload, great documentation, huge ecosystem</li>
                </ul>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">PDF Rendering: PDF.js</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">PDF.js</a> by Mozilla is the gold standard for rendering PDFs in the browser. It's what powers Firefox's built-in PDF viewer.
                </p>
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                  <p className="text-surface-300 text-sm mb-2"><strong className="text-white">Key advantages:</strong></p>
                  <ul className="list-disc list-inside text-surface-400 space-y-1 text-sm ml-4">
                    <li>Battle-tested in millions of browsers</li>
                    <li>Excellent rendering quality</li>
                    <li>Text extraction capabilities</li>
                    <li>Canvas-based rendering for performance</li>
                    <li>Active maintenance by Mozilla</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">PDF Manipulation: pdf-lib</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  For creating and modifying PDFs, we use <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">pdf-lib</a> — a pure JavaScript library that runs entirely in the browser.
                </p>
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                  <p className="text-surface-300 text-sm mb-2"><strong className="text-white">Key capabilities:</strong></p>
                  <ul className="list-disc list-inside text-surface-400 space-y-1 text-sm ml-4">
                    <li>Create PDFs from scratch</li>
                    <li>Modify existing PDFs (add pages, rotate, delete)</li>
                    <li>Embed text, images, and shapes</li>
                    <li>Copy pages between documents</li>
                    <li>Zero dependencies on Node.js</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">State Management: Zustand</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Instead of Redux, we chose <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Zustand</a> — a minimal, fast state management library.
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Simple API — no boilerplate code</li>
                  <li>TypeScript-first design</li>
                  <li>Small bundle size (~1KB)</li>
                  <li>No context providers needed</li>
                </ul>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">Styling: Tailwind CSS</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Tailwind CSS</a> gives us utility-first styling with excellent developer experience and small production bundles through automatic purging.
                </p>
              </section>

              {/* Architecture */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Architecture & Design Decisions</h2>
                
                <h3 className="text-2xl font-semibold text-primary-300 mb-4">1. Client-Side Processing Only</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Everything happens in the browser:
                </p>
                <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                  <pre className="text-surface-300">
{`User uploads PDF
  ↓
PDF.js parses and renders to canvas
  ↓
User makes edits (text, images, shapes)
  ↓
pdf-lib creates new PDF with changes
  ↓
Download to user's device`}
                  </pre>
                </div>
                <p className="text-surface-300 leading-relaxed mb-4">
                  At no point does the file leave the user's device. This is true privacy by design.
                </p>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">2. Normalized Coordinate System</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  One major challenge: PDFs have different page sizes, and users can zoom in/out. How do we track overlay positions?
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Solution:</strong> Normalize all coordinates to the range [0, 1].
                </p>
                <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                  <pre className="text-accent-300">
{`// Instead of absolute pixels:
{ x: 150, y: 200 }

// We store normalized coordinates:
{ x: 0.25, y: 0.33 }

// Then scale to current viewport:
actualX = normalizedX * pageWidth * zoom
actualY = normalizedY * pageHeight * zoom`}
                  </pre>
                </div>
                <p className="text-surface-300 leading-relaxed mb-4">
                  This makes overlays zoom-independent and portable across different page sizes.
                </p>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">3. Component Architecture</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  We structured the app into focused components:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">PdfViewer</code> — main canvas rendering</li>
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">Thumbnails</code> — page navigation sidebar</li>
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">Toolbar</code> — zoom, rotate, delete controls</li>
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">EditToolbar</code> — tool selection (text, image, shape)</li>
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">AdvancedOverlayLayer</code> — text, images, shapes rendering</li>
                  <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">ExportButton</code> — PDF export logic</li>
                </ul>

                <h3 className="text-2xl font-semibold text-primary-300 mb-4">4. State Management Pattern</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Our Zustand store maintains:
                </p>
                <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                  <pre className="text-accent-300">
{`{
  originalFile: File,
  pages: [
    {
      id: string,
      originalIndex: number,
      rotation: 0 | 90 | 180 | 270,
      deleted: boolean,
      textOverlays: [],
      imageOverlays: [],
      shapeOverlays: []
    }
  ],
  selectedPageId: string,
  zoom: number,
  editMode: 'select' | 'text' | 'image' | 'shape'
}`}
                  </pre>
                </div>
              </section>

              {/* Challenges */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Technical Challenges We Faced</h2>
                
                <h3 className="text-2xl font-semibold text-warning-300 mb-4">Challenge 1: Text Extraction Accuracy</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  PDF.js can extract text, but positioning isn't always pixel-perfect due to how PDFs encode text (sometimes as individual characters, sometimes as words).
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Solution:</strong> We extract text items with their transformation matrices and convert to normalized coordinates with generous bounding boxes.
                </p>

                <h3 className="text-2xl font-semibold text-warning-300 mb-4">Challenge 2: Performance with Large PDFs</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Rendering 100+ page PDFs can freeze the browser.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Solution:</strong> 
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Lazy load pages (only render visible pages)</li>
                  <li>Use requestAnimationFrame for smooth rendering</li>
                  <li>Recommend 25MB / 50 pages limit</li>
                  <li>Offscreen canvas for thumbnails</li>
                </ul>

                <h3 className="text-2xl font-semibold text-warning-300 mb-4">Challenge 3: Export Quality</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Embedding text and images in pdf-lib requires careful coordinate transformation from browser space to PDF space.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Solution:</strong> Build a comprehensive transformation pipeline that handles:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Page rotations</li>
                  <li>Coordinate system differences (Y-axis flipped in PDF)</li>
                  <li>Font embedding and sizing</li>
                  <li>Image format conversion</li>
                </ul>

                <h3 className="text-2xl font-semibold text-warning-300 mb-4">Challenge 4: Browser Compatibility</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Different browsers have slightly different canvas implementations and PDF rendering quirks.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Solution:</strong> Extensive testing across Chrome, Firefox, Safari, and Edge. Use feature detection instead of browser detection.
                </p>
              </section>

              {/* Open Source Journey */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Why We Made It Open Source</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  From day one, we knew this had to be open source:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-primary-300 mb-2">1. Transparency = Trust</h4>
                    <p className="text-surface-300 text-sm">
                      When dealing with sensitive documents, users need to verify that files truly stay local. Open source lets anyone audit the code.
                    </p>
                  </div>

                  <div className="bg-accent-500/5 border border-accent-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-accent-300 mb-2">2. Community Contributions</h4>
                    <p className="text-surface-300 text-sm">
                      Open source enables developers worldwide to contribute features, fix bugs, and improve the tool.
                    </p>
                  </div>

                  <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-success-300 mb-2">3. Learning Resource</h4>
                    <p className="text-surface-300 text-sm">
                      We learned so much from open-source projects. Now we can give back and help others learn Next.js, PDF processing, and web development.
                    </p>
                  </div>

                  <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-warning-300 mb-2">4. Longevity</h4>
                    <p className="text-surface-300 text-sm">
                      Even if we stop maintaining it, the community can fork and continue development. The tool lives on.
                    </p>
                  </div>
                </div>
              </section>

              {/* Results */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">The Results</h2>
                <p className="text-surface-300 leading-relaxed mb-6">
                  After months of development, we launched EditoraPDF with:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
                    <div className="text-surface-300">Client-side processing</div>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-accent-400 mb-2">0 KB</div>
                    <div className="text-surface-300">Data uploaded to servers</div>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-success-400 mb-2">MIT</div>
                    <div className="text-surface-300">Open source license</div>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <div className="text-3xl font-bold text-warning-400 mb-2">$0</div>
                    <div className="text-surface-300">Forever free</div>
                  </div>
                </div>

                <p className="text-surface-300 leading-relaxed">
                  The codebase is available at <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">github.com/affsquadDevs/editorapdf</a> under the MIT License.
                </p>
              </section>

              {/* Learnings */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Key Takeaways for Developers</h2>
                
                <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-8">
                  <ul className="space-y-4 text-surface-300">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">✓</span>
                      <div>
                        <strong className="text-white">Client-side processing is powerful</strong> — Modern browsers can handle complex tasks that used to require servers
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">✓</span>
                      <div>
                        <strong className="text-white">Choose the right libraries</strong> — PDF.js and pdf-lib saved us months of development
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">✓</span>
                      <div>
                        <strong className="text-white">Coordinate normalization is key</strong> — Makes overlays portable and zoom-independent
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">✓</span>
                      <div>
                        <strong className="text-white">Performance matters</strong> — Lazy loading and optimization are crucial for large files
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">✓</span>
                      <div>
                        <strong className="text-white">Open source benefits everyone</strong> — Transparency, community, and learning all win
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Get Involved */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Get Involved</h2>
                <p className="text-surface-300 leading-relaxed mb-6">
                  EditoraPDF is an open-source project, and we welcome contributions from developers of all skill levels.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <a
                    href="https://github.com/affsquadDevs/editorapdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-primary-500/50 rounded-lg transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300">Star on GitHub</h4>
                    <p className="text-sm text-surface-400">Show your support and stay updated with new releases</p>
                  </a>

                  <a
                    href="https://github.com/affsquadDevs/editorapdf/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-accent-500/50 rounded-lg transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-300">Report Bugs</h4>
                    <p className="text-sm text-surface-400">Help us improve by reporting issues you encounter</p>
                  </a>

                  <a
                    href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-success-500/50 rounded-lg transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-success-300">Contribute Code</h4>
                    <p className="text-sm text-surface-400">Submit pull requests with new features or improvements</p>
                  </a>

                  <a
                    href="https://editorapdf.com/edit"
                    className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-warning-500/50 rounded-lg transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-warning-300">Try It Out</h4>
                    <p className="text-sm text-surface-400">Edit your PDFs online and share your feedback</p>
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What technology stack is EditoraPDF built with?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      EditoraPDF is built with Next.js 14, TypeScript, React 18, PDF.js for rendering, pdf-lib for manipulation, Zustand for state management, and Tailwind CSS for styling. It is completely open source under MIT license.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Why did you choose Next.js for a PDF editor?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Next.js provides excellent performance, SEO capabilities, static export support, and great developer experience. The App Router makes it easy to build fast, SEO-friendly applications that can be deployed anywhere.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Is EditoraPDF really open source?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, EditoraPDF is 100% open source under the MIT License. The complete source code is available on GitHub at <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">github.com/affsquadDevs/editorapdf</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">How does client-side PDF processing work?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      PDF.js renders PDFs to HTML canvas in the browser, while pdf-lib manipulates the PDF structure. All processing happens locally in the user's browser using JavaScript, ensuring complete privacy and security without any server uploads.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I use EditoraPDF code in my own project?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Absolutely! EditoraPDF is licensed under MIT, which means you can use, modify, and distribute the code freely, even in commercial projects. Just include the original license notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">How can I contribute to the project?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Check out our <a href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Contributing Guide</a> on GitHub. You can contribute code, report bugs, suggest features, improve documentation, or help with testing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Final Thoughts</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Building EditoraPDF was a challenging but rewarding journey. We learned immense amounts about PDF processing, browser capabilities, and open-source development.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The best part? Anyone can now take this code, learn from it, modify it, or build something even better. That's the power of open source.
                </p>
                <p className="text-surface-300 leading-relaxed">
                  If you're working on a similar project or just curious about the code, check out the <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">GitHub repository</a>. We'd love to hear your feedback, answer questions, or review your pull requests.
                </p>
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

        {/* Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm text-surface-500">
                  © {new Date().getFullYear()} EditoraPDF. All rights reserved.
                </p>
                <a
                  href="https://github.com/affsquadDevs/editorapdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium hover:bg-primary-500/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Open Source
                </a>
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
