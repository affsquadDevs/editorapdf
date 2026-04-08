import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import AboutPage from '../../about/page'
import {
  Shield, Zap, Globe, Users, Code, Heart, Target,
  Github, Mail, MessageSquare, Award, Rocket, Eye, FileText, ArrowRight, Sparkles
} from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (params.locale !== 'uk') {
    const mod = await import('../../about/page')
    return mod.metadata
  }

  return {
    title: 'Про нас - безкоштовний PDF-редактор',
    description: 'Дізнайтеся більше про EditoraPDF — безкоштовний онлайн-редактор PDF із фокусом на приватність.',
  }
}

export default function AboutLocalePage({ params }: { params: { locale: string } }) {
  if (params.locale !== 'uk') return <AboutPage />

  const withLocale = (path: string) => `/${params.locale}${path}`

  const values = [
    {
      icon: <Shield size={28} strokeWidth={1.5} className="text-success-400" />,
      title: 'Приватність насамперед',
      description: 'Уся обробка відбувається на вашому пристрої. Ми не бачимо, не зберігаємо і не передаємо ваші документи.',
      color: 'success',
    },
    {
      icon: <Zap size={28} strokeWidth={1.5} className="text-primary-400" />,
      title: 'Миттєвий доступ',
      description: 'Без встановлення, без реєстрації, без очікування. Відкрили сайт і одразу працюєте.',
      color: 'primary',
    },
    {
      icon: <Award size={28} strokeWidth={1.5} className="text-accent-400" />,
      title: '100% безкоштовно',
      description: 'Без прихованих платежів, преміум-рівнів і водяних знаків. Усі основні можливості доступні одразу.',
      color: 'accent',
    },
    {
      icon: <Sparkles size={28} strokeWidth={1.5} className="text-info-400" />,
      title: 'Потужні інструменти',
      description: 'Редагування тексту, анотації, керування сторінками, вставка зображень та інші потрібні функції в одному місці.',
      color: 'info',
    },
    {
      icon: <Globe size={28} strokeWidth={1.5} className="text-warning-400" />,
      title: 'Відкритий код',
      description: 'Код доступний для перегляду, форків і внесків. Ми віримо у прозорість і розвиток через спільноту.',
      color: 'warning',
    },
    {
      icon: <Users size={28} strokeWidth={1.5} className="text-error-400" />,
      title: 'Розвиток через фідбек',
      description: 'Ми прислухаємося до користувачів і покращуємо продукт на основі реальних сценаріїв та пропозицій.',
      color: 'error',
    },
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
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Heart size={16} strokeWidth={2} className="text-primary-400" />
              Створено з повагою до приватності
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Про <span className="text-gradient-animated">EditoraPDF</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Ми робимо роботу з PDF простою, доступною та безкоштовною для всіх.
              Приватність не повинна бути платною функцією.
            </p>
          </div>

          <section className="mb-16 animate-fade-in delay-100" aria-labelledby="what-is-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/5 via-surface-800/60 to-accent-500/5 border-primary-500/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center">
                  <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <h2 id="what-is-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Що таке EditoraPDF?
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    <strong className="text-white">EditoraPDF</strong> — це безкоштовний онлайн-редактор PDF з відкритим кодом, який повністю працює у браузері.
                    На відміну від сервісів, що вимагають встановлення програм або завантажують файли у хмару, EditoraPDF обробляє документи локально на вашому пристрої.
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    Ми поєднали зручний інтерфейс і практичні інструменти, щоб ви могли швидко редагувати PDF без реєстрації, без зайвих кроків і без ризику для конфіденційних файлів.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 animate-fade-in delay-200" aria-labelledby="mission-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-success-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Target size={14} strokeWidth={2} />
                  Наша місія
                </div>
                <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Головна ціль
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center">
                    <Target size={24} strokeWidth={1.5} className="text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Демократизувати редагування PDF</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Ми хочемо, щоб професійні інструменти для PDF були доступні кожному незалежно від бюджету, технічного рівня чи вимог до приватності.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Приватність за дизайном</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Сервіс побудований так, щоб файли залишалися у вас. Без акаунтів, без відправки документів на сервер, без компромісів щодо конфіденційності.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Rocket size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Відкритий код і безкоштовність</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Ми віримо, що якісний PDF-редактор може бути відкритим, прозорим і безкоштовним назавжди. Кожен може переглянути код або долучитися до розвитку.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="values-heading">
            <div className="text-center mb-8">
              <h2 id="values-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                Наші цінності
              </h2>
              <p className="text-surface-400 max-w-2xl mx-auto">
                Принципи, якими ми керуємось у розвитку продукту.
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

          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="technology-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-primary-500/5 border-info-500/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-info-500/15 flex items-center justify-center">
                  <Code size={32} strokeWidth={1.5} className="text-info-400" />
                </div>
                <div className="flex-1">
                  <h2 id="technology-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Сучасний технологічний стек
                  </h2>
                  <p className="text-surface-300 leading-relaxed mb-4 text-base md:text-lg">
                    EditoraPDF використовує сучасні вебтехнології для локальної обробки PDF прямо у браузері. Ми спираємось на <strong className="text-white">PDF.js</strong> для рендерингу і <strong className="text-white">pdf-lib</strong> для редагування.
                  </p>
                  <p className="text-surface-300 leading-relaxed text-base md:text-lg">
                    Інтерфейс побудований на <strong className="text-white">Next.js</strong> і <strong className="text-white">React</strong>, щоб забезпечити швидку роботу на різних пристроях без участі сервера в обробці файлів.
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
                    100% open source і безкоштовно назавжди
                  </h2>
                  <p className="text-surface-300 text-base md:text-lg leading-relaxed mb-5">
                    Код EditoraPDF відкритий, а сам сервіс створено як безкоштовний інструмент для щоденної роботи з PDF. Ви можете переглядати код, надсилати покращення або використовувати проєкт у власних задачах.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <a
                      href="https://github.com/affsquadDevs/editorapdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-md inline-flex items-center gap-2"
                    >
                      <Github size={18} strokeWidth={2} />
                      GitHub
                    </a>
                    <a
                      href="https://github.com/affsquadDevs/editorapdf/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-md inline-flex items-center gap-2"
                    >
                      <MessageSquare size={18} strokeWidth={2} />
                      Повідомити про проблему
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Питання або відгук?</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              Ми будемо раді почути ваш фідбек, ідеї чи повідомлення про помилки.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={withLocale('/contact')} className="btn-primary btn-lg inline-flex items-center gap-2 group">
                <Mail size={20} strokeWidth={2} />
                Зв’язатися з нами
                <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={withLocale('/')} className="btn-secondary btn-lg inline-flex items-center gap-2">
                <FileText size={20} strokeWidth={2} />
                Почати редагування
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

