'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface PageSelectorProps {
  totalPages: number | null;
  value: string;
  onChange: (value: string) => void;
}

export default function PageSelector({
  totalPages,
  value,
  onChange,
}: PageSelectorProps) {
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

  // Parse value string into selected pages
  useEffect(() => {
    if (!totalPages || !value.trim()) {
      setSelectedPages(new Set());
      return;
    }

    try {
      const parts = value.split(',').map(p => p.trim()).filter(p => p.length > 0);
      const pages = new Set<number>();

      for (const part of parts) {
        if (part.includes('-')) {
          // Range like "1-3"
          const [start, end] = part.split('-').map(s => parseInt(s.trim(), 10));
          if (!isNaN(start) && !isNaN(end)) {
            const startPage = Math.max(1, Math.min(start, totalPages));
            const endPage = Math.max(1, Math.min(end, totalPages));
            for (let i = Math.min(startPage, endPage); i <= Math.max(startPage, endPage); i++) {
              pages.add(i);
            }
          }
        } else {
          // Single page number
          const pageNum = parseInt(part, 10);
          if (!isNaN(pageNum)) {
            const page = Math.max(1, Math.min(pageNum, totalPages));
            pages.add(page);
          }
        }
      }

      setSelectedPages(pages);
    } catch (err) {
      // Ignore parsing errors
    }
  }, [value, totalPages]);

  // Convert selected pages to string and notify parent
  useEffect(() => {
    if (selectedPages.size === 0) {
      onChange('');
      return;
    }

    // Group consecutive pages into ranges
    const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
    const ranges: string[] = [];
    let rangeStart: number | null = null;
    let rangeEnd: number | null = null;

    for (let i = 0; i < sortedPages.length; i++) {
      const page = sortedPages[i];
      
      if (rangeStart === null) {
        rangeStart = page;
        rangeEnd = page;
      } else if (page === rangeEnd! + 1) {
        // Continue range
        rangeEnd = page;
      } else {
        // End current range and start new one
        if (rangeStart === rangeEnd) {
          ranges.push(`${rangeStart}`);
        } else {
          ranges.push(`${rangeStart}-${rangeEnd}`);
        }
        rangeStart = page;
        rangeEnd = page;
      }
    }

    // Add last range
    if (rangeStart !== null) {
      if (rangeStart === rangeEnd) {
        ranges.push(`${rangeStart}`);
      } else {
        ranges.push(`${rangeStart}-${rangeEnd}`);
      }
    }

    onChange(ranges.join(', '));
  }, [selectedPages, onChange]);

  const togglePage = (page: number) => {
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(page)) {
        newSet.delete(page);
      } else {
        newSet.add(page);
      }
      return newSet;
    });
  };

  const selectRange = (start: number, end: number) => {
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      for (let i = start; i <= end; i++) {
        newSet.add(i);
      }
      return newSet;
    });
  };

  const clearAll = () => {
    setSelectedPages(new Set());
  };

  const selectAll = () => {
    if (!totalPages) return;
    selectRange(1, totalPages);
  };

  if (!totalPages) {
    return (
      <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
        <p className="text-sm text-surface-400">Upload a PDF file to select pages</p>
      </div>
    );
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const selectedCount = selectedPages.size;

  return (
    <div className="space-y-3">
      {/* Quick actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-400">
            {selectedCount > 0 ? `${selectedCount} page${selectedCount !== 1 ? 's' : ''} selected` : 'No pages selected'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Select All
          </button>
          {selectedCount > 0 && (
            <>
              <span className="text-surface-600">|</span>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-surface-400 hover:text-surface-300 font-medium transition-colors"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Page grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-1">
        {pageNumbers.map(page => {
          const isSelected = selectedPages.has(page);
          return (
            <button
              key={page}
              type="button"
              onClick={() => togglePage(page)}
              className={`
                relative px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${isSelected
                  ? 'bg-primary-500/30 border-2 border-primary-500 text-primary-200'
                  : 'bg-surface-800/50 border-2 border-surface-700/50 text-surface-300 hover:border-primary-500/50 hover:bg-surface-800'
                }
              `}
            >
              {page}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <Check size={12} strokeWidth={3} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      {selectedCount > 0 && (
        <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
          <p className="text-xs text-primary-300">
            <strong>{selectedCount}</strong> page{selectedCount !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}
