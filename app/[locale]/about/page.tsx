import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import {
  Shield, Zap, Globe, Users, Code, Heart, Target,
  Github, Mail, MessageSquare, Award, Rocket, Eye, FileText, ArrowRight, Sparkles
} from 'lucide-react'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { getMessages } from '../../i18n/messages'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key
  return {
    title: t('nav.about') + ' | EditoraPDF',
    description: t('about.subtitle'),
  }
}

export default function AboutLocalePage({ params }: { params: { locale: string } }) {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? ''
  const withLocale = (path: string) => `/${locale}${path}`

  const values = [
    { icon: <Shield size={28} strokeWidth={1.5} className="text-success-400" />, title: t('about.val1.title'), description: t('about.val1.desc'), color: 'success' },
    { icon: <Zap size={28} strokeWidth={1.5} className="text-primary-400" />, title: t('about.val2.title'), description: t('about.val2.desc'), color: 'primary' },
    { icon: <Award size={28} strokeWidth={1.5} className="text-accent-400" />, title: t('about.val3.title'), description: t('about.val3.desc'), color: 'accent' },
    { icon: <Sparkles size={28} strokeWidth={1.5} className="text-info-400" />, title: t('about.val4.title'), description: t('about.val4.desc'), color: 'info' },
    { icon: <Globe size={28} strokeWidth={1.5} className="text-warning-400" />, title: t('about.val5.title'), description: t('about.val5.desc'), color: 'warning' },
    { icon: <Users size={28} strokeWidth={1.5} className="text-error-400" />, title: t('about.val6.title'), description: t('about.val6.desc'), color: 'error' },
  ]

  const colorClasses: Record<string, { bg: string; border: string }> = {
    primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20' },
    accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20' },
    success: { bg: 'bg-success-500/5', border: 'border-success-500/20' },
    info: { bg: 'bg-info-500/5', border: 'border-info-500/20' },
    warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20' },
    error: { bg: 'bg-error-500/5', border: 'border-error-500/20' },
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Heart size={16} strokeWidth={2} className="text-primary-400" />
              {t('about.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {t('about.h1.before')}{' '}
              <span className="text-gradient-animated">{t('about.h1.highlight')}</span>
              {t('about.h1.part2') ? <> {t('about.h1.part2')}</> : null}
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>

          {/* What is */}
          <section className="mb-16 animate-fade-in delay-100" aria-labelledby="what-is-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/5 via-surface-800/60 to-accent-500/5 border-primary-500/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center">
                  <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <h2 id="what-is-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t('about.what.title')}
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    <strong className="text-white">EditoraPDF</strong> {t('about.what.p1').replace('EditoraPDF', '').trimStart()}
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    {t('about.what.p2')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-16 animate-fade-in delay-200" aria-labelledby="mission-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-success-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Target size={14} strokeWidth={2} />
                  {t('about.mission.badge')}
                </div>
                <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('about.mission.title')}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center">
                    <Target size={24} strokeWidth={1.5} className="text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('about.mission1.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('about.mission1.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('about.mission2.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('about.mission2.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Rocket size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('about.mission3.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('about.mission3.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="values-heading">
            <div className="text-center mb-8">
              <h2 id="values-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('about.values.title')}
              </h2>
              <p className="text-surface-400 max-w-2xl mx-auto">
                {t('about.values.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const c = colorClasses[value.color] || colorClasses.primary
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
                )
              })}
            </div>
          </section>

          {/* Technology */}
          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="technology-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-primary-500/5 border-info-500/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-info-500/15 flex items-center justify-center">
                  <Code size={32} strokeWidth={1.5} className="text-info-400" />
                </div>
                <div className="flex-1">
                  <h2 id="technology-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t('about.tech.title')}
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    {t('about.tech.p1').split('PDF.js').map((part, i, arr) =>
                      i < arr.length - 1
                        ? <span key={i}>{part}<strong className="text-white">PDF.js</strong></span>
                        : <span key={i}>{part.split('pdf-lib').map((p2, j, arr2) =>
                            j < arr2.length - 1
                              ? <span key={j}>{p2}<strong className="text-white">pdf-lib</strong></span>
                              : <span key={j}>{p2}</span>
                          )}</span>
                    )}
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    {t('about.tech.p2').split('Next.js').map((part, i, arr) =>
                      i < arr.length - 1
                        ? <span key={i}>{part}<strong className="text-white">Next.js</strong></span>
                        : <span key={i}>{part.split('React').map((p2, j, arr2) =>
                            j < arr2.length - 1
                              ? <span key={j}>{p2}<strong className="text-white">React</strong></span>
                              : <span key={j}>{p2}</span>
                          )}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {['Next.js', 'TypeScript', 'React', 'PDF.js', 'pdf-lib', 'Zustand', 'Tailwind CSS', 'Open Source'].map((tech) => (
                  <div key={tech} className="p-4 rounded-lg bg-surface-800/40 border border-surface-700/50 text-center">
                    <p className="text-sm font-semibold text-surface-300">{tech}</p>
                  </div>
                ))}
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
                    {t('about.oss.title')}
                  </h2>
                  <p className="text-surface-300 text-base md:text-lg leading-relaxed mb-5">
                    {t('about.oss.desc')}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <a
                      href="https://github.com/affsquadDevs/editorapdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-md inline-flex items-center gap-2"
                    >
                      <Github size={18} strokeWidth={2} />
                      {t('about.oss.github')}
                    </a>
                    <a
                      href="https://github.com/affsquadDevs/editorapdf/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-md inline-flex items-center gap-2"
                    >
                      <MessageSquare size={18} strokeWidth={2} />
                      {t('about.oss.issue')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('about.cta.title')}</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              {t('about.cta.desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={withLocale('/contact')} className="btn-primary btn-lg inline-flex items-center gap-2 group">
                <Mail size={20} strokeWidth={2} />
                {t('about.cta.contact')}
                <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={withLocale('/')} className="btn-secondary btn-lg inline-flex items-center gap-2">
                <FileText size={20} strokeWidth={2} />
                {t('about.cta.start')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
