import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../components/Header'
import {
  Shield, Server, Wifi, Eye, Lock, CheckCircle2, ArrowRight,
  FileText, Cpu, Globe, AlertCircle, ExternalLink, HardDrive,
  XCircle, Zap, MonitorSmartphone, MemoryStick, AlertTriangle, CheckCheck
} from 'lucide-react'

const siteUrl = 'https://editorapdf.com'
const pageUrl = `${siteUrl}/your-files-stay-private`

export const metadata: Metadata = {
  title: 'Your Files Never Leave Your Browser — 100% Local PDF Processing | EditoraPDF',
  description:
    'Learn exactly what happens to your PDF files when you use EditoraPDF. All processing runs locally in your browser — no server uploads, no data collection, no exposure.',
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Your Files Never Leave Your Browser | EditoraPDF',
    description:
      'All PDF processing happens entirely in your browser using JavaScript. Your files never reach any server. Verified by design, not just by policy.',
    siteName: 'EditoraPDF',
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — Files Stay Private' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Files Never Leave Your Browser | EditoraPDF',
    description: 'All PDF processing happens locally. Zero server uploads.',
    images: [`${siteUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: pageUrl,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does EditoraPDF upload my PDF to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. EditoraPDF runs entirely in your browser using JavaScript and WebAssembly. Your PDF file is loaded into your device\'s memory, processed by pdf-lib and PDF.js, and then downloaded back to your device. No bytes of your document are sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I verify that my file is not uploaded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can open your browser\'s Developer Tools (F12), go to the Network tab, select a PDF file in EditoraPDF, and perform an action. You will see no outgoing requests containing your file content — only static asset loads.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to use EditoraPDF for confidential contracts or legal documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Because all processing is client-side, your document content never leaves your device. This makes EditoraPDF suitable for confidential contracts, legal documents, and other sensitive PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What data does EditoraPDF collect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EditoraPDF collects only standard anonymous analytics such as page views and tool usage counts — no file contents, no file names, no personal data. See our Privacy Policy for details.',
      },
    },
  ],
}

export default function YourFilesStayPrivatePage() {
  return (
    <>
      <Script
        id="jsonld-faq-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <div className="flex-1 p-6 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success-500/15 border border-success-500/30 text-success-300 text-sm font-semibold mb-6">
                <Shield size={16} strokeWidth={2} className="text-success-400" />
                Privacy by Design
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Your Files{' '}
                <span className="text-gradient-animated">Never Leave</span>
                <br />Your Browser
              </h1>
              <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
                Every PDF tool on this site runs entirely inside your browser tab. Your documents are
                processed by JavaScript on your own device — no server ever receives them.
              </p>
            </div>

            {/* Visual flow diagram */}
            <section className="mb-16 animate-fade-in-up" aria-labelledby="flow-heading">
              <div className="card p-8 md:p-10 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-success-500/20">
                <h2 id="flow-heading" className="text-xl font-bold text-white text-center mb-10">
                  What Actually Happens When You Edit a PDF
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">

                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center mb-3 text-primary-400">
                      <HardDrive size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">Your Device</p>
                    <p className="text-xs text-surface-500">PDF file stays here</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={20} className="text-success-400 rotate-90 md:rotate-0" strokeWidth={2} />
                    <span className="text-[10px] text-success-400 font-medium hidden md:block">reads file</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-accent-500/15 flex items-center justify-center mb-3 text-accent-400">
                      <MonitorSmartphone size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">Browser Tab</p>
                    <p className="text-xs text-surface-500">All processing here</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={20} className="text-success-400 rotate-90 md:rotate-0" strokeWidth={2} />
                    <span className="text-[10px] text-success-400 font-medium hidden md:block">downloads result</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-success-500/15 flex items-center justify-center mb-3 text-success-400">
                      <HardDrive size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">Your Device</p>
                    <p className="text-xs text-surface-500">Edited PDF saved here</p>
                  </div>

                  {/* Barrier */}
                  <div className="hidden md:flex flex-col items-center mx-4">
                    <div className="w-px h-16 bg-surface-700" />
                  </div>

                  {/* Server (crossed out) */}
                  <div className="flex flex-col items-center text-center max-w-[160px] opacity-40">
                    <div className="relative w-16 h-16 rounded-2xl bg-error-500/10 flex items-center justify-center mb-3">
                      <Server size={28} strokeWidth={1.5} className="text-error-400" />
                      <XCircle size={22} strokeWidth={2.5} className="text-error-400 absolute -top-2 -right-2 bg-surface-900 rounded-full" />
                    </div>
                    <p className="text-sm font-semibold text-error-300 mb-1">Any Server</p>
                    <p className="text-xs text-surface-500">Never involved</p>
                  </div>
                </div>

                <p className="text-center text-xs text-surface-500 mt-8">
                  The barrier between your browser and any server is physical — your file bytes never cross it.
                </p>
              </div>
            </section>

            {/* Technical explanation */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }} aria-labelledby="tech-heading">
              <h2 id="tech-heading" className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                The Technical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Cpu size={24} strokeWidth={1.5} className="text-primary-400" />,
                    iconBg: 'bg-primary-500/15',
                    title: 'PDF.js for Rendering',
                    body: 'Mozilla\'s open-source PDF.js library renders your document inside a <canvas> element. It reads the file from your device\'s memory — no network request is ever made for the PDF content itself.',
                  },
                  {
                    icon: <FileText size={24} strokeWidth={1.5} className="text-accent-400" />,
                    iconBg: 'bg-accent-500/15',
                    title: 'pdf-lib for Editing',
                    body: 'The pdf-lib library handles all modifications — merging, splitting, rotating, signing, watermarking, and more. It operates entirely on in-memory byte arrays in your browser, outputting a new file that is downloaded directly to your device.',
                  },
                  {
                    icon: <Wifi size={24} strokeWidth={1.5} className="text-success-400" />,
                    iconBg: 'bg-success-500/15',
                    title: 'Network Activity: Zero for Files',
                    body: 'When you perform any PDF operation, open your browser\'s Network tab. You will see requests for static JavaScript and CSS bundles — but none of those requests carry your file content. The file never leaves the browser tab.',
                  },
                  {
                    icon: <Globe size={24} strokeWidth={1.5} className="text-info-400" />,
                    iconBg: 'bg-info-500/15',
                    title: 'Open-Source & Auditable',
                    body: 'The entire codebase is public on GitHub. Anyone can audit the source to confirm there is no hidden upload logic. No obfuscation, no proprietary backend, no SDK calling home.',
                  },
                  {
                    icon: <Zap size={24} strokeWidth={1.5} className="text-warning-400" />,
                    iconBg: 'bg-warning-500/15',
                    title: 'Works Offline After Load',
                    body: 'Once the page and its assets load, you can disconnect from the internet and all PDF tools continue to function. This is only possible because there is no server dependency for processing.',
                  },
                  {
                    icon: <Lock size={24} strokeWidth={1.5} className="text-error-400" />,
                    iconBg: 'bg-error-500/15',
                    title: 'No Account, No Tracking of Files',
                    body: 'We collect only anonymous usage metrics (page views, which tool was used) — never file names, file contents, or any personally identifiable document data. See our Privacy Policy for the full list.',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-xl bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/25 transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-surface-400 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How to verify yourself */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }} aria-labelledby="verify-heading">
              <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-primary-500/5 border-info-500/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-info-500/15 flex items-center justify-center text-info-400">
                    <Eye size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 id="verify-heading" className="text-xl font-bold text-white mb-1">Verify It Yourself in 60 Seconds</h2>
                    <p className="text-surface-400 text-sm">You don&apos;t have to take our word for it. Here&apos;s how to confirm with your own browser:</p>
                  </div>
                </div>
                <ol className="space-y-4">
                  {[
                    { n: 1, text: 'Open any PDF tool on this site, for example the Compress PDF tool.' },
                    { n: 2, text: 'Press F12 (or Cmd+Option+I on Mac) to open Developer Tools and switch to the Network tab.' },
                    { n: 3, text: 'Tick "Preserve log" so you don\'t miss anything, then clear the existing entries.' },
                    { n: 4, text: 'Select a PDF file and run the tool.' },
                    { n: 5, text: 'Inspect every network request that appears. None of them will contain your PDF data — you will only see requests for .js, .css, and .woff font files.' },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-info-500/20 text-info-300 text-sm font-bold flex items-center justify-center">
                        {step.n}
                      </span>
                      <p className="text-sm text-surface-300 leading-relaxed pt-0.5">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* What we do collect (transparency) */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }} aria-labelledby="collect-heading">
              <div className="card p-6 border-warning-500/20 bg-warning-500/5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                    <AlertCircle size={20} strokeWidth={2} className="text-warning-400" />
                  </div>
                  <div className="flex-1">
                    <h2 id="collect-heading" className="font-semibold text-warning-300 mb-4 text-lg">
                      What We Do Collect (Transparency)
                    </h2>
                    <p className="text-sm text-surface-400 mb-4">
                      To be fully transparent: we do collect a small amount of anonymous, non-personal analytics to understand which tools are used and how the site performs. This data never includes file contents or file names.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-400">
                      {[
                        { ok: true,  text: 'Page views and navigation paths' },
                        { ok: true,  text: 'Which tools are opened (tool ID only, e.g. "compress")' },
                        { ok: true,  text: 'Device type, browser, and country (aggregated)' },
                        { ok: false, text: 'File names — never collected' },
                        { ok: false, text: 'File contents — never collected' },
                        { ok: false, text: 'IP address stored long-term — not stored' },
                        { ok: false, text: 'User accounts or email addresses — we have none' },
                      ].map((item) => (
                        <li key={item.text} className="flex items-center gap-2">
                          {item.ok
                            ? <CheckCircle2 size={16} strokeWidth={2} className="text-success-400 flex-shrink-0" />
                            : <XCircle size={16} strokeWidth={2} className="text-error-400 flex-shrink-0" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium">
                        <ExternalLink size={14} strokeWidth={2} />
                        Read the full Privacy Policy
                      </Link>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-400 transition-colors font-medium"
                      >
                        <ExternalLink size={14} strokeWidth={2} />
                        Audit the source code on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Browser Limitations */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '350ms' }} aria-labelledby="limits-heading">
              <h2 id="limits-heading" className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                Practical Limitations
              </h2>
              <p className="text-center text-surface-400 text-sm mb-8 max-w-2xl mx-auto">
                Because all processing happens inside your browser tab, the limits are set by your device&apos;s hardware — not our servers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* File size */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-warning-500/15 flex items-center justify-center flex-shrink-0">
                      <HardDrive size={20} strokeWidth={1.5} className="text-warning-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">File Size</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">
                    Works smoothly up to <span className="text-white font-medium">~200 MB</span>. Files up to 500 MB typically process fine on modern hardware. Above 500 MB the browser may feel sluggish depending on available RAM.
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">Under 200 MB — fast, no issues</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">200–500 MB — close other tabs</span></li>
                    <li className="flex items-center gap-2 text-error-400"><XCircle size={13} strokeWidth={2} /><span className="text-surface-300">Above 500 MB — may run out of RAM</span></li>
                  </ul>
                </div>

                {/* Memory / RAM */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-info-500/15 flex items-center justify-center flex-shrink-0">
                      <MemoryStick size={20} strokeWidth={1.5} className="text-info-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">Memory (RAM)</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">
                    The browser holds the original PDF, the modified copy, and rendering buffers in RAM simultaneously. Merging many large files can use several GB.
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">8 GB RAM — handles most tasks</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">Close unused tabs to free RAM</span></li>
                    <li className="flex items-center gap-2 text-info-400"><Zap size={13} strokeWidth={2} /><span className="text-surface-300">Refresh page to release memory</span></li>
                  </ul>
                </div>

                {/* Browser compatibility */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                      <Globe size={20} strokeWidth={1.5} className="text-primary-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">Browser Support</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">
                    All tools require a modern browser with <span className="text-white">WebAssembly</span> and <span className="text-white">ES2020</span> support. Chrome and Edge are the safest choice for the largest files.
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">Chrome / Edge — best performance</span></li>
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">Firefox — full support</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">Safari — may lag on large files</span></li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-800/30 border border-surface-700/30 flex items-start gap-3">
                <AlertCircle size={16} strokeWidth={2} className="text-surface-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-surface-500 leading-relaxed">
                  <span className="text-surface-400 font-medium">No persistence:</span> once you close or refresh the tab, all processed files are discarded from memory. Your edited PDF is never stored — download it before leaving the page.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }} aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Does EditoraPDF upload my PDF to a server?',
                    a: 'No. Every PDF tool runs entirely in your browser using JavaScript and WebAssembly. Your file is loaded from your device, modified in memory, and saved back to your device — a server is never involved.',
                  },
                  {
                    q: 'How can I verify that my file is not uploaded?',
                    a: 'Open DevTools → Network tab, select your PDF, and perform any operation. You will see no outgoing network request carrying your file data — only static .js / .css / font asset requests.',
                  },
                  {
                    q: 'Is EditoraPDF safe for confidential contracts or legal documents?',
                    a: 'Yes. Because processing is 100% client-side, your document content never leaves your device. This makes EditoraPDF appropriate for confidential, sensitive, or legally privileged documents.',
                  },
                  {
                    q: 'What analytics data does EditoraPDF collect?',
                    a: 'Only anonymous metrics: page views, which tool was used, device type, browser, and country. File names and file contents are never collected or transmitted.',
                  },
                  {
                    q: 'Why should I trust this claim?',
                    a: 'Because you can independently verify it in 60 seconds using browser DevTools (see instructions above), and because the entire codebase is open source and auditable on GitHub.',
                  },
                ].map((item) => (
                  <details key={item.q} className="group card p-5 bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/25 transition-all duration-200 cursor-pointer">
                    <summary className="flex items-center justify-between gap-3 font-semibold text-white text-sm md:text-base list-none">
                      {item.q}
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-surface-400 group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-surface-400 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-success-500/10 via-surface-800/60 to-primary-500/10 border-success-500/20 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Shield size={40} strokeWidth={1.5} className="text-success-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Edit Securely?</h2>
              <p className="text-surface-300 mb-8 text-base max-w-xl mx-auto">
                Open any tool and process your PDFs with confidence — everything stays on your device.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/tools" className="btn-primary btn-lg inline-flex items-center gap-2 group">
                  Browse All Tools
                  <ArrowRight size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/how-it-works" className="btn-secondary btn-lg inline-flex items-center gap-2">
                  How It Works
                </Link>
              </div>
              <p className="text-xs text-surface-500 mt-5">
                100% free &bull; No signup &bull; No server uploads &bull; Open source
              </p>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
