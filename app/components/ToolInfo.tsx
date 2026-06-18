'use client';

import Link from 'next/link';
import type { PdfTool } from './ToolsPanel';
import { allTools } from './ToolsPanel';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAppTranslations } from '../i18n/TranslationProvider';

interface ToolInfoProps {
  tool: PdfTool;
}

// Tool descriptions and related tools mapping
const toolInfo: Record<string, {
  description: string;
  relatedTools: string[]; // IDs of related tools
}> = {
  // Organize & Pages
  'merge': {
    description: 'Merge PDF tool allows you to combine multiple PDF files into a single document seamlessly. Perfect for consolidating reports, combining chapters from different sources, or merging scanned documents into one file. Whether you need to merge invoices, contracts, or academic papers, this tool handles it all with precision. The process preserves the original formatting, fonts, and layout of each document. You can easily reorder files before merging by dragging them into your preferred sequence. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The merged PDF maintains high quality and can be downloaded immediately after processing. This tool is ideal for professionals who regularly work with multiple PDF documents and need to create comprehensive reports or presentations.',
    relatedTools: ['split', 'reorder', 'extract-pages'],
  },
  'split': {
    description: 'Split PDF tool enables you to divide a large PDF file into smaller, more manageable documents with ease. You can split by page ranges, making it ideal for extracting specific sections, creating separate files from a single document, or breaking down lengthy reports into chapters. The tool supports multiple split methods including custom page ranges, fixed page counts, or splitting at every N pages. This is particularly useful for email attachments that have size limits, organizing large documents into smaller files, or extracting specific pages for separate use. The split operation preserves all formatting, images, and text quality from the original document. Each resulting file maintains the same quality standards as the source PDF. Processing is instant and happens entirely in your browser, ensuring your documents never leave your device. Perfect for students organizing course materials, professionals managing large document sets, or anyone who needs to break down PDFs into more manageable pieces.',
    relatedTools: ['merge', 'extract-pages', 'split-by-bookmarks'],
  },
  'delete-pages': {
    description: 'Delete Pages tool helps you remove unwanted pages from your PDF document quickly and efficiently. Simply select the pages you want to remove, and the tool will create a new PDF without those pages, maintaining the integrity of the remaining content. This is perfect for cleaning up documents, removing blank pages, eliminating unnecessary sections, or preparing documents for specific purposes. The tool preserves all formatting, images, and text quality in the pages that remain. You can delete individual pages, multiple pages, or entire page ranges with a single operation. The process is non-destructive, meaning your original file remains untouched until you download the modified version. This makes it ideal for removing confidential information, cleaning up scanned documents, or preparing presentations by removing unwanted slides. All processing happens locally in your browser, ensuring complete privacy and security. The resulting PDF maintains high quality and can be downloaded immediately after processing.',
    relatedTools: ['extract-pages', 'split', 'reorder'],
  },
  'extract-pages': {
    description: 'Extract Pages tool allows you to pull specific pages from a PDF and create a new document containing only those pages. This is perfect for creating summaries, extracting important sections, building custom documents from existing PDFs, or sharing only relevant parts of a document. You can extract individual pages, multiple pages, or entire page ranges with precision. The tool preserves all formatting, images, fonts, and layout from the original pages, ensuring the extracted document looks exactly like the source material. This is particularly useful for students who need to extract specific chapters from textbooks, professionals who want to share only relevant sections of reports, or anyone creating custom document collections. The extraction process is instant and happens entirely in your browser, so your documents never leave your device. The resulting PDF maintains the same quality as the original, with all text remaining searchable and selectable. Perfect for creating focused documents, sharing specific information, or organizing content for presentations.',
    relatedTools: ['delete-pages', 'split', 'merge'],
  },
  'reorder': {
    description: 'Reorder Pages tool provides an intuitive drag-and-drop interface to rearrange PDF pages effortlessly. Easily reorganize your document by moving pages to any position you want, whether you need to fix page order, reorganize content structure, or create a custom document flow. The visual interface shows thumbnail previews of each page, making it easy to identify and move the right pages. You can drag pages individually or select multiple pages to move them together. This tool is perfect for fixing incorrectly scanned documents, reorganizing report sections, creating custom presentations, or preparing documents for printing in a specific order. The reordering process preserves all formatting, images, and text quality from the original pages. Changes are applied instantly and you can preview the new order before finalizing. All processing happens locally in your browser, ensuring complete privacy. The resulting PDF maintains high quality and can be downloaded immediately after reordering. Great for professionals who need to reorganize documents, students organizing course materials, or anyone who wants to customize their PDF structure.',
    relatedTools: ['rotate', 'reverse-order', 'merge'],
  },
  'rotate': {
    description: 'Rotate Pages tool lets you rotate individual pages or all pages in your PDF document with precision. You can rotate pages 90, 180, or 270 degrees to fix orientation issues, adjust the viewing angle of scanned documents, or prepare pages for specific viewing or printing requirements. The tool allows you to rotate specific pages individually, so you can fix only the pages that need correction while leaving others unchanged. This is particularly useful for scanned documents that were captured at incorrect angles, fixing pages that were accidentally rotated during scanning, or preparing documents for different viewing orientations. The rotation process preserves all content quality, including text, images, and formatting. Rotated text remains searchable and selectable, maintaining full document functionality. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting PDF maintains high quality and can be downloaded immediately. Perfect for fixing orientation issues in scanned documents, preparing documents for different viewing angles, or correcting pages that were accidentally rotated.',
    relatedTools: ['reorder', 'extract-pages', 'split'],
  },
  'insert-blank': {
    description: 'Insert Blank Pages tool allows you to add empty pages at specific positions in your PDF document. This is useful for adding space for notes, creating page breaks, preparing documents for printing with specific page requirements, or inserting placeholder pages for future content. You can insert blank pages at the beginning, end, or between any existing pages in your document. The tool allows you to specify exactly where to insert pages and how many pages to add. This is perfect for creating space for handwritten notes, adding page breaks for printing, preparing documents for binding, or inserting placeholder pages for future content. The inserted pages match the size and orientation of your existing document pages. All processing happens locally in your browser, ensuring complete privacy and security. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for students who need to add note-taking space, professionals preparing documents for printing, or anyone who needs to add blank pages to their PDFs.',
    relatedTools: ['duplicate-pages', 'reorder', 'merge'],
  },
  'duplicate-pages': {
    description: 'Duplicate Pages tool enables you to copy specific pages within your PDF document effortlessly. Create multiple copies of important pages, forms, or templates without having to manually copy and paste content. You can duplicate individual pages or multiple pages at once, placing the duplicates at any position in your document. This is perfect for creating multiple copies of forms that need to be filled out, duplicating template pages for repeated use, or creating backup copies of important pages within the same document. The duplication process preserves all formatting, images, and text quality from the original pages. Duplicated pages are exact copies, maintaining all visual elements and functionality. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for creating multiple form copies, duplicating template pages, or adding backup pages to important documents.',
    relatedTools: ['insert-blank', 'extract-pages', 'merge'],
  },
  'reverse-order': {
    description: 'Reverse Page Order tool flips the entire page sequence of your PDF document instantly. The last page becomes the first, and vice versa, creating a completely reversed document order. This is useful for correcting document orientation, preparing documents for specific printing requirements, or creating mirror versions of documents. The reversal process preserves all formatting, images, and text quality from the original pages. Every page maintains its original content and quality, just in reverse order. This tool is particularly useful for fixing documents that were scanned in reverse order, preparing documents for different binding methods, or creating alternative document versions. Processing happens instantly in your browser, ensuring complete privacy and security. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for fixing incorrectly ordered documents, preparing documents for different binding methods, or creating alternative document versions.',
    relatedTools: ['reorder', 'rotate', 'split'],
  },
  'split-by-size': {
    description: 'Split by Size tool automatically divides your PDF into multiple files based on a maximum file size limit. Perfect for email attachments, file sharing platforms, or when you need to meet specific file size requirements. The tool analyzes your PDF and intelligently splits it at appropriate points, ensuring each resulting file stays within your specified size limit. You can set custom size limits in KB, MB, or GB, giving you complete control over the output file sizes. This is particularly useful for email systems with attachment size limits, cloud storage platforms with file size restrictions, or when you need to distribute large documents in smaller chunks. The splitting process preserves all formatting, images, and text quality in each resulting file. Each split file maintains the same quality standards as the original document. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting files can be downloaded individually or as a ZIP archive. Perfect for professionals who need to share large documents via email, students submitting assignments with size limits, or anyone who needs to meet specific file size requirements.',
    relatedTools: ['split', 'split-by-bookmarks', 'compress'],
  },
  'split-by-bookmarks': {
    description: 'Split by Bookmarks tool intelligently splits your PDF based on its bookmark or chapter structure. Each bookmark section becomes a separate PDF file, making it ideal for organizing large documents with clear chapter divisions. The tool automatically detects all bookmarks in your PDF and allows you to choose which bookmark level to split at. You can split at top-level chapters, subsections, or any bookmark level that suits your needs. This is perfect for breaking down large technical manuals, academic textbooks, legal documents, or any PDF with a clear hierarchical structure. The splitting process preserves all formatting, images, and text quality in each resulting file. Each split file maintains the same quality standards as the original document, with bookmarks preserved within each file. Processing happens instantly in your browser, ensuring complete privacy and security. The resulting files can be downloaded individually or as a ZIP archive. Perfect for students organizing course materials, professionals managing large document sets, or anyone who needs to break down structured PDFs into manageable chapters.',
    relatedTools: ['split', 'split-by-size', 'extract-pages'],
  },
  // Security & Protection
  'sign': {
    description: 'Digital Signature tool allows you to add a signature to your PDF documents quickly and securely. You can draw your signature using your mouse or touchpad, type your name in various fonts, or upload an image of your signature. Perfect for signing contracts, forms, legal documents, or any document that requires your approval. The tool provides a flexible signature placement system, allowing you to position your signature anywhere on any page of your PDF. You can resize and adjust your signature to match your needs. This is particularly useful for remote work, online document signing, or when you need to sign documents without printing them. The signature is embedded directly into the PDF, making it part of the document itself. All processing happens locally in your browser, ensuring your signature data never leaves your device. The resulting signed PDF maintains high quality and can be downloaded immediately after signing. Perfect for professionals who need to sign documents remotely, students submitting signed assignments, or anyone who needs to add signatures to PDFs without printing.',
    relatedTools: ['certificate', 'redact', 'remove-hidden-data'],
  },
  'redact': {
    description: 'Redact PDF tool permanently removes sensitive information from your documents by blacking it out completely. Once redacted, the information cannot be recovered, making it ideal for protecting privacy and confidential data before sharing. The tool allows you to select specific areas or text to redact, giving you precise control over what information is removed. You can redact text, images, or entire sections of your document. This is particularly important for legal documents, medical records, financial statements, or any document containing sensitive personal information. The redaction process is permanent and irreversible, ensuring that sensitive information cannot be extracted or recovered from the document. All processing happens locally in your browser, ensuring complete privacy and security. The resulting redacted PDF maintains high quality for the visible content and can be downloaded immediately after processing. Perfect for legal professionals protecting client information, healthcare workers safeguarding patient data, or anyone who needs to share documents while protecting sensitive information.',
    relatedTools: ['remove-hidden-data', 'sign', 'certificate'],
  },
  'remove-hidden-data': {
    description: 'Sanitize PDF tool removes all hidden data, metadata, scripts, and embedded content from your PDF files comprehensively. This ensures your documents are clean and safe to share, protecting your privacy and preventing information leakage. The tool removes author information, creation dates, modification dates, software used, comments, annotations, form field data, JavaScript, embedded files, and other hidden content. This is particularly important when sharing documents publicly, submitting documents to third parties, or when privacy is a concern. The sanitization process preserves all visible content, text, images, and formatting while removing all hidden and potentially sensitive information. All processing happens locally in your browser, ensuring your documents never leave your device during the cleaning process. The resulting sanitized PDF maintains high quality for visible content and can be downloaded immediately after processing. Perfect for professionals sharing documents publicly, students submitting assignments, or anyone who wants to ensure their PDFs contain no hidden information before sharing.',
    relatedTools: ['redact', 'sign', 'certificate'],
  },
  'certificate': {
    description: 'Certificate Sign tool allows you to sign PDFs using a digital certificate (X.509), providing a higher level of security and authenticity compared to visual signatures. This makes it suitable for legal documents, official forms, contracts, or any document that requires verified digital signatures. The tool supports standard certificate formats (.pfx and .p12) and allows you to add certificate information including reason for signing and location. Digital certificates provide cryptographic proof of identity and document integrity, making them legally binding in many jurisdictions. The certificate signature is embedded directly into the PDF, creating a tamper-evident seal that shows if the document has been modified after signing. All processing happens locally in your browser, ensuring your certificate and private keys never leave your device. The resulting certificate-signed PDF maintains high quality and can be downloaded immediately after signing. Perfect for legal professionals signing contracts, government workers signing official documents, or anyone who needs verified digital signatures on their PDFs.',
    relatedTools: ['sign', 'remove-hidden-data', 'redact'],
  },
  // Convert
  'pdf-to-images': {
    description: 'PDF to Images tool converts each page of your PDF into high-quality image files with precision. You can choose between PNG, JPEG, or WebP formats, each optimized for different use cases. PNG format preserves perfect quality and supports transparency, JPEG provides smaller file sizes with good quality, and WebP offers modern compression with excellent quality-to-size ratio. Perfect for extracting pages as images, creating thumbnails, preparing content for presentations, or converting PDFs for use in image editing software. The tool allows you to select specific pages to convert or convert all pages at once. Each page is converted as a separate image file, maintaining the original resolution and quality. The conversion process preserves all visual elements including text, images, graphics, and layout. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting images can be downloaded individually or as a ZIP archive. Perfect for designers extracting graphics from PDFs, students creating presentation materials, or anyone who needs to convert PDF pages into image format.',
    relatedTools: ['images-to-pdf', 'pdf-to-word', 'extract-pages'],
  },
  'images-to-pdf': {
    description: 'Images to PDF tool combines multiple image files into a single PDF document seamlessly. Supports PNG, JPEG, WebP, GIF, and BMP formats, making it versatile for various image types. Great for creating photo albums, combining scanned documents, converting image collections into a unified PDF, or creating presentations from images. The tool allows you to upload multiple images and arrange them in your preferred order before creating the PDF. You can drag and drop images to reorder them, ensuring your PDF is organized exactly as you want. Each image becomes a page in the resulting PDF, maintaining its original quality and resolution. The conversion process preserves all image details, colors, and clarity. Processing happens instantly in your browser, ensuring your images never leave your device. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for creating photo albums, combining scanned documents, converting image collections into PDFs, or creating presentations from images.',
    relatedTools: ['pdf-to-images', 'merge', 'pdf-to-word'],
  },
  'pdf-to-word': {
    description: 'PDF to Word tool converts your PDF documents into editable DOCX format with remarkable accuracy. Preserve formatting and layout while making the content editable in Microsoft Word or other word processors. Ideal for editing PDF content, extracting text for editing, or converting PDFs into formats that allow easy modification. The tool intelligently recognizes text, tables, images, and formatting elements, converting them into editable Word format. Tables are converted as actual Word tables, images are embedded, and text formatting is preserved as much as possible. This is particularly useful when you need to edit PDF content, extract text for reuse, or convert PDFs into editable documents. The conversion process maintains document structure, making it easy to edit and modify the content. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting Word document maintains formatting and can be downloaded immediately after conversion. Perfect for professionals who need to edit PDF content, students converting PDFs for editing, or anyone who needs to extract editable text from PDFs.',
    relatedTools: ['pdf-to-text', 'pdf-to-excel', 'pdf-to-images'],
  },
  'pdf-to-excel': {
    description: 'PDF to Excel tool extracts tables and data from PDF files and converts them into XLSX spreadsheets with precision. Perfect for working with tabular data, financial reports, invoices, or any structured information contained in PDF documents. The tool intelligently recognizes table structures, converting them into proper Excel spreadsheets with rows and columns. Data is organized into cells, making it easy to edit, analyze, and manipulate. This is particularly useful for extracting financial data, converting invoices into spreadsheets, or working with tabular data from PDFs. The conversion process preserves data structure and formatting, making it easy to work with the extracted information. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting Excel spreadsheet maintains data organization and can be downloaded immediately after conversion. Perfect for accountants extracting financial data, analysts working with tabular reports, or anyone who needs to convert PDF tables into editable spreadsheets.',
    relatedTools: ['pdf-to-csv', 'pdf-to-word', 'pdf-to-text'],
  },
  'pdf-to-text': {
    description: 'PDF to Text tool extracts all text content from your PDF files and saves it as a plain text file efficiently. Useful for copying content, performing text analysis, converting PDFs to a simple text format for further processing, or extracting text for use in other applications. The tool extracts text from all pages, preserving the reading order and structure. Text is saved in a clean, readable format without formatting codes or special characters. This is particularly useful for text analysis, content extraction, or converting PDFs into simple text format. The extraction process maintains text order and readability, making it easy to work with the extracted content. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting text file can be downloaded immediately after extraction. Perfect for researchers extracting text for analysis, writers converting PDFs for editing, or anyone who needs plain text content from PDFs.',
    relatedTools: ['pdf-to-word', 'pdf-to-markdown', 'pdf-to-csv'],
  },
  'pdf-to-csv': {
    description: 'PDF to CSV tool extracts tabular data from PDF files and converts it into CSV format with accuracy. Perfect for data analysis, importing into spreadsheets, working with structured data from PDF documents, or converting tables for use in data analysis tools. The tool intelligently recognizes table structures and converts them into CSV format with proper comma separation. Data is organized into rows and columns, making it easy to import into Excel, Google Sheets, or other spreadsheet applications. This is particularly useful for data analysis, importing tabular data into databases, or working with structured information from PDFs. The conversion process preserves data structure and organization, making it easy to work with the extracted information. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting CSV files can be downloaded immediately after conversion. Perfect for data analysts extracting tabular data, researchers converting PDF tables for analysis, or anyone who needs to convert PDF tables into CSV format.',
    relatedTools: ['pdf-to-excel', 'pdf-to-text', 'pdf-to-word'],
  },
  'pdf-to-html': {
    description: 'PDF to HTML tool converts PDF documents into web-ready HTML format with precision. Preserves layout and structure while making content viewable in web browsers. Great for publishing PDF content online, converting documents for web use, or creating web pages from PDF content. The tool converts PDF pages into HTML pages, maintaining visual layout, images, and text formatting. The resulting HTML can be viewed in any web browser and can be further edited using HTML editors. This is particularly useful for web developers who need to convert PDFs into web pages, content creators publishing PDF content online, or anyone who needs web-compatible versions of PDF documents. The conversion process preserves visual elements and layout structure, making the HTML version closely match the original PDF. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting HTML file can be downloaded immediately after conversion. Perfect for web developers converting PDFs for websites, content creators publishing online, or anyone who needs web-compatible versions of PDF documents.',
    relatedTools: ['pdf-to-markdown', 'pdf-to-text', 'pdf-to-word'],
  },
  'pdf-to-markdown': {
    description: 'PDF to Markdown tool converts PDF content into Markdown format, making it easy to edit and version control. Perfect for documentation, blog posts, technical writing, or any content that needs to be in a plain text markup format. The tool extracts text content and converts it into Markdown syntax, preserving headings, lists, and basic formatting. The resulting Markdown can be edited in any text editor and is perfect for version control systems like Git. This is particularly useful for technical writers, bloggers, or anyone who needs to convert PDFs into editable Markdown format. The conversion process maintains document structure and hierarchy, making it easy to edit and modify the content. Processing happens instantly in your browser, ensuring your documents never leave your device. The resulting Markdown file can be downloaded immediately after conversion. Perfect for technical writers converting PDFs for documentation, bloggers converting PDFs for blog posts, or anyone who needs Markdown versions of PDF documents.',
    relatedTools: ['pdf-to-text', 'pdf-to-html', 'pdf-to-word'],
  },
  // Edit, Enhance & Content tools (visible descriptions for SEO content depth)
  'compress': {
    description: "Compress PDF tool lets you reduce the file size of your PDF documents while maintaining excellent quality. Perfect for shrinking large reports to meet email attachment limits, speeding up uploads to web portals, or saving storage space on your device. The tool intelligently optimizes images, fonts, and embedded content, applying smart compression that balances size reduction with visual clarity. You can compress scanned documents, image-heavy presentations, or lengthy reports without noticeably degrading readability. Text remains sharp and searchable, while images are optimized to the smallest practical size. This makes it ideal for sharing files faster, archiving documents efficiently, or fitting PDFs within strict size requirements. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals emailing large attachments, students submitting size-limited assignments, or anyone who needs smaller PDF files.",
    relatedTools: ['optimize-images', 'grayscale', 'split-by-size'],
  },
  'add-watermark': {
    description: "Add Watermark tool enables you to overlay text or an image watermark across the pages of your PDF document. Perfect for marking documents as Confidential or Draft, branding files with your company logo, or protecting your work with a copyright notice before sharing. The tool gives you full control over watermark placement, opacity, rotation, size, and color, so you can apply a subtle background stamp or a bold, prominent overlay. You can watermark every page or select specific pages, ensuring consistent branding throughout your document. This is ideal for protecting intellectual property, indicating document status, or adding professional branding to reports and proposals. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for businesses branding documents, freelancers protecting their work, or anyone marking PDFs before distribution.",
    relatedTools: ['page-numbers', 'flatten', 'redact'],
  },
  'page-numbers': {
    description: "Add Page Numbers tool allows you to insert page numbers into your PDF document with custom positioning and formatting. Perfect for paginating lengthy reports, numbering academic papers and theses, or preparing legal documents and manuals for print. The tool lets you choose exactly where numbers appear, whether top or bottom, left, center, or right, and customize the font, size, and starting number to match your needs. You can apply numbering across the entire document or skip specific pages such as cover sheets. This is ideal for professionals finalizing reports, students formatting dissertations, or anyone who needs clearly referenced pages. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals preparing formal reports, students formatting academic papers, or anyone organizing multi-page PDFs for print.",
    relatedTools: ['add-watermark', 'add-bookmarks', 'merge'],
  },
  'crop': {
    description: "Crop Pages tool lets you trim away unwanted margins and borders from your PDF pages with precision. Perfect for removing excess white space around scanned documents, cutting off black scanner edges, or focusing the page on essential content for cleaner printing and viewing. The tool provides an intuitive interface to set crop boundaries visually, and you can apply the same crop to every page or adjust individual pages as needed. This is particularly useful for tidying up scanned books, optimizing documents for smaller screens, or preparing pages for presentations and reports. The cropping process preserves all text, images, and formatting within the retained area. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for students cleaning up scanned materials, designers refining page layouts, or anyone removing unwanted PDF margins.",
    relatedTools: ['resize', 'rotate', 'grayscale'],
  },
  'resize': {
    description: "Resize Pages tool allows you to change the page size of your PDF document to standard formats like A4 and Letter or to custom dimensions. Perfect for standardizing mixed-size documents before printing, converting between paper formats for international sharing, or fitting pages to specific layout requirements. The tool lets you select from common presets or enter your own width and height, and it scales content to fit the new dimensions while preserving aspect ratio and readability. This is ideal for preparing documents for print shops, unifying scanned pages of varying sizes, or adapting PDFs to regional paper standards. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals preparing documents for print, students standardizing assignments, or anyone who needs consistent PDF page sizes.",
    relatedTools: ['crop', 'rotate', 'merge'],
  },
  'grayscale': {
    description: "Grayscale PDF tool lets you convert a colored PDF into black and white, transforming every page into clean grayscale tones. Perfect for reducing file size, preparing documents for black-and-white printing to save on color ink, or creating a more uniform, professional look for reports and handouts. The tool processes all pages automatically, converting colored text, images, and graphics into smooth shades of gray while preserving sharpness and detail. This is ideal for printing lengthy documents economically, archiving files in a consistent format, or removing distracting colors before sharing. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals preparing documents for monochrome printing, students saving on ink costs, or anyone who needs a clean black-and-white PDF.",
    relatedTools: ['invert-colors', 'compress', 'optimize-images'],
  },
  'invert-colors': {
    description: "Invert Colors tool lets you flip the colors of your PDF, turning bright white backgrounds into dark ones and black text into light, creating a comfortable dark mode reading experience. This is perfect for reducing eye strain during late-night study sessions, reading lengthy documents on screens for hours, or making PDFs easier to view in low-light environments. The tool inverts every color across all pages while keeping text crisp, readable, and fully selectable, so your document remains functional after the transformation. You can apply the inversion to an entire document in a single operation, instantly producing a dark-themed version ready for screen viewing. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for students reading at night, professionals reviewing documents on screen, and anyone who prefers dark mode for comfortable reading.",
    relatedTools: ['grayscale', 'optimize-images', 'compress'],
  },
  'flatten': {
    description: "Flatten PDF tool allows you to merge form fields, annotations, and interactive elements directly into the static page content, locking them in place permanently. This is ideal for finalizing completed forms before sharing, preventing recipients from editing filled-in data, or ensuring your document displays consistently across every PDF viewer and printer. When you flatten a PDF, fillable fields, checkboxes, comments, and markups become part of the page itself, so the visible result is preserved exactly as intended without any editable layers. This is especially useful for submitting official forms, archiving signed documents, or distributing files that must not be altered. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals finalizing forms, businesses distributing locked documents, and anyone who needs tamper-resistant, print-ready PDFs.",
    relatedTools: ['remove-annotations', 'sign', 'remove-hidden-data'],
  },
  'remove-annotations': {
    description: "Remove Annotations tool enables you to strip all comments, highlights, sticky notes, and markups from your PDF, leaving behind a clean, distraction-free document. This is perfect for clearing reviewer feedback before publishing, removing collaborative notes from a finalized draft, or preparing a polished version of a document that was marked up during editing. The tool detects and removes every annotation layer across all pages in a single operation, while preserving the underlying text, images, and formatting exactly as they appear. This makes it especially useful for finalizing reports, cleaning up shared documents, or producing a professional copy free of editorial clutter. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for editors finalizing manuscripts, teams cleaning up reviewed documents, and anyone who needs a clean, annotation-free PDF.",
    relatedTools: ['flatten', 'remove-hidden-data', 'redact'],
  },
  'extract-images': {
    description: "Extract Images tool allows you to pull out all embedded images from a PDF and save them as separate image files quickly and easily. This is perfect for recovering photos and graphics from a report, repurposing illustrations for presentations, or collecting product images from a catalog without manually screenshotting each one. The tool scans every page, detects all embedded images, and extracts them at their original resolution, preserving the full quality of each picture. You can download the extracted images individually or as a convenient ZIP archive, making it simple to reuse visual assets in other projects. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting images maintain high quality and can be downloaded immediately after processing. Perfect for designers reusing graphics, marketers gathering product photos, and anyone who needs to extract images from PDF documents.",
    relatedTools: ['pdf-to-images', 'remove-images', 'optimize-images'],
  },
  'remove-images': {
    description: "Remove Images tool lets you strip all images from a PDF while keeping the text content fully intact, producing a lightweight, text-only document. This is perfect for dramatically reducing file size before emailing, creating clean text versions for reading or printing, or eliminating photos and graphics from documents where only the written content matters. The tool detects and removes every embedded image across all pages in a single operation, leaving the text, layout, and formatting fully preserved and searchable. This makes it especially useful for shrinking bulky image-heavy reports, preparing distraction-free reading copies, or saving on storage and bandwidth. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for students printing text-only notes, professionals reducing file sizes, and anyone who needs the written content without the images.",
    relatedTools: ['extract-images', 'optimize-images', 'compress'],
  },
  'optimize-images': {
    description: "Optimize Images tool enables you to downscale and compress the images inside your PDF, significantly reducing file size while keeping the document looking sharp and professional. This is perfect for shrinking image-heavy reports for email attachments, meeting upload size limits on web portals, or speeding up sharing and storage of bulky presentations and catalogs. The tool intelligently downscales oversized images and applies efficient compression to each one, balancing a smaller footprint with strong visual quality across every page. This makes it especially useful for distributing large documents, archiving files efficiently, or preparing PDFs for fast online delivery. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for professionals emailing large reports, businesses optimizing documents for the web, and anyone who needs a smaller, faster PDF.",
    relatedTools: ['compress', 'remove-images', 'extract-images'],
  },
  'add-qr-code': {
    description: "Add QR Code tool lets you insert scannable QR codes containing links or text directly onto your PDF pages. Perfect for adding a website link to a flyer, embedding contact details in a brochure, or placing a payment or download URL on an invoice or event ticket. You can encode any URL or plain text, then position and size the QR code precisely on the page you choose, so it sits exactly where readers will scan it. The code is rendered crisply at print quality for reliable scanning from screen or paper. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for marketers building print campaigns, event organizers creating tickets and passes, and small business owners linking documents to online resources.",
    relatedTools: ['add-barcode', 'add-hyperlinks', 'add-watermark'],
  },
  'add-barcode': {
    description: "Add Barcode tool enables you to insert machine-readable barcodes, including Code128, EAN, and UPC formats, directly into your PDF documents. Perfect for labeling product catalogs with UPC codes, adding tracking numbers to shipping and inventory sheets, or generating retail price tags and asset labels from a single file. You choose the barcode symbology, enter your data, and position the barcode precisely on the page so it aligns with your layout. Each barcode is rendered at sharp, print-ready resolution for dependable scanning at the register or warehouse. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for retailers preparing product labels, warehouse and logistics teams managing inventory, and small businesses producing scannable documents in-house.",
    relatedTools: ['add-qr-code', 'page-numbers', 'add-attachments'],
  },
  'add-bookmarks': {
    description: "Add Bookmarks tool allows you to create or edit bookmarks and build a navigable table of contents inside your PDF. Perfect for structuring long reports with jump-to chapter links, helping readers move quickly through ebooks and manuals, or organizing scanned multi-section documents into an outline. You can add new bookmark entries, rename or reorder existing ones, and point each bookmark to the exact page it should open, giving your document a clean, clickable navigation panel. The bookmark structure appears in any standard PDF reader's sidebar for instant access. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for authors publishing ebooks, professionals preparing lengthy reports, and educators organizing course material for easy navigation.",
    relatedTools: ['split-by-bookmarks', 'add-hyperlinks', 'page-numbers'],
  },
  'add-hyperlinks': {
    description: "Add Hyperlinks tool lets you add or edit clickable links in your PDF so readers can jump straight to web pages or other destinations. Perfect for linking a report's citations to their sources, turning email addresses and URLs in a brochure into clickable elements, or directing readers from a document to related online resources. You can place links over specific text or regions, set the target URL, and adjust or remove existing links to keep every reference current and working. The links remain fully interactive in any standard PDF viewer. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for marketers building interactive brochures, researchers citing online sources, and professionals creating reference-rich documents.",
    relatedTools: ['add-bookmarks', 'add-qr-code', 'add-watermark'],
  },
  'add-attachments': {
    description: "Embed Attachments tool allows you to embed files such as images, documents, and data directly inside a PDF, so everything travels together as one package. Perfect for bundling a spreadsheet with a financial report, attaching supporting evidence to a legal filing, or including raw data files alongside a research paper. You can embed multiple files of different types into a single PDF, where they remain accessible to recipients through any standard PDF reader's attachments panel without altering the visible pages. This keeps related materials organized and ensures nothing gets separated in transit. All processing happens locally in your browser, ensuring complete privacy and security. No files are uploaded to any server, so your sensitive documents remain confidential. The resulting PDF maintains high quality and can be downloaded immediately after processing. Perfect for legal professionals assembling case files, researchers sharing datasets, and analysts delivering reports with source data.",
    relatedTools: ['merge', 'add-bookmarks', 'remove-hidden-data'],
  },
};

