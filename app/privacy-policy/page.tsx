import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import { Shield, Mail, ExternalLink, AlertCircle } from 'lucide-react'

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
                <Shield size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-surface-400">Last updated: January 30, 2026</p>
            </div>

            {/* Privacy Notice */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-success-500/10 border border-success-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                  <Shield size={20} strokeWidth={2} className="text-success-400" />
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
              <div className="flex items-start gap-3">
                <AlertCircle size={20} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-surface-300 leading-relaxed">
                  <strong className="text-warning-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use.
                </p>
              </div>
            </div>

            <h2>1. Information We Collect</h2>
            <h3>1.1 Personal Information</h3>
            <p>
              We do not collect any personal information from users. EditoraPDF is a client-side application that operates entirely in your web browser. We do not require registration, account creation, or any form of personal identification.
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
              <li>We cannot access, view, or store your PDF files</li>
            </ul>

            <h3>1.3 Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain technical information that does not personally identify you:
            </p>
            <ul>
              <li><strong>Browser Information:</strong> Browser type, version, and language settings</li>
              <li><strong>Device Information:</strong> Device type (desktop, mobile, tablet), operating system, and screen resolution</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths</li>
              <li><strong>IP Address:</strong> Collected for security and analytics purposes, but anonymized and aggregated</li>
              <li><strong>Referrer Information:</strong> The website that referred you to EditoraPDF</li>
            </ul>
            <p>
              This information is used solely to improve our service, analyze trends, and ensure security. It cannot be used to identify individual users.
            </p>

            <h3>1.4 Cookies and Similar Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., session management)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (see Section 4 for details)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              We use the limited information we collect for the following purposes:
            </p>
            <ul>
              <li><strong>Service Improvement:</strong> Analytics data helps us understand user behavior and improve our PDF editing tools</li>
              <li><strong>Security:</strong> IP addresses and technical data help us detect and prevent fraud, abuse, and security threats</li>
              <li><strong>Performance Optimization:</strong> Usage data helps us optimize website speed and responsiveness</li>
              <li><strong>Content Personalization:</strong> Cookies may be used to remember your preferences and settings</li>
              <li><strong>Advertising:</strong> To display relevant advertisements and measure ad effectiveness (see Section 4)</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with third parties except as described in this policy.
            </p>

            <h2>3. Third-Party Services and Advertising</h2>
            <h3>3.1 Google AdSense</h3>
            <p>
              Our website uses Google AdSense, a service provided by Google LLC ("Google") to display advertisements. Google AdSense uses cookies and similar technologies to:
            </p>
            <ul>
              <li>Display personalized advertisements based on your browsing history</li>
              <li>Measure ad performance and effectiveness</li>
              <li>Prevent fraud and ensure ad quality</li>
              <li>Limit the number of times you see the same ad</li>
            </ul>
            <p>
              Google may use your IP address and other information to serve relevant ads. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google's Ad Settings
              </a>
              {' '}or by using the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
            <p>
              For more information about how Google uses data, please visit{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google's Privacy Policy
              </a>
              {' '}and{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google's Advertising Privacy Policy
              </a>.
            </p>

            <h3>3.2 Google Analytics</h3>
            <p>
              We may use Google Analytics to analyze website traffic and user behavior. Google Analytics collects information such as:
            </p>
            <ul>
              <li>How often users visit our website</li>
              <li>Which pages they visit</li>
              <li>How long they stay on each page</li>
              <li>What other websites they visited before coming to ours</li>
            </ul>
            <p>
              Google Analytics uses cookies and may collect your IP address. This data is processed by Google according to their privacy policy. You can opt out using the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <h3>3.3 Other Third-Party Services</h3>
            <p>
              We may use additional third-party services for:
            </p>
            <ul>
              <li><strong>Hosting:</strong> Our website is hosted on secure servers, but your PDF files are not stored there</li>
              <li><strong>Content Delivery:</strong> To deliver website content quickly and efficiently</li>
              <li><strong>Security:</strong> To protect against malicious attacks and ensure website security</li>
            </ul>
            <p>
              These services have their own privacy policies, which we encourage you to review. We are not responsible for the privacy practices of third-party services.
            </p>

            <h2>4. Data Storage and Security</h2>
            <h3>4.1 Local Storage</h3>
            <p>
              EditoraPDF may use your browser's local storage and session storage to:
            </p>
            <ul>
              <li>Save user preferences (zoom level, default settings, theme preferences)</li>
              <li>Cache application resources for faster loading</li>
              <li>Enable offline functionality</li>
              <li>Store temporary editing state (only while you're actively editing)</li>
            </ul>
            <p>
              This data stays on your device and can be cleared at any time through your browser settings. Clearing your browser data will remove all saved preferences.
            </p>

            <h3>4.2 Server-Side Storage</h3>
            <p>
              We do not store your PDF files on our servers. However, we may store:
            </p>
            <ul>
              <li>Aggregated analytics data (anonymized and cannot identify individuals)</li>
              <li>Error logs (do not contain file contents or personal information)</li>
              <li>Security logs (IP addresses for fraud prevention)</li>
            </ul>

            <h3>4.3 Security Measures</h3>
            <p>
              Because your files never leave your device:
            </p>
            <ul>
              <li>There is no risk of server-side data breaches affecting your PDFs</li>
              <li>Your documents cannot be intercepted during upload (because there are no uploads)</li>
              <li>We cannot access your files, even if we wanted to</li>
              <li>Your data is protected by your browser's security features</li>
            </ul>
            <p>
              We implement industry-standard security measures to protect our website and any data we do collect, including encryption, secure connections (HTTPS), and regular security audits.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain data for the following periods:
            </p>
            <ul>
              <li><strong>Analytics Data:</strong> Retained in aggregated, anonymized form for up to 26 months</li>
              <li><strong>Error Logs:</strong> Retained for up to 90 days for debugging purposes</li>
              <li><strong>Security Logs:</strong> Retained for up to 12 months for fraud prevention</li>
              <li><strong>Local Storage:</strong> Stored on your device until you clear your browser data</li>
            </ul>
            <p>
              Since we don't collect personal information or store your PDF files, there is no personal data to delete from our servers.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <h3>6.1 Your Privacy Rights</h3>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> Request information about what data we collect</li>
              <li><strong>Right to Deletion:</strong> Request deletion of your data (limited, as we collect minimal data)</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of certain data collection practices</li>
              <li><strong>Right to Non-Discrimination:</strong> Exercise your privacy rights without discrimination</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{' '}
              <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300">
                hello@affsquad.com
              </a>.
            </p>

            <h3>6.2 Cookie Preferences</h3>
            <p>
              You can control cookies through your browser settings:
            </p>
            <ul>
              <li>Block or delete cookies</li>
              <li>Set preferences for specific websites</li>
              <li>Use browser extensions to manage cookies</li>
            </ul>
            <p>
              Note: Disabling certain cookies may affect website functionality. Our PDF editor will continue to work, but some features may be limited.
            </p>

            <h3>6.3 Advertising Preferences</h3>
            <p>
              You can opt out of personalized advertising:
            </p>
            <ul>
              <li>Visit{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                  Google's Ad Settings
                </a>
                {' '}to control personalized ads
              </li>
              <li>Use the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                  Google Analytics Opt-out
                </a>
                {' '}browser add-on
              </li>
              <li>Visit{' '}
                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                  NAI Opt-Out Page
                </a>
                {' '}or{' '}
                <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                  Your Online Choices
                </a>
                {' '}for additional opt-out options
              </li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. Since no personal data is collected or stored on our servers, children can safely use EditoraPDF under parental guidance.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at{' '}
              <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300">
                hello@affsquad.com
              </a>
              {' '}and we will take steps to remove such information.
            </p>

            <h2>8. International Users and Data Transfers</h2>
            <p>
              EditoraPDF can be used from anywhere in the world. Since all PDF processing happens locally in your browser, there are no cross-border data transfers of your files. However, analytics and advertising data may be processed by third-party services (such as Google) in various countries.
            </p>
            <p>
              If you are located in the European Economic Area (EEA), United Kingdom, or other regions with data protection laws, please note that:
            </p>
            <ul>
              <li>Your PDF files are processed entirely on your device and never transferred</li>
              <li>Any analytics data collected is anonymized and aggregated</li>
              <li>Third-party services (like Google) may transfer data outside your region in accordance with their privacy policies</li>
            </ul>

            <h2>9. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul>
              <li><strong>Right to Know:</strong> Request information about what personal information we collect, use, and disclose</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Exercise your rights without discrimination</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{' '}
              <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300">
                hello@affsquad.com
              </a>
              {' '}with "California Privacy Rights" in the subject line.
            </p>

            <h2>10. European Privacy Rights (GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA) or United Kingdom, you have rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{' '}
              <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300">
                hello@affsquad.com
              </a>.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul>
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last updated" date at the top of this page</li>
              <li>In some cases, displaying a notice on our website</li>
            </ul>
            <p>
              Your continued use of EditoraPDF after changes are posted constitutes acceptance of the updated policy. We encourage you to review this policy periodically.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
            </p>
            <div className="not-prose bg-surface-800/30 p-6 rounded-xl border border-surface-700/50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={20} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                      hello@affsquad.com
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                    <span className="text-primary-400">•</span>
                  </div>
                  <div>
                    <strong className="text-white">Contact Page:</strong>{' '}
                    <Link href="/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                      editorapdf.com/contact
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <p className="mt-4">
              We aim to respond to all privacy-related inquiries within 30 days.
            </p>

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
