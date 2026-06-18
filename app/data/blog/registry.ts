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
import * as howToAddWatermarkToPdfOnline from './posts/how-to-add-watermark-to-pdf-online'
import * as howToAddPageNumbersToPdf from './posts/how-to-add-page-numbers-to-pdf'
import * as howToAddHeadersAndFootersToPdf from './posts/how-to-add-headers-and-footers-to-pdf'
import * as howToCompressPdfOnline from './posts/how-to-compress-pdf-online'
import * as howToRedactPdfOnline from './posts/how-to-redact-pdf-online'
import * as howToSanitizePdf from './posts/how-to-sanitize-pdf'
import * as digitalSignature from './posts/digital-signature'
import * as isItSafeToEditPdfsOnline from './posts/is-it-safe-to-edit-pdfs-online'
import * as howToMergePdfFilesOnline from './posts/how-to-merge-pdf-files-online'
import * as howToSplitPdfFilesOnline from './posts/how-to-split-pdf-files-online'
import * as splitByBookmarks from './posts/split-by-bookmarks'
import * as splitBySize from './posts/split-by-size'
import * as howToInsertDuplicatePagesInPdf from './posts/how-to-insert-duplicate-pages-in-pdf'
import * as whyWeMadeEditorapdfOpenSource from './posts/why-we-made-editorapdf-open-source'
import * as howWeBuiltOpenSourcePdfEditor from './posts/how-we-built-open-source-pdf-editor'
import * as technologyBehindPrivacyFirstPdfEditing from './posts/technology-behind-privacy-first-pdf-editing'
import * as openSourceVsClosedSourcePdfEditors from './posts/open-source-vs-closed-source-pdf-editors'

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
  'how-to-add-watermark-to-pdf-online': howToAddWatermarkToPdfOnline,
  'how-to-add-page-numbers-to-pdf': howToAddPageNumbersToPdf,
  'how-to-add-headers-and-footers-to-pdf': howToAddHeadersAndFootersToPdf,
  'how-to-compress-pdf-online': howToCompressPdfOnline,
  'how-to-redact-pdf-online': howToRedactPdfOnline,
  'how-to-sanitize-pdf': howToSanitizePdf,
  'digital-signature': digitalSignature,
  'is-it-safe-to-edit-pdfs-online': isItSafeToEditPdfsOnline,
  'how-to-merge-pdf-files-online': howToMergePdfFilesOnline,
  'how-to-split-pdf-files-online': howToSplitPdfFilesOnline,
  'split-by-bookmarks': splitByBookmarks,
  'split-by-size': splitBySize,
  'how-to-insert-duplicate-pages-in-pdf': howToInsertDuplicatePagesInPdf,
  'why-we-made-editorapdf-open-source': whyWeMadeEditorapdfOpenSource,
  'how-we-built-open-source-pdf-editor': howWeBuiltOpenSourcePdfEditor,
  'technology-behind-privacy-first-pdf-editing': technologyBehindPrivacyFirstPdfEditing,
  'open-source-vs-closed-source-pdf-editors': openSourceVsClosedSourcePdfEditors,
}

export function getBlogPost(slug: string): BlogPostModule | undefined {
  return BLOG_POST_REGISTRY[slug]
}
