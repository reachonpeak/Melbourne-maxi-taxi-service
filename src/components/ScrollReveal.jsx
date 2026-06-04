'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const handleReveal = () => {
      const revs = document.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
        );
        revs.forEach((el) => {
          if (!el.classList.contains('in')) {
            io.observe(el);
          }
        });
      } else {
        revs.forEach((el) => el.classList.add('in'));
      }
    };

    // Delay slightly to ensure React finishes DOM hydration/rendering
    const timer = setTimeout(handleReveal, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
