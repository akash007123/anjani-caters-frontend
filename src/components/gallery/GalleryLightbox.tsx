import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox = ({ items, selectedIndex, onClose, onNavigate }: GalleryLightboxProps) => {

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && selectedIndex > 0) onNavigate(selectedIndex - 1);
    if (e.key === 'ArrowRight' && selectedIndex < items.length - 1) onNavigate(selectedIndex + 1);
  }, [selectedIndex, items.length, onClose, onNavigate]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, handleKeyDown]);

  if (selectedIndex === null) return null;

  const currentItem = items[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground hover:bg-maroon-light rounded-full"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation - Previous */}
        {selectedIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 text-primary-foreground hover:bg-primary rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(selectedIndex - 1);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}

        {/* Navigation - Next */}
        {selectedIndex < items.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 text-primary-foreground hover:bg-primary rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(selectedIndex + 1);
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Content */}
        <motion.div
          key={currentItem.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="max-w-[90vw] max-h-[90vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {currentItem.type === 'image' ? (
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="max-w-full max-h-[85vh] rounded-xl shadow-elevated object-contain"
              loading="lazy"
            />
          ) : (
            <div className="relative">
              <video
                src={currentItem.src}
                poster={currentItem.thumbnail}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-xl shadow-elevated"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4 rounded-b-xl"
          >
            <h3 className="text-primary-foreground font-serif text-lg font-semibold">
              {currentItem.title}
            </h3>
            <p className="text-primary-foreground/70 text-sm capitalize">
              {currentItem.category}
            </p>
          </motion.div>
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm">
          {selectedIndex + 1} / {items.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
