import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how EditoraPDF protects your privacy. All PDF processing happens locally in your browser.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            {/* Header */}
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-surface-400">Last updated: January 30, 2026</p>
            </div>

            {/* Privacy Notice */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-success-500/10 border border-success-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-success-300 mb-2">Your Privacy is Our Priority</h3>
                  <p className="text-surface-300">
                    EditoraPDF processes all PDFs entirely in your browser. Your files never leave your device and are never uploaded to our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="not-prose mb-8 p-5 rounded-xl bg-warning-500/10 border border-warning-500/30">
              <p className="text-sm text-surface-300 leading-relaxed">
                <strong className="text-warning-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use.
              </p>
            </div>

            <h2>1. Information We Collect</h2>
            <h3>1.1 Personal Information</h3>
            <p>
              We do not collect any personal information from users. EditoraPDF is a client-side application that operates entirely in your web browser.
            </p>

            <h3>1.2 PDF Documents</h3>
            <p>
              <strong>Your PDF files are never uploaded to our servers.</strong> All processing happens locally in your browser using JavaScript. When you open a PDF:
            </p>
            <ul>
              <li>The file is read directly from your device</li>
              <li>All editing operations occur in your browser's memory</li>
              <li>The file is only saved when you explicitly click "Export"</li>
              <li>No data is transmitted to our servers at any time</li>
            </ul>

            <h3>1.3 Analytics</h3>
            <p>
              We may use privacy-friendly analytics tools to understand how visitors use our website. This may include:
            </p>
            <ul>
              <li>Page views and navigation patterns</li>
              <li>Browser type and version</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>General geographic location (country/region level only)</li>
            </ul>
            <p>
              We do not track individual users or collect personally identifiable information through analytics.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              Since we don't collect personal information or upload your files, there is minimal data usage:
            </p>
            <ul>
              <li><strong>Analytics data</strong> is used solely to improve our service and user experience</li>
              <li><strong>Error reports</strong> may be collected automatically to fix bugs, but do not contain your file contents</li>
              <li><strong>Performance metrics</strong> help us optimize the application</li>
            </ul>

            <h2>3. Data Storage and Security</h2>
            <h3>3.1 Local Storage</h3>
            <p>
              EditoraPDF may use your browser's local storage to:
            </p>
            <ul>
              <li>Save user preferences (zoom level, default settings)</li>
              <li>Cache application resources for faster loading</li>
              <li>Enable offline functionality</li>
            </ul>
            <p>
              This data stays on your device and can be cleared at any time through your browser settings.
            </p>

            <h3>3.2 Security</h3>
            <p>
              Because your files never leave your device:
            </p>
            <ul>
              <li>There is no risk of server-side data breaches</li>
              <li>Your documents cannot be intercepted during upload</li>
              <li>We cannot access your files, even if we wanted to</li>
            </ul>

            <h2>4. Third-Party Services</h2>
            <p>
              We may use third-party services for:
            </p>
            <ul>
              <li><strong>Hosting:</strong> Our website is hosted on secure servers, but your files are not stored there</li>
              <li><strong>Analytics:</strong> We may use privacy-focused analytics services that don't track individuals</li>
              <li><strong>Advertising:</strong> We may display contextual ads that don't track your browsing</li>
            </ul>
            <p>
              These services have their own privacy policies, which we encourage you to review.
            </p>

            <h2>5. Cookies</h2>
            <p>
              We use minimal cookies for:
            </p>
            <ul>
              <li>Remembering your preferences (optional)</li>
              <li>Analytics (if enabled)</li>
              <li>Advertising preferences (if applicable)</li>
            </ul>
            <p>
              You can disable cookies in your browser settings. Our PDF editor will continue to work without cookies.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Since we don't collect personal data, there is no data to request, modify, or delete. However, you can:
            </p>
            <ul>
              <li>Clear your browser's local storage to remove any saved preferences</li>
              <li>Disable analytics by using browser extensions or ad blockers</li>
              <li>Use the service without creating an account (no account system exists)</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service does not knowingly collect information from children under 13. Since no data is collected or stored on our servers, children can safely use EditoraPDF under parental guidance.
            </p>

            <h2>8. International Users</h2>
            <p>
              EditoraPDF can be used from anywhere in the world. Since all processing happens locally in your browser, there are no cross-border data transfers or regional restrictions.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last modified" date. Continued use of EditoraPDF after changes constitutes acceptance of the updated policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us:
            </p>
            <ul className="not-prose">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                  hello@affsquad.com
                </a>
              </li>
              <li>
                <strong>Contact Page:</strong>{' '}
                <Link href="/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                  editorapdf.com/contact
                </Link>
              </li>
            </ul>

            <div className="not-prose mt-12 pt-8 border-t border-surface-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-surface-500">
                  © 2026 EditoraPDF. Your privacy matters.
                </p>
                <div className="flex gap-4">
                  <Link href="/terms" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
