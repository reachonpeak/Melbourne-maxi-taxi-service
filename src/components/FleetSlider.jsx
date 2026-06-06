'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fleet } from './FleetGrid';

export default function FleetSlider() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector('.fleet-slide');
    if (!slide) return;
    const cardWidth = slide.offsetWidth;
    const gap = 24; // matches gap: 24px in css
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActive(idx);
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.offsetWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    updateState();
    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  function goTo(idx) {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector('.fleet-slide');
    if (!slide) return;
    const cardWidth = slide.offsetWidth;
    const gap = 24;
    el.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' });
  }

  // Auto-play slideshow timer
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const nextIdx = (active + 1) % fleet.length;
      goTo(nextIdx);
    }, 3000); // cycle every 3 seconds
    return () => clearInterval(interval);
  }, [active, isHovered]);

  return (
    <div
      className="fleet-slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track */}
      <div ref={trackRef} className="fleet-slider-track">
        {fleet.map((v, i) => (
          <div key={i} className="fleet-slide">
            <div className="fslider-card">
              <div className="fslider-card-media">
                <img src={v.img} alt={v.name} loading="lazy" />
              </div>
              <div className="fslider-card-body">
                <div className="fslider-card-info">
                  <h3>{v.name}</h3>
                  <div className="models">{v.models}</div>
                  <div className="fslider-card-specs">
                    <div className="spec-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      <span>{v.seats}</span>
                    </div>
                    <div className="spec-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <rect x="4" y="9" width="16" height="11" rx="2" ry="2" />
                        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
                      </svg>
                      <span>{v.luggage}</span>
                    </div>
                  </div>
                  <p className="fslider-card-desc">{v.desc}</p>
                </div>
                <div className="fslider-card-actions">
                  <Link className="btn btn-primary" href="/book">
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="fleet-slider-controls">
        {/* Dots */}
        <div className="fleet-slider-dots">
          {fleet.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`fleet-slider-dot ${i === active ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="fleet-slider-arrows">
          <button
            onClick={() => goTo(active - 1)}
            disabled={!canPrev}
            aria-label="Previous vehicle"
            className="fleet-slider-arrow"
            style={{ opacity: canPrev ? 1 : 0.3, pointerEvents: canPrev ? 'auto' : 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={!canNext}
            aria-label="Next vehicle"
            className="fleet-slider-arrow"
            style={{ opacity: canNext ? 1 : 0.3, pointerEvents: canNext ? 'auto' : 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
