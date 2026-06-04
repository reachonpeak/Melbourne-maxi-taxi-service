'use client';
import { useEffect, useRef } from 'react';

export default function RevealWrapper({ children, className = '', delay = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) {
      ref.current.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal${delay ? ` ${delay}` : ''}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
