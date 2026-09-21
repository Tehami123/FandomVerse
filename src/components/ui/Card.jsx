import React from 'react';
import { motion } from 'motion/react';
import './Card.css';

export function Card({ 
  children, 
  imageSrc, 
  imageAlt = '',
  className = '',
  onClick,
  ...props 
}) {
  const isInteractive = !!onClick;
  const Wrapper = isInteractive ? motion.div : 'div';

  return (
    <Wrapper 
      className={`fv-card ${isInteractive ? 'fv-card-interactive' : ''} ${className}`}
      onClick={onClick}
      whileHover={isInteractive ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {imageSrc && (
        <div className="fv-card-image-wrapper">
          <img src={imageSrc} alt={imageAlt} className="fv-card-image" />
          <div className="fv-card-image-overlay" />
        </div>
      )}
      <div className="fv-card-content">
        {children}
      </div>
    </Wrapper>
  );
}

// Card sub-components for consistent typography
export function CardTitle({ children, className = '' }) {
  return <h3 className={`fv-card-title ${className}`}>{children}</h3>;
}

export function CardMeta({ children, className = '' }) {
  return <p className={`fv-card-meta ${className}`}>{children}</p>;
}
