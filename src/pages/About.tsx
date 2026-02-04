import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Award, Target, Heart, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import heroWedding from '@/assets/hero-wedding.jpg';
import eventDecoration from '@/assets/event-decoration.jpg';

const About = () => {
  const milestones = [
    { year: '2009', title: 'Founded', description: 'Started with a vision to redefine Indian events' },
    { year: '2012', title: 'First 100 Events', description: 'Milestone of trust and excellence' },
    { year: '2015', title: 'Catering Division', description: 'Expanded to offer premium catering' },
    { year: '2018', title: 'Pan-India Presence', description: 'Operations across major cities' },
    { year: '2022', title: '500+ Events', description: 'Celebrating half a millennium of joy' },
    { year: '2024', title: 'Premium Excellence', description: 'Award-winning service recognition' },
  ];

  const team = [
    { name: 'Rajesh Kapoor', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Priya Sharma', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Amit Patel', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Neha Gupta', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  ];

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Anjani Events' journey since 2009. Discover our vision, meet our expert team, and see why we're Madhya Pradesh's most trusted event management and catering company."
        keywords="about anjani events, event management company, catering company Mumbai, wedding planners India, event company history"
        url="http://anjanievents.in/about"
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
            <h1 className="heading-display mb-4">About Us</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover the story behind India's most trusted event management and catering service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="heading-section text-foreground mb-6">
                A Legacy of Excellence Since 2009
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Anjani events was born from a passion to create extraordinary celebrations that honor India's rich cultural heritage while embracing modern elegance. What started as a small family venture has grown into one of the most trusted names in event management and catering.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our founder, Rajesh Kapoor, envisioned a company that would treat every event as a unique story waiting to be told. Today, we carry forward that vision with an expert team dedicated to making your celebrations unforgettable.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="font-serif text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Events Completed</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="font-serif text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src={heroWedding} 
                alt="Our Events" 
                className="rounded-2xl shadow-elevated"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-premium p-8"
            >
              <Target className="w-12 h-12 text-accent mb-4" />
              <h3 className="heading-card text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most cherished event partner, known for transforming dreams into reality through exceptional service, innovative design, and authentic culinary experiences that celebrate our cultural heritage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-premium p-8"
            >
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h3 className="heading-card text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver world-class event management and catering services that exceed expectations, create lasting memories, and build relationships based on trust, integrity, and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Founder's Message
              </span>
              <blockquote className="font-serif text-2xl md:text-3xl text-foreground mb-8 italic leading-relaxed">
                "Every celebration is a chapter in someone's life story. At Anjani events, we don't just organize events—we craft memories that last forever."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" 
                  alt="Rajesh Kapoor"
                  className="w-16 h-16 rounded-full object-cover border-4 border-accent"
                />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Rajesh Kapoor</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Team
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Meet the Experts
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-card border-4 border-card"
                />
                <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Milestones
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                  <p className="font-serif text-2xl font-bold text-accent">{milestone.year}</p>
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
                <div className="w-4 h-4 bg-accent rounded-full flex-shrink-0" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-section mb-4">Certifications & Recognition</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, title: 'FSSAI Certified', desc: 'Food Safety Certified' },
              { icon: CheckCircle, title: 'ISO 9001:2015', desc: 'Quality Management' },
              { icon: Users, title: '10,000+ Happy Clients', desc: 'Trusted Nationwide' },
              { icon: Award, title: 'Best Event Company', desc: 'Maharashtra 2023' },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <badge.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-1">{badge.title}</h3>
                <p className="text-sm text-primary-foreground/70">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section text-foreground mb-4">
              Ready to Start Your Journey With Us?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Let's create something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-maroon-light">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
