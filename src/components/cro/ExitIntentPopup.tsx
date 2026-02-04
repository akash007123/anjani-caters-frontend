import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !hasShown &&
        !localStorage.getItem('exitIntentDismissed')
      ) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('exitIntentDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-4"
          >
            <div className="relative bg-card rounded-xl shadow-elevated p-6">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🎁</span>
                </div>
                
                <h3 className="heading-card text-primary">
                  Wait! Don't Leave Without This
                </h3>
                
                <p className="text-muted-foreground">
                  Get a <strong>10% discount</strong> on your first event booking when you subscribe to our newsletter!
                </p>

                <form 
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleClose();
                    alert('Thank you for subscribing!');
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-maroon-light"
                  >
                    Get My Discount <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
