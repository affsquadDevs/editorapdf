import type { Metadata } from 'next';
import Script from 'next/script';
import { toolsMeta } from '../../../data/toolsMeta';
import { supportedLocales } from '../../../../i18n/config';
import ToolPageClient from './ToolPageClient';

const siteUrl = 'https://editorapdf.com';

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
    return {
      title: 'PDF Tool | EditoraPDF',
      description: 'Free online PDF tools — no installation, no signup required.',
    };
  }

  const title = `${tool.title} Online Free — No Signup | EditoraPDF`;
  const description = `${tool.description}. Free online PDF tool — no installation, no account required. Files processed locally in your browser. 100% private.`;
  const url = `${siteUrl}/${locale}/tools/${tool.id}`;

  const hreflangAlternates: Record<string, string> = {
    'x-default': `${siteUrl}/tools/${tool.id}`,
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
            item: `${siteUrl}/`,
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '1250',
          bestRating: '5',
          worstRating: '1',
        },
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

  const howToSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: `How to ${tool.title} Online`,
        description: `Step-by-step guide to use ${tool.title} free online — no installation or signup required.`,
        image: `${siteUrl}/og/og-image.png`,
        totalTime: 'PT1M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Open the tool',
            text: `Go to the ${tool.title} tool on EditoraPDF. No account or installation required — it works directly in your browser.`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Upload your PDF',
            text: 'Click the upload area or drag and drop your PDF file. Your file is processed locally and never sent to any server.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: `${tool.title}`,
            text: `${tool.description}. Adjust any settings as needed and apply the changes.`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Download the result',
            text: 'Click the Download button to save your processed PDF to your device. The file is ready immediately.',
          },
        ],
      }
    : null;

  const faqSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I ${tool.title.toLowerCase()} online?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.description}. Simply open the tool on EditoraPDF, upload your PDF file, and the processing happens instantly in your browser — no installation or signup required.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is the ${tool.title} tool free?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes, ${tool.title} on EditoraPDF is completely free. There are no subscriptions, no hidden fees, and no account required. You can use it as many times as you need.`,
            },
          },
          {
            '@type': 'Question',
            name: `Are my files safe when using ${tool.title}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Your files are 100% private. All processing happens locally in your browser — your PDF is never uploaded to any server. EditoraPDF does not store, transmit, or have access to your documents.`,
            },
          },
          {
            '@type': 'Question',
            name: `Do I need to install anything to use ${tool.title}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `No installation needed. ${tool.title} works entirely in your browser. Just open the page and start working — it's compatible with Chrome, Edge, Firefox, and Safari on any device.`,
            },
          },
        ],
      }
    : null;

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
      {howToSchema && (
        <Script
          id="howto-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ToolPageClient />
    </>
  );
}
