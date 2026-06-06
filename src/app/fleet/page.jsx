import CtaBanner from '@/components/CtaBanner';
import FleetGrid from '@/components/FleetGrid';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Our Fleet — Melbourne Maxi Cab Service',
  description: 'Choose from our spacious maxi vans, 7-seaters, SUVs and sedans. All vehicles are clean, modern and professionally maintained.',
  alternates: { canonical: '/fleet' },
};

export default function FleetPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Our Fleet', path: '/fleet' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Our vehicles</span>
          <h1 className="h1">The right cab for every journey</h1>
          <p className="lead">Modern, spotless vehicles maintained to the highest standard — from executive sedans to 13-seat maxi vans.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <FleetGrid />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
