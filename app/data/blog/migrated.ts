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
  'how-to-add-watermark-to-pdf-online',
  'how-to-add-page-numbers-to-pdf',
  'how-to-add-headers-and-footers-to-pdf',
  'how-to-compress-pdf-online',
  'how-to-redact-pdf-online',
  'how-to-sanitize-pdf',
  'digital-signature',
  'is-it-safe-to-edit-pdfs-online',
  'how-to-merge-pdf-files-online',
  'how-to-split-pdf-files-online',
  'split-by-bookmarks',
  'split-by-size',
  'how-to-insert-duplicate-pages-in-pdf',
  'why-we-made-editorapdf-open-source',
  'how-we-built-open-source-pdf-editor',
  'technology-behind-privacy-first-pdf-editing',
  'open-source-vs-closed-source-pdf-editors',
] as const

export type MigratedSlug = (typeof MIGRATED_BLOG_SLUGS)[number]

const migratedSet = new Set<string>(MIGRATED_BLOG_SLUGS)

export function isMigratedBlogSlug(slug: string): boolean {
  return migratedSet.has(slug)
}
