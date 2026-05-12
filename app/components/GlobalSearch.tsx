'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, X, FileText, Wrench, ArrowRight } from 'lucide-react';
import { allTools } from './ToolsPanel';
import { BLOG_POSTS } from '../data/searchIndex';
import { useAppTranslations } from '../i18n/TranslationProvider';
import { isSupportedLocale } from '../../i18n/config';
import type { AppLocale } from '../../i18n/config';

const MAX_RESULTS_PER_SECTION = 5;

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary-500/25 text-primary-300 rounded-[2px] not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function GlobalSearch() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useAppTranslations();

  const segs = pathname?.split('/').filter(Boolean) ?? [];
  const firstSeg = segs[0] as AppLocale | undefined;
  const currentLocale: AppLocale = firstSeg && isSupportedLocale(firstSeg) ? firstSeg : locale;
  const withLocale = useCallback((path: string) => `/${currentLocale}${path}`, [currentLocale]);

  // Open / close
  const openModal = useCallback(() => { setOpen(true); setQuery(''); setCursor(-1); }, []);
  const closeModal = useCallback(() => { setOpen(false); setQuery(''); setCursor(-1); }, []);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        if (!open) { setQuery(''); setCursor(-1); }
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeModal]);

  // Autofocus input when modal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const q = query.trim().toLowerCase();

  const matchedTools = useMemo(() => {
    if (!q) return [];
    return allTools.filter(
      t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    ).slice(0, MAX_RESULTS_PER_SECTION);
  }, [q]);

  const matchedPosts = useMemo(() => {
    if (!q) return [];
    return BLOG_POSTS.filter(
      p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, MAX_RESULTS_PER_SECTION);
  }, [q]);

  const flatResults: { type: 'tool' | 'post'; href: string; title: string; description: string }[] = useMemo(() => [
    ...matchedTools.map(t => ({ type: 'tool' as const, href: withLocale(`/tools/${t.id}`), title: t.title, description: t.description })),
    ...matchedPosts.map(p => ({ type: 'post' as const, href: `/blog/${p.slug}`, title: p.title, description: p.description })),
  ], [matchedTools, matchedPosts, withLocale]);

  // Keyboard navigation inside results
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor(prev => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && cursor >= 0 && flatResults[cursor]) {
      e.preventDefault();
      router.push(flatResults[cursor].href);
      closeModal();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (cursor < 0 || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const isEmpty = q && matchedTools.length === 0 && matchedPosts.length === 0;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openModal}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/60 border border-surface-700/50 text-surface-400 hover:text-surface-200 hover:border-surface-600 transition-all duration-150 text-sm"
        aria-label="Search tools and articles (⌘K)"
        type="button"
      >
        <Search size={14} strokeWidth={2} />
        <span className="text-xs">Search</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1 py-0.5 text-[10px] font-mono text-surface-500 bg-surface-700/50 rounded border border-surface-600/50">
          ⌘K
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={openModal}
        className="flex md:hidden p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
        aria-label="Search"
        type="button"
      >
        <Search size={18} strokeWidth={2} />
      </button>

      {/* Modal — portal avoids header .glass (backdrop-filter) breaking position:fixed */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex min-h-dvh w-full items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div
              className="absolute inset-0 bg-surface-950/85 backdrop-blur-sm"
              aria-hidden="true"
              onClick={closeModal}
            />

            <div
              className="relative z-10 flex max-h-[min(85dvh,40rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-surface-700/60 bg-surface-900 shadow-2xl animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
            {/* Input row */}
            <div className="flex shrink-0 items-center gap-3 border-b border-surface-800/60 px-4 py-3.5">
              <Search size={18} strokeWidth={2} className="text-surface-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setCursor(-1); }}
                onKeyDown={handleKeyDown}
                placeholder="Search tools and articles…"
                className="flex-1 bg-transparent text-white placeholder-surface-500 text-sm outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setCursor(-1); inputRef.current?.focus(); }}
                  className="text-surface-500 hover:text-surface-300 transition-colors"
                  type="button"
                  aria-label="Clear"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              )}
              <button
                onClick={closeModal}
                className="text-xs text-surface-500 hover:text-surface-300 transition-colors px-1.5 py-0.5 bg-surface-800/60 border border-surface-700/50 rounded"
                type="button"
                aria-label="Close search"
              >
                Esc
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain max-h-[min(60dvh,28rem)]">
              {!q && (
                <div className="px-4 py-8 text-center">
                  <Search size={32} strokeWidth={1.5} className="text-surface-600 mx-auto mb-3" />
                  <p className="text-surface-400 text-sm">Type to search across 45 tools and 33 articles</p>
                  <p className="text-surface-600 text-xs mt-1">Try "compress", "signature", "privacy", "word"…</p>
                </div>
              )}

              {isEmpty && (
                <div className="px-4 py-8 text-center">
                  <p className="text-surface-400 text-sm">No results for <span className="text-white">"{query}"</span></p>
                  <Link
                    href={withLocale('/tools')}
                    onClick={closeModal}
                    className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-xs mt-3 transition-colors"
                  >
                    Browse all tools
                    <ArrowRight size={12} strokeWidth={2} />
                  </Link>
                </div>
              )}

              {matchedTools.length > 0 && (
                <section className="py-2">
                  <div className="px-4 py-1.5 flex items-center gap-2">
                    <Wrench size={12} strokeWidth={2} className="text-surface-500" />
                    <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider">PDF Tools</span>
                  </div>
                  {matchedTools.map((tool, i) => {
                    const globalIdx = i;
                    const isActive = cursor === globalIdx;
                    return (
                      <Link
                        key={tool.id}
                        href={withLocale(`/tools/${tool.id}`)}
                        onClick={closeModal}
                        data-active={isActive}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer ${isActive ? 'bg-primary-500/10' : 'hover:bg-surface-800/50'}`}
                        onMouseEnter={() => setCursor(globalIdx)}
                      >
                        <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-surface-800 border border-surface-700/50 flex items-center justify-center">
                          <Wrench size={14} strokeWidth={1.75} className="text-primary-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white truncate">{highlight(tool.title, query)}</p>
                          <p className="text-xs text-surface-400 mt-0.5 line-clamp-1">{highlight(tool.description, query)}</p>
                        </div>
                        <ArrowRight size={14} strokeWidth={2} className={`flex-shrink-0 mt-1 transition-colors ${isActive ? 'text-primary-400' : 'text-surface-600'}`} />
                      </Link>
                    );
                  })}
                </section>
              )}

              {matchedPosts.length > 0 && (
                <section className={`py-2 ${matchedTools.length > 0 ? 'border-t border-surface-800/60' : ''}`}>
                  <div className="px-4 py-1.5 flex items-center gap-2">
                    <FileText size={12} strokeWidth={2} className="text-surface-500" />
                    <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider">Blog Articles</span>
                  </div>
                  {matchedPosts.map((post, i) => {
                    const globalIdx = matchedTools.length + i;
                    const isActive = cursor === globalIdx;
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={closeModal}
                        data-active={isActive}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer ${isActive ? 'bg-primary-500/10' : 'hover:bg-surface-800/50'}`}
                        onMouseEnter={() => setCursor(globalIdx)}
                      >
                        <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-surface-800 border border-surface-700/50 flex items-center justify-center">
                          <FileText size={14} strokeWidth={1.75} className="text-accent-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white line-clamp-1">{highlight(post.title, query)}</p>
                          <p className="text-xs text-surface-400 mt-0.5 line-clamp-1">{highlight(post.description, query)}</p>
                        </div>
                        <ArrowRight size={14} strokeWidth={2} className={`flex-shrink-0 mt-1 transition-colors ${isActive ? 'text-primary-400' : 'text-surface-600'}`} />
                      </Link>
                    );
                  })}
                </section>
              )}

              {/* Footer hint */}
              {flatResults.length > 0 && (
                <div className="px-4 py-2 border-t border-surface-800/60 flex items-center gap-4 text-[11px] text-surface-600">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-surface-800 border border-surface-700 rounded text-[10px]">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-surface-800 border border-surface-700 rounded text-[10px]">↵</kbd> open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-surface-800 border border-surface-700 rounded text-[10px]">Esc</kbd> close
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>,
          document.body
        )}
    </>
  );
}
