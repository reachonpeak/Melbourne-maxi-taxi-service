'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function LeadsOverTimeChart({ data }) {
  if (!data?.length) return <div className="admin-chart-empty">No data yet</div>;

  // Show every 5th date label to avoid crowding
  const tickFormatter = (val, idx) => (idx % 5 === 0 ? val.slice(5) : '');

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={tickFormatter} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(v) => [v, 'Leads']}
          labelFormatter={(l) => `Date: ${l}`}
          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
        />
        <Bar dataKey="count" fill="#f26522" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
