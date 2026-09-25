import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

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
            <Link to="/releases" className="fv-nav-link">RELEASES</Link>
          </nav>
        </div>

        <div className="fv-navbar-right">
          <Link to="/search" aria-label="Search" onClick={() => setMobileMenuOpen(false)}>
            <IconButton icon={Search} aria-label="Search" />
          </Link>
          <Link to="/bookmarks" aria-label="Bookmarks" className="fv-desktop-only" onClick={() => setMobileMenuOpen(false)}>
            <IconButton icon={Bookmark} aria-label="Bookmarks" />
          </Link>
          <Link to="/cart" aria-label={`Cart${totalQuantity ? `, ${totalQuantity} items` : ''}`} className="fv-cart-link" onClick={() => setMobileMenuOpen(false)}>
            <IconButton icon={ShoppingCart} aria-label="Cart" />
            {totalQuantity > 0 && <span className="fv-cart-count" aria-label={`${totalQuantity} items in cart`}>{totalQuantity}</span>}
          </Link>
          <div className="fv-desktop-only">
            {isAuthenticated ? <Button variant="ghost" onClick={logout} style={{ padding: '0 16px', height: '40px' }} aria-label={`Log out ${user.name}`}>Log out</Button> : <Link to="/login" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" style={{ padding: '0 16px', height: '40px' }}>Sign In</Button></Link>}
          </div>
          {isAuthenticated ? <IconButton icon={LogOut} aria-label="Log out" className="fv-mobile-only" onClick={logout} /> : <Link to="/login" aria-label="Sign in" className="fv-mobile-only" onClick={() => setMobileMenuOpen(false)}><IconButton icon={User} aria-label="Sign in" /></Link>}
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
          <Link to="/releases" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>RELEASES</Link>
          <Link to="/bookmarks" className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>BOOKMARKS</Link>
        </div>
      )}
    </header>
  );
}
