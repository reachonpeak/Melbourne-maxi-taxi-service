export const steps = [
  { title: 'Choose your ride', desc: 'Fill in your pickup, drop-off, date, time and passenger count. Select the vehicle that suits your group.' },
  { title: 'Get your quote', desc: 'Receive a fixed price with no hidden surcharges. Confirm via WhatsApp in seconds.' },
  { title: 'We come to you', desc: 'Your driver arrives on time, helps with luggage and gets you to your destination safely and comfortably.' },
];

export default function HowItWorks() {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div key={i} className={`step reveal d${i + 1}`}>
          <div className="num" />
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
