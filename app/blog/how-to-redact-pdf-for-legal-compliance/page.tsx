import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/how-to-redact-pdf-for-legal-compliance`

export const metadata: Metadata = {
  title: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
  description:
    'Learn how to permanently redact sensitive information from PDFs to meet GDPR, HIPAA, FOIA, and other compliance requirements. Step-by-step guide with best practices.',
  openGraph: {
    type: 'article',
    title: 'How to Redact a PDF for Legal Compliance',
    description:
      'A practical guide to redacting PDFs correctly for GDPR, HIPAA, FOIA, and legal proceedings. Avoid the most common redaction mistakes.',
    url: postUrl,
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'Redact PDF for Legal Compliance' }],
    siteName: 'EditoraPDF',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Redact a PDF for Legal Compliance',
    description: 'GDPR, HIPAA, FOIA — redact PDFs correctly and avoid costly mistakes.',
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
      name: 'What is the difference between redaction and covering text with a black box?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Covering text with a black box (such as drawing a rectangle over it) only hides the text visually — the original text remains in the PDF structure and can be selected, copied, or revealed by removing the box. True redaction permanently removes the underlying text or image data from the file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is redacting a PDF online safe for confidential legal documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on whether the tool processes files locally or uploads them to a server. EditoraPDF performs all redaction entirely in your browser — no file is ever sent to a server — making it safe for confidential legal documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does redaction in EditoraPDF permanently remove the text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. EditoraPDF\'s Redact PDF tool flattens the selected areas into opaque marks and removes the underlying content from the PDF structure, so it cannot be recovered by copying, searching, or inspecting the file.',
      },
    },
    {
      '@type': 'Question',
      name: 'What regulations require PDF redaction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common regulations that require proper redaction include GDPR (EU data protection), HIPAA (US healthcare privacy), FOIA (US freedom of information), and various court rules in legal proceedings. Each has specific requirements about what must be removed and how.',
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
    { '@type': 'ListItem', position: 3, name: 'How to Redact PDF for Legal Compliance', item: postUrl },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
  description: 'A practical guide to redacting PDFs correctly for GDPR, HIPAA, FOIA, and legal proceedings.',
  image: `${siteUrl}/og/og-image.png`,
  author: { '@type': 'Organization', name: 'EditoraPDF' },
  publisher: { '@type': 'Organization', name: 'EditoraPDF', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
  datePublished: '2026-05-11',
  dateModified: '2026-05-11',
  mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  inLanguage: 'en',
  keywords: ['redact pdf', 'pdf redaction', 'gdpr pdf', 'hipaa pdf', 'foia redaction', 'legal pdf compliance'],
  articleSection: 'Security & Compliance',
  isAccessibleForFree: true,
}

export default function BlogPost() {
  return (
    <>
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="afterInteractive" />
      <Script id="jsonld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} strategy="afterInteractive" />
      <Script id="jsonld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} strategy="afterInteractive" />

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
              <li className="text-surface-300">How to Redact PDF for Legal Compliance</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden bg-gradient-to-br from-error-500/20 via-surface-800 to-primary-500/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative text-center px-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error-500/20 border border-error-500/30 text-error-300 text-xs font-semibold mb-4">
              Security &amp; Compliance
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              How to Redact a PDF for Legal Compliance
            </h1>
            <p className="mt-4 text-surface-400 text-base md:text-lg">GDPR, HIPAA, FOIA &amp; Legal Proceedings — do it right the first time</p>
          </div>
        </div>

        {/* Article */}
        <article className="flex-1 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">

              {/* Intro */}
              <div className="card p-6 mb-8 bg-error-500/5 border border-error-500/20">
                <p className="text-surface-300 leading-relaxed text-base">
                  PDF redaction mistakes have cost organisations millions. The NSA, the UK government, and major law firms have all accidentally leaked classified or privileged information by&nbsp;
                  <strong className="text-white">drawing boxes over text</strong> rather than truly removing it. This guide explains the right way to redact a PDF and what the law actually requires.
                </p>
              </div>

              {/* Why proper redaction matters */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Why Proper Redaction Matters</h2>
                <p className="text-surface-400 leading-relaxed mb-4">
                  A PDF is not simply a picture of a page. It is a structured file containing layers of data: text streams, fonts, embedded images, annotations, form fields, and metadata. When you place a black rectangle on top of text, the original text remains in the file in those underlying layers. Anyone who:
                </p>
                <ul className="space-y-2 text-surface-400 mb-4 list-none">
                  {[
                    'opens the file in a text editor and searches for patterns',
                    'copies the &ldquo;blacked out&rdquo; area and pastes it elsewhere',
                    'removes the annotation layer using a PDF tool',
                    'examines the raw PDF bytes with a hex editor',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error-400 mt-2 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <p className="text-surface-400 leading-relaxed">
                  …can recover the &ldquo;hidden&rdquo; text. True redaction removes the content from the file structure entirely, making recovery impossible.
                </p>
              </section>

              {/* What regulations require */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">What Each Regulation Requires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      title: 'GDPR (EU)',
                      color: 'primary',
                      items: [
                        'Right to erasure — personal data must be irreversibly removed',
                        'Court documents and HR files shared externally must redact all non-relevant personal identifiers',
                        'Retention of original unredacted copy must follow a lawful basis',
                      ],
                    },
                    {
                      title: 'HIPAA (US Healthcare)',
                      color: 'accent',
                      items: [
                        'Protected Health Information (PHI) must be de-identified before sharing',
                        '18 specific identifiers must be removed: name, dates, location codes, contact info, SSN, and more',
                        'Safe Harbor method requires removal of all 18 identifiers; Expert Determination requires statistical verification',
                      ],
                    },
                    {
                      title: 'FOIA (US Federal)',
                      color: 'success',
                      items: [
                        'Nine exemption categories allow agencies to redact: national security, internal rules, trade secrets, personal privacy, law enforcement, etc.',
                        'Segregable portions must be released — only exempt information may be redacted',
                        'Agencies must log what was redacted and cite the exemption',
                      ],
                    },
                    {
                      title: 'Court & Legal Proceedings',
                      color: 'warning',
                      items: [
                        'FRCP Rule 5.2 (US Federal): redact SSNs to last 4 digits, financial accounts to last 4 digits, DOB to year only, minor names to initials',
                        'Many jurisdictions require redaction of home addresses and phone numbers',
                        'Privilege log must itemise redacted privileged communications',
                      ],
                    },
                  ].map((card) => {
                    const colors: Record<string, { border: string; text: string; bg: string }> = {
                      primary: { border: 'border-primary-500/20', text: 'text-primary-400', bg: 'bg-primary-500/5' },
                      accent:  { border: 'border-accent-500/20',  text: 'text-accent-400',  bg: 'bg-accent-500/5' },
                      success: { border: 'border-success-500/20', text: 'text-success-400', bg: 'bg-success-500/5' },
                      warning: { border: 'border-warning-500/20', text: 'text-warning-400', bg: 'bg-warning-500/5' },
                    }
                    const c = colors[card.color]
                    return (
                      <div key={card.title} className={`card p-5 ${c.bg} border ${c.border}`}>
                        <h3 className={`text-base font-bold mb-3 ${c.text}`}>{card.title}</h3>
                        <ul className="space-y-2">
                          {card.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-surface-400">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.text.replace('text-', 'bg-')}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Step by step */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step: Redact a PDF with EditoraPDF</h2>
                <div className="space-y-5">
                  {[
                    {
                      step: 1,
                      title: 'Open the Redact PDF tool',
                      body: <>Navigate to <Link href="/tools/redact" className="text-primary-400 hover:text-primary-300 underline">EditoraPDF → Redact PDF</Link> and upload your file. No data leaves your browser.</>,
                    },
                    {
                      step: 2,
                      title: 'Select the areas to redact',
                      body: 'Click and drag to draw redaction boxes over each piece of text, image, or area that must be removed. You can add multiple boxes across multiple pages.',
                    },
                    {
                      step: 3,
                      title: 'Apply the redaction',
                      body: 'Click "Apply Redactions". EditoraPDF permanently removes the underlying content from the PDF data structure and replaces it with a solid filled rectangle — not just a visual overlay.',
                    },
                    {
                      step: 4,
                      title: 'Sanitize metadata (recommended)',
                      body: <>After redacting, run the file through <Link href="/tools/remove-hidden-data" className="text-primary-400 hover:text-primary-300 underline">Sanitize PDF</Link> to strip document metadata (author, creation date, tracked changes, embedded thumbnails) that might reveal information about the original content.</>,
                    },
                    {
                      step: 5,
                      title: 'Verify the result',
                      body: 'Open the downloaded PDF, try to select the redacted areas and press Ctrl+C. You should not be able to copy any text. Search (Ctrl+F) for the redacted terms — they should not be found.',
                    },
                    {
                      step: 6,
                      title: 'Document the redactions',
                      body: 'For compliance purposes, maintain a log of what was redacted, the reason (regulation or exemption category), and the date. This is required under FOIA and strongly recommended for HIPAA and GDPR.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="card p-6 bg-surface-800/40 border border-surface-700/50 flex gap-5">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-500/20 text-primary-300 font-bold text-sm flex items-center justify-center">
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

              {/* Common mistakes */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Common Redaction Mistakes to Avoid</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      mistake: 'Black rectangle overlay without burning in',
                      consequence: 'Text remains in the file. Anyone can remove the box to reveal it.',
                    },
                    {
                      mistake: 'Redacting in Word then exporting to PDF',
                      consequence: 'The "deleted" text may be recoverable from tracked changes or the file\'s undo history that gets embedded in the PDF.',
                    },
                    {
                      mistake: 'Forgetting document metadata',
                      consequence: 'Author names, revision history, and comments in the PDF metadata may reveal what was redacted or who created the document.',
                    },
                    {
                      mistake: 'Redacting only visible pages',
                      consequence: 'PDFs can contain hidden layers, annotations, and embedded objects on non-visible layers that also need to be checked.',
                    },
                    {
                      mistake: 'Using low-contrast marks',
                      consequence: 'Dark grey on black may not provide sufficient contrast in print. Use solid black fills.',
                    },
                    {
                      mistake: 'Not keeping the unredacted original',
                      consequence: 'Legal workflows often require retaining the unredacted version in a secure location for audit purposes.',
                    },
                  ].map((item) => (
                    <div key={item.mistake} className="card p-4 bg-error-500/5 border border-error-500/20">
                      <p className="text-sm font-semibold text-error-300 mb-1">{item.mistake}</p>
                      <p className="text-xs text-surface-500">{item.consequence}</p>
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
                      q: 'What is the difference between redaction and covering text with a black box?',
                      a: 'Covering text with a box hides it visually but leaves it in the file data. True redaction removes the underlying content permanently from the PDF structure.',
                    },
                    {
                      q: 'Is redacting a PDF online safe for confidential legal documents?',
                      a: 'Only if the tool processes files locally. EditoraPDF runs entirely in your browser — your file never reaches any server, making it safe for privileged or confidential documents.',
                    },
                    {
                      q: 'Does EditoraPDF permanently remove the text?',
                      a: 'Yes. The Redact PDF tool removes underlying content from the PDF data structure, not just overlays a mark. The redacted text cannot be recovered by selecting, copying, or searching.',
                    },
                    {
                      q: 'What regulations require PDF redaction?',
                      a: 'GDPR, HIPAA, FOIA, and court filing rules (such as FRCP Rule 5.2 in the US) all require proper redaction of personal, privileged, or exempt information before sharing documents.',
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
              <div className="card p-8 text-center bg-gradient-to-br from-error-500/10 via-surface-800/60 to-primary-500/10 border-error-500/20">
                <h2 className="text-xl font-bold text-white mb-3">Ready to Redact Properly?</h2>
                <p className="text-surface-400 text-sm mb-6 max-w-lg mx-auto">
                  Use EditoraPDF&apos;s free Redact tool — all processing happens locally in your browser, so your confidential documents stay confidential.
                </p>
                <Link href="/tools/redact" className="btn-primary inline-flex items-center gap-2 group">
                  Open Redact PDF Tool
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
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
