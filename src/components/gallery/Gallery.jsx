import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import './Gallery.css';

const normalizeImages = (images, fallbackAlt) => images
  .filter(Boolean)
  .map((image, index) => (typeof image === 'string'
    ? { src: image, alt: `${fallbackAlt} ${index + 1}` }
    : { src: image.src || image.image, alt: image.alt || `${fallbackAlt} ${index + 1}` }))
  .filter((image) => image.src);

export function Gallery({ images = [], title = 'Gallery' }) {
  const normalizedImages = normalizeImages(images, title);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const lightboxImageRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => (index - 1 + normalizedImages.length) % normalizedImages.length);
      if (event.key === 'ArrowRight') setSelectedIndex((index) => (index + 1) % normalizedImages.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightboxImageRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, normalizedImages.length]);

  if (!normalizedImages.length) return null;

  const selectedImage = normalizedImages[selectedIndex] || normalizedImages[0];
  const hasMultipleImages = normalizedImages.length > 1;
  const showPrevious = () => setSelectedIndex((index) => (index - 1 + normalizedImages.length) % normalizedImages.length);
  const showNext = () => setSelectedIndex((index) => (index + 1) % normalizedImages.length);

  return (
    <section className="fv-gallery" aria-label={`${title} image gallery`}>
      <button className="fv-gallery-main" type="button" onClick={() => setIsOpen(true)} aria-label={`Open ${title} image in lightbox`}>
        <img src={selectedImage.src} alt={selectedImage.alt} />
        <span className="fv-gallery-open-label">View image</span>
      </button>
      {hasMultipleImages && (
        <div className="fv-gallery-thumbnails" aria-label={`${title} gallery thumbnails`}>
          {normalizedImages.map((image, index) => (
            <button
              className={`fv-gallery-thumbnail${index === selectedIndex ? ' is-selected' : ''}`}
              type="button"
              key={`${image.src}-${index}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1} of ${normalizedImages.length}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
            >
              <img src={image.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {isOpen && (
        <div className="fv-gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
          <div className="fv-gallery-dialog">
            <button className="fv-gallery-control fv-gallery-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close image viewer">
              <X size={22} aria-hidden="true" />
            </button>
            {hasMultipleImages && (
              <button className="fv-gallery-control fv-gallery-previous" type="button" onClick={showPrevious} aria-label="Show previous image">
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
            )}
            <img ref={lightboxImageRef} className="fv-gallery-lightbox-image" src={selectedImage.src} alt={selectedImage.alt} tabIndex="-1" />
            {hasMultipleImages && (
              <button className="fv-gallery-control fv-gallery-next" type="button" onClick={showNext} aria-label="Show next image">
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            )}
            <div className="fv-gallery-indicator" aria-live="polite">{selectedIndex + 1} / {normalizedImages.length}</div>
          </div>
        </div>
      )}
    </section>
  );
}
