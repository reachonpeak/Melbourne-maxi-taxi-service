'use client';
import { useEffect } from 'react';

function Row({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="admin-detail-row">
      <span className="admin-detail-label">{label}</span>
      <span className="admin-detail-value">{value}</span>
    </div>
  );
}

export default function LeadDetailModal({ lead, onClose, onStatusChange }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await onStatusChange(lead.id, newStatus);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, position: 'relative', padding: '18px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingRight: 32 }}>
            <h2 className="admin-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{lead.name || 'Lead Detail'}</h2>
            <select className="admin-status-select" value={lead.status} onChange={handleStatusChange} style={{ margin: 0, padding: '6px 10px', fontSize: '0.82rem', height: 'auto' }}>
              <option value="unverified">Unverified</option>
              <option value="verified">Verified</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>
          {lead.createdAt && (
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
              Submitted on {new Date(lead.createdAt).toLocaleString('en-AU')}
            </span>
          )}
          <button className="admin-modal-close" onClick={onClose} aria-label="Close" style={{ position: 'absolute', right: 20, top: 20 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="admin-modal-body">
          <div className="admin-detail-section">
            <div className="admin-detail-section-title">Customer</div>
            <Row label="Phone" value={lead.phone} />
            <Row
              label="Email"
              value={
                lead.email
                  ? `${lead.email}${lead.emailVerified ? ' (Verified)' : ' (Unverified)'}`
                  : null
              }
            />
          </div>

          {lead.type === 'booking' && lead.booking && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">Booking Details</div>
              <Row label="Pickup" value={lead.booking.pickup} />
              <Row label="Drop-off" value={lead.booking.dropoff} />
              <Row label="Date" value={lead.booking.date} />
              <Row label="Time" value={lead.booking.time} />
              <Row label="Vehicle" value={lead.booking.vehicle} />
              <Row label="Passengers" value={lead.booking.passengers} />
              <Row label="Baby seat" value={lead.booking.babySeat} />
              <Row label="Return trip" value={lead.booking.returnTrip} />
              <Row label="Notes" value={lead.booking.notes} />
            </div>
          )}

          {lead.type === 'contact' && lead.contact && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">Enquiry Details</div>
              <Row label="Service" value={lead.contact.service} />
              <Row label="Requested date" value={lead.contact.requestedDate} />
              <Row label="Message" value={lead.contact.message} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
