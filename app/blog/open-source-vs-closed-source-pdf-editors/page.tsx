import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import MobileMenu from '../../components/MobileMenu'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/open-source-vs-closed-source-pdf-editors`

export const metadata: Metadata = {
  title: 'Comparing Open-Source vs. Closed-Source PDF Editors | EditoraPDF Blog',
  description: 'Comprehensive comparison of open-source and proprietary PDF editors. Learn the pros, cons, security implications, and which type is right for your needs.',
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
    title: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    description: 'A comprehensive comparison of open-source and proprietary PDF editors with pros, cons, and recommendations.',
    url: postUrl,
    type: 'article',
    images: [{
      url: `${siteUrl}/og/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Open source vs closed source PDF editor comparison',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    description: 'Comprehensive comparison of open-source and proprietary PDF editors.',
    images: [`${siteUrl}/og/og-image.png`],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#article`,
  headline: 'Comparing Open-Source vs. Closed-Source PDF Editors',
  description: 'Comprehensive comparison of open-source and proprietary PDF editors covering features, security, cost, and use cases',
  image: `${siteUrl}/og/og-image.png`,
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
  datePublished: '2026-02-13',
  dateModified: '2026-02-13',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
  articleSection: 'Comparison',
  keywords: 'open source, proprietary software, PDF editor comparison, free software, commercial software',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${postUrl}#breadcrumbs`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Open-Source vs Closed-Source PDF Editors',
      item: postUrl,
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between open-source and closed-source PDF editors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open-source PDF editors have publicly available source code that anyone can view, modify, and distribute. Closed-source editors keep their code proprietary and secret. Open-source editors are typically free and more transparent, while closed-source editors often require payment and offer professional support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are open-source PDF editors secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, open-source editors can be more secure because the code is publicly auditable. Many security researchers can review the code, and vulnerabilities are often found and fixed quickly. However, security depends on active maintenance and community involvement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better: open-source or closed-source PDF editor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your needs. Open-source editors are better for privacy, transparency, and cost. Closed-source editors may offer more features, professional support, and enterprise integrations. For most users, open-source editors like EditoraPDF provide excellent functionality without cost or privacy concerns.',
      },
    },
  ],
}

