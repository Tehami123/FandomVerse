import { motion } from 'motion/react';
import './IconButton.css';

export function IconButton({ 
  icon: Icon, 
  onClick, 
  className = '', 
  'aria-label': ariaLabel,
  ...props 
}) {
  return (
    <motion.button 
      className={`fv-icon-btn ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <Icon size={20} />
    </motion.button>
  );
}
