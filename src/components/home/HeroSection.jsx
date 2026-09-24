import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Scene3D } from '../visuals/Scene3D';
import { TextReveal } from '../ui/TextReveal';
import { FloatingElement } from '../ui/FloatingElement';
import { ArrowRight } from 'lucide-react';
const heroBg = '/assets/homepage/homepage-hero.jpg';
import './HeroSection.css';

export function HeroSection() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yObj = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section className="fv-hero">
      <div className="fv-hero-bg">
        <motion.div style={{ position: 'absolute', inset: 0, y: yBg, zIndex: 0 }}>
          <motion.img 
            src={heroBg} 
            alt="Cinematic Background"
            className="fv-hero-bg-img"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>
        
        <motion.div style={{ position: 'absolute', inset: 0, y: yObj, zIndex: 1, pointerEvents: 'none' }}>
          <Scene3D />
        </motion.div>
        
        <div className="fv-hero-overlay" />
      </div>
      
      <Container className="fv-hero-content">
        <div className="fv-hero-indicator desktop-only">
          <span>01</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>

        <div className="fv-hero-editorial-layout">
          <div className="fv-hero-left">
            <FloatingElement delay={0} yOffset={5} duration={7}>
              <div className="fv-hero-metadata">
                <span>VOL. 01</span>
                <span className="divider"></span>
                <span>THE ARCHIVE</span>
              </div>
            </FloatingElement>
            
            <h1 className="fv-hero-title">
              <TextReveal text="ENTER THE" delay={0.1} />
              <br />
              <TextReveal text="VERSE" delay={0.3} />
            </h1>
            
            <motion.div 
              className="fv-hero-categories-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              ANIME / GAMING / MOVIES / TV / K-POP / COMICS / MANGA
            </motion.div>

            <motion.p 
              className="fv-hero-desc"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              The ultimate destination for every fandom.<br/>
              Explore, discover, and immerse yourself in the culture<br/>
              that brings us together.
            </motion.p>
            
            <motion.div 
              className="fv-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <button className="fv-hero-cta-btn" type="button" onClick={() => navigate('/search')}>
                <span className="fv-hero-cta-icon"><ArrowRight size={18} strokeWidth={1} /></span>
                <span className="fv-hero-cta-text">EXPLORE THE VERSE</span>
                <span className="fv-hero-cta-line"></span>
              </button>
            </motion.div>
          </div>

          <div className="fv-hero-right desktop-only">
            <motion.div 
              className="fv-hero-right-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              YOUR FANDOM<br/>LIVES HERE
              <span className="fv-hero-right-line"></span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
