import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-convert-pdf-to-excel-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog/How to Convert PDF to Excel Online_ Complete Guide to PDF to Spreadsheet Conversion.png'
const ogImage = '/images/blog/how-to-convert-pdf-to-excel-online-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Convert PDF to Excel Online (Step-by-Step Guide)',
    metaDesc: 'Convert PDF tables into editable Excel spreadsheets instantly. Extract data accurately and download XLSX files online — no installation required.',
    ogTitle: 'How to Convert PDF to Excel Online (Step-by-Step Guide)',
    ogDesc: 'Convert PDF tables into editable Excel spreadsheets instantly. Extract data accurately and download XLSX files online — no installation required.',
    ogAlt: 'Banner showing PDF document converting into Excel spreadsheet with table extraction',
    twTitle: 'How to Convert PDF to Excel Online (Step-by-Step Guide)',
    twDesc: 'Convert PDF tables into editable Excel spreadsheets instantly. Extract data accurately and download XLSX files online — no installation required.',
    heroAlt: 'How to convert PDF to Excel online - Free PDF to Excel converter tool guide',

    bcLeaf: 'How to Convert PDF to Excel Online',
    heroTitle: 'How to Convert PDF to Excel Online: Complete Guide to PDF to Spreadsheet Conversion',
    heroSubtitle: 'Learn how to extract tables and data from PDF files and convert them into Excel spreadsheets using free online tools. No software installation required.',

    artHeadline: 'How to Convert PDF to Excel Online - Complete Guide to PDF to Spreadsheet Conversion',
    artDesc: 'Complete guide on how to convert PDF files to Excel spreadsheets online. Learn to extract tables and data from PDF documents using free online tools. Step-by-step instructions, tips, and best practices for accurate PDF to Excel conversion.',

    intro1: "You've got a PDF file with financial data, a report with tables, or maybe an invoice that needs to be analyzed in Excel. The problem? PDFs are great for viewing and sharing, but they're terrible for data manipulation. You can't sort columns, calculate totals, or create pivot tables from a PDF. That's where PDF to Excel conversion comes in—and it's become one of the most common document conversion tasks people face today.",
    intro2: "The good news? Converting PDF to Excel doesn't require expensive software or technical expertise anymore. Modern online PDF to Excel converter tools can extract tables, preserve formatting, and transform your static PDF data into editable Excel spreadsheets in minutes. This comprehensive guide will walk you through everything you need to know about PDF to Excel conversion, from understanding why it's necessary to choosing the right tool and ensuring accurate results.",

    s1h: 'The Problem: Why Converting PDF to Excel Is Challenging',
    s1p1: 'PDFs are designed to preserve document formatting perfectly—which is excellent for sharing and printing, but creates significant challenges when you need to work with the data. Unlike native Excel files where data lives in cells that can be sorted, filtered, and calculated, PDF content is essentially "frozen" in place. This fundamental difference makes PDF to Excel conversion more complex than simple file format changes.',
    s1p2: "Here's what makes PDF to Excel conversion particularly challenging:",
    s1l1s: 'Table structure detection:',
    s1l1t: " PDFs don't have native table structures like Excel. Converters must analyze visual layouts to identify rows, columns, and cell boundaries",
    s1l2s: 'Data extraction accuracy:',
    s1l2t: ' Complex tables with merged cells, irregular spacing, or nested structures can confuse conversion algorithms',
    s1l3s: 'Formatting preservation:',
    s1l3t: ' Maintaining number formats, dates, currency symbols, and alignment requires sophisticated parsing',
    s1l4s: 'Scanned document handling:',
    s1l4t: ' PDFs created from scanned images require OCR (Optical Character Recognition) before data extraction can even begin',
    s1l5s: 'Multi-page table continuity:',
    s1l5t: ' Tables spanning multiple pages need intelligent merging to maintain data relationships',
    s1l6s: 'Mixed content handling:',
    s1l6t: ' PDFs containing both text and tables require selective extraction of relevant data',
    s1l7s: 'Security and privacy:',
    s1l7t: " Financial data, invoices, and business reports often contain sensitive information that shouldn't be uploaded to unknown servers",
    s1p3: "These challenges explain why simple copy-paste from PDF to Excel rarely works well. The data might paste, but cell structure, formatting, and calculations are usually lost. That's why dedicated PDF to Excel conversion tools exist—they handle the complex parsing and structure detection that manual methods can't accomplish.",

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think PDF to Excel conversion is a niche need, but it's actually something millions of professionals encounter regularly. Consider these real-world scenarios where converting PDF to Excel becomes essential:",
    s2l1s: 'Accountants and financial analysts',
    s2l1t: ' receiving bank statements, invoices, or financial reports in PDF format that need to be analyzed, sorted, and calculated in Excel',
    s2l2s: 'Business professionals',
    s2l2t: ' extracting sales data, inventory lists, or performance metrics from PDF reports for further analysis',
    s2l3s: 'Data analysts',
    s2l3t: ' converting research data, survey results, or statistical reports from PDF format into spreadsheets for manipulation',
    s2l4s: 'HR departments',
    s2l4t: ' extracting employee information, timesheets, or payroll data from PDF documents into Excel for processing',
    s2l5s: 'Researchers and academics',
    s2l5t: ' converting published data tables, research findings, or experimental results from PDF papers into analyzable spreadsheet format',
    s2l6s: 'Small business owners',
    s2l6t: ' converting invoices, receipts, or expense reports from PDF to Excel for bookkeeping and tax preparation',
    s2l7s: 'Project managers',
    s2l7t: ' extracting project timelines, resource allocations, or budget breakdowns from PDF reports into Excel for tracking and analysis',
    s2l8s: 'Students',
    s2l8t: ' converting assignment data, research tables, or lab results from PDF format into Excel for calculations and visualization',
    s2p2: "The time wasted on manual data entry or struggling with inaccurate conversions adds up quickly. What takes minutes with the right PDF to Excel converter can take hours when you're manually retyping data or fixing formatting issues. More importantly, manual data entry introduces errors that can have serious consequences:",
    s2m1: 'Financial miscalculations from incorrect number entry',
    s2m2: 'Lost productivity from repetitive manual work',
    s2m3: 'Data integrity issues from transcription errors',
    s2m4: 'Privacy risks from uploading sensitive financial documents to untrusted cloud services',
    s2m5: 'Frustration and decreased work quality',
    s2m6: 'Missed deadlines due to time-consuming manual processes',
    s2p3: "That's why understanding how to convert PDF to Excel properly isn't just about convenience—it's about working efficiently, accurately, and securely in a world where PDF documents are the standard format for business communication, but Excel remains the tool of choice for data analysis.",

    s3h: 'The Solution: Modern Online PDF to Excel Converters',
    s3p1: 'The solution to PDF to Excel conversion challenges is simpler than you might expect. Modern web-based PDF to Excel converter tools handle all the technical complexity behind the scenes—table detection, data extraction, formatting preservation, and structure reconstruction—giving you a clean interface to transform PDFs into Excel spreadsheets in minutes.',
    s3p2: 'What makes these tools effective? They leverage advanced browser-based PDF processing technology combined with intelligent table recognition algorithms. This means:',
    s3l1s: 'No installation required:',
    s3l1t: ' Works on any device with a modern browser—Windows, Mac, Linux, or mobile',
    s3l2s: 'Privacy-first processing:',
    s3l2t: ' Files stay on your device, never uploaded to servers, keeping sensitive financial data secure',
    s3l3s: 'Intelligent table detection:',
    s3l3t: ' Automatically identifies table structures, even in complex layouts with merged cells or irregular spacing',
    s3l4s: 'Format preservation:',
    s3l4t: ' Maintains number formats, dates, currency symbols, and cell alignment from the original PDF',
    s3l5s: 'Instant results:',
    s3l5t: ' Convert PDF to Excel in seconds, not minutes or hours',
    s3l6s: 'Free to use:',
    s3l6t: ' No subscriptions, hidden fees, or account requirements',
    s3l7s: 'Cross-platform compatibility:',
    s3l7t: ' Works everywhere, eliminating the need for platform-specific software',
    s3l8s: 'Batch processing:',
    s3l8t: ' Some tools support converting multiple PDFs to Excel simultaneously',
    s3p3: "The best part? You don't need to understand how PDF parsing or table recognition works technically. The tool handles page analysis, structure detection, data extraction, and Excel file generation automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF to Excel converter tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, accurate, and straightforward—everything you need for reliable PDF to spreadsheet conversion without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Convert PDF to Excel Using Our Tool',
    s4p1: "Ready to convert your PDF to Excel? Follow these steps to transform PDF tables and data into editable Excel spreadsheets quickly and accurately. We'll walk through the entire process from file upload to downloading your converted Excel file.",

    s4st1h: 'Step 1: Access the PDF to Excel Converter Tool',
    s4st1p1a: 'Navigate to our ',
    s4st1p1link: 'PDF to Excel converter page',
    s4st1p1b: ". You'll see a clean interface with a file upload area prominently displayed. No account creation or login required—you can start converting immediately. The interface is designed to be intuitive, so even if you've never used a PDF converter before, you'll understand what to do.",

    s4st2h: 'Step 2: Prepare Your PDF File',
    s4st2p1: 'Before uploading, take a moment to ensure your PDF is ready for conversion. This preparation step can significantly improve conversion accuracy:',
    s4st2l1s: 'Check PDF quality:',
    s4st2l1t: " If your PDF contains scanned images, ensure they're clear and readable. Blurry or low-resolution scans will reduce conversion accuracy",
    s4st2l2s: 'Verify table structure:',
    s4st2l2t: ' Well-defined tables with clear borders and consistent spacing convert more accurately than irregular layouts',
    s4st2l3s: 'Review file size:',
    s4st2l3t: ' Keep files under 25 MB for optimal performance. If your PDF is larger, consider using our ',
    s4st2l3link: 'PDF compression tool',
    s4st2l3t2: ' first',
    s4st2l4s: 'Check for password protection:',
    s4st2l4t: ' Password-protected PDFs need to be unlocked first using our ',
    s4st2l4link: 'PDF editing tool',
    s4st2l4t2: ' before conversion',
    s4st2l5s: 'Identify target data:',
    s4st2l5t: ' If your PDF contains both text and tables, identify which sections you want to convert to Excel',
    s4st2p2: 'Taking a few minutes to prepare your PDF can save you significant time later when reviewing and correcting the converted Excel file.',

    s4st3h: 'Step 3: Upload Your PDF File',
    s4st3p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4st3l1: 'Drag and drop functionality for quick file upload',
    s4st3l2: 'Click to browse and select files from your device',
    s4st3l3: 'Files up to 25-50 MB (varies by tool, but 25 MB is optimal for best performance)',
    s4st3l4: 'Any PDF file containing tables or data',
    s4st3l5: 'Multi-page PDFs with tables spanning multiple pages',
    s4st3p2: "Once uploaded, you'll typically see:",
    s4st3m1: 'A preview of your PDF showing page count',
    s4st3m2: 'File name and size information',
    s4st3m3: 'An option to remove and re-upload if you selected the wrong file',
    s4st3m4: 'Progress indicators during upload (for larger files)',
    s4st3p3: 'The upload process happens entirely in your browser, so your file never leaves your device during this step. This is crucial for maintaining privacy and security, especially when working with sensitive financial or business documents.',

    s4st4h: 'Step 4: Configure Conversion Settings (If Available)',
    s4st4p1: 'Some PDF to Excel converters offer configuration options to improve conversion accuracy. These settings might include:',
    s4st4l1s: 'Table detection mode:',
    s4st4l1t: ' Automatic detection vs. manual table selection for PDFs with multiple tables',
    s4st4l2s: 'OCR settings:',
    s4st4l2t: ' For scanned PDFs, you might enable OCR (Optical Character Recognition) to extract text from images',
    s4st4l3s: 'Output format:',
    s4st4l3t: ' Choose between .xlsx (modern Excel format), .xls (older format), or .csv (comma-separated values)',
    s4st4l4s: 'Page range:',
    s4st4l4t: ' Convert specific pages if your PDF contains multiple sections and you only need certain pages',
    s4st4l5s: 'Formatting options:',
    s4st4l5t: ' Preserve original formatting, apply standard Excel formatting, or strip formatting entirely',
    s4st4p2s: 'Pro tip:',
    s4st4p2t: " For most standard PDFs with clear table structures, default settings work well. Only adjust these if you're working with complex layouts or scanned documents. If you're unsure, start with default settings and adjust if needed after reviewing the results.",
    s4st4p3: "Not all tools offer these advanced settings—many use intelligent defaults that work well for most PDFs. If your tool doesn't show configuration options, don't worry—it's likely using optimized defaults automatically.",

    s4st5h: 'Step 5: Initiate the Conversion Process',
    s4st5p1: 'Once your PDF is uploaded and settings are configured (if applicable), click the "Convert to Excel" or "Convert PDF" button. The tool will begin processing your file. Here\'s what happens behind the scenes:',
    s4st5o1s: 'PDF parsing:',
    s4st5o1t: ' The tool analyzes your PDF structure, identifying pages, text layers, and visual elements',
    s4st5o2s: 'Table detection:',
    s4st5o2t: ' Advanced algorithms scan for table structures, identifying rows, columns, and cell boundaries',
    s4st5o3s: 'Data extraction:',
    s4st5o3t: ' Text and numbers are extracted from identified cells, preserving formatting where possible',
    s4st5o4s: 'Structure reconstruction:',
    s4st5o4t: ' The extracted data is organized into Excel rows and columns, maintaining relationships',
    s4st5o5s: 'Excel file generation:',
    s4st5o5t: ' A new Excel file is created with the extracted data, preserving formatting and structure',
    s4st5p2: 'Processing time depends on several factors:',
    s4st5m1: 'Total page count of your PDF',
    s4st5m2: 'Number and complexity of tables',
    s4st5m3: 'File size and image content',
    s4st5m4: 'Whether OCR is required (scanned PDFs take longer)',
    s4st5m5: "Your device's processing power",
    s4st5p3: "For typical conversions (10-20 pages with standard tables), this usually takes 10-30 seconds. Complex PDFs with many tables or scanned documents might take 1-2 minutes. You'll see a progress indicator during processing, so you know the tool is working.",

    s4st6h: 'Step 6: Review the Conversion Preview (If Available)',
    s4st6p1: 'Some advanced PDF to Excel converters show a preview of the converted data before you download. This preview allows you to:',
    s4st6l1: 'Verify that tables were detected correctly',
    s4st6l2: 'Check data accuracy and formatting',
    s4st6l3: 'Identify any issues before downloading',
    s4st6l4: 'Make adjustments if needed (some tools allow editing in the preview)',
    s4st6p2: "If your tool doesn't offer a preview, don't worry—you can always review the Excel file after downloading and convert again with different settings if needed. The preview is a nice-to-have feature, but not essential for successful conversion.",
    s4st6p3s: 'What to look for in the preview:',
    s4st6p3t: ' Check that column headers are in the first row, data is properly aligned in cells, numbers maintain their formats (currency, percentages, dates), and merged cells are handled appropriately. If something looks off, you might need to adjust settings or manually correct it in Excel after download.',

    s4st7h: 'Step 7: Download Your Converted Excel File',
    s4st7p1: 'When processing completes, your Excel file is ready. Click the download button to save it to your device. The file will typically be named something like "converted.xlsx" or based on your original PDF filename. You can rename it to something more descriptive after downloading.',
    s4st7p2s: 'Important:',
    s4st7p2t: " Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your Excel file before closing the page. If you need to convert the same PDF again with different settings, you'll need to upload it again.",
    s4st7p3: 'After downloading, open the Excel file in Microsoft Excel, Google Sheets, or your preferred spreadsheet application to:',
    s4st7l1: 'Verify data accuracy and completeness',
    s4st7l2: 'Make any necessary corrections or adjustments',
    s4st7l3: 'Apply additional formatting if needed',
    s4st7l4: 'Create formulas, pivot tables, or charts based on the data',
    s4st7l5: 'Save the file in your preferred location',
    s4st7p4: "That's it! You've successfully converted your PDF to Excel. The entire process typically takes less than two minutes from start to finish, depending on file complexity.",

    s4st8h: 'Step 8: Verify and Correct the Converted Data',
    s4st8p1: "While modern PDF to Excel converters are quite accurate, it's always wise to verify the converted data, especially for important financial or business documents. Here's a quick verification checklist:",
    s4st8l1s: 'Compare row and column counts:',
    s4st8l1t: ' Ensure all data from the PDF appears in the Excel file',
    s4st8l2s: 'Check number formats:',
    s4st8l2t: ' Verify that currency symbols, decimal places, and percentages are preserved correctly',
    s4st8l3s: 'Verify dates:',
    s4st8l3t: ' Ensure dates are in the correct format and recognized as date values (not text)',
    s4st8l4s: 'Review merged cells:',
    s4st8l4t: ' Check that merged cells from the PDF are handled appropriately in Excel',
    s4st8l5s: 'Test calculations:',
    s4st8l5t: " If the PDF contained totals or calculations, verify they're correct in Excel or recreate formulas as needed",
    s4st8l6s: 'Check for missing data:',
    s4st8l6t: ' Scan for any blank cells that should contain data',
    s4st8p2: 'Most conversion issues are minor and can be quickly corrected in Excel. Common fixes include adjusting column widths, reformatting numbers, or splitting merged cells. For complex PDFs, you might need to do some manual cleanup, but this is still far faster than retyping everything from scratch.',

    s5h: 'Benefits of Using Online PDF to Excel Converters',
    s5p1: 'Why choose an online PDF to Excel converter over desktop software, manual data entry, or other methods? Here are the key advantages that make online converters the preferred choice for most users:',

    s5b1h: '1. Zero Installation Required',
    s5b1p: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start converting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to convert PDFs on the go. You can access the tool from any device, anywhere, without worrying about software compatibility or installation issues.",

    s5b2h: '2. Privacy and Security for Sensitive Data',
    s5b2p1: 'When you use a privacy-first PDF to Excel converter that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5b2l1: 'Financial statements and bank records',
    s5b2l2: 'Business invoices and accounting data',
    s5b2l3: 'Personal tax documents',
    s5b2l4: 'Confidential business reports',
    s5b2l5: 'Medical records with sensitive information',
    s5b2l6: 'Legal documents',
    s5b2l7: 'Any data subject to privacy regulations',
    s5b2p2: 'Unlike cloud-based tools that upload your files to servers (where they might be stored, analyzed, or accessed by third parties), client-side processing keeps everything on your machine where you control it. This privacy-first approach is essential for professionals handling sensitive financial or business data.',

    s5b3h: '3. Cost-Effective Solution',
    s5b3p: 'Most online PDF to Excel converters are completely free. Even premium desktop PDF software with conversion features can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF to Excel conversion, free online tools provide excellent value without any financial commitment. This makes them accessible to students, small businesses, and individuals who need conversion capabilities without the expense of professional software.',

    s5b4h: '4. Intelligent Table Detection and Data Extraction',
    s5b4p: "Modern online converters use advanced algorithms to automatically detect table structures, even in complex layouts. They can identify rows, columns, merged cells, and data relationships that would be difficult to extract manually. This intelligent detection means you don't need to manually select table areas or configure complex settings—the tool figures it out automatically, saving time and improving accuracy.",

    s5b5h: '5. Cross-Platform Compatibility',
    s5b5p: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF to Excel converters work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely—if you can access a web browser, you can convert PDFs to Excel. This is particularly valuable for teams using different operating systems or individuals who switch between devices.",

    s5b6h: '6. Always Up-to-Date Technology',
    s5b6p: 'Online tools are automatically updated by their developers. You always get the latest improvements in table detection algorithms, OCR capabilities, formatting preservation, and accuracy enhancements without manually downloading updates or worrying about version compatibility. This means your conversion quality improves over time as the technology advances, without any effort on your part.',

    s5b7h: '7. Speed and Efficiency',
    s5b7p1: 'Modern browser-based PDF processing is surprisingly fast. You can convert PDFs to Excel in seconds, compared to:',
    s5b7l1: 'Manual data entry (extremely time-consuming and error-prone)',
    s5b7l2: 'Copy-paste methods (loses formatting and structure, requires significant cleanup)',
    s5b7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5b7l4: 'Cloud services that require file upload and download time',
    s5b7p2: 'The streamlined interface of online tools means less time clicking through menus and more time working with your data in Excel. For professionals who regularly convert PDFs, these time savings add up significantly over weeks and months.',

    s5b8h: '8. Format Preservation and Accuracy',
    s5b8p: 'Quality online PDF to Excel converters preserve number formats, dates, currency symbols, alignment, and cell relationships. This means less manual cleanup after conversion. While no converter is 100% perfect, modern tools achieve 90-95% accuracy on well-formatted PDFs, which is far superior to manual entry and significantly faster than manual correction of copy-paste results.',

    s5b9h: '9. No Storage or Account Requirements',
    s5b9p: "Since processing happens in your browser, you don't need to worry about cloud storage limits, account quotas, file retention policies, or subscription management. Everything processes locally, and you download the result directly to your device. This eliminates concerns about file storage, data retention, or account management that come with cloud-based services.",

    s6h: 'Comparison: Online PDF to Excel Converters vs. Other Tools',
    s6p1: "How do online PDF to Excel converters stack up against alternatives? Let's break down the comparison to help you understand when each option makes sense:",

    s6c1h: 'Online PDF to Excel Converters vs. Desktop Software',
    s6c1p1: 'Desktop Software (Adobe Acrobat Pro, Nitro PDF, etc.):',
    s6c1l1: '✅ More advanced features (editing, form filling, batch processing)',
    s6c1l2: '✅ Works offline after installation',
    s6c1l3: '✅ Better for very large files (500+ pages) or batch processing many files',
    s6c1l4: '✅ More control over conversion settings and customization',
    s6c1l5: '❌ Requires installation and updates',
    s6c1l6: '❌ Often expensive ($100-300+ or subscription fees)',
    s6c1l7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6c1l8: '❌ Takes up disk space',
    s6c1l9: '❌ Steeper learning curve',
    s6c1p2: 'Online PDF to Excel Converters:',
    s6c1m1: '✅ Free to use',
    s6c1m2: '✅ No installation required',
    s6c1m3: '✅ Works on any platform',
    s6c1m4: '✅ Always up-to-date',
    s6c1m5: '✅ Privacy-first (client-side processing)',
    s6c1m6: '✅ Simple, intuitive interface',
    s6c1m7: '✅ Accessible from any device',
    s6c1m8: '❌ Requires internet connection (for initial page load)',
    s6c1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6c1m10: '❌ Fewer advanced customization options',
    s6c1p3s: 'Verdict:',
    s6c1p3t: ' For most PDF to Excel conversion needs, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just conversion, regularly process very large files, or require advanced batch processing features.',

    s6c2h: 'Online PDF to Excel Converters vs. Cloud-Based Services',
    s6c2p1: 'Cloud-Based Services (Adobe Online, Zamzar, etc.):',
    s6c2l1: '✅ Integrated with cloud storage',
    s6c2l2: '✅ Can access files from anywhere',
    s6c2l3: '✅ Often free with account creation',
    s6c2l4: '✅ May offer batch processing capabilities',
    s6c2l5: '❌ Files uploaded to servers (privacy concern)',
    s6c2l6: '❌ Requires account creation and login',
    s6c2l7: '❌ Storage limits may apply',
    s6c2l8: '❌ Files may be retained on servers',
    s6c2l9: '❌ Slower processing (upload/download time)',
    s6c2l10: '❌ Limited control over data privacy',
    s6c2p2: 'Client-Side Online Converters:',
    s6c2m1: '✅ No file uploads (privacy-first)',
    s6c2m2: '✅ No account required',
    s6c2m3: '✅ Faster processing (no upload/download)',
    s6c2m4: '✅ No storage limits',
    s6c2m5: '✅ Files never leave your device',
    s6c2m6: '✅ Better for sensitive financial or business data',
    s6c2m7: "❌ Can't access files from cloud storage directly",
    s6c2m8: '❌ May have file size limitations',
    s6c2p3s: 'Verdict:',
    s6c2p3t: ' For privacy-conscious users, especially those handling financial or sensitive business data, client-side online converters are superior. Cloud services are better if you need to convert files already stored in cloud storage and don\'t mind the privacy trade-off, or if you require batch processing of many files.',

    s6c3h: 'Online PDF to Excel Converters vs. Manual Methods',
    s6c3p1: 'Some people try to convert PDFs to Excel manually using methods like:',
    s6c3l1: 'Manual data entry (typing data from PDF into Excel cells)',
    s6c3l2: 'Copy-pasting from PDF to Excel (loses formatting, structure, and often creates formatting nightmares)',
    s6c3l3: 'Taking screenshots and using OCR tools (time-consuming, quality loss, requires multiple steps)',
    s6c3l4: 'Printing PDF and using scanning software (extremely inefficient and error-prone)',
    s6c3p2: 'Why manual methods fail:',
    s6c3m1: 'Extremely time-consuming (can take hours for complex tables)',
    s6c3m2: 'High error rate from transcription mistakes',
    s6c3m3: 'Loss of formatting and structure',
    s6c3m4: 'No preservation of number formats, dates, or calculations',
    s6c3m5: 'Frustrating and repetitive work',
    s6c3m6: 'Not scalable for multiple files or regular use',
    s6c3p3s: 'Verdict:',
    s6c3p3t: ' Online PDF to Excel converters are dramatically faster, more accurate, preserve formatting better, and eliminate transcription errors compared to any manual method. There\'s no reason to use manual workarounds when proper conversion tools are available for free. The time savings alone make automated conversion worthwhile, even for occasional use.',

    s6c4h: 'Online PDF to Excel Converters vs. Specialized Data Extraction Tools',
    s6c4p1: 'Specialized Tools (Tabula, PDFTables, etc.):',
    s6c4l1: '✅ Optimized specifically for table extraction',
    s6c4l2: '✅ Advanced table detection algorithms',
    s6c4l3: '✅ Better handling of complex table structures',
    s6c4l4: '✅ May offer API access for automation',
    s6c4l5: '❌ Often require installation or account creation',
    s6c4l6: '❌ May have usage limits or costs',
    s6c4l7: '❌ Steeper learning curve',
    s6c4l8: '❌ Overkill for simple conversion needs',
    s6c4p2: 'General Online PDF to Excel Converters:',
    s6c4m1: '✅ Simple, user-friendly interface',
    s6c4m2: '✅ No installation or account required',
    s6c4m3: '✅ Free to use',
    s6c4m4: '✅ Good enough for most standard PDFs',
    s6c4m5: '✅ Accessible to non-technical users',
    s6c4m6: '❌ May struggle with extremely complex table layouts',
    s6c4m7: '❌ Less customization options',
    s6c4p3s: 'Verdict:',
    s6c4p3t: ' For most users converting standard PDFs with typical table structures, general online converters are sufficient and more accessible. Specialized tools are better if you regularly work with complex table layouts, need API access for automation, or require advanced extraction capabilities.',

    s7h: 'Frequently Asked Questions About PDF to Excel Conversion',

    s8h: 'Conclusion: Making PDF to Excel Conversion Simple and Secure',
    s8p1: "Converting PDF files to Excel spreadsheets doesn't have to be complicated, time-consuming, or risky. With modern online PDF to Excel converter tools, transforming static PDF data into editable, analyzable Excel files is straightforward, fast, and secure. Whether you're an accountant processing financial statements, a business analyst extracting sales data, a student converting research tables, or anyone who regularly works with PDF data that needs Excel functionality, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF to Excel converters—no installation, privacy-first processing, free access, intelligent table detection, and cross-platform compatibility—make them the ideal solution for most conversion needs. While desktop software has its place for advanced PDF editing tasks or batch processing many files, simple PDF to Excel conversion is perfectly handled by browser-based tools that work anywhere, on any device.',
    s8p3: 'Remember these best practices for successful PDF to Excel conversion:',
    s8l1: 'Ensure your PDF has clear, well-defined tables for best accuracy',
    s8l2: 'Keep files under 25 MB for optimal performance',
    s8l3: 'Use privacy-first tools that process files locally in your browser',
    s8l4: 'Always verify converted data, especially for important financial documents',
    s8l5: 'Be prepared to do minor cleanup in Excel for complex PDFs',
    s8l6: 'For scanned PDFs, ensure high image quality for better OCR accuracy',
    s8l7: "Keep backups of original PDFs until you're satisfied with the Excel conversion",
    s8p4a: 'Ready to convert your PDFs to Excel? Try our ',
    s8p4link1: 'free PDF to Excel converter tool',
    s8p4b: ' and experience how simple transforming PDF data into spreadsheets can be. And if you need to make edits to your PDFs before conversion, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For large files that need size reduction, our ',
    s8p4link3: 'PDF compression tool',
    s8p4d: ' can help reduce file sizes before conversion. And if you need to combine multiple PDFs first, our ',
    s8p4link4: 'PDF merger tool',
    s8p4e: ' makes it easy to merge documents before converting to Excel.',
    s8p5: 'PDF to Excel conversion doesn\'t have to be a chore. With the right tools and approach, you can transform static PDF data into dynamic Excel spreadsheets quickly and confidently, unlocking the power of data analysis, calculations, and visualization that Excel provides. This capability saves hours of manual work, reduces errors, and enables deeper insights from your PDF documents.',

    // Related Articles
    relCard1Title: 'How to Merge PDF Files Online',
    relCard1Desc: 'Learn how to combine multiple PDF files into one document using free online tools.',
    relCard2Title: 'How to Split PDF Files Online',
    relCard2Desc: 'Complete guide to dividing large PDF documents into smaller files online.',
    relCard3Title: 'How to Edit a PDF Online',
    relCard3Desc: 'Complete guide to editing PDF files online without installing software.',
    relCard4Title: 'How to Convert PDF to Word Online',
    relCard4Desc: 'Learn how to convert PDF documents to editable Word files using online tools.',

    // Visible FAQ (14) — inline links rendered in JSX
    fv1q: 'How do I convert PDF to Excel online for free?',
    fv1a1: 'You can convert PDF to Excel online for free by using our ',
    fv1aLink: 'PDF to Excel converter tool',
    fv1a2: '. Simply upload your PDF file containing tables or data, and the tool will automatically detect and extract the information into an Excel spreadsheet format. The conversion happens entirely in your browser, ensuring your files remain private and secure. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to convert PDF to Excel online?',
    fv2a: 'Yes, when using a privacy-first PDF to Excel converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side using JavaScript, ensuring your sensitive financial data, business reports, and personal information remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'Can I convert PDF tables to Excel?',
    fv3a: "Absolutely. Most online PDF to Excel converters can extract tables from PDF files and convert them into Excel spreadsheets. The tool automatically detects table structures, preserves formatting, and maintains data integrity. Complex tables with merged cells or irregular layouts may require manual adjustment after conversion, but standard tables typically convert with 90-95% accuracy. The tool identifies rows, columns, and cell boundaries automatically, so you don't need to manually select table areas.",
    fv4q: 'What is the maximum file size for converting PDF to Excel online?',
    fv4a1: 'File size limits vary by tool, but most online PDF to Excel converters support files up to 25-50 MB. For best performance and accuracy, keep files under 25 MB and limit the total number of pages to under 100. Very large PDFs with complex tables may take longer to process or require desktop software. If your PDF is larger than the limit, consider using our ',
    fv4aLink1: 'PDF compression tool',
    fv4a2: ' first to reduce file size, or split the PDF into smaller sections using our ',
    fv4aLink2: 'PDF splitter tool',
    fv4a3: '.',
    fv5q: 'Do I need to create an account to convert PDF to Excel?',
    fv5a: 'No, many free PDF to Excel converter tools work without requiring account creation or registration. You can upload, convert, and download your Excel files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving conversion history or accessing premium features, but basic PDF to Excel conversion is typically available without any registration.',
    fv6q: 'How accurate is PDF to Excel conversion?',
    fv6a: 'The accuracy of PDF to Excel conversion depends on the quality of the source PDF and the complexity of the data structure. Well-formatted PDFs with clear table structures typically convert with 90-95% accuracy. Scanned PDFs or documents with complex layouts may require manual verification and correction after conversion. Factors affecting accuracy include table structure clarity, font quality, image resolution (for scanned PDFs), and the presence of merged cells or irregular spacing. Most conversion issues are minor and can be quickly corrected in Excel.',
    fv7q: 'Can I convert scanned PDFs to Excel?',
    fv7a: "Converting scanned PDFs to Excel is more challenging because the content is stored as images rather than text. You'll need a tool with OCR (Optical Character Recognition) capabilities to extract text from images first, then convert to Excel. The accuracy depends on image quality and clarity of the scanned document. High-quality scans with clear text typically convert reasonably well, but blurry or low-resolution scans may produce errors. Some online converters include OCR functionality, while others require separate OCR processing before conversion.",
    fv8q: 'What file format will I get after converting PDF to Excel?',
    fv8a: 'Most PDF to Excel converters output files in .xlsx format, which is the standard Excel file format compatible with Microsoft Excel, Google Sheets, and other spreadsheet applications. Some tools may also offer .xls (older Excel format) or .csv (comma-separated values) as alternative output formats. The .xlsx format is recommended as it supports modern Excel features, preserves formatting better, and is compatible with all current spreadsheet software.',
    fv9q: 'Can I convert password-protected PDFs to Excel?',
    fv9a1: "This depends on the tool. Most online PDF to Excel converters cannot process password-protected PDFs because they can't access the content without the password. You'll need to remove password protection first using a ",
    fv9aLink: 'PDF editing tool',
    fv9a2: ' or the software that created the protection, then convert the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password during conversion.',
    fv10q: 'Will converting PDF to Excel preserve formatting?',
    fv10a: 'Quality PDF to Excel converters preserve most formatting, including number formats (currency, percentages, decimals), dates, cell alignment, and basic text formatting. However, complex formatting like custom fonts, colors, or advanced layouts may not transfer perfectly. The tool focuses on preserving data structure and essential formatting that affects data interpretation. You can always apply additional formatting in Excel after conversion if needed.',
    fv11q: 'Can I convert multiple PDFs to Excel at once?',
    fv11a: "This depends on the specific tool. Some online PDF to Excel converters support batch processing, allowing you to upload and convert multiple PDF files simultaneously. Others require converting one file at a time. Batch processing is particularly useful if you regularly convert many PDFs. Check the tool's features to see if batch conversion is supported. For tools that don't support batch processing, you'll need to convert files individually, which is still faster than manual methods.",
    fv12q: "What if my PDF doesn't have clear tables?",
    fv12a1: 'If your PDF contains data but not in clear table format, the conversion may be less accurate. The tool will attempt to extract text and organize it into rows and columns, but you may need to do more manual cleanup in Excel. For PDFs with unstructured data, you might get better results by first using our ',
    fv12aLink: 'PDF editing tool',
    fv12a2: ' to organize the content, or manually selecting and copying specific sections. Some advanced converters allow you to manually define table boundaries if automatic detection fails.',
    fv13q: 'Can I convert PDF to Excel on mobile devices?',
    fv13a: 'Yes, many online PDF to Excel converter tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large conversions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens. While mobile conversion is possible, desktop or laptop computers generally provide better performance and accuracy.',
    fv14q: "What happens if the conversion doesn't work correctly?",
    fv14a1: 'If the conversion doesn\'t produce the expected results, try these troubleshooting steps: (1) Check that your PDF has clear, well-defined tables—blurry or poorly formatted PDFs convert less accurately, (2) Try adjusting conversion settings if available (table detection mode, OCR settings, etc.), (3) For scanned PDFs, ensure image quality is high and text is clear, (4) If the PDF is very large, try splitting it first using our ',
    fv14aLink: 'PDF splitter tool',
    fv14a2: ' and converting sections separately, (5) Some manual cleanup in Excel is normal for complex PDFs—even 90% accuracy saves significant time compared to manual entry.',

    // Schema FAQ (8) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'How do I convert PDF to Excel online for free?',
    fq1a: 'You can convert PDF to Excel online for free by using our PDF to Excel converter tool. Simply upload your PDF file containing tables or data, and the tool will automatically detect and extract the information into an Excel spreadsheet format. The conversion happens entirely in your browser, ensuring your files remain private and secure.',
    fq2q: 'Is it safe to convert PDF to Excel online?',
    fq2a: 'Yes, when using a privacy-first PDF to Excel converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side, ensuring your sensitive financial data, business reports, and personal information remain secure and private.',
    fq3q: 'Can I convert PDF tables to Excel?',
    fq3a: 'Yes, most online PDF to Excel converters can extract tables from PDF files and convert them into Excel spreadsheets. The tool automatically detects table structures, preserves formatting, and maintains data integrity. Complex tables with merged cells or irregular layouts may require manual adjustment after conversion.',
    fq4q: 'What is the maximum file size for converting PDF to Excel online?',
    fq4a: 'File size limits vary by tool, but most online PDF to Excel converters support files up to 25-50 MB. For best performance and accuracy, keep files under 25 MB and limit the total number of pages to under 100. Very large PDFs with complex tables may take longer to process or require desktop software.',
    fq5q: 'Do I need to create an account to convert PDF to Excel?',
    fq5a: 'No, many free PDF to Excel converter tools work without requiring account creation or registration. You can upload, convert, and download your Excel files immediately without signing up. This makes the process faster and more private.',
    fq6q: 'How accurate is PDF to Excel conversion?',
    fq6a: 'The accuracy of PDF to Excel conversion depends on the quality of the source PDF and the complexity of the data structure. Well-formatted PDFs with clear table structures typically convert with 90-95% accuracy. Scanned PDFs or documents with complex layouts may require manual verification and correction after conversion.',
    fq7q: 'Can I convert scanned PDFs to Excel?',
    fq7a: "Converting scanned PDFs to Excel is more challenging because the content is stored as images rather than text. You'll need a tool with OCR (Optical Character Recognition) capabilities to extract text from images first, then convert to Excel. The accuracy depends on image quality and clarity of the scanned document.",
    fq8q: 'What file format will I get after converting PDF to Excel?',
    fq8a: 'Most PDF to Excel converters output files in .xlsx format, which is the standard Excel file format compatible with Microsoft Excel, Google Sheets, and other spreadsheet applications. Some tools may also offer .xls (older Excel format) or .csv (comma-separated values) as alternative output formats.',
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
                <li><strong className="text-white">{c.s3l8s}</strong>{c.s3l8t}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4st1p1a}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st1p1link}</Link>{c.s4st1p1b}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st2p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st2l1s}</strong>{c.s4st2l1t}</li>
                  <li><strong className="text-white">{c.s4st2l2s}</strong>{c.s4st2l2t}</li>
                  <li><strong className="text-white">{c.s4st2l3s}</strong>{c.s4st2l3t}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st2l3link}</Link>{c.s4st2l3t2}</li>
                  <li><strong className="text-white">{c.s4st2l4s}</strong>{c.s4st2l4t}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s4st2l4link}</Link>{c.s4st2l4t2}</li>
                  <li><strong className="text-white">{c.s4st2l5s}</strong>{c.s4st2l5t}</li>
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
                  <li>{c.s4st3l1}</li>
                  <li>{c.s4st3l2}</li>
                  <li>{c.s4st3l3}</li>
                  <li>{c.s4st3l4}</li>
                  <li>{c.s4st3l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st3p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st3m1}</li>
                  <li>{c.s4st3m2}</li>
                  <li>{c.s4st3m3}</li>
                  <li>{c.s4st3m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st3p3}
                </p>
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4st4p2s}</strong>{c.s4st4p2t}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st4p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st5h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st5p1}
                </p>
                <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st5o1s}</strong>{c.s4st5o1t}</li>
                  <li><strong className="text-white">{c.s4st5o2s}</strong>{c.s4st5o2t}</li>
                  <li><strong className="text-white">{c.s4st5o3s}</strong>{c.s4st5o3t}</li>
                  <li><strong className="text-white">{c.s4st5o4s}</strong>{c.s4st5o4t}</li>
                  <li><strong className="text-white">{c.s4st5o5s}</strong>{c.s4st5o5t}</li>
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
                  <li>{c.s4st6l1}</li>
                  <li>{c.s4st6l2}</li>
                  <li>{c.s4st6l3}</li>
                  <li>{c.s4st6l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st6p2}
                </p>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s4st6p3s}</strong>{c.s4st6p3t}
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
                  {c.s4st7p3}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4st7l1}</li>
                  <li>{c.s4st7l2}</li>
                  <li>{c.s4st7l3}</li>
                  <li>{c.s4st7l4}</li>
                  <li>{c.s4st7l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st7p4}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4st8h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4st8p1}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">{c.s4st8l1s}</strong>{c.s4st8l1t}</li>
                  <li><strong className="text-white">{c.s4st8l2s}</strong>{c.s4st8l2t}</li>
                  <li><strong className="text-white">{c.s4st8l3s}</strong>{c.s4st8l3t}</li>
                  <li><strong className="text-white">{c.s4st8l4s}</strong>{c.s4st8l4t}</li>
                  <li><strong className="text-white">{c.s4st8l5s}</strong>{c.s4st8l5t}</li>
                  <li><strong className="text-white">{c.s4st8l6s}</strong>{c.s4st8l6t}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4st8p2}
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
                  <li>{c.s5b2l7}</li>
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
                  <strong className="text-white">{c.s6c1p1}</strong>
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
                  <li>{c.s6c1l9}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c1p2}</strong>
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
                  <li>{c.s6c1m10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c1p3s}</strong>{c.s6c1p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c2h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p1}</strong>
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
                  <li>{c.s6c2l10}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c2p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c2m1}</li>
                  <li>{c.s6c2m2}</li>
                  <li>{c.s6c2m3}</li>
                  <li>{c.s6c2m4}</li>
                  <li>{c.s6c2m5}</li>
                  <li>{c.s6c2m6}</li>
                  <li>{c.s6c2m7}</li>
                  <li>{c.s6c2m8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c2p3s}</strong>{c.s6c2p3t}
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
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c3p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c3m1}</li>
                  <li>{c.s6c3m2}</li>
                  <li>{c.s6c3m3}</li>
                  <li>{c.s6c3m4}</li>
                  <li>{c.s6c3m5}</li>
                  <li>{c.s6c3m6}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c3p3s}</strong>{c.s6c3p3t}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s6c4h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c4p1}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c4l1}</li>
                  <li>{c.s6c4l2}</li>
                  <li>{c.s6c4l3}</li>
                  <li>{c.s6c4l4}</li>
                  <li>{c.s6c4l5}</li>
                  <li>{c.s6c4l6}</li>
                  <li>{c.s6c4l7}</li>
                  <li>{c.s6c4l8}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s6c4p2}</strong>
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s6c4m1}</li>
                  <li>{c.s6c4m2}</li>
                  <li>{c.s6c4m3}</li>
                  <li>{c.s6c4m4}</li>
                  <li>{c.s6c4m5}</li>
                  <li>{c.s6c4m6}</li>
                  <li>{c.s6c4m7}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  <strong className="text-white">{c.s6c4p3s}</strong>{c.s6c4p3t}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1a2}
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
                    {c.fv4a1}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4aLink1}</Link>{c.fv4a2}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv4aLink2}</Link>{c.fv4a3}
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
                    {c.fv9a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv9aLink}</Link>{c.fv9a2}
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
                    {c.fv12a1}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.fv12aLink}</Link>{c.fv12a2}
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
                    {c.fv14a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv14aLink}</Link>{c.fv14a2}
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
                {c.s8p4a}<Link href={L('/tools/pdf-to-excel')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/merge')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}
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
                  {c.relCard1Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relCard1Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-split-pdf-files-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relCard2Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relCard2Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-edit-a-pdf-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relCard3Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relCard3Desc}
                </p>
              </Link>
              <Link
                href={L('/blog/how-to-convert-pdf-to-word-online')}
                className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.relCard4Title}
                </h4>
                <p className="text-surface-400 text-sm">
                  {c.relCard4Desc}
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
import { TRANSLATIONS } from './how-to-convert-pdf-to-excel-online.i18n'
Object.assign(C, TRANSLATIONS)
