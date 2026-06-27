import { useState, useCallback } from 'react';

const KEY = 'wc-favorites';

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY)) || []); }
  catch { return new Set(); }
}

function save(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  const toggle = useCallback((cca3) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(cca3) ? next.delete(cca3) : next.add(cca3);
      save(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((cca3) => favorites.has(cca3), [favorites]);

  return { favorites, toggle, isFavorite };
}
