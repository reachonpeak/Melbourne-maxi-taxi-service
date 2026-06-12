import Link from 'next/link';
import Image from 'next/image';
import CtaBanner from '@/components/CtaBanner';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'How It Works — MelbourneMaxiTaxi',
  description: 'Booking a Melbourne maxi cab is simple. Three easy steps and your driver is on the way.',
  alternates: { canonical: '/how-it-works' },
};

const steps = [
  { title: 'Choose your ride', desc: 'Fill in your pickup location, drop-off, date, time and number of passengers. Select the vehicle that best suits your group and luggage.' },
  { title: 'Get your fixed quote', desc: 'Receive an instant, fixed-price quote with no hidden surcharges or meter surprises. Confirm your booking via WhatsApp in seconds.' },
  { title: 'We come to you', desc: 'Your driver arrives on time, assists with luggage and gets you to your destination safely and comfortably. Flight monitoring included for airport pickups.' },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to book a Melbourne maxi cab',
  description: 'Book a Melbourne maxi cab in three simple steps and get a fixed-price quote in under a minute.',
  totalTime: 'PT1M',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.desc,
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'How It Works', path: '/how-it-works' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Simple process</span>
          <h1 className="h1">How it works</h1>
          <p className="lead">Booking your Melbourne maxi cab takes less than 60 seconds. Here's how simple it is.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <div className="steps">
            {steps.map((s, i) => (
              <div key={i} className={`step reveal d${i + 1}`}>
                <div className="num" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="why-grid" style={{ marginTop: 'clamp(56px,7vw,90px)' }}>
            <div className="reveal">
              <span className="eyebrow">Why book with us</span>
              <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: 24 }}>No surprises. Just a great ride.</h2>
              <div className="feat-list">
                {[
                  { title: '100% Fixed Fares', desc: 'Your quoted price is your final price. No surcharges, no peak rates, no surprises.' },
                  { title: 'WhatsApp Confirmation', desc: 'Instant booking confirmation sent directly to your WhatsApp — no apps, no accounts.' },
                  { title: 'Flight Monitoring', desc: 'We track your flight in real time and adjust pickup time if it\'s delayed.' },
                  { title: '24/7 Availability', desc: 'Early morning, late night, public holidays — we\'re always ready when you need us.' },
                ].map((f, i) => (
                  <div key={i} className="feat">
                    <div className="fi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link className="btn btn-primary" href="/book" style={{ marginTop: 32 }}>
                Book your ride
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="why-photo reveal d1">
              <Image src="/assets/van.webp" alt="MelbourneMaxiTaxi vehicle" width={620} height={445} sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="stat-banner">
                <span className="stat-val">10K+</span>
                <span className="stat-lbl">Happy customers and counting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
