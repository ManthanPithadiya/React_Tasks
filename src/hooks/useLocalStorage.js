import { useEffect, useState, useRef } from "react";

/**
 * useLocalStorage — JSON-safe, cross-tab syncing, key-scoped.
 * - Persists value under `key`.
 * - Updates reactively if another tab changes the same key.
 */
export default function useLocalStorage(key, initialValue) {
  const ready = useRef(false);

  const readValue = () => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  // Write-through to localStorage
  useEffect(() => {
    if (!ready.current) return; // avoid writing the initial state twice
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch a custom event for same-tab subscribers
      window.dispatchEvent(new Event("localstorage-custom"));
    } catch {}
  }, [key, value]);

  // Initial mount mark
  useEffect(() => { ready.current = true; }, []);

  // Cross-tab or same-tab notifications
  useEffect(() => {
    const handler = () => setValue(readValue());
    window.addEventListener("storage", handler);
    window.addEventListener("localstorage-custom", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("localstorage-custom", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
