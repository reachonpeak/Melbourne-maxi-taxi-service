import { adminApp, db, verifyAdmin } from '@/lib/firebase-admin';

export async function GET(request) {
  if (!(await verifyAdmin(request))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const snapshot = await db
      .collection('visitors')
      .orderBy('createdAt', 'desc')
      .limit(500)
      .get();

    const visitors = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString() ?? null,
    }));

    return Response.json({ visitors });
  } catch (err) {
    console.error('Admin visitors fetch error:', err);
    return Response.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}
