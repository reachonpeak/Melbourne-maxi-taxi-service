'use client';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let _auth = null;

function getFirebaseAuth() {
  if (_auth) return _auth;
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  _auth = getAuth(app);
  return _auth;
}

// Lazy auth object — only initializes on first property access (browser only)
export const auth = new Proxy({}, {
  get(_, prop) {
    return getFirebaseAuth()[prop];
  },
  apply(_, thisArg, args) {
    return getFirebaseAuth().apply(thisArg, args);
  },
  has(_, prop) {
    return Reflect.has(getFirebaseAuth(), prop);
  },
  getPrototypeOf(_) {
    return Object.getPrototypeOf(getFirebaseAuth());
  },
});
