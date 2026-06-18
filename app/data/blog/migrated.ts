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
] as const

export type MigratedSlug = (typeof MIGRATED_BLOG_SLUGS)[number]

const migratedSet = new Set<string>(MIGRATED_BLOG_SLUGS)

export function isMigratedBlogSlug(slug: string): boolean {
  return migratedSet.has(slug)
}
