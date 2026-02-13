import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import MobileMenu from '../../components/MobileMenu'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/contributing-to-open-source-beginners-guide`

export const metadata: Metadata = {
  title: 'Contributing to Open Source: A Beginner\'s Guide with EditoraPDF | EditoraPDF Blog',
  description: 'Learn how to contribute to open-source projects using EditoraPDF as an example. Step-by-step guide for first-time contributors covering Git, GitHub, pull requests, and more.',
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
    title: 'Contributing to Open Source: A Beginner\'s Guide with EditoraPDF',
    description: 'Step-by-step guide for first-time contributors to open-source projects using EditoraPDF as an example.',
    url: postUrl,
    type: 'article',
    images: [{
      url: `${siteUrl}/og/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Contributing to open source - beginner guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contributing to Open Source: A Beginner\'s Guide',
    description: 'Learn how to contribute to open-source projects step by step.',
    images: [`${siteUrl}/og/og-image.png`],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${postUrl}#article`,
  name: 'Contributing to Open Source: A Beginner\'s Guide',
  description: 'Step-by-step guide on how to contribute to open-source projects using EditoraPDF as an example',
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
  totalTime: 'PT30M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Fork the Repository',
      text: 'Fork the EditoraPDF repository on GitHub to create your own copy',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Clone Your Fork',
      text: 'Clone your fork to your local machine using Git',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Create a Branch',
      text: 'Create a new branch for your changes',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Make Changes',
      text: 'Make your changes, test them, and commit',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Submit Pull Request',
      text: 'Push your changes and submit a pull request',
    },
  ],
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
      name: 'Contributing to Open Source Guide',
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
      name: 'How do I start contributing to open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start by finding a project you\'re interested in, fork the repository, clone it locally, make small changes, and submit a pull request. Look for issues labeled "good first issue" to get started.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to be an expert programmer to contribute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No! Open source projects need contributions of all kinds: code, documentation, bug reports, translations, design, and more. Everyone can contribute something valuable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a pull request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pull request (PR) is a way to propose changes to a project. You submit your changes, maintainers review them, and if approved, they get merged into the main codebase.',
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
              <li className="text-surface-300">Contributing to Open Source Guide</li>
            </ol>
          </div>
        </nav>

        <div className="relative w-full bg-gradient-to-br from-warning-500/10 via-surface-800 to-success-500/10 border-b border-surface-700/50">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-warning-500/20 border border-warning-500/40 text-warning-300 text-sm font-medium">
                Guide
              </span>
              <span className="px-3 py-1 rounded-full bg-success-500/20 border border-success-500/40 text-success-300 text-sm font-medium">
                Open Source
              </span>
              <span className="text-sm text-surface-400">Published: February 13, 2026</span>
              <span className="text-sm text-surface-400">10 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Contributing to Open Source: A Beginner's Guide with EditoraPDF
            </h1>
            <p className="text-xl md:text-2xl text-surface-300 leading-relaxed">
              Learn how to contribute to open-source projects step by step, using EditoraPDF as your first example
            </p>
          </div>
        </div>

        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-surface-300 leading-relaxed mb-8">
                Contributing to open source can seem intimidating, but it doesn't have to be. This guide will walk you through your first contribution using <strong className="text-white">EditoraPDF</strong> as an example. By the end, you'll know how to fork, clone, make changes, and submit a pull request.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Why Contribute to Open Source?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-primary-300 mb-2">Build Your Portfolio</h4>
                    <p className="text-surface-300 text-sm">Real contributions show employers your skills</p>
                  </div>
                  <div className="bg-accent-500/5 border border-accent-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-accent-300 mb-2">Learn from Experts</h4>
                    <p className="text-surface-300 text-sm">Code reviews teach you best practices</p>
                  </div>
                  <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-success-300 mb-2">Give Back</h4>
                    <p className="text-surface-300 text-sm">Help projects you use and love</p>
                  </div>
                  <div className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-warning-300 mb-2">Join a Community</h4>
                    <p className="text-surface-300 text-sm">Connect with developers worldwide</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Before you start, you'll need:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>A <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">GitHub account</a> (free)</li>
                  <li><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Git</a> installed on your computer</li>
                  <li>A code editor (VS Code, Sublime, etc.)</li>
                  <li>Basic command line knowledge (helpful but not required)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 1: Fork the Repository</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  A <strong className="text-white">fork</strong> is your own copy of a repository. It lets you experiment without affecting the original project.
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-3 mb-6 ml-4">
                  <li>Go to <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">github.com/affsquadDevs/editorapdf</a></li>
                  <li>Click the <strong className="text-white">"Fork"</strong> button in the top right</li>
                  <li>Wait for GitHub to create your fork</li>
                </ol>
                <div className="bg-surface-800/50 border border-surface-700 rounded-lg p-4 mb-6">
                  <p className="text-surface-300 text-sm">
                    <strong className="text-white">Tip:</strong> After forking, you'll have your own copy at <code className="text-accent-300 bg-surface-900 px-1 rounded">github.com/YOUR_USERNAME/editorapdf</code>
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 2: Clone Your Fork</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Cloning</strong> downloads the repository to your computer.
                </p>
                <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                  <pre className="text-accent-300">
{`# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/editorapdf.git
cd editorapdf`}
                  </pre>
                </div>
                <p className="text-surface-300 leading-relaxed mb-4">
                  This creates a local copy on your computer that you can edit.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 3: Set Up the Project</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Install dependencies and make sure everything works:
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
                  Open <code className="text-accent-300 bg-surface-900 px-1 rounded">http://localhost:3000</code> to see the app running.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 4: Create a Branch</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  A <strong className="text-white">branch</strong> is like a separate workspace for your changes. Always create a new branch for each contribution.
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
                  Use descriptive branch names that explain what you're doing.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 5: Make Your Changes</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Now you can edit files! Good first contributions include:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Fixing typos in documentation</li>
                  <li>Improving code comments</li>
                  <li>Adding examples to README</li>
                  <li>Fixing small bugs</li>
                  <li>Improving accessibility</li>
                </ul>
                <div className="bg-success-500/5 border border-success-500/20 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-success-300 mb-2">Look for "Good First Issue" Labels</h4>
                  <p className="text-surface-300 text-sm">
                    Many projects label beginner-friendly issues. Check the <a href="https://github.com/affsquadDevs/editorapdf/issues" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Issues page</a> for these.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 6: Commit Your Changes</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  A <strong className="text-white">commit</strong> saves your changes with a message describing what you did.
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
                  <strong className="text-white">Good commit messages:</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>"Fix typo in README"</li>
                  <li>"Add dark mode toggle button"</li>
                  <li>"Improve error message clarity"</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">Bad commit messages:</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>"fix"</li>
                  <li>"changes"</li>
                  <li>"update"</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 7: Push to Your Fork</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Upload your changes to GitHub:
                </p>
                <div className="bg-surface-900/50 border border-surface-700 rounded-lg p-6 mb-6 font-mono text-sm">
                  <pre className="text-accent-300">
{`# Push your branch to your fork
git push origin fix-typo-in-readme`}
                  </pre>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 8: Open a Pull Request</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  A <strong className="text-white">pull request (PR)</strong> is how you propose your changes to the original project.
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-3 mb-6 ml-4">
                  <li>Go to your fork on GitHub</li>
                  <li>You'll see a banner saying "Compare & pull request" — click it</li>
                  <li>Fill out the PR form:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li><strong className="text-white">Title:</strong> Clear description of your change</li>
                      <li><strong className="text-white">Description:</strong> Explain what you changed and why</li>
                    </ul>
                  </li>
                  <li>Click "Create pull request"</li>
                </ol>
                <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-primary-300 mb-2">PR Template Example</h4>
                  <div className="bg-surface-900/50 rounded p-4 text-sm text-surface-300 font-mono">
                    <p className="mb-2"><strong>What changed:</strong> Fixed typo in README</p>
                    <p className="mb-2"><strong>Why:</strong> Improve documentation clarity</p>
                    <p><strong>Testing:</strong> Verified README renders correctly</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Step 9: Respond to Feedback</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Maintainers might ask for changes. This is normal! They're helping you improve your contribution.
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-6 ml-4">
                  <li>Be respectful and open to feedback</li>
                  <li>Make requested changes in the same branch</li>
                  <li>Push updates — they'll appear in the PR automatically</li>
                  <li>Thank reviewers for their time</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Types of Contributions</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You don't need to write code to contribute:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-primary-300 mb-2">Code</h4>
                    <p className="text-surface-300 text-sm">Bug fixes, new features, improvements</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-accent-300 mb-2">Documentation</h4>
                    <p className="text-surface-300 text-sm">README updates, tutorials, guides</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-success-300 mb-2">Testing</h4>
                    <p className="text-surface-300 text-sm">Report bugs, test new features</p>
                  </div>
                  <div className="bg-surface-800/30 border border-surface-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-warning-300 mb-2">Design</h4>
                    <p className="text-surface-300 text-sm">UI improvements, graphics, UX</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">How do I start contributing to open source?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Start by finding a project you're interested in, fork the repository, clone it locally, make small changes, and submit a pull request. Look for issues labeled "good first issue" to get started.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Do I need to be an expert programmer to contribute?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      No! Open source projects need contributions of all kinds: code, documentation, bug reports, translations, design, and more. Everyone can contribute something valuable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What is a pull request?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      A pull request (PR) is a way to propose changes to a project. You submit your changes, maintainers review them, and if approved, they get merged into the main codebase.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What if my PR gets rejected?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Don't take it personally! Rejections are usually about project direction or code style, not your skills. Ask for feedback and try again — every contributor has had PRs rejected.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Contribute?</h2>
                <p className="text-surface-300 leading-relaxed mb-6">
                  EditoraPDF welcomes contributions! Check out our <a href="https://github.com/affsquadDevs/editorapdf/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">Contributing Guide</a> for more details.
                </p>
                <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Get Started Today</h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/affsquadDevs/editorapdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-md"
                    >
                      View on GitHub
                    </a>
                    <a
                      href="https://github.com/affsquadDevs/editorapdf/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-md"
                    >
                      Find an Issue
                    </a>
                  </div>
                </div>
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
