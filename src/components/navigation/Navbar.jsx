import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, User, Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import './Navbar.css';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fv-navbar">
      <Container className="fv-navbar-inner">
        <div className="fv-navbar-left">
          <IconButton 
            icon={mobileMenuOpen ? X : Menu} 
            aria-label="Menu" 
            className="fv-mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <Link to="/" className="fv-brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="fv-brand-text">FANDOMVERSE</span>
          </Link>
          
          <nav className="fv-desktop-nav">
            <Link to="/" className="fv-nav-link">HOME</Link>
            <Link to="/category/anime" className="fv-nav-link">ANIME</Link>
            <Link to="/category/gaming" className="fv-nav-link">GAMING</Link>
            <Link to="/category/movies" className="fv-nav-link">MOVIES</Link>
            <Link to="/category/tv" className="fv-nav-link">TV SHOWS</Link>
            <Link to="/category/kpop" className="fv-nav-link">K-POP</Link>
            <Link to="/category/comics" className="fv-nav-link">COMICS</Link>
            <Link to="/category/manga" className="fv-nav-link">MANGA</Link>
          </nav>
        </div>

        <div className="fv-navbar-right">
          <IconButton icon={Search} aria-label="Search" />
          <IconButton icon={Bookmark} aria-label="Bookmarks" className="fv-desktop-only" />
          <div className="fv-desktop-only">
            <Button variant="ghost" style={{ padding: '0 16px', height: '40px' }}>Sign In</Button>
          </div>
          <IconButton icon={User} aria-label="Profile" className="fv-mobile-only" />
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="fv-mobile-nav">
          <Link to="/" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
          <Link to="/category/anime" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>ANIME</Link>
          <Link to="/category/gaming" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>GAMING</Link>
          <Link to="/category/movies" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>MOVIES</Link>
          <Link to="/category/tv" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>TV SHOWS</Link>
          <Link to="/category/kpop" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>K-POP</Link>
          <Link to="/category/comics" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>COMICS</Link>
          <Link to="/category/manga" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>MANGA</Link>
        </div>
      )}
    </header>
  );
}
