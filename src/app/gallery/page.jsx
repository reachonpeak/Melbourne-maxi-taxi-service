import PhotoGallery from '@/components/PhotoGallery';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Gallery — Melbourne Maxi Cab Service',
  description: 'See our clean, modern maxi cabs in action across Melbourne. View our fleet gallery and comfortable interiors.',
};

export default function GalleryPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Photo gallery</span>
          <h1 className="h1">See our fleet in action</h1>
          <p className="lead">Clean, modern and professionally maintained — see what you can expect when you book with us.</p>
        </div>
      </div>

      <section className="section-light">
        <div className="container">
          <PhotoGallery />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
