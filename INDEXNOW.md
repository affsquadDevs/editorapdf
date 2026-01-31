# IndexNow Implementation

This project implements the IndexNow protocol for real-time URL indexing with Bing and other compatible search engines.

## What is IndexNow?

IndexNow is an open protocol that allows websites to instantly notify search engines when content is created, updated, or deleted. This enables faster indexing compared to waiting for search engines to crawl your site.

## Implementation Details

### Files Created

1. **Key File**: `public/d6a52731014140d19cdd5a2b8bba4abb.txt`
   - Must be accessible at: `https://editorapdf.com/d6a52731014140d19cdd5a2b8bba4abb.txt`
   - Contains the IndexNow API key for verification

2. **Utility Library**: `app/lib/indexnow.ts`
   - Core functions for submitting URLs to IndexNow
   - Supports multiple search engine endpoints (Bing, Yandex, etc.)

3. **API Route**: `app/api/indexnow/route.ts`
   - REST API endpoint for submitting URLs programmatically
   - POST `/api/indexnow` - Submit URLs
   - GET `/api/indexnow` - Get API information

4. **Scripts**: 
   - `scripts/submit-indexnow.js` - Command-line script for bulk submission
   - `scripts/submit-indexnow.ts` - TypeScript version (optional)

## Usage

### 1. Manual Submission via API

Submit a single URL:
```bash
curl -X POST https://editorapdf.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"url": "https://editorapdf.com/new-page"}'
```

Submit multiple URLs:
```bash
curl -X POST https://editorapdf.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://editorapdf.com/page1", "https://editorapdf.com/page2"]}'
```

### 2. Command-Line Script

Submit all sitemap URLs:
```bash
npm run submit-indexnow
```

Submit custom URLs:
```bash
node scripts/submit-indexnow.js https://editorapdf.com/page1 https://editorapdf.com/page2
```

### 3. Programmatic Usage

In your code:
```typescript
import { submitUrlToIndexNow, submitToIndexNow } from '@/app/lib/indexnow';

// Submit a single URL
await submitUrlToIndexNow('https://editorapdf.com/new-page');

// Submit multiple URLs
await submitToIndexNow([
  'https://editorapdf.com/page1',
  'https://editorapdf.com/page2',
]);

// Submit entire sitemap
import { submitSitemapToIndexNow } from '@/app/lib/indexnow';
await submitSitemapToIndexNow();
```

## When to Use IndexNow

Submit URLs to IndexNow when:
- ✅ New pages are published
- ✅ Existing pages are updated with significant content changes
- ✅ Pages are deleted (submit the URL to notify search engines)
- ✅ After deploying a new version of the site
- ✅ After adding new blog posts or content

## API Endpoints

### POST /api/indexnow

Submit URLs for indexing.

**Request Body:**
```json
{
  "url": "https://editorapdf.com/page"
}
```
or
```json
{
  "urls": [
    "https://editorapdf.com/page1",
    "https://editorapdf.com/page2"
  ]
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully submitted 2 URL(s) to IndexNow",
  "urls": ["https://editorapdf.com/page1", "https://editorapdf.com/page2"]
}
```

**Response (Error):**
```json
{
  "error": "Invalid request. Provide either 'url' (string) or 'urls' (array)"
}
```

### GET /api/indexnow

Get information about the IndexNow API endpoint.

## Verification

To verify your IndexNow setup:

1. **Check Key File**: Visit `https://editorapdf.com/d6a52731014140d19cdd5a2b8bba4abb.txt`
   - Should return: `d6a52731014140d19cdd5a2b8bba4abb`

2. **Test API**: 
   ```bash
   curl https://editorapdf.com/api/indexnow
   ```

3. **Submit Test URL**:
   ```bash
   curl -X POST https://editorapdf.com/api/indexnow \
     -H "Content-Type: application/json" \
     -d '{"url": "https://editorapdf.com"}'
   ```

## Supported Search Engines

IndexNow is supported by:
- ✅ Bing
- ✅ Yandex
- ✅ Seznam.cz
- ✅ Naver

More search engines are expected to adopt the protocol.

## Best Practices

1. **Don't Over-Submit**: Only submit URLs when content actually changes
2. **Batch Submissions**: Submit multiple URLs in one request when possible
3. **Monitor Results**: Check Bing Webmaster Tools to see indexing status
4. **Error Handling**: The implementation includes retry logic across multiple endpoints

## Troubleshooting

### Key File Not Accessible

Ensure the key file is in the `public/` directory and accessible at:
`https://yourdomain.com/d6a52731014140d19cdd5a2b8bba4abb.txt`

### API Returns 400 Error

- Verify URLs are from the correct domain (editorapdf.com)
- Ensure URLs include the protocol (https://)
- Check that the key file is accessible

### URLs Not Being Indexed

- IndexNow notifies search engines, but indexing is not guaranteed
- Check Bing Webmaster Tools for indexing status
- Ensure your site is verified in Bing Webmaster Tools
- Allow 24-48 hours for indexing to occur

## References

- [IndexNow Protocol](https://www.indexnow.org/)
- [Bing IndexNow Documentation](https://www.bing.com/indexnow)
- [IndexNow API Specification](https://www.indexnow.org/API)
