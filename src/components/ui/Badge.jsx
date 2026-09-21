import React from 'react';
import './Badge.css';

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`fv-badge fv-badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
