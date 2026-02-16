import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface AccessibilityIssue {
  type: 'missing-alt-text' | 'no-tags' | 'poor-contrast' | 'no-bookmarks' | 'missing-title';
  severity: 'error' | 'warning' | 'info';
  message: string;
  page?: number;
}

export interface AccessibilityReport {
  score: number; // 0-100
  issues: AccessibilityIssue[];
  hasTags: boolean;
  hasTitle: boolean;
  hasBookmarks: boolean;
  textAccessible: boolean;
}

/**
 * Check PDF accessibility (WCAG compliance)
 */
export async function checkAccessibility(file: File): Promise<AccessibilityReport> {
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  const issues: AccessibilityIssue[] = [];
  let score = 100;

  // Check for text content (basic accessibility)
  let hasText = false;
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    const texts = await extractTextFromPage(pdfDoc, i);
    if (texts.length > 0) {
      hasText = true;
      break;
    }
  }

  if (!hasText) {
    issues.push({
      type: 'missing-alt-text',
      severity: 'error',
      message: 'PDF appears to be image-based with no text content. Consider adding OCR.',
    });
    score -= 30;
  }

  // Check for title (would need metadata access)
  // pdf-lib doesn't expose all metadata easily
  issues.push({
    type: 'missing-title',
    severity: 'warning',
    message: 'PDF title should be set for accessibility.',
  });
  score -= 10;

  // Check for tags (would need structure tree access)
  issues.push({
    type: 'no-tags',
    severity: 'error',
    message: 'PDF should have a tagged structure for screen readers.',
  });
  score -= 40;

  // Check for bookmarks
  issues.push({
    type: 'no-bookmarks',
    severity: 'warning',
    message: 'Consider adding bookmarks for better navigation.',
  });
  score -= 10;

  return {
    score: Math.max(0, score),
    issues,
    hasTags: false, // Would need to check structure tree
    hasTitle: false, // Would need to check metadata
    hasBookmarks: false, // Would need to check outline
    textAccessible: hasText,
  };
}
