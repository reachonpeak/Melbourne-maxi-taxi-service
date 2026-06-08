import CtaBanner from '@/components/CtaBanner';
import ServiceCards from '@/components/ServiceCards';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Our Services — Maxi Melbourne Cab Service',
  description: 'Airport transfers, corporate rides, wedding cars, group travel and more. Maxi Melbourne Cab Service covers every journey across Melbourne 24/7.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Our Services', path: '/services' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">What we do</span>
          <h1 className="h1">Every transfer, covered</h1>
          <p className="lead">From airport runs to weddings and corporate events — we have the right vehicle for every occasion.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <ServiceCards />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
