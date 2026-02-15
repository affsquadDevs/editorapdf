'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'PDF Tools', isNew: true },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Hamburger Button - Visible only on mobile */}
      <button
        onClick={toggleMenu}
        className="flex md:hidden p-2.5 rounded-lg hover:bg-surface-700/50 active:bg-surface-700/70 transition-colors flex-shrink-0 relative z-[100] touch-manipulation min-w-[44px] min-h-[44px] items-center justify-center bg-surface-700/40 border border-surface-600/50 shadow-sm"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        type="button"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Menu - Right side, full height, highest z-index */}
      <aside
        className={`
          fixed top-0 right-0 h-screen w-64 max-w-[85vw] 
          bg-surface-900 border-l border-surface-700/50
          z-[9999] md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          shadow-2xl
        `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-surface-700/50">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.svg"
                alt="EditoraPDF Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-surface-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-surface-300 hover:text-white hover:bg-surface-800/50 transition-colors font-medium"
                  >
                    {link.label}
                    {(link as any).isNew && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t border-surface-700/50">
            <Link
              href="/edit"
              onClick={closeMenu}
              className="btn-primary btn-md w-full justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit PDF
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
