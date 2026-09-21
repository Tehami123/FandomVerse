import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../ui/Container';
import { characterSpotlight } from '../../data/mockData';
import { Button } from '../ui/Button';
import { FloatingElement } from '../ui/FloatingElement';
import './CharacterSpotlight.css';

export function CharacterSpotlight() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="fv-section fv-character-section">
      <Container>
        <div className="fv-character-layout">
          <div style={{ position: 'absolute', top: -40, right: -40, fontSize: '180px', lineHeight: 0.8, color: 'rgba(255,255,255,0.03)', zIndex: 1, pointerEvents: 'none', fontFamily: 'var(--font-family-display)', fontStyle: 'italic', textTransform: 'uppercase' }}>
            {characterSpotlight.name.split(' ')[0]}
          </div>
          <div className="fv-character-image-col" style={{ zIndex: 2 }}>
            <motion.img 
              src={characterSpotlight.image} 
              alt={characterSpotlight.name} 
              className="fv-character-img"
              style={{ y }}
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
                <span className="fv-stat-value">{characterSpotlight.class}</span>
              </div>
              <div className="fv-stat">
                <span className="fv-stat-label">Weapon</span>
                <span className="fv-stat-value">{characterSpotlight.weapon}</span>
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
