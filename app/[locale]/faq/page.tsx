import type { Metadata } from 'next';
import { metadata as baseMetadata } from '../../faq/page';
import { localeAlternates } from '../../lib/seo';
import { getMessages } from '../../i18n/messages';
import { normalizeLocale } from '../../../i18n/config';

const siteUrl = 'https://editorapdf.com';

// Localized title/description + locale-aware canonical/hreflang. The FAQ accordion
// content itself is localized in the FAQ component (per-locale data files).
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const m = getMessages(normalizeLocale(params.locale));
  const title = m['faq.title'] || 'Frequently Asked Questions';
  const description = m['faq.metaDesc'] || (baseMetadata.description as string);
  return {
    ...baseMetadata,
    title,
    description,
    openGraph: {
      ...(baseMetadata.openGraph as object),
      title,
      description,
      url: `${siteUrl}/${params.locale}/faq`,
    },
    alternates: localeAlternates(params.locale, '/faq'),
  };
}

export { default } from '../../faq/page';
