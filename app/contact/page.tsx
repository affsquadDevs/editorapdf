import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import {
  Mail, MessageSquare, ExternalLink, HelpCircle, Shield, FileText,
  Facebook, Instagram, Youtube
} from 'lucide-react'

const siteUrl = 'https://editorapdf.com'

export const metadata: Metadata = {
  title: 'Contact Us — EditoraPDF Support',
  description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/en/contact`,
    title: 'Contact Us — EditoraPDF Support',
    description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
    siteName: 'EditoraPDF',
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — Contact Us' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — EditoraPDF Support',
    description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
    images: [`${siteUrl}/og/og-image.png`],
    creator: '@editora_pdf',
    site: '@editora_pdf',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="max-w-3xl w-full">
          <div className="card p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <Mail size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg text-surface-400">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email - Primary Contact */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-primary-500/5 via-surface-800/30 to-primary-500/5 border-2 border-primary-500/30 hover:border-primary-500/50 transition-all animate-fade-in-up delay-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                  <Mail size={24} strokeWidth={1.5} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">Primary Contact Email</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-xs font-semibold">
                      Main
                    </span>
                  </div>
                  <p className="text-surface-400 mb-3">
                    Send us an email and we'll get back to you as soon as possible. This is our primary contact method.
                  </p>
                  <a
                    href="mailto:hello@editorapdf.com"
                    className="text-primary-400 hover:text-primary-300 font-semibold text-lg transition-colors inline-flex items-center gap-2 group"
                  >
                    hello@editorapdf.com
                    <ExternalLink size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-800/30 border border-surface-700/50 hover:border-accent-500/30 transition-all animate-fade-in-up delay-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                  <MessageSquare size={24} strokeWidth={1.5} className="text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Connect With Us</h3>
                  <p className="text-surface-400 mb-4">
                    Follow us on social media for updates, tips, and community discussions.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/people/Editorapdf/61587362633003/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.instagram.com/editora_pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.youtube.com/@EditoraPDF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="YouTube"
                    >
                      <Youtube size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-800/30 border border-surface-700/50 hover:border-success-500/30 transition-all animate-fade-in-up delay-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/10 flex items-center justify-center">
                  <HelpCircle size={24} strokeWidth={1.5} className="text-success-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                  <p className="text-surface-400 mb-4">
                    Check out our documentation and policies for more information.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/privacy-policy" className="text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1 group">
                      <Shield size={14} strokeWidth={2} />
                      Privacy Policy
                    </Link>
                    <span className="text-surface-600">•</span>
                    <Link href="/terms" className="text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1 group">
                      <FileText size={14} strokeWidth={2} />
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
