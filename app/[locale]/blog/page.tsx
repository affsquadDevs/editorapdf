import type { Metadata } from 'next'
import BlogIndex from '../../components/BlogIndex'
import { localeAlternates, pageOpenGraph } from '../../lib/seo'
import { getMessages } from '../../i18n/messages'
import { supportedLocales, normalizeLocale, type AppLocale } from '../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const BLOG_TITLE = 'Blog - Tips & Guides'
const BLOG_DESC =
  'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.'

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = normalizeLocale(params.locale)
  return {
    title: BLOG_TITLE,
    description: BLOG_DESC,
    openGraph: pageOpenGraph(locale, '/blog', BLOG_TITLE, BLOG_DESC, 'EditoraPDF — Blog'),
    alternates: localeAlternates(locale, '/blog'),
  }
}

export default function LocaleBlogPage({ params }: { params: { locale: string } }) {
  const locale: AppLocale = normalizeLocale(params.locale)
  const m = getMessages(locale)
  const t = (k: string, f: string) => (m[k] && m[k].trim() ? m[k] : f)
  const url = `${siteUrl}/${locale}/blog`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home', 'Home'), item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('nav.blog', 'Blog'), item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogIndex locale={locale} />
    </>
  )
}