export default function BlogPost() {
  return (
    <>
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen flex flex-col">
        <header className="relative z-10 glass border-b border-surface-700/50" role="banner">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <MobileMenu />
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img src="/logo.svg" alt="EditoraPDF Logo" width={120} height={40} className="h-10 w-auto" />
                </Link>
              </div>
              
              <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/how-it-works" className="nav-link">How It Works</Link>
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/blog" className="nav-link text-primary-400">Blog</Link>
                <Link href="/contact" className="nav-link">Contact</Link>
                <a 
                  href="https://github.com/affsquadDevs/editorapdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="nav-link flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </nav>
              
              <Link href="/edit" className="btn-primary btn-md hidden sm:flex">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit PDF
              </Link>
            </div>
          </div>
        </header>

        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-surface-300">Open-Source vs Closed-Source PDF Editors</li>
            </ol>
          </div>
        </nav>

        <div className="relative w-full bg-gradient-to-br from-primary-500/10 via-surface-800 to-warning-500/10 border-b border-surface-700/50">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
                Comparison
              </span>
              <span className="px-3 py-1 rounded-full bg-warning-500/20 border border-warning-500/40 text-warning-300 text-sm font-medium">
                Analysis
              </span>
              <span className="text-sm text-surface-400">Published: February 13, 2026</span>
              <span className="text-sm text-surface-400">9 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Comparing Open-Source vs. Closed-Source PDF Editors
            </h1>
            <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
              A comprehensive comparison of open-source and proprietary PDF editors — which is right for you?
            </p>
          </div>
        </div>

        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-surface-300 leading-relaxed mb-8">
                When choosing a PDF editor, one of the first decisions you'll face is whether to go with an <strong className="text-white">open-source</strong> or <strong className="text-white">closed-source</strong> solution. This comparison will help you understand the differences and make an informed choice.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">What's the Difference?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-success-300 mb-3">Open-Source</h3>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                      <li>Source code is publicly available</li>
                      <li>Anyone can view, modify, distribute</li>
                      <li>Typically free (MIT, GPL licenses)</li>
                      <li>Community-driven development</li>
                      <li>Transparent and auditable</li>
                    </ul>
                  </div>

                  <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-warning-300 mb-3">Closed-Source</h3>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                      <li>Source code is proprietary</li>
                      <li>Only the company can modify</li>
                      <li>Usually requires payment</li>
                      <li>Company-driven development</li>
                      <li>Code is secret and unverifiable</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Cost Comparison</h2>
                
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Open-Source PDF Editors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <strong className="text-success-300">Cost: $0</strong>
                        <p className="text-surface-400 text-sm">Free forever, no subscriptions, no hidden fees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <strong className="text-success-300">License: MIT/GPL</strong>
                        <p className="text-surface-400 text-sm">Use commercially, modify, distribute freely</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Closed-Source PDF Editors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <strong className="text-warning-300">Cost: $10-$50/month</strong>
                        <p className="text-surface-400 text-sm">Subscription fees, per-user pricing, enterprise plans</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <strong className="text-warning-300">License: Proprietary</strong>
                        <p className="text-surface-400 text-sm">Restricted use, no modification, vendor lock-in</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Security & Privacy</h2>
                
                <h3 className="text-2xl font-semibold text-success-300 mb-4">Open-Source Advantages</h3>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><strong className="text-white">Transparency</strong> — Code is auditable by security researchers</li>
                  <li><strong className="text-white">Rapid fixes</strong> — Vulnerabilities are found and patched quickly</li>
                  <li><strong className="text-white">No hidden backdoors</strong> — Code is public, nothing to hide</li>
                  <li><strong className="text-white">Community review</strong> — Thousands of eyes on the code</li>
                </ul>

                <h3 className="text-2xl font-semibold text-warning-300 mb-4">Closed-Source Considerations</h3>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><strong className="text-white">Security through obscurity</strong> — Code is secret, but is it secure?</li>
                  <li><strong className="text-white">Slower patches</strong> — Only the company can fix vulnerabilities</li>
                  <li><strong className="text-white">Unknown data practices</strong> — Can't verify what happens to your files</li>
                  <li><strong className="text-white">Trust required</strong> — Must trust company's security claims</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Feature Comparison</h2>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-surface-700">
                        <th className="text-left p-4 text-white font-semibold">Feature</th>
                        <th className="text-center p-4 text-success-300 font-semibold">Open-Source</th>
                        <th className="text-center p-4 text-warning-300 font-semibold">Closed-Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Basic Editing</td>
                        <td className="p-4 text-center text-success-400">✓</td>
                        <td className="p-4 text-center text-warning-400">✓</td>
                      </tr>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Text & Images</td>
                        <td className="p-4 text-center text-success-400">✓</td>
                        <td className="p-4 text-center text-warning-400">✓</td>
                      </tr>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Page Management</td>
                        <td className="p-4 text-center text-success-400">✓</td>
                        <td className="p-4 text-center text-warning-400">✓</td>
                      </tr>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Advanced OCR</td>
                        <td className="p-4 text-center text-surface-400">Limited</td>
                        <td className="p-4 text-center text-warning-400">✓</td>
                      </tr>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Enterprise Support</td>
                        <td className="p-4 text-center text-surface-400">Community</td>
                        <td className="p-4 text-center text-warning-400">✓</td>
                      </tr>
                      <tr className="border-b border-surface-800">
                        <td className="p-4 text-surface-300">Customization</td>
                        <td className="p-4 text-center text-success-400">✓ Full</td>
                        <td className="p-4 text-center text-surface-400">Limited</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-surface-300">Self-Hosting</td>
                        <td className="p-4 text-center text-success-400">✓</td>
                        <td className="p-4 text-center text-surface-400">✗</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Use Case Recommendations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-success-300 mb-3">Choose Open-Source If:</h3>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                      <li>Privacy is a priority</li>
                      <li>You want to verify code security</li>
                      <li>Budget is limited</li>
                      <li>You need customization</li>
                      <li>You want to self-host</li>
                      <li>You're comfortable with community support</li>
                    </ul>
                  </div>

                  <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-warning-300 mb-3">Choose Closed-Source If:</h3>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 text-sm">
                      <li>You need enterprise support</li>
                      <li>Advanced OCR is required</li>
                      <li>Budget allows for subscriptions</li>
                      <li>You need specific integrations</li>
                      <li>Compliance requires vendor support</li>
                      <li>You prefer professional support</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Long-Term Viability</h2>
                
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-success-300 mb-3">Open-Source: Community Resilience</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Open-source projects can outlive their creators. Even if the original developers stop maintaining the project, the community can fork it and continue development. The code is always available.
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Example:</strong> Linux, Apache, WordPress — all thriving decades after creation.
                  </p>
                </div>

                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-warning-300 mb-3">Closed-Source: Company Dependency</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Closed-source projects depend entirely on the company. If the company shuts down, gets acquired, or discontinues the product, users are left without options. You can't maintain it yourself.
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Risk:</strong> Vendor lock-in, sudden discontinuation, price increases.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What is the difference between open-source and closed-source PDF editors?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Open-source PDF editors have publicly available source code that anyone can view, modify, and distribute. Closed-source editors keep their code proprietary and secret. Open-source editors are typically free and more transparent, while closed-source editors often require payment and offer professional support.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Are open-source PDF editors secure?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, open-source editors can be more secure because the code is publicly auditable. Many security researchers can review the code, and vulnerabilities are often found and fixed quickly. However, security depends on active maintenance and community involvement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Which is better: open-source or closed-source PDF editor?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      It depends on your needs. Open-source editors are better for privacy, transparency, and cost. Closed-source editors may offer more features, professional support, and enterprise integrations. For most users, open-source editors like EditoraPDF provide excellent functionality without cost or privacy concerns.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I use open-source PDF editors commercially?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes! Most open-source PDF editors use permissive licenses like MIT or Apache that allow commercial use. EditoraPDF uses the MIT License, which explicitly permits commercial use, modification, and distribution.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Both open-source and closed-source PDF editors have their place. For most users — especially those prioritizing privacy, transparency, and cost — <strong className="text-white">open-source editors like EditoraPDF</strong> offer an excellent solution.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Open-source editors provide:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Complete transparency and verifiability</li>
                  <li>Zero cost forever</li>
                  <li>Community-driven innovation</li>
                  <li>Freedom to customize and self-host</li>
                  <li>Long-term viability through community</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  Try <Link href="/edit" className="text-primary-400 hover:text-primary-300 underline">EditoraPDF</Link> — a free, open-source PDF editor that processes files entirely in your browser. View the source code on <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">GitHub</a> and verify our privacy claims yourself.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-surface-700/50">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>

        <footer className="mt-auto py-4 px-6 border-t border-surface-800/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm text-surface-500">© {new Date().getFullYear()} EditoraPDF. All rights reserved.</p>
                <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium hover:bg-primary-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Open Source
                </a>
              </div>
            </div>
          </div>
        </footer>

        <div className="fixed inset-0 bg-mesh -z-10" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" />
      </main>
    </>
  )
}
