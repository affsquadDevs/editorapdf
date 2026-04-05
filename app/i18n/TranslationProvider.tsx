'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { AppLocale } from '../../i18n/config';
import { normalizeLocale, supportedLocales } from '../../i18n/config';

type Messages = Record<string, string>;

type TranslationContextValue = {
	locale: AppLocale;
	messages: Messages;
	t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
	locale,
	messages,
	children
}: {
	locale: AppLocale;
	messages: Messages;
	children: React.ReactNode;
}) {
	const value = useMemo<TranslationContextValue>(() => {
		return {
			locale,
			messages,
			t: (key: string) => messages[key] ?? key
		};
	}, [locale, messages]);

	return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useAppTranslations() {
	const ctx = useContext(TranslationContext);
	if (!ctx) {
		// When provider isn't mounted (e.g., during transient states),
		// infer locale from the URL to avoid hydration mismatches.
		let inferred: AppLocale = 'en';
		if (typeof window !== 'undefined') {
			const segs = window.location.pathname.split('/').filter(Boolean);
			const first = segs[0];
			const n = normalizeLocale(first);
			if (supportedLocales.includes(n)) inferred = n;
		}
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const messages = (inferred === 'uk'
			? require('../../i18n/locales/uk.json')
			: require('../../i18n/locales/en.json')) as Record<string, string>;
		return {
			locale: inferred,
			messages,
			t: (key: string) => messages[key] ?? key,
		};
	}
	return ctx;
}

