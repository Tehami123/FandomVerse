import React from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { ChatbotTrigger } from '../components/ui/ChatbotTrigger';

export function AppLayout({ children }) {
  return (
    <div className="fv-app-layout">
      <Navbar />
      <main className="fv-main-content">
        {children}
      </main>
      <Footer />
      <ChatbotTrigger />
    </div>
  );
}
