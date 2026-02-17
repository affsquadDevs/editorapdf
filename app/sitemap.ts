import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://editorapdf.com' // Replace with your actual domain
  
  // All available PDF tools (excluding comingSoon ones)
  const tools = [
    // Organize & Pages
    'merge',
    'split',
    'delete-pages',
    'extract-pages',
    'reorder',
    'rotate',
    'insert-blank',
    'duplicate-pages',
    'reverse-order',
    'split-by-size',
    'split-by-bookmarks',
    // Security & Protection
    'sign',
    'redact',
    'remove-hidden-data',
    'certificate',
    // Convert
    'pdf-to-images',
    'images-to-pdf',
    'pdf-to-word',
    'pdf-to-excel',
    'pdf-to-text',
    'pdf-to-csv',
    'pdf-to-html',
    'pdf-to-markdown',
    // Edit & Enhance (all available)
    'compress',
    'add-watermark',
    'page-numbers',
    'crop',
    'resize',
    'grayscale',
    'invert-colors',
    'flatten',
    'remove-annotations',
    // Content & Media (all available)
    'extract-images',
    'remove-images',
    'optimize-images',
    'add-qr-code',
    'add-barcode',
    'add-bookmarks',
    'add-hyperlinks',
    'add-attachments',
    // Forms & Signing (all available)
    'fill-sign',
    'stamp',
    'bates-numbering',
    'create-form',
    // OCR & Text (all available)
    'ocr',
    'searchable-pdf',
    // Analyze & Optimize (all available)
    'compare',
    'repair',
    'metadata',
    'pdf-statistics',
    'linearize',
    'color-space',
    'accessibility',
    'pdfa',
    'pdfx',
    'validate',
  ]
  
  // Generate tool URLs
  const toolUrls = tools.map(toolId => ({
    url: `${baseUrl}/tools/${toolId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/edit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-edit-a-pdf-online`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/is-it-safe-to-edit-pdfs-online`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-we-built-open-source-pdf-editor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/why-we-made-editorapdf-open-source`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/technology-behind-privacy-first-pdf-editing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/contributing-to-open-source-beginners-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/open-source-vs-closed-source-pdf-editors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Add all tool URLs
    ...toolUrls,
  ]
}
