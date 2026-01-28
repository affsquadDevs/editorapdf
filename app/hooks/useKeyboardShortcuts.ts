import { useEffect } from 'react';
import { usePdfStore } from '../store/pdfStore';

export function useKeyboardShortcuts() {
  const {
    selectedPageId,
    deletePage,
    pages,
    setZoom,
    zoom,
    undo,
    redo,
    copySelected,
    pasteClipboard,
    duplicateSelected,
    deleteSelected,
    selectAll,
    clearSelection,
    selectedItems,
  } = usePdfStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Ctrl/Cmd + S - Save (Export)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Trigger export button click
        const exportButton = document.querySelector('[data-export-button]') as HTMLButtonElement;
        if (exportButton) exportButton.click();
      }

      // Ctrl/Cmd + Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y - Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }

      // Ctrl/Cmd + C - Copy
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        copySelected();
      }

      // Ctrl/Cmd + V - Paste
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        pasteClipboard();
      }

      // Ctrl/Cmd + D - Duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      }

      // Ctrl/Cmd + A - Select All
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        selectAll();
      }

      // Ctrl/Cmd + F - Find text (TODO: implement search)
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        console.log('Find - to be implemented');
      }

      // Delete or Backspace - Delete selected items
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedItems.length > 0) {
        e.preventDefault();
        deleteSelected();
      }

      // Arrow keys - Move selected item
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        console.log(`Move ${e.key} by ${step}px - to be implemented`);
      }

      // Ctrl/Cmd + Plus/Equals - Zoom in
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        setZoom(Math.min(3, zoom + 0.1));
      }

      // Ctrl/Cmd + Minus - Zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        setZoom(Math.max(0.5, zoom - 0.1));
      }

      // Ctrl/Cmd + 0 - Reset zoom to 100%
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }

      // Escape - Deselect / Exit mode
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPageId, deletePage, pages, setZoom, zoom, undo, redo, copySelected, pasteClipboard, duplicateSelected, deleteSelected, selectAll, clearSelection, selectedItems]);
}
