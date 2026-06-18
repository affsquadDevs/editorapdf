import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'
import {
  WifiOff, ShieldCheck, Plane, Building2, ArrowRight, Cpu, HardDrive,
  AlertTriangle, CheckCircle2, MemoryStick,
} from 'lucide-react'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-edit-pdfs-offline-in-browser'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const logoImage = '/logo.svg'
const publishDate = '2026-05-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline markup stays in the JSX below — only
// the text segments are keyed here. Code/markup tokens are NOT externalized.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Edit PDFs Offline in Your Browser — No Installation, No Upload',
    metaDesc: 'Edit PDF files offline without installing software. Learn how browser-based PDF editors keep working after the page loads — even without internet — and why that matters for privacy.',
    ogTitle: 'How to Edit PDFs Offline in Your Browser',
    ogDesc: 'Edit PDFs without installing software and without uploading them anywhere. Works even after you disconnect from the internet.',
    ogImageAlt: 'EditoraPDF — Edit PDF offline in your browser',
    twTitle: 'How to Edit PDFs Offline in Your Browser',
    twDesc: 'Edit PDFs without installing software and without uploading them anywhere — even with no internet.',

    artHeadline: 'How to Edit PDFs Offline in Your Browser — No Installation, No Upload',
    artDesc: 'Edit PDF files offline without installing software. Learn how browser-based PDF editors keep working after the page loads — even without internet — and why that matters for privacy.',

    htName: 'How to edit a PDF offline in your browser',
    htDesc: 'Step-by-step instructions to edit PDFs without internet using a browser-based editor.',
    htS1name: 'Open the editor while online',
    htS1text: 'Visit EditoraPDF while you have an internet connection so the application code is cached by your browser.',
    htS2name: 'Disconnect from the internet',
    htS2text: 'Turn off Wi-Fi or enable airplane mode. The page stays loaded and the tools remain available.',
    htS3name: 'Pick a tool and your PDF',
    htS3text: 'Choose any PDF tool — merge, compress, redact, sign, convert — and select a file from your device.',
    htS4name: 'Process and download',
    htS4text: 'The browser processes the PDF locally and offers it as a download. No network is required.',

    fq1q: 'Can I really edit a PDF without an internet connection?',
    fq1a: 'Yes. Once the application loads in your browser, the JavaScript and WebAssembly that power the editor live in memory. As long as you keep the tab open, you can disconnect from the internet and continue working with PDFs.',
    fq2q: 'Is the offline editor as good as a desktop app like Acrobat?',
    fq2a: 'For common tasks — merge, split, rotate, compress, sign, watermark, redact, convert — a modern browser-based editor matches desktop apps for most users. Very heavy workloads (large batch jobs over many gigabytes) still benefit from native software.',
    fq3q: 'Why is offline editing better for privacy?',
    fq3a: 'When processing happens entirely in your browser, the PDF never travels to a server. There is no upload, no temporary copy, no log entry. This is the strongest privacy guarantee for sensitive documents.',
    fq4q: 'Does it work on phones and tablets?',
    fq4a: 'Yes, modern mobile browsers (Safari, Chrome, Edge on iOS/Android) support WebAssembly and run the same code. Very large PDFs may be slow on low-end phones because of limited RAM.',

    bcLeaf: 'Edit PDFs offline',

    heroBadge: 'Offline & Privacy',
    heroTitle: 'How to Edit PDFs Offline in Your Browser',
    heroSubtitle: 'You don’t need Acrobat. You don’t even need internet — once the page is loaded. Modern browsers can read, modify and save PDF files entirely on your device. Here is how that works, why it matters, and how to use it on EditoraPDF.',
    heroPublished: 'Published',
    heroReadTime: '6 min read',

    tldrLabel: 'TL;DR',
    tldr1: 'Open the tool while online once — the code is cached in the browser.',
    tldr2: 'Disconnect from the internet. Drag in a PDF. Edit it.',
    tldr3: 'Your file stays on your device. Nothing is uploaded.',

    whyH: 'Why “offline” is the real privacy win',
    whyP1a: 'Most “free online PDF editors” advertise themselves as private, but they still upload your file to a server, process it there, and send it back. That is the opposite of private. Even if the company promises to delete the file in 15 minutes, the file ',
    whyP1b: 'was',
    whyP1c: ' on their disk, in their logs, and crossed at least one network.',
    whyP2: 'A browser-based PDF editor works differently. The browser downloads the application code (JavaScript, WebAssembly, fonts) once, then performs every edit using your device’s CPU and RAM. Your PDF never travels anywhere. The strongest proof of this is that it keeps working after you turn off the internet.',

    howH: 'How a browser-based editor stays available offline',
    howC1h: 'JavaScript engine',
    howC1p: 'Every modern browser ships a fast JavaScript runtime that runs the editor’s code.',
    howC2h: 'PDF.js + pdf-lib',
    howC2p: 'Open-source libraries read, render and rewrite the PDF byte format directly in memory.',
    howC3h: 'RAM, not bandwidth',
    howC3p: 'Files load into RAM and are processed locally. No upload, no server, no waiting.',
    howP: 'Once the browser has cached the static assets — the JavaScript bundles, the fonts, the WebAssembly modules — there is nothing else to download. The tab becomes a self-contained PDF editor for as long as you keep it open.',

    stepsH: 'Step-by-step: edit a PDF without internet',
    step1t: 'Open the tool online once',
    step1x: 'While you have internet, visit any PDF tool on EditoraPDF — the browser caches everything it needs.',
    step2t: 'Disconnect',
    step2x: 'Turn off Wi-Fi, unplug Ethernet, or enable airplane mode. Do not close or refresh the tab.',
    step3t: 'Add your PDF',
    step3x: 'Click the upload area or drag and drop a file. The browser reads it from your disk into memory.',
    step4t: 'Edit',
    step4x: 'Merge, split, sign, redact, compress, convert — the entire editor runs locally.',
    step5t: 'Download',
    step5x: 'Save the result back to your device. The download is generated entirely in your browser.',

    whenH: 'When this matters',
    whenC1h: 'Sensitive documents',
    whenC1p: 'Contracts, medical records, legal filings, payroll. There is no acceptable “we kept it for 15 minutes” — the file should never leave your machine.',
    whenC2h: 'Travel and weak Wi-Fi',
    whenC2p: 'Airplanes, trains, hotel networks, conferences. Once the editor is loaded, a flaky connection no longer blocks the work.',
    whenC3h: 'Restricted corporate networks',
    whenC3p: 'Many companies block document-upload services. A tool that runs locally and sends no file data is much easier to use within strict policies.',

    limH: 'Honest limitations',
    limIntro: 'Browser-based editing is fantastic, but it lives within the browser’s sandbox. Keep these constraints in mind:',
    limL1: 'Very large PDFs (above ~500 MB) can exhaust RAM on low-end devices.',
    limL2: 'Closing or refreshing the tab while offline ends the session — your cached assets stay, but unsaved work is gone.',
    limL3: 'Operations that genuinely require external services (e.g. font lookups for some non-Latin scripts) won’t work fully offline.',
    limSeeA: 'See ',
    limSeeLink: 'how privacy works on EditoraPDF',
    limSeeB: ' for the detailed limits per tool.',

    tryH: 'Try it now',
    tryP: 'Open any of these in a new tab, then disconnect from the internet and watch it keep working:',
    tryC1h: 'Merge PDFs',
    tryC1p: 'Combine files into one',
    tryC2h: 'Compress PDF',
    tryC2p: 'Shrink file size',
    tryC3h: 'Sanitize PDF',
    tryC3p: 'Strip hidden metadata',
    tryCta: 'Open tool',

    faqH: 'Frequently asked questions',
    fv1q: 'Can I really edit a PDF without an internet connection?',
    fv1a: 'Yes. Once the application has loaded in your browser tab, the editor is running locally. Disconnect from Wi-Fi and it keeps working as long as you don\'t refresh.',
    fv2q: 'Is the offline editor as good as a desktop app like Acrobat?',
    fv2a: 'For everyday operations — merge, split, rotate, compress, sign, watermark, redact, convert — yes. Heavy batch workloads on very large files are still faster on native desktop software.',
    fv3q: 'Why is offline editing better for privacy?',
    fv3a: 'Because the PDF never leaves your device. No upload, no temporary server copy, no log entry. It is the strongest privacy guarantee for sensitive documents.',
    fv4q: 'Does it work on phones and tablets?',
    fv4a: 'Yes. Modern mobile browsers run the same code. Performance depends on available RAM; very large PDFs may be slow on entry-level phones.',

    ctaH: 'Edit PDFs without uploading anything',
    ctaP: 'Open any tool. Drag in a PDF. Done. Your file never reaches a server — even if you stay online — and the editor keeps working when you don’t.',
    ctaPrimary: 'Browse PDF Tools',
    ctaSecondary: 'Privacy details',
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
      url,
      title: c.ogTitle,
      description: c.ogDesc,
      siteName: 'EditoraPDF',
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: c.ogImageAlt,
        },
      ],
      publishedTime: publishDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}${ogImage}`],
    },
    alternates: localeAlternates(locale, postPath),
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function schemas(locale: AppLocale): Record<string, unknown>[] {
  const c = content(locale)
  const url = postUrl(locale)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: locale,
    '@id': `${url}#article`,
    headline: c.artHeadline,
    description: c.artDesc,
    url,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Organization',
      name: 'EditoraPDF Team',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}${logoImage}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: `${siteUrl}${ogImage}`,
  }
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: c.htName,
    description: c.htDesc,
    totalTime: 'PT2M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: c.htS1name,
        text: c.htS1text,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: c.htS2name,
        text: c.htS2text,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: c.htS3name,
        text: c.htS3text,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: c.htS4name,
        text: c.htS4text,
      },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3, 4].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: {
        '@type': 'Answer',
        text: c[`fq${n}a`],
      },
    })),
  }
  return [articleSchema, howToSchema, faqSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => `/${locale}${p}`

  const cta = (label: string, href: string) => (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
    >
      {label}
      <ArrowRight size={14} strokeWidth={2.25} />
    </Link>
  )

  const articleSchema = schemas(locale)[0]
  const howToSchema = schemas(locale)[1]
  const faqSchema = schemas(locale)[2]

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        <article className="flex-1 p-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs text-surface-500 mb-6">
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li><Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-surface-300">{c.bcLeaf}</li>
              </ol>
            </nav>

            {/* Hero */}
            <header className="mb-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-500/15 border border-success-500/30 text-success-300 text-xs font-semibold mb-5">
                <WifiOff size={12} strokeWidth={2} />
                {c.heroBadge}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                {c.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-surface-300 leading-relaxed">
                {c.heroSubtitle}
              </p>
              <BlogByline locale={locale} datePublished={publishDate} />
            </header>

            {/* TL;DR */}
            <aside className="card p-5 mb-10 border-primary-500/20 bg-primary-500/5">
              <p className="text-sm font-semibold text-white mb-2">{c.tldrLabel}</p>
              <ul className="space-y-1.5 text-sm text-surface-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  {c.tldr1}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  {c.tldr2}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  {c.tldr3}
                </li>
              </ul>
            </aside>

            {/* Section: Why offline */}
            <section className="prose-section mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{c.whyH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.whyP1a}<em>{c.whyP1b}</em>{c.whyP1c}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.whyP2}
              </p>
            </section>

            {/* Section: How it works */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{c.howH}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Cpu size={22} strokeWidth={1.5} className="text-primary-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">{c.howC1h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.howC1p}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <HardDrive size={22} strokeWidth={1.5} className="text-accent-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">{c.howC2h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.howC2p}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <MemoryStick size={22} strokeWidth={1.5} className="text-success-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">{c.howC3h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.howC3p}
                  </p>
                </div>
              </div>
              <p className="text-surface-300 leading-relaxed">
                {c.howP}
              </p>
            </section>

            {/* Section: Step-by-step */}
            <section className="mb-10" aria-labelledby="steps-heading">
              <h2 id="steps-heading" className="text-2xl font-bold text-white mb-4">
                {c.stepsH}
              </h2>
              <ol className="space-y-3">
                {[
                  { n: 1, title: c.step1t, text: c.step1x },
                  { n: 2, title: c.step2t, text: c.step2x },
                  { n: 3, title: c.step3t, text: c.step3x },
                  { n: 4, title: c.step4t, text: c.step4x },
                  { n: 5, title: c.step5t, text: c.step5x },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4 p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                      <p className="text-sm text-surface-400 leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Section: When this matters */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{c.whenH}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <ShieldCheck size={22} strokeWidth={1.5} className="text-success-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">{c.whenC1h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.whenC1p}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Plane size={22} strokeWidth={1.5} className="text-info-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">{c.whenC2h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.whenC2p}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Building2 size={22} strokeWidth={1.5} className="text-primary-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">{c.whenC3h}</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    {c.whenC3p}
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Limitations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{c.limH}</h2>
              <div className="card p-5 border-warning-500/20 bg-warning-500/5">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-surface-300">
                    {c.limIntro}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-surface-300 ml-7 list-disc">
                  <li>{c.limL1}</li>
                  <li>{c.limL2}</li>
                  <li>{c.limL3}</li>
                </ul>
                <p className="text-xs text-surface-500 mt-4">
                  {c.limSeeA}<Link href={L('/your-files-stay-private')} className="text-primary-400 hover:text-primary-300 underline">{c.limSeeLink}</Link>{c.limSeeB}
                </p>
              </div>
            </section>

            {/* Try it CTAs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">{c.tryH}</h2>
              <p className="text-surface-300 leading-relaxed mb-5">
                {c.tryP}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">{c.tryC1h}</p>
                  <p className="text-xs text-surface-500 mb-3">{c.tryC1p}</p>
                  {cta(c.tryCta, L('/tools/merge'))}
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">{c.tryC2h}</p>
                  <p className="text-xs text-surface-500 mb-3">{c.tryC2p}</p>
                  {cta(c.tryCta, L('/tools/compress'))}
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">{c.tryC3h}</p>
                  <p className="text-xs text-surface-500 mb-3">{c.tryC3p}</p>
                  {cta(c.tryCta, L('/tools/remove-hidden-data'))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-white mb-5">{c.faqH}</h2>
              <div className="space-y-3">
                {[
                  { q: c.fv1q, a: c.fv1a },
                  { q: c.fv2q, a: c.fv2a },
                  { q: c.fv3q, a: c.fv3a },
                  { q: c.fv4q, a: c.fv4a },
                ].map((item) => (
                  <details key={item.q} className="group card p-4 bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/25 transition-all cursor-pointer">
                    <summary className="flex items-center justify-between gap-3 font-semibold text-white text-sm list-none">
                      {item.q}
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-surface-400 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-surface-400 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center card p-8 bg-gradient-to-br from-success-500/10 via-surface-800/60 to-primary-500/10 border-success-500/20">
              <WifiOff size={28} strokeWidth={1.5} className="text-success-400 mx-auto mb-3" />
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{c.ctaH}</h2>
              <p className="text-surface-300 mb-5 text-sm max-w-lg mx-auto">
                {c.ctaP}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={L('/tools')} className="btn-primary btn-lg inline-flex items-center gap-2">
                  {c.ctaPrimary}
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link href={L('/your-files-stay-private')} className="btn-secondary btn-lg inline-flex items-center gap-2">
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-to-edit-pdfs-offline-in-browser.i18n'
Object.assign(C, TRANSLATIONS)
