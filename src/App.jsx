import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import { Releases } from './pages/Releases'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {
  return (
    <>
      <CustomCursor />
      <div className="fv-grain-overlay" />
      <BookmarkProvider>
        <AuthProvider>
          <CartProvider>
            <AppLayout>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/trailer/:id" element={<TrailerDetail />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              </Routes>
            </AppLayout>
          </CartProvider>
        </AuthProvider>
      </BookmarkProvider>
    </>
  )
}

export default App
