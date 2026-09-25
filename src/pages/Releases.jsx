import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { releaseCategories, releases } from '../data/releaseData';
import { getCategorySlug } from '../utils/contentData';
import './Releases.css';

const formatReleaseDate = (releaseDate) => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(`${releaseDate}T00:00:00`));

const padIndex = (value) => String(value).padStart(2, '0');

export function Releases() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'chronological';
  const filteredReleases = useMemo(() => [...releases]
    .filter((release) => !category || category === getCategorySlug(release.category))
    .filter((release) => !status || release.status.toLowerCase() === status.toLowerCase())
    .sort((left, right) => (sort === 'latest'
      ? right.releaseDate.localeCompare(left.releaseDate)
      : left.releaseDate.localeCompare(right.releaseDate))), [category, sort, status]);

  const updateParam = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value && !(name === 'sort' && value === 'chronological')) nextParams.set(name, value);
    else nextParams.delete(name);
    setSearchParams(nextParams);
  };

  return (
    <main className="fv-releases-page">
      <Container>
        <header className="fv-releases-header">
          <div className="fv-releases-kicker">RELEASES</div>
          <h1>Upcoming transmissions</h1>
        </header>

        <section className="fv-releases-controls" aria-label="Release filters and sorting">
          <label className="fv-releases-control">
            <span>Category</span>
            <select value={category} onChange={(event) => updateParam('category', event.target.value)}>
              <option value="">All categories</option>
              {releaseCategories.map((option) => (
                <option key={option} value={getCategorySlug(option)}>{option}</option>
              ))}
            </select>
          </label>
          <label className="fv-releases-control">
            <span>Status</span>
            <select value={status} onChange={(event) => updateParam('status', event.target.value)}>
              <option value="">Upcoming and current</option>
              <option value="upcoming">Upcoming</option>
              <option value="current">Current</option>
            </select>
          </label>
          <label className="fv-releases-control">
            <span>Sort</span>
            <select value={sort} onChange={(event) => updateParam('sort', event.target.value)}>
              <option value="chronological">Soonest first</option>
              <option value="latest">Latest first</option>
            </select>
          </label>
        </section>

        {filteredReleases.length > 0 ? (
          <section className="fv-releases-archive" aria-label="Release archive">
            <div className="fv-releases-archive-head">
              <span>UPCOMING TRANSMISSIONS</span>
              <span className="fv-releases-progress" aria-live="polite">{padIndex(filteredReleases.length)} RELEASES</span>
            </div>
            <div className="fv-releases-grid">
              {filteredReleases.map((release, index) => (
                <Link
                  className="fv-release-card"
                  key={release.id}
                  to={`/release/${release.id}`}
                  data-featured={index === 0 ? 'true' : undefined}
                  style={{ '--release-accent': `var(--color-${getCategorySlug(release.category)})` }}
                >
                  <div className={`fv-release-image-wrap${release.image ? '' : ' fv-release-image-placeholder'}`}>
                    {release.image
                      ? <img src={release.image} alt={release.title} loading="lazy" />
                      : <span className="fv-release-placeholder-label">FANDOMVERSE / RELEASE RADAR</span>}
                    <span className={`fv-release-status fv-release-status-${release.status.toLowerCase()}`}>{release.status}</span>
                  </div>
                  <div className="fv-release-card-content">
                    <div className="fv-release-meta">
                      <span>{release.category}</span>
                      <span>/</span>
                      <span>{formatReleaseDate(release.releaseDate)}</span>
                    </div>
                    <h2>{release.title}</h2>
                    <p>{release.description}</p>
                    <div className="fv-release-card-footer">
                      <span className="fv-release-franchise">{release.franchise}</span>
                      <span className="fv-release-view">View <ArrowRight size={14} aria-hidden="true" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="fv-releases-empty" aria-live="polite">
            <span>00</span>
            <h2>No releases in this view</h2>
            <p>Try another category or status to scan the release archive.</p>
            <button type="button" onClick={() => setSearchParams({})}>Clear filters</button>
          </section>
        )}
      </Container>
    </main>
  );
}
