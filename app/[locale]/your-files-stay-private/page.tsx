import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'
import {
  Shield, Server, Wifi, Eye, Lock, CheckCircle2, ArrowRight,
  FileText, Cpu, Globe, AlertCircle, ExternalLink, HardDrive,
  XCircle, Zap, MonitorSmartphone, MemoryStick, AlertTriangle, CheckCheck,
} from 'lucide-react'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { localeAlternates, getOgLocale } from '../../lib/seo'
import { yourFilesContent } from '../../data/yourFilesContent'

const siteUrl = 'https://editorapdf.com'

function resolve(locale: string): { loc: AppLocale; c: Record<string, string> } {
  const loc = (isSupportedLocale(locale) ? normalizeLocale(locale) : defaultLocale) as AppLocale
  return { loc, c: yourFilesContent[loc] ?? yourFilesContent.en }
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { loc, c } = resolve(params.locale)
  const pageUrl = `${siteUrl}/${loc}/your-files-stay-private`
  return {
    title: c['meta.title'],
    description: c['meta.desc'],
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: c['meta.title'],
      description: c['meta.desc'],
      siteName: 'EditoraPDF',
      locale: getOgLocale(loc),
      images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — Files Stay Private' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c['hero.h1a'] + ' ' + c['hero.h1b'] + ' ' + c['hero.h1c'],
      description: c['meta.desc'],
      images: [`${siteUrl}/og/og-image.png`],
    },
    alternates: localeAlternates(loc, '/your-files-stay-private'),
  }
}

