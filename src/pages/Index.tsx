import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Calendar, Award, ChevronRight } from 'lucide-react';
import SEO, { faqData } from '@/components/SEO';
import { ScrollReveal, StaggerContainer } from '@/components/animations/ScrollReveal';
import { TrustBadges } from '@/components/cro/TrustBadges';
import { ExitIntentPopup } from '@/components/cro/ExitIntentPopup';
import { LeadMagnetSection } from '@/components/cro/LeadMagnet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import heroWedding from '@/assets/hero-wedding.jpg';

const Index = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const services = [
    {
      title: 'Wedding Events',
      description: 'From intimate ceremonies to grand celebrations, we craft your perfect wedding story with meticulous attention to every detail.',
      image: heroWedding,
      link: '/services/events',
      icon: ''
    },
    {
      title: 'Corporate Events',
      description: 'Professional event management for conferences, seminars, and corporate gatherings that leave lasting impressions.',
      image: heroWedding,
      link: '/services/events',
      icon: ''
    },
    {
      title: 'Catering Services',
      description: 'Authentic Indian cuisine prepared by master chefs for any occasion, from lavish buffets to intimate gatherings.',
      image: heroWedding,
      link: '/services/catering',
      icon: ''
    },
    {
      title: 'Religious Events',
      description: 'Sacred ceremonies and traditional rituals organized with utmost devotion and cultural authenticity.',
      image: heroWedding,
      link: '/services/events',
      icon: ''
    }
  ];

  const stats = [
    { number: '500+', label: 'Events Completed', icon: Calendar, color: 'text-primary' },
    { number: '10,000+', label: 'Happy Guests', icon: Users, color: 'text-secondary' },
    { number: '15+', label: 'Years Experience', icon: Award, color: 'text-accent' },
    { number: '4.9', label: 'Average Rating', icon: Star, color: 'text-amber-500' },
  ];

  const testimonials = [
    {
      name: 'Priya & Rahul Sharma',
      event: 'Wedding Reception',
      text: 'Anjani events made our wedding dreams come true. The attention to detail was exceptional! From the decorations to the food, everything was perfect.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Anita Desai',
      event: 'Corporate Event',
      text: 'Professional team that delivered beyond our expectations. Our annual conference was a huge success thanks to their meticulous planning.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Birthday Celebration',
      text: 'The catering was absolutely divine. Every guest complimented the food! Highly recommend for any special occasion.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  ];

  return (
    <>
      <SEO 
        title="Premium Event Management & Catering Services"
        description="Anjani Events offers exceptional event management and catering services. From dream weddings to corporate events, we create unforgettable celebrations with premium catering, expert planning, and personalized service."
        keywords="event management, catering services, wedding planning, corporate events, Indian catering, best event planners"
        url="http://anjanievents.in/"
        faq={faqData}
      />
      
      <ExitIntentPopup />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background with Parallax */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 indian-pattern"
        >
          <img 
            src={heroWedding} 
            alt="Indian Wedding Celebration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          style={{ opacity }}
          className="absolute top-1/4 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ opacity }}
          className="absolute bottom-1/4 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-white/90">Award-Winning Event Management</span>
            </motion.div>

            <h1 className="heading-display text-white mb-6 leading-tight">
              Create Unforgettable
              <span className="block text-gradient-gold">Celebrations</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              From grand weddings to intimate gatherings, we craft magical experiences 
              with authentic Indian hospitality and world-class service.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-secondary text-foreground font-semibold px-8 shadow-gold"
              >
                <Link to="/booking">
                  Book Your Event
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-white/30 text-secondary hover:bg-white/10 px-8"
              >
                <Link to="/get-quote">
                  Get Free Quote
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              {stats.slice(0, 4).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <TrustBadges />

      {/* Services Section */}
      <section id="main-content" className="section-padding">
        <div className="container-custom">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <span className="text-accent font-medium mb-2 block">Our Services</span>
              <h2 className="heading-section mb-4">Comprehensive Event Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From venue selection to final farewell, we handle every detail with precision and care
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} direction="up" delay={index * 0.1}>
                  <Link
                    to={service.link}
                    className="group relative overflow-hidden rounded-2xl card-premium block"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="text-4xl mb-2 block">{service.icon}</span>
                      <h3 className="heading-card text-white mb-2">{service.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{service.description.substring(0, 100)}...</p>
                      
                      <div className="flex items-center gap-2 text-accent font-medium text-sm">
                        Learn More
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/70">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <span className="text-accent font-medium mb-2 block">Testimonials</span>
              <h2 className="heading-section mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real stories from real clients who trusted us with their special moments
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} direction="up" delay={index * 0.1}>
                <div className="card-premium p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.event}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-medium mb-2 block">FAQ</span>
              <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our services
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-premium px-6"
                >
                  <AccordionTrigger className="hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Lead Magnet */}
      <LeadMagnetSection />

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <ScrollReveal direction="up">
            <h2 className="heading-section text-white mb-6">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us turn your vision into reality. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-secondary text-foreground font-semibold px-8 shadow-gold"
              >
                <Link to="/booking">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-white/30 text-secondary hover:bg-white/10 px-8"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
