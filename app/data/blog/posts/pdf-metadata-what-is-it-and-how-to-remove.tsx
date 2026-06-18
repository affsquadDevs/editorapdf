import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'pdf-metadata-what-is-it-and-how-to-remove'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-05-11'
const dateModified = '2026-05-11'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup and all code
// tokens stay in the JSX below — only the prose text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
    metaDesc:
      'Every PDF file contains hidden metadata — author name, creation date, GPS coordinates, software version, and more. Learn what it is and how to remove it before sharing.',
    ogTitle: 'PDF Metadata: What It Is and How to Remove It',
    ogDesc:
      'Your PDF might be leaking your name, company, location, and revision history without you knowing. Find out what metadata is hidden and how to strip it.',
    ogImageAlt: 'PDF Metadata Guide',
    twTitle: 'PDF Metadata: What It Is and How to Remove It',
    twDesc: 'Hidden data in your PDF — names, dates, tracked changes, GPS — and how to strip it.',

    artHeadline: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
    artDesc: 'Your PDF might be leaking hidden metadata. Learn what it reveals and how to strip it.',

    bcLeaf: 'PDF Metadata: What It Is and How to Remove It',
    heroBadge: 'Privacy & Security',
    heroTitle: 'PDF Metadata: What It Is and How to Remove It',
    heroSubtitle: 'Your file might be leaking your name, company, and revision history without you knowing',

    // Schema FAQ (4)
    fq1q: 'What is PDF metadata?',
    fq1a: 'PDF metadata is information embedded in the file that is not part of the visible page content. It includes the document title, author name, creation and modification dates, software used, keywords, and sometimes GPS location data from scanned documents.',
    fq2q: 'Can PDF metadata reveal sensitive information?',
    fq2a: 'Yes. PDF metadata has leaked author names in anonymous submissions, revealed the real identity behind pseudonymous documents, exposed company names in tender documents, and shown revision history including deleted text through tracked changes.',
    fq3q: 'How do I remove metadata from a PDF?',
    fq3a: "Use a tool like EditoraPDF's Sanitize PDF feature. It strips document info fields (author, title, subject), XMP metadata, revision history, hidden annotations, and embedded thumbnails — all locally in your browser with no server upload.",
    fq4q: 'Does saving a PDF to PDF/A or printing to PDF remove metadata?',
    fq4a: 'Printing to PDF (using the OS print dialog) removes most metadata but may embed the printer driver name and current user. Saving as PDF/A preserves XMP metadata by specification. Dedicated sanitization is the only reliable method.',

    // Intro alert (has inline <strong>; split around it)
    introA:
      'In 2007, a PDF submitted by the UK Ministry of Defence about the death of an Iraqi citizen was found to contain the ',
    introStrong: 'full name of an undercover intelligence officer',
    introB:
      ' in the metadata — information that had been carefully avoided in the visible text. Incidents like this happen regularly. Here is what your PDFs might be hiding.',

    // What is metadata
    s1h: 'What Is PDF Metadata?',
    s1p: 'PDF metadata is data about the document stored inside the file but not rendered on any page. There are two metadata systems in the PDF specification:',
    s1c1t: 'Document Information Dictionary',
    s1c1d: 'The original PDF metadata format. A key-value dictionary with fields like Title, Author, Subject, Keywords, Creator, Producer, CreationDate, and ModDate.',
    s1c2t: 'XMP (Extensible Metadata Platform)',
    s1c2d: 'An Adobe standard using embedded XML. Contains all the same fields as the document info dictionary, but can also hold custom namespaces with arbitrarily detailed data — including GPS, rights management, and workflow history.',

    // What metadata can reveal (table). Column labels + rows.
    s2h: 'What Metadata Can Reveal',
    s2colField: 'Field',
    s2colExample: 'Example value',
    s2colRisk: 'Privacy risk',
    r1field: 'Author',
    r1example: 'John Smith',
    r1risk: 'Reveals the real identity in anonymous submissions, whistleblower documents, or confidential proposals.',
    r2field: 'Company',
    r2example: 'Acme Legal LLP',
    r2risk: 'Exposes the submitting organisation in sealed bids, anonymous feedback, or NDA-protected drafts.',
    r3field: 'Creator / Producer',
    r3example: 'Microsoft Word 16.0',
    r3risk: 'Reveals the software stack. Some versions of Word embed the Windows username in the Producer field.',
    r4field: 'CreationDate',
    r4example: '2024-03-15T09:47:22',
    r4risk: 'Can contradict stated timelines in legal disputes or reveal when a &ldquo;final&rdquo; document was actually created.',
    r5field: 'Revision history',
    r5example: 'Title: CONFIDENTIAL DRAFT v3',
    r5risk: 'Previous document titles or subject fields can contain information stripped from the visible document.',
    r6field: 'Embedded thumbnails',
    r6example: 'Page 1 preview image',
    r6risk: 'The embedded thumbnail image may show a version of the page before redactions were applied.',
    r7field: 'GPS / scan metadata',
    r7example: '51.5074° N, 0.1278° W',
    r7risk: 'Scanned documents processed via mobile PDF apps can embed GPS coordinates of where the scan was taken.',
    r8field: 'Tracked changes (via Word)',
    r8example: 'Deleted text: "the fee is $450,000"',
    r8risk: 'If a Word file with tracked changes is saved as PDF, the deleted/changed text may be embedded in the PDF structure.',

    // How to view metadata
    s3h: "How to View Your PDF's Metadata Right Now",
    s3p: "Before removing metadata, it's useful to see what is actually embedded in your file:",
    v1method: 'Adobe Acrobat Reader',
    v1steps: 'File → Properties → Description tab. Also check the Custom tab for any extra fields.',
    v2method: 'Browser (Chrome / Firefox / Edge)',
    v2steps: "Open the PDF in the browser, then go to the URL bar and add ?view=properties at the end. Alternatively, use the browser's built-in PDF viewer PDF properties panel if available.",
    v3method: 'Command line (ExifTool)',
    v3steps: 'Run: exiftool filename.pdf — ExifTool is free, cross-platform, and shows all embedded fields including XMP namespaces.',
    v4method: 'EditoraPDF — Edit Metadata tool',
    v4steps: 'Upload your PDF to the Edit Metadata tool. All current field values are displayed before you make any changes.',

    // How to remove (steps; some have inline <Link>)
    s4h: 'How to Remove Metadata from a PDF',
    st1title: 'Use the Sanitize PDF tool',
    st1a: 'Open ',
    st1link: 'EditoraPDF → Sanitize PDF',
    st1b: '. This strips all Document Information Dictionary fields, XMP metadata, embedded thumbnails, hidden annotations, and scripts.',
    st2title: 'Or manually clear individual fields',
    st2a: 'If you want to keep some metadata (like the title) while removing others, use ',
    st2link: 'Edit Metadata',
    st2b: ' to clear or update specific fields.',
    st3title: 'Verify the result',
    st3body: 'Open the sanitized PDF in Acrobat or run ExifTool on it. Author, Creator, and XMP data should now be absent or blank.',
    st4title: 'For maximum privacy, also apply redaction',
    st4a: 'If the document has sensitive visible content, combine sanitization with ',
    st4link: 'Redact PDF',
    st4b: ' to ensure neither the visible content nor the hidden metadata leaks information.',

    // When to remove (checklist)
    s5h: 'When Should You Remove PDF Metadata?',
    w1: 'Before submitting a document anonymously or pseudonymously',
    w2: 'Before sending to opposing counsel in legal proceedings',
    w3: 'Before publishing PDFs on public websites or portals',
    w4: 'Before submitting tender, bid, or grant applications',
    w5: 'Before sharing any document outside your organisation',
    w6: 'Before archiving documents with personal data (GDPR compliance)',
    w7: 'After scanning documents with a mobile device (GPS risk)',
    w8: 'Before sharing whistleblower or source-protection documents',

    // Visible FAQ (4)
    fv1q: 'What is PDF metadata?',
    fv1a: 'Hidden data embedded in the file structure: author name, creation date, software used, keywords, GPS location, revision history, and more — none of it visible on the page.',
    fv2q: 'Can PDF metadata reveal sensitive information?',
    fv2a: 'Yes — it has exposed undercover agent identities, leaked real authors of anonymous documents, revealed company names in sealed bids, and shown deleted text through tracked changes.',
    fv3q: 'How do I remove metadata from a PDF?',
    fv3a: "Use EditoraPDF's Sanitize PDF tool. It strips all Document Info fields, XMP metadata, embedded thumbnails, hidden annotations, and scripts — entirely in your browser, no server upload.",
    fv4q: 'Does printing to PDF remove metadata?',
    fv4a: 'Mostly, but not reliably. The print driver may embed its own metadata. Dedicated sanitization is the only way to guarantee a clean file.',

    // CTA
    ctaTitle: 'Strip Hidden Data from Your PDF',
    ctaBody: 'Use the free Sanitize PDF tool — removes all metadata, hidden annotations, and embedded thumbnails locally in your browser.',
    ctaBtn1: 'Sanitize PDF',
    ctaBtn2: 'Edit Metadata',
    ctaNote: 'Free · No signup · No server uploads',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Per-key fallback to English so a missing translation never blanks the page.
  return new Proxy(base, { get: (_t, k: string) => (over[k] && over[k].length ? over[k] : base[k]) }) as Content
}

