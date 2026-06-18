import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-delete-pages-from-pdf'
const postPath = `/blog/${slug}`
const heroImage = '/images/blog/how-to-delete-pages-from-pdf-hero.png'
const articleImage = '/blog/How to Delete Pages from PDF Online_ Complete Guide to Removing Unwanted Pages.png'
const datePublished = '2026-01-15'
const dateModified = '2026-01-15'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Delete Pages from PDF Online (Step-by-Step Guide)',
    metaDesc: 'Remove unwanted pages from your PDF file online. Select specific pages, delete them instantly, and download a clean, updated PDF document.',
    ogTitle: 'How to Delete Pages from PDF Online (Step-by-Step Guide)',
    ogDesc: 'Remove unwanted pages from your PDF file online. Select specific pages, delete them instantly, and download a clean, updated PDF document.',
    twTitle: 'How to Delete Pages from PDF Online (Step-by-Step Guide)',
    twDesc: 'Remove unwanted pages from your PDF file online. Select specific pages, delete them instantly, and download a clean, updated PDF document.',
    ogAlt: 'Banner showing a PDF page being removed and moved to a trash bin with delete PDF pages button',
    heroAlt: 'How to delete pages from PDF online - Free PDF page remover tool guide',

    bcLeaf: 'How to Delete Pages from PDF',
    heroTitle: 'How to Delete Pages from PDF Online: Complete Guide to Removing Unwanted Pages',
    heroSubtitle: 'Learn how to remove unwanted pages from PDF files using free online tools. No software installation required.',

    artHeadline: 'How to Delete Pages from PDF Online - Complete Guide to Removing PDF Pages',
    artDesc: 'Complete guide on how to delete pages from PDF files online. Learn to remove unwanted pages from PDF documents using free online tools. Step-by-step instructions, tips, and best practices for deleting PDF pages.',

    intro1: "You've got a PDF file with pages you don't need. Maybe it's a report with outdated appendices, a document with blank pages scattered throughout, or a file that accidentally includes pages from another document. Whatever the reason, removing unwanted pages from a PDF is one of those tasks that seems simple but can quickly become frustrating if you don't know the right approach.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF page remover tools make deleting pages from PDF documents as straightforward as selecting pages and clicking delete. This comprehensive guide will walk you through everything you need to know about removing pages from PDFs online, from understanding different deletion methods to handling edge cases and ensuring your documents stay secure throughout the process.",

    s1h: 'The Problem: Why Deleting PDF Pages Can Be Challenging',
    s1p1: 'PDFs are designed to be complete, self-contained documents. They preserve formatting perfectly, which is great for sharing, but it makes removing pages more complex than simply deleting text. Unlike Word documents where you can easily cut sections, PDF files require specialized tools to extract and remove pages properly.',
    s1p2: "Here's what makes deleting PDF pages challenging:",
    s1l1a: 'Page extraction complexity:',
    s1l1b: ' Removing pages while maintaining document structure requires precise PDF manipulation',
    s1l2a: 'Multiple page selection:',
    s1l2b: ' Selecting individual pages or ranges across large documents can be tedious',
    s1l3a: 'Format preservation:',
    s1l3b: ' Ensuring remaining pages maintain their formatting, links, and metadata after deletion',
    s1l4a: 'Security concerns:',
    s1l4b: ' Uploading sensitive documents to unknown servers raises privacy questions',
    s1l5a: 'Software requirements:',
    s1l5b: ' Desktop PDF tools often require installation, updates, and sometimes payment',
    s1l6a: 'Quality preservation:',
    s1l6b: ' Poor deletion methods can degrade image quality or lose formatting',
    s1p3: 'These pain points are exactly why online PDF page remover tools have become so popular. They solve the complexity problem while keeping things simple, accessible, and secure.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think deleting pages from PDFs is a niche task, but it's actually something millions of people need to do regularly. Consider these everyday scenarios:",
    s2l1a: 'Business professionals',
    s2l1b: ' removing outdated appendices, cover pages, or unnecessary sections from reports before sharing',
    s2l2a: 'Students',
    s2l2b: ' deleting blank pages, extra copies, or unwanted sections from assignment submissions',
    s2l3a: 'HR departments',
    s2l3b: ' removing sensitive information or outdated pages from employee handbooks',
    s2l4a: 'Legal teams',
    s2l4b: ' deleting confidential pages, draft sections, or irrelevant documents from case files',
    s2l5a: 'Real estate agents',
    s2l5b: ' removing duplicate pages or unnecessary documents from property packages',
    s2l6a: 'Healthcare workers',
    s2l6b: ' deleting outdated information or duplicate pages from patient records',
    s2l7a: 'Accountants',
    s2l7b: ' removing blank pages or unnecessary sections from financial reports',
    s2l8a: 'Content creators',
    s2l8b: ' cleaning up design portfolios by removing placeholder pages or outdated work',
    s2p2: "The time wasted on manual PDF management adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Accidentally deleting important pages',
    s2m2: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor document quality in the final file',
    s2m5: 'Lost formatting, links, or metadata',
    s2p3: "That's why understanding how to delete PDF pages properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication.",

    s3h: 'The Solution: Modern Online PDF Page Remover Tools',
    s3p1: 'The solution to PDF page deletion headaches is simpler than you might expect. Modern web-based PDF page remover tools handle all the technical complexity behind the scenes, giving you a clean interface to remove pages in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1a: 'No installation required:',
    s3l1b: ' Works on any device with a modern browser',
    s3l2a: 'Privacy-first processing:',
    s3l2b: ' Files stay on your device, never uploaded to servers',
    s3l3a: 'Instant results:',
    s3l3b: ' Delete pages in seconds, not minutes',
    s3l4a: 'Free to use:',
    s3l4b: ' No subscriptions or hidden fees',
    s3l5a: 'Cross-platform compatibility:',
    s3l5b: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l6a: 'Flexible page selection:',
    s3l6b: ' Delete individual pages, page ranges, or multiple selections at once',
    s3p3: "The best part? You don't need to understand how PDF page deletion works technically. The tool handles page extraction, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF page remover tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Delete Pages from PDF Using Our Tool',
    s4p1: "Ready to remove pages from your PDF? Follow these steps to delete unwanted pages from PDF files quickly and easily. We'll cover selecting individual pages, page ranges, and multiple selections.",

    s4s1h: 'Step 1: Access the PDF Page Remover Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF page remover page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start deleting pages immediately.",

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l4link: 'PDF editing tool',
    s4s2l4b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing all pages in a thumbnail grid. This helps you identify which pages you want to remove.",

    s4s3h: 'Step 3: Select Pages to Delete',
    s4s3p1: 'This is where you choose which pages to remove. Most tools offer several selection methods:',
    s4s3aH: 'Method A: Select Individual Pages',
    s4s3aP1: 'Click on individual page thumbnails to select them. Selected pages are usually highlighted or marked with a checkmark. You can select multiple individual pages by clicking each one.',
    s4s3aP2a: 'Best for:',
    s4s3aP2b: ' When you need to remove specific scattered pages throughout the document.',
    s4s3bH: 'Method B: Select Page Ranges',
    s4s3bP1: 'Some tools allow you to select a range of pages by clicking the first page, holding Shift, and clicking the last page. Or you can enter page ranges manually (e.g., "5-10" to delete pages 5 through 10).',
    s4s3bP2a: 'Best for:',
    s4s3bP2b: ' When you need to remove consecutive pages, such as an entire section or appendix.',
    s4s3cH: 'Method C: Select All and Deselect',
    s4s3cP1: 'Some tools offer a "Select All" option, allowing you to select every page, then deselect the ones you want to keep. This is useful when you want to keep only a few pages.',
    s4s3cP2a: 'Best for:',
    s4s3cP2b: ' When you want to keep only a small portion of a large document.',
    s4s3p2a: 'Pro tip:',
    s4s3p2b: ' Take a moment to review your selection before proceeding. Most tools show you how many pages will be deleted and which pages will remain.',

    s4s4h: 'Step 4: Review Your Selection',
    s4s4p1: 'Before deleting, take a quick moment to verify:',
    s4s4l1: "You've selected the correct pages to delete",
    s4s4l2: "You haven't accidentally selected pages you want to keep",
    s4s4l3: 'The remaining pages will form a coherent document',
    s4s4l4: "Important pages aren't being removed",
    s4s4p2: "This quick check prevents having to start over if you realize something's wrong after deletion. Remember, your original file remains unchanged, but it's still better to get it right the first time.",

    s4s5h: 'Step 5: Click Delete and Wait for Processing',
    s4s5p1: 'Once everything looks good, click the "Delete Pages" or "Remove Pages" button. The tool will:',
    s4s5o1: 'Process your PDF file',
    s4s5o2: 'Extract all pages except the ones you selected for deletion',
    s4s5o3: 'Reconstruct the document with remaining pages',
    s4s5o4: 'Generate your new PDF file without the deleted pages',
    s4s5p2: 'Processing time depends on:',
    s4s5l1: 'Total page count of your PDF',
    s4s5l2: 'Number of pages being deleted',
    s4s5l3: 'File size',
    s4s5l4: "Your device's processing power",
    s4s5p3: "For typical deletions (removing 5-10 pages from a 50-100 page document), this usually takes just a few seconds. Larger operations might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s6h: 'Step 6: Download Your Modified PDF',
    s4s6p1: 'When processing completes, your new PDF without the deleted pages is ready. Click the download button to save it to your device. The file will typically have a name like "document_modified.pdf" or similar, but you can rename it to something more descriptive.',
    s4s6p2a: 'Important:',
    s4s6p2b: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your modified PDF before closing the page.',
    s4s6p3a: 'Also important:',
    s4s6p3b: ' Your original PDF file remains completely unchanged on your device. The tool creates a new file, so you always have your original as a backup.',
    s4s6p4: "That's it! You've successfully deleted pages from your PDF file. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Page Remover Tools',
    s5p1: 'Why choose an online PDF page remover over desktop software or manual methods? Here are the key advantages:',
    s5s1h: '1. Zero Installation Required',
    s5s1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start deleting pages. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to remove pages on the go.",
    s5s2h: '2. Privacy and Security',
    s5s2p1: 'When you use a privacy-first PDF page remover that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5s2l1: 'Confidential business documents',
    s5s2l2: 'Personal financial information',
    s5s2l3: 'Legal documents',
    s5s2l4: 'Medical records',
    s5s2l5: 'Any sensitive data',
    s5s2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5s3h: '3. Cost-Effective Solution',
    s5s3p1: 'Most online PDF page remover tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF page deletion, free online tools provide excellent value without any financial commitment.',
    s5s4h: '4. Flexible Page Selection',
    s5s4p1: 'Online tools typically offer multiple ways to select pages: individual selection, range selection, or select-all-and-deselect. This flexibility means you can handle different deletion scenarios without switching tools or methods.',
    s5s5h: '5. Cross-Platform Compatibility',
    s5s5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF page removers work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5s6h: '6. Always Up-to-Date',
    s5s6p1: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5s7h: '7. Speed and Efficiency',
    s5s7p1: 'Modern browser-based PDF processing is surprisingly fast. You can delete pages in seconds, compared to:',
    s5s7l1: 'Manual print-to-PDF workflows (time-consuming and quality-degrading)',
    s5s7l2: 'Desktop software that requires launching and navigating complex interfaces',
    s5s7l3: "Copy-paste methods (which don't work well with PDFs anyway)",
    s5s7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5s8h: '8. Non-Destructive Operation',
    s5s8p1: 'Online PDF page removers create new files rather than modifying originals. This means your original PDF always remains intact as a backup. You can delete pages multiple times using different selections without any risk to your source document.',

    s6h: 'Comparison: Online PDF Page Removers vs. Other Tools',
    s6p1: "How do online PDF page remover tools stack up against alternatives? Let's break down the comparison:",
    s6s1h: 'Online PDF Page Removers vs. Desktop Software',
    s6s1p1: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6s1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6s1l2: '✅ Works offline',
    s6s1l3: '✅ Better for very large files (500+ pages)',
    s6s1l4: '❌ Requires installation and updates',
    s6s1l5: '❌ Often expensive ($100-300+ or subscription fees)',
    s6s1l6: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6s1l7: '❌ Takes up disk space',
    s6s1p2: 'Online PDF Page Removers:',
    s6s1m1: '✅ Free to use',
    s6s1m2: '✅ No installation required',
    s6s1m3: '✅ Works on any platform',
    s6s1m4: '✅ Always up-to-date',
    s6s1m5: '✅ Privacy-first (client-side processing)',
    s6s1m6: '✅ Flexible page selection methods',
    s6s1m7: '❌ Requires internet connection (for initial page load)',
    s6s1m8: '❌ May struggle with extremely large files (500+ pages)',
    s6s1p3a: 'Verdict:',
    s6s1p3b: ' For PDF page deletion specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just deleting pages, or if you regularly work with very large files.',
    s6s2h: 'Online PDF Page Removers vs. Cloud-Based Services',
    s6s2p1: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6s2l1: '✅ Integrated with cloud storage',
    s6s2l2: '✅ Can access files from anywhere',
    s6s2l3: '✅ Often free with cloud storage accounts',
    s6s2l4: '❌ Files uploaded to servers (privacy concern)',
    s6s2l5: '❌ Requires account creation',
    s6s2l6: '❌ Storage limits apply',
    s6s2l7: '❌ Files may be retained on servers',
    s6s2l8: '❌ Slower processing (upload/download time)',
    s6s2l9: '❌ Limited page selection options',
    s6s2p2: 'Client-Side Online Removers:',
    s6s2m1: '✅ No file uploads (privacy-first)',
    s6s2m2: '✅ No account required',
    s6s2m3: '✅ Faster processing (no upload/download)',
    s6s2m4: '✅ No storage limits',
    s6s2m5: '✅ Files never leave your device',
    s6s2m6: '✅ Multiple page selection methods',
    s6s2m7: "❌ Can't access files from cloud storage directly",
    s6s2p3a: 'Verdict:',
    s6s2p3b: " For privacy-conscious users, client-side online removers are superior. Cloud services are better if you need to delete pages from files already stored in cloud storage and don't mind the privacy trade-off.",
    s6s3h: 'Online PDF Page Removers vs. Manual Methods',
    s6s3p1: 'Some people try to delete PDF pages manually using methods like:',
    s6s3l1: 'Printing specific pages to a new PDF (slow, quality loss, time-consuming)',
    s6s3l2: 'Taking screenshots of pages to keep (terrible quality, not searchable, time-consuming)',
    s6s3l3: 'Using freeware with ads and malware risks',
    s6s3l4: "Copy-pasting content (doesn't work with PDFs)",
    s6s3p2a: 'Verdict:',
    s6s3p2b: " Online PDF page removers are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",

    faqH: 'Frequently Asked Questions About Deleting PDF Pages',

    s8h: 'Conclusion: Making PDF Page Deletion Simple',
    s8p1: "Deleting pages from PDF files doesn't have to be complicated. With modern online PDF page remover tools, removing unwanted pages is straightforward, fast, and secure. Whether you're a business professional cleaning up reports, a student removing blank pages from assignments, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF page removers—no installation, privacy-first processing, free access, flexible page selection, and cross-platform compatibility—make them the ideal solution for most page deletion needs. While desktop software has its place for advanced PDF editing tasks, simple page deletion is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Review your page selection carefully before deleting',
    s8l2: 'Keep files under 25 MB for best performance',
    s8l3: 'Use privacy-first tools that process files locally',
    s8l4: "Keep backups of original files until you're satisfied with the modified version",
    s8l5: 'Verify the final document after deletion to ensure everything looks correct',
    s8l6: 'Use page ranges when deleting consecutive pages for efficiency',
    s8p4a: 'Ready to delete pages from your PDFs? Try our ',
    s8p4link1: 'free PDF page remover tool',
    s8p4b: ' and experience how simple removing pages can be. And if you need to make other edits to your PDFs, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For combining multiple PDFs, our ',
    s8p4link3: 'PDF merger tool',
    s8p4d: ' makes it easy to merge documents. And if you need to reduce file sizes, our ',
    s8p4link4: 'PDF compression tool',
    s8p4e: ' can help optimize your files.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle page deletion quickly and confidently, leaving more time for the work that actually matters.",

    // Related Articles
    relTitle: 'Related Articles',
    rel1t: 'How to Split PDF Files Online',
    rel1d: 'Learn how to divide large PDF files into smaller documents using free online tools.',
    rel2t: 'How to Merge PDF Files Online',
    rel2d: 'Learn how to combine multiple PDF files into one document using free online tools.',
    rel3t: 'How to Edit a PDF Online',
    rel3d: 'Complete guide to editing PDF files online without installing software.',

    // Visible FAQ (12)
    fv1q: 'How do I delete pages from a PDF file online for free?',
    fv1a1: 'You can delete pages from a PDF file online for free by using our ',
    fv1aLink: 'PDF page remover tool',
    fv1a2: '. Simply upload your PDF file, select the pages you want to remove (either individually or by range), and click delete. The tool creates a new PDF without the selected pages that you can download instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to delete pages from PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF page remover that processes files locally in your browser, your documents never leave your device. All page deletion happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I delete multiple pages from a PDF at once?',
    fv3a: 'Absolutely. Most online PDF page remover tools allow you to select and delete multiple pages simultaneously. You can select individual pages by clicking each one, select page ranges (e.g., pages 5-10), or use a combination of both methods. The tool removes all selected pages in one operation, creating a new PDF with only the pages you want to keep.',
    fv4q: 'What happens to the original PDF after deleting pages?',
    fv4a: "The original PDF file on your device remains completely unchanged. Deleting pages creates a new PDF file without modifying the source document. This means you can delete pages multiple times using different selections without any risk to your original file. Always keep backups of important original files until you're satisfied with the modified version.",
    fv5q: 'Do I need to create an account to delete pages from PDF files?',
    fv5a: 'No, many free PDF page remover tools work without requiring account creation or registration. You can upload, delete pages, and download your modified PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving deletion history or accessing premium features, but basic page deletion is typically available without any registration.',
    fv6q: 'Can I delete pages from password-protected PDFs?',
    fv6a1: "This depends on the tool. Most online PDF page removers cannot process password-protected PDFs because they cannot access the content without the password. You'll need to remove password protection first using a ",
    fv6aLink: 'PDF editing tool',
    fv6a2: ' or the software that created the protection, then delete pages from the unlocked file. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv7q: 'Will deleting pages reduce PDF file quality?',
    fv7a: "No, properly deleting pages from a PDF should not reduce quality. When you remove pages using a quality tool, it extracts the remaining pages without re-compressing or degrading the content. The new PDF maintains the same quality as the original pages. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that delete pages at the native PDF level rather than converting formats.",
    fv8q: 'Can I undo page deletion if I make a mistake?',
    fv8a: "Since page deletion creates a new file, you cannot undo the operation in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply delete pages again with the correct selection. This is why it's important to review your page selection before clicking delete. Some tools keep your file available for a few minutes after deletion, allowing quick re-deletion if needed.",
    fv9q: 'What is the maximum file size for deleting pages from PDFs online?',
    fv9a1: 'File size limits vary by tool, but most online PDF page removers support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to delete pages from very large PDFs, consider using desktop software designed for heavy-duty processing, or split the file first using our ',
    fv9aLink: 'PDF splitter tool',
    fv9a2: '.',
    fv10q: 'Can I delete all pages except a few specific ones?',
    fv10a1: 'Yes, many PDF page remover tools offer a "Select All" option that allows you to select every page, then deselect the pages you want to keep. This is particularly useful when you want to extract just a few pages from a large document. Alternatively, you can use our ',
    fv10aLink: 'PDF page extractor tool',
    fv10a2: ' which is designed specifically for extracting selected pages.',
    fv11q: 'Will deleting pages affect bookmarks, links, or annotations?',
    fv11a: 'This depends on the tool and which pages are deleted. If you delete pages that contain bookmarks or links, those elements will be removed. However, bookmarks and links pointing to remaining pages should be preserved. Annotations on deleted pages will be removed, but annotations on remaining pages should remain intact. High-quality tools preserve document structure and metadata for remaining pages.',
    fv12q: 'Can I delete pages from PDFs on mobile devices?',
    fv12a: 'Yes, many online PDF page remover tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large deletions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I delete pages from a PDF file online for free?',
    fq1a: 'You can delete pages from a PDF file online for free by using our PDF page remover tool. Simply upload your PDF file, select the pages you want to remove, and click delete. The tool creates a new PDF without the selected pages that you can download instantly.',
    fq2q: 'Is it safe to delete pages from PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF page remover that processes files locally in your browser, your documents never leave your device. All page deletion happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I delete multiple pages from a PDF at once?',
    fq3a: 'Yes, most online PDF page remover tools allow you to select and delete multiple pages simultaneously. You can select individual pages, page ranges, or a combination of both. The tool removes all selected pages in one operation.',
    fq4q: 'What happens to the original PDF after deleting pages?',
    fq4a: 'The original PDF file on your device remains completely unchanged. Deleting pages creates a new PDF file without modifying the source document. This means you can delete pages multiple times using different selections without any risk to your original file.',
    fq5q: 'Do I need to create an account to delete pages from PDF files?',
    fq5a: 'No, many free PDF page remover tools work without requiring account creation or registration. You can upload, delete pages, and download your modified PDF files immediately without signing up.',
    fq6q: 'Can I delete pages from password-protected PDFs?',
    fq6a: 'Most online PDF page removers cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool, then delete pages from the unlocked file.',
    fq7q: 'Will deleting pages reduce PDF file quality?',
    fq7a: 'No, properly deleting pages from a PDF should not reduce quality. When you remove pages using a quality tool, it extracts the remaining pages without re-compressing or degrading the content. The new PDF maintains the same quality as the original pages.',
    fq8q: 'Can I undo page deletion if I make a mistake?',
    fq8a: 'Since page deletion creates a new file, you cannot undo the operation in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply delete pages again with the correct selection. Always keep backups of important original files.',
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
      images: [{ url: `${siteUrl}${heroImage}`, width: 1200, height: 630, alt: c.ogAlt }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}${heroImage}`],
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
    image: `${siteUrl}${articleImage}`,
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
          src={articleImage}
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
                <li><strong className="text-white">{c.s1l1a}</strong>{c.s1l1b}</li>
                <li><strong className="text-white">{c.s1l2a}</strong>{c.s1l2b}</li>
                <li><strong className="text-white">{c.s1l3a}</strong>{c.s1l3b}</li>
                <li><strong className="text-white">{c.s1l4a}</strong>{c.s1l4b}</li>
                <li><strong className="text-white">{c.s1l5a}</strong>{c.s1l5b}</li>
                <li><strong className="text-white">{c.s1l6a}</strong>{c.s1l6b}</li>
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
                {c.s3p4a}<Link href={L('/deletepages')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4s1p1a}<Link href={L('/deletepages')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
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
                    <strong className="text-white">{c.s4s3aP2a}</strong>{c.s4s3aP2b}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3bH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3bP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3bP2a}</strong>{c.s4s3bP2b}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3cH}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3cP1}
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3cP2a}</strong>{c.s4s3cP2b}
                  </p>
                </div>

                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s3p2a}</strong>{c.s4s3p2b}
                </p>
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
                  <strong className="text-white">{c.s4s6p2a}</strong>{c.s4s6p2b}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s6p3a}</strong>{c.s4s6p3b}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s6p4}
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
                  <strong className="text-white">{c.s6s2p3a}</strong>{c.s6s2p3b}
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
                  <strong className="text-white">{c.s6s3p2a}</strong>{c.s6s3p2b}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/deletepages')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1a2}
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
                    {c.fv6a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv6aLink}</Link>{c.fv6a2}
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
                    {c.fv9a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9aLink}</Link>{c.fv9a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv10a1}<Link href={L('/extractpages')} className="text-primary-400 hover:text-primary-300 underline">{c.fv10aLink}</Link>{c.fv10a2}
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
                {c.s8p4a}<Link href={L('/deletepages')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
import { TRANSLATIONS } from './how-to-delete-pages-from-pdf.i18n'
Object.assign(C, TRANSLATIONS)
