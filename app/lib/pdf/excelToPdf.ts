import { PDFDocument, rgb } from 'pdf-lib';

export interface ExcelToPdfOptions {
  sheets?: number[]; // Sheet indices to include (0-based)
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  fitToPage?: boolean;
}

/**
 * Convert Excel (XLSX) to PDF
 */
export async function excelToPdf(
  file: File,
  options: ExcelToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    sheets,
    pageSize = 'A4',
    orientation = 'portrait',
    fitToPage = true,
  } = options;

  // Try to import xlsx
  let XLSX: any;
  try {
    XLSX = await import('xlsx');
  } catch (err) {
    throw new Error('xlsx library is not installed. Please run: npm install xlsx');
  }

  // Read Excel file
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  // Create PDF
  const pdfDoc = await PDFDocument.create();

  // Page dimensions
  const pageDimensions: { [key: string]: { width: number; height: number } } = {
    A4: { width: 595, height: 842 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
  };

  const dimensions = pageDimensions[pageSize];
  if (orientation === 'landscape') {
    [dimensions.width, dimensions.height] = [dimensions.height, dimensions.width];
  }

  // Get sheets to convert
  const sheetNames = workbook.SheetNames;
  const sheetsToConvert = sheets 
    ? sheets.map(idx => sheetNames[idx]).filter(Boolean)
    : sheetNames;

  // Convert each sheet
  for (const sheetName of sheetsToConvert) {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    if (data.length === 0) continue;

    // Create page for this sheet
    const page = pdfDoc.addPage([dimensions.width, dimensions.height]);

    // Calculate cell dimensions
    const margin = 40;
    const maxWidth = dimensions.width - margin * 2;
    const maxHeight = dimensions.height - margin * 2;
    const numCols = Math.max(...data.map((row: any[]) => row.length));
    const numRows = data.length;
    
    const cellWidth = fitToPage ? maxWidth / numCols : 100;
    const cellHeight = fitToPage ? Math.min(maxHeight / numRows, 20) : 20;
    const fontSize = fitToPage ? Math.min(10, cellHeight * 0.6) : 10;

    // Draw table
    let y = dimensions.height - margin;
    
    for (let rowIdx = 0; rowIdx < numRows && y > margin; rowIdx++) {
      const row = data[rowIdx] as any[];
      let x = margin;

      for (let colIdx = 0; colIdx < numCols && x < dimensions.width - margin; colIdx++) {
        const cellValue = String(row[colIdx] || '');
        
        // Truncate if too long
        const maxChars = Math.floor(cellWidth / (fontSize * 0.6));
        const displayValue = cellValue.length > maxChars 
          ? cellValue.substring(0, maxChars - 3) + '...'
          : cellValue;

        if (displayValue) {
          page.drawText(displayValue, {
            x: x,
            y: y - cellHeight + fontSize,
            size: fontSize,
            color: rgb(0, 0, 0),
            maxWidth: cellWidth - 4,
          });
        }

        // Draw cell border
        page.drawRectangle({
          x: x,
          y: y - cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0.8, 0.8, 0.8),
          borderWidth: 0.5,
        });

        x += cellWidth;
      }

      y -= cellHeight;

      // Check if we need a new page
      if (y < margin && rowIdx < numRows - 1) {
        const newPage = pdfDoc.addPage([dimensions.width, dimensions.height]);
        y = dimensions.height - margin;
      }
    }

    // Add sheet name as header if multiple sheets
    if (sheetsToConvert.length > 1) {
      const firstPage = pdfDoc.getPages()[pdfDoc.getPageCount() - (sheetsToConvert.length - sheetsToConvert.indexOf(sheetName))];
      firstPage.drawText(`Sheet: ${sheetName}`, {
        x: margin,
        y: dimensions.height - 20,
        size: 14,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Download PDF file
 */
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
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
