import { motion } from 'framer-motion';
import { Star, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya & Rahul Sharma',
      event: 'Wedding Reception',
      location: 'Mumbai',
      text: 'Anjani events made our wedding dreams come true. From the stunning mandap to the exquisite cuisine, every detail was perfect. Our guests are still talking about it!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Amit Desai',
      event: 'Corporate Annual Day',
      location: 'Pune',
      text: 'Professional, punctual, and perfect. The team handled our 500+ guest corporate event flawlessly. The food was exceptional and the setup was world-class.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Sneha Kapoor',
      event: 'Destination Wedding',
      location: 'Udaipur',
      text: 'They turned our Udaipur wedding into a royal affair. The attention to detail, from mehendi to vidaai, was incredible. Truly memorable!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      name: 'Rajesh Kumar',
      event: "Daughter's Birthday",
      location: 'Delhi',
      text: "My daughter's 1st birthday was magical thanks to Anjani events. The themed decoration and catering exceeded our expectations!",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Meera & Vikram Joshi',
      event: 'Engagement Ceremony',
      location: 'Ahmedabad',
      text: 'From the beautiful décor to the delicious food, everything was top-notch. The team was professional and accommodating throughout.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
    },
    {
      name: 'Arun Patel',
      event: 'Retirement Party',
      location: 'Surat',
      text: "Organized my father's retirement party with such grace. The traditional touches combined with modern elegance made it special.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'
    }
  ];

  const videoTestimonials = [
    { name: 'The Sharma Wedding', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop' },
    { name: 'Corporate Excellence', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop' },
    { name: 'A Beautiful Celebration', thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop' },
  ];

  return (
    <>
      <SEO 
        title="Client Testimonials"
        description="Read reviews from our happy clients. See why families and businesses across India trust Anjani Events for their weddings, corporate events, and special celebrations."
        keywords="anjani events reviews, event management testimonials, catering reviews Mumbai, wedding planner reviews India"
        url="http://anjanievents.in/testimonials"
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
            <h1 className="heading-display mb-4">Client Testimonials</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Hear from families and businesses who trusted us with their special moments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-accent-foreground">
            {[
              { value: '4.9/5', label: 'Average Rating' },
              { value: '500+', label: 'Happy Events' },
              { value: '98%', label: 'Would Recommend' },
              { value: '50+', label: 'Google Reviews' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-bold">{stat.value}</p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
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
              Reviews
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Words from Our Clients
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 hover-lift"
              >
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.event} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
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
              Video Testimonials
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Watch Their Stories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.name}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-accent-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary to-transparent">
                  <p className="text-primary-foreground font-semibold">{video.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-card p-6 rounded-2xl shadow-card mb-8">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" 
                alt="Google"
                className="h-8"
              />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-2xl font-bold text-foreground">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Based on 50+ reviews</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              See what our clients say about us on Google
            </p>
            <Button variant="outline" className="border-primary text-primary">
              View on Google
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground ">
        <div className="container-custom text-center shadow-xl border-gray-100 border-2 rounded-xl bg-[#a02c49]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4 mt-5">Ready to Create Your Story?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join our family of happy clients and let us make your event unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-5">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-gold hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="relative">
        <hr className="border-t-4 border-double border-primary" />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-3 text-primary text-xl rounded-xl">
          ✦✦✦✦✦ &nbsp;§&nbsp; ✦✦✦✦✦
        </span>
      </div>
    </>
  );
};

export default Testimonials;
