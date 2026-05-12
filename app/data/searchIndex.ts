export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-redact-pdf-for-legal-compliance',
    title: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
    description: 'Permanently redact sensitive information to meet GDPR, HIPAA, FOIA, and court filing requirements.',
    tags: ['Security', 'Compliance'],
  },
  {
    slug: 'pdf-metadata-what-is-it-and-how-to-remove',
    title: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
    description: 'Every PDF contains hidden metadata — author name, creation date, GPS coordinates, revision history.',
    tags: ['Privacy', 'Security'],
  },
  {
    slug: 'how-to-merge-pdf-files-online',
    title: 'How to Merge PDF Files Online: Complete Guide',
    description: 'Combine multiple PDF files into one document using free online tools.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-split-pdf-files-online',
    title: 'How to Split PDF Files Online: Complete Guide',
    description: 'Divide large PDF files into smaller documents by page ranges, size, or bookmarks.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-insert-duplicate-pages-in-pdf',
    title: 'How to Insert Duplicate Pages in PDF: Complete Guide',
    description: 'Duplicate and copy pages in PDF files, covering page ranges and insertion positioning.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-we-built-open-source-pdf-editor',
    title: 'How We Built a Free Open-Source PDF Editor with Next.js',
    description: 'Technical deep dive into building EditoraPDF — tech stack, architecture decisions, and open-source process.',
    tags: ['Open Source', 'Technical'],
  },
  {
    slug: 'why-we-made-editorapdf-open-source',
    title: 'Why We Made EditoraPDF Open Source',
    description: 'The principles, philosophy, and vision behind making EditoraPDF free and open source forever.',
    tags: ['Open Source', 'Philosophy'],
  },
  {
    slug: 'technology-behind-privacy-first-pdf-editing',
    title: 'The Technology Behind Privacy-First PDF Editing',
    description: 'How client-side processing, PDF.js, and modern web technologies enable truly private PDF editing.',
    tags: ['Privacy', 'Technology'],
  },
  {
    slug: 'contributing-to-open-source-beginners-guide',
    title: "Contributing to Open Source: A Beginner's Guide with EditoraPDF",
    description: 'Learn how to contribute to open-source projects using EditoraPDF as an example.',
    tags: ['Guide', 'Open Source'],
  },
  {
    slug: 'open-source-vs-closed-source-pdf-editors',
    title: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    description: 'A comprehensive comparison of open-source and proprietary PDF editors — pros, cons, and which is right for you.',
    tags: ['Comparison', 'Analysis'],
  },
  {
    slug: 'pdf-to-markdown',
    title: 'PDF to Markdown Converter: Complete Guide',
    description: 'Convert PDF documents into Markdown format. Perfect for documentation, blogs, and version control.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'how-to-edit-a-pdf-online',
    title: 'How to Edit a PDF Online',
    description: 'Edit PDF files online without installing software — text, images, shapes, page management.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'is-it-safe-to-edit-pdfs-online',
    title: 'Is It Safe to Edit PDFs Online?',
    description: 'How online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.',
    tags: ['Privacy', 'Security'],
  },
  {
    slug: 'pdf-to-html',
    title: 'How to Convert PDF to HTML Online',
    description: 'Convert PDF files to HTML format online. Transform PDF documents into web pages.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'pdf-to-text',
    title: 'PDF to Text Converter — Extract Text from PDF Online',
    description: 'Convert PDF to plain text online for free. Extract text from PDF files instantly.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'digital-signature',
    title: 'How to Add Digital Signatures to PDFs Online',
    description: 'Add digital signatures to PDF documents online. Free, secure e-signature tool.',
    tags: ['Security', 'Guide'],
  },
  {
    slug: 'how-to-add-headers-and-footers-to-pdf',
    title: 'How to Add Headers and Footers to PDF',
    description: 'Add headers and footers to PDF documents — page numbers, dates, text, and custom content.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-add-page-numbers-to-pdf',
    title: 'How to Add Page Numbers to PDF Online',
    description: 'Insert page numbers into PDF documents online with custom positioning and formatting.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-add-watermark-to-pdf-online',
    title: 'How to Add Watermark to PDF Online',
    description: 'Add text or image watermarks to PDF documents online without software installation.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-compress-pdf-online',
    title: 'How to Compress PDF Files Online',
    description: 'Reduce PDF file size online while maintaining quality — free compression tool.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-convert-images-to-pdf-online',
    title: 'How to Convert Images to PDF Online',
    description: 'Convert images to PDF format online. Combine multiple images into one PDF document.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'how-to-convert-pdf-to-csv-online',
    title: 'How to Convert PDF to CSV Online',
    description: 'Extract tabular data from PDFs to CSV files — free online converter.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'how-to-convert-pdf-to-excel-online',
    title: 'How to Convert PDF to Excel Online',
    description: 'Convert PDF files to Excel spreadsheet format online — extract tables and data.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'how-to-convert-pdf-to-word-online',
    title: 'How to Convert PDF to Word Online',
    description: 'Convert PDF files to editable Word DOCX format online.',
    tags: ['Converter', 'Guide'],
  },
  {
    slug: 'how-to-delete-pages-from-pdf',
    title: 'How to Delete Pages from PDF Online',
    description: 'Remove specific pages from PDF documents online without software installation.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-extract-pages-from-pdf-online',
    title: 'How to Extract Pages from PDF Online',
    description: 'Extract specific pages from PDF and save them as a separate PDF file.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-insert-blank-pages-in-pdf',
    title: 'How to Insert Blank Pages in PDF',
    description: 'Add empty pages at any position in a PDF document online.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-reorder-pdf-pages',
    title: 'How to Reorder PDF Pages Online',
    description: 'Rearrange and reorder pages in PDF documents using drag & drop.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-reverse-pdf-page-order',
    title: 'How to Reverse PDF Page Order Online',
    description: 'Flip the order of all pages in a PDF document with one click.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-rotate-pdf-pages-online',
    title: 'How to Rotate PDF Pages Online',
    description: 'Rotate all or specific pages in a PDF by 90°, 180°, or 270°.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'how-to-sanitize-pdf',
    title: 'How to Sanitize a PDF: Remove Hidden Data',
    description: 'Remove hidden data, metadata, scripts, and embedded content from PDF files for safe sharing.',
    tags: ['Privacy', 'Security'],
  },
  {
    slug: 'split-by-bookmarks',
    title: 'Split PDF by Bookmarks Online',
    description: 'Split a PDF into separate files based on its bookmark and chapter structure.',
    tags: ['Guide', 'PDF Tools'],
  },
  {
    slug: 'split-by-size',
    title: 'Split PDF by File Size Online',
    description: 'Split a PDF so each part fits under a specific file size limit.',
    tags: ['Guide', 'PDF Tools'],
  },
];
