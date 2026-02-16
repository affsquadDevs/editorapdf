import { PDFDocument, rgb } from 'pdf-lib';

export interface FormField {
  type: 'text' | 'checkbox' | 'radio' | 'dropdown';
  name: string;
  label: string;
  pageNumber: number;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  options?: string[]; // For dropdown/radio
  defaultValue?: string | boolean;
}

export interface CreateFormOptions {
  fields: FormField[];
}

/**
 * Create form fields in PDF
 * Note: pdf-lib has limited form creation support
 * This is a basic implementation
 */
export async function createForm(
  file: File,
  options: CreateFormOptions
): Promise<Uint8Array> {
  const { fields } = options;

  if (!fields || fields.length === 0) {
    throw new Error('At least one form field is required');
  }

  // Load PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  const font = await pdfDoc.embedFont('Helvetica');

  // Add form fields (simplified - pdf-lib doesn't fully support form creation)
  // True form fields require PDF form dictionary and field objects
  
  // For now, we add text labels where fields should be
  for (const field of fields) {
    if (field.pageNumber < 1 || field.pageNumber > totalPages) {
      continue;
    }

    const page = pdfDoc.getPage(field.pageNumber - 1);
    const { width, height } = page.getSize();

    const x = field.position.x * width;
    const y = height - (field.position.y * height);

    // Draw field label
    page.drawText(field.label, {
      x,
      y,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Draw field box (visual representation)
    const fieldWidth = field.size?.width || 200;
    const fieldHeight = field.size?.height || 20;
    
    page.drawRectangle({
      x,
      y: y - fieldHeight,
      width: fieldWidth,
      height: fieldHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
  }

  // Note: True interactive form fields require:
  // 1. Creating form dictionary
  // 2. Creating field objects (text fields, checkboxes, etc.)
  // 3. Setting up field properties and values
  // This is best done with advanced PDF libraries or server-side tools

  return await pdfDoc.save();
}

/**
 * Download PDF with form fields
 */
export function downloadFormPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
