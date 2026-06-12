import { adminApp, db, verifyAdmin } from '@/lib/firebase-admin';

function toDateString(ts) {
  if (!ts) return null;
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toISOString().slice(0, 10);
}

export async function GET(request) {
  if (!(await verifyAdmin(request))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const snapshot = await db.collection('leads').get();
    const leads = snapshot.docs.map((doc) => doc.data());

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const totalLeads = leads.length;
    const verifiedLeads = leads.filter(
      (l) => l.status === 'verified' || l.status === 'contacted'
    ).length;
    const conversionRate =
      totalLeads > 0 ? Math.round((verifiedLeads / totalLeads) * 1000) / 10 : 0;
    const leadsThisWeek = leads.filter((l) => {
      if (!l.createdAt) return false;
      const d = l.createdAt.toDate ? l.createdAt.toDate() : new Date(l.createdAt);
      return d >= weekAgo;
    }).length;

    // Daily counts — last 30 days
    const dailyMap = new Map();
    leads.forEach((l) => {
      const ds = toDateString(l.createdAt);
      if (ds) dailyMap.set(ds, (dailyMap.get(ds) || 0) + 1);
    });
    const dailyCounts = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const ds = d.toISOString().slice(0, 10);
      dailyCounts.push({ date: ds, count: dailyMap.get(ds) || 0 });
    }

    const unverifiedCount = leads.filter(
      (l) => l.status === 'unverified'
    ).length;
    const verifiedVsUnverified = [
      { name: 'Verified', value: verifiedLeads },
      { name: 'Unverified', value: unverifiedCount },
    ];

    const bookingCount = leads.filter((l) => l.type === 'booking').length;
    const contactCount = leads.filter((l) => l.type === 'contact').length;
    const sourceBreakdown = [
      { name: 'Booking', value: bookingCount },
      { name: 'Contact', value: contactCount },
    ];

    return Response.json({
      totalLeads,
      verifiedLeads,
      conversionRate,
      leadsThisWeek,
      dailyCounts,
      verifiedVsUnverified,
      sourceBreakdown,
    });
  } catch (err) {
    console.error('Admin analytics error:', err);
    return Response.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