export function meta(locale: AppLocale): Metadata {
  const c = content(locale)
  const url = postUrl(locale)
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogImageAlt }],
      siteName: 'EditoraPDF',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}${ogImage}`],
    },
    alternates: localeAlternates(locale, postPath),
  }
}

export function schemas(locale: AppLocale): Record<string, unknown>[] {
  const c = content(locale)
  const url = postUrl(locale)
  const m = getMessages(locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3, 4].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fq${n}a`] },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m['blog.bcHome'] || 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: m['blog.bcBlog'] || 'Blog', item: `${siteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: c.bcLeaf, item: url },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: c.artHeadline,
    description: c.artDesc,
    image: `${siteUrl}${ogImage}`,
    author: { '@type': 'Organization', name: 'EditoraPDF Team' },
    publisher: { '@type': 'Organization', name: 'EditoraPDF', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: locale,
    keywords: ['pdf metadata', 'remove pdf metadata', 'pdf hidden data', 'strip pdf metadata', 'sanitize pdf', 'pdf privacy'],
    articleSection: 'Privacy & Security',
    isAccessibleForFree: true,
  }
  return [faqSchema, breadcrumbSchema, articleSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => `/${locale}${p}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li><Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link></li>
            <li>/</li>
            <li><Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link></li>
            <li>/</li>
            <li className="text-surface-300">{c.bcLeaf}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden bg-gradient-to-br from-accent-500/20 via-surface-800 to-success-500/10 flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-300 text-xs font-semibold mb-4">
            {c.heroBadge}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {c.heroTitle}
          </h1>
          <p className="mt-4 text-surface-400 text-base md:text-lg">{c.heroSubtitle}</p>
          <BlogByline locale={locale} datePublished={datePublished} />
        </div>
      </div>

      {/* Article */}
      <article className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">

            {/* Intro alert */}
            <div className="card p-6 mb-8 bg-accent-500/5 border border-accent-500/20">
              <p className="text-surface-300 leading-relaxed text-base">
                {c.introA}
                <strong className="text-white">{c.introStrong}</strong>{c.introB}
              </p>
            </div>

            {/* What is metadata */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{c.s1h}</h2>
              <p className="text-surface-400 leading-relaxed mb-4">
                {c.s1p}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {[
                  {
                    key: 'c1',
                    title: c.s1c1t,
                    desc: c.s1c1d,
                    color: 'primary',
                  },
                  {
                    key: 'c2',
                    title: c.s1c2t,
                    desc: c.s1c2d,
                    color: 'accent',
                  },
                ].map((item) => {
                  const colors: Record<string, { border: string; text: string; bg: string }> = {
                    primary: { border: 'border-primary-500/20', text: 'text-primary-400', bg: 'bg-primary-500/5' },
                    accent:  { border: 'border-accent-500/20',  text: 'text-accent-400',  bg: 'bg-accent-500/5' },
                  }
                  const cc = colors[item.color]
                  return (
                    <div key={item.key} className={`card p-5 ${cc.bg} border ${cc.border}`}>
                      <h3 className={`text-sm font-bold mb-2 ${cc.text}`}>{item.title}</h3>
                      <p className="text-sm text-surface-400">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* What metadata can reveal */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{c.s2h}</h2>
              <div className="space-y-3">
                {[
                  { key: 'r1', field: c.r1field, example: c.r1example, risk: c.r1risk },
                  { key: 'r2', field: c.r2field, example: c.r2example, risk: c.r2risk },
                  { key: 'r3', field: c.r3field, example: c.r3example, risk: c.r3risk },
                  { key: 'r4', field: c.r4field, example: c.r4example, risk: c.r4risk },
                  { key: 'r5', field: c.r5field, example: c.r5example, risk: c.r5risk },
                  { key: 'r6', field: c.r6field, example: c.r6example, risk: c.r6risk },
                  { key: 'r7', field: c.r7field, example: c.r7example, risk: c.r7risk },
                  { key: 'r8', field: c.r8field, example: c.r8example, risk: c.r8risk },
                ].map((item) => (
                  <div key={item.key} className="card p-4 bg-surface-800/40 border border-surface-700/50 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">{c.s2colField}</p>
                      <p className="text-sm font-semibold text-white">{item.field}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">{c.s2colExample}</p>
                      <p className="text-sm text-surface-400 font-mono">{item.example}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">{c.s2colRisk}</p>
                      <p className="text-sm text-surface-400" dangerouslySetInnerHTML={{ __html: item.risk }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How to view metadata */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">{c.s3h}</h2>
              <p className="text-surface-400 leading-relaxed mb-5">
                {c.s3p}
              </p>
              <div className="space-y-4">
                {[
                  { key: 'v1', method: c.v1method, steps: c.v1steps },
                  { key: 'v2', method: c.v2method, steps: c.v2steps },
                  { key: 'v3', method: c.v3method, steps: c.v3steps },
                  { key: 'v4', method: c.v4method, steps: c.v4steps },
                ].map((item) => (
                  <div key={item.key} className="card p-4 bg-surface-800/40 border border-surface-700/50 flex gap-4">
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
              <h2 className="text-2xl font-bold text-white mb-6">{c.s4h}</h2>
              <div className="space-y-5">
                {[
                  {
                    step: 1,
                    title: c.st1title,
                    body: <>{c.st1a}<Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.st1link}</Link>{c.st1b}</>,
                  },
                  {
                    step: 2,
                    title: c.st2title,
                    body: <>{c.st2a}<Link href={L('/tools/edit-metadata')} className="text-primary-400 hover:text-primary-300 underline">{c.st2link}</Link>{c.st2b}</>,
                  },
                  {
                    step: 3,
                    title: c.st3title,
                    body: c.st3body,
                  },
                  {
                    step: 4,
                    title: c.st4title,
                    body: <>{c.st4a}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.st4link}</Link>{c.st4b}</>,
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
              <h2 className="text-2xl font-bold text-white mb-5">{c.s5h}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'w1', text: c.w1 },
                  { key: 'w2', text: c.w2 },
                  { key: 'w3', text: c.w3 },
                  { key: 'w4', text: c.w4 },
                  { key: 'w5', text: c.w5 },
                  { key: 'w6', text: c.w6 },
                  { key: 'w7', text: c.w7 },
                  { key: 'w8', text: c.w8 },
                ].map((item) => (
                  <div key={item.key} className="flex items-start gap-2 text-sm text-surface-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-400 mt-1.5 flex-shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>
              <div className="space-y-4">
                {[
                  { key: 'fv1', q: c.fv1q, a: c.fv1a },
                  { key: 'fv2', q: c.fv2q, a: c.fv2a },
                  { key: 'fv3', q: c.fv3q, a: c.fv3a },
                  { key: 'fv4', q: c.fv4q, a: c.fv4a },
                ].map((item) => (
                  <details key={item.key} className="group card p-5 bg-surface-800/40 border border-surface-700/50 cursor-pointer">
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
              <h2 className="text-xl font-bold text-white mb-3">{c.ctaTitle}</h2>
              <p className="text-surface-400 text-sm mb-6 max-w-lg mx-auto">
                {c.ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={L('/tools/remove-hidden-data')} className="btn-primary inline-flex items-center gap-2 group">
                  {c.ctaBtn1}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href={L('/tools/edit-metadata')} className="btn-secondary inline-flex items-center gap-2">
                  {c.ctaBtn2}
                </Link>
              </div>
              <p className="text-xs text-surface-500 mt-4">{c.ctaNote}</p>
            </div>

          </div>
        </div>
      </article>

      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './pdf-metadata-what-is-it-and-how-to-remove.i18n'
Object.assign(C, TRANSLATIONS)
