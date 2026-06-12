import { adminApp, db } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const VALID_STATUSES = ['unverified', 'verified', 'contacted'];

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

export async function PATCH(request, { params }) {
  if (!(await verifyAdmin(request))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    await db.collection('leads').doc(id).update({ status });
    return Response.json({ success: true });
  } catch (err) {
    console.error('Admin lead update error:', err);
    return Response.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
