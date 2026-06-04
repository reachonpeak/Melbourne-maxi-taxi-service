import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import ScrollReveal from '@/components/ScrollReveal';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--ff',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0a0a0a',
};

export const metadata = {
  title: 'Melbourne Maxi Cab Service — Airport & Group Transfers 24/7',
  description:
    'Melbourne maxi cab service for airport runs, groups up to 13 and citywide travel. Spacious, spotless vehicles 24/7 with professional local drivers, fixed fares and easy online booking.',
  openGraph: {
    title: 'Melbourne Maxi Cab Service — Airport & Group Transfers 24/7',
    description:
      'Spacious maxi cabs across Melbourne. Airport, corporate, hotel, event & wedding transfers. Up to 13 passengers. Book 24/7.',
    type: 'website',
    url: 'https://www.melbournemaxicabservice.au/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className="js">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className={jakarta.className}>
        <ScrollReveal />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBar />
        {/* WhatsApp FAB */}
        <a
          className="fab"
          href="https://wa.me/61455906197"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-.707zM17.5 14.4c-.07-.12-.27-.19-.57-.34s-1.76-.87-2.03-.97c-.27-.1-.47-.15-.67.15s-.77.97-.94 1.16c-.17.2-.35.22-.64.07a8.1 8.1 0 0 1-2.39-1.47 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
