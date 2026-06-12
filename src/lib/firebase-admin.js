import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp() {
  if (getApps().length) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // .env.local stores \n as literal two chars — unescape them
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Lazy getters — Firebase is only initialized when first accessed at runtime,
// not at module-import time (which would fail during `next build` with no env vars).
export const adminApp = new Proxy({}, {
  get(_, prop) {
    return getAdminApp()[prop];
  },
  has(_, prop) {
    return Reflect.has(getAdminApp(), prop);
  },
  getPrototypeOf(_) {
    return Object.getPrototypeOf(getAdminApp());
  },
});

export const db = new Proxy({}, {
  get(_, prop) {
    return getFirestore(getAdminApp())[prop];
  },
  has(_, prop) {
    return Reflect.has(getFirestore(getAdminApp()), prop);
  },
  getPrototypeOf(_) {
    return Object.getPrototypeOf(getFirestore(getAdminApp()));
  },
});

