import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../ui/Container';
import { charactersByCategory } from '../../data/mockData';
import { FloatingElement } from '../ui/FloatingElement';
import { Button } from '../ui/Button';
import './CharacterSpotlight.css';

export function CharacterSpotlight() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const characterSpotlight = charactersByCategory.gaming[0];

  const containerRef = useRef(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPointerPos({ x, y });
    }
  };

  const handlePointerLeave = () => {
    setPointerPos({ x: 0, y: 0 });
  };

  return (
    <section className="fv-section fv-character-section">
      <Container>
        <div 
          className="fv-character-layout"
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Background Layer: Atmosphere */}
          <motion.div 
            className="fv-character-bg-layer"
            animate={{ 
              x: pointerPos.x * -20, 
              y: pointerPos.y * -20 
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          >
            <div className="fv-character-bg-glow"></div>
            <div className="fv-character-bg-particles"></div>
          </motion.div>

          <div style={{ position: 'absolute', top: -40, right: -40, fontSize: '180px', lineHeight: 0.8, color: 'rgba(255,255,255,0.02)', zIndex: 1, pointerEvents: 'none', fontFamily: 'var(--font-family-display)', fontStyle: 'italic', textTransform: 'uppercase' }}>
            {characterSpotlight.name.split(' ')[0]}
          </div>

          <div className="fv-character-image-col" style={{ zIndex: 2 }}>
            <motion.div
              className="fv-character-image-wrapper"
              animate={{ 
                x: pointerPos.x * 10, 
                y: pointerPos.y * 10 
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            >
              {characterSpotlight.image ? (
                <motion.img 
                  src={characterSpotlight.image} 
                  alt={characterSpotlight.name} 
                  className="fv-character-img" 
                  style={{ y }} 
                />
              ) : (
                <div className="fv-character-img-placeholder">FANDOMVERSE</div>
              )}
            </motion.div>
            
            {/* Foreground Layer: Grain & Lighting */}
            <motion.div 
              className="fv-character-fg-layer"
              animate={{ 
                x: pointerPos.x * 30, 
                y: pointerPos.y * 30 
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
            <div className="fv-character-img-overlay" />
          </div>

          <div className="fv-character-info-col">
            <FloatingElement delay={0} yOffset={10} duration={6}>
              <div className="fv-section-number">03 // SPOTLIGHT</div>
            </FloatingElement>
            
            <motion.h2 
              className="fv-character-name"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {characterSpotlight.name}
            </motion.h2>
            
            <motion.p 
              className="fv-character-franchise"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {characterSpotlight.franchise}
            </motion.p>
            
            <motion.div 
              className="fv-character-stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="fv-stat">
                <span className="fv-stat-label">Class</span>
                <span className="fv-stat-value">{characterSpotlight.class || characterSpotlight.traits?.[0]}</span>
              </div>
              <div className="fv-stat">
                <span className="fv-stat-label">Trait</span>
                <span className="fv-stat-value">{characterSpotlight.traits?.[1] || 'Unknown'}</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="fv-character-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {characterSpotlight.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="ghost">View Full Profile</Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
