import CtaBanner from '@/components/CtaBanner';
import ServiceCards from '@/components/ServiceCards';

export const metadata = {
  title: 'Our Services — Melbourne Maxi Cab Service',
  description: 'Airport transfers, corporate rides, wedding cars, group travel and more. Melbourne Maxi Cab Service covers every journey across Melbourne 24/7.',
};

export default function ServicesPage() {
  return (
    <>
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
