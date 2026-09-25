import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { categories } from '../../data/mockData';
import { Scene3D } from '../visuals/Scene3D';
import './CategoryExplorer.css';

export function CategoryExplorer() {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
      setPointerPos({ x, y });
    }
  };

  const positions = {
    anime: { top: '15%', left: '35%' },
    gaming: { top: '25%', left: '75%' },
    movies: { top: '55%', left: '85%' },
    tvshows: { top: '80%', left: '65%' },
    kpop: { top: '90%', left: '40%' },
    comics: { top: '70%', left: '15%' },
    manga: { top: '40%', left: '10%' }
  };

  const catAccents = {
    anime: 'var(--color-anime)',
    gaming: 'var(--color-gaming)',
    movies: 'var(--color-movies)',
    tvshows: 'var(--color-tv)',
    kpop: 'var(--color-kpop)',
    comics: 'var(--color-comics)',
    manga: 'var(--color-manga)'
  };

  return (
    <section className="fv-section fv-categories-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2, pointerEvents: 'none' }}>
        <Scene3D />
      </div>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="fv-section-header-editorial">
          <div className="fv-section-number">01 // THE UNIVERSE</div>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            EXPLORE
          </motion.h2>
          <div className="fv-section-divider"></div>
        </div>
        
        <div 
          className="fv-constellation-container" 
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPointerPos({ x: 0, y: 0 })}
        >
          <motion.div 
            className="fv-constellation-center"
            animate={{ x: pointerPos.x * -0.5, y: pointerPos.y * -0.5 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            FANDOM<br/>VERSE
          </motion.div>

          <svg className="fv-constellation-lines" width="100%" height="100%">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            {/* Pseudo-connections from center (50%, 50%) to nodes */}
            {categories.map(cat => {
              const pos = positions[cat.id];
              if (!pos) return null;
              const isHovered = hoveredId === cat.id;
              const accent = catAccents[cat.id] || 'var(--color-text-primary)';
              
              return (
                <motion.line
                  key={`line-${cat.id}`}
                  x1="50%"
                  y1="50%"
                  x2={pos.left}
                  y2={pos.top}
                  stroke={isHovered ? accent : 'url(#line-gradient)'}
                  strokeWidth={isHovered ? 2 : 1}
                  className="fv-constellation-line"
                  animate={{ 
                    strokeOpacity: isHovered ? 1 : 0.3,
                    filter: isHovered ? `drop-shadow(0 0 8px ${accent})` : 'none'
                  }}
                />
              );
            })}
          </svg>

          {categories.map((cat, index) => {
            const pos = positions[cat.id];
            if (!pos) return null;
            
            const isHovered = hoveredId === cat.id;
            const accent = catAccents[cat.id] || 'var(--color-text-primary)';

            return (
              <motion.div
                key={cat.id}
                className={`fv-constellation-node ${isHovered ? 'hovered' : ''}`}
                style={{ top: pos.top, left: pos.left }}
                animate={{ 
                  x: pointerPos.x * (index % 2 === 0 ? 1 : -1), 
                  y: pointerPos.y * (index % 2 === 0 ? -1 : 1) 
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                onHoverStart={() => setHoveredId(cat.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Link to={`/category/${cat.id}`} className="fv-node-link">
                  <motion.div 
                    className="fv-node-dot"
                    animate={{ 
                      backgroundColor: isHovered ? accent : 'rgba(255,255,255,0.2)',
                      scale: isHovered ? 1.5 : 1,
                      boxShadow: isHovered ? `0 0 20px ${accent}, 0 0 40px ${accent}` : '0 0 0px transparent'
                    }}
                  />
                  <div className="fv-node-content">
                    <motion.div 
                      className="fv-node-title"
                      animate={{ 
                        color: isHovered ? accent : 'var(--color-text-secondary)',
                        scale: isHovered ? 1.1 : 1,
                        x: isHovered ? 10 : 0
                      }}
                    >
                      {cat.title}
                    </motion.div>
                    {isHovered && (
                      <motion.div 
                        className="fv-node-explore"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 10 }}
                        style={{ color: accent, display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <span>Explore</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
