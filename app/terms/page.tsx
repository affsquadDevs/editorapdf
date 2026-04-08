import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import { FileText, AlertTriangle, Info, Mail, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service — EditoraPDF',
  description: 'Terms and conditions for using EditoraPDF online PDF editor.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
              <p className="text-surface-400">Last updated: January 30, 2026</p>
            </div>

            <div className="not-prose mb-8 p-6 rounded-xl bg-warning-500/10 border-2 border-warning-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-warning-300 mb-2">Disclaimer: Risk Warning</h3>
                  <p className="text-sm text-surface-300 leading-relaxed mb-2">
                    <strong>EditoraPDF is provided &quot;AS IS&quot;, without any warranties.</strong> By using the service, you agree that:
                  </p>
                  <ul className="text-sm text-surface-300 space-y-1.5 ml-4 list-disc">
                    <li>you use the service at your own risk;</li>
                    <li>we make no guarantees about the accuracy of PDF editing results;</li>
                    <li>data loss or corruption may occur during processing;</li>
                    <li>complex PDFs may render or edit incorrectly;</li>
                    <li>you should keep backups of original files.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="not-prose mb-8 p-6 rounded-xl bg-info-500/10 border border-info-500/30">
              <div className="flex items-start gap-4">
                <Info size={24} strokeWidth={2} className="text-info-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-info-300 mb-2">Free Service with Advertising</h3>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    EditoraPDF is a <strong className="text-white">completely free service</strong>. To support the site, third-party advertisements, partner offers, and affiliate links may be displayed.
                  </p>
                </div>
              </div>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By using EditoraPDF, you confirm your agreement to these terms. If you do not agree, please do not use the service.
            </p>

            <h2>2. Service Description</h2>
            <p>
              EditoraPDF is a browser-based PDF tool that allows you to view, edit, convert, merge, split, and export PDF files.
            </p>
            <p>
              Most processing is performed locally in your browser. You are responsible for verifying results before using documents.
            </p>

            <h2>3. Usage Rules</h2>
            <ul>
              <li>Only use files you have legal rights to process.</li>
              <li>Always keep backups of originals.</li>
              <li>Verify the document after editing before sending or publishing.</li>
              <li>Do not use the service for unlawful purposes.</li>
            </ul>

            <h2>4. Limitations and Compatibility</h2>
            <ul>
              <li>PDF files are supported; encrypted/password-protected documents may not be supported.</li>
              <li>Large or complex documents may perform more slowly.</li>
              <li>A modern browser with JavaScript enabled is required for correct operation.</li>
            </ul>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The service is provided without express or implied warranties, including those regarding uninterrupted operation, absence of errors, merchantability, or fitness for a particular purpose.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, EditoraPDF is not liable for direct or indirect damages, data loss, loss of profits, or other consequences related to the use or inability to use the service.
            </p>

            <h2>7. Advertising and Third-Party Services</h2>
            <p>
              The site may use third-party advertising/analytics services. We are not responsible for the content or policies of third-party sites linked through advertising or other links.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The EditoraPDF platform rights belong to its owners. You retain rights to your own files and content that you process through the service.
            </p>

            <h2>9. Changes to Service and Terms</h2>
            <p>
              We may update the functionality of the service and change these terms. The current version is always published on this page.
            </p>

            <h2>10. Contact</h2>
            <p>
              If you have questions about these terms, please contact us:
            </p>
            <div className="not-prose bg-surface-800/30 p-6 rounded-xl border border-surface-700/50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={20} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="mailto:hello@editorapdf.com" className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                      hello@editorapdf.com
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                    <span className="text-primary-400">•</span>
                  </div>
                  <div>
                    <strong className="text-white">Contact page:</strong>{' '}
                    <Link href="/en/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                      editorapdf.com/contact
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            <div className="not-prose mt-12 pt-8 border-t border-surface-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-surface-500">
                  © 2026 EditoraPDF. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link href="/en/privacy-policy" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/en/contact" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
