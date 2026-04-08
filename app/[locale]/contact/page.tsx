import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import ContactPage from '../../contact/page'
import {
  Mail, MessageSquare, ExternalLink, HelpCircle, Shield, FileText,
  Facebook, Instagram, Youtube
} from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (params.locale !== 'uk') {
    const mod = await import('../../contact/page')
    return mod.metadata
  }

  return {
    title: 'Контакти',
    description: 'Зв’яжіться з командою EditoraPDF. Ми допоможемо з питаннями щодо редагування PDF.',
  }
}

export default function ContactLocalePage({ params }: { params: { locale: string } }) {
  if (params.locale !== 'uk') return <ContactPage />

  const withLocale = (path: string) => `/${params.locale}${path}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="max-w-3xl w-full">
          <div className="card p-8 md:p-12">
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <Mail size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Зв’язатися з нами</h1>
              <p className="text-lg text-surface-400">
                Маєте питання, ідеї або відгук? Ми будемо раді відповісти.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-primary-500/5 via-surface-800/30 to-primary-500/5 border-2 border-primary-500/30 hover:border-primary-500/50 transition-all animate-fade-in-up delay-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                  <Mail size={24} strokeWidth={1.5} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">Основна електронна пошта</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-xs font-semibold">
                      Головний канал
                    </span>
                  </div>
                  <p className="text-surface-400 mb-3">
                    Напишіть нам на email, і ми відповімо якомога швидше. Це основний спосіб зв’язку з командою.
                  </p>
                  <a
                    href="mailto:hello@editorapdf.com"
                    className="text-primary-400 hover:text-primary-300 font-semibold text-lg transition-colors inline-flex items-center gap-2 group"
                  >
                    hello@editorapdf.com
                    <ExternalLink size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-800/30 border border-surface-700/50 hover:border-accent-500/30 transition-all animate-fade-in-up delay-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                  <MessageSquare size={24} strokeWidth={1.5} className="text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Ми в соцмережах</h3>
                  <p className="text-surface-400 mb-4">
                    Слідкуйте за новинами, порадами та оновленнями EditoraPDF у наших соцмережах.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/people/Editorapdf/61587362633003/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.instagram.com/editora_pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.youtube.com/@EditoraPDF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-800 hover:bg-primary-500/20 border border-surface-700 hover:border-primary-500/50 flex items-center justify-center text-surface-400 hover:text-primary-400 transition-all group"
                      aria-label="YouTube"
                    >
                      <Youtube size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-800/30 border border-surface-700/50 hover:border-success-500/30 transition-all animate-fade-in-up delay-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/10 flex items-center justify-center">
                  <HelpCircle size={24} strokeWidth={1.5} className="text-success-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Потрібна додаткова інформація?</h3>
                  <p className="text-surface-400 mb-4">
                    Перегляньте наші правила та політики, щоб швидко знайти відповіді на типові питання.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={withLocale('/privacy-policy')} className="text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1 group">
                      <Shield size={14} strokeWidth={2} />
                      Політика конфіденційності
                    </Link>
                    <span className="text-surface-600">•</span>
                    <Link href={withLocale('/terms')} className="text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1 group">
                      <FileText size={14} strokeWidth={2} />
                      Умови використання
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

