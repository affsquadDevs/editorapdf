import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-add-headers-and-footers-to-pdf'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Add Headers and Footers to PDF_ Complete Guide to Customizing PDF Documents.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Add Headers and Footers to PDF: Complete Guide to Customizing PDF Documents',
    metaDesc: 'Learn how to add custom headers and footers to PDF documents online. Insert page numbers, titles, dates, and branding elements in minutes.',
    ogTitle: 'How to Add Headers and Footers to PDF: Complete Guide to Customizing PDF Documents',
    ogDesc: 'Learn how to add custom headers and footers to PDF documents online. Insert page numbers, titles, dates, and branding elements in minutes.',
    twTitle: 'How to Add Headers and Footers to PDF: Complete Guide to Customizing PDF Documents',
    twDesc: 'Learn how to add custom headers and footers to PDF documents online. Insert page numbers, titles, dates, and branding elements in minutes.',
    ogAlt: 'Illustration showing a PDF document being enhanced with headers and footers including page numbers and document title',
    heroAlt: 'How to add headers and footers to PDF - Free online tool guide',

    bcLeaf: 'How to Add Headers and Footers to PDF',
    heroTitle: 'How to Add Headers and Footers to PDF: Complete Guide to Customizing PDF Documents',
    heroSubtitle: 'Learn how to add professional headers and footers to PDF documents online. Add page numbers, dates, text, logos, and custom content without software installation.',

    artHeadline: 'How to Add Headers and Footers to PDF - Complete Guide to Customizing PDF Documents',
    artDesc: 'Complete guide on how to add headers and footers to PDF documents online. Learn to add page numbers, dates, text, logos, and custom content to PDF headers and footers using free online tools. Step-by-step instructions, tips, and best practices.',

    intro1: "You've created a professional document, but something's missing. It needs page numbers, your company logo, or maybe a document title that appears on every page. Headers and footers are those essential elements that transform a basic PDF into a polished, professional document. Whether you're preparing a business report, academic paper, or legal document, adding headers and footers gives your PDFs the finishing touch they need.",
    intro2: 'The good news? You don\'t need expensive software or design expertise. Modern online PDF header footer tools make adding professional headers and footers as straightforward as uploading a file and customizing your content. This comprehensive guide will walk you through everything you need to know about adding headers and footers to PDFs online, from understanding different header footer types to handling complex formatting and ensuring your documents look professional.',

    s1h: 'The Problem: Why Adding Headers and Footers Can Be Challenging',
    s1p1: "PDFs are great for preserving document formatting, but they weren't originally designed with easy header and footer editing in mind. Unlike Word documents where you can simply double-click the header area to edit, PDF files require specialized tools to add or modify headers and footers. This creates several challenges for users who need to customize their documents.",
    s1p2: "Here's what makes adding headers and footers to PDFs challenging:",
    s1l1s: 'No built-in editing:',
    s1l1t: " Most PDF viewers don't allow you to edit headers and footers directly, requiring specialized tools",
    s1l2s: 'Formatting complexity:',
    s1l2t: ' Positioning text, images, and page numbers correctly across different page sizes requires precise calculations',
    s1l3s: 'Page range variations:',
    s1l3t: ' Different pages often need different headers and footers (first page, odd/even pages, chapter pages)',
    s1l4s: 'Content preservation:',
    s1l4t: ' Adding headers and footers must not interfere with existing document content',
    s1l5s: 'Software requirements:',
    s1l5t: ' Desktop PDF editing software often requires installation, updates, and sometimes payment',
    s1l6s: 'Learning curve:',
    s1l6t: ' Professional PDF editors have complex interfaces that can be overwhelming for simple tasks',
    s1l7s: 'Consistency challenges:',
    s1l7t: ' Maintaining consistent header footer formatting across multiple documents is time-consuming',
    s1p3: "These pain points are exactly why online PDF header footer tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure. You can add professional headers and footers without learning complex software or compromising your document's security.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: 'You might think headers and footers are just decorative elements, but they serve critical functions in professional documents. Consider these everyday scenarios where headers and footers are essential:',
    s2l1s: 'Business professionals',
    s2l1t: ' adding company logos, document titles, and page numbers to reports and proposals',
    s2l2s: 'Students',
    s2l2t: ' including page numbers, course names, and dates in academic papers and assignments',
    s2l3s: 'Legal teams',
    s2l3t: ' adding case numbers, document titles, and confidentiality notices to legal documents',
    s2l4s: 'HR departments',
    s2l4t: ' including company letterheads, document dates, and page numbers in employee handbooks and policies',
    s2l5s: 'Healthcare workers',
    s2l5t: ' adding patient identifiers, dates, and page numbers to medical records',
    s2l6s: 'Real estate agents',
    s2l6t: ' including property addresses, dates, and page numbers in property documents',
    s2l7s: 'Accountants',
    s2l7t: ' adding client names, report dates, and page numbers to financial statements',
    s2l8s: 'Content creators',
    s2l8t: ' branding documents with logos, website URLs, and copyright information',
    s2p2: "The time wasted on manual header footer management adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Inconsistent formatting across documents',
    s2m2: 'Misaligned headers and footers that look unprofessional',
    s2m3: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m4: 'Frustration and decreased productivity',
    s2m5: 'Poor document quality that undermines your professional image',
    s2m6: 'Lost time trying to manually position elements',
    s2p3: "That's why understanding how to add headers and footers properly isn't just about convenience—it's about creating professional, consistent documents efficiently and securely. In a world where PDF documents are the standard format for professional communication, properly formatted headers and footers can make the difference between a document that looks polished and one that looks amateur.",

    s3h: 'The Solution: Modern Online PDF Header Footer Tools',
    s3p1: 'The solution to PDF header footer headaches is simpler than you might expect. Modern web-based PDF header footer tools handle all the technical complexity behind the scenes, giving you a clean interface to customize your documents in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Add headers and footers in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Multiple content types:',
    s3l6t: ' Add text, page numbers, dates, images, and custom formatting—all in one tool',
    s3l7s: 'Flexible positioning:',
    s3l7t: ' Place headers and footers anywhere with precise control',
    s3p3: "The best part? You don't need to understand how PDF header footer processing works technically. The tool handles positioning, formatting, and content integration automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF header footer tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Add Headers and Footers Using Our Tool',
    s4p1: "Ready to add headers and footers to your PDF? Follow these steps to customize your document quickly and easily. We'll cover adding text, page numbers, dates, images, and custom formatting.",

    s4st1h: 'Step 1: Access the PDF Header Footer Tool',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF header footer page',
    s4st1p1b: ". You'll see a clean interface with a file upload area and customization options. No account creation or login required—you can start adding headers and footers immediately.",

    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25 MB (for optimal performance)',
    s4st2l3: 'Any PDF file, regardless of page count',
    s4st2l4a: 'Password-protected PDFs (you\'ll need to unlock them first using our ',
    s4st2l4link: 'PDF editing tool',
    s4st2l4b: ')',
    s4st2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count. This helps you plan your header and footer customization.",

    s4st3h: 'Step 3: Choose Header or Footer (or Both)',
    s4st3p1: 'Decide whether you want to add a header, footer, or both. Most professional documents use both:',
    s4st3l1s: 'Headers:',
    s4st3l1t: ' Typically contain document titles, company names, logos, or chapter names',
    s4st3l2s: 'Footers:',
    s4st3l2t: ' Usually contain page numbers, dates, copyright information, or document paths',
    s4st3p2: "You can enable or disable headers and footers independently, giving you full control over your document's appearance.",

    s4st4h: 'Step 4: Add Your Content',
    s4st4p1: 'This is where you customize what appears in your headers and footers. Most tools offer several content options:',
    s4st4ah: 'Option A: Add Text Content',
    s4st4ap1: 'You can add any text to your headers and footers, such as:',
    s4st4al1: 'Document titles or names',
    s4st4al2: 'Company or organization names',
    s4st4al3: 'Author names',
    s4st4al4: 'Chapter or section titles',
    s4st4al5: 'Copyright notices',
    s4st4al6: 'Custom text or labels',
    s4st4ap2: 'Simply type your text into the header or footer text field. You can format it with different fonts, sizes, and colors.',
    s4st4bh: 'Option B: Add Page Numbers',
    s4st4bp1: 'Page numbers are one of the most common footer elements. You can customize:',
    s4st4bl1: 'Format: "Page 1", "1 of 10", "1/10", or just "1"',
    s4st4bl2: 'Starting number: Begin numbering from any page number',
    s4st4bl3: 'Position: Left, center, or right alignment',
    s4st4bl4: 'Style: Font, size, and color',
    s4st4bp2: 'Most tools have a checkbox or toggle to enable automatic page numbering, which updates automatically for each page.',
    s4st4ch: 'Option C: Add Dates',
    s4st4cp1: 'You can add dates to headers or footers in various formats:',
    s4st4cl1: 'Current date (automatically updates when document is opened)',
    s4st4cl2: 'Creation date (fixed date when document was created)',
    s4st4cl3: 'Custom date format (MM/DD/YYYY, DD-MM-YYYY, etc.)',
    s4st4cp2: 'Date fields are particularly useful for reports, invoices, and time-sensitive documents.',
    s4st4dh: 'Option D: Add Images or Logos',
    s4st4dp1: 'Many tools allow you to upload images (PNG, JPG, SVG) to headers and footers:',
    s4st4dl1: 'Company logos',
    s4st4dl2: 'Letterhead graphics',
    s4st4dl3: 'Decorative elements',
    s4st4dl4: 'Watermarks or stamps',
    s4st4dp2: 'You can usually resize and position images within the header or footer area. This is perfect for branding documents with your company logo.',

    s4st5h: 'Step 5: Customize Position and Alignment',
    s4st5p1: "Once you've added your content, you need to position it correctly. Most tools offer:",
    s4st5l1s: 'Horizontal alignment:',
    s4st5l1t: ' Left, center, or right alignment within the header or footer area',
    s4st5l2s: 'Vertical position:',
    s4st5l2t: ' Adjust how far from the top (header) or bottom (footer) your content appears',
    s4st5l3s: 'Margins:',
    s4st5l3t: ' Control the distance from page edges to prevent overlap with content',
    s4st5l4s: 'Multiple elements:',
    s4st5l4t: ' Some tools allow you to add multiple elements (e.g., logo on left, title in center, date on right)',
    s4st5p2s: 'Pro tip:',
    s4st5p2t: ' Preview your changes before applying them. Most tools show a live preview so you can see exactly how your headers and footers will look.',

    s4st6h: 'Step 6: Configure Page Range Options',
    s4st6p1: 'Many documents need different headers and footers on different pages. Most tools allow you to:',
    s4st6l1s: 'Apply to all pages:',
    s4st6l1t: ' Same header/footer on every page',
    s4st6l2s: 'Skip first page:',
    s4st6l2t: ' No header/footer on the title page',
    s4st6l3s: 'Different odd/even pages:',
    s4st6l3t: ' Different headers for odd and even pages (useful for books)',
    s4st6l4s: 'Custom page ranges:',
    s4st6l4t: ' Apply headers/footers to specific pages only',
    s4st6p2: 'This flexibility is essential for professional documents like reports, books, or legal documents that have different formatting requirements for different sections.',

    s4st7h: 'Step 7: Style Your Headers and Footers',
    s4st7p1: 'Make your headers and footers look professional with styling options:',
    s4st7l1s: 'Font selection:',
    s4st7l1t: ' Choose from various fonts (Arial, Times New Roman, Helvetica, etc.)',
    s4st7l2s: 'Font size:',
    s4st7l2t: ' Adjust text size to match your document style',
    s4st7l3s: 'Font color:',
    s4st7l3t: ' Set text color (black, gray, or custom colors)',
    s4st7l4s: 'Bold/Italic:',
    s4st7l4t: ' Apply text formatting for emphasis',
    s4st7l5s: 'Background:',
    s4st7l5t: ' Some tools allow background colors or borders',
    s4st7p2: "Consistent styling across all pages creates a professional, polished look. Match your header footer style to your document's overall design.",

    s4st8h: 'Step 8: Preview and Review',
    s4st8p1: 'Before applying headers and footers, take a moment to review:',
    s4st8l1: 'Content is correct (text, page numbers, dates)',
    s4st8l2: 'Positioning looks good (not overlapping content)',
    s4st8l3: 'Styling matches your document',
    s4st8l4: 'Page range settings are correct',
    s4st8l5: 'Multiple pages look consistent',
    s4st8p2: 'Most tools provide a preview mode where you can scroll through pages to see how headers and footers appear. Use this to catch any issues before finalizing.',

    s4st9h: 'Step 9: Apply Headers and Footers',
    s4st9p1: 'Once everything looks good, click the "Apply" or "Add Headers and Footers" button. The tool will:',
    s4st9o1: 'Process your PDF file',
    s4st9o2: 'Add headers and footers to each specified page',
    s4st9o3: 'Position content according to your settings',
    s4st9o4: 'Generate your modified PDF file',
    s4st9p2: 'Processing time depends on:',
    s4st9l1: 'Total page count of your PDF',
    s4st9l2: 'Number of pages getting headers/footers',
    s4st9l3: 'Complexity of content (images take longer than text)',
    s4st9l4: "Your device's processing power",
    s4st9p3: 'For typical documents (50-100 pages), this usually takes just a few seconds. Larger documents might take 30-60 seconds. You\'ll see a progress indicator during processing.',

    s4st10h: 'Step 10: Download Your Modified PDF',
    s4st10p1: 'When processing completes, your PDF with headers and footers is ready. Click the download button to save it to your device. The file will typically keep your original filename with a suffix like "_with_headers" or you can rename it.',
    s4st10p2s: 'Important:',
    s4st10p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your modified PDF before closing the page.',
    s4st10p3: "That's it! You've successfully added headers and footers to your PDF. The entire process typically takes less than three minutes from start to finish, and you now have a professional-looking document with properly formatted headers and footers.",

    s5h: 'Benefits of Using Online PDF Header Footer Tools',
    s5p1: 'Why choose an online PDF header footer tool over desktop software or manual methods? Here are the key advantages:',
    s5b1h: '1. Zero Installation Required',
    s5b1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start adding headers and footers. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to customize PDFs on the go.",
    s5b2h: '2. Privacy and Security',
    s5b2p1: 'When you use a privacy-first PDF header footer tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5b2l1: 'Confidential business documents',
    s5b2l2: 'Personal financial information',
    s5b2l3: 'Legal documents',
    s5b2l4: 'Medical records',
    s5b2l5: 'Any sensitive data',
    s5b2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5b3h: '3. Cost-Effective Solution',
    s5b3p1: 'Most online PDF header footer tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF customization, free online tools provide excellent value without any financial commitment.',
    s5b4h: '4. Multiple Content Types in One Tool',
    s5b4p1: 'Unlike desktop software that might require separate tools for different content types, online tools often offer everything in one place: text, page numbers, dates, images, and custom formatting. This flexibility means you can handle all your header footer needs without switching tools.',
    s5b5h: '5. Cross-Platform Compatibility',
    s5b5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF header footer tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5b6h: '6. Always Up-to-Date',
    s5b6p1: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5b7h: '7. Speed and Efficiency',
    s5b7p1: 'Modern browser-based PDF processing is surprisingly fast. You can add headers and footers in seconds, compared to:',
    s5b7l1: "Manual copy-paste methods (which don't work well with PDFs anyway)",
    s5b7l2: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5b7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5b7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5b8h: '8. Easy Experimentation',
    s5b8p1: "Online tools make it easy to experiment with different header footer designs. You can quickly try different positions, styles, and content without committing to changes. If something doesn't look right, you can adjust and reapply in seconds.",

    s6h: 'Comparison: Online PDF Header Footer Tools vs. Other Methods',
    s6p1: "How do online PDF header footer tools stack up against alternatives? Let's break down the comparison:",
    s6c1h: 'Online PDF Header Footer Tools vs. Desktop Software',
    s6c1p1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6c1al1: '✅ More advanced features (complex formatting, templates, etc.)',
    s6c1al2: '✅ Works offline',
    s6c1al3: '✅ Better for very large files (500+ pages)',
    s6c1al4: '❌ Requires installation and updates',
    s6c1al5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1al6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1al7: '❌ Takes up disk space',
    s6c1al8: '❌ Steeper learning curve',
    s6c1p2: 'Online PDF Header Footer Tools:',
    s6c1bl1: '✅ Free to use',
    s6c1bl2: '✅ No installation required',
    s6c1bl3: '✅ Works on any platform',
    s6c1bl4: '✅ Always up-to-date',
    s6c1bl5: '✅ Privacy-first (client-side processing)',
    s6c1bl6: '✅ Multiple content types in one tool',
    s6c1bl7: '✅ Easy to use interface',
    s6c1bl8: '❌ Requires internet connection (for initial page load)',
    s6c1bl9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1p3s: 'Verdict:',
    s6c1p3t: ' For adding headers and footers specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just headers and footers, or if you regularly work with very large files.',
    s6c2h: 'Online PDF Header Footer Tools vs. Cloud-Based Services',
    s6c2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c2al1: '✅ Integrated with cloud storage',
    s6c2al2: '✅ Can access files from anywhere',
    s6c2al3: '✅ Often free with cloud storage accounts',
    s6c2al4: '❌ Files uploaded to servers (privacy concern)',
    s6c2al5: '❌ Requires account creation',
    s6c2al6: '❌ Storage limits apply',
    s6c2al7: '❌ Files may be retained on servers',
    s6c2al8: '❌ Slower processing (upload/download time)',
    s6c2al9: '❌ Limited header footer customization options',
    s6c2p2: 'Client-Side Online Tools:',
    s6c2bl1: '✅ No file uploads (privacy-first)',
    s6c2bl2: '✅ No account required',
    s6c2bl3: '✅ Faster processing (no upload/download)',
    s6c2bl4: '✅ No storage limits',
    s6c2bl5: '✅ Files never leave your device',
    s6c2bl6: '✅ More customization options',
    s6c2bl7: "❌ Can't access files from cloud storage directly",
    s6c2p3s: 'Verdict:',
    s6c2p3t: ' For privacy-conscious users, client-side online tools are superior. Cloud services are better if you need to add headers and footers to files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6c3h: 'Online PDF Header Footer Tools vs. Manual Methods',
    s6c3p1: 'Some people try to add headers and footers manually using methods like:',
    s6c3l1: 'Printing PDFs to a new PDF with headers (slow, quality loss, inconsistent)',
    s6c3l2: 'Using image editing software to add headers (time-consuming, not scalable)',
    s6c3l3: "Copy-pasting content (doesn't work well with PDFs)",
    s6c3l4: 'Using freeware with ads and malware risks',
    s6c3p2s: 'Verdict:',
    s6c3p2t: " Online PDF header footer tools are faster, produce better quality results, maintain consistency, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    faqH: 'Frequently Asked Questions About Adding Headers and Footers to PDFs',

    s8h: 'Conclusion: Making PDF Headers and Footers Simple',
    s8p1: "Adding headers and footers to PDF documents doesn't have to be complicated. With modern online PDF header footer tools, customizing your documents with professional headers and footers is straightforward, fast, and secure. Whether you're a business professional branding reports, a student formatting academic papers, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF header footer tools—no installation, privacy-first processing, free access, multiple content types, and cross-platform compatibility—make them the ideal solution for most header footer needs. While desktop software has its place for advanced PDF editing tasks, adding headers and footers is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Plan your header footer content before adding it',
    s8l2: 'Keep files under 25 MB for best performance',
    s8l3: 'Use privacy-first tools that process files locally',
    s8l4: 'Preview your changes before applying them',
    s8l5: 'Maintain consistent styling across all pages',
    s8l6: 'Adjust margins to prevent content overlap',
    s8l7: "Keep backups of original files until you're satisfied with the results",
    s8p4a: 'Ready to add headers and footers to your PDFs? Try our ',
    s8p4link1: 'free PDF header footer tool',
    s8p4b: ' and experience how simple customizing documents can be. And if you need to make other edits to your PDFs, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle document customization quickly and confidently, leaving more time for the work that actually matters. Professional-looking headers and footers are just a few clicks away.",

    // Related Articles
    relA1Title: 'How to Merge PDF Files Online',
    relA1Desc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    relA2Title: 'How to Edit a PDF Online',
    relA2Desc: 'Complete guide to editing PDF files online without installing software.',
    relA3Title: 'How to Split PDF Files Online',
    relA3Desc: 'Learn how to divide large PDF files into smaller documents using free online tools.',
    relA4Title: 'How to Add Page Numbers to PDF',
    relA4Desc: 'Complete guide to adding automatic page numbers to PDF documents online.',

    // Visible FAQ (12)
    fv1q: 'How do I add headers and footers to a PDF online for free?',
    fv1aa: 'You can add headers and footers to PDF files online for free by using our ',
    fv1alink: 'PDF header footer tool',
    fv1ab: '. Simply upload your PDF file, customize your header and footer content (text, page numbers, dates, images, etc.), choose the position and styling, and apply them to your document. The tool processes files locally in your browser, ensuring privacy and security. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to add headers and footers to PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF header footer tool that processes files locally in your browser, your documents never leave your device. All processing happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I add page numbers to PDF headers or footers?',
    fv3a: 'Absolutely. Most online PDF header footer tools allow you to add automatic page numbers to headers or footers. You can customize the format (e.g., "Page 1 of 10", "1/10", or just "1"), choose the starting page number, and position the page numbers anywhere in the header or footer area. Page numbers update automatically for each page, making it easy to number large documents consistently.',
    fv4q: 'Can I add different headers and footers to different pages?',
    fv4a: 'Yes, advanced PDF header footer tools allow you to apply different headers and footers to different page ranges. For example, you can have one header for the first page (or no header on the first page), another for odd pages, and another for even pages. This is useful for documents with title pages, chapter pages, or different sections. Some tools also allow you to specify custom page ranges for different header footer configurations.',
    fv5q: 'What content can I add to PDF headers and footers?',
    fv5a: 'You can add various types of content to PDF headers and footers, including: text (company name, document title, author name, custom text), page numbers (automatic or custom formats like "Page 1 of 10"), dates (current date, creation date, or custom dates in various formats), images (logos, watermarks, decorative elements in PNG, JPG, or SVG format), and custom formatting (fonts, colors, sizes, alignment). Most tools support combining multiple elements in a single header or footer.',
    fv6q: 'Will adding headers and footers affect my PDF content?',
    fv6a: 'No, adding headers and footers should not affect your existing PDF content when done properly. Headers and footers are added to the margins of your document, outside the main content area. However, if your PDF already has content very close to the edges, headers and footers might overlap. Most tools allow you to adjust margins to prevent this, and some tools automatically detect content and adjust header footer positioning accordingly.',
    fv7q: 'Can I add images or logos to PDF headers and footers?',
    fv7a: 'Yes, many online PDF header footer tools support adding images and logos to headers and footers. You can upload image files (PNG, JPG, SVG) and position them in your header or footer. This is commonly used for adding company logos, letterheads, or decorative elements to professional documents. Most tools allow you to resize images and position them alongside text content.',
    fv8q: 'Do I need to create an account to add headers and footers to PDFs?',
    fv8a: 'No, many free PDF header footer tools work without requiring account creation or registration. You can upload your PDF, add headers and footers, and download the modified document immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving templates or accessing premium features, but basic header footer functionality is typically available without any registration.',
    fv9q: 'Can I edit or remove headers and footers after adding them?',
    fv9a: 'This depends on the tool you use. Some tools allow you to edit headers and footers by re-processing the original PDF with new settings. However, once headers and footers are added to a PDF, they become part of the document content. To modify them, you would typically need to use the tool again with your original PDF file. Some advanced tools offer templates or saved configurations that make it easier to modify headers and footers later.',
    fv10q: 'What is the maximum file size for adding headers and footers online?',
    fv10aa: 'File size limits vary by tool, but most online PDF header footer tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to add headers and footers to very large PDFs, consider splitting them first using our ',
    fv10alink: 'PDF splitter tool',
    fv10ab: ' or using desktop software designed for heavy-duty processing.',
    fv11q: 'Can I add headers and footers to password-protected PDFs?',
    fv11aa: "This depends on the tool. Most online PDF header footer tools cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv11alink: 'PDF editing tool',
    fv11ab: ' or the software that created the protection, then add headers and footers to the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv12q: 'Can I add headers and footers on mobile devices?',
    fv12a: 'Yes, many online PDF header footer tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large files might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    // Schema FAQ (8)
    fq1q: 'How do I add headers and footers to a PDF online for free?',
    fq1a: 'You can add headers and footers to PDF files online for free by using our PDF header footer tool. Simply upload your PDF file, customize your header and footer content (text, page numbers, dates, etc.), choose the position and styling, and apply them to your document. The tool processes files locally in your browser, ensuring privacy and security.',
    fq2q: 'Is it safe to add headers and footers to PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF header footer tool that processes files locally in your browser, your documents never leave your device. All processing happens client-side, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing keeps everything on your machine where you control it.',
    fq3q: 'Can I add page numbers to PDF headers or footers?',
    fq3a: 'Yes, most online PDF header footer tools allow you to add automatic page numbers to headers or footers. You can customize the format (e.g., "Page 1 of 10", "1/10", or just "1"), choose the starting page number, and position the page numbers anywhere in the header or footer area.',
    fq4q: 'Can I add different headers and footers to different pages?',
    fq4a: 'Yes, advanced PDF header footer tools allow you to apply different headers and footers to different page ranges. For example, you can have one header for the first page, another for odd pages, and another for even pages. This is useful for documents with title pages, chapter pages, or different sections.',
    fq5q: 'What content can I add to PDF headers and footers?',
    fq5a: 'You can add various types of content to PDF headers and footers, including: text (company name, document title, author name), page numbers (automatic or custom formats), dates (current date, creation date, or custom dates), images (logos, watermarks), and custom formatting (fonts, colors, alignment).',
    fq6q: 'Will adding headers and footers affect my PDF content?',
    fq6a: 'No, adding headers and footers should not affect your existing PDF content. Headers and footers are added to the margins of your document, outside the main content area. However, if your PDF already has content very close to the edges, headers and footers might overlap. Most tools allow you to adjust margins to prevent this.',
    fq7q: 'Can I add images or logos to PDF headers and footers?',
    fq7a: 'Yes, many online PDF header footer tools support adding images and logos to headers and footers. You can upload image files (PNG, JPG, SVG) and position them in your header or footer. This is commonly used for adding company logos, letterheads, or decorative elements to professional documents.',
    fq8q: 'Do I need to create an account to add headers and footers to PDFs?',
    fq8a: 'No, many free PDF header footer tools work without requiring account creation or registration. You can upload your PDF, add headers and footers, and download the modified document immediately without signing up. This makes the process faster and more private.',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Per-key fallback to English so a missing translation never blanks the page.
  return new Proxy(base, { get: (_t, k: string) => (over[k] && over[k].length ? over[k] : base[k]) }) as Content
}

