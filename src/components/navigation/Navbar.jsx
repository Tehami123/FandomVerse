import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, ShoppingCart, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/IconButton';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const hoverCloseTimeoutRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();
  const { totalQuantity } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!navbarRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(hoverCloseTimeoutRef.current);
    };
  }, []);

  const supportsDesktopHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const cancelHoverClose = () => {
    window.clearTimeout(hoverCloseTimeoutRef.current);
  };

  const handleGroupMouseEnter = (id) => {
    if (!supportsDesktopHover()) return;
    cancelHoverClose();
    setOpenMenu(id);
  };

  const handleGroupMouseLeave = (id, event) => {
    if (!supportsDesktopHover() || openMenu !== id) return;
    const group = event.currentTarget;
    hoverCloseTimeoutRef.current = window.setTimeout(() => {
      if (!group.contains(document.activeElement)) setOpenMenu(null);
    }, 120);
  };

  const closeNavigation = () => {
    cancelHoverClose();
    setOpenMenu(null);
    setMobileMenuOpen(false);
  };

  const exploreItems = [
    ['Anime', '/category/anime'], ['Gaming', '/category/gaming'], ['Movies', '/category/movies'],
    ['TV Shows', '/category/tv'], ['K-Pop', '/category/kpop'], ['Comics', '/category/comics'], ['Manga', '/category/manga'],
  ];
  const discoverItems = [
    ['Articles', '/articles'], ['Trailers', '/trailers'], ['Events', '/events'],
    ['Characters', '/characters'], ['Summon', '/summon'], ['Fandom DNA', '/fandom-dna'], ['Fandom Face-Off', '/clash'], ['Merchandise', '/merchandise'], ['Releases', '/releases'],
  ];
  const isGroupActive = (items) => items.some(([, path]) => location.pathname === path || location.pathname.startsWith(`${path}/`));
  const authLabel = isAuthenticated ? 'LOG OUT' : 'SIGN UP';
  const authDestination = isAuthenticated ? '/login' : '/signup';

  const renderGroup = (label, group, id) => (
    <div
      className={`fv-nav-group${isGroupActive(group) ? ' is-active' : ''}`}
      onMouseEnter={() => handleGroupMouseEnter(id)}
      onMouseLeave={(event) => handleGroupMouseLeave(id, event)}
    >
      <button
        type="button"
        className="fv-nav-group-trigger"
        aria-expanded={openMenu === id}
        aria-controls={`fv-nav-menu-${id}`}
        onClick={() => {
          cancelHoverClose();
          setOpenMenu((current) => current === id ? null : id);
        }}
      >
        {label} <ChevronDown size={14} aria-hidden="true" />
      </button>
      {openMenu === id && (
        <div className="fv-nav-dropdown" id={`fv-nav-menu-${id}`} role="menu">
          {group.map(([itemLabel, path]) => (
            <Link
              key={path}
              to={path}
              role="menuitem"
              className={location.pathname === path || location.pathname.startsWith(`${path}/`) ? 'is-current' : ''}
              onClick={closeNavigation}
            >
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header ref={navbarRef} className={`fv-navbar ${scrolled ? 'scrolled' : ''}`}>
      <Container className="fv-navbar-inner">
        <div className="fv-navbar-left">
          <IconButton 
            icon={mobileMenuOpen ? X : Menu} 
            aria-label="Menu" 
            className="fv-mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <Link to="/" className="fv-brand" onClick={() => setMobileMenuOpen(false)}>
            <img className="fv-brand-logo" src="/assets/branding/logo.jpg" alt="FandomVerse" />
          </Link>
          
          <nav className="fv-desktop-nav">
            <Link to="/" className={`fv-nav-link${location.pathname === '/' ? ' is-current' : ''}`} onClick={closeNavigation}>HOME</Link>
            {renderGroup('EXPLORE', exploreItems, 'explore')}
            {renderGroup('DISCOVER', discoverItems, 'discover')}
            <Link to="/about" className={`fv-nav-link${location.pathname === '/about' ? ' is-current' : ''}`} onClick={closeNavigation}>ABOUT</Link>
            <Link to="/contact" className={`fv-nav-link${location.pathname === '/contact' ? ' is-current' : ''}`} onClick={closeNavigation}>CONTACT</Link>
            <Link to="/summon" className={`fv-nav-link${location.pathname === '/summon' ? ' is-current' : ''}`} onClick={closeNavigation}>SUMMON</Link>
            <Link to="/fandom-dna" className={`fv-nav-link${location.pathname === '/fandom-dna' ? ' is-current' : ''}`} onClick={closeNavigation}>FANDOM DNA</Link>
            <Link to="/clash" className={`fv-nav-link${location.pathname === '/clash' ? ' is-current' : ''}`} onClick={closeNavigation}> FANDOM CLASH</Link>
          </nav>
        </div>

        <div className="fv-navbar-right">
          <div className="fv-utility-nav fv-desktop-only">
            <Link to="/search" aria-label="Search" onClick={() => setMobileMenuOpen(false)} className="fv-nav-icon-link">
              <IconButton icon={Search} aria-label="Search" />
            </Link>
            <Link to="/bookmarks" aria-label="Bookmarks" onClick={() => setMobileMenuOpen(false)} className="fv-nav-icon-link">
              <IconButton icon={Bookmark} aria-label="Bookmarks" />
            </Link>
            <Link to="/cart" aria-label={`Cart${totalQuantity ? `, ${totalQuantity} items` : ''}`} className="fv-cart-link" onClick={() => setMobileMenuOpen(false)}>
              <IconButton icon={ShoppingCart} aria-label="Cart" />
              {totalQuantity > 0 && <span className="fv-cart-count" aria-label={`${totalQuantity} items in cart`}>{totalQuantity}</span>}
            </Link>
            {isAuthenticated ? (
              <button type="button" className="fv-nav-link fv-auth-button" onClick={logout} aria-label={`Log out ${user?.name || 'user'}`}>{authLabel}</button>
            ) : (
              <Link to={authDestination} className="fv-nav-link" onClick={() => setMobileMenuOpen(false)}>{authLabel}</Link>
            )}
          </div>
          {isAuthenticated ? <IconButton icon={LogOut} aria-label="Log out" className="fv-mobile-only" onClick={logout} /> : <Link to="/signup" aria-label="Sign up" className="fv-mobile-only" onClick={() => setMobileMenuOpen(false)}><IconButton icon={User} aria-label="Sign up" /></Link>}
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="fv-mobile-nav">
          <Link to="/" className="fv-nav-link" onClick={closeNavigation}>HOME</Link>
          <button type="button" className="fv-mobile-group-trigger" aria-expanded={openMenu === 'mobile-explore'} onClick={() => setOpenMenu((current) => current === 'mobile-explore' ? null : 'mobile-explore')}>EXPLORE <ChevronDown size={14} aria-hidden="true" /></button>
          {openMenu === 'mobile-explore' && <div className="fv-mobile-subnav">{exploreItems.map(([label, path]) => <Link key={path} to={path} onClick={closeNavigation}>{label}</Link>)}</div>}
          <button type="button" className="fv-mobile-group-trigger" aria-expanded={openMenu === 'mobile-discover'} onClick={() => setOpenMenu((current) => current === 'mobile-discover' ? null : 'mobile-discover')}>DISCOVER <ChevronDown size={14} aria-hidden="true" /></button>
          {openMenu === 'mobile-discover' && <div className="fv-mobile-subnav">{discoverItems.map(([label, path]) => <Link key={path} to={path} onClick={closeNavigation}>{label}</Link>)}</div>}
          <Link to="/about" className="fv-nav-link" onClick={closeNavigation}>ABOUT</Link>
          <Link to="/contact" className="fv-nav-link" onClick={closeNavigation}>CONTACT</Link>
          <Link to="/search" className="fv-nav-link" onClick={closeNavigation}>SEARCH</Link>
          <Link to="/bookmarks" className="fv-nav-link" onClick={closeNavigation}>BOOKMARKS</Link>
          <Link to="/cart" className="fv-nav-link" onClick={closeNavigation}>CART</Link>
          {isAuthenticated ? <button type="button" className="fv-nav-link fv-auth-button fv-mobile-auth" onClick={logout}>LOG OUT</button> : <Link to="/signup" className="fv-nav-link" onClick={closeNavigation}>SIGN UP</Link>}
        </div>
      )}
    </header>
  );
}
