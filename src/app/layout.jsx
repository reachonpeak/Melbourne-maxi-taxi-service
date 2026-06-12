import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--ff',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className="js">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className={jakarta.className}>
        {children}
      </body>
    </html>
  );
}
