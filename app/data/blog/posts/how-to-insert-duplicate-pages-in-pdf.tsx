import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-insert-duplicate-pages-in-pdf'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Insert Duplicate Pages in PDF_ Complete Guide to Copying PDF Pages.png'
const ogImage = '/images/blog/how-to-insert-duplicate-pages-in-pdf-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages',
    metaDesc: 'Learn how to duplicate pages in a PDF online. Copy single or multiple pages, control placement, and create updated PDF documents in minutes.',
    ogTitle: 'How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages',
    ogDesc: 'Learn how to duplicate pages in a PDF online. Copy single or multiple pages, control placement, and create updated PDF documents in minutes.',
    twTitle: 'How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages',
    twDesc: 'Learn how to duplicate pages in a PDF online. Copy single or multiple pages, control placement, and create updated PDF documents in minutes.',
    ogAlt: 'Illustration showing a PDF page being duplicated into multiple copies with a COPY button',
    heroAlt: 'How to insert duplicate pages in PDF - Free online tool guide',

    bcLeaf: 'How to Insert Duplicate Pages in PDF',
    heroTitle: 'How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages',
    heroSubtitle: 'Learn how to duplicate and copy pages in PDF files using free online tools. No software installation required.',

    artHeadline: 'How to Insert Duplicate Pages in PDF - Complete Guide to Copying PDF Pages',
    artDesc: 'Complete guide on how to insert duplicate pages in PDF files online. Learn to copy and duplicate PDF pages using free online tools. Step-by-step instructions, tips, and best practices for duplicating pages.',

    intro1: "You're working on a PDF document and realize you need multiple copies of the same page. Maybe it's a template page that needs to appear several times throughout the document, or perhaps you want to create backup copies of important pages. Whatever the reason, duplicating pages in a PDF isn't as straightforward as copying text in a Word document.",
    intro2: "The good news? You don't need expensive software or complex workarounds. Modern online PDF duplicate page tools make copying and inserting duplicate pages as simple as selecting pages and clicking a button. This comprehensive guide will walk you through everything you need to know about duplicating PDF pages online, from understanding when and why you'd want to duplicate pages to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Duplicating PDF Pages Can Be Frustrating',
    s1p1: "PDFs are designed to be complete, self-contained documents. They preserve formatting perfectly, which is great for sharing, but it makes duplicating pages more complex than simply copying and pasting. Unlike Word documents where you can easily duplicate content, PDF files require specialized tools to copy pages properly.",
    s1p2: "Here's what makes PDF page duplication challenging:",
    s1l1s: 'No native copy-paste:',
    s1l1t: " PDFs don't support simple copy-paste operations for entire pages like text documents do",
    s1l2s: 'Complex page structure:',
    s1l2t: ' Each PDF page contains multiple layers of content, formatting, and metadata that must be preserved exactly',
    s1l3s: 'Positioning challenges:',
    s1l3t: ' Inserting duplicates at specific positions requires precise page manipulation',
    s1l4s: 'File size concerns:',
    s1l4t: ' Duplicating pages increases file size, which can become problematic for large documents',
    s1l5s: 'Quality preservation:',
    s1l5t: ' Poor duplication methods can degrade image quality or lose formatting',
    s1l6s: 'Security concerns:',
    s1l6t: ' Uploading sensitive documents to unknown servers raises privacy questions',
    s1l7s: 'Software requirements:',
    s1l7t: ' Desktop PDF tools often require installation, updates, and sometimes payment',
    s1p3: 'These pain points are exactly why online PDF duplicate page tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think duplicating PDF pages is a niche task, but it's actually something many people need to do regularly. Consider these everyday scenarios:",
    s2l1s: 'Business professionals',
    s2l1t: ' creating multiple copies of invoice templates, contract pages, or report sections',
    s2l2s: 'Students',
    s2l2t: ' duplicating assignment templates or creating multiple copies of cover pages for different submissions',
    s2l3s: 'HR departments',
    s2l3t: ' creating multiple copies of policy pages or employee handbook sections',
    s2l4s: 'Legal teams',
    s2l4t: ' duplicating signature pages, witness statement templates, or evidence document pages',
    s2l5s: 'Real estate agents',
    s2l5t: ' creating multiple copies of property disclosure pages or contract sections',
    s2l6s: 'Healthcare workers',
    s2l6t: ' duplicating patient consent forms or medical history templates',
    s2l7s: 'Accountants',
    s2l7t: ' creating multiple copies of tax form pages or financial statement templates',
    s2l8s: 'Content creators',
    s2l8t: ' duplicating design templates or portfolio page layouts',
    s2l9s: 'Teachers',
    s2l9t: ' creating multiple copies of worksheet pages or exam templates',
    s2p2: "The time wasted on manual PDF page management adds up quickly. What takes seconds with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Lost or corrupted pages during manual duplication attempts',
    s2m2: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor document quality in the final duplicated pages',
    s2m5: 'Incorrect page positioning or ordering',
    s2m6: 'File size issues that prevent sharing or emailing',
    s2p3: "That's why understanding how to duplicate PDF pages properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication.",

    s3h: 'The Solution: Modern Online PDF Duplicate Page Tools',
    s3p1: 'The solution to PDF page duplication headaches is simpler than you might expect. Modern web-based PDF duplicate page tools handle all the technical complexity behind the scenes, giving you a clean interface to copy and insert pages in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Duplicate pages in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Flexible duplication options:',
    s3l6t: ' Duplicate individual pages, page ranges, or all pages—all in one tool',
    s3l7s: 'Precise positioning:',
    s3l7t: ' Insert duplicates at specific positions or after original pages',
    s3p3: "The best part? You don't need to understand how PDF page duplication works technically. The tool handles page extraction, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF duplicate pages tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Insert Duplicate Pages Using Our Tool',
    s4p1: "Ready to duplicate your PDF pages? Follow these steps to copy and insert duplicate pages into your PDF document quickly and easily. We'll cover the most common duplication scenarios: duplicating individual pages, page ranges, and inserting duplicates at specific positions.",

    s4s1h: 'Step 1: Access the PDF Duplicate Pages Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'duplicate pages page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start duplicating pages immediately.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing all pages in a thumbnail view. This helps you identify which pages you want to duplicate.",

    s4s3h: 'Step 3: Select Pages to Duplicate',
    s4s3p1: 'This is where you choose which pages to duplicate. Most tools offer several selection methods:',
    s4s3ah: 'Method A: Duplicate Individual Pages',
    s4s3ap1: 'Click on individual page thumbnails to select specific pages you want to duplicate. You can select multiple pages by holding Ctrl (Windows) or Cmd (Mac) while clicking.',
    s4s3ap2s: 'Best for:',
    s4s3ap2t: ' When you need to duplicate specific pages scattered throughout your document.',
    s4s3bh: 'Method B: Duplicate Page Ranges',
    s4s3bp1: 'Select a range of consecutive pages. For example, pages 5-10, or pages 1-3. Some tools let you enter page ranges directly (e.g., "5-10" or "1,3,5-7").',
    s4s3bp2s: 'Best for:',
    s4s3bp2t: ' When you need to duplicate a section of consecutive pages, like a chapter or report section.',
    s4s3ch: 'Method C: Duplicate All Pages',
    s4s3cp1: 'Some tools offer a "Select All" option to duplicate every page in the document. This is useful when you want to create a backup copy of the entire document.',
    s4s3cp2s: 'Best for:',
    s4s3cp2t: ' Creating complete document backups or when you need to duplicate an entire PDF.',

    s4s4h: 'Step 4: Choose Duplication Options',
    s4s4p1: "Once you've selected pages, you'll need to configure how the duplication should work:",
    s4s4l1s: 'Number of copies:',
    s4s4l1t: ' Specify how many times to duplicate each selected page (1x, 2x, 3x, etc.)',
    s4s4l2s: 'Insertion position:',
    s4s4l2t: ' Choose where to insert duplicates—right after the original pages, at the end of the document, or at a specific page number',
    s4s4l3s: 'Duplication order:',
    s4s4l3t: ' Some tools let you choose whether duplicates appear immediately after originals or at the end',
    s4s4p2s: 'Pro tip:',
    s4s4p2t: " If you're duplicating a template page that will be customized later, insert duplicates right after the original so you can easily identify and edit them.",
    s4s4p3: 'Most tools show a preview of how your document will look after duplication, including the new page count and file size estimate.',

    s4s5h: 'Step 5: Review Your Settings',
    s4s5p1: 'Before duplicating, take a quick moment to verify:',
    s4s5l1: 'All pages you want to duplicate are selected',
    s4s5l2: 'The number of copies is correct',
    s4s5l3: 'Insertion position is where you want duplicates to appear',
    s4s5l4: 'The new page count looks reasonable (remember, duplicating increases file size)',
    s4s5l5: 'File size estimate is acceptable for your needs',
    s4s5p2a: "This quick check prevents having to start over if you realize something's wrong after duplication. If your file size becomes too large, consider using our ",
    s4s5p2link: 'PDF compression tool',
    s4s5p2b: ' after duplicating.',

    s4s6h: 'Step 6: Click Duplicate and Wait for Processing',
    s4s6p1: 'Once everything looks good, click the "Duplicate Pages" or "Insert Duplicates" button. The tool will:',
    s4s6o1: 'Process your PDF file',
    s4s6o2: 'Extract the selected pages',
    s4s6o3: 'Create exact copies of each selected page',
    s4s6o4: 'Insert duplicates at the specified positions',
    s4s6o5: 'Generate your modified PDF file',
    s4s6p2: 'Processing time depends on:',
    s4s6l1: 'Total number of pages being duplicated',
    s4s6l2: 'Number of copies being created',
    s4s6l3: 'File size',
    s4s6l4: "Your device's processing power",
    s4s6p3: "For typical duplications (duplicating 1-5 pages once), this usually takes just a few seconds. Larger duplications might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s7h: 'Step 7: Download Your Modified PDF',
    s4s7p1: 'When processing completes, your PDF with duplicated pages is ready. Click the download button to save it to your device. The file will contain your original pages plus the duplicates you created.',
    s4s7p2s: 'Important:',
    s4s7p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your modified PDF before closing the page.',
    s4s7p3s: 'File size note:',
    s4s7p3a: ' Remember that duplicating pages increases your PDF file size. If the file becomes too large for emailing or sharing, you can use our ',
    s4s7p3link: 'PDF compression tool',
    s4s7p3b: ' to reduce the size while maintaining quality.',
    s4s7p4: "That's it! You've successfully duplicated pages in your PDF file. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Duplicate Page Tools',
    s5p1: 'Why choose an online PDF duplicate page tool over desktop software or manual methods? Here are the key advantages:',
    s5s1h: '1. Zero Installation Required',
    s5s1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start duplicating pages. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to duplicate pages on the go.",
    s5s2h: '2. Privacy and Security',
    s5s2p1: 'When you use a privacy-first PDF duplicate page tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5s2l1: 'Confidential business documents',
    s5s2l2: 'Personal financial information',
    s5s2l3: 'Legal documents',
    s5s2l4: 'Medical records',
    s5s2l5: 'Any sensitive data',
    s5s2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5s3h: '3. Cost-Effective Solution',
    s5s3p1: 'Most online PDF duplicate page tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF page duplication, free online tools provide excellent value without any financial commitment.',
    s5s4h: '4. Flexible Duplication Options',
    s5s4p1: 'Online tools often offer more flexible duplication options than desktop software. You can duplicate individual pages, page ranges, or all pages. You can create multiple copies of the same page, insert duplicates at specific positions, and preview changes before applying them—all in one streamlined interface.',
    s5s5h: '5. Cross-Platform Compatibility',
    s5s5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF duplicate page tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5s6h: '6. Always Up-to-Date',
    s5s6p1: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5s7h: '7. Speed and Efficiency',
    s5s7p1: 'Modern browser-based PDF processing is surprisingly fast. You can duplicate pages in seconds, compared to:',
    s5s7l1: "Manual copy-paste methods (which don't work well with PDFs anyway)",
    s5s7l2: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5s7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5s7l4: 'Re-creating pages from scratch',
    s5s7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5s8h: '8. Quality Preservation',
    s5s8p1: 'Quality online tools duplicate pages at the native PDF level, preserving all formatting, images, text, and metadata exactly as they appear in the original. This means no quality loss, no formatting issues, and no unexpected changes to your document structure.',

    s6h: 'Comparison: Online PDF Duplicate Page Tools vs. Other Methods',
    s6p1: "How do online PDF duplicate page tools stack up against alternatives? Let's break down the comparison:",
    s6s1h: 'Online Tools vs. Desktop Software',
    s6s1p1s: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6s1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6s1l2: '✅ Works offline',
    s6s1l3: '✅ Better for very large files (500+ pages)',
    s6s1l4: '❌ Requires installation and updates',
    s6s1l5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6s1l6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6s1l7: '❌ Takes up disk space',
    s6s1l8: '❌ Complex interfaces for simple tasks',
    s6s1p2s: 'Online PDF Duplicate Page Tools:',
    s6s1m1: '✅ Free to use',
    s6s1m2: '✅ No installation required',
    s6s1m3: '✅ Works on any platform',
    s6s1m4: '✅ Always up-to-date',
    s6s1m5: '✅ Privacy-first (client-side processing)',
    s6s1m6: '✅ Simple, focused interface',
    s6s1m7: '✅ Multiple duplication options in one tool',
    s6s1m8: '❌ Requires internet connection (for initial page load)',
    s6s1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6s1p3s: 'Verdict:',
    s6s1p3t: ' For PDF page duplication specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just duplicating pages, or if you regularly work with very large files.',
    s6s2h: 'Online Tools vs. Cloud-Based Services',
    s6s2p1s: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6s2l1: '✅ Integrated with cloud storage',
    s6s2l2: '✅ Can access files from anywhere',
    s6s2l3: '✅ Often free with cloud storage accounts',
    s6s2l4: '❌ Files uploaded to servers (privacy concern)',
    s6s2l5: '❌ Requires account creation',
    s6s2l6: '❌ Storage limits apply',
    s6s2l7: '❌ Files may be retained on servers',
    s6s2l8: '❌ Slower processing (upload/download time)',
    s6s2l9: '❌ Limited duplication options',
    s6s2p2s: 'Client-Side Online Tools:',
    s6s2m1: '✅ No file uploads (privacy-first)',
    s6s2m2: '✅ No account required',
    s6s2m3: '✅ Faster processing (no upload/download)',
    s6s2m4: '✅ No storage limits',
    s6s2m5: '✅ Files never leave your device',
    s6s2m6: '✅ Multiple duplication options',
    s6s2m7: '✅ Flexible insertion positioning',
    s6s2m8: "❌ Can't access files from cloud storage directly",
    s6s2p3s: 'Verdict:',
    s6s2p3t: ' For privacy-conscious users, client-side online tools are superior. Cloud services are better if you need to duplicate pages in files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6s3h: 'Online Tools vs. Manual Methods',
    s6s3p1: 'Some people try to duplicate PDF pages manually using methods like:',
    s6s3l1: 'Printing pages to a new PDF (slow, quality loss, time-consuming)',
    s6s3l2: 'Taking screenshots of pages (terrible quality, not searchable, time-consuming)',
    s6s3l3: "Copy-pasting content (doesn't work with PDFs)",
    s6s3l4: 'Re-creating pages from scratch (extremely time-consuming)',
    s6s3l5: 'Using freeware with ads and malware risks',
    s6s3p2s: 'Verdict:',
    s6s3p2t: " Online PDF duplicate page tools are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    s7h: 'Frequently Asked Questions About Duplicating PDF Pages',

    s8h: 'Conclusion: Making PDF Page Duplication Simple',
    s8p1: "Duplicating pages in PDF files doesn't have to be complicated. With modern online PDF duplicate page tools, copying and inserting duplicate pages is straightforward, fast, and secure. Whether you're a business professional creating multiple copies of templates, a student duplicating assignment pages, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF duplicate page tools—no installation, privacy-first processing, free access, flexible duplication options, and cross-platform compatibility—make them the ideal solution for most page duplication needs. While desktop software has its place for advanced PDF editing tasks, simple page duplication is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Select pages carefully before duplicating',
    s8l2: 'Choose the right insertion position for your needs',
    s8l3: 'Keep file sizes in mind—duplicating increases size',
    s8l4: 'Use privacy-first tools that process files locally',
    s8l5: 'Review your settings before duplicating',
    s8l6: "Keep backups of original files until you're satisfied with duplicates",
    s8l7: 'Use compression tools if file size becomes an issue',
    s8p4a: 'Ready to duplicate your PDF pages? Try our ',
    s8p4link1: 'free PDF duplicate pages tool',
    s8p4b: ' and experience how simple copying pages can be. And if you need to make edits to your PDFs before or after duplicating pages, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes after duplicating. And if you need to combine multiple PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle page duplication quickly and confidently, leaving more time for the work that actually matters.",

    // Visible FAQ (13)
    fv1q: 'How do I duplicate pages in a PDF file online?',
    fv1aa: 'You can duplicate pages in a PDF file online by using our ',
    fv1alink: 'duplicate pages tool',
    fv1ab: '. Simply upload your PDF file, select the pages you want to duplicate, specify how many copies you want and where to insert them, and click duplicate. The tool creates exact copies of selected pages and inserts them into your document. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to duplicate PDF pages online?',
    fv2a: 'Yes, when using a privacy-first PDF duplicate page tool that processes files locally in your browser, your documents never leave your device. All page duplication happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I duplicate multiple pages at once?',
    fv3a: 'Absolutely. Most online PDF duplicate page tools allow you to select and duplicate multiple pages simultaneously. You can duplicate individual pages, page ranges (e.g., pages 5-10), or all pages in your document at once. Some tools also let you select non-consecutive pages by holding Ctrl (Windows) or Cmd (Mac) while clicking.',
    fv4q: 'Can I insert duplicate pages at specific positions?',
    fv4a: 'Yes, advanced PDF duplicate page tools let you specify exactly where to insert the duplicated pages. You can typically choose to insert duplicates right after the original pages, at the end of the document, or at any specific page number you choose. This gives you complete control over the final document structure.',
    fv5q: 'Will duplicating pages increase the PDF file size?',
    fv5aa: 'Yes, duplicating pages will increase your PDF file size since you are adding more pages to the document. The size increase depends on the content of the duplicated pages—pages with images or complex graphics will add more to the file size than text-only pages. For large files, you may want to use a ',
    fv5alink: 'PDF compression tool',
    fv5ab: ' after duplicating to reduce the file size while maintaining quality.',
    fv6q: 'Do I need to create an account to duplicate PDF pages?',
    fv6a: 'No, many free PDF duplicate page tools work without requiring account creation or registration. You can upload, duplicate pages, and download your modified PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving duplication history or accessing premium features, but basic page duplication is typically available without any registration.',
    fv7q: 'Can I duplicate pages multiple times?',
    fv7a: 'Yes, you can duplicate the same pages multiple times. Some tools allow you to specify how many copies you want to create, so you can duplicate a page 2, 3, 5, or even 10 times if needed. This is useful when creating multiple copies of templates or when you need several identical pages throughout a document.',
    fv8q: 'Will duplicating pages affect the original PDF quality?',
    fv8a: "No, properly duplicating pages should not affect quality. When you duplicate PDF pages using a quality tool, it copies the pages without re-compressing or degrading the content. Each duplicated page maintains the same quality as the original, including images, text, formatting, and all visual elements. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that duplicate pages at the native PDF level rather than converting formats.",
    fv9q: 'Can I duplicate password-protected PDF pages?',
    fv9aa: "This depends on the tool. Most online PDF duplicate page tools cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv9alink: 'PDF editing tool',
    fv9ab: ' or the software that created the protection, then duplicate pages in the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv10q: 'What happens to the original PDF after duplicating pages?',
    fv10a: "The original PDF file on your device remains completely unchanged. Duplicating pages creates a new file with the duplicates added, without modifying the source document. This means you can duplicate pages multiple times using different settings without any risk to your original file. Always keep backups of important original files until you're satisfied with the duplicated version.",
    fv11q: 'Can I duplicate pages on mobile devices?',
    fv11a: 'Yes, many online PDF duplicate page tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large duplications might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',
    fv12q: 'Is there a limit to how many pages I can duplicate?',
    fv12a: "There's no hard limit on the number of pages you can duplicate, but practical limits exist based on your device's capabilities. Most online tools handle duplicating 10-20 pages comfortably. Very large duplications (50+ pages) may cause browser slowdowns or memory issues. If you need to duplicate many pages, consider doing it in multiple operations or using desktop software optimized for large file processing.",
    fv13q: 'Can I undo page duplication if I make a mistake?',
    fv13a: 'Since duplicating pages creates a new file, you can\'t "undo" a duplication in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply duplicate pages again with the correct settings. This is why it\'s important to review your selections and settings before clicking duplicate. Some tools keep your settings available for a few minutes after duplication, allowing quick re-duplication if needed.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I duplicate pages in a PDF file online?',
    fq1a: 'You can duplicate pages in a PDF file online by using our duplicate pages tool. Simply upload your PDF file, select the pages you want to duplicate, specify where to insert the duplicates, and click duplicate. The tool creates exact copies of selected pages and inserts them into your document.',
    fq2q: 'Is it safe to duplicate PDF pages online?',
    fq2a: 'Yes, when using a privacy-first PDF tool that processes files locally in your browser, your documents never leave your device. All page duplication happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I duplicate multiple pages at once?',
    fq3a: 'Yes, most online PDF duplicate page tools allow you to select and duplicate multiple pages simultaneously. You can duplicate individual pages, page ranges, or all pages in your document at once.',
    fq4q: 'Can I insert duplicate pages at specific positions?',
    fq4a: 'Yes, advanced PDF duplicate page tools let you specify exactly where to insert the duplicated pages. You can insert duplicates right after the original pages, at the end of the document, or at any specific page position you choose.',
    fq5q: 'Will duplicating pages increase the PDF file size?',
    fq5a: 'Yes, duplicating pages will increase your PDF file size since you are adding more pages to the document. The size increase depends on the content of the duplicated pages. For large files, you may want to use a PDF compression tool after duplicating.',
    fq6q: 'Do I need to create an account to duplicate PDF pages?',
    fq6a: 'No, many free PDF duplicate page tools work without requiring account creation or registration. You can upload, duplicate pages, and download your modified PDF files immediately without signing up.',
    fq7q: 'Can I duplicate pages multiple times?',
    fq7a: 'Yes, you can duplicate the same pages multiple times. Some tools allow you to specify how many copies you want to create, so you can duplicate a page 2, 3, 5, or even 10 times if needed.',
    fq8q: 'Will duplicating pages affect the original PDF quality?',
    fq8a: 'No, properly duplicating pages should not affect quality. When you duplicate PDF pages using a quality tool, it copies the pages without re-compressing or degrading the content. Each duplicated page maintains the same quality as the original.',

    // Related Articles
    rel1t: 'How to Merge PDF Files Online',
    rel1d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel2t: 'How to Split PDF Files Online',
    rel2d: 'Complete guide to dividing large PDF documents into smaller files online.',
    rel3t: 'How to Edit a PDF Online',
    rel3d: 'Complete guide to editing PDF files online without installing software.',
    rel4t: 'How to Reorder PDF Pages',
    rel4d: 'Learn how to rearrange and reorder pages in PDF documents online.',
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
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}${ogImage}`],
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
    author: { '@type': 'Organization', name: 'EditoraPDF', url: siteUrl },
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
                <li><strong className="text-white">{c.s2l9s}</strong>{c.s2l9t}</li>
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
                {c.s3p4a}<Link href={L('/duplicate-pages')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s1p1a}<Link href={L('/duplicate-pages')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s2l1}</li>
                  <li>{c.s4s2l2}</li>
                  <li>{c.s4s2l3}</li>
                  <li>{c.s4s2l4a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s2l4link}</Link>{c.s4s2l4b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s3p1}
                </p>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3ah}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3ap1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3ap2s}</strong>{c.s4s3ap2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3bh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3bp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3bp2s}</strong>{c.s4s3bp2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3ch}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3cp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3cp2s}</strong>{c.s4s3cp2t}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4s4l1s}</strong>{c.s4s4l1t}</li>
                  <li><strong className="text-white">{c.s4s4l2s}</strong>{c.s4s4l2t}</li>
                  <li><strong className="text-white">{c.s4s4l3s}</strong>{c.s4s4l3t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s4p2s}</strong>{c.s4s4p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s4p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s5l1}</li>
                  <li>{c.s4s5l2}</li>
                  <li>{c.s4s5l3}</li>
                  <li>{c.s4s5l4}</li>
                  <li>{c.s4s5l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s5p2a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s5p2link}</Link>{c.s4s5p2b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s6p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s6o1}</li>
                  <li>{c.s4s6o2}</li>
                  <li>{c.s4s6o3}</li>
                  <li>{c.s4s6o4}</li>
                  <li>{c.s4s6o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s6p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s6l1}</li>
                  <li>{c.s4s6l2}</li>
                  <li>{c.s4s6l3}</li>
                  <li>{c.s4s6l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s6p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s7p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s7p2s}</strong>{c.s4s7p2t}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s7p3s}</strong>{c.s4s7p3a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s7p3link}</Link>{c.s4s7p3b}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s7p4}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s1h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s1p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5s2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5s2l1}</li>
                  <li>{c.s5s2l2}</li>
                  <li>{c.s5s2l3}</li>
                  <li>{c.s5s2l4}</li>
                  <li>{c.s5s2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s3h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s3p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s4p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s5p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s6p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5s7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5s7l1}</li>
                  <li>{c.s5s7l2}</li>
                  <li>{c.s5s7l3}</li>
                  <li>{c.s5s7l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s8p1}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s1p1s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s1l1}</li>
                  <li>{c.s6s1l2}</li>
                  <li>{c.s6s1l3}</li>
                  <li>{c.s6s1l4}</li>
                  <li>{c.s6s1l5}</li>
                  <li>{c.s6s1l6}</li>
                  <li>{c.s6s1l7}</li>
                  <li>{c.s6s1l8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s1p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s1m1}</li>
                  <li>{c.s6s1m2}</li>
                  <li>{c.s6s1m3}</li>
                  <li>{c.s6s1m4}</li>
                  <li>{c.s6s1m5}</li>
                  <li>{c.s6s1m6}</li>
                  <li>{c.s6s1m7}</li>
                  <li>{c.s6s1m8}</li>
                  <li>{c.s6s1m9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s1p3s}</strong>{c.s6s1p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s2p1s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s2l1}</li>
                  <li>{c.s6s2l2}</li>
                  <li>{c.s6s2l3}</li>
                  <li>{c.s6s2l4}</li>
                  <li>{c.s6s2l5}</li>
                  <li>{c.s6s2l6}</li>
                  <li>{c.s6s2l7}</li>
                  <li>{c.s6s2l8}</li>
                  <li>{c.s6s2l9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s2p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s2m1}</li>
                  <li>{c.s6s2m2}</li>
                  <li>{c.s6s2m3}</li>
                  <li>{c.s6s2m4}</li>
                  <li>{c.s6s2m5}</li>
                  <li>{c.s6s2m6}</li>
                  <li>{c.s6s2m7}</li>
                  <li>{c.s6s2m8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s2p3s}</strong>{c.s6s2p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6s3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s3l1}</li>
                  <li>{c.s6s3l2}</li>
                  <li>{c.s6s3l3}</li>
                  <li>{c.s6s3l4}</li>
                  <li>{c.s6s3l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s3p2s}</strong>{c.s6s3p2t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1aa}<Link href={L('/duplicate-pages')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1alink}</Link>{c.fv1ab}
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
                    {c.fv5aa}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv5alink}</Link>{c.fv5ab}
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
                    {c.fv9aa}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9alink}</Link>{c.fv9ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv11q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv11a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv12q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv12a}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv13q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv13a}
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
                {c.s8p4a}<Link href={L('/duplicate-pages')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                  {c.rel1t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel1d}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel2t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel2d}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel3t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel3d}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-reorder-pdf-pages')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel4t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel4d}
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

      {/* Footer with Social Links */}
      <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
            <p className="text-xs text-surface-400 leading-relaxed">
              <strong className="text-surface-300">{t('blog.disclaimerLabel', 'Disclaimer:')}</strong> {t('blog.disclaimerBody', 'EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our')}{' '}
              <Link href={L('/terms')} className="text-primary-400 hover:text-primary-300 underline">{t('blog.terms', 'Terms')}</Link>
              {' '}{t('blog.and', 'and')}{' '}
              <Link href={L('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">{t('blog.privacyPolicy', 'Privacy Policy')}</Link>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">
              © {new Date().getFullYear()} EditoraPDF. {t('blog.rights', 'All rights reserved.')}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-surface-500">{t('blog.followUs', 'Follow us:')}</span>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/people/Editorapdf/61587362633003/" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followFacebook', 'Follow us on Facebook')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/editora_pdf" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followInstagram', 'Follow us on Instagram')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
                <a href="https://www.threads.com/@editora_pdf" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followThreads', 'Follow us on Threads')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@EditoraPDF" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.subscribeYouTube', 'Subscribe on YouTube')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-to-insert-duplicate-pages-in-pdf.i18n'
Object.assign(C, TRANSLATIONS)
