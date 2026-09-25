import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import './ContentDetail.css';

export function DetailNotFound({ contentLabel }) {
  return (
    <main className="fv-detail-page">
      <Container>
        <section className="fv-detail-empty">
          <span className="fv-detail-kicker">FANDOMVERSE / 404</span>
          <h1>{contentLabel} not found</h1>
          <p>This entry is not available in the local archive.</p>
          <Link className="fv-detail-back" to="/search">
            <ArrowLeft size={16} aria-hidden="true" /> Back to discovery
          </Link>
        </section>
      </Container>
    </main>
  );
}

export function DetailHeader({ eyebrow, title, category, metadata = [] }) {
  return (
    <header className="fv-detail-header">
      <div className="fv-detail-kicker">{eyebrow} / {category}</div>
      <h1>{title}</h1>
      <div className="fv-detail-meta">
        {metadata.filter(Boolean).map((item) => <span key={item}>{item}</span>)}
      </div>
    </header>
  );
}

export function RelatedContent({ items, contentType, getPath }) {
  if (!items.length) return null;

  return (
    <section className="fv-detail-related">
      <div className="fv-detail-section-label">RELATED {contentType.toUpperCase()}S</div>
      <div className="fv-detail-related-grid">
        {items.map((item) => (
          <Link to={getPath(item)} className="fv-detail-related-card" key={item.id}>
            {item.image ? <img src={item.image} alt={item.title} /> : <div className="fv-detail-related-placeholder">FANDOMVERSE</div>}
            <span>{item.category}</span>
            <h3>{item.title}</h3>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DetailBackLink() {
  return <Link className="fv-detail-back" to="/search"><ArrowLeft size={16} aria-hidden="true" /> Back to discovery</Link>;
}
