function StatCard({ label, value, sub, color }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-value" style={color ? { color } : {}}>
        {value ?? '—'}
      </div>
      <div className="admin-stat-label">{label}</div>
      {sub && <div className="admin-stat-sub">{sub}</div>}
    </div>
  );
}

export default function StatCards({ totalLeads, verifiedLeads, conversionRate, leadsThisWeek }) {
  return (
    <div className="admin-stat-grid">
      <StatCard label="Total Leads" value={totalLeads} />
      <StatCard label="Verified Leads" value={verifiedLeads} color="#16a34a" />
      <StatCard label="Conversion Rate" value={`${conversionRate ?? 0}%`} color="#f26522" />
      <StatCard label="Leads This Week" value={leadsThisWeek} />
    </div>
  );
}
