'use client';
import { useAnalytics } from '@/hooks/useAdminData';
import StatCards from '@/components/admin/StatCards';
import LeadsOverTimeChart from '@/components/admin/LeadsOverTimeChart';
import VerifiedRateChart from '@/components/admin/VerifiedRateChart';

export default function AnalyticsPage() {
  const { data, loading, error } = useAnalytics();

  if (loading) return <div className="admin-page-loading">Loading analytics…</div>;
  if (error) return <div className="admin-page-error">Error: {error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Analytics</h1>
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-ga-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: 6 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Open Google Analytics
        </a>
      </div>

      <StatCards
        totalLeads={data.totalLeads}
        verifiedLeads={data.verifiedLeads}
        conversionRate={data.conversionRate}
        leadsThisWeek={data.leadsThisWeek}
      />

      <div className="admin-section">
        <div className="admin-section-title">Leads over time (last 30 days)</div>
        <LeadsOverTimeChart data={data.dailyCounts} />
      </div>

      <div className="admin-section">
        <div className="admin-section-title">Breakdown</div>
        <VerifiedRateChart
          verifiedVsUnverified={data.verifiedVsUnverified}
          sourceBreakdown={data.sourceBreakdown}
        />
      </div>
    </div>
  );
}
