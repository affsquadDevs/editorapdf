import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'contributing-to-open-source-beginners-guide'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-02-13'
const dateModified = '2026-02-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<a>/<code> markup and all
// <pre> code blocks stay in the JSX below — only the human-readable text segments are
// keyed here. Code/markup tokens are language-neutral and are NOT externalized.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: "Contributing to Open Source: A Beginner's Guide with EditoraPDF | EditoraPDF Blog",
    metaDesc: 'Learn how to contribute to open-source projects using EditoraPDF as an example. Step-by-step guide for first-time contributors covering Git, GitHub, pull requests, and more.',
    ogTitle: "Contributing to Open Source: A Beginner's Guide with EditoraPDF",
    ogDesc: 'Step-by-step guide for first-time contributors to open-source projects using EditoraPDF as an example.',
    ogAlt: 'Contributing to open source - beginner guide',
    twTitle: "Contributing to Open Source: A Beginner's Guide",
    twDesc: 'Learn how to contribute to open-source projects step by step.',

    // Schema (HowTo)
    artName: "Contributing to Open Source: A Beginner's Guide",
    artDesc: 'Step-by-step guide on how to contribute to open-source projects using EditoraPDF as an example',
    schStep1Name: 'Fork the Repository',
    schStep1Text: 'Fork the EditoraPDF repository on GitHub to create your own copy',
    schStep2Name: 'Clone Your Fork',
    schStep2Text: 'Clone your fork to your local machine using Git',
    schStep3Name: 'Create a Branch',
    schStep3Text: 'Create a new branch for your changes',
    schStep4Name: 'Make Changes',
    schStep4Text: 'Make your changes, test them, and commit',
    schStep5Name: 'Submit Pull Request',
    schStep5Text: 'Push your changes and submit a pull request',

    // Breadcrumb leaf
    bcLeaf: 'Contributing to Open Source Guide',

    // FAQ schema (3)
    fq1q: 'How do I start contributing to open source?',
    fq1a: 'Start by finding a project you\'re interested in, fork the repository, clone it locally, make small changes, and submit a pull request. Look for issues labeled "good first issue" to get started.',
    fq2q: 'Do I need to be an expert programmer to contribute?',
    fq2a: 'No! Open source projects need contributions of all kinds: code, documentation, bug reports, translations, design, and more. Everyone can contribute something valuable.',
    fq3q: 'What is a pull request?',
    fq3a: 'A pull request (PR) is a way to propose changes to a project. You submit your changes, maintainers review them, and if approved, they get merged into the main codebase.',

    // Hero
    pillGuide: 'Guide',
    pillOpenSource: 'Open Source',
    heroPublished: 'Published: February 13, 2026',
    heroReadTime: '10 min read',
    heroTitle: "Contributing to Open Source: A Beginner's Guide with EditoraPDF",
    heroSubtitle: 'Learn how to contribute to open-source projects step by step, using EditoraPDF as your first example',

    // Intro
    intro1a: 'Contributing to open source can seem intimidating, but it doesn\'t have to be. This guide will walk you through your first contribution using ',
    intro1b: 'EditoraPDF',
    intro1c: ' as an example. By the end, you\'ll know how to fork, clone, make changes, and submit a pull request.',

    // Why contribute
    whyH: 'Why Contribute to Open Source?',
    why1H: 'Build Your Portfolio',
    why1P: 'Real contributions show employers your skills',
    why2H: 'Learn from Experts',
    why2P: 'Code reviews teach you best practices',
    why3H: 'Give Back',
    why3P: 'Help projects you use and love',
    why4H: 'Join a Community',
    why4P: 'Connect with developers worldwide',

    // Prerequisites
    preH: 'Prerequisites',
    preP: 'Before you start, you\'ll need:',
    preL1a: 'A ',
    preL1link: 'GitHub account',
    preL1b: ' (free)',
    preL2link: 'Git',
    preL2b: ' installed on your computer',
    preL3: 'A code editor (VS Code, Sublime, etc.)',
    preL4: 'Basic command line knowledge (helpful but not required)',

    // Step 1
    s1H: 'Step 1: Fork the Repository',
    s1P1a: 'A ',
    s1P1b: 'fork',
    s1P1c: ' is your own copy of a repository. It lets you experiment without affecting the original project.',
    s1O1a: 'Go to ',
    s1O1link: 'github.com/affsquadDevs/editorapdf',
    s1O2a: 'Click the ',
    s1O2b: '"Fork"',
    s1O2c: ' button in the top right',
    s1O3: 'Wait for GitHub to create your fork',
    s1TipLabel: 'Tip:',
    s1TipText: ' After forking, you\'ll have your own copy at ',

    // Step 2
    s2H: 'Step 2: Clone Your Fork',
    s2P1a: 'Cloning',
    s2P1b: ' downloads the repository to your computer.',
    s2P2: 'This creates a local copy on your computer that you can edit.',

    // Step 3
    s3H: 'Step 3: Set Up the Project',
    s3P1: 'Install dependencies and make sure everything works:',
    s3P2a: 'Open ',
    s3P2b: ' to see the app running.',

    // Step 4
    s4H: 'Step 4: Create a Branch',
    s4P1a: 'A ',
    s4P1b: 'branch',
    s4P1c: ' is like a separate workspace for your changes. Always create a new branch for each contribution.',
    s4P2: 'Use descriptive branch names that explain what you\'re doing.',

    // Step 5
    s5H: 'Step 5: Make Your Changes',
    s5P1: 'Now you can edit files! Good first contributions include:',
    s5L1: 'Fixing typos in documentation',
    s5L2: 'Improving code comments',
    s5L3: 'Adding examples to README',
    s5L4: 'Fixing small bugs',
    s5L5: 'Improving accessibility',
    s5CalloutH: 'Look for "Good First Issue" Labels',
    s5CalloutTa: 'Many projects label beginner-friendly issues. Check the ',
    s5CalloutLink: 'Issues page',
    s5CalloutTb: ' for these.',

    // Step 6
    s6H: 'Step 6: Commit Your Changes',
    s6P1a: 'A ',
    s6P1b: 'commit',
    s6P1c: ' saves your changes with a message describing what you did.',
    s6P2: 'Good commit messages:',
    s6GoodL1: '"Fix typo in README"',
    s6GoodL2: '"Add dark mode toggle button"',
    s6GoodL3: '"Improve error message clarity"',
    s6P3: 'Bad commit messages:',
    s6BadL1: '"fix"',
    s6BadL2: '"changes"',
    s6BadL3: '"update"',

    // Step 7
    s7H: 'Step 7: Push to Your Fork',
    s7P1: 'Upload your changes to GitHub:',

    // Step 8
    s8H: 'Step 8: Open a Pull Request',
    s8P1a: 'A ',
    s8P1b: 'pull request (PR)',
    s8P1c: ' is how you propose your changes to the original project.',
    s8O1: 'Go to your fork on GitHub',
    s8O2: 'You\'ll see a banner saying "Compare & pull request" — click it',
    s8O3: 'Fill out the PR form:',
    s8O3SubA1: 'Title:',
    s8O3SubA2: ' Clear description of your change',
    s8O3SubB1: 'Description:',
    s8O3SubB2: ' Explain what you changed and why',
    s8O4: 'Click "Create pull request"',
    s8TplH: 'PR Template Example',
    s8TplWhatLabel: 'What changed:',
    s8TplWhatText: ' Fixed typo in README',
    s8TplWhyLabel: 'Why:',
    s8TplWhyText: ' Improve documentation clarity',
    s8TplTestLabel: 'Testing:',
    s8TplTestText: ' Verified README renders correctly',

    // Step 9
    s9H: 'Step 9: Respond to Feedback',
    s9P1: 'Maintainers might ask for changes. This is normal! They\'re helping you improve your contribution.',
    s9L1: 'Be respectful and open to feedback',
    s9L2: 'Make requested changes in the same branch',
    s9L3: 'Push updates — they\'ll appear in the PR automatically',
    s9L4: 'Thank reviewers for their time',

    // Types of contributions
    typesH: 'Types of Contributions',
    typesP: 'You don\'t need to write code to contribute:',
    type1H: 'Code',
    type1P: 'Bug fixes, new features, improvements',
    type2H: 'Documentation',
    type2P: 'README updates, tutorials, guides',
    type3H: 'Testing',
    type3P: 'Report bugs, test new features',
    type4H: 'Design',
    type4P: 'UI improvements, graphics, UX',

    // FAQ (visible, 4)
    fvH: 'Frequently Asked Questions',
    fv1q: 'How do I start contributing to open source?',
    fv1a: 'Start by finding a project you\'re interested in, fork the repository, clone it locally, make small changes, and submit a pull request. Look for issues labeled "good first issue" to get started.',
    fv2q: 'Do I need to be an expert programmer to contribute?',
    fv2a: 'No! Open source projects need contributions of all kinds: code, documentation, bug reports, translations, design, and more. Everyone can contribute something valuable.',
    fv3q: 'What is a pull request?',
    fv3a: 'A pull request (PR) is a way to propose changes to a project. You submit your changes, maintainers review them, and if approved, they get merged into the main codebase.',
    fv4q: 'What if my PR gets rejected?',
    fv4a: 'Don\'t take it personally! Rejections are usually about project direction or code style, not your skills. Ask for feedback and try again — every contributor has had PRs rejected.',

    // Ready to contribute
    readyH: 'Ready to Contribute?',
    readyPa: 'EditoraPDF welcomes contributions! Check out our ',
    readyLink: 'Contributing Guide',
    readyPb: ' for more details.',
    ctaH: 'Get Started Today',
    ctaBtn1: 'View on GitHub',
    ctaBtn2: 'Find an Issue',

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
  // Respect an explicitly-present translation (incl. an intentional "" — e.g. an English
  // indefinite-article fragment with no equivalent in the target language); fall back to
  // English only when the key is absent.
  return new Proxy(base, { get: (_t, k: string) => (k in over ? over[k] : base[k]) }) as Content
}

