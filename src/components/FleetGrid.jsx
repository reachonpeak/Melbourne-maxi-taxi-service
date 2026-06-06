import Link from 'next/link';

export const fleet = [
  { img: '/assets/fleet-maxi11.webp', name: 'Maxi 11 Seater', models: 'Toyota HiAce · Mercedes Sprinter · similar', seats: 'Up to 13 passengers', luggage: 'Large luggage capacity', desc: 'Our flagship vehicle — ideal for airport runs with lots of luggage, group tours, events and family trips.' },
  { img: '/assets/fleet-maxi7.webp', name: 'Maxi 7 Seater', models: 'Kia Carnival · Hyundai Staria · similar', seats: 'Up to 7 passengers', luggage: 'Ample boot space', desc: 'Perfect for mid-size groups, corporate bookings and families needing extra space without a full maxi van.' },
  { img: '/assets/fleet-suv.webp', name: 'Premium SUV', models: 'Toyota Kluger · Prado · similar', seats: '1–5 passengers', luggage: 'Standard luggage', desc: 'Premium ride for smaller groups or executive transfers. Comfortable, stylish and professionally driven.' },
  { img: '/assets/fleet-sedan.webp', name: 'Executive Sedan', models: 'Toyota Camry · similar', seats: '1–4 passengers', luggage: 'Standard luggage', desc: 'Classic sedan for solo travellers and couples. Efficient, comfortable and always spotlessly clean.' },
];

export default function FleetGrid() {
  return (
    <div className="fleet-grid">
      {fleet.map((v, i) => (
        <div key={i} className={`fcard reveal d${(i % 2) + 1}`}>
          <div className="fcard-media">
            <img src={v.img} alt={v.name} loading="lazy" />
          </div>
          <div className="fcard-body">
            <div className="fcard-info">
              <h3>{v.name}</h3>
              <div className="models">{v.models}</div>
              <div className="fcard-specs">
                <div className="spec-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <span>{v.seats}</span>
                </div>
                <div className="spec-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="9" width="16" height="11" rx="2" ry="2"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg>
                  <span>{v.luggage}</span>
                </div>
              </div>
              <p className="fcard-desc">{v.desc}</p>
            </div>
            <div className="fcard-actions">
              <Link className="btn btn-primary" href="/book">
                Book now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
