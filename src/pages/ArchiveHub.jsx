import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { ContentCard } from '../components/ui/ContentCards';
import { articles, charactersByCategory, eventsByCategory, merchandise, trailers } from '../data/mockData';
import { getContentDestination, uniqueById } from '../utils/contentData';
import './ArchiveHub.css';

const eventArchive = uniqueById(Object.values(eventsByCategory).flat());
const characterArchive = uniqueById(Object.values(charactersByCategory).flat());

const HUBS = {
  articles: {
    title: 'Articles',
    eyebrow: 'EDITORIAL ARCHIVE',
    intro: 'Features, analysis, and field notes from across the FandomVerse.',
    type: 'Article',
    items: articles,
  },
  trailers: {
    title: 'Trailers',
    eyebrow: 'TRANSMISSION ARCHIVE',
    intro: 'Video transmissions and fictional previews from the local archive.',
    type: 'Trailer',
    items: trailers,
  },
  events: {
    title: 'Events',
    eyebrow: 'FANDOM CALENDAR',
    intro: 'Gatherings, showcases, premieres, and fan moments across every world.',
    type: 'Event',
    items: eventArchive,
  },
  characters: {
    title: 'Characters',
    eyebrow: 'CHARACTER ARCHIVE',
    intro: 'People, pilots, performers, and legends from the FandomVerse roster.',
    type: 'Character',
    items: characterArchive,
  },
  merchandise: {
    title: 'Merchandise',
    eyebrow: 'COLLECTOR ARCHIVE',
    intro: 'Objects, apparel, and keepsakes from the worlds in the archive.',
    type: 'Merchandise',
    items: merchandise,
  },
};

const getItemTitle = (item) => item.title || item.name;
const getItemCategory = (item) => item.category || '';

export function ArchiveHub({ hub }) {
  const config = HUBS[hub];
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';

  const categories = useMemo(() => [...new Set(config.items.map(getItemCategory).filter(Boolean))].sort(), [config.items]);
  const statuses = useMemo(() => [...new Set(config.items.map((item) => item.status).filter(Boolean))].sort(), [config.items]);
  const filteredItems = useMemo(() => config.items.filter((item) => (
    (!category || getItemCategory(item) === category)
    && (!status || item.status === status)
  )), [category, config.items, status]);

  const updateFilter = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(name, value);
    else nextParams.delete(name);
    setSearchParams(nextParams);
  };

  const getPath = (item) => getContentDestination(item, config.type);
  const getBookmarkItem = (item) => ({
    ...item,
    title: getItemTitle(item),
    contentType: config.type,
    destination: getPath(item),
  });

  return (
    <main className="fv-archive-hub-page">
      <Container>
        <header className="fv-archive-hub-header">
          <div className="fv-archive-hub-kicker">{config.eyebrow}</div>
          <h1>{config.title}</h1>
          <p>{config.intro}</p>
        </header>

        <section className="fv-archive-hub-controls" aria-label={`${config.title} filters`}>
          <label>
            <span>Category</span>
            <select value={category} onChange={(event) => updateFilter('category', event.target.value)}>
              <option value="">All categories</option>
              {categories.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          {statuses.length > 0 && (
            <label>
              <span>Status</span>
              <select value={status} onChange={(event) => updateFilter('status', event.target.value)}>
                <option value="">All statuses</option>
                {statuses.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          )}
          <span className="fv-archive-hub-count" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? 'ENTRY' : 'ENTRIES'}</span>
        </section>

        {filteredItems.length > 0 ? (
          <div className={`fv-archive-hub-grid fv-archive-hub-grid-${config.type.toLowerCase()}`}>
            {filteredItems.map((item) => (
              <div
                className="fv-archive-hub-card"
                key={item.id}
                role="link"
                tabIndex={0}
                aria-label={`Open ${getItemTitle(item)}`}
                onClick={() => navigate(getPath(item))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(getPath(item));
                  }
                }}
              >
                <ContentCard
                  item={{ ...item, contentType: config.type }}
                  bookmarkItem={getBookmarkItem(item)}
                  onClick={() => navigate(getPath(item))}
                  isLead={config.type === 'Article' || config.type === 'Trailer'}
                />
                {(config.type === 'Article' || config.type === 'Trailer') && (
                  <p className="fv-archive-hub-dek">{item.subtitle || item.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <section className="fv-archive-hub-empty" aria-live="polite">
            <span>00</span>
            <h2>No entries in this view</h2>
            <p>Try clearing one of the archive filters.</p>
            <button type="button" onClick={() => setSearchParams({})}>Clear filters</button>
          </section>
        )}
      </Container>
    </main>
  );
}

