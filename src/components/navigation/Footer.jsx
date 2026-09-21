import React from 'react';
import { Container } from '../ui/Container';
import './Footer.css';

export function Footer() {
  return (
    <footer className="fv-footer">
      <Container>
        <div className="fv-footer-grid">
          <div className="fv-footer-brand">
            <span className="fv-brand-text">FANDOMVERSE</span>
            <p className="fv-footer-desc">
              The ultimate sanctuary for fandom discovery. Explore Anime, Gaming, Movies, and beyond in a cinematic experience.
            </p>
          </div>
          <div className="fv-footer-links">
            <h4>Explore</h4>
            <a href="#">Anime</a>
            <a href="#">Gaming</a>
            <a href="#">Movies</a>
            <a href="#">K-Pop</a>
          </div>
          <div className="fv-footer-links">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="fv-footer-bottom">
          <p>&copy; {new Date().getFullYear()} FandomVerse. All rights reserved. Content provided for discovery purposes.</p>
        </div>
      </Container>
    </footer>
  );
}
