import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supportedLocales, normalizeLocale } from '../../../../i18n/config'
import { MIGRATED_BLOG_SLUGS } from '../../../data/blog/migrated'
import { getBlogPost } from '../../../data/blog/registry'

// Only the migrated (translated) slugs are statically generated here; every other
// `/<locale>/blog/<slug>` is rewritten to the legacy English page by middleware before it
// reaches this route. dynamicParams=false → anything else 404s rather than rendering blank.
export const dynamicParams = false

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    MIGRATED_BLOG_SLUGS.map((slug) => ({ locale, slug })),
  )
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return post.meta(normalizeLocale(params.locale))
}

export default function LocaleBlogPost({ params }: { params: { locale: string; slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  const locale = normalizeLocale(params.locale)

  return (
    <>
      {post.schemas(locale).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <post.Article locale={locale} />
    </>
  )
}
