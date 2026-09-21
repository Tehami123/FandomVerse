import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, User, Menu } from 'lucide-react';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import './Navbar.css';

export function Navbar() {
  return (
    <header className="fv-navbar">
      <Container className="fv-navbar-inner">
        <div className="fv-navbar-left">
          <IconButton icon={Menu} aria-label="Menu" className="fv-mobile-only" />
          <Link to="/" className="fv-brand">
            <span className="fv-brand-text">FANDOMVERSE</span>
          </Link>
          
          <nav className="fv-desktop-nav">
            <Link to="/" className="fv-nav-link">HOME</Link>
            <Link to="/category/anime" className="fv-nav-link">ANIME</Link>
            <Link to="/category/gaming" className="fv-nav-link">GAMING</Link>
            <Link to="/category/movies" className="fv-nav-link">MOVIES</Link>
            <Link to="/category/tv" className="fv-nav-link">TV SHOWS</Link>
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
    </header>
  );
}
