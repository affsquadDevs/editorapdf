import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono, Lexend } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

// Primary font - Modern geometric sans
// Optimized for mobile: reduced weights for better performance
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap', // Show fallback font immediately, swap when loaded
  variable: '--font-outfit',
  weight: ['400', '600', '700'], // Reduced weights for mobile performance
})

// Display font - Bold headlines
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabinet',
  weight: ['600', '700'], // Reduced weights for mobile performance
})

// Monospace font - Code & technical elements
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'], // Reduced weights for mobile performance
})

const siteUrl = 'https://editorapdf.com' // Replace with your actual domain
const siteName = 'EditoraPDF'
const siteDescription = 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing in your browser. No downloads, no signup, 100% free and private.'
const siteTitle = 'Edit PDF Online Free - No Installation, No Signup Required | EditoraPDF'

// Google Tag Manager Container ID
const GTM_ID = 'GTM-P5DF8WL7'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    // Open Source & Free Software
    'open source PDF editor',
    'free open source PDF tool',
    'GitHub PDF editor',
    'MIT license PDF editor',
    'FOSS PDF editor',
    'open source document editor',
    'free software PDF editing',
    'community-driven PDF editor',
    // Core Functionality
    'edit PDF online',
    'PDF editor no installation',
    'PDF editor no signup',
    'instant PDF editor',
    'quick PDF editor',
    'edit PDF without software',
    'online PDF editor free',
    'PDF editor no download',
    'browser PDF editor',
    'edit PDF in browser',
    'no account PDF editor',
    'free PDF editor online',
    'fast PDF editing',
    'PDF editor no registration',
    'edit PDF instantly',
    'web-based PDF editor',
    'PDF annotation online',
    'modify PDF online',
    'update PDF documents',
    // Privacy & Security
    'client-side PDF editor',
    'private PDF editor',
    'secure PDF editing',
    'no upload PDF editor',
    'offline PDF editor',
    'privacy-first PDF tool',
    // Technology Stack
    'Next.js PDF editor',
    'TypeScript PDF editor',
    'React PDF editor',
    'PDF.js online editor',
    'pdf-lib editor',
    'modern PDF tool',
    // Organize & Pages Tools
    'merge PDF online',
    'combine PDF files',
    'split PDF online',
    'delete PDF pages',
    'extract PDF pages',
    'reorder PDF pages',
    'rotate PDF pages',
    'insert blank pages PDF',
    'duplicate PDF pages',
    'reverse PDF page order',
    'split PDF by size',
    'split PDF by bookmarks',
    // Security & Protection Tools
    'sign PDF online',
    'digital signature PDF',
    'e-sign PDF',
    'redact PDF online',
    'black out PDF text',
    'sanitize PDF',
    'remove PDF metadata',
    'certificate sign PDF',
    'X.509 PDF signature',
    // Convert Tools
    'PDF to images',
    'PDF to PNG',
    'PDF to JPEG',
    'images to PDF',
    'PDF to Word',
    'PDF to DOCX',
    'PDF to Excel',
    'PDF to XLSX',
    'PDF to text',
    'PDF to TXT',
    'PDF to CSV',
    'PDF to HTML',
    'PDF to Markdown',
    'PDF to MD',
    'HTML to PDF',
    'Word to PDF',
    'DOCX to PDF',
    'Excel to PDF',
    'XLSX to PDF',
    // Edit & Enhance Tools
    'compress PDF online',
    'reduce PDF file size',
    'add watermark to PDF',
    'PDF watermark',
    'add page numbers PDF',
    'number PDF pages',
    'crop PDF pages',
    'trim PDF margins',
    'resize PDF pages',
    'change PDF page size',
    'PDF to grayscale',
    'black and white PDF',
    'invert PDF colors',
    'dark mode PDF',
    'flatten PDF',
    'flatten PDF forms',
    'remove PDF annotations',
    'remove PDF comments',
    // Content & Media Tools
    'extract images from PDF',
    'remove images from PDF',
    'optimize PDF images',
    'add QR code to PDF',
    'PDF QR code',
    'add barcode to PDF',
    'PDF barcode',
    'add bookmarks to PDF',
    'PDF table of contents',
    'add hyperlinks to PDF',
    'PDF links',
    'embed files in PDF',
    'PDF attachments',
    // Forms & Signing Tools
    'fill PDF form',
    'sign PDF form',
    'add stamp to PDF',
    'PDF stamp',
    'Bates numbering PDF',
    'legal document numbering',
    'create PDF form',
    'add form fields to PDF',
    // OCR & Text Tools
    'OCR PDF',
    'text recognition PDF',
    'scanned PDF to text',
    'make PDF searchable',
    'searchable PDF',
    'OCR online',
    // Analyze & Optimize Tools
    'compare PDF files',
    'PDF comparison',
    'repair PDF',
    'fix corrupted PDF',
    'edit PDF metadata',
    'PDF metadata editor',
    'PDF statistics',
    'PDF analysis',
    'linearize PDF',
    'fast web PDF',
    'convert PDF color space',
    'RGB to CMYK PDF',
    'PDF accessibility check',
    'WCAG PDF compliance',
    'PDF/A conversion',
    'archival PDF',
    'PDF/X conversion',
    'print-ready PDF',
    'validate PDF',
    'PDF validation',
  ],
  authors: [{ name: 'EditoraPDF Team', url: siteUrl }],
  creator: 'EditoraPDF',
  publisher: 'EditoraPDF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'EditoraPDF - Professional PDF Editor - Edit PDF documents online instantly without installation or signup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og/og-image.png`],
    creator: '@editora_pdf',
    site: '@editora_pdf',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'en': siteUrl,
    },
  },
  category: 'technology',
  applicationName: 'EditoraPDF',
  referrer: 'origin-when-cross-origin',
  appleWebApp: {
    capable: true,
    title: 'EditoraPDF',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    // Add your verification codes here after registering with search engines
    // google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
    // other: 'your-other-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'geo.region': 'US',
    'geo.placename': 'United States',
    'ICBM': '39.8283, -98.5795',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // Enable safe-area-inset support
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: WebApplication schema moved to page.tsx (only on actual tool page)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  }

  // VideoObject schema (if you add video content later)
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'EditoraPDF PDF Editor Demo',
    description: 'Watch how to use EditoraPDF to edit PDFs online for free',
    thumbnailUrl: `${siteUrl}/og/og-image.png`,
    uploadDate: '2024-01-01',
    contentUrl: `${siteUrl}/video/demo.mp4`,
    embedUrl: `${siteUrl}/video/embed`,
    duration: 'PT3M',
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'EditoraPDF',
    alternateName: 'EditoraPDF Online PDF Editor',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
      width: 120,
      height: 40,
    },
    image: `${siteUrl}/og/og-image.png`,
    description: 'EditoraPDF provides easy-to-use online tools for editing, modifying, and managing PDF documents directly in the browser.',
    foundingDate: '2026',
    sameAs: [
      'https://www.instagram.com/editora_pdf',
      'https://www.facebook.com/people/Editorapdf/61587362633003/',
      'https://www.youtube.com/@EditoraPDF',
      'https://www.threads.com/@editora_pdf',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@affsquad.com',
      availableLanguage: ['English'],
    },
    publishingPrinciples: `${siteUrl}/terms`,
    privacyPolicy: `${siteUrl}/privacy-policy`,
    termsOfService: `${siteUrl}/terms`,
    knowsAbout: [
      'PDF editing',
      'Online document tools',
      'PDF management',
      'Document editing software',
      'Browser-based PDF tools',
    ],
    makesOffer: {
      '@type': 'Offer',
      name: 'Online PDF Editing Tools',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'EditoraPDF',
    },
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EditoraPDF Features',
    description: 'Key features of EditoraPDF PDF Editor',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'View & Navigate',
        description: 'Render pages with crystal clarity, zoom seamlessly, and navigate with smart thumbnails',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Edit & Annotate',
        description: 'Reorder, rotate, delete pages. Add text, images, shapes, and highlights',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Export Instantly',
        description: 'Download your edited PDF with all changes applied. No quality loss guaranteed',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: '100% Private',
        description: 'All processing happens locally in your browser. Your documents never leave your device',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'No Uploads Required',
        description: 'Enterprise-level security by design. No server uploads, no subscriptions',
      },
    ],
  }

  // SoftwareSourceCode schema - Open Source Project
  const softwareSourceCodeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${siteUrl}/#sourcecode`,
    name: 'EditoraPDF - Open Source PDF Editor',
    description: 'Free and open-source online PDF editor built with Next.js, TypeScript, and PDF.js. Edit PDFs entirely in your browser with complete privacy - no uploads, no signup required.',
    text: 'A client-side PDF editor that runs entirely in your browser. Built with Next.js 14, TypeScript, PDF.js, and pdf-lib. Features text editing, image insertion, shape drawing, page management, and instant export.',
    codeRepository: 'https://github.com/affsquadDevs/editorapdf',
    codeSampleType: 'full solution',
    programmingLanguage: {
      '@type': 'ComputerLanguage',
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org/',
    },
    runtimePlatform: [
      'Next.js 14',
      'React 18',
      'Node.js 18+',
      'Modern browsers (Chrome, Firefox, Edge, Safari)',
    ],
    targetProduct: {
      '@type': 'SoftwareApplication',
      name: 'EditoraPDF',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
    },
    author: {
      '@type': 'Organization',
      name: 'EditoraPDF Team',
      url: siteUrl,
    },
    license: 'https://opensource.org/licenses/MIT',
    softwareVersion: '1.0.0',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    keywords: [
      'open source',
      'PDF editor',
      'Next.js',
      'TypeScript',
      'React',
      'PDF.js',
      'pdf-lib',
      'client-side',
      'browser-based',
      'privacy-first',
      'no backend',
      'static site',
      'Zustand',
      'Tailwind CSS',
      'free software',
      'FOSS',
    ],
    contributor: [
      {
        '@type': 'Organization',
        name: 'GitHub Community',
        url: 'https://github.com/affsquadDevs/editorapdf/graphs/contributors',
      },
    ],
    sponsor: {
      '@type': 'Organization',
      name: 'AffSquad',
      url: 'https://affsquad.com',
      email: 'hello@affsquad.com',
    },
  }

  return (
    <html lang="en-US" className={`${outfit.variable} ${lexend.variable} ${jetbrains.variable}`}>
      <head>
        {/* Google Tag Manager - Load after page is interactive to improve performance */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Performance:
            - Fonts are self-hosted via next/font, so no need to preconnect to fonts.googleapis.com/fonts.gstatic.com
            - Avoid eager preconnect to third parties on mobile (can hurt LCP); keep only dns-prefetch */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources for faster LCP */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
        
        {/* Favicon links */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="expires" content="never" />
        <meta name="copyright" content="EditoraPDF" />
        <meta name="reply-to" content="hello@affsquad.com" />
        <meta name="owner" content="EditoraPDF" />
        <meta name="url" content={siteUrl} />
        <meta name="identifier-URL" content={siteUrl} />
        <meta name="directory" content="submission" />
        <meta name="category" content="Software, PDF Editor, Document Tools" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-itunes-app" content="app-id=YOUR_APP_ID" />
        
        {/* OpenSearch */}
        <link rel="search" type="application/opensearchdescription+xml" title={siteName} href={`${siteUrl}/opensearch.xml`} />
        
        {/* Open Graph Meta Tags - Explicit for full compatibility */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={`${siteUrl}/og/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EditoraPDF - Professional PDF Editor - Edit PDF documents online instantly without installation or signup" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@editora_pdf" />
        <meta name="twitter:creator" content="@editora_pdf" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og/og-image.png`} />
        <meta name="twitter:image:alt" content="EditoraPDF - Professional PDF Editor" />
        
        {/* Article Tags for AI Crawlers & Social Media */}
        <meta property="article:tag" content="open-source" />
        <meta property="article:tag" content="free-software" />
        <meta property="article:tag" content="pdf-editor" />
        <meta property="article:tag" content="privacy-first" />
        <meta property="article:tag" content="client-side" />
        
        {/* Social Media Profile Links */}
        <meta property="og:see_also" content="https://www.facebook.com/people/Editorapdf/61587362633003/" />
        <meta property="og:see_also" content="https://www.instagram.com/editora_pdf" />
        <meta property="og:see_also" content="https://www.threads.com/@editora_pdf" />
        <meta property="og:see_also" content="https://www.youtube.com/@EditoraPDF" />
        
        {/* Additional structured data hints */}
        <meta name="application-name" content={siteName} />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Rich snippets support - Add verification codes after registering */}
        {/* <meta name="google-site-verification" content="your-code" /> */}
        {/* <meta name="msvalidate.01" content="your-code" /> */}
        {/* <meta name="yandex-verification" content="your-code" /> */}
        
        {/* Content Security Policy hints */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* JSON-LD Structured Data - Load after page is interactive to improve TBT */}
        {/* Note: WebApplication schema is on page.tsx only (actual tool page) */}
        <Script
          id="jsonld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          strategy="lazyOnload"
        />
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="lazyOnload"
        />
        <Script
          id="jsonld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          strategy="lazyOnload"
        />
        <Script
          id="jsonld-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
          strategy="lazyOnload"
        />
        <Script
          id="jsonld-sourcecode"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSourceCodeJsonLd) }}
          strategy="lazyOnload"
        />
        {/* Video schema - uncomment when you have video content */}
        {/* <Script
          id="jsonld-video"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
          strategy="beforeInteractive"
        /> */}
      </head>
      <body className={`${outfit.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        {/* Background with gradient mesh */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
        
        {/* Main Content */}
        <div id="main-content" className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
