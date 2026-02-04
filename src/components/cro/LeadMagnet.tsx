import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Menu, X, CheckCircle, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeadMagnetData {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileType: 'pdf' | 'brochure' | 'menu';
  icon: LucideIcon;
}

interface LeadMagnetCardProps extends LeadMagnetData {
  index: number;
}

const leadMagnets: LeadMagnetData[] = [
  {
    id: 'menu',
    title: 'Premium Catering Menu 2024',
    description: 'Explore our extensive range of authentic Indian dishes',
    fileName: 'shubh-utsav-menu-2024.pdf',
    fileType: 'pdf',
    icon: Menu,
  },
  {
    id: 'brochure',
    title: 'Event Planning Guide',
    description: 'Complete guide to planning your perfect event',
    fileName: 'shubh-utsav-event-guide.pdf',
    fileType: 'brochure',
    icon: FileText,
  },
  {
    id: 'checklist',
    title: 'Wedding Checklist',
    description: 'Essential checklist for your big day',
    fileName: 'wedding-checklist.pdf',
    fileType: 'pdf',
    icon: CheckCircle,
  },
];

export function LeadMagnetSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4">Free Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download our free guides and resources to help plan your perfect event
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {leadMagnets.map((magnet, index) => (
            <LeadMagnetCard key={magnet.id} {...magnet} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnetCard({ title, description, fileName, icon: Icon, index }: LeadMagnetCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate download
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="card-premium p-6 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="heading-card mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Download Free
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-4"
            >
              <div className="bg-card rounded-xl shadow-elevated p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="heading-card">{title}</h3>
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Enter your email to download this free resource
                      </p>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                      <Button type="submit" className="w-full bg-primary hover:bg-maroon-light">
                        <Download className="w-4 h-4 mr-2" />
                        Download Now
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <CheckCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="font-medium">Download started!</p>
                      <p className="text-sm text-muted-foreground">
                        Check your downloads folder
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
