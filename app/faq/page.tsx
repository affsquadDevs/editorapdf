import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { generateFAQSchema } from '../data/faq'
import FAQ from '../components/FAQ'
import Header from '../components/Header'

const siteUrl = 'https://editorapdf.com'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - EditoraPDF',
  description: 'Find answers to common questions about EditoraPDF - a free, open-source PDF editor. Learn about features, privacy, security, and how to use our online PDF editing tool.',
  keywords: [
    'FAQ',
    'frequently asked questions',
    'pdf editor questions',
    'open source pdf editor FAQ',
    'free pdf editor help',
    'pdf editor support',
  ],
  openGraph: {
    title: 'Frequently Asked Questions - EditoraPDF',
    description: 'Find answers to common questions about EditoraPDF - a free, open-source PDF editor.',
    url: `${siteUrl}/faq`,
  },
}

export default function FAQPage() {
  // FAQ Schema for SEO
  const faqSchema = generateFAQSchema(siteUrl)

  return (
    <>
      {/* FAQ Schema for SEO */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 p-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-surface-400 max-w-2xl mx-auto">
                Find answers to common questions about EditoraPDF. Can't find what you're looking for?{' '}
                <Link href="/contact" className="text-primary-400 hover:text-primary-300 underline">
                  Contact us
                </Link>
                .
              </p>
            </div>

            {/* FAQ Component */}
            <FAQ />

            {/* Additional Help */}
            <div className="mt-12 card p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-surface-400 mb-6">
                We're here to help! Get in touch with our team or check out our documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary btn-md inline-flex">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Contact Us
                </Link>
                <a
                  href="https://github.com/affsquadDevs/editorapdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-md inline-flex"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
