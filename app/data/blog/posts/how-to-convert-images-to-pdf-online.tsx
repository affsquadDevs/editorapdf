import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-convert-images-to-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Convert Images to PDF Online_ Complete Guide to Image to PDF Conversion.png'
const ogImage = '/images/blog/how-to-convert-images-to-pdf-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Convert Images to PDF Online (Step-by-Step Guide)',
    metaDesc: 'Convert JPG and PNG images to PDF instantly. Combine photos into one PDF document and download securely — no installation required.',
    ogTitle: 'How to Convert Images to PDF Online (Step-by-Step Guide)',
    ogDesc: 'Convert JPG and PNG images to PDF instantly. Combine photos into one PDF document and download securely — no installation required.',
    twTitle: 'How to Convert Images to PDF Online (Step-by-Step Guide)',
    twDesc: 'Convert JPG and PNG images to PDF instantly. Combine photos into one PDF document and download securely — no installation required.',
    heroAlt: 'Banner showing image file converting into a PDF document with a convert to PDF button',
    imgAlt: 'How to convert images to PDF online - Free image to PDF converter guide',

    bcLeaf: 'How to Convert Images to PDF Online',
    heroTitle: 'How to Convert Images to PDF Online: Complete Guide to Image to PDF Conversion',
    heroSubtitle: 'Learn how to combine multiple JPG, PNG, or WebP images into a single PDF document using free online tools. No software installation required.',

    artHeadline: 'How to Convert Images to PDF Online - Complete Guide to Image to PDF Conversion',
    artDesc: 'Complete guide on how to convert images to PDF online. Learn to combine multiple JPG, PNG, or WebP images into a single PDF document using free online tools. Step-by-step instructions, tips, and best practices for image to PDF conversion.',

    intro1: "You've got a collection of photos from your phone, scanned documents, or screenshots that need to become a single, shareable PDF document. Maybe it's a portfolio of design work, a series of scanned receipts for expense reports, or photos from a recent event that you want to compile into one file. Whatever the reason, converting images to PDF is one of those everyday tasks that seems simple but can quickly become frustrating if you don't know the right approach.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online image to PDF converter tools make combining multiple images into a single PDF document as straightforward as uploading files and clicking a button. This comprehensive guide will walk you through everything you need to know about converting images to PDF online, from choosing the right tool to handling different image formats and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Converting Images to PDF Can Be Challenging',
    s1p1: "At first glance, converting images to PDF sounds like it should be simple. After all, you're just combining pictures into a document, right? But the reality is more complex. Different image formats, varying file sizes, quality preservation concerns, and the need to maintain proper page order all contribute to making this task more complicated than it appears.",
    s1p2: "Here's what makes image to PDF conversion challenging:",
    s1l1Strong: 'Format compatibility issues:',
    s1l1: ' Not all tools support every image format (JPG, PNG, WebP, GIF, BMP, HEIC, TIFF, etc.)',
    s1l2Strong: 'Quality preservation:',
    s1l2: ' Poor conversion methods can compress or degrade image quality, making text unreadable or photos look pixelated',
    s1l3Strong: 'File size management:',
    s1l3: ' Large images can create massive PDF files that are difficult to share or email',
    s1l4Strong: 'Page ordering complexity:',
    s1l4: ' When combining multiple images, getting them in the right sequence requires careful planning',
    s1l5Strong: 'Orientation problems:',
    s1l5: ' Images may be rotated incorrectly, requiring manual adjustment',
    s1l6Strong: 'Security concerns:',
    s1l6: ' Uploading personal photos or sensitive documents to unknown servers raises privacy questions',
    s1l7Strong: 'Software bloat:',
    s1l7: ' Desktop image to PDF converters often require installation, updates, and sometimes payment',
    s1l8Strong: 'Mobile limitations:',
    s1l8: ' Converting images on phones or tablets can be slow or limited by device capabilities',
    s1p3: 'These pain points are exactly why online image to PDF converter tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure. The best tools handle format conversion, quality preservation, and file management automatically, so you can focus on what matters—getting your images into a PDF format that works for your needs.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think converting images to PDF is a niche task, but it's actually something millions of people need to do regularly across countless scenarios. Consider these everyday situations where image to PDF conversion is essential:",
    s2l1Strong: 'Business professionals',
    s2l1: ' converting scanned documents, receipts, or invoices into PDFs for record-keeping and expense reports',
    s2l2Strong: 'Students',
    s2l2: ' combining photos of handwritten notes, textbook pages, or assignment submissions into organized PDF documents',
    s2l3Strong: 'Photographers and designers',
    s2l3: ' creating portfolios by combining multiple images into a single, professional PDF showcase',
    s2l4Strong: 'Real estate agents',
    s2l4: ' compiling property photos, floor plans, and inspection reports into comprehensive PDF packages',
    s2l5Strong: 'Healthcare workers',
    s2l5: ' converting medical images, X-rays, or patient photos into PDF records for documentation',
    s2l6Strong: 'Legal professionals',
    s2l6: ' combining evidence photos, document scans, and case materials into organized PDF files',
    s2l7Strong: 'Content creators',
    s2l7: ' creating PDF guides, tutorials, or ebooks by combining screenshots, diagrams, and photos',
    s2l8Strong: 'Archivists and librarians',
    s2l8: ' digitizing collections by converting scanned images into searchable PDF archives',
    s2l9Strong: 'Event organizers',
    s2l9: ' compiling event photos, schedules, and materials into shareable PDF packages',
    s2l10Strong: 'Remote workers',
    s2l10: ' converting whiteboard photos, meeting notes, or document photos into professional PDFs for sharing',
    s2p2: "The time wasted on manual image management adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations, use outdated methods, or struggle with incompatible formats. More importantly, the wrong approach can lead to:",
    s2m1: 'Lost or corrupted images during conversion',
    s2m2: 'Privacy breaches from uploading sensitive photos to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor image quality in the final PDF that makes documents unusable',
    s2m5: 'File size issues that prevent email delivery or sharing',
    s2m6: 'Incorrect page ordering that requires starting over',
    s2m7: 'Format compatibility problems that block conversion entirely',
    s2p3: "That's why understanding how to convert images to PDF properly isn't just about convenience—it's about working efficiently and securely in a world where digital documents are the standard format for professional communication. Whether you're creating a portfolio, organizing receipts, or compiling research materials, the ability to quickly and reliably convert images to PDF is an essential skill.",

    s3h: 'The Solution: Modern Online Image to PDF Converter Tools',
    s3p1: 'The solution to image to PDF conversion headaches is simpler than you might expect. Modern web-based image to PDF converter tools handle all the technical complexity behind the scenes, giving you a clean interface to combine images into PDF documents in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based image processing and PDF generation technology that works entirely in your web browser. This means:',
    s3l1Strong: 'No installation required:',
    s3l1: ' Works on any device with a modern browser—Windows, Mac, Linux, iOS, Android',
    s3l2Strong: 'Privacy-first processing:',
    s3l2: ' Files stay on your device, never uploaded to servers, ensuring your photos and documents remain private',
    s3l3Strong: 'Instant results:',
    s3l3: ' Convert images to PDF in seconds, not minutes, even with multiple images',
    s3l4Strong: 'Free to use:',
    s3l4: ' No subscriptions, hidden fees, or premium paywalls for basic conversion',
    s3l5Strong: 'Multiple format support:',
    s3l5: ' Handles JPG, PNG, WebP, GIF, BMP, and often more formats automatically',
    s3l6Strong: 'Quality preservation:',
    s3l6: ' Maintains original image resolution and quality without unnecessary compression',
    s3l7Strong: 'Easy reordering:',
    s3l7: ' Drag-and-drop interface lets you arrange images in the perfect order before conversion',
    s3l8Strong: 'Batch processing:',
    s3l8: ' Convert multiple images into a single PDF in one operation',
    s3p3: "The best part? You don't need to understand how image to PDF conversion works technically. The tool handles format detection, image optimization, page creation, and PDF generation automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'image to PDF converter tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't. Whether you're converting a single photo or combining dozens of images, the process remains simple and reliable.",

    s4h: 'Step-by-Step Guide: How to Convert Images to PDF Using Our Tool',
    s4p1: "Ready to convert your images to PDF? Follow these detailed steps to combine multiple images into a single PDF document quickly and easily. We'll walk through the entire process from start to finish, covering everything you need to know.",

    st1h: 'Step 1: Access the Image to PDF Converter Tool',
    st1p1a: 'Navigate to our ',
    st1p1link: 'image to PDF converter page',
    st1p1b: ". You'll see a clean, intuitive interface with a file upload area prominently displayed. No account creation or login required—you can start converting immediately. The interface is designed to be self-explanatory, with clear instructions and visual cues to guide you through the process.",
    st1p2: "If you're on a mobile device, the interface automatically adapts to your screen size, making it easy to convert images even on the go. The tool works in any modern browser, so you don't need to worry about compatibility issues.",

    st2h: 'Step 2: Prepare Your Images',
    st2p1: "Before uploading, it's helpful to prepare your images. While the tool handles most preparation automatically, a little planning can make the process smoother:",
    st2l1Strong: 'Check image formats:',
    st2l1: ' The tool supports JPG, PNG, WebP, GIF, and BMP. If you have images in other formats (like HEIC from iPhones), you may need to convert them first or use a tool that supports those formats',
    st2l2Strong: 'Consider file sizes:',
    st2l2: ' While the tool can handle large images, very large files (over 10 MB each) may slow down processing. For best results, keep individual images under 5-10 MB',
    st2l3Strong: 'Verify image orientation:',
    st2l3: " Check that your images are rotated correctly. While some tools can auto-rotate, it's better to fix orientation issues beforehand",
    st2l4Strong: 'Organize your files:',
    st2l4: ' Think about the order you want images to appear in the PDF. While you can reorder them in the tool, having them organized beforehand saves time',
    st2l5Strong: 'Check image quality:',
    st2l5: ' Ensure your images are clear and readable, especially if they contain text. Low-resolution images may look pixelated in the final PDF',
    st2p2Strong: 'Pro tip:',
    st2p2: " If you're converting scanned documents, make sure they're scanned at a high enough resolution (at least 300 DPI) to ensure text remains readable in the PDF. For photos, most modern smartphone cameras produce images that work perfectly for PDF conversion.",

    st3h: 'Step 3: Upload Your Image Files',
    st3p1: 'Click the upload area or drag and drop your image files directly onto the page. The tool supports multiple upload methods:',
    st3l1Strong: 'Multiple file selection:',
    st3l1: ' Hold Ctrl (Windows) or Cmd (Mac) to select multiple images at once from your file picker',
    st3l2Strong: 'Drag and drop:',
    st3l2: ' Simply drag images from your file explorer or desktop directly onto the upload area',
    st3l3Strong: 'One-by-one upload:',
    st3l3: ' Add images individually if you prefer more control over the upload process',
    st3l4Strong: 'Mobile upload:',
    st3l4: ' On mobile devices, tap the upload area to access your photo gallery and select images',
    st3p2: 'The tool supports:',
    st3m1: 'Common formats: JPG, JPEG, PNG, WebP, GIF, BMP',
    st3m2: 'Files up to 25 MB each (for optimal performance)',
    st3m3: 'Any number of images (though we recommend keeping it under 50 for best results)',
    st3m4: 'Mixed formats in a single conversion (you can combine JPG and PNG images, for example)',
    st3p3: "As you add images, you'll see them appear in a preview list showing thumbnails, file names, and file sizes. This helps you keep track of what you're converting and makes it easy to identify any issues before processing.",

    st4h: 'Step 4: Arrange Images in Your Preferred Order',
    st4p1: 'This is where you control the final PDF structure. The order of images in your list determines the order of pages in your final PDF. You can rearrange images by:',
    st4l1Strong: 'Drag and drop:',
    st4l1: ' Click and drag images up or down in the list to reorder them',
    st4l2Strong: 'Arrow buttons:',
    st4l2: ' Some tools provide up/down arrow buttons for precise reordering',
    st4l3Strong: 'Remove and re-add:',
    st4l3: ' If needed, remove images and add them back in the correct sequence',
    st4p2Strong: 'Pro tip:',
    st4p2: ' Think about your final document structure before arranging. For example:',
    st4m1: 'If creating a portfolio, arrange images to tell a visual story or group similar work together',
    st4m2: 'For scanned documents, ensure pages are in sequential order (page 1, page 2, page 3, etc.)',
    st4m3: 'For receipts or invoices, you might want them in chronological order or grouped by category',
    st4m4: 'For photo albums, consider arranging by date, event, or theme',
    st4p3: 'You can also preview individual images by clicking on them if the tool supports preview functionality. This helps you verify image quality and orientation before conversion.',

    st5h: 'Step 5: Configure Conversion Settings (If Available)',
    st5p1: 'Some image to PDF converters offer additional settings to customize your conversion. While not all tools have these options, common settings include:',
    st5l1Strong: 'Page size:',
    st5l1: ' Choose between standard sizes (Letter, A4, Legal) or custom dimensions',
    st5l2Strong: 'Image fit:',
    st5l2: ' Options like "fit to page," "actual size," or "stretch to fill" control how images appear on PDF pages',
    st5l3Strong: 'Orientation:',
    st5l3: ' Set portrait or landscape orientation for all pages',
    st5l4Strong: 'Margins:',
    st5l4: ' Add or remove margins around images',
    st5l5Strong: 'Quality/compression:',
    st5l5: ' Balance between file size and image quality',
    st5l6Strong: 'Color mode:',
    st5l6: ' Choose between color, grayscale, or black and white',
    st5p2: 'If your tool offers these settings, take a moment to configure them based on your needs. For most use cases, default settings work perfectly, but customizing can help you achieve specific results. For example, if you\'re creating a PDF for printing, you might want to ensure images fit properly on standard page sizes. If file size is a concern, you might adjust compression settings.',

    st6h: 'Step 6: Review Your Selection',
    st6p1: 'Before converting, take a quick moment to verify everything looks correct:',
    st6m1: 'All images you want to include are in the list',
    st6m2: 'Images are in the correct order',
    st6m3: 'No unwanted images are included (you can remove them if needed)',
    st6m4: 'File sizes look reasonable (very large files might cause issues)',
    st6m5: 'Image thumbnails look correct (no obvious corruption or issues)',
    st6m6: 'Settings are configured as desired (if you changed any)',
    st6p2: "This quick check prevents having to start over if you realize something's wrong after conversion. It's much easier to fix issues now than to redo the entire process later.",

    st7h: 'Step 7: Click Convert and Wait for Processing',
    st7p1: 'Once everything looks good, click the "Create PDF," "Convert to PDF," or "Generate PDF" button. The tool will:',
    st7o1: 'Process each image file individually',
    st7o2: 'Convert images to PDF-compatible format if needed',
    st7o3: 'Create PDF pages from each image',
    st7o4: 'Combine all pages into a single PDF document',
    st7o5: 'Generate your final PDF file',
    st7p2: 'Processing time depends on several factors:',
    st7m1: 'Number of images being converted',
    st7m2: 'Total file size of all images',
    st7m3: 'Image resolution and complexity',
    st7m4: "Your device's processing power",
    st7m5: 'Browser performance and available memory',
    st7p3: "For typical conversions (5-10 images, 20-50 MB total), this usually takes just a few seconds. Larger conversions (20+ images, 100+ MB) might take 30-60 seconds. You'll see a progress indicator during processing, so you know the tool is working. The processing happens entirely in your browser, so your images never leave your device.",

    st8h: 'Step 8: Download Your PDF',
    st8p1: 'When processing completes, your PDF is ready. Click the download button to save it to your device. The file will typically have a name like "images.pdf" or "combined.pdf" by default, but you can rename it to something more descriptive after downloading.',
    st8p2Strong: 'Important:',
    st8p2: ' Since processing happens in your browser, your images never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your PDF before closing the page if you want to keep it.',
    st8p3: 'After downloading, you can:',
    st8m1: 'Open the PDF to verify it looks correct',
    st8m2: 'Share it via email, cloud storage, or messaging apps',
    st8m3: 'Print it if needed',
    st8m4a: 'Further edit it using a ',
    st8m4link: 'PDF editing tool',
    st8m4b: ' if you need to add text, annotations, or make other modifications',
    st8m5a: 'Combine it with other PDFs using a ',
    st8m5link: 'PDF merger tool',
    st8m5b: ' if needed',
    st8p4: "That's it! You've successfully converted your images to PDF. The entire process typically takes less than two minutes from start to finish, even with multiple images. The result is a professional, shareable PDF document that preserves your image quality and maintains the order you specified.",

    s5h: 'Benefits of Using Online Image to PDF Converter Tools',
    s5p1: 'Why choose an online image to PDF converter over desktop software or manual methods? Here are the key advantages that make online tools the preferred choice for most users:',

    b1h: '1. Zero Installation Required',
    b1p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start converting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to convert images on the go. You can access the tool from any device, anywhere, without worrying about software compatibility or installation issues.",

    b2h: '2. Privacy and Security',
    b2p1: 'When you use a privacy-first image to PDF converter that processes files locally in your browser, your images never leave your device. This is crucial when working with:',
    b2l1: 'Personal photos and family images',
    b2l2: 'Confidential business documents',
    b2l3: 'Scanned receipts with financial information',
    b2l4: 'Legal documents and evidence photos',
    b2l5: 'Medical records and patient information',
    b2l6: 'Any sensitive or private images',
    b2p2: "Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. Your images are processed entirely in your browser's memory and never transmitted over the internet, ensuring complete privacy.",

    b3h: '3. Cost-Effective Solution',
    b3p: 'Most online image to PDF converter tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular image to PDF conversion, free online tools provide excellent value without any financial commitment. You get professional-quality results without spending a dime.',

    b4h: '4. Cross-Platform Compatibility',
    b4p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online image to PDF converters work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely. You can start a conversion on your desktop, continue on your tablet, or finish on your phone—all using the same tool.",

    b5h: '5. Always Up-to-Date',
    b5p: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, format support improvements, and security enhancements without manually downloading updates or worrying about version compatibility. The tool you use today will be better tomorrow, without any effort on your part.',

    b6h: '6. Speed and Efficiency',
    b6p1: 'Modern browser-based image processing is surprisingly fast. You can convert multiple images to PDF in seconds, compared to:',
    b6l1: 'Manual methods like inserting images into Word and saving as PDF (time-consuming and quality-degrading)',
    b6l2: 'Desktop software that requires launching, navigating complex interfaces, and waiting for processing',
    b6l3: 'Print-to-PDF workflows that are slow and often produce poor results',
    b6l4: 'Email-based conversion services that require upload and download time',
    b6p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done. Batch processing capabilities let you convert dozens of images in a single operation, saving even more time.',

    b7h: '7. Multiple Format Support',
    b7p: "Online image to PDF converters typically support a wide range of image formats in a single tool. You can combine JPG, PNG, WebP, GIF, and BMP images all in one PDF without needing separate conversion steps. This flexibility means you don't need to worry about format compatibility—just upload your images and let the tool handle the rest.",

    b8h: '8. Easy Image Reordering',
    b8p: 'Most online tools provide intuitive drag-and-drop interfaces for reordering images before conversion. This visual approach is much easier than trying to rename files or use complex desktop software interfaces. You can see exactly how your PDF will look before you create it, making it easy to get the perfect arrangement.',

    b9h: '9. No Storage Concerns',
    b9p: "Since processing happens in your browser, you don't need to worry about cloud storage limits, account quotas, or file retention policies. Everything processes locally, and you download the result directly to your device. There are no storage fees, no account requirements, and no limits on how many conversions you can do.",

    b10h: '10. Quality Preservation',
    b10p: 'High-quality online image to PDF converters preserve your original image quality without unnecessary compression. Unlike some desktop tools that aggressively compress files, online tools can maintain the resolution and clarity of your original images, ensuring text remains readable and photos look sharp in the final PDF.',

    s6h: 'Comparison: Online Image to PDF Converters vs. Other Tools',
    s6p1: "How do online image to PDF converter tools stack up against alternatives? Let's break down the comparison to help you understand which solution is right for your needs:",

    c1h: 'Online Converters vs. Desktop Software',
    c1p1Strong: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    c1l1: '✅ More advanced features (editing, form filling, OCR, etc.)',
    c1l2: '✅ Works offline once installed',
    c1l3: '✅ Better for very large batches (100+ images)',
    c1l4: '✅ More customization options for advanced users',
    c1l5: '❌ Requires installation and updates',
    c1l6: '❌ Often expensive ($100-300+ or subscription fees)',
    c1l7: '❌ Platform-specific (Windows or Mac, rarely both)',
    c1l8: '❌ Takes up disk space',
    c1l9: '❌ May have learning curve for basic tasks',
    c1p2Strong: 'Online Image to PDF Converters:',
    c1m1: '✅ Free to use',
    c1m2: '✅ No installation required',
    c1m3: '✅ Works on any platform',
    c1m4: '✅ Always up-to-date',
    c1m5: '✅ Privacy-first (client-side processing)',
    c1m6: '✅ Simple, intuitive interface',
    c1m7: '✅ Accessible from any device',
    c1m8: '❌ Requires internet connection (for initial page load)',
    c1m9: '❌ May struggle with extremely large batches (100+ images)',
    c1m10: '❌ Fewer advanced features (but sufficient for basic conversion)',
    c1p3Strong: 'Verdict:',
    c1p3: ' For basic image to PDF conversion, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just conversion, or if you regularly work with very large batches of images.',

    c2h: 'Online Converters vs. Cloud-Based Services',
    c2p1Strong: 'Cloud-Based Services (Google Drive, Dropbox PDF tools, etc.):',
    c2l1: '✅ Integrated with cloud storage',
    c2l2: '✅ Can access files from anywhere',
    c2l3: '✅ Often free with cloud storage accounts',
    c2l4: '✅ Automatic backup of converted files',
    c2l5: '❌ Files uploaded to servers (privacy concern)',
    c2l6: '❌ Requires account creation',
    c2l7: '❌ Storage limits apply',
    c2l8: '❌ Files may be retained on servers',
    c2l9: '❌ Slower processing (upload/download time)',
    c2l10: '❌ Limited format support',
    c2l11: '❌ Less control over conversion settings',
    c2p2Strong: 'Client-Side Online Converters:',
    c2m1: '✅ No file uploads (privacy-first)',
    c2m2: '✅ No account required',
    c2m3: '✅ Faster processing (no upload/download)',
    c2m4: '✅ No storage limits',
    c2m5: '✅ Files never leave your device',
    c2m6: '✅ More format support',
    c2m7: '✅ Better control over conversion settings',
    c2m8: "❌ Can't access files from cloud storage directly",
    c2m9: '❌ No automatic cloud backup',
    c2p3Strong: 'Verdict:',
    c2p3: " For privacy-conscious users, client-side online converters are superior. Cloud services are better if you need to convert files already stored in cloud storage and don't mind the privacy trade-off, or if you want automatic backup of converted files.",

    c3h: 'Online Converters vs. Manual Methods',
    c3p1: 'Some people try to convert images to PDF manually using methods like:',
    c3l1: 'Inserting images into Word and saving as PDF (time-consuming, quality loss, formatting issues)',
    c3l2: 'Using "Print to PDF" from image viewers (slow, limited control, poor results)',
    c3l3: 'Using freeware with ads and malware risks',
    c3l4: 'Emailing images to conversion services (privacy risk, slow, inconvenient)',
    c3l5: 'Using mobile apps that require installation and may have limitations',
    c3p2Strong: 'Verdict:',
    c3p2: " Online image to PDF converters are faster, produce better quality results, preserve image quality, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free and work directly in your browser.",

    s7h: 'Frequently Asked Questions About Converting Images to PDF',

    s8h: 'Conclusion: Making Image to PDF Conversion Simple',
    s8p1: "Converting images to PDF doesn't have to be complicated. With modern online image to PDF converter tools, combining multiple JPG, PNG, or WebP images into a single PDF document is straightforward, fast, and secure. Whether you're a business professional compiling receipts, a student organizing notes, a photographer creating a portfolio, or anyone who regularly works with images, the right tool makes all the difference.",
    s8p2: 'The key advantages of online image to PDF converters—no installation, privacy-first processing, free access, multiple format support, and cross-platform compatibility—make them the ideal solution for most conversion needs. While desktop software has its place for advanced PDF editing tasks, simple image to PDF conversion is perfectly handled by browser-based tools that work anywhere, on any device.',
    s8p3: 'Remember these best practices for successful image to PDF conversion:',
    s8m1: 'Prepare your images beforehand—check formats, sizes, and orientation',
    s8m2: 'Keep individual images under 10 MB for best performance',
    s8m3: 'Use privacy-first tools that process files locally',
    s8m4: 'Arrange images in the correct order before converting',
    s8m5: 'Review your selection before clicking convert',
    s8m6: 'Download your PDF immediately after conversion',
    s8m7: "Keep backups of original images until you're satisfied with the PDF",
    s8m8: 'Use appropriate quality settings based on your needs (file size vs. quality)',
    s8p4a: 'Ready to convert your images to PDF? Try our ',
    s8p4link1: 'free image to PDF converter tool',
    s8p4b: ' and experience how simple combining images into PDF documents can be. And if you need to make edits to your PDF after conversion, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, annotations, and more. For large PDFs that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes while maintaining quality. And if you need to combine your converted PDF with other PDFs, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "Image to PDF conversion doesn't have to be a chore. With the right tools and approach, you can handle document conversion quickly and confidently, leaving more time for the work that actually matters. Whether you're creating portfolios, organizing documents, or compiling photos, online image to PDF converters provide the simplicity, security, and quality you need to get the job done right.",

    rel1Title: 'How to Merge PDF Files Online',
    rel1Desc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel2Title: 'How to Edit a PDF Online',
    rel2Desc: 'Complete guide to editing PDF files online without installing software.',

    // Visible FAQ (13)
    fv1q: 'How do I convert images to PDF online for free?',
    fv1a1: 'You can convert images to PDF online for free by using our ',
    fv1aLink: 'image to PDF converter tool',
    fv1a2: '. Simply upload your image files (JPG, PNG, WebP, GIF, or BMP), arrange them in your preferred order using drag-and-drop, and click create PDF. The tool combines all images into a single PDF document that you can download instantly. No account creation, payment, or software installation required. The entire process takes just seconds and happens entirely in your browser.',
    fv2q: 'Is it safe to convert images to PDF online?',
    fv2a: 'Yes, when using a privacy-first image to PDF converter that processes files locally in your browser, your images never leave your device. All conversion happens client-side using JavaScript, ensuring your photos and documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your images are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them. This is especially important when working with personal photos, sensitive documents, or confidential information.',
    fv3q: 'Can I combine multiple images into one PDF?',
    fv3a: 'Absolutely. Most online image to PDF converters allow you to combine multiple images into a single PDF document. You can upload multiple image files at once, arrange them in your preferred order using drag-and-drop, and the tool will create one PDF with all images as separate pages. This is perfect for creating photo albums, document collections, combining scanned pages, or compiling portfolios. There\'s typically no limit on the number of images you can combine, though very large batches (50+ images) may take longer to process.',
    fv4q: 'What image formats can I convert to PDF?',
    fv4a: 'Most online image to PDF converters support common image formats including JPG/JPEG, PNG, WebP, GIF, and BMP. Some tools also support TIFF, HEIC (iPhone photos), and other formats. The most widely supported formats are JPG and PNG, which work with virtually all image to PDF conversion tools. You can typically mix different formats in a single conversion—for example, combining JPG photos with PNG screenshots in one PDF. If you have images in less common formats, check the tool\'s supported formats list or consider converting those images to JPG or PNG first.',
    fv5q: 'What is the maximum file size for converting images to PDF online?',
    fv5a: 'File size limits vary by tool, but most online image to PDF converters support files up to 25-50 MB per image. For best performance, keep individual images under 10 MB and limit the total number of images to under 50. Very large images (100+ MB) or too many images may cause browser performance issues or timeouts. If you need to convert very large images, consider resizing them first or using desktop software designed for heavy-duty processing. The total size of all images combined also matters—keeping the total under 100-200 MB typically ensures smooth processing.',
    fv6q: 'Do I need to create an account to convert images to PDF?',
    fv6a: 'No, many free image to PDF converter tools work without requiring account creation or registration. You can upload, convert, and download your PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving conversion history, accessing premium features, or syncing across devices, but basic image to PDF conversion is typically available without any registration. The ability to use the tool anonymously is one of the key advantages of privacy-first online converters.',
    fv7q: 'Will converting images to PDF reduce image quality?',
    fv7a1: "Quality depends on the tool and settings you use. High-quality image to PDF converters preserve the original image quality without compression. However, some tools may compress images to reduce PDF file size. Look for tools that offer quality settings or explicitly state they preserve original image quality. For best results, use tools that maintain the original resolution and don't apply unnecessary compression. If file size is a concern, you can use a ",
    fv7aLink: 'PDF compression tool',
    fv7a2: ' after conversion to reduce size while maintaining acceptable quality. Generally, if your source images are high quality, the PDF will maintain that quality.',
    fv8q: 'Can I convert images to PDF on mobile devices?',
    fv8a: 'Yes, many online image to PDF converters work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large images or many images might be slower or fail. For best results on mobile, stick to smaller images (under 5 MB each) and fewer total images (under 20). The interface may also be optimized differently for touch screens, but core functionality should work. Mobile conversion is perfect for quick tasks like converting a few photos or combining scanned documents on the go.',
    fv9q: 'Can I reorder images after uploading them?',
    fv9a: "Yes, most online image to PDF converters allow you to reorder images after uploading. You can typically drag and drop images to rearrange them, use arrow buttons to move them up or down, or remove and re-add them in the correct order. This flexibility means you don't need to worry about uploading images in the perfect order initially—you can always adjust the arrangement before converting. The ability to easily reorder images is one of the key advantages of online tools over manual methods.",
    fv10q: 'What happens if my images have different sizes or orientations?',
    fv10a1: 'Most online image to PDF converters handle different image sizes and orientations automatically. Each image typically becomes a separate PDF page, maintaining its original dimensions and orientation. Some tools offer settings to standardize page sizes (like fitting all images to Letter or A4 size) or to auto-rotate images based on their orientation data. For best results, especially for professional documents, you may want to ensure images are oriented correctly before conversion, or use a tool that offers orientation correction features. Mixed orientations in a single PDF are usually fine and can be corrected later using a ',
    fv10aLink: 'PDF editing tool',
    fv10a2: ' if needed.',
    fv11q: 'Can I add text or annotations to the PDF after conversion?',
    fv11a1: 'Yes, after converting images to PDF, you can use a ',
    fv11aLink: 'PDF editing tool',
    fv11a2: ' to add text, annotations, shapes, watermarks, or other elements. Many online PDF editors allow you to add text overlays, highlight areas, draw shapes, or insert additional pages. This makes it easy to create professional documents by starting with image conversion and then adding text, labels, or other content as needed. The combination of image to PDF conversion followed by PDF editing gives you complete control over your final document.',
    fv12q: 'How do I convert HEIC images from my iPhone to PDF?',
    fv12a: 'HEIC (High Efficiency Image Container) is the default format for iPhone photos, but not all online converters support it directly. You have a few options: First, check if your chosen converter supports HEIC format. If not, you can convert HEIC to JPG first using your iPhone\'s Photos app (share the photo and choose "Save as JPG" or use a HEIC to JPG converter), then convert the JPG files to PDF. Alternatively, some online tools can handle HEIC files directly. Once converted to JPG or if your tool supports HEIC, the conversion to PDF works the same as with any other image format.',
    fv13q: 'Is there a limit to how many images I can convert at once?',
    fv13a: "There's no hard limit on the number of images you can convert, but practical limits exist based on your device's capabilities and browser performance. Most online tools handle 20-50 images comfortably. Very large batches (100+ images) may cause browser slowdowns, memory issues, or timeouts. If you need to convert many images, consider splitting the conversion into multiple batches or using desktop software optimized for large batch processing. The total file size of all images combined also matters—keeping the total under 100-200 MB typically ensures smooth processing.",

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I convert images to PDF online for free?',
    fq1a: 'You can convert images to PDF online for free by using our image to PDF converter tool. Simply upload your image files (JPG, PNG, WebP, GIF, or BMP), arrange them in your preferred order, and click create PDF. The tool combines all images into a single PDF document that you can download instantly. No account creation, payment, or software installation required.',
    fq2q: 'Is it safe to convert images to PDF online?',
    fq2a: 'Yes, when using a privacy-first image to PDF converter that processes files locally in your browser, your images never leave your device. All conversion happens client-side, ensuring your photos and documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your images are processed entirely on your computer.',
    fq3q: 'Can I combine multiple images into one PDF?',
    fq3a: 'Yes, most online image to PDF converters allow you to combine multiple images into a single PDF document. You can upload multiple image files at once, arrange them in your preferred order using drag-and-drop, and the tool will create one PDF with all images as separate pages. This is perfect for creating photo albums, document collections, or combining scanned pages.',
    fq4q: 'What image formats can I convert to PDF?',
    fq4a: 'Most online image to PDF converters support common image formats including JPG/JPEG, PNG, WebP, GIF, and BMP. Some tools also support TIFF, HEIC, and other formats. The most widely supported formats are JPG and PNG, which work with virtually all image to PDF conversion tools.',
    fq5q: 'What is the maximum file size for converting images to PDF online?',
    fq5a: 'File size limits vary by tool, but most online image to PDF converters support files up to 25-50 MB per image. For best performance, keep individual images under 10 MB and limit the total number of images to under 50. Very large images or too many images may cause browser performance issues or timeouts.',
    fq6q: 'Do I need to create an account to convert images to PDF?',
    fq6a: 'No, many free image to PDF converter tools work without requiring account creation or registration. You can upload, convert, and download your PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving conversion history or accessing premium features, but basic image to PDF conversion is typically available without any registration.',
    fq7q: 'Will converting images to PDF reduce image quality?',
    fq7a: "Quality depends on the tool and settings you use. High-quality image to PDF converters preserve the original image quality without compression. However, some tools may compress images to reduce PDF file size. Look for tools that offer quality settings or explicitly state they preserve original image quality. For best results, use tools that maintain the original resolution and don't apply unnecessary compression.",
    fq8q: 'Can I convert images to PDF on mobile devices?',
    fq8a: 'Yes, many online image to PDF converters work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large images or many images might be slower or fail. For best results on mobile, stick to smaller images (under 5 MB each) and fewer total images (under 20). The interface may also be optimized differently for touch screens.',
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
      images: [{ url: `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: c.heroAlt }],
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
          alt={c.imgAlt}
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
                <li><strong className="text-white">{c.s1l1Strong}</strong>{c.s1l1}</li>
                <li><strong className="text-white">{c.s1l2Strong}</strong>{c.s1l2}</li>
                <li><strong className="text-white">{c.s1l3Strong}</strong>{c.s1l3}</li>
                <li><strong className="text-white">{c.s1l4Strong}</strong>{c.s1l4}</li>
                <li><strong className="text-white">{c.s1l5Strong}</strong>{c.s1l5}</li>
                <li><strong className="text-white">{c.s1l6Strong}</strong>{c.s1l6}</li>
                <li><strong className="text-white">{c.s1l7Strong}</strong>{c.s1l7}</li>
                <li><strong className="text-white">{c.s1l8Strong}</strong>{c.s1l8}</li>
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
                <li><strong className="text-white">{c.s2l1Strong}</strong>{c.s2l1}</li>
                <li><strong className="text-white">{c.s2l2Strong}</strong>{c.s2l2}</li>
                <li><strong className="text-white">{c.s2l3Strong}</strong>{c.s2l3}</li>
                <li><strong className="text-white">{c.s2l4Strong}</strong>{c.s2l4}</li>
                <li><strong className="text-white">{c.s2l5Strong}</strong>{c.s2l5}</li>
                <li><strong className="text-white">{c.s2l6Strong}</strong>{c.s2l6}</li>
                <li><strong className="text-white">{c.s2l7Strong}</strong>{c.s2l7}</li>
                <li><strong className="text-white">{c.s2l8Strong}</strong>{c.s2l8}</li>
                <li><strong className="text-white">{c.s2l9Strong}</strong>{c.s2l9}</li>
                <li><strong className="text-white">{c.s2l10Strong}</strong>{c.s2l10}</li>
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
                <li>{c.s2m7}</li>
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
                <li><strong className="text-white">{c.s3l1Strong}</strong>{c.s3l1}</li>
                <li><strong className="text-white">{c.s3l2Strong}</strong>{c.s3l2}</li>
                <li><strong className="text-white">{c.s3l3Strong}</strong>{c.s3l3}</li>
                <li><strong className="text-white">{c.s3l4Strong}</strong>{c.s3l4}</li>
                <li><strong className="text-white">{c.s3l5Strong}</strong>{c.s3l5}</li>
                <li><strong className="text-white">{c.s3l6Strong}</strong>{c.s3l6}</li>
                <li><strong className="text-white">{c.s3l7Strong}</strong>{c.s3l7}</li>
                <li><strong className="text-white">{c.s3l8Strong}</strong>{c.s3l8}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/Images-to-pdf')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.st1p1a}<Link href={L('/Images-to-pdf')} className="text-primary-400 hover:text-primary-300 underline">{c.st1p1link}</Link>{c.st1p1b}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.st1p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st2l1Strong}</strong>{c.st2l1}</li>
                  <li><strong className="text-white">{c.st2l2Strong}</strong>{c.st2l2}</li>
                  <li><strong className="text-white">{c.st2l3Strong}</strong>{c.st2l3}</li>
                  <li><strong className="text-white">{c.st2l4Strong}</strong>{c.st2l4}</li>
                  <li><strong className="text-white">{c.st2l5Strong}</strong>{c.st2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.st2p2Strong}</strong>{c.st2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st3l1Strong}</strong>{c.st3l1}</li>
                  <li><strong className="text-white">{c.st3l2Strong}</strong>{c.st3l2}</li>
                  <li><strong className="text-white">{c.st3l3Strong}</strong>{c.st3l3}</li>
                  <li><strong className="text-white">{c.st3l4Strong}</strong>{c.st3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st3p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st3m1}</li>
                  <li>{c.st3m2}</li>
                  <li>{c.st3m3}</li>
                  <li>{c.st3m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st3p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st4l1Strong}</strong>{c.st4l1}</li>
                  <li><strong className="text-white">{c.st4l2Strong}</strong>{c.st4l2}</li>
                  <li><strong className="text-white">{c.st4l3Strong}</strong>{c.st4l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st4p2Strong}</strong>{c.st4p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st4m1}</li>
                  <li>{c.st4m2}</li>
                  <li>{c.st4m3}</li>
                  <li>{c.st4m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st4p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st5l1Strong}</strong>{c.st5l1}</li>
                  <li><strong className="text-white">{c.st5l2Strong}</strong>{c.st5l2}</li>
                  <li><strong className="text-white">{c.st5l3Strong}</strong>{c.st5l3}</li>
                  <li><strong className="text-white">{c.st5l4Strong}</strong>{c.st5l4}</li>
                  <li><strong className="text-white">{c.st5l5Strong}</strong>{c.st5l5}</li>
                  <li><strong className="text-white">{c.st5l6Strong}</strong>{c.st5l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st5p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st6m1}</li>
                  <li>{c.st6m2}</li>
                  <li>{c.st6m3}</li>
                  <li>{c.st6m4}</li>
                  <li>{c.st6m5}</li>
                  <li>{c.st6m6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st6p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st7p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st7o1}</li>
                  <li>{c.st7o2}</li>
                  <li>{c.st7o3}</li>
                  <li>{c.st7o4}</li>
                  <li>{c.st7o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st7p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st7m1}</li>
                  <li>{c.st7m2}</li>
                  <li>{c.st7m3}</li>
                  <li>{c.st7m4}</li>
                  <li>{c.st7m5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st7p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st8h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st8p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st8p2Strong}</strong>{c.st8p2}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st8p3}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st8m1}</li>
                  <li>{c.st8m2}</li>
                  <li>{c.st8m3}</li>
                  <li>{c.st8m4a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.st8m4link}</Link>{c.st8m4b}</li>
                  <li>{c.st8m5a}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.st8m5link}</Link>{c.st8m5b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st8p4}
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
                  {c.b1p}
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
                  {c.b3p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b4p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b5p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.b6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.b6l1}</li>
                  <li>{c.b6l2}</li>
                  <li>{c.b6l3}</li>
                  <li>{c.b6l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.b6p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b7h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b7p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b8p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b9h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b9p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.b10h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.b10p}
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
                  <strong className="text-white">{c.c1p1Strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c1l1}</li>
                  <li>{c.c1l2}</li>
                  <li>{c.c1l3}</li>
                  <li>{c.c1l4}</li>
                  <li>{c.c1l5}</li>
                  <li>{c.c1l6}</li>
                  <li>{c.c1l7}</li>
                  <li>{c.c1l8}</li>
                  <li>{c.c1l9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c1p2Strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c1m1}</li>
                  <li>{c.c1m2}</li>
                  <li>{c.c1m3}</li>
                  <li>{c.c1m4}</li>
                  <li>{c.c1m5}</li>
                  <li>{c.c1m6}</li>
                  <li>{c.c1m7}</li>
                  <li>{c.c1m8}</li>
                  <li>{c.c1m9}</li>
                  <li>{c.c1m10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c1p3Strong}</strong>{c.c1p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c2p1Strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c2l1}</li>
                  <li>{c.c2l2}</li>
                  <li>{c.c2l3}</li>
                  <li>{c.c2l4}</li>
                  <li>{c.c2l5}</li>
                  <li>{c.c2l6}</li>
                  <li>{c.c2l7}</li>
                  <li>{c.c2l8}</li>
                  <li>{c.c2l9}</li>
                  <li>{c.c2l10}</li>
                  <li>{c.c2l11}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.c2p2Strong}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.c2m1}</li>
                  <li>{c.c2m2}</li>
                  <li>{c.c2m3}</li>
                  <li>{c.c2m4}</li>
                  <li>{c.c2m5}</li>
                  <li>{c.c2m6}</li>
                  <li>{c.c2m7}</li>
                  <li>{c.c2m8}</li>
                  <li>{c.c2m9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.c2p3Strong}</strong>{c.c2p3}
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
                  <strong className="text-white">{c.c3p2Strong}</strong>{c.c3p2}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/Images-to-pdf')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1a2}
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
                    {c.fv7a1}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv7aLink}</Link>{c.fv7a2}
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
                    {c.fv10a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10aLink}</Link>{c.fv10a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv11q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv11a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv11aLink}</Link>{c.fv11a2}
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
                <li>{c.s8m1}</li>
                <li>{c.s8m2}</li>
                <li>{c.s8m3}</li>
                <li>{c.s8m4}</li>
                <li>{c.s8m5}</li>
                <li>{c.s8m6}</li>
                <li>{c.s8m7}</li>
                <li>{c.s8m8}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/Images-to-pdf')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rel2Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel2Desc}
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
import { TRANSLATIONS } from './how-to-convert-images-to-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
