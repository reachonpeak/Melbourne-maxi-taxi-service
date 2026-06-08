import Link from 'next/link';
import Image from 'next/image';
import { EMAIL, PHONE, PHONE_DISPLAY } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="brand" href="/">
              <Image src="/assets/logo-white.webp" alt="Maxi Melbourne Cab Service" width={1254} height={1254} />
            </Link>
            <p className="footer-about">
              Trusted maxi cabs across Melbourne — airport, hotel, corporate, wedding and event
              transfers. Available 24/7 for safe, timely, comfortable rides.
            </p>
            <div className="socials">
              <a href="https://www.facebook.com/melbournemaxicabservice/" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.8H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" /></svg>
              </a>
              <a href="https://www.instagram.com/melbournemaxicab.au/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><rect x="6" y="6" width="12" height="12" rx="3" /><circle cx="12" cy="12" r="3" /><circle cx="15.5" cy="8.5" r="0.75" fill="currentColor" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/melbourne-maxi-cab-service/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" /></svg>
              </a>
              <a href="https://x.com/mel_maxicab" target="_blank" rel="noopener" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>
              </a>
              <a href="https://in.pinterest.com/melbournemaxicab/" target="_blank" rel="noopener" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.7 0-2-1.3-3.4-3.7-3.4a4.2 4.2 0 0 0-4.4 4.2c0 .8.2 1.4.6 1.8.1.2.2.3.1.5l-.2.9c0 .3-.2.4-.5.2-1.2-.5-1.8-1.9-1.8-3.4 0-2.6 2.2-5.7 6.5-5.7 3.5 0 5.7 2.5 5.7 5.2 0 3.5-2 6.2-4.9 6.2-1 0-1.9-.5-2.2-1.1l-.6 2.4c-.2.8-.7 1.7-1 2.3A10 10 0 1 0 12 2z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/fleet">Fleet</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">Airport Transfer</Link></li>
              <li><Link href="/services">Corporate Transfer</Link></li>
              <li><Link href="/services">Hotel Transfer</Link></li>
              <li><Link href="/services">Event Transfer</Link></li>
              <li><Link href="/services">Wedding Transfer</Link></li>
              <li><Link href="/services">Parcel Delivery</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Craigieburn, Melbourne VIC
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Maxi Melbourne Cab Service. All rights reserved.</span>
          <span>Comfort · Reliability · Every Journey</span>
        </div>
      </div>
    </footer>
  );
}
