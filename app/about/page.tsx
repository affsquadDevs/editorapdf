import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'About Us - Free PDF Editor',
  description: 'Learn about EditoraPDF - a free, privacy-focused online PDF editor. Our mission is to make PDF editing accessible to everyone.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About EditoraPDF
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl mx-auto">
              Making PDF editing simple, accessible, and completely free for everyone.
            </p>
          </div>

          {/* Mission */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-surface-400 leading-relaxed mb-4">
              EditoraPDF was created with a simple goal: to provide a powerful, free PDF editor that anyone can use without installing software, creating accounts, or compromising their privacy.
            </p>
            <p className="text-surface-400 leading-relaxed">
              We believe that everyone should have access to professional-grade PDF editing tools without barriers. That's why EditoraPDF is completely free, works entirely in your browser, and never uploads your files to our servers.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: 'Privacy First',
                description: 'All processing happens on your device. We never see, store, or transmit your documents.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'Instant Access',
                description: 'No installation, no signup, no waiting. Start editing PDFs in seconds.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '100% Free',
                description: 'All features available to everyone. No hidden fees, no premium tiers.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
                title: 'Powerful Tools',
                description: 'Professional features including text editing, annotations, and more.',
              },
            ].map((value) => (
              <div key={value.title} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-800/50 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-surface-400">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technology */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Built with Modern Technology</h2>
            <p className="text-surface-400 leading-relaxed mb-4">
              EditoraPDF is powered by cutting-edge web technologies that enable complex PDF processing entirely in your browser. We use PDF.js for rendering and pdf-lib for editing, ensuring compatibility and reliability.
            </p>
            <p className="text-surface-400 leading-relaxed">
              Our application is built with Next.js and React, providing a fast, responsive experience on any device. All code runs client-side, meaning your documents are processed locally with zero server involvement.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Questions or Feedback?</h2>
            <p className="text-surface-400 mb-6">
              We'd love to hear from you. Get in touch with our team.
            </p>
            <Link href="/contact" className="btn-primary btn-lg inline-flex">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
