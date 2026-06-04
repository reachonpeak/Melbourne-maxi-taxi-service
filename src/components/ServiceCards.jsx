import Link from 'next/link';

export const services = [
  { icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z', title: 'Airport Transfer', desc: 'On-time pickup and drop-off at Melbourne Airport (Tullamarine) and Avalon. Flight tracking included so your driver adjusts for delays automatically. Spacious vehicles handle multiple bags with ease.' },
  { icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', title: 'Corporate Transfer', desc: 'Professional, punctual service for executives and corporate teams across Melbourne. Clean, presentable vehicles with a smartly dressed driver. Invoicing available for regular business accounts.' },
  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', title: 'Group Travel', desc: 'Maxi cabs seating up to 13 passengers — perfect for groups, tours, sporting events, bucks and hens parties, school excursions and more. One vehicle, everyone together.' },
  { icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', title: 'Wedding Transfer', desc: 'Arrive in style on your most important day. Spotless, professionally presented maxi cabs for bridal parties, guests and post-ceremony transfers. We coordinate timing down to the minute.' },
  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10', title: 'Hotel Transfer', desc: 'Seamless transfers between hotels, CBD venues and major Melbourne attractions — available around the clock. Reliable, comfortable, and stress-free from first to last step.' },
  { icon: 'M5 12h14M12 5l7 7-7 7', title: 'Parcel Delivery', desc: 'Need something delivered fast and safely? We offer same-day parcel delivery across greater Melbourne. Real-time updates and proof of delivery included for your peace of mind.' },
];

export default function ServiceCards({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="cards">
      {list.map((s, i) => (
        <article key={i} className={`card reveal d${(i % 3) + 1}`}>
          <div className="card-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d={s.icon} />
            </svg>
          </div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <Link className="linkarrow" href="/book">
            Book now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </article>
      ))}
    </div>
  );
}
