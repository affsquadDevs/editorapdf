import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../../components/Header';
import ToolsPanel from '../../components/ToolsPanel';
import { toolsMeta } from '../../data/toolsMeta';
import { supportedLocales } from '../../../i18n/config';

const siteUrl = 'https://editorapdf.com';

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale;
  const url = `${siteUrl}/${locale}/tools`;

  const hreflangAlternates: Record<string, string> = {
    'x-default': `${siteUrl}/tools`,
    ...Object.fromEntries(
      supportedLocales.map((code) => [code, `${siteUrl}/${code}/tools`])
    ),
  };

  return {
    title: 'Free Online PDF Tools — No Signup Required | EditoraPDF',
    description: 'All free PDF tools in one place: merge, split, compress, convert, edit, sign, and more. No installation, no account. Files processed locally in your browser.',
    openGraph: {
      type: 'website',
      url,
      title: 'Free Online PDF Tools — No Signup Required | EditoraPDF',
      description: 'All free PDF tools in one place: merge, split, compress, convert, edit, sign, and more. No installation, no account. Files processed locally in your browser.',
      siteName: 'EditoraPDF',
      images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — Free PDF Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Online PDF Tools | EditoraPDF',
      description: 'Merge, split, compress, convert, edit PDFs — all free, no signup.',
      images: [`${siteUrl}/og/og-image.png`],
      creator: '@editora_pdf',
      site: '@editora_pdf',
    },
    alternates: {
      canonical: url,
      languages: hreflangAlternates,
    },
    robots: { index: true, follow: true },
  };
}

export default function LocaleToolsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const url = `${siteUrl}/${locale}/tools`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'PDF Tools', item: url },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#toollist`,
    name: 'Free Online PDF Tools',
    description: 'Complete list of free online PDF tools available on EditoraPDF',
    url,
    numberOfItems: Object.keys(toolsMeta).length,
    itemListElement: Object.values(toolsMeta).map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `${siteUrl}/${locale}/tools/${tool.id}`,
    })),
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen flex flex-col" role="main">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-5xl w-full">
            <ToolsPanel />
          </div>
        </div>
      </main>
    </>
  );
}
