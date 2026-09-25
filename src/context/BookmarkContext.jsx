/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getContentByType, getContentDestination } from '../utils/contentData';

const STORAGE_KEY = 'fandomverse_bookmarks';
const NOTES_STORAGE_KEY = 'fandomverse_bookmark_notes';
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

const readNotes = () => {
  if (!canUseStorage()) return {};

  try {
    const stored = window.localStorage.getItem(NOTES_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const normalizeBookmark = (item) => {
  const rawContentType = item.contentType || item.type || 'Content';
  const contentType = {
    article: 'Article',
    character: 'Character',
    event: 'Event',
    trailer: 'Trailer',
    merchandise: 'Merchandise',
    release: 'Release',
  }[String(rawContentType).toLowerCase()] || rawContentType;
  const resolvedItem = contentType === 'Character'
    ? getContentByType('Character', item.id) || item
    : item;
  const destination = ['Article', 'Character', 'Event', 'Trailer', 'Release'].includes(contentType)
    ? getContentDestination({ ...item, ...resolvedItem }, contentType)
    : item.destination || (item.categorySlug ? `/category/${item.categorySlug}` : '/search');

  return {
  id: item.id,
  title: resolvedItem.title || resolvedItem.name || item.title || item.name,
  name: resolvedItem.name || resolvedItem.title || item.name || item.title,
  image: resolvedItem.image || item.image || '',
  description: resolvedItem.description || resolvedItem.biography || item.description || item.biography || '',
  category: resolvedItem.category || item.category || '',
  contentType,
  destination,
  };
};

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => readBookmarks().map(normalizeBookmark));
  const [notes, setNotes] = useState(readNotes);

  useEffect(() => {
    if (!canUseStorage()) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Storage can be unavailable or full; the in-memory state remains usable.
    }
  }, [bookmarks]);

  useEffect(() => {
    if (!canUseStorage()) return;

    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage can be unavailable or full; the in-memory state remains usable.
    }
  }, [notes]);

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

export { STORAGE_KEY, NOTES_STORAGE_KEY };
