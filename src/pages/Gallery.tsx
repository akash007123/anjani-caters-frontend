import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { GalleryItem } from '@/components/gallery/GalleryLightbox';

interface GalleryItemData {
  _id: string;
  title: string;
  description?: string;
  category: string;
  customCategory?: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Weddings' },
  { value: 'catering', label: 'Catering' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'religious', label: 'Religious' },
  { value: 'other', label: 'Other' },
];

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery?isActive=true`);
      const data = await response.json();
      
      // Transform data to match GalleryItem interface and prepend API_URL for file URLs
      const transformedItems: GalleryItem[] = data.map((item: GalleryItemData) => {
        // Extract base URL from API_URL (remove /api suffix if present)
        const baseUrl = API_URL.replace(/\/api\/?$/, '');
        
        // Handle both old (/uploads) and new (/api/uploads) URL formats
        const src = item.src.startsWith('/api/uploads') 
          ? `${baseUrl}${item.src}`
          : item.src.startsWith('/uploads') 
            ? `${API_URL}${item.src}`
            : item.src;
        const thumbnail = item.thumbnail 
          ? (item.thumbnail.startsWith('/api/uploads') 
              ? `${baseUrl}${item.thumbnail}`
              : item.thumbnail.startsWith('/uploads') 
                ? `${API_URL}${item.thumbnail}`
                : item.thumbnail)
          : undefined;
        
        return {
          id: item._id,
          src,
          category: item.category,
          title: item.title,
          type: item.type,
          thumbnail,
        };
      });
      
      setGalleryItems(transformedItems);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      // Fallback to empty array if API fails
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No gallery items found. Check back soon!</p>
            </div>
          ) : (
            <GalleryGrid items={galleryItems} categories={CATEGORIES} />
          )}
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
              { number: `${galleryItems.length}+`, label: 'Events Captured' },
              { number: `${galleryItems.filter(i => i.type === 'image').length * 50}+`, label: 'Photos Delivered' },
              { number: `${galleryItems.filter(i => i.type === 'video').length * 10}+`, label: 'Video Highlights' },
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
