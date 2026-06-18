import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'open-source-vs-closed-source-pdf-editors'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-02-13'
const dateModified = '2026-02-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here. Code/markup tokens are NOT keyed.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'Comparing Open-Source vs. Closed-Source PDF Editors | EditoraPDF Blog',
    metaDesc: 'Comprehensive comparison of open-source and proprietary PDF editors. Learn the pros, cons, security implications, and which type is right for your needs.',
    ogTitle: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    ogDesc: 'A comprehensive comparison of open-source and proprietary PDF editors with pros, cons, and recommendations.',
    twTitle: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    twDesc: 'Comprehensive comparison of open-source and proprietary PDF editors.',
    ogAlt: 'Open source vs closed source PDF editor comparison',

    artHeadline: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    artDesc: 'Comprehensive comparison of open-source and proprietary PDF editors covering features, security, cost, and use cases',
    artKeywords: 'open source, proprietary software, PDF editor comparison, free software, commercial software',

    bcLeaf: 'Open-Source vs Closed-Source PDF Editors',

    // Schema FAQ (3) — distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'What is the difference between open-source and closed-source PDF editors?',
    fq1a: 'Open-source PDF editors have publicly available source code that anyone can view, modify, and distribute. Closed-source editors keep their code proprietary and secret. Open-source editors are typically free and more transparent, while closed-source editors often require payment and offer professional support.',
    fq2q: 'Are open-source PDF editors secure?',
    fq2a: 'Yes, open-source editors can be more secure because the code is publicly auditable. Many security researchers can review the code, and vulnerabilities are often found and fixed quickly. However, security depends on active maintenance and community involvement.',
    fq3q: 'Which is better: open-source or closed-source PDF editor?',
    fq3a: 'It depends on your needs. Open-source editors are better for privacy, transparency, and cost. Closed-source editors may offer more features, professional support, and enterprise integrations. For most users, open-source editors like EditoraPDF provide excellent functionality without cost or privacy concerns.',

    // Hero
    tagComparison: 'Comparison',
    tagAnalysis: 'Analysis',
    published: 'Published: February 13, 2026',
    readTime: '9 min read',
    heroTitle: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    heroSubtitle: 'A comprehensive comparison of open-source and proprietary PDF editors — which is right for you?',

    // Intro
    intro1a: "When choosing a PDF editor, one of the first decisions you'll face is whether to go with an ",
    intro1b: 'open-source',
    intro1c: ' or ',
    intro1d: 'closed-source',
    intro1e: ' solution. This comparison will help you understand the differences and make an informed choice.',

    // What's the difference
    s1h: "What's the Difference?",
    s1osTitle: 'Open-Source',
    s1os1: 'Source code is publicly available',
    s1os2: 'Anyone can view, modify, distribute',
    s1os3: 'Typically free (MIT, GPL licenses)',
    s1os4: 'Community-driven development',
    s1os5: 'Transparent and auditable',
    s1csTitle: 'Closed-Source',
    s1cs1: 'Source code is proprietary',
    s1cs2: 'Only the company can modify',
    s1cs3: 'Usually requires payment',
    s1cs4: 'Company-driven development',
    s1cs5: 'Code is secret and unverifiable',

    // Cost comparison
    s2h: 'Cost Comparison',
    s2osTitle: 'Open-Source PDF Editors',
    s2osCost: 'Cost: $0',
    s2osCostDesc: 'Free forever, no subscriptions, no hidden fees',
    s2osLicense: 'License: MIT/GPL',
    s2osLicenseDesc: 'Use commercially, modify, distribute freely',
    s2csTitle: 'Closed-Source PDF Editors',
    s2csCost: 'Cost: $10-$50/month',
    s2csCostDesc: 'Subscription fees, per-user pricing, enterprise plans',
    s2csLicense: 'License: Proprietary',
    s2csLicenseDesc: 'Restricted use, no modification, vendor lock-in',

    // Security & privacy
    s3h: 'Security & Privacy',
    s3osTitle: 'Open-Source Advantages',
    s3os1a: 'Transparency',
    s3os1b: ' — Code is auditable by security researchers',
    s3os2a: 'Rapid fixes',
    s3os2b: ' — Vulnerabilities are found and patched quickly',
    s3os3a: 'No hidden backdoors',
    s3os3b: ' — Code is public, nothing to hide',
    s3os4a: 'Community review',
    s3os4b: ' — Thousands of eyes on the code',
    s3csTitle: 'Closed-Source Considerations',
    s3cs1a: 'Security through obscurity',
    s3cs1b: ' — Code is secret, but is it secure?',
    s3cs2a: 'Slower patches',
    s3cs2b: ' — Only the company can fix vulnerabilities',
    s3cs3a: 'Unknown data practices',
    s3cs3b: " — Can't verify what happens to your files",
    s3cs4a: 'Trust required',
    s3cs4b: " — Must trust company's security claims",

    // Feature comparison table
    s4h: 'Feature Comparison',
    s4thFeature: 'Feature',
    s4thOpen: 'Open-Source',
    s4thClosed: 'Closed-Source',
    s4r1Feature: 'Basic Editing',
    s4r2Feature: 'Text & Images',
    s4r3Feature: 'Page Management',
    s4r4Feature: 'Advanced OCR',
    s4r4Open: 'Limited',
    s4r5Feature: 'Enterprise Support',
    s4r5Open: 'Community',
    s4r6Feature: 'Customization',
    s4r6Open: '✓ Full',
    s4r6Closed: 'Limited',
    s4r7Feature: 'Self-Hosting',

    // Use case recommendations
    s5h: 'Use Case Recommendations',
    s5osTitle: 'Choose Open-Source If:',
    s5os1: 'Privacy is a priority',
    s5os2: 'You want to verify code security',
    s5os3: 'Budget is limited',
    s5os4: 'You need customization',
    s5os5: 'You want to self-host',
    s5os6: "You're comfortable with community support",
    s5csTitle: 'Choose Closed-Source If:',
    s5cs1: 'You need enterprise support',
    s5cs2: 'Advanced OCR is required',
    s5cs3: 'Budget allows for subscriptions',
    s5cs4: 'You need specific integrations',
    s5cs5: 'Compliance requires vendor support',
    s5cs6: 'You prefer professional support',

    // Long-term viability
    s6h: 'Long-Term Viability',
    s6osTitle: 'Open-Source: Community Resilience',
    s6osP1: 'Open-source projects can outlive their creators. Even if the original developers stop maintaining the project, the community can fork it and continue development. The code is always available.',
    s6osExampleLabel: 'Example:',
    s6osExampleBody: ' Linux, Apache, WordPress — all thriving decades after creation.',
    s6csTitle: 'Closed-Source: Company Dependency',
    s6csP1: 'Closed-source projects depend entirely on the company. If the company shuts down, gets acquired, or discontinues the product, users are left without options. You can\'t maintain it yourself.',
    s6csRiskLabel: 'Risk:',
    s6csRiskBody: ' Vendor lock-in, sudden discontinuation, price increases.',

    // Visible FAQ (4)
    fv1q: 'What is the difference between open-source and closed-source PDF editors?',
    fv1a: 'Open-source PDF editors have publicly available source code that anyone can view, modify, and distribute. Closed-source editors keep their code proprietary and secret. Open-source editors are typically free and more transparent, while closed-source editors often require payment and offer professional support.',
    fv2q: 'Are open-source PDF editors secure?',
    fv2a: 'Yes, open-source editors can be more secure because the code is publicly auditable. Many security researchers can review the code, and vulnerabilities are often found and fixed quickly. However, security depends on active maintenance and community involvement.',
    fv3q: 'Which is better: open-source or closed-source PDF editor?',
    fv3a: 'It depends on your needs. Open-source editors are better for privacy, transparency, and cost. Closed-source editors may offer more features, professional support, and enterprise integrations. For most users, open-source editors like EditoraPDF provide excellent functionality without cost or privacy concerns.',
    fv4q: 'Can I use open-source PDF editors commercially?',
    fv4a: 'Yes! Most open-source PDF editors use permissive licenses like MIT or Apache that allow commercial use. EditoraPDF uses the MIT License, which explicitly permits commercial use, modification, and distribution.',

    // Conclusion
    s8h: 'Conclusion',
    s8p1a: 'Both open-source and closed-source PDF editors have their place. For most users — especially those prioritizing privacy, transparency, and cost — ',
    s8p1b: 'open-source editors like EditoraPDF',
    s8p1c: ' offer an excellent solution.',
    s8p2: 'Open-source editors provide:',
    s8l1: 'Complete transparency and verifiability',
    s8l2: 'Zero cost forever',
    s8l3: 'Community-driven innovation',
    s8l4: 'Freedom to customize and self-host',
    s8l5: 'Long-term viability through community',
    s8p3a: 'Try ',
    s8p3link: 'EditoraPDF',
    s8p3b: ' — a free, open-source PDF editor that processes files entirely in your browser. View the source code on ',
    s8p3github: 'GitHub',
    s8p3c: ' and verify our privacy claims yourself.',

    // Footer
    footerOpenSource: 'Open Source',
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
      'open source vs proprietary PDF editor',
      'open source PDF editor comparison',
      'free PDF editor vs paid',
      'MIT license PDF editor',
      'proprietary PDF software',
      'open source software benefits',
      'closed source PDF editor',
      'PDF editor comparison',
      'free software vs commercial',
      'open source security',
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
    articleSection: 'Comparison',
    keywords: c.artKeywords,
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

      <div className="relative w-full bg-gradient-to-br from-primary-500/10 via-surface-800 to-warning-500/10 border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
              {c.tagComparison}
            </span>
            <span className="px-3 py-1 rounded-full bg-warning-500/20 border border-warning-500/40 text-warning-300 text-sm font-medium">
              {c.tagAnalysis}
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
              {c.intro1a}<strong className="text-white">{c.intro1b}</strong>{c.intro1c}<strong className="text-white">{c.intro1d}</strong>{c.intro1e}
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s1h}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-success-300 mb-3">{c.s1osTitle}</h3>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                    <li>{c.s1os1}</li>
                    <li>{c.s1os2}</li>
                    <li>{c.s1os3}</li>
                    <li>{c.s1os4}</li>
                    <li>{c.s1os5}</li>
                  </ul>
                </div>

                <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-warning-300 mb-3">{c.s1csTitle}</h3>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                    <li>{c.s1cs1}</li>
                    <li>{c.s1cs2}</li>
                    <li>{c.s1cs3}</li>
                    <li>{c.s1cs4}</li>
                    <li>{c.s1cs5}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s2h}</h2>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">{c.s2osTitle}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <strong className="text-success-300">{c.s2osCost}</strong>
                      <p className="text-surface-400 text-sm">{c.s2osCostDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <strong className="text-success-300">{c.s2osLicense}</strong>
                      <p className="text-surface-400 text-sm">{c.s2osLicenseDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">{c.s2csTitle}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <strong className="text-warning-300">{c.s2csCost}</strong>
                      <p className="text-surface-400 text-sm">{c.s2csCostDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <strong className="text-warning-300">{c.s2csLicense}</strong>
                      <p className="text-surface-400 text-sm">{c.s2csLicenseDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s3h}</h2>

              <h3 className="text-2xl font-semibold text-success-300 mb-4">{c.s3osTitle}</h3>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s3os1a}</strong>{c.s3os1b}</li>
                <li><strong className="text-white">{c.s3os2a}</strong>{c.s3os2b}</li>
                <li><strong className="text-white">{c.s3os3a}</strong>{c.s3os3b}</li>
                <li><strong className="text-white">{c.s3os4a}</strong>{c.s3os4b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-warning-300 mb-4">{c.s3csTitle}</h3>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.s3cs1a}</strong>{c.s3cs1b}</li>
                <li><strong className="text-white">{c.s3cs2a}</strong>{c.s3cs2b}</li>
                <li><strong className="text-white">{c.s3cs3a}</strong>{c.s3cs3b}</li>
                <li><strong className="text-white">{c.s3cs4a}</strong>{c.s3cs4b}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s4h}</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-surface-700">
                      <th className="text-left p-4 text-white font-semibold">{c.s4thFeature}</th>
                      <th className="text-center p-4 text-success-300 font-semibold">{c.s4thOpen}</th>
                      <th className="text-center p-4 text-warning-300 font-semibold">{c.s4thClosed}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r1Feature}</td>
                      <td className="p-4 text-center text-success-400">✓</td>
                      <td className="p-4 text-center text-warning-400">✓</td>
                    </tr>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r2Feature}</td>
                      <td className="p-4 text-center text-success-400">✓</td>
                      <td className="p-4 text-center text-warning-400">✓</td>
                    </tr>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r3Feature}</td>
                      <td className="p-4 text-center text-success-400">✓</td>
                      <td className="p-4 text-center text-warning-400">✓</td>
                    </tr>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r4Feature}</td>
                      <td className="p-4 text-center text-surface-400">{c.s4r4Open}</td>
                      <td className="p-4 text-center text-warning-400">✓</td>
                    </tr>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r5Feature}</td>
                      <td className="p-4 text-center text-surface-400">{c.s4r5Open}</td>
                      <td className="p-4 text-center text-warning-400">✓</td>
                    </tr>
                    <tr className="border-b border-surface-800">
                      <td className="p-4 text-surface-300">{c.s4r6Feature}</td>
                      <td className="p-4 text-center text-success-400">{c.s4r6Open}</td>
                      <td className="p-4 text-center text-surface-400">{c.s4r6Closed}</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-surface-300">{c.s4r7Feature}</td>
                      <td className="p-4 text-center text-success-400">✓</td>
                      <td className="p-4 text-center text-surface-400">✗</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s5h}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-success-300 mb-3">{c.s5osTitle}</h3>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                    <li>{c.s5os1}</li>
                    <li>{c.s5os2}</li>
                    <li>{c.s5os3}</li>
                    <li>{c.s5os4}</li>
                    <li>{c.s5os5}</li>
                    <li>{c.s5os6}</li>
                  </ul>
                </div>

                <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-warning-300 mb-3">{c.s5csTitle}</h3>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                    <li>{c.s5cs1}</li>
                    <li>{c.s5cs2}</li>
                    <li>{c.s5cs3}</li>
                    <li>{c.s5cs4}</li>
                    <li>{c.s5cs5}</li>
                    <li>{c.s5cs6}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s6h}</h2>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-success-300 mb-3">{c.s6osTitle}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6osP1}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6osExampleLabel}</strong>{c.s6osExampleBody}
                </p>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-warning-300 mb-3">{c.s6csTitle}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6csP1}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6csRiskLabel}</strong>{c.s6csRiskBody}
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>

              <div className="space-y-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n}>
                    <h3 className="text-xl font-semibold text-white mb-2">{c[`fv${n}q`]}</h3>
                    <p className="text-surface-300 leading-relaxed">
                      {c[`fv${n}a`]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s8h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p1a}<strong className="text-white">{c.s8p1b}</strong>{c.s8p1c}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.s8l1}</li>
                <li>{c.s8l2}</li>
                <li>{c.s8l3}</li>
                <li>{c.s8l4}</li>
                <li>{c.s8l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s8p3a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p3link}</Link>{c.s8p3b}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.s8p3github}</a>{c.s8p3c}
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
                {c.footerOpenSource}
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
import { TRANSLATIONS } from './open-source-vs-closed-source-pdf-editors.i18n'
Object.assign(C, TRANSLATIONS)
