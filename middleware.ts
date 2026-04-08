import { NextRequest, NextResponse } from 'next/server';
import { detectPreferredLocale, isSupportedLocale } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_AWARE_PATHS = new Set([
	'/',
	'/about',
	'/contact',
	'/tools',
	'/edit',
	'/how-it-works',
	'/blog',
	'/faq',
	'/terms',
	'/privacy-policy'
]);

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

	const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
	const detected = isSupportedLocale(cookieLocale)
		? cookieLocale
		: detectPreferredLocale(req.headers.get('accept-language'));

	// Normalize locale-aware non-prefixed routes into the preferred locale path.
	if (LOCALE_AWARE_PATHS.has(pathname)) {
		const redirectPath = pathname === '/' ? `/${detected}` : `/${detected}${pathname}`;
		const redirectUrl = new URL(redirectPath, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	// If URL already has locale prefix, continue.
	const pathLocale = pathname.split('/')[1];
	if (isSupportedLocale(pathLocale)) {
		return NextResponse.next();
	}

	return NextResponse.next();
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

