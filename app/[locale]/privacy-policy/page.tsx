import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import PrivacyPolicyPage from '../../privacy-policy/page'
import { Shield, Mail, ExternalLink, AlertCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (params.locale !== 'uk') {
    const mod = await import('../../privacy-policy/page')
    return mod.metadata
  }

  return {
    title: 'Політика конфіденційності',
    description: 'Дізнайтеся, як EditoraPDF захищає вашу приватність. Уся обробка PDF відбувається локально у браузері.',
  }
}

export default function LocalePrivacyPolicyPage({ params }: { params: { locale: string } }) {
  if (params.locale !== 'uk') return <PrivacyPolicyPage />

  const withLocale = (path: string) => `/${params.locale}${path}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <Shield size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Політика конфіденційності</h1>
              <p className="text-surface-400">Останнє оновлення: 30 січня 2026</p>
            </div>

            <div className="not-prose mb-8 p-6 rounded-xl bg-success-500/10 border border-success-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                  <Shield size={20} strokeWidth={2} className="text-success-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-success-300 mb-2">Ваша приватність для нас пріоритет</h3>
                  <p className="text-surface-300">
                    EditoraPDF обробляє PDF повністю у вашому браузері. Ваші файли не залишають пристрій і не завантажуються на наші сервери.
                  </p>
                </div>
              </div>
            </div>

            <div className="not-prose mb-8 p-5 rounded-xl bg-warning-500/10 border border-warning-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-surface-300 leading-relaxed">
                  <strong className="text-warning-300">Важливо:</strong> сервіс надається для загального використання. Будь ласка, завжди перевіряйте документи після редагування перед офіційним використанням або відправкою.
                </p>
              </div>
            </div>

            <h2>1. Які дані ми збираємо</h2>
            <h3>1.1 Особисті дані</h3>
            <p>
              Ми не вимагаємо реєстрації, створення акаунта чи передачі персональних даних для роботи з основними інструментами EditoraPDF.
            </p>

            <h3>1.2 Ваші PDF-документи</h3>
            <p>
              <strong>Ваші PDF-файли не завантажуються на наші сервери.</strong> Уся обробка відбувається локально у браузері за допомогою JavaScript.
            </p>
            <ul>
              <li>Файл читається безпосередньо з вашого пристрою</li>
              <li>Редагування виконується в пам’яті браузера</li>
              <li>Документ зберігається лише коли ви самі натискаєте «Експорт»</li>
              <li>Вміст файлів не передається на наші сервери</li>
              <li>Ми не можемо переглядати, читати чи зберігати ваші PDF</li>
            </ul>

            <h3>1.3 Технічна інформація</h3>
            <p>
              Під час відвідування сайту може автоматично збиратися технічна інформація, яка не ідентифікує вас напряму:
            </p>
            <ul>
              <li><strong>Інформація про браузер:</strong> тип, версія, мовні налаштування</li>
              <li><strong>Інформація про пристрій:</strong> тип пристрою, операційна система, роздільна здатність екрана</li>
              <li><strong>Дані використання:</strong> переглянуті сторінки, час на сайті, навігаційні дії</li>
              <li><strong>IP-адреса:</strong> може використовуватись для безпеки й аналітики в анонімізованому вигляді</li>
            </ul>

            <h3>1.4 Cookies та схожі технології</h3>
            <p>
              Ми можемо використовувати cookies для правильної роботи сайту, збереження налаштувань мови й аналітики.
            </p>
            <ul>
              <li><strong>Обов’язкові cookies:</strong> потрібні для базової роботи сайту</li>
              <li><strong>Cookies налаштувань:</strong> запам’ятовують мову та окремі параметри</li>
              <li><strong>Аналітичні cookies:</strong> допомагають зрозуміти використання сайту</li>
              <li><strong>Рекламні cookies:</strong> можуть використовуватись для показу релевантної реклами</li>
            </ul>

            <h2>2. Як ми використовуємо інформацію</h2>
            <p>Обмежений обсяг технічних даних використовується для:</p>
            <ul>
              <li>покращення сервісу та інтерфейсу;</li>
              <li>аналізу стабільності і продуктивності;</li>
              <li>захисту від зловживань і шахрайства;</li>
              <li>збереження ваших локальних налаштувань;</li>
              <li>оцінки ефективності сайту та рекламних інтеграцій.</li>
            </ul>

            <h2>3. Сторонні сервіси та реклама</h2>
            <h3>3.1 Google AdSense</h3>
            <p>
              На сайті може використовуватись Google AdSense для показу реклами. Google може застосовувати cookies та інші технології для персоналізації реклами, вимірювання її ефективності і захисту від шахрайства.
            </p>
            <p>
              Ви можете змінити рекламні налаштування на сторінці{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                Google Ad Settings
              </a>.
            </p>

            <h3>3.2 Аналітика</h3>
            <p>
              Ми можемо використовувати інструменти аналітики для розуміння поведінки користувачів на сайті: які сторінки переглядаються, скільки часу триває сесія, з яких пристроїв заходять відвідувачі.
            </p>

            <h3>3.3 Інші сторонні сервіси</h3>
            <p>
              Ми також можемо використовувати сторонню інфраструктуру для хостингу, доставки контенту та захисту сайту. Ці сервіси мають власні політики конфіденційності.
            </p>

            <h2>4. Зберігання даних і безпека</h2>
            <h3>4.1 Локальне зберігання</h3>
            <p>
              Ваш браузер може зберігати локальні налаштування, кеш ресурсів і тимчасовий стан інтерфейсу для швидшої роботи сайту.
            </p>
            <ul>
              <li>рівень масштабування та окремі налаштування інтерфейсу;</li>
              <li>мовні параметри;</li>
              <li>кешовані ресурси застосунку;</li>
              <li>тимчасовий стан поточного редагування.</li>
            </ul>

            <h3>4.2 Серверне зберігання</h3>
            <p>
              Ми не зберігаємо PDF-файли на серверах. За потреби можуть зберігатися лише анонімізовані аналітичні дані, журнали помилок і журнали безпеки.
            </p>

            <h3>4.3 Безпека</h3>
            <p>
              Оскільки документи не завантажуються на сервер, немає ризику компрометації PDF через серверний витік даних. Додатково ми використовуємо HTTPS та базові заходи безпеки сайту.
            </p>

            <h2>5. Термін зберігання даних</h2>
            <ul>
              <li><strong>Аналітичні дані:</strong> можуть зберігатися в агрегованому вигляді до 26 місяців</li>
              <li><strong>Логи помилок:</strong> до 90 днів для діагностики проблем</li>
              <li><strong>Логи безпеки:</strong> до 12 місяців для запобігання зловживанням</li>
              <li><strong>Локальне сховище:</strong> зберігається у вашому браузері, доки ви самі не очистите дані</li>
            </ul>

            <h2>6. Ваші права та вибір</h2>
            <p>
              Залежно від країни проживання ви можете мати право на доступ до інформації про обробку даних, обмеження такої обробки, видалення окремих даних або відмову від персоналізованої реклами.
            </p>
            <p>
              Для запитів щодо конфіденційності звертайтесь на{' '}
              <a href="mailto:hello@affsquad.com" className="text-primary-400 hover:text-primary-300">
                hello@affsquad.com
              </a>.
            </p>

            <h2>7. Cookies та рекламні налаштування</h2>
            <p>
              Ви можете керувати cookies через налаштування браузера. Вимкнення окремих cookies може вплинути на частину функціональності сайту, але основна локальна обробка PDF продовжить працювати.
            </p>

            <h2>8. Конфіденційність дітей</h2>
            <p>
              Сервіс не призначений спеціально для дітей молодше 13 років. Ми свідомо не збираємо персональні дані дітей.
            </p>

            <h2>9. Міжнародні користувачі</h2>
            <p>
              EditoraPDF доступний у різних країнах. Ваші PDF-файли не передаються між країнами, бо обробляються локально у браузері. Водночас сторонні аналітичні чи рекламні сервіси можуть обробляти технічні дані за межами вашої юрисдикції відповідно до власних політик.
            </p>

            <h2>10. Зміни до цієї політики</h2>
            <p>
              Ми можемо періодично оновлювати цю політику конфіденційності через зміни в технологіях, законодавстві або в роботі сервісу. Актуальна версія завжди розміщується на цій сторінці.
            </p>

            <h2>11. Контакти</h2>
            <p>
              Якщо у вас є питання щодо цієї політики або способів обробки даних, зв’яжіться з нами:
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
                    <Link href={withLocale('/contact')} className="text-primary-400 hover:text-primary-300 transition-colors">
                      editorapdf.com/contact
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <p className="mt-4">
              Ми намагаємося відповідати на звернення щодо конфіденційності в розумні строки.
            </p>

            <div className="not-prose mt-12 pt-8 border-t border-surface-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-surface-500">
                  © 2026 EditoraPDF. Ваша приватність має значення.
                </p>
                <div className="flex gap-4">
                  <Link href={withLocale('/terms')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Умови використання
                  </Link>
                  <Link href={withLocale('/contact')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    Контакти
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

