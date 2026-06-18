import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-rotate-pdf-pages-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Rotate PDF Pages Online_ Complete Guide to Fixing PDF Orientation.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Rotate PDF Pages Online (Step-by-Step Guide)',
    metaDesc: 'Fix PDF orientation easily. Rotate PDF pages online and download your corrected document securely in just a few clicks.',
    ogTitle: 'How to Rotate PDF Pages Online (Step-by-Step Guide)',
    ogDesc: 'Fix PDF orientation easily. Rotate PDF pages online and download your corrected document securely in just a few clicks.',
    twTitle: 'How to Rotate PDF Pages Online (Step-by-Step Guide)',
    twDesc: 'Fix PDF orientation easily. Rotate PDF pages online and download your corrected document securely in just a few clicks.',
    heroAlt: 'How to rotate PDF pages online - Free PDF page rotation tool guide',
    ogImageAlt: 'Banner showing PDF pages being rotated with 90, 180, and 270 degree options',

    bcLeaf: 'How to Rotate PDF Pages Online',
    heroTitle: 'How to Rotate PDF Pages Online: Complete Guide to Fixing PDF Orientation',
    heroSubtitle: 'Learn how to rotate PDF pages to fix orientation issues, adjust scanned documents, and correct page angles. Free, secure, and easy-to-use PDF page rotation tool.',

    artHeadline: 'How to Rotate PDF Pages Online - Complete Guide to Fixing PDF Orientation',
    artDesc: 'Complete guide on how to rotate PDF pages online. Learn to fix orientation issues, rotate scanned documents, and adjust page angles using free online tools. Step-by-step instructions, tips, and best practices for rotating PDF pages.',

    intro1: "You've just scanned a document, and half the pages are sideways. Or maybe you downloaded a PDF where someone accidentally rotated a few pages during creation. Perhaps you're working with a document that needs to be viewed in landscape instead of portrait. Whatever the situation, rotating PDF pages is one of those tasks that seems simple but can be surprisingly frustrating if you don't know the right approach.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF rotation tools make fixing page orientation as straightforward as selecting pages and choosing a rotation angle. This comprehensive guide will walk you through everything you need to know about rotating PDF pages online, from understanding when rotation is needed to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why PDF Pages End Up Rotated',
    s1p1: 'PDF pages can end up in the wrong orientation for countless reasons. Unlike Word documents where you can simply change page orientation in settings, PDFs are essentially digital snapshots. Once a page is rotated or scanned incorrectly, that orientation becomes part of the file structure. This makes fixing orientation issues more complex than it should be.',
    s1p2: 'Here are the most common scenarios where you need to rotate PDF pages:',
    s1l1s: 'Scanned documents:',
    s1l1: ' When scanning physical documents, pages often get fed into the scanner at incorrect angles, resulting in sideways or upside-down pages',
    s1l2s: 'Mobile document capture:',
    s1l2: ' Photos taken with smartphones can end up rotated if the device orientation changed during capture',
    s1l3s: 'Conversion errors:',
    s1l3: ' Converting documents from other formats sometimes introduces rotation issues',
    s1l4s: 'Accidental rotation:',
    s1l4: ' Someone might have accidentally rotated pages during PDF creation or editing',
    s1l5s: 'Mixed orientations:',
    s1l5: ' Combining documents with different page orientations can create a PDF where some pages need rotation',
    s1l6s: 'Viewing preferences:',
    s1l6: ' Sometimes you need to rotate pages to match specific viewing or printing requirements',
    s1l7s: 'Legacy documents:',
    s1l7: ' Older scanned documents or archived files often have inconsistent page orientations',
    s1p3: "The challenge isn't just identifying which pages need rotation—it's finding a tool that can:",
    s1m1: 'Rotate individual pages without affecting others',
    s1m2: 'Preserve document quality during rotation',
    s1m3: 'Maintain text searchability and selectability',
    s1m4: 'Work quickly without uploading files to unknown servers',
    s1m5: 'Support different rotation angles (90°, 180°, 270°)',
    s1m6: 'Handle large documents efficiently',
    s1p4: 'These requirements are exactly why specialized PDF rotation tools have become essential. They solve the orientation problem while keeping the process simple, secure, and accessible.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think rotating PDF pages is a minor inconvenience, but it's actually something that affects productivity and professionalism in significant ways. Consider these real-world scenarios:",
    s2l1s: 'Business professionals',
    s2l1: ' submitting reports or proposals with incorrectly oriented pages look unprofessional and can delay approval processes',
    s2l2s: 'Legal teams',
    s2l2: ' working with scanned evidence documents need proper orientation for readability and court presentation',
    s2l3s: 'Healthcare workers',
    s2l3: ' digitizing patient records must ensure all pages are correctly oriented for medical review',
    s2l4s: 'Students and researchers',
    s2l4: ' compiling scanned research materials need consistent page orientation for reading and citation',
    s2l5s: 'Real estate professionals',
    s2l5: ' preparing property documents require proper orientation for client presentations and filing',
    s2l6s: 'Accountants',
    s2l6: ' processing scanned invoices and receipts need correct orientation for data entry and archiving',
    s2l7s: 'Archivists and librarians',
    s2l7: ' digitizing historical documents must maintain proper orientation for preservation',
    s2l8s: 'Content creators',
    s2l8: ' working with mixed-orientation source materials need consistent page alignment',
    s2p2: 'The consequences of not fixing page orientation can be significant:',
    s2m1: 'Reduced readability and professional appearance',
    s2m2: 'Time wasted manually rotating pages in PDF viewers',
    s2m3: 'Printing errors when pages print in wrong orientation',
    s2m4: 'Accessibility issues for screen readers and assistive technologies',
    s2m5: 'Frustration when sharing documents with orientation problems',
    s2m6: 'Potential delays in document approval or processing workflows',
    s2m7: 'Poor user experience when viewing documents on different devices',
    s2p3: "That's why understanding how to rotate PDF pages properly isn't just about convenience—it's about maintaining document quality, professionalism, and efficiency in a world where PDF documents are the standard format for business and academic communication.",

    s3h: 'The Solution: Modern Online PDF Page Rotation Tools',
    s3p1: 'The solution to PDF page rotation headaches is simpler than you might expect. Modern web-based PDF rotation tools handle all the technical complexity behind the scenes, giving you a clean interface to fix page orientation in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3: ' Rotate pages in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6s: 'Selective rotation:',
    s3l6: ' Rotate individual pages or all pages at once',
    s3l7s: 'Multiple rotation angles:',
    s3l7: ' Support for 90°, 180°, and 270° rotations',
    s3l8s: 'Quality preservation:',
    s3l8: ' Maintains text searchability and image quality',
    s3p3: "The best part? You don't need to understand how PDF rotation works technically. The tool handles page transformation, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF page rotation tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need to fix page orientation without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Rotate PDF Pages Using Our Tool',
    s4p1: "Ready to fix your PDF page orientation? Follow these steps to rotate pages quickly and easily. We'll cover rotating individual pages, multiple pages, and all pages at once.",

    s4s1h: 'Step 1: Access the PDF Page Rotation Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF page rotation tool',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start rotating pages immediately.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing thumbnails of all pages. This helps you identify which pages need rotation and verify the results after rotating.",

    s4s3h: 'Step 3: Identify Pages That Need Rotation',
    s4s3p1: 'Before rotating, take a moment to review your PDF pages. Look for:',
    s4s3l1: 'Pages that appear sideways (rotated 90° or 270°)',
    s4s3l2: 'Pages that appear upside down (rotated 180°)',
    s4s3l3: 'Inconsistent page orientations throughout the document',
    s4s3l4: 'Pages that need to be rotated for viewing or printing preferences',
    s4s3p2s: 'Pro tip:',
    s4s3p2: " If you're working with a scanned document, check the first few pages carefully. Often, scanning errors affect multiple pages in sequence, so you might need to rotate several pages at once.",
    s4s3p3: 'The page thumbnails in the tool interface make it easy to see which pages need rotation at a glance. You can also click on thumbnails to preview full-size pages if needed.',

    s4s4h: 'Step 4: Select Pages to Rotate',
    s4s4p1: 'This is where you choose which pages to rotate. Most tools offer several selection methods:',
    s4s4mAh: 'Method A: Rotate Individual Pages',
    s4s4mAp1: 'Click on individual page thumbnails to select them, then choose a rotation angle. This is perfect when only a few pages need rotation.',
    s4s4mAp2s: 'Best for:',
    s4s4mAp2: ' Documents where only specific pages have orientation issues.',
    s4s4mBh: 'Method B: Rotate Multiple Pages',
    s4s4mBp1: 'Select multiple pages at once (using Ctrl+Click on Windows or Cmd+Click on Mac), then apply the same rotation to all selected pages. Some tools also support selecting page ranges.',
    s4s4mBp2s: 'Best for:',
    s4s4mBp2: ' When several consecutive pages need the same rotation, or when you need to rotate non-consecutive pages with the same angle.',
    s4s4mCh: 'Method C: Rotate All Pages',
    s4s4mCp1: 'Some tools offer a "Rotate All" option that applies the same rotation to every page in the document. This is useful when an entire document needs orientation correction.',
    s4s4mCp2s: 'Best for:',
    s4s4mCp2: ' Documents where all pages have the same orientation issue, or when you need to change the viewing orientation of an entire document.',

    s4s5h: 'Step 5: Choose Rotation Angle',
    s4s5p1: "Once you've selected pages, choose the rotation angle. Most tools support standard angles:",
    s4s5l1s: '90° clockwise:',
    s4s5l1: ' Rotates the page one quarter turn to the right. Use this when pages are rotated left and need to be turned right.',
    s4s5l2s: '180°:',
    s4s5l2: ' Rotates the page half a turn (upside down). Use this when pages are completely inverted.',
    s4s5l3s: '270° (or -90°):',
    s4s5l3: ' Rotates the page three quarters of a turn, or one quarter turn to the left. Use this when pages are rotated right and need to be turned left.',
    s4s5p2s: 'Pro tip:',
    s4s5p2: " If you're unsure which angle to use, try 90° first. You can always rotate again if needed. Most tools allow you to apply multiple rotations, so rotating 90° twice equals 180°, and rotating 90° three times equals 270°.",
    s4s5p3: 'Some advanced tools also let you apply different rotation angles to different pages. For example, you might rotate page 3 by 90° and page 7 by 180° in the same operation.',

    s4s6h: 'Step 6: Preview Your Rotations',
    s4s6p1: 'Before finalizing, take advantage of the preview feature if your tool offers it. Preview shows you how pages will look after rotation, allowing you to:',
    s4s6l1: 'Verify that rotation angles are correct',
    s4s6l2: 'Check that all pages needing rotation are selected',
    s4s6l3: 'Ensure no pages were accidentally rotated',
    s4s6l4: 'Confirm the final document orientation looks correct',
    s4s6p2: "This preview step prevents having to start over if you realize something's wrong after processing. It's worth taking a few extra seconds to review.",

    s4s7h: 'Step 7: Apply Rotations and Process',
    s4s7p1: 'Once everything looks good, click the "Rotate Pages" or "Apply Rotation" button. The tool will:',
    s4s7o1: 'Process your PDF file',
    s4s7o2: 'Apply rotation transformations to selected pages',
    s4s7o3: 'Preserve all content quality and formatting',
    s4s7o4: 'Maintain text searchability and selectability',
    s4s7o5: 'Generate your rotated PDF file',
    s4s7p2: 'Processing time depends on:',
    s4s7l1: 'Total page count of your PDF',
    s4s7l2: 'Number of pages being rotated',
    s4s7l3: 'File size',
    s4s7l4: "Your device's processing power",
    s4s7p3: "For typical rotations (10-50 pages), this usually takes just a few seconds. Larger documents might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s8h: 'Step 8: Download Your Rotated PDF',
    s4s8p1: 'When processing completes, your rotated PDF is ready. Click the download button to save it to your device. The file will typically have a name like "rotated.pdf" or include "rotated" in the filename, but you can rename it to something more descriptive.',
    s4s8p2s: 'Important:',
    s4s8p2: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your rotated PDF before closing the page.',
    s4s8p3s: 'Quality check:',
    s4s8p3: ' After downloading, open your rotated PDF in a PDF viewer to verify:',
    s4s8l1: 'All pages are correctly oriented',
    s4s8l2: 'Text remains readable and searchable',
    s4s8l3: 'Images maintain their quality',
    s4s8l4: 'No pages were accidentally rotated',
    s4s8l5: 'The document looks professional and ready for use',
    s4s8p4: "That's it! You've successfully rotated your PDF pages. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Page Rotation Tools',
    s5p1: 'Why choose an online PDF rotation tool over desktop software or manual methods? Here are the key advantages:',
    s5b1h: '1. Zero Installation Required',
    s5b1p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start rotating pages. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to rotate PDFs on the go.",
    s5b2h: '2. Privacy and Security',
    s5b2p1: 'When you use a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5b2l1: 'Confidential business documents',
    s5b2l2: 'Personal financial information',
    s5b2l3: 'Legal documents',
    s5b2l4: 'Medical records',
    s5b2l5: 'Any sensitive data',
    s5b2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5b3h: '3. Selective Page Rotation',
    s5b3p: 'Online PDF rotation tools excel at selective rotation. You can rotate individual pages, specific page ranges, or all pages at once. This flexibility is often better than desktop software that might require more complex workflows for selective rotation. The ability to apply different rotation angles to different pages in one operation saves significant time.',
    s5b4h: '4. Cost-Effective Solution',
    s5b4p: 'Most online PDF rotation tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF rotation, free online tools provide excellent value without any financial commitment.',
    s5b5h: '5. Cross-Platform Compatibility',
    s5b5p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF rotation tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5b6h: '6. Quality Preservation',
    s5b6p1: 'Quality online PDF rotation tools preserve:',
    s5b6l1: 'Text searchability and selectability',
    s5b6l2: 'Image resolution and quality',
    s5b6l3: 'Document formatting and layout',
    s5b6l4: 'Hyperlinks and bookmarks',
    s5b6l5: 'Form fields and annotations',
    s5b6p2: 'Unlike methods that convert PDFs to images and back, proper PDF rotation maintains all document functionality.',
    s5b7h: '7. Speed and Efficiency',
    s5b7p1: 'Modern browser-based PDF processing is surprisingly fast. You can rotate pages in seconds, compared to:',
    s5b7l1: "Manual rotation in PDF viewers (which doesn't permanently fix the file)",
    s5b7l2: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5b7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5b7l4: 'Re-scanning documents (extremely time-consuming)',
    s5b7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5b8h: '8. Always Up-to-Date',
    s5b8p: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5b9h: '9. Visual Preview and Feedback',
    s5b9p: 'Most online PDF rotation tools provide visual feedback through page thumbnails and previews. You can see exactly which pages are selected, what rotation will be applied, and verify results before and after processing. This visual approach reduces errors and gives you confidence in the final result.',

    s6h: 'Comparison: Online PDF Rotators vs. Other Tools',
    s6p1: "How do online PDF rotation tools stack up against alternatives? Let's break down the comparison:",
    s6c1h: 'Online PDF Rotators vs. Desktop Software',
    s6c1p1s: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6c1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6c1l2: '✅ Works offline',
    s6c1l3: '✅ Better for very large files (500+ pages)',
    s6c1l4: '❌ Requires installation and updates',
    s6c1l5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1l6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1l7: '❌ Takes up disk space',
    s6c1l8: '❌ More complex interface for simple rotation tasks',
    s6c1p2s: 'Online PDF Rotators:',
    s6c1m1: '✅ Free to use',
    s6c1m2: '✅ No installation required',
    s6c1m3: '✅ Works on any platform',
    s6c1m4: '✅ Always up-to-date',
    s6c1m5: '✅ Privacy-first (client-side processing)',
    s6c1m6: '✅ Simple, focused interface for rotation',
    s6c1m7: '✅ Visual page selection and preview',
    s6c1m8: '❌ Requires internet connection (for initial page load)',
    s6c1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1p3s: 'Verdict:',
    s6c1p3: ' For PDF page rotation specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just rotation, or if you regularly work with very large files.',
    s6c2h: 'Online PDF Rotators vs. Cloud-Based Services',
    s6c2p1s: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6c2l1: '✅ Integrated with cloud storage',
    s6c2l2: '✅ Can access files from anywhere',
    s6c2l3: '✅ Often free with cloud storage accounts',
    s6c2l4: '❌ Files uploaded to servers (privacy concern)',
    s6c2l5: '❌ Requires account creation',
    s6c2l6: '❌ Storage limits apply',
    s6c2l7: '❌ Files may be retained on servers',
    s6c2l8: '❌ Slower processing (upload/download time)',
    s6c2l9: '❌ Limited rotation options',
    s6c2p2s: 'Client-Side Online Rotators:',
    s6c2m1: '✅ No file uploads (privacy-first)',
    s6c2m2: '✅ No account required',
    s6c2m3: '✅ Faster processing (no upload/download)',
    s6c2m4: '✅ No storage limits',
    s6c2m5: '✅ Files never leave your device',
    s6c2m6: '✅ More rotation options and flexibility',
    s6c2m7: "❌ Can't access files from cloud storage directly",
    s6c2p3s: 'Verdict:',
    s6c2p3: ' For privacy-conscious users, client-side online rotators are superior. Cloud services are better if you need to rotate files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6c3h: 'Online PDF Rotators vs. Manual Methods',
    s6c3p1: 'Some people try to rotate PDF pages manually using methods like:',
    s6c3l1: "Using PDF viewer rotation (which doesn't permanently fix the file)",
    s6c3l2: 'Printing rotated pages to a new PDF (slow, quality loss, time-consuming)',
    s6c3l3: 'Taking screenshots of rotated pages (terrible quality, not searchable, time-consuming)',
    s6c3l4: 'Re-scanning documents at correct orientation (extremely time-consuming)',
    s6c3l5: 'Using freeware with ads and malware risks',
    s6c3p2s: 'Verdict:',
    s6c3p2: " Online PDF rotators are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    s7h: 'Frequently Asked Questions About Rotating PDF Pages',
    // Visible FAQ (13)
    fv1q: 'How do I rotate PDF pages online for free?',
    fv1a_pre: 'You can rotate PDF pages online for free by using our ',
    fv1a_link: 'PDF page rotation tool',
    fv1a_post: '. Simply upload your PDF file, select the pages you want to rotate, choose the rotation angle (90°, 180°, or 270°), and click rotate. The tool rotates your selected pages while preserving all content quality. Processing happens in your browser, so your files never leave your device. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to rotate PDF pages online?',
    fv2a: 'Yes, when using a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. All rotation happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I rotate individual pages in a PDF?',
    fv3a: 'Absolutely. Most online PDF rotation tools allow you to rotate individual pages or specific page ranges. You can select which pages to rotate and apply different rotation angles to different pages if needed. This is particularly useful when only some pages in your document have orientation issues. Simply click on the page thumbnails you want to rotate, choose your rotation angle, and apply.',
    fv4q: 'What rotation angles are available for PDF pages?',
    fv4a: 'Most PDF rotation tools support standard rotation angles: 90 degrees (quarter turn clockwise), 180 degrees (half turn, upside down), and 270 degrees (three-quarter turn, or 90 degrees counterclockwise). Some tools also support rotating all pages at once or applying different rotations to different pages. You can typically apply multiple rotations if needed—for example, rotating 90° twice equals 180°.',
    fv5q: 'Will rotating PDF pages reduce file quality?',
    fv5a: "No, properly rotating PDF pages should not reduce quality. When you rotate pages using a quality tool, it applies the rotation transformation without re-compressing or degrading the content. Text remains searchable, images maintain their resolution, and formatting is preserved. The rotated PDF maintains the same quality as the original. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that rotate PDFs at the native PDF level rather than converting formats.",
    fv6q: 'Do I need to create an account to rotate PDF pages?',
    fv6a: 'No, many free PDF rotation tools work without requiring account creation or registration. You can upload, rotate, and download your PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving rotation history or accessing premium features, but basic PDF page rotation is typically available without any registration.',
    fv7q: 'Can I rotate password-protected PDFs?',
    fv7a_pre: 'This depends on the tool. Most online PDF rotation tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a ',
    fv7a_link: 'PDF editing tool',
    fv7a_post: ' or the software that created the protection, then rotate the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv8q: 'What happens to the original PDF after rotating pages?',
    fv8a: "The original PDF file on your device remains completely unchanged. Rotating pages creates a new file with the rotated pages without modifying the source document. This means you can rotate the same PDF multiple times using different angles without any risk to your original file. Always keep backups of important original files until you're satisfied with the rotated results.",
    fv9q: 'Can I undo a rotation if I make a mistake?',
    fv9a: 'Since rotation creates a new file, you can\'t "undo" a rotation in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply rotate it again with the correct angle or selection. This is why it\'s important to preview your rotations before processing. Some tools keep your rotation settings available for a few minutes after processing, allowing quick re-rotation if needed.',
    fv10q: 'Can I rotate PDFs on mobile devices?',
    fv10a: 'Yes, many online PDF rotation tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large PDFs might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',
    fv11q: 'What is the maximum file size for rotating PDFs online?',
    fv11a_pre: 'File size limits vary by tool, but most online PDF rotators support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to rotate very large PDFs, consider splitting them first using our ',
    fv11a_link: 'PDF splitter tool',
    fv11a_post: ', or using desktop software designed for heavy-duty processing.',
    fv12q: 'Will rotated text still be searchable?',
    fv12a: 'Yes, when using a quality PDF rotation tool that rotates at the native PDF level, text remains fully searchable and selectable after rotation. The rotation is applied as a transformation to the page, not a conversion to images. This means you can still search for text, copy text, and use all standard PDF text features. If a tool converts PDFs to images and back, searchability may be lost, so always use tools that preserve native PDF structure.',

    s8h: 'Conclusion: Making PDF Page Rotation Simple',
    s8p1: "Rotating PDF pages doesn't have to be complicated. With modern online PDF rotation tools, fixing page orientation is straightforward, fast, and secure. Whether you're a business professional correcting scanned documents, a student organizing research materials, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF rotators—no installation, privacy-first processing, free access, selective page rotation, and cross-platform compatibility—make them the ideal solution for most rotation needs. While desktop software has its place for advanced PDF editing tasks, simple page rotation is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Preview your PDF pages before rotating to identify which ones need correction',
    s8l2: 'Use selective rotation for individual pages when only some pages have orientation issues',
    s8l3: 'Keep files under 25 MB for best performance',
    s8l4: 'Use privacy-first tools that process files locally',
    s8l5: 'Verify rotated PDFs after downloading to ensure correct orientation',
    s8l6: "Keep backups of original files until you're satisfied with the rotated results",
    s8l7: 'Test different rotation angles if unsure—you can always rotate again',
    s8p4a: 'Ready to fix your PDF page orientation? Try our ',
    s8p4link1: 'free PDF page rotation tool',
    s8p4b: ' and experience how simple correcting page orientation can be. And if you need to make other edits to your PDFs, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction before rotation, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes. And if you need to combine multiple PDFs after rotating, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents together.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle page rotation quickly and confidently, leaving more time for the work that actually matters.",

    // Related Articles
    rel1t: 'How to Merge PDF Files Online',
    rel1d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel2t: 'How to Split PDF Files Online',
    rel2d: 'Complete guide to dividing large PDF documents into smaller files online.',
    rel3t: 'How to Edit a PDF Online',
    rel3d: 'Complete guide to editing PDF files online without installing software.',
    rel4t: 'How to Delete Pages from PDF',
    rel4d: 'Learn how to remove unwanted pages from PDF documents quickly and easily.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I rotate PDF pages online for free?',
    fq1a: 'You can rotate PDF pages online for free by using our PDF page rotation tool. Simply upload your PDF file, select the pages you want to rotate, choose the rotation angle (90°, 180°, or 270°), and click rotate. The tool rotates your selected pages while preserving all content quality. Processing happens in your browser, so your files never leave your device.',
    fq2q: 'Is it safe to rotate PDF pages online?',
    fq2a: 'Yes, when using a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. All rotation happens client-side, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing keeps everything on your computer.',
    fq3q: 'Can I rotate individual pages in a PDF?',
    fq3a: 'Yes, most online PDF rotation tools allow you to rotate individual pages or specific page ranges. You can select which pages to rotate and apply different rotation angles to different pages if needed. This is particularly useful when only some pages in your document have orientation issues.',
    fq4q: 'What rotation angles are available for PDF pages?',
    fq4a: 'Most PDF rotation tools support standard rotation angles: 90 degrees (quarter turn clockwise), 180 degrees (half turn, upside down), and 270 degrees (three-quarter turn, or 90 degrees counterclockwise). Some tools also support rotating all pages at once or applying different rotations to different pages.',
    fq5q: 'Will rotating PDF pages reduce file quality?',
    fq5a: 'No, properly rotating PDF pages should not reduce quality. When you rotate pages using a quality tool, it applies the rotation transformation without re-compressing or degrading the content. Text remains searchable, images maintain their resolution, and formatting is preserved. The rotated PDF maintains the same quality as the original.',
    fq6q: 'Do I need to create an account to rotate PDF pages?',
    fq6a: 'No, many free PDF rotation tools work without requiring account creation or registration. You can upload, rotate, and download your PDF files immediately without signing up. This makes the process faster and more private.',
    fq7q: 'Can I rotate password-protected PDFs?',
    fq7a: 'This depends on the tool. Most online PDF rotation tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool or the software that created the protection, then rotate the unlocked files.',
    fq8q: 'What happens to the original PDF after rotating pages?',
    fq8a: 'The original PDF file on your device remains completely unchanged. Rotating pages creates a new file with the rotated pages without modifying the source document. This means you can rotate the same PDF multiple times using different angles without any risk to your original file.',
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
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      siteName: 'EditoraPDF',
      images: [{ url: `${siteUrl}/images/blog/how-to-rotate-pdf-pages-online-hero.png`, width: 1200, height: 630, alt: c.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/how-to-rotate-pdf-pages-online-hero.png`],
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
        <img
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
                <li><strong className="text-white">{c.s1l1s}</strong>{c.s1l1}</li>
                <li><strong className="text-white">{c.s1l2s}</strong>{c.s1l2}</li>
                <li><strong className="text-white">{c.s1l3s}</strong>{c.s1l3}</li>
                <li><strong className="text-white">{c.s1l4s}</strong>{c.s1l4}</li>
                <li><strong className="text-white">{c.s1l5s}</strong>{c.s1l5}</li>
                <li><strong className="text-white">{c.s1l6s}</strong>{c.s1l6}</li>
                <li><strong className="text-white">{c.s1l7s}</strong>{c.s1l7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1m1}</li>
                <li>{c.s1m2}</li>
                <li>{c.s1m3}</li>
                <li>{c.s1m4}</li>
                <li>{c.s1m5}</li>
                <li>{c.s1m6}</li>
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
                <li><strong className="text-white">{c.s2l1s}</strong>{c.s2l1}</li>
                <li><strong className="text-white">{c.s2l2s}</strong>{c.s2l2}</li>
                <li><strong className="text-white">{c.s2l3s}</strong>{c.s2l3}</li>
                <li><strong className="text-white">{c.s2l4s}</strong>{c.s2l4}</li>
                <li><strong className="text-white">{c.s2l5s}</strong>{c.s2l5}</li>
                <li><strong className="text-white">{c.s2l6s}</strong>{c.s2l6}</li>
                <li><strong className="text-white">{c.s2l7s}</strong>{c.s2l7}</li>
                <li><strong className="text-white">{c.s2l8s}</strong>{c.s2l8}</li>
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
                <li><strong className="text-white">{c.s3l1s}</strong>{c.s3l1}</li>
                <li><strong className="text-white">{c.s3l2s}</strong>{c.s3l2}</li>
                <li><strong className="text-white">{c.s3l3s}</strong>{c.s3l3}</li>
                <li><strong className="text-white">{c.s3l4s}</strong>{c.s3l4}</li>
                <li><strong className="text-white">{c.s3l5s}</strong>{c.s3l5}</li>
                <li><strong className="text-white">{c.s3l6s}</strong>{c.s3l6}</li>
                <li><strong className="text-white">{c.s3l7s}</strong>{c.s3l7}</li>
                <li><strong className="text-white">{c.s3l8s}</strong>{c.s3l8}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/rotate')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4s1p1a}<Link href={L('/tools/rotate')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
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
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s3l1}</li>
                  <li>{c.s4s3l2}</li>
                  <li>{c.s4s3l3}</li>
                  <li>{c.s4s3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s3p2s}</strong>{c.s4s3p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s3p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s4p1}
                </p>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s4mAh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s4mAp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s4mAp2s}</strong>{c.s4s4mAp2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s4mBh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s4mBp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s4mBp2s}</strong>{c.s4s4mBp2}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s4mCh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s4mCp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s4mCp2s}</strong>{c.s4s4mCp2}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4s5l1s}</strong>{c.s4s5l1}</li>
                  <li><strong className="text-white">{c.s4s5l2s}</strong>{c.s4s5l2}</li>
                  <li><strong className="text-white">{c.s4s5l3s}</strong>{c.s4s5l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s5p2s}</strong>{c.s4s5p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s5p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s6l1}</li>
                  <li>{c.s4s6l2}</li>
                  <li>{c.s4s6l3}</li>
                  <li>{c.s4s6l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s6p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s7p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s7o1}</li>
                  <li>{c.s4s7o2}</li>
                  <li>{c.s4s7o3}</li>
                  <li>{c.s4s7o4}</li>
                  <li>{c.s4s7o5}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s7p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s7l1}</li>
                  <li>{c.s4s7l2}</li>
                  <li>{c.s4s7l3}</li>
                  <li>{c.s4s7l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s7p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s8h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s8p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s8p2s}</strong>{c.s4s8p2}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s8p3s}</strong>{c.s4s8p3}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s8l1}</li>
                  <li>{c.s4s8l2}</li>
                  <li>{c.s4s8l3}</li>
                  <li>{c.s4s8l4}</li>
                  <li>{c.s4s8l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s8p4}
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5b6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5b6l1}</li>
                  <li>{c.s5b6l2}</li>
                  <li>{c.s5b6l3}</li>
                  <li>{c.s5b6l4}</li>
                  <li>{c.s5b6l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5b6p2}
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
                  <strong className="text-white">{c.s6c1p1s}</strong>
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p2s}</strong>
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1p3s}</strong>{c.s6c1p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p1s}</strong>
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2m1}</li>
                  <li>{c.s6c2m2}</li>
                  <li>{c.s6c2m3}</li>
                  <li>{c.s6c2m4}</li>
                  <li>{c.s6c2m5}</li>
                  <li>{c.s6c2m6}</li>
                  <li>{c.s6c2m7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c2p3s}</strong>{c.s6c2p3}
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
                  <strong className="text-white">{c.s6c3p2s}</strong>{c.s6c3p2}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a_pre}<Link href={L('/tools/rotate')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1a_link}</Link>{c.fv1a_post}
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
                    {c.fv7a_pre}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv7a_link}</Link>{c.fv7a_post}
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
                    {c.fv11a_pre}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv11a_link}</Link>{c.fv11a_post}
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
                {c.s8p4a}<Link href={L('/tools/rotate')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                href={L('/blog/how-to-delete-pages-from-pdf')}
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
import { TRANSLATIONS } from './how-to-rotate-pdf-pages-online.i18n'
Object.assign(C, TRANSLATIONS)
