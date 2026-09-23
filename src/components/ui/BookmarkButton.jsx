import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useBookmarks } from '../../context/BookmarkContext';
import './BookmarkButton.css';

export function BookmarkButton({ item, className = '', style }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);
  const Icon = bookmarked ? BookmarkCheck : Bookmark;
  const label = bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks';

  return (
    <motion.button
      type="button"
      className={`fv-bookmark-button ${bookmarked ? 'is-bookmarked' : ''} ${className}`}
      style={style}
      aria-label={label}
      aria-pressed={bookmarked}
      title={label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(item);
      }}
      whileTap={{ scale: 0.92 }}
    >
      <Icon size={18} fill={bookmarked ? 'currentColor' : 'none'} aria-hidden="true" />
    </motion.button>
  );
}