export default function ToolInfo({ tool }: ToolInfoProps) {
  const { t, locale } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const info = toolInfo[tool.id];
  
  if (!info) {
    return null; // Don't show anything if tool info is not defined
  }

  const relatedTools = info.relatedTools
    .map(id => allTools.find(t => t.id === id))
    .filter((t): t is PdfTool => t !== undefined)
    .slice(0, 3); // Limit to 3 related tools

  if (relatedTools.length === 0) {
    return null; // Don't show if no related tools available
  }

  return (
    <div className="mt-6 p-6 rounded-xl border border-surface-700/50 bg-gradient-to-br from-surface-900/40 to-surface-800/20 animate-fade-in backdrop-blur-sm">
      {/* Tool Description */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} strokeWidth={2} className="text-primary-400" />
          <h3 className="text-sm font-semibold text-surface-200">{t('tools.info.about') ?? 'About this tool'}</h3>
        </div>
        <p className="text-sm text-surface-400 leading-relaxed">
          {(() => {
            const key = `tools.info.${tool.id}.description`;
            const val = t(key);
            return val === key ? info.description : val;
          })()}
        </p>
      </div>

      {/* Related Tools */}
      <div className="pt-6 border-t border-surface-700/30">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} strokeWidth={2} className="text-accent-400" />
          <h3 className="text-sm font-semibold text-surface-200">{t('tools.info.related') ?? 'You might also need'}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {relatedTools.map(relatedTool => {
            const colorMap: Record<string, string> = {
              primary: 'border-primary-500/30 bg-primary-500/5 hover:bg-primary-500/10 hover:border-primary-500/50 text-primary-300',
              accent: 'border-accent-500/30 bg-accent-500/5 hover:bg-accent-500/10 hover:border-accent-500/50 text-accent-300',
              success: 'border-success-500/30 bg-success-500/5 hover:bg-success-500/10 hover:border-success-500/50 text-success-300',
              error: 'border-error-500/30 bg-error-500/5 hover:bg-error-500/10 hover:border-error-500/50 text-error-300',
              warning: 'border-warning-500/30 bg-warning-500/5 hover:bg-warning-500/10 hover:border-warning-500/50 text-warning-300',
              info: 'border-info-500/30 bg-info-500/5 hover:bg-info-500/10 hover:border-info-500/50 text-info-300',
            };
            const colorClass = colorMap[relatedTool.color] || colorMap.primary;
            
            return (
              <Link
                key={relatedTool.id}
                href={`/${locale}/tools/${relatedTool.id}`}
                className={`group relative p-4 rounded-lg border transition-all duration-200 ${colorClass}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {relatedTool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold mb-1 group-hover:underline">
                      {tr(`tools.items.${relatedTool.id}.title`, relatedTool.title)}
                    </h4>
                    <p className="text-xs opacity-75 line-clamp-2">
                      {tr(`tools.items.${relatedTool.id}.desc`, relatedTool.description)}
                    </p>
                  </div>
                  <ArrowRight 
                    size={14} 
                    strokeWidth={2} 
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 mt-0.5" 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
