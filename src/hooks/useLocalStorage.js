import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Syncs a piece of React state with browser localStorage.
 * Handles JSON serialization and parsing gracefully.
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The fallback initial value if key does not exist
 */
export function useLocalStorage(key, initialValue) {
  // Read initial state from localStorage or use fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep state and localStorage in sync
  useEffect(() => {
    try {
      if (storedValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
