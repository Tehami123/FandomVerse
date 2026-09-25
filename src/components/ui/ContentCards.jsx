import { ArrowRight, MapPin, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { BookmarkButton } from './BookmarkButton';
import { AddToCartButton } from './AddToCartButton';
import './ContentCards.css';

const CardPlaceholder = ({ label }) => (
  <div className="fv-card-placeholder">
    <span>{label || 'FANDOMVERSE'}</span>
  </div>
);

// 1. ArticleCard
export function ArticleCard({ item, bookmarkItem = item, onClick, isLead = false }) {
  return (
    <motion.div 
      className={`fv-card-variant fv-article-card ${isLead ? 'fv-article-lead' : ''}`}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" />
      <div className="fv-article-img-wrapper">
        {item.image ? <img src={item.image} alt={item.title} /> : <CardPlaceholder label={item.title} />}
      </div>
      <div className="fv-article-content">
        <h4 className={isLead ? 'fv-article-title-lead' : 'fv-article-title'}>{item.title}</h4>
        <div className="fv-article-meta">
          <span className="fv-accent">{item.category}</span>
          <span className="fv-dot">•</span>
          <span>{item.readTime || item.metadata || '5 min read'}</span>
        </div>
        {isLead && item.description && <p className="fv-article-excerpt">{item.description}</p>}
      </div>
    </motion.div>
  );
}

// 2. CharacterCard
export function CharacterCard({ item, bookmarkItem = item, onClick }) {
  return (
    <motion.div 
      className="fv-card-variant fv-character-card"
      onClick={onClick}
    >
      <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" />
      <div className="fv-character-img-wrapper">
        {item.image ? <img src={item.image} alt={item.name || item.title} /> : <CardPlaceholder label={item.name || item.title} />}
        <div className="fv-character-overlay">
          <span className="fv-character-franchise">{item.franchise || item.category}</span>
          <h4 className="fv-character-name">{item.name || item.title}</h4>
          {item.biography && <p className="fv-character-bio">{item.biography}</p>}
        </div>
      </div>
    </motion.div>
  );
}

// 3. EventCard
export function EventCard({ item, bookmarkItem = item, onClick, asEditorial = false, index = 0 }) {
  if (asEditorial) {
    return (
      <motion.div 
        className="fv-event-editorial-row"
        whileHover={{ x: 4 }}
        onClick={onClick}
      >
        <div className="fv-event-editorial-index">{(index + 1).toString().padStart(2, '0')}</div>
        <div className="fv-event-editorial-img">
          {item.image ? <img src={item.image} alt={item.title} /> : <CardPlaceholder label={item.title} />}
          <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" style={{ top: 8, right: 8 }} />
        </div>
        <div className="fv-event-editorial-content">
          <div className="fv-event-editorial-date">{item.date || item.metadata}</div>
          <h4 className="fv-event-editorial-title">{item.title}</h4>
          <div className="fv-event-editorial-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MapPin size={14} aria-hidden="true" /> {item.location || 'FandomVerse Studio'}</span>
            <span className="fv-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Tag size={14} aria-hidden="true" /> {item.category}</span>
          </div>
          <div className="fv-event-editorial-action" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Explore Event <ArrowRight size={14} aria-hidden="true" /></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fv-card-variant fv-event-card"
      onClick={onClick}
    >
      <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" />
      <div className="fv-event-img-wrapper">
        {item.image ? <img src={item.image} alt={item.title} /> : <CardPlaceholder label={item.title} />}
        <div className="fv-event-overlay">
          <div className="fv-event-date-large">{item.date?.split(' ')[0] || item.metadata?.split(' ')[0] || 'TBA'}</div>
          <div className="fv-event-info">
            <h4 className="fv-event-title">{item.title}</h4>
            <div className="fv-event-meta" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} aria-hidden="true" />
              <span>{item.location || 'FandomVerse'}</span>
            </div>
            <div className="fv-event-meta" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Tag size={14} aria-hidden="true" />
              <span className="fv-accent">{item.category}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 4. MerchandiseCard
export function MerchandiseCard({ item, bookmarkItem = item, onClick }) {
  return (
    <motion.div 
      className="fv-card-variant fv-merch-card"
      onClick={onClick}
    >
      <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" />
      <div className="fv-merch-img-wrapper">
        {item.image ? <img src={item.image} alt={item.title} /> : <CardPlaceholder label={item.title} />}
      </div>
      <div className="fv-merch-content">
        <div className="fv-merch-status">{item.status || 'Available'}</div>
        <h4 className="fv-merch-title">{item.title}</h4>
        <div className="fv-merch-price">{item.price || '$0.00'}</div>
        <div className="fv-merch-actions" onClick={(e) => e.stopPropagation()}>
          <AddToCartButton product={item} style={{ width: '100%', marginTop: '12px' }} />
        </div>
      </div>
    </motion.div>
  );
}

// 5. ReleaseCard
export function ReleaseCard({ item, bookmarkItem = item, onClick }) {
  return (
    <motion.div 
      className="fv-card-variant fv-release-card"
      onClick={onClick}
    >
      <BookmarkButton item={bookmarkItem} className="fv-card-bookmark" />
      <div className="fv-release-img-wrapper">
        {item.image ? <img src={item.image} alt={item.title} /> : <CardPlaceholder label={item.title} />}
        <div className="fv-release-overlay">
          <span className="fv-release-date">{item.releaseDate || item.metadata}</span>
          <h4 className="fv-release-title">{item.title}</h4>
          <span className="fv-release-category">{item.category}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Helper to render correct card type
export function ContentCard({ item, bookmarkItem = item, onClick, ...props }) {
  const type = item.contentType?.toLowerCase() || item.type?.toLowerCase() || '';
  if (type === 'article' || type === 'trailer') return <ArticleCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  if (type === 'character') return <CharacterCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  if (type === 'event') return <EventCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  if (type === 'merchandise') return <MerchandiseCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  if (type === 'release') return <ReleaseCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  
  // fallback based on whether it looks like a character or article
  if (item.biography || item.name) {
    return <CharacterCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
  }
  return <ArticleCard item={item} bookmarkItem={bookmarkItem} onClick={onClick} {...props} />;
}
