import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookmarkButton } from '../ui/BookmarkButton';
import { AddToCartButton } from '../ui/AddToCartButton';
import './ContentCards.css';

const ImagePlaceholder = ({ label, className = '' }) => (
  <div className={`fv-card-placeholder ${className}`}>
    <span>FANDOMVERSE</span>
  </div>
);

export const ArticleCard = ({ article, style, className = '' }) => {
  return (
    <motion.article 
      className={`fv-card fv-article-card ${className}`}
      style={style}
      whileHover={{ y: -4 }}
    >
      <BookmarkButton item={article} className="fv-card-bookmark" />
      <Link to={article.destination || `/article/${article.id}`} className="fv-card-link">
        <div className="fv-card-image-wrap fv-ratio-landscape">
          {article.image ? <img src={article.image} alt={article.title} loading="lazy" /> : <ImagePlaceholder label={article.title} />}
        </div>
        <div className="fv-card-content">
          <div className="fv-card-meta">
            {article.category && <span className="fv-card-category">{article.category}</span>}
            {article.readTime && <><span>/</span><span>{article.readTime}</span></>}
          </div>
          <h3 className="fv-card-title">{article.title}</h3>
          {article.description && <p className="fv-card-excerpt">{article.description}</p>}
          {article.author && <span className="fv-card-author">By {article.author}</span>}
        </div>
      </Link>
    </motion.article>
  );
};

export const CharacterCard = ({ character, style, className = '' }) => {
  return (
    <motion.article 
      className={`fv-card fv-character-card ${className}`}
      style={style}
      whileHover={{ y: -4 }}
    >
      <BookmarkButton item={character} className="fv-card-bookmark" />
      <div className="fv-card-image-wrap fv-ratio-portrait">
        {character.image ? <img src={character.image} alt={character.name} loading="lazy" /> : <ImagePlaceholder label={character.name} />}
        <div className="fv-card-gradient" />
        <div className="fv-card-content fv-character-overlay">
          <span className="fv-card-franchise">{character.franchise || character.series}</span>
          <h3 className="fv-card-title">{character.name || character.title}</h3>
          <div className="fv-card-traits">
            {(character.traits || []).slice(0, 2).map((t, i) => <span key={i} className="fv-trait">{t}</span>)}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const EventCard = ({ event, style, className = '' }) => {
  return (
    <motion.article 
      className={`fv-card fv-event-card ${className}`}
      style={style}
      whileHover={{ y: -4 }}
    >
      <BookmarkButton item={event} className="fv-card-bookmark" />
      <Link to={event.destination || `/event/${event.id}`} className="fv-card-link">
        <div className="fv-card-image-wrap fv-ratio-poster">
          {event.image ? <img src={event.image} alt={event.title} loading="lazy" /> : <ImagePlaceholder label={event.title} />}
          <div className="fv-card-gradient" />
          <div className="fv-card-date-badge">
            <span className="fv-date-day">{event.date?.split(' ')[1] || 'TBA'}</span>
            <span className="fv-date-month">{event.date?.split(' ')[0] || ''}</span>
          </div>
        </div>
        <div className="fv-card-content fv-event-info">
          <h3 className="fv-card-title">{event.title}</h3>
          <span className="fv-card-location">{event.location}</span>
          {event.category && <span className="fv-card-category">{event.category}</span>}
        </div>
      </Link>
    </motion.article>
  );
};

export const MerchandiseCard = ({ product, style, className = '' }) => {
  return (
    <motion.article 
      className={`fv-card fv-merch-card ${className}`}
      style={style}
      whileHover={{ y: -4 }}
    >
      <BookmarkButton item={product} className="fv-card-bookmark" />
      <div className="fv-card-image-wrap fv-ratio-product">
        {product.image ? <img src={product.image} alt={product.title} loading="lazy" /> : <ImagePlaceholder label={product.title} />}
      </div>
      <div className="fv-card-content">
        <div className="fv-card-meta">
          <span className="fv-card-status">{product.status || 'Available'}</span>
        </div>
        <h3 className="fv-card-title">{product.title || product.name}</h3>
        <span className="fv-card-price">{product.price}</span>
        <AddToCartButton product={product} className="fv-card-add-btn" />
      </div>
    </motion.article>
  );
};

export const ReleaseCard = ({ release, style, className = '' }) => {
  return (
    <motion.article 
      className={`fv-card fv-release-card ${className}`}
      style={style}
      whileHover={{ y: -4 }}
    >
      <BookmarkButton item={release} className="fv-card-bookmark" />
      <Link to={release.destination || `/releases?category=${release.category}`} className="fv-card-link">
        <div className="fv-card-image-wrap fv-ratio-cinematic">
          {release.image ? <img src={release.image} alt={release.title} loading="lazy" /> : <ImagePlaceholder label={release.title} />}
          <span className={`fv-card-release-status fv-status-${release.status?.toLowerCase().replace(/\s+/g, '-')}`}>{release.status}</span>
        </div>
        <div className="fv-card-content">
          <div className="fv-card-meta">
            <span className="fv-card-category">{release.category}</span>
            <span>/</span>
            <span>{release.releaseDate || release.date}</span>
          </div>
          <h3 className="fv-card-title">{release.title}</h3>
        </div>
      </Link>
    </motion.article>
  );
};
