import { useEffect, useRef } from 'react';
import { usePdfStore } from '../store/pdfStore';

const AUTOSAVE_KEY = 'pdf-editor-autosave';
const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function useAutosave() {
  const { pages, originalFileUrl, fileName } = usePdfStore();
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Save to localStorage
  useEffect(() => {
    if (pages.length === 0) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for autosave
    timeoutRef.current = setTimeout(() => {
      try {
        const autosaveData = {
          pages,
          fileName,
          timestamp: Date.now(),
        };
        
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(autosaveData));
        console.log('Autosaved at', new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Failed to autosave:', err);
      }
    }, AUTOSAVE_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pages, fileName]);
}

export function getAutosaveData() {
  try {
    const data = localStorage.getItem(AUTOSAVE_KEY);
    if (!data) return null;
    
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load autosave data:', err);
    return null;
  }
}

export function clearAutosave() {
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
  } catch (err) {
    console.error('Failed to clear autosave:', err);
  }
}

export function hasAutosave(): boolean {
  return localStorage.getItem(AUTOSAVE_KEY) !== null;
}
