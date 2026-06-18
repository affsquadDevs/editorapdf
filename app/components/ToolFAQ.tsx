'use client';

import { useState } from 'react';
import { getToolFaq } from '../data/toolFaq';
import { useAppTranslations } from '../i18n/TranslationProvider';

// Visible, per-tool FAQ accordion. Reads the same localized data that feeds the FAQPage
// JSON-LD on the tool page, so the structured data always has matching visible Q&A.
export default function ToolFAQ({ toolId }: { toolId: string }) {
  const { locale, t } = useAppTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = getToolFaq(toolId, locale);
  if (!items.length) return null;

  const heading = t('faq.title') === 'faq.title' ? 'Frequently Asked Questions' : t('faq.title');

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 px-6" aria-labelledby="tool-faq-heading">
      <div className="flex items-center gap-2 mb-6">
        <h2 id="tool-faq-heading" className="text-xl md:text-2xl font-bold text-white">
          {heading}
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((faq, index) => (
          <div key={index} className="card overflow-hidden transition-all duration-200">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 py-4 flex items-start justify-between gap-4 text-left hover:bg-surface-800/30 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`tool-faq-answer-${index}`}
            >
              <span className="flex-1 font-semibold text-white pr-4 text-sm md:text-base">
                {faq.question}
              </span>
              <svg
                className={`flex-shrink-0 w-5 h-5 text-primary-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`tool-faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[32rem]' : 'max-h-0'}`}
            >
              <div className="px-5 pb-4 pt-2 text-sm text-surface-400 leading-relaxed border-t border-surface-700/50">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