export default function LocaleYourFilesPage({ params }: { params: { locale: string } }) {
  const { loc, c } = resolve(params.locale)
  const withLocale = (path: string) => `/${loc}${path}`

  const faqItems = [1, 2, 3, 4, 5].map((n) => ({ q: c[`faq.q${n}`], a: c[`faq.a${n}`] }))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const techCards = [
    { icon: <Cpu size={24} strokeWidth={1.5} className="text-primary-400" />, iconBg: 'bg-primary-500/15', title: c['tech.card1Title'], body: c['tech.card1Body'] },
    { icon: <FileText size={24} strokeWidth={1.5} className="text-accent-400" />, iconBg: 'bg-accent-500/15', title: c['tech.card2Title'], body: c['tech.card2Body'] },
    { icon: <Wifi size={24} strokeWidth={1.5} className="text-success-400" />, iconBg: 'bg-success-500/15', title: c['tech.card3Title'], body: c['tech.card3Body'] },
    { icon: <Globe size={24} strokeWidth={1.5} className="text-info-400" />, iconBg: 'bg-info-500/15', title: c['tech.card4Title'], body: c['tech.card4Body'] },
    { icon: <Zap size={24} strokeWidth={1.5} className="text-warning-400" />, iconBg: 'bg-warning-500/15', title: c['tech.card5Title'], body: c['tech.card5Body'] },
    { icon: <Lock size={24} strokeWidth={1.5} className="text-error-400" />, iconBg: 'bg-error-500/15', title: c['tech.card6Title'], body: c['tech.card6Body'] },
  ]

  const verifySteps = [1, 2, 3, 4, 5].map((n) => ({ n, text: c[`verify.step${n}`] }))

  const collectItems = [
    { ok: true, text: c['collect.item1'] },
    { ok: true, text: c['collect.item2'] },
    { ok: true, text: c['collect.item3'] },
    { ok: false, text: c['collect.item4'] },
    { ok: false, text: c['collect.item5'] },
    { ok: false, text: c['collect.item6'] },
    { ok: false, text: c['collect.item7'] },
  ]

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
                {c['hero.badge']}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                {c['hero.h1a']}{' '}
                <span className="text-gradient-animated">{c['hero.h1b']}</span>
                <br />{c['hero.h1c']}
              </h1>
              <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
                {c['hero.subtitle']}
              </p>
            </div>

            {/* Visual flow diagram */}
            <section className="mb-16 animate-fade-in-up" aria-labelledby="flow-heading">
              <div className="card p-8 md:p-10 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-success-500/20">
                <h2 id="flow-heading" className="text-xl font-bold text-white text-center mb-10">
                  {c['flow.heading']}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">

                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center mb-3 text-primary-400">
                      <HardDrive size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">{c['flow.deviceTitle']}</p>
                    <p className="text-xs text-surface-500">{c['flow.deviceSub1']}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={20} className="text-success-400 rotate-90 md:rotate-0" strokeWidth={2} />
                    <span className="text-[10px] text-success-400 font-medium hidden md:block">{c['flow.readsFile']}</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-accent-500/15 flex items-center justify-center mb-3 text-accent-400">
                      <MonitorSmartphone size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">{c['flow.browserTitle']}</p>
                    <p className="text-xs text-surface-500">{c['flow.browserSub']}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={20} className="text-success-400 rotate-90 md:rotate-0" strokeWidth={2} />
                    <span className="text-[10px] text-success-400 font-medium hidden md:block">{c['flow.downloads']}</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <div className="w-16 h-16 rounded-2xl bg-success-500/15 flex items-center justify-center mb-3 text-success-400">
                      <HardDrive size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">{c['flow.deviceTitle2']}</p>
                    <p className="text-xs text-surface-500">{c['flow.deviceSub2']}</p>
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
                    <p className="text-sm font-semibold text-error-300 mb-1">{c['flow.serverTitle']}</p>
                    <p className="text-xs text-surface-500">{c['flow.serverSub']}</p>
                  </div>
                </div>

                <p className="text-center text-xs text-surface-500 mt-8">
                  {c['flow.caption']}
                </p>
              </div>
            </section>

            {/* Technical explanation */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }} aria-labelledby="tech-heading">
              <h2 id="tech-heading" className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                {c['tech.heading']}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techCards.map((item) => (
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
                    <h2 id="verify-heading" className="text-xl font-bold text-white mb-1">{c['verify.heading']}</h2>
                    <p className="text-surface-400 text-sm">{c['verify.intro']}</p>
                  </div>
                </div>
                <ol className="space-y-4">
                  {verifySteps.map((step) => (
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
                      {c['collect.heading']}
                    </h2>
                    <p className="text-sm text-surface-400 mb-4">
                      {c['collect.intro']}
                    </p>
                    <ul className="space-y-2 text-sm text-surface-400">
                      {collectItems.map((item) => (
                        <li key={item.text} className="flex items-center gap-2">
                          {item.ok
                            ? <CheckCircle2 size={16} strokeWidth={2} className="text-success-400 flex-shrink-0" />
                            : <XCircle size={16} strokeWidth={2} className="text-error-400 flex-shrink-0" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href={withLocale('/privacy-policy')} className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium">
                        <ExternalLink size={14} strokeWidth={2} />
                        {c['collect.link1']}
                      </Link>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-400 transition-colors font-medium"
                      >
                        <ExternalLink size={14} strokeWidth={2} />
                        {c['collect.link2']}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Browser Limitations */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '350ms' }} aria-labelledby="limits-heading">
              <h2 id="limits-heading" className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                {c['limits.heading']}
              </h2>
              <p className="text-center text-surface-400 text-sm mb-8 max-w-2xl mx-auto">
                {c['limits.intro']}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* File size */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-warning-500/15 flex items-center justify-center flex-shrink-0">
                      <HardDrive size={20} strokeWidth={1.5} className="text-warning-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{c['limits.card1Title']}</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">{c['limits.card1Body']}</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card1a']}</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card1b']}</span></li>
                    <li className="flex items-center gap-2 text-error-400"><XCircle size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card1c']}</span></li>
                  </ul>
                </div>

                {/* Memory / RAM */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-info-500/15 flex items-center justify-center flex-shrink-0">
                      <MemoryStick size={20} strokeWidth={1.5} className="text-info-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{c['limits.card2Title']}</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">{c['limits.card2Body']}</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card2a']}</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card2b']}</span></li>
                    <li className="flex items-center gap-2 text-info-400"><Zap size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card2c']}</span></li>
                  </ul>
                </div>

                {/* Browser compatibility */}
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                      <Globe size={20} strokeWidth={1.5} className="text-primary-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{c['limits.card3Title']}</h3>
                  </div>
                  <p className="text-xs text-surface-400 leading-relaxed mb-3">{c['limits.card3Body']}</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card3a']}</span></li>
                    <li className="flex items-center gap-2 text-success-400"><CheckCheck size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card3b']}</span></li>
                    <li className="flex items-center gap-2 text-warning-400"><AlertTriangle size={13} strokeWidth={2} /><span className="text-surface-300">{c['limits.card3c']}</span></li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-800/30 border border-surface-700/30 flex items-start gap-3">
                <AlertCircle size={16} strokeWidth={2} className="text-surface-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-surface-500 leading-relaxed">
                  <span className="text-surface-400 font-medium">{c['limits.noteLabel']}</span> {c['limits.note']}
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }} aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-white text-center mb-8">{c['faq.heading']}</h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{c['cta.heading']}</h2>
              <p className="text-surface-300 mb-8 text-base max-w-xl mx-auto">
                {c['cta.subtitle']}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={withLocale('/tools')} className="btn-primary btn-lg inline-flex items-center gap-2 group">
                  {c['cta.btn1']}
                  <ArrowRight size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href={withLocale('/how-it-works')} className="btn-secondary btn-lg inline-flex items-center gap-2">
                  {c['cta.btn2']}
                </Link>
              </div>
              <p className="text-xs text-surface-500 mt-5">
                {c['cta.footer']}
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
