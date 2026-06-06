'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const photos = [
  { src: '/assets/gallery-1.webp', alt: 'Melbourne maxi cab at airport', cls: 'big' },
  { src: '/assets/gallery-2.webp', alt: 'Interior' },
  { src: '/assets/gallery-3.webp', alt: 'City pickup' },
  { src: '/assets/gallery-4.webp', alt: 'Corporate transfer', cls: 'tall' },
  { src: '/assets/gallery-5.webp', alt: 'Driver' },
  { src: '/assets/gallery-6.webp', alt: 'Wedding car' },
  { src: '/assets/gallery-7.webp', alt: 'Group travel', cls: 'wide' },
  { src: '/assets/gallery-8.webp', alt: 'Baby seat' },
  { src: '/assets/gallery-9.webp', alt: 'Luggage space' },
];

export default function PhotoGallery() {
  const [lbSrc, setLbSrc] = useState(null);
  const [lbAlt, setLbAlt] = useState('');

  const closeLb = useCallback(() => {
    setLbSrc(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeLb(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLb]);

  const openLb = (src, alt) => {
    setLbSrc(src);
    setLbAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <div className="photo-grid">
        {photos.map((p, i) => (
          <figure key={i} className={p.cls || ''} onClick={() => openLb(p.src, p.alt)}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 25vw" />
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lbSrc ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeLb(); }}
      >
        <button className="x" onClick={closeLb} aria-label="Close">&times;</button>
        {lbSrc && <img src={lbSrc} alt={lbAlt} />}
      </div>
    </>
  );
}
