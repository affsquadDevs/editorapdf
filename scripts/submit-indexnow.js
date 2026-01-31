#!/usr/bin/env node
/**
 * Script to submit sitemap URLs to IndexNow
 * Run this after deploying or updating content
 * 
 * Usage:
 *   npm run submit-indexnow
 *   node scripts/submit-indexnow.js
 */

const INDEXNOW_KEY = 'd6a52731014140d19cdd5a2b8bba4abb';
const SITE_URL = 'https://editorapdf.com';

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
];

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.warn('IndexNow: No URLs provided for submission');
    return false;
  }

  const requestBody = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    urlList: urls,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  };

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok || response.status === 202) {
        console.log(`✅ Successfully submitted ${urls.length} URL(s) to ${endpoint}`);
        return true;
      } else {
        console.warn(`⚠️  Status ${response.status} from ${endpoint}`);
      }
    } catch (error) {
      console.error(`❌ Error submitting to ${endpoint}:`, error.message);
    }
  }

  return false;
}

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
    const success = await submitToIndexNow(sitemapUrls);

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
