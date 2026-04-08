export const supportedLocales = [
	'en', 'uk', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'tr', 'nl',
	'sv', 'cs', 'ro', 'hu', 'el', 'he', 'ar', 'hi', 'id', 'ja', 'ko', 'zh'
] as const;
export type AppLocale = typeof supportedLocales[number];

export const defaultLocale: AppLocale = 'en';

export const localeMeta: Record<AppLocale, { label: string; nativeLabel: string; flag: string }> = {
	en: { label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
	uk: { label: 'Ukrainian', nativeLabel: 'Українська', flag: '🇺🇦' },
	es: { label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
	fr: { label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
	de: { label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
	it: { label: 'Italian', nativeLabel: 'Italiano', flag: '🇮🇹' },
	pt: { label: 'Portuguese', nativeLabel: 'Português', flag: '🇵🇹' },
	pl: { label: 'Polish', nativeLabel: 'Polski', flag: '🇵🇱' },
	tr: { label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷' },
	nl: { label: 'Dutch', nativeLabel: 'Nederlands', flag: '🇳🇱' },
	sv: { label: 'Swedish', nativeLabel: 'Svenska', flag: '🇸🇪' },
	cs: { label: 'Czech', nativeLabel: 'Čeština', flag: '🇨🇿' },
	ro: { label: 'Romanian', nativeLabel: 'Română', flag: '🇷🇴' },
	hu: { label: 'Hungarian', nativeLabel: 'Magyar', flag: '🇭🇺' },
	el: { label: 'Greek', nativeLabel: 'Ελληνικά', flag: '🇬🇷' },
	he: { label: 'Hebrew', nativeLabel: 'עברית', flag: '🇮🇱' },
	ar: { label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
	hi: { label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
	id: { label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', flag: '🇮🇩' },
	ja: { label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
	ko: { label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷' },
	zh: { label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
};

export function isSupportedLocale(input?: string | null): input is AppLocale {
	if (!input) return false;
	return (supportedLocales as readonly string[]).includes(input.toLowerCase());
}

export function normalizeLocale(input?: string | null): AppLocale {
	if (!input) return defaultLocale;
	const lower = input.toLowerCase().trim();
	const base = lower.split('-')[0];
	if (isSupportedLocale(base)) return base;
	// Common alias
	if (base === 'ua') return 'uk';
	return defaultLocale;
}

export function detectPreferredLocale(acceptLanguageHeader?: string | null): AppLocale {
	if (!acceptLanguageHeader) return defaultLocale;
	// Parse simple q-weighted header: "uk-UA,uk;q=0.9,en;q=0.8"
	const parts = acceptLanguageHeader.split(',').map((p) => p.trim());
	for (const part of parts) {
		const code = part.split(';')[0]?.trim();
		const normalized = normalizeLocale(code);
		if (isSupportedLocale(normalized)) return normalized;
	}
	return defaultLocale;
}

