import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import GalleryLightbox, { GalleryItem } from './GalleryLightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  categories: { value: string; label: string }[];
}

const GalleryGrid = ({ items, categories }: GalleryGridProps) => {
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
        role="tablist"
        aria-label="Gallery filters"
      >
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={filter === category.value ? 'default' : 'outline'}
            onClick={() => setFilter(category.value)}
            className={filter === category.value 
              ? 'bg-primary hover:bg-maroon-light' 
              : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            }
            size="sm"
            role="tab"
            aria-selected={filter === category.value}
            aria-controls="gallery-grid"
          >
            {category.label}
          </Button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        id="gallery-grid"
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedIndex(items.indexOf(item))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(items.indexOf(item))}
              aria-label={`View ${item.title}`}
            >
              {/* Loading skeleton */}
              {!loadedImages.has(item.id) && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              
              <img 
                src={item.type === 'video' ? item.thumbnail || item.src : item.src}
                alt={item.title}
                className={`w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110 ${
                  loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(item.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-primary-foreground">
                  {item.type === 'video' ? (
                    <Play className="w-12 h-12 mx-auto mb-2" />
                  ) : (
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                  )}
                  <p className="font-semibold text-sm md:text-base">{item.title}</p>
                  {item.type === 'video' && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full mt-2 inline-block">
                      Video
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <GalleryLightbox
        items={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  );
};

export default GalleryGrid;
