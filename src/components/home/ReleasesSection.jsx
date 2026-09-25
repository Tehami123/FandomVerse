import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { releases } from '../../data/releaseData';
import './ReleasesSection.css';

const getCategorySlug = (category) => category === 'TV Shows' ? 'tv' : category.toLowerCase().replace(' ', '-');

export function ReleasesSection() {
  return (
    <section className="fv-section fv-home-releases-section">
      <Container>
        <div className="fv-section-header"><h2>Upcoming Releases</h2><Link to="/releases" className="fv-view-all">Release calendar <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="fv-home-releases-grid">
          {releases.slice(0, 4).map((release) => (
            <Link to={`/releases?category=${getCategorySlug(release.category)}`} className="fv-home-release-card" key={release.id}>
              {release.image ? <img src={release.image} alt={release.title} loading="lazy" /> : <span className="fv-home-release-placeholder">FANDOMVERSE / RELEASE RADAR</span>}
              <div className="fv-home-release-overlay"><span>{release.status} / {release.releaseDate}</span><h3>{release.title}</h3><strong>{release.category}</strong></div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
