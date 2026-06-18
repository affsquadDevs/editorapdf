import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-split-pdf-files-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Split PDF Files Online_ Complete Guide to Dividing PDF Documents.png'
const ogImage = '/images/blog/how-to-split-pdf-files-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Split PDF Files Online: Complete Guide to Dividing PDF Documents',
    metaDesc: 'Learn how to split PDF files online in seconds. Extract specific pages, divide large PDFs into smaller documents, and download separate files securely.',
    ogTitle: 'How to Split PDF Files Online: Complete Guide to Dividing PDF Documents',
    ogDesc: 'Learn how to split PDF files online in seconds. Extract specific pages, divide large PDFs into smaller documents, and download separate files securely.',
    twTitle: 'How to Split PDF Files Online: Complete Guide to Dividing PDF Documents',
    twDesc: 'Learn how to split PDF files online in seconds. Extract specific pages, divide large PDFs into smaller documents, and download separate files securely.',
    ogAlt: 'Illustration showing a PDF file being split into two separate documents with scissors and a SPLIT button',
    heroAlt: 'How to split PDF files online - Free PDF splitter tool guide',

    bcLeaf: 'How to Split PDF Files Online',
    heroTitle: 'How to Split PDF Files Online: Complete Guide to Dividing PDF Documents',
    heroSubtitle: 'Learn how to divide large PDF files into smaller documents using free online tools. No software installation required.',

    artHeadline: 'How to Split PDF Files Online - Complete Guide to Dividing PDF Documents',
    artDesc: 'Complete guide on how to split PDF files online. Learn to divide large PDF documents into smaller files using free online tools. Step-by-step instructions, tips, and best practices for splitting PDFs by pages, size, or bookmarks.',

    intro1: "You've got a massive PDF file—maybe it's a 200-page report, a collection of invoices, or a scanned document archive. You need to break it down into smaller, more manageable pieces. Perhaps you're emailing specific sections to different people, or you need to reduce file sizes for easier sharing. Whatever the reason, splitting PDF files is one of those essential tasks that can save you hours of frustration.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF splitter tools make dividing large PDF documents as straightforward as uploading a file and choosing how you want to split it. This comprehensive guide will walk you through everything you need to know about splitting PDFs online, from understanding different splitting methods to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Splitting PDFs Can Be Challenging',
    s1p1: 'PDFs are designed to be complete, self-contained documents. They preserve formatting perfectly, which is great for sharing, but it makes splitting them more complex than simply cutting and pasting. Unlike Word documents where you can easily extract sections, PDF files require specialized tools to divide them properly.',
    s1p2: "Here's what makes PDF splitting challenging:",
    s1l1s: 'Page extraction complexity:',
    s1l1t: ' Extracting specific pages while maintaining formatting requires precise PDF manipulation',
    s1l2s: 'File size limitations:',
    s1l2t: ' Large PDFs can be difficult to email or upload, making splitting necessary for sharing',
    s1l3s: 'Multiple splitting methods:',
    s1l3t: ' Different use cases require different approaches—by pages, by size, or by bookmarks',
    s1l4s: 'Quality preservation:',
    s1l4t: ' Poor splitting methods can degrade image quality or lose formatting',
    s1l5s: 'Security concerns:',
    s1l5t: ' Uploading sensitive documents to unknown servers raises privacy questions',
    s1l6s: 'Software requirements:',
    s1l6t: ' Desktop PDF tools often require installation, updates, and sometimes payment',
    s1p3: 'These pain points are exactly why online PDF splitter tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think splitting PDFs is a niche task, but it's actually something millions of people need to do regularly. Consider these everyday scenarios:",
    s2l1s: 'Business professionals',
    s2l1t: ' splitting large reports into sections for different stakeholders or departments',
    s2l2s: 'Students',
    s2l2t: ' extracting specific chapters from lengthy textbooks or research papers',
    s2l3s: 'HR departments',
    s2l3t: ' dividing employee handbooks into individual policy documents',
    s2l4s: 'Legal teams',
    s2l4t: ' separating case files, evidence documents, and correspondence for different cases',
    s2l5s: 'Real estate agents',
    s2l5t: ' splitting property document packages into individual property files',
    s2l6s: 'Healthcare workers',
    s2l6t: ' dividing patient record archives into individual patient files',
    s2l7s: 'Accountants',
    s2l7t: ' separating quarterly reports into monthly statements',
    s2l8s: 'Content creators',
    s2l8t: ' breaking down large design portfolios into individual project showcases',
    s2p2: "The time wasted on manual PDF management adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Lost or corrupted pages during manual extraction',
    s2m2: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor document quality in the final split files',
    s2m5: 'File size issues that prevent email delivery',
    s2p3: "That's why understanding how to split PDFs properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication.",

    s3h: 'The Solution: Modern Online PDF Splitter Tools',
    s3p1: 'The solution to PDF splitting headaches is simpler than you might expect. Modern web-based PDF splitter tools handle all the technical complexity behind the scenes, giving you a clean interface to divide documents in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Split PDFs in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Multiple splitting methods:',
    s3l6t: ' Split by pages, file size, or bookmarks—all in one tool',
    s3p3: "The best part? You don't need to understand how PDF splitting works technically. The tool handles page extraction, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF splitter tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Split PDF Files Using Our Tool',
    s4p1: "Ready to split your PDF? Follow these steps to divide large PDF files into smaller documents quickly and easily. We'll cover the most common splitting methods: by page ranges, by file size, and by bookmarks.",

    s4s1h: 'Step 1: Access the PDF Splitter Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF splitter page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start splitting immediately.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count. This helps you plan how you want to split the document.",

    s4s3h: 'Step 3: Choose Your Splitting Method',
    s4s3p1: 'This is where you decide how to divide your PDF. Most tools offer three main methods:',
    s4s3aH: 'Method A: Split by Page Ranges',
    s4s3aP1: 'This is the most common method. You specify which pages go into each new file. For example:',
    s4s3aL1: 'Pages 1-10 → File 1',
    s4s3aL2: 'Pages 11-20 → File 2',
    s4s3aL3: 'Pages 21-30 → File 3',
    s4s3aP2: 'You can also split every N pages automatically. For instance, "Split every 5 pages" creates a new file every 5 pages.',
    s4s3aP3s: 'Best for:',
    s4s3aP3t: ' When you know exactly which pages you need, or when you want equal-sized chunks.',
    s4s3bH: 'Method B: Split by File Size',
    s4s3bP1: 'This method automatically divides your PDF into multiple files, each under a specified size limit. For example, if you set a 5 MB limit, the tool will create as many files as needed, each under 5 MB.',
    s4s3bP2s: 'Best for:',
    s4s3bP2t: ' When you need to email files and have size restrictions, or when you want to optimize file sizes for sharing.',
    s4s3cH: 'Method C: Split by Bookmarks',
    s4s3cP1: 'If your PDF has bookmarks (table of contents), this method creates a separate file for each bookmark section. The tool uses the bookmark structure to determine where to split.',
    s4s3cP2s: 'Best for:',
    s4s3cP2t: ' Structured documents like reports, books, or manuals that already have a clear organizational structure.',

    s4s4h: 'Step 4: Configure Your Split Settings',
    s4s4p1: "Depending on your chosen method, you'll need to configure specific settings:",
    s4s4l1s: 'For page ranges:',
    s4s4l1t: ' Enter the page numbers or ranges (e.g., "1-10, 11-20, 21-30" or "every 5 pages")',
    s4s4l2s: 'For file size:',
    s4s4l2t: ' Specify the maximum file size in MB (e.g., 5 MB, 10 MB)',
    s4s4l3s: 'For bookmarks:',
    s4s4l3t: ' Select which bookmarks to use as split points',
    s4s4l4s: 'File naming:',
    s4s4l4t: ' Choose how to name the output files (original name + page numbers, sequential numbers, etc.)',
    s4s4p2s: 'Pro tip:',
    s4s4p2t: ' Preview your settings before splitting. Most tools show you how many files will be created and their approximate sizes.',

    s4s5h: 'Step 5: Review Your Settings',
    s4s5p1: 'Before splitting, take a quick moment to verify:',
    s4s5l1: 'Your splitting method matches your needs',
    s4s5l2: 'Page ranges are correct (if splitting by pages)',
    s4s5l3: 'File size limits are appropriate (if splitting by size)',
    s4s5l4: 'The number of output files looks reasonable',
    s4s5l5: 'File naming convention makes sense',
    s4s5p2: "This quick check prevents having to start over if you realize something's wrong after splitting.",

    s4s6h: 'Step 6: Click Split and Wait for Processing',
    s4s6p1: 'Once everything looks good, click the "Split PDF" or "Divide PDF" button. The tool will:',
    s4s6o1: 'Process your PDF file',
    s4s6o2: 'Extract pages according to your settings',
    s4s6o3: 'Create separate PDF files for each split',
    s4s6o4: 'Generate all split files',
    s4s6p2: 'Processing time depends on:',
    s4s6l1: 'Total page count of your PDF',
    s4s6l2: 'Number of files being created',
    s4s6l3: 'File size',
    s4s6l4: "Your device's processing power",
    s4s6p3: "For typical splits (50-100 pages into 3-5 files), this usually takes just a few seconds. Larger splits might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s7h: 'Step 7: Download Your Split PDFs',
    s4s7p1: 'When processing completes, your split PDFs are ready. You can:',
    s4s7l1: 'Download individual files one by one',
    s4s7l2: 'Download all files as a ZIP archive (most convenient for multiple files)',
    s4s7l3: 'Preview each file before downloading',
    s4s7p2s: 'Important:',
    s4s7p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your split PDFs before closing the page.',
    s4s7p3: "That's it! You've successfully split your PDF file. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Splitter Tools',
    s5p1: 'Why choose an online PDF splitter over desktop software or manual methods? Here are the key advantages:',
    s5s1h: '1. Zero Installation Required',
    s5s1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start splitting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to split PDFs on the go.",
    s5s2h: '2. Privacy and Security',
    s5s2p1: 'When you use a privacy-first PDF splitter that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5s2l1: 'Confidential business documents',
    s5s2l2: 'Personal financial information',
    s5s2l3: 'Legal documents',
    s5s2l4: 'Medical records',
    s5s2l5: 'Any sensitive data',
    s5s2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5s3h: '3. Cost-Effective Solution',
    s5s3p1: 'Most online PDF splitter tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF splitting, free online tools provide excellent value without any financial commitment.',
    s5s4h: '4. Multiple Splitting Methods in One Tool',
    s5s4p1: 'Unlike desktop software that might only support one splitting method, online tools often offer multiple options: split by pages, by file size, or by bookmarks. This flexibility means you can handle different use cases without switching tools.',
    s5s5h: '5. Cross-Platform Compatibility',
    s5s5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF splitters work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5s6h: '6. Always Up-to-Date',
    s5s6p1: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5s7h: '7. Speed and Efficiency',
    s5s7p1: 'Modern browser-based PDF processing is surprisingly fast. You can split PDFs in seconds, compared to:',
    s5s7l1: "Manual copy-paste methods (which don't work well with PDFs anyway)",
    s5s7l2: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5s7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5s7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5s8h: '8. Batch Processing Capabilities',
    s5s8p1: 'Many online PDF splitters can handle multiple files at once or create multiple split files from a single PDF simultaneously. This batch processing capability saves significant time when you need to split several documents or create many smaller files from one large document.',

    s6h: 'Comparison: Online PDF Splitters vs. Other Tools',
    s6p1: "How do online PDF splitter tools stack up against alternatives? Let's break down the comparison:",
    s6s1h: 'Online PDF Splitters vs. Desktop Software',
    s6s1p1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6s1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6s1l2: '✅ Works offline',
    s6s1l3: '✅ Better for very large files (500+ pages)',
    s6s1l4: '❌ Requires installation and updates',
    s6s1l5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6s1l6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6s1l7: '❌ Takes up disk space',
    s6s1p2: 'Online PDF Splitters:',
    s6s1m1: '✅ Free to use',
    s6s1m2: '✅ No installation required',
    s6s1m3: '✅ Works on any platform',
    s6s1m4: '✅ Always up-to-date',
    s6s1m5: '✅ Privacy-first (client-side processing)',
    s6s1m6: '✅ Multiple splitting methods in one tool',
    s6s1m7: '❌ Requires internet connection (for initial page load)',
    s6s1m8: '❌ May struggle with extremely large files (500+ pages)',
    s6s1v1s: 'Verdict:',
    s6s1v1t: ' For PDF splitting specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just splitting, or if you regularly work with very large files.',
    s6s2h: 'Online PDF Splitters vs. Cloud-Based Services',
    s6s2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6s2l1: '✅ Integrated with cloud storage',
    s6s2l2: '✅ Can access files from anywhere',
    s6s2l3: '✅ Often free with cloud storage accounts',
    s6s2l4: '❌ Files uploaded to servers (privacy concern)',
    s6s2l5: '❌ Requires account creation',
    s6s2l6: '❌ Storage limits apply',
    s6s2l7: '❌ Files may be retained on servers',
    s6s2l8: '❌ Slower processing (upload/download time)',
    s6s2l9: '❌ Limited splitting options',
    s6s2p2: 'Client-Side Online Splitters:',
    s6s2m1: '✅ No file uploads (privacy-first)',
    s6s2m2: '✅ No account required',
    s6s2m3: '✅ Faster processing (no upload/download)',
    s6s2m4: '✅ No storage limits',
    s6s2m5: '✅ Files never leave your device',
    s6s2m6: '✅ Multiple splitting methods',
    s6s2m7: "❌ Can't access files from cloud storage directly",
    s6s2v1s: 'Verdict:',
    s6s2v1t: ' For privacy-conscious users, client-side online splitters are superior. Cloud services are better if you need to split files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6s3h: 'Online PDF Splitters vs. Manual Methods',
    s6s3p1: 'Some people try to split PDFs manually using methods like:',
    s6s3l1: 'Printing specific pages to a new PDF (slow, quality loss, time-consuming)',
    s6s3l2: 'Taking screenshots of pages (terrible quality, not searchable, time-consuming)',
    s6s3l3: 'Using freeware with ads and malware risks',
    s6s3l4: "Copy-pasting content (doesn't work with PDFs)",
    s6s3v1s: 'Verdict:',
    s6s3v1t: " Online PDF splitters are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    faqVisibleH: 'Frequently Asked Questions About Splitting PDFs',

    // Visible FAQ (14) — some answers contain inline links handled in JSX
    fv1q: 'How do I split a PDF file online for free?',
    fv1a1: 'You can split a PDF file online for free by using our ',
    fv1link: 'PDF splitter tool',
    fv1a2: '. Simply upload your PDF file, choose how you want to split it (by page ranges, file size, or bookmarks), and click split. The tool divides your PDF into separate documents that you can download individually or as a ZIP file. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to split PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF splitter that processes files locally in your browser, your documents never leave your device. All splitting happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I split a PDF into multiple files at once?',
    fv3a: 'Absolutely. Most online PDF splitter tools allow you to split a single PDF into multiple files simultaneously. You can split by page ranges (e.g., pages 1-10, 11-20, 21-30), every N pages, by file size, or by bookmarks. The tool generates all split files at once, which you can download individually or as a ZIP archive for convenience.',
    fv4q: 'What is the maximum file size for splitting PDFs online?',
    fv4a: 'File size limits vary by tool, but most online PDF splitters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to split very large PDFs, consider using desktop software designed for heavy-duty processing, or split the file in multiple passes.',
    fv5q: 'Do I need to create an account to split PDF files?',
    fv5a: 'No, many free PDF splitter tools work without requiring account creation or registration. You can upload, split, and download your divided PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving split history or accessing premium features, but basic PDF splitting is typically available without any registration.',
    fv6q: 'Can I split a PDF by page ranges?',
    fv6a: 'Yes, most PDF splitter tools allow you to split by specific page ranges. You can specify which pages to extract into separate files, such as pages 1-10, 11-20, 21-30, etc. Some tools also support splitting every N pages automatically (e.g., every 5 pages creates a new file every 5 pages). You can also extract individual pages or custom ranges based on your needs.',
    fv7q: 'Can I split a PDF by file size?',
    fv7a: 'Yes, advanced PDF splitter tools offer the ability to split PDFs by file size. You specify a maximum file size (e.g., 5 MB, 10 MB), and the tool automatically divides your PDF into multiple files, each under that size limit. This is particularly useful when you need to email files and have size restrictions, or when you want to optimize file sizes for sharing. The tool intelligently splits at page boundaries to maintain document integrity.',
    fv8q: 'Can I split a PDF by bookmarks?',
    fv8a: 'Yes, if your PDF has bookmarks (table of contents), many PDF splitter tools can use them to automatically split your document. The tool creates a separate file for each bookmark section, making it easy to divide structured documents like reports, books, or manuals. This method is particularly useful for documents that already have a clear organizational structure defined by bookmarks.',
    fv9q: 'Will splitting a PDF reduce file quality?',
    fv9a: "No, properly splitting a PDF should not reduce quality. When you split PDF files using a quality tool, it extracts pages without re-compressing or degrading the content. Each split PDF maintains the same quality as the original pages. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that split PDFs at the native PDF level rather than converting formats.",
    fv10q: 'Can I split password-protected PDFs?',
    fv10a1: "This depends on the tool. Most online PDF splitters cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv10link: 'PDF editing tool',
    fv10a2: ' or the software that created the protection, then split the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv11q: 'What happens to the original PDF after splitting?',
    fv11a: "The original PDF file on your device remains completely unchanged. Splitting creates new files without modifying the source document. This means you can split the same PDF multiple times using different methods or settings without any risk to your original file. Always keep backups of important original files until you're satisfied with the split results.",
    fv12q: 'Can I split PDFs on mobile devices?',
    fv12a: 'Yes, many online PDF splitter tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large splits might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',
    fv13q: 'How many files can I create from one PDF?',
    fv13a: "There's no hard limit on the number of files you can create, but practical limits exist based on your device's capabilities. Most online tools handle creating 10-20 split files comfortably. Very large splits (50+ files) may cause browser slowdowns or memory issues. If you need to create many files, consider splitting in multiple operations or using desktop software optimized for large batch processing.",

    s7h: 'Conclusion: Making PDF Splitting Simple',
    s7p1: "Splitting PDF files doesn't have to be complicated. With modern online PDF splitter tools, dividing large documents into smaller, more manageable pieces is straightforward, fast, and secure. Whether you're a business professional breaking down reports, a student extracting chapters, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s7p2: 'The key advantages of online PDF splitters—no installation, privacy-first processing, free access, multiple splitting methods, and cross-platform compatibility—make them the ideal solution for most splitting needs. While desktop software has its place for advanced PDF editing tasks, simple splitting is perfectly handled by browser-based tools.',
    s7p3: 'Remember these best practices:',
    s7l1: 'Choose the right splitting method for your needs (pages, size, or bookmarks)',
    s7l2: 'Keep individual files under 25 MB for best performance',
    s7l3: 'Use privacy-first tools that process files locally',
    s7l4: 'Review your split settings before processing',
    s7l5: "Keep backups of original files until you're satisfied with the splits",
    s7l6: 'Download split files as a ZIP archive when creating multiple files',
    s7p4a: 'Ready to split your PDFs? Try our ',
    s7p4link1: 'free PDF splitter tool',
    s7p4b: ' and experience how simple dividing documents can be. And if you need to make edits to your PDFs before or after splitting, check out our ',
    s7p4link2: 'PDF editing tool',
    s7p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s7p4link3: 'PDF compression tool',
    s7p4d: ' can help reduce file sizes before splitting. And if you need to combine PDFs later, our ',
    s7p4link4: 'PDF merger tool',
    s7p4e: ' makes it easy to merge documents back together.',
    s7p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle document splitting quickly and confidently, leaving more time for the work that actually matters.",

    relMergeTitle: 'How to Merge PDF Files Online',
    relMergeDesc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    relEditTitle: 'How to Edit a PDF Online',
    relEditDesc: 'Complete guide to editing PDF files online without installing software.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I split a PDF file online for free?',
    fq1a: 'You can split a PDF file online for free by using our PDF splitter tool. Simply upload your PDF file, choose how you want to split it (by page ranges, file size, or bookmarks), and click split. The tool divides your PDF into separate documents that you can download individually or as a ZIP file.',
    fq2q: 'Is it safe to split PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF splitter that processes files locally in your browser, your documents never leave your device. All splitting happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I split a PDF into multiple files at once?',
    fq3a: 'Yes, most online PDF splitter tools allow you to split a single PDF into multiple files simultaneously. You can split by page ranges, every N pages, by file size, or by bookmarks. The tool generates all split files at once, which you can download individually or as a ZIP archive.',
    fq4q: 'What is the maximum file size for splitting PDFs online?',
    fq4a: 'File size limits vary by tool, but most online PDF splitters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
    fq5q: 'Do I need to create an account to split PDF files?',
    fq5a: 'No, many free PDF splitter tools work without requiring account creation or registration. You can upload, split, and download your divided PDF files immediately without signing up.',
    fq6q: 'Can I split a PDF by page ranges?',
    fq6a: 'Yes, most PDF splitter tools allow you to split by specific page ranges. You can specify which pages to extract into separate files, such as pages 1-10, 11-20, etc. Some tools also support splitting every N pages automatically.',
    fq7q: 'Can I split a PDF by file size?',
    fq7a: 'Yes, advanced PDF splitter tools offer the ability to split PDFs by file size. You specify a maximum file size (e.g., 5 MB), and the tool automatically divides your PDF into multiple files, each under that size limit.',
    fq8q: 'Will splitting a PDF reduce file quality?',
    fq8a: 'No, properly splitting a PDF should not reduce quality. When you split PDF files using a quality tool, it extracts pages without re-compressing or degrading the content. Each split PDF maintains the same quality as the original pages.',
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
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4s1p1a}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
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
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li>{c.s4s3aL1}</li>
                    <li>{c.s4s3aL2}</li>
                    <li>{c.s4s3aL3}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3aP2}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3aP3s}</strong>{c.s4s3aP3t}
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
                  <li><strong className="text-white">{c.s4s4l4s}</strong>{c.s4s4l4t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4s4p2s}</strong>{c.s4s4p2t}
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
                  {c.s4s5p2}
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
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s7l1}</li>
                  <li>{c.s4s7l2}</li>
                  <li>{c.s4s7l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s7p2s}</strong>{c.s4s7p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s7p3}
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
                  <strong className="text-white">{c.s6s1p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s1l1}</li>
                  <li>{c.s6s1l2}</li>
                  <li>{c.s6s1l3}</li>
                  <li>{c.s6s1l4}</li>
                  <li>{c.s6s1l5}</li>
                  <li>{c.s6s1l6}</li>
                  <li>{c.s6s1l7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s1p2}</strong>
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s1v1s}</strong>{c.s6s1v1t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s2p1}</strong>
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
                  <strong className="text-white">{c.s6s2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s2m1}</li>
                  <li>{c.s6s2m2}</li>
                  <li>{c.s6s2m3}</li>
                  <li>{c.s6s2m4}</li>
                  <li>{c.s6s2m5}</li>
                  <li>{c.s6s2m6}</li>
                  <li>{c.s6s2m7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s2v1s}</strong>{c.s6s2v1t}
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s3v1s}</strong>{c.s6s3v1t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqVisibleH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1link}</Link>{c.fv1a2}
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
                    {c.fv10a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10link}</Link>{c.fv10a2}
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
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7p2}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7p3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s7l1}</li>
                <li>{c.s7l2}</li>
                <li>{c.s7l3}</li>
                <li>{c.s7l4}</li>
                <li>{c.s7l5}</li>
                <li>{c.s7l6}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7p4a}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link1}</Link>{c.s7p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link2}</Link>{c.s7p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link3}</Link>{c.s7p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link4}</Link>{c.s7p4e}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s7p5}
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
                  {c.relMergeTitle}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relMergeDesc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relEditTitle}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relEditDesc}
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
import { TRANSLATIONS } from './how-to-split-pdf-files-online.i18n'
Object.assign(C, TRANSLATIONS)
