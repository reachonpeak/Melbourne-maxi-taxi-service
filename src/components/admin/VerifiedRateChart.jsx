'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VERIFIED_COLORS = ['#16a34a', '#f59e0b'];
const SOURCE_COLORS = ['#f26522', '#64748b'];

function MiniPie({ data, colors, title }) {
  if (!data?.some((d) => d.value > 0)) {
    return (
      <div className="admin-pie-item">
        <div className="admin-pie-title">{title}</div>
        <div className="admin-chart-empty">No data yet</div>
      </div>
    );
  }

  return (
    <div className="admin-pie-item">
      <div className="admin-pie-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, n) => [v, n]}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
          />
          <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function VerifiedRateChart({ verifiedVsUnverified, sourceBreakdown }) {
  return (
    <div className="admin-pie-row">
      <MiniPie data={verifiedVsUnverified} colors={VERIFIED_COLORS} title="Verified vs Unverified" />
      <MiniPie data={sourceBreakdown} colors={SOURCE_COLORS} title="Booking vs Contact" />
    </div>
  );
}
