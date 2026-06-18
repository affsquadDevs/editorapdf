import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-convert-pdf-to-csv-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Convert PDF to CSV Online_ Complete Guide to Extracting Tables from PDF Files.png'
const ogImage = `${siteUrl}/images/blog/how-to-convert-pdf-to-csv-online-hero.png`
const articleImage = `${siteUrl}/blog/How to Convert PDF to Excel Online_ Complete Guide to PDF to Spreadsheet Conversion.png`
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Convert PDF to CSV Online (Step-by-Step Guide)',
    metaDesc: 'Extract tables from PDF files and convert them to CSV format instantly. Turn PDF data into editable spreadsheet-ready files in minutes.',
    ogTitle: 'How to Convert PDF to CSV Online (Step-by-Step Guide)',
    ogDesc: 'Extract tables from PDF files and convert them to CSV format instantly. Turn PDF data into editable spreadsheet-ready files in minutes.',
    ogImageAlt: 'Banner showing PDF document converting into CSV spreadsheet with data table extraction',
    twTitle: 'How to Convert PDF to CSV Online (Step-by-Step Guide)',
    twDesc: 'Extract tables from PDF files and convert them to CSV format instantly. Turn PDF data into editable spreadsheet-ready files in minutes.',
    heroAlt: 'How to convert PDF to CSV online - Free PDF to CSV converter tool guide',

    bcLeaf: 'How to Convert PDF to CSV Online',
    heroTitle: 'How to Convert PDF to CSV Online: Complete Guide to Extracting Tables from PDF Files',
    heroSubtitle: 'Learn how to extract tables and structured data from PDF files and convert them to CSV format. Free, secure, and easy-to-use PDF to CSV converter.',

    artHeadline: 'How to Convert PDF to CSV Online - Complete Guide to Extracting Tables from PDF Files',
    artDesc: 'Complete guide on how to convert PDF to CSV online. Learn to extract tables and structured data from PDF files to CSV format using free online tools. Step-by-step instructions, tips, and best practices for PDF to CSV conversion.',

    intro1: "You've got a PDF file full of tables—maybe it's a financial report, a data export, or a scanned document with structured information. You need that data in CSV format so you can analyze it in Excel, import it into a database, or work with it in your favorite data analysis tool. But manually copying and pasting from PDFs is tedious, error-prone, and downright frustrating.",
    intro2: "The good news? You don't need expensive software or programming skills. Modern online PDF to CSV converters make extracting tables from PDF files as straightforward as uploading a document and clicking a button. This comprehensive guide will walk you through everything you need to know about converting PDFs to CSV format, from understanding how table extraction works to handling complex documents and ensuring your data stays secure throughout the process.",

    s1h: 'The Problem: Why Extracting Data from PDFs Is So Challenging',
    s1p1: 'PDFs are designed to preserve document appearance, not to make data extraction easy. Unlike spreadsheets where data is structured in cells, PDFs store information as a collection of text elements positioned on a page. This makes extracting tabular data much more complex than it seems.',
    s1p2: "Here's what makes PDF to CSV conversion challenging:",
    s1l1s: 'No inherent structure:',
    s1l1t: " PDFs don't have built-in table structures like Excel files. Tables are just text positioned to look like tables",
    s1l2s: 'Complex layouts:',
    s1l2t: ' Multi-column layouts, merged cells, and irregular spacing confuse simple extraction methods',
    s1l3s: 'Scanned documents:',
    s1l3t: ' PDFs created from scanned images require OCR (Optical Character Recognition) before data extraction',
    s1l4s: 'Format inconsistencies:',
    s1l4t: ' Different PDFs use different formatting, making it hard to create a one-size-fits-all solution',
    s1l5s: 'Manual work is error-prone:',
    s1l5t: ' Copy-pasting from PDFs often results in misaligned columns, missing data, or formatting issues',
    s1l6s: 'Time-consuming process:',
    s1l6t: ' Manually extracting data from large PDFs can take hours, especially with multiple tables',
    s1p3: 'These challenges are exactly why specialized PDF to CSV conversion tools have become essential. They handle the complexity of table detection and data extraction automatically, saving you time and reducing errors.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think converting PDF to CSV is a niche task, but it's actually something professionals across many industries need to do regularly. Consider these real-world scenarios:",
    s2l1s: 'Financial analysts',
    s2l1t: ' extracting quarterly reports, earnings data, or financial statements from PDF documents',
    s2l2s: 'Data scientists',
    s2l2t: ' converting research papers, survey results, or statistical reports into analyzable formats',
    s2l3s: 'Accountants',
    s2l3t: ' extracting invoice data, transaction records, or tax documents for spreadsheet analysis',
    s2l4s: 'Researchers',
    s2l4t: ' converting published data tables from academic papers into formats suitable for statistical analysis',
    s2l5s: 'Business analysts',
    s2l5t: ' extracting sales reports, inventory lists, or performance metrics from PDF exports',
    s2l6s: 'HR professionals',
    s2l6t: ' converting employee data, timesheets, or payroll information from PDF forms',
    s2l7s: 'Marketing teams',
    s2l7t: ' extracting campaign metrics, analytics reports, or survey responses',
    s2l8s: 'Healthcare administrators',
    s2l8t: ' converting patient records, test results, or billing information',
    s2p2: "The time wasted on manual data extraction adds up quickly. What takes minutes with the right tool can take hours when you're manually copying data cell by cell. More importantly, manual extraction leads to:",
    s2m1: 'Data entry errors that can cascade through your analysis',
    s2m2: 'Lost productivity from repetitive, mind-numbing work',
    s2m3: 'Inconsistent formatting that breaks your data pipelines',
    s2m4: 'Privacy concerns when sharing sensitive PDFs with third-party services',
    s2m5: 'Frustration and decreased job satisfaction',
    s2p3: "That's why understanding how to convert PDF to CSV properly isn't just about convenience—it's about working efficiently and accurately in a world where PDF documents are the standard format for sharing structured data.",

    s3h: 'The Solution: Modern Online PDF to CSV Converters',
    s3p1: 'The solution to PDF data extraction headaches is simpler than you might expect. Modern web-based PDF to CSV converters use advanced algorithms to detect tables, understand their structure, and extract data accurately—all happening in your web browser.',
    s3p2: 'What makes these tools effective? They leverage sophisticated table detection technology that works entirely in your browser. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers',
    s3l3s: 'Automatic table detection:',
    s3l3t: ' Intelligently identifies tables in your PDF without manual selection',
    s3l4s: 'Instant results:',
    s3l4t: ' Convert PDFs to CSV in seconds, not minutes',
    s3l5s: 'Free to use:',
    s3l5t: ' No subscriptions or hidden fees',
    s3l6s: 'Cross-platform compatibility:',
    s3l6t: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l7s: 'Page selection:',
    s3l7t: ' Convert specific pages or ranges, not just entire documents',
    s3p3: "The best part? You don't need to understand how table detection algorithms work. The tool analyzes your PDF, identifies tabular structures, determines column boundaries, and extracts data automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF to CSV converter tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Convert PDF to CSV Using Our Tool',
    s4p1: "Ready to extract tables from your PDF? Follow these steps to convert PDF files to CSV format quickly and accurately. We'll cover everything from uploading your document to downloading your extracted data.",
    s4st1h: 'Step 1: Access the PDF to CSV Converter',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF to CSV converter page',
    s4st1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start converting immediately.",
    s4st2h: 'Step 2: Upload Your PDF File',
    s4st2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st2l1: 'Drag and drop functionality for quick file upload',
    s4st2l2: 'Files up to 25 MB (for optimal performance)',
    s4st2l3: 'Any PDF file containing tables or structured data',
    s4st2l4: 'Scanned PDFs (though text-based PDFs work better)',
    s4st2l5: 'Multi-page documents with tables on different pages',
    s4st2p2: "Once uploaded, the tool will analyze your PDF and show you a preview. You'll see the total page count and can navigate through pages to see where tables are located.",
    s4st2p3s: 'Pro tip:',
    s4st2p3t: " If your PDF contains only tables, you can convert the entire document. If it's a mixed document with text and tables, you'll want to select specific pages in the next step.",
    s4st3h: 'Step 3: Select Pages to Convert (Optional)',
    s4st3p1: 'If your PDF has multiple pages and you only need data from specific pages, you can select which pages to convert. This is particularly useful for:',
    s4st3l1: 'Large documents where only certain pages contain tables',
    s4st3l2: 'Mixed documents with both text content and data tables',
    s4st3l3: 'Documents where you want to extract data from specific sections',
    s4st3p2: 'You can specify pages in several ways:',
    s4st3m1s: 'All pages:',
    s4st3m1t: ' Leave the page range empty or enter "all" to convert every page',
    s4st3m2s: 'Single pages:',
    s4st3m2t: ' Enter specific page numbers separated by commas (e.g., "1, 3, 5")',
    s4st3m3s: 'Page ranges:',
    s4st3m3t: ' Enter ranges like "1-10" to convert pages 1 through 10',
    s4st3m4s: 'Combined:',
    s4st3m4t: ' Mix ranges and single pages (e.g., "1-5, 10, 15-20")',
    s4st3p3s: 'Best practice:',
    s4st3p3t: " If you're not sure which pages contain tables, convert all pages first, then review the results. You can always convert again with specific pages if needed.",
    s4st4h: 'Step 4: Review Your Settings',
    s4st4p1: 'Before converting, take a moment to verify your settings:',
    s4st4l1: 'The correct PDF file is uploaded',
    s4st4l2: 'Page selection matches the pages you want to convert',
    s4st4l3: "You understand that CSV format won't preserve visual formatting",
    s4st4p2: "This quick check prevents having to start over if you realize something's wrong after conversion.",
    s4st5h: 'Step 5: Click Convert and Wait for Processing',
    s4st5p1: 'Once everything looks good, click the "Extract to CSV" or "Convert to CSV" button. The tool will:',
    s4st5o1: 'Analyze your PDF structure',
    s4st5o2: 'Detect tables on the selected pages',
    s4st5o3: 'Identify column boundaries and row structures',
    s4st5o4: 'Extract data from each detected table',
    s4st5o5: 'Convert the extracted data to CSV format',
    s4st5o6: 'Generate your CSV file(s)',
    s4st5p2: 'Processing time depends on:',
    s4st5m1: 'Total page count of your PDF',
    s4st5m2: 'Number of tables detected',
    s4st5m3: 'Complexity of table structures',
    s4st5m4: 'File size',
    s4st5m5: "Your device's processing power",
    s4st5p3: "For typical conversions (10-50 pages with a few tables), this usually takes just a few seconds. More complex documents might take 30-60 seconds. You'll see a progress indicator during processing.",
    s4st6h: 'Step 6: Review and Download Your CSV Files',
    s4st6p1: 'When processing completes, your CSV files are ready. The tool may generate:',
    s4st6l1s: 'Single CSV file:',
    s4st6l1t: ' If all tables are combined into one file',
    s4st6l2s: 'Multiple CSV files:',
    s4st6l2t: ' If separate files are created for each table or page',
    s4st6l3s: 'ZIP archive:',
    s4st6l3t: ' If multiple CSV files are packaged together',
    s4st6p2: 'You can:',
    s4st6m1: 'Download individual CSV files',
    s4st6m2: 'Download all files as a ZIP archive (most convenient for multiple files)',
    s4st6m3: 'Preview the CSV content before downloading (if the tool supports it)',
    s4st6p3s: 'Important:',
    s4st6p3t: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your CSV files before closing the page.',
    s4st6p4s: 'Next steps:',
    s4st6p4t: ' Open your CSV file in Excel, Google Sheets, or any spreadsheet application to review the extracted data. You may need to:',
    s4st6n1: 'Adjust column widths for better readability',
    s4st6n2: "Format numbers or dates if they weren't detected correctly",
    s4st6n3: 'Clean up any extraction errors (though modern tools are quite accurate)',
    s4st6n4: 'Add formulas or analysis to your data',
    s4st6p5: "That's it! You've successfully converted your PDF to CSV. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF to CSV Converters',
    s5p1: 'Why choose an online PDF to CSV converter over desktop software or manual methods? Here are the key advantages:',
    s5st1h: '1. Zero Installation Required',
    s5st1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start converting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to convert PDFs on the go.",
    s5st2h: '2. Privacy and Security',
    s5st2p1: 'When you use a privacy-first PDF to CSV converter that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5st2l1: 'Financial data and reports',
    s5st2l2: 'Personal information and records',
    s5st2l3: 'Confidential business documents',
    s5st2l4: 'Legal documents',
    s5st2l5: 'Medical records',
    s5st2l6: 'Any sensitive data',
    s5st2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.',
    s5st3h: '3. Automatic Table Detection',
    s5st3p1: "Modern PDF to CSV converters use intelligent algorithms to automatically detect tables in your PDF. You don't need to manually select table regions or define column boundaries. The tool analyzes the document structure and identifies tabular data automatically, saving you significant time and effort.",
    s5st4h: '4. Cost-Effective Solution',
    s5st4p1: 'Most online PDF to CSV converters are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF to CSV conversion, free online tools provide excellent value without any financial commitment.',
    s5st5h: '5. Cross-Platform Compatibility',
    s5st5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF to CSV converters work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.",
    s5st6h: '6. Always Up-to-Date',
    s5st6p1: 'Online tools are automatically updated by their developers. You always get the latest table detection algorithms, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.',
    s5st7h: '7. Speed and Efficiency',
    s5st7p1: 'Modern browser-based PDF processing is surprisingly fast. You can convert PDFs to CSV in seconds, compared to:',
    s5st7l1: 'Manual copy-paste methods (slow, error-prone, and time-consuming)',
    s5st7l2: 'Desktop software that requires launching and navigating complex interfaces',
    s5st7l3: 'Programming scripts that require technical knowledge and setup time',
    s5st7p2: 'The streamlined interface of online tools means less time clicking through menus and more time working with your data.',
    s5st8h: '8. Flexible Page Selection',
    s5st8p1: 'Unlike some desktop tools that force you to convert entire documents, online converters typically allow you to select specific pages or page ranges. This flexibility is invaluable when working with large documents where only certain pages contain tables.',

    s6h: 'Comparison: Online PDF to CSV Converters vs. Other Tools',
    s6p1: "How do online PDF to CSV converters stack up against alternatives? Let's break down the comparison:",
    s6st1h: 'Online PDF to CSV Converters vs. Desktop Software',
    s6st1lead: 'Desktop Software (Adobe Acrobat, PDF Expert, etc.):',
    s6st1l1: '✅ More advanced features (editing, form filling, etc.)',
    s6st1l2: '✅ Works offline',
    s6st1l3: '✅ Better for very large files (500+ pages)',
    s6st1l4: '✅ More control over extraction settings',
    s6st1l5: '❌ Requires installation and updates',
    s6st1l6: '❌ Often expensive ($100-300+ or subscription fees)',
    s6st1l7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6st1l8: '❌ Takes up disk space',
    s6st1l9: '❌ Steeper learning curve',
    s6st1lead2: 'Online PDF to CSV Converters:',
    s6st1n1: '✅ Free to use',
    s6st1n2: '✅ No installation required',
    s6st1n3: '✅ Works on any platform',
    s6st1n4: '✅ Always up-to-date',
    s6st1n5: '✅ Privacy-first (client-side processing)',
    s6st1n6: '✅ Automatic table detection',
    s6st1n7: '✅ Simple, intuitive interface',
    s6st1n8: '❌ Requires internet connection (for initial page load)',
    s6st1n9: '❌ May struggle with extremely large files (500+ pages)',
    s6st1n10: '❌ Fewer advanced extraction options',
    s6st1verds: 'Verdict:',
    s6st1verdt: ' For PDF to CSV conversion specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just conversion, or if you regularly work with very large files and need fine-grained control over extraction settings.',
    s6st2h: 'Online PDF to CSV Converters vs. Cloud-Based Services',
    s6st2lead: 'Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):',
    s6st2l1: '✅ Integrated with cloud storage',
    s6st2l2: '✅ Can access files from anywhere',
    s6st2l3: '✅ Often free with cloud storage accounts',
    s6st2l4: '❌ Files uploaded to servers (privacy concern)',
    s6st2l5: '❌ Requires account creation',
    s6st2l6: '❌ Storage limits apply',
    s6st2l7: '❌ Files may be retained on servers',
    s6st2l8: '❌ Slower processing (upload/download time)',
    s6st2l9: '❌ Limited conversion options',
    s6st2lead2: 'Client-Side Online Converters:',
    s6st2n1: '✅ No file uploads (privacy-first)',
    s6st2n2: '✅ No account required',
    s6st2n3: '✅ Faster processing (no upload/download)',
    s6st2n4: '✅ No storage limits',
    s6st2n5: '✅ Files never leave your device',
    s6st2n6: '✅ Automatic table detection',
    s6st2n7: "❌ Can't access files from cloud storage directly",
    s6st2verds: 'Verdict:',
    s6st2verdt: ' For privacy-conscious users, client-side online converters are superior. Cloud services are better if you need to convert files already stored in cloud storage and don\'t mind the privacy trade-off.',
    s6st3h: 'Online PDF to CSV Converters vs. Manual Methods',
    s6st3p1: 'Some people try to extract data from PDFs manually using methods like:',
    s6st3l1: 'Copy-pasting cells one by one (extremely slow and error-prone)',
    s6st3l2: 'Taking screenshots and using OCR (poor accuracy, time-consuming)',
    s6st3l3: 'Re-typing data manually (slowest method, highest error rate)',
    s6st3l4: "Using Excel's import feature (limited, often misaligns columns)",
    s6st3verds: 'Verdict:',
    s6st3verdt: " Online PDF to CSV converters are faster, more accurate, and more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.",
    s6st4h: 'PDF to CSV vs. PDF to Excel',
    s6st4p1: 'You might wonder whether you should convert to CSV or Excel format. Here\'s the difference:',
    s6st4lead: 'CSV Format:',
    s6st4l1: '✅ Universal compatibility (opens in any spreadsheet app)',
    s6st4l2: '✅ Lightweight file size',
    s6st4l3: '✅ Easy to import into databases and data analysis tools',
    s6st4l4: '✅ Plain text format, easy to process programmatically',
    s6st4l5: '❌ No formatting (colors, fonts, cell styles)',
    s6st4l6: '❌ No formulas or multiple sheets',
    s6st4lead2: 'Excel Format (XLSX):',
    s6st4n1: '✅ Preserves formatting and styling',
    s6st4n2: '✅ Supports formulas and multiple sheets',
    s6st4n3: '✅ Better for complex spreadsheets',
    s6st4n4: '❌ Larger file sizes',
    s6st4n5: '❌ Requires Excel or compatible software',
    s6st4n6: '❌ Less suitable for data import/export workflows',
    s6st4verds: 'Verdict:',
    s6st4verdt1: ' Use CSV when you need universal compatibility, lightweight files, or data import/export. Use Excel when you need formatting, formulas, or multiple sheets. For most data extraction tasks, CSV is the better choice. If you need Excel format, check out our ',
    s6st4verdlink: 'PDF to Excel converter',
    s6st4verdt2: '.',

    faqh: 'Frequently Asked Questions About Converting PDF to CSV',

    s8h: 'Conclusion: Making PDF to CSV Conversion Simple',
    s8p1: "Converting PDF files to CSV format doesn't have to be complicated. With modern online PDF to CSV converters, extracting tables and structured data from PDF documents is straightforward, fast, and secure. Whether you're a financial analyst extracting quarterly reports, a researcher converting data tables, or anyone who regularly works with PDF documents containing tabular data, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF to CSV converters—no installation, privacy-first processing, free access, automatic table detection, and cross-platform compatibility—make them the ideal solution for most conversion needs. While desktop software has its place for advanced PDF editing tasks, simple data extraction is perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Use text-based PDFs when possible (scanned PDFs may require OCR first)',
    s8l2: 'Select specific pages if your PDF contains mixed content',
    s8l3: 'Keep files under 25 MB for best performance',
    s8l4: 'Use privacy-first tools that process files locally',
    s8l5: 'Review your extracted CSV data for accuracy',
    s8l6: 'Clean up any formatting issues in your spreadsheet application',
    s8l7: "Keep backups of original PDFs until you're satisfied with the conversion",
    s8p4a: 'Ready to convert your PDFs to CSV? Try our ',
    s8p4link1: 'free PDF to CSV converter tool',
    s8p4b: ' and experience how simple data extraction can be. And if you need to make edits to your PDFs before converting, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes before conversion. And if you need to combine multiple PDFs first, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents before extracting data.',
    s8p5: "PDF data extraction doesn't have to be a chore. With the right tools and approach, you can convert PDFs to CSV quickly and confidently, leaving more time for the analysis and insights that actually matter.",

    relTitle1: 'How to Convert PDF to Excel Online',
    relDesc1: 'Learn how to extract tables from PDF files and convert them to Excel format with formatting preserved.',
    relTitle2: 'How to Merge PDF Files Online',
    relDesc2: 'Complete guide on combining multiple PDF files into one document using free online tools.',
    relTitle3: 'How to Split PDF Files Online',
    relDesc3: 'Learn how to divide large PDF files into smaller documents using free online tools.',
    relTitle4: 'How to Edit a PDF Online',
    relDesc4: 'Complete guide to editing PDF files online without installing software.',

    // Visible FAQ (13)
    fv1q: 'How do I convert PDF to CSV online for free?',
    fv1a1: 'You can convert PDF to CSV online for free by using our ',
    fv1alink: 'PDF to CSV converter tool',
    fv1a2: '. Simply upload your PDF file containing tables or structured data, select the pages you want to convert (or leave it blank to convert all pages), and click "Extract to CSV". The tool automatically detects tables in your PDF and converts them to CSV format that you can download instantly. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to convert PDF to CSV online?',
    fv2a: 'Yes, when using a privacy-first PDF to CSV converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side using JavaScript, ensuring your sensitive data remains secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I extract tables from PDF to CSV?',
    fv3a: 'Absolutely. Most PDF to CSV converters can automatically detect and extract tables from PDF files. The tool analyzes the PDF structure, identifies tabular data based on text positioning and alignment, and converts it to CSV format with proper column separation. Some tools allow you to select specific tables or pages to convert, giving you control over what data gets extracted. The accuracy of table detection depends on how well-structured the tables are in your PDF.',
    fv4q: 'What is the maximum file size for converting PDF to CSV online?',
    fv4a1: 'File size limits vary by tool, but most online PDF to CSV converters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to convert very large PDFs, consider splitting them first using our ',
    fv4alink: 'PDF splitter tool',
    fv4a2: ', or using desktop software designed for heavy-duty processing.',
    fv5q: 'Do I need to create an account to convert PDF to CSV?',
    fv5a: 'No, many free PDF to CSV converter tools work without requiring account creation or registration. You can upload, convert, and download your CSV files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving conversion history or accessing premium features, but basic PDF to CSV conversion is typically available without any registration.',
    fv6q: 'Can I convert specific pages from a PDF to CSV?',
    fv6a: 'Yes, most PDF to CSV converters allow you to select specific pages or page ranges to convert. You can specify individual pages (e.g., "1, 3, 5") or ranges (e.g., "1-10, 15-20") to extract only the data you need. This is particularly useful for large PDFs where only certain pages contain tables, or when you want to exclude cover pages, headers, or other non-data content. Some tools also let you preview pages before converting to help you decide which ones to include.',
    fv7q: 'What is the difference between PDF to CSV and PDF to Excel?',
    fv7a1: 'PDF to CSV converts tabular data to comma-separated values format, which is a plain text format that can be opened in any spreadsheet application. CSV files are lightweight, universally compatible, and ideal for data import/export workflows. PDF to Excel converts data to XLSX format, which preserves formatting, formulas, and multiple sheets. Excel format is better for complex spreadsheets that need styling or formulas. If you need Excel format, check out our ',
    fv7alink: 'PDF to Excel converter',
    fv7a2: '.',
    fv8q: 'Will converting PDF to CSV preserve formatting?',
    fv8a: 'CSV is a plain text format, so it does not preserve visual formatting like colors, fonts, cell borders, or styling. However, it does preserve the data structure and content. The table structure, column headers, and data values are maintained, but visual formatting is lost. If you need to preserve formatting, consider using PDF to Excel conversion instead. CSV is designed for data, not presentation.',
    fv9q: 'Can I convert scanned PDFs to CSV?',
    fv9a1: 'Scanned PDFs (images of documents) require Optical Character Recognition (OCR) before data extraction. Some PDF to CSV converters include OCR capabilities, while others only work with text-based PDFs. If your PDF is scanned, look for a converter that explicitly mentions OCR support. Alternatively, you can use our ',
    fv9alink: 'OCR tool',
    fv9a2: ' to convert scanned PDFs to searchable text first, then extract tables from the searchable PDF.',
    fv10q: 'What if my PDF has complex tables with merged cells?',
    fv10a: 'Complex tables with merged cells, irregular spacing, or non-standard layouts can be challenging for automatic extraction. Most converters handle simple tables well, but complex layouts may require manual cleanup after conversion. Some tools offer advanced options for handling merged cells (either splitting them or preserving the merged structure). If you frequently work with complex tables, you might need to use desktop software with more advanced extraction settings, or manually adjust the CSV after conversion.',
    fv11q: 'Can I convert multiple PDFs to CSV at once?',
    fv11a: 'This depends on the tool. Some PDF to CSV converters support batch processing, allowing you to upload multiple PDFs and convert them all at once. Others only handle one file at a time. If you need to convert many PDFs, look for tools that explicitly support batch conversion, or convert them one by one. Batch processing is particularly useful when you have many similar documents with the same table structure.',
    fv12q: "What happens if the tool doesn't detect my tables correctly?",
    fv12a1: 'If table detection fails or produces incorrect results, you have a few options. First, try converting specific pages instead of the entire document. Sometimes tables on certain pages are detected better than others. Second, check if your PDF has clear table boundaries—tables with visible borders are usually detected more accurately. Third, you might need to manually clean up the CSV after conversion. If your PDFs consistently have detection issues, consider using desktop software with more advanced extraction settings, or pre-process your PDFs using our ',
    fv12alink: 'PDF editing tool',
    fv12a2: ' to improve table clarity.',
    fv13q: 'Can I convert PDF to CSV on mobile devices?',
    fv13a: 'Yes, many online PDF to CSV converters work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large conversions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I convert PDF to CSV online for free?',
    fq1a: 'You can convert PDF to CSV online for free by using our PDF to CSV converter tool. Simply upload your PDF file containing tables or structured data, select the pages you want to convert, and click "Extract to CSV". The tool automatically detects tables in your PDF and converts them to CSV format that you can download instantly.',
    fq2q: 'Is it safe to convert PDF to CSV online?',
    fq2a: 'Yes, when using a privacy-first PDF to CSV converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side, ensuring your sensitive data remains secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer.',
    fq3q: 'Can I extract tables from PDF to CSV?',
    fq3a: 'Yes, most PDF to CSV converters can automatically detect and extract tables from PDF files. The tool analyzes the PDF structure, identifies tabular data, and converts it to CSV format with proper column separation. Some tools allow you to select specific tables or pages to convert, giving you control over what data gets extracted.',
    fq4q: 'What is the maximum file size for converting PDF to CSV online?',
    fq4a: 'File size limits vary by tool, but most online PDF to CSV converters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues or timeouts.',
    fq5q: 'Do I need to create an account to convert PDF to CSV?',
    fq5a: 'No, many free PDF to CSV converter tools work without requiring account creation or registration. You can upload, convert, and download your CSV files immediately without signing up. This makes the process faster and more private.',
    fq6q: 'Can I convert specific pages from a PDF to CSV?',
    fq6a: 'Yes, most PDF to CSV converters allow you to select specific pages or page ranges to convert. You can specify individual pages (e.g., 1, 3, 5) or ranges (e.g., 1-10, 15-20) to extract only the data you need. This is particularly useful for large PDFs where only certain pages contain tables.',
    fq7q: 'What is the difference between PDF to CSV and PDF to Excel?',
    fq7a: 'PDF to CSV converts tabular data to comma-separated values format, which is a plain text format that can be opened in any spreadsheet application. PDF to Excel converts data to XLSX format, which preserves formatting, formulas, and multiple sheets. CSV is simpler and more universally compatible, while Excel format offers more features for complex spreadsheets.',
    fq8q: 'Will converting PDF to CSV preserve formatting?',
    fq8a: 'CSV is a plain text format, so it does not preserve visual formatting like colors, fonts, or cell styling. However, it does preserve the data structure and content. The table structure, column headers, and data values are maintained, but visual formatting is lost. If you need to preserve formatting, consider using PDF to Excel conversion instead.',
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: c.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [ogImage],
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
    image: articleImage,
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
                {c.s3p4a}<Link href={L('/tools/pdf-to-csv')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1p1a}<Link href={L('/tools/pdf-to-csv')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
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
                  <li>{c.s4st2l4}</li>
                  <li>{c.s4st2l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st2p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st2p3s}</strong>{c.s4st2p3t}
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st3p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st3m1s}</strong>{c.s4st3m1t}</li>
                  <li><strong className="text-white">{c.s4st3m2s}</strong>{c.s4st3m2t}</li>
                  <li><strong className="text-white">{c.s4st3m3s}</strong>{c.s4st3m3t}</li>
                  <li><strong className="text-white">{c.s4st3m4s}</strong>{c.s4st3m4t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st3p3s}</strong>{c.s4st3p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st4p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st4l1}</li>
                  <li>{c.s4st4l2}</li>
                  <li>{c.s4st4l3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st4p2}
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
                  <li>{c.s4st5o6}</li>
                </ol>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st5m1}</li>
                  <li>{c.s4st5m2}</li>
                  <li>{c.s4st5m3}</li>
                  <li>{c.s4st5m4}</li>
                  <li>{c.s4st5m5}</li>
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
                  <li><strong className="text-white">{c.s4st6l1s}</strong>{c.s4st6l1t}</li>
                  <li><strong className="text-white">{c.s4st6l2s}</strong>{c.s4st6l2t}</li>
                  <li><strong className="text-white">{c.s4st6l3s}</strong>{c.s4st6l3t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6m1}</li>
                  <li>{c.s4st6m2}</li>
                  <li>{c.s4st6m3}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p3s}</strong>{c.s4st6p3t}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st6p4s}</strong>{c.s4st6p4t}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st6n1}</li>
                  <li>{c.s4st6n2}</li>
                  <li>{c.s4st6n3}</li>
                  <li>{c.s4st6n4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st6p5}
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
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st1p1}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s5st2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s5st2l1}</li>
                  <li>{c.s5st2l2}</li>
                  <li>{c.s5st2l3}</li>
                  <li>{c.s5st2l4}</li>
                  <li>{c.s5st2l5}</li>
                  <li>{c.s5st2l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5st2p2}
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
                  <strong className="text-white">{c.s6st1lead}</strong>
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
                  <li>{c.s6st1l9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st1lead2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st1n1}</li>
                  <li>{c.s6st1n2}</li>
                  <li>{c.s6st1n3}</li>
                  <li>{c.s6st1n4}</li>
                  <li>{c.s6st1n5}</li>
                  <li>{c.s6st1n6}</li>
                  <li>{c.s6st1n7}</li>
                  <li>{c.s6st1n8}</li>
                  <li>{c.s6st1n9}</li>
                  <li>{c.s6st1n10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st1verds}</strong>{c.s6st1verdt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st2lead}</strong>
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st2lead2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st2n1}</li>
                  <li>{c.s6st2n2}</li>
                  <li>{c.s6st2n3}</li>
                  <li>{c.s6st2n4}</li>
                  <li>{c.s6st2n5}</li>
                  <li>{c.s6st2n6}</li>
                  <li>{c.s6st2n7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st2verds}</strong>{c.s6st2verdt}
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
                  <strong className="text-white">{c.s6st3verds}</strong>{c.s6st3verdt}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6st4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s6st4p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st4lead}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st4l1}</li>
                  <li>{c.s6st4l2}</li>
                  <li>{c.s6st4l3}</li>
                  <li>{c.s6st4l4}</li>
                  <li>{c.s6st4l5}</li>
                  <li>{c.s6st4l6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6st4lead2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6st4n1}</li>
                  <li>{c.s6st4n2}</li>
                  <li>{c.s6st4n3}</li>
                  <li>{c.s6st4n4}</li>
                  <li>{c.s6st4n5}</li>
                  <li>{c.s6st4n6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6st4verds}</strong>{c.s6st4verdt1}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.s6st4verdlink}</Link>{c.s6st4verdt2}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqh}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/pdf-to-csv')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1alink}</Link>{c.fv1a2}
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
                    {c.fv4a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4alink}</Link>{c.fv4a2}
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
                    {c.fv7a1}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.fv7alink}</Link>{c.fv7a2}
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
                    {c.fv9a1}<Link href={L('/tools/ocr')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9alink}</Link>{c.fv9a2}
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
                    {c.fv12a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv12alink}</Link>{c.fv12a2}
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
                {c.s8p4a}<Link href={L('/tools/pdf-to-csv')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                href={L('/blog/how-to-convert-pdf-to-excel-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relTitle1}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relDesc1}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-merge-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relTitle2}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relDesc2}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relTitle3}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relDesc3}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relTitle4}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relDesc4}
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
import { TRANSLATIONS } from './how-to-convert-pdf-to-csv-online.i18n'
Object.assign(C, TRANSLATIONS)
