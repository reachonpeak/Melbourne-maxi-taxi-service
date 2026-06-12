import { Timestamp } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase-admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { lat, lng, page, ua } = body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return Response.json({ error: 'Invalid coordinates' }, { status: 400 });
    }

    // Clamp to valid ranges
    const latitude = Math.max(-90, Math.min(90, lat));
    const longitude = Math.max(-180, Math.min(180, lng));

    // Get IP from request headers for additional context
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';

    await db.collection('visitors').add({
      lat: latitude,
      lng: longitude,
      ip,
      page: page || '/',
      userAgent: ua || null,
      createdAt: Timestamp.now(),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Visitor location save error:', err);
    return Response.json({ error: 'Failed to save location' }, { status: 500 });
  }
}
