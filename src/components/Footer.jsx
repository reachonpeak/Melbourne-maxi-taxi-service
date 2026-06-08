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
              <Image src="/assets/logo-white.webp" alt="MelbourneMaxiTaxi" width={1254} height={1254} />
            </Link>
            <p className="footer-about">
              Trusted maxi cabs across Melbourne — airport, hotel, corporate, wedding and event
              transfers. Available 24/7 for safe, timely, comfortable rides.
            </p>

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
          <span>© {new Date().getFullYear()} MelbourneMaxiTaxi. All rights reserved.</span>
          <span>Comfort · Reliability · Every Journey</span>
        </div>
      </div>
    </footer>
  );
}
