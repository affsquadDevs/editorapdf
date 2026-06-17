// Content-Security-Policy (Report-Only for now). Allows the third parties the site
// actually loads: Google AdSense/Ads/DoubleClick, Google Tag Manager, Trustpilot, and
// the pdf.js worker (cdnjs + unpkg fallback). Tighten before switching to enforcing.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://adservice.google.com https://*.google.com https://widget.trustpilot.com https://*.trustpilot.com https://cdnjs.cloudflare.com https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://*.trustpilot.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.google.com https://widget.trustpilot.com https://*.trustpilot.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO & Performance optimizations
  compress: true, // Enable gzip compression
  
  // Enable React strict mode for better error handling
  reactStrictMode: true,
  
  // Power-only features for optimization
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Performance optimizations
  swcMinify: true, // Use SWC for faster minification
  
  // Experimental features for better performance
  experimental: {
    // Tree-shake barrel imports for icon-heavy packages so only the icons actually
    // used are bundled (lucide-react is imported in ~34 files). This is a per-package
    // allow-list — it deliberately does NOT include pdf-lib / pdfjs-dist, because
    // optimizePackageImports breaks their webpack chunk paths
    // (e.g. Cannot find module './vendor-chunks/pdf-lib.js').
    optimizePackageImports: ['lucide-react'],
    // NOTE: optimizeCss requires the optional dependency `critters`.
    // It breaks `next export` if `critters` isn't installed, especially on /404 and /500 prerender.
    // Keep disabled unless you explicitly add `critters` to dependencies.
    optimizeCss: false,
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console logs in production for smaller bundle
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            // Report-Only: observe violations without blocking anything. Promote to a
            // real `Content-Security-Policy` after confirming the live ad/analytics/
            // Trustpilot/pdf-worker flows produce no violations. 'unsafe-inline' is
            // required by the inline GTM bootstrap and JSON-LD until a nonce is wired in.
            key: 'Content-Security-Policy-Report-Only',
            value: CSP_REPORT_ONLY
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      }
    ]
  },
  
  webpack: (config, { isServer }) => {
    // Fix for pdfjs-dist worker in Next.js
    config.resolve.alias.canvas = false;
    
    // Ignore problematic modules that aren't used
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'emitter': false,
        'batch': false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
