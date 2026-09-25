import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Container } from '../components/ui/Container';
import { categoryDetails } from '../data/categoryData';
import { filterAndSortContent, getSearchFilterOptions, searchContent } from '../utils/contentData';
import { Scene3D } from '../components/visuals/Scene3D';
import { ContentCard } from '../components/ui/ContentCards';
import './SearchPage.css';

const getCategoryAccent = (category) => {
  const entry = Object.entries(categoryDetails).find(([, value]) => value.name === category);
  return entry ? `var(--color-${entry[0]})` : 'var(--color-text-secondary)';
};

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const type = searchParams.get('type') || '';
  const tag = searchParams.get('tag') || '';
  const sort = searchParams.get('sort') || 'relevance';
  const [inputValue, setInputValue] = useState(query);
  const filterOptions = useMemo(() => getSearchFilterOptions(), []);
  const unfilteredResults = searchContent(query);
  const results = filterAndSortContent(query, { category, type, tag, sort });
  const hasQuery = query.trim().length > 0;
  const hasActiveRefinement = Boolean(category || type || tag || sort !== 'relevance');

  useEffect(() => {
    // The URL is the source of truth when browser navigation changes the query.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuery = inputValue.trim();
    const nextParams = new URLSearchParams(searchParams);

    if (nextQuery) {
      nextParams.set('q', nextQuery);
    } else {
      nextParams.delete('q');
      nextParams.delete('category');
      nextParams.delete('type');
      nextParams.delete('tag');
      nextParams.delete('sort');
    }

    setSearchParams(nextParams);
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchParams({});
  };

  const updateParam = (name, value, defaultValue = '') => {
    const nextParams = new URLSearchParams(searchParams);

    if (value && value !== defaultValue) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    setSearchParams(nextParams);
  };

  const clearRefinements = () => {
    const nextParams = new URLSearchParams();
    if (query.trim()) nextParams.set('q', query.trim());
    setSearchParams(nextParams);
  };

  const selectedCategory = filterOptions.categories.find((option) => option.value === category);
  const selectedType = filterOptions.types.find((option) => option.toLowerCase() === type.toLowerCase());

  return (
    <main className="fv-search-page">
      <Container>
        <header className="fv-search-header">
          <div className="fv-search-kicker">GLOBAL SEARCH / FANDOM ARCHIVE</div>
          <h1>Search the archive</h1>
          <p>Find stories, characters, events, and collectibles across every universe.</p>
        </header>

        <form className="fv-search-form" onSubmit={handleSubmit} role="search">
          <Search size={22} aria-hidden="true" />
          <input
            type="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search anime, characters, events..."
            aria-label="Search the FandomVerse archive"
            autoComplete="off"
          />
          {inputValue && (
            <button type="button" className="fv-search-clear" onClick={clearSearch} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
          <button type="submit" className="fv-search-submit" aria-label="Submit search">
            <ArrowRight size={20} />
          </button>
        </form>

        {hasQuery ? (
          <div className="fv-search-summary">
            <span className="fv-search-summary-label">RESULTS FOR</span>
            <strong>"{query.trim()}"</strong>
            <span className="fv-search-count">{results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'}</span>
          </div>
        ) : (
          <div className="fv-search-empty fv-search-empty-intro">
            <span className="fv-search-empty-number">00</span>
            <h2>Begin your search</h2>
            <p>Search by title, category, character, franchise, or content type.</p>
          </div>
        )}

        {hasQuery && (
          <section className="fv-search-controls" aria-label="Search filters and sorting">
            <div className="fv-search-control-row">
              <label className="fv-search-control">
                <span>Category</span>
                <select value={category} onChange={(event) => updateParam('category', event.target.value)}>
                  <option value="">All categories</option>
                  {filterOptions.categories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="fv-search-control">
                <span>Content type</span>
                <select value={type} onChange={(event) => updateParam('type', event.target.value)}>
                  <option value="">All types</option>
                  {filterOptions.types.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
                </select>
              </label>
              {filterOptions.tags.length > 0 && (
                <label className="fv-search-control">
                  <span>Tag / franchise</span>
                  <select value={tag} onChange={(event) => updateParam('tag', event.target.value)}>
                    <option value="">All tags</option>
                    {filterOptions.tags.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              )}
              <label className="fv-search-control">
                <span>Sort</span>
                <select value={sort} onChange={(event) => updateParam('sort', event.target.value, 'relevance')}>
                  <option value="relevance">Relevance</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="newest">Newest</option>
                  <option value="popularity">Popularity</option>
                  <option value="featured">Featured</option>
                </select>
              </label>
            </div>
            {hasActiveRefinement && (
              <div className="fv-search-active-row">
                <span className="fv-search-active-label">ACTIVE</span>
                {selectedCategory && <span className="fv-search-active-chip">Category: {selectedCategory.label}</span>}
                {selectedType && <span className="fv-search-active-chip">Type: {selectedType}</span>}
                {tag && <span className="fv-search-active-chip">Tag: {tag}</span>}
                {sort !== 'relevance' && <span className="fv-search-active-chip">Sort: {sort}</span>}
                <button type="button" className="fv-search-clear-all" onClick={clearRefinements}>Clear all</button>
              </div>
            )}
          </section>
        )}

        {hasQuery && results.length > 0 && (
          <motion.div className="fv-search-grid" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
            {results.map((result) => (
              <motion.div
                key={result.id}
                style={{ '--cat-accent': getCategoryAccent(result.category) }}
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              >
                <ContentCard 
                  item={result} 
                  bookmarkItem={result} 
                  onClick={() => navigate(result.destination)} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="fv-search-empty fv-search-empty-results">
            <div className="fv-search-empty-scene" aria-hidden="true"><Scene3D /></div>
            <span className="fv-search-empty-number">00</span>
            <h2>{unfilteredResults.length > 0 ? 'No matches with these filters' : 'No results'}</h2>
            <p>{unfilteredResults.length > 0 ? 'Try removing a filter or clearing all refinements.' : `Nothing in the FandomVerse archive matches "${query.trim()}".`}</p>
            {unfilteredResults.length > 0 ? (
              <button type="button" className="fv-search-reset" onClick={clearRefinements}>Clear all filters</button>
            ) : (
              <button type="button" className="fv-search-reset" onClick={clearSearch}>Search again</button>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
