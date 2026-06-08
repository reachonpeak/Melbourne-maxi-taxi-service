import BookingFormFull from '@/components/BookingFormFull';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Book Online — Maxi Melbourne Cab Service',
  description: 'Book your Melbourne maxi cab online. Fast, secure, fixed pricing, and instant confirmation via WhatsApp.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Book Online', path: '/book' }]} />
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Quick & Easy Booking</span>
          <h1 className="h1">Book your ride</h1>
          <p className="lead">Fill out the form below to book your Melbourne maxi cab. We will confirm your ride instantly on WhatsApp.</p>
        </div>
      </div>

      <BookingFormFull />
    </>
  );
}
