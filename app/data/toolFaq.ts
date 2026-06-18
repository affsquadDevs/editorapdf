import type { FAQItem } from './faq';
import type { AppLocale } from '../../i18n/config';
import { toolFaqEn } from './toolFaq.en';
import { toolFaqUk } from './toolFaq.uk';
import { toolFaqDe } from './toolFaq.de';
import { toolFaqEs } from './toolFaq.es';
import { toolFaqFr } from './toolFaq.fr';
import { toolFaqIt } from './toolFaq.it';

// Per-tool FAQ, keyed by tool id. Mirrors the faq.<locale>.ts convention. The visible
// <ToolFAQ> accordion and the FAQPage JSON-LD on each tool page both read from here, so
// the structured data always matches the rendered questions (Google FAQ policy).
const byLocale: Record<AppLocale, Record<string, FAQItem[]>> = {
  en: toolFaqEn,
  uk: toolFaqUk,
  de: toolFaqDe,
  es: toolFaqEs,
  fr: toolFaqFr,
  it: toolFaqIt,
};

export function getToolFaq(toolId: string, locale: AppLocale): FAQItem[] {
  return (byLocale[locale] && byLocale[locale][toolId]) || toolFaqEn[toolId] || [];
}

export function generateToolFaqSchema(siteUrl: string, toolId: string, locale: AppLocale) {
  const items = getToolFaq(toolId, locale);
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/${locale}/tools/${toolId}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
