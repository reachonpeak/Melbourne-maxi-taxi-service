function StatusBadge({ status }) {
  const map = {
    unverified: 'admin-badge-unverified',
    verified: 'admin-badge-verified',
    contacted: 'admin-badge-contacted',
  };
  return <span className={`admin-badge ${map[status] || 'admin-badge-unverified'}`}>{status}</span>;
}

function TypeTag({ type }) {
  return <span className={`admin-type-tag admin-type-${type}`}>{type}</span>;
}

function formatDate(val) {
  if (!val) return '—';
  return new Date(val).toLocaleDateString('en-AU');
}

export default function LeadsTable({ leads, onSelect }) {
  if (!leads.length) {
    return <div className="admin-table-empty">No leads match the current filters.</div>;
  }

  return (
    <>
      {/* ── Desktop table (hidden on mobile via CSS) ── */}
      <div className="admin-table-wrap admin-leads-desktop">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Form</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} onClick={() => onSelect(lead)} className="admin-table-row">
                <td><StatusBadge status={lead.status} /></td>
                <td className="admin-td-name">{lead.name || '—'}</td>
                <td>
                  {lead.phone ? (
                    <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="admin-phone-link">
                      {lead.phone}
                    </a>
                  ) : '—'}
                </td>
                <td className="admin-td-email">
                  {lead.email || '—'}
                  {lead.emailVerified && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="13" height="13" style={{ marginLeft: 4, verticalAlign: 'middle', flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </td>
                <td><TypeTag type={lead.type} /></td>
                <td className="admin-td-date">{formatDate(lead.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list (hidden on desktop via CSS) ── */}
      <div className="admin-leads-cards">
        {leads.map((lead) => (
          <div key={lead.id} className="admin-lead-card" onClick={() => onSelect(lead)}>
            {/* Card header */}
            <div className="alc-header">
              <StatusBadge status={lead.status} />
              <TypeTag type={lead.type} />
              <span className="alc-date">{formatDate(lead.createdAt)}</span>
            </div>

            {/* Name */}
            <div className="alc-name">{lead.name || '—'}</div>

            {/* Contact row */}
            <div className="alc-contact">
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="alc-phone"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {lead.phone}
                </a>
              )}
              {lead.email && (
                <span className="alc-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {lead.email}
                  {lead.emailVerified && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="12" height="12" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
              )}
            </div>

            {/* Tap hint */}
            <div className="alc-tap-hint">
              Tap to view details
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
