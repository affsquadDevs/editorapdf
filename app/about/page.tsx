import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import {
  Shield, Zap, Globe, Lock, CheckCircle2, ArrowRight,
  Sparkles, FileText, Users, Code, Heart, Target,
  Github, Mail, MessageSquare, Award, Rocket, Eye
} from 'lucide-react'

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
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Heart size={16} strokeWidth={2} className="text-primary-400" />
              Built with Passion for Privacy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              About{' '}
              <span className="text-gradient-animated">EditoraPDF</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Making PDF editing simple, accessible, and completely free for everyone.
              We believe privacy shouldn't be a premium feature.
            </p>
          </div>

          {/* What is EditoraPDF */}
          <section className="mb-16 animate-fade-in delay-100" aria-labelledby="what-is-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/5 via-surface-800/60 to-accent-500/5 border-primary-500/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center">
                  <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <h2 id="what-is-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    What is EditoraPDF?
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    <strong className="text-white">EditoraPDF</strong> is a completely free, open-source online PDF editor that runs entirely in your browser. 
                    Unlike traditional PDF editors that require software installation or cloud-based services that upload your files, 
                    EditoraPDF processes everything locally on your device.
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    Built with modern web technologies, EditoraPDF provides professional-grade PDF editing capabilities — 
                    from simple text edits to complex page management — all without compromising your privacy or requiring any signup.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Goal */}
          <section className="mb-16 animate-fade-in delay-200" aria-labelledby="mission-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-success-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Target size={14} strokeWidth={2} />
                  Our Mission
                </div>
                <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Our Main Goal
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center">
                    <Target size={24} strokeWidth={1.5} className="text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Democratize PDF Editing</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Our primary goal is to make professional PDF editing tools accessible to everyone, regardless of their technical skills, 
                      budget, or privacy concerns. We believe that powerful software shouldn't require expensive licenses or compromise user privacy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Privacy by Design</h3>
                    <p className="text-surface-400 leading-relaxed">
                      We're committed to building tools that respect user privacy from the ground up. 
                      EditoraPDF was created with a simple goal: to provide a powerful, free PDF editor that anyone can use 
                      without installing software, creating accounts, or compromising their privacy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Rocket size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Open Source & Free Forever</h3>
                    <p className="text-surface-400 leading-relaxed">
                      We believe that everyone should have access to professional-grade PDF editing tools without barriers. 
                      That's why EditoraPDF is completely free, works entirely in your browser, and never uploads your files to our servers. 
                      As an open-source project, the code is available for anyone to view, modify, or contribute to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="values-heading">
            <div className="text-center mb-8">
              <h2 id="values-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                Our Core Values
              </h2>
              <p className="text-surface-400 max-w-2xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield size={28} strokeWidth={1.5} className="text-success-400" />,
                  title: 'Privacy First',
                  description: 'All processing happens on your device. We never see, store, or transmit your documents. Your privacy is guaranteed by design, not by policy.',
                  color: 'success',
                },
                {
                  icon: <Zap size={28} strokeWidth={1.5} className="text-primary-400" />,
                  title: 'Instant Access',
                  description: 'No installation, no signup, no waiting. Start editing PDFs in seconds. Works in any modern browser without plugins or downloads.',
                  color: 'primary',
                },
                {
                  icon: <Award size={28} strokeWidth={1.5} className="text-accent-400" />,
                  title: '100% Free',
                  description: 'All features available to everyone. No hidden fees, no premium tiers, no watermarks. Completely free, forever.',
                  color: 'accent',
                },
                {
                  icon: <Sparkles size={28} strokeWidth={1.5} className="text-info-400" />,
                  title: 'Powerful Tools',
                  description: 'Professional features including text editing, annotations, page management, and more. Everything you need in one place.',
                  color: 'info',
                },
                {
                  icon: <Globe size={28} strokeWidth={1.5} className="text-warning-400" />,
                  title: 'Open Source',
                  description: 'Built with transparency in mind. View the code, contribute features, report bugs, or fork it for your own projects.',
                  color: 'warning',
                },
                {
                  icon: <Users size={28} strokeWidth={1.5} className="text-error-400" />,
                  title: 'Community Driven',
                  description: 'We listen to our users and continuously improve based on feedback. Your suggestions help shape the future of EditoraPDF.',
                  color: 'error',
                },
              ].map((value, index) => {
                const colorClasses: Record<string, { bg: string; border: string }> = {
                  primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20' },
                  accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20' },
                  success: { bg: 'bg-success-500/5', border: 'border-success-500/20' },
                  info: { bg: 'bg-info-500/5', border: 'border-info-500/20' },
                  warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20' },
                  error: { bg: 'bg-error-500/5', border: 'border-error-500/20' },
                };
                const c = colorClasses[value.color] || colorClasses.primary;
                
                return (
                  <div
                    key={value.title}
                    className={`card p-6 ${c.bg} ${c.border} border animate-fade-in-up`}
                    style={{ animationDelay: `${400 + index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface-800/50 flex items-center justify-center">
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                        <p className="text-sm text-surface-400 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="technology-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-primary-500/5 border-info-500/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-info-500/15 flex items-center justify-center">
                  <Code size={32} strokeWidth={1.5} className="text-info-400" />
                </div>
                <div className="flex-1">
                  <h2 id="technology-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Built with Modern Technology
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    EditoraPDF is powered by cutting-edge web technologies that enable complex PDF processing entirely in your browser. 
                    We use <strong className="text-white">PDF.js</strong> for rendering and <strong className="text-white">pdf-lib</strong> for editing, 
                    ensuring compatibility and reliability.
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    Our application is built with <strong className="text-white">Next.js</strong> and <strong className="text-white">React</strong>, 
                    providing a fast, responsive experience on any device. All code runs client-side, meaning your documents are processed locally 
                    with zero server involvement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {['Next.js', 'TypeScript', 'React', 'PDF.js', 'pdf-lib', 'Zustand', 'Tailwind CSS', 'Open Source'].map((tech) => (
                  <div
                    key={tech}
                    className="p-4 rounded-lg bg-surface-800/40 border border-surface-700/50 text-center"
                  >
                    <p className="text-sm font-semibold text-surface-300">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Technically */}
          <section className="mb-16 animate-fade-in delay-600" aria-labelledby="how-works-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-success-500/5 via-surface-800/60 to-accent-500/5 border-success-500/20">
              <h2 id="how-works-heading" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Eye size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Client-Side Processing</h3>
                    <p className="text-surface-400 leading-relaxed">
                      When you upload a PDF, it's loaded directly into your browser's memory using PDF.js. 
                      All editing operations — text changes, image insertions, page rotations — happen locally using JavaScript. 
                      Your file never leaves your device.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Lock size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Zero Data Transmission</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Unlike cloud-based editors, EditoraPDF doesn't send your files to any server. 
                      There's no upload step, no processing queue, and no way for us or anyone else to access your documents. 
                      Your privacy is guaranteed by the architecture itself.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center">
                    <Zap size={24} strokeWidth={1.5} className="text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Instant Export</h3>
                    <p className="text-surface-400 leading-relaxed">
                      When you're done editing, pdf-lib generates the final PDF file directly in your browser. 
                      Click export, and your edited PDF downloads immediately — no waiting, no processing delays, 
                      no server round-trips.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section className="mb-16 animate-fade-in delay-700" aria-labelledby="opensource-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-primary-500/20 border-2 border-primary-500/40 flex items-center justify-center">
                    <Github size={40} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 id="opensource-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                    100% Open Source & Free Forever
                  </h2>
                  <p className="text-surface-300 text-base md:text-lg leading-relaxed mb-5">
                    EditoraPDF is completely <strong className="text-white">open source</strong> (MIT License) and built with modern technologies. 
                    View the code, contribute features, report bugs, or fork it for your own projects. 
                    We believe in transparency and community-driven development.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <a
                      href="https://github.com/affsquadDevs/editorapdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-md inline-flex items-center gap-2"
                    >
                      <Github size={18} strokeWidth={2} />
                      View on GitHub
                    </a>
                    <a
                      href="https://github.com/affsquadDevs/editorapdf/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-md inline-flex items-center gap-2"
                    >
                      <MessageSquare size={18} strokeWidth={2} />
                      Report Issue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Questions or Feedback?</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have suggestions, found a bug, or just want to say hello, 
              get in touch with our team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary btn-lg inline-flex items-center gap-2 group">
                <Mail size={20} strokeWidth={2} />
                Contact Us
                <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/" className="btn-secondary btn-lg inline-flex items-center gap-2">
                <FileText size={20} strokeWidth={2} />
                Start Editing
              </Link>
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
