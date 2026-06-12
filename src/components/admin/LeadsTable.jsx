function StatusBadge({ status }) {
  const map = {
    unverified: 'admin-badge-unverified',
    verified: 'admin-badge-verified',
    contacted: 'admin-badge-contacted',
  };
  return <span className={`admin-badge ${map[status] || 'admin-badge-unverified'}`}>{status}</span>;
}

export default function LeadsTable({ leads, onSelect }) {
  if (!leads.length) {
    return <div className="admin-table-empty">No leads match the current filters.</div>;
  }

  return (
    <div className="admin-table-wrap">
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
              <td><span className={`admin-type-tag admin-type-${lead.type}`}>{lead.type}</span></td>
              <td className="admin-td-date">
                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-AU') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
