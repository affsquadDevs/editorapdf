import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-we-built-open-source-pdf-editor'
const postPath = `/blog/${slug}`
const ogImage = '/og/og-image.png'
const datePublished = '2026-02-13'
const dateModified = '2026-02-13'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<a>/<Link>/<code> markup stays
// in the JSX below — only the text segments are keyed here. Code/ASCII/JSON blocks are kept
// literal in the JSX and are NOT externalized (they must stay identical across locales).
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How We Built a Free Open-Source PDF Editor with Next.js | EditoraPDF',
    metaDesc: 'Technical deep dive into building EditoraPDF - a free, open-source PDF editor with Next.js 14, TypeScript, PDF.js, and pdf-lib. Learn about our architecture, challenges, and solutions.',
    ogTitle: 'How We Built a Free Open-Source PDF Editor with Next.js',
    ogDesc: 'Technical deep dive into building EditoraPDF - learn about our tech stack, architecture decisions, and open-source development process.',
    twTitle: 'How We Built a Free Open-Source PDF Editor with Next.js',
    twDesc: 'Technical deep dive into building EditoraPDF with Next.js, TypeScript, PDF.js, and pdf-lib.',
    ogAlt: 'How we built EditoraPDF - open source PDF editor',

    artHeadline: 'How We Built a Free Open-Source PDF Editor with Next.js',
    artDesc: 'Complete technical guide on building a browser-based PDF editor using Next.js, TypeScript, PDF.js, and pdf-lib',

    bcLeaf: 'How We Built Open-Source PDF Editor',

    // Schema FAQ (4)
    fq1q: 'What technology stack is EditoraPDF built with?',
    fq1a: 'EditoraPDF is built with Next.js 14, TypeScript, React 18, PDF.js for rendering, pdf-lib for manipulation, Zustand for state management, and Tailwind CSS for styling. It is completely open source under MIT license.',
    fq2q: 'Why did you choose Next.js for a PDF editor?',
    fq2a: 'Next.js provides excellent performance, SEO capabilities, static export support, and great developer experience. The App Router makes it easy to build fast, SEO-friendly applications.',
    fq3q: 'Is EditoraPDF really open source?',
    fq3a: 'Yes, EditoraPDF is 100% open source under the MIT License. The complete source code is available on GitHub at https://github.com/affsquadDevs/editorapdf',
    fq4q: 'How does client-side PDF processing work?',
    fq4a: 'PDF.js renders PDFs to HTML canvas in the browser, while pdf-lib manipulates the PDF structure. All processing happens locally in the user browser using JavaScript, ensuring privacy and security.',

    // Hero meta
    badgeOpenSource: 'Open Source',
    badgeTechnical: 'Technical',
    published: 'Published: February 13, 2026',
    readTime: '10 min read',
    heroTitle: 'How We Built a Free Open-Source PDF Editor with Next.js',
    heroSubtitle: 'A technical deep dive into building EditoraPDF — our journey from idea to production-ready open-source PDF editor',
    ctaViewSource: 'View Source on GitHub',
    ctaStar: '⭐ Star the Project',

    // Intro
    intro1a: 'When we set out to build EditoraPDF, we had one clear goal: create a ',
    intro1b: 'completely free, open-source PDF editor',
    intro1c: ' that respects user privacy and works entirely in the browser. No servers, no uploads, no tracking — just pure client-side processing.',
    intro2: "This is the story of how we built it, the technical challenges we faced, and the decisions we made along the way. Whether you're a developer looking to build something similar or just curious about open-source development, this post will give you a complete inside look.",

    // The Vision
    visionH: 'The Vision: Privacy-First PDF Editing',
    visionP1: 'Most PDF editors today require you to upload your documents to their servers. For sensitive documents like contracts, medical records, or financial statements, this is a privacy nightmare.',
    visionP2: 'We wanted to build something different:',
    visionL1a: '100% client-side processing',
    visionL1b: ' — files never leave your browser',
    visionL2a: 'No installation required',
    visionL2b: ' — works directly in web browsers',
    visionL3a: 'No signup or tracking',
    visionL3b: ' — completely anonymous usage',
    visionL4a: 'Open source',
    visionL4b: ' — transparent code anyone can audit',
    visionL5a: 'Free forever',
    visionL5b: ' — no paywalls or subscriptions',
    visionP3: 'With these principles in mind, we started evaluating technologies that could make this vision a reality.',

    // Tech Stack
    stackH: 'Choosing the Tech Stack',
    stackFwH: 'Frontend Framework: Next.js 14',
    stackFwP1a: 'We chose ',
    stackFwP1b: 'Next.js 14',
    stackFwP1c: ' with the new App Router for several reasons:',
    stackFwL1a: 'Excellent SEO capabilities',
    stackFwL1b: ' — server-side rendering and metadata management out of the box',
    stackFwL2a: 'Static export support',
    stackFwL2b: ' — deploy anywhere (Vercel, Netlify, GitHub Pages)',
    stackFwL3a: 'TypeScript integration',
    stackFwL3b: ' — type safety and better developer experience',
    stackFwL4a: 'Performance optimization',
    stackFwL4b: ' — automatic code splitting, image optimization',
    stackFwL5a: 'Developer experience',
    stackFwL5b: ' — hot reload, great documentation, huge ecosystem',

    stackRenderH: 'PDF Rendering: PDF.js',
    stackRenderP1a: 'PDF.js',
    stackRenderP1b: " by Mozilla is the gold standard for rendering PDFs in the browser. It's what powers Firefox's built-in PDF viewer.",
    stackRenderAdv: 'Key advantages:',
    stackRenderL1: 'Battle-tested in millions of browsers',
    stackRenderL2: 'Excellent rendering quality',
    stackRenderL3: 'Text extraction capabilities',
    stackRenderL4: 'Canvas-based rendering for performance',
    stackRenderL5: 'Active maintenance by Mozilla',

    stackManipH: 'PDF Manipulation: pdf-lib',
    stackManipP1a: 'For creating and modifying PDFs, we use ',
    stackManipP1b: 'pdf-lib',
    stackManipP1c: ' — a pure JavaScript library that runs entirely in the browser.',
    stackManipCap: 'Key capabilities:',
    stackManipL1: 'Create PDFs from scratch',
    stackManipL2: 'Modify existing PDFs (add pages, rotate, delete)',
    stackManipL3: 'Embed text, images, and shapes',
    stackManipL4: 'Copy pages between documents',
    stackManipL5: 'Zero dependencies on Node.js',

    stackStateH: 'State Management: Zustand',
    stackStateP1a: 'Instead of Redux, we chose ',
    stackStateP1b: 'Zustand',
    stackStateP1c: ' — a minimal, fast state management library.',
    stackStateL1: 'Simple API — no boilerplate code',
    stackStateL2: 'TypeScript-first design',
    stackStateL3: 'Small bundle size (~1KB)',
    stackStateL4: 'No context providers needed',

    stackStyleH: 'Styling: Tailwind CSS',
    stackStyleP1a: 'Tailwind CSS',
    stackStyleP1b: ' gives us utility-first styling with excellent developer experience and small production bundles through automatic purging.',

    // Architecture
    archH: 'Architecture & Design Decisions',
    archClientH: '1. Client-Side Processing Only',
    archClientP1: 'Everything happens in the browser:',
    archClientP2: "At no point does the file leave the user's device. This is true privacy by design.",

    archCoordH: '2. Normalized Coordinate System',
    archCoordP1: 'One major challenge: PDFs have different page sizes, and users can zoom in/out. How do we track overlay positions?',
    archCoordP2a: 'Solution:',
    archCoordP2b: ' Normalize all coordinates to the range [0, 1].',
    archCoordP3: 'This makes overlays zoom-independent and portable across different page sizes.',

    archCompH: '3. Component Architecture',
    archCompP1: 'We structured the app into focused components:',
    archCompL1: ' — main canvas rendering',
    archCompL2: ' — page navigation sidebar',
    archCompL3: ' — zoom, rotate, delete controls',
    archCompL4: ' — tool selection (text, image, shape)',
    archCompL5: ' — text, images, shapes rendering',
    archCompL6: ' — PDF export logic',

    archStateH: '4. State Management Pattern',
    archStateP1: 'Our Zustand store maintains:',

    // Challenges
    challH: 'Technical Challenges We Faced',
    chall1H: 'Challenge 1: Text Extraction Accuracy',
    chall1P1: "PDF.js can extract text, but positioning isn't always pixel-perfect due to how PDFs encode text (sometimes as individual characters, sometimes as words).",
    chall1P2a: 'Solution:',
    chall1P2b: ' We extract text items with their transformation matrices and convert to normalized coordinates with generous bounding boxes.',

    chall2H: 'Challenge 2: Performance with Large PDFs',
    chall2P1: 'Rendering 100+ page PDFs can freeze the browser.',
    chall2P2: 'Solution:',
    chall2L1: 'Lazy load pages (only render visible pages)',
    chall2L2: 'Use requestAnimationFrame for smooth rendering',
    chall2L3: 'Recommend 25MB / 50 pages limit',
    chall2L4: 'Offscreen canvas for thumbnails',

    chall3H: 'Challenge 3: Export Quality',
    chall3P1: 'Embedding text and images in pdf-lib requires careful coordinate transformation from browser space to PDF space.',
    chall3P2a: 'Solution:',
    chall3P2b: ' Build a comprehensive transformation pipeline that handles:',
    chall3L1: 'Page rotations',
    chall3L2: 'Coordinate system differences (Y-axis flipped in PDF)',
    chall3L3: 'Font embedding and sizing',
    chall3L4: 'Image format conversion',

    chall4H: 'Challenge 4: Browser Compatibility',
    chall4P1: 'Different browsers have slightly different canvas implementations and PDF rendering quirks.',
    chall4P2a: 'Solution:',
    chall4P2b: ' Extensive testing across Chrome, Firefox, Safari, and Edge. Use feature detection instead of browser detection.',

    // Open Source Journey
    osH: 'Why We Made It Open Source',
    osP1: 'From day one, we knew this had to be open source:',
    os1H: '1. Transparency = Trust',
    os1P: 'When dealing with sensitive documents, users need to verify that files truly stay local. Open source lets anyone audit the code.',
    os2H: '2. Community Contributions',
    os2P: 'Open source enables developers worldwide to contribute features, fix bugs, and improve the tool.',
    os3H: '3. Learning Resource',
    os3P: 'We learned so much from open-source projects. Now we can give back and help others learn Next.js, PDF processing, and web development.',
    os4H: '4. Longevity',
    os4P: 'Even if we stop maintaining it, the community can fork and continue development. The tool lives on.',

    // Results
    resH: 'The Results',
    resP1: 'After months of development, we launched EditoraPDF with:',
    resStat1L: 'Client-side processing',
    resStat2L: 'Data uploaded to servers',
    resStat3L: 'Open source license',
    resStat4L: 'Forever free',
    resP2a: 'The codebase is available at ',
    resP2link: 'github.com/affsquadDevs/editorapdf',
    resP2b: ' under the MIT License.',

    // Learnings
    learnH: 'Key Takeaways for Developers',
    learn1a: 'Client-side processing is powerful',
    learn1b: ' — Modern browsers can handle complex tasks that used to require servers',
    learn2a: 'Choose the right libraries',
    learn2b: ' — PDF.js and pdf-lib saved us months of development',
    learn3a: 'Coordinate normalization is key',
    learn3b: ' — Makes overlays portable and zoom-independent',
    learn4a: 'Performance matters',
    learn4b: ' — Lazy loading and optimization are crucial for large files',
    learn5a: 'Open source benefits everyone',
    learn5b: ' — Transparency, community, and learning all win',

    // Get Involved
    giH: 'Get Involved',
    giP1: 'EditoraPDF is an open-source project, and we welcome contributions from developers of all skill levels.',
    giStarH: 'Star on GitHub',
    giStarP: 'Show your support and stay updated with new releases',
    giBugH: 'Report Bugs',
    giBugP: 'Help us improve by reporting issues you encounter',
    giContribH: 'Contribute Code',
    giContribP: 'Submit pull requests with new features or improvements',
    giTryH: 'Try It Out',
    giTryP: 'Edit your PDFs online and share your feedback',

    // FAQ (6 visible)
    fv1q: 'What technology stack is EditoraPDF built with?',
    fv1a: 'EditoraPDF is built with Next.js 14, TypeScript, React 18, PDF.js for rendering, pdf-lib for manipulation, Zustand for state management, and Tailwind CSS for styling. It is completely open source under MIT license.',
    fv2q: 'Why did you choose Next.js for a PDF editor?',
    fv2a: 'Next.js provides excellent performance, SEO capabilities, static export support, and great developer experience. The App Router makes it easy to build fast, SEO-friendly applications that can be deployed anywhere.',
    fv3q: 'Is EditoraPDF really open source?',
    fv3a1: 'Yes, EditoraPDF is 100% open source under the MIT License. The complete source code is available on GitHub at ',
    fv3aLink: 'github.com/affsquadDevs/editorapdf',
    fv4q: 'How does client-side PDF processing work?',
    fv4a: "PDF.js renders PDFs to HTML canvas in the browser, while pdf-lib manipulates the PDF structure. All processing happens locally in the user's browser using JavaScript, ensuring complete privacy and security without any server uploads.",
    fv5q: 'Can I use EditoraPDF code in my own project?',
    fv5a: 'Absolutely! EditoraPDF is licensed under MIT, which means you can use, modify, and distribute the code freely, even in commercial projects. Just include the original license notice.',
    fv6q: 'How can I contribute to the project?',
    fv6a1: 'Check out our ',
    fv6aLink: 'Contributing Guide',
    fv6a2: ' on GitHub. You can contribute code, report bugs, suggest features, improve documentation, or help with testing.',

    // Conclusion
    concH: 'Final Thoughts',
    concP1: 'Building EditoraPDF was a challenging but rewarding journey. We learned immense amounts about PDF processing, browser capabilities, and open-source development.',
    concP2: "The best part? Anyone can now take this code, learn from it, modify it, or build something even better. That's the power of open source.",
    concP3a: "If you're working on a similar project or just curious about the code, check out the ",
    concP3link: 'GitHub repository',
    concP3b: ". We'd love to hear your feedback, answer questions, or review your pull requests.",

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
    keywords: 'open source, Next.js, PDF editor, TypeScript, React, PDF.js, pdf-lib, web development',
    dependencies: 'Next.js 14, TypeScript 5, React 18, PDF.js 3, pdf-lib 1.17',
    proficiencyLevel: 'Intermediate',
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
    mainEntity: [1, 2, 3, 4].map((n) => ({
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

      {/* Breadcrumbs */}
      <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li>
              <Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link>
            </li>
            <li>/</li>
            <li className="text-surface-300">{c.bcLeaf}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-primary-500/10 via-surface-800 to-accent-500/10 border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
              {c.badgeOpenSource}
            </span>
            <span className="px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/40 text-accent-300 text-sm font-medium">
              {c.badgeTechnical}
            </span>
            <span className="text-sm text-surface-400">
              {c.published}
            </span>
            <span className="text-sm text-surface-400">
              {c.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {c.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
            {c.heroSubtitle}
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
              {c.ctaViewSource}
            </a>
            <a
              href="https://github.com/affsquadDevs/editorapdf/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-md"
            >
              {c.ctaStar}
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
              {c.intro1a}<strong className="text-white">{c.intro1b}</strong>{c.intro1c}
            </p>
            <p className="text-lg text-surface-400 mb-12">
              {c.intro2}
            </p>

            {/* The Vision */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.visionH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.visionP1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.visionP2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.visionL1a}</strong>{c.visionL1b}</li>
                <li><strong className="text-white">{c.visionL2a}</strong>{c.visionL2b}</li>
                <li><strong className="text-white">{c.visionL3a}</strong>{c.visionL3b}</li>
                <li><strong className="text-white">{c.visionL4a}</strong>{c.visionL4b}</li>
                <li><strong className="text-white">{c.visionL5a}</strong>{c.visionL5b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.visionP3}
              </p>
            </section>

            {/* Tech Stack */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.stackH}</h2>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.stackFwH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.stackFwP1a}<strong className="text-white">{c.stackFwP1b}</strong>{c.stackFwP1c}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><strong className="text-white">{c.stackFwL1a}</strong>{c.stackFwL1b}</li>
                <li><strong className="text-white">{c.stackFwL2a}</strong>{c.stackFwL2b}</li>
                <li><strong className="text-white">{c.stackFwL3a}</strong>{c.stackFwL3b}</li>
                <li><strong className="text-white">{c.stackFwL4a}</strong>{c.stackFwL4b}</li>
                <li><strong className="text-white">{c.stackFwL5a}</strong>{c.stackFwL5b}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.stackRenderH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.stackRenderP1a}</a>{c.stackRenderP1b}
              </p>
              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                <p className="text-surface-300 text-sm mb-2"><strong className="text-white">{c.stackRenderAdv}</strong></p>
                <ul className="list-disc list-inside text-surface-400 space-y-1 text-sm ml-4">
                  <li>{c.stackRenderL1}</li>
                  <li>{c.stackRenderL2}</li>
                  <li>{c.stackRenderL3}</li>
                  <li>{c.stackRenderL4}</li>
                  <li>{c.stackRenderL5}</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.stackManipH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.stackManipP1a}<a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.stackManipP1b}</a>{c.stackManipP1c}
              </p>
              <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                <p className="text-surface-300 text-sm mb-2"><strong className="text-white">{c.stackManipCap}</strong></p>
                <ul className="list-disc list-inside text-surface-400 space-y-1 text-sm ml-4">
                  <li>{c.stackManipL1}</li>
                  <li>{c.stackManipL2}</li>
                  <li>{c.stackManipL3}</li>
                  <li>{c.stackManipL4}</li>
                  <li>{c.stackManipL5}</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.stackStateH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.stackStateP1a}<a href="https://github.com/pmndrs/zustand" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.stackStateP1b}</a>{c.stackStateP1c}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.stackStateL1}</li>
                <li>{c.stackStateL2}</li>
                <li>{c.stackStateL3}</li>
                <li>{c.stackStateL4}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.stackStyleH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.stackStyleP1a}</a>{c.stackStyleP1b}
              </p>
            </section>

            {/* Architecture */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.archH}</h2>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.archClientH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.archClientP1}
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
                {c.archClientP2}
              </p>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.archCoordH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.archCoordP1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.archCoordP2a}</strong>{c.archCoordP2b}
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
                {c.archCoordP3}
              </p>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.archCompH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.archCompP1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">PdfViewer</code>{c.archCompL1}</li>
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">Thumbnails</code>{c.archCompL2}</li>
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">Toolbar</code>{c.archCompL3}</li>
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">EditToolbar</code>{c.archCompL4}</li>
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">AdvancedOverlayLayer</code>{c.archCompL5}</li>
                <li><code className="text-accent-300 bg-surface-800 px-2 py-1 rounded">ExportButton</code>{c.archCompL6}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-primary-300 mb-4">{c.archStateH}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.archStateP1}
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
              <h2 className="text-3xl font-bold text-white mb-6">{c.challH}</h2>

              <h3 className="text-2xl font-semibold text-warning-300 mb-4">{c.chall1H}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.chall1P1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.chall1P2a}</strong>{c.chall1P2b}
              </p>

              <h3 className="text-2xl font-semibold text-warning-300 mb-4">{c.chall2H}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.chall2P1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.chall2P2}</strong>
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.chall2L1}</li>
                <li>{c.chall2L2}</li>
                <li>{c.chall2L3}</li>
                <li>{c.chall2L4}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-warning-300 mb-4">{c.chall3H}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.chall3P1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.chall3P2a}</strong>{c.chall3P2b}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                <li>{c.chall3L1}</li>
                <li>{c.chall3L2}</li>
                <li>{c.chall3L3}</li>
                <li>{c.chall3L4}</li>
              </ul>

              <h3 className="text-2xl font-semibold text-warning-300 mb-4">{c.chall4H}</h3>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.chall4P1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.chall4P2a}</strong>{c.chall4P2b}
              </p>
            </section>

            {/* Open Source Journey */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.osH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.osP1}
              </p>

              <div className="space-y-6">
                <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-primary-300 mb-2">{c.os1H}</h4>
                  <p className="text-surface-300 text-sm">
                    {c.os1P}
                  </p>
                </div>

                <div className="bg-accent-500/5 border border-accent-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-accent-300 mb-2">{c.os2H}</h4>
                  <p className="text-surface-300 text-sm">
                    {c.os2P}
                  </p>
                </div>

                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">{c.os3H}</h4>
                  <p className="text-surface-300 text-sm">
                    {c.os3P}
                  </p>
                </div>

                <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-warning-300 mb-2">{c.os4H}</h4>
                  <p className="text-surface-300 text-sm">
                    {c.os4P}
                  </p>
                </div>
              </div>
            </section>

            {/* Results */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.resH}</h2>
              <p className="text-surface-300 leading-relaxed mb-6">
                {c.resP1}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
                  <div className="text-surface-300">{c.resStat1L}</div>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <div className="text-3xl font-bold text-accent-400 mb-2">0 KB</div>
                  <div className="text-surface-300">{c.resStat2L}</div>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <div className="text-3xl font-bold text-success-400 mb-2">MIT</div>
                  <div className="text-surface-300">{c.resStat3L}</div>
                </div>
                <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                  <div className="text-3xl font-bold text-warning-400 mb-2">$0</div>
                  <div className="text-surface-300">{c.resStat4L}</div>
                </div>
              </div>

              <p className="text-surface-300 leading-relaxed">
                {c.resP2a}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">{c.resP2link}</a>{c.resP2b}
              </p>
            </section>

            {/* Learnings */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.learnH}</h2>

              <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-8">
                <ul className="space-y-4 text-surface-300">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">✓</span>
                    <div>
                      <strong className="text-white">{c.learn1a}</strong>{c.learn1b}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">✓</span>
                    <div>
                      <strong className="text-white">{c.learn2a}</strong>{c.learn2b}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">✓</span>
                    <div>
                      <strong className="text-white">{c.learn3a}</strong>{c.learn3b}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">✓</span>
                    <div>
                      <strong className="text-white">{c.learn4a}</strong>{c.learn4b}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">✓</span>
                    <div>
                      <strong className="text-white">{c.learn5a}</strong>{c.learn5b}
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Get Involved */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.giH}</h2>
              <p className="text-surface-300 leading-relaxed mb-6">
                {c.giP1}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href="https://github.com/affsquadDevs/editorapdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-primary-500/50 rounded-lg transition-colors group"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300">{c.giStarH}</h4>
                  <p className="text-sm text-surface-400">{c.giStarP}</p>
                </a>

                <a
                  href="https://github.com/affsquadDevs/editorapdf/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-accent-500/50 rounded-lg transition-colors group"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-300">{c.giBugH}</h4>
                  <p className="text-sm text-surface-400">{c.giBugP}</p>
                </a>

                <a
                  href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-success-500/50 rounded-lg transition-colors group"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-success-300">{c.giContribH}</h4>
                  <p className="text-sm text-surface-400">{c.giContribP}</p>
                </a>

                <a
                  href="https://editorapdf.com/edit"
                  className="block p-6 bg-surface-800/50 border border-surface-700 hover:border-warning-500/50 rounded-lg transition-colors group"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-warning-300">{c.giTryH}</h4>
                  <p className="text-sm text-surface-400">{c.giTryP}</p>
                </a>
              </div>
            </section>

            {/* FAQ */}
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
                    {c.fv3a1}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.fv3aLink}</a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv4q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv4a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv5q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv5a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv6q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv6a1}<a href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">{c.fv6aLink}</a>{c.fv6a2}
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{c.concH}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.concP1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.concP2}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.concP3a}<a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">{c.concP3link}</a>{c.concP3b}
              </p>
            </section>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link
              href={L('/blog')}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t('blog.backToBlog', 'Back to Blog')}
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
                © {new Date().getFullYear()} EditoraPDF. {t('blog.rights', 'All rights reserved.')}
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
                {c.footerOpenSource}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-we-built-open-source-pdf-editor.i18n'
Object.assign(C, TRANSLATIONS)
