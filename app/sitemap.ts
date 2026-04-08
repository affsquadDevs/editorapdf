import { MetadataRoute } from 'next'

const baseUrl = 'https://editorapdf.com'
const locales = ['en', 'fr', 'de', 'es', 'it', 'uk']

// All available PDF tools (excluding comingSoon ones)
const tools = [
  // Organize & Pages
  'merge', 'split', 'delete-pages', 'extract-pages', 'reorder', 'rotate',
  'insert-blank', 'duplicate-pages', 'reverse-order', 'split-by-size', 'split-by-bookmarks',
  // Security & Protection
  'sign', 'redact', 'remove-hidden-data', 'certificate',
  // Convert
  'pdf-to-images', 'images-to-pdf', 'pdf-to-word', 'pdf-to-excel', 'pdf-to-text',
  'pdf-to-csv', 'pdf-to-html', 'pdf-to-markdown',
  // Edit & Enhance
  'compress', 'add-watermark', 'page-numbers', 'crop', 'resize',
  'grayscale', 'invert-colors', 'flatten', 'remove-annotations',
  // Content & Media
  'extract-images', 'remove-images', 'optimize-images', 'add-qr-code',
  'add-barcode', 'add-bookmarks', 'add-hyperlinks', 'add-attachments',
  // Forms & Signing
  'fill-sign', 'stamp', 'bates-numbering', 'create-form',
  // OCR & Text
  'ocr', 'searchable-pdf',
  // Analyze & Optimize
  'compare', 'repair', 'metadata', 'pdf-statistics', 'linearize',
  'color-space', 'accessibility', 'pdfa', 'pdfx', 'validate',
]

// Blog posts
const blogPosts = [
  'how-to-edit-a-pdf-online',
  'how-to-merge-pdf-files-online',
  'how-to-split-pdf-files-online',
  'how-to-extract-pages-from-pdf-online',
  'how-to-delete-pages-from-pdf',
  'how-to-insert-duplicate-pages-in-pdf',
  'how-to-add-page-numbers-to-pdf',
  'how-to-rotate-pdf-pages-online',
  'how-to-add-watermark-to-pdf-online',
  'is-it-safe-to-edit-pdfs-online',
  'how-we-built-open-source-pdf-editor',
  'why-we-made-editorapdf-open-source',
  'technology-behind-privacy-first-pdf-editing',
  'contributing-to-open-source-beginners-guide',
  'open-source-vs-closed-source-pdf-editors',
  'pdf-to-markdown',
  'pdf-to-html',
  'pdf-to-text',
  'digital-signature',
  'how-to-add-headers-and-footers-to-pdf',
  'how-to-compress-pdf-online',
  'how-to-convert-images-to-pdf-online',
  'how-to-convert-pdf-to-csv-online',
  'how-to-convert-pdf-to-excel-online',
  'how-to-convert-pdf-to-word-online',
  'how-to-redact-pdf-online',
  'how-to-reorder-pdf-pages',
  'how-to-reverse-pdf-page-order',
  'how-to-sanitize-pdf',
  'how-to-insert-blank-pages-in-pdf',
  'split-by-bookmarks',
  'split-by-size',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Non-locale (canonical root) pages ──────────────────────────────────────
  const rootPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                    lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${baseUrl}/edit`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/tools`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/how-it-works`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/faq`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`,lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`,         lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // ── Locale-prefixed main pages ──────────────────────────────────────────────
  const localizedMainPages = [
    { path: '',               priority: 0.95, freq: 'weekly'  as const },
    { path: '/edit',          priority: 0.9,  freq: 'weekly'  as const },
    { path: '/tools',         priority: 0.9,  freq: 'weekly'  as const },
    { path: '/how-it-works',  priority: 0.8,  freq: 'monthly' as const },
    { path: '/about',         priority: 0.75, freq: 'monthly' as const },
    { path: '/blog',          priority: 0.75, freq: 'weekly'  as const },
    { path: '/faq',           priority: 0.75, freq: 'monthly' as const },
    { path: '/contact',       priority: 0.65, freq: 'monthly' as const },
    { path: '/privacy-policy',priority: 0.45, freq: 'monthly' as const },
    { path: '/terms',         priority: 0.45, freq: 'monthly' as const },
  ]

  const localizedPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    localizedMainPages.map(({ path, priority, freq }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    }))
  )

  // ── Non-locale tool pages ───────────────────────────────────────────────────
  const toolUrls: MetadataRoute.Sitemap = tools.map((toolId) => ({
    url: `${baseUrl}/tools/${toolId}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ── Non-locale blog posts ───────────────────────────────────────────────────
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...rootPages,
    ...localizedPages,
    ...toolUrls,
    ...blogUrls,
  ]
}
