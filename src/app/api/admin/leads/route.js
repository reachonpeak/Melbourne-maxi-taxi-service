import { adminApp, db } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

async function verifyAdmin(request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return false;
  try {
    const decoded = await getAuth(adminApp).verifyIdToken(header.slice(7));
    return decoded.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function GET(request) {
  if (!(await verifyAdmin(request))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').limit(200).get();
    const leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString() ?? null,
    }));
    return Response.json({ leads });
  } catch (err) {
    console.error('Admin leads fetch error:', err);
    return Response.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
