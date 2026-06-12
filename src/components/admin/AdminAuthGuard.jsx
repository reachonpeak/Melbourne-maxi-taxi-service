'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';

export default function AdminAuthGuard({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/admin/login');
      } else if (user.email !== adminEmail) {
        await signOut(auth);
        router.replace('/admin/login');
      } else {
        setAllowed(true);
      }
      setChecking(false);
    });
    return () => unsub();
  }, [router, adminEmail]);

  if (checking) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-inner">Loading…</div>
      </div>
    );
  }
  if (!allowed) return null;
  return children;
}
