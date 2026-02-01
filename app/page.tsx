'use client';

import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { generateFAQSchema } from './data/faq';
import FAQ from './components/FAQ';
import MobileMenu from './components/MobileMenu';

const siteUrl = 'https://editorapdf.com';

export default function Home() {

  // FAQ Schema for SEO - Generated from reusable data
  const faqSchema = generateFAQSchema(siteUrl);

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Edit a PDF Online with EditoraPDF',
    description: 'Step-by-step guide to editing PDFs using EditoraPDF, a free browser-based PDF editor',
    image: `${siteUrl}/og/og-image.png`,
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open Your PDF',
        text: 'Click "Edit PDF" or drag and drop your PDF file. EditoraPDF supports files up to 25MB and processes everything locally in your browser.',
        image: `${siteUrl}/screenshot-desktop.png`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Navigate and View',
        text: 'Use the thumbnail sidebar to navigate between pages. Use zoom controls to adjust the view.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Edit Text',
        text: 'Click on any existing text to edit it. You can change the content, size, color, or position. Use the Text tool to add new text anywhere on the page.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Add Images and Shapes',
        text: 'Use the Image tool to add pictures, or the Shape tool to draw rectangles, circles, lines, arrows, or highlights.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Manage Pages',
        text: 'Rotate, delete, or reorder pages using the toolbar controls. Drag thumbnails to reorder pages.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Export Your PDF',
        text: 'Click the Export button to download your edited PDF with all changes applied. The file will be saved to your device.',
      },
    ],
  };

  // Review Schema for SEO
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EditoraPDF PDF Editor',
    description: 'Free, privacy-focused PDF editor that runs entirely in your browser',
    brand: {
      '@type': 'Brand',
      name: 'EditoraPDF',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        datePublished: '2024-01-15',
        reviewBody: 'Amazing tool! I love that my files never leave my computer. The text editing feature is exactly what I needed.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'John D.',
        },
        datePublished: '2024-01-20',
        reviewBody: 'Perfect for quick PDF edits. No signup required, works offline, and completely free. Highly recommend!',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };

  // WebApplication Schema - ONLY on actual tool page
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteUrl}/#webapp`,
    name: 'EditoraPDF',
    alternateName: 'EditoraPDF Online PDF Editor',
    url: siteUrl,
    description: 'Edit PDF documents online instantly without installing software or creating an account. Quick, powerful PDF editing directly in your browser with complete privacy.',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'PDF Editor',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern browser (Chrome, Edge, Firefox, Safari). JavaScript enabled.',
    softwareVersion: '1.0.0',
    releaseNotes: 'Free online PDF editor with instant access. No installation, no signup, no downloads required. Edit PDFs directly in your browser.',
    isAccessibleForFree: true,
    offers: [
      {
        '@type': 'Offer',
        '@id': `${siteUrl}/#free-offer`,
        name: 'Free PDF Editing',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Free',
        url: siteUrl,
      },
    ],
    featureList: [
      'Instant access - no installation or signup required',
      'Works entirely in your browser - no downloads',
      'Edit PDF text and content directly',
      'Add, remove, and reorder pages',
      'Rotate and delete pages',
      'Annotate PDFs (highlight, draw, add notes)',
      'Add shapes, stamps, and images',
      'Fill forms and add text overlays',
      'Export and download updated PDF instantly',
      '100% private - all processing on your device',
    ],
    permissions: 'No special permissions required.',
    inLanguage: ['en'],
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    creator: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
    },
    image: [
      `${siteUrl}/og/og-image.png`,
    ],
    screenshot: [
      {
        '@type': 'ImageObject',
        url: `${siteUrl}/screenshots/editor.png`,
      },
    ],
    softwareHelp: {
      '@type': 'CreativeWork',
      name: 'Contact',
      url: `${siteUrl}/contact`,
    },
    privacyPolicy: `${siteUrl}/privacy-policy`,
    termsOfService: `${siteUrl}/terms`,
    audience: {
      '@type': 'Audience',
      audienceType: ['Students', 'Professionals', 'Small Business', 'General Public'],
    },
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Edit a PDF',
        target: siteUrl,
      },
    ],
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <Script
        id="jsonld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="jsonld-review"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        strategy="afterInteractive"
      />
      
      <main className="h-screen flex flex-col" role="main">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-surface-700/50" role="banner">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <MobileMenu />
              
              {/* Logo & Brand */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.svg" 
                  alt="EditoraPDF Logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/how-it-works" className="nav-link">
                How It Works
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </nav>
            
            {/* CTA Button */}
            <Link
              href="/edit"
              className="btn-primary btn-md hidden sm:flex"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit PDF
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 ">
          <div className="max-w-5xl w-full">
            {/* Hero Section */}
            <section className="relative mb-16 animate-fade-in" aria-labelledby="hero-heading">
              {/* Hero Card Container */}
              <div className="relative card p-8 md:p-12 lg:p-16 bg-gradient-to-br from-surface-800/80 via-surface-800/60 to-surface-900/80 border-primary-500/20 backdrop-blur-xl overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>
                
                <div className="relative z-10 text-center">
                  {/* Logo */}
                  <div className="flex justify-center mb-8 animate-fade-in-up">
                    <div className="relative">
                      <img 
                        src="/logo.svg" 
                        alt="EditoraPDF Logo" 
                        width={180} 
                        height={60} 
                        className="h-14 md:h-16 w-auto mx-auto drop-shadow-lg"
                      />
                      <div className="absolute -inset-2 bg-primary-500/20 rounded-xl blur-xl opacity-50 -z-10"></div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6 shadow-lg shadow-primary-500/10 animate-fade-in-up delay-100" role="status">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <span className="hidden sm:inline">No Installation • No Signup • </span>Instant Access
                  </div>
                  
                  {/* Main Heading */}
                  <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-200">
                    Edit PDF Documents{' '}
                    <span className="text-gradient-animated">Online Instantly</span>
                    <br className="hidden sm:block" />
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-200">No Software Required</span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-surface-300 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-300">
                    <span className="font-medium text-surface-200">Professional PDF editing</span> right in your browser.{' '}
                    <span className="text-surface-400">No downloads, no registration, no hassle.</span>
                    <br className="hidden md:block" />
                    <span className="text-base md:text-lg text-surface-400">Start editing in seconds — your files stay 100% private on your device.</span>
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8 text-sm text-surface-400 animate-fade-in-up delay-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="font-medium text-surface-300">100% Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="font-medium text-surface-300">100% Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      <span className="font-medium text-surface-300">Instant Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                      <span className="font-medium text-surface-300">No Data Upload</span>
                    </div>
                  </div>

                  {/* CTA Button */}

                </div>
              </div>
            </section>
            
            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-white mb-6 col-span-full text-center">Why Choose EditoraPDF?</h2>
              {[
                {
                  icon: (
                    <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  title: 'Instant Start',
                  description: 'No installation, no signup, no waiting. Drop your PDF and start editing immediately in your browser',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  ),
                  title: 'Full-Featured Editor',
                  description: 'Edit text, add images, annotate, reorder pages, rotate, and more — all the tools you need online',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: '100% Private & Secure',
                  description: 'All processing happens on your device. No uploads, no accounts, no data collection — total privacy',
                },
              ].map((feature, index) => (
                <article
                  key={feature.title}
                  className="feature-card animate-fade-in-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="feature-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </article>
              ))}
            </section>

            {/* Limitations Notice */}
            <aside className="card p-5 border-warning-500/20 bg-warning-500/5 animate-fade-in delay-500" aria-labelledby="limitations-heading">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-5 h-5 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h4 id="limitations-heading" className="font-semibold text-warning-300 mb-2">Current Limitations</h4>
                  <ul className="text-sm text-surface-400 space-y-1.5" role="list">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Maximum file size: 25MB
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Works best with PDFs under 50 pages
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Complex PDFs with forms may not render perfectly
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-surface-500" />
                      Encrypted/password-protected PDFs are not supported
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* FAQ Section */}
            <div className="mt-20 animate-fade-in delay-600">
              <FAQ />
            </div>
          </div>
        </div>

      {/* Footer with Social Links */}
      <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
          <div className="max-w-5xl mx-auto space-y-3">
            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
              <p className="text-xs text-surface-400 leading-relaxed">
                <strong className="text-surface-300">Disclaimer:</strong> EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our{' '}
                <Link href="/terms" className="text-primary-400 hover:text-primary-300 underline">
                  Terms
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-surface-500">
                © {new Date().getFullYear()} EditoraPDF. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-surface-500">Follow us:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/people/Editorapdf/61587362633003/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.threads.com/@editora_pdf"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Follow us on Threads"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@EditoraPDF"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Subscribe on YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </main>
    </>
  );
}
