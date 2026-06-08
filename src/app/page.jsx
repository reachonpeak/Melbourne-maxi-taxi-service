import Link from 'next/link';
import Image from 'next/image';
import TrustStrip from '@/components/TrustStrip';
import BookingCardHero from '@/components/BookingCardHero';
import BookingFormFull from '@/components/BookingFormFull';
import ServiceCards from '@/components/ServiceCards';
import HowItWorks from '@/components/HowItWorks';
import FleetGrid from '@/components/FleetGrid';
import FleetSlider from '@/components/FleetSlider';
import WhyUs from '@/components/WhyUs';
import PhotoGallery from '@/components/PhotoGallery';
import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'MelbourneMaxiTaxi — Airport & Group Transfers 24/7',
  description: 'MelbourneMaxiTaxi for airport runs, groups up to 13 and citywide travel. Spacious, spotless vehicles 24/7 with professional local drivers and fixed fares.',
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg">
          <Image src="/assets/hero-bg-melbourne.webp" alt="" aria-hidden="true" width={1535} height={1024} priority sizes="100vw" />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow reveal">MelbourneMaxiTaxis</span>
            <h1 className="h1 reveal d1">
              <span className="line">Airport rides.</span>
              <span className="line">Group travel.</span>
              <span className="line accent">Done right.</span>
            </h1>
            <p className="lead reveal d2">
              Spacious maxi cabs for airports, groups and every journey across Melbourne.<br />
              Professional drivers. Fixed fares.<br />24/7 reliable service.
            </p>
            <div className="hero-cta reveal d3">
              <Link className="btn btn-primary btn-lg" href="#book">
                Book your ride
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="how-link" href="#how">
                <span className="play-ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v13.72c0 .86.94 1.39 1.66.9l10.78-6.86a1 1 0 0 0 0-1.8L9.66 4.24a1 1 0 0 0-1.66.9z" />
                  </svg>
                </span>
                How it works
              </Link>
            </div>
            <div className="hero-points reveal d4">
              <span className="hpoint">
                <span className="hp-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <span className="hp-label">24/7<span>Availability</span></span>
              </span>
              <span className="hpoint">
                <span className="hp-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
                </span>
                <span className="hp-label">Fixed,<span>Fair Fares</span></span>
              </span>
              <span className="hpoint">
                <span className="hp-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <span className="hp-label">Licensed<span>&amp; Insured</span></span>
              </span>
            </div>
          </div>
          <BookingCardHero />
        </div>
        <TrustStrip />
      </section>

      {/* BOOKING FORM FULL */}
      <BookingFormFull />

      {/* SERVICES */}
      <section className="services section-alt-light" id="services">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">What we do</span>
            <h2 className="h2">Every transfer, covered</h2>
            <p className="lead">From airport runs to weddings, corporate events and group outings — we have the right vehicle and driver for every occasion.</p>
          </div>
          <ServiceCards />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how section-light" id="how">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">Simple process</span>
            <h2 className="h2">How it works</h2>
            <p>Booking a maxi cab in Melbourne has never been easier. Three simple steps and you're on your way.</p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet section-alt-light" id="fleet">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">Our fleet</span>
            <h2 className="h2">Vehicles for every group size</h2>
            <p>From a solo airport run to a 13-seat group transfer — pick the right fit.</p>
          </div>
          <FleetSlider />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why section-light" id="why">
        <div className="container why-grid">
          <div className="why-photo reveal">
            <Image src="/assets/airport-transfer-melbourne.webp" alt="Melbourne Airport transfer" width={1536} height={1024} sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="stat-banner">
              <span className="stat-val">4.9★</span>
              <span className="stat-lbl">Avg Google rating</span>
            </div>
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Why MelbourneMaxiTaxi</span>
            <h2 className="h2">The trusted choice for Melbourne travellers</h2>
            <p className="lead">Every trip is backed by professional drivers, maintained vehicles and a promise of fair, fixed pricing — no surprises.</p>
            <WhyUs />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery section-alt-light" id="gallery">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">Gallery</span>
            <h2 className="h2">See our fleet in action</h2>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials section-light" id="reviews">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">Customer reviews</span>
            <h2 className="h2">What our passengers say</h2>
            <p>Trusted by thousands of Melbourne travellers — rated 4.9/5 on Google.</p>
          </div>
          <div className="tcards">
            {[
              { init: 'E', name: 'Emily Thompson', role: 'Airport transfer', text: '"Made my airport transfer stress-free and punctual. The driver was polite, the car spotless and the ride smooth. I\'ll definitely book again."' },
              { init: 'J', name: 'Jason Miller', role: 'Corporate transfer', text: '"Used them for a corporate transfer — professional all the way. Driver arrived early, drove safely and knew the best route. Highly recommended."' },
              { init: 'S', name: 'Sarah Williams', role: 'Wedding transfer', text: '"Booked a cab for our wedding day and everything was perfect. Courteous driver, on time, and a beautifully clean car. Couldn\'t fault it."' },
            ].map((t, i) => (
              <article key={i} className={`tcard reveal d${i + 1}`}>
                <span className="stars">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                  ))}
                </span>
                <p>{t.text}</p>
                <div className="who">
                  <span className="av">{t.init}</span>
                  <span>
                    <div className="nm">{t.name}</div>
                    <div className="rl">{t.role}</div>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="areas section-alt-light" id="areas">
        <div className="container areas-grid">
          <div className="reveal">
            <span className="eyebrow">Where we go</span>
            <h2 className="h2">Servicing all of greater Melbourne</h2>
            <p className="lead">Every Melbourne suburb, plus regional trips from the CBD and the airport. Don't see yours? Just ask when you book.</p>
            <Link className="btn btn-primary" href="#book" style={{ marginTop: 22 }}>
              Check my route
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
          <div className="chips reveal d1">
            {['Berwick', 'Box Hill', 'Brighton', 'Bundoora', 'Camberwell', 'Caroline Springs', 'Chadstone', 'Coburg', 'Craigieburn', 'Dandenong', 'Doncaster', 'Essendon', 'Footscray', 'Frankston', 'Glen Waverley', 'Hawthorn', 'Keysborough', 'Melton', 'Narre Warren', 'Point Cook', 'Preston', 'Reservoir', 'Richmond', 'Ringwood', 'Southbank', 'St Kilda', 'Tullamarine', 'Werribee'].map((s, i) => (
              <span key={i} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KIDS */}
      <section className="kids section-light" id="kids">
        <div className="container kids-grid">
          <div className="kids-photo reveal">
            <Image src="/assets/Baby-seat-img3.webp" alt="Safety-compliant baby seat installed in a maxi cab" width={1000} height={1000} sizes="(max-width: 768px) 100vw, 50vw" />
            <span className="tag">Family friendly</span>
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Safe travel for kids</span>
            <h2 className="h2">Little ones, buckled in safely</h2>
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

      {/* FAQ */}
      <section className="faq-sec section-alt-light" id="faq">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">Frequently asked questions</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
