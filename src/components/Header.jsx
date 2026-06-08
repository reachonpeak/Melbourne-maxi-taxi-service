'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PHONE, PHONE_DISPLAY } from '@/lib/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/fleet', label: 'Fleet' },
    { href: '/why-us', label: 'Why us' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container nav">
          <Link className="brand" href="/" aria-label="Melbourne Maxi Cab Service">
            <Image src="/assets/logo.webp" alt="Melbourne Maxi Cab Service" width={1254} height={1254} priority />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href={`tel:${PHONE}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <Link className="btn btn-primary" href="/book">Book your ride</Link>
            <button
              className={`burger${menuOpen ? ' open' : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Scrim */}
      <div className={`scrim${menuOpen ? ' open' : ''}`} onClick={toggleMenu} />

      {/* Mobile Drawer */}
      <aside className={`drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-logo">
          <Image src="/assets/logo.webp" alt="Melbourne Maxi Cab Service" width={1254} height={1254} />
        </div>
        <button
          className="drawer-close"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={toggleMenu}>{l.label}</Link>
        ))}
        <a className="btn btn-outline" href={`tel:${PHONE}`}>Call {PHONE_DISPLAY}</a>
        <Link className="btn btn-primary" href="/book" onClick={toggleMenu}>Book a ride</Link>
      </aside>
    </>
  );
}
