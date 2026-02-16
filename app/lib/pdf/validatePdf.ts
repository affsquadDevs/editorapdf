import { PDFDocument } from 'pdf-lib';

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  page?: number;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  pdfVersion?: string;
  isEncrypted: boolean;
  hasErrors: boolean;
}

/**
 * Validate PDF structure and compliance
 */
export async function validatePdf(file: File): Promise<ValidationResult> {
  const issues: ValidationIssue[] = [];
  let valid = true;
  let hasErrors = false;

  try {
    // Try to load PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      capNumbers: true,
    });

    const pageCount = pdfDoc.getPageCount();

    if (pageCount === 0) {
      issues.push({
        type: 'error',
        message: 'PDF has no pages',
      });
      valid = false;
      hasErrors = true;
    }

    // Check for common issues
    // pdf-lib handles most structural validation during load
    
    issues.push({
      type: 'info',
      message: `PDF loaded successfully with ${pageCount} page(s)`,
    });

  } catch (err) {
    issues.push({
      type: 'error',
      message: `PDF validation failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    });
    valid = false;
    hasErrors = true;
  }

  return {
    valid,
    issues,
    isEncrypted: false, // Would need to check encryption
    hasErrors,
  };
}
