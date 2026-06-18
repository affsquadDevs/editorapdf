import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
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
    title: 'Edit PDF Online Free - No Installation, No Signup Required',
    description: 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing in your browser. No downloads, no signup, 100% free and private.',
    ogLocale: 'en_US',
  },
  uk: {
    title: 'Редагувати PDF онлайн безкоштовно, без встановлення та реєстрації',
    description: 'Редагуйте PDF онлайн миттєво без встановлення програм і без створення акаунта. Швидке та потужне редагування PDF у браузері. Без завантажень, без реєстрації, 100% безкоштовно та приватно.',
    ogLocale: 'uk_UA',
  },
  fr: {
    title: 'Éditer PDF en ligne gratuitement - Sans installation ni inscription',
    description: 'Modifiez des documents PDF en ligne instantanément sans installer de logiciel ni créer de compte. Édition PDF rapide dans votre navigateur. Sans téléchargement, 100% gratuit et privé.',
    ogLocale: 'fr_FR',
  },
  de: {
    title: 'PDF online kostenlos bearbeiten - Ohne Installation und Anmeldung',
    description: 'Bearbeiten Sie PDF-Dokumente sofort online, ohne Software zu installieren oder ein Konto zu erstellen. Schnelle PDF-Bearbeitung im Browser. Ohne Downloads, 100% kostenlos und privat.',
    ogLocale: 'de_DE',
  },
  es: {
    title: 'Editar PDF en línea gratis - Sin instalación ni registro',
    description: 'Edite documentos PDF en línea al instante sin instalar software ni crear una cuenta. Edición PDF rápida en su navegador. Sin descargas, 100% gratuito y privado.',
    ogLocale: 'es_ES',
  },
  it: {
    title: 'Modifica PDF online gratis - Senza installazione e registrazione',
    description: 'Modifica documenti PDF online istantaneamente senza installare software o creare un account. Modifica PDF rapida nel browser. Senza download, 100% gratuito e privato.',
    ogLocale: 'it_IT',
  },
}

// Statically prerender the six supported locales so every localized page can be
// statically/edge-rendered instead of `private, no-store`. Unknown [locale] values are
// still dynamically rendered and then 404'd by the isSupportedLocale gate below — we do
// NOT set `dynamicParams = false` here because the [...segments] catch-all child has no
// generateStaticParams and would fail the build under it.
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale;

  const seo = localeSeo[locale] ?? localeSeo.en;

  // NOTE: canonical + hreflang are NOT set here anymore. They depend on the page path,
  // which previously required reading the x-pathname header (forcing dynamic rendering).
  // Each page now sets its own alternates via localeAlternates(locale, subPath) in
  // app/lib/seo.ts. openGraph.url is likewise set per-page (omitted here).
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${siteName}`,
    },
    description: seo.description,
    openGraph: {
      type: 'website',
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
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximumScale — let users zoom freely (WCAG 1.4.4 / a11y).
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
  // The [locale] segment matches ANY first path segment, so unknown single-segment
  // paths (e.g. /xyzzy) would otherwise render the homepage with a 200 + index,follow
  // (a soft-404). Return a real 404 when the segment is not a supported locale.
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale;

  const messages = getMessages(locale);
  const seo = localeSeo[locale] ?? localeSeo.en;
  const t = (k: string) => (messages[k] && messages[k].trim() ? messages[k] : k);

  // Locale-aware site-wide structured data. Moved here from the root layout (which
  // statically renders <html lang="en"> and cannot read the locale), so the
  // Organization / WebSite / ItemList descriptions are in the page's language.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'EditoraPDF',
    alternateName: 'EditoraPDF Online PDF Editor',
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg`, width: 120, height: 40 },
    image: `${siteUrl}/og/og-image.png`,
    description: seo.description,
    foundingDate: '2026',
    sameAs: [
      'https://www.instagram.com/editora_pdf',
      'https://www.facebook.com/people/Editorapdf/61587362633003/',
      'https://www.youtube.com/@EditoraPDF',
      'https://www.threads.com/@editora_pdf',
    ],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'hello@affsquad.com', availableLanguage: ['English', 'Ukrainian', 'German', 'Spanish', 'French', 'Italian'] },
    publishingPrinciples: `${siteUrl}/terms`,
    privacyPolicy: `${siteUrl}/privacy-policy`,
    termsOfService: `${siteUrl}/terms`,
    knowsAbout: ['PDF editing', 'Online document tools', 'PDF management', 'Document editing software', 'Browser-based PDF tools'],
    makesOffer: { '@type': 'Offer', name: 'Online PDF Editing Tools', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: siteUrl },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: seo.description,
    publisher: { '@type': 'Organization', name: 'EditoraPDF', logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg` } },
    inLanguage: seo.ogLocale.replace('_', '-'),
    copyrightYear: 2026,
    copyrightHolder: { '@type': 'Organization', name: 'EditoraPDF' },
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('schema.featuresTitle'),
    description: t('schema.featuresDesc'),
    itemListElement: [1, 2, 3, 4, 5].map((n) => ({
      '@type': 'ListItem',
      position: n,
      name: t(`schema.f${n}Name`),
      description: t(`schema.f${n}Desc`),
    })),
  };

  return (
    <TranslationProvider locale={locale} messages={messages}>
      {/* Locale-aware site-wide JSON-LD (Organization / WebSite / ItemList). Plain
          server-rendered <script> so the localized schema is in the initial HTML. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {/* The document root <html lang> is statically "en" (set in the root layout so
          pages can be statically rendered). Correct it to this route's locale on the
          live DOM for screen readers / assistive tech and JS-aware crawlers. hreflang
          remains the authoritative language signal for search engines. */}
      {locale !== defaultLocale && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
          }}
        />
      )}
      {/* No id="main-content" here — the skip-link target lives in the root layout;
          a second one would be a duplicate id and break the skip link. */}
      <div className="relative min-h-screen flex flex-col">
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
        {children}
        <Footer locale={locale} />
      </div>
    </TranslationProvider>
  )
}
