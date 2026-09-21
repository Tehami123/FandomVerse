import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import './ChatbotTrigger.css';

export function ChatbotTrigger() {
  return (
    <motion.button 
      className="fv-chatbot-trigger"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Open FandomVerse Assistant"
      onClick={() => console.log('Open Chatbot')}
    >
      <MessageSquare size={24} color="#fff" />
      <span className="fv-chatbot-indicator" />
    </motion.button>
  );
}
