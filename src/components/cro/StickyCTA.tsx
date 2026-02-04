import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Phone, Calendar, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 300 && latest > previous) {
      setIsVisible(true);
    } else if (latest < 100) {
      setIsVisible(false);
      setIsExpanded(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
        >
          <div className="container-custom">
            <div className="flex items-center justify-end gap-3 pointer-events-auto">
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="flex items-center gap-3 bg-card rounded-full shadow-elevated p-2 pr-4"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="rounded-full"
                    >
                      <a href="tel:+919685533878">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="rounded-full bg-primary hover:bg-maroon-light"
                    >
                      <a href="/booking">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </a>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "w-12 h-12 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300",
                  "bg-primary text-primary-foreground hover:bg-maroon-light",
                  isExpanded && "rotate-180"
                )}
                aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingContactButton() {
  return (
    <a
      href="tel:+919685533878"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:bg-maroon-light transition-all duration-300 hover:scale-110"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
