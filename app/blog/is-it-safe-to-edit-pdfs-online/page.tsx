import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/is-it-safe-to-edit-pdfs-online`

export const metadata: Metadata = {
  title: 'Is It Safe to Edit PDFs Online? Privacy, Security, and What You Should Know',
  description: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.',
  openGraph: {
    type: 'article',
    title: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
    description: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for safely editing PDF documents online.',
    url: postUrl,
    images: [
      {
        url: `${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`,
        width: 1200,
        height: 630,
        alt: 'Is It Safe to Edit PDFs Online.',
      },
    ],
    siteName: 'EditoraPDF',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
    description: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for safely editing PDF documents online.',
    images: [`${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`],
  },
  alternates: {
    canonical: postUrl,
  },
}

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to edit PDFs online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Editing PDFs online can be safe when used responsibly. Users should understand whether files are processed locally in the browser or uploaded to a server, and should review the privacy policy of the tool they use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do online PDF editors upload files to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some online PDF editors upload files to servers for processing, while others process files locally in the browser. This depends on the tool, so it is important to check the tool\'s documentation and privacy policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the safest way to edit PDFs online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Best practices include avoiding highly sensitive documents, keeping backups of the original file, using a trusted tool, reviewing the privacy policy, and verifying the final PDF before sharing or submitting it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit confidential PDFs online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If a document contains highly sensitive personal or financial information, it is best to avoid editing it online unless you fully trust the service and understand how it handles files during processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does analytics include the contents of my PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Analytics is typically limited to technical and usage information such as page views, device type, or browser type. Document contents should not be included in analytics, but users should verify this in the privacy policy of the service.',
      },
    },
  ],
}

// Breadcrumbs Schema
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
      name: 'Is It Safe to Edit PDFs Online?',
      item: postUrl,
    },
  ],
}

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#blogpost`,
  headline: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
  description: 'A practical guide explaining how online PDF editors handle files, common privacy risks, and best practices for safe PDF editing.',
  image: `${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`,
  author: {
    '@type': 'Organization',
    name: 'EditoraPDF',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
    },
  },
  datePublished: '2026-02-01',
  dateModified: '2026-02-01',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
  inLanguage: 'en',
  keywords: [
    'is it safe to edit pdf online',
    'safe pdf editor',
    'pdf privacy',
    'edit pdf securely',
    'browser pdf editor',
  ],
  articleSection: 'Privacy & Security',
  isAccessibleForFree: true,
}

