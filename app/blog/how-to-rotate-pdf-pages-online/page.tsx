import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'

const siteUrl = 'https://editorapdf.com'
const postUrl = `${siteUrl}/blog/how-to-rotate-pdf-pages-online`

export const metadata: Metadata = {
  title: 'How to Rotate PDF Pages Online - Free PDF Page Rotation Tool Guide | 2026',
  description: 'Learn how to rotate PDF pages online for free. Fix orientation issues, rotate scanned documents, and adjust page angles. Secure, browser-based PDF page rotation tool. Step-by-step guide.',
  openGraph: {
    title: 'How to Rotate PDF Pages Online - Free PDF Page Rotation Tool Guide',
    description: 'Learn how to rotate PDF pages online for free. Fix orientation issues, rotate scanned documents, and adjust page angles. Secure, browser-based PDF page rotation tool.',
    url: postUrl,
    images: [
      {
        url: `${siteUrl}/blog1.png`,
        width: 1200,
        height: 630,
        alt: 'How to rotate PDF pages online - Free PDF page rotation tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Rotate PDF Pages Online - Free PDF Page Rotation Tool Guide',
    description: 'Learn how to rotate PDF pages online for free. Fix orientation issues, rotate scanned documents, and adjust page angles.',
    images: [`${siteUrl}/blog1.png`],
  },
  alternates: {
    canonical: postUrl,
  },
}

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I rotate PDF pages online for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can rotate PDF pages online for free by using our PDF page rotation tool. Simply upload your PDF file, select the pages you want to rotate, choose the rotation angle (90°, 180°, or 270°), and click rotate. The tool rotates your selected pages while preserving all content quality. Processing happens in your browser, so your files never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to rotate PDF pages online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, when using a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. All rotation happens client-side, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing keeps everything on your computer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rotate individual pages in a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most online PDF rotation tools allow you to rotate individual pages or specific page ranges. You can select which pages to rotate and apply different rotation angles to different pages if needed. This is particularly useful when only some pages in your document have orientation issues.',
      },
    },
    {
      '@type': 'Question',
      name: 'What rotation angles are available for PDF pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most PDF rotation tools support standard rotation angles: 90 degrees (quarter turn clockwise), 180 degrees (half turn, upside down), and 270 degrees (three-quarter turn, or 90 degrees counterclockwise). Some tools also support rotating all pages at once or applying different rotations to different pages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will rotating PDF pages reduce file quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, properly rotating PDF pages should not reduce quality. When you rotate pages using a quality tool, it applies the rotation transformation without re-compressing or degrading the content. Text remains searchable, images maintain their resolution, and formatting is preserved. The rotated PDF maintains the same quality as the original.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account to rotate PDF pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, many free PDF rotation tools work without requiring account creation or registration. You can upload, rotate, and download your PDF files immediately without signing up. This makes the process faster and more private.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rotate password-protected PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on the tool. Most online PDF rotation tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a PDF editing tool or the software that created the protection, then rotate the unlocked files.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to the original PDF after rotating pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The original PDF file on your device remains completely unchanged. Rotating pages creates a new file with the rotated pages without modifying the source document. This means you can rotate the same PDF multiple times using different angles without any risk to your original file.',
      },
    },
  ],
}

// Breadcrumbs Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${postUrl}#breadcrumbs`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How to Rotate PDF Pages Online',
      item: postUrl,
    },
  ],
}

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${postUrl}#article`,
  headline: 'How to Rotate PDF Pages Online - Complete Guide to Fixing PDF Orientation',
  description: 'Complete guide on how to rotate PDF pages online. Learn to fix orientation issues, rotate scanned documents, and adjust page angles using free online tools. Step-by-step instructions, tips, and best practices for rotating PDF pages.',
  image: `${siteUrl}/blog1.png`,
  author: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
    },
  },
  datePublished: '2026-02-22',
  dateModified: '2026-02-22',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
}

