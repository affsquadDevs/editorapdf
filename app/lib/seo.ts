import { supportedLocales, defaultLocale } from '../../i18n/config'

const siteUrl = 'https://editorapdf.com'

/**
 * Locale-aware canonical + hreflang alternates for a page, computed from the route's
 * locale and its (locale-stripped) sub-path.
 *
 * This replaces the old headers()-based (x-pathname) logic that used to live in the
 * [locale] layout's generateMetadata. Reading headers() forced every page into dynamic
 * rendering; deriving the canonical from the static route params instead lets the pages
 * be statically/edge-rendered while producing the exact same canonical + hreflang tags.
 *
 *   subPath: '' for the locale home, otherwise a leading-slash path with no trailing
 *            slash (e.g. '/about', '/tools', '/how-it-works').
 */
export function localeAlternates(locale: string, subPath: string) {
  const url = (code: string) => `${siteUrl}/${code}${subPath}`
  return {
    canonical: url(locale),
    languages: {
      'x-default': url(defaultLocale),
      ...Object.fromEntries(supportedLocales.map((code) => [code, url(code)])),
    } as Record<string, string>,
  }
}

// App locale code → OpenGraph locale (og:locale). Centralized so every page's openGraph
// can advertise its language consistently. Mirrors the ogLocale values in the [locale] layout.
const ogLocaleByCode: Record<string, string> = {
  en: 'en_US',
  uk: 'uk_UA',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
}

export function getOgLocale(locale: string): string {
  return ogLocaleByCode[locale] ?? 'en_US'
}

// Complete openGraph for a localized page. Next.js replaces (does not field-merge) the
// [locale] layout's openGraph when a page sets its own, so a page that needs og:url must
// re-supply the full object (type/title/description/siteName/locale/image).
export function pageOpenGraph(
  locale: string,
  subPath: string,
  title: string,
  description: string,
  imageAlt = 'EditoraPDF',
) {
  return {
    type: 'website' as const,
    url: `${siteUrl}/${locale}${subPath}`,
    title,
    description,
    siteName: 'EditoraPDF',
    locale: getOgLocale(locale),
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: imageAlt }],
  }
}
