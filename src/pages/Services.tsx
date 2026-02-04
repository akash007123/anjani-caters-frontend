import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Utensils, Users, PartyPopper } from 'lucide-react';
import SEO from '@/components/SEO';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCatering from '@/assets/hero-catering.jpg';
import corporateEvent from '@/assets/corporate-event.jpg';
import buffetSetup from '@/assets/buffet-setup.jpg';

const Services = () => {
  const mainServices = [
    {
      title: 'Event Management',
      description: 'Complete end-to-end event planning and execution for weddings, corporate events, and celebrations.',
      image: heroWedding,
      link: '/services/events',
      icon: PartyPopper,
      features: ['Wedding Planning', 'Corporate Events', 'Destination Weddings', 'Religious Ceremonies']
    },
    {
      title: 'Catering Services',
      description: 'Authentic Indian cuisine crafted by expert chefs, from traditional favorites to modern fusion.',
      image: heroCatering,
      link: '/services/catering',
      icon: Utensils,
      features: ['Buffet Setup', 'Live Counters', 'Plated Service', 'Custom Menus']
    }
  ];

  const additionalServices = [
    {
      title: 'Custom Packages',
      description: 'Tailored solutions combining event management and catering for a seamless experience.',
      icon: Sparkles
    },
    {
      title: 'Live Food Counters',
      description: 'Interactive cooking stations that add excitement and freshness to your event.',
      icon: Utensils
    },
    {
      title: 'Guest Management',
      description: 'Complete guest handling from invitations to hospitality and coordination.',
      icon: Users
    },
    {
      title: 'Themed Events',
      description: 'Creative theme conceptualization and execution for memorable celebrations.',
      icon: PartyPopper
    }
  ];

  return (
    <>
      <SEO 
        title="Our Services"
        description="Explore Anjani Events' comprehensive event management and catering services. From weddings to corporate events, we deliver excellence for every occasion."
        keywords="event management services, catering services Mumbai, wedding planning, corporate events, live food counters, themed events"
        url="http://anjanievents.in/services"
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
            <h1 className="heading-display mb-4">Our Services</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Comprehensive event management and catering solutions for every occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="rounded-2xl shadow-elevated w-full"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-gold hidden md:flex items-center gap-2">
                      <service.icon className="w-6 h-6" />
                      <span className="font-semibold">Premium Service</span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    {service.title}
                  </span>
                  <h2 className="heading-section text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" className="bg-primary hover:bg-maroon-light">
                    <Link to={service.link}>
                      Explore {service.title}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-muted indian-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              More Services
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Complementary Offerings
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 text-center hover-lift"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
              Our Process
            </span>
            <h2 className="heading-section text-foreground mb-4">
              How We Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Discuss your vision and requirements' },
              { step: '02', title: 'Planning', desc: 'Detailed planning and customization' },
              { step: '03', title: 'Coordination', desc: 'Seamless execution and management' },
              { step: '04', title: 'Celebration', desc: 'Your perfect event comes to life' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Get a personalized quote for your event today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
                <Link to="/get-quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
