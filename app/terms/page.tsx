import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using EditoraPDF online PDF editor.',
}

export default function TermsPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
              <p className="text-surface-400">Last updated: January 30, 2026</p>
            </div>

            {/* Disclaimer */}
            <div className="not-prose mb-8 p-5 rounded-xl bg-warning-500/10 border border-warning-500/30">
              <p className="text-sm text-surface-300 leading-relaxed">
                <strong className="text-warning-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use.
              </p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EditoraPDF ("the Service"), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              EditoraPDF is a free, browser-based PDF editing tool that allows users to:
            </p>
            <ul>
              <li>View and navigate PDF documents</li>
              <li>Edit text and content in PDFs</li>
              <li>Add, remove, and reorder pages</li>
              <li>Annotate PDFs with highlights, shapes, and notes</li>
              <li>Export edited PDFs</li>
            </ul>
            <p>
              All processing occurs locally in your web browser. We do not upload or store your files on our servers.
            </p>

            <h2>3. Use License</h2>
            <h3>3.1 Permission Granted</h3>
            <p>
              Permission is granted to use EditoraPDF for personal and commercial purposes, subject to the following restrictions:
            </p>
            <ul>
              <li>You may not modify, copy, or distribute the source code of the Service</li>
              <li>You may not attempt to reverse engineer or extract the code</li>
              <li>You may not remove any copyright or proprietary notices</li>
              <li>You may not use the Service for any unlawful purpose</li>
            </ul>

            <h3>3.2 User Responsibilities</h3>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>Ensuring you have the right to edit any PDF files you process</li>
              <li>Backing up your original files before editing</li>
              <li>Complying with all applicable copyright and intellectual property laws</li>
              <li>Using the Service in accordance with these terms</li>
            </ul>

            <h2>4. Privacy and Data</h2>
            <h3>4.1 Client-Side Processing</h3>
            <p>
              EditoraPDF processes all files locally in your browser. Your files are never uploaded to our servers, and we cannot access them.
            </p>

            <h3>4.2 No Warranty for Data</h3>
            <p>
              While we strive for reliability, we cannot guarantee:
            </p>
            <ul>
              <li>That edited PDFs will maintain perfect fidelity to the original</li>
              <li>That all PDF features will be supported</li>
              <li>That processing will not result in data loss</li>
            </ul>
            <p>
              <strong>Always keep a backup of your original files.</strong>
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or reliability of results</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL EDITORAPDF BE LIABLE FOR ANY:
            </p>
            <ul>
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Damages resulting from use or inability to use the Service</li>
              <li>Damages from errors, bugs, or service interruptions</li>
            </ul>

            <h2>7. Service Availability</h2>
            <h3>7.1 No Guarantee of Uptime</h3>
            <p>
              We strive to keep EditoraPDF available 24/7, but we do not guarantee uninterrupted access. The Service may be unavailable due to:
            </p>
            <ul>
              <li>Maintenance and updates</li>
              <li>Technical issues</li>
              <li>Force majeure events</li>
              <li>Third-party service failures</li>
            </ul>

            <h3>7.2 Right to Modify or Discontinue</h3>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Modify, suspend, or discontinue the Service at any time</li>
              <li>Change these terms of service with reasonable notice</li>
              <li>Impose usage limits if necessary</li>
            </ul>

            <h2>8. Acceptable Use</h2>
            <h3>8.1 Prohibited Uses</h3>
            <p>
              You may not use EditoraPDF to:
            </p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Harass, abuse, or harm others</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest personal information without consent</li>
              <li>Interfere with the Service's operation</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>

            <h3>8.2 Enforcement</h3>
            <p>
              We reserve the right to investigate violations and cooperate with law enforcement if illegal activity is suspected.
            </p>

            <h2>9. Intellectual Property</h2>
            <h3>9.1 Our Rights</h3>
            <p>
              All content, features, and functionality of EditoraPDF are owned by us and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3>9.2 Your Rights</h3>
            <p>
              You retain all rights to PDF files you process using the Service. We claim no ownership over your content.
            </p>

            <h2>10. Third-Party Services</h2>
            <p>
              EditoraPDF may integrate with or link to third-party services (analytics, advertising, etc.). These services have their own terms and privacy policies, which we encourage you to review.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless EditoraPDF from any claims, damages, or expenses arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these terms</li>
              <li>Your violation of any rights of another party</li>
            </ul>

            <h2>12. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>

            <h2>13. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or use of the Service should first be addressed through good-faith negotiation. If resolution cannot be reached, disputes may be subject to binding arbitration or court proceedings as permitted by law.
            </p>

            <h2>14. Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h2>15. Entire Agreement</h2>
            <p>
              These terms constitute the entire agreement between you and EditoraPDF regarding the use of the Service, superseding any prior agreements.
            </p>

            <h2>16. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Changes will be posted on this page with an updated "Last modified" date. Continued use after changes constitutes acceptance of the updated terms.
            </p>

            <h2>17. Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
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
                  © 2026 EditoraPDF. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link href="/privacy-policy" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Privacy Policy
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
