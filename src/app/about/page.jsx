import Link from 'next/link';
import Image from 'next/image';
import CtaBanner from '@/components/CtaBanner';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'About Us — Melbourne Maxi Cab Service',
  description: 'Melbourne Maxi Cab Service is your dependable travel partner across Melbourne. Airport transfers, corporate travel, hotel transfers, event & wedding transport, and parcel delivery.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1 className="h1">Melbourne's Trusted Maxi Cab Service Provider</h1>
          <p className="lead">Your dependable travel partner across Melbourne — for every journey, every time.</p>
        </div>
      </div>

      {/* About intro */}
      <section className="section-light">
        <div className="container about-grid">
          <div className="about-photo reveal">
            <Image src="/assets/Why-Choose-Pic-img1.webp" alt="Melbourne Maxi Cab Service team" fill sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Who we are</span>
            <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: 12 }}>Melbourne's Trusted Maxi Cab Service Provider</h2>
            <p>At Melbourne Maxi Cab Service, we're more than just a taxi company—we're your dependable travel partner across Melbourne. With years of experience in the transport industry, we proudly offer a wide range of services including airport transfers, corporate travel, hotel transfers, event and wedding transport, and even secure parcel delivery.</p>
            <p>Our mission is to make every ride smooth, timely, and stress-free. We operate with a strong focus on professionalism, customer satisfaction, and safety. Whether you're a solo traveller, a family, or a corporate group, we provide clean, spacious, and well-maintained maxi cabs driven by courteous, experienced drivers.</p>
            <p>From everyday travel to special events, we go the extra mile to ensure your journey is as comfortable as your destination is important. Choose Melbourne Maxi Cab Service for dependable, flexible, and high-quality transport solutions throughout Melbourne.</p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-alt-light">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="eyebrow">Why choose us</span>
            <h2 className="h2">What sets us apart</h2>
          </div>
          <div className="about-features">
            {[
              {
                icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
                title: 'Wide Range of Services',
                desc: 'From airport runs to event transport, we cover it all—offering reliable solutions for every personal or professional travel need.',
              },
              {
                icon: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-1.2-3.4C16.4 5.6 15.5 5 14.5 5h-5c-1 0-1.9.6-2.3 1.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM13 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
                title: 'Spacious, Clean & Comfortable Cabs',
                desc: 'Our maxi cabs are perfect for groups, families, or solo riders—with plenty of space for passengers and luggage alike.',
              },
              {
                icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
                title: 'Experienced & Friendly Drivers',
                desc: 'Our drivers are professional, punctual, and committed to offering a safe and courteous travel experience.',
              },
              {
                icon: 'M12 6v6l4 2M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
                title: '24/7 Availability Across Melbourne',
                desc: "No matter the time or day, we're available around the clock to serve your transport needs without delay.",
              },
              {
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
                title: 'Easy Booking & Transparent Pricing',
                desc: 'Book online or by phone in just minutes. Our rates are competitive, upfront, and free from hidden charges.',
              },
              {
                icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
                title: 'Customer-Focused Service You Can Rely On',
                desc: "We value every customer. That's why we focus on providing timely, comfortable, and reliable rides with great care.",
              },
            ].map((item, i) => (
              <div key={i} className={`about-feat-card reveal d${(i % 4) + 1}`}>
                <div className="about-feat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </>
  );
}