export function meta(locale: AppLocale): Metadata {
  const c = content(locale)
  const url = postUrl(locale)
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    keywords: [
      'how to contribute to open source',
      'open source contribution guide',
      'GitHub contribution',
      'first time contributor',
      'open source beginner',
      'pull request guide',
      'Git workflow',
      'open source collaboration',
      'contribute to GitHub',
      'open source community',
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
    '@type': 'HowTo',
    '@id': `${url}#article`,
    name: c.artName,
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
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      { '@type': 'HowToStep', position: 1, name: c.schStep1Name, text: c.schStep1Text },
      { '@type': 'HowToStep', position: 2, name: c.schStep2Name, text: c.schStep2Text },
      { '@type': 'HowToStep', position: 3, name: c.schStep3Name, text: c.schStep3Text },
      { '@type': 'HowToStep', position: 4, name: c.schStep4Name, text: c.schStep4Text },
      { '@type': 'HowToStep', position: 5, name: c.schStep5Name, text: c.schStep5Text },
    ],
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fq${n}a`] },
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

      <div className="relative w-full bg-gradient-to-br from-warning-500/10 via-surface-800 to-success-500/10 border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-warning-500/20 border border-warning-500/40 text-warning-300 text-sm font-medium">
              {c.pillGuide}
            </span>
            <span className="px-3 py-1 rounded-full bg-success-500/20 border border-success-500/40 text-success-300 text-sm font-medium">
              {c.pillOpenSource}
            </span>
            <span className="text-sm text-surface-400">{c.heroPublished}</span>
            <span className="text-sm text-surface-400">{c.heroReadTime}</span>
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
              <h2 className="text-3xl font-bold text-white mb-6">{c.whyH}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-primary-300 mb-2">{c.why1H}</h4>
                  <p className="text-surface-300 text-sm">{c.why1P}</p>
                </div>
                <div className="bg-accent-500/5 border border-accent-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-accent-300 mb-2">{c.why2H}</h4>
                  <p className="text-surface-300 text-sm">{c.why2P}</p>
                </div>
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.why3H}</h4>
                  <p className="text-surface-300 text-sm">{c.why3P}</p>
                </div>
                <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-warning-300 mb-2">{c.why4H}</h4>
                  <p className="text-surface-300 text-sm">{c.why4P}</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.preH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.preP}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.preL1a}<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.preL1link}</a>{c.preL1b}</li>
                <li><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.preL2link}</a>{c.preL2b}</li>
                <li>{c.preL3}</li>
                <li>{c.preL4}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s1H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1P1a}<strong className="text-white">{c.s1P1b}</strong>{c.s1P1c}
              </p>
              <ol className="list-decimal list-inside text-surface-300 space-y-3 mb-6 ml-4">
                <li>{c.s1O1a}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.s1O1link}</a></li>
                <li>{c.s1O2a}<strong className="text-white">{c.s1O2b}</strong>{c.s1O2c}</li>
                <li>{c.s1O3}</li>
              </ol>
              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                <p className="text-surface-300 text-sm">
                  <strong className="text-white">{c.s1TipLabel}</strong>{c.s1TipText}<code className="text-accent-300 bg-surface-900 px-1 rounded">github.com/YOUR_USERNAME/editorapdf</code>
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s2H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s2P1a}</strong>{c.s2P1b}
              </p>
              <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <pre className="text-accent-300">
{`# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/editorapdf.git
cd editorapdf`}
                </pre>
              </div>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2P2}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s3H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3P1}
              </p>
              <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <pre className="text-accent-300">
{`# Install dependencies
npm install

# Run the development server
npm run dev`}
                </pre>
              </div>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3P2a}<code className="text-accent-300 bg-surface-900 px-1 rounded">http://localhost:3000</code>{c.s3P2b}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s4H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4P1a}<strong className="text-white">{c.s4P1b}</strong>{c.s4P1c}
              </p>
              <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <pre className="text-accent-300">
{`# Create and switch to a new branch
git checkout -b fix-typo-in-readme

# Or for a new feature:
git checkout -b add-dark-mode-toggle`}
                </pre>
              </div>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4P2}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s5H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5P1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.s5L1}</li>
                <li>{c.s5L2}</li>
                <li>{c.s5L3}</li>
                <li>{c.s5L4}</li>
                <li>{c.s5L5}</li>
              </ul>
              <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-success-300 mb-2">{c.s5CalloutH}</h4>
                <p className="text-surface-300 text-sm">
                  {c.s5CalloutTa}<a href="https://github.com/affsquadDevs/editorapdf/issues" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.s5CalloutLink}</a>{c.s5CalloutTb}
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s6H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6P1a}<strong className="text-white">{c.s6P1b}</strong>{c.s6P1c}
              </p>
              <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <pre className="text-accent-300">
{`# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Fix typo in README: 'editing' -> 'editing'"`}
                </pre>
              </div>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s6P2}</strong>
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.s6GoodL1}</li>
                <li>{c.s6GoodL2}</li>
                <li>{c.s6GoodL3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s6P3}</strong>
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.s6BadL1}</li>
                <li>{c.s6BadL2}</li>
                <li>{c.s6BadL3}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s7H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7P1}
              </p>
              <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <pre className="text-accent-300">
{`# Push your branch to your fork
git push origin fix-typo-in-readme`}
                </pre>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s8H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8P1a}<strong className="text-white">{c.s8P1b}</strong>{c.s8P1c}
              </p>
              <ol className="list-decimal list-inside text-surface-300 space-y-3 mb-6 ml-4">
                <li>{c.s8O1}</li>
                <li>{c.s8O2}</li>
                <li>{c.s8O3}
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong className="text-white">{c.s8O3SubA1}</strong>{c.s8O3SubA2}</li>
                    <li><strong className="text-white">{c.s8O3SubB1}</strong>{c.s8O3SubB2}</li>
                  </ul>
                </li>
                <li>{c.s8O4}</li>
              </ol>
              <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-primary-300 mb-2">{c.s8TplH}</h4>
                <div className="bg-surface-900/50 rounded p-4 text-sm text-surface-300 font-mono">
                  <p className="mb-2"><strong>{c.s8TplWhatLabel}</strong>{c.s8TplWhatText}</p>
                  <p className="mb-2"><strong>{c.s8TplWhyLabel}</strong>{c.s8TplWhyText}</p>
                  <p><strong>{c.s8TplTestLabel}</strong>{c.s8TplTestText}</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.s9H}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s9P1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.s9L1}</li>
                <li>{c.s9L2}</li>
                <li>{c.s9L3}</li>
                <li>{c.s9L4}</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.typesH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.typesP}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-primary-300 mb-2">{c.type1H}</h4>
                  <p className="text-surface-300 text-sm">{c.type1P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-accent-300 mb-2">{c.type2H}</h4>
                  <p className="text-surface-300 text-sm">{c.type2P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.type3H}</h4>
                  <p className="text-surface-300 text-sm">{c.type3P}</p>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-warning-300 mb-2">{c.type4H}</h4>
                  <p className="text-surface-300 text-sm">{c.type4P}</p>
                </div>
              </div>
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

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv4q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv4a}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.readyH}</h2>
              <p className="text-surface-300 leading-relaxed mb-6">
                {c.readyPa}<a href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.readyLink}</a>{c.readyPb}
              </p>
              <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{c.ctaH}</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/affsquadDevs/editorapdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-md"
                  >
                    {c.ctaBtn1}
                  </a>
                  <a
                    href="https://github.com/affsquadDevs/editorapdf/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary btn-md"
                  >
                    {c.ctaBtn2}
                  </a>
                </div>
              </div>
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
import { TRANSLATIONS } from './contributing-to-open-source-beginners-guide.i18n'
Object.assign(C, TRANSLATIONS)
