'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAppTranslations } from '../i18n/TranslationProvider';
import { supportedLocales, type AppLocale } from '../../i18n/config';

export default function LanguageSwitcher() {
  const { locale, t } = useAppTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const currentSegments = pathname?.split('/').filter(Boolean) ?? [];
  const currentLocale = (currentSegments[0] as AppLocale) ?? locale;
  const rest = currentSegments.slice(1);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as AppLocale;
    const nextPath = `/${nextLocale}/${rest.join('/')}`.replace(/\/+$/, '/');
    router.push(nextPath);
  }

  return (
    <label className="flex items-center gap-2 text-surface-400 text-sm">
      <span className="sr-only">{t('lang.select')}</span>
      <select
        aria-label={t('lang.select')}
        onChange={onChange}
        value={currentLocale}
        className="bg-surface-800/80 border border-surface-600 text-surface-100 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {supportedLocales.map((l) => (
          <option key={l} value={l}>
            {l === 'en' ? t('lang.english') : t('lang.ukrainian')}
          </option>
        ))}
      </select>
    </label>
  );
}

 

