export const dynamic = 'force-dynamic';

import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminNav from '@/components/admin/AdminNav';

export default function ProtectedAdminLayout({ children }) {
  return (
    <AdminAuthGuard>
      <div className="admin-shell">
        <AdminNav />
        <main className="admin-main">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
