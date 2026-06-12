'use client';
import { useEffect } from 'react';

function InfoGrid({ children }) {
  return <div className="ldm-info-grid">{children}</div>;
}

function InfoItem({ label, value, full }) {
  if (!value && value !== 0) return null;
  return (
    <div className={`ldm-info-item${full ? ' ldm-info-full' : ''}`}>
      <span className="ldm-info-label">{label}</span>
      <span className="ldm-info-value">{value}</span>
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
    await onStatusChange(lead.id, e.target.value);
  };

  const statusColors = {
    unverified: { bg: 'rgba(245,158,11,0.1)', color: '#b45309' },
    verified:   { bg: 'rgba(22,163,74,0.1)',  color: '#166534' },
    contacted:  { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8' },
  };
  const sc = statusColors[lead.status] || statusColors.unverified;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-panel ldm-panel" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="ldm-header">
          <div className="ldm-header-top">
            <div className="ldm-name-row">
              <span className="ldm-name">{lead.name || 'Lead'}</span>
              <span className="ldm-type-badge" data-type={lead.type}>{lead.type}</span>
            </div>
            <button className="admin-modal-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="ldm-header-meta">
            {/* Status selector styled inline */}
            <select
              className="ldm-status-select"
              value={lead.status}
              onChange={handleStatusChange}
              style={{ '--sc-bg': sc.bg, '--sc-color': sc.color }}
            >
              <option value="unverified">Unverified</option>
              <option value="verified">Verified</option>
              <option value="contacted">Contacted</option>
            </select>

            {lead.createdAt && (
              <span className="ldm-date">
                {new Date(lead.createdAt).toLocaleDateString('en-AU', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ldm-body">

          {/* Contact section */}
          <div className="ldm-section">
            <div className="ldm-section-title">Contact</div>
            <InfoGrid>
              {lead.phone && (
                <div className="ldm-info-item">
                  <span className="ldm-info-label">Phone</span>
                  <a href={`tel:${lead.phone}`} className="ldm-info-phone">{lead.phone}</a>
                </div>
              )}
              {lead.email && (
                <div className="ldm-info-item ldm-info-full">
                  <span className="ldm-info-label">Email</span>
                  <span className="ldm-info-value">
                    {lead.email}
                    {lead.emailVerified
                      ? <span className="ldm-verified-chip">✓ Verified</span>
                      : <span className="ldm-unverified-chip">Unverified</span>
                    }
                  </span>
                </div>
              )}
            </InfoGrid>
          </div>

          {/* Booking section */}
          {lead.type === 'booking' && lead.booking && (
            <div className="ldm-section">
              <div className="ldm-section-title">Booking Details</div>
              <InfoGrid>
                <InfoItem label="Date"       value={lead.booking.date} />
                <InfoItem label="Time"       value={lead.booking.time} />
                <InfoItem label="Passengers" value={lead.booking.passengers} />
                <InfoItem label="Vehicle"    value={lead.booking.vehicle} full />
                <InfoItem label="Pickup"     value={lead.booking.pickup}  full />
                <InfoItem label="Drop-off"   value={lead.booking.dropoff} full />
                <InfoItem label="Baby seat"  value={lead.booking.babySeat} />
                <InfoItem label="Return"     value={lead.booking.returnTrip} />
                {lead.booking.notes && (
                  <InfoItem label="Notes" value={lead.booking.notes} full />
                )}
              </InfoGrid>
            </div>
          )}

          {/* Contact/enquiry section */}
          {lead.type === 'contact' && lead.contact && (
            <div className="ldm-section">
              <div className="ldm-section-title">Enquiry Details</div>
              <InfoGrid>
                <InfoItem label="Service" value={lead.contact.service} />
                <InfoItem label="Date"    value={lead.contact.requestedDate} />
                {lead.contact.message && (
                  <InfoItem label="Message" value={lead.contact.message} full />
                )}
              </InfoGrid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
