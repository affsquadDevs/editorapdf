import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-add-page-numbers-to-pdf'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Add Page Numbers to PDF Online_ Complete Guide to PDF Page Numbering.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Add Page Numbers to PDF Online: Complete Guide to PDF Page Numbering',
    metaDesc: 'Learn how to add page numbers to PDF documents online. Insert custom numbering formats, positions, and styles in minutes without installing software.',
    ogTitle: 'How to Add Page Numbers to PDF Online: Complete Guide to PDF Page Numbering',
    ogDesc: 'Learn how to add page numbers to PDF documents online. Insert custom numbering formats, positions, and styles in minutes without installing software.',
    twTitle: 'How to Add Page Numbers to PDF Online: Complete Guide to PDF Page Numbering',
    twDesc: 'Learn how to add page numbers to PDF documents online. Insert custom numbering formats, positions, and styles in minutes without installing software.',
    heroAlt: 'How to add page numbers to PDF online - Free PDF page numbering tool guide',
    ogAlt: 'Illustration showing a PDF document with newly added page numbers in the footer',

    bcLeaf: 'How to Add Page Numbers to PDF',
    heroTitle: 'How to Add Page Numbers to PDF Online: Complete Guide to PDF Page Numbering',
    heroSubtitle: 'Learn how to number PDF pages using free online tools. Customize page number format, position, and style without software installation.',

    artHeadline: 'How to Add Page Numbers to PDF Online - Complete Guide to PDF Page Numbering',
    artDesc: 'Complete guide on how to add page numbers to PDF documents online. Learn to number PDF pages using free online tools. Step-by-step instructions, customization options, tips, and best practices for PDF page numbering.',

    intro1: "You've just finished creating a comprehensive PDF document—maybe it's a business report, a research paper, or a legal brief. Everything looks perfect, except for one thing: there are no page numbers. When you print it or share it digitally, people will struggle to reference specific pages. You need page numbers, but opening expensive desktop software or learning complex PDF editing tools feels like overkill for such a simple task.",
    intro2: 'The good news? Adding page numbers to PDFs doesn\'t have to be complicated or expensive. Modern online PDF page numbering tools make this process as straightforward as uploading your file, choosing where you want the numbers, and clicking a button. This comprehensive guide will walk you through everything you need to know about adding page numbers to PDFs online, from understanding different numbering formats to customizing styles and handling edge cases.',

    s1h: 'The Problem: Why PDFs Often Lack Page Numbers',
    s1p1: "PDFs are created from many different sources—Word documents, scanned pages, web pages, design software, and more. While these tools excel at creating content, they don't always include page numbers by default. Even when they do, the numbering might not match your needs or professional standards.",
    s1p2: "Here's what makes adding page numbers to PDFs challenging:",
    s1l1s: 'No built-in numbering:',
    s1l1t: ' Many PDF creation tools don\'t include automatic page numbering, leaving you with unnumbered documents',
    s1l2s: 'Format complexity:',
    s1l2t: ' Different documents require different numbering styles—simple numbers, "Page X of Y" format, or custom formats',
    s1l3s: 'Positioning challenges:',
    s1l3t: ' Finding the right position (top, bottom, corners) that doesn\'t interfere with content requires precision',
    s1l4s: 'Starting page variations:',
    s1l4t: ' Professional documents often need numbering to start from page 3 or 4, skipping cover and title pages',
    s1l5s: 'Style consistency:',
    s1l5t: " Matching page number fonts, sizes, and colors to your document's design can be tedious",
    s1l6s: 'Software barriers:',
    s1l6t: ' Desktop PDF editors often require installation, updates, and sometimes payment just to add simple page numbers',
    s1l7s: 'Time constraints:',
    s1l7t: " When you need page numbers quickly, learning complex software isn't practical",
    s1p3: 'These pain points are exactly why online PDF page numbering tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think page numbers are just a nice-to-have feature, but they're actually essential for professional document management. Consider these everyday scenarios where missing page numbers cause real problems:",
    s2l1s: 'Business professionals',
    s2l1t: ' submitting reports, proposals, or presentations that need proper page references for meetings and reviews',
    s2l2s: 'Students and academics',
    s2l2t: ' submitting research papers, theses, or assignments that require proper pagination for grading and citation',
    s2l3s: 'Legal professionals',
    s2l3t: ' preparing briefs, contracts, or case documents where specific page references are critical for court proceedings',
    s2l4s: 'Healthcare workers',
    s2l4t: ' organizing patient records, medical reports, or research documents that need clear page identification',
    s2l5s: 'Real estate agents',
    s2l5t: ' compiling property documents, inspection reports, and contracts that require easy navigation',
    s2l6s: 'HR departments',
    s2l6t: ' creating employee handbooks, policy documents, or training materials that need proper pagination',
    s2l7s: 'Content creators',
    s2l7t: ' preparing portfolios, design presentations, or client deliverables that look more professional with page numbers',
    s2l8s: 'Government workers',
    s2l8t: ' preparing official documents, reports, or public records that must follow strict formatting guidelines',
    s2p2: 'The consequences of missing page numbers go beyond aesthetics:',
    s2m1: 'Difficulty referencing specific sections in meetings or discussions',
    s2m2: 'Confusion when printing or sharing documents across different devices',
    s2m3: 'Professional credibility issues when documents look incomplete or unpolished',
    s2m4: 'Time wasted manually counting pages to find specific content',
    s2m5: 'Compliance issues when documents must follow specific formatting standards',
    s2m6: 'Printing problems when pages get mixed up or lost',
    s2p3: "That's why understanding how to add page numbers properly isn't just about convenience—it's about creating professional, navigable documents that meet modern standards for business, academic, and legal communication.",

    s3h: 'The Solution: Modern Online PDF Page Numbering Tools',
    s3p1: 'The solution to PDF page numbering headaches is simpler than you might expect. Modern web-based PDF page numbering tools handle all the technical complexity behind the scenes, giving you a clean interface to add page numbers in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Add page numbers in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Multiple customization options:',
    s3l6t: ' Format, position, style, and starting page—all in one tool',
    s3l7s: 'Quality preservation:',
    s3l7t: ' Page numbers added without degrading existing content',
    s3p3: "The best part? You don't need to understand how PDF page numbering works technically. The tool handles text placement, formatting, and page rendering automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF page numbering tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Add Page Numbers to PDF Using Our Tool',
    s4p1: "Ready to add page numbers to your PDF? Follow these steps to number your PDF pages quickly and easily. We'll cover everything from basic numbering to advanced customization options.",

    s4st1h: 'Step 1: Access the PDF Page Numbering Tool',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF page numbering page',
    s4st1p1b: ". You'll see a clean interface with a file upload area and customization options. No account creation or login required—you can start numbering immediately.",

    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25 MB (for optimal performance)',
    s4st2l3: 'Any PDF file, regardless of page count',
    s4st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4st2l4link: 'PDF editing tool',
    s4st2l4b: ')',
    s4st2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count. This helps you plan your numbering strategy.",

    s4st3h: 'Step 3: Choose Page Number Position',
    s4st3p1: 'This is where you decide where page numbers appear on each page. Most tools offer several position options:',
    s4st3h1: 'Top Positions',
    s4st3a1s: 'Top Left:',
    s4st3a1t: ' Numbers appear in the top-left corner of each page',
    s4st3a2s: 'Top Center:',
    s4st3a2t: ' Numbers appear centered at the top of each page',
    s4st3a3s: 'Top Right:',
    s4st3a3t: ' Numbers appear in the top-right corner of each page (most common)',
    s4st3a4s: 'Best for:',
    s4st3a4t: ' Documents where the bottom might have footers or content that could interfere with numbering.',
    s4st3h2: 'Bottom Positions',
    s4st3b1s: 'Bottom Left:',
    s4st3b1t: ' Numbers appear in the bottom-left corner',
    s4st3b2s: 'Bottom Center:',
    s4st3b2t: ' Numbers appear centered at the bottom (traditional for academic papers)',
    s4st3b3s: 'Bottom Right:',
    s4st3b3t: ' Numbers appear in the bottom-right corner',
    s4st3b4s: 'Best for:',
    s4st3b4t: ' Professional documents, academic papers, and reports where bottom numbering is standard.',
    s4st3p2s: 'Pro tip:',
    s4st3p2t: " Consider your document's layout. If you have headers or footers, choose a position that won't overlap with existing content. Most tools show a preview so you can see exactly where numbers will appear.",

    s4st4h: 'Step 4: Select Page Number Format',
    s4st4p1: 'Choose how you want your page numbers to appear. Common formats include:',
    s4st4l1s: 'Simple numbers:',
    s4st4l1t: ' 1, 2, 3, 4... (most common)',
    s4st4l2s: 'Page prefix:',
    s4st4l2t: ' Page 1, Page 2, Page 3...',
    s4st4l3s: 'Total pages:',
    s4st4l3t: ' Page 1 of 10, Page 2 of 10... (useful for printed documents)',
    s4st4l4s: 'Roman numerals:',
    s4st4l4t: ' i, ii, iii, iv... (often used for introductory pages)',
    s4st4l5s: 'Custom format:',
    s4st4l5t: ' Some tools let you create custom formats like "Section 1 - Page 1"',
    s4st4p2s: 'Pro tip:',
    s4st4p2t: ' For professional documents, "Page X of Y" format helps readers understand document length and their position within it. For simple documents, plain numbers are cleaner.',

    s4st5h: 'Step 5: Customize Style and Appearance',
    s4st5p1: 'Most tools allow you to customize the visual appearance of page numbers:',
    s4st5l1s: 'Font size:',
    s4st5l1t: " Choose a size that's readable but not intrusive (typically 10-12pt)",
    s4st5l2s: 'Font style:',
    s4st5l2t: ' Select a font that matches your document (Arial, Times New Roman, etc.)',
    s4st5l3s: 'Color:',
    s4st5l3t: " Match your document's color scheme (black, gray, or custom colors)",
    s4st5l4s: 'Bold or regular:',
    s4st5l4t: ' Decide if numbers should be bold for emphasis',
    s4st5l5s: 'Margin offset:',
    s4st5l5t: ' Adjust distance from page edges for better positioning',
    s4st5p2s: 'Pro tip:',
    s4st5p2t: ' Keep page numbers subtle. They should be visible but not distract from your content. A smaller, lighter gray font often works better than large, bold black numbers.',

    s4st6h: 'Step 6: Set Starting Page and Range',
    s4st6p1: 'Professional documents often need special numbering considerations:',
    s4st6l1s: 'Starting page:',
    s4st6l1t: ' Skip cover page and title page, starting numbers from page 3 or 4',
    s4st6l2s: 'Starting number:',
    s4st6l2t: ' Begin numbering from a specific number (useful for documents that are part of a larger set)',
    s4st6l3s: 'Page range:',
    s4st6l3t: ' Add numbers only to specific pages (e.g., pages 5-20 only)',
    s4st6l4s: 'Skip pages:',
    s4st6l4t: ' Exclude certain pages from numbering (like blank pages or section dividers)',
    s4st6p2s: 'Common scenario:',
    s4st6p2t: ' Academic papers often have:',
    s4st6m1: 'Page 1: Cover page (no number)',
    s4st6m2: 'Page 2: Title page (no number)',
    s4st6m3: 'Page 3: Abstract (no number or Roman numeral)',
    s4st6m4: 'Page 4: Table of contents (Roman numerals: i, ii, iii...)',
    s4st6m5: 'Page 5+: Main content (Arabic numerals: 1, 2, 3...)',
    s4st6p3: 'Advanced tools let you set different numbering styles for different sections, though this may require multiple passes or more sophisticated software.',

    s4st7h: 'Step 7: Preview Your Settings',
    s4st7p1: 'Before adding page numbers, take a moment to preview your settings:',
    s4st7l1: 'Check that page numbers appear in the correct position',
    s4st7l2: 'Verify the format matches your needs',
    s4st7l3: "Ensure numbers don't overlap with existing content",
    s4st7l4: 'Confirm the starting page and range are correct',
    s4st7l5: 'Review the font size and style for readability',
    s4st7p2: 'Most tools show a preview of the first few pages so you can see exactly how numbers will appear. This quick check prevents having to start over if something looks wrong.',

    s4st8h: 'Step 8: Click Add Page Numbers and Wait for Processing',
    s4st8p1: 'Once everything looks good, click the "Add Page Numbers" or "Number Pages" button. The tool will:',
    s4st8o1: 'Process your PDF file page by page',
    s4st8o2: 'Add page numbers according to your settings',
    s4st8o3: 'Preserve all existing content and formatting',
    s4st8o4: 'Generate your numbered PDF file',
    s4st8p2: 'Processing time depends on:',
    s4st8l1: 'Total page count of your PDF',
    s4st8l2: 'File size',
    s4st8l3: 'Complexity of your document (images, graphics, etc.)',
    s4st8l4: "Your device's processing power",
    s4st8p3: "For typical documents (50-100 pages), this usually takes just a few seconds. Larger documents might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4st9h: 'Step 9: Download Your Numbered PDF',
    s4st9p1: 'When processing completes, your PDF with page numbers is ready. Click the download button to save it to your device. The file will typically keep your original filename with an indicator that page numbers were added.',
    s4st9p2s: 'Important:',
    s4st9p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your numbered PDF before closing the page.',
    s4st9p3: "That's it! You've successfully added page numbers to your PDF. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Page Numbering Tools',
    s5p1: 'Why choose an online PDF page numbering tool over desktop software or manual methods? Here are the key advantages:',
    s5h1: '1. Zero Installation Required',
    s5p2: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start numbering. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to add page numbers on the go.",
    s5h2: '2. Privacy and Security',
    s5p3: 'When you use a privacy-first PDF page numbering tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5l1: 'Confidential business documents',
    s5l2: 'Personal financial information',
    s5l3: 'Legal documents',
    s5l4: 'Medical records',
    s5l5: 'Academic work',
    s5l6: 'Any sensitive data',
    s5p4: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5h3: '3. Cost-Effective Solution',
    s5p5: 'Most online PDF page numbering tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF numbering, free online tools provide excellent value without any financial commitment.',
    s5h4: '4. Multiple Customization Options in One Tool',
    s5p6: 'Unlike desktop software that might require navigating through multiple menus, online tools often present all customization options in one clean interface. You can adjust format, position, style, starting page, and more without switching between different tools or windows.',
    s5h5: '5. Cross-Platform Compatibility',
    s5p7: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF page numbering tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5h6: '6. Always Up-to-Date',
    s5p8: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5h7: '7. Speed and Efficiency',
    s5p9: 'Modern browser-based PDF processing is surprisingly fast. You can add page numbers in seconds, compared to:',
    s5n1: "Manual methods (which don't work well with PDFs anyway)",
    s5n2: 'Desktop software that requires launching and navigating complex interfaces',
    s5n3: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5p10: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5h8: '8. Quality Preservation',
    s5p11: 'Quality online tools add page numbers without degrading your existing content. They insert numbers as text or vector elements, maintaining the same quality as your original PDF. This is crucial for documents with images, graphics, or precise formatting.',

    s6h: 'Comparison: Online PDF Page Numbering Tools vs. Other Methods',
    s6p1: "How do online PDF page numbering tools stack up against alternatives? Let's break down the comparison:",
    s6h1: 'Online Tools vs. Desktop Software',
    s6p2: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6a1: '✅ More advanced features (editing, form filling, etc.)',
    s6a2: '✅ Works offline',
    s6a3: '✅ Better for very large files (500+ pages)',
    s6a4: '✅ More formatting options',
    s6a5: '❌ Requires installation and updates',
    s6a6: '❌ Often expensive ($100-300+ or subscription fees)',
    s6a7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6a8: '❌ Takes up disk space',
    s6a9: '❌ Steeper learning curve',
    s6p3: 'Online PDF Page Numbering Tools:',
    s6b1: '✅ Free to use',
    s6b2: '✅ No installation required',
    s6b3: '✅ Works on any platform',
    s6b4: '✅ Always up-to-date',
    s6b5: '✅ Privacy-first (client-side processing)',
    s6b6: '✅ Simple, intuitive interface',
    s6b7: '✅ Multiple customization options in one place',
    s6b8: '❌ Requires internet connection (for initial page load)',
    s6b9: '❌ May struggle with extremely large files (500+ pages)',
    s6b10: '❌ Fewer advanced formatting options',
    s6p4s: 'Verdict:',
    s6p4t: ' For adding page numbers specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just page numbering, or if you regularly work with very large files.',
    s6h2: 'Online Tools vs. Cloud-Based Services',
    s6p5: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c1: '✅ Integrated with cloud storage',
    s6c2: '✅ Can access files from anywhere',
    s6c3: '✅ Often free with cloud storage accounts',
    s6c4: '❌ Files uploaded to servers (privacy concern)',
    s6c5: '❌ Requires account creation',
    s6c6: '❌ Storage limits apply',
    s6c7: '❌ Files may be retained on servers',
    s6c8: '❌ Slower processing (upload/download time)',
    s6c9: '❌ Limited customization options',
    s6p6: 'Client-Side Online Tools:',
    s6d1: '✅ No file uploads (privacy-first)',
    s6d2: '✅ No account required',
    s6d3: '✅ Faster processing (no upload/download)',
    s6d4: '✅ No storage limits',
    s6d5: '✅ Files never leave your device',
    s6d6: '✅ More customization options',
    s6d7: "❌ Can't access files from cloud storage directly",
    s6p7s: 'Verdict:',
    s6p7t: ' For privacy-conscious users, client-side online tools are superior. Cloud services are better if you need to number files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6h3: 'Online Tools vs. Manual Methods',
    s6p8: 'Some people try to add page numbers manually using methods like:',
    s6e1: 'Printing PDFs and writing numbers by hand (time-consuming, unprofessional)',
    s6e2: 'Using image editing software to add numbers (tedious, quality loss)',
    s6e3: 'Converting PDFs to Word, adding numbers, then converting back (formatting issues, quality loss)',
    s6e4: 'Using freeware with ads and malware risks',
    s6p9s: 'Verdict:',
    s6p9t: " Online PDF page numbering tools are faster, produce better quality results, preserve formatting, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    faqSecTitle: 'Frequently Asked Questions About Adding Page Numbers to PDFs',

    conclh: 'Conclusion: Making PDF Page Numbering Simple',
    conclp1: "Adding page numbers to PDF documents doesn't have to be complicated. With modern online PDF page numbering tools, numbering your pages is straightforward, fast, and secure. Whether you're a business professional preparing reports, a student submitting assignments, a legal professional organizing case documents, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    conclp2: 'The key advantages of online PDF page numbering tools—no installation, privacy-first processing, free access, multiple customization options, and cross-platform compatibility—make them the ideal solution for most numbering needs. While desktop software has its place for advanced PDF editing tasks, simple page numbering is perfectly handled by browser-based tools.',
    conclp3: 'Remember these best practices:',
    conclm1: "Choose the right position that doesn't interfere with your content",
    conclm2: 'Select a format that matches your document\'s purpose (simple numbers vs. "Page X of Y")',
    conclm3: 'Keep page numbers subtle and professional',
    conclm4: 'Use privacy-first tools that process files locally',
    conclm5: 'Preview your settings before processing',
    conclm6: "Keep backups of original files until you're satisfied with the numbered version",
    conclm7: 'Consider starting page numbers from page 3 or 4 for professional documents',
    conclp4a: 'Ready to add page numbers to your PDFs? Try our ',
    conclp4link1: 'free PDF page numbering tool',
    conclp4b: ' and experience how simple numbering documents can be. And if you need to make other edits to your PDFs before or after adding page numbers, check out our ',
    conclp4link2: 'PDF editing tool',
    conclp4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    conclp4link3: 'PDF compression tool',
    conclp4d: ' can help reduce file sizes. And if you need to combine multiple PDFs, our ',
    conclp4link4: 'PDF merger tool',
    conclp4e: ' makes it easy to merge documents together.',
    conclp5: 'PDF management doesn\'t have to be a chore. With the right tools and approach, you can handle document numbering quickly and confidently, leaving more time for the work that actually matters.',

    // Related Articles
    rel1t: 'How to Merge PDF Files Online',
    rel1d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel2t: 'How to Split PDF Files Online',
    rel2d: 'Complete guide to dividing large PDF documents into smaller files using free online tools.',
    rel3t: 'How to Edit a PDF Online',
    rel3d: 'Complete guide to editing PDF files online without installing software.',
    rel4t: 'How to Compress PDF Files Online',
    rel4d: 'Learn how to reduce PDF file sizes without losing quality using free online tools.',

    // Visible FAQ (12) — inline <Link> markup stays in the JSX below
    fv1q: 'How do I add page numbers to a PDF file online for free?',
    fv1a1: 'You can add page numbers to a PDF file online for free by using our ',
    fv1aLink: 'PDF page numbering tool',
    fv1a2: '. Simply upload your PDF file, choose your page number format and position (top, bottom, left, or right), customize the style, and click add. The tool adds page numbers to all pages that you can download instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to add page numbers to PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF page numbering tool that processes files locally in your browser, your documents never leave your device. All processing happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I customize the page number format and style?',
    fv3a: 'Yes, most online PDF page numbering tools allow you to customize the format (1, 2, 3 or Page 1, Page 2, etc.), position (top, bottom, left, right, or corners), font size, font style, and color. Some tools also let you start numbering from a specific page or use different formats for different sections. Advanced options may include Roman numerals for introductory pages, custom prefixes, or "Page X of Y" formats that show total page count.',
    fv4q: 'What is the maximum file size for adding page numbers to PDFs online?',
    fv4a1: 'File size limits vary by tool, but most online PDF page numbering tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to add page numbers to very large PDFs, consider splitting the file first using a ',
    fv4aLink: 'PDF splitter tool',
    fv4a2: ', or using desktop software designed for heavy-duty processing.',
    fv5q: 'Do I need to create an account to add page numbers to PDF files?',
    fv5a: 'No, many free PDF page numbering tools work without requiring account creation or registration. You can upload, add page numbers, and download your numbered PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving numbering history or accessing premium features, but basic PDF page numbering is typically available without any registration.',
    fv6q: 'Can I start page numbering from a specific page?',
    fv6a: 'Yes, many PDF page numbering tools allow you to specify which page to start numbering from. For example, you can skip the cover page and title page, starting page numbers from page 3. You can also set a custom starting number (e.g., start from page 10 if this document continues from another). Some tools even let you exclude specific pages from numbering or use different numbering styles for different sections of your document.',
    fv7q: 'Will adding page numbers reduce PDF file quality?',
    fv7a: "No, properly adding page numbers to a PDF should not reduce quality. Quality tools add page numbers as text or vector elements without re-compressing or degrading the existing content. The PDF maintains the same quality as the original. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that add page numbers at the native PDF level rather than converting formats.",
    fv8q: 'Can I add page numbers to password-protected PDFs?',
    fv8a1: 'This depends on the tool. Most online PDF page numbering tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a ',
    fv8aLink: 'PDF editing tool',
    fv8a2: ' or the software that created the protection, then add page numbers to the unlocked file. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv9q: 'Can I use different page number formats for different sections?',
    fv9a: "This depends on the tool's capabilities. Basic online tools typically apply one format to all pages. However, some advanced tools allow you to set different formats for different page ranges. For example, you might use Roman numerals (i, ii, iii) for introductory pages and Arabic numerals (1, 2, 3) for the main content. This may require multiple passes with the tool or using more sophisticated desktop software.",
    fv10q: 'What happens to the original PDF after adding page numbers?',
    fv10a: "The original PDF file on your device remains completely unchanged. Adding page numbers creates a new file with numbers added, without modifying the source document. This means you can add page numbers multiple times using different formats or settings without any risk to your original file. Always keep backups of important original files until you're satisfied with the numbered version.",
    fv11q: 'Can I add page numbers to PDFs on mobile devices?',
    fv11a: 'Yes, many online PDF page numbering tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large files might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',
    fv12q: 'Can I remove page numbers if I make a mistake?',
    fv12a: "Since adding page numbers creates a new file, you can't \"undo\" in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply add page numbers again with the correct settings. This is why it's important to preview your settings before processing. Some tools keep your settings available for a few minutes after processing, allowing quick re-numbering if needed.",

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I add page numbers to a PDF file online for free?',
    fq1a: 'You can add page numbers to a PDF file online for free by using our PDF page numbering tool. Simply upload your PDF file, choose your page number format and position (top, bottom, left, or right), customize the style, and click add. The tool adds page numbers to all pages that you can download instantly.',
    fq2q: 'Is it safe to add page numbers to PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF page numbering tool that processes files locally in your browser, your documents never leave your device. All processing happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I customize the page number format and style?',
    fq3a: 'Yes, most online PDF page numbering tools allow you to customize the format (1, 2, 3 or Page 1, Page 2, etc.), position (top, bottom, left, right, or corners), font size, font style, and color. Some tools also let you start numbering from a specific page or use different formats for different sections.',
    fq4q: 'What is the maximum file size for adding page numbers to PDFs online?',
    fq4a: 'File size limits vary by tool, but most online PDF page numbering tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
    fq5q: 'Do I need to create an account to add page numbers to PDF files?',
    fq5a: 'No, many free PDF page numbering tools work without requiring account creation or registration. You can upload, add page numbers, and download your numbered PDF files immediately without signing up.',
    fq6q: 'Can I start page numbering from a specific page?',
    fq6a: 'Yes, many PDF page numbering tools allow you to specify which page to start numbering from. For example, you can skip the cover page and title page, starting page numbers from page 3. You can also set a custom starting number.',
    fq7q: 'Will adding page numbers reduce PDF file quality?',
    fq7a: 'No, properly adding page numbers to a PDF should not reduce quality. Quality tools add page numbers as text or vector elements without re-compressing or degrading the existing content. The PDF maintains the same quality as the original.',
    fq8q: 'Can I add page numbers to password-protected PDFs?',
    fq8a: 'This depends on the tool. Most online PDF page numbering tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool, then add page numbers to the unlocked file.',
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
      images: [{ url: `${siteUrl}/images/blog/add-page-numbers-pdf-hero.png`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/add-page-numbers-pdf-hero.png`],
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
          src="/blog/How to Add Page Numbers to PDF Online_ Complete Guide to PDF Page Numbering.png"
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
                {c.s3p4a}<Link href={L('/tools/page-numbers')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1p1a}<Link href={L('/tools/page-numbers')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
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

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3h1}</h4>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li><strong className="text-white">{c.s4st3a1s}</strong>{c.s4st3a1t}</li>
                    <li><strong className="text-white">{c.s4st3a2s}</strong>{c.s4st3a2t}</li>
                    <li><strong className="text-white">{c.s4st3a3s}</strong>{c.s4st3a3t}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3a4s}</strong>{c.s4st3a4t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3h2}</h4>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li><strong className="text-white">{c.s4st3b1s}</strong>{c.s4st3b1t}</li>
                    <li><strong className="text-white">{c.s4st3b2s}</strong>{c.s4st3b2t}</li>
                    <li><strong className="text-white">{c.s4st3b3s}</strong>{c.s4st3b3t}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3b4s}</strong>{c.s4st3b4t}
                  </p>
                </div>

                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st3p2s}</strong>{c.s4st3p2t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st4l1s}</strong>{c.s4st4l1t}</li>
                  <li><strong className="text-white">{c.s4st4l2s}</strong>{c.s4st4l2t}</li>
                  <li><strong className="text-white">{c.s4st4l3s}</strong>{c.s4st4l3t}</li>
                  <li><strong className="text-white">{c.s4st4l4s}</strong>{c.s4st4l4t}</li>
                  <li><strong className="text-white">{c.s4st4l5s}</strong>{c.s4st4l5t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st4p2s}</strong>{c.s4st4p2t}
                </p>
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
                  <li><strong className="text-white">{c.s4st5l5s}</strong>{c.s4st5l5t}</li>
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p2s}</strong>{c.s4st6p2t}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6m1}</li>
                  <li>{c.s4st6m2}</li>
                  <li>{c.s4st6m3}</li>
                  <li>{c.s4st6m4}</li>
                  <li>{c.s4st6m5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st6p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st7l1}</li>
                  <li>{c.s4st7l2}</li>
                  <li>{c.s4st7l3}</li>
                  <li>{c.s4st7l4}</li>
                  <li>{c.s4st7l5}</li>
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
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st8o1}</li>
                  <li>{c.s4st8o2}</li>
                  <li>{c.s4st8o3}</li>
                  <li>{c.s4st8o4}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st8p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st8l1}</li>
                  <li>{c.s4st8l2}</li>
                  <li>{c.s4st8l3}</li>
                  <li>{c.s4st8l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st8p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st9h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st9p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st9p2s}</strong>{c.s4st9p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st9p3}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h1}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h2}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5p3}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5l1}</li>
                  <li>{c.s5l2}</li>
                  <li>{c.s5l3}</li>
                  <li>{c.s5l4}</li>
                  <li>{c.s5l5}</li>
                  <li>{c.s5l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p4}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h3}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p5}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h4}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p6}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h5}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p7}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h6}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p8}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h7}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5p9}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5n1}</li>
                  <li>{c.s5n2}</li>
                  <li>{c.s5n3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p10}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h8}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5p11}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6h1}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6a1}</li>
                  <li>{c.s6a2}</li>
                  <li>{c.s6a3}</li>
                  <li>{c.s6a4}</li>
                  <li>{c.s6a5}</li>
                  <li>{c.s6a6}</li>
                  <li>{c.s6a7}</li>
                  <li>{c.s6a8}</li>
                  <li>{c.s6a9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6p3}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6b1}</li>
                  <li>{c.s6b2}</li>
                  <li>{c.s6b3}</li>
                  <li>{c.s6b4}</li>
                  <li>{c.s6b5}</li>
                  <li>{c.s6b6}</li>
                  <li>{c.s6b7}</li>
                  <li>{c.s6b8}</li>
                  <li>{c.s6b9}</li>
                  <li>{c.s6b10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6p4s}</strong>{c.s6p4t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6h2}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6p5}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1}</li>
                  <li>{c.s6c2}</li>
                  <li>{c.s6c3}</li>
                  <li>{c.s6c4}</li>
                  <li>{c.s6c5}</li>
                  <li>{c.s6c6}</li>
                  <li>{c.s6c7}</li>
                  <li>{c.s6c8}</li>
                  <li>{c.s6c9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6p6}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6d1}</li>
                  <li>{c.s6d2}</li>
                  <li>{c.s6d3}</li>
                  <li>{c.s6d4}</li>
                  <li>{c.s6d5}</li>
                  <li>{c.s6d6}</li>
                  <li>{c.s6d7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6p7s}</strong>{c.s6p7t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6h3}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6p8}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6e1}</li>
                  <li>{c.s6e2}</li>
                  <li>{c.s6e3}</li>
                  <li>{c.s6e4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6p9s}</strong>{c.s6p9t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqSecTitle}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/page-numbers')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1a2}
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
                    {c.fv4a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4aLink}</Link>{c.fv4a2}
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
                    {c.fv8a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8aLink}</Link>{c.fv8a2}
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
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.conclh}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.conclp1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.conclp2}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.conclp3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.conclm1}</li>
                <li>{c.conclm2}</li>
                <li>{c.conclm3}</li>
                <li>{c.conclm4}</li>
                <li>{c.conclm5}</li>
                <li>{c.conclm6}</li>
                <li>{c.conclm7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.conclp4a}<Link href={L('/tools/page-numbers')} className="text-primary-400 hover:text-primary-300 underline">{c.conclp4link1}</Link>{c.conclp4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.conclp4link2}</Link>{c.conclp4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.conclp4link3}</Link>{c.conclp4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.conclp4link4}</Link>{c.conclp4e}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.conclp5}
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
                href={L('/blog/how-to-compress-pdf-online')}
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

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-to-add-page-numbers-to-pdf.i18n'
Object.assign(C, TRANSLATIONS)
