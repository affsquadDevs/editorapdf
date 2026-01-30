// SEO-optimized FAQ data - reusable across the application

export interface FAQItem {
  question: string;
  answer: string;
  keywords?: string[]; // For SEO reference
}

export const faqData: FAQItem[] = [
  {
    question: 'How do I edit a PDF online for free?',
    answer: 'Simply visit EditoraPDF, click "Edit PDF" or drag and drop your PDF file into the browser. No installation or signup required. You can instantly start editing text, adding images, annotating, and modifying your PDF document completely free.',
    keywords: ['edit pdf online free', 'how to edit pdf', 'free pdf editor'],
  },
  {
    question: 'Do I need to install software to edit PDF files?',
    answer: 'No! EditoraPDF works entirely in your web browser. There\'s no software to download or install. Just open your browser, visit our website, and start editing PDFs instantly. It works on Windows, Mac, Linux, and even Chromebooks.',
    keywords: ['pdf editor no installation', 'online pdf editor', 'browser-based pdf editor'],
  },
  {
    question: 'Do I need to create an account or sign up?',
    answer: 'No signup required! You can use EditoraPDF immediately without creating an account, logging in, or providing any personal information. Simply drop your PDF and start editing right away.',
    keywords: ['no signup pdf editor', 'no account pdf editor', 'anonymous pdf editing'],
  },
  {
    question: 'Is my PDF file safe? Where is it stored?',
    answer: 'Your PDF files are 100% safe and private. All editing happens locally in your browser - your files never leave your device and are never uploaded to our servers. We cannot see, access, or store your documents. Once you close the browser, all data is automatically cleared.',
    keywords: ['safe pdf editor', 'private pdf editing', 'secure pdf editor'],
  },
  {
    question: 'What can I do with this PDF editor?',
    answer: 'You can edit PDF text, add or remove pages, reorder pages, rotate pages, annotate PDFs with highlights and notes, add shapes and stamps, insert images, fill forms, and export your edited PDF. All features are free and available without limits.',
    keywords: ['pdf editing features', 'what can you edit in pdf', 'pdf annotation'],
  },
  {
    question: 'What file size limit does EditoraPDF support?',
    answer: 'EditoraPDF supports PDF files up to 25MB in size. For optimal performance, we recommend PDFs with fewer than 50 pages. All processing happens on your device, so larger files may take longer depending on your computer\'s performance.',
    keywords: ['pdf file size limit', 'max pdf size', 'pdf editor limitations'],
  },
  {
    question: 'Can I edit PDF files on my phone or tablet?',
    answer: 'Yes! EditoraPDF is fully responsive and works on mobile devices and tablets. However, for the best editing experience, we recommend using a desktop or laptop with a larger screen and mouse for precise editing.',
    keywords: ['mobile pdf editor', 'edit pdf on phone', 'tablet pdf editor'],
  },
  {
    question: 'Does EditoraPDF work offline?',
    answer: 'Yes, once the page is loaded, EditoraPDF works completely offline. All PDF processing happens locally in your browser without requiring an internet connection. You can edit PDFs even without WiFi.',
    keywords: ['offline pdf editor', 'pdf editor no internet', 'browser pdf editor'],
  },
  {
    question: 'What browsers are supported?',
    answer: 'EditoraPDF works in all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera, and Brave. We recommend using the latest version of your browser for the best experience and performance.',
    keywords: ['browser compatibility', 'chrome pdf editor', 'firefox pdf editor'],
  },
  {
    question: 'Can I edit scanned PDF documents?',
    answer: 'You can add annotations, stamps, images, and shapes to scanned PDFs. However, editing the actual text in scanned documents requires OCR (Optical Character Recognition), which is not currently supported. You can add new text overlays on top of scanned content.',
    keywords: ['edit scanned pdf', 'ocr pdf', 'scanned document editing'],
  },
  {
    question: 'How do I save my edited PDF?',
    answer: 'Click the "Export" button after making your changes. Your edited PDF will be downloaded to your device with all modifications applied. The export is instant and maintains the original PDF quality.',
    keywords: ['save edited pdf', 'export pdf', 'download pdf'],
  },
  {
    question: 'Is EditoraPDF really free? Are there hidden costs?',
    answer: 'Yes, EditoraPDF is completely free to use. There are no hidden fees, no premium tiers, no subscriptions, and no feature limitations. All editing tools are available to everyone at no cost.',
    keywords: ['free pdf editor', 'no cost pdf editor', 'free pdf tools'],
  },
];

// Generate FAQ Schema for structured data (SEO)
export function generateFAQSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
