import { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../components/ui/Container';
import { categoryDetails } from '../data/categoryData';
import { categories } from '../data/mockData';
import { TextReveal } from '../components/ui/TextReveal';
import { ArrowRight } from 'lucide-react';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { ContentCard, EventCard, ArticleCard } from '../components/ui/ContentCards';
import { getContentDestination } from '../utils/contentData';
import { AmbientFandomBackground } from '../components/visuals/AmbientFandomBackground';
import './Category.css';

const EditorialPlaceholder = ({ label }) => <div className="fv-category-image-placeholder" aria-label={`${label} artwork unavailable`}>FANDOMVERSE</div>;

const CategoryNavStrip = ({ currentId }) => (
  <div className="fv-category-nav-strip">
    <Container>
      <div className="fv-category-nav-rail">
        {categories.map((c) => (
          <Link 
            key={c.id} 
            to={`/category/${c.id}`} 
            className={`fv-category-nav-item ${c.id === currentId ? 'active' : ''}`}
            style={{ '--item-accent': `var(--color-${c.id})` }}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </Container>
  </div>
);

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
      <AmbientFandomBackground category={categoryId} type="category" variant="category" />
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
      <CategoryNavStrip currentId={categoryId} />
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
              <div key={idx} className="fv-rail-card-wrapper">
                <ContentCard 
                  item={item}
                  bookmarkItem={bookmarkItem(item, 'Trending')}
                  onClick={() => navigate(getContentDestination({...item, category: category.name}, item.type || item.contentType))}
                />
              </div>
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
              <div key={idx} className="fv-rail-card-wrapper">
                <ContentCard 
                  item={item}
                  bookmarkItem={bookmarkItem(item, 'Discovery')}
                  onClick={() => navigate(getContentDestination({...item, category: category.name}, item.type || item.contentType))}
                />
              </div>
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
              <div key={idx} className="fv-rail-card-wrapper fv-rail-character">
                <ContentCard 
                  item={{...item, type: 'character'}}
                  bookmarkItem={bookmarkItem(item, 'Character')}
                  onClick={() => navigate(`/character/${item.id}`)}
                />
              </div>
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
              <ArticleCard 
                key={idx}
                item={{...item, type: 'article', description: item.description || 'Explore the latest insights from the FandomVerse editorial team in this exclusive dive into the universe.'}}
                bookmarkItem={bookmarkItem(item, 'Article')}
                onClick={() => navigate(`/article/${item.id}`)}
              />
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
              <ContentCard 
                key={idx}
                item={{...item, type: 'trailer'}}
                bookmarkItem={bookmarkItem(item, 'Trailer')}
                onClick={() => navigate(`/trailer/${item.id}`)}
              />
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
              <EventCard 
                key={idx}
                item={item}
                bookmarkItem={bookmarkItem(item, 'Event')}
                asEditorial={true}
                index={idx}
                onClick={() => navigate(`/event/${item.id}`)}
              />
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
              <ContentCard 
                key={idx}
                item={{...item, type: 'merchandise'}}
                bookmarkItem={bookmarkItem(item, 'Merchandise')}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
