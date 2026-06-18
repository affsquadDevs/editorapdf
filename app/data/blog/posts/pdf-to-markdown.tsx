import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'pdf-to-markdown'
const postPath = `/blog/${slug}`
const heroImage = '/blog/PDF to Markdown Converter_ Complete Guide to Transforming PDF Documents into Markdown Format.png'
const ogImage = '/images/blog/pdf-to-markdown-hero.png'
const datePublished = '2026-02-22'
const dateModified = '2026-02-22'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'PDF to Markdown Converter: Complete Guide to Transforming PDF Documents into Markdown Format',
    metaDesc: 'Learn how to convert PDF documents into Markdown format for developers, writers, and content creators. Extract structured text, headings, and content cleanly.',
    ogTitle: 'PDF to Markdown Converter: Complete Guide to Transforming PDF Documents into Markdown Format',
    ogDesc: 'Learn how to convert PDF documents into Markdown format for developers, writers, and content creators. Extract structured text, headings, and content cleanly.',
    ogImageAlt: 'Illustration showing a PDF document being converted into Markdown format with headings and code blocks',
    twTitle: 'PDF to Markdown Converter: Complete Guide to Transforming PDF Documents into Markdown Format',
    twDesc: 'Learn how to convert PDF documents into Markdown format for developers, writers, and content creators. Extract structured text, headings, and content cleanly.',
    heroAlt: 'PDF to Markdown Converter - Convert PDF files to Markdown format online',

    bcLeaf: 'PDF to Markdown Converter',
    heroTitle: 'PDF to Markdown Converter: Complete Guide to Transforming PDF Documents into Markdown Format',
    heroSubtitle: 'Learn how to convert PDF documents into Markdown format using free online tools. Perfect for documentation, blogs, and version control.',

    artHeadline: 'PDF to Markdown Converter - Complete Guide to Converting PDF Documents to Markdown Format',
    artDesc: 'Complete guide on how to convert PDF to Markdown online. Learn to transform PDF documents into Markdown format using free online tools. Step-by-step instructions, tips, and best practices for PDF to Markdown conversion.',

    intro1: "You've got a PDF document—maybe it's a technical manual, a research paper, or a formatted report. You need it in Markdown format for your documentation site, blog, or version control system. The problem? PDFs are notoriously difficult to convert while preserving structure and formatting. Copy-pasting doesn't work well, and manual conversion is tedious and error-prone.",
    intro2: "The good news? You don't need complex scripts or expensive software. Modern online PDF to Markdown converters make transforming PDF documents into clean, editable Markdown as straightforward as uploading a file and clicking convert. This comprehensive guide will walk you through everything you need to know about converting PDFs to Markdown, from understanding why Markdown matters to handling edge cases and ensuring your documents convert accurately.",

    s1h: 'The Problem: Why Converting PDFs to Markdown Is Challenging',
    s1p1: "PDFs are designed to preserve visual formatting perfectly, which makes them great for sharing final documents but terrible for extracting editable content. Unlike Word documents or HTML files, PDFs store content in a way that prioritizes appearance over structure. This creates several challenges when trying to convert them to Markdown:",
    s1l1a: 'Structure detection complexity:',
    s1l1b: " PDFs don't explicitly mark headings, lists, or emphasis—the tool must infer structure from font sizes, styles, and positioning",
    s1l2a: 'Formatting preservation:',
    s1l2b: ' Converting visual formatting (bold, italic, headings) to Markdown syntax requires intelligent text analysis',
    s1l3a: 'Layout interpretation:',
    s1l3b: ' PDFs use absolute positioning, making it difficult to determine document flow and hierarchy',
    s1l4a: 'Text extraction accuracy:',
    s1l4b: ' Poorly structured PDFs or scanned documents may have text extraction issues',
    s1l5a: 'Complex layouts:',
    s1l5b: ' Multi-column layouts, tables, and images require sophisticated processing to convert correctly',
    s1l6a: 'Manual conversion inefficiency:',
    s1l6b: ' Copy-pasting from PDFs loses formatting and structure, requiring extensive manual cleanup',
    s1p2: 'These challenges are exactly why specialized PDF to Markdown conversion tools exist. They handle the complexity of structure detection, formatting preservation, and text extraction automatically, giving you clean Markdown output without hours of manual work.',

    s2h: 'Why This Problem Matters More Than You Think',
    s2p1: "You might think converting PDFs to Markdown is a niche need, but it's actually something thousands of professionals and content creators face regularly. Consider these real-world scenarios:",
    s2l1a: 'Technical writers',
    s2l1b: ' converting PDF documentation into Markdown for GitHub, GitLab, or documentation platforms like Docusaurus or MkDocs',
    s2l2a: 'Bloggers and content creators',
    s2l2b: ' converting PDF articles or reports into Markdown for Jekyll, Hugo, or other static site generators',
    s2l3a: 'Developers',
    s2l3b: ' extracting code documentation from PDFs into Markdown README files',
    s2l4a: 'Researchers and academics',
    s2l4b: ' converting research papers into Markdown for easier editing and collaboration',
    s2l5a: 'Project managers',
    s2l5b: ' converting PDF reports and specifications into Markdown for version-controlled project documentation',
    s2l6a: 'Content teams',
    s2l6b: ' migrating PDF content into content management systems that use Markdown',
    s2l7a: 'Open source contributors',
    s2l7b: ' converting PDF guides into Markdown for community documentation',
    s2l8a: 'Students and educators',
    s2l8b: ' converting PDF course materials into editable Markdown notes',
    s2p2: "The time wasted on manual conversion adds up quickly. What takes minutes with the right tool can take hours when you're manually reformatting, fixing structure, and cleaning up text. More importantly, manual conversion often leads to:",
    s2m1: 'Lost formatting and structure during copy-paste operations',
    s2m2: 'Inconsistent heading levels and emphasis markers',
    s2m3: 'Broken lists and code blocks',
    s2m4: 'Time-consuming manual cleanup and proofreading',
    s2m5: 'Errors that require multiple revision cycles',
    s2m6: 'Frustration and decreased productivity',
    s2p3: "That's why understanding how to convert PDFs to Markdown properly isn't just about convenience—it's about working efficiently in a world where Markdown has become the standard format for documentation, blogging, and version-controlled content.",

    s3h: 'The Solution: Modern Online PDF to Markdown Converters',
    s3p1: 'The solution to PDF to Markdown conversion headaches is simpler than you might expect. Modern web-based PDF to Markdown converters handle all the technical complexity behind the scenes, giving you a clean interface to transform documents in minutes.',
    s3p2: 'What makes these tools effective? They leverage advanced PDF parsing and text analysis technology that works entirely in your web browser. This means:',
    s3l1a: 'No installation required:',
    s3l1b: ' Works on any device with a modern browser',
    s3l2a: 'Privacy-first processing:',
    s3l2b: ' Files stay on your device, never uploaded to servers',
    s3l3a: 'Intelligent structure detection:',
    s3l3b: ' Automatically identifies headings, lists, emphasis, and document hierarchy',
    s3l4a: 'Formatting preservation:',
    s3l4b: ' Converts visual formatting (bold, italic, headings) to proper Markdown syntax',
    s3l5a: 'Instant results:',
    s3l5b: ' Convert PDFs to Markdown in seconds, not minutes',
    s3l6a: 'Free to use:',
    s3l6b: ' No subscriptions or hidden fees',
    s3l7a: 'Cross-platform compatibility:',
    s3l7b: ' Works on Windows, Mac, Linux, and mobile devices',
    s3l8a: 'Page selection:',
    s3l8b: ' Convert specific pages or page ranges, not just entire documents',
    s3p3: "The best part? You don't need to understand how PDF parsing or Markdown generation works technically. The tool handles text extraction, structure analysis, and Markdown formatting automatically. You just need to know how to use the interface—which is exactly what we'll cover next.",
    s3p4a: 'Our ',
    s3p4link: 'PDF to Markdown converter tool',
    s3p4b: " is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need without the complexity you don't.",

    s4h: 'Step-by-Step Guide: How to Convert PDF to Markdown Using Our Tool',
    s4p1: "Ready to convert your PDF to Markdown? Follow these steps to transform PDF documents into clean, editable Markdown format quickly and easily. We'll walk through the entire process from upload to download.",

    s4s1h: 'Step 1: Access the PDF to Markdown Converter',
    s4s1p1a: 'Navigate to our ',
    s4s1p1link: 'PDF to Markdown converter page',
    s4s1p1b: ". You'll see a clean interface with a file upload area. No account creation or login required—you can start converting immediately.",
    s4s1p2: 'The interface is designed to be intuitive, with clear instructions and visual feedback throughout the conversion process.',

    s4s2h: 'Step 2: Upload Your PDF File',
    s4s2p1: 'Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:',
    s4s2l1: 'Drag and drop functionality for quick file upload',
    s4s2l2: 'Files up to 25 MB (for optimal performance)',
    s4s2l3: 'Any PDF file, regardless of page count',
    s4s2l4a: 'Text-based PDFs (scanned PDFs may require OCR preprocessing using our ',
    s4s2l4link: 'OCR tool',
    s4s2l4b: ')',
    s4s2l5a: "Password-protected PDFs (you'll need to unlock them first using our ",
    s4s2l5link: 'PDF editing tool',
    s4s2l5b: ')',
    s4s2p2: "Once uploaded, you'll see a preview of your PDF showing the total page count. This helps you plan which pages to convert if you don't need the entire document.",

    s4s3h: 'Step 3: Configure Conversion Options (Optional)',
    s4s3p1: 'Before converting, you can configure several options to customize the output:',
    s4s3h1: 'Page Selection',
    s4s3h1p1: 'Choose which pages to convert:',
    s4s3h1l1a: 'All pages:',
    s4s3h1l1b: ' Convert the entire document (default)',
    s4s3h1l2a: 'Page range:',
    s4s3h1l2b: ' Specify a range like "1-10" or "5-15"',
    s4s3h1l3a: 'Specific pages:',
    s4s3h1l3b: ' Enter individual pages like "1,3,5" or "1-5,10,15-20"',
    s4s3h1p2a: 'Best for:',
    s4s3h1p2b: ' When you only need specific sections, want to test conversion quality on a few pages first, or need to convert large documents in batches.',
    s4s3h2: 'Formatting Options',
    s4s3h2p1: 'Most tools offer options to control how formatting is preserved:',
    s4s3h2l1a: 'Preserve formatting:',
    s4s3h2l1b: ' Attempts to maintain headings, lists, and emphasis (recommended)',
    s4s3h2l2a: 'Detect headings:',
    s4s3h2l2b: ' Automatically identifies heading levels based on font size and style',
    s4s3h2l3a: 'Plain text mode:',
    s4s3h2l3b: ' Converts to plain text without Markdown formatting (rarely needed)',
    s4s3h2p2a: 'Pro tip:',
    s4s3h2p2b: ' Enable "Preserve formatting" and "Detect headings" for best results. The tool will automatically convert bold text to **bold**, italic to *italic*, and detect heading levels.',

    s4s4h: 'Step 4: Preview Extracted Content (If Available)',
    s4s4p1: 'Some tools provide a preview of the extracted text before conversion. This lets you:',
    s4s4l1: 'Verify that text extraction is working correctly',
    s4s4l2: 'Check if structure detection looks accurate',
    s4s4l3: 'Identify any potential issues before conversion',
    s4s4l4: 'Make adjustments to conversion settings if needed',
    s4s4p2: 'If your PDF has complex layouts or unusual formatting, previewing helps catch issues early. For straightforward documents, you can usually skip this step.',

    s4s5h: 'Step 5: Click Convert and Wait for Processing',
    s4s5p1: 'Once your settings are configured, click the "Convert to Markdown" or "Generate Markdown" button. The tool will:',
    s4s5o1: 'Extract text content from your PDF',
    s4s5o2: 'Analyze document structure (headings, lists, paragraphs)',
    s4s5o3: 'Detect formatting (bold, italic, emphasis)',
    s4s5o4: 'Convert structure and formatting to Markdown syntax',
    s4s5o5: 'Generate your Markdown file',
    s4s5p2: 'Processing time depends on:',
    s4s5l1: 'Total page count of your PDF',
    s4s5l2: 'Document complexity (number of headings, lists, formatting)',
    s4s5l3: 'File size',
    s4s5l4: "Your device's processing power",
    s4s5p3: "For typical conversions (10-50 pages), this usually takes just a few seconds. Larger documents (100+ pages) might take 30-60 seconds. You'll see a progress indicator during processing.",

    s4s6h: 'Step 6: Review Your Markdown Output',
    s4s6p1: "When processing completes, you'll see your converted Markdown. Most tools provide:",
    s4s6l1: 'A preview of the Markdown content',
    s4s6l2: 'Rendered preview showing how it will look',
    s4s6l3: 'Option to edit the Markdown before downloading',
    s4s6l4: 'Download button to save the .md file',
    s4s6p2: 'Take a moment to review the output:',
    s4s6m1: 'Check that headings are properly formatted (using #, ##, ###)',
    s4s6m2: 'Verify lists are correctly converted (using - or *)',
    s4s6m3: 'Ensure emphasis (bold, italic) is preserved',
    s4s6m4: 'Look for any formatting issues that need manual cleanup',
    s4s6p3: 'Most conversions are accurate, but complex layouts or unusual formatting may require minor adjustments. The preview helps you catch these before downloading.',

    s4s7h: 'Step 7: Download Your Markdown File',
    s4s7p1: 'When you\'re satisfied with the conversion, click the download button to save your Markdown file. The file will typically be named something like "document.md" or "converted.md" by default, but you can rename it to something more descriptive.',
    s4s7p2a: 'Important:',
    s4s7p2b: ' Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your Markdown file before closing the page.',
    s4s7p3: 'Your Markdown file is now ready to use! You can:',
    s4s7l1: 'Edit it in any text editor (VS Code, Notepad++, Sublime Text, etc.)',
    s4s7l2: 'Add it to your Git repository for version control',
    s4s7l3: 'Use it in documentation platforms (GitHub, GitLab, documentation sites)',
    s4s7l4: 'Convert it to other formats (HTML, PDF) using Markdown processors',
    s4s7l5: 'Publish it to your blog or content management system',
    s4s7p4: "That's it! You've successfully converted your PDF to Markdown. The entire process typically takes less than two minutes from start to finish.",

    s5h: 'Benefits of Using Online PDF to Markdown Converters',
    s5p1: 'Why choose an online PDF to Markdown converter over manual methods or desktop software? Here are the key advantages:',
    s5s1h: '1. Zero Installation Required',
    s5s1p1: "The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start converting. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to convert PDFs on the go. No Python scripts, no command-line tools, no complex setup—just a web page.",
    s5s2h: '2. Privacy and Security',
    s5s2p1: 'When you use a privacy-first PDF to Markdown converter that processes files locally in your browser, your documents never leave your device. This is crucial when working with:',
    s5s2l1: 'Confidential business documents',
    s5s2l2: 'Proprietary technical documentation',
    s5s2l3: 'Personal or sensitive content',
    s5s2l4: "Any documents you don't want uploaded to external servers",
    s5s2p2: 'Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it. This is particularly important for organizations with strict data privacy requirements.',
    s5s3h: '3. Intelligent Structure Detection',
    s5s3p1: "Quality PDF to Markdown converters don't just extract text—they analyze document structure and convert it intelligently. They automatically detect headings (and their levels), lists, emphasis, code blocks, and other formatting. This saves hours of manual formatting work compared to copy-pasting and manually adding Markdown syntax.",
    s5s4h: '4. Cost-Effective Solution',
    s5s4p1: 'Most online PDF to Markdown converters are completely free. Desktop PDF conversion software can cost $50-200, and subscription services charge monthly fees. For occasional or regular PDF to Markdown conversion, free online tools provide excellent value without any financial commitment.',
    s5s5h: '5. Cross-Platform Compatibility',
    s5s5p1: "Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF to Markdown converters work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely—if you have a browser, you can convert PDFs to Markdown.",
    s5s6h: '6. Always Up-to-Date',
    s5s6p1: 'Online tools are automatically updated by their developers. You always get the latest features, improved conversion accuracy, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility. The tool you use today is better than the one from last month.',
    s5s7h: '7. Speed and Efficiency',
    s5s7p1: 'Modern browser-based PDF processing is surprisingly fast. You can convert PDFs to Markdown in seconds, compared to:',
    s5s7l1: 'Manual copy-paste methods (which lose formatting and require extensive cleanup)',
    s5s7l2: 'Command-line tools (which require setup and technical knowledge)',
    s5s7l3: 'Desktop software that requires launching and navigating complex interfaces',
    s5s7l4: 'Writing custom conversion scripts (which takes hours or days)',
    s5s7p2: 'The streamlined interface of online tools means less time clicking through menus and more time getting work done.',
    s5s8h: '8. Flexible Page Selection',
    s5s8p1: 'Unlike some desktop tools that force you to convert entire documents, online converters often let you select specific pages or page ranges. This is perfect when you only need certain sections, want to test conversion quality first, or need to process large documents in manageable chunks.',
    s5s9h: '9. Immediate Usability',
    s5s9p1: "The converted Markdown is ready to use immediately. You can edit it in any text editor, add it to version control, publish it to documentation sites, or convert it to other formats. There's no intermediate format or additional processing required—the output is standard Markdown that works everywhere.",

    s6h: 'Comparison: Online PDF to Markdown Converters vs. Other Tools',
    s6p1: "How do online PDF to Markdown converters stack up against alternatives? Let's break down the comparison:",
    s6s1h: 'Online Converters vs. Desktop Software',
    s6s1p1: 'Desktop Software (Pandoc, Adobe Acrobat with plugins, etc.):',
    s6s1l1: '✅ More advanced conversion options and customization',
    s6s1l2: '✅ Works offline',
    s6s1l3: '✅ Better for batch processing large numbers of files',
    s6s1l4: '✅ Can handle very large files (500+ pages)',
    s6s1l5: '❌ Requires installation and updates',
    s6s1l6: '❌ Often expensive or requires technical setup (Pandoc)',
    s6s1l7: '❌ Platform-specific (Windows or Mac, rarely both)',
    s6s1l8: '❌ Steeper learning curve for command-line tools',
    s6s1l9: '❌ Takes up disk space',
    s6s1p2: 'Online PDF to Markdown Converters:',
    s6s1m1: '✅ Free to use',
    s6s1m2: '✅ No installation required',
    s6s1m3: '✅ Works on any platform',
    s6s1m4: '✅ Always up-to-date',
    s6s1m5: '✅ Privacy-first (client-side processing)',
    s6s1m6: '✅ User-friendly interface',
    s6s1m7: '✅ Intelligent structure detection',
    s6s1m8: '❌ Requires internet connection (for initial page load)',
    s6s1m9: '❌ May struggle with extremely large files (500+ pages)',
    s6s1m10: '❌ Fewer advanced customization options',
    s6s1p3a: 'Verdict:',
    s6s1p3b: ' For most users, online converters win on convenience, cost, and accessibility. Desktop software is better if you need advanced customization, work with very large files regularly, or require offline processing capabilities.',
    s6s2h: 'Online Converters vs. Cloud-Based Services',
    s6s2p1: 'Cloud-Based Services (Zapier, API services, etc.):',
    s6s2l1: '✅ Can integrate with workflows and automation',
    s6s2l2: '✅ Can process files from cloud storage directly',
    s6s2l3: '✅ Often support batch processing',
    s6s2l4: '❌ Files uploaded to servers (privacy concern)',
    s6s2l5: '❌ Requires account creation and API keys',
    s6s2l6: '❌ Usually paid services or have usage limits',
    s6s2l7: '❌ Files may be retained on servers',
    s6s2l8: '❌ Slower processing (upload/download time)',
    s6s2l9: '❌ More complex setup and configuration',
    s6s2p2: 'Client-Side Online Converters:',
    s6s2m1: '✅ No file uploads (privacy-first)',
    s6s2m2: '✅ No account required',
    s6s2m3: '✅ Faster processing (no upload/download)',
    s6s2m4: '✅ No storage limits',
    s6s2m5: '✅ Files never leave your device',
    s6s2m6: '✅ Free to use',
    s6s2m7: '✅ Simple, straightforward interface',
    s6s2m8: "❌ Can't access files from cloud storage directly",
    s6s2m9: '❌ No workflow automation',
    s6s2p3a: 'Verdict:',
    s6s2p3b: ' For privacy-conscious users and one-off conversions, client-side online converters are superior. Cloud services are better if you need automation, batch processing, or integration with other tools and don\'t mind the privacy trade-off.',
    s6s3h: 'Online Converters vs. Manual Methods',
    s6s3p1: 'Some people try to convert PDFs to Markdown manually using methods like:',
    s6s3l1: 'Copy-pasting text and manually adding Markdown syntax (extremely time-consuming, error-prone)',
    s6s3l2: 'Using PDF to text converters then manually formatting (loses structure, requires extensive cleanup)',
    s6s3l3: 'Writing custom Python scripts (requires programming knowledge, time investment)',
    s6s3l4: 'Using command-line tools like Pandoc (requires technical setup and learning curve)',
    s6s3p2a: 'Verdict:',
    s6s3p2b: ' Online PDF to Markdown converters are faster, more accurate, and require zero technical knowledge compared to manual methods. They produce better results with proper structure detection and formatting preservation. There\'s no reason to use workarounds when proper tools are available for free.',

    faqSecH: 'Frequently Asked Questions About PDF to Markdown Conversion',

    s8h: 'Conclusion: Making PDF to Markdown Conversion Simple',
    s8p1: "Converting PDF documents to Markdown doesn't have to be complicated. With modern online PDF to Markdown converters, transforming documents into clean, editable Markdown format is straightforward, fast, and secure. Whether you're a technical writer migrating documentation, a blogger converting articles, a developer extracting code docs, or anyone who needs Markdown versions of PDF content, the right tool makes all the difference.",
    s8p2: 'The key advantages of online PDF to Markdown converters—no installation, privacy-first processing, free access, intelligent structure detection, and cross-platform compatibility—make them the ideal solution for most conversion needs. While desktop software has its place for advanced customization and batch processing, simple conversions are perfectly handled by browser-based tools.',
    s8p3: 'Remember these best practices:',
    s8l1: 'Use well-structured PDFs with clear headings and formatting for best results',
    s8l2: 'Preview the converted Markdown before downloading to catch any issues',
    s8l3: 'Keep files under 25 MB for optimal performance',
    s8l4: 'Use privacy-first tools that process files locally',
    s8l5: 'Select specific pages when you only need certain sections',
    s8l6: 'Be prepared to do minor manual cleanup for complex layouts',
    s8l7: 'Test conversion on a few pages first if working with large documents',
    s8p4a: 'Ready to convert your PDFs to Markdown? Try our ',
    s8p4link1: 'free PDF to Markdown converter tool',
    s8p4b: ' and experience how simple transforming documents can be. And if you need to make edits to your PDFs before converting, check out our ',
    s8p4link2: 'PDF editing tool',
    s8p4c: ' for adding text, images, and annotations. For scanned PDFs, use our ',
    s8p4link3: 'OCR tool',
    s8p4d: ' first to make them text-searchable. If you need to extract just the text without Markdown formatting, our ',
    s8p4link4: 'PDF to text converter',
    s8p4e: ' is perfect for that. And for large files, our ',
    s8p4link5: 'PDF compression tool',
    s8p4f: ' can help reduce file sizes before conversion.',
    s8p5: "PDF to Markdown conversion doesn't have to be a chore. With the right tools and approach, you can transform documents quickly and confidently, leaving more time for the content creation and documentation work that actually matters.",

    // Related Articles
    relCard1Title: 'PDF to Text Converter',
    relCard1Desc: 'Learn how to extract plain text from PDF files online using free conversion tools.',
    relCard2Title: 'How to Convert PDF to Word Online',
    relCard2Desc: 'Complete guide to converting PDF documents to Word format for easy editing.',
    relCard3Title: 'How to Convert PDF to HTML Online',
    relCard3Desc: 'Transform PDF documents into HTML format for web publishing and editing.',
    relCard4Title: 'How to Edit a PDF Online',
    relCard4Desc: 'Complete guide to editing PDF files online without installing software.',

    // Visible FAQ (14)
    fv1q: 'How do I convert PDF to Markdown online for free?',
    fv1a1: 'You can convert PDF to Markdown online for free by using our ',
    fv1aLink: 'PDF to Markdown converter tool',
    fv1a2: '. Simply upload your PDF file, configure conversion options if needed (like page selection), and click convert. The tool will extract text content, analyze document structure, and convert it into Markdown format automatically. You can then preview the Markdown and download it as a .md file. No account creation, payment, or software installation required.',
    fv2q: 'Is it safe to convert PDF to Markdown online?',
    fv2a: 'Yes, when using a privacy-first PDF to Markdown converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.',
    fv3q: 'What is Markdown format and why would I need it?',
    fv3a: "Markdown is a lightweight markup language that uses plain text formatting syntax. It's perfect for documentation, blog posts, README files, and version control systems like Git. Converting PDFs to Markdown makes content editable in any text editor, allows for easy collaboration and version tracking, works seamlessly with documentation platforms (GitHub, GitLab, Docusaurus, MkDocs), and can be converted to HTML, PDF, or other formats easily. Markdown has become the standard format for technical documentation and modern content creation.",
    fv4q: 'Does PDF to Markdown conversion preserve formatting?',
    fv4a: 'Yes, quality PDF to Markdown converters preserve basic formatting like headings (converted to #, ##, ###), lists (converted to - or *), paragraphs, and emphasis like bold (**text**) and italic (*text*). The tool detects document structure and converts it to appropriate Markdown syntax. However, complex layouts, images, tables, and advanced formatting may require manual adjustment. For best results, use PDFs with clear structure and standard formatting.',
    fv5q: 'What is the maximum file size for PDF to Markdown conversion?',
    fv5a1: 'File size limits vary by tool, but most online PDF to Markdown converters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to convert very large PDFs, consider splitting them first using our ',
    fv5aLink: 'PDF splitter tool',
    fv5a2: ' or using desktop software designed for heavy-duty processing.',
    fv6q: 'Can I convert specific pages from a PDF to Markdown?',
    fv6a: "Yes, many PDF to Markdown converters allow you to select specific pages or page ranges for conversion. You can specify page ranges like \"1-10\" or individual pages like \"1,3,5\" or combinations like \"1-5,10,15-20\". This is useful when you only need to convert certain sections of a large document, saving processing time and focusing on the content you need. It's also helpful for testing conversion quality on a few pages before converting the entire document.",
    fv7q: 'Do I need to create an account to convert PDF to Markdown?',
    fv7a: 'No, many free PDF to Markdown converter tools work without requiring account creation or registration. You can upload, convert, and download your Markdown files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving conversion history or accessing premium features, but basic PDF to Markdown conversion is typically available without any registration.',
    fv8q: 'Can I convert scanned PDFs to Markdown?',
    fv8a1: 'Converting scanned PDFs to Markdown requires OCR (Optical Character Recognition) technology because scanned PDFs contain images of text, not actual text. Some PDF to Markdown converters include OCR capabilities, but accuracy depends on scan quality. For best results with scanned documents, use a dedicated ',
    fv8aLink: 'OCR tool',
    fv8a2: ' first to convert the scanned PDF to a text-based PDF, then convert that to Markdown. Alternatively, look for PDF to Markdown converters that explicitly support OCR.',
    fv9q: 'What can I do with Markdown files after conversion?',
    fv9a: 'Markdown files are incredibly versatile. You can edit them in any text editor (VS Code, Notepad++, Sublime Text, Vim, etc.), use them in documentation systems like GitHub, GitLab, or documentation platforms (Docusaurus, MkDocs, Jekyll, Hugo), convert them to HTML, PDF, or other formats using Markdown processors, track changes in version control systems like Git, publish to blogs and content management systems that support Markdown, and collaborate easily since Markdown is plain text and human-readable.',
    fv10q: 'Will the converted Markdown be perfect?',
    fv10a: "The quality of converted Markdown depends on the source PDF's structure and formatting. Well-structured PDFs with clear headings, lists, and standard formatting typically convert very accurately. Complex layouts, multi-column text, tables, and unusual formatting may require manual cleanup. Most conversions are 80-95% accurate and need only minor adjustments. The preview feature in conversion tools helps you identify and fix any issues before downloading.",
    fv11q: 'Can I convert password-protected PDFs to Markdown?',
    fv11a1: 'Most online PDF to Markdown converters cannot process password-protected PDFs because they cannot access the content without the password. You\'ll need to remove password protection first using a ',
    fv11aLink: 'PDF editing tool',
    fv11a2: ' or the software that created the protection, then convert the unlocked file to Markdown. Some desktop PDF software can handle password-protected files if you provide the password.',
    fv12q: 'How accurate is the heading detection?',
    fv12a: "Heading detection accuracy depends on how clearly headings are formatted in the source PDF. PDFs with consistent heading styles (larger fonts, bold text, specific positioning) convert very accurately. The tool analyzes font size, weight, and positioning to determine heading levels. However, if headings aren't clearly distinguished from body text in the PDF, the tool may miss them or assign incorrect levels. You can always manually adjust heading levels in the Markdown after conversion.",
    fv13q: 'Can I convert PDFs to Markdown on mobile devices?',
    fv13a: 'Yes, many online PDF to Markdown converters work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large conversions might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.',

    // Schema FAQ (9)
    fq1q: 'How do I convert PDF to Markdown online for free?',
    fq1a: 'You can convert PDF to Markdown online for free by using our PDF to Markdown converter tool. Simply upload your PDF file, and the tool will extract text content and convert it into Markdown format automatically. You can then preview the Markdown and download it as a .md file. No account creation or software installation required.',
    fq2q: 'Is it safe to convert PDF to Markdown online?',
    fq2a: 'Yes, when using a privacy-first PDF to Markdown converter that processes files locally in your browser, your documents never leave your device. All conversion happens client-side, ensuring your sensitive documents remain secure and private.',
    fq3q: 'What is Markdown format and why would I need it?',
    fq3a: "Markdown is a lightweight markup language that uses plain text formatting syntax. It's perfect for documentation, blog posts, README files, and version control systems like Git. Converting PDFs to Markdown makes content editable in any text editor and allows for easy collaboration and version tracking.",
    fq4q: 'Does PDF to Markdown conversion preserve formatting?',
    fq4a: 'Yes, quality PDF to Markdown converters preserve basic formatting like headings, lists, paragraphs, and emphasis (bold, italic). The tool detects document structure and converts it to appropriate Markdown syntax. However, complex layouts, images, and advanced formatting may require manual adjustment.',
    fq5q: 'What is the maximum file size for PDF to Markdown conversion?',
    fq5a: 'File size limits vary by tool, but most online PDF to Markdown converters support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files may cause browser performance issues.',
    fq6q: 'Can I convert specific pages from a PDF to Markdown?',
    fq6a: 'Yes, many PDF to Markdown converters allow you to select specific pages or page ranges for conversion. This is useful when you only need to convert certain sections of a large document, saving processing time and focusing on the content you need.',
    fq7q: 'Do I need to create an account to convert PDF to Markdown?',
    fq7a: 'No, many free PDF to Markdown converter tools work without requiring account creation or registration. You can upload, convert, and download your Markdown files immediately without signing up.',
    fq8q: 'Can I convert scanned PDFs to Markdown?',
    fq8a: 'Converting scanned PDFs to Markdown requires OCR (Optical Character Recognition) technology. Some PDF to Markdown converters include OCR capabilities, but accuracy depends on scan quality. For best results with scanned documents, use a tool with OCR support or convert scanned PDFs to text first using an OCR tool.',
    fq9q: 'What can I do with Markdown files after conversion?',
    fq9a: 'Markdown files are versatile and can be used in many ways: edit in any text editor, use in documentation systems like GitHub, GitLab, or documentation platforms, convert to HTML, PDF, or other formats, track changes in version control systems, publish to blogs and content management systems, and collaborate easily since Markdown is plain text.',
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
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
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
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s1l1a}</strong>{c.s1l1b}</li>
                <li><strong className="text-white">{c.s1l2a}</strong>{c.s1l2b}</li>
                <li><strong className="text-white">{c.s1l3a}</strong>{c.s1l3b}</li>
                <li><strong className="text-white">{c.s1l4a}</strong>{c.s1l4b}</li>
                <li><strong className="text-white">{c.s1l5a}</strong>{c.s1l5b}</li>
                <li><strong className="text-white">{c.s1l6a}</strong>{c.s1l6b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s1p2}
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
                <li><strong className="text-white">{c.s3l7a}</strong>{c.s3l7b}</li>
                <li><strong className="text-white">{c.s3l8a}</strong>{c.s3l8b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p3}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s3p4a}<Link href={L('/tools/pdf-to-markdown')} className="text-primary-400 hover:text-primary-300 underline">{c.s3p4link}</Link>{c.s3p4b}
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
                  {c.s4s1p1a}<Link href={L('/tools/pdf-to-markdown')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s1p1link}</Link>{c.s4s1p1b}
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
                  <li>{c.s4s2l4a}<Link href={L('/tools/ocr')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s2l4link}</Link>{c.s4s2l4b}</li>
                  <li>{c.s4s2l5a}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s4s2l5link}</Link>{c.s4s2l5b}</li>
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
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3h1}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3h1p1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li><strong className="text-white">{c.s4s3h1l1a}</strong>{c.s4s3h1l1b}</li>
                    <li><strong className="text-white">{c.s4s3h1l2a}</strong>{c.s4s3h1l2b}</li>
                    <li><strong className="text-white">{c.s4s3h1l3a}</strong>{c.s4s3h1l3b}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3h1p2a}</strong>{c.s4s3h1p2b}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{c.s4s3h2}</h4>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s4s3h2p1}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-2 ml-4">
                    <li><strong className="text-white">{c.s4s3h2l1a}</strong>{c.s4s3h2l1b}</li>
                    <li><strong className="text-white">{c.s4s3h2l2a}</strong>{c.s4s3h2l2b}</li>
                    <li><strong className="text-white">{c.s4s3h2l3a}</strong>{c.s4s3h2l3b}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">{c.s4s3h2p2a}</strong>{c.s4s3h2p2b}
                  </p>
                </div>
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
                  <li>{c.s4s5o5}</li>
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
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s6l1}</li>
                  <li>{c.s4s6l2}</li>
                  <li>{c.s4s6l3}</li>
                  <li>{c.s4s6l4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s6p2}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s6m1}</li>
                  <li>{c.s4s6m2}</li>
                  <li>{c.s4s6m3}</li>
                  <li>{c.s4s6m4}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s6p3}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s4s7h}</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s7p1}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  <strong className="text-white">{c.s4s7p2a}</strong>{c.s4s7p2b}
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  {c.s4s7p3}
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>{c.s4s7l1}</li>
                  <li>{c.s4s7l2}</li>
                  <li>{c.s4s7l3}</li>
                  <li>{c.s4s7l4}</li>
                  <li>{c.s4s7l5}</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  {c.s4s7p4}
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

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{c.s5s9h}</h3>
                <p className="text-surface-300 leading-relaxed">
                  {c.s5s9p1}
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
                  <li>{c.s6s1l8}</li>
                  <li>{c.s6s1l9}</li>
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
                  <li>{c.s6s1m9}</li>
                  <li>{c.s6s1m10}</li>
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
                  <li>{c.s6s2m8}</li>
                  <li>{c.s6s2m9}</li>
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
              <h2 className="text-3xl font-bold text-white mb-4">{c.faqSecH}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.fv1q}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.fv1a1}<Link href={L('/tools/pdf-to-markdown')} className="text-primary-400 hover:text-primary-300 underline">{c.fv1aLink}</Link>{c.fv1a2}
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
                    {c.fv5a1}<Link href={L('/tools/split')} className="text-primary-400 hover:text-primary-300 underline">{c.fv5aLink}</Link>{c.fv5a2}
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
                    {c.fv8a1}<Link href={L('/tools/ocr')} className="text-primary-400 hover:text-primary-300 underline">{c.fv8aLink}</Link>{c.fv8a2}
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
                <li>{c.s8l1}</li>
                <li>{c.s8l2}</li>
                <li>{c.s8l3}</li>
                <li>{c.s8l4}</li>
                <li>{c.s8l5}</li>
                <li>{c.s8l6}</li>
                <li>{c.s8l7}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p4a}<Link href={L('/tools/pdf-to-markdown')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>{c.s8p4b}<Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>{c.s8p4c}<Link href={L('/tools/ocr')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link3}</Link>{c.s8p4d}<Link href={L('/tools/pdf-to-text')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link4}</Link>{c.s8p4e}<Link href={L('/tools/compress')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link5}</Link>{c.s8p4f}
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
                href={L('/blog/pdf-to-text')}
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
                href={L('/blog/how-to-convert-pdf-to-word-online')}
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
                href={L('/blog/how-to-convert-pdf-to-html-online')}
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
                href={L('/blog/how-to-edit-a-pdf-online')}
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
import { TRANSLATIONS } from './pdf-to-markdown.i18n'
Object.assign(C, TRANSLATIONS)
