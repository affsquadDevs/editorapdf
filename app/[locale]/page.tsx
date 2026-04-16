import Link from 'next/link';
import Script from 'next/script';
import { generateFAQSchema } from '../data/faq';
import LazyFAQ from '../components/LazyFAQ';
import Header from '../components/Header';
import {
  FilePlus2, Scissors, GripVertical, RotateCw, Trash2,
  Lock, PenTool, EyeOff,
  Image, FileText, Table, Code, AlignLeft,
  Minimize2, Droplets, ListOrdered, QrCode, Crop,
  ArrowRight, Shield, Zap, Globe, Sparkles,
  AlertCircle, PenSquare,
} from 'lucide-react';

import type { AppLocale } from '../../i18n/config';
import { getMessages } from '../i18n/messages';

const siteUrl = 'https://editorapdf.com';

export default function Home({ params }: { params: { locale: AppLocale } }) {
  const locale = params.locale;
  const messages = getMessages(locale) as Record<string, string>;
  const t = (k: string) => messages[k] ?? k;
  const isUk = locale === 'uk';
  const withLocale = (path: string) => `/${locale}${path}`;

  // FAQ Schema for SEO - Generated from reusable data
  const faqSchema = generateFAQSchema(siteUrl, isUk ? 'uk' : 'en');

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isUk ? 'Як редагувати PDF онлайн з EditoraPDF' : 'How to Edit a PDF Online with EditoraPDF',
    description: isUk
      ? 'Покрокова інструкція з редагування PDF в EditoraPDF, безкоштовному браузерному PDF-редакторі'
      : 'Step-by-step guide to editing PDFs using EditoraPDF, a free browser-based PDF editor',
    image: `${siteUrl}/og/og-image.png`,
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: isUk ? 'Відкрийте свій PDF' : 'Open Your PDF',
        text: isUk
          ? 'Натисніть «Редагувати PDF» або перетягніть PDF-файл. EditoraPDF підтримує файли до 25 МБ і обробляє все локально у вашому браузері.'
          : 'Click "Edit PDF" or drag and drop your PDF file. EditoraPDF supports files up to 25MB and processes everything locally in your browser.',
        image: `${siteUrl}/screenshot-desktop.png`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: isUk ? 'Навігація та перегляд' : 'Navigate and View',
        text: isUk
          ? 'Використовуйте панель мініатюр для переходу між сторінками. Користуйтеся масштабуванням для зміни вигляду.'
          : 'Use the thumbnail sidebar to navigate between pages. Use zoom controls to adjust the view.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: isUk ? 'Редагуйте текст' : 'Edit Text',
        text: isUk
          ? 'Натисніть на наявний текст, щоб редагувати його. Можна змінювати вміст, розмір, колір і позицію. Інструмент «Текст» додає новий текст у будь-якому місці сторінки.'
          : 'Click on any existing text to edit it. You can change the content, size, color, or position. Use the Text tool to add new text anywhere on the page.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: isUk ? 'Додавайте зображення і фігури' : 'Add Images and Shapes',
        text: isUk
          ? 'Інструмент «Зображення» додає картинки, а інструмент «Фігура» дозволяє малювати прямокутники, кола, лінії, стрілки та виділення.'
          : 'Use the Image tool to add pictures, or the Shape tool to draw rectangles, circles, lines, arrows, or highlights.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: isUk ? 'Керуйте сторінками' : 'Manage Pages',
        text: isUk
          ? 'Повертайте, видаляйте та змінюйте порядок сторінок за допомогою панелі інструментів. Перетягуйте мініатюри для перевпорядкування.'
          : 'Rotate, delete, or reorder pages using the toolbar controls. Drag thumbnails to reorder pages.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: isUk ? 'Експортуйте PDF' : 'Export Your PDF',
        text: isUk
          ? 'Натисніть кнопку експорту, щоб завантажити відредагований PDF з усіма змінами. Файл буде збережено на ваш пристрій.'
          : 'Click the Export button to download your edited PDF with all changes applied. The file will be saved to your device.',
      },
    ],
  };

  // Review Schema for SEO
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isUk ? 'PDF-редактор EditoraPDF' : 'EditoraPDF PDF Editor',
    description: isUk
      ? 'Безкоштовний PDF-редактор із фокусом на приватність, який повністю працює у вашому браузері'
      : 'Free, privacy-focused PDF editor that runs entirely in your browser',
    brand: {
      '@type': 'Brand',
      name: 'EditoraPDF',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        datePublished: '2024-01-15',
        reviewBody: isUk
          ? 'Чудовий інструмент! Мені подобається, що файли не залишають мій комп’ютер. Саме таке редагування тексту мені й було потрібне.'
          : 'Amazing tool! I love that my files never leave my computer. The text editing feature is exactly what I needed.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'John D.',
        },
        datePublished: '2024-01-20',
        reviewBody: isUk
          ? 'Ідеально для швидких правок PDF. Без реєстрації, працює офлайн і повністю безкоштовно. Дуже рекомендую!'
          : 'Perfect for quick PDF edits. No signup required, works offline, and completely free. Highly recommend!',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };

  // WebApplication Schema - ONLY on actual tool page
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteUrl}/#webapp`,
    name: 'EditoraPDF',
    alternateName: isUk ? 'EditoraPDF онлайн PDF-редактор' : 'EditoraPDF Online PDF Editor',
    url: siteUrl,
    description: isUk
      ? 'Редагуйте PDF онлайн миттєво без встановлення програм і без створення акаунта. Швидке та потужне редагування PDF прямо у браузері з повною приватністю.'
      : 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing directly in your browser with complete privacy.',
    applicationCategory: isUk ? 'BusinessApplication' : 'BusinessApplication',
    applicationSubCategory: isUk ? 'PDF-редактор' : 'PDF Editor',
    operatingSystem: 'Any',
    browserRequirements: isUk
      ? 'Потрібен сучасний браузер (Chrome, Edge, Firefox, Safari) з увімкненим JavaScript.'
      : 'Requires a modern browser (Chrome, Edge, Firefox, Safari). JavaScript enabled.',
    softwareVersion: '1.0.0',
    releaseNotes: isUk
      ? 'Безкоштовний онлайн PDF-редактор з миттєвим доступом. Без встановлення, без реєстрації, без завантажень. Редагуйте PDF прямо у браузері.'
      : 'Free online PDF editor with instant access. No installation, no signup, no downloads required. Edit PDFs directly in your browser.',
    isAccessibleForFree: true,
    offers: [
      {
        '@type': 'Offer',
        '@id': `${siteUrl}/#free-offer`,
        name: isUk ? 'Безкоштовне редагування PDF' : 'Free PDF Editing',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: isUk ? 'Безкоштовно' : 'Free',
        url: siteUrl,
      },
    ],
    featureList: [
      ...(isUk
        ? [
            'Миттєвий доступ без встановлення і реєстрації',
            'Працює повністю у браузері без завантажень',
            'Пряме редагування тексту та вмісту PDF',
            'Додавання, видалення та перевпорядкування сторінок',
            'Поворот і видалення сторінок',
            'Анотації PDF: виділення, малювання, нотатки',
            'Додавання фігур, штампів і зображень',
            'Заповнення форм і додавання текстових накладок',
            'Миттєвий експорт і завантаження оновленого PDF',
            '100% приватність: вся обробка на вашому пристрої',
          ]
        : [
            'Instant access - no installation or signup required',
            'Works entirely in your browser - no downloads',
            'Edit PDF text and content directly',
            'Add, remove, and reorder pages',
            'Rotate and delete pages',
            'Annotate PDFs (highlight, draw, add notes)',
            'Add shapes, stamps, and images',
            'Fill forms and add text overlays',
            'Export and download updated PDF instantly',
            '100% private - all processing on your device',
          ]),
    ],
    permissions: isUk ? 'Спеціальні дозволи не потрібні.' : 'No special permissions required.',
    inLanguage: [locale],
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    creator: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
    },
    image: [
      `${siteUrl}/og/og-image.png`,
    ],
    screenshot: [
      {
        '@type': 'ImageObject',
        url: `${siteUrl}/screenshots/editor.png`,
      },
    ],
    softwareHelp: {
      '@type': 'CreativeWork',
      name: isUk ? 'Контакти' : 'Contact',
      url: `${siteUrl}/${locale}/contact`,
    },
    privacyPolicy: `${siteUrl}/${locale}/privacy-policy`,
    termsOfService: `${siteUrl}/${locale}/terms`,
    audience: {
      '@type': 'Audience',
      audienceType: isUk
        ? ['Студенти', 'Професіонали', 'Малий бізнес', 'Широка аудиторія']
        : ['Students', 'Professionals', 'Small Business', 'General Public'],
    },
    potentialAction: [
      {
        '@type': 'UseAction',
        name: isUk ? 'Редагувати PDF' : 'Edit a PDF',
        target: `${siteUrl}/${locale}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data Scripts - Load after page is interactive to improve TBT */}
      <Script
        id="jsonld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-review"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        strategy="lazyOnload"
      />
      
      {/* Google AdSense - Load only on homepage after page is interactive */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2980943706375055"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      
      <main className="min-h-screen flex flex-col" role="main">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 ">
          <div className="max-w-5xl w-full">
            {/* Hero Section */}
            <section className="relative mb-16 animate-fade-in" aria-labelledby="hero-heading">
              {/* Hero Card Container */}
              <div className="relative card p-8 md:p-12 lg:p-16 bg-gradient-to-br from-surface-800/80 via-surface-800/60 to-surface-900/80 border-primary-500/20 backdrop-blur-sm md:backdrop-blur-xl overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>
                
                <div className="relative z-10 text-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6 shadow-lg shadow-primary-500/10 animate-fade-in-up delay-100" role="status">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <span className="hidden sm:inline">{t('hero.badgePrefix')}</span>{t('hero.badgeTail')}
                  </div>
                  
                  {/* Main Heading */}
                  <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-200">
                    {t('hero.title.leading')}{' '}
                    <span className="text-gradient-animated">{t('hero.title.trailing')}</span>
                    <br className="hidden sm:block" />
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-200">{t('hero.noSoftware')}</span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-surface-300 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-300">
                    {t('hero.desc')}
                    <br className="hidden md:block" />
                    <span className="text-base md:text-lg text-surface-400">{t('hero.subdesc')}</span>
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8 text-sm text-surface-400 animate-fade-in-up delay-400">
                    <div className="flex items-center gap-2">
                      <Shield size={20} strokeWidth={2} className="text-success-400" />
                      <span className="font-medium text-surface-300">{t('trust.free')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={20} strokeWidth={2} className="text-primary-400" />
                      <span className="font-medium text-surface-300">{t('trust.private')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={20} strokeWidth={2} className="text-accent-400" />
                      <span className="font-medium text-surface-300">{t('trust.instant')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={20} strokeWidth={2} className="text-success-400" />
                      <span className="font-medium text-surface-300">{t('trust.noUpload')}</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>
            
            {/* PDF Tools Section */}
            <section className="mb-16 animate-fade-in delay-300" aria-labelledby="pdftools-heading">
              <div className="relative card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-primary-500/5 border-accent-500/15 overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary-500/8 rounded-full blur-3xl translate-y-1/2" aria-hidden="true"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-success-500/5 rounded-full blur-3xl" aria-hidden="true"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-500"></span>
                      </span>
                      {t('badge.tools')}
                    </div>
                    <h2 id="pdftools-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t('section.completeToolkit')}
                    </h2>
                    <p className="text-surface-400 text-base max-w-2xl mx-auto">
                      {t('section.subtitle')}
                    </p>
                  </div>

                  {/* Category rows */}
                  <div className="space-y-6 mb-8">

                    {/* Row 1: Organize & Pages */}
                    {(() => {
                      const tools = [
                        { title: t('tools.merge.title'), desc: t('tools.merge.desc'), color: 'primary', icon: <FilePlus2 size={20} strokeWidth={1.5} /> },
                        { title: t('tools.split.title'), desc: t('tools.split.desc'), color: 'accent', icon: <Scissors size={20} strokeWidth={1.5} /> },
                        { title: t('tools.reorder.title'), desc: t('tools.reorder.desc'), color: 'warning', icon: <GripVertical size={20} strokeWidth={1.5} /> },
                        { title: t('tools.rotate.title'), desc: t('tools.rotate.desc'), color: 'info', icon: <RotateCw size={20} strokeWidth={1.5} /> },
                        { title: t('tools.delete.title'), desc: t('tools.delete.desc'), color: 'error', icon: <Trash2 size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <GripVertical size={16} strokeWidth={1.5} className="text-primary-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">{t('section.organize')}</span>
                            <span className="text-[10px] text-surface-600 ml-auto">{t('home.count.organize')}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href={withLocale('/tools')} className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${300 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 2: Security & Protection */}
                    {(() => {
                      const tools = [
                        { title: t('tools.sign.title'), desc: t('tools.sign.desc'), color: 'primary', icon: <PenTool size={20} strokeWidth={1.5} /> },
                        { title: t('tools.redact.title'), desc: t('tools.redact.desc'), color: 'error', icon: <EyeOff size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Shield size={16} strokeWidth={1.5} className="text-success-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">{t('section.security')}</span>
                            <span className="text-[10px] text-surface-600 ml-auto">{t('home.count.security')}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href={withLocale('/edit?tab=tools')} className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${500 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 3: Convert */}
                    {(() => {
                      const tools = [
                        { title: t('tools.pdfToImages.title'), desc: t('tools.pdfToImages.desc'), color: 'accent', icon: <Image size={20} strokeWidth={1.5} /> },
                        { title: t('tools.pdfToWord.title'), desc: t('tools.pdfToWord.desc'), color: 'info', icon: <FileText size={20} strokeWidth={1.5} /> },
                        { title: t('tools.pdfToExcel.title'), desc: t('tools.pdfToExcel.desc'), color: 'success', icon: <Table size={20} strokeWidth={1.5} /> },
                        { title: t('tools.pdfToHtml.title'), desc: t('tools.pdfToHtml.desc'), color: 'error', icon: <Code size={20} strokeWidth={1.5} /> },
                        { title: t('tools.pdfToText.title'), desc: t('tools.pdfToText.desc'), color: 'warning', icon: <AlignLeft size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ArrowRight size={16} strokeWidth={1.5} className="text-accent-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">{t('section.convert')}</span>
                            <span className="text-[10px] text-surface-600 ml-auto">{t('home.count.convert')}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href={withLocale('/edit?tab=tools')} className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${650 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 4: Edit & Content */}
                    {(() => {
                      const tools = [
                        { title: t('tools.compress.title'), desc: t('tools.compress.desc'), color: 'success', icon: <Minimize2 size={20} strokeWidth={1.5} /> },
                        { title: t('tools.watermark.title'), desc: t('tools.watermark.desc'), color: 'info', icon: <Droplets size={20} strokeWidth={1.5} /> },
                        { title: t('tools.pageNumbers.title'), desc: t('tools.pageNumbers.desc'), color: 'primary', icon: <ListOrdered size={20} strokeWidth={1.5} /> },
                        { title: t('tools.qr.title'), desc: t('tools.qr.desc'), color: 'accent', icon: <QrCode size={20} strokeWidth={1.5} /> },
                        { title: t('tools.crop.title'), desc: t('tools.crop.desc'), color: 'warning', icon: <Crop size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} strokeWidth={1.5} className="text-info-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">{t('section.edit')}</span>
                            <span className="text-[10px] text-surface-600 ml-auto">{t('home.count.edit')}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href={withLocale('/edit?tab=tools')} className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${800 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Link
                      href={withLocale('/tools')}
                      className="btn-primary btn-md inline-flex"
                    >
                      {t('hero.exploreTools')}
                      <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <p className="text-xs text-surface-500 mt-3">
                      {t('cta.subline')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-white mb-6 col-span-full text-center">{t('features.why')}</h2>
              {[
                {
                  icon: <Zap size={28} strokeWidth={1.5} className="text-primary-400" />,
                  title: t('features.instant.title'),
                  description: t('features.instant.desc'),
                },
                {
                  icon: <PenSquare size={28} strokeWidth={1.5} className="text-accent-400" />,
                  title: t('features.full.title'),
                  description: t('features.full.desc'),
                },
                {
                  icon: <Shield size={28} strokeWidth={1.5} className="text-success-400" />,
                  title: t('features.private.title'),
                  description: t('features.private.desc'),
                },
              ].map((feature, index) => (
                <article
                  key={feature.title}
                  className="feature-card animate-fade-in-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="feature-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </article>
              ))}
            </section>

            {/* Limitations Notice */}
            <aside className="card p-5 border-warning-500/20 bg-warning-500/5 animate-fade-in delay-500" aria-labelledby="limitations-heading">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center" aria-hidden="true">
                  <AlertCircle size={20} strokeWidth={2} className="text-warning-400" />
                </div>
                <div>
                  <h4 id="limitations-heading" className="font-semibold text-warning-300 mb-2">{t('limits.title')}</h4>
                  <ul className="text-sm text-surface-400 space-y-1.5" role="list">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      {t('limits.size')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      {t('limits.pages')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      {t('limits.forms')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      {t('limits.encrypted')}
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Open Source Section */}
            <section className="mt-16 animate-fade-in delay-500" aria-labelledby="opensource-heading">
              <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/5 via-surface-800/60 to-accent-500/5 border-primary-500/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Icon/Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-primary-500/20 border-2 border-primary-500/40 flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 id="opensource-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t('oss.title')}
                    </h2>
                    <p className="text-surface-300 text-base md:text-lg leading-relaxed mb-5">
                      {t('oss.desc')}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                      <a
                        href="https://github.com/affsquadDevs/editorapdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-md"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        {t('oss.view')}
                      </a>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn-md"
                      >
                        {t('oss.issue')}
                      </a>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf#readme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn-md"
                      >
                        {t('oss.docs')}
                      </a>
                    </div>
                    
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-5 justify-center md:justify-start">
                      <span className="text-xs text-surface-400 font-medium">{t('home.builtWith')}</span>
                      {['Next.js', 'TypeScript', 'React', 'PDF.js', 'pdf-lib', 'Zustand', 'Tailwind'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-surface-700/50 border border-surface-600/50 text-xs text-surface-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section (lazy on scroll to reduce initial JS on mobile) */}
            <div className="mt-20 animate-fade-in delay-600">
              <LazyFAQ />
            </div>
          </div>
        </div>
    </main>
    </>
  );
}
