import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'why-we-made-editorapdf-open-source'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-02-13'
const dateModified = '2026-02-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<em>/<a>/<Link> markup stays
// in the JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'Why We Made EditoraPDF Open Source - Our Philosophy | EditoraPDF Blog',
    metaDesc: 'Learn why we decided to make EditoraPDF completely open source and free forever. Discover the principles of transparency, privacy, and community that drive our project.',
    ogTitle: 'Why We Made EditoraPDF Open Source',
    ogDesc: 'The philosophy and principles behind making EditoraPDF completely open source and free forever.',
    ogImageAlt: 'Why EditoraPDF is open source',
    twTitle: 'Why We Made EditoraPDF Open Source',
    twDesc: 'The philosophy behind making EditoraPDF free and open source forever.',

    artHeadline: 'Why We Made EditoraPDF Open Source',
    artDesc: 'The philosophy, principles, and benefits behind making EditoraPDF a free and open-source PDF editor',

    bcLeaf: 'Why We Made EditoraPDF Open Source',

    badgeOpenSource: 'Open Source',
    badgePhilosophy: 'Philosophy',
    published: 'Published: February 13, 2026',
    readTime: '8 min read',
    heroTitle: 'Why We Made EditoraPDF Open Source',
    heroSubtitle: 'The principles, philosophy, and vision behind making EditoraPDF free and open source forever',

    intro1a: 'When we started building EditoraPDF, the decision to make it ',
    intro1b: 'open source',
    intro1c: " wasn't an afterthought — it was the foundation. This post explores why transparency, community, and freedom matter so much to us.",

    probH: 'The Problem with Proprietary PDF Editors',
    probP1: 'Most PDF editors today follow the same playbook:',
    probL1a: 'Upload your files',
    probL1b: " — Your sensitive documents go to someone else's servers",
    probL2a: 'Pay for features',
    probL2b: ' — Basic functionality locked behind paywalls',
    probL3a: 'Trust blindly',
    probL3b: ' — Closed-source code means no way to verify what happens to your data',
    probL4a: 'Vendor lock-in',
    probL4b: ' — Stop paying, lose access to your edited files',
    probP2: 'We believed there had to be a better way.',

    coreH: 'Our Core Principles',
    core1H: '1. Transparency = Trust',
    core1P1a: "When you're editing sensitive documents — contracts, medical records, financial statements — you need to know ",
    core1P1b: 'exactly',
    core1P1c: ' what happens to your data.',
    core1P2: "With closed-source software, you have to take the developer's word that:",
    core1L1: "Your files aren't being uploaded",
    core1L2: "Your documents aren't being analyzed",
    core1L3: "Your data isn't being sold to third parties",
    core1P3a: 'Open source eliminates the need for trust',
    core1P3b: ' — anyone can read the code and verify that EditoraPDF truly keeps files local.',

    core2H: '2. Privacy by Design, Not by Promise',
    core2P1a: "We don't just ",
    core2P1b: 'promise',
    core2P1c: " privacy — we've built it into the architecture.",
    core2P2: "EditoraPDF processes PDFs entirely in your browser. There is no backend server to upload files to. There's no database storing your documents. There's no API tracking your usage.",
    core2P3: "Privacy isn't a feature — it's the foundation.",

    core3H: '3. Community > Corporation',
    core3P1: 'Software built by a community is more resilient, more innovative, and more aligned with user needs than software built solely for profit.',
    core3P2: 'Open source means:',
    core3L1: 'Developers worldwide can contribute features',
    core3L2: 'Bug fixes come faster with more eyes on the code',
    core3L3: 'The community decides the roadmap, not a CEO',
    core3L4: "The project can't be killed by a company shutting down",

    core4H: '4. Free as in Freedom AND Free as in Beer',
    core4P1: 'EditoraPDF is free in both senses:',
    core4L1a: 'Free as in freedom',
    core4L1b: ' — You can use, modify, and distribute the code (MIT License)',
    core4L2a: 'Free as in beer',
    core4L2b: ' — No cost, no subscriptions, no hidden fees',
    core4P2: 'We believe basic tools for working with documents should be accessible to everyone, regardless of their financial situation.',

    benH: 'The Benefits of Open Source (For Everyone)',
    benUsersH: 'For Users',
    benUsers1a: 'Verifiable privacy',
    benUsers1b: ' — Audit the code yourself or have an expert do it',
    benUsers2a: 'No vendor lock-in',
    benUsers2b: ' — Even if we disappear, the code remains',
    benUsers3a: 'Forever free',
    benUsers3b: ' — No risk of features moving behind paywalls',
    benUsers4a: 'Community support',
    benUsers4b: ' — Thousands of developers can help troubleshoot issues',
    benDevsH: 'For Developers',
    benDevs1a: 'Learning resource',
    benDevs1b: ' — See how PDF processing works in a real application',
    benDevs2a: 'Contribution opportunities',
    benDevs2b: ' — Build your portfolio with real open-source contributions',
    benDevs3a: 'Fork and customize',
    benDevs3b: ' — Adapt EditoraPDF for your specific needs',
    benDevs4a: 'Commercial use allowed',
    benDevs4b: ' — MIT License permits using our code in your own products',
    benOrgsH: 'For Organizations',
    benOrgs1a: 'Security audits',
    benOrgs1b: ' — Verify code meets your security requirements',
    benOrgs2a: 'Self-hosting',
    benOrgs2b: ' — Deploy on your own infrastructure if needed',
    benOrgs3a: 'No licensing costs',
    benOrgs3b: ' — Free for unlimited employees',
    benOrgs4a: 'Compliance',
    benOrgs4b: ' — Easier to meet data protection regulations (GDPR, HIPAA, etc.)',

    futH: "What Open Source Means for EditoraPDF's Future",
    fut1H: 'Sustainable Development',
    fut1P: "Open source doesn't mean abandonment. It means:",
    fut1L1: 'Multiple contributors maintain the codebase',
    fut1L2: "Community members can fix bugs even if we're unavailable",
    fut1L3: 'The project can continue indefinitely through community support',
    fut2H: 'Innovation Through Collaboration',
    fut2P: 'Ideas come from everywhere:',
    fut2L1: 'A designer might improve the UI/UX',
    fut2L2: 'A security researcher might add encryption features',
    fut2L3: 'A developer might optimize performance',
    fut2L4: 'A translator might add internationalization',
    fut3H: 'Long-Term Viability',
    fut3P1: 'Closed-source projects die when:',
    fut3L1: 'The company shuts down',
    fut3L2: 'The project becomes unprofitable',
    fut3L3: 'The original developers move on',
    fut3P2a: 'Open source projects can outlive their creators.',
    fut3P2b: ' As long as the code exists, someone can maintain it.',

    concH: 'Addressing Common Concerns',
    conc1Q: '"How do you make money?"',
    conc1A: "EditoraPDF is a passion project, not a business. We're not looking to monetize users. The hosting costs for a static site are negligible, and the development is driven by our love for open source and privacy-respecting software.",
    conc2Q: '"Won\'t competitors just copy your code?"',
    conc2A: "Yes, and that's a feature, not a bug! If someone takes our code and improves it, that benefits everyone. The open-source community thrives on sharing and iteration.",
    conc3Q: '"Is open source less secure?"',
    conc3A1a: 'The opposite.',
    conc3A1b: ' Open source is often more secure because:',
    conc3L1: 'Many eyes review the code for vulnerabilities',
    conc3L2: 'Security researchers can report issues publicly',
    conc3L3: 'Fixes are transparent and verifiable',
    conc3L4: 'No "security through obscurity" — the code is legitimately secure',
    conc4Q: '"Will it always be free?"',
    conc4Aa: 'Yes.',
    conc4Ab: " The MIT License ensures that the code will always be free. Even if we wanted to make it paid (we don't), someone could fork the last free version and continue maintaining it.",

    supH: 'How You Can Support Open Source',
    supP: "You don't need to be a developer to support EditoraPDF and open source in general:",
    supCard1H: '⭐ Star on GitHub',
    supCard1P: 'Stars help other developers discover the project',
    supCard2H: '📢 Share It',
    supCard2P: 'Tell friends, colleagues, on social media',
    supCard3H: '🐛 Report Bugs',
    supCard3P: 'Help us improve by reporting issues',
    supCard4H: '💻 Contribute Code',
    supCard4P: 'Submit pull requests with improvements',

    finH: 'Final Thoughts',
    finP1a: "Making EditoraPDF open source wasn't a business decision — it was a ",
    finP1b: 'values decision',
    finP1c: '.',
    finP2: 'We believe that basic tools for working with documents should be:',
    finL1a: 'Accessible',
    finL1b: ' — Free for everyone',
    finL2a: 'Transparent',
    finL2b: ' — Open source code',
    finL3a: 'Private',
    finL3b: ' — No data collection',
    finL4a: 'Community-driven',
    finL4b: ' — Built for users, not investors',
    finP3a: 'Open source is how we make that vision real. Join us at ',
    finP3link: 'GitHub',
    finP3b: ' and help build the future of privacy-first PDF editing.',

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
      'open source philosophy',
      'why open source',
      'open source benefits',
      'free software',
      'MIT license',
      'open source PDF editor',
      'transparency in software',
      'privacy-first software',
      'community-driven development',
      'open source vs proprietary',
    ],
    openGraph: {
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      type: 'article',
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogImageAlt }],
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
    articleSection: 'Philosophy',
    keywords: 'open source, free software, MIT license, transparency, privacy, community',
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

  return [articleSchema, breadcrumbSchema]
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

      <div className="relative w-full bg-gradient-to-br from-success-500/10 via-surface-800 to-primary-500/10 border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-success-500/20 border border-success-500/40 text-success-300 text-sm font-medium">
              {c.badgeOpenSource}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
              {c.badgePhilosophy}
            </span>
            <span className="text-sm text-surface-400">{c.published}</span>
            <span className="text-sm text-surface-400">{c.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {c.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
            {c.heroSubtitle}
          </p>
        </div>
      </div>

      <article className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-surface-300 leading-relaxed mb-8">
              {c.intro1a}<strong className="text-white">{c.intro1b}</strong>{c.intro1c}
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.probH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.probP1}
              </p>
              <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6 mb-6">
                <ul className="list-disc list-inside text-surface-300 space-y-3 ml-4">
                  <li><strong className="text-warning-300">{c.probL1a}</strong>{c.probL1b}</li>
                  <li><strong className="text-warning-300">{c.probL2a}</strong>{c.probL2b}</li>
                  <li><strong className="text-warning-300">{c.probL3a}</strong>{c.probL3b}</li>
                  <li><strong className="text-warning-300">{c.probL4a}</strong>{c.probL4b}</li>
                </ul>
              </div>
              <p className="text-surface-300 leading-relaxed">
                {c.probP2}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.coreH}</h2>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-primary-500/10 to-primary-500/5 border-l-4 border-primary-500 p-6 rounded-r-lg">
                  <h3 className="text-2xl font-semibold text-primary-300 mb-3">{c.core1H}</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core1P1a}<em>{c.core1P1b}</em>{c.core1P1c}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core1P2}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                    <li>{c.core1L1}</li>
                    <li>{c.core1L2}</li>
                    <li>{c.core1L3}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.core1P3a}</strong>{c.core1P3b}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-success-500/10 to-success-500/5 border-l-4 border-success-500 p-6 rounded-r-lg">
                  <h3 className="text-2xl font-semibold text-success-300 mb-3">{c.core2H}</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core2P1a}<em>{c.core2P1b}</em>{c.core2P1c}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core2P2}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.core2P3}</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-accent-500/10 to-accent-500/5 border-l-4 border-accent-500 p-6 rounded-r-lg">
                  <h3 className="text-2xl font-semibold text-accent-300 mb-3">{c.core3H}</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core3P1}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core3P2}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                    <li>{c.core3L1}</li>
                    <li>{c.core3L2}</li>
                    <li>{c.core3L3}</li>
                    <li>{c.core3L4}</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-warning-500/10 to-warning-500/5 border-l-4 border-warning-500 p-6 rounded-r-lg">
                  <h3 className="text-2xl font-semibold text-warning-300 mb-3">{c.core4H}</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    {c.core4P1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">{c.core4L1a}</strong>{c.core4L1b}</li>
                    <li><strong className="text-white">{c.core4L2a}</strong>{c.core4L2b}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.core4P2}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.benH}</h2>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.benUsersH}</h3>
              <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                <li><strong className="text-white">{c.benUsers1a}</strong>{c.benUsers1b}</li>
                <li><strong className="text-white">{c.benUsers2a}</strong>{c.benUsers2b}</li>
                <li><strong className="text-white">{c.benUsers3a}</strong>{c.benUsers3b}</li>
                <li><strong className="text-white">{c.benUsers4a}</strong>{c.benUsers4b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-accent-300 mb-4">{c.benDevsH}</h3>
              <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                <li><strong className="text-white">{c.benDevs1a}</strong>{c.benDevs1b}</li>
                <li><strong className="text-white">{c.benDevs2a}</strong>{c.benDevs2b}</li>
                <li><strong className="text-white">{c.benDevs3a}</strong>{c.benDevs3b}</li>
                <li><strong className="text-white">{c.benDevs4a}</strong>{c.benDevs4b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-success-300 mb-4">{c.benOrgsH}</h3>
              <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                <li><strong className="text-white">{c.benOrgs1a}</strong>{c.benOrgs1b}</li>
                <li><strong className="text-white">{c.benOrgs2a}</strong>{c.benOrgs2b}</li>
                <li><strong className="text-white">{c.benOrgs3a}</strong>{c.benOrgs3b}</li>
                <li><strong className="text-white">{c.benOrgs4a}</strong>{c.benOrgs4b}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.futH}</h2>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">{c.fut1H}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.fut1P}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                  <li>{c.fut1L1}</li>
                  <li>{c.fut1L2}</li>
                  <li>{c.fut1L3}</li>
                </ul>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">{c.fut2H}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.fut2P}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                  <li>{c.fut2L1}</li>
                  <li>{c.fut2L2}</li>
                  <li>{c.fut2L3}</li>
                  <li>{c.fut2L4}</li>
                </ul>
              </div>

              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-4">{c.fut3H}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.fut3P1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                  <li>{c.fut3L1}</li>
                  <li>{c.fut3L2}</li>
                  <li>{c.fut3L3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.fut3P2a}</strong>{c.fut3P2b}
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.concH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.conc1Q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.conc1A}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.conc2Q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.conc2A}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.conc3Q}</h3>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    <strong className="text-white">{c.conc3A1a}</strong>{c.conc3A1b}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                    <li>{c.conc3L1}</li>
                    <li>{c.conc3L2}</li>
                    <li>{c.conc3L3}</li>
                    <li>{c.conc3L4}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.conc4Q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.conc4Aa}</strong>{c.conc4Ab}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.supH}</h2>
              <p className="text-surface-300 leading-relaxed mb-6">
                {c.supP}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-primary-300 mb-2">{c.supCard1H}</h4>
                  <p className="text-sm text-surface-400">{c.supCard1P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-accent-300 mb-2">{c.supCard2H}</h4>
                  <p className="text-sm text-surface-400">{c.supCard2P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.supCard3H}</h4>
                  <p className="text-sm text-surface-400">{c.supCard3P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-warning-300 mb-2">{c.supCard4H}</h4>
                  <p className="text-sm text-surface-400">{c.supCard4P}</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.finH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.finP1a}<strong className="text-white">{c.finP1b}</strong>{c.finP1c}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.finP2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.finL1a}</strong>{c.finL1b}</li>
                <li><strong className="text-white">{c.finL2a}</strong>{c.finL2b}</li>
                <li><strong className="text-white">{c.finL3a}</strong>{c.finL3b}</li>
                <li><strong className="text-white">{c.finL4a}</strong>{c.finL4b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.finP3a}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">{c.finP3link}</a>{c.finP3b}
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
import { TRANSLATIONS } from './why-we-made-editorapdf-open-source.i18n'
Object.assign(C, TRANSLATIONS)
