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

function App() {
  return (
    <>
      <CustomCursor />
      <div className="fv-grain-overlay" />
      <BookmarkProvider>
        <CartProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </AppLayout>
        </CartProvider>
      </BookmarkProvider>
    </>
  )
}

export default App
