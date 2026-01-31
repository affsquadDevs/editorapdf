/**
 * IndexNow API utility for real-time URL indexing
 * Supports Bing, Yandex, and other IndexNow-compatible search engines
 */

const INDEXNOW_API_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
] as const;

const INDEXNOW_KEY = 'd6a52731014140d19cdd5a2b8bba4abb';
const SITE_URL = 'https://editorapdf.com';

export interface IndexNowRequest {
  host: string;
  key: string;
  urlList: string[];
  keyLocation?: string;
}

/**
 * Submit URLs to IndexNow API for real-time indexing
 * @param urls - Array of full URLs to submit (must include protocol and domain)
 * @returns Promise that resolves to true if at least one submission succeeded
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) {
    console.warn('IndexNow: No URLs provided for submission');
    return false;
  }

  // Validate URLs
  const validUrls = urls.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  });

  if (validUrls.length === 0) {
    console.error('IndexNow: No valid URLs provided');
    return false;
  }

  const requestBody: IndexNowRequest = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    urlList: validUrls,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  };

  // Try each endpoint until one succeeds
  const errors: Error[] = [];

  for (const endpoint of INDEXNOW_API_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // IndexNow returns 200 for success, 202 for accepted, 400 for bad request
      if (response.ok || response.status === 202) {
        console.log(`IndexNow: Successfully submitted ${validUrls.length} URL(s) to ${endpoint}`);
        return true;
      } else if (response.status === 400) {
        const errorText = await response.text();
        console.error(`IndexNow: Bad request to ${endpoint}:`, errorText);
        errors.push(new Error(`Bad request: ${errorText}`));
        // Don't retry other endpoints for bad requests
        break;
      } else {
        console.warn(`IndexNow: Unexpected status ${response.status} from ${endpoint}`);
        errors.push(new Error(`Status ${response.status}`));
      }
    } catch (error) {
      console.error(`IndexNow: Error submitting to ${endpoint}:`, error);
      errors.push(error instanceof Error ? error : new Error(String(error)));
    }
  }

  // If all endpoints failed, log the errors
  if (errors.length > 0) {
    console.error('IndexNow: All submission attempts failed:', errors);
  }

  return false;
}

/**
 * Submit a single URL to IndexNow
 * @param url - Full URL to submit
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  return submitToIndexNow([url]);
}

/**
 * Submit multiple URLs from sitemap to IndexNow
 * Useful for bulk submission after site updates
 */
export async function submitSitemapToIndexNow(): Promise<boolean> {
  const sitemapUrls = [
    `${SITE_URL}`,
    `${SITE_URL}/how-it-works`,
    `${SITE_URL}/about`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy-policy`,
    `${SITE_URL}/terms`,
  ];

  return submitToIndexNow(sitemapUrls);
}
