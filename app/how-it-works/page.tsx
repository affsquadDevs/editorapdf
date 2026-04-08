import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import {
  Upload, FileText, Edit3, Download, Shield, Zap,
  Globe, Lock, CheckCircle2, ArrowRight, Sparkles,
  FileCheck, Image as ImageIcon, PenTool, RotateCw,
  Trash2, GripVertical, Eye, Clock, Server
} from 'lucide-react'

const siteUrl = 'https://editorapdf.com'

export const metadata: Metadata = {
  title: 'How It Works — Edit PDF Online Without Installation | EditoraPDF',
  description: 'Learn how EditoraPDF works. Simple, fast, and secure PDF editing entirely in your browser — no installation, no signup, no file uploads to any server.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/en/how-it-works`,
    title: 'How It Works — Edit PDF Online Without Installation | EditoraPDF',
    description: 'Learn how EditoraPDF works. Simple, fast, and secure PDF editing entirely in your browser — no installation, no signup, no file uploads.',
    siteName: 'EditoraPDF',
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — How It Works' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works — Edit PDF Online Without Installation | EditoraPDF',
    description: 'Learn how EditoraPDF works. Simple, fast, and secure PDF editing entirely in your browser.',
    images: [`${siteUrl}/og/og-image.png`],
    creator: '@editora_pdf',
    site: '@editora_pdf',
  },
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Zap size={16} strokeWidth={2} className="text-primary-400" />
              Simple & Fast
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              How EditoraPDF{' '}
              <span className="text-gradient-animated">Works</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Edit PDF documents online in seconds. No installation, no signup, complete privacy.
              Everything happens right in your browser — your files never leave your device.
            </p>
          </div>

          {/* Main Steps */}
          <div className="space-y-8 mb-16">
            {[
              {
                step: 1,
                title: 'Upload Your PDF',
                description: 'Click "Edit PDF" or drag and drop your PDF file directly into the editor. EditoraPDF supports files up to 25MB and processes everything locally in your browser. No uploads to servers, no waiting — instant access.',
                icon: <Upload size={32} strokeWidth={1.5} />,
                color: 'primary',
                features: [
                  'Drag and drop support',
                  'Files up to 25MB',
                  'Instant processing',
                  'No server uploads'
                ]
              },
              {
                step: 2,
                title: 'Edit Your Document',
                description: 'Use our powerful editor to modify your PDF. Edit text, add images, annotate, reorder pages, rotate, delete, and more. All tools work instantly in your browser with real-time preview. No plugins or downloads required.',
                icon: <Edit3 size={32} strokeWidth={1.5} />,
                color: 'accent',
                features: [
                  'Edit text content',
                  'Add images and shapes',
                  'Reorder and rotate pages',
                  'Real-time preview'
                ]
              },
              {
                step: 3,
                title: 'Export & Download',
                description: 'Click "Export" to download your edited PDF with all changes applied. Your file stays on your device the entire time — no uploads, no tracking, no data collection. Download instantly and you\'re done.',
                icon: <Download size={32} strokeWidth={1.5} />,
                color: 'success',
                features: [
                  'Instant download',
                  'All changes preserved',
                  'Original quality maintained',
                  'No watermarks'
                ]
              },
            ].map((item, index) => {
              const colorClasses: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
                primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20', iconBg: 'bg-primary-500/15', text: 'text-primary-400' },
                accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20', iconBg: 'bg-accent-500/15', text: 'text-accent-400' },
                success: { bg: 'bg-success-500/5', border: 'border-success-500/20', iconBg: 'bg-success-500/15', text: 'text-success-400' },
              };
              const c = colorClasses[item.color] || colorClasses.primary;
              
              return (
                <div 
                  key={item.step} 
                  className={`card p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 ${c.bg} ${c.border} border animate-fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl ${c.iconBg} flex items-center justify-center ${c.text} shadow-lg`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`${c.text} font-bold text-sm uppercase tracking-wider`}>STEP {item.step}</span>
                      <div className="flex-1 h-px bg-surface-700/50"></div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">{item.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-surface-400">
                          <CheckCircle2 size={16} strokeWidth={2} className={`${c.text} flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Features Section */}
          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="features-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-primary-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={14} strokeWidth={2} />
                  Key Features
                </div>
                <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Why EditoraPDF is Different
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  Everything you need to edit PDFs, all in your browser, completely free.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap size={24} strokeWidth={1.5} className="text-primary-400" />,
                    title: 'Instant Processing',
                    description: 'No waiting, no queues. Your PDF is ready to edit the moment you upload it. Everything happens in real-time.',
                  },
                  {
                    icon: <Shield size={24} strokeWidth={1.5} className="text-success-400" />,
                    title: '100% Private',
                    description: 'All processing happens on your device. Your files never leave your computer — complete privacy guaranteed.',
                  },
                  {
                    icon: <Globe size={24} strokeWidth={1.5} className="text-accent-400" />,
                    title: 'No Installation',
                    description: 'Works in any modern browser. No downloads, no plugins, no software to install. Just open and start editing.',
                  },
                  {
                    icon: <Lock size={24} strokeWidth={1.5} className="text-info-400" />,
                    title: 'No Signup Required',
                    description: 'Start editing immediately. No accounts, no emails, no passwords. Your privacy is our priority.',
                  },
                  {
                    icon: <Server size={24} strokeWidth={1.5} className="text-warning-400" />,
                    title: 'Offline Capable',
                    description: 'Once loaded, EditoraPDF works offline. No internet connection needed after the initial page load.',
                  },
                  {
                    icon: <FileCheck size={24} strokeWidth={1.5} className="text-error-400" />,
                    title: 'No Watermarks',
                    description: 'Download your edited PDFs without any watermarks or restrictions. Completely free, forever.',
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-xl bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/30 transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${400 + index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-700/50 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Editing Tools Section */}
          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="tools-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-primary-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <h2 id="tools-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Powerful Editing Tools
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  Everything you need to edit PDFs professionally, all in one place.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: <FileText size={20} strokeWidth={1.5} />, name: 'Text Editing', desc: 'Edit existing text or add new text anywhere' },
                  { icon: <ImageIcon size={20} strokeWidth={1.5} />, name: 'Add Images', desc: 'Insert images from your device' },
                  { icon: <PenTool size={20} strokeWidth={1.5} />, name: 'Draw & Annotate', desc: 'Draw shapes, arrows, and highlights' },
                  { icon: <RotateCw size={20} strokeWidth={1.5} />, name: 'Rotate Pages', desc: 'Rotate pages 90° clockwise or counterclockwise' },
                  { icon: <Trash2 size={20} strokeWidth={1.5} />, name: 'Delete Pages', desc: 'Remove unwanted pages instantly' },
                  { icon: <GripVertical size={20} strokeWidth={1.5} />, name: 'Reorder Pages', desc: 'Drag and drop to reorder pages' },
                  { icon: <Eye size={20} strokeWidth={1.5} />, name: 'Page Navigation', desc: 'Easy thumbnail navigation' },
                  { icon: <Clock size={20} strokeWidth={1.5} />, name: 'Real-time Preview', desc: 'See changes instantly as you edit' },
                  { icon: <FileCheck size={20} strokeWidth={1.5} />, name: 'Quality Preserved', desc: 'Maintain original PDF quality' },
                ].map((tool, index) => (
                  <div
                    key={tool.name}
                    className="p-4 rounded-lg bg-surface-800/40 border border-surface-700/50 hover:border-accent-500/30 transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${600 + index * 30}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-500/15 flex items-center justify-center text-accent-400">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white mb-0.5">{tool.name}</h4>
                        <p className="text-xs text-surface-500">{tool.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-16 animate-fade-in delay-600" aria-labelledby="technical-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-success-500/5 border-info-500/20">
              <h2 id="technical-heading" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                How It Works Technically
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-info-500/15 flex items-center justify-center">
                    <Server size={24} strokeWidth={1.5} className="text-info-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Client-Side Processing</h3>
                    <p className="text-surface-400 leading-relaxed">
                      EditoraPDF uses PDF.js and pdf-lib libraries that run entirely in your browser. 
                      All PDF parsing, editing, and generation happens on your device using JavaScript. 
                      No data is sent to any server — your files never leave your computer.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Since everything runs locally, there's no way for us or anyone else to access your files. 
                      We don't store, track, or analyze your PDFs. Your privacy is guaranteed by design, not by policy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Zap size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Fast & Efficient</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Modern web technologies ensure fast performance. The editor loads instantly, 
                      processes PDFs quickly, and provides smooth editing experience. Works great even on older devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-16 animate-fade-in delay-700" aria-labelledby="limitations-heading">
            <div className="card p-6 border-warning-500/20 bg-warning-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                  <FileText size={20} strokeWidth={2} className="text-warning-400" />
                </div>
                <div className="flex-1">
                  <h3 id="limitations-heading" className="font-semibold text-warning-300 mb-3 text-lg">
                    Current Limitations
                  </h3>
                  <ul className="text-sm text-surface-400 space-y-2" role="list">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" />
                      <span>Maximum file size: <strong className="text-surface-300">25MB</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" />
                      <span>Works best with PDFs under <strong className="text-surface-300">50 pages</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" />
                      <span>Complex PDFs with forms may not render perfectly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" />
                      <span>Encrypted or password-protected PDFs are not supported</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              Start editing PDF documents online right now. No signup required, no installation needed, 
              completely free and private.
            </p>
            <Link 
              href="/" 
              className="btn-primary btn-lg inline-flex items-center gap-2 group"
            >
              <Edit3 size={20} strokeWidth={2} />
              Edit PDF Now
              <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs text-surface-500 mt-4">
              100% free &bull; No signup &bull; Processed on your device
            </p>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
