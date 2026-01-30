'use client';

import { useState } from 'react';
import { faqData } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto" aria-labelledby="faq-heading">
      <div className="text-center mb-12">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-surface-400">
          Everything you need to know about editing PDFs online
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="card overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-surface-800/30 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="flex-1 font-semibold text-white pr-4">
                {faq.question}
              </span>
              <svg
                className={`flex-shrink-0 w-5 h-5 text-primary-400 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-4 pt-2 text-surface-400 leading-relaxed border-t border-surface-700/50">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEO Keywords (hidden) */}
      <div className="sr-only">
        <h3>Popular searches:</h3>
        <ul>
          {faqData.flatMap(faq => faq.keywords || []).map((keyword, i) => (
            <li key={i}>{keyword}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
