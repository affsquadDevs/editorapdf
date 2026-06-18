import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-merge-pdf-files-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Merge PDF Files Online_ Complete Guide to Combining PDF Documents.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Merge PDF Files Online: Complete Guide to Combining PDF Documents',
    metaDesc: 'Learn how to merge PDF files online in minutes. Combine multiple PDFs into one document, control page order, and download a single merged file securely.',
    ogTitle: 'How to Merge PDF Files Online: Complete Guide to Combining PDF Documents',
    ogDesc: 'Learn how to merge PDF files online in minutes. Combine multiple PDFs into one document, control page order, and download a single merged file securely.',
    ogAlt: 'Hero banner showing two PDF files merging into one with a MERGE button',
    twTitle: 'How to Merge PDF Files Online: Complete Guide to Combining PDF Documents',
    twDesc: 'Learn how to merge PDF files online in minutes. Combine multiple PDFs into one document, control page order, and download a single merged file securely.',
    heroAlt: 'How to merge PDF files online - Free PDF merger tool guide',

    bcLeaf: 'How to Merge PDF Files Online',
    heroTitle: 'How to Merge PDF Files Online: Complete Guide to Combining PDF Documents',
    heroSubtitle: 'Learn how to combine multiple PDF files into one document using free online tools. No software installation required.',

    artHeadline: 'How to Merge PDF Files Online - Complete Guide to Combining PDF Documents',
    artDesc: 'Complete guide on how to merge PDF files online. Learn to combine multiple PDF documents into one file using free online tools. Step-by-step instructions, tips, and best practices.',

    intro1: "You've got three separate PDF files that need to become one. Maybe it's a report with multiple sections, a collection of invoices, or several scanned documents. Whatever the reason, merging PDF files is one of those tasks that seems simple but can quickly become frustrating if you don't know the right approach.",
    intro2: "The good news? You don't need expensive software or technical expertise. Modern online PDF merger tools make combining multiple PDF documents as straightforward as uploading files and clicking a button. This guide will walk you through everything you need to know about merging PDFs online, from choosing the right tool to handling edge cases and ensuring your documents stay secure.",

    s1h: 'The Problem: Why Merging PDFs Can Be a Headache',
    s1p1: "Let's be honest—PDFs weren't designed to be easily combined. Unlike Word documents where you can copy and paste content seamlessly, PDF files are essentially digital snapshots of documents. They preserve formatting perfectly, which is great for sharing, but it makes merging them more complex than it should be.",
    s1p2: "Here's what makes PDF merging challenging:",
    s1l1s: 'File size limitations:',
    s1l1: ' Large PDFs can slow down or crash basic tools',
    s1l2s: 'Page order confusion:',
    s1l2: ' Getting pages in the right sequence requires careful planning',
    s1l3s: 'Format inconsistencies:',
    s1l3: ' Different PDFs might have varying page sizes, orientations, or quality levels',
    s1l4s: 'Security concerns:',
    s1l4: ' Uploading sensitive documents to unknown servers raises privacy questions',
    s1l5s: 'Software bloat:',
    s1l5: ' Desktop PDF tools often require installation, updates, and sometimes payment',
    s1p3: 'These pain points are exactly why online PDF merger tools have become so popular. They solve the complexity problem while keeping things simple and accessible.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think merging PDFs is a niche task, but it's actually something millions of people need to do regularly. Consider these everyday scenarios:",
    s2l1s: 'Business professionals',
    s2l1: ' combining quarterly reports, invoices, or client documents',
    s2l2s: 'Students',
    s2l2: ' merging assignment submissions, research papers, or study materials',
    s2l3s: 'HR departments',
    s2l3: ' compiling employee documents, contracts, and onboarding materials',
    s2l4s: 'Legal teams',
    s2l4: ' combining case files, evidence documents, and correspondence',
    s2l5s: 'Real estate agents',
    s2l5: ' merging property documents, inspection reports, and contracts',
    s2l6s: 'Healthcare workers',
    s2l6: ' combining patient records, test results, and medical histories',
    s2p2: "The time wasted on manual PDF management adds up quickly. What takes minutes with the right tool can take hours when you're trying to work around limitations or use outdated methods. More importantly, the wrong approach can lead to:",
    s2m1: 'Lost or corrupted files',
    s2m2: 'Privacy breaches from uploading sensitive documents to untrusted servers',
    s2m3: 'Frustration and decreased productivity',
    s2m4: 'Poor document quality in the final merged file',
    s2p3: "That's why understanding how to merge PDFs properly isn't just about convenience—it's about working efficiently and securely in a world where PDF documents are the standard format for professional communication.",

    s3h: 'The Solution: Modern Online PDF Merger Tools',
    s3p1: 'The solution to PDF merging headaches is simpler than you might expect. Modern web-based PDF merger tools handle all the technical complexity behind the scenes, giving you a clean interface to combine documents in minutes.',
    s3p2: 'What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:',
    s3l1s: 'No installation required:',
    s3l1: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Instant results:',
    s3l3: ' Merge PDFs in seconds, not minutes',
    s3l4s: 'Free to use:',
    s3l4: ' No subscriptions or hidden fees',
    s3l5s: 'Cross-platform compatibility:',
    s3l5: ' Works on Windows, Mac, Linux, and mobile devices',
    s3p3: "The best part? You don't need to understand how PDF merging works technically. The tool handles page extraction, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF merger tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Merge PDF Files Using Our Tool',
    s4p1: 'Ready to merge your PDFs? Follow these steps to combine multiple PDF files into one document quickly and easily.',

    s4s1h: 'Step 1: Access the PDF Merger Tool',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF merger page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start merging immediately.",

    s4s2h: 'Step 2: Upload Your PDF Files',
    s4s2p1: 'Click the upload area or drag and drop your PDF files directly onto the page. You can select multiple files at once from your file picker, or add them one by one. The tool supports:',
    s4s2l1: 'Multiple file selection (hold Ctrl on Windows or Cmd on Mac to select several files)',
    s4s2l2: 'Drag and drop functionality for quick file addition',
    s4s2l3: 'Files up to 25 MB each (for optimal performance)',
    s4s2l4: 'Any number of PDF files (though we recommend keeping it under 20 for best results)',
    s4s2p2: "As you add files, you'll see them appear in a list showing the file name and page count. This helps you keep track of what you're merging.",

    s4s3h: 'Step 3: Arrange Files in Your Preferred Order',
    s4s3p1: 'This is where the magic happens. The order of files in your list determines the order of pages in your final merged PDF. You can rearrange files by:',
    s4s3l1: 'Dragging files up or down in the list',
    s4s3l2: 'Using up/down arrow buttons if available',
    s4s3l3: 'Removing and re-adding files in the correct sequence',
    s4s3p2s: 'Pro tip:',
    s4s3p2: " Think about your final document structure before merging. If you're combining a report with an appendix, make sure the main content comes first. For invoices, you might want them in chronological order. Planning ahead saves time later.",
    s4s3p3: "You can also preview individual files if needed, though this isn't always necessary for simple merges.",

    s4s4h: 'Step 4: Review Your Selection',
    s4s4p1: 'Before merging, take a quick moment to verify:',
    s4s4l1: 'All files you want to merge are included',
    s4s4l2: 'Files are in the correct order',
    s4s4l3: 'No unwanted files are in the list (you can remove them if needed)',
    s4s4l4: 'The total page count looks reasonable',
    s4s4p2: "This quick check prevents having to start over if you realize something's wrong after merging.",

    s4s5h: 'Step 5: Click Merge and Wait for Processing',
    s4s5p1: 'Once everything looks good, click the "Merge PDF" or "Combine PDFs" button. The tool will:',
    s4s5o1: 'Process each PDF file individually',
    s4s5o2: 'Extract all pages in order',
    s4s5o3: 'Combine them into a single document',
    s4s5o4: 'Generate your merged PDF file',
    s4s5p2: 'Processing time depends on:',
    s4s5l1: 'Number of files being merged',
    s4s5l2: 'Total page count',
    s4s5l3: 'File sizes',
    s4s5l4: "Your device's processing power",
    s4s5p3: "For typical merges (3-5 files, 50-100 pages total), this usually takes just a few seconds. Larger merges might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s6h: 'Step 6: Download Your Merged PDF',
    s4s6p1: 'When processing completes, your merged PDF is ready. Click the download button to save it to your device. The file will have a name like "merged.pdf" or "combined.pdf" by default, but you can rename it to something more descriptive.',
    s4s6p2s: 'Important:',
    s4s6p2: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your merged PDF before closing the page.',
    s4s6p3: "That's it! You've successfully merged your PDF files. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF Merger Tools',
    s5p1: 'Why choose an online PDF merger over desktop software or manual methods? Here are the key advantages:',

    s5s1h: '1. Zero Installation Required',
    s5s1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start merging. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to merge PDFs on the go.",

    s5s2h: '2. Privacy and Security',
    s5s2p1: 'When you use a privacy-first PDF merger that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5s2l1: 'Confidential business documents',
    s5s2l2: 'Personal financial information',
    s5s2l3: 'Legal documents',
    s5s2l4: 'Medical records',
    s5s2l5: 'Any sensitive data',
    s5s2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',

    s5s3h: '3. Cost-Effective Solution',
    s5s3p1: 'Most online PDF merger tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF merging, free online tools provide excellent value without any financial commitment.',

    s5s4h: '4. Cross-Platform Compatibility',
    s5s4p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF mergers work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",

    s5s5h: '5. Always Up-to-Date',
    s5s5p1: 'Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',

    s5s6h: '6. Speed and Efficiency',
    s5s6p1: 'Modern browser-based PDF processing is surprisingly fast. You can merge multiple PDFs in seconds, compared to:',
    s5s6l1: "Manual copy-paste methods (which don't work well with PDFs anyway)",
    s5s6l2: 'Print-to-PDF workflows (time-consuming and quality-degrading)',
    s5s6l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5s6p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',

    s5s7h: '7. No Storage Concerns',
    s5s7p1: "Since processing happens in your browser, you don't need to worry about cloud storage limits, account quotas, or file retention policies. Everything processes locally, and you download the result directly to your device.",

    s6h: 'Comparison: Online PDF Mergers vs. Other Tools',
    s6p1: "How do online PDF merger tools stack up against alternatives? Let's break down the comparison:",

    s6s1h: 'Online PDF Mergers vs. Desktop Software',
    s6s1p1s: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6s1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6s1l2: '✅ Works offline',
    s6s1l3: '❌ Requires installation and updates',
    s6s1l4: '❌ Often expensive ($100-300+ or subscription fees)',
    s6s1l5: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6s1l6: '❌ Takes up disk space',
    s6s1p2s: 'Online PDF Mergers:',
    s6s1m1: '✅ Free to use',
    s6s1m2: '✅ No installation required',
    s6s1m3: '✅ Works on any platform',
    s6s1m4: '✅ Always up-to-date',
    s6s1m5: '✅ Privacy-first (client-side processing)',
    s6s1m6: '❌ Requires internet connection (for initial page load)',
    s6s1m7: '❌ Fewer advanced features (but sufficient for merging)',
    s6s1p3s: 'Verdict:',
    s6s1p3: ' For PDF merging specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just merging.',

    s6s2h: 'Online PDF Mergers vs. Cloud-Based Services',
    s6s2p1s: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6s2l1: '✅ Integrated with cloud storage',
    s6s2l2: '✅ Can access files from anywhere',
    s6s2l3: '❌ Files uploaded to servers (privacy concern)',
    s6s2l4: '❌ Requires account creation',
    s6s2l5: '❌ Storage limits apply',
    s6s2l6: '❌ Files may be retained on servers',
    s6s2l7: '❌ Slower processing (upload/download time)',
    s6s2p2s: 'Client-Side Online Mergers:',
    s6s2m1: '✅ No file uploads (privacy-first)',
    s6s2m2: '✅ No account required',
    s6s2m3: '✅ Faster processing (no upload/download)',
    s6s2m4: '✅ No storage limits',
    s6s2m5: '✅ Files never leave your device',
    s6s2m6: "❌ Can't access files from cloud storage directly",
    s6s2p3s: 'Verdict:',
    s6s2p3: ' For privacy-conscious users, client-side online mergers are superior. Cloud services are better if you need to merge files already stored in cloud storage and don\'t mind the privacy trade-off.',

    s6s3h: 'Online PDF Mergers vs. Manual Methods',
    s6s3p1: 'Some people try to merge PDFs manually using methods like:',
    s6s3l1: 'Printing multiple PDFs to a new PDF (slow, quality loss)',
    s6s3l2: "Copy-pasting content (doesn't work with PDFs)",
    s6s3l3: 'Taking screenshots and combining (terrible quality, time-consuming)',
    s6s3l4: 'Using freeware with ads and malware risks',
    s6s3p2s: 'Verdict:',
    s6s3p2: ' Online PDF mergers are faster, produce better quality results, and are more reliable than any manual method. There\'s no reason to use workarounds when proper tools are available for free.',

    faqSectionTitle: 'Frequently Asked Questions About Merging PDFs',

    s8h: 'Conclusion: Making PDF Merging Simple',
    s8p1: "Merging PDF files doesn't have to be complicated. With modern online PDF merger tools, combining multiple documents into one is straightforward, fast, and secure. Whether you're a business professional consolidating reports, a student organizing assignments, or anyone who regularly works with PDF documents, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF mergers—no installation, privacy-first processing, free access, and cross-platform compatibility—make them the ideal solution for most merging needs. While desktop software has its place for advanced PDF editing tasks, simple merging is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Plan your file order before merging',
    s8l2: 'Keep individual files under 25 MB for best performance',
    s8l3: 'Use privacy-first tools that process files locally',
    s8l4: 'Review your merged PDF before finalizing important documents',
    s8l5: "Keep backups of original files until you're satisfied with the merge",
    s8p4a: 'Ready to merge your PDFs? Try our ',
    s8p4link1: 'free PDF merger tool',
    s8p4b: ' and experience how simple combining documents can be. And if you need to make edits to your PDFs before or after merging, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes before merging.',
    s8p5: "PDF management doesn't have to be a chore. With the right tools and approach, you can handle document merging quickly and confidently, leaving more time for the work that actually matters.",

    // Visible FAQ (12)
    fv1q: 'How do I merge PDF files online for free?',
    fv1a1: 'You can merge PDF files online for free by using our ',
    fv1link: 'PDF merger tool',
    fv1a2: '. Simply upload multiple PDF files, arrange them in your preferred order using drag-and-drop, and click merge. The tool combines all files into a single PDF document that you can download instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to merge PDFs online?',
    fv2a: 'Yes, when using a privacy-first PDF merger that processes files locally in your browser, your documents never leave your device. All merging happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I merge more than two PDF files at once?',
    fv3a: "Absolutely. Most online PDF merger tools allow you to combine multiple PDF files simultaneously. You can typically merge anywhere from 2 to 20+ PDF files in a single operation, depending on the tool you use. The practical limit is usually determined by your device's memory and processing power rather than the tool itself. For best results, we recommend merging 5-10 files at a time if you have many documents to combine.",
    fv4q: 'What is the maximum file size for merging PDFs online?',
    fv4a: 'File size limits vary by tool, but most online PDF mergers support files up to 25-50 MB per file. For best performance, keep individual files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to merge very large PDFs, consider splitting them first or using desktop software designed for heavy-duty processing.',
    fv5q: 'Do I need to create an account to merge PDF files?',
    fv5a: 'No, many free PDF merger tools work without requiring account creation or registration. You can upload, merge, and download your combined PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving merge history or accessing premium features, but basic PDF merging is typically available without any registration.',
    fv6q: 'Can I rearrange pages when merging PDFs?',
    fv6a: 'Yes, most PDF merger tools allow you to reorder files before merging. You can drag and drop files to arrange them in your preferred sequence, ensuring the final merged document follows your desired page order. Some advanced tools even let you rearrange individual pages within files, though this is less common. The key is arranging the files in the correct order before clicking merge, as the tool will combine them sequentially.',
    fv7q: 'Will merging PDFs reduce file quality?',
    fv7a: "No, properly merging PDFs should not reduce quality. When you merge PDF files using a quality tool, it combines the original pages without re-compressing or degrading the content. The merged PDF maintains the same quality as your source files. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that merge PDFs at the native PDF level rather than converting formats.",
    fv8q: 'Can I merge password-protected PDFs?',
    fv8a1: "This depends on the tool. Most online PDF mergers cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv8link: 'PDF editing tool',
    fv8a2: ' or the software that created the protection, then merge the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv9q: 'What happens if my PDFs have different page sizes?',
    fv9a: "When merging PDFs with different page sizes (e.g., mixing letter-size and A4 pages), the merged document will preserve each page's original size. This means your final PDF will contain pages of varying dimensions, which is usually fine for most purposes. Some tools offer options to standardize page sizes, but this may require reformatting content. For professional documents, it's often better to ensure source PDFs have consistent page sizes before merging.",
    fv10q: 'Can I undo a merge if I make a mistake?',
    fv10a: "Since merging creates a new file, you can't \"undo\" a merge in the traditional sense. However, your original PDF files remain unchanged on your device, so you can simply merge them again with the correct order or selection. This is why it's important to review your file list and order before clicking merge. Some tools keep your file list available for a few minutes after merging, allowing quick re-merges if needed.",
    fv11q: 'Is there a limit to how many pages I can merge?',
    fv11a: "There's no hard limit on page count, but practical limits exist based on your device's capabilities. Most online tools handle 100-200 pages comfortably. Very large merges (500+ pages) may cause browser slowdowns or memory issues. If you need to merge extremely large documents, consider splitting the merge into multiple operations or using desktop software optimized for large file processing.",
    fv12q: 'Can I merge PDFs on mobile devices?',
    fv12a: 'Yes, many online PDF merger tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large merges might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB each) and fewer total pages (under 50). The interface may also be optimized differently for touch screens.',

    // Schema FAQ (6) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I merge PDF files online for free?',
    fq1a: 'You can merge PDF files online for free by using our PDF merger tool. Simply upload multiple PDF files, arrange them in your preferred order, and click merge. The tool combines all files into a single PDF document that you can download instantly.',
    fq2q: 'Is it safe to merge PDFs online?',
    fq2a: 'Yes, when using a privacy-first PDF merger that processes files locally in your browser, your documents never leave your device. All merging happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'Can I merge more than two PDF files at once?',
    fq3a: 'Yes, most online PDF merger tools allow you to combine multiple PDF files simultaneously. You can typically merge anywhere from 2 to 20+ PDF files in a single operation, depending on the tool you use.',
    fq4q: 'What is the maximum file size for merging PDFs online?',
    fq4a: 'File size limits vary by tool, but most online PDF mergers support files up to 25-50 MB per file. For best performance, keep individual files under 25 MB and limit the total number of pages to under 200.',
    fq5q: 'Do I need to create an account to merge PDF files?',
    fq5a: 'No, many free PDF merger tools work without requiring account creation or registration. You can upload, merge, and download your combined PDF files immediately without signing up.',
    fq6q: 'Can I rearrange pages when merging PDFs?',
    fq6a: 'Yes, most PDF merger tools allow you to reorder files before merging. You can drag and drop files to arrange them in your preferred sequence, ensuring the final merged document follows your desired page order.',
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
      images: [{ url: `${siteUrl}/images/blog/how-to-merge-pdf-files-online-hero.png`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/images/blog/how-to-merge-pdf-files-online-hero.png`],
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
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
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
          style={{ boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)' }}
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
            <p className="text-xl text-surface-300 leading-relaxed mb-4">{c.intro1}</p>
            <p className="text-lg text-surface-400">{c.intro2}</p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s1l1s}</strong>{c.s1l1}</li>
                <li><strong className="text-white">{c.s1l2s}</strong>{c.s1l2}</li>
                <li><strong className="text-white">{c.s1l3s}</strong>{c.s1l3}</li>
                <li><strong className="text-white">{c.s1l4s}</strong>{c.s1l4}</li>
                <li><strong className="text-white">{c.s1l5s}</strong>{c.s1l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s1p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s2p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s2l1s}</strong>{c.s2l1}</li>
                <li><strong className="text-white">{c.s2l2s}</strong>{c.s2l2}</li>
                <li><strong className="text-white">{c.s2l3s}</strong>{c.s2l3}</li>
                <li><strong className="text-white">{c.s2l4s}</strong>{c.s2l4}</li>
                <li><strong className="text-white">{c.s2l5s}</strong>{c.s2l5}</li>
                <li><strong className="text-white">{c.s2l6s}</strong>{c.s2l6}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s2p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s2m1}</li>
                <li>{c.s2m2}</li>
                <li>{c.s2m3}</li>
                <li>{c.s2m4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s2p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s3h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s3l1s}</strong>{c.s3l1}</li>
                <li><strong className="text-white">{c.s3l2s}</strong>{c.s3l2}</li>
                <li><strong className="text-white">{c.s3l3s}</strong>{c.s3l3}</li>
                <li><strong className="text-white">{c.s3l4s}</strong>{c.s3l4}</li>
                <li><strong className="text-white">{c.s3l5s}</strong>{c.s3l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p3}</p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s4p1}</p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s1p1a}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s2p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s2l1}</li>
                  <li>{c.s4s2l2}</li>
                  <li>{c.s4s2l3}</li>
                  <li>{c.s4s2l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">{c.s4s2p2}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s3p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s3l1}</li>
                  <li>{c.s4s3l2}</li>
                  <li>{c.s4s3l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s3p2s}</strong>{c.s4s3p2}
                </p>
                <p className="text-surface-300 leading-relaxed">{c.s4s3p3}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s4p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s4l1}</li>
                  <li>{c.s4s4l2}</li>
                  <li>{c.s4s4l3}</li>
                  <li>{c.s4s4l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">{c.s4s4p2}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s5p1}</p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s5o1}</li>
                  <li>{c.s4s5o2}</li>
                  <li>{c.s4s5o3}</li>
                  <li>{c.s4s5o4}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s5p2}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s5l1}</li>
                  <li>{c.s4s5l2}</li>
                  <li>{c.s4s5l3}</li>
                  <li>{c.s4s5l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">{c.s4s5p3}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s4s6p1}</p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s6p2s}</strong>{c.s4s6p2}
                </p>
                <p className="text-surface-300 leading-relaxed">{c.s4s6p3}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p1}</p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s1h}</h3>
                <p className="text-surface-300 leading-relaxed">{c.s5s1p1}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s5s2p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5s2l1}</li>
                  <li>{c.s5s2l2}</li>
                  <li>{c.s5s2l3}</li>
                  <li>{c.s5s2l4}</li>
                  <li>{c.s5s2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">{c.s5s2p2}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s3h}</h3>
                <p className="text-surface-300 leading-relaxed">{c.s5s3p1}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s4h}</h3>
                <p className="text-surface-300 leading-relaxed">{c.s5s4p1}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s5h}</h3>
                <p className="text-surface-300 leading-relaxed">{c.s5s5p1}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s6h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s5s6p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5s6l1}</li>
                  <li>{c.s5s6l2}</li>
                  <li>{c.s5s6l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">{c.s5s6p2}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s7h}</h3>
                <p className="text-surface-300 leading-relaxed">{c.s5s7p1}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s6p1}</p>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s1h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s1p1s}</strong>
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
                  <strong className="text-white">{c.s6s1p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s1m1}</li>
                  <li>{c.s6s1m2}</li>
                  <li>{c.s6s1m3}</li>
                  <li>{c.s6s1m4}</li>
                  <li>{c.s6s1m5}</li>
                  <li>{c.s6s1m6}</li>
                  <li>{c.s6s1m7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s1p3s}</strong>{c.s6s1p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s2p1s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s2l1}</li>
                  <li>{c.s6s2l2}</li>
                  <li>{c.s6s2l3}</li>
                  <li>{c.s6s2l4}</li>
                  <li>{c.s6s2l5}</li>
                  <li>{c.s6s2l6}</li>
                  <li>{c.s6s2l7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6s2p2s}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s2m1}</li>
                  <li>{c.s6s2m2}</li>
                  <li>{c.s6s2m3}</li>
                  <li>{c.s6s2m4}</li>
                  <li>{c.s6s2m5}</li>
                  <li>{c.s6s2m6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s2p3s}</strong>{c.s6s2p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6s3h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">{c.s6s3p1}</p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6s3l1}</li>
                  <li>{c.s6s3l2}</li>
                  <li>{c.s6s3l3}</li>
                  <li>{c.s6s3l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6s3p2s}</strong>{c.s6s3p2}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqSectionTitle}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1link}</Link>{c.fv1a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv2q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv2a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv3q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv3a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv4q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv4a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv5q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv5a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv6q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv6a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv7q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv7a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv8q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv8a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8link}</Link>{c.fv8a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv9q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv9a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv10q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv10a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv11q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv11a}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv12q}</h3>
                  <p className="text-surface-300 leading-relaxed">{c.fv12a}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s8h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s8p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s8p2}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s8p3}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s8l1}</li>
                <li>{c.s8l2}</li>
                <li>{c.s8l3}</li>
                <li>{c.s8l4}</li>
                <li>{c.s8l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}
              </p>
              <p className="text-surface-300 leading-relaxed">{c.s8p5}</p>
            </section>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link href={L('/blog')} className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
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
import { TRANSLATIONS } from './how-to-merge-pdf-files-online.i18n'
Object.assign(C, TRANSLATIONS)
