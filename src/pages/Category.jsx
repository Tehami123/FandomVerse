import { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../components/ui/Container';
import { categoryDetails } from '../data/categoryData';
import { TextReveal } from '../components/ui/TextReveal';
import { ArrowRight } from 'lucide-react';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { AddToCartButton } from '../components/ui/AddToCartButton';
import { getContentDestination } from '../utils/contentData';
import './Category.css';

const EditorialPlaceholder = ({ label }) => <div className="fv-category-image-placeholder" aria-label={`${label} artwork unavailable`}>FANDOMVERSE</div>;

export function Category() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categoryDetails[categoryId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  if (!category) {
    return <Navigate to="/" replace />;
  }
  const bookmarkItem = (item, contentType) => ({
    ...item,
    title: item.title || item.name,
    category: category.name,
    contentType,
    destination: getContentDestination({ ...item, category: category.name }, contentType),
  });

  return (
    <div className="fv-category-page" style={{ '--cat-accent': category.accentColor }}>
      {/* 1. Category Hero */}
      <section className="fv-category-hero">
        <div className="fv-category-hero-bg">
          <motion.img 
            src={category.heroImage} 
            alt={category.name}
            style={{ y: yBg }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <div className="fv-category-hero-overlay" />
          <div className="fv-category-hero-glow" />
        </div>
        
        <Container className="fv-category-hero-content">
          <div className="fv-category-hero-left">
            <div className="fv-category-breadcrumb">
              <Link to="/">HOME</Link> <span className="divider">/</span> CATEGORY <span className="divider">/</span> <span style={{ color: 'var(--cat-accent)' }}>{category.name}</span>
            </div>
            <h1 className="fv-category-title">
              <TextReveal text={category.name} delay={0.1} />
            </h1>
          </div>
          
          <div className="fv-category-hero-right">
            <motion.p 
              className="fv-category-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {category.description}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* 2. Featured Section */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">01 // FEATURED</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Featured from the archive
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-featured-composition">
            <motion.div 
              className="fv-featured-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BookmarkButton item={bookmarkItem(category.featuredContent, 'Featured')} style={{ position: 'absolute', top: 16, right: 16, zIndex: 3 }} />
              {category.featuredContent.image ? <img src={category.featuredContent.image} alt={category.featuredContent.title} /> : <EditorialPlaceholder label={category.featuredContent.title} />}
              <div className="fv-featured-overlay">
                <span className="fv-featured-meta">{category.featuredContent.type}</span>
                <h3>{category.featuredContent.title}</h3>
              </div>
            </motion.div>
            
            <motion.div 
              className="fv-featured-secondary"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '32px', marginBottom: '16px' }}>Dive Deeper</h4>
                <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  Explore the essential stories and fundamental lore that defines the {category.name} universe.
                </p>
              </div>
              <button className="fv-cat-btn">EXPLORE <ArrowRight size={16} /></button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Trending Rail */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">02 // TRENDING</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              What's moving now
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-content-rail">
            {category.trendingContent.map((item, idx) => (
              <motion.div 
                key={idx}
                className="fv-rail-item-16-9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <BookmarkButton item={bookmarkItem(item, 'Trending')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', aspectRatio: '16/9' }}>
                  {item.image ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} /> : <EditorialPlaceholder label={item.title} />}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.7), transparent)', opacity: 0.7 }} />
                </div>
                <div className="fv-card-content-editorial">
                  <h4>{item.title}</h4>
                  <span style={{ color: 'var(--cat-accent)' }}>{item.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* 4. Discovery Rail */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">03 // DISCOVERY</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Explore the archive
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-content-rail">
            {category.latestContent?.map((item, idx) => (
              <motion.div 
                key={idx}
                className="fv-rail-item-16-9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <BookmarkButton item={bookmarkItem(item, 'Discovery')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', aspectRatio: '16/9' }}>
                  {item.image ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} /> : <EditorialPlaceholder label={item.title} />}
                </div>
                <div className="fv-card-content-editorial">
                  <h4>{item.title}</h4>
                  <span style={{ color: 'var(--cat-accent)' }}>{item.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Characters */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">04 // CHARACTERS</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Faces of the fandom
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-content-rail">
            {category.characters?.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <BookmarkButton item={bookmarkItem(item, 'Character')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div className="fv-character-card">
                  {item.image ? <img src={item.image} alt={item.name} /> : <EditorialPlaceholder label={item.name} />}
                  <div className="fv-character-overlay">
                    <span className="fv-character-franchise">{item.franchise}</span>
                    <h4 className="fv-character-name">{item.name}</h4>
                    <p className="fv-character-bio">{item.biography}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Articles */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">05 // ARTICLES</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              From the editorial desk
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-article-grid">
            {category.articles?.map((item, idx) => (
              <motion.div 
                key={idx}
                className={idx === 0 ? "fv-article-lead" : "fv-article-card"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => navigate(`/article/${item.id}`)}
              >
                <BookmarkButton item={bookmarkItem(item, 'Article')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="fv-card-image-wrapper">
                  {item.image ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <EditorialPlaceholder label={item.title} />}
                </div>
                <div className="fv-card-content-editorial">
                  <h4 style={{ fontSize: idx === 0 ? '32px' : '20px' }}>{item.title}</h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--cat-accent)' }}>{item.category || category.name}</span>
                    <span style={{ color: 'var(--color-border)' }}>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Trailers */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">06 // TRAILERS</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Watch what's coming
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-trailer-grid">
            {category.trailers?.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ position: 'relative' }}
                onClick={() => navigate(`/trailer/${item.id}`)}
              >
                <BookmarkButton item={bookmarkItem(item, 'Trailer')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div className="fv-trailer-wrapper">
                  {item.image ? <img src={item.image} alt={item.title} /> : <EditorialPlaceholder label={item.title} />}
                  <div className="fv-trailer-overlay">
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--cat-accent)', letterSpacing: '0.1em' }}>{item.status}</span>
                    <div className="fv-play-btn">
                      <div className="fv-play-icon"></div>
                    </div>
                    <h4 style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '18px', fontWeight: 600 }}>{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Events */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">07 // EVENTS</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Upcoming events
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-event-list">
            {category.events?.map((item, idx) => (
              <motion.div 
                key={idx}
                className="fv-event-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ position: 'relative' }}
                onClick={() => navigate(`/event/${item.id}`)}
              >
                <BookmarkButton item={bookmarkItem(item, 'Event')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div className="fv-event-date-col">
                  <span>{item.date}</span>
                </div>
                <div className="fv-event-details-col">
                  <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '28px', marginBottom: '4px' }}>{item.title}</h4>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                    <span>📍 {item.location}</span>
                    <span style={{ color: 'var(--cat-accent)' }}>🏷️ {item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Merchandise */}
      <section className="fv-category-section" style={{ paddingBottom: '120px' }}>
        <Container>
          <div className="fv-editorial-header">
            <div className="fv-editorial-number">08 // MERCHANDISE</div>
            <motion.h2 className="fv-editorial-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Curated collectibles
            </motion.h2>
            <div className="fv-editorial-divider"></div>
          </div>
          
          <div className="fv-merch-grid">
            {category.merchandise?.map((item, idx) => (
              <motion.div 
                key={idx}
                className="fv-merch-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ position: 'relative' }}
              >
                <BookmarkButton item={bookmarkItem(item, 'Merchandise')} className="fv-category-bookmark" style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} />
                <div className="fv-merch-img">
                  {item.image ? <img src={item.image} alt={item.title} /> : <EditorialPlaceholder label={item.title} />}
                </div>
                <div className="fv-merch-info">
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>{item.status}</div>
                  <h4>{item.title}</h4>
                  <div className="fv-merch-price">{item.price}</div>
                  <AddToCartButton product={item} style={{ width: '100%', marginTop: '12px' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
