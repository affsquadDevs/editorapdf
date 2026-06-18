// Slugs whose blog post has been migrated to the locale-aware `app/[locale]/blog/[slug]`
// route (fully translated content + per-locale schema). Middleware lets these pass through
// to the dynamic route; every other slug is still rewritten to the legacy English
// `app/blog/<slug>` page. The sitemap also reads this set to decide which blog URLs get
// per-locale + hreflang entries vs. a single English-only entry.
//
// Migration is incremental: add a slug here once its post module exists in
// `app/data/blog/posts/<slug>.tsx` and is wired into the registry.
export const MIGRATED_BLOG_SLUGS = [
  'how-to-edit-a-pdf-online',
  'how-to-delete-pages-from-pdf',
  'how-to-extract-pages-from-pdf-online',
  'how-to-insert-blank-pages-in-pdf',
  'how-to-reorder-pdf-pages',
  'how-to-reverse-pdf-page-order',
  'how-to-rotate-pdf-pages-online',
  'pdf-to-text',
  'pdf-to-html',
  'pdf-to-markdown',
  'how-to-convert-pdf-to-word-online',
  'how-to-convert-pdf-to-excel-online',
  'how-to-convert-pdf-to-csv-online',
  'how-to-convert-images-to-pdf-online',
] as const

export type MigratedSlug = (typeof MIGRATED_BLOG_SLUGS)[number]

const migratedSet = new Set<string>(MIGRATED_BLOG_SLUGS)

export function isMigratedBlogSlug(slug: string): boolean {
  return migratedSet.has(slug)
}
