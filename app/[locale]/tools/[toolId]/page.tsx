import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { toolsMeta } from '../../../data/toolsMeta';
import { supportedLocales } from '../../../../i18n/config';
import ToolPageClient from './ToolPageClient';
import RelatedArticles from '../../../components/RelatedArticles';

const siteUrl = 'https://editorapdf.com';
const defaultLocale = 'en';

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

  // Brand suffix is added once by the locale layout's title.template.
  const title = `${tool.title} Online Free — No Signup`;
  const description = `${tool.description}. Free online PDF tool — no installation, no account required. Files processed locally in your browser. 100% private.`;
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
      images: [
        {
          url: `${siteUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: `EditoraPDF — ${tool.title}`,
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

  const breadcrumbSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/${defaultLocale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${siteUrl}/${params.locale}/tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.title,
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
        name: `${tool.title} Online Free`,
        description: `${tool.description}. Free online PDF tool — no installation, no account required. Files processed locally in your browser. 100% private.`,
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
        name: `${tool.title} — EditoraPDF`,
        description: `${tool.description}. Free online PDF tool — no installation, no account required. Files processed locally in your browser. 100% private.`,
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

  // HowTo + FAQPage structured data intentionally removed from tool pages:
  //  - HowTo rich results were deprecated by Google in 2023 (no SERP benefit).
  //  - The FAQPage markup had no matching VISIBLE Q&A rendered on the page, which
  //    violates Google's FAQ policy. Re-add FAQPage only if/when the questions are
  //    rendered as visible content (which would also fix the thin-content concern).

  return (
    <>
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {webAppSchema && (
        <Script
          id="webapp-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      {serviceSchema && (
        <Script
          id="service-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ToolPageClient />
      {tool && <RelatedArticles toolId={tool.id} locale={params.locale} />}
    </>
  );
}
