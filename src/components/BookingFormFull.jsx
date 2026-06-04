'use client';
import { useEffect } from 'react';

export default function BookingFormFull() {
  useEffect(() => {
    const d = document.getElementById('date');
    if (d) {
      const t = new Date().toISOString().split('T')[0];
      d.min = t;
      d.value = t;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const v = (n) => { const el = form.elements[n]; return el ? el.value.trim() : ''; };
    const radio = (n) => { const el = form.querySelector(`input[name="${n}"]:checked`); return el ? el.value : ''; };
    const req = ['pickup', 'dropoff', 'date', 'time', 'cname', 'cphone'];
    let ok = true;
    req.forEach((n) => { const el = form.elements[n]; if (el && !el.value.trim()) { el.reportValidity(); ok = false; } });
    if (!ok) return;
    const lines = [
      'New booking request — Melbourne Maxi Cab', '',
      'Name: ' + v('cname'), 'Phone: ' + v('cphone'),
      'Pickup: ' + v('pickup'), 'Drop-off: ' + v('dropoff'),
      'Date: ' + v('date'), 'Time: ' + v('time'),
      'Passengers: ' + v('pax'), 'Vehicle: ' + v('vehicle'),
      'Baby seat: ' + radio('baby'), 'Return: ' + radio('return'),
    ];
    window.open('https://wa.me/61455906197?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  };

  return (
    <section className="booking section-light" id="book">
      <div className="container">
        <div className="book-card">
          <div className="book-head">
            <div>
              <h2 className="h3" style={{ fontSize: '1.5rem' }}>Book your maxi cab</h2>
              <p>Get an instant confirmation — sent straight to WhatsApp.</p>
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
              <div className="book-foot">
                <div className="pay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                  Cash · Card · Digital wallets accepted
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Send via WhatsApp
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
