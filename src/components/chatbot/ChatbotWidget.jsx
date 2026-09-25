import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { chatbotQuickReplies } from './chatbotData';
import { resolveChatbotReply } from './chatbotUtils';
import './ChatbotWidget.css';

const initialMessage = {
  id: 'welcome',
  role: 'bot',
  text: 'Welcome to FandomVerse. What would you like to explore?',
  quickReplies: chatbotQuickReplies.slice(0, 5),
};

export function ChatbotWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    if (!open) return undefined;

    inputRef.current?.focus();
    const trigger = triggerRef.current;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const navigateAction = (action) => {
    if (!action?.to) return;
    setOpen(false);
    navigate(action.to);
  };

  const sendMessage = (value) => {
    const text = value.trim();
    if (!text) return;
    const reply = resolveChatbotReply(text);
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text },
      { id: `bot-${Date.now()}`, role: 'bot', text: reply.text, action: reply.action, quickReplies: reply.quickReplies },
    ]);
    setInput('');
  };

  const clearConversation = () => setMessages([initialMessage]);

  return (
    <>
      {open && (
        <motion.section
          className="fv-chatbot-panel"
          id="fv-chatbot-panel"
          role="dialog"
          aria-label="FandomVerse Assistant"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <header className="fv-chatbot-header">
            <div className="fv-chatbot-heading">
              <span className="fv-chatbot-avatar"><Bot size={18} aria-hidden="true" /></span>
              <div>
                <strong>FandomVerse Assistant</strong>
                <span>Scripted archive guide</span>
              </div>
            </div>
            <div className="fv-chatbot-header-actions">
              <button type="button" onClick={clearConversation} aria-label="Clear conversation" title="Clear conversation">
                <Sparkles size={16} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" title="Close assistant">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="fv-chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`fv-chatbot-message fv-chatbot-message-${message.role}`} key={message.id}>
                <p>{message.text}</p>
                {message.action && (
                  <button type="button" className="fv-chatbot-action" onClick={() => navigateAction(message.action)}>
                    {message.action.label}
                  </button>
                )}
                {message.quickReplies?.length > 0 && (
                  <div className="fv-chatbot-quick-replies">
                    {message.quickReplies.map((reply) => (
                      reply.to ? (
                        <Link key={reply.label} to={reply.to} onClick={() => setOpen(false)}>{reply.label}</Link>
                      ) : (
                        <button key={reply.label} type="button" onClick={() => sendMessage(reply.message)}>{reply.label}</button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form className="fv-chatbot-form" onSubmit={(event) => { event.preventDefault(); sendMessage(input); }}>
            <label className="fv-sr-only" htmlFor="fv-chatbot-input">Message the FandomVerse Assistant</label>
            <input
              ref={inputRef}
              id="fv-chatbot-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask the archive..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim()}>
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </motion.section>
      )}

      <motion.button
        ref={triggerRef}
        className="fv-chatbot-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label={open ? 'Close FandomVerse Assistant' : 'Open FandomVerse Assistant'}
        aria-expanded={open}
        aria-controls="fv-chatbot-panel"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} color="#fff" aria-hidden="true" /> : <Bot size={20} color="#fff" aria-hidden="true" />}
        {!open && <span className="fv-chatbot-trigger-text">ASK FV</span>}
      </motion.button>
    </>
  );
}
