import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import { FileText, AlertTriangle, Info, Mail, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Умови використання',
  description: 'Умови та правила використання онлайн-редактора PDF EditoraPDF.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Умови використання</h1>
              <p className="text-surface-400">Останнє оновлення: 30 січня 2026</p>
            </div>

            <div className="not-prose mb-8 p-6 rounded-xl bg-warning-500/10 border-2 border-warning-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-warning-300 mb-2">Важливо: попередження про ризики</h3>
                  <p className="text-sm text-surface-300 leading-relaxed mb-2">
                    <strong>EditoraPDF надається «ЯК Є», без будь-яких гарантій.</strong> Використовуючи сервіс, ви погоджуєтесь, що:
                  </p>
                  <ul className="text-sm text-surface-300 space-y-1.5 ml-4 list-disc">
                    <li>ви використовуєте сервіс на власний ризик;</li>
                    <li>ми не гарантуємо абсолютну точність результатів редагування PDF;</li>
                    <li>під час обробки може виникнути втрата або пошкодження даних;</li>
                    <li>складні PDF можуть відображатися або редагуватися некоректно;</li>
                    <li>ви маєте зберігати резервні копії оригінальних файлів.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="not-prose mb-8 p-6 rounded-xl bg-info-500/10 border border-info-500/30">
              <div className="flex items-start gap-4">
                <Info size={24} strokeWidth={2} className="text-info-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-info-300 mb-2">Безкоштовний сервіс із рекламою</h3>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    EditoraPDF є <strong className="text-white">повністю безкоштовним сервісом</strong>. Для підтримки роботи сайту можуть показуватися сторонні рекламні матеріали, партнерські пропозиції та афілійовані посилання.
                  </p>
                </div>
              </div>
            </div>

            <h2>1. Прийняття умов</h2>
            <p>
              Користуючись EditoraPDF, ви підтверджуєте згоду з цими умовами. Якщо ви не погоджуєтесь з ними, будь ласка, не використовуйте сервіс.
            </p>

            <h2>2. Опис сервісу</h2>
            <p>
              EditoraPDF — це браузерний інструмент для роботи з PDF, який дозволяє переглядати, редагувати, конвертувати, об’єднувати, розділяти та експортувати PDF-файли.
            </p>
            <p>
              Більшість обробки виконується локально у вашому браузері. Ви несете відповідальність за перевірку результатів перед використанням документів.
            </p>

            <h2>3. Правила використання</h2>
            <ul>
              <li>Використовуйте лише файли, на які маєте законні права.</li>
              <li>Завжди зберігайте резервні копії оригіналів.</li>
              <li>Перевіряйте документ після редагування перед надсиланням або публікацією.</li>
              <li>Не використовуйте сервіс у протиправних цілях.</li>
            </ul>

            <h2>4. Обмеження та сумісність</h2>
            <ul>
              <li>Підтримуються PDF-файли; зашифровані/захищені паролем документи можуть не підтримуватись.</li>
              <li>Великі або складні документи можуть працювати повільніше.</li>
              <li>Для коректної роботи потрібен сучасний браузер і увімкнений JavaScript.</li>
            </ul>

            <h2>5. Відмова від гарантій</h2>
            <p>
              Сервіс надається без явних або неявних гарантій, зокрема щодо безперервної роботи, відсутності помилок, комерційної придатності або придатності для конкретної мети.
            </p>

            <h2>6. Обмеження відповідальності</h2>
            <p>
              У межах, дозволених законодавством, EditoraPDF не несе відповідальності за прямі або непрямі збитки, втрату даних, прибутку чи інші наслідки, пов’язані з використанням або неможливістю використання сервісу.
            </p>

            <h2>7. Реклама та сторонні сервіси</h2>
            <p>
              Сайт може використовувати сторонні рекламні/аналітичні сервіси. Ми не несемо відповідальності за вміст або політики сторонніх сайтів, на які ведуть рекламні чи інші посилання.
            </p>

            <h2>8. Інтелектуальна власність</h2>
            <p>
              Права на платформу EditoraPDF належать її власникам. Ви зберігаєте права на власні файли та контент, які обробляєте через сервіс.
            </p>

            <h2>9. Зміни в сервісі та умовах</h2>
            <p>
              Ми можемо оновлювати функціональність сервісу та змінювати ці умови. Актуальна редакція завжди публікується на цій сторінці.
            </p>

            <h2>10. Контакти</h2>
            <p>
              Якщо у вас є питання щодо цих умов, зв’яжіться з нами:
            </p>
            <div className="not-prose bg-surface-800/30 p-6 rounded-xl border border-surface-700/50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={20} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Електронна пошта:</strong>{' '}
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
                    <strong className="text-white">Сторінка контактів:</strong>{' '}
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
                  © 2026 EditoraPDF. Усі права захищено.
                </p>
                <div className="flex gap-4">
                  <Link href="/privacy-policy" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Політика конфіденційності
                  </Link>
                  <Link href="/contact" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Зв’язатися з нами
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
