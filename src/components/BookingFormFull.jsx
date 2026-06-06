'use client';
import { useEffect, useState } from 'react';

export default function BookingFormFull() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const d = document.getElementById('date');
    if (d) {
      const t = new Date().toISOString().split('T')[0];
      d.min = t;
      d.value = t;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const v = (n) => { const el = form.elements[n]; return el ? el.value.trim() : ''; };
    const radio = (n) => { const el = form.querySelector(`input[name="${n}"]:checked`); return el ? el.value : ''; };
    const req = ['pickup', 'dropoff', 'date', 'time', 'cname', 'cphone'];
    let ok = true;
    req.forEach((n) => { const el = form.elements[n]; if (el && !el.value.trim()) { el.reportValidity(); ok = false; } });
    if (!ok) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v('cname'),
          phone: v('cphone'),
          pickup: v('pickup'),
          dropoff: v('dropoff'),
          date: v('date'),
          time: v('time'),
          passengers: v('pax'),
          vehicle: v('vehicle'),
          babySeat: radio('baby'),
          returnTrip: radio('return'),
          notes: v('notes'),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      /* ── Google Ads conversion tracking ── */
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your actual Google Ads conversion ID and label
          value: 1.0,
          currency: 'AUD',
        });
      }

      /* ── Google Analytics lead event (GA4) ── */
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          currency: 'AUD',
          value: 1.0,
        });
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAnother = () => {
    setSubmitted(false);
    setError('');
  };

  return (
    <section className="booking section-light" id="book">
      <div className="container">
        <div className="book-card">
          <div className="book-head">
            <div>
              <h2 className="h3" style={{ fontSize: '1.5rem' }}>Book your maxi cab</h2>
              <p>Get an instant confirmation — sent straight to your inbox.</p>
            </div>
            <span className="save">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/>
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
                <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
              </svg>
              Save 15% on advance bookings
            </span>
          </div>
          <div className="book-body">
            {submitted ? (
              <div className="booking-success">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3>Booking Submitted Successfully!</h3>
                <p>Thank you for choosing Melbourne Maxi Cab Service. Your booking details have been received and our team will confirm your ride shortly.</p>
                <div className="success-details">
                  <div className="success-detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <span>You'll receive a confirmation within minutes</span>
                  </div>
                  <div className="success-detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>Need help? Call <a href="tel:+61455906197" style={{ color: 'var(--accent)', fontWeight: 700 }}>0455 906 197</a></span>
                  </div>
                </div>
                <button type="button" className="btn btn-primary btn-lg" onClick={handleBookAnother} style={{ marginTop: 28 }}>
                  Book Another Ride
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 18, height: 18 }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            ) : (
            <form className="form-grid" id="bookingForm" noValidate onSubmit={handleSubmit}>
              <div className="field c2">
                <label htmlFor="pickup">Pickup location <span className="r">*</span></label>
                <input className="control" id="pickup" name="pickup" placeholder="e.g. Melbourne Airport" required />
              </div>
              <div className="field c2">
                <label htmlFor="dropoff">Drop-off location <span className="r">*</span></label>
                <input className="control" id="dropoff" name="dropoff" placeholder="e.g. Crown Hotel, Melbourne" required />
              </div>
              <div className="field">
                <label htmlFor="date">Date <span className="r">*</span></label>
                <input className="control" id="date" name="date" type="date" required />
              </div>
              <div className="field">
                <label htmlFor="time">Time <span className="r">*</span></label>
                <input className="control" id="time" name="time" type="time" required />
              </div>
              <div className="field">
                <label htmlFor="pax">Passengers</label>
                <select className="control" id="pax" name="pax">
                  {[...Array(13)].map((_, i) => (
                    <option key={i + 1}>{i + 1} {i === 0 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="vehicle">Vehicle type</label>
                <select className="control" id="vehicle" name="vehicle">
                  <option>Maxi Van (Up to 13 seats)</option>
                  <option>Maxi 7 Seater</option>
                  <option>SUV (1-5 passengers)</option>
                  <option>Sedan (1-4 passengers)</option>
                </select>
              </div>
              <div className="field c2">
                <label>Baby / booster seat?</label>
                <div className="seg">
                  <label><input type="radio" name="baby" value="No" defaultChecked /><span className="opt">No thanks</span></label>
                  <label><input type="radio" name="baby" value="Baby seat" /><span className="opt">Baby seat</span></label>
                  <label><input type="radio" name="baby" value="Booster" /><span className="opt">Booster</span></label>
                </div>
              </div>
              <div className="field c2">
                <label>Return trip?</label>
                <div className="seg">
                  <label><input type="radio" name="return" value="No" defaultChecked /><span className="opt">One way</span></label>
                  <label><input type="radio" name="return" value="Yes" /><span className="opt">Return</span></label>
                </div>
              </div>
              <div className="field c2">
                <label htmlFor="cname">Your name <span className="r">*</span></label>
                <input className="control" id="cname" name="cname" placeholder="Full name" required />
              </div>
              <div className="field c2">
                <label htmlFor="cphone">Phone number <span className="r">*</span></label>
                <input className="control" id="cphone" name="cphone" type="tel" placeholder="+61 4xx xxx xxx" required />
              </div>
              <div className="field c4">
                <label htmlFor="notes">Additional notes</label>
                <textarea className="control" id="notes" name="notes" rows="3" placeholder="Flight number, special requests, luggage details…" style={{ resize: 'vertical' }} />
              </div>
              {error && (
                <div className="field c4">
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', color: '#dc2626', fontWeight: 600, fontSize: '.92rem' }}>
                    {error}
                  </div>
                </div>
              )}
              <div className="book-foot">
                <div className="pay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                  Cash · Card · Digital wallets accepted
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      Submitting…
                      <span className="btn-spinner" />
                    </>
                  ) : (
                    <>
                      Book Now
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 18, height: 18 }}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
