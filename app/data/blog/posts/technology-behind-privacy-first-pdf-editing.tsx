import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'technology-behind-privacy-first-pdf-editing'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-02-13'
const dateModified = '2026-02-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<a>/<Link> markup stays in the
// JSX below — only the text segments are keyed here. Code/<code> tokens stay literal.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'The Technology Behind Privacy-First PDF Editing | EditoraPDF Blog',
    metaDesc: 'Explore how client-side processing, PDF.js, pdf-lib, and modern web technologies enable truly private PDF editing without server uploads. Technical deep dive.',
    ogTitle: 'The Technology Behind Privacy-First PDF Editing',
    ogDesc: 'Explore how client-side processing enables truly private PDF editing without server uploads.',
    ogAlt: 'Technology behind privacy-first PDF editing',
    twTitle: 'The Technology Behind Privacy-First PDF Editing',
    twDesc: 'How client-side processing enables private PDF editing.',

    artHeadline: 'The Technology Behind Privacy-First PDF Editing',
    artDesc: 'Technical exploration of client-side PDF processing technologies that enable privacy-first editing',

    bcLeaf: 'Technology Behind Privacy-First PDF Editing',

    // FAQ schema (3)
    fq1q: 'How does client-side PDF processing work?',
    fq1a: 'Client-side PDF processing uses JavaScript libraries like PDF.js and pdf-lib that run entirely in the browser. Files are loaded into memory, processed locally, and never uploaded to any server.',
    fq2q: 'Is client-side PDF editing secure?',
    fq2a: 'Yes, client-side processing is more secure for privacy because files never leave your device. However, users should still be cautious about browser extensions and ensure they trust the website.',
    fq3q: 'What technologies power privacy-first PDF editors?',
    fq3a: 'Privacy-first PDF editors use PDF.js for rendering, pdf-lib for manipulation, Web Workers for performance, and modern JavaScript APIs. All processing happens in the browser without server communication.',

    // Hero
    pillPrivacy: 'Privacy',
    pillTechnology: 'Technology',
    published: 'Published: February 13, 2026',
    readTime: '7 min read',
    heroTitle: 'The Technology Behind Privacy-First PDF Editing',
    heroSubtitle: 'How client-side processing, PDF.js, and modern web technologies enable truly private PDF editing',

    intro1a: 'Most online PDF editors require you to upload your files to their servers. But what if we told you that ',
    intro1b: 'all PDF processing can happen entirely in your browser',
    intro1c: ' — with zero server uploads? This is the technology behind privacy-first PDF editing.',

    s1h: 'The Client-Side Revolution',
    s1p1: 'Traditional PDF editors work like this:',
    s1l1: 'You upload your PDF to their server',
    s1l2: 'Server processes the file',
    s1l3: 'Server sends back the edited version',
    s1l4: 'Your file remains on their server (often indefinitely)',
    s1p2: 'Privacy-first editors work differently:',
    s1m1: 'You load your PDF in the browser',
    s1m2: 'JavaScript libraries process it locally',
    s1m3: 'All editing happens in memory',
    s1m4: 'You download the result — file never leaves your device',

    s2h: 'Core Technologies',
    s2h1: 'PDF.js: Rendering Engine',
    s2p1a: 'PDF.js',
    s2p1b: ' by Mozilla is the powerhouse behind browser-based PDF rendering. It\'s what Firefox uses natively.',
    s2l1a: 'Canvas rendering',
    s2l1b: ' — Converts PDF pages to HTML5 canvas elements',
    s2l2a: 'Text extraction',
    s2l2b: ' — Extracts text with positioning data',
    s2l3a: 'Web Workers',
    s2l3b: ' — Processes PDFs in background threads for performance',
    s2l4a: 'Zero dependencies',
    s2l4b: ' — Pure JavaScript, no server needed',
    s2h2: 'pdf-lib: PDF Manipulation',
    s2p2a: 'pdf-lib',
    s2p2b: ' handles creating and modifying PDFs entirely in the browser.',
    s2m1a: 'Create PDFs',
    s2m1b: ' — Build new documents from scratch',
    s2m2a: 'Modify existing PDFs',
    s2m2b: ' — Add pages, rotate, delete, embed content',
    s2m3a: 'Embed text and images',
    s2m3b: ' — Add overlays and annotations',
    s2m4a: 'Browser-native',
    s2m4b: ' — No Node.js or server required',
    s2h3: 'Modern JavaScript APIs',
    s2p3: 'Modern browsers provide powerful APIs that enable client-side processing:',
    s2n1a: 'File API',
    s2n1b: ' — Read files from user\'s device',
    s2n2a: 'Blob API',
    s2n2b: ' — Handle binary data in memory',
    s2n3a: 'Web Workers',
    s2n3b: ' — Offload heavy processing',
    s2n4a: 'IndexedDB',
    s2n4b: ' — Optional local caching',

    s3h: 'How It Works: Step by Step',
    s3c1h: '1. File Loading',
    s3c1p: 'User selects a PDF file. Browser reads it into memory using the File API. No network request is made.',
    s3c2h: '2. PDF Parsing',
    s3c2p: 'PDF.js parses the binary data, extracts page information, fonts, and content structure.',
    s3c3h: '3. Rendering',
    s3c3p: 'Each page is rendered to an HTML5 canvas element. Text is extracted with coordinates for editing.',
    s3c4h: '4. Editing',
    s3c4p: 'User makes edits (text, images, shapes). Changes are stored in memory as overlay data structures.',
    s3c5h: '5. Export',
    s3c5p: 'pdf-lib creates a new PDF, applies all edits, and generates a downloadable blob. File never leaves the browser.',

    s4h: 'Privacy Benefits',
    s4c1h: '✓ No Server Uploads',
    s4c1p: 'Files never leave your device, eliminating data breach risks',
    s4c2h: '✓ No Tracking',
    s4c2p: 'No server means no analytics, no logging, no data collection',
    s4c3h: '✓ Works Offline',
    s4c3p: 'Once loaded, you can edit without internet connection',
    s4c4h: '✓ Verifiable',
    s4c4p: 'Open source code lets you verify privacy claims',

    s5h: 'Performance Considerations',
    s5p1: 'Client-side processing has some limitations:',
    s5l1a: 'Memory constraints',
    s5l1b: ' — Large PDFs can consume significant browser memory',
    s5l2a: 'Processing time',
    s5l2b: ' — Complex operations may take longer than server-side',
    s5l3a: 'Browser compatibility',
    s5l3b: ' — Requires modern browsers with JavaScript enabled',
    s5p2: 'However, for most use cases (files under 25MB, fewer than 50 pages), client-side processing is fast and efficient.',

    faqHeading: 'Frequently Asked Questions',
    fv1q: 'How does client-side PDF processing work?',
    fv1a: 'Client-side PDF processing uses JavaScript libraries like PDF.js and pdf-lib that run entirely in the browser. Files are loaded into memory, processed locally, and never uploaded to any server.',
    fv2q: 'Is client-side PDF editing secure?',
    fv2a: 'Yes, client-side processing is more secure for privacy because files never leave your device. However, users should still be cautious about browser extensions and ensure they trust the website.',
    fv3q: 'What technologies power privacy-first PDF editors?',
    fv3a: 'Privacy-first PDF editors use PDF.js for rendering, pdf-lib for manipulation, Web Workers for performance, and modern JavaScript APIs. All processing happens in the browser without server communication.',

    s6h: 'Conclusion',
    s6p1: 'Privacy-first PDF editing isn\'t just a feature — it\'s a fundamental architectural choice. By leveraging modern browser technologies and powerful JavaScript libraries, we can process PDFs entirely client-side, ensuring your documents never leave your device.',
    s6p2a: 'Try EditoraPDF at ',
    s6p2link: 'editorapdf.com/edit',
    s6p2b: ' and experience true privacy-first PDF editing. The source code is available on ',
    s6p2gh: 'GitHub',
    s6p2c: ' for verification.',

    openSource: 'Open Source',
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
    keywords: [
      'privacy-first PDF editor',
      'client-side PDF processing',
      'PDF.js technology',
      'pdf-lib browser',
      'privacy by design',
      'browser-based PDF',
      'no server upload',
      'local PDF processing',
      'web PDF technology',
      'privacy technology',
    ],
    openGraph: {
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      type: 'article',
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogAlt }],
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
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: locale,
    '@id': `${url}#article`,
    headline: c.artHeadline,
    description: c.artDesc,
    image: `${siteUrl}${ogImage}`,
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
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: 'Technology',
    keywords: 'privacy, client-side processing, PDF.js, pdf-lib, browser technology, web security',
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: m['blog.bcHome'] || 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: m['blog.bcBlog'] || 'Blog',
        item: `${siteUrl}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: c.bcLeaf,
        item: url,
      },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: {
        '@type': 'Answer',
        text: c[`fq${n}a`],
      },
    })),
  }
  return [articleSchema, breadcrumbSchema, faqSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => `/${locale}${p}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

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

      <div className="relative w-full bg-gradient-to-br from-accent-500/10 via-surface-800 to-primary-500/10 border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/40 text-accent-300 text-sm font-medium">
              {c.pillPrivacy}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
              {c.pillTechnology}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {c.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
            {c.heroSubtitle}
          </p>
          <BlogByline locale={locale} datePublished={datePublished} />
        </div>
      </div>

      <article className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-surface-300 leading-relaxed mb-8">
              {c.intro1a}<strong className="text-white">{c.intro1b}</strong>{c.intro1c}
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p1}
              </p>
              <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6 mb-6">
                <ol className="list-decimal list-inside text-surface-300 space-y-2 ml-4">
                  <li>{c.s1l1}</li>
                  <li>{c.s1l2}</li>
                  <li>{c.s1l3}</li>
                  <li>{c.s1l4}</li>
                </ol>
              </div>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s1p2}</strong>
              </p>
              <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6 mb-6">
                <ol className="list-decimal list-inside text-surface-300 space-y-2 ml-4">
                  <li>{c.s1m1}</li>
                  <li>{c.s1m2}</li>
                  <li>{c.s1m3}</li>
                  <li>{c.s1m4}</li>
                </ol>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s2h}</h2>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.s2h1}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.s2p1a}</a>{c.s2p1b}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s2l1a}</strong>{c.s2l1b}</li>
                <li><strong className="text-white">{c.s2l2a}</strong>{c.s2l2b}</li>
                <li><strong className="text-white">{c.s2l3a}</strong>{c.s2l3b}</li>
                <li><strong className="text-white">{c.s2l4a}</strong>{c.s2l4b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-accent-300 mb-4">{c.s2h2}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:text-accent-300 underline">{c.s2p2a}</a>{c.s2p2b}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s2m1a}</strong>{c.s2m1b}</li>
                <li><strong className="text-white">{c.s2m2a}</strong>{c.s2m2b}</li>
                <li><strong className="text-white">{c.s2m3a}</strong>{c.s2m3b}</li>
                <li><strong className="text-white">{c.s2m4a}</strong>{c.s2m4b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-success-300 mb-4">{c.s2h3}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s2n1a}</strong>{c.s2n1b}</li>
                <li><strong className="text-white">{c.s2n2a}</strong>{c.s2n2b}</li>
                <li><strong className="text-white">{c.s2n3a}</strong>{c.s2n3b}</li>
                <li><strong className="text-white">{c.s2n4a}</strong>{c.s2n4b}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s3h}</h2>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">{c.s3c1h}</h3>
                <p className="text-surface-300 text-sm mb-2">
                  {c.s3c1p}
                </p>
                <code className="text-accent-300 text-xs bg-surface-900 px-2 py-1 rounded">fileInput.files[0] → ArrayBuffer</code>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">{c.s3c2h}</h3>
                <p className="text-surface-300 text-sm mb-2">
                  {c.s3c2p}
                </p>
                <code className="text-accent-300 text-xs bg-surface-900 px-2 py-1 rounded">PDF.js → Document object</code>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">{c.s3c3h}</h3>
                <p className="text-surface-300 text-sm mb-2">
                  {c.s3c3p}
                </p>
                <code className="text-accent-300 text-xs bg-surface-900 px-2 py-1 rounded">page.render() → Canvas element</code>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">{c.s3c4h}</h3>
                <p className="text-surface-300 text-sm mb-2">
                  {c.s3c4p}
                </p>
                <code className="text-accent-300 text-xs bg-surface-900 px-2 py-1 rounded">Overlays → State management</code>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{c.s3c5h}</h3>
                <p className="text-surface-300 text-sm mb-2">
                  {c.s3c5p}
                </p>
                <code className="text-accent-300 text-xs bg-surface-900 px-2 py-1 rounded">pdf-lib → Blob → Download</code>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s4h}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.s4c1h}</h4>
                  <p className="text-surface-300 text-sm">{c.s4c1p}</p>
                </div>
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.s4c2h}</h4>
                  <p className="text-surface-300 text-sm">{c.s4c2p}</p>
                </div>
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.s4c3h}</h4>
                  <p className="text-surface-300 text-sm">{c.s4c3p}</p>
                </div>
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.s4c4h}</h4>
                  <p className="text-surface-300 text-sm">{c.s4c4p}</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s5l1a}</strong>{c.s5l1b}</li>
                <li><strong className="text-white">{c.s5l2a}</strong>{c.s5l2b}</li>
                <li><strong className="text-white">{c.s5l3a}</strong>{c.s5l3b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s5p2}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv2q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv2a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv3q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv3a}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s6p2a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s6p2link}</Link>{c.s6p2b}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.s6p2gh}</a>{c.s6p2c}
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link href={L('/blog')} className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t('blog.backToBlog', 'Back to Blog')}
            </Link>
          </div>
        </div>
      </article>

      <footer className="mt-auto py-4 px-6 border-t border-surface-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm text-surface-500">© {new Date().getFullYear()} EditoraPDF. {t('blog.rights', 'All rights reserved.')}</p>
              <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium hover:bg-primary-500/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {c.openSource}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-0 bg-mesh -z-10" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './technology-behind-privacy-first-pdf-editing.i18n'
Object.assign(C, TRANSLATIONS)
