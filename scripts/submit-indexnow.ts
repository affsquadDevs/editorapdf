#!/usr/bin/env tsx
/**
 * Script to submit sitemap URLs to IndexNow
 * Run this after deploying or updating content
 * 
 * Usage:
 *   npm run submit-indexnow
 *   or
 *   npx tsx scripts/submit-indexnow.ts
 */

import { submitSitemapToIndexNow, submitToIndexNow } from '../app/lib/indexnow';

const SITE_URL = 'https://editorapdf.com';

async function main() {
  console.log('🚀 Submitting sitemap to IndexNow...\n');

  const sitemapUrls = [
    `${SITE_URL}`,
    `${SITE_URL}/how-it-works`,
    `${SITE_URL}/about`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy-policy`,
    `${SITE_URL}/terms`,
  ];

  console.log(`📄 URLs to submit (${sitemapUrls.length}):`);
  sitemapUrls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  console.log('');

  try {
    const success = await submitSitemapToIndexNow();

    if (success) {
      console.log('\n✅ Successfully submitted all URLs to IndexNow!');
      console.log('   Search engines will index these URLs shortly.');
      process.exit(0);
    } else {
      console.error('\n❌ Failed to submit URLs to IndexNow.');
      console.error('   Check the error messages above for details.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error submitting to IndexNow:', error);
    process.exit(1);
  }
}

// Allow submitting custom URLs via command line arguments
const customUrls = process.argv.slice(2);
if (customUrls.length > 0) {
  console.log('🚀 Submitting custom URLs to IndexNow...\n');
  console.log(`📄 URLs to submit (${customUrls.length}):`);
  customUrls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  console.log('');

  submitToIndexNow(customUrls)
    .then((success) => {
      if (success) {
        console.log('\n✅ Successfully submitted URLs to IndexNow!');
        process.exit(0);
      } else {
        console.error('\n❌ Failed to submit URLs to IndexNow.');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('\n❌ Error:', error);
      process.exit(1);
    });
} else {
  main();
}
