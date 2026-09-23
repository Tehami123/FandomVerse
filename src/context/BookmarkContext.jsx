import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'fandomverse_bookmarks';
const BookmarkContext = createContext(null);

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readBookmarks = () => {
  if (!canUseStorage()) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item?.id && item?.title) : [];
  } catch {
    return [];
  }
};

const normalizeBookmark = (item) => ({
  id: item.id,
  title: item.title || item.name,
  name: item.name || item.title,
  image: item.image || '',
  description: item.description || item.biography || '',
  category: item.category || '',
  contentType: item.contentType || item.type || 'Content',
  destination: item.destination || (item.categorySlug ? `/category/${item.categorySlug}` : '/search'),
});

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(readBookmarks);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (!canUseStorage()) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Storage can be unavailable or full; the in-memory state remains usable.
    }
  }, [bookmarks]);

  const value = useMemo(() => ({
    bookmarks,
    notes,
    isBookmarked: (id) => bookmarks.some((item) => item.id === id),
    toggleBookmark: (item) => {
      const normalized = normalizeBookmark(item);
      setBookmarks((current) => current.some((bookmark) => bookmark.id === normalized.id)
        ? current.filter((bookmark) => bookmark.id !== normalized.id)
        : [...current, normalized]);
    },
    removeBookmark: (id) => setBookmarks((current) => current.filter((item) => item.id !== id)),
    saveNote: (id, value) => {
      const trimmed = value.trim();
      setNotes((current) => {
        if (!trimmed) {
          const next = { ...current };
          delete next[id];
          return next;
        }

        return { ...current, [id]: trimmed.slice(0, 2000) };
      });
    },
    removeNote: (id) => setNotes((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    }),
  }), [bookmarks, notes]);

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
}

export { STORAGE_KEY };
