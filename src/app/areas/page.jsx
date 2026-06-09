import Link from 'next/link';
import CtaBanner from '@/components/CtaBanner';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Areas We Serve — MelbourneMaxiTaxi',
  description: 'We service all of greater Melbourne, including all suburbs, airports, hotels, and surrounding regions.',
  alternates: { canonical: '/areas' },
};

const suburbs = [
  'Bayside Area', 'Berwick', 'Box Hill', 'Brighton', 'Bundoora', 'Camberwell',
  'Caroline Springs', 'Chadstone', 'City of Glen Eira', 'City of Monash',
  'City of Stonnington', 'Clyde', 'Coburg', 'Craigieburn', 'Cranbourne',
  'Dandenong', 'Doncaster', 'Eastern Area', 'Essendon', 'Footscray',
  'Frankston', 'Glen Waverley', 'Hampton Park', 'Hawthorn', 'Keysborough',
  'Kingston City', 'Melbourne CBD', 'Melton', 'Mornington Peninsula',
  'Narre Warren', 'Officer', 'Pakenham', 'Point Cook', 'Port Phillip Area',
  'Preston', 'Reservoir', 'Richmond', 'Ringwood', 'South Eastern Area',
  'Southbank', 'St Kilda', 'Tullamarine', 'Werribee', 'Geelong', 'Ballarat',
  'Bendigo', 'Yarra Valley'
];

const regions = [
  {
    name: 'Melbourne CBD & Inner Areas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="16" />
        <line x1="15" y1="22" x2="15" y2="16" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01M8 14h.01M16 14h.01" />
      </svg>
    ),
    suburbs: ['Melbourne CBD', 'Southbank', 'Richmond', 'St Kilda', 'Port Phillip Area', 'City of Stonnington']
  },
  {
    name: 'South Eastern Suburbs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    suburbs: ['City of Monash', 'Glen Waverley', 'Chadstone', 'Keysborough', 'Dandenong', 'Narre Warren', 'Berwick']
  },
  {
    name: 'Eastern Suburbs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    suburbs: ['Box Hill', 'Camberwell', 'Doncaster', 'Hawthorn', 'Ringwood', 'Eastern Area', 'Yarra Valley']
  },
  {
    name: 'Bayside & Glen Eira',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    suburbs: ['Bayside Area', 'Brighton', 'Kingston City', 'City of Glen Eira', 'Frankston']
  },
  {
    name: 'Mornington Peninsula',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    suburbs: ['Mornington Peninsula', 'Mornington', 'Sorrento', 'Portsea', 'Rosebud', 'Dromana']
  },
  {
    name: 'Outer South-East',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    suburbs: ['Clyde', 'Officer', 'Pakenham', 'Cranbourne', 'Hampton Park', 'South Eastern Area']
  },
  {
    name: 'Western & Northern Suburbs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    suburbs: ['Footscray', 'Point Cook', 'Werribee', 'Melton', 'Caroline Springs', 'Coburg', 'Preston', 'Reservoir', 'Bundoora', 'Craigieburn', 'Tullamarine']
  },
  {
    name: 'Regional Victoria',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    suburbs: ['Geelong', 'Ballarat', 'Bendigo', 'Regional Victoria (Any destination)']
  }
];

export default function AreasPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Areas We Serve', path: '/areas' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Where we go</span>
          <h1 className="h1">Service Areas</h1>
          <p className="lead">We cover all of greater Melbourne, airport transfers, and long-distance regional trips.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: 16 }}>Servicing Greater Melbourne & Beyond</h2>
            <p className="lead" style={{ color: 'var(--ink-light-2)', maxW: '72ch' }}>
              From Melbourne Airport (Tullamarine & Avalon) to any suburb across the East, West, North, and South, we offer reliable 24/7 maxi taxi services. We also service regional Victoria destinations.
            </p>
          </div>

          {/* Regional Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
            {regions.map((reg, idx) => (
              <div key={idx} className="region-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div className="icon-wrap">
                    {reg.icon}
                  </div>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--ink-light)', margin: 0 }}>{reg.name}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
                  {reg.suburbs.map((sub, sIdx) => (
                    <li key={sIdx} style={{ fontSize: '0.92rem', color: 'var(--ink-light-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      </section>

      <CtaBanner />
    </>
  );
}
