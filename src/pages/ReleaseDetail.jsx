import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { releases } from '../data/releaseData';
import { getCategorySlug, getContentByType } from '../utils/contentData';
import './ReleaseDetail.css';

const formatReleaseDate = (releaseDate) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(`${releaseDate}T00:00:00`));

export function ReleaseDetail() {
  const { id } = useParams();
  const release = getContentByType('Release', id);

  if (!release) {
    return (
      <main className="fv-release-detail-page">
        <Container>
          <section className="fv-release-detail-empty">
            <span>FANDOMVERSE / 404</span>
            <h1>Release not found</h1>
            <Link to="/releases"><ArrowLeft size={16} aria-hidden="true" /> Back to releases</Link>
          </section>
        </Container>
      </main>
    );
  }

  const related = releases.filter((candidate) => candidate.id !== release.id && candidate.category === release.category).slice(0, 2);
  const categorySlug = getCategorySlug(release.category);

  return (
    <main className="fv-release-detail-page" style={{ '--release-accent': `var(--color-${categorySlug})` }}>
      <Container>
        <Link className="fv-release-detail-back" to="/releases"><ArrowLeft size={16} aria-hidden="true" /> Back to releases</Link>
        <div className="fv-release-detail-layout">
          <div className="fv-release-detail-image">
            <img src={release.image} alt={release.title} />
          </div>
          <article className="fv-release-detail-copy">
            <div className="fv-release-detail-kicker">{release.category} / {release.status}</div>
            <h1>{release.title}</h1>
            <div className="fv-release-detail-meta">
              <span>{formatReleaseDate(release.releaseDate)}</span>
              <span>{release.franchise}</span>
            </div>
            <p>{release.description}</p>
            <div className="fv-release-detail-tags">
              {release.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        </div>

        {related.length > 0 && (
          <section className="fv-release-related">
            <div className="fv-release-detail-kicker">RELATED RELEASES</div>
            <div className="fv-release-related-grid">
              {related.map((item) => (
                <Link key={item.id} to={`/release/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <span>{item.status}</span>
                  <strong>{item.title}</strong>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}