import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { AppLocale } from '../../../i18n/config'

// Contract every migrated blog post module implements. The dynamic
// `app/[locale]/blog/[slug]` route renders the schemas as JSON-LD <script> tags and
// the Article body, both parameterized by the active locale. English content is copied
// verbatim from the legacy page so `/en/...` renders unchanged.
export interface BlogPostModule {
  meta(locale: AppLocale): Metadata
  schemas(locale: AppLocale): Record<string, unknown>[]
  Article(props: { locale: AppLocale }): ReactNode
}
