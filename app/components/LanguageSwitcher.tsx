'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppTranslations } from '../i18n/TranslationProvider';
import { supportedLocales, type AppLocale, localeMeta, isSupportedLocale } from '../../i18n/config';

export default function LanguageSwitcher() {
  const { locale, t } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentSegments = pathname?.split('/').filter(Boolean) ?? [];
  const hasLocalePrefix = isSupportedLocale(currentSegments[0]);
  const currentLocale = (hasLocalePrefix ? currentSegments[0] : locale) as AppLocale;
  const rest = hasLocalePrefix ? currentSegments.slice(1) : currentSegments;

  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

  const filteredLocales = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supportedLocales;
    return supportedLocales.filter((code) => {
      const meta = localeMeta[code];
      return (
        code.includes(q) ||
        meta.label.toLowerCase().includes(q) ||
        meta.nativeLabel.toLowerCase().includes(q)
      );
    });
  }, [query]);

  function onSelect(nextLocale: AppLocale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    // Keep exact current page for non-locale routes (e.g. legacy blog slugs).
    if (!hasLocalePrefix) {
      const localeAwarePaths = new Set([
        '/', '/about', '/contact', '/tools', '/edit', '/how-it-works', '/blog', '/faq', '/terms', '/privacy-policy'
      ]);
      const currentPath = pathname || '/';
      if (localeAwarePaths.has(currentPath)) {
        const nextPath = currentPath === '/' ? `/${nextLocale}` : `/${nextLocale}${currentPath}`;
        router.push(nextPath);
      } else {
        router.refresh();
      }
      setIsOpen(false);
      return;
    }

    const nextPath = `/${nextLocale}${rest.length ? `/${rest.join('/')}` : ''}`;
    router.push(nextPath);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={rootRef}>
      {!mounted ? (
        <button
          type="button"
          aria-label={t('lang.select')}
          className="inline-flex items-center gap-2 bg-surface-800/80 border border-surface-600 text-surface-100 rounded-md px-3 py-1.5 text-sm"
        >
          <span>{localeMeta[locale].flag}</span>
          <span className="hidden sm:inline">{localeMeta[locale].nativeLabel}</span>
          <span className="text-surface-400">▾</span>
        </button>
      ) : (
      <button
        type="button"
        aria-label={t('lang.select')}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-2 bg-surface-800/80 border border-surface-600 text-surface-100 rounded-md px-3 py-1.5 text-sm hover:bg-surface-700/80 transition-colors"
      >
        <span>{localeMeta[currentLocale].flag}</span>
        <span className="hidden sm:inline">{localeMeta[currentLocale].nativeLabel}</span>
        <span className="text-surface-400">▾</span>
      </button>
      )}

      {mounted && isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-surface-600 bg-surface-900/95 backdrop-blur shadow-xl z-50">
          <div className="p-2 border-b border-surface-700">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t('lang.select')}...`}
              className="w-full bg-surface-800 border border-surface-600 text-surface-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/60"
            />
          </div>
          <div className="max-h-72 overflow-auto py-1">
            {filteredLocales.map((code) => {
              const meta = localeMeta[code];
              const isActive = code === currentLocale;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onSelect(code)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                    isActive ? 'bg-primary-500/15 text-primary-300' : 'text-surface-200 hover:bg-surface-800'
                  }`}
                >
                  <span>{meta.flag}</span>
                  <span className="flex-1">{meta.nativeLabel}</span>
                  <span className="text-xs text-surface-400 uppercase">{code}</span>
                </button>
              );
            })}
            {filteredLocales.length === 0 && (
              <p className="px-3 py-3 text-sm text-surface-400">{tr('lang.noResults', 'No results found')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

 

