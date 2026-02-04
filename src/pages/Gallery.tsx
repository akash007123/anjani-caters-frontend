import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { GalleryItem } from '@/components/gallery/GalleryLightbox';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCatering from '@/assets/hero-catering.jpg';
import eventDecoration from '@/assets/event-decoration.jpg';
import corporateEvent from '@/assets/corporate-event.jpg';
import buffetSetup from '@/assets/buffet-setup.jpg';
import religiousEvent from '@/assets/religious-event.jpg';

const Gallery = () => {
  const galleryItems: GalleryItem[] = [
    { id: 'g1', src: heroWedding, category: 'wedding', title: 'Grand Wedding Setup', type: 'image' },
    { id: 'g2', src: heroCatering, category: 'catering', title: 'Traditional Feast', type: 'image' },
    { id: 'g3', src: eventDecoration, category: 'decoration', title: 'Floral Arrangements', type: 'image' },
    { id: 'g4', src: corporateEvent, category: 'corporate', title: 'Corporate Conference', type: 'image' },
    { id: 'g5', src: buffetSetup, category: 'catering', title: 'Royal Buffet', type: 'image' },
    { id: 'g6', src: religiousEvent, category: 'religious', title: 'Sacred Ceremony', type: 'image' },
    { id: 'g7', src: heroWedding, category: 'wedding', title: 'Wedding Reception', type: 'image' },
    { id: 'g8', src: eventDecoration, category: 'decoration', title: 'Mandap Design', type: 'image' },
    { id: 'g9', src: heroCatering, category: 'catering', title: 'Live Counters', type: 'image' },
    { id: 'g10', src: corporateEvent, category: 'corporate', title: 'Awards Night', type: 'image' },
    { id: 'g11', src: buffetSetup, category: 'catering', title: 'Dessert Station', type: 'image' },
    { id: 'g12', src: religiousEvent, category: 'religious', title: 'Pooja Setup', type: 'image' },
    // Video items - using placeholder thumbnails
    { id: 'v1', src: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'wedding', title: 'Wedding Highlights', type: 'video', thumbnail: heroWedding },
    { id: 'v2', src: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'catering', title: 'Catering Showcase', type: 'video', thumbnail: buffetSetup },
    { id: 'v3', src: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'corporate', title: 'Corporate Event Reel', type: 'video', thumbnail: corporateEvent },
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'wedding', label: 'Weddings' },
    { value: 'catering', label: 'Catering' },
    { value: 'decoration', label: 'Decoration' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'religious', label: 'Religious' },
  ];

  return (
    <>
      <SEO 
        title="Gallery"
        description="Browse our stunning gallery of weddings, corporate events, and catering setups. See how Anjani Events transforms celebrations into unforgettable experiences."
        keywords="event gallery, wedding photos, catering images, corporate event photos, Indian wedding decoration"
        url="http://anjanievents.in/gallery"
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium mb-4">
              📸 Our Portfolio
            </span>
            <h1 className="heading-display mb-4">Our Gallery</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Browse through our collection of memorable events, stunning decorations, and delicious cuisines
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="main-content" className="section-padding">
        <div className="container-custom">
          <GalleryGrid items={galleryItems} categories={categories} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Events That Speak for Themselves
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Events Captured' },
              { number: '1000+', label: 'Photos Delivered' },
              { number: '50+', label: 'Video Highlights' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-xl shadow-soft"
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">Ready to Create Your Story?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Let us capture the magic of your special moments. Contact us today to discuss your event.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-gold-light transition-colors"
              >
                Get Free Quote
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
