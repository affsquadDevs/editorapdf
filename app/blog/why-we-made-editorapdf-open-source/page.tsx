import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/why-we-made-editorapdf-open-source`

export const metadata: Metadata = {
  title: 'Why We Made EditoraPDF Open Source - Our Philosophy | EditoraPDF Blog',
  description: 'Learn why we decided to make EditoraPDF completely open source and free forever. Discover the principles of transparency, privacy, and community that drive our project.',
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
    title: 'Why We Made EditoraPDF Open Source',
    description: 'The philosophy and principles behind making EditoraPDF completely open source and free forever.',
    url: postUrl,
    type: 'article',
    images: [{
        url: `${siteUrl}/og/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Why EditoraPDF is open source',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why We Made EditoraPDF Open Source',
    description: 'The philosophy behind making EditoraPDF free and open source forever.',
    images: [`${siteUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: postUrl,
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#article`,
  headline: 'Why We Made EditoraPDF Open Source',
  description: 'The philosophy, principles, and benefits behind making EditoraPDF a free and open-source PDF editor',
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
  articleSection: 'Philosophy',
  keywords: 'open source, free software, MIT license, transparency, privacy, community',
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
      name: 'Why We Made EditoraPDF Open Source',
      item: postUrl,
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

      <main className="min-h-screen flex flex-col">
        <Header />

        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-surface-300">Why We Made EditoraPDF Open Source</li>
            </ol>
          </div>
        </nav>

        <div className="relative w-full bg-gradient-to-br from-success-500/10 via-surface-800 to-primary-500/10 border-b border-surface-700/50">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-success-500/20 border border-success-500/40 text-success-300 text-sm font-medium">
                Open Source
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-sm font-medium">
                Philosophy
              </span>
              <span className="text-sm text-surface-400">Published: February 13, 2026</span>
              <span className="text-sm text-surface-400">8 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Why We Made EditoraPDF Open Source
            </h1>
            <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
              The principles, philosophy, and vision behind making EditoraPDF free and open source forever
            </p>
          </div>
        </div>

        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-surface-300 leading-relaxed mb-8">
                When we started building EditoraPDF, the decision to make it <strong className="text-white">open source</strong> wasn't an afterthought — it was the foundation. This post explores why transparency, community, and freedom matter so much to us.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">The Problem with Proprietary PDF Editors</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Most PDF editors today follow the same playbook:
                </p>
                <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6 mb-6">
                  <ul className="list-disc list-inside text-surface-300 space-y-3 ml-4">
                    <li><strong className="text-warning-300">Upload your files</strong> — Your sensitive documents go to someone else's servers</li>
                    <li><strong className="text-warning-300">Pay for features</strong> — Basic functionality locked behind paywalls</li>
                    <li><strong className="text-warning-300">Trust blindly</strong> — Closed-source code means no way to verify what happens to your data</li>
                    <li><strong className="text-warning-300">Vendor lock-in</strong> — Stop paying, lose access to your edited files</li>
                  </ul>
                </div>
                <p className="text-surface-300 leading-relaxed">
                  We believed there had to be a better way.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Core Principles</h2>
                
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-primary-500/10 to-primary-500/5 border-l-4 border-primary-500 p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold text-primary-300 mb-3">1. Transparency = Trust</h3>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      When you're editing sensitive documents — contracts, medical records, financial statements — you need to know <em>exactly</em> what happens to your data.
                    </p>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      With closed-source software, you have to take the developer's word that:
                    </p>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                      <li>Your files aren't being uploaded</li>
                      <li>Your documents aren't being analyzed</li>
                      <li>Your data isn't being sold to third parties</li>
                    </ul>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Open source eliminates the need for trust</strong> — anyone can read the code and verify that EditoraPDF truly keeps files local.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-success-500/10 to-success-500/5 border-l-4 border-success-500 p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold text-success-300 mb-3">2. Privacy by Design, Not by Promise</h3>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      We don't just <em>promise</em> privacy — we've built it into the architecture.
                    </p>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      EditoraPDF processes PDFs entirely in your browser. There is no backend server to upload files to. There's no database storing your documents. There's no API tracking your usage.
                    </p>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Privacy isn't a feature — it's the foundation.</strong>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-accent-500/10 to-accent-500/5 border-l-4 border-accent-500 p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold text-accent-300 mb-3">3. Community &gt; Corporation</h3>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      Software built by a community is more resilient, more innovative, and more aligned with user needs than software built solely for profit.
                    </p>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      Open source means:
                    </p>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                      <li>Developers worldwide can contribute features</li>
                      <li>Bug fixes come faster with more eyes on the code</li>
                      <li>The community decides the roadmap, not a CEO</li>
                      <li>The project can't be killed by a company shutting down</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-warning-500/10 to-warning-500/5 border-l-4 border-warning-500 p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold text-warning-300 mb-3">4. Free as in Freedom AND Free as in Beer</h3>
                    <p className="text-surface-300 leading-relaxed mb-4">
                      EditoraPDF is free in both senses:
                    </p>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                      <li><strong className="text-white">Free as in freedom</strong> — You can use, modify, and distribute the code (MIT License)</li>
                      <li><strong className="text-white">Free as in beer</strong> — No cost, no subscriptions, no hidden fees</li>
                    </ul>
                    <p className="text-surface-300 leading-relaxed">
                      We believe basic tools for working with documents should be accessible to everyone, regardless of their financial situation.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">The Benefits of Open Source (For Everyone)</h2>
                
                <h3 className="text-2xl font-semibold text-primary-300 mb-4">For Users</h3>
                <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                  <li><strong className="text-white">Verifiable privacy</strong> — Audit the code yourself or have an expert do it</li>
                  <li><strong className="text-white">No vendor lock-in</strong> — Even if we disappear, the code remains</li>
                  <li><strong className="text-white">Forever free</strong> — No risk of features moving behind paywalls</li>
                  <li><strong className="text-white">Community support</strong> — Thousands of developers can help troubleshoot issues</li>
                </ul>

                <h3 className="text-2xl font-semibold text-accent-300 mb-4">For Developers</h3>
                <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                  <li><strong className="text-white">Learning resource</strong> — See how PDF processing works in a real application</li>
                  <li><strong className="text-white">Contribution opportunities</strong> — Build your portfolio with real open-source contributions</li>
                  <li><strong className="text-white">Fork and customize</strong> — Adapt EditoraPDF for your specific needs</li>
                  <li><strong className="text-white">Commercial use allowed</strong> — MIT License permits using our code in your own products</li>
                </ul>

                <h3 className="text-2xl font-semibold text-success-300 mb-4">For Organizations</h3>
                <ul className="list-disc list-inside text-surface-300 space-y-3 mb-8 ml-4">
                  <li><strong className="text-white">Security audits</strong> — Verify code meets your security requirements</li>
                  <li><strong className="text-white">Self-hosting</strong> — Deploy on your own infrastructure if needed</li>
                  <li><strong className="text-white">No licensing costs</strong> — Free for unlimited employees</li>
                  <li><strong className="text-white">Compliance</strong> — Easier to meet data protection regulations (GDPR, HIPAA, etc.)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">What Open Source Means for EditoraPDF's Future</h2>
                
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Sustainable Development</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Open source doesn't mean abandonment. It means:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                    <li>Multiple contributors maintain the codebase</li>
                    <li>Community members can fix bugs even if we're unavailable</li>
                    <li>The project can continue indefinitely through community support</li>
                  </ul>
                </div>

                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Innovation Through Collaboration</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Ideas come from everywhere:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                    <li>A designer might improve the UI/UX</li>
                    <li>A security researcher might add encryption features</li>
                    <li>A developer might optimize performance</li>
                    <li>A translator might add internationalization</li>
                  </ul>
                </div>

                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Long-Term Viability</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Closed-source projects die when:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4 mb-4">
                    <li>The company shuts down</li>
                    <li>The project becomes unprofitable</li>
                    <li>The original developers move on</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Open source projects can outlive their creators.</strong> As long as the code exists, someone can maintain it.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Addressing Common Concerns</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">"How do you make money?"</h3>
                    <p className="text-surface-300 leading-relaxed">
                      EditoraPDF is a passion project, not a business. We're not looking to monetize users. The hosting costs for a static site are negligible, and the development is driven by our love for open source and privacy-respecting software.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">"Won't competitors just copy your code?"</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, and that's a feature, not a bug! If someone takes our code and improves it, that benefits everyone. The open-source community thrives on sharing and iteration.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">"Is open source less secure?"</h3>
                    <p className="text-surface-300 leading-relaxed mb-2">
                      <strong className="text-white">The opposite.</strong> Open source is often more secure because:
                    </p>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 ml-4">
                      <li>Many eyes review the code for vulnerabilities</li>
                      <li>Security researchers can report issues publicly</li>
                      <li>Fixes are transparent and verifiable</li>
                      <li>No "security through obscurity" — the code is legitimately secure</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">"Will it always be free?"</h3>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Yes.</strong> The MIT License ensures that the code will always be free. Even if we wanted to make it paid (we don't), someone could fork the last free version and continue maintaining it.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">How You Can Support Open Source</h2>
                <p className="text-surface-300 leading-relaxed mb-6">
                  You don't need to be a developer to support EditoraPDF and open source in general:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-primary-300 mb-2">⭐ Star on GitHub</h4>
                    <p className="text-sm text-surface-400">Stars help other developers discover the project</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-accent-300 mb-2">📢 Share It</h4>
                    <p className="text-sm text-surface-400">Tell friends, colleagues, on social media</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-success-300 mb-2">🐛 Report Bugs</h4>
                    <p className="text-sm text-surface-400">Help us improve by reporting issues</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-warning-300 mb-2">💻 Contribute Code</h4>
                    <p className="text-sm text-surface-400">Submit pull requests with improvements</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Final Thoughts</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Making EditoraPDF open source wasn't a business decision — it was a <strong className="text-white">values decision</strong>.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  We believe that basic tools for working with documents should be:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li><strong className="text-white">Accessible</strong> — Free for everyone</li>
                  <li><strong className="text-white">Transparent</strong> — Open source code</li>
                  <li><strong className="text-white">Private</strong> — No data collection</li>
                  <li><strong className="text-white">Community-driven</strong> — Built for users, not investors</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  Open source is how we make that vision real. Join us at <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline font-semibold">GitHub</a> and help build the future of privacy-first PDF editing.
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
