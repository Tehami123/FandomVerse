import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '../ui/Container';
import { categories } from '../../data/mockData';
import { Scene3D } from '../visuals/Scene3D';
import './CategoryExplorer.css';

export function CategoryExplorer() {
  const [activeId, setActiveId] = useState(categories[0]?.id || 1);

  return (
    <section className="fv-section fv-categories-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none' }}>
        <Scene3D />
      </div>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="fv-section-header-editorial">
          <div className="fv-section-number">01 // EXPLORE</div>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            THE VERSE
          </motion.h2>
          <div className="fv-section-divider"></div>
        </div>
        <div className="fv-categories-wall">
          {categories.map((cat, index) => {
            const isActive = activeId === cat.id;
            
            const catAccents = {
              anime: 'var(--color-anime)',
              gaming: 'var(--color-gaming)',
              movies: 'var(--color-movies)',
              tvshows: 'var(--color-tv)',
              kpop: 'var(--color-kpop)',
              comics: 'var(--color-comics)',
              manga: 'var(--color-manga)'
            };
            const accent = catAccents[cat.id] || 'var(--color-text-primary)';
            
            return (
              <motion.div
                key={cat.id}
                className={`fv-category-slice ${isActive ? 'active' : ''}`}
                onHoverStart={() => setActiveId(cat.id)}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ borderBottom: isActive ? `2px solid ${accent}` : '1px solid transparent' }}
              >
                <div className="fv-category-bg">
                  <img src={cat.image} alt={cat.title} />
                  <div className="fv-category-overlay" />
                </div>
                <div className="fv-category-content">
                  <motion.div layout className="fv-category-title-vert" style={{ color: isActive ? accent : 'var(--color-text-secondary)' }}>
                    <span style={{ opacity: 0.5, marginRight: '12px', fontSize: '12px' }}>0{index + 1}</span>
                    {cat.title}
                  </motion.div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        className="fv-category-active-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.1 }}
                        style={{ position: 'relative', width: '100%' }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '8px', letterSpacing: '0.1em' }}>0{index + 1}</div>
                        <h3 style={{ textTransform: 'uppercase', fontSize: '28px', letterSpacing: '0.05em', margin: 0 }}>{cat.title}</h3>
                        <Link to={`/category/${cat.id}`} style={{ position: 'absolute', bottom: '4px', right: '0', display: 'block', zIndex: 10 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
