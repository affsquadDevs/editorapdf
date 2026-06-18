import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-reorder-pdf-pages'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Reorder PDF Pages Online_ Complete Guide to Rearranging PDF Documents.png'
const datePublished = '2026-01-15'
const dateModified = '2026-01-15'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Reorder PDF Pages Online (Step-by-Step Guide)',
    metaDesc: 'Rearrange PDF pages online using drag-and-drop. Quickly change page order and download your updated document securely.',
    ogTitle: 'How to Reorder PDF Pages Online (Step-by-Step Guide)',
    ogDesc: 'Rearrange PDF pages online using drag-and-drop. Quickly change page order and download your updated document securely.',
    twTitle: 'How to Reorder PDF Pages Online (Step-by-Step Guide)',
    twDesc: 'Rearrange PDF pages online using drag-and-drop. Quickly change page order and download your updated document securely.',
    ogImageAlt: 'Banner showing PDF pages being rearranged with arrows and drag and drop interface',
    heroAlt: 'How to reorder PDF pages online - Free PDF page organizer guide',

    bcLeaf: 'How to Reorder PDF Pages Online',
    heroTitle: 'How to Reorder PDF Pages Online: Complete Guide to Rearranging PDF Documents',
    heroSubtitle: 'Learn how to rearrange and organize PDF pages using free online tools. Drag and drop pages to create the perfect document order.',

    artHeadline: 'How to Reorder PDF Pages Online - Complete Guide to Rearranging PDF Documents',
    artDesc: 'Complete guide on how to reorder PDF pages online. Learn to rearrange and organize PDF document pages using free online tools. Step-by-step instructions, tips, and best practices for organizing PDF pages.',

    intro1: "You've just scanned a 50-page document, and somehow pages 15 and 16 ended up at the end. Or maybe you're compiling a report and need to move the executive summary from page 20 to page 2. Perhaps you're organizing a presentation where the slides got mixed up during export. Whatever the situation, having pages in the wrong order is frustrating—and fixing it used to require expensive software or complicated workarounds.",
    intro2: 'The good news? Reordering PDF pages is now simpler than ever. Modern online PDF page reorder tools let you drag and drop pages into the perfect sequence, all without installing software or compromising your document\'s security. This comprehensive guide will walk you through everything you need to know about reordering PDF pages online, from understanding why pages get mixed up to mastering advanced reordering techniques.',

    s1h: 'The Problem: Why PDF Pages End Up in the Wrong Order',
    s1p1: "PDF pages don't just randomly rearrange themselves. There are several common scenarios where pages end up out of sequence, and understanding these helps you prevent future issues while fixing current ones.",
    s1p2: "Here's what typically causes page order problems:",
    s1l1a: 'Scanning mishaps:',
    s1l1b: ' Multi-page scanners sometimes capture pages out of sequence, especially with double-sided documents or manual feed scanners',
    s1l2a: 'Multiple file merging:',
    s1l2b: " When combining PDFs from different sources, pages can get mixed up if files aren't properly organized beforehand",
    s1l3a: 'Export errors:',
    s1l3b: ' Converting documents from Word, PowerPoint, or other formats to PDF can sometimes scramble page order',
    s1l4a: 'Print-to-PDF issues:',
    s1l4b: ' Printing multiple documents to PDF can result in pages appearing in unexpected sequences',
    s1l5a: 'Manual organization mistakes:',
    s1l5b: " When manually assembling documents, it's easy to accidentally insert pages in the wrong position",
    s1l6a: 'Software bugs:',
    s1l6b: ' Some PDF creation tools have bugs that rearrange pages during processing',
    s1l7a: 'Version control confusion:',
    s1l7b: ' Working with multiple versions of a document can lead to mixing pages from different iterations',
    s1p3: "The challenge isn't just identifying the problem—it's fixing it efficiently. Traditional solutions often involve:",
    s1m1: 'Printing specific pages and re-scanning (time-consuming and quality-degrading)',
    s1m2: 'Using expensive desktop software like Adobe Acrobat (costly and requires installation)',
    s1m3: 'Manually extracting and recombining pages (tedious and error-prone)',
    s1m4: 'Uploading to cloud services (privacy concerns with sensitive documents)',
    s1p4: 'These pain points are exactly why online PDF page reorder tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure—all without requiring you to understand the technical details of PDF structure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think page reordering is a minor inconvenience, but it's actually a critical issue that affects productivity, professionalism, and document usability. Consider these real-world scenarios where page order matters:",
    s2l1a: 'Business professionals',
    s2l1b: ' submitting proposals, reports, or contracts where page order directly impacts readability and professionalism',
    s2l2a: 'Students',
    s2l2b: ' organizing research papers, thesis documents, or assignment submissions where logical flow is essential',
    s2l3a: 'Legal teams',
    s2l3b: ' preparing case files, evidence documents, or briefs where page sequence affects argument structure',
    s2l4a: 'Real estate agents',
    s2l4b: ' compiling property documents, inspection reports, and contracts in a specific order for clients',
    s2l5a: 'Healthcare workers',
    s2l5b: ' organizing patient records, test results, and medical histories chronologically',
    s2l6a: 'Accountants',
    s2l6b: ' arranging financial statements, invoices, and receipts in logical sequences for audits',
    s2l7a: 'Content creators',
    s2l7b: ' organizing portfolios, presentations, or design documents where visual flow matters',
    s2l8a: 'Architects and engineers',
    s2l8b: ' arranging technical drawings, specifications, and plans in construction order',
    s2p2: 'The consequences of incorrect page order extend beyond simple inconvenience:',
    s2m1a: 'Professional credibility:',
    s2m1b: ' Documents with pages out of order look unprofessional and can damage your reputation',
    s2m2a: 'Time waste:',
    s2m2b: ' Recipients spend extra time trying to understand disorganized documents',
    s2m3a: 'Miscommunication:',
    s2m3b: ' Important information gets missed when pages are in the wrong sequence',
    s2m4a: 'Compliance issues:',
    s2m4b: ' Legal and regulatory documents often require specific page ordering',
    s2m5a: 'Workflow disruption:',
    s2m5b: ' Team members waste time reorganizing documents that should have been correct from the start',
    s2m6a: 'Client frustration:',
    s2m6b: ' Clients receiving poorly organized documents may question your attention to detail',
    s2p3: "That's why understanding how to reorder PDF pages properly isn't just about fixing mistakes—it's about maintaining professional standards, ensuring document usability, and saving time for everyone who interacts with your PDFs. The right tool and approach can turn a frustrating problem into a quick, simple task.",

    s3h: 'The Solution: Modern Online PDF Page Reorder Tools',
    s3p1: 'The solution to PDF page reordering headaches is simpler than you might expect. Modern web-based PDF reorder tools handle all the technical complexity behind the scenes, giving you an intuitive drag-and-drop interface to rearrange pages in minutes—or even seconds.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1a: 'No installation required:',
    s3l1b: ' Works on any device with a modern browser—Windows, Mac, Linux, or mobile',
    s3l2a: 'Privacy-first processing:',
    s3l2b: ' Files stay on your device, never uploaded to servers, keeping sensitive documents secure',
    s3l3a: 'Visual page management:',
    s3l3b: ' See thumbnails of all pages and drag them into the perfect order',
    s3l4a: 'Instant results:',
    s3l4b: ' Reorder pages in seconds, not minutes',
    s3l5a: 'Free to use:',
    s3l5b: ' No subscriptions, hidden fees, or account requirements',
    s3l6a: 'Cross-platform compatibility:',
    s3l6b: ' Works consistently across all operating systems and devices',
    s3l7a: 'Quality preservation:',
    s3l7b: ' Pages maintain original quality, formatting, and metadata',
    s3p3: "The best part? You don't need to understand how PDF page reordering works technically. The tool handles page extraction, reordering, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF page reorder tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't. Whether you're fixing a simple two-page swap or completely reorganizing a 200-page document, the process remains the same: upload, drag, drop, download.",

    s4h: 'Step-by-Step Guide: How to Reorder PDF Pages Using Our Tool',
    s4p1: "Ready to reorder your PDF pages? Follow these steps to rearrange pages quickly and easily. We'll walk through the entire process from upload to download, including tips for handling different scenarios.",

    s4st1h: 'Step 1: Access the PDF Page Reorder Tool',
    s4st1pa: 'Navigate to our ',
    s4st1plink: 'PDF page reorder page',
    s4st1pb: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start reordering immediately. The interface is designed to be intuitive, so even first-time users can figure it out quickly.",

    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25-50 MB (for optimal performance)',
    s4st2l3: 'Any PDF file, regardless of page count',
    s4st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4st2l4link: 'PDF editing tool',
    s4st2l4b: ')',
    s4st2l5: 'PDFs with different page sizes mixed together',
    s4st2p2: 'Once uploaded, the tool will process your PDF and display thumbnails of all pages. This visual preview is crucial—it lets you see exactly what each page contains, making it easier to identify which pages need to be moved and where they should go.',
    s4st2p3a: 'Pro tip:',
    s4st2p3b: ' If you have a very large PDF (100+ pages), the thumbnail generation might take a few seconds. Be patient—the tool is processing all pages to give you the best reordering experience.',

    s4st3h: 'Step 3: Review Your Pages',
    s4st3p1: 'Before reordering, take a moment to review the page thumbnails. This helps you:',
    s4st3l1: 'Identify which pages are out of order',
    s4st3l2: 'Plan your reordering strategy',
    s4st3l3: 'Spot any duplicate or unwanted pages',
    s4st3l4: 'Understand the document structure',
    s4st3p2: 'Most tools display pages in a grid or list format, showing small previews of each page. You can usually click on thumbnails to see larger previews if needed. This visual approach is much better than trying to work with page numbers alone.',
    s4st3p3a: 'Pro tip:',
    s4st3p3b: " If you're working with a long document, look for visual cues in the thumbnails—headers, page numbers, or distinctive content—that help you identify pages quickly. This makes the reordering process faster and more accurate.",

    s4st4h: 'Step 4: Reorder Pages Using Drag and Drop',
    s4st4p1: "This is where the magic happens. Most modern PDF reorder tools use drag-and-drop functionality, making page rearrangement as intuitive as organizing files on your desktop. Here's how it works:",
    s4st4o1a: 'Click and hold',
    s4st4o1b: ' on the page thumbnail you want to move',
    s4st4o2a: 'Drag',
    s4st4o2b: ' it to the desired position',
    s4st4o3a: 'Drop',
    s4st4o3b: ' it in the new location',
    s4st4o4a: 'Watch',
    s4st4o4b: ' other pages automatically adjust their positions',
    s4st4p2: 'Some tools also offer alternative methods:',
    s4st4l1a: 'Arrow buttons:',
    s4st4l1b: ' Move pages up or down one position at a time',
    s4st4l2a: 'Position selector:',
    s4st4l2b: ' Choose a specific position number from a dropdown',
    s4st4l3a: 'Keyboard shortcuts:',
    s4st4l3b: ' Use arrow keys to move selected pages',
    s4st4l4a: 'Bulk selection:',
    s4st4l4b: ' Select multiple pages and move them together',
    s4st4p3a: 'Common reordering scenarios:',
    s4st4m1a: 'Moving a single page:',
    s4st4m1b: ' Simply drag it to the new position',
    s4st4m2a: 'Swapping two pages:',
    s4st4m2b: " Drag one to the other's position, then drag the second to the first's original position",
    s4st4m3a: 'Moving pages to the beginning:',
    s4st4m3b: ' Drag them to the top of the list',
    s4st4m4a: 'Moving pages to the end:',
    s4st4m4b: ' Drag them to the bottom of the list',
    s4st4m5a: 'Reversing page order:',
    s4st4m5b: ' Some tools offer a "reverse order" button for this',
    s4st4p4a: 'Pro tip:',
    s4st4p4b: " If you're making multiple changes, work systematically. For example, if pages 15, 16, and 17 need to move to positions 2, 3, and 4, move them one at a time starting from the highest number. This prevents pages from shifting unexpectedly during the process.",

    s4st5h: 'Step 5: Verify Your Page Order',
    s4st5p1: 'Before finalizing, take a moment to verify your page order is correct. Check:',
    s4st5l1: 'All pages are in the correct sequence',
    s4st5l2: 'No pages are missing',
    s4st5l3: 'No pages are duplicated',
    s4st5l4: 'The logical flow makes sense (if applicable)',
    s4st5l5: 'Page numbers align with content (if your PDF has page numbers)',
    s4st5p2: 'Many tools show page numbers or allow you to scroll through the reordered list to verify everything looks right. Some even provide a preview mode where you can flip through pages in the new order before generating the final PDF.',
    s4st5p3a: 'Pro tip:',
    s4st5p3b: ' If you\'re working with a document that has page numbers printed on it, check that the content matches the page numbers. For example, if page 5 shows "Chapter 3" but it\'s now in position 2, you might want to note this for recipients or consider whether the page numbers need updating separately.',

    s4st6h: 'Step 6: Click Reorder and Wait for Processing',
    s4st6p1: 'Once everything looks good, click the "Reorder Pages," "Apply Changes," or "Generate PDF" button. The tool will:',
    s4st6o1: 'Process your PDF file according to the new page order',
    s4st6o2: 'Extract pages in the sequence you specified',
    s4st6o3: 'Reconstruct the PDF with pages in the correct order',
    s4st6o4: 'Preserve all formatting, images, and metadata',
    s4st6o5: 'Generate your reordered PDF file',
    s4st6p2: 'Processing time depends on:',
    s4st6l1: 'Total page count of your PDF',
    s4st6l2: 'File size',
    s4st6l3: 'Complexity of page content (images, fonts, etc.)',
    s4st6l4: "Your device's processing power",
    s4st6p3: "For typical reordering (20-50 pages), this usually takes just a few seconds. Larger documents (100+ pages) might take 30-60 seconds. You'll see a progress indicator during processing, so you know the tool is working.",

    s4st7h: 'Step 7: Download Your Reordered PDF',
    s4st7p1: 'When processing completes, your reordered PDF is ready. Click the download button to save it to your device. The file will typically have a name like "reordered.pdf" or maintain your original filename with a suffix.',
    s4st7p2a: 'Important:',
    s4st7p2b: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your reordered PDF before closing the page.',
    s4st7p3a: 'Quality check:',
    s4st7p3b: ' After downloading, open your reordered PDF and quickly scroll through it to verify:',
    s4st7l1: 'All pages are present',
    s4st7l2: 'Pages are in the correct order',
    s4st7l3: 'Content quality is preserved (no degradation)',
    s4st7l4: 'Formatting looks correct',
    s4st7l5: 'Images and graphics display properly',
    s4st7p4: "That's it! You've successfully reordered your PDF pages. The entire process typically takes less than two minutes from start to finish, even for longer documents. If you need to make additional changes, you can simply upload the reordered PDF and adjust it further.",

    s5h: 'Benefits of Using Online PDF Page Reorder Tools',
    s5p1: 'Why choose an online PDF page reorder tool over desktop software or manual methods? Here are the key advantages that make these tools the preferred choice for most users:',

    s5b1h: '1. Zero Installation Required',
    s5b1p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start reordering. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to reorder PDFs on the go. No IT department approval needed, no software conflicts, no version compatibility issues.",

    s5b2h: '2. Visual, Intuitive Interface',
    s5b2p1: 'Unlike command-line tools or complex desktop software, online PDF reorder tools provide visual thumbnails of all pages. This makes it easy to:',
    s5b2l1: 'See what each page contains at a glance',
    s5b2l2: 'Identify pages that need to be moved',
    s5b2l3: 'Verify the final order before processing',
    s5b2l4: "Work with documents even if you don't know exact page numbers",
    s5b2p2: 'The drag-and-drop interface feels natural and requires no training. If you can organize files on your computer, you can reorder PDF pages.',

    s5b3h: '3. Privacy and Security',
    s5b3p1: 'When you use a privacy-first PDF reorder tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5b3l1: 'Confidential business documents',
    s5b3l2: 'Personal financial information',
    s5b3l3: 'Legal documents',
    s5b3l4: 'Medical records',
    s5b3l5: 'Proprietary research or data',
    s5b3l6: 'Any sensitive information',
    s5b3p2: "Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. Your documents are processed in your browser's memory and never transmitted over the internet.",

    s5b4h: '4. Cost-Effective Solution',
    s5b4p: 'Most online PDF reorder tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF page reordering, free online tools provide excellent value without any financial commitment. No trials, no credit cards, no hidden costs.',

    s5b5h: '5. Cross-Platform Compatibility',
    s5b5p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF reorder tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely. The same tool works identically on your work computer, home laptop, tablet, or phone.",

    s5b6h: '6. Always Up-to-Date',
    s5b6p: "Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility. The tool you use today is the best version available, and tomorrow's improvements are automatically included.",

    s5b7h: '7. Speed and Efficiency',
    s5b7p1: 'Modern browser-based PDF processing is surprisingly fast. You can reorder pages in seconds, compared to:',
    s5b7l1: 'Manual methods like printing and re-scanning (extremely time-consuming)',
    s5b7l2: 'Desktop software that requires launching and navigating complex interfaces',
    s5b7l3: 'Cloud services that require upload and download time',
    s5b7l4: 'Command-line tools that require technical knowledge',
    s5b7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done. What used to take 15-30 minutes can now be done in under 2 minutes.',

    s5b8h: '8. Quality Preservation',
    s5b8p: 'Quality online PDF reorder tools preserve all aspects of your original document: image quality, text formatting, fonts, colors, metadata, and more. Unlike methods that involve printing or converting to images, proper PDF reordering maintains the native PDF structure, ensuring your reordered document looks identical to the original—just with pages in a different order.',

    s5b9h: '9. No Account Required',
    s5b9p: 'Most online PDF reorder tools work without requiring account creation or registration. You can upload, reorder, and download your organized PDF files immediately without signing up. This makes the process faster, more private, and eliminates the risk of your email being added to marketing lists.',

    s6h: 'Comparison: Online PDF Reorder Tools vs. Other Methods',
    s6p1: "How do online PDF page reorder tools stack up against alternatives? Let's break down the comparison to help you understand when each method makes sense:",

    s6c1h: 'Online PDF Reorder Tools vs. Desktop Software',
    s6c1p1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6c1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6c1l2: '✅ Works offline after installation',
    s6c1l3: '✅ Better for very large files (500+ pages)',
    s6c1l4: '✅ Can handle complex PDF structures',
    s6c1l5: '❌ Requires installation and updates',
    s6c1l6: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1l7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1l8: '❌ Takes up disk space',
    s6c1l9: '❌ Steeper learning curve',
    s6c1p2: 'Online PDF Reorder Tools:',
    s6c1m1: '✅ Free to use',
    s6c1m2: '✅ No installation required',
    s6c1m3: '✅ Works on any platform',
    s6c1m4: '✅ Always up-to-date',
    s6c1m5: '✅ Privacy-first (client-side processing)',
    s6c1m6: '✅ Visual, intuitive interface',
    s6c1m7: '✅ No account required',
    s6c1m8: '❌ Requires internet connection (for initial page load)',
    s6c1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1m10: '❌ Fewer advanced features (but sufficient for reordering)',
    s6c1p3a: 'Verdict:',
    s6c1p3b: ' For PDF page reordering specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just reordering, or if you regularly work with very large files and need offline access.',

    s6c2h: 'Online PDF Reorder Tools vs. Cloud-Based Services',
    s6c2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c2l1: '✅ Integrated with cloud storage',
    s6c2l2: '✅ Can access files from anywhere',
    s6c2l3: '✅ Often free with cloud storage accounts',
    s6c2l4: '✅ Can work with files already in the cloud',
    s6c2l5: '❌ Files uploaded to servers (privacy concern)',
    s6c2l6: '❌ Requires account creation',
    s6c2l7: '❌ Storage limits apply',
    s6c2l8: '❌ Files may be retained on servers',
    s6c2l9: '❌ Slower processing (upload/download time)',
    s6c2l10: '❌ Limited reordering options',
    s6c2p2: 'Client-Side Online Reorder Tools:',
    s6c2m1: '✅ No file uploads (privacy-first)',
    s6c2m2: '✅ No account required',
    s6c2m3: '✅ Faster processing (no upload/download)',
    s6c2m4: '✅ No storage limits',
    s6c2m5: '✅ Files never leave your device',
    s6c2m6: '✅ More reordering options and flexibility',
    s6c2m7: '✅ Visual drag-and-drop interface',
    s6c2m8: "❌ Can't access files from cloud storage directly",
    s6c2p3a: 'Verdict:',
    s6c2p3b: ' For privacy-conscious users, client-side online reorder tools are superior. Cloud services are better if you need to reorder files already stored in cloud storage and don\'t mind the privacy trade-off, or if you need to access the tool from multiple devices without transferring files.',

    s6c3h: 'Online PDF Reorder Tools vs. Manual Methods',
    s6c3p1: 'Some people try to reorder PDF pages manually using methods like:',
    s6c3l1: 'Printing specific pages and re-scanning (extremely slow, quality loss, time-consuming)',
    s6c3l2: 'Taking screenshots of pages and combining (terrible quality, not searchable, time-consuming)',
    s6c3l3: 'Using freeware with ads and malware risks',
    s6c3l4: "Copy-pasting content (doesn't work with PDFs)",
    s6c3l5: 'Manually extracting pages using complex software',
    s6c3p2a: 'Verdict:',
    s6c3p2b: ' Online PDF reorder tools are faster, produce better quality results, preserve searchability, maintain formatting, and are more reliable than any manual method. There\'s no reason to use workarounds when proper tools are available for free. The time saved alone makes online tools the clear winner.',

    s7h: 'Frequently Asked Questions About Reordering PDF Pages',

    // Visible FAQ (13)
    fv1q: 'How do I reorder pages in a PDF file online?',
    fv1aa: 'You can reorder PDF pages online by using our ',
    fv1alink: 'PDF page reorder tool',
    fv1ab: ". Simply upload your PDF file, and you'll see thumbnails of all pages. Drag and drop pages to rearrange them in your preferred order, then click the reorder button to generate your new PDF with pages in the correct sequence. No account creation, payment, or software installation required.",
    fv2q: 'Is it safe to reorder PDF pages online?',
    fv2a: 'Yes, when using a privacy-first PDF reorder tool that processes files locally in your browser, your documents never leave your device. All page reordering happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I reorder multiple pages at once?',
    fv3a: 'Yes, most online PDF reorder tools allow you to rearrange multiple pages simultaneously. You can drag and drop individual pages one at a time, or use advanced features to select and move multiple pages together. Some tools also offer bulk operations like reversing the entire page order or moving a range of pages to a specific position. The tool maintains the order you specify when generating the final PDF.',
    fv4q: 'What is the maximum file size for reordering PDF pages online?',
    fv4aa: 'File size limits vary by tool, but most online PDF reorder tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to reorder very large PDFs, consider splitting them first using our ',
    fv4alink: 'PDF splitter tool',
    fv4ab: ', or using desktop software designed for heavy-duty processing.',
    fv5q: 'Do I need to create an account to reorder PDF pages?',
    fv5a: 'No, many free PDF reorder tools work without requiring account creation or registration. You can upload, reorder, and download your organized PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving reorder history or accessing premium features, but basic PDF page reordering is typically available without any registration.',
    fv6q: 'Will reordering PDF pages reduce file quality?',
    fv6a: "No, properly reordering PDF pages should not reduce quality. When you reorder pages using a quality tool, it rearranges pages without re-compressing or degrading the content. The reordered PDF maintains the same quality as your original document—images stay sharp, text remains crisp, and formatting is preserved. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that reorder PDFs at the native PDF level rather than converting formats.",
    fv7q: 'Can I preview pages before reordering?',
    fv7a: "Yes, most PDF reorder tools display thumbnails or previews of all pages, making it easy to see which pages you're moving and verify the final order before generating the reordered PDF. This visual interface helps ensure you arrange pages correctly. Some tools even allow you to click on thumbnails to see larger previews or scroll through pages in the new order before finalizing.",
    fv8q: 'Can I undo page reordering if I make a mistake?',
    fv8a: 'Since reordering creates a new file, you can\'t undo in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply reorder again with the correct arrangement. Some tools keep your page order available for a few minutes after processing, allowing quick corrections if needed. It\'s always a good idea to review your page order before clicking the final "reorder" button.',
    fv9q: 'Can I reorder pages in password-protected PDFs?',
    fv9aa: "This depends on the tool. Most online PDF reorder tools cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv9alink: 'PDF editing tool',
    fv9ab: ' or the software that created the protection, then reorder the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv10q: 'What happens if my PDF has different page sizes?',
    fv10aa: "When reordering PDFs with different page sizes (e.g., mixing letter-size and A4 pages), the reordered document will preserve each page's original size. This means your final PDF will contain pages of varying dimensions, which is usually fine for most purposes. Some tools offer options to standardize page sizes, but this may require reformatting content. For professional documents, it's often better to ensure source PDFs have consistent page sizes before reordering, or use our ",
    fv10alink: 'PDF editing tool',
    fv10ab: ' to standardize sizes first.',
    fv11q: 'Is there a limit to how many pages I can reorder?',
    fv11aa: "There's no hard limit on page count, but practical limits exist based on your device's capabilities. Most online tools handle 100-200 pages comfortably. Very large reorders (500+ pages) may cause browser slowdowns or memory issues. If you need to reorder extremely large documents, consider splitting the document first using our ",
    fv11alink1: 'PDF splitter tool',
    fv11ab: ', reordering sections separately, then merging them back together with our ',
    fv11alink2: 'PDF merger tool',
    fv11ac: '.',
    fv12q: 'Can I reorder PDF pages on mobile devices?',
    fv12a: 'Yes, many online PDF reorder tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large reorders might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, with larger thumbnails and touch-friendly drag-and-drop controls.',
    fv13q: 'Will reordering affect bookmarks or links in my PDF?',
    fv13a: 'This depends on the tool and how your PDF is structured. Simple page reordering typically preserves bookmarks and internal links, but they may point to the wrong pages after reordering. More advanced tools can update bookmark and link references to match the new page order. If your PDF has extensive bookmarks or cross-references, test the reordered PDF carefully to ensure everything still works correctly. You may need to use desktop software with advanced bookmark management for complex documents.',

    s8h: 'Conclusion: Making PDF Page Reordering Simple',
    s8p1: "Reordering PDF pages doesn't have to be complicated. With modern online PDF page reorder tools, rearranging document pages is straightforward, fast, and secure. Whether you're fixing a simple two-page swap or completely reorganizing a 200-page document, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF reorder tools—no installation, privacy-first processing, free access, visual drag-and-drop interface, and cross-platform compatibility—make them the ideal solution for most reordering needs. While desktop software has its place for advanced PDF editing tasks, simple page reordering is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Review page thumbnails before reordering to plan your approach',
    s8l2: 'Work systematically when making multiple changes',
    s8l3: 'Verify your page order before finalizing',
    s8l4: 'Keep files under 25 MB for best performance',
    s8l5: 'Use privacy-first tools that process files locally',
    s8l6: "Keep backups of original files until you're satisfied with the reordered version",
    s8l7: 'Check the final PDF after downloading to ensure everything looks correct',
    s8p4a: 'Ready to reorder your PDF pages? Try our ',
    s8p4link1: 'free PDF page reorder tool',
    s8p4b: ' and experience how simple rearranging documents can be. And if you need to make other edits to your PDFs, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle page reordering quickly and confidently, leaving more time for the work that actually matters. Whether you're organizing a presentation, fixing a scanning error, or preparing documents for submission, the ability to reorder pages efficiently is an essential skill in today's digital workflow.",

    // Related Articles
    relMerge1h: 'How to Merge PDF Files Online',
    relMerge1p: 'Learn how to combine multiple PDF files into one document using free online tools.',
    relSplit2h: 'How to Split PDF Files Online',
    relSplit2p: 'Complete guide to dividing large PDF documents into smaller files using free online tools.',
    relEdit3h: 'How to Edit a PDF Online',
    relEdit3p: 'Complete guide to editing PDF files online without installing software.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I reorder pages in a PDF file online?',
    fq1a: "You can reorder PDF pages online by using our PDF page reorder tool. Simply upload your PDF file, and you'll see thumbnails of all pages. Drag and drop pages to rearrange them in your preferred order, then click the reorder button to generate your new PDF with pages in the correct sequence.",
    fq2q: 'Is it safe to reorder PDF pages online?',
    fq2a: 'Yes, when using a privacy-first PDF reorder tool that processes files locally in your browser, your documents never leave your device. All page reordering happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I reorder multiple pages at once?',
    fq3a: 'Yes, most online PDF reorder tools allow you to rearrange multiple pages simultaneously. You can drag and drop individual pages or use advanced features to move multiple pages at once. The tool maintains the order you specify when generating the final PDF.',
    fq4q: 'What is the maximum file size for reordering PDF pages online?',
    fq4a: 'File size limits vary by tool, but most online PDF reorder tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
    fq5q: 'Do I need to create an account to reorder PDF pages?',
    fq5a: 'No, many free PDF reorder tools work without requiring account creation or registration. You can upload, reorder, and download your organized PDF files immediately without signing up.',
    fq6q: 'Will reordering PDF pages reduce file quality?',
    fq6a: 'No, properly reordering PDF pages should not reduce quality. When you reorder pages using a quality tool, it rearranges pages without re-compressing or degrading the content. The reordered PDF maintains the same quality as your original document.',
    fq7q: 'Can I preview pages before reordering?',
    fq7a: "Yes, most PDF reorder tools display thumbnails or previews of all pages, making it easy to see which pages you're moving and verify the final order before generating the reordered PDF. This visual interface helps ensure you arrange pages correctly.",
    fq8q: 'Can I undo page reordering if I make a mistake?',
    fq8a: "Since reordering creates a new file, you can't undo in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply reorder again with the correct arrangement. Some tools keep your page order available for a few minutes after processing, allowing quick corrections if needed.",
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
      images: [{ url: `${siteUrl}/images/blog/how-to-reorder-pdf-pages-hero.png`, width: 1200, height: 630, alt: c.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/how-to-reorder-pdf-pages-hero.png`],
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
                <li><strong className="text-white">{c.s1l1a}</strong>{c.s1l1b}</li>
                <li><strong className="text-white">{c.s1l2a}</strong>{c.s1l2b}</li>
                <li><strong className="text-white">{c.s1l3a}</strong>{c.s1l3b}</li>
                <li><strong className="text-white">{c.s1l4a}</strong>{c.s1l4b}</li>
                <li><strong className="text-white">{c.s1l5a}</strong>{c.s1l5b}</li>
                <li><strong className="text-white">{c.s1l6a}</strong>{c.s1l6b}</li>
                <li><strong className="text-white">{c.s1l7a}</strong>{c.s1l7b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1m1}</li>
                <li>{c.s1m2}</li>
                <li>{c.s1m3}</li>
                <li>{c.s1m4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s1p4}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s2l1a}</strong>{c.s2l1b}</li>
                <li><strong className="text-white">{c.s2l2a}</strong>{c.s2l2b}</li>
                <li><strong className="text-white">{c.s2l3a}</strong>{c.s2l3b}</li>
                <li><strong className="text-white">{c.s2l4a}</strong>{c.s2l4b}</li>
                <li><strong className="text-white">{c.s2l5a}</strong>{c.s2l5b}</li>
                <li><strong className="text-white">{c.s2l6a}</strong>{c.s2l6b}</li>
                <li><strong className="text-white">{c.s2l7a}</strong>{c.s2l7b}</li>
                <li><strong className="text-white">{c.s2l8a}</strong>{c.s2l8b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s2m1a}</strong>{c.s2m1b}</li>
                <li><strong className="text-white">{c.s2m2a}</strong>{c.s2m2b}</li>
                <li><strong className="text-white">{c.s2m3a}</strong>{c.s2m3b}</li>
                <li><strong className="text-white">{c.s2m4a}</strong>{c.s2m4b}</li>
                <li><strong className="text-white">{c.s2m5a}</strong>{c.s2m5b}</li>
                <li><strong className="text-white">{c.s2m6a}</strong>{c.s2m6b}</li>
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
                <li><strong className="text-white">{c.s3l1a}</strong>{c.s3l1b}</li>
                <li><strong className="text-white">{c.s3l2a}</strong>{c.s3l2b}</li>
                <li><strong className="text-white">{c.s3l3a}</strong>{c.s3l3b}</li>
                <li><strong className="text-white">{c.s3l4a}</strong>{c.s3l4b}</li>
                <li><strong className="text-white">{c.s3l5a}</strong>{c.s3l5b}</li>
                <li><strong className="text-white">{c.s3l6a}</strong>{c.s3l6b}</li>
                <li><strong className="text-white">{c.s3l7a}</strong>{c.s3l7b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/reorder')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1pa}<Link href={L('/tools/reorder')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1plink}</Link>{c.s4st1pb}
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
                  <li>{c.s4st2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st2p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st2p3a}</strong>{c.s4st2p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st3l1}</li>
                  <li>{c.s4st3l2}</li>
                  <li>{c.s4st3l3}</li>
                  <li>{c.s4st3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st3p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st3p3a}</strong>{c.s4st3p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st4o1a}</strong>{c.s4st4o1b}</li>
                  <li><strong className="text-white">{c.s4st4o2a}</strong>{c.s4st4o2b}</li>
                  <li><strong className="text-white">{c.s4st4o3a}</strong>{c.s4st4o3b}</li>
                  <li><strong className="text-white">{c.s4st4o4a}</strong>{c.s4st4o4b}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st4l1a}</strong>{c.s4st4l1b}</li>
                  <li><strong className="text-white">{c.s4st4l2a}</strong>{c.s4st4l2b}</li>
                  <li><strong className="text-white">{c.s4st4l3a}</strong>{c.s4st4l3b}</li>
                  <li><strong className="text-white">{c.s4st4l4a}</strong>{c.s4st4l4b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st4p3a}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st4m1a}</strong>{c.s4st4m1b}</li>
                  <li><strong className="text-white">{c.s4st4m2a}</strong>{c.s4st4m2b}</li>
                  <li><strong className="text-white">{c.s4st4m3a}</strong>{c.s4st4m3b}</li>
                  <li><strong className="text-white">{c.s4st4m4a}</strong>{c.s4st4m4b}</li>
                  <li><strong className="text-white">{c.s4st4m5a}</strong>{c.s4st4m5b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st4p4a}</strong>{c.s4st4p4b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st5l1}</li>
                  <li>{c.s4st5l2}</li>
                  <li>{c.s4st5l3}</li>
                  <li>{c.s4st5l4}</li>
                  <li>{c.s4st5l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st5p3a}</strong>{c.s4st5p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6o1}</li>
                  <li>{c.s4st6o2}</li>
                  <li>{c.s4st6o3}</li>
                  <li>{c.s4st6o4}</li>
                  <li>{c.s4st6o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6l1}</li>
                  <li>{c.s4st6l2}</li>
                  <li>{c.s4st6l3}</li>
                  <li>{c.s4st6l4}</li>
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st7p2a}</strong>{c.s4st7p2b}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st7p3a}</strong>{c.s4st7p3b}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st7l1}</li>
                  <li>{c.s4st7l2}</li>
                  <li>{c.s4st7l3}</li>
                  <li>{c.s4st7l4}</li>
                  <li>{c.s4st7l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st7p4}
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
                  {c.s5b1p}
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5b3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5b3l1}</li>
                  <li>{c.s5b3l2}</li>
                  <li>{c.s5b3l3}</li>
                  <li>{c.s5b3l4}</li>
                  <li>{c.s5b3l5}</li>
                  <li>{c.s5b3l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b4p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b5p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b6p}
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
                  <li>{c.s5b7l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b8p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b9h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b9p}
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
                  <li>{c.s6c1l1}</li>
                  <li>{c.s6c1l2}</li>
                  <li>{c.s6c1l3}</li>
                  <li>{c.s6c1l4}</li>
                  <li>{c.s6c1l5}</li>
                  <li>{c.s6c1l6}</li>
                  <li>{c.s6c1l7}</li>
                  <li>{c.s6c1l8}</li>
                  <li>{c.s6c1l9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1m1}</li>
                  <li>{c.s6c1m2}</li>
                  <li>{c.s6c1m3}</li>
                  <li>{c.s6c1m4}</li>
                  <li>{c.s6c1m5}</li>
                  <li>{c.s6c1m6}</li>
                  <li>{c.s6c1m7}</li>
                  <li>{c.s6c1m8}</li>
                  <li>{c.s6c1m9}</li>
                  <li>{c.s6c1m10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1p3a}</strong>{c.s6c1p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2l1}</li>
                  <li>{c.s6c2l2}</li>
                  <li>{c.s6c2l3}</li>
                  <li>{c.s6c2l4}</li>
                  <li>{c.s6c2l5}</li>
                  <li>{c.s6c2l6}</li>
                  <li>{c.s6c2l7}</li>
                  <li>{c.s6c2l8}</li>
                  <li>{c.s6c2l9}</li>
                  <li>{c.s6c2l10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2m1}</li>
                  <li>{c.s6c2m2}</li>
                  <li>{c.s6c2m3}</li>
                  <li>{c.s6c2m4}</li>
                  <li>{c.s6c2m5}</li>
                  <li>{c.s6c2m6}</li>
                  <li>{c.s6c2m7}</li>
                  <li>{c.s6c2m8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c2p3a}</strong>{c.s6c2p3b}
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
                  <strong className="text-white">{c.s6c3p2a}</strong>{c.s6c3p2b}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1aa}<Link href={L('/tools/reorder')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1alink}</Link>{c.fv1ab}
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
                    {c.fv4aa}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4alink}</Link>{c.fv4ab}
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
                    {c.fv9aa}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9alink}</Link>{c.fv9ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10aa}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10alink}</Link>{c.fv10ab}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv11q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv11aa}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv11alink1}</Link>{c.fv11ab}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.fv11alink2}</Link>{c.fv11ac}
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
                {c.s8p4a}<Link href={L('/tools/reorder')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                  {c.relMerge1h}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relMerge1p}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relSplit2h}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relSplit2p}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relEdit3h}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relEdit3p}
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
import { TRANSLATIONS } from './how-to-reorder-pdf-pages.i18n'
Object.assign(C, TRANSLATIONS)
