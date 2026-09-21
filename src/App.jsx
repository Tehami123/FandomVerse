import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Home } from './pages/Home'
import { Category } from './pages/Category'
import { CustomCursor } from './components/ui/CustomCursor'

function App() {
  return (
    <>
      <CustomCursor />
      <div className="fv-grain-overlay" />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
        </Routes>
      </AppLayout>
    </>
  )
}

export default App
