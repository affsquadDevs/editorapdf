import { loadPdfDocument } from './pdfRender';
import { extractTextFromPage } from './pdfExtract';

export interface PdfToCsvOptions {
  pageRange?: string; // Optional page range (e.g., "1-5", "1,3,5", "all")
  detectTables?: boolean; // Try to detect and extract tables
  delimiter?: string; // CSV delimiter (default: ',')
  quoteChar?: string; // CSV quote character (default: '"')
  separateFiles?: boolean; // Create separate CSV file for each page (default: false)
}

/**
 * Escape CSV field value
 */
function escapeCsvField(value: string, delimiter: string, quoteChar: string): string {
  // If value contains delimiter, newline, or quote, wrap in quotes
  if (value.includes(delimiter) || value.includes('\n') || value.includes('\r') || value.includes(quoteChar)) {
    // Escape quotes by doubling them
    return `${quoteChar}${value.replace(new RegExp(quoteChar, 'g'), quoteChar + quoteChar)}${quoteChar}`;
  }
  return value;
}

/**
 * Convert table to CSV string
 */
function tableToCsv(table: string[][], delimiter: string, quoteChar: string): string {
  if (table.length === 0) {
    return '';
  }

  return table
    .map(row => {
      // Ensure row has same number of columns as first row
      const maxCols = Math.max(...table.map(r => r.length));
      const paddedRow = [...row];
      while (paddedRow.length < maxCols) {
        paddedRow.push('');
      }

      return paddedRow
        .map(cell => escapeCsvField(String(cell || ''), delimiter, quoteChar))
        .join(delimiter);
    })
    .join('\n');
}

/**
 * Group text items by lines (similar Y position)
 */
function groupTextByLines(texts: any[]): string[] {
  const lines: Array<{ y: number; items: any[] }> = [];
  
  for (const text of texts) {
    // Find line with similar Y position (within 0.02 tolerance)
    let foundLine = false;
    for (const line of lines) {
      if (Math.abs(line.y - text.y) < 0.02) {
        line.items.push(text);
        foundLine = true;
        break;
      }
    }
    
    if (!foundLine) {
      lines.push({ y: text.y, items: [text] });
    }
  }
  
  // Sort lines by Y position (top to bottom)
  lines.sort((a, b) => b.y - a.y);
  
  // Convert to string array
  return lines.map(line => {
    // Sort items in line by X position (left to right)
    line.items.sort((a, b) => a.x - b.x);
    return line.items.map(item => item.text).join(' ');
  });
}

/**
 * Detect table structure from extracted text
 */
function detectTableStructure(texts: any[]): string[][] {
  // Group texts by Y position (rows)
  const rows: Array<{ y: number; items: any[] }> = [];
  
  for (const text of texts) {
    // Find row with similar Y position (within 0.015 tolerance for better row detection)
    let foundRow = false;
    for (const row of rows) {
      if (Math.abs(row.y - text.y) < 0.015) {
        row.items.push(text);
        foundRow = true;
        break;
      }
    }
    
    if (!foundRow) {
      rows.push({ y: text.y, items: [text] });
    }
  }
  
  // Sort rows by Y position (top to bottom)
  rows.sort((a, b) => b.y - a.y);
  
  // Detect columns by analyzing X positions
  // Collect all unique X positions
  const xPositions = new Set<number>();
  rows.forEach(row => {
    row.items.forEach(item => {
      // Round X position to nearest 0.01 to group similar columns
      const roundedX = Math.round(item.x * 100) / 100;
      xPositions.add(roundedX);
    });
  });
  
  // Sort X positions
  const sortedXPositions = Array.from(xPositions).sort((a, b) => a - b);
  
  // If we have many distinct X positions, it might be a table
  // Otherwise, treat as simple text
  const isLikelyTable = sortedXPositions.length >= 3 && rows.length >= 2;
  
  if (isLikelyTable) {
    // Build table structure
    const table: string[][] = [];
    
    for (const row of rows) {
      // Sort items in row by X position
      row.items.sort((a, b) => a.x - b.x);
      
      // Create row array with cells
      const tableRow: string[] = [];
      let currentColIndex = 0;
      
      for (const xPos of sortedXPositions) {
        // Find items in this column (within tolerance)
        const columnItems = row.items.filter(item => {
          const roundedX = Math.round(item.x * 100) / 100;
          return Math.abs(roundedX - xPos) < 0.02;
        });
        
        if (columnItems.length > 0) {
          // Combine items in this column
          const cellText = columnItems.map(item => item.text).join(' ').trim();
          tableRow.push(cellText);
        } else {
          // Empty cell
          tableRow.push('');
        }
        currentColIndex++;
      }
      
      // Only add row if it has some content
      if (tableRow.some(cell => cell.trim() !== '')) {
        table.push(tableRow);
      }
    }
    
    return table.length > 0 ? table : [['No table structure detected']];
  } else {
    // Simple line-by-line format
    return rows.map(row => {
      row.items.sort((a, b) => a.x - b.x);
      return [row.items.map(item => item.text).join(' ')];
    });
  }
}

/**
 * Convert PDF to CSV format
 * Returns array of CSV strings (one per page) or single combined CSV
 */
