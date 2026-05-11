import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/pdf-metadata-what-is-it-and-how-to-remove`

export const metadata: Metadata = {
  title: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
  description:
    'Every PDF file contains hidden metadata — author name, creation date, GPS coordinates, software version, and more. Learn what it is and how to remove it before sharing.',
  openGraph: {
    type: 'article',
    title: 'PDF Metadata: What It Is and How to Remove It',
    description:
      'Your PDF might be leaking your name, company, location, and revision history without you knowing. Find out what metadata is hidden and how to strip it.',
    url: postUrl,
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'PDF Metadata Guide' }],
    siteName: 'EditoraPDF',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Metadata: What It Is and How to Remove It',
    description: 'Hidden data in your PDF — names, dates, tracked changes, GPS — and how to strip it.',
    images: [`${siteUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: postUrl,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PDF metadata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF metadata is information embedded in the file that is not part of the visible page content. It includes the document title, author name, creation and modification dates, software used, keywords, and sometimes GPS location data from scanned documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can PDF metadata reveal sensitive information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PDF metadata has leaked author names in anonymous submissions, revealed the real identity behind pseudonymous documents, exposed company names in tender documents, and shown revision history including deleted text through tracked changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I remove metadata from a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a tool like EditoraPDF\'s Sanitize PDF feature. It strips document info fields (author, title, subject), XMP metadata, revision history, hidden annotations, and embedded thumbnails — all locally in your browser with no server upload.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does saving a PDF to PDF/A or printing to PDF remove metadata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Printing to PDF (using the OS print dialog) removes most metadata but may embed the printer driver name and current user. Saving as PDF/A preserves XMP metadata by specification. Dedicated sanitization is the only reliable method.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
    { '@type': 'ListItem', position: 3, name: 'PDF Metadata: What It Is and How to Remove It', item: postUrl },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
  description: 'Your PDF might be leaking hidden metadata. Learn what it reveals and how to strip it.',
  image: `${siteUrl}/og/og-image.png`,
  author: { '@type': 'Organization', name: 'EditoraPDF' },
  publisher: { '@type': 'Organization', name: 'EditoraPDF', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
  datePublished: '2026-05-11',
  dateModified: '2026-05-11',
  mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  inLanguage: 'en',
  keywords: ['pdf metadata', 'remove pdf metadata', 'pdf hidden data', 'strip pdf metadata', 'sanitize pdf', 'pdf privacy'],
  articleSection: 'Privacy & Security',
  isAccessibleForFree: true,
}

export default function BlogPost() {
  return (
    <>
      <Script id="jsonld-faq-meta" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="afterInteractive" />
      <Script id="jsonld-breadcrumbs-meta" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} strategy="afterInteractive" />
      <Script id="jsonld-article-meta" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} strategy="afterInteractive" />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumbs */}
        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-surface-300">PDF Metadata: What It Is and How to Remove It</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden bg-gradient-to-br from-accent-500/20 via-surface-800 to-success-500/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative text-center px-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-300 text-xs font-semibold mb-4">
              Privacy &amp; Security
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              PDF Metadata: What It Is and How to Remove It
            </h1>
            <p className="mt-4 text-surface-400 text-base md:text-lg">Your file might be leaking your name, company, and revision history without you knowing</p>
          </div>
        </div>

        {/* Article */}
        <article className="flex-1 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">

              {/* Intro alert */}
              <div className="card p-6 mb-8 bg-accent-500/5 border border-accent-500/20">
                <p className="text-surface-300 leading-relaxed text-base">
                  In 2007, a PDF submitted by the UK Ministry of Defence about the death of an Iraqi citizen was found to contain the&nbsp;
                  <strong className="text-white">full name of an undercover intelligence officer</strong> in the metadata — information that had been carefully avoided in the visible text. Incidents like this happen regularly. Here is what your PDFs might be hiding.
                </p>
              </div>

              {/* What is metadata */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">What Is PDF Metadata?</h2>
                <p className="text-surface-400 leading-relaxed mb-4">
                  PDF metadata is data about the document stored inside the file but not rendered on any page. There are two metadata systems in the PDF specification:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  {[
                    {
                      title: 'Document Information Dictionary',
                      desc: 'The original PDF metadata format. A key-value dictionary with fields like Title, Author, Subject, Keywords, Creator, Producer, CreationDate, and ModDate.',
                      color: 'primary',
                    },
                    {
                      title: 'XMP (Extensible Metadata Platform)',
                      desc: 'An Adobe standard using embedded XML. Contains all the same fields as the document info dictionary, but can also hold custom namespaces with arbitrarily detailed data — including GPS, rights management, and workflow history.',
                      color: 'accent',
                    },
                  ].map((item) => {
                    const colors: Record<string, { border: string; text: string; bg: string }> = {
                      primary: { border: 'border-primary-500/20', text: 'text-primary-400', bg: 'bg-primary-500/5' },
                      accent:  { border: 'border-accent-500/20',  text: 'text-accent-400',  bg: 'bg-accent-500/5' },
                    }
                    const c = colors[item.color]
                    return (
                      <div key={item.title} className={`card p-5 ${c.bg} border ${c.border}`}>
                        <h3 className={`text-sm font-bold mb-2 ${c.text}`}>{item.title}</h3>
                        <p className="text-sm text-surface-400">{item.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* What metadata can reveal */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">What Metadata Can Reveal</h2>
                <div className="space-y-3">
                  {[
                    { field: 'Author', example: 'John Smith', risk: 'Reveals the real identity in anonymous submissions, whistleblower documents, or confidential proposals.' },
                    { field: 'Company', example: 'Acme Legal LLP', risk: 'Exposes the submitting organisation in sealed bids, anonymous feedback, or NDA-protected drafts.' },
                    { field: 'Creator / Producer', example: 'Microsoft Word 16.0', risk: 'Reveals the software stack. Some versions of Word embed the Windows username in the Producer field.' },
                    { field: 'CreationDate', example: '2024-03-15T09:47:22', risk: 'Can contradict stated timelines in legal disputes or reveal when a &ldquo;final&rdquo; document was actually created.' },
                    { field: 'Revision history', example: 'Title: CONFIDENTIAL DRAFT v3', risk: 'Previous document titles or subject fields can contain information stripped from the visible document.' },
                    { field: 'Embedded thumbnails', example: 'Page 1 preview image', risk: 'The embedded thumbnail image may show a version of the page before redactions were applied.' },
                    { field: 'GPS / scan metadata', example: '51.5074° N, 0.1278° W', risk: 'Scanned documents processed via mobile PDF apps can embed GPS coordinates of where the scan was taken.' },
                    { field: 'Tracked changes (via Word)', example: 'Deleted text: "the fee is $450,000"', risk: 'If a Word file with tracked changes is saved as PDF, the deleted/changed text may be embedded in the PDF structure.' },
                  ].map((item) => (
                    <div key={item.field} className="card p-4 bg-surface-800/40 border border-surface-700/50 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">Field</p>
                        <p className="text-sm font-semibold text-white">{item.field}</p>
                      </div>
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">Example value</p>
                        <p className="text-sm text-surface-400 font-mono">{item.example}</p>
                      </div>
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">Privacy risk</p>
                        <p className="text-sm text-surface-400" dangerouslySetInnerHTML={{ __html: item.risk }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* How to view metadata */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">How to View Your PDF&apos;s Metadata Right Now</h2>
                <p className="text-surface-400 leading-relaxed mb-5">
                  Before removing metadata, it&apos;s useful to see what is actually embedded in your file:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      method: 'Adobe Acrobat Reader',
                      steps: 'File → Properties → Description tab. Also check the Custom tab for any extra fields.',
                    },
                    {
                      method: 'Browser (Chrome / Firefox / Edge)',
                      steps: 'Open the PDF in the browser, then go to the URL bar and add ?view=properties at the end. Alternatively, use the browser\'s built-in PDF viewer PDF properties panel if available.',
                    },
                    {
                      method: 'Command line (ExifTool)',
                      steps: 'Run: exiftool filename.pdf — ExifTool is free, cross-platform, and shows all embedded fields including XMP namespaces.',
                    },
                    {
                      method: 'EditoraPDF — Edit Metadata tool',
                      steps: 'Upload your PDF to the Edit Metadata tool. All current field values are displayed before you make any changes.',
                    },
                  ].map((item) => (
                    <div key={item.method} className="card p-4 bg-surface-800/40 border border-surface-700/50 flex gap-4">
                      <div className="flex-shrink-0 w-2 rounded-full bg-primary-500/40" />
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">{item.method}</p>
                        <p className="text-sm text-surface-400">{item.steps}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* How to remove */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">How to Remove Metadata from a PDF</h2>
                <div className="space-y-5">
                  {[
                    {
                      step: 1,
                      title: 'Use the Sanitize PDF tool',
                      body: <>Open <Link href="/tools/remove-hidden-data" className="text-primary-400 hover:text-primary-300 underline">EditoraPDF → Sanitize PDF</Link>. This strips all Document Information Dictionary fields, XMP metadata, embedded thumbnails, hidden annotations, and scripts.</>,
                    },
                    {
                      step: 2,
                      title: 'Or manually clear individual fields',
                      body: <>If you want to keep some metadata (like the title) while removing others, use <Link href="/tools/edit-metadata" className="text-primary-400 hover:text-primary-300 underline">Edit Metadata</Link> to clear or update specific fields.</>,
                    },
                    {
                      step: 3,
                      title: 'Verify the result',
                      body: 'Open the sanitized PDF in Acrobat or run ExifTool on it. Author, Creator, and XMP data should now be absent or blank.',
                    },
                    {
                      step: 4,
                      title: 'For maximum privacy, also apply redaction',
                      body: <>If the document has sensitive visible content, combine sanitization with <Link href="/tools/redact" className="text-primary-400 hover:text-primary-300 underline">Redact PDF</Link> to ensure neither the visible content nor the hidden metadata leaks information.</>,
                    },
                  ].map((item) => (
                    <div key={item.step} className="card p-6 bg-surface-800/40 border border-surface-700/50 flex gap-5">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-500/20 text-accent-300 font-bold text-sm flex items-center justify-center">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-surface-400 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* When to remove */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-5">When Should You Remove PDF Metadata?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Before submitting a document anonymously or pseudonymously',
                    'Before sending to opposing counsel in legal proceedings',
                    'Before publishing PDFs on public websites or portals',
                    'Before submitting tender, bid, or grant applications',
                    'Before sharing any document outside your organisation',
                    'Before archiving documents with personal data (GDPR compliance)',
                    'After scanning documents with a mobile device (GPS risk)',
                    'Before sharing whistleblower or source-protection documents',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-surface-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'What is PDF metadata?',
                      a: 'Hidden data embedded in the file structure: author name, creation date, software used, keywords, GPS location, revision history, and more — none of it visible on the page.',
                    },
                    {
                      q: 'Can PDF metadata reveal sensitive information?',
                      a: 'Yes — it has exposed undercover agent identities, leaked real authors of anonymous documents, revealed company names in sealed bids, and shown deleted text through tracked changes.',
                    },
                    {
                      q: 'How do I remove metadata from a PDF?',
                      a: 'Use EditoraPDF\'s Sanitize PDF tool. It strips all Document Info fields, XMP metadata, embedded thumbnails, hidden annotations, and scripts — entirely in your browser, no server upload.',
                    },
                    {
                      q: 'Does printing to PDF remove metadata?',
                      a: 'Mostly, but not reliably. The print driver may embed its own metadata. Dedicated sanitization is the only way to guarantee a clean file.',
                    },
                  ].map((item) => (
                    <details key={item.q} className="group card p-5 bg-surface-800/40 border border-surface-700/50 cursor-pointer">
                      <summary className="flex items-center justify-between gap-3 font-semibold text-white text-sm list-none">
                        {item.q}
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-surface-400 group-open:rotate-45 transition-transform duration-200">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-surface-400 leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="card p-8 text-center bg-gradient-to-br from-accent-500/10 via-surface-800/60 to-success-500/10 border-accent-500/20">
                <h2 className="text-xl font-bold text-white mb-3">Strip Hidden Data from Your PDF</h2>
                <p className="text-surface-400 text-sm mb-6 max-w-lg mx-auto">
                  Use the free Sanitize PDF tool — removes all metadata, hidden annotations, and embedded thumbnails locally in your browser.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/tools/remove-hidden-data" className="btn-primary inline-flex items-center gap-2 group">
                    Sanitize PDF
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <Link href="/tools/edit-metadata" className="btn-secondary inline-flex items-center gap-2">
                    Edit Metadata
                  </Link>
                </div>
                <p className="text-xs text-surface-500 mt-4">Free · No signup · No server uploads</p>
              </div>

            </div>
          </div>
        </article>

        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
