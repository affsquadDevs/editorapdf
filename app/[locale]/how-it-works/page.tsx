import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import {
  Upload, FileText, Edit3, Download, Shield, Zap,
  Globe, Lock, CheckCircle2, ArrowRight, Sparkles,
  FileCheck, Image as ImageIcon, PenTool, RotateCw,
  Trash2, GripVertical, Eye, Clock, Server
} from 'lucide-react'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { getMessages } from '../../i18n/messages'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key

  return {
    title: t('nav.how') + ' | EditoraPDF',
    description: t('hiw.subtitle'),
  }
}

export default function HowItWorksLocalePage({ params }: { params: { locale: string } }) {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? messages[`${key}`] ?? ''
  const withLocale = (path: string) => `/${locale}${path}`

  const steps = [
    {
      step: 1,
      title: t('hiw.step1.title'),
      description: t('hiw.step1.desc'),
      icon: <Upload size={32} strokeWidth={1.5} />,
      color: 'primary',
      features: [t('hiw.step1.f1'), t('hiw.step1.f2'), t('hiw.step1.f3'), t('hiw.step1.f4')]
    },
    {
      step: 2,
      title: t('hiw.step2.title'),
      description: t('hiw.step2.desc'),
      icon: <Edit3 size={32} strokeWidth={1.5} />,
      color: 'accent',
      features: [t('hiw.step2.f1'), t('hiw.step2.f2'), t('hiw.step2.f3'), t('hiw.step2.f4')]
    },
    {
      step: 3,
      title: t('hiw.step3.title'),
      description: t('hiw.step3.desc'),
      icon: <Download size={32} strokeWidth={1.5} />,
      color: 'success',
      features: [t('hiw.step3.f1'), t('hiw.step3.f2'), t('hiw.step3.f3'), t('hiw.step3.f4')]
    },
  ]

  const colorClasses: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
    primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20', iconBg: 'bg-primary-500/15', text: 'text-primary-400' },
    accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20', iconBg: 'bg-accent-500/15', text: 'text-accent-400' },
    success: { bg: 'bg-success-500/5', border: 'border-success-500/20', iconBg: 'bg-success-500/15', text: 'text-success-400' },
  }

  const features = [
    { icon: <Zap size={24} strokeWidth={1.5} className="text-primary-400" />, title: t('hiw.feat1.title'), description: t('hiw.feat1.desc') },
    { icon: <Shield size={24} strokeWidth={1.5} className="text-success-400" />, title: t('hiw.feat2.title'), description: t('hiw.feat2.desc') },
    { icon: <Globe size={24} strokeWidth={1.5} className="text-accent-400" />, title: t('hiw.feat3.title'), description: t('hiw.feat3.desc') },
    { icon: <Lock size={24} strokeWidth={1.5} className="text-info-400" />, title: t('hiw.feat4.title'), description: t('hiw.feat4.desc') },
    { icon: <Server size={24} strokeWidth={1.5} className="text-warning-400" />, title: t('hiw.feat5.title'), description: t('hiw.feat5.desc') },
    { icon: <FileCheck size={24} strokeWidth={1.5} className="text-error-400" />, title: t('hiw.feat6.title'), description: t('hiw.feat6.desc') },
  ]

  const tools = [
    { icon: <FileText size={20} strokeWidth={1.5} />, name: t('hiw.tool1.name'), desc: t('hiw.tool1.desc') },
    { icon: <ImageIcon size={20} strokeWidth={1.5} />, name: t('hiw.tool2.name'), desc: t('hiw.tool2.desc') },
    { icon: <PenTool size={20} strokeWidth={1.5} />, name: t('hiw.tool3.name'), desc: t('hiw.tool3.desc') },
    { icon: <RotateCw size={20} strokeWidth={1.5} />, name: t('hiw.tool4.name'), desc: t('hiw.tool4.desc') },
    { icon: <Trash2 size={20} strokeWidth={1.5} />, name: t('hiw.tool5.name'), desc: t('hiw.tool5.desc') },
    { icon: <GripVertical size={20} strokeWidth={1.5} />, name: t('hiw.tool6.name'), desc: t('hiw.tool6.desc') },
    { icon: <Eye size={20} strokeWidth={1.5} />, name: t('hiw.tool7.name'), desc: t('hiw.tool7.desc') },
    { icon: <Clock size={20} strokeWidth={1.5} />, name: t('hiw.tool8.name'), desc: t('hiw.tool8.desc') },
    { icon: <FileCheck size={20} strokeWidth={1.5} />, name: t('hiw.tool9.name'), desc: t('hiw.tool9.desc') },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Zap size={16} strokeWidth={2} className="text-primary-400" />
              {t('hiw.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {t('hiw.h1.part1')}{' '}
              <span className="text-gradient-animated">{t('hiw.h1.highlight')}</span>
              {t('hiw.h1.part2') ? <> {t('hiw.h1.part2')}</> : null}
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              {t('hiw.subtitle')}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((item, index) => {
              const c = colorClasses[item.color] || colorClasses.primary
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
                      <span className={`${c.text} font-bold text-sm uppercase tracking-wider`}>
                        {t('hiw.step.prefix')} {item.step}
                      </span>
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
              )
            })}
          </div>

          {/* Features */}
          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="features-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-primary-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={14} strokeWidth={2} />
                  {t('hiw.feat.badge')}
                </div>
                <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {t('hiw.feat.title')}
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  {t('hiw.feat.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
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

          {/* Tools section */}
          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="tools-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-primary-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <h2 id="tools-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {t('hiw.tools.title')}
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  {t('hiw.tools.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool, index) => (
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

          {/* Technical section */}
          <section className="mb-16 animate-fade-in delay-600" aria-labelledby="technical-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-success-500/5 border-info-500/20">
              <h2 id="technical-heading" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                {t('hiw.tech.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-info-500/15 flex items-center justify-center">
                    <Server size={24} strokeWidth={1.5} className="text-info-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('hiw.tech1.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('hiw.tech1.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('hiw.tech2.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('hiw.tech2.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Zap size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('hiw.tech3.title')}</h3>
                    <p className="text-surface-400 leading-relaxed">{t('hiw.tech3.desc')}</p>
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
                    {t('hiw.limits.title')}
                  </h3>
                  <ul className="text-sm text-surface-400 space-y-2" role="list">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>{t('hiw.limit1')}</span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>{t('hiw.limit2')}</span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>{t('hiw.limit3')}</span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>{t('hiw.limit4')}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('hiw.cta.title')}</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              {t('hiw.cta.desc')}
            </p>
            <Link href={withLocale('/')} className="btn-primary btn-lg inline-flex items-center gap-2 group">
              <Edit3 size={20} strokeWidth={2} />
              {t('hiw.cta.btn')}
              <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs text-surface-500 mt-4">
              {t('hiw.cta.subline')}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
