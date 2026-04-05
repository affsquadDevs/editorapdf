export const supportedLocales = ['en', 'uk'] as const;
export type AppLocale = typeof supportedLocales[number];

export const defaultLocale: AppLocale = 'en';

export function normalizeLocale(input?: string | null): AppLocale {
	if (!input) return defaultLocale;
	const lower = input.toLowerCase();
	// Map common variants to supported locales
	if (lower.startsWith('uk') || lower.startsWith('uk-UA'.toLowerCase()) || lower.startsWith('ua')) {
		return 'uk';
	}
	if (lower.startsWith('en')) {
		return 'en';
	}
	return defaultLocale;
}

export function detectPreferredLocale(acceptLanguageHeader?: string | null): AppLocale {
	if (!acceptLanguageHeader) return defaultLocale;
	// Parse simple q-weighted header: "uk-UA,uk;q=0.9,en;q=0.8"
	const parts = acceptLanguageHeader.split(',').map((p) => p.trim());
	for (const part of parts) {
		const code = part.split(';')[0]?.trim();
		const normalized = normalizeLocale(code);
		if (supportedLocales.includes(normalized)) {
			return normalized;
		}
	}
	return defaultLocale;
}

