import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-sanitize-pdf'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Sanitize PDF Files Online_ Complete Guide to Removing Hidden Data and Metadata.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Sanitize PDF Files Online (Remove Hidden Data & Metadata)',
    metaDesc: 'Remove hidden data and metadata from PDF files online. Sanitize documents securely and download a clean, privacy-safe PDF instantly.',
    ogTitle: 'How to Sanitize PDF Files Online (Remove Hidden Data & Metadata)',
    ogDesc: 'Remove hidden data and metadata from PDF files online. Sanitize documents securely and download a clean, privacy-safe PDF instantly.',
    twTitle: 'How to Sanitize PDF Files Online (Remove Hidden Data & Metadata)',
    twDesc: 'Remove hidden data and metadata from PDF files online. Sanitize documents securely and download a clean, privacy-safe PDF instantly.',
    ogAlt: 'Banner showing PDF file being cleaned of hidden metadata and sensitive data with shield icon',
    heroAlt: 'How to sanitize PDF files online - Remove hidden data and metadata guide',

    bcLeaf: 'How to Sanitize PDF Files Online',
    heroTitle: 'How to Sanitize PDF Files Online: Complete Guide to Removing Hidden Data and Metadata',
    heroSubtitle: 'Learn how to clean PDF files by removing hidden data, metadata, JavaScript, embedded files, and sensitive information. Protect your privacy when sharing documents.',

    artHeadline: 'How to Sanitize PDF Files Online - Complete Guide to Removing Hidden Data and Metadata',
    artDesc: 'Complete guide on how to sanitize PDF files online. Learn to remove hidden data, metadata, JavaScript, embedded files, and sensitive information from PDF documents. Step-by-step instructions, tips, and best practices for PDF sanitization.',

    intro1: "You're about to share a PDF document—maybe it's a contract, a report, or a presentation. You've reviewed the visible content and everything looks good. But here's the thing: PDF files contain far more information than what you see on the screen. Hidden metadata, embedded files, JavaScript code, document history, and other invisible data can reveal more about you and your document than you might realize.",
    intro2: "PDF sanitization is the process of cleaning these hidden elements from your documents before sharing them. It's like removing the metadata tags from a photo before posting it online—you keep the visible content but strip away the invisible information that could compromise your privacy or security. This comprehensive guide will walk you through everything you need to know about sanitizing PDFs, from understanding what hidden data exists to using modern tools that clean your documents safely and effectively.",

    s1h: "The Problem: What's Hiding in Your PDF Files",
    s1p1: "When you create or edit a PDF file, your software embeds a surprising amount of information that isn't visible when you view the document. This hidden data can include:",
    s1l1s: 'Document metadata:',
    s1l1t: " Your name, company name, creation date, modification dates, software used, and even your computer's name",
    s1l2s: 'JavaScript code:',
    s1l2t: ' Interactive scripts that can execute when the PDF is opened, potentially posing security risks',
    s1l3s: 'Embedded files and attachments:',
    s1l3t: ' Other documents, images, or files hidden within the PDF structure',
    s1l4s: 'Annotations and comments:',
    s1l4t: ' Review comments, highlights, and notes that might contain sensitive information',
    s1l5s: 'Form field data:',
    s1l5t: ' Information entered into interactive forms, even if the form appears blank',
    s1l6s: 'Hidden layers:',
    s1l6t: " Content that's been hidden but not deleted, still present in the file",
    s1l7s: 'Hyperlinks and cross-references:',
    s1l7t: ' Links to external resources or internal document structure',
    s1l8s: 'Previous versions:',
    s1l8t: ' Traces of earlier document versions that were edited or merged',
    s1p2: 'This hidden information can reveal more than you intend. For example, metadata might show that you created a document at 2 AM on a Sunday, or that you used specific software that reveals your organization\'s tools. JavaScript code could potentially execute malicious actions when recipients open the PDF. Embedded files might contain sensitive documents you thought you removed.',
    s1p3: "The challenge is that most PDF viewers don't show this hidden information by default. You can't see it when you open the file normally, but anyone with the right tools can extract it. This is why PDF sanitization has become essential for anyone who shares documents containing sensitive information, works with confidential data, or simply values their privacy.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: 'You might think that hidden PDF data is a minor concern, but the privacy and security implications are significant. Consider these real-world scenarios where unsanitized PDFs have caused problems:',
    s2l1s: 'Legal professionals',
    s2l1t: ' sharing case documents that inadvertently reveal client names, case numbers, or internal notes through metadata',
    s2l2s: 'Business executives',
    s2l2t: ' sending contracts that expose negotiation history, previous versions, or confidential annotations',
    s2l3s: 'Healthcare workers',
    s2l3t: ' sharing patient documents that contain embedded files or form data with sensitive medical information',
    s2l4s: 'Government employees',
    s2l4t: ' distributing public documents that reveal internal processes, software used, or document creation details',
    s2l5s: 'Journalists',
    s2l5t: ' publishing PDFs that expose sources, document history, or editing software that could identify them',
    s2l6s: 'Students and researchers',
    s2l6t: ' submitting papers that reveal their real names, institutions, or document creation timeline',
    s2l7s: 'Real estate professionals',
    s2l7t: ' sharing property documents that contain hidden annotations or previous versions with sensitive pricing information',
    s2l8s: 'Accountants and financial advisors',
    s2l8t: ' sending reports that expose client data through form fields or embedded spreadsheets',
    s2p2: 'Beyond privacy concerns, unsanitized PDFs can pose security risks. JavaScript code embedded in PDFs has been used in phishing attacks and malware distribution. Recipients who open these PDFs might unknowingly execute malicious scripts. Embedded files could contain viruses or malware. Even seemingly harmless metadata can be used for social engineering attacks.',
    s2p3: 'The consequences of not sanitizing PDFs can include:',
    s2m1: 'Privacy breaches that violate regulations like GDPR, HIPAA, or industry standards',
    s2m2: 'Reputation damage when sensitive information is exposed',
    s2m3: 'Security incidents from malicious code or embedded malware',
    s2m4: 'Legal liability for failing to protect confidential information',
    s2m5: 'Loss of competitive advantage when internal processes are revealed',
    s2m6: 'Identity theft or fraud when personal information is exposed through metadata',
    s2p4: "That's why understanding PDF sanitization isn't just about technical knowledge—it's about protecting yourself, your organization, and the people whose information you handle. In an era where data privacy is increasingly important and regulations are becoming stricter, sanitizing PDFs before sharing them is becoming a best practice, not an optional step.",

    s3h: 'The Solution: Modern PDF Sanitization Tools',
    s3p1: "The good news is that sanitizing PDFs doesn't require technical expertise or expensive software. Modern web-based PDF sanitization tools handle all the complexity behind the scenes, giving you a simple way to clean your documents in minutes.",
    s3p2: 'What makes these tools effective? They use advanced PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Sanitize PDFs in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Comprehensive cleaning:',
    s3l6t: ' Removes metadata, JavaScript, embedded files, annotations, and more in one operation',
    s3p3: 'The sanitization process works by creating a new, clean PDF that contains only the visible content. The tool extracts pages and content while stripping away all hidden data, metadata, scripts, and embedded elements. The result is a sanitized PDF that looks identical to the original but contains no hidden information.',
    s3p4a: 'Our ',
    s3p4link: 'PDF sanitization tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and thorough—removing all hidden data while preserving the visible content you want to keep. You don't need to understand how PDF sanitization works technically; the tool handles everything automatically.",

    s4h: 'Step-by-Step Guide: How to Sanitize PDF Files Using Our Tool',
    s4p1: 'Ready to sanitize your PDF? Follow these steps to clean hidden data, metadata, and sensitive information from your documents quickly and securely.',

    s4st1h: 'Step 1: Access the PDF Sanitization Tool',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF sanitization page',
    s4st1p1b: '. You\'ll see a clean interface with a file upload area. No account creation or login required—you can start sanitizing immediately. The tool processes files entirely in your browser, so your documents never leave your device.',

    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25 MB (for optimal performance)',
    s4st2l3: 'Any PDF file, regardless of page count or complexity',
    s4st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4st2l4link: 'PDF editing tool',
    s4st2l4b: ')',
    s4st2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count. This helps you verify you've selected the correct file before sanitization begins.",

    s4st3h: 'Step 3: Review What Will Be Removed',
    s4st3p1: "Before sanitizing, it's helpful to understand what the tool will remove. Our sanitization process eliminates:",
    s4st3l1s: 'Document metadata:',
    s4st3l1t: ' Author name, creation date, modification dates, software used, and other document properties',
    s4st3l2s: 'JavaScript code:',
    s4st3l2t: ' All interactive scripts and actions embedded in the PDF',
    s4st3l3s: 'Embedded files:',
    s4st3l3t: ' Any attachments or files hidden within the PDF structure',
    s4st3l4s: 'Annotations and comments:',
    s4st3l4t: ' Review comments, highlights, notes, and markup',
    s4st3l5s: 'Form field data:',
    s4st3l5t: ' Information entered into interactive forms',
    s4st3l6s: 'Hidden layers:',
    s4st3l6t: " Content that's been hidden but not deleted",
    s4st3l7s: 'Hyperlinks:',
    s4st3l7t: ' Links to external resources (though visible link text may remain)',
    s4st3l8s: 'Document structure data:',
    s4st3l8t: " Internal references and cross-references that aren't needed for viewing",
    s4st3p2s: 'Important:',
    s4st3p2t: ' The visible content of your PDF—text, images, formatting, and layout—will remain completely intact. Sanitization only removes hidden data, not the actual document content.',

    s4st4h: 'Step 4: Click Sanitize and Wait for Processing',
    s4st4p1: 'Once you\'re ready, click the "Sanitize PDF" or "Clean PDF" button. The tool will:',
    s4st4o1: 'Load your PDF file into memory',
    s4st4o2: 'Extract all visible pages and content',
    s4st4o3: 'Remove all metadata and hidden data',
    s4st4o4: 'Strip JavaScript code and embedded files',
    s4st4o5: 'Remove annotations, form data, and hidden layers',
    s4st4o6: 'Create a new, clean PDF with only visible content',
    s4st4o7: 'Generate your sanitized PDF file',
    s4st4p2: 'Processing time depends on:',
    s4st4l1: 'Total page count of your PDF',
    s4st4l2: 'File size and complexity',
    s4st4l3: 'Amount of hidden data to remove',
    s4st4l4: "Your device's processing power",
    s4st4p3: "For typical PDFs (50-100 pages), sanitization usually takes just a few seconds. Larger or more complex files might take 30-60 seconds. You'll see a progress indicator during processing, and the tool will notify you when sanitization is complete.",

    s4st5h: 'Step 5: Verify the Sanitized PDF',
    s4st5p1: 'After processing completes, you can preview the sanitized PDF to verify that:',
    s4st5l1: 'All visible content is present and correctly formatted',
    s4st5l2: 'Images and graphics appear as expected',
    s4st5l3: 'Text formatting and layout are preserved',
    s4st5l4: 'The document looks identical to the original (which is what you want)',
    s4st5p2: 'The sanitized PDF should look exactly like the original in terms of visible content. The difference is that it no longer contains hidden data, metadata, or potentially malicious elements. If you notice any issues with the visible content, you can always go back and sanitize again or use the original file.',

    s4st6h: 'Step 6: Download Your Sanitized PDF',
    s4st6p1: 'When you\'re satisfied with the sanitized PDF, click the download button to save it to your device. The file will typically have a name like "sanitized.pdf" or "cleaned.pdf" by default, but you can rename it to something more descriptive.',
    s4st6p2s: 'Important:',
    s4st6p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your sanitized PDF before closing the page.',
    s4st6p3s: 'Best practice:',
    s4st6p3t: " Keep your original PDF file until you've verified that the sanitized version meets your needs. You can always create a new sanitized version from the original if needed.",
    s4st6p4: "That's it! You've successfully sanitized your PDF file. The entire process typically takes less than two minutes from start to finish, and your document is now safe to share without hidden data or privacy concerns.",

    s5h: 'Benefits of Using Online PDF Sanitization Tools',
    s5p1: 'Why choose an online PDF sanitizer over desktop software or manual methods? Here are the key advantages:',

    s5st1h: '1. Privacy and Security First',
    s5st1p1: 'The most important benefit is privacy. When you use a privacy-first PDF sanitizer that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5st1l1: 'Confidential business documents',
    s5st1l2: 'Legal files and contracts',
    s5st1l3: 'Medical records and healthcare information',
    s5st1l4: 'Financial documents and tax records',
    s5st1l5: 'Personal identification documents',
    s5st1l6: 'Any sensitive or private data',
    s5st1p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. Your sensitive documents never touch external servers, reducing the risk of data breaches or unauthorized access.',

    s5st2h: '2. Zero Installation Required',
    s5st2p1: "You don't need to download, install, or update any software. Just open your browser and start sanitizing. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to sanitize PDFs on the go. You can use the tool from any device with internet access and a modern browser.",

    s5st3h: '3. Cost-Effective Solution',
    s5st3p1: 'Most online PDF sanitization tools are completely free. Desktop PDF software with sanitization features can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF sanitization, free online tools provide excellent value without any financial commitment.',

    s5st4h: '4. Comprehensive Cleaning in One Step',
    s5st4p1: "Online sanitization tools remove all types of hidden data in a single operation: metadata, JavaScript, embedded files, annotations, form data, hidden layers, and more. You don't need to use multiple tools or perform manual steps. One click cleans everything automatically.",

    s5st5h: '5. Cross-Platform Compatibility',
    s5st5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF sanitizers work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",

    s5st6h: '6. Always Up-to-Date',
    s5st6p1: 'Online tools are automatically updated by their developers. You always get the latest features, security improvements, and bug fixes without manually downloading updates or worrying about version compatibility. This is especially important for security tools, as new threats and vulnerabilities are discovered regularly.',

    s5st7h: '7. Speed and Efficiency',
    s5st7p1: 'Modern browser-based PDF processing is surprisingly fast. You can sanitize PDFs in seconds, compared to:',
    s5st7l1: 'Manual metadata removal (time-consuming and error-prone)',
    s5st7l2: 'Desktop software that requires launching and navigating complex interfaces',
    s5st7l3: 'Multiple-step processes using different tools',
    s5st7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done. You can sanitize multiple PDFs quickly, making it practical to clean documents before every sharing.',

    s5st8h: '8. No Technical Expertise Required',
    s5st8p1: "You don't need to understand PDF structure, metadata formats, or JavaScript to sanitize documents. The tool handles all the technical complexity automatically. Just upload your PDF and click sanitize—the tool does the rest. This makes PDF sanitization accessible to everyone, not just technical users.",

    s6h: 'Comparison: Online PDF Sanitizers vs. Other Methods',
    s6p1: "How do online PDF sanitization tools stack up against alternatives? Let's break down the comparison:",

    s6st1h: 'Online PDF Sanitizers vs. Desktop Software',
    s6st1p1: 'Desktop Software (Adobe Acrobat Pro, PDF Expert, etc.):',
    s6st1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6st1l2: '✅ Works offline after installation',
    s6st1l3: '✅ Better for very large files (500+ pages)',
    s6st1l4: '❌ Requires installation and updates',
    s6st1l5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6st1l6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6st1l7: '❌ Takes up disk space',
    s6st1l8: '❌ More complex interfaces with many features you may not need',
    s6st1p2: 'Online PDF Sanitizers:',
    s6st1m1: '✅ Free to use',
    s6st1m2: '✅ No installation required',
    s6st1m3: '✅ Works on any platform',
    s6st1m4: '✅ Always up-to-date',
    s6st1m5: '✅ Privacy-first (client-side processing)',
    s6st1m6: '✅ Simple, focused interface',
    s6st1m7: '✅ Multiple sanitization features in one tool',
    s6st1m8: '❌ Requires internet connection (for initial page load)',
    s6st1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6st1p3s: 'Verdict:',
    s6st1p3t: ' For PDF sanitization specifically, online tools win on convenience, cost, privacy, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just sanitization, or if you regularly work with very large files offline.',

    s6st2h: 'Online PDF Sanitizers vs. Cloud-Based Services',
    s6st2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6st2l1: '✅ Integrated with cloud storage',
    s6st2l2: '✅ Can access files from anywhere',
    s6st2l3: '✅ Often free with cloud storage accounts',
    s6st2l4: '❌ Files uploaded to servers (major privacy concern)',
    s6st2l5: '❌ Requires account creation',
    s6st2l6: '❌ Storage limits apply',
    s6st2l7: '❌ Files may be retained on servers',
    s6st2l8: '❌ Slower processing (upload/download time)',
    s6st2l9: '❌ Limited sanitization options',
    s6st2l10: '❌ Privacy policies may allow data analysis',
    s6st2p2: 'Client-Side Online Sanitizers:',
    s6st2m1: '✅ No file uploads (privacy-first)',
    s6st2m2: '✅ No account required',
    s6st2m3: '✅ Faster processing (no upload/download)',
    s6st2m4: '✅ No storage limits',
    s6st2m5: '✅ Files never leave your device',
    s6st2m6: '✅ Comprehensive sanitization options',
    s6st2m7: '✅ No data retention policies',
    s6st2m8: "❌ Can't access files from cloud storage directly",
    s6st2p3s: 'Verdict:',
    s6st2p3t: ' For privacy-conscious users, client-side online sanitizers are clearly superior. Cloud services are better only if you need to sanitize files already stored in cloud storage and don\'t mind the significant privacy trade-off of uploading sensitive documents to external servers.',

    s6st3h: 'Online PDF Sanitizers vs. Manual Methods',
    s6st3p1: 'Some people try to sanitize PDFs manually using methods like:',
    s6st3l1: 'Printing to PDF (removes some metadata but not JavaScript or embedded files, time-consuming)',
    s6st3l2: 'Converting to images and back to PDF (removes everything but also removes text searchability, degrades quality)',
    s6st3l3: 'Using freeware with ads and malware risks',
    s6st3l4: 'Manually editing metadata (only removes metadata, misses JavaScript, embedded files, and other hidden data)',
    s6st3p2s: 'Verdict:',
    s6st3p2t: " Online PDF sanitizers are faster, more comprehensive, produce better quality results, and are more reliable than any manual method. They remove all types of hidden data in one operation while preserving document quality and searchability. There's no reason to use workarounds when proper tools are available for free.",

    faqVisH: 'Frequently Asked Questions About PDF Sanitization',
    // Visible FAQ (13)
    fv1q: 'What does it mean to sanitize a PDF file?',
    fv1a: "Sanitizing a PDF means removing hidden data, metadata, JavaScript code, embedded files, annotations, form data, and other sensitive information that could expose personal details, document history, or security risks. The sanitized PDF contains only the visible content without any hidden elements. It's like cleaning a document to remove invisible information that could compromise privacy or security.",
    fv2q: 'Is it safe to sanitize PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF sanitizer that processes files locally in your browser, your documents never leave your device. All sanitization happens client-side using JavaScript, ensuring your sensitive documents remain secure and private throughout the process. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'What information is removed when sanitizing a PDF?',
    fv3a: 'PDF sanitization removes document metadata (author name, creation date, modification dates, software used, computer name), JavaScript code and interactive scripts, embedded files and attachments, annotations and comments, form field data, hidden layers, hyperlinks and cross-references, and other hidden content. The visible content—text, images, formatting, and layout—remains completely intact. Only hidden data is removed.',
    fv4q: 'Will sanitizing a PDF reduce file quality?',
    fv4a: "No, properly sanitizing a PDF should not reduce the quality of visible content. The sanitization process removes hidden data and metadata while preserving the actual document content, images, and formatting. Your sanitized PDF will look identical to the original, just without hidden information. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that sanitize PDFs at the native PDF level rather than converting formats.",
    fv5q: 'Do I need to create an account to sanitize PDFs?',
    fv5a: 'No, many free PDF sanitizer tools work without requiring account creation or registration. You can upload, sanitize, and download your cleaned PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving sanitization history or accessing premium features, but basic PDF sanitization is typically available without any registration.',
    fv6q: 'Can I sanitize password-protected PDFs?',
    fv6a1: "Most online PDF sanitizers cannot process password-protected PDFs because they need access to the content without the password. You'll need to remove password protection first using a ",
    fv6link: 'PDF editing tool',
    fv6a2: ' or the software that created the protection, then sanitize the unlocked file. Some desktop PDF software can handle password-protected files if you provide the password during processing.',
    fv7q: 'Why should I sanitize PDF files before sharing?',
    fv7a: 'Sanitizing PDFs before sharing protects your privacy by removing metadata that could reveal your name, location, software used, creation dates, and document history. It also removes potentially malicious JavaScript code and embedded files that could pose security risks to recipients. This is especially important for legal documents, contracts, medical records, financial information, and any sensitive data. Sanitization helps you comply with privacy regulations and protect both yourself and document recipients.',
    fv8q: 'What is the maximum file size for sanitizing PDFs online?',
    fv8a1: 'File size limits vary by tool, but most online PDF sanitizers support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to sanitize very large PDFs, consider splitting them first using a ',
    fv8link: 'PDF splitter tool',
    fv8a2: ' or using desktop software designed for heavy-duty processing.',
    fv9q: 'Can I sanitize multiple PDFs at once?',
    fv9a: "This depends on the tool you're using. Some online PDF sanitizers support batch processing, allowing you to sanitize multiple files in one operation. Others process one file at a time. For best results and to avoid browser performance issues, we recommend sanitizing files one at a time, especially if they're large. You can always sanitize multiple files sequentially.",
    fv10q: 'Will sanitizing remove watermarks or visible content?',
    fv10a: 'No, sanitization only removes hidden data, not visible content. Watermarks, text, images, formatting, and all visible elements remain intact. The sanitized PDF will look identical to the original in terms of what you can see. Only invisible metadata, JavaScript, embedded files, and other hidden elements are removed.',
    fv11q: 'Can I undo sanitization if I make a mistake?',
    fv11a: 'Since sanitization creates a new file, you can\'t "undo" the process in the traditional sense. However, your original PDF file remains unchanged on your device, so you can always sanitize it again if needed. This is why it\'s important to keep your original PDF until you\'ve verified that the sanitized version meets your needs. Some tools keep your file available for a few minutes after sanitization, allowing quick re-sanitization if needed.',
    fv12q: 'Is there a difference between sanitizing and redacting PDFs?',
    fv12a1: "Yes, there's an important difference. Sanitizing removes hidden data and metadata while preserving all visible content. Redacting permanently removes visible content by blacking it out or deleting it. If you need to remove sensitive visible information from a PDF, you'll need a ",
    fv12link: 'PDF redaction tool',
    fv12a2: '. If you want to remove hidden data while keeping visible content, use a sanitization tool. You can use both tools together if needed.',
    fv13q: 'Can I sanitize PDFs on mobile devices?',
    fv13a: 'Yes, many online PDF sanitizer tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large files might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    s8h: 'Conclusion: Making PDF Sanitization Simple and Secure',
    s8p1: "Sanitizing PDF files doesn't have to be complicated or time-consuming. With modern online PDF sanitization tools, cleaning hidden data, metadata, and sensitive information from your documents is straightforward, fast, and secure. Whether you're a legal professional sharing case documents, a business executive sending contracts, or anyone who values privacy when sharing PDFs, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF sanitizers—privacy-first processing, no installation, free access, comprehensive cleaning, and cross-platform compatibility—make them the ideal solution for most sanitization needs. While desktop software has its place for advanced PDF editing tasks, simple sanitization is perfectly handled by browser-based tools that process files locally on your device.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Sanitize PDFs before sharing them, especially if they contain sensitive information',
    s8l2: 'Use privacy-first tools that process files locally in your browser',
    s8l3: 'Keep individual files under 25 MB for best performance',
    s8l4: 'Verify that visible content is preserved after sanitization',
    s8l5: "Keep backups of original files until you're satisfied with the sanitized version",
    s8l6: 'Consider sanitization as part of your document sharing workflow',
    s8l7: 'For documents with sensitive visible content, use redaction tools in addition to sanitization',
    s8p4a: 'Ready to sanitize your PDFs? Try our ',
    s8p4link1: 'free PDF sanitization tool',
    s8p4b: ' and experience how simple cleaning documents can be. And if you need to make edits to your PDFs before or after sanitization, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple sanitized PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF privacy doesn't have to be complicated. With the right tools and approach, you can protect your sensitive information and share documents confidently, knowing that hidden data won't expose more than you intend. Start sanitizing your PDFs today and take control of your document privacy.",

    rel1Title: 'How to Merge PDF Files Online',
    rel1Desc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel2Title: 'How to Split PDF Files Online',
    rel2Desc: 'Complete guide to dividing large PDF files into smaller documents using free online tools.',
    rel3Title: 'Is It Safe to Edit PDFs Online?',
    rel3Desc: 'Learn about privacy and security when editing PDF files online, and best practices for safe document handling.',
    rel4Title: 'How to Edit a PDF Online',
    rel4Desc: 'Complete guide to editing PDF files online without installing software.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'What does it mean to sanitize a PDF file?',
    fq1a: 'Sanitizing a PDF means removing hidden data, metadata, JavaScript code, embedded files, annotations, form data, and other sensitive information that could expose personal details, document history, or security risks. The sanitized PDF contains only the visible content without any hidden elements.',
    fq2q: 'Is it safe to sanitize PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF sanitizer that processes files locally in your browser, your documents never leave your device. All sanitization happens client-side, ensuring your sensitive documents remain secure and private throughout the process.',
    fq3q: 'What information is removed when sanitizing a PDF?',
    fq3a: 'PDF sanitization removes metadata (author, creation date, software used), JavaScript code, embedded files and attachments, annotations and comments, form field data, hidden layers, hyperlinks, and other hidden content. The visible content and formatting remain intact.',
    fq4q: 'Will sanitizing a PDF reduce file quality?',
    fq4a: 'No, properly sanitizing a PDF should not reduce the quality of visible content. The sanitization process removes hidden data and metadata while preserving the actual document content, images, and formatting. Your sanitized PDF will look identical to the original, just without hidden information.',
    fq5q: 'Do I need to create an account to sanitize PDFs?',
    fq5a: 'No, many free PDF sanitizer tools work without requiring account creation or registration. You can upload, sanitize, and download your cleaned PDF files immediately without signing up.',
    fq6q: 'Can I sanitize password-protected PDFs?',
    fq6a: "Most online PDF sanitizers cannot process password-protected PDFs because they need access to the content. You'll need to remove password protection first using a PDF editing tool, then sanitize the unlocked file.",
    fq7q: 'Why should I sanitize PDF files before sharing?',
    fq7a: 'Sanitizing PDFs before sharing protects your privacy by removing metadata that could reveal your name, location, software used, creation dates, and document history. It also removes potentially malicious JavaScript code and embedded files that could pose security risks to recipients.',
    fq8q: 'What is the maximum file size for sanitizing PDFs online?',
    fq8a: 'File size limits vary by tool, but most online PDF sanitizers support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
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
      images: [{ url: `${siteUrl}/images/blog/how-to-sanitize-pdf-hero.png`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/how-to-sanitize-pdf-hero.png`],
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
          src="/blog/How to Sanitize PDF Files Online_ Complete Guide to Removing Hidden Data and Metadata.png"
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
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s1l1s}</strong>{c.s1l1t}</li>
                <li><strong className="text-white">{c.s1l2s}</strong>{c.s1l2t}</li>
                <li><strong className="text-white">{c.s1l3s}</strong>{c.s1l3t}</li>
                <li><strong className="text-white">{c.s1l4s}</strong>{c.s1l4t}</li>
                <li><strong className="text-white">{c.s1l5s}</strong>{c.s1l5t}</li>
                <li><strong className="text-white">{c.s1l6s}</strong>{c.s1l6t}</li>
                <li><strong className="text-white">{c.s1l7s}</strong>{c.s1l7t}</li>
                <li><strong className="text-white">{c.s1l8s}</strong>{c.s1l8t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p2}
              </p>
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
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p3}
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
                {c.s2p4}
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
                {c.s3p4a}<Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1p1a}<Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
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
                  <li><strong className="text-white">{c.s4st3l3s}</strong>{c.s4st3l3t}</li>
                  <li><strong className="text-white">{c.s4st3l4s}</strong>{c.s4st3l4t}</li>
                  <li><strong className="text-white">{c.s4st3l5s}</strong>{c.s4st3l5t}</li>
                  <li><strong className="text-white">{c.s4st3l6s}</strong>{c.s4st3l6t}</li>
                  <li><strong className="text-white">{c.s4st3l7s}</strong>{c.s4st3l7t}</li>
                  <li><strong className="text-white">{c.s4st3l8s}</strong>{c.s4st3l8t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st3p2s}</strong>{c.s4st3p2t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st4o1}</li>
                  <li>{c.s4st4o2}</li>
                  <li>{c.s4st4o3}</li>
                  <li>{c.s4st4o4}</li>
                  <li>{c.s4st4o5}</li>
                  <li>{c.s4st4o6}</li>
                  <li>{c.s4st4o7}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st4l1}</li>
                  <li>{c.s4st4l2}</li>
                  <li>{c.s4st4l3}</li>
                  <li>{c.s4st4l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st4p3}
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st5p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p2s}</strong>{c.s4st6p2t}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p3s}</strong>{c.s4st6p3t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st6p4}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5st1p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5st1l1}</li>
                  <li>{c.s5st1l2}</li>
                  <li>{c.s5st1l3}</li>
                  <li>{c.s5st1l4}</li>
                  <li>{c.s5st1l5}</li>
                  <li>{c.s5st1l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st1p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st2h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st2p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st3h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st3p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st4p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st5p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st6p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5st7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5st7l1}</li>
                  <li>{c.s5st7l2}</li>
                  <li>{c.s5st7l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st8p1}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6st1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st1p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st1l1}</li>
                  <li>{c.s6st1l2}</li>
                  <li>{c.s6st1l3}</li>
                  <li>{c.s6st1l4}</li>
                  <li>{c.s6st1l5}</li>
                  <li>{c.s6st1l6}</li>
                  <li>{c.s6st1l7}</li>
                  <li>{c.s6st1l8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st1p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st1m1}</li>
                  <li>{c.s6st1m2}</li>
                  <li>{c.s6st1m3}</li>
                  <li>{c.s6st1m4}</li>
                  <li>{c.s6st1m5}</li>
                  <li>{c.s6st1m6}</li>
                  <li>{c.s6st1m7}</li>
                  <li>{c.s6st1m8}</li>
                  <li>{c.s6st1m9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st1p3s}</strong>{c.s6st1p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st2p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st2l1}</li>
                  <li>{c.s6st2l2}</li>
                  <li>{c.s6st2l3}</li>
                  <li>{c.s6st2l4}</li>
                  <li>{c.s6st2l5}</li>
                  <li>{c.s6st2l6}</li>
                  <li>{c.s6st2l7}</li>
                  <li>{c.s6st2l8}</li>
                  <li>{c.s6st2l9}</li>
                  <li>{c.s6st2l10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st2m1}</li>
                  <li>{c.s6st2m2}</li>
                  <li>{c.s6st2m3}</li>
                  <li>{c.s6st2m4}</li>
                  <li>{c.s6st2m5}</li>
                  <li>{c.s6st2m6}</li>
                  <li>{c.s6st2m7}</li>
                  <li>{c.s6st2m8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st2p3s}</strong>{c.s6st2p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6st3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st3l1}</li>
                  <li>{c.s6st3l2}</li>
                  <li>{c.s6st3l3}</li>
                  <li>{c.s6st3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st3p2s}</strong>{c.s6st3p2t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqVisH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a}
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
                    {c.fv6a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv6link}</Link>{c.fv6a2}
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
                    {c.fv8a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8link}</Link>{c.fv8a2}
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
                    {c.fv12a1}<Link href={L('/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.fv12link}</Link>{c.fv12a2}
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
                {c.s8p4a}<Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                  {c.rel1Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel1Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel2Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel2Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/is-it-safe-to-edit-pdfs-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel3Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel3Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel4Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel4Desc}
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
import { TRANSLATIONS } from './how-to-sanitize-pdf.i18n'
Object.assign(C, TRANSLATIONS)
