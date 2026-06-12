export default function LeadsFilter({ statusFilter, setStatusFilter, typeFilter, setTypeFilter }) {
  return (
    <div className="admin-filter-bar">
      <div className="admin-filter-item">
        <label className="admin-filter-label">Status</label>
        <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="unverified">Unverified</option>
          <option value="verified">Verified</option>
          <option value="contacted">Contacted</option>
        </select>
      </div>
      <div className="admin-filter-item">
        <label className="admin-filter-label">Form</label>
        <select className="admin-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All forms</option>
          <option value="booking">Booking</option>
          <option value="contact">Contact</option>
        </select>
      </div>
    </div>
  );
}
