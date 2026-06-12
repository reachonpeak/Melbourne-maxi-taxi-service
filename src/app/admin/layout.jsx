export const dynamic = 'force-dynamic';

import '@/app/globals.css';
import './admin.css';

export const metadata = {
  title: 'Admin — MelbourneMaxiTaxi',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