export function meta(locale: AppLocale): Metadata {
  const c = content(locale)
  const url = postUrl(locale)
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      siteName: 'EditoraPDF',
      images: [{ url: `${siteUrl}/images/blog/add-headers-footers-pdf-hero.png`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/add-headers-footers-pdf-hero.png`],
    },
    alternates: localeAlternates(locale, postPath),
  }
}

export function schemas(locale: AppLocale): Record<string, unknown>[] {
  const c = content(locale)
  const url = postUrl(locale)
  const m = getMessages(locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fq${n}a`] },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m['blog.bcHome'] || 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: m['blog.bcBlog'] || 'Blog', item: `${siteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: c.bcLeaf, item: url },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: c.artHeadline,
    description: c.artDesc,
    image: `${siteUrl}${heroImage}`,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'EditoraPDF Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg` },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  return [faqSchema, breadcrumbSchema, articleSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => `/${locale}${p}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li>
              <Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link>
            </li>
            <li>/</li>
            <li className="text-surface-300">{c.bcLeaf}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Image with Title Overlay */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
        <Image fill priority sizes="100vw"
          src={heroImage}
          alt={c.heroAlt}
          className="w-full h-full object-cover shadow-[inset_0_0_200px_100px_rgba(0,0,0,0.8),0_0_100px_50px_rgba(0,0,0,0.6)]"
          style={{
            boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {c.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {c.heroSubtitle}
            </p>
            <BlogByline locale={locale} datePublished={datePublished} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Intro */}
          <div className="mb-8">
            <p className="text-xl text-surface-300 leading-relaxed mb-4">
              {c.intro1}
            </p>
            <p className="text-lg text-surface-400">
              {c.intro2}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s1l1s}</strong>{c.s1l1t}</li>
                <li><strong className="text-white">{c.s1l2s}</strong>{c.s1l2t}</li>
                <li><strong className="text-white">{c.s1l3s}</strong>{c.s1l3t}</li>
                <li><strong className="text-white">{c.s1l4s}</strong>{c.s1l4t}</li>
                <li><strong className="text-white">{c.s1l5s}</strong>{c.s1l5t}</li>
                <li><strong className="text-white">{c.s1l6s}</strong>{c.s1l6t}</li>
                <li><strong className="text-white">{c.s1l7s}</strong>{c.s1l7t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s1p3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s2l1s}</strong>{c.s2l1t}</li>
                <li><strong className="text-white">{c.s2l2s}</strong>{c.s2l2t}</li>
                <li><strong className="text-white">{c.s2l3s}</strong>{c.s2l3t}</li>
                <li><strong className="text-white">{c.s2l4s}</strong>{c.s2l4t}</li>
                <li><strong className="text-white">{c.s2l5s}</strong>{c.s2l5t}</li>
                <li><strong className="text-white">{c.s2l6s}</strong>{c.s2l6t}</li>
                <li><strong className="text-white">{c.s2l7s}</strong>{c.s2l7t}</li>
                <li><strong className="text-white">{c.s2l8s}</strong>{c.s2l8t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s2m1}</li>
                <li>{c.s2m2}</li>
                <li>{c.s2m3}</li>
                <li>{c.s2m4}</li>
                <li>{c.s2m5}</li>
                <li>{c.s2m6}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s2p3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s3h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s3l1s}</strong>{c.s3l1t}</li>
                <li><strong className="text-white">{c.s3l2s}</strong>{c.s3l2t}</li>
                <li><strong className="text-white">{c.s3l3s}</strong>{c.s3l3t}</li>
                <li><strong className="text-white">{c.s3l4s}</strong>{c.s3l4t}</li>
                <li><strong className="text-white">{c.s3l5s}</strong>{c.s3l5t}</li>
                <li><strong className="text-white">{c.s3l6s}</strong>{c.s3l6t}</li>
                <li><strong className="text-white">{c.s3l7s}</strong>{c.s3l7t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/header-and-footer')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st1p1a}<Link href={L('/header-and-footer')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st2l1}</li>
                  <li>{c.s4st2l2}</li>
                  <li>{c.s4st2l3}</li>
                  <li>{c.s4st2l4a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st2l4link}</Link>{c.s4st2l4b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st3l1s}</strong>{c.s4st3l1t}</li>
                  <li><strong className="text-white">{c.s4st3l2s}</strong>{c.s4st3l2t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p1}
                </p>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st4ah}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st4ap1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li>{c.s4st4al1}</li>
                    <li>{c.s4st4al2}</li>
                    <li>{c.s4st4al3}</li>
                    <li>{c.s4st4al4}</li>
                    <li>{c.s4st4al5}</li>
                    <li>{c.s4st4al6}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s4st4ap2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st4bh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st4bp1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li>{c.s4st4bl1}</li>
                    <li>{c.s4st4bl2}</li>
                    <li>{c.s4st4bl3}</li>
                    <li>{c.s4st4bl4}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s4st4bp2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st4ch}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st4cp1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li>{c.s4st4cl1}</li>
                    <li>{c.s4st4cl2}</li>
                    <li>{c.s4st4cl3}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s4st4cp2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st4dh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st4dp1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li>{c.s4st4dl1}</li>
                    <li>{c.s4st4dl2}</li>
                    <li>{c.s4st4dl3}</li>
                    <li>{c.s4st4dl4}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s4st4dp2}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st5l1s}</strong>{c.s4st5l1t}</li>
                  <li><strong className="text-white">{c.s4st5l2s}</strong>{c.s4st5l2t}</li>
                  <li><strong className="text-white">{c.s4st5l3s}</strong>{c.s4st5l3t}</li>
                  <li><strong className="text-white">{c.s4st5l4s}</strong>{c.s4st5l4t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st5p2s}</strong>{c.s4st5p2t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st6l1s}</strong>{c.s4st6l1t}</li>
                  <li><strong className="text-white">{c.s4st6l2s}</strong>{c.s4st6l2t}</li>
                  <li><strong className="text-white">{c.s4st6l3s}</strong>{c.s4st6l3t}</li>
                  <li><strong className="text-white">{c.s4st6l4s}</strong>{c.s4st6l4t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st6p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st7l1s}</strong>{c.s4st7l1t}</li>
                  <li><strong className="text-white">{c.s4st7l2s}</strong>{c.s4st7l2t}</li>
                  <li><strong className="text-white">{c.s4st7l3s}</strong>{c.s4st7l3t}</li>
                  <li><strong className="text-white">{c.s4st7l4s}</strong>{c.s4st7l4t}</li>
                  <li><strong className="text-white">{c.s4st7l5s}</strong>{c.s4st7l5t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st8h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st8p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st8l1}</li>
                  <li>{c.s4st8l2}</li>
                  <li>{c.s4st8l3}</li>
                  <li>{c.s4st8l4}</li>
                  <li>{c.s4st8l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st8p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st9h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st9p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st9o1}</li>
                  <li>{c.s4st9o2}</li>
                  <li>{c.s4st9o3}</li>
                  <li>{c.s4st9o4}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st9p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st9l1}</li>
                  <li>{c.s4st9l2}</li>
                  <li>{c.s4st9l3}</li>
                  <li>{c.s4st9l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st9p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st10h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st10p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st10p2s}</strong>{c.s4st10p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st10p3}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b1h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b1p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5b2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5b2l1}</li>
                  <li>{c.s5b2l2}</li>
                  <li>{c.s5b2l3}</li>
                  <li>{c.s5b2l4}</li>
                  <li>{c.s5b2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b3h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b3p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b4p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b5p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b6p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5b7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5b7l1}</li>
                  <li>{c.s5b7l2}</li>
                  <li>{c.s5b7l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b8p1}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1al1}</li>
                  <li>{c.s6c1al2}</li>
                  <li>{c.s6c1al3}</li>
                  <li>{c.s6c1al4}</li>
                  <li>{c.s6c1al5}</li>
                  <li>{c.s6c1al6}</li>
                  <li>{c.s6c1al7}</li>
                  <li>{c.s6c1al8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1bl1}</li>
                  <li>{c.s6c1bl2}</li>
                  <li>{c.s6c1bl3}</li>
                  <li>{c.s6c1bl4}</li>
                  <li>{c.s6c1bl5}</li>
                  <li>{c.s6c1bl6}</li>
                  <li>{c.s6c1bl7}</li>
                  <li>{c.s6c1bl8}</li>
                  <li>{c.s6c1bl9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1p3s}</strong>{c.s6c1p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2al1}</li>
                  <li>{c.s6c2al2}</li>
                  <li>{c.s6c2al3}</li>
                  <li>{c.s6c2al4}</li>
                  <li>{c.s6c2al5}</li>
                  <li>{c.s6c2al6}</li>
                  <li>{c.s6c2al7}</li>
                  <li>{c.s6c2al8}</li>
                  <li>{c.s6c2al9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2bl1}</li>
                  <li>{c.s6c2bl2}</li>
                  <li>{c.s6c2bl3}</li>
                  <li>{c.s6c2bl4}</li>
                  <li>{c.s6c2bl5}</li>
                  <li>{c.s6c2bl6}</li>
                  <li>{c.s6c2bl7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c2p3s}</strong>{c.s6c2p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6c3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c3l1}</li>
                  <li>{c.s6c3l2}</li>
                  <li>{c.s6c3l3}</li>
                  <li>{c.s6c3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c3p2s}</strong>{c.s6c3p2t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1aa}<Link href={L('/header-and-footer')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1alink}</Link>{c.fv1ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv2q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv2a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv3q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv3a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv4q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv4a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv5q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv5a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv6q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv6a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv7q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv7a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv8q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv8a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv9q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv9a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10aa}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10alink}</Link>{c.fv10ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv11q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv11aa}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv11alink}</Link>{c.fv11ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv12q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv12a}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s8h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p2}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s8l1}</li>
                <li>{c.s8l2}</li>
                <li>{c.s8l3}</li>
                <li>{c.s8l4}</li>
                <li>{c.s8l5}</li>
                <li>{c.s8l6}</li>
                <li>{c.s8l7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/header-and-footer')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s8p5}
              </p>
            </section>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">{t('blog.relatedArticles', 'Related Articles')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={L('/blog/how-to-merge-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relA1Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relA1Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relA2Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relA2Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relA3Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relA3Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-add-page-numbers-to-pdf')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relA4Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relA4Desc}
                </p>
              </Link>
            </div>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link
              href={L('/blog')}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t('blog.backToBlog', 'Back to Blog')}
            </Link>
          </div>
        </div>
      </article>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-to-add-headers-and-footers-to-pdf.i18n'
Object.assign(C, TRANSLATIONS)
