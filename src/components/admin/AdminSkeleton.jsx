'use client';

/**
 * Reusable skeleton building blocks for admin loading states.
 * Each primitive renders a shimmering placeholder matching the real UI dimensions.
 */

/* ── Primitives ── */

export function SkeletonBox({ width, height, radius = 8, className = '', style = {} }) {
  return (
    <div
      className={`sk-box ${className}`}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export function SkeletonText({ width = '100%', height = 14, style = {} }) {
  return <div className="sk-box sk-text" style={{ width, height, ...style }} />;
}

export function SkeletonCircle({ size = 40 }) {
  return <div className="sk-box" style={{ width: size, height: size, borderRadius: '50%' }} />;
}

/* ── Analytics skeleton ── */

export function AnalyticsSkeleton() {
  return (
    <div className="admin-page sk-animate">
      {/* Header */}
      <div className="admin-page-header">
        <SkeletonBox width={140} height={28} radius={6} />
        <SkeletonBox width={180} height={36} radius={8} style={{ marginLeft: 'auto' }} />
      </div>

      {/* Stat cards */}
      <div className="admin-stat-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="admin-stat-card">
            <SkeletonBox width={80} height={36} radius={6} style={{ marginBottom: 10 }} />
            <SkeletonText width={100} height={12} />
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="admin-section">
        <SkeletonText width={200} height={12} style={{ marginBottom: 18 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180 }}>
          {[65, 40, 85, 55, 70, 90, 35, 60, 75, 50, 80, 45].map((h, i) => (
            <SkeletonBox
              key={i}
              width="100%"
              height={`${h}%`}
              radius={4}
              style={{ flex: 1, minWidth: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Breakdown section */}
      <div className="admin-section">
        <SkeletonText width={120} height={12} style={{ marginBottom: 18 }} />
        <div className="admin-pie-row">
          <div className="admin-pie-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SkeletonCircle size={140} />
          </div>
          <div className="admin-pie-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SkeletonCircle size={140} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Leads skeleton ── */

export function LeadsSkeleton() {
  return (
    <div className="admin-page sk-animate">
      {/* Header */}
      <div className="admin-page-header">
        <SkeletonBox width={90} height={28} radius={6} />
        <SkeletonText width={70} height={14} style={{ marginLeft: 8 }} />
      </div>

      {/* Filters */}
      <div className="admin-filter-bar">
        <div className="admin-filter-item">
          <SkeletonText width={50} height={10} style={{ marginBottom: 4 }} />
          <SkeletonBox width={160} height={38} radius={8} />
        </div>
        <div className="admin-filter-item">
          <SkeletonText width={35} height={10} style={{ marginBottom: 4 }} />
          <SkeletonBox width={160} height={38} radius={8} />
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              {['Name', 'Phone', 'Email', 'Type', 'Status', 'Date'].map((col) => (
                <th key={col}>
                  <SkeletonText width={60} height={10} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="sk-table-row">
                <td><SkeletonText width={`${60 + Math.random() * 40}%`} height={14} /></td>
                <td><SkeletonText width={110} height={14} /></td>
                <td><SkeletonText width={`${50 + Math.random() * 30}%`} height={14} /></td>
                <td><SkeletonBox width={70} height={22} radius={4} /></td>
                <td><SkeletonBox width={80} height={22} radius={20} /></td>
                <td><SkeletonText width={90} height={14} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Map skeleton ── */

export function MapSkeleton() {
  return (
    <div className="admin-page sk-animate">
      {/* Header */}
      <div className="admin-page-header">
        <SkeletonBox width={150} height={28} radius={6} />
        <SkeletonText width={200} height={14} style={{ marginLeft: 8 }} />
      </div>

      {/* Legend */}
      <div className="map-legend">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="map-legend-item">
            <SkeletonCircle size={10} />
            <SkeletonText width={80} height={12} />
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="map-container sk-map-placeholder">
        <div className="sk-map-inner">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="sk-map-label">Loading map…</span>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="admin-section" style={{ marginTop: 20 }}>
        <SkeletonText width={180} height={12} style={{ marginBottom: 18 }} />
        <div className="admin-table-wrap">
          <table className="admin-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                {['Coordinates', 'Page', 'Date', 'IP'].map((col) => (
                  <th key={col}><SkeletonText width={70} height={10} /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td><SkeletonText width={130} height={14} /></td>
                  <td><SkeletonText width={40} height={14} /></td>
                  <td><SkeletonText width={120} height={14} /></td>
                  <td><SkeletonText width={90} height={14} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
