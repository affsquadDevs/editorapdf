/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for pdfjs-dist worker in Next.js
    config.resolve.alias.canvas = false;
    return config;
  },
}

module.exports = nextConfig
