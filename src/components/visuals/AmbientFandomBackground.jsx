import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import './AmbientFandomBackground.css';

const DISPLAY_WORD = {
  anime: 'ANIME',
  gaming: 'GAMING',
  movies: 'MOVIES',
  tv: 'TV',
  kpop: 'K-POP',
  comics: 'COMICS',
  manga: 'MANGA',
};

const VARIANT_LABEL = {
  character: 'CHARACTER DOSSIER',
  article: 'FEATURED ARTICLE',
  event: 'EVENT RECORD',
  trailer: 'TRANSMISSION',
  default: 'ARCHIVE ENTRY',
};

export function AmbientFandomBackground({
  category = 'anime',
  type = 'detail',
  variant = 'default',
}) {
  const catSlug = (category || 'anime').toLowerCase().replace(/\s+/g, '');
  const displayWord = DISPLAY_WORD[catSlug] || catSlug.toUpperCase();
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    if (window.matchMedia('(max-width: 768px)').matches) return undefined;

    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 24;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 16;
      root.style.setProperty('--ambient-px', `${x.toFixed(2)}px`);
      root.style.setProperty('--ambient-py', `${y.toFixed(2)}px`);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={`fv-ambient-background fv-ambient-${variant}${reduceMotion ? ' fv-ambient-static' : ''}`}
      style={{ '--ambient-accent': `var(--color-${catSlug}, var(--color-accent-primary))` }}
      aria-hidden="true"
    >
      <div className="fv-ambient-grid" />
      <div className="fv-ambient-glow" />

      <div className="fv-ambient-svg-layer">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="fv-ambient-orbits">
          <ellipse className="fv-orbit fv-orbit-1" cx="52" cy="42" rx="38" ry="18" />
          <ellipse className="fv-orbit fv-orbit-2" cx="48" cy="46" rx="30" ry="22" />
          <circle className="fv-orbit-node" cx="86" cy="42" r="0.6" />
          <circle className="fv-orbit-node fv-orbit-node-alt" cx="18" cy="58" r="0.45" />
          <line className="fv-orbit-rule" x1="8" y1="12" x2="22" y2="12" />
          <line className="fv-orbit-rule" x1="78" y1="88" x2="92" y2="88" />
        </svg>
      </div>

      <div className="fv-ambient-typography-layer">
        <div className="fv-ambient-big-text">{displayWord}</div>
        <div className="fv-ambient-vertical-text">{displayWord}</div>
      </div>

      <div className="fv-ambient-fragments">
        <div className="fv-fragment fv-fragment-tl" />
        <div className="fv-fragment fv-fragment-tr" />
        <div className="fv-fragment fv-fragment-br" />
        <div className="fv-fragment fv-fragment-bl" />
      </div>

      <div className="fv-ambient-marks">
        <span className="fv-mark">ARCHIVE // {displayWord}</span>
        <span className="fv-mark">{VARIANT_LABEL[variant] || VARIANT_LABEL.default} // {String(type).toUpperCase()}</span>
      </div>

      <div className="fv-ambient-grain" />
    </div>
  );
}
