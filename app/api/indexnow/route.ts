import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/app/lib/indexnow';

/**
 * IndexNow API Route
 * POST /api/indexnow
 * 
 * Submits URLs to IndexNow for real-time search engine indexing
 * 
 * Request body (JSON):
 * {
 *   "urls": ["https://editorapdf.com/page1", "https://editorapdf.com/page2"]
 * }
 * 
 * Or single URL:
 * {
 *   "url": "https://editorapdf.com/page1"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    let urls: string[] = [];
    
    // Support both single URL and array of URLs
    if (body.url) {
      urls = [body.url];
    } else if (body.urls && Array.isArray(body.urls)) {
      urls = body.urls;
    } else {
      return NextResponse.json(
        { 
          error: 'Invalid request. Provide either "url" (string) or "urls" (array)' 
        },
        { status: 400 }
      );
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'No URLs provided' },
        { status: 400 }
      );
    }

    // Validate URLs are from the same domain
    const siteUrl = 'https://editorapdf.com';
    const invalidUrls = urls.filter(url => {
      try {
        const parsed = new URL(url);
        return !parsed.hostname.includes('editorapdf.com');
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { 
          error: 'All URLs must belong to editorapdf.com domain',
          invalidUrls 
        },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const success = await submitToIndexNow(urls);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URL(s) to IndexNow`,
        urls,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit URLs to IndexNow. Check server logs for details.',
          urls,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Returns information about the IndexNow API endpoint
 */
export async function GET() {
  return NextResponse.json({
    name: 'IndexNow API',
    description: 'Submit URLs to IndexNow for real-time search engine indexing',
    endpoints: {
      POST: '/api/indexnow',
      body: {
        url: 'string (single URL)',
        urls: 'array (multiple URLs)',
      },
    },
    example: {
      single: {
        url: 'https://editorapdf.com/page',
      },
      multiple: {
        urls: [
          'https://editorapdf.com/page1',
          'https://editorapdf.com/page2',
        ],
      },
    },
  });
}
