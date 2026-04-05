import { NextRequest, NextResponse } from 'next/server';
import { detectPreferredLocale, supportedLocales, defaultLocale, normalizeLocale } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Skip public files and API routes
	if (
		PUBLIC_FILE.test(pathname) ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/og') ||
		pathname.startsWith('/robots') ||
		pathname.startsWith('/sitemap')
	) {
		return;
	}

	// If path already has a supported locale, continue
	const pathLocale = pathname.split('/')[1];
	if (supportedLocales.includes(normalizeLocale(pathLocale))) {
		return;
	}

	// Otherwise, redirect to detected locale with same path
	const detected = detectPreferredLocale(req.headers.get('accept-language'));
	const redirectUrl = new URL(`/${detected}${pathname}`, req.url);
	return NextResponse.redirect(redirectUrl);
}

export const config = {
	matcher: [
		/*
		 * Match all pathnames except for:
		 * - /_next (Next.js internals)
		 * - /api (API routes)
		 * - /static (static files)
		 * - all files with an extension (e.g. .png, .jpg, .css, .js)
		 */
		'/((?!api|_next|static|.*\\..*).*)'
	]
};

