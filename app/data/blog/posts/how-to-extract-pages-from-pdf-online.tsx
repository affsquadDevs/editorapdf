import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-extract-pages-from-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Extract Pages from PDF Online_ Complete Guide to PDF Page Extraction.png'
const ogImage = '/images/blog/how-to-extract-pages-from-pdf-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Extract Pages from PDF Online (Step-by-Step Guide)',
    metaDesc: 'Extract selected pages from your PDF file online. Create a new PDF with chosen pages and download instantly — no installation required.',
    ogTitle: 'How to Extract Pages from PDF Online (Step-by-Step Guide)',
    ogDesc: 'Extract selected pages from your PDF file online. Create a new PDF with chosen pages and download instantly — no installation required.',
    twTitle: 'How to Extract Pages from PDF Online (Step-by-Step Guide)',
    twDesc: 'Extract selected pages from your PDF file online. Create a new PDF with chosen pages and download instantly — no installation required.',
    ogAlt: 'Banner showing extraction of selected pages from a PDF into a new document with extract button',

    bcLeaf: 'How to Extract Pages from PDF Online',
    heroAlt: 'How to extract pages from PDF online - Free PDF page extractor tool guide',
    heroTitle: 'How to Extract Pages from PDF Online: Complete Guide to PDF Page Extraction',
    heroSubtitle: 'Learn how to pull specific pages from large PDF documents using free online tools. No software installation required.',

    artHeadline: 'How to Extract Pages from PDF Online - Complete Guide to PDF Page Extraction',
    artDesc: 'Complete guide on how to extract pages from PDF files online. Learn to pull specific pages from large PDF documents using free online tools. Step-by-step instructions, tips, and best practices for PDF page extraction.',

    intro1: "You've got a 150-page PDF document, but you only need pages 23 through 45. Maybe it's a specific chapter from a report, a few invoices from a monthly statement, or selected pages from a scanned document archive. Whatever the reason, extracting pages from PDF files is one of those tasks that seems simple but can quickly become tedious if you don't have the right approach.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF page extractor tools make pulling specific pages from large documents as straightforward as selecting page numbers and clicking a button. This comprehensive guide will walk you through everything you need to know about extracting pages from PDFs online, from understanding different extraction methods to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Extracting PDF Pages Can Be Frustrating',
    s1p1: 'PDFs are designed to be complete, self-contained documents. They preserve formatting perfectly, which is great for sharing, but it makes extracting specific pages more complex than it should be. Unlike Word documents where you can easily copy sections, PDF files require specialized tools to extract pages properly while maintaining quality and formatting.',
    s1p2: "Here's what makes PDF page extraction challenging:",
    s1l1s: 'Page selection complexity:',
    s1l1t: ' Manually identifying and extracting specific pages from large documents is time-consuming and error-prone',
    s1l2s: 'File size issues:',
    s1l2t: ' Large PDFs can be difficult to work with, making it hard to find and extract the pages you need',
    s1l3s: 'Quality preservation:',
    s1l3t: ' Poor extraction methods can degrade image quality or lose formatting',
    s1l4s: 'Non-consecutive pages:',
    s1l4t: " Extracting pages that aren't in sequence (like pages 1, 5, 12, and 20) requires multiple operations with basic tools",
    s1l5s: 'Security concerns:',
    s1l5t: ' Uploading sensitive documents to unknown servers raises privacy questions',
    s1l6s: 'Software requirements:',
    s1l6t: ' Desktop PDF tools often require installation, updates, and sometimes payment',
    s1l7s: 'Format preservation:',
    s1l7t: ' Ensuring extracted pages maintain original page sizes, orientations, and quality can be tricky',
    s1p3: 'These pain points are exactly why online PDF page extractor tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think extracting pages from PDFs is a niche task, but it's actually something millions of people need to do regularly. Consider these everyday scenarios:",
    s2l1s: 'Business professionals',
    s2l1t: ' extracting specific sections from large reports for presentations or email distribution',
    s2l2s: 'Students',
    s2l2t: ' pulling individual chapters from lengthy textbooks or research papers for focused study',
    s2l3s: 'HR departments',
    s2l3t: ' extracting individual employee documents from consolidated PDF files',
    s2l4s: 'Legal teams',
    s2l4t: ' pulling specific pages from case files, evidence documents, or correspondence',
    s2l5s: 'Real estate agents',
    s2l5t: ' extracting property-specific pages from large document packages',
    s2l6s: 'Healthcare workers',
    s2l6t: ' pulling individual patient records from archived document collections',
    s2l7s: 'Accountants',
    s2l7t: ' extracting specific invoices or statements from monthly or quarterly reports',
    s2l8s: 'Content creators',
    s2l8t: ' pulling individual pages from design portfolios or presentation decks',
    s2l9s: 'Researchers',
    s2l9t: ' extracting relevant pages from academic papers or research documents',
    s2l10s: 'Administrative staff',
    s2l10t: ' pulling specific forms or documents from large administrative PDFs',
    s2p2: "The time wasted on manual PDF page extraction adds up quickly. What takes seconds with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Lost or corrupted pages during manual extraction attempts',
    s2m2: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor document quality in the extracted pages',
    s2m5: 'Incorrect page selection leading to missing or wrong content',
    s2m6: 'File size issues that prevent sharing extracted pages',
    s2p3: "That's why understanding how to extract PDF pages properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication.",

    s3h: 'The Solution: Modern Online PDF Page Extractor Tools',
    s3p1: 'The solution to PDF page extraction headaches is simpler than you might expect. Modern web-based PDF extractor tools handle all the technical complexity behind the scenes, giving you a clean interface to pull specific pages in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Extract pages in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Flexible page selection:',
    s3l6t: ' Extract individual pages, page ranges, or non-consecutive pages—all in one operation',
    s3l7s: 'Quality preservation:',
    s3l7t: ' Maintains original page quality, formatting, and metadata',
    s3p3: "The best part? You don't need to understand how PDF page extraction works technically. The tool handles page identification, content extraction, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF page extractor tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Extract Pages from PDF Using Our Tool',
    s4p1: "Ready to extract pages from your PDF? Follow these steps to pull specific pages from large documents quickly and easily. We'll cover extracting individual pages, page ranges, and non-consecutive pages.",

    s4s1h: 'Step 1: Access the PDF Page Extractor Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF page extractor page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start extracting pages immediately.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count and thumbnails of each page. This helps you identify which pages you want to extract.",

    s4s3h: 'Step 3: Select Pages to Extract',
    s4s3p1: 'This is where you choose which pages to extract. Most tools offer several methods for page selection:',
    s4s3aH: 'Method A: Extract Individual Pages',
    s4s3aP1: 'Select specific individual pages by clicking on them or entering page numbers separated by commas. For example, entering "1, 3, 5, 7" extracts pages 1, 3, 5, and 7.',
    s4s3aP2s: 'Best for:',
    s4s3aP2t: ' When you need specific, non-consecutive pages scattered throughout the document.',
    s4s3bH: 'Method B: Extract Page Ranges',
    s4s3bP1: 'Specify a range of consecutive pages using a dash. For example, entering "10-25" extracts pages 10 through 25 inclusive. You can combine multiple ranges: "1-5, 10-15, 20-25" extracts three separate ranges.',
    s4s3bP2s: 'Best for:',
    s4s3bP2t: ' When you need a continuous section of pages, like a chapter or section of a report.',
    s4s3cH: 'Method C: Extract Mixed Pages and Ranges',
    s4s3cP1: 'Combine individual pages and ranges in a single operation. For example, "1, 3-5, 10, 15-20, 25" extracts page 1, pages 3-5, page 10, pages 15-20, and page 25.',
    s4s3cP2s: 'Best for:',
    s4s3cP2t: ' Complex extraction needs where you need both individual pages and page ranges from different parts of the document.',
    s4s3dH: 'Method D: Visual Page Selection',
    s4s3dP1: 'Some tools offer a visual interface where you can click on page thumbnails to select them. This is especially helpful when you can see the content and want to select pages visually rather than by number.',
    s4s3dP2s: 'Best for:',
    s4s3dP2t: " When you can identify pages by their content rather than page numbers, or when you're not sure of the exact page numbers.",

    s4s4h: 'Step 4: Review Your Page Selection',
    s4s4p1: 'Before extracting, take a moment to verify your page selection:',
    s4s4l1: 'The page numbers or ranges are correct',
    s4s4l2: "You've included all pages you need",
    s4s4l3: "You haven't accidentally included unwanted pages",
    s4s4l4: 'The total number of pages to extract looks reasonable',
    s4s4l5: 'Page order is correct (if order matters for your use case)',
    s4s4p2: 'Most tools show you a preview or summary of which pages will be extracted, making it easy to catch mistakes before processing.',

    s4s5h: 'Step 5: Click Extract and Wait for Processing',
    s4s5p1: 'Once everything looks good, click the "Extract Pages" or "Create PDF" button. The tool will:',
    s4s5o1: 'Process your PDF file',
    s4s5o2: 'Identify the selected pages',
    s4s5o3: 'Extract those pages while preserving formatting and quality',
    s4s5o4: 'Create a new PDF containing only the extracted pages',
    s4s5o5: 'Generate your extracted PDF file',
    s4s5p2: 'Processing time depends on:',
    s4s5l1: 'Total number of pages in the original PDF',
    s4s5l2: 'Number of pages being extracted',
    s4s5l3: 'File size',
    s4s5l4: "Your device's processing power",
    s4s5p3: "For typical extractions (10-20 pages from a 100-page document), this usually takes just a few seconds. Larger extractions might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s6h: 'Step 6: Download Your Extracted PDF',
    s4s6p1: 'When processing completes, your extracted PDF is ready. Click the download button to save it to your device. The file will typically have a name like "extracted.pdf" or "pages_1-10.pdf" by default, but you can rename it to something more descriptive.',
    s4s6p2s: 'Important:',
    s4s6p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your extracted PDF before closing the page.',
    s4s6p3: "That's it! You've successfully extracted pages from your PDF. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Page Extractor Tools',
    s5p1: 'Why choose an online PDF extractor over desktop software or manual methods? Here are the key advantages:',
    s5h1: '1. Zero Installation Required',
    s5h1p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start extracting pages. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to extract pages on the go.",
    s5h2: '2. Privacy and Security',
    s5h2p1: 'When you use a privacy-first PDF extractor that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5h2l1: 'Confidential business documents',
    s5h2l2: 'Personal financial information',
    s5h2l3: 'Legal documents',
    s5h2l4: 'Medical records',
    s5h2l5: 'Any sensitive data',
    s5h2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5h3: '3. Cost-Effective Solution',
    s5h3p: 'Most online PDF extractor tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF page extraction, free online tools provide excellent value without any financial commitment.',
    s5h4: '4. Flexible Page Selection',
    s5h4p: 'Online extractor tools typically offer more flexible page selection options than basic desktop software. You can extract individual pages, page ranges, non-consecutive pages, or combinations—all in a single operation. This flexibility saves time compared to tools that require multiple extractions for complex page selections.',
    s5h5: '5. Cross-Platform Compatibility',
    s5h5p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF extractors work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5h6: '6. Always Up-to-Date',
    s5h6p: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5h7: '7. Speed and Efficiency',
    s5h7p1: 'Modern browser-based PDF processing is surprisingly fast. You can extract pages in seconds, compared to:',
    s5h7l1: 'Manual screenshot methods (time-consuming and quality-degrading)',
    s5h7l2: 'Print-to-PDF workflows (slow and can lose formatting)',
    s5h7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5h7l4: "Copy-paste methods (which don't work well with PDFs)",
    s5h7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5h8: '8. Quality Preservation',
    s5h8p: 'Quality online extractors preserve the original quality of extracted pages. They maintain original page sizes, orientations, image quality, text formatting, and metadata. This is crucial for professional documents where quality matters.',

    s6h: 'Comparison: Online PDF Extractors vs. Other Tools',
    s6p1: "How do online PDF page extractor tools stack up against alternatives? Let's break down the comparison:",
    s6c1h: 'Online PDF Extractors vs. Desktop Software',
    s6c1s1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6c1a1: '✅ More advanced features (editing, form filling, etc.)',
    s6c1a2: '✅ Works offline',
    s6c1a3: '✅ Better for very large files (500+ pages)',
    s6c1a4: '❌ Requires installation and updates',
    s6c1a5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1a6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1a7: '❌ Takes up disk space',
    s6c1a8: '❌ May have limited page selection options',
    s6c1s2: 'Online PDF Extractors:',
    s6c1b1: '✅ Free to use',
    s6c1b2: '✅ No installation required',
    s6c1b3: '✅ Works on any platform',
    s6c1b4: '✅ Always up-to-date',
    s6c1b5: '✅ Privacy-first (client-side processing)',
    s6c1b6: '✅ Flexible page selection (individual, ranges, mixed)',
    s6c1b7: '✅ Visual page selection interfaces',
    s6c1b8: '❌ Requires internet connection (for initial page load)',
    s6c1b9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1vs: 'Verdict:',
    s6c1vt: ' For PDF page extraction specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just extraction, or if you regularly work with very large files.',
    s6c2h: 'Online PDF Extractors vs. Cloud-Based Services',
    s6c2s1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c2a1: '✅ Integrated with cloud storage',
    s6c2a2: '✅ Can access files from anywhere',
    s6c2a3: '✅ Often free with cloud storage accounts',
    s6c2a4: '❌ Files uploaded to servers (privacy concern)',
    s6c2a5: '❌ Requires account creation',
    s6c2a6: '❌ Storage limits apply',
    s6c2a7: '❌ Files may be retained on servers',
    s6c2a8: '❌ Slower processing (upload/download time)',
    s6c2a9: '❌ Limited page selection options',
    s6c2s2: 'Client-Side Online Extractors:',
    s6c2b1: '✅ No file uploads (privacy-first)',
    s6c2b2: '✅ No account required',
    s6c2b3: '✅ Faster processing (no upload/download)',
    s6c2b4: '✅ No storage limits',
    s6c2b5: '✅ Files never leave your device',
    s6c2b6: '✅ Flexible page selection options',
    s6c2b7: "❌ Can't access files from cloud storage directly",
    s6c2vs: 'Verdict:',
    s6c2vt: ' For privacy-conscious users, client-side online extractors are superior. Cloud services are better if you need to extract pages from files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6c3h: 'Online PDF Extractors vs. Manual Methods',
    s6c3p1: 'Some people try to extract PDF pages manually using methods like:',
    s6c3l1: 'Taking screenshots of pages (terrible quality, not searchable, time-consuming)',
    s6c3l2: 'Printing specific pages to a new PDF (slow, quality loss, time-consuming)',
    s6c3l3: 'Using freeware with ads and malware risks',
    s6c3l4: "Copy-pasting content (doesn't work well with PDFs)",
    s6c3l5: 'Manually splitting and recombining PDFs (complex and error-prone)',
    s6c3vs: 'Verdict:',
    s6c3vt: " Online PDF extractors are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    s7h: 'Frequently Asked Questions About Extracting PDF Pages',
    fv1q: 'How do I extract pages from a PDF file online for free?',
    fv1aA: 'You can extract pages from a PDF file online for free by using our ',
    fv1aLink: 'PDF page extractor tool',
    fv1aB: '. Simply upload your PDF file, select the specific pages or page ranges you want to extract (either by entering page numbers or clicking on page thumbnails), and click extract. The tool creates a new PDF containing only the selected pages that you can download instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to extract pages from PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF extractor that processes files locally in your browser, your documents never leave your device. All page extraction happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I extract multiple pages from a PDF at once?',
    fv3a: 'Absolutely. Most online PDF extractor tools allow you to extract multiple pages or page ranges simultaneously. You can specify individual pages (e.g., 1, 3, 5), page ranges (e.g., 10-25), or combinations (e.g., 1, 3-5, 10, 15-20). The tool creates a single PDF containing all selected pages in the order you specified. This is much more efficient than extracting pages one at a time.',
    fv4q: 'Can I extract non-consecutive pages from a PDF?',
    fv4a: 'Yes, most PDF extractor tools allow you to extract non-consecutive pages. You can specify individual pages separated by commas (e.g., 1, 3, 5, 7, 12) and the tool will extract all selected pages into a single PDF in the order you specified. You can also combine individual pages with page ranges (e.g., 1, 3-5, 10, 15-20) for maximum flexibility.',
    fv5q: 'What is the maximum file size for extracting pages from PDFs online?',
    fv5a: 'File size limits vary by tool, but most online PDF extractors support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to extract pages from very large PDFs, consider using desktop software designed for heavy-duty processing, or extract pages in multiple operations.',
    fv6q: 'Do I need to create an account to extract pages from PDF files?',
    fv6a: 'No, many free PDF extractor tools work without requiring account creation or registration. You can upload, extract pages, and download your new PDF file immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving extraction history or accessing premium features, but basic PDF page extraction is typically available without any registration.',
    fv7q: 'Will extracting pages from a PDF reduce file quality?',
    fv7a: "No, properly extracting pages from a PDF should not reduce quality. When you extract pages using a quality tool, it copies the original pages without re-compressing or degrading the content. The extracted PDF maintains the same quality, formatting, page sizes, and orientations as the original pages. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that extract pages at the native PDF level rather than converting formats.",
    fv8qA: 'Can I extract pages from password-protected PDFs?',
    fv8aA: 'Most online PDF extractors cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a ',
    fv8aLink: 'PDF editing tool',
    fv8aB: ' or the software that created the protection, then extract pages from the unlocked file. Some desktop PDF software can handle password-protected files if you provide the password during extraction.',
    fv9q: 'What happens to the original PDF after extracting pages?',
    fv9a: "The original PDF file on your device remains completely unchanged. Extracting pages creates a new file without modifying the source document. This means you can extract pages from the same PDF multiple times using different page selections without any risk to your original file. Always keep backups of important original files until you're satisfied with the extracted results.",
    fv10q: 'Can I extract pages on mobile devices?',
    fv10a: 'Yes, many online PDF extractor tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large extractions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',
    fv11q: 'How many pages can I extract at once?',
    fv11a: "There's no hard limit on the number of pages you can extract, but practical limits exist based on your device's capabilities. Most online tools handle extracting 50-100 pages comfortably. Very large extractions (200+ pages) may cause browser slowdowns or memory issues. If you need to extract many pages, consider doing it in multiple operations or using desktop software optimized for large file processing.",
    fv12q: 'Can I change the order of pages when extracting?',
    fv12a: 'The order of extracted pages typically follows the order you specify in your page selection. For example, if you extract pages "1, 5, 3, 10", the extracted PDF will contain pages in that order: page 1, then page 5, then page 3, then page 10. Some tools allow you to reorder pages after selection, but most follow the order you specify. If you need pages in a different order, specify them in the desired sequence.',

    s8h: 'Conclusion: Making PDF Page Extraction Simple',
    s8p1: "Extracting pages from PDF files doesn't have to be complicated. With modern online PDF page extractor tools, pulling specific pages from large documents is straightforward, fast, and secure. Whether you're a business professional extracting report sections, a student pulling chapters, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF extractors—no installation, privacy-first processing, free access, flexible page selection, and cross-platform compatibility—make them the ideal solution for most extraction needs. While desktop software has its place for advanced PDF editing tasks, simple page extraction is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Choose the right page selection method for your needs (individual, ranges, or mixed)',
    s8l2: 'Keep files under 25 MB for best performance',
    s8l3: 'Use privacy-first tools that process files locally',
    s8l4: 'Review your page selection before extracting',
    s8l5: "Keep backups of original files until you're satisfied with the extracted pages",
    s8l6: 'Specify pages in the order you want them in the final PDF',
    s8p4a: 'Ready to extract pages from your PDFs? Try our ',
    s8p4link1: 'free PDF page extractor tool',
    s8p4b: ' and experience how simple pulling specific pages can be. And if you need to make edits to your PDFs before or after extracting pages, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple PDFs later, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle page extraction quickly and confidently, leaving more time for the work that actually matters.",

    rel1t: 'How to Split PDF Files Online',
    rel1d: 'Learn how to divide large PDF files into smaller documents using free online tools.',
    rel2t: 'How to Merge PDF Files Online',
    rel2d: 'Complete guide to combining multiple PDF files into one document using free online tools.',
    rel3t: 'How to Edit a PDF Online',
    rel3d: 'Complete guide to editing PDF files online without installing software.',
    rel4t: 'Is It Safe to Edit PDFs Online?',
    rel4d: 'Learn about privacy and security when editing PDF files online.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I extract pages from a PDF file online for free?',
    fq1a: 'You can extract pages from a PDF file online for free by using our PDF page extractor tool. Simply upload your PDF file, select the specific pages or page ranges you want to extract, and click extract. The tool creates a new PDF containing only the selected pages that you can download instantly.',
    fq2q: 'Is it safe to extract pages from PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF extractor that processes files locally in your browser, your documents never leave your device. All page extraction happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I extract multiple pages from a PDF at once?',
    fq3a: 'Yes, most online PDF extractor tools allow you to extract multiple pages or page ranges simultaneously. You can specify individual pages (e.g., 1, 3, 5) or page ranges (e.g., 1-10, 15-20) and the tool will create a single PDF containing all selected pages in order.',
    fq4q: 'What is the maximum file size for extracting pages from PDFs online?',
    fq4a: 'File size limits vary by tool, but most online PDF extractors support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
    fq5q: 'Do I need to create an account to extract pages from PDF files?',
    fq5a: 'No, many free PDF extractor tools work without requiring account creation or registration. You can upload, extract pages, and download your new PDF file immediately without signing up.',
    fq6q: 'Can I extract non-consecutive pages from a PDF?',
    fq6a: 'Yes, most PDF extractor tools allow you to extract non-consecutive pages. You can specify individual pages separated by commas (e.g., 1, 3, 5, 7-10) and the tool will extract all selected pages into a single PDF in the order you specified.',
    fq7q: 'Will extracting pages from a PDF reduce file quality?',
    fq7a: 'No, properly extracting pages from a PDF should not reduce quality. When you extract pages using a quality tool, it copies the original pages without re-compressing or degrading the content. The extracted PDF maintains the same quality as the original pages.',
    fq8q: 'Can I extract pages from password-protected PDFs?',
    fq8a: 'Most online PDF extractors cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool, then extract pages from the unlocked file.',
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
                <li><strong className="text-white">{c.s2l10s}</strong>{c.s2l10t}</li>
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
                {c.s3p4a}<Link href={L('/extractpages')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4s1p1a}<Link href={L('/extractpages')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
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
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3aH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3aP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3aP2s}</strong>{c.s4s3aP2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3bH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3bP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3bP2s}</strong>{c.s4s3bP2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3cH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3cP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3cP2s}</strong>{c.s4s3cP2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3dH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3dP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3dP2s}</strong>{c.s4s3dP2t}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s4l1}</li>
                  <li>{c.s4s4l2}</li>
                  <li>{c.s4s4l3}</li>
                  <li>{c.s4s4l4}</li>
                  <li>{c.s4s4l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s4p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s5p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s5o1}</li>
                  <li>{c.s4s5o2}</li>
                  <li>{c.s4s5o3}</li>
                  <li>{c.s4s5o4}</li>
                  <li>{c.s4s5o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s5p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s5l1}</li>
                  <li>{c.s4s5l2}</li>
                  <li>{c.s4s5l3}</li>
                  <li>{c.s4s5l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s5p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s6p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s6p2s}</strong>{c.s4s6p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s6p3}
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
                  {c.s5h1p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h2}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5h2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5h2l1}</li>
                  <li>{c.s5h2l2}</li>
                  <li>{c.s5h2l3}</li>
                  <li>{c.s5h2l4}</li>
                  <li>{c.s5h2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h3}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h3p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h4}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h4p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h5}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h5p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h6}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h6p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h7}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5h7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5h7l1}</li>
                  <li>{c.s5h7l2}</li>
                  <li>{c.s5h7l3}</li>
                  <li>{c.s5h7l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5h8}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5h8p}
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
                  <strong className="text-white">{c.s6c1s1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1a1}</li>
                  <li>{c.s6c1a2}</li>
                  <li>{c.s6c1a3}</li>
                  <li>{c.s6c1a4}</li>
                  <li>{c.s6c1a5}</li>
                  <li>{c.s6c1a6}</li>
                  <li>{c.s6c1a7}</li>
                  <li>{c.s6c1a8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1s2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1b1}</li>
                  <li>{c.s6c1b2}</li>
                  <li>{c.s6c1b3}</li>
                  <li>{c.s6c1b4}</li>
                  <li>{c.s6c1b5}</li>
                  <li>{c.s6c1b6}</li>
                  <li>{c.s6c1b7}</li>
                  <li>{c.s6c1b8}</li>
                  <li>{c.s6c1b9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1vs}</strong>{c.s6c1vt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2s1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2a1}</li>
                  <li>{c.s6c2a2}</li>
                  <li>{c.s6c2a3}</li>
                  <li>{c.s6c2a4}</li>
                  <li>{c.s6c2a5}</li>
                  <li>{c.s6c2a6}</li>
                  <li>{c.s6c2a7}</li>
                  <li>{c.s6c2a8}</li>
                  <li>{c.s6c2a9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2s2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2b1}</li>
                  <li>{c.s6c2b2}</li>
                  <li>{c.s6c2b3}</li>
                  <li>{c.s6c2b4}</li>
                  <li>{c.s6c2b5}</li>
                  <li>{c.s6c2b6}</li>
                  <li>{c.s6c2b7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c2vs}</strong>{c.s6c2vt}
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
                  <li>{c.s6c3l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c3vs}</strong>{c.s6c3vt}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1aA}<Link href={L('/extractpages')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1aB}
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
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv8qA}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv8aA}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8aLink}</Link>{c.fv8aB}
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
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/extractpages')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                href={L('/blog/how-to-split-pdf-files-online')}
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
                href={L('/blog/how-to-merge-pdf-files-online')}
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
                href={L('/blog/is-it-safe-to-edit-pdfs-online')}
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
import { TRANSLATIONS } from './how-to-extract-pages-from-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
