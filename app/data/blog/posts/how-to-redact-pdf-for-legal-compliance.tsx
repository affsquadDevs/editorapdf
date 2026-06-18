import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-redact-pdf-for-legal-compliance'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-05-11'
const dateModified = '2026-05-11'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
    metaDesc:
      'Learn how to permanently redact sensitive information from PDFs to meet GDPR, HIPAA, FOIA, and other compliance requirements. Step-by-step guide with best practices.',
    ogTitle: 'How to Redact a PDF for Legal Compliance',
    ogDesc:
      'A practical guide to redacting PDFs correctly for GDPR, HIPAA, FOIA, and legal proceedings. Avoid the most common redaction mistakes.',
    ogAlt: 'Redact PDF for Legal Compliance',
    twTitle: 'How to Redact a PDF for Legal Compliance',
    twDesc: 'GDPR, HIPAA, FOIA — redact PDFs correctly and avoid costly mistakes.',

    artHeadline: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
    artDesc: 'A practical guide to redacting PDFs correctly for GDPR, HIPAA, FOIA, and legal proceedings.',

    // Schema FAQ (4)
    fq1q: 'What is the difference between redaction and covering text with a black box?',
    fq1a: 'Covering text with a black box (such as drawing a rectangle over it) only hides the text visually — the original text remains in the PDF structure and can be selected, copied, or revealed by removing the box. True redaction permanently removes the underlying text or image data from the file.',
    fq2q: 'Is redacting a PDF online safe for confidential legal documents?',
    fq2a: 'It depends on whether the tool processes files locally or uploads them to a server. EditoraPDF performs all redaction entirely in your browser — no file is ever sent to a server — making it safe for confidential legal documents.',
    fq3q: 'Does redaction in EditoraPDF permanently remove the text?',
    fq3a: "Yes. EditoraPDF's Redact PDF tool flattens the selected areas into opaque marks and removes the underlying content from the PDF structure, so it cannot be recovered by copying, searching, or inspecting the file.",
    fq4q: 'What regulations require PDF redaction?',
    fq4a: 'Common regulations that require proper redaction include GDPR (EU data protection), HIPAA (US healthcare privacy), FOIA (US freedom of information), and various court rules in legal proceedings. Each has specific requirements about what must be removed and how.',

    // Breadcrumb leaf
    bcLeaf: 'How to Redact PDF for Legal Compliance',

    // Hero
    heroBadge: 'Security & Compliance',
    heroTitle: 'How to Redact a PDF for Legal Compliance',
    heroSubtitle: 'GDPR, HIPAA, FOIA & Legal Proceedings — do it right the first time',

    // Intro callout (HTML string with inline <strong>)
    introHtml:
      'PDF redaction mistakes have cost organisations millions. The NSA, the UK government, and major law firms have all accidentally leaked classified or privileged information by&nbsp;<strong class="text-white">drawing boxes over text</strong> rather than truly removing it. This guide explains the right way to redact a PDF and what the law actually requires.',

    // Why proper redaction matters
    whyH: 'Why Proper Redaction Matters',
    whyP1: 'A PDF is not simply a picture of a page. It is a structured file containing layers of data: text streams, fonts, embedded images, annotations, form fields, and metadata. When you place a black rectangle on top of text, the original text remains in the file in those underlying layers. Anyone who:',
    whyLi1: 'opens the file in a text editor and searches for patterns',
    whyLi2: 'copies the &ldquo;blacked out&rdquo; area and pastes it elsewhere',
    whyLi3: 'removes the annotation layer using a PDF tool',
    whyLi4: 'examines the raw PDF bytes with a hex editor',
    whyP2: '…can recover the &ldquo;hidden&rdquo; text. True redaction removes the content from the file structure entirely, making recovery impossible.',

    // What each regulation requires
    regH: 'What Each Regulation Requires',
    regGdprTitle: 'GDPR (EU)',
    regGdpr1: 'Right to erasure — personal data must be irreversibly removed',
    regGdpr2: 'Court documents and HR files shared externally must redact all non-relevant personal identifiers',
    regGdpr3: 'Retention of original unredacted copy must follow a lawful basis',
    regHipaaTitle: 'HIPAA (US Healthcare)',
    regHipaa1: 'Protected Health Information (PHI) must be de-identified before sharing',
    regHipaa2: '18 specific identifiers must be removed: name, dates, location codes, contact info, SSN, and more',
    regHipaa3: 'Safe Harbor method requires removal of all 18 identifiers; Expert Determination requires statistical verification',
    regFoiaTitle: 'FOIA (US Federal)',
    regFoia1: 'Nine exemption categories allow agencies to redact: national security, internal rules, trade secrets, personal privacy, law enforcement, etc.',
    regFoia2: 'Segregable portions must be released — only exempt information may be redacted',
    regFoia3: 'Agencies must log what was redacted and cite the exemption',
    regCourtTitle: 'Court & Legal Proceedings',
    regCourt1: 'FRCP Rule 5.2 (US Federal): redact SSNs to last 4 digits, financial accounts to last 4 digits, DOB to year only, minor names to initials',
    regCourt2: 'Many jurisdictions require redaction of home addresses and phone numbers',
    regCourt3: 'Privilege log must itemise redacted privileged communications',

    // Step by step
    stepH: 'Step-by-Step: Redact a PDF with EditoraPDF',
    step1Title: 'Open the Redact PDF tool',
    step1BodyA: 'Navigate to ',
    step1Link: 'EditoraPDF → Redact PDF',
    step1BodyB: ' and upload your file. No data leaves your browser.',
    step2Title: 'Select the areas to redact',
    step2Body: 'Click and drag to draw redaction boxes over each piece of text, image, or area that must be removed. You can add multiple boxes across multiple pages.',
    step3Title: 'Apply the redaction',
    step3Body: 'Click "Apply Redactions". EditoraPDF permanently removes the underlying content from the PDF data structure and replaces it with a solid filled rectangle — not just a visual overlay.',
    step4Title: 'Sanitize metadata (recommended)',
    step4BodyA: 'After redacting, run the file through ',
    step4Link: 'Sanitize PDF',
    step4BodyB: ' to strip document metadata (author, creation date, tracked changes, embedded thumbnails) that might reveal information about the original content.',
    step5Title: 'Verify the result',
    step5Body: 'Open the downloaded PDF, try to select the redacted areas and press Ctrl+C. You should not be able to copy any text. Search (Ctrl+F) for the redacted terms — they should not be found.',
    step6Title: 'Document the redactions',
    step6Body: 'For compliance purposes, maintain a log of what was redacted, the reason (regulation or exemption category), and the date. This is required under FOIA and strongly recommended for HIPAA and GDPR.',

    // Common mistakes
    mistH: 'Common Redaction Mistakes to Avoid',
    mist1m: 'Black rectangle overlay without burning in',
    mist1c: 'Text remains in the file. Anyone can remove the box to reveal it.',
    mist2m: 'Redacting in Word then exporting to PDF',
    mist2c: "The \"deleted\" text may be recoverable from tracked changes or the file's undo history that gets embedded in the PDF.",
    mist3m: 'Forgetting document metadata',
    mist3c: 'Author names, revision history, and comments in the PDF metadata may reveal what was redacted or who created the document.',
    mist4m: 'Redacting only visible pages',
    mist4c: 'PDFs can contain hidden layers, annotations, and embedded objects on non-visible layers that also need to be checked.',
    mist5m: 'Using low-contrast marks',
    mist5c: 'Dark grey on black may not provide sufficient contrast in print. Use solid black fills.',
    mist6m: 'Not keeping the unredacted original',
    mist6c: 'Legal workflows often require retaining the unredacted version in a secure location for audit purposes.',

    // Visible FAQ (4)
    faqTitle: 'Frequently Asked Questions',
    fv1q: 'What is the difference between redaction and covering text with a black box?',
    fv1a: 'Covering text with a box hides it visually but leaves it in the file data. True redaction removes the underlying content permanently from the PDF structure.',
    fv2q: 'Is redacting a PDF online safe for confidential legal documents?',
    fv2a: 'Only if the tool processes files locally. EditoraPDF runs entirely in your browser — your file never reaches any server, making it safe for privileged or confidential documents.',
    fv3q: 'Does EditoraPDF permanently remove the text?',
    fv3a: 'Yes. The Redact PDF tool removes underlying content from the PDF data structure, not just overlays a mark. The redacted text cannot be recovered by selecting, copying, or searching.',
    fv4q: 'What regulations require PDF redaction?',
    fv4a: 'GDPR, HIPAA, FOIA, and court filing rules (such as FRCP Rule 5.2 in the US) all require proper redaction of personal, privileged, or exempt information before sharing documents.',

    // CTA
    ctaH: 'Ready to Redact Properly?',
    ctaP: "Use EditoraPDF's free Redact tool — all processing happens locally in your browser, so your confidential documents stay confidential.",
    ctaBtn: 'Open Redact PDF Tool',
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
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogAlt }],
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
    mainEntity: [1, 2, 3, 4].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fq${n}a`] },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m['blog.bcHome'] || 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: m['blog.bcBlog'] || 'Blog', item: `${siteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: c.bcLeaf, item: url },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: c.artHeadline,
    description: c.artDesc,
    image: `${siteUrl}${ogImage}`,
    author: { '@type': 'Organization', name: 'EditoraPDF Team' },
    publisher: { '@type': 'Organization', name: 'EditoraPDF', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: locale,
    keywords: ['redact pdf', 'pdf redaction', 'gdpr pdf', 'hipaa pdf', 'foia redaction', 'legal pdf compliance'],
    articleSection: 'Security & Compliance',
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
      <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden bg-gradient-to-br from-error-500/20 via-surface-800 to-primary-500/10 flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error-500/20 border border-error-500/30 text-error-300 text-xs font-semibold mb-4">
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

            {/* Intro */}
            <div className="card p-6 mb-8 bg-error-500/5 border border-error-500/20">
              <p className="text-surface-300 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: c.introHtml }} />
            </div>

            {/* Why proper redaction matters */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{c.whyH}</h2>
              <p className="text-surface-400 leading-relaxed mb-4">
                {c.whyP1}
              </p>
              <ul className="space-y-2 text-surface-400 mb-4 list-none">
                {[c.whyLi1, c.whyLi2, c.whyLi3, c.whyLi4].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-error-400 mt-2 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <p className="text-surface-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.whyP2 }} />
            </section>

            {/* What regulations require */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{c.regH}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    title: c.regGdprTitle,
                    color: 'primary',
                    items: [c.regGdpr1, c.regGdpr2, c.regGdpr3],
                  },
                  {
                    title: c.regHipaaTitle,
                    color: 'accent',
                    items: [c.regHipaa1, c.regHipaa2, c.regHipaa3],
                  },
                  {
                    title: c.regFoiaTitle,
                    color: 'success',
                    items: [c.regFoia1, c.regFoia2, c.regFoia3],
                  },
                  {
                    title: c.regCourtTitle,
                    color: 'warning',
                    items: [c.regCourt1, c.regCourt2, c.regCourt3],
                  },
                ].map((card) => {
                  const colors: Record<string, { border: string; text: string; bg: string }> = {
                    primary: { border: 'border-primary-500/20', text: 'text-primary-400', bg: 'bg-primary-500/5' },
                    accent:  { border: 'border-accent-500/20',  text: 'text-accent-400',  bg: 'bg-accent-500/5' },
                    success: { border: 'border-success-500/20', text: 'text-success-400', bg: 'bg-success-500/5' },
                    warning: { border: 'border-warning-500/20', text: 'text-warning-400', bg: 'bg-warning-500/5' },
                  }
                  const col = colors[card.color]
                  return (
                    <div key={card.title} className={`card p-5 ${col.bg} border ${col.border}`}>
                      <h3 className={`text-base font-bold mb-3 ${col.text}`}>{card.title}</h3>
                      <ul className="space-y-2">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-surface-400">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${col.text.replace('text-', 'bg-')}`} />
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
              <h2 className="text-2xl font-bold text-white mb-6">{c.stepH}</h2>
              <div className="space-y-5">
                {[
                  {
                    step: 1,
                    title: c.step1Title,
                    body: <>{c.step1BodyA}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.step1Link}</Link>{c.step1BodyB}</>,
                  },
                  {
                    step: 2,
                    title: c.step2Title,
                    body: c.step2Body,
                  },
                  {
                    step: 3,
                    title: c.step3Title,
                    body: c.step3Body,
                  },
                  {
                    step: 4,
                    title: c.step4Title,
                    body: <>{c.step4BodyA}<Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.step4Link}</Link>{c.step4BodyB}</>,
                  },
                  {
                    step: 5,
                    title: c.step5Title,
                    body: c.step5Body,
                  },
                  {
                    step: 6,
                    title: c.step6Title,
                    body: c.step6Body,
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
              <h2 className="text-2xl font-bold text-white mb-6">{c.mistH}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    mistake: c.mist1m,
                    consequence: c.mist1c,
                  },
                  {
                    mistake: c.mist2m,
                    consequence: c.mist2c,
                  },
                  {
                    mistake: c.mist3m,
                    consequence: c.mist3c,
                  },
                  {
                    mistake: c.mist4m,
                    consequence: c.mist4c,
                  },
                  {
                    mistake: c.mist5m,
                    consequence: c.mist5c,
                  },
                  {
                    mistake: c.mist6m,
                    consequence: c.mist6c,
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
              <h2 className="text-2xl font-bold text-white mb-6">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>
              <div className="space-y-4">
                {[
                  {
                    q: c.fv1q,
                    a: c.fv1a,
                  },
                  {
                    q: c.fv2q,
                    a: c.fv2a,
                  },
                  {
                    q: c.fv3q,
                    a: c.fv3a,
                  },
                  {
                    q: c.fv4q,
                    a: c.fv4a,
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
              <h2 className="text-xl font-bold text-white mb-3">{c.ctaH}</h2>
              <p className="text-surface-400 text-sm mb-6 max-w-lg mx-auto">
                {c.ctaP}
              </p>
              <Link href={L('/tools/redact')} className="btn-primary inline-flex items-center gap-2 group">
                {c.ctaBtn}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
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
import { TRANSLATIONS } from './how-to-redact-pdf-for-legal-compliance.i18n'
Object.assign(C, TRANSLATIONS)
