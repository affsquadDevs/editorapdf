'use client'

import Link from 'next/link'
import { useAppTranslations } from './i18n/TranslationProvider'

export default function NotFound() {
  const { t } = useAppTranslations()
  const tr = (key: string, fallback: string) => (t(key) === key ? fallback : t(key))

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-6">
          {tr('notFound.title', 'Page not found')}
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          {tr('notFound.home', 'Go Home')}
        </Link>
      </div>
    </div>
  )
}
