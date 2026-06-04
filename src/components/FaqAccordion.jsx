'use client';
import { useState, useRef } from 'react';

const faqs = [
  {
    q: 'How much is a maxi taxi to Melbourne Airport?',
    a: 'From the CBD, a maxi cab to Melbourne Airport is typically <b>$95–$115</b>. Exact fares vary by suburb — request a fixed quote when you book, so there are no surprises.',
  },
  {
    q: 'How many people fit in a maxi taxi?',
    a: 'Our maxi cabs seat up to <b>11 passengers</b> (13 across the larger fleet) — ideal for groups or families with extra luggage. A standard sedan seats up to 4.',
  },
  {
    q: 'Can I pre-book an airport transfer?',
    a: 'Yes — pre-book any time via the form above or by phone. Advance bookings also qualify for <b>15% off</b>, and we track your flight to adjust pickup if it\'s delayed.',
  },
  {
    q: 'Are your drivers licensed and trained?',
    a: 'Absolutely. Every driver is fully licensed, experienced and trained for safety and professionalism, with vehicles serviced and inspected regularly.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, all major cards and digital wallet payments for maximum convenience.',
  },
  {
    q: 'How much is a typical city trip?',
    a: 'For a trip within the city, expect roughly <b>$55–$85</b> depending on distance. Tell us your bag count when booking so we send the right-sized vehicle.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-wrap">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`faq${isOpen ? ' open' : ''}`}>
            <button className="faq-q" onClick={() => toggle(i)}>
              {item.q}
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className="faq-a"
              ref={(el) => (answerRefs.current[i] = el)}
              style={{
                maxHeight: isOpen ? (answerRefs.current[i]?.scrollHeight + 'px') : '0',
              }}
            >
              <p dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
