import { adminApp, db, verifyAdmin } from '@/lib/firebase-admin';

const VALID_STATUSES = ['unverified', 'verified', 'contacted'];

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
