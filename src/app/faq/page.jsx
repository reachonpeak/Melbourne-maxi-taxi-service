import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'FAQ — Melbourne Maxi Cab Service',
  description: 'Frequently asked questions about Melbourne maxi cab fares, airport pickups, baby seats, and booking options.',
};

export default function FaqPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Got questions?</span>
          <h1 className="h1">Frequently Asked Questions</h1>
          <p className="lead">Here is everything you need to know about our services, pricing, and booking process.</p>
        </div>
      </div>

      <section className="section-light" style={{ padding: '60px 0' }}>
        <div className="container">
          <FaqAccordion />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
