import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import Footer from '../components/Footer'
import { defaultLocale, supportedLocales, type AppLocale, normalizeLocale, isSupportedLocale } from '../../i18n/config'
import { TranslationProvider } from '../i18n/TranslationProvider'
import { getMessages } from '../i18n/messages'

const siteUrl = 'https://editorapdf.com'
const siteName = 'EditoraPDF'

// Google Tag Manager Container ID (handled in root layout only)
const GTM_ID = 'GTM-P5DF8WL7'

// Per-locale SEO title & description
const localeSeo: Record<AppLocale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'Edit PDF Online Free - No Installation, No Signup Required | EditoraPDF',
    description: 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing in your browser. No downloads, no signup, 100% free and private.',
    ogLocale: 'en_US',
  },
  uk: {
    title: 'Редагувати PDF онлайн безкоштовно, без встановлення та реєстрації | EditoraPDF',
    description: 'Редагуйте PDF онлайн миттєво без встановлення програм і без створення акаунта. Швидке та потужне редагування PDF у браузері. Без завантажень, без реєстрації, 100% безкоштовно та приватно.',
    ogLocale: 'uk_UA',
  },
  fr: {
    title: 'Éditer PDF en ligne gratuitement - Sans installation ni inscription | EditoraPDF',
    description: 'Modifiez des documents PDF en ligne instantanément sans installer de logiciel ni créer de compte. Édition PDF rapide dans votre navigateur. Sans téléchargement, 100% gratuit et privé.',
    ogLocale: 'fr_FR',
  },
  de: {
    title: 'PDF online kostenlos bearbeiten - Ohne Installation und Anmeldung | EditoraPDF',
    description: 'Bearbeiten Sie PDF-Dokumente sofort online, ohne Software zu installieren oder ein Konto zu erstellen. Schnelle PDF-Bearbeitung im Browser. Ohne Downloads, 100% kostenlos und privat.',
    ogLocale: 'de_DE',
  },
  es: {
    title: 'Editar PDF en línea gratis - Sin instalación ni registro | EditoraPDF',
    description: 'Edite documentos PDF en línea al instante sin instalar software ni crear una cuenta. Edición PDF rápida en su navegador. Sin descargas, 100% gratuito y privado.',
    ogLocale: 'es_ES',
  },
  it: {
    title: 'Modifica PDF online gratis - Senza installazione e registrazione | EditoraPDF',
    description: 'Modifica documenti PDF online istantaneamente senza installare software o creare un account. Modifica PDF rapida nel browser. Senza download, 100% gratuito e privato.',
    ogLocale: 'it_IT',
  },
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale;

  const seo = localeSeo[locale] ?? localeSeo.en;

  // Read x-pathname injected by middleware to build correct canonical + hreflang
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? `/${locale}`;
  // Strip the locale prefix to get the page sub-path (e.g. /fr/about → /about)
  const subPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/').replace(/\/$/, '') || '/';

  // Build per-locale alternate URLs for this specific page
  // x-default points to the root (no locale prefix) — Google's recommended fallback
  const hreflangAlternates: Record<string, string> = {
    'x-default': `${siteUrl}${subPath === '/' ? '' : subPath}`,
    ...Object.fromEntries(
      supportedLocales.map((code) => [code, `${siteUrl}/${code}${subPath === '/' ? '' : subPath}`])
    ),
  };

  const canonical = `${siteUrl}/${locale}${subPath === '/' ? '' : subPath}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${siteName}`,
    },
    description: seo.description,
    openGraph: {
      type: 'website',
      url: canonical,
      title: seo.title,
      description: seo.description,
      siteName,
      locale: seo.ogLocale,
      images: [
        {
          url: `${siteUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: `EditoraPDF - ${seo.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${siteUrl}/og/og-image.png`],
      creator: '@editora_pdf',
      site: '@editora_pdf',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: hreflangAlternates,
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
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale;

  const messages = getMessages(locale);

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <div id="main-content" className="relative min-h-screen flex flex-col">
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
        {children}
        <Footer locale={locale} />
      </div>
    </TranslationProvider>
  )
}
