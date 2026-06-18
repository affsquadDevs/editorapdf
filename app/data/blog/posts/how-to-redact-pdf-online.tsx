import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-redact-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Redact PDF Online_ Complete Guide to Removing Sensitive Information.png'
const ogImage = '/images/blog/how-to-redact-pdf-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Redact PDF Online (Step-by-Step Secure Guide)',
    metaDesc: 'Securely remove confidential text from your PDF file online. Black out sensitive information and download a safely redacted document instantly.',
    ogTitle: 'How to Redact PDF Online (Step-by-Step Secure Guide)',
    ogDesc: 'Securely remove confidential text from your PDF file online. Black out sensitive information and download a safely redacted document instantly.',
    twTitle: 'How to Redact PDF Online (Step-by-Step Secure Guide)',
    twDesc: 'Securely remove confidential text from your PDF file online. Black out sensitive information and download a safely redacted document instantly.',
    ogAlt: 'Banner showing a PDF document with blacked out text and a redaction marker tool',
    heroAlt: 'How to redact PDF files online - Free PDF redaction tool guide',

    bcLeaf: 'How to Redact PDF Online',
    heroTitle: 'How to Redact PDF Online: Complete Guide to Removing Sensitive Information',
    heroSubtitle: 'Learn how to permanently remove sensitive information from PDF files using free online tools. Secure, private, and easy-to-use PDF redaction.',

    artHeadline: 'How to Redact PDF Online - Complete Guide to Removing Sensitive Information from PDF Documents',
    artDesc: 'Complete guide on how to redact PDF files online. Learn to permanently remove sensitive information, text, images, and data from PDF documents using free online tools. Step-by-step instructions, tips, and best practices for secure PDF redaction.',

    intro1: "You've got a PDF document with sensitive information that needs to be shared—maybe it's a contract with personal details, a legal document with confidential data, or a report containing proprietary information. Simply deleting or covering the text isn't enough. You need proper redaction: a permanent, secure method of removing information that can't be recovered, extracted, or viewed by anyone.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF redaction tools make permanently removing sensitive information as straightforward as selecting text and clicking a button. This comprehensive guide will walk you through everything you need to know about redacting PDFs online, from understanding what redaction actually means to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Redacting PDFs Is More Complex Than It Seems',
    s1p1: "Many people think redacting a PDF is as simple as drawing a black box over text or deleting words. Unfortunately, that's not how it works. PDF files are complex document structures that can contain multiple layers of information, metadata, hidden text, and embedded data. Simply covering text with a black rectangle doesn't remove the underlying information—it just hides it from view.",
    s1p2: "Here's what makes PDF redaction challenging:",
    s1l1s: 'Hidden data layers:',
    s1l1t: " PDFs can contain text layers, image layers, annotations, and metadata that aren't visible but can be extracted",
    s1l2s: 'Metadata preservation:',
    s1l2t: ' Document properties, author information, creation dates, and modification history can reveal sensitive details',
    s1l3s: 'Text extraction risks:',
    s1l3t: " Simply covering text doesn't prevent it from being copied, searched, or extracted using PDF tools",
    s1l4s: 'Incomplete deletion:',
    s1l4t: ' Deleting visible text may leave behind hidden text layers, form data, or embedded objects',
    s1l5s: 'Security concerns:',
    s1l5t: ' Uploading sensitive documents to unknown servers raises serious privacy questions',
    s1l6s: 'Legal requirements:',
    s1l6t: ' Many industries require proper redaction methods that permanently remove data, not just hide it',
    s1l7s: 'Software complexity:',
    s1l7t: ' Desktop PDF redaction tools often require installation, updates, and sometimes payment',
    s1p3: "These challenges are exactly why proper PDF redaction tools exist. They don't just cover information—they permanently remove it from the document structure, ensuring that sensitive data cannot be recovered through any means. This is crucial for legal compliance, privacy protection, and security.",
    s1p4: "The consequences of improper redaction can be severe. In legal cases, improperly redacted documents have led to data breaches, privacy violations, and compliance failures. That's why understanding how to redact PDFs correctly isn't just about convenience—it's about protecting sensitive information and meeting legal and regulatory requirements.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think redacting PDFs is only necessary for lawyers or government workers, but it's actually something millions of people need to do regularly across countless industries and situations. Consider these everyday scenarios:",
    s2l1s: 'Legal professionals',
    s2l1t: ' redacting client information, case details, or confidential evidence before sharing documents',
    s2l2s: 'Healthcare workers',
    s2l2t: ' removing patient identifiers, medical record numbers, or protected health information (PHI) from documents',
    s2l3s: 'HR departments',
    s2l3t: ' redacting social security numbers, salary information, or personal details from employee records',
    s2l4s: 'Financial institutions',
    s2l4t: ' removing account numbers, routing information, or transaction details from statements',
    s2l5s: 'Real estate agents',
    s2l5t: ' redacting personal contact information, financial details, or property values from contracts',
    s2l6s: 'Government agencies',
    s2l6t: ' removing classified information, personal identifiers, or sensitive data from public records',
    s2l7s: 'Business professionals',
    s2l7t: ' redacting proprietary information, trade secrets, or confidential business data from reports',
    s2l8s: 'Journalists and researchers',
    s2l8t: ' protecting sources by redacting names, locations, or identifying information',
    s2l9s: 'Educational institutions',
    s2l9t: ' removing student identifiers or personal information from academic records',
    s2l10s: 'Contractors and freelancers',
    s2l10t: ' redacting client information, project details, or financial data from proposals',
    s2p2: "The time wasted on improper redaction methods adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Data breaches and privacy violations',
    s2m2: 'Legal compliance failures and regulatory penalties',
    s2m3: 'Loss of client trust and professional reputation',
    s2m4: 'Exposure of sensitive personal or business information',
    s2m5: 'Recoverable redacted information through PDF analysis tools',
    s2m6: 'Frustration and decreased productivity',
    s2p3: "That's why understanding how to redact PDFs properly isn't just about convenience—it's about protecting sensitive information, meeting legal requirements, and working securely in a world where data privacy is paramount. Whether you're handling personal information, business secrets, or confidential documents, proper redaction is essential.",

    s3h: 'The Solution: Modern Online PDF Redaction Tools',
    s3p1: 'The solution to PDF redaction challenges is simpler than you might expect. Modern web-based PDF redaction tools handle all the technical complexity behind the scenes, giving you a clean interface to permanently remove sensitive information in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'True redaction:',
    s3l3t: ' Permanently removes underlying data, not just covers it',
    s3l4s: 'Instant results:',
    s3l4t: ' Redact PDFs in seconds, not minutes',
    s3l5s: 'Free to use:',
    s3l5t: ' No subscriptions or hidden fees',
    s3l6s: 'Cross-platform compatibility:',
    s3l6t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l7s: 'Multiple redaction methods:',
    s3l7t: ' Redact text, images, entire pages, or custom areas',
    s3l8s: 'Metadata removal:',
    s3l8t: ' Cleans document properties and hidden information',
    s3p3: "The best part? You don't need to understand how PDF redaction works technically. The tool handles data removal, content elimination, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF redaction tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need to permanently remove sensitive information without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Redact PDF Files Using Our Tool',
    s4p1: "Ready to redact your PDF? Follow these steps to permanently remove sensitive information from PDF files quickly and securely. We'll cover different redaction methods: text redaction, image redaction, area redaction, and page redaction.",

    s4st1h: 'Step 1: Access the PDF Redaction Tool',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF redaction page',
    s4st1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start redacting immediately. This privacy-first approach ensures your sensitive documents never leave your device.",

    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25 MB (for optimal performance)',
    s4st2l3: 'Any PDF file, regardless of page count or complexity',
    s4st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4st2l4link: 'PDF editing tool',
    s4st2l4b: ')',
    s4st2l5: 'Scanned PDFs and image-based documents',
    s4st2p2: "Once uploaded, you'll see a preview of your PDF showing all pages. This helps you identify which areas need redaction. The tool processes your file entirely in your browser—nothing is uploaded to any server, ensuring maximum privacy and security.",

    s4st3h: 'Step 3: Choose Your Redaction Method',
    s4st3p1: 'This is where you decide how to remove sensitive information. Most tools offer several redaction methods:',
    s4st3mAh: 'Method A: Text Redaction',
    s4st3mAp1: 'This is the most common method for removing specific text. You can select individual words, sentences, paragraphs, or entire sections. The tool permanently removes the selected text and replaces it with a black box that cannot be removed or recovered.',
    s4st3mAp2s: 'How to use:',
    s4st3mAp2t: ' Click and drag to select text, or double-click to select words. You can select multiple text areas across different pages. Once selected, click "Redact" to permanently remove the text.',
    s4st3mAp3s: 'Best for:',
    s4st3mAp3t: ' Removing names, addresses, phone numbers, email addresses, account numbers, social security numbers, dates, or any specific text content.',
    s4st3mBh: 'Method B: Area Redaction',
    s4st3mBp1: 'This method allows you to draw a rectangle or custom shape over any area of the document, regardless of whether it contains text, images, or other content. The entire area is permanently removed.',
    s4st3mBp2s: 'How to use:',
    s4st3mBp2t: ' Select the area redaction tool, then click and drag to create a redaction box over the content you want to remove. You can resize and reposition the box before applying redaction.',
    s4st3mBp3s: 'Best for:',
    s4st3mBp3t: " Removing signatures, logos, images, tables, or irregularly shaped content that doesn't align with text boundaries.",
    s4st3mCh: 'Method C: Image Redaction',
    s4st3mCp1: 'If your PDF contains images with sensitive information (photos, scanned documents, charts, or diagrams), this method permanently removes the entire image from the document.',
    s4st3mCp2s: 'How to use:',
    s4st3mCp2t: ' Click on an image in your PDF, then select "Redact Image" from the context menu. The entire image is permanently removed.',
    s4st3mCp3s: 'Best for:',
    s4st3mCp3t: ' Removing photos, scanned documents, charts with sensitive data, or any embedded images containing confidential information.',
    s4st3mDh: 'Method D: Page Redaction',
    s4st3mDp1: "This method permanently removes entire pages from the PDF document. Useful when entire pages contain sensitive information that shouldn't be shared.",
    s4st3mDp2s: 'How to use:',
    s4st3mDp2t: ' Navigate to the page you want to remove, then select "Redact Page" from the page menu. The entire page is permanently deleted from the document.',
    s4st3mDp3s: 'Best for:',
    s4st3mDp3t: " Removing pages with confidential information, blank pages, or pages that shouldn't be included in the final document.",

    s4st4h: 'Step 4: Select Content to Redact',
    s4st4p1: "Now it's time to identify and select the sensitive information you want to remove. Here are some tips for effective redaction:",
    s4st4l1s: 'Be thorough:',
    s4st4l1t: ' Review the entire document carefully. Sensitive information can appear in headers, footers, watermarks, annotations, and metadata',
    s4st4l2s: 'Check all pages:',
    s4st4l2t: " Don't forget to review every page, including cover pages, appendices, and blank pages",
    s4st4l3s: 'Look for variations:',
    s4st4l3t: ' Names, dates, and numbers might appear in multiple formats (e.g., "John Smith" and "J. Smith")',
    s4st4l4s: 'Review metadata:',
    s4st4l4t: " Use the tool's metadata cleaning feature to remove document properties, author information, and creation dates",
    s4st4l5s: 'Check annotations:',
    s4st4l5t: ' Comments, highlights, and annotations can contain sensitive information',
    s4st4l6s: 'Verify form data:',
    s4st4l6t: ' If your PDF contains form fields, check for hidden or filled form data',
    s4st4p2s: 'Pro tip:',
    s4st4p2t: " Create a checklist of all sensitive information types before you start redacting. This ensures you don't miss anything important. Common items to redact include: names, addresses, phone numbers, email addresses, social security numbers, account numbers, credit card numbers, dates of birth, medical record numbers, case numbers, and proprietary information.",

    s4st5h: 'Step 5: Apply Redactions',
    s4st5p1: "Once you've selected all the content you want to redact, it's time to apply the redactions. The tool will:",
    s4st5o1: 'Permanently remove the underlying data from the PDF structure',
    s4st5o2: 'Replace redacted areas with black boxes that cannot be removed',
    s4st5o3: 'Clean metadata and document properties',
    s4st5o4: 'Remove hidden text layers and embedded data',
    s4st5o5: 'Generate your redacted PDF file',
    s4st5p2: 'Processing time depends on:',
    s4st5l1: 'Total page count of your PDF',
    s4st5l2: 'Number of redactions being applied',
    s4st5l3: 'File size and complexity',
    s4st5l4: "Your device's processing power",
    s4st5p3: "For typical redactions (10-20 items on a 20-50 page document), this usually takes just a few seconds. Larger redactions might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4st6h: 'Step 6: Review Your Redacted PDF',
    s4st6p1: 'Before downloading, take a moment to review your redacted PDF:',
    s4st6l1: 'Verify all sensitive information has been redacted',
    s4st6l2: 'Check that redaction boxes cover the intended areas completely',
    s4st6l3: 'Ensure no sensitive information is visible in headers, footers, or watermarks',
    s4st6l4: 'Review all pages to confirm nothing was missed',
    s4st6l5: 'Check that the document still makes sense after redaction (if applicable)',
    s4st6l6: 'Verify metadata has been cleaned (document properties should be empty or generic)',
    s4st6p2s: 'Important:',
    s4st6p2t: " Once you download the redacted PDF, the original file remains unchanged on your device. However, the redacted version permanently removes the information—you cannot undo redactions. Make sure you're satisfied with the redaction before finalizing.",
    s4st6p3: 'If you notice something that needs to be redacted, you can go back and add more redactions before downloading. Some tools also allow you to preview the redacted document to ensure everything looks correct.',

    s4st7h: 'Step 7: Download Your Redacted PDF',
    s4st7p1: 'When you\'re satisfied with the redaction, click the download button to save your redacted PDF to your device. The file will have a name like "redacted.pdf" or "document_redacted.pdf" by default, but you can rename it to something more descriptive.',
    s4st7p2s: 'Important:',
    s4st7p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your redacted PDF before closing the page.',
    s4st7p3s: 'Security note:',
    s4st7p3t: ' The redacted PDF you download has permanently removed the sensitive information. Even if someone tries to extract text, use PDF analysis tools, or examine the file structure, the redacted information will not be accessible. This is true redaction, not just visual covering.',
    s4st7p4: "That's it! You've successfully redacted your PDF file. The entire process typically takes less than five minutes from start to finish, depending on the complexity of your document and the number of redactions needed.",

    s5h: 'Benefits of Using Online PDF Redaction Tools',
    s5p1: 'Why choose an online PDF redaction tool over desktop software or manual methods? Here are the key advantages:',
    s5b1h: '1. True Permanent Redaction',
    s5b1p: 'Unlike simply covering text with a black box, proper PDF redaction tools permanently remove the underlying data from the PDF file structure. This means the redacted information cannot be recovered through text extraction, PDF analysis tools, or any other method. The information is truly gone, not just hidden.',
    s5b2h: '2. Privacy and Security',
    s5b2p1: 'When you use a privacy-first PDF redaction tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5b2l1: 'Confidential legal documents',
    s5b2l2: 'Personal financial information',
    s5b2l3: 'Medical records and protected health information',
    s5b2l4: 'Business secrets and proprietary information',
    s5b2l5: 'Government or classified documents',
    s5b2l6: 'Any sensitive data subject to privacy regulations',
    s5b2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. Your sensitive documents are processed entirely in your browser, ensuring maximum privacy and security.',
    s5b3h: '3. Zero Installation Required',
    s5b3p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start redacting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to redact PDFs on the go. No IT department approval needed, no software licenses to purchase.",
    s5b4h: '4. Cost-Effective Solution',
    s5b4p: 'Most online PDF redaction tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF redaction, free online tools provide excellent value without any financial commitment. This makes professional-grade redaction accessible to everyone, regardless of budget.',
    s5b5h: '5. Multiple Redaction Methods in One Tool',
    s5b5p: 'Unlike desktop software that might only support one redaction method, online tools often offer multiple options: redact text, images, areas, or entire pages. This flexibility means you can handle different types of sensitive information without switching tools. You can also combine methods—for example, redacting specific text on one page and an entire image on another.',
    s5b6h: '6. Metadata Cleaning',
    s5b6p: 'Proper PDF redaction includes cleaning document metadata—properties like author name, creation date, modification history, and software information. Many online redaction tools automatically remove or sanitize this metadata, ensuring that no hidden information remains in the document. This is crucial for complete privacy protection.',
    s5b7h: '7. Cross-Platform Compatibility',
    s5b7p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF redaction tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely, allowing you to redact PDFs from any device with a modern web browser.",
    s5b8h: '8. Always Up-to-Date',
    s5b8p: "Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility. This ensures you're always using the most secure and effective redaction methods available.",
    s5b9h: '9. Speed and Efficiency',
    s5b9p1: 'Modern browser-based PDF processing is surprisingly fast. You can redact PDFs in seconds, compared to:',
    s5b9l1: 'Manual methods like printing and scanning (time-consuming and quality-degrading)',
    s5b9l2: 'Desktop software that requires launching and navigating complex interfaces',
    s5b9l3: 'Cloud-based tools that require upload and download time',
    s5b9p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done. You can redact multiple documents quickly, making it ideal for batch processing.',
    s5b10h: '10. Legal Compliance',
    s5b10p: "Proper PDF redaction tools help you meet legal and regulatory requirements for data protection. Whether you're dealing with HIPAA (healthcare), GDPR (European data protection), or other privacy regulations, true redaction ensures that sensitive information is permanently removed, not just hidden. This helps protect you from compliance violations and data breaches.",

    s6h: 'Comparison: Online PDF Redaction Tools vs. Other Methods',
    s6p1: "How do online PDF redaction tools stack up against alternatives? Let's break down the comparison:",
    s6c1h: 'Online PDF Redaction Tools vs. Desktop Software',
    s6c1p1: 'Desktop Software (Adobe Acrobat Pro, PDF Expert, etc.):',
    s6c1la1: '✅ More advanced features (comprehensive editing, form filling, etc.)',
    s6c1la2: '✅ Works offline',
    s6c1la3: '✅ Better for very large files (500+ pages)',
    s6c1la4: '✅ More control over redaction settings',
    s6c1la5: '❌ Requires installation and updates',
    s6c1la6: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1la7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1la8: '❌ Takes up disk space',
    s6c1la9: '❌ May require IT department approval for installation',
    s6c1p2: 'Online PDF Redaction Tools:',
    s6c1lb1: '✅ Free to use',
    s6c1lb2: '✅ No installation required',
    s6c1lb3: '✅ Works on any platform',
    s6c1lb4: '✅ Always up-to-date',
    s6c1lb5: '✅ Privacy-first (client-side processing)',
    s6c1lb6: '✅ Multiple redaction methods in one tool',
    s6c1lb7: '✅ Automatic metadata cleaning',
    s6c1lb8: '❌ Requires internet connection (for initial page load)',
    s6c1lb9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1lb10: '❌ Fewer advanced editing features (but sufficient for redaction)',
    s6c1vs: 'Verdict:',
    s6c1vt: ' For PDF redaction specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just redaction, or if you regularly work with very large files that require heavy processing power.',
    s6c2h: 'Online PDF Redaction Tools vs. Cloud-Based Services',
    s6c2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c2la1: '✅ Integrated with cloud storage',
    s6c2la2: '✅ Can access files from anywhere',
    s6c2la3: '✅ Often free with cloud storage accounts',
    s6c2la4: '❌ Files uploaded to servers (major privacy concern for sensitive documents)',
    s6c2la5: '❌ Requires account creation',
    s6c2la6: '❌ Storage limits apply',
    s6c2la7: '❌ Files may be retained on servers',
    s6c2la8: '❌ Slower processing (upload/download time)',
    s6c2la9: '❌ Limited redaction options',
    s6c2la10: '❌ May not provide true permanent redaction',
    s6c2p2: 'Client-Side Online Redaction Tools:',
    s6c2lb1: '✅ No file uploads (privacy-first)',
    s6c2lb2: '✅ No account required',
    s6c2lb3: '✅ Faster processing (no upload/download)',
    s6c2lb4: '✅ No storage limits',
    s6c2lb5: '✅ Files never leave your device',
    s6c2lb6: '✅ True permanent redaction',
    s6c2lb7: '✅ Multiple redaction methods',
    s6c2lb8: '✅ Automatic metadata cleaning',
    s6c2lb9: "❌ Can't access files from cloud storage directly",
    s6c2vs: 'Verdict:',
    s6c2vt: ' For privacy-conscious users handling sensitive documents, client-side online redaction tools are superior. Cloud services are better if you need to redact files already stored in cloud storage and don\'t mind the privacy trade-off, though this is generally not recommended for sensitive information.',
    s6c3h: 'Online PDF Redaction Tools vs. Manual Methods',
    s6c3p1: 'Some people try to redact PDFs manually using methods like:',
    s6c3la1: "Drawing black boxes over text in image editors (doesn't remove underlying data)",
    s6c3la2: 'Printing and physically blacking out text (time-consuming, not digital)',
    s6c3la3: 'Using white text or white boxes to "hide" information (easily recoverable)',
    s6c3la4: 'Deleting text using basic PDF editors (may leave metadata and hidden layers)',
    s6c3la5: 'Taking screenshots and editing images (terrible quality, not searchable, time-consuming)',
    s6c3p2: 'Why these methods fail:',
    s6c3lb1: "They don't permanently remove underlying data—information can still be extracted",
    s6c3lb2: 'Metadata and hidden text layers remain intact',
    s6c3lb3: "They're time-consuming and error-prone",
    s6c3lb4: "They don't meet legal requirements for proper redaction",
    s6c3lb5: 'They can lead to data breaches and compliance violations',
    s6c3vs: 'Verdict:',
    s6c3vt: " Online PDF redaction tools are faster, produce truly secure results, and meet legal requirements. There's no reason to use manual workarounds when proper tools are available for free. Proper redaction is essential for protecting sensitive information and meeting compliance requirements.",

    s7h: 'Frequently Asked Questions About Redacting PDFs',

    s8h: 'Conclusion: Making PDF Redaction Simple and Secure',
    s8p1: "Redacting PDF files doesn't have to be complicated or expensive. With modern online PDF redaction tools, permanently removing sensitive information from documents is straightforward, fast, and secure. Whether you're a legal professional protecting client information, a healthcare worker removing patient identifiers, or anyone who regularly handles sensitive documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF redaction tools—no installation, privacy-first processing, free access, true permanent redaction, multiple redaction methods, and cross-platform compatibility—make them the ideal solution for most redaction needs. While desktop software has its place for advanced PDF editing tasks, simple and secure redaction is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Use proper redaction tools that permanently remove data, not just cover it',
    s8l2: 'Review the entire document carefully before redacting—check all pages, headers, footers, and metadata',
    s8l3: 'Use privacy-first tools that process files locally in your browser',
    s8l4: 'Clean metadata and document properties as part of the redaction process',
    s8l5: 'Review your redacted PDF before sharing to ensure nothing was missed',
    s8l6: "Keep backups of original files until you're satisfied with the redaction",
    s8l7: 'Verify that redacted information cannot be extracted or recovered',
    s8l8: 'Use appropriate redaction methods for different types of content (text, images, areas, pages)',
    s8p4a: 'Ready to redact your PDFs? Try our ',
    s8p4link1: 'free PDF redaction tool',
    s8p4b: ' and experience how simple and secure removing sensitive information can be. And if you need to make other edits to your PDFs before or after redacting, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction before redacting, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple redacted PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF redaction doesn't have to be a chore. With the right tools and approach, you can handle document redaction quickly and confidently, ensuring sensitive information is permanently removed and protected. This gives you peace of mind when sharing documents, meeting compliance requirements, and protecting privacy—leaving more time for the work that actually matters.",

    // Related Articles
    ra1t: 'How to Merge PDF Files Online',
    ra1d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    ra2t: 'How to Split PDF Files Online',
    ra2d: 'Complete guide to dividing large PDF files into smaller documents using free online tools.',
    ra3t: 'How to Edit a PDF Online',
    ra3d: 'Complete guide to editing PDF files online without installing software.',
    ra4t: 'Is It Safe to Edit PDFs Online?',
    ra4d: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.',

    // Visible FAQ (14)
    fv1q: 'How do I redact a PDF file online for free?',
    fv1a1: 'You can redact a PDF file online for free by using our ',
    fv1alink: 'PDF redaction tool',
    fv1a2: '. Simply upload your PDF file, select the text, images, or areas you want to permanently remove using the redaction tools, and apply the redactions. The tool permanently removes sensitive information, replacing it with black boxes that cannot be recovered. Download your redacted PDF instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is PDF redaction permanent?',
    fv2a: 'Yes, when done correctly, PDF redaction is permanent. A proper redaction tool permanently removes the underlying data from the PDF file structure, not just covers it with a black box. This means the redacted information cannot be recovered, extracted, or viewed by anyone, even with advanced PDF analysis tools, text extraction software, or metadata readers. The information is truly gone from the document.',
    fv3q: 'Is it safe to redact PDFs online?',
    fv3a: 'Yes, when using a privacy-first PDF redaction tool that processes files locally in your browser, your documents never leave your device. All redaction happens client-side using JavaScript, ensuring your sensitive documents remain secure and private throughout the process. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv4q: 'What information can I redact from a PDF?',
    fv4a: 'You can redact any type of content from a PDF, including text (names, addresses, phone numbers, email addresses, social security numbers, credit card numbers, account numbers, dates, etc.), images (photos, scanned documents, charts, diagrams), signatures, entire pages, headers and footers, watermarks, annotations, and metadata. You can also redact custom areas by drawing redaction boxes over any part of the document. The key is that proper redaction permanently removes the underlying data, not just hides it visually.',
    fv5q: 'Can redacted information be recovered?',
    fv5a: "No, properly redacted information cannot be recovered. A true redaction tool permanently removes the underlying data from the PDF file structure, not just overlays a black box. This means even if someone tries to copy text, use PDF analysis tools, extract metadata, examine the file structure, or use advanced recovery methods, the redacted information will not be accessible. However, it's important to use a proper redaction tool—simply covering text with a black box or using white text does not provide true redaction and can be easily reversed.",
    fv6q: 'Do I need to create an account to redact PDF files?',
    fv6a: 'No, many free PDF redaction tools work without requiring account creation or registration. You can upload, redact, and download your redacted PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving redaction history or accessing premium features, but basic PDF redaction is typically available without any registration.',
    fv7q: 'What is the difference between redacting and deleting text in a PDF?',
    fv7a: 'Redacting permanently removes information and replaces it with a black box that cannot be removed or recovered. The underlying data is eliminated from the PDF file structure. Deleting text simply removes visible content but may leave metadata, hidden text layers, form data, annotations, or recoverable data in the PDF file. Redaction is the proper method for removing sensitive information that must remain confidential and cannot be recovered. Deletion is not secure for sensitive information.',
    fv8q: 'Can I redact multiple areas in a PDF at once?',
    fv8a: 'Yes, most PDF redaction tools allow you to select and redact multiple areas, pages, or sections of a document in a single operation. You can mark multiple items for redaction (text selections, images, areas, or pages) and apply all redactions at once, making it efficient to remove sensitive information from large documents. Some tools also support batch redaction patterns, allowing you to redact the same type of information (like all email addresses or phone numbers) across the entire document automatically.',
    fv9q: 'What is the maximum file size for redacting PDFs online?',
    fv9a1: 'File size limits vary by tool, but most online PDF redaction tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to redact very large PDFs, consider splitting them first using our ',
    fv9alink1: 'PDF splitter tool',
    fv9a2: ', redacting each section separately, then merging them back together using our ',
    fv9alink2: 'PDF merger tool',
    fv9a3: '.',
    fv10q: 'Can I redact password-protected PDFs?',
    fv10a1: "This depends on the tool. Most online PDF redaction tools cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv10alink: 'PDF editing tool',
    fv10a2: ' or the software that created the protection, then redact the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password during the redaction process.',
    fv11q: 'Will redacting a PDF reduce file quality?',
    fv11a: "No, properly redacting a PDF should not reduce quality. When you redact PDF files using a quality tool, it removes the underlying data without re-compressing or degrading the remaining content. The redacted PDF maintains the same quality as your source file for all non-redacted content. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that redact PDFs at the native PDF level rather than converting formats.",
    fv12q: 'Can I undo redactions after applying them?',
    fv12a: "No, properly applied redactions cannot be undone. This is by design—redaction is meant to permanently remove information. Once you've downloaded the redacted PDF, the redacted information is permanently gone and cannot be recovered. However, your original PDF file remains unchanged on your device, so you can always start over if needed. Some tools allow you to remove redaction marks before applying them, but once redactions are applied and the file is saved, they cannot be reversed.",
    fv13q: 'Does redaction remove metadata from PDFs?',
    fv13a: 'Many quality PDF redaction tools include metadata cleaning features that remove or sanitize document properties like author name, creation date, modification history, software information, and other metadata. However, not all tools do this automatically. Look for tools that explicitly mention metadata cleaning or document property removal. This is important because metadata can contain sensitive information that should be redacted along with visible content.',
    fv14q: 'Can I redact PDFs on mobile devices?',
    fv14a: 'Yes, many online PDF redaction tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large redactions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core redaction functionality should work. For complex redactions or large documents, desktop or laptop computers are recommended.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I redact a PDF file online for free?',
    fq1a: 'You can redact a PDF file online for free by using our PDF redaction tool. Simply upload your PDF file, select the text, images, or areas you want to permanently remove, and apply redaction. The tool permanently removes sensitive information, replacing it with black boxes that cannot be recovered. Download your redacted PDF instantly.',
    fq2q: 'Is PDF redaction permanent?',
    fq2a: 'Yes, when done correctly, PDF redaction is permanent. A proper redaction tool permanently removes the underlying data from the PDF file, not just covers it with a black box. This means the redacted information cannot be recovered, extracted, or viewed by anyone, even with advanced PDF analysis tools.',
    fq3q: 'Is it safe to redact PDFs online?',
    fq3a: 'Yes, when using a privacy-first PDF redaction tool that processes files locally in your browser, your documents never leave your device. All redaction happens client-side, ensuring your sensitive documents remain secure and private throughout the process.',
    fq4q: 'What information can I redact from a PDF?',
    fq4a: 'You can redact any type of content from a PDF, including text, images, signatures, dates, names, addresses, phone numbers, email addresses, social security numbers, credit card numbers, account numbers, and any other sensitive or confidential information. You can also redact entire pages or sections of a document.',
    fq5q: 'Can redacted information be recovered?',
    fq5a: 'No, properly redacted information cannot be recovered. A true redaction tool permanently removes the underlying data from the PDF file structure, not just overlays a black box. This means even if someone tries to copy text, use PDF analysis tools, or extract metadata, the redacted information will not be accessible.',
    fq6q: 'Do I need to create an account to redact PDF files?',
    fq6a: 'No, many free PDF redaction tools work without requiring account creation or registration. You can upload, redact, and download your redacted PDF files immediately without signing up. This makes the process faster and more private.',
    fq7q: 'What is the difference between redacting and deleting text in a PDF?',
    fq7a: 'Redacting permanently removes information and replaces it with a black box that cannot be removed or recovered. Deleting text simply removes visible content but may leave metadata, hidden text layers, or recoverable data in the PDF file. Redaction is the proper method for removing sensitive information that must remain confidential.',
    fq8q: 'Can I redact multiple areas in a PDF at once?',
    fq8a: 'Yes, most PDF redaction tools allow you to select and redact multiple areas, pages, or sections of a document in a single operation. You can mark multiple items for redaction and apply all redactions at once, making it efficient to remove sensitive information from large documents.',
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
                <li><strong className="text-white">{c.s1l7s}</strong>{c.s1l7t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p3}
              </p>
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
                <li><strong className="text-white">{c.s3l8s}</strong>{c.s3l8t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1p1a}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
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
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3mAh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st3mAp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    <strong className="text-white">{c.s4st3mAp2s}</strong>{c.s4st3mAp2t}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3mAp3s}</strong>{c.s4st3mAp3t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3mBh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st3mBp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    <strong className="text-white">{c.s4st3mBp2s}</strong>{c.s4st3mBp2t}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3mBp3s}</strong>{c.s4st3mBp3t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3mCh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st3mCp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    <strong className="text-white">{c.s4st3mCp2s}</strong>{c.s4st3mCp2t}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3mCp3s}</strong>{c.s4st3mCp3t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4st3mDh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4st3mDp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    <strong className="text-white">{c.s4st3mDp2s}</strong>{c.s4st3mDp2t}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4st3mDp3s}</strong>{c.s4st3mDp3t}
                  </p>
                </div>
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
                  <li><strong className="text-white">{c.s4st4l6s}</strong>{c.s4st4l6t}</li>
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
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st5o1}</li>
                  <li>{c.s4st5o2}</li>
                  <li>{c.s4st5o3}</li>
                  <li>{c.s4st5o4}</li>
                  <li>{c.s4st5o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st5l1}</li>
                  <li>{c.s4st5l2}</li>
                  <li>{c.s4st5l3}</li>
                  <li>{c.s4st5l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st5p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6l1}</li>
                  <li>{c.s4st6l2}</li>
                  <li>{c.s4st6l3}</li>
                  <li>{c.s4st6l4}</li>
                  <li>{c.s4st6l5}</li>
                  <li>{c.s4st6l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p2s}</strong>{c.s4st6p2t}
                </p>
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
                  <strong className="text-white">{c.s4st7p2s}</strong>{c.s4st7p2t}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st7p3s}</strong>{c.s4st7p3t}
                </p>
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
                  <li>{c.s5b2l5}</li>
                  <li>{c.s5b2l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b3h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b3p}
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
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b7p}
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5b9p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5b9l1}</li>
                  <li>{c.s5b9l2}</li>
                  <li>{c.s5b9l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b9p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5b10h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b10p}
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
                  <li>{c.s6c1la1}</li>
                  <li>{c.s6c1la2}</li>
                  <li>{c.s6c1la3}</li>
                  <li>{c.s6c1la4}</li>
                  <li>{c.s6c1la5}</li>
                  <li>{c.s6c1la6}</li>
                  <li>{c.s6c1la7}</li>
                  <li>{c.s6c1la8}</li>
                  <li>{c.s6c1la9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c1lb1}</li>
                  <li>{c.s6c1lb2}</li>
                  <li>{c.s6c1lb3}</li>
                  <li>{c.s6c1lb4}</li>
                  <li>{c.s6c1lb5}</li>
                  <li>{c.s6c1lb6}</li>
                  <li>{c.s6c1lb7}</li>
                  <li>{c.s6c1lb8}</li>
                  <li>{c.s6c1lb9}</li>
                  <li>{c.s6c1lb10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1vs}</strong>{c.s6c1vt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2la1}</li>
                  <li>{c.s6c2la2}</li>
                  <li>{c.s6c2la3}</li>
                  <li>{c.s6c2la4}</li>
                  <li>{c.s6c2la5}</li>
                  <li>{c.s6c2la6}</li>
                  <li>{c.s6c2la7}</li>
                  <li>{c.s6c2la8}</li>
                  <li>{c.s6c2la9}</li>
                  <li>{c.s6c2la10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2lb1}</li>
                  <li>{c.s6c2lb2}</li>
                  <li>{c.s6c2lb3}</li>
                  <li>{c.s6c2lb4}</li>
                  <li>{c.s6c2lb5}</li>
                  <li>{c.s6c2lb6}</li>
                  <li>{c.s6c2lb7}</li>
                  <li>{c.s6c2lb8}</li>
                  <li>{c.s6c2lb9}</li>
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
                  <li>{c.s6c3la1}</li>
                  <li>{c.s6c3la2}</li>
                  <li>{c.s6c3la3}</li>
                  <li>{c.s6c3la4}</li>
                  <li>{c.s6c3la5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c3p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c3lb1}</li>
                  <li>{c.s6c3lb2}</li>
                  <li>{c.s6c3lb3}</li>
                  <li>{c.s6c3lb4}</li>
                  <li>{c.s6c3lb5}</li>
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
                    {c.fv1a1}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1alink}</Link>{c.fv1a2}
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
                    {c.fv9a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9alink1}</Link>{c.fv9a2}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9alink2}</Link>{c.fv9a3}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10alink}</Link>{c.fv10a2}
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

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv14q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv14a}
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
                <li>{c.s8l8}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                  {c.ra1t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.ra1d}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.ra2t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.ra2d}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.ra3t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.ra3d}
                </p>
              </Link>
              <Link
                href={L('/blog/is-it-safe-to-edit-pdfs-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.ra4t}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.ra4d}
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
import { TRANSLATIONS } from './how-to-redact-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