export default function BlogPost() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumbs */}
        <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <ol className="flex items-center gap-2 text-sm text-surface-400">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-surface-300">How to Rotate PDF Pages Online</li>
            </ol>
          </div>
        </nav>

        {/* Hero Image with Title Overlay */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
          <img
            src="/blog1.png"
            alt="How to rotate PDF pages online - Free PDF page rotation tool guide"
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
                How to Rotate PDF Pages Online: Complete Guide to Fixing PDF Orientation
              </h1>
              <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Learn how to rotate PDF pages to fix orientation issues, adjust scanned documents, and correct page angles. Free, secure, and easy-to-use PDF page rotation tool.
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
                You've just scanned a document, and half the pages are sideways. Or maybe you downloaded a PDF where someone accidentally rotated a few pages during creation. Perhaps you're working with a document that needs to be viewed in landscape instead of portrait. Whatever the situation, rotating PDF pages is one of those tasks that seems simple but can be surprisingly frustrating if you don't know the right approach.
              </p>
              <p className="text-lg text-surface-400">
                The good news? You don't need expensive software or technical expertise. Modern online PDF rotation tools make fixing page orientation as straightforward as selecting pages and choosing a rotation angle. This comprehensive guide will walk you through everything you need to know about rotating PDF pages online, from understanding when rotation is needed to handling edge cases and ensuring your documents stay secure throughout the process.
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">The Problem: Why PDF Pages End Up Rotated</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  PDF pages can end up in the wrong orientation for countless reasons. Unlike Word documents where you can simply change page orientation in settings, PDFs are essentially digital snapshots. Once a page is rotated or scanned incorrectly, that orientation becomes part of the file structure. This makes fixing orientation issues more complex than it should be.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Here are the most common scenarios where you need to rotate PDF pages:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">Scanned documents:</strong> When scanning physical documents, pages often get fed into the scanner at incorrect angles, resulting in sideways or upside-down pages</li>
                  <li><strong className="text-white">Mobile document capture:</strong> Photos taken with smartphones can end up rotated if the device orientation changed during capture</li>
                  <li><strong className="text-white">Conversion errors:</strong> Converting documents from other formats sometimes introduces rotation issues</li>
                  <li><strong className="text-white">Accidental rotation:</strong> Someone might have accidentally rotated pages during PDF creation or editing</li>
                  <li><strong className="text-white">Mixed orientations:</strong> Combining documents with different page orientations can create a PDF where some pages need rotation</li>
                  <li><strong className="text-white">Viewing preferences:</strong> Sometimes you need to rotate pages to match specific viewing or printing requirements</li>
                  <li><strong className="text-white">Legacy documents:</strong> Older scanned documents or archived files often have inconsistent page orientations</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The challenge isn't just identifying which pages need rotation—it's finding a tool that can:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Rotate individual pages without affecting others</li>
                  <li>Preserve document quality during rotation</li>
                  <li>Maintain text searchability and selectability</li>
                  <li>Work quickly without uploading files to unknown servers</li>
                  <li>Support different rotation angles (90°, 180°, 270°)</li>
                  <li>Handle large documents efficiently</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  These requirements are exactly why specialized PDF rotation tools have become essential. They solve the orientation problem while keeping the process simple, secure, and accessible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Why This Problem Matters More Than You Think</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You might think rotating PDF pages is a minor inconvenience, but it's actually something that affects productivity and professionalism in significant ways. Consider these real-world scenarios:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">Business professionals</strong> submitting reports or proposals with incorrectly oriented pages look unprofessional and can delay approval processes</li>
                  <li><strong className="text-white">Legal teams</strong> working with scanned evidence documents need proper orientation for readability and court presentation</li>
                  <li><strong className="text-white">Healthcare workers</strong> digitizing patient records must ensure all pages are correctly oriented for medical review</li>
                  <li><strong className="text-white">Students and researchers</strong> compiling scanned research materials need consistent page orientation for reading and citation</li>
                  <li><strong className="text-white">Real estate professionals</strong> preparing property documents require proper orientation for client presentations and filing</li>
                  <li><strong className="text-white">Accountants</strong> processing scanned invoices and receipts need correct orientation for data entry and archiving</li>
                  <li><strong className="text-white">Archivists and librarians</strong> digitizing historical documents must maintain proper orientation for preservation</li>
                  <li><strong className="text-white">Content creators</strong> working with mixed-orientation source materials need consistent page alignment</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The consequences of not fixing page orientation can be significant:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Reduced readability and professional appearance</li>
                  <li>Time wasted manually rotating pages in PDF viewers</li>
                  <li>Printing errors when pages print in wrong orientation</li>
                  <li>Accessibility issues for screen readers and assistive technologies</li>
                  <li>Frustration when sharing documents with orientation problems</li>
                  <li>Potential delays in document approval or processing workflows</li>
                  <li>Poor user experience when viewing documents on different devices</li>
                </ul>
                <p className="text-surface-300 leading-relaxed">
                  That's why understanding how to rotate PDF pages properly isn't just about convenience—it's about maintaining document quality, professionalism, and efficiency in a world where PDF documents are the standard format for business and academic communication.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">The Solution: Modern Online PDF Page Rotation Tools</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The solution to PDF page rotation headaches is simpler than you might expect. Modern web-based PDF rotation tools handle all the technical complexity behind the scenes, giving you a clean interface to fix page orientation in minutes.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  What makes these tools effective? They leverage browser-based PDF processing technology that works entirely in your web browser. This means:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">No installation required:</strong> Works on any device with a modern browser</li>
                  <li><strong className="text-white">Privacy-first processing:</strong> Files stay on your device, never uploaded to servers</li>
                  <li><strong className="text-white">Instant results:</strong> Rotate pages in seconds, not minutes</li>
                  <li><strong className="text-white">Free to use:</strong> No subscriptions or hidden fees</li>
                  <li><strong className="text-white">Cross-platform compatibility:</strong> Works on Windows, Mac, Linux, and mobile devices</li>
                  <li><strong className="text-white">Selective rotation:</strong> Rotate individual pages or all pages at once</li>
                  <li><strong className="text-white">Multiple rotation angles:</strong> Support for 90°, 180°, and 270° rotations</li>
                  <li><strong className="text-white">Quality preservation:</strong> Maintains text searchability and image quality</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The best part? You don't need to understand how PDF rotation works technically. The tool handles page transformation, content preservation, and file reconstruction automatically. You just need to know how to use the interface—which is exactly what we'll cover next.
                </p>
                <p className="text-surface-300 leading-relaxed">
                  Our <Link href="/tools/rotate" className="text-primary-400 hover:text-primary-300 underline">PDF page rotation tool</Link> is built with these principles in mind. It's designed to be fast, secure, and straightforward—everything you need to fix page orientation without the complexity you don't.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Step-by-Step Guide: How to Rotate PDF Pages Using Our Tool</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Ready to fix your PDF page orientation? Follow these steps to rotate pages quickly and easily. We'll cover rotating individual pages, multiple pages, and all pages at once.
                </p>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 1: Access the PDF Page Rotation Tool</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Navigate to our <Link href="/tools/rotate" className="text-primary-400 hover:text-primary-300 underline">PDF page rotation tool</Link>. You'll see a clean interface with a file upload area. No account creation or login required—you can start rotating pages immediately.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 2: Upload Your PDF File</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Click the upload area or drag and drop your PDF file directly onto the page. The tool supports:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Drag and drop functionality for quick file upload</li>
                    <li>Files up to 25 MB (for optimal performance)</li>
                    <li>Any PDF file, regardless of page count</li>
                    <li>Password-protected PDFs (you'll need to unlock them first using our <Link href="/edit" className="text-primary-400 hover:text-primary-300 underline">PDF editing tool</Link>)</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    Once uploaded, you'll see a preview of your PDF showing thumbnails of all pages. This helps you identify which pages need rotation and verify the results after rotating.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 3: Identify Pages That Need Rotation</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Before rotating, take a moment to review your PDF pages. Look for:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Pages that appear sideways (rotated 90° or 270°)</li>
                    <li>Pages that appear upside down (rotated 180°)</li>
                    <li>Inconsistent page orientations throughout the document</li>
                    <li>Pages that need to be rotated for viewing or printing preferences</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Pro tip:</strong> If you're working with a scanned document, check the first few pages carefully. Often, scanning errors affect multiple pages in sequence, so you might need to rotate several pages at once.
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    The page thumbnails in the tool interface make it easy to see which pages need rotation at a glance. You can also click on thumbnails to preview full-size pages if needed.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 4: Select Pages to Rotate</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    This is where you choose which pages to rotate. Most tools offer several selection methods:
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Method A: Rotate Individual Pages</h4>
                    <p className="text-surface-300 leading-relaxed mb-2">
                      Click on individual page thumbnails to select them, then choose a rotation angle. This is perfect when only a few pages need rotation.
                    </p>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Best for:</strong> Documents where only specific pages have orientation issues.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Method B: Rotate Multiple Pages</h4>
                    <p className="text-surface-300 leading-relaxed mb-2">
                      Select multiple pages at once (using Ctrl+Click on Windows or Cmd+Click on Mac), then apply the same rotation to all selected pages. Some tools also support selecting page ranges.
                    </p>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Best for:</strong> When several consecutive pages need the same rotation, or when you need to rotate non-consecutive pages with the same angle.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Method C: Rotate All Pages</h4>
                    <p className="text-surface-300 leading-relaxed mb-2">
                      Some tools offer a "Rotate All" option that applies the same rotation to every page in the document. This is useful when an entire document needs orientation correction.
                    </p>
                    <p className="text-surface-300 leading-relaxed">
                      <strong className="text-white">Best for:</strong> Documents where all pages have the same orientation issue, or when you need to change the viewing orientation of an entire document.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 5: Choose Rotation Angle</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Once you've selected pages, choose the rotation angle. Most tools support standard angles:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li><strong className="text-white">90° clockwise:</strong> Rotates the page one quarter turn to the right. Use this when pages are rotated left and need to be turned right.</li>
                    <li><strong className="text-white">180°:</strong> Rotates the page half a turn (upside down). Use this when pages are completely inverted.</li>
                    <li><strong className="text-white">270° (or -90°):</strong> Rotates the page three quarters of a turn, or one quarter turn to the left. Use this when pages are rotated right and need to be turned left.</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Pro tip:</strong> If you're unsure which angle to use, try 90° first. You can always rotate again if needed. Most tools allow you to apply multiple rotations, so rotating 90° twice equals 180°, and rotating 90° three times equals 270°.
                  </p>
                  <p className="text-surface-300 leading-relaxed">
                    Some advanced tools also let you apply different rotation angles to different pages. For example, you might rotate page 3 by 90° and page 7 by 180° in the same operation.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 6: Preview Your Rotations</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Before finalizing, take advantage of the preview feature if your tool offers it. Preview shows you how pages will look after rotation, allowing you to:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Verify that rotation angles are correct</li>
                    <li>Check that all pages needing rotation are selected</li>
                    <li>Ensure no pages were accidentally rotated</li>
                    <li>Confirm the final document orientation looks correct</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    This preview step prevents having to start over if you realize something's wrong after processing. It's worth taking a few extra seconds to review.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 7: Apply Rotations and Process</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Once everything looks good, click the "Rotate Pages" or "Apply Rotation" button. The tool will:
                  </p>
                  <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Process your PDF file</li>
                    <li>Apply rotation transformations to selected pages</li>
                    <li>Preserve all content quality and formatting</li>
                    <li>Maintain text searchability and selectability</li>
                    <li>Generate your rotated PDF file</li>
                  </ol>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Processing time depends on:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Total page count of your PDF</li>
                    <li>Number of pages being rotated</li>
                    <li>File size</li>
                    <li>Your device's processing power</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    For typical rotations (10-50 pages), this usually takes just a few seconds. Larger documents might take 30-60 seconds. You'll see a progress indicator during processing.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Step 8: Download Your Rotated PDF</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    When processing completes, your rotated PDF is ready. Click the download button to save it to your device. The file will typically have a name like "rotated.pdf" or include "rotated" in the filename, but you can rename it to something more descriptive.
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Important:</strong> Since processing happens in your browser, your files never leave your device. Once you close the browser tab, all temporary data is cleared. Make sure to download your rotated PDF before closing the page.
                  </p>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Quality check:</strong> After downloading, open your rotated PDF in a PDF viewer to verify:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>All pages are correctly oriented</li>
                    <li>Text remains readable and searchable</li>
                    <li>Images maintain their quality</li>
                    <li>No pages were accidentally rotated</li>
                    <li>The document looks professional and ready for use</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    That's it! You've successfully rotated your PDF pages. The entire process typically takes less than two minutes from start to finish.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Benefits of Using Online PDF Page Rotation Tools</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Why choose an online PDF rotation tool over desktop software or manual methods? Here are the key advantages:
                </p>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">1. Zero Installation Required</h3>
                  <p className="text-surface-300 leading-relaxed">
                    The biggest advantage is simplicity. You don't need to download, install, or update any software. Just open your browser and start rotating pages. This is especially valuable when you're on a shared computer, work device with restricted permissions, or need to rotate PDFs on the go.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">2. Privacy and Security</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    When you use a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. This is crucial when working with:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Confidential business documents</li>
                    <li>Personal financial information</li>
                    <li>Legal documents</li>
                    <li>Medical records</li>
                    <li>Any sensitive data</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    Unlike cloud-based tools that upload your files to servers, client-side processing keeps everything on your machine where you control it.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">3. Selective Page Rotation</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Online PDF rotation tools excel at selective rotation. You can rotate individual pages, specific page ranges, or all pages at once. This flexibility is often better than desktop software that might require more complex workflows for selective rotation. The ability to apply different rotation angles to different pages in one operation saves significant time.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">4. Cost-Effective Solution</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Most online PDF rotation tools are completely free. Even premium desktop PDF software can cost $100-300, and subscription services charge monthly fees. For occasional or regular PDF rotation, free online tools provide excellent value without any financial commitment.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">5. Cross-Platform Compatibility</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Whether you're on Windows, Mac, Linux, iOS, or Android, online PDF rotation tools work everywhere. Desktop software is often platform-specific, forcing you to buy separate versions or find workarounds. Browser-based tools eliminate this limitation entirely.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">6. Quality Preservation</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Quality online PDF rotation tools preserve:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Text searchability and selectability</li>
                    <li>Image resolution and quality</li>
                    <li>Document formatting and layout</li>
                    <li>Hyperlinks and bookmarks</li>
                    <li>Form fields and annotations</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    Unlike methods that convert PDFs to images and back, proper PDF rotation maintains all document functionality.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">7. Speed and Efficiency</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Modern browser-based PDF processing is surprisingly fast. You can rotate pages in seconds, compared to:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Manual rotation in PDF viewers (which doesn't permanently fix the file)</li>
                    <li>Print-to-PDF workflows (time-consuming and quality-degrading)</li>
                    <li>Desktop software that requires launching and navigating complex interfaces</li>
                    <li>Re-scanning documents (extremely time-consuming)</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    The streamlined interface of online tools means less time clicking through menus and more time getting work done.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">8. Always Up-to-Date</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Online tools are automatically updated by their developers. You always get the latest features, bug fixes, and security improvements without manually downloading updates or worrying about version compatibility.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">9. Visual Preview and Feedback</h3>
                  <p className="text-surface-300 leading-relaxed">
                    Most online PDF rotation tools provide visual feedback through page thumbnails and previews. You can see exactly which pages are selected, what rotation will be applied, and verify results before and after processing. This visual approach reduces errors and gives you confidence in the final result.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Comparison: Online PDF Rotators vs. Other Tools</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  How do online PDF rotation tools stack up against alternatives? Let's break down the comparison:
                </p>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Online PDF Rotators vs. Desktop Software</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Desktop Software (Adobe Acrobat, PDF Expert, etc.):</strong>
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>✅ More advanced features (editing, form filling, etc.)</li>
                    <li>✅ Works offline</li>
                    <li>✅ Better for very large files (500+ pages)</li>
                    <li>❌ Requires installation and updates</li>
                    <li>❌ Often expensive ($100-300+ or subscription fees)</li>
                    <li>❌ Platform-specific (Windows or Mac, rarely both)</li>
                    <li>❌ Takes up disk space</li>
                    <li>❌ More complex interface for simple rotation tasks</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Online PDF Rotators:</strong>
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>✅ Free to use</li>
                    <li>✅ No installation required</li>
                    <li>✅ Works on any platform</li>
                    <li>✅ Always up-to-date</li>
                    <li>✅ Privacy-first (client-side processing)</li>
                    <li>✅ Simple, focused interface for rotation</li>
                    <li>✅ Visual page selection and preview</li>
                    <li>❌ Requires internet connection (for initial page load)</li>
                    <li>❌ May struggle with extremely large files (500+ pages)</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Verdict:</strong> For PDF page rotation specifically, online tools win on convenience, cost, and accessibility. Desktop software is better if you need comprehensive PDF editing capabilities beyond just rotation, or if you regularly work with very large files.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Online PDF Rotators vs. Cloud-Based Services</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Cloud-Based Services (Dropbox, Google Drive PDF tools, etc.):</strong>
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>✅ Integrated with cloud storage</li>
                    <li>✅ Can access files from anywhere</li>
                    <li>✅ Often free with cloud storage accounts</li>
                    <li>❌ Files uploaded to servers (privacy concern)</li>
                    <li>❌ Requires account creation</li>
                    <li>❌ Storage limits apply</li>
                    <li>❌ Files may be retained on servers</li>
                    <li>❌ Slower processing (upload/download time)</li>
                    <li>❌ Limited rotation options</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    <strong className="text-white">Client-Side Online Rotators:</strong>
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>✅ No file uploads (privacy-first)</li>
                    <li>✅ No account required</li>
                    <li>✅ Faster processing (no upload/download)</li>
                    <li>✅ No storage limits</li>
                    <li>✅ Files never leave your device</li>
                    <li>✅ More rotation options and flexibility</li>
                    <li>❌ Can't access files from cloud storage directly</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Verdict:</strong> For privacy-conscious users, client-side online rotators are superior. Cloud services are better if you need to rotate files already stored in cloud storage and don't mind the privacy trade-off.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Online PDF Rotators vs. Manual Methods</h3>
                  <p className="text-surface-300 leading-relaxed mb-4">
                    Some people try to rotate PDF pages manually using methods like:
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>Using PDF viewer rotation (which doesn't permanently fix the file)</li>
                    <li>Printing rotated pages to a new PDF (slow, quality loss, time-consuming)</li>
                    <li>Taking screenshots of rotated pages (terrible quality, not searchable, time-consuming)</li>
                    <li>Re-scanning documents at correct orientation (extremely time-consuming)</li>
                    <li>Using freeware with ads and malware risks</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    <strong className="text-white">Verdict:</strong> Online PDF rotators are faster, produce better quality results, preserve searchability, and are more reliable than any manual method. There's no reason to use workarounds when proper tools are available for free.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions About Rotating PDF Pages</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">How do I rotate PDF pages online for free?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      You can rotate PDF pages online for free by using our <Link href="/tools/rotate" className="text-primary-400 hover:text-primary-300 underline">PDF page rotation tool</Link>. Simply upload your PDF file, select the pages you want to rotate, choose the rotation angle (90°, 180°, or 270°), and click rotate. The tool rotates your selected pages while preserving all content quality. Processing happens in your browser, so your files never leave your device. No account creation, payment, or software installation required.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Is it safe to rotate PDF pages online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, when using a privacy-first PDF rotation tool that processes files locally in your browser, your documents never leave your device. All rotation happens client-side using JavaScript, ensuring your sensitive documents remain secure and private. Unlike cloud-based tools that upload files to servers, client-side processing means your PDFs are processed entirely on your computer. Always look for tools that explicitly state they process files locally rather than uploading them.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I rotate individual pages in a PDF?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Absolutely. Most online PDF rotation tools allow you to rotate individual pages or specific page ranges. You can select which pages to rotate and apply different rotation angles to different pages if needed. This is particularly useful when only some pages in your document have orientation issues. Simply click on the page thumbnails you want to rotate, choose your rotation angle, and apply.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What rotation angles are available for PDF pages?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Most PDF rotation tools support standard rotation angles: 90 degrees (quarter turn clockwise), 180 degrees (half turn, upside down), and 270 degrees (three-quarter turn, or 90 degrees counterclockwise). Some tools also support rotating all pages at once or applying different rotations to different pages. You can typically apply multiple rotations if needed—for example, rotating 90° twice equals 180°.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Will rotating PDF pages reduce file quality?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      No, properly rotating PDF pages should not reduce quality. When you rotate pages using a quality tool, it applies the rotation transformation without re-compressing or degrading the content. Text remains searchable, images maintain their resolution, and formatting is preserved. The rotated PDF maintains the same quality as the original. However, if you're using a tool that converts PDFs to images and back, quality loss can occur. Look for tools that rotate PDFs at the native PDF level rather than converting formats.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Do I need to create an account to rotate PDF pages?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      No, many free PDF rotation tools work without requiring account creation or registration. You can upload, rotate, and download your PDF files immediately without signing up. This makes the process faster and more private. Some tools offer optional accounts for saving rotation history or accessing premium features, but basic PDF page rotation is typically available without any registration.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I rotate password-protected PDFs?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      This depends on the tool. Most online PDF rotation tools cannot process password-protected PDFs because they cannot access the content without the password. You will need to remove password protection first using a <Link href="/edit" className="text-primary-400 hover:text-primary-300 underline">PDF editing tool</Link> or the software that created the protection, then rotate the unlocked files. Some desktop PDF software can handle password-protected files if you provide the password.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What happens to the original PDF after rotating pages?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      The original PDF file on your device remains completely unchanged. Rotating pages creates a new file with the rotated pages without modifying the source document. This means you can rotate the same PDF multiple times using different angles without any risk to your original file. Always keep backups of important original files until you're satisfied with the rotated results.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I undo a rotation if I make a mistake?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Since rotation creates a new file, you can't "undo" a rotation in the traditional sense. However, your original PDF file remains unchanged on your device, so you can simply rotate it again with the correct angle or selection. This is why it's important to preview your rotations before processing. Some tools keep your rotation settings available for a few minutes after processing, allowing quick re-rotation if needed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Can I rotate PDFs on mobile devices?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, many online PDF rotation tools work on mobile browsers, though the experience may vary. Mobile devices have less processing power and memory than desktop computers, so very large PDFs might be slower or fail. For best results on mobile, stick to smaller files (under 10 MB) and fewer total pages (under 50). The interface may also be optimized differently for touch screens, but core functionality should work.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What is the maximum file size for rotating PDFs online?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      File size limits vary by tool, but most online PDF rotators support files up to 25-50 MB. For best performance, keep files under 25 MB and limit the total number of pages to under 200. Very large files (100+ MB) may cause browser performance issues or timeouts. If you need to rotate very large PDFs, consider splitting them first using our <Link href="/tools/split" className="text-primary-400 hover:text-primary-300 underline">PDF splitter tool</Link>, or using desktop software designed for heavy-duty processing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Will rotated text still be searchable?</h3>
                    <p className="text-surface-300 leading-relaxed">
                      Yes, when using a quality PDF rotation tool that rotates at the native PDF level, text remains fully searchable and selectable after rotation. The rotation is applied as a transformation to the page, not a conversion to images. This means you can still search for text, copy text, and use all standard PDF text features. If a tool converts PDFs to images and back, searchability may be lost, so always use tools that preserve native PDF structure.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Conclusion: Making PDF Page Rotation Simple</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Rotating PDF pages doesn't have to be complicated. With modern online PDF rotation tools, fixing page orientation is straightforward, fast, and secure. Whether you're a business professional correcting scanned documents, a student organizing research materials, or anyone who regularly works with PDF documents, the right tool makes all the difference.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  The key advantages of online PDF rotators—no installation, privacy-first processing, free access, selective page rotation, and cross-platform compatibility—make them the ideal solution for most rotation needs. While desktop software has its place for advanced PDF editing tasks, simple page rotation is perfectly handled by browser-based tools.
                </p>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Remember these best practices:
                </p>
                <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                  <li>Preview your PDF pages before rotating to identify which ones need correction</li>
                  <li>Use selective rotation for individual pages when only some pages have orientation issues</li>
                  <li>Keep files under 25 MB for best performance</li>
                  <li>Use privacy-first tools that process files locally</li>
                  <li>Verify rotated PDFs after downloading to ensure correct orientation</li>
                  <li>Keep backups of original files until you're satisfied with the rotated results</li>
                  <li>Test different rotation angles if unsure—you can always rotate again</li>
                </ul>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Ready to fix your PDF page orientation? Try our <Link href="/tools/rotate" className="text-primary-400 hover:text-primary-300 underline">free PDF page rotation tool</Link> and experience how simple correcting page orientation can be. And if you need to make other edits to your PDFs, check out our <Link href="/edit" className="text-primary-400 hover:text-primary-300 underline">PDF editing tool</Link> for adding text, images, and annotations. For large files that need size reduction before rotation, our <Link href="/tools/compress" className="text-primary-400 hover:text-primary-300 underline">PDF compression tool</Link> can help reduce file sizes. And if you need to combine multiple PDFs after rotating, our <Link href="/tools/merge" className="text-primary-400 hover:text-primary-300 underline">PDF merger tool</Link> makes it easy to merge documents together.
                </p>
                <p className="text-surface-300 leading-relaxed">
                  PDF management doesn't have to be a chore. With the right tools and approach, you can handle page rotation quickly and confidently, leaving more time for the work that actually matters.
                </p>
              </section>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-surface-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/blog/how-to-merge-pdf-files-online"
                  className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    How to Merge PDF Files Online
                  </h4>
                  <p className="text-surface-400 text-sm">
                    Learn how to combine multiple PDF files into one document using free online tools.
                  </p>
                </Link>
                <Link
                  href="/blog/how-to-split-pdf-files-online"
                  className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    How to Split PDF Files Online
                  </h4>
                  <p className="text-surface-400 text-sm">
                    Complete guide to dividing large PDF documents into smaller files online.
                  </p>
                </Link>
                <Link
                  href="/blog/how-to-edit-a-pdf-online"
                  className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    How to Edit a PDF Online
                  </h4>
                  <p className="text-surface-400 text-sm">
                    Complete guide to editing PDF files online without installing software.
                  </p>
                </Link>
                <Link
                  href="/blog/how-to-delete-pages-from-pdf"
                  className="group p-4 rounded-lg border border-surface-700/50 hover:border-primary-500/50 transition-all"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    How to Delete Pages from PDF
                  </h4>
                  <p className="text-surface-400 text-sm">
                    Learn how to remove unwanted pages from PDF documents quickly and easily.
                  </p>
                </Link>
              </div>
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-surface-700/50">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}
