'use client';

import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';

interface PageRange {
  id: string;
  fromPage: number;
  toPage: number;
}

interface PageRangeSelectorProps {
  totalPages: number | null;
  value: string;
  onChange: (value: string) => void;
  onWarningChange?: (warning: string | null) => void;
}

export default function PageRangeSelector({
  totalPages,
  value,
  onChange,
  onWarningChange,
}: PageRangeSelectorProps) {
  const [ranges, setRanges] = useState<PageRange[]>([]);
  const [isOpen, setIsOpen] = useState<{ [key: string]: { from: boolean; to: boolean } }>({});

  // Parse value string into ranges on mount or when value changes externally
  useEffect(() => {
    if (!totalPages || !value.trim()) {
      setRanges([]);
      return;
    }

    try {
      const parts = value.split(',').map(p => p.trim()).filter(p => p.length > 0);
      const parsedRanges: PageRange[] = [];

      parts.forEach((part, index) => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(s => parseInt(s.trim(), 10));
          if (!isNaN(start) && !isNaN(end)) {
            parsedRanges.push({
              id: `range-${index}`,
              fromPage: Math.max(1, Math.min(start, totalPages)),
              toPage: Math.max(1, Math.min(end, totalPages)),
            });
          }
        } else {
          const pageNum = parseInt(part, 10);
          if (!isNaN(pageNum)) {
            const page = Math.max(1, Math.min(pageNum, totalPages));
            parsedRanges.push({
              id: `range-${index}`,
              fromPage: page,
              toPage: page,
            });
          }
        }
      });

      if (parsedRanges.length > 0) {
        setRanges(parsedRanges);
      }
    } catch (err) {
      // Ignore parsing errors
    }
  }, [value, totalPages]);

  // Convert ranges to string and notify parent
  useEffect(() => {
    if (ranges.length === 0) {
      onChange('');
      return;
    }

    const rangeStrings = ranges.map(range => {
      if (range.fromPage === range.toPage) {
        return `${range.fromPage}`;
      }
      return `${range.fromPage}-${range.toPage}`;
    });

    const newValue = rangeStrings.join(', ');
    onChange(newValue);

    // Validate and set warning
    if (totalPages && onWarningChange) {
      const allSelectedPages = new Set<number>();
      ranges.forEach(range => {
        for (let i = range.fromPage; i <= range.toPage; i++) {
          allSelectedPages.add(i);
        }
      });

      if (allSelectedPages.size === totalPages) {
        onWarningChange(`⚠️ You selected all ${totalPages} pages. Split requires selecting only some pages to create separate files. Please specify fewer pages.`);
      } else if (allSelectedPages.size > totalPages * 0.9) {
        onWarningChange(`⚠️ You selected ${allSelectedPages.size} out of ${totalPages} pages. Consider selecting fewer pages for a meaningful split.`);
      } else {
        onWarningChange(null);
      }
    }
  }, [ranges, totalPages, onChange, onWarningChange]);

  const addRange = () => {
    if (!totalPages) return;

    const newRange: PageRange = {
      id: `range-${Date.now()}`,
      fromPage: 1,
      toPage: 1,
    };

    setRanges([...ranges, newRange]);
  };

  const removeRange = (id: string) => {
    setRanges(ranges.filter(r => r.id !== id));
  };

  const updateRange = (id: string, field: 'fromPage' | 'toPage', newValue: number) => {
    setRanges(ranges.map(range => {
      if (range.id !== id) return range;

      const updated = { ...range };
      if (field === 'fromPage') {
        updated.fromPage = newValue;
        // Ensure toPage is not less than fromPage
        if (updated.toPage < updated.fromPage) {
          updated.toPage = updated.fromPage;
        }
      } else if (field === 'toPage') {
        updated.toPage = newValue;
        // Ensure fromPage is not greater than toPage
        if (updated.fromPage > updated.toPage) {
          updated.fromPage = updated.toPage;
        }
      }

      return updated;
    }));
  };

  const toggleDropdown = (rangeId: string, type: 'from' | 'to') => {
    setIsOpen(prev => ({
      ...prev,
      [rangeId]: {
        ...prev[rangeId],
        [type]: !prev[rangeId]?.[type],
      },
    }));
  };

  if (!totalPages) {
    return (
      <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
        <p className="text-sm text-surface-400">Upload a PDF file to select pages</p>
      </div>
    );
  }

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-3">
      {ranges.length === 0 && (
        <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50 text-center">
          <p className="text-sm text-surface-400 mb-3">No page ranges selected</p>
          <button
            type="button"
            onClick={addRange}
            className="btn btn-sm btn-primary"
          >
            <Plus size={16} strokeWidth={2} />
            Add Page Range
          </button>
        </div>
      )}

      <div className="space-y-2">
        {ranges.map((range, index) => {
          const isSinglePage = range.fromPage === range.toPage;
          const pageCount = range.toPage - range.fromPage + 1;
          
          return (
            <div
              key={range.id}
              className="p-4 rounded-lg bg-surface-800/50 border border-surface-700/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary-400 bg-primary-500/20 px-2 py-1 rounded">
                    File {index + 1}
                  </span>
                  {isSinglePage ? (
                    <span className="text-xs text-surface-400">Single page</span>
                  ) : (
                    <span className="text-xs text-surface-400">{pageCount} pages</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeRange(range.id)}
                  className="p-1.5 rounded-lg hover:bg-error-500/10 text-surface-500 hover:text-error-400 transition-all"
                  title="Remove range"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* From Page Select */}
                <div className="flex-1">
                  <label className="text-xs text-surface-500 mb-1.5 block">From page</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(range.id, 'from')}
                      className="w-full px-3 py-2 rounded-lg bg-surface-900/70 border border-surface-600/50 text-surface-200 text-sm font-medium hover:border-primary-500/50 transition-all flex items-center justify-between"
                    >
                      <span>{range.fromPage}</span>
                      <ChevronDown size={16} className="text-surface-400" />
                    </button>
                    {isOpen[range.id]?.from && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => toggleDropdown(range.id, 'from')}
                        />
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg bg-surface-800 border border-surface-700 shadow-xl z-20">
                          {pageOptions.map(page => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => {
                                updateRange(range.id, 'fromPage', page);
                                toggleDropdown(range.id, 'from');
                              }}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-500/20 transition-colors ${
                                page === range.fromPage
                                  ? 'bg-primary-500/30 text-primary-300 font-medium'
                                  : 'text-surface-300'
                              }`}
                            >
                              Page {page}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* To Page Select */}
                <div className="flex-1">
                  <label className="text-xs text-surface-500 mb-1.5 block">To page</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(range.id, 'to')}
                      className="w-full px-3 py-2 rounded-lg bg-surface-900/70 border border-surface-600/50 text-surface-200 text-sm font-medium hover:border-primary-500/50 transition-all flex items-center justify-between"
                    >
                      <span>{range.toPage}</span>
                      <ChevronDown size={16} className="text-surface-400" />
                    </button>
                    {isOpen[range.id]?.to && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => toggleDropdown(range.id, 'to')}
                        />
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg bg-surface-800 border border-surface-700 shadow-xl z-20">
                          {pageOptions
                            .filter(page => page >= range.fromPage)
                            .map(page => (
                              <button
                                key={page}
                                type="button"
                                onClick={() => {
                                  updateRange(range.id, 'toPage', page);
                                  toggleDropdown(range.id, 'to');
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-500/20 transition-colors ${
                                  page === range.toPage
                                    ? 'bg-primary-500/30 text-primary-300 font-medium'
                                    : 'text-surface-300'
                                }`}
                              >
                                Page {page}
                              </button>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview text */}
              <div className="text-xs text-surface-500 pt-1 border-t border-surface-700/50">
                {isSinglePage ? (
                  <>Will create a file with <strong className="text-surface-300">page {range.fromPage}</strong></>
                ) : (
                  <>Will create a file with <strong className="text-surface-300">pages {range.fromPage} to {range.toPage}</strong> ({pageCount} pages)</>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Range Button */}
      <button
        type="button"
        onClick={addRange}
        className="w-full px-4 py-2.5 rounded-lg border-2 border-dashed border-surface-700/50 hover:border-primary-500/50 text-surface-400 hover:text-primary-400 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} strokeWidth={2} />
        <span className="text-sm font-medium">Add Another Range</span>
      </button>

      {/* Summary */}
      {ranges.length > 0 && (
        <div className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
          <p className="text-xs font-semibold text-primary-300 mb-1">
            📄 Summary: {ranges.length} file{ranges.length !== 1 ? 's' : ''} will be created
          </p>
        </div>
      )}
    </div>
  );
}
