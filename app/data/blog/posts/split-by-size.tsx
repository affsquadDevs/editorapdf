import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'split-by-size'
const postPath = `/blog/${slug}`
const heroImage = '/blog/Split PDF by Size_ Complete Guide to Dividing Large PDFs by File Size.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'Split PDF by Size Online (Divide Large PDFs by MB)',
    metaDesc: 'Split large PDF files by file size. Set maximum MB limits and automatically divide your PDF into smaller downloadable parts.',
    ogTitle: 'Split PDF by Size Online (Divide Large PDFs by MB)',
    ogDesc: 'Split large PDF files by file size. Set maximum MB limits and automatically divide your PDF into smaller downloadable parts.',
    twTitle: 'Split PDF by Size Online (Divide Large PDFs by MB)',
    twDesc: 'Split large PDF files by file size. Set maximum MB limits and automatically divide your PDF into smaller downloadable parts.',
    heroAlt: 'Banner showing large PDF file divided into smaller PDFs by file size limits',

    bcLeaf: 'Split PDF by Size',
    heroImgAlt: 'Split PDF by size - Free online PDF splitter tool guide',
    heroTitle: 'Split PDF by Size: Complete Guide to Dividing Large PDFs by File Size',
    heroSubtitle: 'Learn how to split PDF files by size online. Divide large documents into smaller files based on file size limits. Perfect for email attachments and file sharing.',

    artHeadline: 'Split PDF by Size: Complete Guide to Dividing Large PDFs by File Size',
    artDesc: 'Complete guide on how to split PDF files by size online. Learn to divide large PDF documents into smaller files based on file size limits. Perfect for email attachments, file sharing, and managing large documents. Step-by-step instructions and best practices.',

    intro1: "You've got a 45 MB PDF file that needs to be emailed, but your email service has a 25 MB attachment limit. Or maybe you're trying to upload a large document to a system that only accepts files under 10 MB. These are the moments when you realize that splitting PDFs by size isn't just convenient—it's essential.",
    intro2: 'Splitting PDF files by file size is one of those features that seems simple until you actually need it. Unlike splitting by page ranges where you know exactly which pages you want, splitting by size requires the tool to intelligently divide your document while maintaining quality and ensuring each piece stays within your specified limit. This comprehensive guide will walk you through everything you need to know about splitting PDFs by size, from understanding when and why to use this method to mastering the process with our free online tool.',

    s1h: 'The Problem: When File Size Becomes a Barrier',
    s1p1: "We live in a world full of file size restrictions. Email services cap attachments at 25 MB. Cloud storage platforms have upload limits. Content management systems restrict file sizes. Even file sharing services have their own constraints. When you're working with large PDF documents—whether they're comprehensive reports, scanned archives, or multi-page presentations—these limitations can bring your workflow to a grinding halt.",
    s1p2: "Here's what makes large PDF files problematic:",
    s1l1a: 'Email attachment limits:',
    s1l1b: ' Most email providers restrict attachments to 25 MB, with some corporate systems limiting to 10 MB or less',
    s1l2a: 'Upload restrictions:',
    s1l2b: ' Many web forms and content management systems have strict file size limits that prevent large document uploads',
    s1l3a: 'Transfer speed issues:',
    s1l3b: ' Large files take longer to upload, download, and share, especially on slower internet connections',
    s1l4a: 'Storage constraints:',
    s1l4b: ' Some platforms limit individual file sizes even when you have plenty of total storage space',
    s1l5a: 'Mobile device limitations:',
    s1l5b: ' Mobile apps often have stricter size limits than desktop applications',
    s1l6a: 'Bandwidth concerns:',
    s1l6b: ' Sending or receiving very large files can consume significant bandwidth, especially problematic for users on limited data plans',
    s1p3: 'The traditional workaround—manually splitting by guessing page counts—is tedious and error-prone. You might split a 100-page PDF into 20-page chunks, only to discover that some chunks are still too large because certain pages contain high-resolution images or complex graphics. Or you might create unnecessarily small files, resulting in dozens of separate documents that are difficult to manage.',
    s1p4: "That's where splitting by file size comes in. Instead of guessing how many pages equal a certain file size, you tell the tool exactly what size limit you need, and it intelligently divides your PDF accordingly. This ensures every split file stays within your limit while maximizing the content in each file.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: 'File size restrictions affect professionals across every industry. What seems like a minor inconvenience can actually create significant workflow bottlenecks and productivity losses. Consider these real-world scenarios where splitting PDFs by size becomes critical:',
    s2l1a: 'Legal professionals',
    s2l1b: ' sending case files, evidence documents, or discovery materials that exceed email limits',
    s2l2a: 'Healthcare workers',
    s2l2b: ' sharing patient records, medical imaging files, or comprehensive health histories that need to stay within HIPAA-compliant file sharing limits',
    s2l3a: 'Real estate agents',
    s2l3b: ' distributing property documentation packages that are too large for standard email attachments',
    s2l4a: 'Architects and engineers',
    s2l4b: ' sharing detailed blueprints, technical drawings, or project specifications that exceed platform upload limits',
    s2l5a: 'Accountants and financial advisors',
    s2l5b: ' sending comprehensive financial reports, tax documents, or audit files that need to meet client portal size restrictions',
    s2l6a: 'Researchers and academics',
    s2l6b: ' submitting large research papers, datasets, or comprehensive literature reviews to journals with strict file size requirements',
    s2l7a: 'HR departments',
    s2l7b: ' distributing employee handbooks, policy documents, or training materials that need to be accessible via email or company portals',
    s2l8a: 'Content creators',
    s2l8b: ' sharing large portfolios, design files, or media documentation that exceed social media or portfolio platform limits',
    s2p2: 'The consequences of not having a proper solution can be severe:',
    s2m1: 'Delayed communication when emails bounce back due to size limits',
    s2m2: "Frustrated clients or colleagues who can't access important documents",
    s2m3: 'Time wasted trying workarounds like compressing files (which can reduce quality) or using multiple file transfer services',
    s2m4: 'Security risks when resorting to unverified third-party file sharing services',
    s2m5: "Professional credibility issues when you can't deliver documents in a timely manner",
    s2m6: 'Compliance problems when file size prevents proper document distribution in regulated industries',
    s2p3: "Understanding how to split PDFs by size isn't just about convenience—it's about maintaining professional workflows, meeting client expectations, and ensuring your documents can be shared and accessed when they're needed most.",

    s3h: 'The Solution: Intelligent PDF Splitting by File Size',
    s3p1: 'Modern PDF splitting tools solve the file size problem with intelligent algorithms that analyze your document and divide it optimally. Instead of requiring you to manually calculate page counts or guess where to split, these tools automatically determine the best split points based on your specified file size limit.',
    s3p2: "Here's how intelligent size-based splitting works:",
    s3l1a: 'Automatic size calculation:',
    s3l1b: " The tool analyzes each page's size contribution to determine where to split",
    s3l2a: 'Page boundary preservation:',
    s3l2b: ' Splits occur at page boundaries, never in the middle of a page, ensuring document integrity',
    s3l3a: 'Optimal grouping:',
    s3l3b: ' Pages are grouped intelligently to maximize content in each file while staying under your limit',
    s3l4a: 'Quality preservation:',
    s3l4b: ' No compression or quality reduction—pages are extracted as-is from the original document',
    s3l5a: 'Flexible size limits:',
    s3l5b: ' You can specify any size limit from 1 MB to 50 MB or more, depending on your needs',
    s3l6a: 'Instant processing:',
    s3l6b: ' All splitting happens in your browser, so your files never leave your device',
    s3p3: "The best part? You don't need to understand the technical details. You simply specify your desired maximum file size—say, 10 MB for email attachments—and the tool handles everything else. It creates as many files as needed, each under your specified limit, with clear naming so you can easily identify and manage them.",
    s3p4a: 'Our ',
    s3p4link: 'PDF splitter tool',
    s3p4b: " includes this size-based splitting feature, making it easy to divide large documents into email-friendly or upload-compatible chunks. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Split PDF Files by Size',
    s4p1: "Ready to split your PDF by size? Follow these detailed steps to divide large PDF files into smaller, size-optimized documents. The process is straightforward, but we'll walk through each step to ensure you get the best results.",

    s4s1h: 'Step 1: Access the PDF Splitter Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF splitter page',
    s4s1p1b: ". You'll see a clean, intuitive interface with options for different splitting methods. No account creation, login, or payment required—you can start splitting immediately.",
    s4s1p2: "The interface is designed to be self-explanatory, with clear labels and helpful tooltips. You'll see options for splitting by page ranges, by bookmarks, and—most importantly for our purposes—by file size.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25-50 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count or complexity',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview showing your PDF's total page count and file size. This information helps you understand what you're working with and plan your size-based split accordingly.",
    s4s2p3a: 'Pro tip:',
    s4s2p3b: ' If your file is very large (over 50 MB), consider using our ',
    s4s2p3link: 'PDF compression tool',
    s4s2p3c: ' first to reduce the size, then split the compressed file. This can make the splitting process faster and more efficient.',

    s4s3h: 'Step 3: Select "Split by Size" Option',
    s4s3p1: 'Look for the splitting method options and select "Split by Size" or "Split by File Size." This tells the tool to divide your PDF based on file size limits rather than page counts or bookmarks.',
    s4s3p2: "You might see this option labeled differently depending on the tool, but it's typically clearly marked. Some tools show it as a tab, button, or dropdown menu option. The key is finding the size-based splitting feature rather than page-based or bookmark-based splitting.",

    s4s4h: 'Step 4: Specify Your Maximum File Size',
    s4s4p1: 'This is the crucial step. Enter your desired maximum file size for each split file. The tool will create as many files as needed, with each file staying under your specified limit.',
    s4s4p2: 'Common size limits and their use cases:',
    s4s4l1a: '5 MB:',
    s4s4l1b: ' Very conservative limit, ideal for strict email systems or mobile file sharing',
    s4s4l2a: '10 MB:',
    s4s4l2b: ' Standard email attachment size, works with most email providers',
    s4s4l3a: '15 MB:',
    s4s4l3b: ' Comfortable email size that stays well under most 25 MB limits',
    s4s4l4a: '20 MB:',
    s4s4l4b: ' Maximum safe size for email, just under typical 25 MB limits',
    s4s4l5a: '25 MB:',
    s4s4l5b: ' Maximum for most email services, use if you need the largest possible files',
    s4s4l6a: '50 MB or more:',
    s4s4l6b: ' For cloud storage, file sharing services, or systems with higher limits',
    s4s4p3a: 'How to choose the right size:',
    s4s4m1: "Check your email provider's attachment limit (most are 25 MB, but some corporate systems are lower)",
    s4s4m2: "Consider your recipient's email system—some have stricter limits than others",
    s4s4m3: 'Think about upload platforms—many web forms limit files to 10 MB or less',
    s4s4m4: 'Balance file count vs. file size—smaller limits create more files but ensure compatibility',
    s4s4m5: 'Account for email overhead—a 25 MB limit might actually mean 24 MB is safer to account for email encoding',
    s4s4p4: 'Most tools let you specify size in MB (megabytes). Simply enter the number—for example, "10" for 10 MB or "5" for 5 MB. Some advanced tools also support KB (kilobytes) for very precise control.',

    s4s5h: 'Step 5: Review Split Preview (If Available)',
    s4s5p1: 'Some tools provide a preview showing how many files will be created and their approximate sizes. This preview helps you:',
    s4s5l1: 'Verify that your size limit is appropriate',
    s4s5l2: "See how many files you'll end up with",
    s4s5l3: 'Confirm that all files will stay under your limit',
    s4s5l4: 'Adjust your size limit if needed before processing',
    s4s5p2: "If the preview shows you'll get 20+ files, you might want to increase your size limit slightly to reduce the number of files. Conversely, if you're getting just 2-3 files and need more granular control, you could decrease the limit.",

    s4s6h: 'Step 6: Configure File Naming (Optional)',
    s4s6p1: 'Many tools let you customize how split files are named. Common naming patterns include:',
    s4s6l1: 'Original name + part number (e.g., "document_part1.pdf", "document_part2.pdf")',
    s4s6l2: 'Original name + size indicator (e.g., "document_5mb_part1.pdf")',
    s4s6l3: 'Sequential numbering (e.g., "split_001.pdf", "split_002.pdf")',
    s4s6l4: 'Custom prefix + numbers (you specify the prefix)',
    s4s6p2: "Choose a naming pattern that makes sense for your workflow. If you're emailing files, descriptive names help recipients understand what they're receiving. If you're archiving, sequential numbers might be sufficient.",

    s4s7h: 'Step 7: Click Split and Wait for Processing',
    s4s7p1: 'Once everything looks good, click the "Split PDF" or "Split by Size" button. The tool will:',
    s4s7o1: "Analyze your PDF's structure and page sizes",
    s4s7o2: 'Calculate optimal split points based on your size limit',
    s4s7o3: 'Extract pages and group them into separate files',
    s4s7o4: 'Ensure each file stays under your specified size limit',
    s4s7o5: 'Generate all split PDF files',
    s4s7p2: 'Processing time depends on several factors:',
    s4s7m1: 'Total size of your original PDF',
    s4s7m2: 'Number of pages (more pages = more processing)',
    s4s7m3: 'Complexity of content (images and graphics take longer to process)',
    s4s7m4: 'Number of files being created',
    s4s7m5: "Your device's processing power",
    s4s7p3: "For typical splits (50-100 pages into 3-5 files), processing usually takes 10-30 seconds. Very large PDFs (200+ pages) might take 1-2 minutes. You'll see a progress indicator during processing, so you know the tool is working.",

    s4s8h: 'Step 8: Download Your Split PDFs',
    s4s8p1: "When processing completes, your split PDFs are ready. You'll typically see a list of all created files with their sizes and names. You can:",
    s4s8l1: 'Download individual files one by one',
    s4s8l2: 'Download all files as a ZIP archive (most convenient for multiple files)',
    s4s8l3: 'Preview each file before downloading to verify content',
    s4s8l4: "Check file sizes to confirm they're all under your limit",
    s4s8p2a: 'Important:',
    s4s8p2b: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your split PDFs before closing the page.',
    s4s8p3a: 'Pro tip:',
    s4s8p3b: " If you're emailing multiple files, downloading as a ZIP archive is convenient, but remember that recipients will need to extract the ZIP. Alternatively, you can email files individually, which is often easier for recipients.",
    s4s8p4: "That's it! You've successfully split your PDF by size. The entire process typically takes less than three minutes from start to finish, and you now have perfectly sized files ready for email, upload, or sharing.",

    s5h: 'Benefits of Splitting PDFs by Size',
    s5p1: 'Why choose size-based splitting over other methods? Here are the key advantages that make this approach ideal for many use cases:',

    s5s1h: '1. Guaranteed Compatibility with Size Limits',
    s5s1p1: "The biggest advantage is certainty. When you split by size, you know with 100% confidence that every file will stay under your specified limit. There's no guessing, no trial and error, no bounced emails or failed uploads. You set the limit, and the tool ensures compliance.",

    s5s2h: '2. Optimal File Sizing',
    s5s2p1: 'Size-based splitting maximizes content in each file while respecting your limit. Unlike manual page-based splitting where you might create unnecessarily small files, the tool groups pages intelligently to get as close to your limit as possible without exceeding it.',
    s5s2p2: 'For example, if you have a 50 MB PDF and set a 10 MB limit, you\'ll get 5 files of approximately 10 MB each. If you split by pages manually, you might end up with 8 files of varying sizes, some much smaller than necessary.',

    s5s3h: '3. Handles Variable Page Sizes Automatically',
    s5s3p1: "PDFs aren't uniform—some pages are text-heavy (small file size), while others contain high-resolution images or complex graphics (large file size). When you split by page count, you might create files with wildly different sizes.",
    s5s3p2: 'Size-based splitting accounts for this automatically. A file might contain 15 text pages or 3 image-heavy pages—the tool adjusts to keep file sizes consistent, which is exactly what you need for email or upload compatibility.',

    s5s4h: '4. Perfect for Email Attachments',
    s5s4p1: 'Email attachment limits are the most common reason people need to split PDFs by size. With size-based splitting, you can confidently split any document to meet email requirements. Set your limit to 10 MB or 20 MB (depending on your email provider), and every file will be ready to send without worrying about bounce-backs or delivery failures.',

    s5s5h: '5. No Quality Loss',
    s5s5p1: 'Unlike compression (which reduces quality to reduce size), splitting by size simply divides your document. Each split file maintains the exact same quality as the original pages. There\'s no re-compression, no quality degradation, no loss of detail.',
    s5s5p2: 'This is crucial for professional documents, legal files, medical records, or any content where quality preservation is important. You get smaller files without sacrificing quality.',

    s5s6h: '6. Flexible Size Limits',
    s5s6p1: 'Different platforms have different requirements. Email might need 10 MB files, while a content management system might allow 50 MB. With size-based splitting, you can easily adjust your limit to match any requirement. One tool handles all scenarios.',

    s5s7h: '7. Time Savings',
    s5s7p1: 'Manual splitting methods require you to:',
    s5s7l1: 'Estimate how many pages equal your desired file size',
    s5s7l2: "Test split files to verify they're under limits",
    s5s7l3: 'Adjust and re-split if files are too large',
    s5s7l4: 'Repeat the process multiple times to get it right',
    s5s7p2: 'Size-based splitting eliminates all of this. You set the limit once, and the tool handles everything automatically. What might take 30 minutes of trial and error becomes a 2-minute automated process.',

    s5s8h: '8. Professional Results',
    s5s8p1: "Consistently sized files look more professional than a mix of large and small files. When you're sending documents to clients, colleagues, or stakeholders, uniform file sizes demonstrate attention to detail and technical competence. Size-based splitting ensures every file meets your standards.",

    s6h: 'Comparison: Size-Based Splitting vs. Other Methods',
    s6p1: "How does splitting by size compare to other PDF splitting methods? Let's examine the differences to help you choose the right approach for your needs.",

    s6s1h: 'Size-Based Splitting vs. Page-Based Splitting',
    s6s1p1: 'Page-Based Splitting:',
    s6s1l1: '✅ You control exactly which pages go into each file',
    s6s1l2: '✅ Good when you know the document structure',
    s6s1l3: '✅ Useful for splitting by chapters or sections',
    s6s1l4: '❌ File sizes can vary dramatically (some files might be 2 MB, others 15 MB)',
    s6s1l5: '❌ Requires manual calculation to meet size limits',
    s6s1l6: '❌ Trial and error to get files under email/upload limits',
    s6s1p2: 'Size-Based Splitting:',
    s6s1m1: '✅ Guaranteed file size compliance',
    s6s1m2: '✅ Optimal file sizing (maximizes content per file)',
    s6s1m3: '✅ Handles variable page sizes automatically',
    s6s1m4: '✅ Perfect for email and upload requirements',
    s6s1m5: '❌ Less control over which specific pages go together',
    s6s1m6: '❌ May split in the middle of sections if page sizes vary',
    s6s1p3a: 'Verdict:',
    s6s1p3b: ' Use page-based splitting when you need specific page groupings (like chapters). Use size-based splitting when you need to meet file size requirements for email, uploads, or sharing platforms.',

    s6s2h: 'Size-Based Splitting vs. Compression',
    s6s2p1: 'Compression (Reducing File Size):',
    s6s2l1: '✅ Keeps document as a single file',
    s6s2l2: '✅ Can significantly reduce file size',
    s6s2l3: '✅ Good for storage optimization',
    s6s2l4: '❌ May reduce quality (especially images)',
    s6s2l5: '❌ Might not get files small enough for strict limits',
    s6s2l6: '❌ Can make text less readable if over-compressed',
    s6s2p2: 'Size-Based Splitting:',
    s6s2m1: '✅ No quality loss whatsoever',
    s6s2m2: '✅ Guaranteed to meet size limits',
    s6s2m3: '✅ Preserves original quality perfectly',
    s6s2m4: '❌ Creates multiple files instead of one',
    s6s2m5: '❌ Recipients need to manage multiple files',
    s6s2p3a: 'Verdict:',
    s6s2p3b: ' Use compression when you want to keep one file and can accept some quality reduction. Use size-based splitting when quality is critical and you need guaranteed size compliance. You can also combine both—compress first, then split if needed.',

    s6s3h: 'Size-Based Splitting vs. Bookmark-Based Splitting',
    s6s3p1: 'Bookmark-Based Splitting:',
    s6s3l1: '✅ Splits at logical document sections',
    s6s3l2: '✅ Respects document structure',
    s6s3l3: '✅ Good for structured documents (reports, books)',
    s6s3l4: '❌ Requires PDF to have bookmarks',
    s6s3l5: '❌ File sizes can vary significantly',
    s6s3l6: '❌ May not meet size requirements',
    s6s3p2: 'Size-Based Splitting:',
    s6s3m1: '✅ Works with any PDF (no bookmarks needed)',
    s6s3m2: '✅ Guaranteed size compliance',
    s6s3m3: '✅ Consistent file sizes',
    s6s3m4: '❌ May split in the middle of sections',
    s6s3m5: '❌ Less respect for document structure',
    s6s3p3a: 'Verdict:',
    s6s3p3b: ' Use bookmark-based splitting when your PDF has bookmarks and you want to preserve document structure. Use size-based splitting when you need to meet specific size requirements regardless of structure.',

    s6s4h: 'When to Use Each Method',
    s6s4p1: "Here's a quick decision guide:",
    s6s4l1a: 'Use size-based splitting when:',
    s6s4l1b: ' You need to email files, upload to size-restricted platforms, ensure consistent file sizes, or meet specific size requirements',
    s6s4l2a: 'Use page-based splitting when:',
    s6s4l2b: ' You know exactly which pages you need, want to extract specific sections, or need precise control over content grouping',
    s6s4l3a: 'Use bookmark-based splitting when:',
    s6s4l3b: ' Your PDF has bookmarks and you want to preserve document structure while splitting',
    s6s4l4a: 'Use compression when:',
    s6s4l4b: ' You want to reduce file size while keeping one file and can accept some quality reduction',
    s6s4p2: 'Many professionals use size-based splitting as their default method because it solves the most common problem—file size restrictions—while still producing usable, well-organized files.',

    faqVisH: 'Frequently Asked Questions About Splitting PDFs by Size',

    // Visible FAQ (13)
    fv1q: 'How do I split a PDF by file size?',
    fv1a: 'You can split a PDF by file size using our online PDF splitter tool. Simply upload your PDF file, select the "Split by Size" option, specify your desired maximum file size (e.g., 5 MB, 10 MB), and click split. The tool automatically divides your PDF into multiple files, each under your specified size limit. No account creation or payment required.',
    fv2q: 'Why would I need to split a PDF by size?',
    fv2a: 'Splitting PDFs by size is essential when you need to email large documents (most email services have 25 MB limits), upload files to systems with size restrictions, or optimize file sizes for faster sharing. It ensures each split file stays within your specified size limit while maintaining document quality. This is especially important for professional communication, client deliverables, and compliance with platform requirements.',
    fv3q: 'What is the best file size to split a PDF into?',
    fv3a: 'The best file size depends on your needs. For email attachments, 5-10 MB is ideal since most email services limit attachments to 25 MB, and staying well under the limit ensures reliable delivery. For cloud storage or file sharing, 10-20 MB works well. For very large documents, splitting into 5 MB chunks ensures maximum compatibility across different platforms. Consider your recipient\'s system and your specific use case when choosing a size limit.',
    fv4q: 'Does splitting a PDF by size reduce quality?',
    fv4a: 'No, splitting a PDF by size does not reduce quality. The tool divides your PDF at page boundaries, extracting pages without re-compressing or degrading content. Each split file maintains the same quality as the original pages. The tool intelligently groups pages to stay within your size limit while preserving all original content, formatting, and image quality.',
    fv5q: 'Can I split a PDF by size for free?',
    fv5a: 'Yes, you can split PDFs by size completely free using our online tool. No account creation, payment, or software installation required. Simply upload your PDF, set your size limit, and download the split files. All processing happens in your browser for maximum privacy and security. Your files never leave your device.',
    fv6q: 'How many files will I get when splitting by size?',
    fv6a: "The number of files depends on your original PDF size and your specified size limit. For example, a 50 MB PDF split at 10 MB will create approximately 5 files. A 25 MB PDF split at 5 MB will create about 5 files. The tool automatically calculates how many files are needed and splits at page boundaries to maintain document integrity. You'll see a preview before splitting showing the expected number of files.",
    fv7q: 'Is it safe to split PDFs by size online?',
    fv7a: 'Yes, when using a privacy-first PDF splitter that processes files locally in your browser, your documents never leave your device. All splitting happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv8q: 'What is the maximum file size I can split?',
    fv8a1: 'Most online PDF splitters support files up to 25-50 MB for optimal performance. Very large files (100+ MB) may cause browser performance issues or timeouts. For best results, keep files under 25 MB. If you have larger files, consider using our ',
    fv8link: 'PDF compression tool',
    fv8a2: ' first to reduce size before splitting. This two-step approach (compress then split) works well for very large documents.',
    fv9q: 'Can I split password-protected PDFs by size?',
    fv9a1: "Most online PDF splitters cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv9link: 'PDF editing tool',
    fv9a2: ' or the software that created the protection, then split the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password during processing.',
    fv10q: 'Will the split files have the same page sizes and formatting?',
    fv10a: 'Yes, all split files maintain the exact same page sizes, orientations, formatting, fonts, images, and layout as the original PDF. The tool extracts pages without modification, so each split file looks identical to the corresponding pages in the original document. The only difference is that content is divided across multiple files instead of one.',
    fv11q: 'Can I choose a custom file size limit?',
    fv11a: 'Yes, most tools let you specify any file size limit you need. Common options include 1 MB, 5 MB, 10 MB, 15 MB, 20 MB, 25 MB, and 50 MB, but many tools also support custom values. Simply enter your desired size in MB (or KB for very precise control). The tool will create as many files as needed to stay under your limit.',
    fv12q: 'What happens if a single page is larger than my size limit?',
    fv12a1: 'If a single page exceeds your size limit (which is rare but possible with very high-resolution images), the tool will still include that page in a file, but that file will exceed your limit. Most tools will warn you about this situation. In such cases, you may need to use our ',
    fv12link1: 'PDF compression tool',
    fv12a2: ' first to reduce the overall file size, then split the compressed PDF. Alternatively, you could use our ',
    fv12link2: 'PDF editing tool',
    fv12a3: ' to optimize individual pages before splitting.',
    fv13q: 'Can I split PDFs by size on mobile devices?',
    fv13a: 'Yes, many online PDF splitter tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large splits might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    s8h: 'Conclusion: Mastering PDF Size-Based Splitting',
    s8p1: "Splitting PDF files by size is one of those features that transforms a frustrating limitation into a simple, automated process. Whether you're dealing with email attachment limits, upload restrictions, or file sharing constraints, size-based splitting ensures your documents can be delivered and accessed exactly when and where they're needed.",
    s8p2: 'The key advantages of size-based splitting—guaranteed size compliance, optimal file sizing, quality preservation, and time savings—make it the ideal solution for most professional workflows. Unlike manual methods that require trial and error, or compression that sacrifices quality, splitting by size gives you exactly what you need: perfectly sized files that maintain original quality.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Choose your size limit based on your specific needs (email limits, upload restrictions, etc.)',
    s8l2: 'Stay 1-2 MB under strict limits to account for email encoding overhead',
    s8l3: 'For very large PDFs, consider compressing first, then splitting for optimal results',
    s8l4: 'Use descriptive file naming to help recipients understand what they\'re receiving',
    s8l5: 'Download split files as a ZIP archive when creating many files for easier management',
    s8l6: "Keep backups of original files until you're satisfied with the splits",
    s8l7: 'Test one file first if splitting very large documents to ensure the process works smoothly',
    s8p4a: 'Ready to split your PDFs by size? Try our ',
    s8p4link: 'free PDF splitter tool',
    s8p4b: ' and experience how simple dividing large documents can be. The size-based splitting feature makes it easy to create email-ready, upload-compatible files in minutes.',
    s8p5a: 'And if you need to make edits to your PDFs before or after splitting, check out our ',
    s8p5link1: 'PDF editing tool',
    s8p5b: ' for adding text, images, and annotations. For very large files, our ',
    s8p5link2: 'PDF compression tool',
    s8p5c: ' can help reduce file sizes before splitting. And if you need to combine PDFs later, our ',
    s8p5link3: 'PDF merger tool',
    s8p5d: ' makes it easy to merge documents back together.',
    s8p6: "PDF management doesn't have to be complicated. With the right tools and approach, you can handle file size restrictions quickly and confidently, ensuring your documents reach their destination every time. Size-based splitting is your solution for professional, reliable document distribution.",

    // Related Articles
    rel1Title: 'How to Split PDF Files Online',
    rel1Desc: 'Complete guide to splitting PDF files by pages, size, or bookmarks using free online tools.',
    rel2Title: 'How to Merge PDF Files Online',
    rel2Desc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel3Title: 'How to Edit a PDF Online',
    rel3Desc: 'Complete guide to editing PDF files online without installing software.',
    rel4Title: 'Is It Safe to Edit PDFs Online?',
    rel4Desc: 'Learn about privacy and security when editing PDF files online.',

    // Schema FAQ (8)
    fq1q: 'How do I split a PDF by file size?',
    fq1a: 'You can split a PDF by file size using our online PDF splitter tool. Simply upload your PDF file, select the "Split by Size" option, specify your desired maximum file size (e.g., 5 MB, 10 MB), and click split. The tool automatically divides your PDF into multiple files, each under your specified size limit.',
    fq2q: 'Why would I need to split a PDF by size?',
    fq2a: 'Splitting PDFs by size is essential when you need to email large documents (most email services have 25 MB limits), upload files to systems with size restrictions, or optimize file sizes for faster sharing. It ensures each split file stays within your specified size limit while maintaining document quality.',
    fq3q: 'What is the best file size to split a PDF into?',
    fq3a: 'The best file size depends on your needs. For email attachments, 5-10 MB is ideal since most email services limit attachments to 25 MB. For cloud storage or file sharing, 10-20 MB works well. For very large documents, splitting into 5 MB chunks ensures maximum compatibility across different platforms.',
    fq4q: 'Does splitting a PDF by size reduce quality?',
    fq4a: 'No, splitting a PDF by size does not reduce quality. The tool divides your PDF at page boundaries, extracting pages without re-compressing or degrading content. Each split file maintains the same quality as the original pages. The tool intelligently groups pages to stay within your size limit.',
    fq5q: 'Can I split a PDF by size for free?',
    fq5a: 'Yes, you can split PDFs by size completely free using our online tool. No account creation, payment, or software installation required. Simply upload your PDF, set your size limit, and download the split files. All processing happens in your browser for maximum privacy.',
    fq6q: 'How many files will I get when splitting by size?',
    fq6a: 'The number of files depends on your original PDF size and your specified size limit. For example, a 50 MB PDF split at 10 MB will create approximately 5 files. The tool automatically calculates how many files are needed and splits at page boundaries to maintain document integrity.',
    fq7q: 'Is it safe to split PDFs by size online?',
    fq7a: 'Yes, when using a privacy-first PDF splitter that processes files locally in your browser, your documents never leave your device. All splitting happens client-side, ensuring your sensitive documents remain secure and private. No files are uploaded to servers.',
    fq8q: 'What is the maximum file size I can split?',
    fq8a: 'Most online PDF splitters support files up to 25-50 MB for optimal performance. Very large files (100+ MB) may cause browser performance issues. For best results, keep files under 25 MB. If you have larger files, consider using our PDF compression tool first to reduce size before splitting.',
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
      images: [{ url: `${siteUrl}/images/blog/split-by-size-hero.png`, width: 1200, height: 630, alt: c.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/split-by-size-hero.png`],
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
          src="/blog/Split PDF by Size_ Complete Guide to Dividing Large PDFs by File Size.png"
          alt={c.heroImgAlt}
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
                <li><strong className="text-white">{c.s3l1a}</strong>{c.s3l1b}</li>
                <li><strong className="text-white">{c.s3l2a}</strong>{c.s3l2b}</li>
                <li><strong className="text-white">{c.s3l3a}</strong>{c.s3l3b}</li>
                <li><strong className="text-white">{c.s3l4a}</strong>{c.s3l4b}</li>
                <li><strong className="text-white">{c.s3l5a}</strong>{c.s3l5b}</li>
                <li><strong className="text-white">{c.s3l6a}</strong>{c.s3l6b}</li>
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
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s1p2}
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s2p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4s2p3a}</strong>{c.s4s2p3b}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s2p3link}</Link>{c.s4s2p3c}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s3p1}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s3p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s4p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s4p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4s4l1a}</strong>{c.s4s4l1b}</li>
                  <li><strong className="text-white">{c.s4s4l2a}</strong>{c.s4s4l2b}</li>
                  <li><strong className="text-white">{c.s4s4l3a}</strong>{c.s4s4l3b}</li>
                  <li><strong className="text-white">{c.s4s4l4a}</strong>{c.s4s4l4b}</li>
                  <li><strong className="text-white">{c.s4s4l5a}</strong>{c.s4s4l5b}</li>
                  <li><strong className="text-white">{c.s4s4l6a}</strong>{c.s4s4l6b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s4p3a}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s4m1}</li>
                  <li>{c.s4s4m2}</li>
                  <li>{c.s4s4m3}</li>
                  <li>{c.s4s4m4}</li>
                  <li>{c.s4s4m5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s4p4}
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
                  <li>{c.s4s7m1}</li>
                  <li>{c.s4s7m2}</li>
                  <li>{c.s4s7m3}</li>
                  <li>{c.s4s7m4}</li>
                  <li>{c.s4s7m5}</li>
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
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s8l1}</li>
                  <li>{c.s4s8l2}</li>
                  <li>{c.s4s8l3}</li>
                  <li>{c.s4s8l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s8p2a}</strong>{c.s4s8p2b}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s8p3a}</strong>{c.s4s8p3b}
                </p>
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
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s2p2}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5s3p1}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s3p2}
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
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5s5p1}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s5p2}
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
                  <li>{c.s5s7l4}</li>
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s1p3a}</strong>{c.s6s1p3b}
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
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s2p3a}</strong>{c.s6s2p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s3p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s3l1}</li>
                  <li>{c.s6s3l2}</li>
                  <li>{c.s6s3l3}</li>
                  <li>{c.s6s3l4}</li>
                  <li>{c.s6s3l5}</li>
                  <li>{c.s6s3l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s3p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s3m1}</li>
                  <li>{c.s6s3m2}</li>
                  <li>{c.s6s3m3}</li>
                  <li>{c.s6s3m4}</li>
                  <li>{c.s6s3m5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s3p3a}</strong>{c.s6s3p3b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6s4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s6s4l1a}</strong>{c.s6s4l1b}</li>
                  <li><strong className="text-white">{c.s6s4l2a}</strong>{c.s6s4l2b}</li>
                  <li><strong className="text-white">{c.s6s4l3a}</strong>{c.s6s4l3b}</li>
                  <li><strong className="text-white">{c.s6s4l4a}</strong>{c.s6s4l4b}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s6s4p2}
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
                    {c.fv8a1}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8link}</Link>{c.fv8a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv9q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv9a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9link}</Link>{c.fv9a2}
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
                    {c.fv12a1}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv12link1}</Link>{c.fv12a2}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv12link2}</Link>{c.fv12a3}
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
                {c.s8p4a}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link}</Link>{c.s8p4b}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p5a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p5link1}</Link>{c.s8p5b}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p5link2}</Link>{c.s8p5c}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p5link3}</Link>{c.s8p5d}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s8p6}
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
                  {c.rel1Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.rel1Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-merge-pdf-files-online')}
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
                href={L('/blog/how-to-edit-a-pdf-online')}
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
                href={L('/blog/is-it-safe-to-edit-pdfs-online')}
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
import { TRANSLATIONS } from './split-by-size.i18n'
Object.assign(C, TRANSLATIONS)
