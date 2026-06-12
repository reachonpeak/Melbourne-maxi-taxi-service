import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'FAQ — MelbourneMaxiTaxi',
  description: 'Frequently asked questions about Melbourne maxi cab fares, airport pickups, baby seats, and booking options.',
  alternates: { canonical: '/faq' },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much is a maxi taxi to Melbourne Airport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From the CBD, a maxi cab to Melbourne Airport is typically $95–$115. Exact fares vary by suburb — request a fixed quote when you book, so there are no surprises."
      }
    },
    {
      "@type": "Question",
      "name": "How many people fit in a maxi taxi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our maxi cabs seat up to 11 passengers (13 across the larger fleet) — ideal for groups or families with extra luggage. A standard sedan seats up to 4."
      }
    },
    {
      "@type": "Question",
      "name": "Can I pre-book an airport transfer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — pre-book any time via the form above or by phone. Advance bookings also qualify for 15% off, and we track your flight to adjust pickup if it's delayed."
      }
    },
    {
      "@type": "Question",
      "name": "Are your drivers licensed and trained?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Every driver is fully licensed, experienced and trained for safety and professionalism, with vehicles serviced and inspected regularly."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept cash, all major cards and digital wallet payments for maximum convenience."
      }
    },
    {
      "@type": "Question",
      "name": "How much is a typical city trip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a trip within the city, expect roughly $55–$85 depending on distance. Tell us your bag count when booking so we send the right-sized vehicle."
      }
    }
  ]
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
