import type { BlogPostModule } from './types'
import * as howToEditAPdfOnline from './posts/how-to-edit-a-pdf-online'
import * as howToDeletePagesFromPdf from './posts/how-to-delete-pages-from-pdf'
import * as howToExtractPagesFromPdfOnline from './posts/how-to-extract-pages-from-pdf-online'
import * as howToInsertBlankPagesInPdf from './posts/how-to-insert-blank-pages-in-pdf'
import * as howToReorderPdfPages from './posts/how-to-reorder-pdf-pages'
import * as howToReversePdfPageOrder from './posts/how-to-reverse-pdf-page-order'
import * as howToRotatePdfPagesOnline from './posts/how-to-rotate-pdf-pages-online'
import * as pdfToText from './posts/pdf-to-text'
import * as pdfToHtml from './posts/pdf-to-html'
import * as pdfToMarkdown from './posts/pdf-to-markdown'
import * as howToConvertPdfToWordOnline from './posts/how-to-convert-pdf-to-word-online'
import * as howToConvertPdfToExcelOnline from './posts/how-to-convert-pdf-to-excel-online'
import * as howToConvertPdfToCsvOnline from './posts/how-to-convert-pdf-to-csv-online'
import * as howToConvertImagesToPdfOnline from './posts/how-to-convert-images-to-pdf-online'

// slug → post module. Add an entry here (and to MIGRATED_BLOG_SLUGS) when a post is
// migrated to the locale-aware route. Static imports keep every post in the SSG bundle.
export const BLOG_POST_REGISTRY: Record<string, BlogPostModule> = {
  'how-to-edit-a-pdf-online': howToEditAPdfOnline,
  'how-to-delete-pages-from-pdf': howToDeletePagesFromPdf,
  'how-to-extract-pages-from-pdf-online': howToExtractPagesFromPdfOnline,
  'how-to-insert-blank-pages-in-pdf': howToInsertBlankPagesInPdf,
  'how-to-reorder-pdf-pages': howToReorderPdfPages,
  'how-to-reverse-pdf-page-order': howToReversePdfPageOrder,
  'how-to-rotate-pdf-pages-online': howToRotatePdfPagesOnline,
  'pdf-to-text': pdfToText,
  'pdf-to-html': pdfToHtml,
  'pdf-to-markdown': pdfToMarkdown,
  'how-to-convert-pdf-to-word-online': howToConvertPdfToWordOnline,
  'how-to-convert-pdf-to-excel-online': howToConvertPdfToExcelOnline,
  'how-to-convert-pdf-to-csv-online': howToConvertPdfToCsvOnline,
  'how-to-convert-images-to-pdf-online': howToConvertImagesToPdfOnline,
}

export function getBlogPost(slug: string): BlogPostModule | undefined {
  return BLOG_POST_REGISTRY[slug]
}
