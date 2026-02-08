import { motion } from 'framer-motion';
import { Star, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import TestimonialForm from '@/components/TestimonialForm';
import { useState, useEffect } from 'react';

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  designation: string;
  location: string;
  profilePic?: string;
  rating: number;
  feedback: string;
  eventType?: string;
  createdAt: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if redirected with feedback param
    const feedbackParam = searchParams.get('feedback');
    if (feedbackParam === 'true') {
      setShowForm(true);
    }

    // Fetch testimonials from API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials`);
        const data = await response.json();
        
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [searchParams]);

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
            <Button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-accent text-accent-foreground hover:bg-gold-light"
              size="lg"
            >
              Share Your Experience
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-accent-foreground">
            {[
              { value: testimonials.length > 0 ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1) + '/5' : '4.9/5', label: 'Average Rating' },
              { value: '500+', label: 'Happy Events' },
              { value: '98%', label: 'Would Recommend' },
              { value: `${testimonials.length}+`, label: 'Google Reviews' },
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

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-premium p-6 animate-pulse">
                  <div className="h-10 w-10 bg-muted rounded-lg mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="w-4 h-4 bg-muted rounded" />
                    ))}
                  </div>
                  <div className="h-20 bg-muted rounded mb-4" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div>
                      <div className="h-4 w-24 bg-muted rounded mb-2" />
                      <div className="h-3 w-32 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
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
                    "{testimonial.feedback}"
                  </p>
                  <div className="flex items-center gap-4">
                    {testimonial.profilePic ? (
                      <img 
                        src={testimonial.profilePic} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.eventType || testimonial.designation} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No testimonials yet. Be the first to share your experience!</p>
              <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
                Share Your Experience
              </Button>
            </div>
          )}
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

      {/* Testimonial Form Modal */}
      <TestimonialForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default Testimonials;