export default function BlogPost() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumbs */}
        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-surface-300">Is It Safe to Edit PDFs Online?</li>
            </ol>
          </div>
        </nav>

        {/* Hero Image with Title Overlay */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
          <img
            src="/blog2.png"
            alt="Is It Safe to Edit PDFs Online."
            className="w-full h-full object-cover shadow-[inset_0_0_200px_100px_rgba(0,0,0,0.8),0_0_100px_50px_rgba(0,0,0,0.6)]"
            style={{
              boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />
          
          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Is It Safe to Edit PDFs Online?
              </h1>
              <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Privacy, Security, and What You Should Know
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* Article Intro */}
            <div className="mb-8">
              <p className="text-xl text-surface-300 leading-relaxed mb-4">
                Editing PDF files online has become increasingly common. From signing documents to making quick text changes, browser-based PDF editors offer convenience without installing software. But many users understandably ask an important question:
              </p>
              <p className="text-xl text-primary-400 font-semibold mb-4">
                Is it actually safe to edit PDFs online?
              </p>
              <p className="text-lg text-surface-400">
                In this guide, we'll explain how online PDF editors work, what privacy and security risks exist, and how to use these tools responsibly - especially when working with sensitive documents.
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">How Online PDF Editors Work</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Most modern online PDF editors fall into one of two categories:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">Server-based editors</strong> - Files are uploaded to a remote server, processed there, and then returned to the user.</li>
                  <li><strong className="text-white">Browser-based editors</strong> - Files are processed locally in the user's browser using client-side technologies such as JavaScript.</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  The difference matters because it directly affects how your documents are handled during editing.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">What Happens to Your PDF During Editing?</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  When you open a PDF in a browser-based editor, the file is typically:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Loaded into your browser's memory</li>
                  <li>Rendered visually for editing</li>
                  <li>Modified locally as you make changes</li>
                  <li>Saved only when you choose to export or download the edited file</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  In this setup, the document does not need to be stored on a remote server as part of the editing process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Common Privacy Concerns When Editing PDFs Online</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">1. Are my files uploaded to a server?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      This depends on the editor. Some tools require uploading files to their servers, while others process files locally in the browser. Users should always check a service's privacy policy to understand how files are handled.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">2. Can someone access my document?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      With browser-based editors, document processing happens locally during the session. However, users should still avoid editing highly sensitive or confidential documents unless they fully trust the service and understand how it works.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">3. Is personal data collected?</h3>
                    <p className="text-surface-300 leading-relaxed mb-2">
                      Many online tools collect limited technical data, such as:
                    </p>
                    <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                      <li>Browser type</li>
                      <li>Device type</li>
                      <li>Anonymous usage statistics</li>
                    </ul>
                    <p className="text-surface-300 leading-relaxed">
                      This data is generally used to improve performance and reliability, not to access document contents.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Best Practices for Editing PDFs Safely Online</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  To minimize risk when using online PDF editors, follow these practical guidelines:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Review the privacy policy before uploading documents</li>
                  <li>Avoid editing highly sensitive files (e.g., passports, banking records) unless absolutely necessary</li>
                  <li>Keep local backups of original documents</li>
                  <li>Use secure networks, especially when working on public Wi-Fi</li>
                  <li>Export and review the final document before sharing or submitting it</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  These steps apply regardless of which PDF editor you use.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Are Online PDF Editors Safe for Everyday Use?</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  For everyday tasks - such as editing forms, adding annotations, or updating documents - browser-based PDF editors are generally safe when used responsibly.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  They are especially useful for:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Quick edits</li>
                  <li>Non-confidential documents</li>
                  <li>Occasional document adjustments</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  As with any online tool, understanding how it works and what data is involved is key.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">How EditoraPDF Approaches Privacy</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  EditoraPDF is designed to work directly in your browser. Files are processed locally as part of the editing process, and users can edit and export PDFs without creating an account.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Like most websites, EditoraPDF may use limited analytics and technical tools to improve performance, but document contents are not used for analytics or advertising purposes.
                </p>
                <p className="text-surface-300 leading-relaxed">
                  For full details, users should always refer to the official{' '}
                  <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Final Thoughts</h2>
                <p className="text-surface-300 leading-relaxed">
                  Online PDF editors can be a practical and safe option when used correctly. The key is transparency: knowing how a tool processes files, what data is collected, and what limitations exist.
                </p>
                <p className="text-surface-300 leading-relaxed mt-4">
                  If you're editing PDFs online, choose tools that clearly explain their approach to privacy, avoid unnecessary uploads, and give users control over their documents.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Is it safe to edit PDFs online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Editing PDFs online can be safe when used responsibly. Users should understand how a tool processes files, review its privacy policy, and avoid uploading highly sensitive documents unless they fully trust the service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Do online PDF editors upload files to a server?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Some online PDF editors upload files to servers for processing, while others process files locally in the browser. This depends on the tool, so it's important to check the editor's documentation and privacy policy before using it.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What is the safest way to edit PDFs online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      The safest approach is to use trusted tools, keep backups of original files, avoid editing confidential documents when possible, use secure internet connections, and carefully review the final document before sharing or submitting it.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I edit confidential PDFs online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      If a PDF contains sensitive personal or financial information, it's generally best to avoid editing it online unless you clearly understand how the service handles files and are comfortable with its privacy practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Does analytics include the contents of my PDF?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Analytics data is typically limited to technical and usage information such as browser type, device type, or page views. Document contents are not intended to be included in analytics, but users should verify this by reviewing the service's privacy policy.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-surface-700/50">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>

        {/* Footer with Social Links */}
        <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
          <div className="max-w-5xl mx-auto space-y-3">
            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
              <p className="text-xs text-surface-400 leading-relaxed">
                <strong className="text-surface-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our{' '}
                <Link href="/terms" className="text-primary-400 hover:text-primary-300 underline">
                  Terms
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-surface-500">
                © {new Date().getFullYear()} EditoraPDF. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-surface-500">Follow us:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/people/Editorapdf/61587362633003/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.threads.com/@editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Threads"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@EditoraPDF"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Subscribe on YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
