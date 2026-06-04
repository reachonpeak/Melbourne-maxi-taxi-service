export const features = [
  { title: 'Fixed, transparent fares', desc: 'No meters, no surge pricing. The price you\'re quoted is the price you pay — always.' },
  { title: 'Professional, licensed drivers', desc: 'Every driver is fully licensed, vetted and trained to deliver a safe and professional experience.' },
  { title: 'Flight tracking included', desc: 'We monitor your flight in real time and adjust your pickup automatically if it\'s delayed.' },
  { title: '24/7 availability', desc: 'Early mornings, late nights, weekends and public holidays — we\'re here whenever you need us.' },
  { title: 'Spotlessly clean vehicles', desc: 'All vehicles are thoroughly cleaned and inspected before every booking. No exceptions.' },
  { title: 'Instant WhatsApp confirmation', desc: 'Book and get confirmation in seconds via WhatsApp. No apps, no accounts needed.' },
];

export default function WhyUs() {
  return (
    <div className="feat-list">
      {features.map((f, i) => (
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
  );
}
