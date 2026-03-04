import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import {
  FileText, AlertTriangle, Shield, AlertCircle, Info, Mail, ExternalLink,
  Zap, Users, Ban, Gavel
} from 'lucide-react'

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
                <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
              <p className="text-surface-400">Last updated: January 30, 2026</p>
            </div>

            {/* Important Notice */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-warning-500/10 border-2 border-warning-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-warning-300 mb-2">Important: Risk Warning</h3>
                  <p className="text-sm text-surface-300 leading-relaxed mb-2">
                    <strong>EditoraPDF is provided "AS IS" without any warranties.</strong> While we strive to provide a reliable service, 
                    you acknowledge and agree that:
                  </p>
                  <ul className="text-sm text-surface-300 space-y-1.5 ml-4 list-disc">
                    <li>Your use of the Service is at your own risk</li>
                    <li>We do not guarantee the accuracy, completeness, or suitability of edited PDFs</li>
                    <li>Data loss or corruption may occur during editing</li>
                    <li>Complex PDFs may not render or edit perfectly</li>
                    <li>Always keep backups of your original files</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Free Service Notice */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-info-500/10 border border-info-500/30">
              <div className="flex items-start gap-4">
                <Info size={24} strokeWidth={2} className="text-info-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-info-300 mb-2">Free Service with Advertising</h3>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    EditoraPDF is a <strong className="text-white">completely free service</strong> provided to users at no cost. 
                    To support the operation and maintenance of this free service, our website may display:
                  </p>
                  <ul className="text-sm text-surface-300 space-y-1.5 ml-4 list-disc mt-2">
                    <li><strong>Third-party advertisements</strong> (including Google AdSense and other advertising networks)</li>
                    <li><strong>Partner promotions</strong> and sponsored content</li>
                    <li><strong>Affiliate links</strong> to related products or services</li>
                  </ul>
                  <p className="text-sm text-surface-300 leading-relaxed mt-2">
                    By using EditoraPDF, you acknowledge and consent to the display of advertisements and promotional content. 
                    These advertisements help us keep the service free for all users. We do not endorse or guarantee the products or services 
                    advertised by third parties.
                  </p>
                </div>
              </div>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EditoraPDF ("the Service"), you accept and agree to be bound by the terms and conditions of this agreement. 
              If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. How to Use EditoraPDF</h2>
            <h3>2.1 Basic Usage Rules</h3>
            <p>
              To use EditoraPDF effectively and safely, please follow these guidelines:
            </p>
            <ul>
              <li><strong>Upload Your PDF:</strong> Click "Edit PDF" or drag and drop your PDF file into the editor</li>
              <li><strong>Edit Your Document:</strong> Use the available tools to edit text, add images, annotate, or manage pages</li>
              <li><strong>Review Changes:</strong> Always review your edited PDF before exporting to ensure accuracy</li>
              <li><strong>Export Your PDF:</strong> Click "Export" to download your edited PDF file</li>
              <li><strong>Keep Backups:</strong> Always maintain a backup of your original files before editing</li>
            </ul>

            <h3>2.2 Supported File Types and Limits</h3>
            <ul>
              <li>File format: PDF files only</li>
              <li>Maximum file size: 25MB per file</li>
              <li>Recommended: PDFs with fewer than 50 pages for optimal performance</li>
              <li>Not supported: Password-protected or encrypted PDFs</li>
            </ul>

            <h3>2.3 Browser Requirements</h3>
            <p>
              EditoraPDF works best in modern browsers:
            </p>
            <ul>
              <li>Google Chrome (latest version)</li>
              <li>Mozilla Firefox (latest version)</li>
              <li>Microsoft Edge (latest version)</li>
              <li>Safari (latest version)</li>
            </ul>
            <p>
              JavaScript must be enabled for the Service to function properly.
            </p>

            <h2>3. Description of Service</h2>
            <p>
              EditoraPDF is a free, browser-based PDF editing tool that allows users to:
            </p>
            <ul>
              <li>View and navigate PDF documents</li>
              <li>Edit text and content in PDFs</li>
              <li>Add, remove, and reorder pages</li>
              <li>Rotate and delete pages</li>
              <li>Annotate PDFs with highlights, shapes, and notes</li>
              <li>Add images and drawings</li>
              <li>Export edited PDFs</li>
            </ul>
            <p>
              All processing occurs locally in your web browser. We do not upload or store your files on our servers.
            </p>

            <h2>4. Free Service and Monetization</h2>
            <h3>4.1 Free Access</h3>
            <p>
              EditoraPDF is provided free of charge to all users. You may use the Service without payment, registration, or account creation.
            </p>

            <h3>4.2 Advertising and Partner Promotions</h3>
            <p>
              To support the free operation of EditoraPDF, our website displays:
            </p>
            <ul>
              <li><strong>Third-Party Advertisements:</strong> We use advertising networks (such as Google AdSense) to display relevant advertisements</li>
              <li><strong>Partner Promotions:</strong> We may feature promotional content from partners and affiliates</li>
              <li><strong>Sponsored Content:</strong> Some content may be sponsored by third parties</li>
            </ul>
            <p>
              <strong>You acknowledge that:</strong>
            </p>
            <ul>
              <li>Advertisements are displayed as part of the free service</li>
              <li>We do not control the content of third-party advertisements</li>
              <li>Clicking on advertisements may redirect you to third-party websites</li>
              <li>We are not responsible for the content, products, or services offered by advertisers</li>
              <li>You may use ad-blocking software, but this may affect website functionality</li>
            </ul>

            <h3>4.3 No Payment Required</h3>
            <p>
              EditoraPDF will always remain free to use. We will never charge you for basic PDF editing features. 
              If we introduce premium features in the future, they will be clearly marked and optional.
            </p>

            <h2>5. Use License</h2>
            <h3>5.1 Permission Granted</h3>
            <p>
              Permission is granted to use EditoraPDF for personal and commercial purposes, subject to the following restrictions:
            </p>
            <ul>
              <li>You may not modify, copy, or distribute the source code of the Service</li>
              <li>You may not attempt to reverse engineer or extract the code</li>
              <li>You may not remove any copyright or proprietary notices</li>
              <li>You may not use the Service for any unlawful purpose</li>
              <li>You may not block or interfere with advertisements displayed on the website</li>
            </ul>

            <h3>5.2 User Responsibilities</h3>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>Ensuring you have the right to edit any PDF files you process</li>
              <li>Backing up your original files before editing</li>
              <li>Complying with all applicable copyright and intellectual property laws</li>
              <li>Using the Service in accordance with these terms</li>
              <li>Verifying the accuracy of edited PDFs before use</li>
            </ul>

            <h2>6. Privacy and Data</h2>
            <h3>6.1 Client-Side Processing</h3>
            <p>
              EditoraPDF processes all files locally in your browser. Your files are never uploaded to our servers, and we cannot access them.
            </p>

            <h3>6.2 No Warranty for Data</h3>
            <p>
              While we strive for reliability, we cannot guarantee:
            </p>
            <ul>
              <li>That edited PDFs will maintain perfect fidelity to the original</li>
              <li>That all PDF features will be supported</li>
              <li>That processing will not result in data loss</li>
              <li>That complex PDFs will render correctly</li>
            </ul>
            <p>
              <strong>Always keep a backup of your original files.</strong>
            </p>

            <h2>7. Risk Warning and Disclaimer</h2>
            <h3>7.1 Use at Your Own Risk</h3>
            <p>
              <strong>YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF EDITORAPDF IS AT YOUR SOLE RISK.</strong> The Service is provided 
              on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
            </p>

            <h3>7.2 Potential Risks</h3>
            <p>
              By using EditoraPDF, you acknowledge the following risks:
            </p>
            <ul>
              <li><strong>Data Loss:</strong> Editing may result in data loss or corruption</li>
              <li><strong>Formatting Issues:</strong> Complex PDFs may not render or edit perfectly</li>
              <li><strong>Compatibility:</strong> Edited PDFs may not be compatible with all PDF readers</li>
              <li><strong>Browser Limitations:</strong> Browser crashes or errors may cause data loss</li>
              <li><strong>Service Interruptions:</strong> The Service may be temporarily unavailable</li>
            </ul>

            <h3>7.3 Disclaimer of Warranties</h3>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or reliability of results</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL EDITORAPDF BE LIABLE FOR ANY:
            </p>
            <ul>
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Damages resulting from use or inability to use the Service</li>
              <li>Damages from errors, bugs, or service interruptions</li>
              <li>Damages from third-party advertisements or links</li>
              <li>Loss or corruption of PDF files</li>
            </ul>
            <p>
              Our total liability, if any, shall not exceed the amount you paid to use the Service (which is $0, as the Service is free).
            </p>

            <h2>9. Service Availability</h2>
            <h3>9.1 No Guarantee of Uptime</h3>
            <p>
              We strive to keep EditoraPDF available 24/7, but we do not guarantee uninterrupted access. The Service may be unavailable due to:
            </p>
            <ul>
              <li>Maintenance and updates</li>
              <li>Technical issues</li>
              <li>Force majeure events</li>
              <li>Third-party service failures</li>
              <li>Network issues</li>
            </ul>

            <h3>9.2 Right to Modify or Discontinue</h3>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Modify, suspend, or discontinue the Service at any time</li>
              <li>Change these terms of service with reasonable notice</li>
              <li>Impose usage limits if necessary</li>
              <li>Modify or remove features</li>
              <li>Change advertising partners or monetization methods</li>
            </ul>

            <h2>10. Acceptable Use</h2>
            <h3>10.1 Prohibited Uses</h3>
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
              <li>Block or interfere with advertisements</li>
              <li>Use automated tools to access the Service excessively</li>
            </ul>

            <h3>10.2 Enforcement</h3>
            <p>
              We reserve the right to investigate violations and cooperate with law enforcement if illegal activity is suspected. 
              We may suspend or terminate access to the Service for violations of these terms.
            </p>

            <h2>11. Intellectual Property</h2>
            <h3>11.1 Our Rights</h3>
            <p>
              All content, features, and functionality of EditoraPDF are owned by us and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3>11.2 Your Rights</h3>
            <p>
              You retain all rights to PDF files you process using the Service. We claim no ownership over your content.
            </p>

            <h2>12. Third-Party Services and Advertisements</h2>
            <h3>12.1 Third-Party Services</h3>
            <p>
              EditoraPDF may integrate with or link to third-party services (analytics, advertising, etc.). These services have their own terms 
              and privacy policies, which we encourage you to review.
            </p>

            <h3>12.2 Third-Party Advertisements</h3>
            <p>
              Our website displays advertisements from third-party advertising networks (such as Google AdSense). These advertisements:
            </p>
            <ul>
              <li>Are provided by third parties, not by EditoraPDF</li>
              <li>May use cookies and tracking technologies</li>
              <li>May link to external websites</li>
              <li>Are subject to the advertiser's privacy policies</li>
            </ul>
            <p>
              We are not responsible for the content, products, or services offered by advertisers. Your interactions with advertisements 
              are solely between you and the advertiser.
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless EditoraPDF from any claims, damages, or expenses arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your interaction with third-party advertisements</li>
            </ul>

            <h2>14. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>

            <h2>15. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or use of the Service should first be addressed through good-faith negotiation. 
              If resolution cannot be reached, disputes may be subject to binding arbitration or court proceedings as permitted by law.
            </p>

            <h2>16. Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h2>17. Entire Agreement</h2>
            <p>
              These terms constitute the entire agreement between you and EditoraPDF regarding the use of the Service, superseding any prior agreements.
            </p>

            <h2>18. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Changes will be posted on this page with an updated "Last modified" date. 
              Continued use after changes constitutes acceptance of the updated terms. We encourage you to review these terms periodically.
            </p>

            <h2>19. Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
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
