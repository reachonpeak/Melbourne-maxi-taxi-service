import Link from 'next/link';
import CtaBanner from '@/components/CtaBanner';
import WhyUs from '@/components/WhyUs';

export const metadata = {
  title: 'Why Choose Us — Melbourne Maxi Cab Service',
  description: 'Licensed, insured, professional drivers. Fixed fares. 24/7 availability. Find out why Melbourne trusts us for every transfer.',
};

export default function WhyUsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Why choose us</span>
          <h1 className="h1">Melbourne's trusted maxi cab service</h1>
          <p className="lead">We've built our reputation on reliability, professionalism and genuine care for every passenger.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <div className="why-grid">
            <div className="why-photo reveal">
              <img src="/assets/airport-transfer-melbourne.png" alt="Melbourne Maxi Cab Service airport transfer" />
              <div className="stat-banner">
                <span className="stat-val">4.9★</span>
                <span className="stat-lbl">Google rating (1,200+ reviews)</span>
              </div>
            </div>
            <div className="reveal d1">
              <span className="eyebrow">Our promise</span>
              <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: 8 }}>Reliability you can count on</h2>
              <p className="lead">From the moment you book to the moment you arrive, we handle every detail so you don't have to.</p>
              <WhyUs />
              <Link className="btn btn-primary" href="/book" style={{ marginTop: 32 }}>
                Book your ride
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kids / baby seats */}
      <section className="kids section-light" id="kids">
        <div className="container kids-grid">
          <div className="kids-photo reveal">
            <img src="/assets/Baby-seat-img3.webp" alt="Safety-compliant baby seat installed in a maxi cab" loading="lazy" />
            <span className="tag">Family friendly</span>
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Safe travel for kids</span>
            <h2 className="h2" style={{ color: 'var(--ink-light)' }}>Little ones, buckled in safely</h2>
            <p className="lead">Travelling with children should be worry-free. We provide professionally installed, safety-compliant baby seats so your little ones ride securely and comfortably.</p>
            <ul className="checklist">
              <li><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span><span><b>Safety-compliant seats</b>, properly installed every time.</span></li>
              <li><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Options for both <b>infants and toddlers</b>.</span></li>
              <li><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Clean, hygienic equipment, <b>regularly checked</b>.</span></li>
              <li><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></span><span>Just tick the box when booking — <b>we'll have it ready</b>.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
