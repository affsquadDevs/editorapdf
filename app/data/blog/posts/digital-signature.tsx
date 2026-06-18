import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'digital-signature'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Add Digital Signatures to PDFs Online_ Complete Guide to E-Signing Documents.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Add Digital Signatures to PDFs Online: Complete Guide to E-Signing Documents',
    metaDesc: 'Learn how to add digital signatures to PDF documents online. Securely e-sign contracts, agreements, and forms in minutes without installing software.',
    ogTitle: 'How to Add Digital Signatures to PDFs Online: Complete Guide to E-Signing Documents',
    ogDesc: 'Learn how to add digital signatures to PDF documents online. Securely e-sign contracts, agreements, and forms in minutes without installing software.',
    twTitle: 'How to Add Digital Signatures to PDFs Online: Complete Guide to E-Signing Documents',
    twDesc: 'Learn how to add digital signatures to PDF documents online. Securely e-sign contracts, agreements, and forms in minutes without installing software.',
    ogAlt: 'Illustration of a PDF document being digitally signed with a stylus and confirmation checkmark',
    heroAlt: 'How to add digital signatures to PDFs online - Free e-signature tool guide',

    bcLeaf: 'Digital Signature',
    heroTitle: 'How to Add Digital Signatures to PDFs Online: Complete Guide to E-Signing Documents',
    heroSubtitle: 'Learn how to sign PDF documents electronically using free online tools. No software installation or printing required.',

    artHeadline: 'How to Add Digital Signatures to PDFs Online - Complete Guide to E-Signing Documents',
    artDesc: 'Complete guide on how to add digital signatures to PDF documents online. Learn to sign PDFs electronically using free online tools. Step-by-step instructions, legal considerations, and best practices for e-signatures.',

    intro1: "You've just received a contract that needs your signature. Or maybe it's an invoice, a consent form, or a business agreement. In the past, this meant printing the document, signing it with a pen, scanning it back, and emailing it—a process that could take hours. Today, digital signatures have revolutionized how we sign documents, making the entire process instant, secure, and paperless.",
    intro2: "Whether you're a business professional handling contracts, a freelancer signing agreements, or someone who regularly needs to approve documents, knowing how to add digital signatures to PDFs is an essential skill. This comprehensive guide will walk you through everything you need to know about signing PDFs online, from understanding different signature types to mastering the signing process and ensuring your e-signatures are legally valid.",

    s1h: 'The Problem: Why Signing PDFs Can Be Frustrating',
    s1p1: 'Despite living in a digital age, many people still struggle with signing PDF documents. The traditional approach—printing, signing, scanning, and emailing—is not only time-consuming but also prone to errors. You might print the wrong page, sign in the wrong place, or end up with a low-quality scan that looks unprofessional.',
    s1p2: "Here's what makes PDF signing challenging:",
    s1l1s: 'Print-scan workflow inefficiency:',
    s1l1t: ' Printing, signing, and scanning documents wastes time and resources',
    s1l2s: 'Quality degradation:',
    s1l2t: ' Each scan reduces document quality, making text harder to read',
    s1l3s: 'Physical access requirements:',
    s1l3t: ' You need a printer, scanner, and physical presence to sign documents',
    s1l4s: 'File size issues:',
    s1l4t: ' Scanned documents often create larger file sizes than necessary',
    s1l5s: 'Security concerns:',
    s1l5t: ' Physical documents can be lost, stolen, or tampered with',
    s1l6s: 'Software complexity:',
    s1l6t: ' Desktop PDF signing software often requires installation, updates, and sometimes expensive licenses',
    s1l7s: 'Mobile limitations:',
    s1l7t: ' Signing on mobile devices traditionally required workarounds or specialized apps',
    s1p3: 'These pain points are exactly why online PDF signing tools have become so popular. They eliminate the print-scan cycle entirely, allowing you to sign documents directly on your device in seconds, not minutes or hours.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: 'You might think signing PDFs is a simple task, but inefficient signing processes create real problems for millions of people every day. Consider these everyday scenarios:',
    s2l1s: 'Business professionals',
    s2l1t: ' signing contracts, NDAs, and agreements while traveling or working remotely',
    s2l2s: 'Freelancers and contractors',
    s2l2t: ' signing project agreements and invoices to get paid faster',
    s2l3s: 'HR departments',
    s2l3t: ' processing employee onboarding documents, consent forms, and policy acknowledgments',
    s2l4s: 'Real estate agents',
    s2l4t: ' signing purchase agreements, disclosure forms, and contracts on the go',
    s2l5s: 'Healthcare workers',
    s2l5t: ' signing patient consent forms, treatment authorizations, and medical records',
    s2l6s: 'Legal professionals',
    s2l6t: ' signing settlement agreements, client contracts, and court documents',
    s2l7s: 'Students and educators',
    s2l7t: ' signing permission slips, field trip forms, and academic agreements',
    s2l8s: 'Remote workers',
    s2l8t: ' signing employment contracts, remote work agreements, and company policies',
    s2p2: 'The time wasted on inefficient signing processes adds up quickly. What takes seconds with digital signatures can take hours with traditional methods. More importantly, delayed signatures can:',
    s2m1: 'Delay business transactions and contract execution',
    s2m2: 'Create bottlenecks in approval workflows',
    s2m3: 'Result in lost opportunities due to slow response times',
    s2m4: 'Increase costs from printing, scanning, and shipping',
    s2m5: 'Create security risks from physical document handling',
    s2m6: 'Reduce professional appearance with low-quality scanned signatures',
    s2p3: "That's why understanding how to sign PDFs digitally isn't just about convenience—it's about working efficiently, securely, and professionally in a world where remote work and digital transactions are the norm.",

    s3h: 'The Solution: Modern Online PDF Signing Tools',
    s3p1: 'The solution to PDF signing headaches is simpler than you might expect. Modern web-based PDF signing tools handle all the technical complexity behind the scenes, giving you a clean interface to add signatures in seconds.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser—desktop, tablet, or mobile',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3t: ' Sign PDFs in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4t: ' No subscriptions, hidden fees, or account requirements',
    s3l5s: 'Multiple signature methods:',
    s3l5t: ' Draw, type, or upload your signature—choose what works best for you',
    s3l6s: 'Cross-platform compatibility:',
    s3l6t: ' Works on Windows, Mac, Linux, iOS, and Android',
    s3l7s: 'Professional appearance:',
    s3l7t: ' Clean, high-quality signatures that look professional',
    s3p3: "The best part? You don't need to understand how PDF signing works technically. The tool handles signature embedding, positioning, and document preservation automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'digital signature tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Sign PDFs Using Our Digital Signature Tool',
    s4p1: "Ready to sign your PDF? Follow these steps to add a digital signature to your document quickly and easily. We'll cover the entire process from uploading your document to downloading the signed version.",

    st1h: 'Step 1: Access the Digital Signature Tool',
    st1p1a: 'Navigate to our ',
    st1p1link: 'digital signature page',
    st1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start signing immediately. The tool works entirely in your browser, ensuring your documents never leave your device.",

    st2h: 'Step 2: Upload Your PDF Document',
    st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    st2l1: 'Drag and drop functionality for quick file upload',
    st2l2: 'Files up to 25 MB (for optimal performance)',
    st2l3: 'Any PDF file, regardless of page count',
    st2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    st2l4link: 'PDF editing tool',
    st2l4b: ')',
    st2p2: "Once uploaded, you'll see a preview of your PDF showing all pages. This helps you identify where you want to place your signature.",

    st3h: 'Step 3: Choose Your Signature Method',
    st3p1: 'This is where you decide how to create your signature. Most tools offer three main methods:',
    st3mAh: 'Method A: Draw Your Signature',
    st3mAp1: 'This method lets you draw your signature using your mouse, touchpad, or touchscreen. Simply use the drawing tool to create your signature freehand. This is great for creating a natural-looking signature that matches your handwritten style.',
    st3mAp2s: 'Best for:',
    st3mAp2t: ' When you want a signature that looks like your actual handwritten signature, or when signing on a touchscreen device.',
    st3mBh: 'Method B: Type Your Signature',
    st3mBp1: 'This method lets you type your name and choose from various fonts to create a typed signature. You can select different font styles, sizes, and colors to match your preferences. Some tools offer cursive-style fonts that look more like handwritten signatures.',
    st3mBp2s: 'Best for:',
    st3mBp2t: ' When you want a clean, professional appearance, or when you prefer consistency across all your signed documents.',
    st3mCh: 'Method C: Upload a Signature Image',
    st3mCp1: "If you already have a signature image file (PNG or JPEG), you can upload it directly. This is useful if you've previously scanned your signature or created a signature image file. The tool will embed your image into the PDF.",
    st3mCp2s: 'Best for:',
    st3mCp2t: ' When you have a pre-made signature image, or when you want to use the exact same signature across multiple documents.',

    st4h: 'Step 4: Create or Prepare Your Signature',
    st4p1: "Depending on your chosen method, you'll need to:",
    st4l1s: 'For drawn signatures:',
    st4l1t: " Use the signature pad to draw your signature. Take your time to create a signature you're happy with. You can clear and redraw as many times as needed.",
    st4l2s: 'For typed signatures:',
    st4l2t: ' Enter your name and select your preferred font style and size. Preview how it looks before proceeding.',
    st4l3s: 'For uploaded signatures:',
    st4l3t: " Select your signature image file from your device. Make sure it's a clear image with a transparent or white background for best results.",
    st4p2s: 'Pro tip:',
    st4p2t: ' If you plan to sign multiple documents, consider saving your signature (if the tool allows) or keeping your signature image file handy for future use.',

    st5h: 'Step 5: Select the Page and Position for Your Signature',
    st5p1: 'This is a crucial step. You need to decide where your signature should appear on the document:',
    st5l1s: 'Navigate to the correct page:',
    st5l1t: ' Use the page navigation controls to find the page where you need to sign',
    st5l2s: 'Identify the signature line:',
    st5l2t: ' Look for signature fields, dotted lines, or areas marked for signatures',
    st5l3s: 'Click to position:',
    st5l3t: ' Most tools let you click directly on the PDF where you want the signature to appear',
    st5l4s: 'Adjust if needed:',
    st5l4t: ' You can usually drag the signature to reposition it after placement',
    st5p2s: 'Common signature locations:',
    st5m1: 'Bottom of the last page (most common for contracts and agreements)',
    st5m2: 'Next to signature lines or fields',
    st5m3: 'In designated signature boxes or areas',
    st5m4: 'Below specific text that requires acknowledgment',
    st5p3s: 'Pro tip:',
    st5p3t: ' If the document has multiple signature fields (e.g., for multiple parties), you may need to sign in multiple locations. Some tools allow you to add multiple signatures to the same document.',

    st6h: 'Step 6: Adjust Signature Size and Appearance',
    st6p1: "Before finalizing, you can usually adjust your signature's appearance:",
    st6l1s: 'Resize the signature:',
    st6l1t: ' Drag corners or use size controls to make it larger or smaller',
    st6l2s: 'Adjust transparency:',
    st6l2t: ' Some tools let you control how opaque or transparent the signature appears',
    st6l3s: 'Change color:',
    st6l3t: ' For typed signatures, you might be able to change the text color',
    st6l4s: 'Rotate if needed:',
    st6l4t: ' Some tools allow signature rotation for special cases',
    st6p2: 'The goal is to make your signature clearly visible and appropriately sized for the document. It should look professional and be easy to read, but not overwhelm the page.',

    st7h: 'Step 7: Review and Apply Your Signature',
    st7p1: 'Before signing, take a moment to review:',
    st7l1: 'Your signature looks correct and professional',
    st7l2: 'The signature is positioned in the right location',
    st7l3: 'The signature size is appropriate for the document',
    st7l4: "You're signing the correct page",
    st7l5: 'The document is the correct one you intended to sign',
    st7p2: 'Once everything looks good, click the "Sign PDF" or "Apply Signature" button. The tool will:',
    st7o1: 'Embed your signature into the PDF document',
    st7o2: 'Preserve all original document content and formatting',
    st7o3: 'Create a new signed version of your PDF',
    st7o4: 'Prepare the file for download',
    st7p3: "Processing typically takes just a few seconds, even for multi-page documents. You'll see a progress indicator during processing.",

    st8h: 'Step 8: Download Your Signed PDF',
    st8p1: 'When processing completes, your signed PDF is ready. Click the download button to save it to your device. The file will typically have a name like "signed.pdf" or retain the original filename with a suffix.',
    st8p2s: 'Important:',
    st8p2t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your signed PDF before closing the page.',
    st8p3s: 'What to do with your signed PDF:',
    st8l1: 'Email it to the recipient',
    st8l2: 'Upload it to a document management system',
    st8l3: 'Store it in cloud storage for your records',
    st8l4: 'Print it if a physical copy is needed (though digital copies are usually sufficient)',
    st8p4: "That's it! You've successfully signed your PDF document. The entire process typically takes less than two minutes from start to finish, compared to hours with traditional print-scan methods.",

    benh: 'Benefits of Using Online PDF Signing Tools',
    benp1: 'Why choose an online PDF signing tool over traditional methods or desktop software? Here are the key advantages:',
    ben1h: '1. Speed and Efficiency',
    ben1p: 'The most obvious benefit is speed. What used to take hours (printing, signing, scanning, emailing) now takes seconds. You can sign documents from anywhere, at any time, without needing access to a printer or scanner. This is especially valuable for remote workers, travelers, and anyone who needs to sign documents quickly.',
    ben2h: '2. Zero Installation Required',
    ben2p: "Unlike desktop PDF software, online signing tools work immediately in your browser. No downloads, installations, or updates needed. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to sign documents on the go.",
    ben3h: '3. Privacy and Security',
    ben3p1: 'When you use a privacy-first PDF signing tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    ben3l1: 'Confidential business contracts',
    ben3l2: 'Personal financial documents',
    ben3l3: 'Legal agreements',
    ben3l4: 'Medical records and consent forms',
    ben3l5: 'Any sensitive information',
    ben3p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. Your signature data is processed entirely on your computer, not transmitted over the internet.',
    ben4h: '4. Cost-Effective Solution',
    ben4p: 'Most online PDF signing tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF signing, free online tools provide excellent value without any financial commitment.',
    ben5h: '5. Professional Appearance',
    ben5p: 'Digital signatures look clean and professional, without the quality degradation that comes from scanning. Your signed documents maintain their original quality and formatting, making them suitable for business and legal purposes.',
    ben6h: '6. Cross-Platform Compatibility',
    ben6p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF signing tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    ben7h: '7. Environmental Benefits',
    ben7p: "Going paperless isn't just convenient—it's environmentally responsible. By eliminating the need to print documents for signing, you reduce paper waste, ink consumption, and energy usage. This is especially important for businesses that process many documents regularly.",
    ben8h: '8. Legal Validity',
    ben8p: 'Electronic signatures are legally binding in many jurisdictions, including the United States (ESIGN Act) and European Union (eIDAS). For most business and personal documents, e-signatures carry the same legal weight as handwritten signatures, making them suitable for contracts, agreements, and official documents.',
    ben9h: '9. Always Up-to-Date',
    ben9p: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    ben10h: '10. Multiple Signature Options',
    ben10p: 'Unlike traditional methods that only allow handwritten signatures, online tools offer flexibility. You can draw your signature, type it, or upload an image. This versatility means you can choose the method that works best for your situation and device.',

    cmph: 'Comparison: Online PDF Signing Tools vs. Other Methods',
    cmpp1: "How do online PDF signing tools stack up against alternatives? Let's break down the comparison:",

    cmp1h: 'Online PDF Signing Tools vs. Print-Scan Method',
    cmp1s1: 'Print-Scan Method:',
    cmp1a1: 'Requires printer and scanner',
    cmp1a2: 'Time-consuming (30+ minutes per document)',
    cmp1a3: 'Quality degradation with each scan',
    cmp1a4: 'Physical presence required',
    cmp1a5: 'Paper and ink costs',
    cmp1a6: 'Environmental impact',
    cmp1a7: 'Risk of document loss or damage',
    cmp1a8: 'Not suitable for remote work',
    cmp1s2: 'Online PDF Signing Tools:',
    cmp1b1: 'No hardware required',
    cmp1b2: 'Fast (seconds, not minutes)',
    cmp1b3: 'Maintains original quality',
    cmp1b4: 'Works from anywhere',
    cmp1b5: 'Free to use',
    cmp1b6: 'Environmentally friendly',
    cmp1b7: 'Secure digital storage',
    cmp1b8: 'Perfect for remote work',
    cmp1vs: 'Verdict:',
    cmp1vt: ' Online tools are superior in every way. The print-scan method is outdated and should only be used when absolutely necessary (e.g., when a physical signature is legally required).',

    cmp2h: 'Online PDF Signing Tools vs. Desktop Software',
    cmp2s1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    cmp2a1: 'More advanced features (certificate-based signing, form filling, etc.)',
    cmp2a2: 'Works offline',
    cmp2a3: 'Better for very large files (500+ pages)',
    cmp2a4: 'Certificate-based digital signatures',
    cmp2a5: 'Requires installation and updates',
    cmp2a6: 'Often expensive ($100-300+ or subscription fees)',
    cmp2a7: 'Platform-specific (Windows or Mac, rarely both)',
    cmp2a8: 'Takes up disk space',
    cmp2a9: 'Learning curve for advanced features',
    cmp2s2: 'Online PDF Signing Tools:',
    cmp2b1: 'Free to use',
    cmp2b2: 'No installation required',
    cmp2b3: 'Works on any platform',
    cmp2b4: 'Always up-to-date',
    cmp2b5: 'Privacy-first (client-side processing)',
    cmp2b6: 'Easy to use',
    cmp2b7: 'Multiple signature methods',
    cmp2b8: 'Requires internet connection (for initial page load)',
    cmp2b9: 'May struggle with extremely large files (500+ pages)',
    cmp2b10: 'Typically creates electronic signatures, not certificate-based digital signatures',
    cmp2vs: 'Verdict:',
    cmp2vt: ' For most users, online tools are the better choice due to convenience, cost, and ease of use. Desktop software is better if you need certificate-based digital signatures, work extensively offline, or regularly handle very large files.',

    cmp3h: 'Online PDF Signing Tools vs. Cloud-Based E-Signature Services',
    cmp3s1: 'Cloud-Based Services (DocuSign, HelloSign, etc.):',
    cmp3a1: 'Advanced workflow features (multi-party signing, reminders, etc.)',
    cmp3a2: 'Audit trails and compliance features',
    cmp3a3: 'Integration with business tools',
    cmp3a4: 'Certificate-based digital signatures',
    cmp3a5: 'Files uploaded to servers (privacy concern)',
    cmp3a6: 'Requires account creation',
    cmp3a7: 'Often requires subscription fees',
    cmp3a8: 'Slower processing (upload/download time)',
    cmp3a9: 'Storage limits apply',
    cmp3a10: 'Files may be retained on servers',
    cmp3s2: 'Client-Side Online Signing Tools:',
    cmp3b1: 'No file uploads (privacy-first)',
    cmp3b2: 'No account required',
    cmp3b3: 'Faster processing (no upload/download)',
    cmp3b4: 'No storage limits',
    cmp3b5: 'Files never leave your device',
    cmp3b6: 'Free to use',
    cmp3b7: 'Simple and straightforward',
    cmp3b8: 'No advanced workflow features',
    cmp3b9: 'No built-in audit trails',
    cmp3b10: 'Typically creates electronic signatures, not certificate-based',
    cmp3vs: 'Verdict:',
    cmp3vt: ' For individual users and simple signing needs, client-side online tools are superior due to privacy and simplicity. Cloud-based services are better for businesses that need advanced workflows, multi-party signing, and compliance features.',

    faqVisH: 'Frequently Asked Questions About Digital Signatures',

    cnh: 'Conclusion: Making PDF Signing Simple and Secure',
    cnp1: "Adding digital signatures to PDF documents doesn't have to be complicated. With modern online PDF signing tools, signing documents electronically is straightforward, fast, and secure. Whether you're a business professional handling contracts, a freelancer signing agreements, or anyone who regularly needs to approve documents, the right tool makes all the difference.",
    cnp2: 'The key advantages of online PDF signing tools—no installation, privacy-first processing, free access, multiple signature methods, and cross-platform compatibility—make them the ideal solution for most signing needs. While desktop software and cloud-based services have their place for advanced use cases, simple document signing is perfectly handled by browser-based tools.',
    cnp3: 'Remember these best practices:',
    cnl1: 'Choose the signature method that works best for your situation (draw, type, or upload)',
    cnl2: 'Position your signature clearly and professionally on the document',
    cnl3: 'Use privacy-first tools that process files locally in your browser',
    cnl4: 'Review your signed PDF before finalizing important documents',
    cnl5: "Keep backups of original unsigned documents until you're satisfied with the signed version",
    cnl6: 'Understand the legal validity of e-signatures in your jurisdiction',
    cnl7: 'For sensitive documents, consider certificate-based digital signatures if available',
    cnp4a: 'Ready to sign your PDFs? Try our ',
    cnp4link1: 'free digital signature tool',
    cnp4b: ' and experience how simple signing documents can be. And if you need to make edits to your PDFs before or after signing, check out our ',
    cnp4link2: 'PDF editing tool',
    cnp4c: ' for adding text, images, and annotations. For large files, our ',
    cnp4link3: 'PDF compression tool',
    cnp4d: ' can help reduce file sizes. And if you need to combine multiple signed documents, our ',
    cnp4link4: 'PDF merger tool',
    cnp4e: ' makes it easy to merge documents together.',
    cnp5: 'PDF signing doesn\'t have to be a chore. With the right tools and approach, you can handle document signing quickly and confidently, leaving more time for the work that actually matters. Embrace the digital age and say goodbye to printing, scanning, and waiting—your documents deserve better.',

    // Related Articles
    ra1t: 'How to Merge PDF Files Online',
    ra1d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    ra2t: 'How to Split PDF Files Online',
    ra2d: 'Complete guide to dividing large PDF documents into smaller files using free online tools.',
    ra3t: 'How to Edit a PDF Online',
    ra3d: 'Complete guide to editing PDF files online without installing software.',
    ra4t: 'Is It Safe to Edit PDFs Online?',
    ra4d: 'Learn about privacy and security when editing PDF documents online.',

    // Visible FAQ (13) — distinct wording/count from the schema FAQ
    fv1q: 'How do I add a digital signature to a PDF online for free?',
    fv1a1: 'You can add a digital signature to a PDF online for free by using our ',
    fv1a2: 'digital signature tool',
    fv1a3: '. Simply upload your PDF file, choose your signature method (draw, type, or upload), position the signature on the document, and click sign. The tool adds your signature to the PDF instantly without requiring any software installation or account creation. The entire process takes just seconds.',
    fv2q: 'Is it safe to sign PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF signing tool that processes files locally in your browser, your documents never leave your device. All signing happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'What is the difference between a digital signature and an electronic signature?',
    fv3a: "An electronic signature (e-signature) is a broad term for any electronic indication of intent to sign, such as a typed name, drawn signature, or image. Most online PDF signing tools create electronic signatures. A digital signature uses cryptographic technology (certificate-based) to verify the signer's identity and ensure document integrity. Digital signatures provide stronger authentication and tamper detection, but require certificate infrastructure. For most purposes, electronic signatures are sufficient and legally valid.",
    fv4q: 'Can I sign a PDF without printing it?',
    fv4a: 'Absolutely. Online PDF signing tools allow you to add signatures directly to PDF documents without printing, scanning, or using paper. You can sign documents electronically in seconds, making the process much faster and more environmentally friendly than traditional paper-based signing. This is one of the primary advantages of digital signatures.',
    fv5q: 'Do I need to create an account to sign PDFs online?',
    fv5a: 'No, many free PDF signing tools work without requiring account creation or registration. You can upload, sign, and download your signed PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving signature templates or accessing premium features, but basic PDF signing is typically available without any registration.',
    fv6q: 'Can I sign multiple PDFs at once?',
    fv6a: "Most online PDF signing tools process one document at a time for optimal signature placement and quality. However, you can quickly sign multiple documents by processing them sequentially. Some advanced tools may offer batch signing capabilities for documents that need signatures in the same location. For different signature positions, you'll need to process each document individually.",
    fv7q: 'What file formats can I use for my signature?',
    fv7a: 'Most online PDF signing tools support multiple signature formats: you can draw your signature with a mouse or touchpad, type your name in various fonts, or upload an image file (PNG or JPEG) of your signature. The tool will embed your signature directly into the PDF document. Drawn signatures work well for natural-looking signatures, typed signatures offer consistency, and uploaded images are great if you have a pre-made signature file.',
    fv8q: 'Will my signature be legally binding?',
    fv8a: 'Electronic signatures are legally binding in many jurisdictions, including the United States (ESIGN Act) and European Union (eIDAS). However, legal validity depends on factors like signer intent, consent, and document type. For most business contracts, agreements, and personal documents, e-signatures carry the same legal weight as handwritten signatures. For highly sensitive documents like wills or certain real estate transactions, consult legal counsel. Most standard business and personal documents signed electronically are legally valid.',
    fv9q: 'Can I remove a signature from a PDF after signing?',
    fv9a1: 'If you need to modify a signed PDF, you can use ',
    fv9a2: 'PDF editing tools',
    fv9a3: " to remove or replace signatures. However, for documents that require tamper-proof signing, consider using certificate-based digital signatures that detect any modifications. Keep in mind that removing a signature may affect the document's legal validity, so only do this if you have a legitimate reason and proper authorization.",
    fv10q: 'What is the maximum file size for signing PDFs online?',
    fv10a1: 'File size limits vary by tool, but most online PDF signing tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts during signing. If you need to sign very large PDFs, consider using desktop software designed for heavy-duty processing, or split the file first using our ',
    fv10a2: 'PDF splitter tool',
    fv10a3: '.',
    fv11q: 'Can I sign PDFs on mobile devices?',
    fv11a: 'Yes, many online PDF signing tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large files might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). Touchscreen devices actually work great for drawing signatures, making mobile signing a convenient option for many users.',
    fv12q: 'Can I add multiple signatures to the same PDF?',
    fv12a: "This depends on the tool you're using. Some online PDF signing tools allow you to add multiple signatures to different locations on the same document. This is useful for documents that require signatures from multiple parties. You may need to process the document multiple times, adding one signature at a time, or use a tool that supports multiple signature placement in a single session.",
    fv13q: 'Will signing a PDF change the file size?',
    fv13a1: 'Adding a signature to a PDF typically increases the file size slightly, usually by a few kilobytes to a few hundred kilobytes, depending on the signature method used. Drawn signatures and uploaded images may add more to the file size than typed signatures. The increase is usually minimal and shouldn\'t cause issues. If file size is a concern, you can use our ',
    fv13a2: 'PDF compression tool',
    fv13a3: ' to reduce the size after signing.',

    // Schema FAQ (10) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I add a digital signature to a PDF online for free?',
    fq1a: 'You can add a digital signature to a PDF online for free by using our digital signature tool. Simply upload your PDF file, choose your signature method (draw, type, or upload), position the signature on the document, and click sign. The tool adds your signature to the PDF instantly without requiring any software installation or account creation.',
    fq2q: 'Is it safe to sign PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF signing tool that processes files locally in your browser, your documents never leave your device. All signing happens client-side, ensuring your sensitive documents remain secure and private. Your signature data is processed entirely on your computer, not uploaded to any servers.',
    fq3q: 'What is the difference between a digital signature and an electronic signature?',
    fq3a: "An electronic signature (e-signature) is a broad term for any electronic indication of intent to sign, such as a typed name, drawn signature, or image. A digital signature uses cryptographic technology to verify the signer's identity and ensure document integrity. Most online PDF signing tools create electronic signatures, while true digital signatures require certificate-based authentication.",
    fq4q: 'Can I sign a PDF without printing it?',
    fq4a: 'Absolutely. Online PDF signing tools allow you to add signatures directly to PDF documents without printing, scanning, or using paper. You can sign documents electronically in seconds, making the process much faster and more environmentally friendly than traditional paper-based signing.',
    fq5q: 'Do I need to create an account to sign PDFs online?',
    fq5a: 'No, many free PDF signing tools work without requiring account creation or registration. You can upload, sign, and download your signed PDF files immediately without signing up. This makes the process faster and more private.',
    fq6q: 'Can I sign multiple PDFs at once?',
    fq6a: 'Most online PDF signing tools process one document at a time for optimal signature placement and quality. However, you can quickly sign multiple documents by processing them sequentially. Some advanced tools may offer batch signing capabilities for documents that need signatures in the same location.',
    fq7q: 'What file formats can I use for my signature?',
    fq7a: 'Most online PDF signing tools support multiple signature formats: you can draw your signature with a mouse or touchpad, type your name in various fonts, or upload an image file (PNG or JPEG) of your signature. The tool will embed your signature directly into the PDF document.',
    fq8q: 'Will my signature be legally binding?',
    fq8a: 'Electronic signatures are legally binding in many jurisdictions, including the United States (ESIGN Act) and European Union (eIDAS). However, legal validity depends on factors like signer intent, consent, and document type. For highly sensitive documents, consult legal counsel. Most business and personal documents signed electronically are legally valid.',
    fq9q: 'Can I remove a signature from a PDF after signing?',
    fq9a: 'If you need to modify a signed PDF, you can use PDF editing tools to remove or replace signatures. However, for documents that require tamper-proof signing, consider using certificate-based digital signatures that detect any modifications. Our PDF editing tool allows you to make changes to signed documents if needed.',
    fq10q: 'What is the maximum file size for signing PDFs online?',
    fq10a: 'File size limits vary by tool, but most online PDF signing tools support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues during signing.',
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
      images: [{ url: `${siteUrl}/images/blog/digital-signature-hero.png`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/digital-signature-hero.png`],
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
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
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
                {c.s3p4a}<Link href={L('/digital-signature')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.st1p1a}<Link href={L('/digital-signature')} className="text-primary-400 hover:text-primary-300 underline">{c.st1p1link}</Link>{c.st1p1b}
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st3p1}
                </p>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3mAh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3mAp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3mAp2s}</strong>{c.st3mAp2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3mBh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3mBp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3mBp2s}</strong>{c.st3mBp2t}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.st3mCh}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.st3mCp1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.st3mCp2s}</strong>{c.st3mCp2t}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st4l1s}</strong>{c.st4l1t}</li>
                  <li><strong className="text-white">{c.st4l2s}</strong>{c.st4l2t}</li>
                  <li><strong className="text-white">{c.st4l3s}</strong>{c.st4l3t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.st4p2s}</strong>{c.st4p2t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st5p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st5l1s}</strong>{c.st5l1t}</li>
                  <li><strong className="text-white">{c.st5l2s}</strong>{c.st5l2t}</li>
                  <li><strong className="text-white">{c.st5l3s}</strong>{c.st5l3t}</li>
                  <li><strong className="text-white">{c.st5l4s}</strong>{c.st5l4t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st5p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st5m1}</li>
                  <li>{c.st5m2}</li>
                  <li>{c.st5m3}</li>
                  <li>{c.st5m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.st5p3s}</strong>{c.st5p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.st6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st6p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.st6l1s}</strong>{c.st6l1t}</li>
                  <li><strong className="text-white">{c.st6l2s}</strong>{c.st6l2t}</li>
                  <li><strong className="text-white">{c.st6l3s}</strong>{c.st6l3t}</li>
                  <li><strong className="text-white">{c.st6l4s}</strong>{c.st6l4t}</li>
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
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st7l1}</li>
                  <li>{c.st7l2}</li>
                  <li>{c.st7l3}</li>
                  <li>{c.st7l4}</li>
                  <li>{c.st7l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.st7p2}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st7o1}</li>
                  <li>{c.st7o2}</li>
                  <li>{c.st7o3}</li>
                  <li>{c.st7o4}</li>
                </ol>
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
                  <strong className="text-white">{c.st8p2s}</strong>{c.st8p2t}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.st8p3s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.st8l1}</li>
                  <li>{c.st8l2}</li>
                  <li>{c.st8l3}</li>
                  <li>{c.st8l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.st8p4}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.benh}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.benp1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben1h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben1p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben2h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben2p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.ben3p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.ben3l1}</li>
                  <li>{c.ben3l2}</li>
                  <li>{c.ben3l3}</li>
                  <li>{c.ben3l4}</li>
                  <li>{c.ben3l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben4h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben4p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben5h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben5p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben6h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben6p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben7h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben7p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben8h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben8p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben9h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben9p}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.ben10h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.ben10p}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.cmph}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.cmpp1}
              </p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.cmp1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp1s1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>❌ {c.cmp1a1}</li>
                  <li>❌ {c.cmp1a2}</li>
                  <li>❌ {c.cmp1a3}</li>
                  <li>❌ {c.cmp1a4}</li>
                  <li>❌ {c.cmp1a5}</li>
                  <li>❌ {c.cmp1a6}</li>
                  <li>❌ {c.cmp1a7}</li>
                  <li>❌ {c.cmp1a8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp1s2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>✅ {c.cmp1b1}</li>
                  <li>✅ {c.cmp1b2}</li>
                  <li>✅ {c.cmp1b3}</li>
                  <li>✅ {c.cmp1b4}</li>
                  <li>✅ {c.cmp1b5}</li>
                  <li>✅ {c.cmp1b6}</li>
                  <li>✅ {c.cmp1b7}</li>
                  <li>✅ {c.cmp1b8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.cmp1vs}</strong>{c.cmp1vt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.cmp2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp2s1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>✅ {c.cmp2a1}</li>
                  <li>✅ {c.cmp2a2}</li>
                  <li>✅ {c.cmp2a3}</li>
                  <li>✅ {c.cmp2a4}</li>
                  <li>❌ {c.cmp2a5}</li>
                  <li>❌ {c.cmp2a6}</li>
                  <li>❌ {c.cmp2a7}</li>
                  <li>❌ {c.cmp2a8}</li>
                  <li>❌ {c.cmp2a9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp2s2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>✅ {c.cmp2b1}</li>
                  <li>✅ {c.cmp2b2}</li>
                  <li>✅ {c.cmp2b3}</li>
                  <li>✅ {c.cmp2b4}</li>
                  <li>✅ {c.cmp2b5}</li>
                  <li>✅ {c.cmp2b6}</li>
                  <li>✅ {c.cmp2b7}</li>
                  <li>❌ {c.cmp2b8}</li>
                  <li>❌ {c.cmp2b9}</li>
                  <li>❌ {c.cmp2b10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.cmp2vs}</strong>{c.cmp2vt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.cmp3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp3s1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>✅ {c.cmp3a1}</li>
                  <li>✅ {c.cmp3a2}</li>
                  <li>✅ {c.cmp3a3}</li>
                  <li>✅ {c.cmp3a4}</li>
                  <li>❌ {c.cmp3a5}</li>
                  <li>❌ {c.cmp3a6}</li>
                  <li>❌ {c.cmp3a7}</li>
                  <li>❌ {c.cmp3a8}</li>
                  <li>❌ {c.cmp3a9}</li>
                  <li>❌ {c.cmp3a10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.cmp3s2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>✅ {c.cmp3b1}</li>
                  <li>✅ {c.cmp3b2}</li>
                  <li>✅ {c.cmp3b3}</li>
                  <li>✅ {c.cmp3b4}</li>
                  <li>✅ {c.cmp3b5}</li>
                  <li>✅ {c.cmp3b6}</li>
                  <li>✅ {c.cmp3b7}</li>
                  <li>❌ {c.cmp3b8}</li>
                  <li>❌ {c.cmp3b9}</li>
                  <li>❌ {c.cmp3b10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.cmp3vs}</strong>{c.cmp3vt}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqVisH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/digital-signature')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1a2}</Link>{c.fv1a3}
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
                    {c.fv9a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9a2}</Link>{c.fv9a3}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10a2}</Link>{c.fv10a3}
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
                    {c.fv13a1}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv13a2}</Link>{c.fv13a3}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.cnh}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.cnp1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.cnp2}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.cnp3}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.cnl1}</li>
                <li>{c.cnl2}</li>
                <li>{c.cnl3}</li>
                <li>{c.cnl4}</li>
                <li>{c.cnl5}</li>
                <li>{c.cnl6}</li>
                <li>{c.cnl7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.cnp4a}<Link href={L('/digital-signature')} className="text-primary-400 hover:text-primary-300 underline">{c.cnp4link1}</Link>{c.cnp4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.cnp4link2}</Link>{c.cnp4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.cnp4link3}</Link>{c.cnp4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.cnp4link4}</Link>{c.cnp4e}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.cnp5}
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
import { TRANSLATIONS } from './digital-signature.i18n'
Object.assign(C, TRANSLATIONS)
