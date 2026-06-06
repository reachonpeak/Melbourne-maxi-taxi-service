import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Contact Us — Melbourne Maxi Cab Service',
  description: 'Get in touch with Melbourne Maxi Cab Service. Available 24/7 for phone bookings, queries, and airport transfer support.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Available 24/7</span>
          <h1 className="h1">Contact Us</h1>
          <p className="lead">Have a question or want to book over the phone? We are here to help you anytime.</p>
        </div>
      </div>

      <section className="section-light" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="areas-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            
            {/* Contact details */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <span className="eyebrow">Get in touch</span>
                <h2 className="h2" style={{ color: 'var(--ink-light)', marginBottom: '16px' }}>Direct Contact Details</h2>
                <p style={{ color: 'var(--ink-muted)' }}>
                  Feel free to call, text, email, or chat with us on WhatsApp. Our customer support operates 24 hours a day, 7 days a week.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a href="tel:+61455906197" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--ink-light)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(255, 114, 33, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 400 }}>Call 24/7</div>
                    0455 906 197
                  </div>
                </a>

                <a href="https://wa.me/61455906197" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--ink-light)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-.707zM17.5 14.4c-.07-.12-.27-.19-.57-.34s-1.76-.87-2.03-.97c-.27-.1-.47-.15-.67.15s-.77.97-.94 1.16c-.17.2-.35.22-.64.07a8.1 8.1 0 0 1-2.39-1.47 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 400 }}>WhatsApp Chat</div>
                    +61 455 906 197
                  </div>
                </a>

                <a href="mailto:melbournemaxicabservice@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--ink-light)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(255, 114, 33, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 6L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 400 }}>Email Address</div>
                    melbournemaxicabservice@gmail.com
                  </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--ink-light)', fontSize: '1.1rem', fontWeight: 600 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(255, 114, 33, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 400 }}>Base Location</div>
                    Craigieburn, Melbourne VIC
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal d1" style={{ background: 'var(--bg-light)', border: '1px solid var(--line-light)', borderRadius: '24px', padding: '40px' }}>
              <span className="eyebrow">Send a message</span>
              <h2 className="h3" style={{ color: 'var(--ink-light)', marginBottom: '8px' }}>Drop us a line</h2>
              <p style={{ color: 'var(--ink-light-2)', marginBottom: '28px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                We typically respond within a few hours. For urgent bookings please call directly.
              </p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
