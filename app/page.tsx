import Link from 'next/link';
import Script from 'next/script';
import { generateFAQSchema } from './data/faq';
import LazyFAQ from './components/LazyFAQ';
import Header from './components/Header';
import {
  FilePlus2, Scissors, GripVertical, RotateCw, Trash2,
  Lock, LockOpen, PenTool, EyeOff, SlidersHorizontal,
  Image, FileText, Table, Code, AlignLeft,
  Minimize2, Droplets, PenLine, QrCode, Info,
  ArrowRight, Shield, Zap, Globe, Sparkles,
  AlertCircle,
} from 'lucide-react';

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
      {/* Structured Data Scripts - Load after page is interactive to improve TBT */}
      <Script
        id="jsonld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-review"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        strategy="lazyOnload"
      />
      
      {/* Google AdSense - Load only on homepage after page is interactive */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2980943706375055"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      
      <main className="min-h-screen flex flex-col" role="main">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 ">
          <div className="max-w-5xl w-full">
            {/* Hero Section */}
            <section className="relative mb-16 animate-fade-in" aria-labelledby="hero-heading">
              {/* Hero Card Container */}
              <div className="relative card p-8 md:p-12 lg:p-16 bg-gradient-to-br from-surface-800/80 via-surface-800/60 to-surface-900/80 border-primary-500/20 backdrop-blur-sm md:backdrop-blur-xl overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>
                
                <div className="relative z-10 text-center">
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
                      <Shield size={20} strokeWidth={2} className="text-success-400" />
                      <span className="font-medium text-surface-300">100% Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={20} strokeWidth={2} className="text-primary-400" />
                      <span className="font-medium text-surface-300">100% Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={20} strokeWidth={2} className="text-accent-400" />
                      <span className="font-medium text-surface-300">Instant Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={20} strokeWidth={2} className="text-success-400" />
                      <span className="font-medium text-surface-300">No Data Upload</span>
                    </div>
                  </div>

                  {/* CTA Button */}

                </div>
              </div>
            </section>
            
            {/* PDF Tools Section */}
            <section className="mb-16 animate-fade-in delay-300" aria-labelledby="pdftools-heading">
              <div className="relative card p-8 md:p-10 bg-gradient-to-br from-accent-500/5 via-surface-800/60 to-primary-500/5 border-accent-500/15 overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary-500/8 rounded-full blur-3xl translate-y-1/2" aria-hidden="true"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-success-500/5 rounded-full blur-3xl" aria-hidden="true"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-500"></span>
                      </span>
                      55+ Tools
                    </div>
                    <h2 id="pdftools-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Complete PDF Toolkit
                    </h2>
                    <p className="text-surface-400 text-base max-w-2xl mx-auto">
                      Everything you need to work with PDFs — organize, protect, convert, sign, analyze, and more. All in your browser, 100% private.
                    </p>
                  </div>

                  {/* Category rows */}
                  <div className="space-y-6 mb-8">

                    {/* Row 1: Organize & Pages */}
                    {(() => {
                      const tools = [
                        { title: 'Merge PDF', desc: 'Combine files', color: 'primary', icon: <FilePlus2 size={20} strokeWidth={1.5} /> },
                        { title: 'Split PDF', desc: 'Separate pages', color: 'accent', icon: <Scissors size={20} strokeWidth={1.5} /> },
                        { title: 'Reorder', desc: 'Drag & drop', color: 'warning', icon: <GripVertical size={20} strokeWidth={1.5} /> },
                        { title: 'Rotate', desc: 'Rotate pages', color: 'info', icon: <RotateCw size={20} strokeWidth={1.5} /> },
                        { title: 'Delete Pages', desc: 'Remove pages', color: 'error', icon: <Trash2 size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <GripVertical size={16} strokeWidth={1.5} className="text-primary-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">Organize & Pages</span>
                            <span className="text-[10px] text-surface-600 ml-auto">11 tools</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href="/tools" className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${300 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 2: Security & Protection */}
                    {(() => {
                      const tools = [
                        { title: 'Sign PDF', desc: 'Digital signature', color: 'primary', icon: <PenTool size={20} strokeWidth={1.5} /> },
                        { title: 'Redact', desc: 'Black out data', color: 'error', icon: <EyeOff size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Shield size={16} strokeWidth={1.5} className="text-success-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">Security & Protection</span>
                            <span className="text-[10px] text-surface-600 ml-auto">7 tools</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href="/edit?tab=tools" className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${500 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 3: Convert */}
                    {(() => {
                      const tools = [
                        { title: 'PDF → Images', desc: 'PNG, JPEG, WebP', color: 'accent', icon: <Image size={20} strokeWidth={1.5} /> },
                        { title: 'PDF → Word', desc: 'Editable DOCX', color: 'info', icon: <FileText size={20} strokeWidth={1.5} /> },
                        { title: 'PDF → Excel', desc: 'Extract tables', color: 'success', icon: <Table size={20} strokeWidth={1.5} /> },
                        { title: 'PDF → HTML', desc: 'Web format', color: 'error', icon: <Code size={20} strokeWidth={1.5} /> },
                        { title: 'PDF → Text', desc: 'Plain text', color: 'warning', icon: <AlignLeft size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ArrowRight size={16} strokeWidth={1.5} className="text-accent-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">Convert</span>
                            <span className="text-[10px] text-surface-600 ml-auto">12 formats</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href="/edit?tab=tools" className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${650 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Row 4: Edit & Content */}
                    {(() => {
                      const tools = [
                        { title: 'Compress', desc: 'Reduce file size', color: 'success', icon: <Minimize2 size={20} strokeWidth={1.5} /> },
                        { title: 'Watermark', desc: 'Text or image', color: 'info', icon: <Droplets size={20} strokeWidth={1.5} /> },
                        { title: 'Fill & Sign', desc: 'Forms & signing', color: 'primary', icon: <PenLine size={20} strokeWidth={1.5} /> },
                        { title: 'Add QR Code', desc: 'Insert QR codes', color: 'accent', icon: <QrCode size={20} strokeWidth={1.5} /> },
                        { title: 'Metadata', desc: 'Edit properties', color: 'warning', icon: <Info size={20} strokeWidth={1.5} /> },
                      ];
                      const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = { primary: { bg: 'bg-primary-500/5', border: 'border-primary-500/20 hover:border-primary-500/40', text: 'text-primary-400', iconBg: 'bg-primary-500/15' }, accent: { bg: 'bg-accent-500/5', border: 'border-accent-500/20 hover:border-accent-500/40', text: 'text-accent-400', iconBg: 'bg-accent-500/15' }, success: { bg: 'bg-success-500/5', border: 'border-success-500/20 hover:border-success-500/40', text: 'text-success-400', iconBg: 'bg-success-500/15' }, error: { bg: 'bg-error-500/5', border: 'border-error-500/20 hover:border-error-500/40', text: 'text-error-400', iconBg: 'bg-error-500/15' }, warning: { bg: 'bg-warning-500/5', border: 'border-warning-500/20 hover:border-warning-500/40', text: 'text-warning-400', iconBg: 'bg-warning-500/15' }, info: { bg: 'bg-info-500/5', border: 'border-info-500/20 hover:border-info-500/40', text: 'text-info-400', iconBg: 'bg-info-500/15' } };
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} strokeWidth={1.5} className="text-info-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">Edit, Content & Analyze</span>
                            <span className="text-[10px] text-surface-600 ml-auto">25+ tools</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {tools.map((tool, i) => { const c = colorClasses[tool.color] || colorClasses.primary; return (
                              <Link key={tool.title} href="/edit?tab=tools" className={`group flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97] ${c.bg} ${c.border} animate-fade-in-up`} style={{ animationDelay: `${800 + i * 50}ms` }}>
                                <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center mb-2 ${c.text} transition-transform duration-200 group-hover:scale-110`}>{tool.icon}</div>
                                <h3 className="text-xs font-semibold text-white mb-0.5">{tool.title}</h3>
                                <p className="text-[10px] text-surface-500 hidden sm:block">{tool.desc}</p>
                              </Link>
                            ); })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Link
                      href="/tools"
                      className="btn-primary btn-md inline-flex"
                    >
                      Explore All 55+ PDF Tools
                      <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <p className="text-xs text-surface-500 mt-3">
                      100% free &bull; No signup &bull; Processed on your device
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-white mb-6 col-span-full text-center">Why Choose EditoraPDF?</h2>
              {[
                {
                  icon: <Zap size={28} strokeWidth={1.5} className="text-primary-400" />,
                  title: 'Instant Start',
                  description: 'No installation, no signup, no waiting. Drop your PDF and start editing immediately in your browser',
                },
                {
                  icon: <PenSquare size={28} strokeWidth={1.5} className="text-accent-400" />,
                  title: 'Full-Featured Editor',
                  description: 'Edit text, add images, annotate, reorder pages, rotate, and more — all the tools you need online',
                },
                {
                  icon: <Shield size={28} strokeWidth={1.5} className="text-success-400" />,
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
                  <AlertCircle size={20} strokeWidth={2} className="text-warning-400" />
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

            {/* Open Source Section */}
            <section className="mt-16 animate-fade-in delay-500" aria-labelledby="opensource-heading">
              <div className="card p-8 md:p-10 bg-gradient-to-br from-primary-500/5 via-surface-800/60 to-accent-500/5 border-primary-500/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Icon/Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-primary-500/20 border-2 border-primary-500/40 flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 id="opensource-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
                      100% Open Source & Free Forever
                    </h2>
                    <p className="text-surface-300 text-base md:text-lg leading-relaxed mb-5">
                      EditoraPDF is completely <span className="font-semibold text-white">open source</span> (MIT License) and built with modern technologies like Next.js, TypeScript, React, PDF.js, and pdf-lib. 
                      View the code, contribute features, report bugs, or fork it for your own projects.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                      <a
                        href="https://github.com/affsquadDevs/editorapdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-md"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View on GitHub
                      </a>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn-md"
                      >
                        Report Issue
                      </a>
                      <a
                        href="https://github.com/affsquadDevs/editorapdf#readme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn-md"
                      >
                        Documentation
                      </a>
                    </div>
                    
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-5 justify-center md:justify-start">
                      <span className="text-xs text-surface-400 font-medium">Built with:</span>
                      {['Next.js', 'TypeScript', 'React', 'PDF.js', 'pdf-lib', 'Zustand', 'Tailwind'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-surface-700/50 border border-surface-600/50 text-xs text-surface-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section (lazy on scroll to reduce initial JS on mobile) */}
            <div className="mt-20 animate-fade-in delay-600">
              <LazyFAQ />
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
              {/* Copyright & Open Source Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm text-surface-500">
                  © {new Date().getFullYear()} EditoraPDF. All rights reserved.
                </p>
                <a
                  href="https://github.com/affsquadDevs/editorapdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium hover:bg-primary-500/20 transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Open Source
                </a>
              </div>
              
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
                  <a
                    href="https://github.com/affsquadDevs/editorapdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                    aria-label="Star us on GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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
