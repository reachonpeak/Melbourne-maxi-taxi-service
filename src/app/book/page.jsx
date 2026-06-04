import BookingFormFull from '@/components/BookingFormFull';

export const metadata = {
  title: 'Book Online — Melbourne Maxi Cab Service',
  description: 'Book your Melbourne maxi cab online. Fast, secure, fixed pricing, and instant confirmation via WhatsApp.',
};

export default function BookPage() {
  return (
    <>
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
