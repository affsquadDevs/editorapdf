import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono, Lexend } from 'next/font/google'
import Script from 'next/script'
import Footer from '../components/Footer'
import { defaultLocale, supportedLocales, type AppLocale, normalizeLocale } from '../../i18n/config'
import { TranslationProvider } from '../i18n/TranslationProvider'

// Primary font - Modern geometric sans
// Optimized for mobile: reduced weights for better performance
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap', // Show fallback font immediately, swap when loaded
  variable: '--font-outfit',
  weight: ['400', '600', '700'], // Reduced weights for mobile performance
})

// Display font - Bold headlines
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabinet',
  weight: ['600', '700'], // Reduced weights for mobile performance
})

// Monospace font - Code & technical elements
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'], // Reduced weights for mobile performance
})

const siteUrl = 'https://editorapdf.com'
const siteName = 'EditoraPDF'
const siteDescription = 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing in your browser. No downloads, no signup, 100% free and private.'
const siteTitle = 'Edit PDF Online Free - No Installation, No Signup Required | EditoraPDF'

// Google Tag Manager Container ID (handled in root layout only)
const GTM_ID = 'GTM-P5DF8WL7'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'EditoraPDF - Professional PDF Editor - Edit PDF documents online instantly without installation or signup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og/og-image.png`],
    creator: '@editora_pdf',
    site: '@editora_pdf',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': `${siteUrl}/en`,
      'en': `${siteUrl}/en`,
      'uk': `${siteUrl}/uk`,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = (supportedLocales.includes(normalizeLocale(params.locale)) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale;

  // Load messages statically (simple import). For large apps, consider dynamic imports.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messages = locale === 'uk' ? require('../../i18n/locales/uk.json') : require('../../i18n/locales/en.json');

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <div id="main-content" className={`relative min-h-screen flex flex-col ${outfit.variable} ${lexend.variable} ${jetbrains.variable}`}>
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
        {children}
        <Footer locale={locale} />
      </div>
    </TranslationProvider>
  )
}

