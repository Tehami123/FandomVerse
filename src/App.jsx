import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppLayout } from './layouts/AppLayout'
import { Home } from './pages/Home'
import { Category } from './pages/Category'
import { SearchPage } from './pages/SearchPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { CustomCursor } from './components/ui/CustomCursor'
import { BookmarkProvider } from './context/BookmarkContext'
import { CartProvider } from './context/CartContext'
import { CartPage } from './pages/CartPage'
import { ArticleDetail } from './pages/ArticleDetail'
import { TrailerDetail } from './pages/TrailerDetail'
import { EventDetail } from './pages/EventDetail'
import { CharacterDetail } from './pages/CharacterDetail'
import { Releases } from './pages/Releases'
import { ReleaseDetail } from './pages/ReleaseDetail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { AuthProvider } from './context/AuthContext.jsx'
import { ScrollToTop } from './components/navigation/ScrollToTop'

function RouteTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title = path === '/' ? 'FandomVerse | Fandom Discovery Archive'
      : path.startsWith('/category/') ? 'Category | FandomVerse'
        : path === '/search' ? 'Search | FandomVerse'
          : path === '/bookmarks' ? 'Bookmarks | FandomVerse'
            : path === '/cart' ? 'Cart | FandomVerse'
              : path === '/releases' ? 'Releases | FandomVerse'
                : path === '/about' ? 'About | FandomVerse'
                  : path === '/contact' ? 'Contact | FandomVerse'
                    : path === '/login' ? 'Sign In | FandomVerse'
                      : path === '/signup' ? 'Sign Up | FandomVerse'
                        : path.startsWith('/article/') ? 'Article | FandomVerse'
                          : path.startsWith('/trailer/') ? 'Trailer | FandomVerse'
                            : path.startsWith('/event/') ? 'Event | FandomVerse'
                                : path.startsWith('/character/') ? 'Character | FandomVerse'
                                  : path.startsWith('/release/') ? 'Release | FandomVerse'
                                : 'FandomVerse | Fandom Discovery Archive';
    document.title = title;
  }, [location.pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/trailer/:id" element={<TrailerDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/release/:id" element={<ReleaseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <CustomCursor />
      <div className="fv-grain-overlay" />
      <RouteTitle />
      <BookmarkProvider>
        <AuthProvider>
          <CartProvider>
            <AppLayout>
              <ScrollToTop />
              <AnimatedRoutes />
            </AppLayout>
          </CartProvider>
        </AuthProvider>
      </BookmarkProvider>
    </>
  )
}

export default App
