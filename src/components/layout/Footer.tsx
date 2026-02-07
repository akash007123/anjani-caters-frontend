import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const getApiBase = () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  return base.replace(/\/api\/?$/, '');
};
const SUBSCRIBER_API = `${getApiBase()}/api/subscribers/subscribe`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(SUBSCRIBER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setDiscountCode(data.discountCode || 'WELCOME10');
        toast.success('Successfully subscribed!');
        setEmail('');
      } else {
        toast.error(data.error || 'Subscription failed');
        if (data.discountCode) setDiscountCode(data.discountCode);
      }
    } catch (err) {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-serif text-xl font-bold">अं</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Anjani</h3>
                <p className="text-xs text-primary-foreground/70">Events & Catering</p>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              We create unforgettable moments through exceptional event management and authentic Indian catering services. From intimate gatherings to grand celebrations, we bring your dreams to life.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Menu', path: '/menu' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Blogs', path: '/blogs' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Wedding Events', path: '/services/events' },
                { label: 'Corporate Events', path: '/services/events' },
                { label: 'Catering Services', path: '/services/catering' },
                { label: 'Get a Quote', path: '/get-quote' },
                { label: 'Book Now', path: '/booking' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Get In Touch</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">Maharastra Marg, Rani ki Bagiya, Beniganj, Chhatarpur, Madhya Pradesh 471001</span>
              </li>
              <li>
                <a href="tel:+919685533878" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  +91 96855 33878
                </a>
              </li>
              <li>
                <a href="mailto:info.anjanievents1@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  info.anjanievents1@gmail.com
                </a>
              </li>
            </ul>

            <h5 className="font-medium mb-3">Subscribe to Newsletter</h5>
            {success ? (
              <div className="bg-green-500/20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Subscribed!</span>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Code: <code className="font-bold">{discountCode}</code>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  disabled={loading}
                />
                <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-gold-light flex-shrink-0" disabled={loading}>
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Anjani events. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
