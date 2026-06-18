import { getMessages } from '../i18n/messages'
import type { AppLocale } from '../../i18n/config'

// Visible author + publication date for blog posts, rendered just below the hero title.
// Mirrors the BlogPosting JSON-LD (author "EditoraPDF Team" + datePublished) so the
// authorship/date Google reads from the schema is also visible on the page (E-E-A-T).
const BCP47: Record<AppLocale, string> = {
  en: 'en-US',
  uk: 'uk-UA',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
}

export default function BlogByline({
  locale,
  datePublished,
}: {
  locale: AppLocale
  datePublished: string
}) {
  const m = getMessages(locale)
  const by = m['blog.bylineBy'] && m['blog.bylineBy'].trim() ? m['blog.bylineBy'] : 'By'

  let formatted = datePublished
  try {
    formatted = new Intl.DateTimeFormat(BCP47[locale] ?? 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${datePublished}T00:00:00`))
  } catch {
    /* keep the raw ISO date if it can't be parsed */
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-sm text-surface-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
      <span>
        {by} <span className="font-semibold text-white">EditoraPDF Team</span>
      </span>
      <span aria-hidden="true" className="text-surface-400">
        ·
      </span>
      <time dateTime={datePublished}>{formatted}</time>
    </div>
  )
}
