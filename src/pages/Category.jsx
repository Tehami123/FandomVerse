import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { categoryDetails } from '../data/categoryData';
import { TextReveal } from '../components/ui/TextReveal';
import { ArrowRight } from 'lucide-react';
import './Category.css';

export function Category() {
  const { categoryId } = useParams();
  const category = categoryDetails[categoryId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="fv-category-page" style={{ '--cat-accent': category.accentColor }}>
      {/* Category Hero */}
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
        </div>
        
        <Container className="fv-category-hero-content">
          <div className="fv-category-breadcrumb">
            <Link to="/">HOME</Link> <span className="divider">/</span> CATEGORY <span className="divider">/</span> <span style={{ color: 'var(--cat-accent)' }}>{category.name.toUpperCase()}</span>
          </div>
          
          <h1 className="fv-category-title">
            <TextReveal text={category.name} delay={0.1} />
          </h1>
          
          <motion.p 
            className="fv-category-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {category.description}
          </motion.p>
        </Container>
      </section>

      {/* Featured Section */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-section-header-editorial">
            <div className="fv-section-number" style={{ color: 'var(--cat-accent)' }}>01 // FEATURED</div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              SPOTLIGHT
            </motion.h2>
            <div className="fv-section-divider"></div>
          </div>
          
          <motion.div 
            className="fv-category-featured-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <img src={category.featuredContent.image} alt={category.featuredContent.title} />
            <div className="fv-category-featured-overlay" />
            <div className="fv-category-featured-content">
              <h3>{category.featuredContent.title}</h3>
              <p>{category.featuredContent.type}</p>
              <button className="fv-cat-btn">EXPLORE <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Trending Rail */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-section-header-editorial">
            <div className="fv-section-number" style={{ color: 'var(--cat-accent)' }}>02 // TRENDING</div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              NOW
            </motion.h2>
            <div className="fv-section-divider"></div>
          </div>
          
          <div className="fv-category-rail">
            {category.trendingContent.map((item, idx) => (
              <motion.div 
                key={idx}
                className="fv-category-rail-item"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card imageSrc={item.image} imageAlt={item.title} className="fv-cat-card" style={{ borderBottom: `2px solid var(--cat-accent)` }}>
                  <div className="fv-cat-card-content">
                    <h4>{item.title}</h4>
                    <span>{item.type}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Articles / Latest */}
      <section className="fv-category-section">
        <Container>
          <div className="fv-section-header-editorial">
            <div className="fv-section-number" style={{ color: 'var(--cat-accent)' }}>03 // LATEST</div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              ARTICLES
            </motion.h2>
            <div className="fv-section-divider"></div>
          </div>
          
          <div className="fv-category-grid">
            {category.articles.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card imageSrc={item.image} imageAlt={item.title} className="fv-cat-card">
                  <div className="fv-cat-card-content">
                    <h4>{item.title}</h4>
                    <span>{item.readTime}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
