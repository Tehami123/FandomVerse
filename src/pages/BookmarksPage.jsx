import React, { useState } from 'react';
import { ArrowRight, BookmarkX, Download, Edit3, Save, Search, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { useBookmarks } from '../context/BookmarkContext';
import './BookmarksPage.css';

export function BookmarksPage() {
  const { bookmarks, notes, saveNote, removeNote } = useBookmarks();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  const beginEditing = (bookmark) => {
    setEditingId(bookmark.id);
    setDraft(notes[bookmark.id] || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraft('');
  };

  const handleSaveNote = (id) => {
    saveNote(id, draft);
    cancelEditing();
  };

  const handleExport = () => {
    if (!bookmarks.length) return;

    const exportData = {
      app: 'FandomVerse',
      exportedAt: new Date().toISOString(),
      bookmarks: bookmarks.map(({ id, title, name, image, description, category, contentType, destination }) => ({
        id, title, name, image, description, category, contentType, destination,
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fandomverse-bookmarks.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setExportMessage('Bookmarks exported.');
  };

  return (
    <main className="fv-bookmarks-page">
      <Container>
        <header className="fv-bookmarks-header">
          <div className="fv-bookmarks-kicker">PERSONAL ARCHIVE / SAVED WORLDS</div>
          <h1>Your collection</h1>
          <p>Keep the stories, characters, and discoveries you want to return to.</p>
          <div className="fv-bookmarks-header-row">
            <span className="fv-bookmarks-count">{bookmarks.length} {bookmarks.length === 1 ? 'BOOKMARK' : 'BOOKMARKS'}</span>
            {bookmarks.length > 0 && (
              <button type="button" className="fv-bookmarks-export" onClick={handleExport}>
                <Download size={16} aria-hidden="true" /> Export bookmarks
              </button>
            )}
          </div>
          {exportMessage && <span className="fv-bookmarks-feedback" role="status">{exportMessage}</span>}
        </header>

        {bookmarks.length > 0 ? (
          <div className="fv-bookmarks-grid">
            {bookmarks.map((bookmark) => (
              <article className="fv-bookmark-card" key={bookmark.id}>
                <div className="fv-bookmark-card-image">
                  {bookmark.image ? <img src={bookmark.image} alt={bookmark.title} /> : <div className="fv-bookmark-card-placeholder">FANDOMVERSE</div>}
                  <BookmarkButton item={bookmark} className="fv-bookmark-card-action" />
                </div>
                <div className="fv-bookmark-card-content">
                  <div className="fv-bookmark-card-meta">
                    <span>{bookmark.contentType}</span>
                    <span>/</span>
                    <span>{bookmark.category}</span>
                  </div>
                  <h2>{bookmark.title}</h2>
                  {bookmark.description && <p>{bookmark.description}</p>}
                  {notes[bookmark.id] && editingId !== bookmark.id && (
                    <div className="fv-bookmark-note">
                      <span>NOTE</span>
                      <p>{notes[bookmark.id]}</p>
                    </div>
                  )}
                  {editingId === bookmark.id ? (
                    <div className="fv-bookmark-note-editor">
                      <label htmlFor={`bookmark-note-${bookmark.id}`}>Personal note</label>
                      <textarea
                        id={`bookmark-note-${bookmark.id}`}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Add a note for this saved world..."
                        rows={4}
                        autoFocus
                      />
                      <div className="fv-bookmark-note-actions">
                        <button type="button" onClick={() => handleSaveNote(bookmark.id)}>
                          <Save size={15} aria-hidden="true" /> Save note
                        </button>
                        <button type="button" onClick={cancelEditing}>
                          <X size={15} aria-hidden="true" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="fv-bookmark-note-actions">
                      <button type="button" onClick={() => beginEditing(bookmark)}>
                        <Edit3 size={15} aria-hidden="true" /> {notes[bookmark.id] ? 'Edit note' : 'Add note'}
                      </button>
                      {notes[bookmark.id] && (
                        <button type="button" onClick={() => removeNote(bookmark.id)}>
                          <Trash2 size={15} aria-hidden="true" /> Delete note
                        </button>
                      )}
                    </div>
                  )}
                  <Link to={bookmark.destination} className="fv-bookmark-card-link">
                    Visit source <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="fv-bookmarks-empty">
            <BookmarkX size={28} aria-hidden="true" />
            <span className="fv-bookmarks-empty-number">00</span>
            <h2>No saved worlds</h2>
            <p>Your bookmarked fandoms will appear here.</p>
            <Link to="/search" className="fv-bookmarks-discover">
              <Search size={17} aria-hidden="true" /> Discover the archive
            </Link>
          </section>
        )}
      </Container>
    </main>
  );
}
