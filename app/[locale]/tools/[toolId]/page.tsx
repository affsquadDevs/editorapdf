import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toolsMeta } from '../../../data/toolsMeta';
import { supportedLocales, normalizeLocale } from '../../../../i18n/config';
import { getMessages } from '../../../i18n/messages';
import { generateToolFaqSchema } from '../../../data/toolFaq';
import { getOgLocale } from '../../../lib/seo';
import ToolPageClient from './ToolPageClient';
import RelatedArticles from '../../../components/RelatedArticles';

const siteUrl = 'https://editorapdf.com';
const defaultLocale = 'en';

// Localized tool name + description (from the per-tool i18n keys, which are fully
// translated) and the SEO boilerplate, so the <title>/meta/schema are in the page's
// language instead of the English toolsMeta values.
function localizedTool(locale: string, toolId: string, fallbackTitle: string, fallbackDesc: string) {
  const m = getMessages(normalizeLocale(locale));
  const get = (k: string) => (m[k] && m[k].trim() ? m[k] : '');
  return {
    name: get(`tools.items.${toolId}.title`) || fallbackTitle,
    desc: get(`tools.items.${toolId}.desc`) || fallbackDesc,
    titleSuffix: get('tools.meta.titleSuffix') || 'Free Online, No Signup',
    descSuffix: get('tools.meta.descSuffix') || '',
  };
}

// Unknown toolIds must return a real 404 instead of an indexable soft-404 homepage.
export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; toolId: string }[] = [];
  for (const locale of supportedLocales) {
    for (const toolId of Object.keys(toolsMeta)) {
      params.push({ locale, toolId });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; toolId: string };
}): Metadata {
  const tool = toolsMeta[params.toolId];
  const locale = params.locale;

  if (!tool) {
    // Unreachable now that dynamicParams = false, but keep it noindex defensively.
    return {
      title: 'PDF Tool',
      description: 'Free online PDF tools — no installation, no signup required.',
      robots: { index: false, follow: false },
    };
  }

  const L = localizedTool(locale, tool.id, tool.title, tool.description);
  // Brand suffix is added once by the locale layout's title.template.
  const title = `${L.name} — ${L.titleSuffix}`;
  const description = L.descSuffix ? `${L.desc}. ${L.descSuffix}` : L.desc;
  const url = `${siteUrl}/${locale}/tools/${tool.id}`;

  const hreflangAlternates: Record<string, string> = {
    'x-default': `${siteUrl}/${defaultLocale}/tools/${tool.id}`,
    ...Object.fromEntries(
      supportedLocales.map((code) => [code, `${siteUrl}/${code}/tools/${tool.id}`])
    ),
  };

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'EditoraPDF',
      locale: getOgLocale(locale),
      images: [
        {
          url: `${siteUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: `EditoraPDF — ${L.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og/og-image.png`],
      creator: '@editora_pdf',
      site: '@editora_pdf',
    },
    alternates: {
      canonical: url,
      languages: hreflangAlternates,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ToolPage({
  params,
}: {
  params: { locale: string; toolId: string };
}) {
  const tool = toolsMeta[params.toolId];
  if (!tool) notFound();
  const url = `${siteUrl}/${params.locale}/tools/${params.toolId}`;

  // Localized tool name/description + breadcrumb labels for the JSON-LD schema.
  const m = getMessages(normalizeLocale(params.locale));
  const t = (k: string, f: string) => (m[k] && m[k].trim() ? m[k] : f);
  const toolName = t(`tools.items.${tool.id}.title`, tool.title);
  const toolDesc = t(`tools.items.${tool.id}.desc`, tool.description);
  const descSuffix = t('tools.meta.descSuffix', '');
  const fullDesc = descSuffix ? `${toolDesc}. ${descSuffix}` : toolDesc;

  const breadcrumbSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('nav.home', 'Home'),
            item: `${siteUrl}/${params.locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('nav.tools', 'PDF Tools'),
            item: `${siteUrl}/${params.locale}/tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: toolName,
            item: url,
          },
        ],
      }
    : null;

  const serviceSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: toolName,
        description: fullDesc,
        url,
        serviceType: 'PDF Processing',
        category: 'Document Management',
        provider: {
          '@type': 'Organization',
          name: 'EditoraPDF',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.svg`,
          },
        },
        areaServed: 'Worldwide',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
          serviceType: 'Online',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        isAccessibleForFree: true,
        audience: {
          '@type': 'Audience',
          audienceType: 'Anyone needing PDF tools',
        },
      }
    : null;

  const webAppSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${url}#webapp`,
        name: `${toolName} — EditoraPDF`,
        description: fullDesc,
        url,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'PDF Tool',
        operatingSystem: 'Any',
        browserRequirements: 'Requires a modern browser (Chrome, Edge, Firefox, Safari). JavaScript enabled.',
        isAccessibleForFree: true,
        // aggregateRating intentionally omitted — no real on-page reviews exist.
        // Hardcoded ratings violate Google's review-snippet policy (manual-action risk).
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        publisher: {
          '@type': 'Organization',
          name: 'EditoraPDF',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.svg`,
          },
        },
        potentialAction: {
          '@type': 'UseAction',
          name: `Use ${tool.title}`,
          target: url,
        },
      }
    : null;

  // FAQPage structured data: built from the SAME localized per-tool FAQ data that the
  // visible <ToolFAQ> accordion renders (in ToolPageClient), so the markup always has
  // matching on-page Q&A per Google's FAQ policy. (HowTo schema stays removed — Google
  // deprecated HowTo rich results in 2023.)
  const faqSchema = generateToolFaqSchema(siteUrl, tool.id, normalizeLocale(params.locale));

  return (
    <>
      {/* JSON-LD rendered as plain SSR <script> tags (in the initial HTML) so crawlers see
          the structured data without executing JS — important for the FAQPage rich result,
          whose markup must match the visible <ToolFAQ> Q&A. */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ToolPageClient />
      {tool && <RelatedArticles toolId={tool.id} locale={params.locale} />}
    </>
  );
}
