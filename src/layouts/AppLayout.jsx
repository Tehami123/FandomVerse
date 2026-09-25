import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { ChatbotTrigger } from '../components/ui/ChatbotTrigger';

export function AppLayout({ children }) {
  return (
    <div className="fv-app-layout">
      <Navbar />
      <div className="fv-main-content">
        {children}
      </div>
      <Footer />
      <ChatbotTrigger />
    </div>
  );
}
