import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, detectPreferredLocale, isSupportedLocale } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_AWARE_PREFIXES = [
	'/',
	'/about',
	'/contact',
	'/tools',
	'/edit',
	'/how-it-works',
	'/blog',
	'/faq',
	'/terms',
	'/privacy-policy',
	'/your-files-stay-private',
] as const;

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const userAgent = req.headers.get('user-agent') ?? '';
	// Avoid locale redirects for crawlers; otherwise indexing can skew to a non-default locale.
	const isBot =
		/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|facebot|twitterbot|linkedinbot|duckduckbot|baiduspider|yandex|yeti|sogou|exabot|semrush|ahrefs|mj12/i.test(
			userAgent
		);

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
	const detected = isBot
		? defaultLocale
		: isSupportedLocale(cookieLocale)
			? cookieLocale
			: detectPreferredLocale(req.headers.get('accept-language'));

	// If URL already has locale prefix, forward with x-locale and x-pathname headers
	// so server components and generateMetadata can access locale + pathname.
	const pathLocale = pathname.split('/')[1];
	const hasLocalePrefix = isSupportedLocale(pathLocale);
	const activeLocale = hasLocalePrefix ? pathLocale : detected;

	// Normalize locale-aware non-prefixed routes into the preferred locale path.
	if (!hasLocalePrefix) {
		const shouldRedirect =
			pathname === '/' ||
			LOCALE_AWARE_PREFIXES.some((prefix) => prefix !== '/' && pathname.startsWith(prefix + '/')) ||
			LOCALE_AWARE_PREFIXES.includes(pathname as (typeof LOCALE_AWARE_PREFIXES)[number]);

		if (shouldRedirect) {
			const redirectPath = pathname === '/' ? `/${detected}` : `/${detected}${pathname}`;
			const redirectUrl = new URL(redirectPath, req.url);
			return NextResponse.redirect(redirectUrl);
		}
	}

	const requestHeaders = new Headers(req.headers);
	requestHeaders.set('x-locale', activeLocale);
	requestHeaders.set('x-pathname', pathname);

	return NextResponse.next({
		request: { headers: requestHeaders },
	});
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
