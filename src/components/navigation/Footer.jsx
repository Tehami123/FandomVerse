import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import './Footer.css';

const VISITOR_COUNT_KEY = 'fandomverse_simulated_visitor_count';
const INITIAL_VISITOR_COUNT = 1284;

const getInitialVisitorCount = () => {
  const storedCount = Number.parseInt(window.localStorage.getItem(VISITOR_COUNT_KEY) || '', 10);
  const nextCount = Number.isFinite(storedCount) && storedCount >= INITIAL_VISITOR_COUNT
    ? storedCount
    : INITIAL_VISITOR_COUNT;
  window.localStorage.setItem(VISITOR_COUNT_KEY, String(nextCount));
  return nextCount;
};

export function Footer() {
  const [visitorCount] = useState(getInitialVisitorCount);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timerId);
  }, []);

  return (
    <footer className="fv-footer">
      <Container>
        <div className="fv-footer-grid">
          <div className="fv-footer-brand">
            <Link to="/" className="fv-footer-brand-link" aria-label="FandomVerse home">
              <img className="fv-footer-logo" src="/assets/branding/logo.jpg" alt="FandomVerse" />
            </Link>
            <p className="fv-footer-desc">
              The ultimate sanctuary for fandom discovery. Explore anime, gaming, movies, events, and every major universe in one cinematic archive.
            </p>
            <div className="fv-footer-status" aria-label="FandomVerse local demo status">
              <span>Simulated visitors: {visitorCount.toLocaleString()}</span>
              <time dateTime={currentTime.toISOString()}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</time>
            </div>
          </div>
          <div className="fv-footer-links">
            <h4>Explore</h4>
            <Link to="/category/anime">Anime</Link>
            <Link to="/category/gaming">Gaming</Link>
            <Link to="/category/movies">Movies</Link>
            <Link to="/category/tv">TV Shows</Link>
            <Link to="/category/kpop">K-Pop</Link>
            <Link to="/category/comics">Comics</Link>
            <Link to="/category/manga">Manga</Link>
          </div>
          <div className="fv-footer-links">
            <h4>Discover</h4>
            <Link to="/articles">Articles</Link>
            <Link to="/trailers">Trailers</Link>
            <Link to="/events">Events</Link>
            <Link to="/characters">Characters</Link>
            <Link to="/merchandise">Merchandise</Link>
            <Link to="/releases">Releases</Link>
          </div>
          <div className="fv-footer-links">
            <h4>Project</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="fv-footer-links">
            <h4>Utility</h4>
            <Link to="/search">Search</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
        <div className="fv-footer-bottom">
          <p>&copy; {new Date().getFullYear()} FandomVerse. All rights reserved. Content provided for discovery purposes.</p>
        </div>
      </Container>
    </footer>
  );
}
