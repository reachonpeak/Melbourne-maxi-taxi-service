import Link from 'next/link';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Areas We Serve — Melbourne Maxi Cab Service',
  description: 'We service all of greater Melbourne, including all suburbs, airports, hotels, and surrounding regions.',
};

const suburbs = [
  'Berwick', 'Box Hill', 'Brighton', 'Bundoora', 'Camberwell', 'Caroline Springs',
  'Chadstone', 'Coburg', 'Craigieburn', 'Dandenong', 'Doncaster', 'Essendon',
  'Footscray', 'Frankston', 'Glen Waverley', 'Hawthorn', 'Keysborough', 'Melton',
  'Narre Warren', 'Point Cook', 'Preston', 'Reservoir', 'Richmond', 'Ringwood',
  'Southbank', 'St Kilda', 'Tullamarine', 'Werribee', 'Geelong', 'Mornington Peninsula',
  'Yarra Valley', 'Ballarat', 'Bendigo'
];

export default function AreasPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Where we go</span>
          <h1 className="h1">Service Areas</h1>
          <p className="lead">We cover all of greater Melbourne, airport transfers, and long-distance regional trips.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <div className="areas-grid" style={{ gridTemplateColumns: '1fr', gap: 40 }}>
            <div>
              <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: 16 }}>Servicing Greater Melbourne & Beyond</h2>
              <p className="lead" style={{ color: 'var(--ink-muted)', marginBottom: 32 }}>
                From Melbourne Airport (Tullamarine & Avalon) to any suburb across the East, West, North, and South, we offer reliable 24/7 maxi taxi services. We also service regional Victoria destinations.
              </p>
            </div>
            
            <div>
              <h3 className="h3" style={{ color: 'var(--ink-light)', marginBottom: 20 }}>Popular Suburbs & Destinations We Cover</h3>
              <div className="chips">
                {suburbs.map((s, i) => (
                  <span key={i} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
