import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-compress-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Compress PDF Files Online_ Complete Guide to Reducing PDF File Size.png'
const ogImage = '/images/blog/compress-pdf-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Compress PDF Files Online: Complete Guide to Reducing PDF File Size',
    metaDesc: 'Learn how to compress PDF files online and reduce file size without losing quality. Optimize PDFs for email, web uploads, and faster sharing.',
    ogTitle: 'How to Compress PDF Files Online: Complete Guide to Reducing PDF File Size',
    ogDesc: 'Learn how to compress PDF files online and reduce file size without losing quality. Optimize PDFs for email, web uploads, and faster sharing.',
    twTitle: 'How to Compress PDF Files Online: Complete Guide to Reducing PDF File Size',
    twDesc: 'Learn how to compress PDF files online and reduce file size without losing quality. Optimize PDFs for email, web uploads, and faster sharing.',
    ogImageAlt: 'Illustration showing a PDF file being compressed and reduced in file size',
    heroAlt: 'How to compress PDF files online - Free PDF compression tool guide',

    bcLeaf: 'How to Compress PDF Files Online',
    heroTitle: 'How to Compress PDF Files Online: Complete Guide to Reducing PDF File Size',
    heroSubtitle: 'Learn how to reduce PDF file size using free online compression tools. Shrink large PDFs without losing quality.',

    artHeadline: 'How to Compress PDF Files Online - Complete Guide to Reducing PDF File Size',
    artDesc: 'Complete guide on how to compress PDF files online. Learn to reduce PDF file size using free online tools. Step-by-step instructions, tips, and best practices for PDF compression without losing quality.',

    intro1: "You've got a PDF file that's way too large. Maybe it's a 50 MB scanned document that won't email, or a presentation with high-resolution images that's taking forever to upload. Perhaps you're trying to share a report, but your email provider keeps rejecting it because it exceeds size limits. Whatever the reason, oversized PDF files are a daily frustration for millions of people.",
    intro2: "The good news? You don't need expensive software or technical expertise to shrink PDF files. Modern online PDF compression tools make reducing file size as straightforward as uploading a document and clicking a button. This comprehensive guide will walk you through everything you need to know about compressing PDFs online, from understanding why files get large to choosing the right compression settings and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why PDF Files Get So Large',
    s1p1: "PDF files can balloon to massive sizes for several reasons, and understanding these factors helps you choose the right compression approach. Unlike text documents where file size is mostly determined by word count, PDFs can become large due to various content types and technical factors.",
    s1p2: "Here's what makes PDF files large:",
    s1l1strong: 'High-resolution images:',
    s1l1: ' Scanned documents, photos, and graphics embedded in PDFs can consume massive amounts of space. A single high-resolution image can easily be 5-10 MB',
    s1l2strong: 'Uncompressed content:',
    s1l2: " Some PDFs contain uncompressed images or data, meaning they haven't been optimized for file size",
    s1l3strong: 'Multiple embedded fonts:',
    s1l3: ' PDFs that include full font sets for multiple languages or styles can add significant size',
    s1l4strong: 'Layered content:',
    s1l4: ' PDFs created from design software often contain layers, annotations, and metadata that increase file size',
    s1l5strong: 'Vector graphics complexity:',
    s1l5: ' Complex vector graphics with many paths and shapes can create large files',
    s1l6strong: 'Embedded media:',
    s1l6: ' PDFs with embedded videos, audio, or interactive elements are naturally larger',
    s1l7strong: 'Redundant data:',
    s1l7: " Some PDFs contain duplicate images, fonts, or other resources that aren't optimized",
    s1l8strong: 'Metadata and bookmarks:',
    s1l8: ' Extensive metadata, bookmarks, and document structure can add to file size',
    s1p3: "The most common culprit? Images. Whether it's scanned documents, photos, or graphics, images typically account for 80-90% of a PDF's file size. A 100-page scanned document can easily be 50-100 MB, while the same document with properly compressed images might be just 5-10 MB.",
    s1p4: "These size issues create real problems: email rejections, slow uploads, storage limitations, and frustrating user experiences. That's exactly why PDF compression has become such an essential tool for anyone who regularly works with documents.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "Oversized PDF files aren't just an inconvenience—they create real barriers to productivity and communication. Consider these everyday scenarios where file size becomes a critical issue:",
    s2l1strong: 'Email limitations:',
    s2l1: " Most email providers limit attachments to 25 MB, and many corporate systems cap at 10 MB. Large PDFs simply won't send",
    s2l2strong: 'Cloud storage costs:',
    s2l2: " Every megabyte counts when you're paying for cloud storage. Compressing PDFs can significantly reduce storage costs",
    s2l3strong: 'Website uploads:',
    s2l3: ' Many content management systems and job application portals have strict file size limits. Oversized PDFs get rejected',
    s2l4strong: 'Mobile data usage:',
    s2l4: ' Downloading large PDFs on mobile devices consumes data quickly and costs money',
    s2l5strong: 'Slow loading times:',
    s2l5: ' Large PDFs take forever to open, especially on slower devices or connections, frustrating users',
    s2l6strong: 'Backup and archiving:',
    s2l6: ' Large files consume backup storage space and slow down backup processes',
    s2l7strong: 'Collaboration platforms:',
    s2l7: ' Tools like Slack, Teams, and Google Drive have file size limits that large PDFs exceed',
    s2l8strong: 'Printing and sharing:',
    s2l8: ' Large files are difficult to share via USB drives or print from cloud services',
    s2p2: "The impact goes beyond individual files. When organizations deal with thousands of PDF documents, even small size reductions per file add up to significant storage savings and improved system performance. More importantly, the wrong approach to compression can lead to:",
    s2m1: 'Quality loss that makes documents unreadable or unprofessional',
    s2m2: 'Privacy concerns from uploading sensitive documents to unknown servers',
    s2m3: "Frustration from tools that don't work as expected",
    s2m4: 'Time wasted trying multiple tools or methods',
    s2m5: 'Corrupted files from poor compression algorithms',
    s2p3: "That's why understanding how to compress PDFs properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication. The right compression tool and approach can save hours of frustration and ensure your documents remain usable and professional-looking.",

    s3h: 'The Solution: Modern Online PDF Compression Tools',
    s3p1: 'The solution to oversized PDF files is simpler than you might expect. Modern web-based PDF compression tools handle all the technical complexity behind the scenes, giving you a clean interface to reduce file size in minutes—often by 50-80% without noticeable quality loss.',
    s3p2: 'What makes these tools effective? They leverage advanced compression algorithms that work entirely in your web browser. This means:',
    s3l1strong: 'No installation required:',
    s3l1: ' Works on any device with a modern browser—Windows, Mac, Linux, or mobile',
    s3l2strong: 'Privacy-first processing:',
    s3l2: ' Files stay on your device, never uploaded to servers, keeping sensitive documents secure',
    s3l3strong: 'Instant results:',
    s3l3: ' Compress PDFs in seconds, not minutes, with real-time progress indicators',
    s3l4strong: 'Free to use:',
    s3l4: ' No subscriptions, hidden fees, or premium tiers required for basic compression',
    s3l5strong: 'Multiple compression levels:',
    s3l5: ' Choose from low, medium, or high compression based on your quality needs',
    s3l6strong: 'Quality preservation:',
    s3l6: ' Advanced algorithms reduce file size while maintaining readability and visual quality',
    s3l7strong: 'Batch processing:',
    s3l7: ' Some tools allow compressing multiple files at once',
    s3p3: "The best part? You don't need to understand how PDF compression works technically. The tool handles image optimization, font subsetting, object compression, and metadata removal automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF compression tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need to reduce file sizes without the complexity you don't. Whether you're compressing scanned documents, presentations, or reports, the tool adapts to your file type and provides optimal compression results.",

    s4h: 'Step-by-Step Guide: How to Compress PDF Files Using Our Tool',
    s4p1: "Ready to compress your PDF? Follow these steps to reduce file size quickly and easily. We'll walk through the entire process from uploading your file to downloading the compressed version, including tips for choosing the right compression level.",

    st1h: 'Step 1: Access the PDF Compression Tool',
    st1p1a: 'Navigate to our ',
    st1p1link: 'PDF compression page',
    st1p1b: ". You'll see a clean interface with a file upload area and compression options. No account creation or login required—you can start compressing immediately. The page loads quickly and works entirely in your browser, ensuring your files never leave your device.",

    st2h: 'Step 2: Upload Your PDF File',
    st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    st2l1: 'Drag and drop functionality for quick file upload',
    st2l2: 'Files up to 25-50 MB (for optimal performance, though some tools handle larger files)',
    st2l3: 'Any PDF file, regardless of page count or content type',
    st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    st2l4link: 'PDF editing tool',
    st2l4b: ')',
    st2l5: 'Scanned documents, image-heavy PDFs, text documents, and mixed-content files',
    st2p2: "Once uploaded, you'll see file information displayed, including:",
    st2m1: 'Original file size',
    st2m2: 'Page count',
    st2m3: 'File name',
    st2m4: 'Estimated compression potential (some tools show this)',
    st2p3: "This information helps you understand what you're working with and set realistic expectations for compression results.",

    st3h: 'Step 3: Choose Your Compression Level',
    st3p1: "This is the most important decision you'll make. Most tools offer three compression levels, each balancing file size reduction with quality preservation:",
    st3sub1h: 'Low Compression (Recommended for Most Cases)',
    st3sub1p1: 'This setting provides moderate file size reduction (typically 20-40%) while maintaining near-original quality. Images remain sharp, text stays crisp, and the document looks virtually identical to the original.',
    st3sub1p2strong: 'Best for:',
    st3sub1p2: " Professional documents, presentations, reports, and any PDF where quality is important. This is usually the safest choice if you're unsure.",
    st3sub2h: 'Medium Compression (Balanced Approach)',
    st3sub2p1: 'This setting offers significant file size reduction (typically 40-60%) with minimal quality loss. Images may be slightly less sharp, but the document remains highly readable and professional-looking.',
    st3sub2p2strong: 'Best for:',
    st3sub2p2: ' Documents that need substantial size reduction but still require good quality, such as large reports or image-heavy presentations that need to fit email size limits.',
    st3sub3h: 'High Compression (Maximum Size Reduction)',
    st3sub3p1: 'This setting provides maximum file size reduction (typically 60-80%) but may result in noticeable quality loss, especially in images. Text usually remains readable, but photos and graphics may appear slightly pixelated or compressed.',
    st3sub3p2strong: 'Best for:',
    st3sub3p2: ' Scanned documents, archives, or files where file size is more important than perfect image quality. Use this when you need to get a file under a strict size limit and quality loss is acceptable.',
    st3p2strong: 'Pro tip:',
    st3p2: " Start with low compression and work your way up if you need more size reduction. It's easier to compress more than to recover lost quality. Some tools also offer custom compression settings where you can fine-tune image quality, DPI reduction, and other parameters.",

    st4h: 'Step 4: Review Compression Settings (If Available)',
    st4p1: 'Advanced compression tools may offer additional settings you can adjust:',
    st4l1strong: 'Image quality:',
    st4l1: ' Adjust JPEG compression quality for embedded images (higher quality = larger file)',
    st4l2strong: 'DPI reduction:',
    st4l2: ' Lower the resolution of scanned images (e.g., from 300 DPI to 150 DPI)',
    st4l3strong: 'Font subsetting:',
    st4l3: ' Include only used characters from fonts to reduce size',
    st4l4strong: 'Remove metadata:',
    st4l4: ' Strip unnecessary metadata, annotations, or bookmarks',
    st4l5strong: 'Object compression:',
    st4l5: ' Compress PDF objects and streams',
    st4l6strong: 'Remove duplicate resources:',
    st4l6: ' Eliminate redundant images or fonts',
    st4p2: 'Most users can skip these advanced settings and rely on the compression level presets. However, if you need fine-grained control or have specific requirements, these options give you the flexibility to optimize compression for your exact needs.',

    st5h: 'Step 5: Click Compress and Wait for Processing',
    st5p1: 'Once you\'ve chosen your compression level, click the "Compress PDF" or "Reduce File Size" button. The tool will:',
    st5o1: 'Analyze your PDF structure and content',
    st5o2: 'Identify images, fonts, and other compressible elements',
    st5o3: 'Apply compression algorithms based on your selected level',
    st5o4: 'Optimize images, fonts, and PDF objects',
    st5o5: 'Rebuild the PDF with compressed content',
    st5o6: 'Generate your compressed PDF file',
    st5p2: 'Processing time depends on:',
    st5l1: 'Original file size (larger files take longer)',
    st5l2: 'Number of images (image-heavy PDFs require more processing)',
    st5l3: 'Compression level (higher compression takes slightly longer)',
    st5l4: "Your device's processing power",
    st5l5: 'Browser performance',
    st5p3: 'For typical compressions (10-25 MB files), this usually takes 10-30 seconds. Very large files (50+ MB) might take 1-2 minutes. You\'ll see a progress indicator during processing, and some tools show real-time compression statistics like "Compressing images..." or "Optimizing fonts..."',

    st6h: 'Step 6: Review Compression Results',
    st6p1: "When processing completes, you'll see the compression results displayed, typically showing:",
    st6l1: 'Original file size',
    st6l2: 'Compressed file size',
    st6l3: 'Size reduction percentage (e.g., "Reduced by 65%")',
    st6l4: 'Space saved (e.g., "Saved 12.5 MB")',
    st6l5: 'Option to preview the compressed PDF',
    st6p2strong: 'Important:',
    st6p2: " Take a moment to review the results. If the compression isn't sufficient, you can try a higher compression level. If quality loss is too noticeable, try a lower compression level. Some tools allow you to adjust settings and re-compress without re-uploading the original file.",
    st6p3: 'If your tool offers a preview feature, use it to check image quality, text readability, and overall document appearance before downloading. This helps ensure the compressed file meets your quality standards.',

    st7h: 'Step 7: Download Your Compressed PDF',
    st7p1: 'If you\'re satisfied with the compression results, click the download button to save the compressed PDF to your device. The file will typically have a name like "compressed.pdf" or "original-name-compressed.pdf" by default, but you can rename it to something more descriptive.',
    st7p2strong: 'Important:',
    st7p2: " Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your compressed PDF before closing the page. Also, keep your original file until you've verified the compressed version meets your needs.",
    st7p3: "That's it! You've successfully compressed your PDF file. The entire process typically takes less than two minutes from start to finish, and you've reduced your file size significantly while maintaining quality. If you need to compress multiple files, many tools allow you to process them one after another, or some offer batch compression for multiple files at once.",

    s5h: 'Benefits of Using Online PDF Compression Tools',
    s5p1: 'Why choose an online PDF compression tool over desktop software or manual methods? Here are the key advantages that make browser-based compression the preferred choice for most users:',
    b1h: '1. Zero Installation Required',
    b1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start compressing. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to compress PDFs on the go. No IT department approval needed, no software conflicts, no version compatibility issues.",
    b2h: '2. Privacy and Security',
    b2p1: 'When you use a privacy-first PDF compression tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    b2l1: 'Confidential business documents and contracts',
    b2l2: 'Personal financial information and tax documents',
    b2l3: 'Legal documents and sensitive correspondence',
    b2l4: 'Medical records and health information',
    b2l5: 'Intellectual property and proprietary content',
    b2l6: "Any sensitive data that shouldn't be uploaded to external servers",
    b2p2: 'Unlike cloud-based tools that upload your files to servers (where they might be stored, analyzed, or accessed), client-side processing keeps everything on your machine where you control it. This privacy-first approach is essential for professionals handling sensitive information.',
    b3h: '3. Cost-Effective Solution',
    b3p1: 'Most online PDF compression tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF compression, free online tools provide excellent value without any financial commitment. Some tools offer premium features for power users, but basic compression is typically free and sufficient for most needs.',
    b4h: '4. Multiple Compression Levels',
    b4p1: 'Unlike desktop software that might only offer one compression method, online tools often provide multiple compression levels (low, medium, high) and sometimes custom settings. This flexibility means you can choose the right balance between file size and quality for each specific document, rather than being stuck with a one-size-fits-all approach.',
    b5h: '5. Cross-Platform Compatibility',
    b5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF compressors work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely—if you can access a website, you can compress PDFs.",
    b6h: '6. Always Up-to-Date',
    b6p1: 'Online tools are automatically updated by their developers. You always get the latest compression algorithms, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility. This means you benefit from ongoing improvements to compression efficiency and quality preservation.',
    b7h: '7. Speed and Efficiency',
    b7p1: 'Modern browser-based PDF compression is surprisingly fast. You can compress PDFs in seconds, compared to:',
    b7l1: 'Desktop software that requires launching and navigating complex interfaces',
    b7l2: 'Manual image optimization workflows (time-consuming and error-prone)',
    b7l3: "Print-to-PDF methods that don't actually reduce file size effectively",
    b7l4: 'Cloud services that require upload and download time',
    b7p2: "The streamlined interface of online tools means less time clicking through menus and more time getting work done. Plus, since processing happens locally, there's no network latency from uploading and downloading files.",
    b8h: '8. Instant Results and Feedback',
    b8p1: 'Online compression tools provide immediate feedback on compression results. You can see exactly how much file size was reduced, preview the compressed file, and adjust settings if needed—all without leaving the page. This instant feedback helps you find the optimal compression level for each document quickly.',
    b9h: '9. No Storage Concerns',
    b9p1: "Since processing happens in your browser, you don't need to worry about cloud storage limits, account quotas, or file retention policies. Everything processes locally, and you download the result directly to your device. Your files aren't stored on external servers, and you don't consume cloud storage space.",
    b10h: '10. Easy Integration into Workflows',
    b10p1: "Online compression tools fit seamlessly into existing workflows. You can compress a PDF right before emailing it, uploading it to a portal, or sharing it via cloud storage. There's no need to switch to a different application or learn new software—just open a browser tab and compress. This convenience makes compression a natural part of document management rather than a separate, time-consuming task.",

    s6h: 'Comparison: Online PDF Compressors vs. Other Tools',
    s6p1: "How do online PDF compression tools stack up against alternatives? Let's break down the comparison to help you understand when each option makes sense:",
    c1h: 'Online PDF Compressors vs. Desktop Software',
    c1p1strong: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    c1al1: '✅ More advanced features (editing, form filling, OCR, etc.)',
    c1al2: '✅ Works offline after initial installation',
    c1al3: '✅ Better for very large files (100+ MB) and batch processing',
    c1al4: '✅ More compression customization options',
    c1al5: '❌ Requires installation and regular updates',
    c1al6: '❌ Often expensive ($100-300+ or subscription fees)',
    c1al7: '❌ Platform-specific (Windows or Mac, rarely both)',
    c1al8: '❌ Takes up disk space',
    c1al9: '❌ May require IT approval in corporate environments',
    c1p2strong: 'Online PDF Compressors:',
    c1bl1: '✅ Free to use',
    c1bl2: '✅ No installation required',
    c1bl3: '✅ Works on any platform',
    c1bl4: '✅ Always up-to-date',
    c1bl5: '✅ Privacy-first (client-side processing)',
    c1bl6: '✅ Multiple compression levels in one tool',
    c1bl7: '✅ Instant access from any device',
    c1bl8: '❌ Requires internet connection (for initial page load)',
    c1bl9: '❌ May struggle with extremely large files (100+ MB)',
    c1bl10: '❌ Fewer advanced features (but sufficient for compression)',
    c1p3strong: 'Verdict:',
    c1p3: ' For PDF compression specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just compression, regularly work with very large files, or need offline access. For most users compressing files for email or sharing, online tools are the superior choice.',
    c2h: 'Online PDF Compressors vs. Cloud-Based Services',
    c2p1strong: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    c2al1: '✅ Integrated with cloud storage',
    c2al2: '✅ Can access files from anywhere',
    c2al3: '✅ Often free with cloud storage accounts',
    c2al4: '✅ Can compress files already in cloud storage',
    c2al5: '❌ Files uploaded to servers (privacy concern)',
    c2al6: '❌ Requires account creation',
    c2al7: '❌ Storage limits apply',
    c2al8: '❌ Files may be retained on servers',
    c2al9: '❌ Slower processing (upload/download time)',
    c2al10: '❌ Limited compression options',
    c2al11: '❌ May have file size limits for free accounts',
    c2p2strong: 'Client-Side Online Compressors:',
    c2bl1: '✅ No file uploads (privacy-first)',
    c2bl2: '✅ No account required',
    c2bl3: '✅ Faster processing (no upload/download)',
    c2bl4: '✅ No storage limits',
    c2bl5: '✅ Files never leave your device',
    c2bl6: '✅ Multiple compression levels',
    c2bl7: '✅ Instant results',
    c2bl8: "❌ Can't access files from cloud storage directly",
    c2bl9: '❌ Requires downloading files from cloud first',
    c2p3strong: 'Verdict:',
    c2p3: ' For privacy-conscious users, client-side online compressors are superior. Cloud services are better if you need to compress files already stored in cloud storage and don\'t mind the privacy trade-off. However, you can always download files from cloud storage, compress them locally, and re-upload if needed.',
    c3h: 'Online PDF Compressors vs. Manual Methods',
    c3p1: 'Some people try to reduce PDF file size manually using methods like:',
    c3l1: 'Re-saving PDFs at lower quality (time-consuming, inconsistent results)',
    c3l2: 'Extracting and re-compressing images manually (extremely time-consuming)',
    c3l3: "Printing to PDF with lower settings (often doesn't reduce size effectively)",
    c3l4: 'Using freeware with ads and malware risks',
    c3l5: 'Converting to images and back (significant quality loss)',
    c3p2strong: 'Verdict:',
    c3p2: " Online PDF compressors are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper compression tools are available for free. Manual methods waste time and often produce inferior results.",
    c4h: 'Online PDF Compressors vs. Built-in Tools',
    c4p1: 'Some applications have built-in PDF compression features:',
    c4l1: '✅ Integrated into existing workflow',
    c4l2: '✅ No need to use separate tool',
    c4l3: '❌ Often limited compression options',
    c4l4: '❌ May not be as effective as dedicated tools',
    c4l5: '❌ Only available in specific applications',
    c4l6: '❌ May require paid software licenses',
    c4p2strong: 'Verdict:',
    c4p2: " Built-in tools are convenient if you're already using the application, but dedicated online compressors typically offer better compression ratios, more options, and work with any PDF regardless of source. For best results, use a dedicated compression tool.",

    faqVisibleH: 'Frequently Asked Questions About Compressing PDFs',
    fv1q: 'How do I compress a PDF file online for free?',
    fv1a_a: 'You can compress a PDF file online for free by using our ',
    fv1a_link: 'PDF compression tool',
    fv1a_b: '. Simply upload your PDF file, choose your compression level (low, medium, or high), and click compress. The tool reduces your PDF file size while maintaining quality, and you can download the compressed file instantly. No account creation, payment, or software installation required. The entire process takes just seconds.',
    fv2q: 'Is it safe to compress PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF compression tool that processes files locally in your browser, your documents never leave your device. All compression happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them. This is especially important for confidential business documents, personal information, or any sensitive content.',
    fv3q: 'Will compressing a PDF reduce quality?',
    fv3a: 'It depends on the compression level you choose. Low compression maintains near-original quality with moderate size reduction (20-40%), making it ideal for professional documents. Medium compression offers a good balance between file size (40-60% reduction) and quality, with minimal noticeable differences. High compression significantly reduces file size (60-80%) but may slightly reduce image quality, though text usually remains perfectly readable. Most tools allow you to preview the result before downloading, so you can check quality and adjust settings if needed. For most use cases, low or medium compression provides excellent results without noticeable quality loss.',
    fv4q: 'What is the maximum file size for compressing PDFs online?',
    fv4a_a: 'File size limits vary by tool, but most online PDF compressors support files up to 25-50 MB. For best performance, keep files under 25 MB. Very large files (100+ MB) may cause browser performance issues, timeouts, or memory errors. If you need to compress very large PDFs, consider splitting them first using a ',
    fv4a_link1: 'PDF splitter tool',
    fv4a_b: ', compressing each part separately, then merging them back together with a ',
    fv4a_link2: 'PDF merger tool',
    fv4a_c: '. Alternatively, use desktop software designed for heavy-duty processing of very large files.',
    fv5q: 'Do I need to create an account to compress PDF files?',
    fv5a: 'No, many free PDF compression tools work without requiring account creation or registration. You can upload, compress, and download your reduced PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving compression history, accessing premium features, or batch processing, but basic PDF compression is typically available without any registration. This no-signup approach is one of the key advantages of online compression tools.',
    fv6q: 'How much can I reduce PDF file size?',
    fv6a: "PDF file size reduction depends on the original file content and compression level. Scanned documents and image-heavy PDFs can often be reduced by 50-80% because images compress well. Text-based PDFs typically see 20-40% reduction since text is already efficiently encoded. Mixed-content PDFs (text with some images) usually achieve 30-60% reduction. The compression level you choose also affects the final size: low compression provides 20-40% reduction, medium provides 40-60%, and high provides 60-80%. Your specific results will vary based on the original file's content and structure.",
    fv7q: 'Can I compress password-protected PDFs?',
    fv7a_a: 'Most online PDF compressors cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a ',
    fv7a_link: 'PDF editing tool',
    fv7a_b: ' or the software that created the protection, then compress the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password during compression, but this is less common in online tools due to security considerations.',
    fv8q: 'What compression methods are used for PDFs?',
    fv8a: 'PDF compression typically uses multiple methods: image compression (JPEG, JPEG2000) to reduce image file sizes, font subsetting to include only used characters, object compression to compress PDF objects and streams, metadata removal to strip unnecessary information, duplicate resource elimination to remove redundant images or fonts, and structure optimization to streamline the PDF\'s internal organization. Advanced tools may also reduce image DPI, optimize color spaces, and remove unused resources. These methods work together to reduce file size while maintaining document quality and functionality.',
    fv9q: 'Can I compress multiple PDF files at once?',
    fv9a: "This depends on the tool you're using. Some online PDF compressors support batch compression, allowing you to upload and compress multiple files simultaneously. Others require compressing files one at a time. Batch compression is convenient when you have many files to compress, but it may be slower and more resource-intensive. For best results with batch compression, keep individual files under 10 MB and limit batches to 5-10 files at a time to avoid browser performance issues.",
    fv10q: 'Will compressed PDFs still be searchable?',
    fv10a: "Yes, properly compressed PDFs maintain text searchability. Compression algorithms optimize images and structure but preserve text content and searchable text layers. However, if your PDF contains only scanned images (no text layer), compression won't make it searchable—you would need OCR (Optical Character Recognition) for that. For text-based or mixed-content PDFs, compression maintains full searchability while reducing file size.",
    fv11q: "Can I undo compression if I'm not happy with the results?",
    fv11a: 'You can\'t "undo" compression in the traditional sense, but since compression creates a new file, your original PDF remains unchanged on your device. You can simply compress the original file again with different settings if you\'re not satisfied with the results. This is why it\'s important to keep your original file until you\'ve verified the compressed version meets your needs. Some tools keep your file available for a few minutes after compression, allowing quick re-compression with adjusted settings.',
    fv12q: 'Can I compress PDFs on mobile devices?',
    fv12a: 'Yes, many online PDF compression tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large compressions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and use low or medium compression levels. The interface may also be optimized differently for touch screens, but core functionality should work. Some mobile-specific PDF apps also offer compression features.',
    fv13q: 'How do I know which compression level to choose?',
    fv13a: 'Start with low compression for most documents—it provides good size reduction with minimal quality loss. Use medium compression when you need more size reduction and can accept slight quality trade-offs. Choose high compression only when file size is more important than perfect image quality, such as for archives or when you need to get under a strict size limit. Many tools show estimated size reduction before compression, which can help you decide. You can always try a level and re-compress with different settings if needed.',

    s7h: 'Conclusion: Making PDF Compression Simple',
    s7p1: "Compressing PDF files doesn't have to be complicated. With modern online PDF compression tools, reducing file size is straightforward, fast, and secure. Whether you're a business professional trying to email large reports, a student submitting assignments, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s7p2: 'The key advantages of online PDF compressors—no installation, privacy-first processing, free access, multiple compression levels, and cross-platform compatibility—make them the ideal solution for most compression needs. While desktop software has its place for advanced PDF editing tasks or very large files, simple compression is perfectly handled by browser-based tools.',
    s7p3: 'Remember these best practices:',
    s7l1: "Start with low compression and increase if needed—it's easier to compress more than recover quality",
    s7l2: 'Keep individual files under 25 MB for best performance',
    s7l3: 'Use privacy-first tools that process files locally',
    s7l4: 'Preview compressed files before finalizing important documents',
    s7l5: "Keep backups of original files until you're satisfied with compression results",
    s7l6: 'Choose compression level based on your quality requirements',
    s7l7: 'For very large files, consider splitting first, compressing parts, then merging',
    s7p4a: 'Ready to compress your PDFs? Try our ',
    s7p4link1: 'free PDF compression tool',
    s7p4b: ' and experience how simple reducing file sizes can be. And if you need to make edits to your PDFs before or after compression, check out our ',
    s7p4link2: 'PDF editing tool',
    s7p4c: ' for adding text, images, and annotations. For documents that need to be divided, our ',
    s7p4link3: 'PDF splitter tool',
    s7p4d: ' makes it easy to break large files into smaller pieces. And if you need to combine multiple PDFs, our ',
    s7p4link4: 'PDF merger tool',
    s7p4e: ' helps you merge documents efficiently.',
    s7p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle file compression quickly and confidently, ensuring your documents are the right size for sharing while maintaining the quality you need. Whether you're compressing for email, storage, or sharing, online compression tools make the process simple and secure.",

    relMergeTitle: 'How to Merge PDF Files Online',
    relMergeDesc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    relSplitTitle: 'How to Split PDF Files Online',
    relSplitDesc: 'Complete guide to dividing large PDF documents into smaller files online.',
    relEditTitle: 'How to Edit a PDF Online',
    relEditDesc: 'Complete guide to editing PDF files online without installing software.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I compress a PDF file online for free?',
    fq1a: 'You can compress a PDF file online for free by using our PDF compression tool. Simply upload your PDF file, choose your compression level (low, medium, or high), and click compress. The tool reduces your PDF file size while maintaining quality, and you can download the compressed file instantly.',
    fq2q: 'Is it safe to compress PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF compression tool that processes files locally in your browser, your documents never leave your device. All compression happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Will compressing a PDF reduce quality?',
    fq3a: 'It depends on the compression level you choose. Low compression maintains near-original quality with moderate size reduction. Medium compression offers a good balance between file size and quality. High compression significantly reduces file size but may slightly reduce image quality. Most tools allow you to preview the result before downloading.',
    fq4q: 'What is the maximum file size for compressing PDFs online?',
    fq4a: 'File size limits vary by tool, but most online PDF compressors support files up to 25-50 MB. For best performance, keep files under 25 MB. Very large files (100+ MB) may cause browser performance issues or timeouts.',
    fq5q: 'Do I need to create an account to compress PDF files?',
    fq5a: 'No, many free PDF compression tools work without requiring account creation or registration. You can upload, compress, and download your reduced PDF files immediately without signing up.',
    fq6q: 'How much can I reduce PDF file size?',
    fq6a: 'PDF file size reduction depends on the original file content. Scanned documents and image-heavy PDFs can often be reduced by 50-80%. Text-based PDFs typically see 20-40% reduction. The compression level you choose also affects the final size reduction.',
    fq7q: 'Can I compress password-protected PDFs?',
    fq7a: 'Most online PDF compressors cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool, then compress the unlocked files.',
    fq8q: 'What compression methods are used for PDFs?',
    fq8a: 'PDF compression typically uses methods like image compression (JPEG, JPEG2000), font subsetting, object compression, and removing unnecessary metadata. Advanced tools may also optimize the PDF structure and remove redundant content.',
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
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.ogImageAlt }],
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
                <li><strong className="text-white">{c.s1l1strong}</strong>{c.s1l1}</li>
                <li><strong className="text-white">{c.s1l2strong}</strong>{c.s1l2}</li>
                <li><strong className="text-white">{c.s1l3strong}</strong>{c.s1l3}</li>
                <li><strong className="text-white">{c.s1l4strong}</strong>{c.s1l4}</li>
                <li><strong className="text-white">{c.s1l5strong}</strong>{c.s1l5}</li>
                <li><strong className="text-white">{c.s1l6strong}</strong>{c.s1l6}</li>
                <li><strong className="text-white">{c.s1l7strong}</strong>{c.s1l7}</li>
                <li><strong className="text-white">{c.s1l8strong}</strong>{c.s1l8}</li>
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
                <li><strong className="text-white">{c.s2l1strong}</strong>{c.s2l1}</li>
                <li><strong className="text-white">{c.s2l2strong}</strong>{c.s2l2}</li>
                <li><strong className="text-white">{c.s2l3strong}</strong>{c.s2l3}</li>
                <li><strong className="text-white">{c.s2l4strong}</strong>{c.s2l4}</li>
                <li><strong className="text-white">{c.s2l5strong}</strong>{c.s2l5}</li>
                <li><strong className="text-white">{c.s2l6strong}</strong>{c.s2l6}</li>
                <li><strong className="text-white">{c.s2l7strong}</strong>{c.s2l7}</li>
                <li><strong className="text-white">{c.s2l8strong}</strong>{c.s2l8}</li>
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
                <li><strong className="text-white">{c.s3l1strong}</strong>{c.s3l1}</li>
                <li><strong className="text-white">{c.s3l2strong}</strong>{c.s3l2}</li>
                <li><strong className="text-white">{c.s3l3strong}</strong>{c.s3l3}</li>
                <li><strong className="text-white">{c.s3l4strong}</strong>{c.s3l4}</li>
                <li><strong className="text-white">{c.s3l5strong}</strong>{c.s3l5}</li>
                <li><strong className="text-white">{c.s3l6strong}</strong>{c.s3l6}</li>
                <li><strong className="text-white">{c.s3l7strong}</strong>{c.s3l7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st1p1a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.st1p1link}</Link>{c.st1p1b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st2l1}</li>
                  <li>{c.st2l2}</li>
                  <li>{c.st2l3}</li>
                  <li>{c.st2l4a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.st2l4link}</Link>{c.st2l4b}</li>
                  <li>{c.st2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st2p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st2m1}</li>
                  <li>{c.st2m2}</li>
                  <li>{c.st2m3}</li>
                  <li>{c.st2m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st2p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st3p1}
                </p>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3sub1h}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3sub1p1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3sub1p2strong}</strong>{c.st3sub1p2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3sub2h}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3sub2p1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3sub2p2strong}</strong>{c.st3sub2p2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3sub3h}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3sub3p1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3sub3p2strong}</strong>{c.st3sub3p2}
                  </p>
                </div>

                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st3p2strong}</strong>{c.st3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st4l1strong}</strong>{c.st4l1}</li>
                  <li><strong className="text-white">{c.st4l2strong}</strong>{c.st4l2}</li>
                  <li><strong className="text-white">{c.st4l3strong}</strong>{c.st4l3}</li>
                  <li><strong className="text-white">{c.st4l4strong}</strong>{c.st4l4}</li>
                  <li><strong className="text-white">{c.st4l5strong}</strong>{c.st4l5}</li>
                  <li><strong className="text-white">{c.st4l6strong}</strong>{c.st4l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st4p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st5p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st5o1}</li>
                  <li>{c.st5o2}</li>
                  <li>{c.st5o3}</li>
                  <li>{c.st5o4}</li>
                  <li>{c.st5o5}</li>
                  <li>{c.st5o6}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st5p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st5l1}</li>
                  <li>{c.st5l2}</li>
                  <li>{c.st5l3}</li>
                  <li>{c.st5l4}</li>
                  <li>{c.st5l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st5p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st6l1}</li>
                  <li>{c.st6l2}</li>
                  <li>{c.st6l3}</li>
                  <li>{c.st6l4}</li>
                  <li>{c.st6l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st6p2strong}</strong>{c.st6p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.st6p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st7p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st7p2strong}</strong>{c.st7p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.st7p3}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b1h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b1p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.b2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.b2l1}</li>
                  <li>{c.b2l2}</li>
                  <li>{c.b2l3}</li>
                  <li>{c.b2l4}</li>
                  <li>{c.b2l5}</li>
                  <li>{c.b2l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.b2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b3h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b3p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b4p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b5p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b6p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.b7p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.b7l1}</li>
                  <li>{c.b7l2}</li>
                  <li>{c.b7l3}</li>
                  <li>{c.b7l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.b7p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b8p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b9h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b9p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b10h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b10p1}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.c1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c1p1strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c1al1}</li>
                  <li>{c.c1al2}</li>
                  <li>{c.c1al3}</li>
                  <li>{c.c1al4}</li>
                  <li>{c.c1al5}</li>
                  <li>{c.c1al6}</li>
                  <li>{c.c1al7}</li>
                  <li>{c.c1al8}</li>
                  <li>{c.c1al9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c1p2strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c1bl1}</li>
                  <li>{c.c1bl2}</li>
                  <li>{c.c1bl3}</li>
                  <li>{c.c1bl4}</li>
                  <li>{c.c1bl5}</li>
                  <li>{c.c1bl6}</li>
                  <li>{c.c1bl7}</li>
                  <li>{c.c1bl8}</li>
                  <li>{c.c1bl9}</li>
                  <li>{c.c1bl10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c1p3strong}</strong>{c.c1p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c2p1strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c2al1}</li>
                  <li>{c.c2al2}</li>
                  <li>{c.c2al3}</li>
                  <li>{c.c2al4}</li>
                  <li>{c.c2al5}</li>
                  <li>{c.c2al6}</li>
                  <li>{c.c2al7}</li>
                  <li>{c.c2al8}</li>
                  <li>{c.c2al9}</li>
                  <li>{c.c2al10}</li>
                  <li>{c.c2al11}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c2p2strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c2bl1}</li>
                  <li>{c.c2bl2}</li>
                  <li>{c.c2bl3}</li>
                  <li>{c.c2bl4}</li>
                  <li>{c.c2bl5}</li>
                  <li>{c.c2bl6}</li>
                  <li>{c.c2bl7}</li>
                  <li>{c.c2bl8}</li>
                  <li>{c.c2bl9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c2p3strong}</strong>{c.c2p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.c3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.c3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c3l1}</li>
                  <li>{c.c3l2}</li>
                  <li>{c.c3l3}</li>
                  <li>{c.c3l4}</li>
                  <li>{c.c3l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c3p2strong}</strong>{c.c3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.c4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.c4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c4l1}</li>
                  <li>{c.c4l2}</li>
                  <li>{c.c4l3}</li>
                  <li>{c.c4l4}</li>
                  <li>{c.c4l5}</li>
                  <li>{c.c4l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c4p2strong}</strong>{c.c4p2}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqVisibleH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a_a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1a_link}</Link>{c.fv1a_b}
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
                    {c.fv4a_a}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4a_link1}</Link>{c.fv4a_b}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4a_link2}</Link>{c.fv4a_c}
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
                    {c.fv7a_a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv7a_link}</Link>{c.fv7a_b}
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
                <li>{c.s7l7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s7p4a}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link1}</Link>{c.s7p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link2}</Link>{c.s7p4c}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link3}</Link>{c.s7p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s7p4link4}</Link>{c.s7p4e}
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
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relSplitTitle}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relSplitDesc}
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

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './how-to-compress-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
