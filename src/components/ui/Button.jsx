import { motion } from 'motion/react';
import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  return (
    <motion.button 
      className={`fv-btn fv-btn-${variant} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
