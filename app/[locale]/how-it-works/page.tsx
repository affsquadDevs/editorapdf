import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import HowItWorksPage from '../../../how-it-works/page'
import {
  Upload, FileText, Edit3, Download, Shield, Zap,
  Globe, Lock, CheckCircle2, ArrowRight, Sparkles,
  FileCheck, Image as ImageIcon, PenTool, RotateCw,
  Trash2, GripVertical, Eye, Clock, Server
} from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (params.locale !== 'uk') {
    const mod = await import('../../../how-it-works/page')
    return mod.metadata
  }

  return {
    title: 'Як це працює - просте редагування PDF',
    description: 'Дізнайтеся, як працює EditoraPDF: швидке, просте та безпечне редагування PDF у браузері.',
  }
}

export default function HowItWorksLocalePage({ params }: { params: { locale: string } }) {
  if (params.locale !== 'uk') return <HowItWorksPage />

  const withLocale = (path: string) => `/${params.locale}${path}`

  const steps = [
    {
      step: 1,
      title: 'Завантажте PDF',
      description: 'Натисніть «Редагувати PDF» або перетягніть файл прямо в редактор. EditoraPDF підтримує файли до 25 МБ і обробляє все локально у браузері без завантаження на сервер.',
      icon: <Upload size={32} strokeWidth={1.5} />,
      color: 'primary',
      features: ['Підтримка drag & drop', 'Файли до 25 МБ', 'Миттєва обробка', 'Без серверних завантажень']
    },
    {
      step: 2,
      title: 'Редагуйте документ',
      description: 'Змінюйте текст, додавайте зображення, робіть анотації, перевпорядковуйте, повертайте та видаляйте сторінки. Усі інструменти працюють безпосередньо у браузері з миттєвим прев’ю.',
      icon: <Edit3 size={32} strokeWidth={1.5} />,
      color: 'accent',
      features: ['Редагування тексту', 'Зображення та фігури', 'Керування сторінками', 'Перегляд змін у реальному часі']
    },
    {
      step: 3,
      title: 'Експортуйте та завантажте',
      description: 'Натисніть «Експорт», щоб одразу отримати готовий PDF з усіма змінами. Документ залишається на вашому пристрої весь час.',
      icon: <Download size={32} strokeWidth={1.5} />,
      color: 'success',
      features: ['Миттєве завантаження', 'Усі зміни збережені', 'Оригінальна якість', 'Без водяних знаків']
    },
  ]

  const colorClasses: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
    primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20', iconBg: 'bg-primary-500/15', text: 'text-primary-400' },
    accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20', iconBg: 'bg-accent-500/15', text: 'text-accent-400' },
    success: { bg: 'bg-success-500/5', border: 'border-success-500/20', iconBg: 'bg-success-500/15', text: 'text-success-400' },
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6">
              <Zap size={16} strokeWidth={2} className="text-primary-400" />
              Просто і швидко
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Як <span className="text-gradient-animated">працює</span> EditoraPDF
            </h1>
            <p className="text-lg md:text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Редагуйте PDF онлайн за секунди без встановлення програм і без реєстрації.
              Усе відбувається прямо у браузері, а файли не залишають ваш пристрій.
            </p>
          </div>

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
                      <span className={`${c.text} font-bold text-sm uppercase tracking-wider`}>КРОК {item.step}</span>
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

          <section className="mb-16 animate-fade-in delay-300" aria-labelledby="features-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-primary-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={14} strokeWidth={2} />
                  Ключові переваги
                </div>
                <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Чим EditoraPDF відрізняється
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  Усе необхідне для редагування PDF у браузері, безкоштовно і без компромісів щодо приватності.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Zap size={24} strokeWidth={1.5} className="text-primary-400" />, title: 'Миттєва обробка', description: 'Без черг і очікування. PDF готовий до редагування одразу після відкриття.' },
                  { icon: <Shield size={24} strokeWidth={1.5} className="text-success-400" />, title: '100% приватність', description: 'Усі дії виконуються на вашому пристрої. Файли не надсилаються на сервер.' },
                  { icon: <Globe size={24} strokeWidth={1.5} className="text-accent-400" />, title: 'Без встановлення', description: 'Працює в сучасних браузерах без плагінів і окремих програм.' },
                  { icon: <Lock size={24} strokeWidth={1.5} className="text-info-400" />, title: 'Без реєстрації', description: 'Починайте роботу одразу без акаунтів, email і паролів.' },
                  { icon: <Server size={24} strokeWidth={1.5} className="text-warning-400" />, title: 'Підтримка офлайн-режиму', description: 'Після завантаження сторінки інструмент може працювати без інтернету.' },
                  { icon: <FileCheck size={24} strokeWidth={1.5} className="text-error-400" />, title: 'Без водяних знаків', description: 'Завантажуйте готові PDF без обмежень і зайвих позначок.' },
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

          <section className="mb-16 animate-fade-in delay-500" aria-labelledby="tools-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-primary-500/5 border-accent-500/20">
              <div className="text-center mb-8">
                <h2 id="tools-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Інструменти редактора
                </h2>
                <p className="text-surface-400 max-w-2xl mx-auto">
                  Основні можливості для професійної роботи з PDF в одному інтерфейсі.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: <FileText size={20} strokeWidth={1.5} />, name: 'Редагування тексту', desc: 'Змінюйте наявний текст або додавайте новий' },
                  { icon: <ImageIcon size={20} strokeWidth={1.5} />, name: 'Додавання зображень', desc: 'Вставляйте зображення зі свого пристрою' },
                  { icon: <PenTool size={20} strokeWidth={1.5} />, name: 'Фігури та анотації', desc: 'Стрілки, виділення, фігури та інше' },
                  { icon: <RotateCw size={20} strokeWidth={1.5} />, name: 'Поворот сторінок', desc: 'Поворот сторінок у кілька кліків' },
                  { icon: <Trash2 size={20} strokeWidth={1.5} />, name: 'Видалення сторінок', desc: 'Швидко прибирайте непотрібні сторінки' },
                  { icon: <GripVertical size={20} strokeWidth={1.5} />, name: 'Зміна порядку', desc: 'Перетягуйте сторінки для нового порядку' },
                  { icon: <Eye size={20} strokeWidth={1.5} />, name: 'Навігація по сторінках', desc: 'Зручний перегляд через мініатюри' },
                  { icon: <Clock size={20} strokeWidth={1.5} />, name: 'Миттєве прев’ю', desc: 'Бачите зміни одразу під час редагування' },
                  { icon: <FileCheck size={20} strokeWidth={1.5} />, name: 'Збереження якості', desc: 'Підтримується висока якість документа' },
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

          <section className="mb-16 animate-fade-in delay-600" aria-labelledby="technical-heading">
            <div className="card p-8 md:p-10 bg-gradient-to-br from-info-500/5 via-surface-800/60 to-success-500/5 border-info-500/20">
              <h2 id="technical-heading" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Технічно це працює так
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-info-500/15 flex items-center justify-center">
                    <Server size={24} strokeWidth={1.5} className="text-info-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Локальна обробка</h3>
                    <p className="text-surface-400 leading-relaxed">
                      EditoraPDF використовує PDF.js і pdf-lib, які працюють прямо у браузері. Розбір, редагування і створення PDF виконуються локально.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center">
                    <Shield size={24} strokeWidth={1.5} className="text-success-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Приватність за замовчуванням</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Оскільки все працює локально, ніхто не має доступу до ваших файлів. Ми не зберігаємо й не аналізуємо PDF-документи.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center">
                    <Zap size={24} strokeWidth={1.5} className="text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Швидко та ефективно</h3>
                    <p className="text-surface-400 leading-relaxed">
                      Сучасний фронтенд забезпечує швидке завантаження, плавну роботу та комфортне редагування навіть на не найновіших пристроях.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 animate-fade-in delay-700" aria-labelledby="limitations-heading">
            <div className="card p-6 border-warning-500/20 bg-warning-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                  <FileText size={20} strokeWidth={2} className="text-warning-400" />
                </div>
                <div className="flex-1">
                  <h3 id="limitations-heading" className="font-semibold text-warning-300 mb-3 text-lg">
                    Поточні обмеження
                  </h3>
                  <ul className="text-sm text-surface-400 space-y-2" role="list">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>Максимальний розмір файлу: <strong className="text-surface-300">25 МБ</strong></span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>Найкраще працює з документами до <strong className="text-surface-300">50 сторінок</strong></span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>Складні PDF із формами можуть відображатися неідеально</span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning-400 mt-1.5 flex-shrink-0" /><span>Зашифровані або захищені паролем PDF поки не підтримуються</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center card p-8 md:p-12 bg-gradient-to-br from-primary-500/10 via-surface-800/60 to-accent-500/10 border-primary-500/20 animate-fade-in delay-800">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Готові почати?</h2>
            <p className="text-surface-300 mb-6 text-lg max-w-2xl mx-auto">
              Починайте редагувати PDF онлайн вже зараз: без реєстрації, без встановлення, безкоштовно та приватно.
            </p>
            <Link href={withLocale('/')} className="btn-primary btn-lg inline-flex items-center gap-2 group">
              <Edit3 size={20} strokeWidth={2} />
              Редагувати PDF зараз
              <ArrowRight size={20} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs text-surface-500 mt-4">
              100% безкоштовно • Без реєстрації • Обробка на вашому пристрої
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

