'use client';

import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { PenSquare } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useAppTranslations } from '../i18n/TranslationProvider';
import { usePathname } from 'next/navigation';
import type { AppLocale } from '../../i18n/config';
import { isSupportedLocale } from '../../i18n/config';

interface HeaderProps {
  showCloseButton?: boolean;
  onClose?: () => void;
  closeButtonLabel?: string;
}

export default function Header({ showCloseButton = false, onClose, closeButtonLabel = 'Close' }: HeaderProps) {
  const { t, locale } = useAppTranslations();
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const pathname = usePathname();
  const segs = pathname?.split('/').filter(Boolean) ?? [];
  const firstSeg = segs[0] as AppLocale | undefined;
  const currentLocale: AppLocale = firstSeg && isSupportedLocale(firstSeg) ? firstSeg : locale;
  const withLocale = (path: string) => `/${currentLocale}${path}`;
  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-700/50" role="banner">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <MobileMenu />
            
            {/* Logo & Brand */}
            <Link href={withLocale('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/logo.svg" 
                alt={tr('brand.logoAlt', 'EditoraPDF Logo')} 
                width={120} 
                height={40} 
                className="h-10 w-auto"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label={tr('nav.mainAria', 'Main navigation')}>
            <Link href={withLocale('/')} className="nav-link">
              {t('nav.home')}
            </Link>
            <Link href={withLocale('/tools')} className="nav-link flex items-center gap-1.5">
              {t('nav.tools')}
              <span className="px-1.5 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-[10px] font-bold uppercase tracking-wider">
                {tr('common.new', 'New')}
              </span>
            </Link>
            <Link href={withLocale('/how-it-works')} className="nav-link">
              {t('nav.how')}
            </Link>
            <Link href={withLocale('/about')} className="nav-link">
              {t('nav.about')}
            </Link>
            <Link href={withLocale('/blog')} className="nav-link">
              {t('nav.blog')}
            </Link>
            <Link href={withLocale('/contact')} className="nav-link">
              {t('nav.contact')}
            </Link>
            <a 
              href="https://github.com/affsquadDevs/editorapdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-1.5"
              aria-label={tr('nav.githubAria', 'View source code on GitHub')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t('nav.github')}
            </a>
            <div className="pl-3 ml-2 border-l border-surface-700/60">
              <LanguageSwitcher />
            </div>
          </nav>
          
          {/* CTA Button or Close Button */}
          {showCloseButton && onClose ? (
            <button
              onClick={onClose}
              className="btn-ghost btn-md group"
              aria-label={closeButtonLabel}
            >
              <svg className="w-5 h-5 text-surface-400 group-hover:text-error-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-surface-300 group-hover:text-surface-100">{closeButtonLabel}</span>
            </button>
          ) : (
            <Link
              href={withLocale('/edit')}
              className="btn-primary btn-md hidden sm:flex"
            >
              <PenSquare size={20} strokeWidth={2} />
              {t('cta.edit')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
