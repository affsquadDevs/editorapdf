export const locales = ['en', 'es', 'uk', 'zh-CN', 'hi', 'ar', 'fr', 'pt', 'de', 'ja', 'id'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export function isRtl(locale: string): boolean {
	return locale.startsWith('ar')
}

