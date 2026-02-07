import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Building2, Sparkles, MapPin, Cake, Users } from 'lucide-react';
import SEO from '@/components/SEO';
import heroWedding from '@/assets/hero-wedding.jpg';
import Wedding from '@/assets/Weddings.webp';
import corporate from '@/assets/Corporate.webp';
import destination from '@/assets/destination.webp';
import religiousEvent from '@/assets/religious-event.jpg';
import Birthday  from '@/assets/Birthday.webp';
import Parties   from '@/assets/Parties.jpg';

const EventServices = () => {
  const eventTypes = [
    {
      title: 'Wedding Events',
      description: 'From intimate ceremonies to grand celebrations, we create fairy-tale weddings that reflect your love story.',
      image: Wedding,
      icon: Heart,
      features: ['Venue Selection', 'Décor & Styling', 'Mehendi & Sangeet', 'Wedding Day Coordination']
    },
    {
      title: 'Corporate Events',
      description: 'Professional event management for conferences, product launches, and corporate celebrations.',
      image: corporate,
      icon: Building2,
      features: ['Conference Management', 'Product Launches', 'Team Building', 'Award Ceremonies']
    },
    {
      title: 'Religious Events',
      description: 'Sacred ceremonies organized with devotion, respecting traditions and cultural significance.',
      image: religiousEvent,
      icon: Sparkles,
      features: ['Pooja Ceremonies', 'Satyanarayan Katha', 'Griha Pravesh', 'Festival Celebrations']
    },
    {
      title: 'Destination Weddings',
      description: 'Dream weddings at stunning locations across India and beyond.',
      image: destination,
      icon: MapPin,
      features: ['Location Scouting', 'Travel Coordination', 'Guest Management', 'Multi-Day Events']
    },
    {
      title: 'Birthday & Celebrations',
      description: 'Memorable celebrations for milestone birthdays and special occasions.',
      image: Birthday,
      icon: Cake,
      features: ['Themed Parties', 'Entertainment', 'Custom Décor', 'Surprise Planning']
    },
    {
      title: 'Private Parties',
      description: 'Exclusive gatherings and cocktail parties with sophisticated arrangements.',
      image: Parties ,
      icon: Users,
      features: ['Cocktail Parties', 'Anniversaries', 'Reunions', 'House Parties']
    }
  ];

  const process = [
    { step: 1, title: 'Initial Consultation', description: 'We understand your vision, preferences, and requirements in detail.' },
    { step: 2, title: 'Concept & Planning', description: 'Our team creates a comprehensive plan with themes, timelines, and budgets.' },
    { step: 3, title: 'Vendor Coordination', description: 'We manage all vendor relationships including venues, décor, and entertainment.' },
    { step: 4, title: 'Rehearsal & Setup', description: 'Thorough preparations ensure everything is perfect before the big day.' },
    { step: 5, title: 'Event Execution', description: 'Our team ensures flawless execution while you enjoy every moment.' },
    { step: 6, title: 'Post-Event Support', description: 'Complete wrap-up including vendor settlements and memories preservation.' },
  ];

  return (
    <>
      <SEO 
        title="Event Management Services"
        description="Professional event management for weddings, corporate events, religious ceremonies, and celebrations. End-to-end planning and flawless execution."
        keywords="event management Mumbai, wedding planner, corporate event management, destination wedding, religious ceremony organizer"
        url="http://anjanievents.in/services/events"
      />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroWedding} alt="Event Management" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Event Management
            </span>
            <h1 className="heading-display mb-4">Creating Magical Moments</h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              From dream weddings to corporate excellence, we bring your vision to life with meticulous planning and flawless execution.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
              <Link to="/booking">Book Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Event Types
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Events We Specialize In
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium overflow-hidden group hover-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <event.icon className="w-5 h-5" />
                      <h3 className="font-serif text-lg font-semibold">{event.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  <ul className="space-y-2">
                    {event.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Process
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Your Event Journey
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">Ready to Plan Your Event?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Let our expert team help you create an unforgettable celebration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
                <Link to="/booking">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/get-quote">Get Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EventServices;
