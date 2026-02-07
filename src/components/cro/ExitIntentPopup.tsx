import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getApiBase = () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  return base.replace(/\/api\/?$/, '');
};
const SUBSCRIBER_API = `${getApiBase()}/api/subscribers/subscribe`;

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    // Show popup immediately on mount if user hasn't subscribed yet
    const hasSubscribed = localStorage.getItem('subscribed');
    if (!hasSubscribed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(SUBSCRIBER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setDiscountCode(data.discountCode || 'WELCOME10');
        localStorage.setItem('subscribed', 'true');
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        if (data.discountCode) {
          setDiscountCode(data.discountCode);
        }
      }
    } catch (err) {
      setError('Unable to connect. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-4"
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
                {success ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h3 className="heading-card text-primary">
                      You're In!
                    </h3>
                    
                    <p className="text-muted-foreground">
                      Thanks for subscribing! Use this code on your first booking:
                    </p>

                    <div className="bg-muted rounded-lg p-4 mt-4">
                      <code className="text-xl font-bold text-primary">{discountCode}</code>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      A copy has been sent to your email.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🎁</span>
                    </div>
                    
                    <h3 className="heading-card text-primary">
                      Wait! Don't Leave Without This
                    </h3>
                    
                    <p className="text-muted-foreground">
                      Get a <strong>10% discount</strong> on your first event booking when you subscribe to our newsletter!
                    </p>

                    {error && (
                      <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <form 
                      className="space-y-3"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-maroon-light"
                        disabled={loading}
                      >
                        {loading ? 'Subscribing...' : 'Get My Discount'} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
