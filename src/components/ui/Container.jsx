import './Container.css';

export function Container({ children, className = '' }) {
  return (
    <div className={`fv-container ${className}`}>
      {children}
    </div>
  );
}
