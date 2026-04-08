import type { Metadata } from 'next';
import { toolsMeta } from '../../../data/toolsMeta';
import ToolPageClient from './ToolPageClient';

const siteUrl = 'https://editorapdf.com';

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
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ToolPage() {
  return <ToolPageClient />;
}
