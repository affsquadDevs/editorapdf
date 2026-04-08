import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://editorapdf.com'

  return {
    rules: [
      // ── Search engines ─────────────────────────────────────────────────────
      {
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Slurp', 'Baiduspider', 'YandexBot'],
        allow: '/',
        crawlDelay: 0,
      },
      // ── AI crawlers (ChatGPT, Perplexity, Claude, Gemini …) ───────────────
      {
        userAgent: [
          'GPTBot',           // OpenAI / ChatGPT
          'ChatGPT-User',     // ChatGPT browsing plugin
          'OAI-SearchBot',    // OpenAI search
          'PerplexityBot',    // Perplexity AI
          'Claude-Web',       // Anthropic Claude
          'anthropic-ai',     // Anthropic general
          'CCBot',            // Common Crawl (used for LLM training)
          'Applebot',         // Apple Siri / Spotlight
          'Amazonbot',        // Amazon Alexa
          'cohere-ai',        // Cohere
          'meta-externalagent', // Meta AI
        ],
        allow: '/',
      },
      // ── All other bots (fallback) ──────────────────────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      // ── SEO scraper bots (block to save crawl budget) ─────────────────────
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'dotbot', 'BLEXBot', 'SeznamBot'],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