export async function pdfToCsv(
  file: File,
  options: PdfToCsvOptions = {}
): Promise<Array<{ bytes: Uint8Array; filename: string }>> {
  const { 
    pageRange, 
    detectTables = true,
    delimiter = ',',
    quoteChar = '"',
    separateFiles = false
  } = options;

  // Load PDF document
  const pdfDoc = await loadPdfDocument(file);
  const totalPages = pdfDoc.numPages;

  // Parse page range
  let pagesToConvert: number[] = [];
  
  if (!pageRange || pageRange.trim() === '' || pageRange.toLowerCase() === 'all') {
    // Convert all pages
    pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // Parse page range (e.g., "1-5", "1,3,5", "1-3,5,7-9")
    const parts = pageRange.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        // Range (e.g., "1-5")
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, totalPages));
          const rangeEnd = Math.max(1, Math.min(end, totalPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            if (!pagesToConvert.includes(i)) {
              pagesToConvert.push(i);
            }
          }
        }
      } else {
        // Single page
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          if (!pagesToConvert.includes(pageNum)) {
            pagesToConvert.push(pageNum);
          }
        }
      }
    }
    // Sort pages
    pagesToConvert.sort((a, b) => a - b);
  }

  if (pagesToConvert.length === 0) {
    throw new Error('No valid pages to convert');
  }

  // Extract text from all pages
  const allTables: Array<{ page: number; table: string[][] }> = [];
  
  for (const pageNumber of pagesToConvert) {
    const extractedTexts = await extractTextFromPage(pdfDoc, pageNumber);
    
    if (extractedTexts.length === 0) {
      // Empty page - add empty table
      allTables.push({ page: pageNumber, table: [['']] });
      continue;
    }

    if (detectTables) {
      // Try to detect tables by grouping text by Y position (rows) and X position (columns)
      const table = detectTableStructure(extractedTexts);
      allTables.push({ page: pageNumber, table });
    } else {
      // Simple line-by-line extraction
      const lines = groupTextByLines(extractedTexts);
      const table: string[][] = lines.map(line => [line]);
      allTables.push({ page: pageNumber, table });
    }
  }

  // Convert tables to CSV
  const results: Array<{ bytes: Uint8Array; filename: string }> = [];
  const baseName = file.name.replace(/\.pdf$/i, '');

  if (separateFiles) {
    // Create separate CSV for each page
    for (const { page, table } of allTables) {
      const csv = tableToCsv(table, delimiter, quoteChar);
      const bytes = new TextEncoder().encode(csv);
      results.push({
        bytes,
        filename: `${baseName}_page_${page}.csv`,
      });
    }
  } else {
    // Combine all pages into single CSV
    // Add page header if multiple pages
    const combinedTable: string[][] = [];
    
    for (let i = 0; i < allTables.length; i++) {
      const { page, table } = allTables[i];
      
      // Add page separator if multiple pages
      if (allTables.length > 1 && i > 0) {
        combinedTable.push([`Page ${page}`]);
      } else if (allTables.length > 1) {
        combinedTable.push([`Page ${page}`]);
      }
      
      // Add table rows
      combinedTable.push(...table);
      
      // Add empty row between pages (except last)
      if (i < allTables.length - 1) {
        combinedTable.push([]);
      }
    }
    
    const csv = tableToCsv(combinedTable, delimiter, quoteChar);
    const bytes = new TextEncoder().encode(csv);
    results.push({
      bytes,
      filename: `${baseName}.csv`,
    });
  }

  // If no tables were found, add a message
  if (results.length === 0 || results.every(r => {
    const text = new TextDecoder().decode(r.bytes);
    return text.trim() === '';
  })) {
    const message = 'No table data found in PDF. This PDF may contain only images or scanned content. Try using OCR to extract text first.';
    results.push({
      bytes: new TextEncoder().encode(message),
      filename: `${baseName}.csv`,
    });
  }

  return results;
}

/**
 * Convert CSV string to Uint8Array (UTF-8 encoded)
 */
export function csvToUint8Array(csv: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(csv);
}

/**
 * Download CSV file
 */
export function downloadCsv(csvBytes: Uint8Array, filename: string): void {
  const blob = new Blob([csvBytes as BlobPart], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download multiple CSV files as ZIP
 */
export async function downloadCsvFiles(
  csvFiles: Array<{ bytes: Uint8Array; filename: string }>,
  zipFilename: string = 'csv_files.zip'
): Promise<void> {
  if (csvFiles.length === 0) {
    throw new Error('No CSV files to download');
  }

  if (csvFiles.length === 1) {
    // Single file - download directly
    downloadCsv(csvFiles[0].bytes, csvFiles[0].filename);
    return;
  }

  // Multiple files - use JSZip to create ZIP
  let JSZip: any;
  try {
    const jszipModule = await import('jszip');
    JSZip = jszipModule.default || jszipModule;
  } catch (err) {
    // Fallback: download first file if JSZip not available
    console.warn('JSZip not available, downloading first CSV file only');
    downloadCsv(csvFiles[0].bytes, csvFiles[0].filename);
    return;
  }

  const zip = new JSZip();

  // Add each CSV file to ZIP
  csvFiles.forEach(({ bytes, filename }) => {
    const csvFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    zip.file(csvFilename, bytes);
  });

  // Generate ZIP file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = zipFilename.endsWith('.zip') ? zipFilename : `${zipFilename}.zip`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
