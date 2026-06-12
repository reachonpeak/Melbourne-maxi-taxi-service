import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp;
let db;

try {
  if (getApps().length) {
    adminApp = getApps()[0];
  } else {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
      }),
    });
  }
  db = getFirestore(adminApp);
} catch (e) {
  // Gracefully handle missing environment variables during static build phase
  console.warn('Firebase Admin SDK initialization deferred:', e.message);
  
  // Provide fallback proxies so that importing doesn't crash if accessed at compile time
  adminApp = new Proxy({}, {
    get() {
      throw new Error('Firebase Admin SDK is not initialized. Check your environment variables.');
    }
  });
  db = new Proxy({}, {
    get() {
      throw new Error('Firestore Database is not initialized. Check your environment variables.');
    }
  });
}

export { adminApp, db };
