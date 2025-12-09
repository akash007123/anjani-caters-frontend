import { Card } from "@/components/ui/card";
import { Star, Quote, MessageCircle, Heart, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonialApiService, type Testimonial } from "@/services/testimonialApi";

interface DisplayTestimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  eventType: string;
  image: string;
}
import FeedbackFormModal from "@/components/FeedbackFormModal";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<DisplayTestimonial[]>([]);
  const [allTestimonials, setAllTestimonials] = useState<DisplayTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      console.log('Starting to fetch testimonials...');
      try {
        console.log('Making API call to getApprovedTestimonials...');
        const response = await testimonialApiService.getApprovedTestimonials();
        console.log('API Response received:', response);

        if (response.success) {
          console.log('Response success, data length:', response.data.length);
          if (response.data.length > 0) {
            // Use API data - convert to DisplayTestimonial format
            const carouselTestimonials = response.data.slice(0, 5).map(t => ({
              quote: t.quote,
              name: t.name,
              position: t.position,
              company: t.company,
              rating: t.rating,
              eventType: t.eventType,
              image: t.image
            }));
            const gridTestimonials = response.data.map(t => ({
              quote: t.quote,
              name: t.name,
              position: t.position,
              company: t.company,
              rating: t.rating,
              eventType: t.eventType,
              image: t.image
            }));
            console.log('Setting testimonials:', carouselTestimonials.length, 'carousel,', gridTestimonials.length, 'grid');
            setTestimonials(carouselTestimonials);
            setAllTestimonials(gridTestimonials);
          } else {
            console.log('Response success but no testimonials data');
          }
        } else {
          console.log('Response not successful:', response);
        }
        // No fallback - testimonials will remain empty arrays if no data
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        console.error('Error details:', error);
        // No fallback - testimonials will remain empty arrays if error
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-show feedback form on page load (with a small delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedbackForm(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Happy Clients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Client Stories</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Testimonials
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              Real stories from real clients who trusted us with their most important moments
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              Discover why families, businesses, and organizations choose Anjani Caters for their special occasions. Read authentic testimonials that reflect our commitment to excellence and customer satisfaction.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <MessageCircle className="h-5 w-5 inline mr-2" />
                Read Stories
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Share Your Experience
              </button>
            </div>

            {/* Testimonial Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">250+</div>
                <div className="text-sm md:text-base opacity-80">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm md:text-base opacity-80">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5★</div>
                <div className="text-sm md:text-base opacity-80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm md:text-base opacity-80">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Carousel */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Client Stories</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Real experiences from clients who trusted us with their most important moments
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-20">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No testimonials yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to share your experience!</p>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Share Your Experience
                </button>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                          {/* Content Side - Left */}
                          <div className="order-2 md:order-1 animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                            <Card className="p-10 bg-background/50 backdrop-blur-sm border-border/50 card-shadow hover:shadow-2xl transition-all duration-500">
                              {/* Quote Icon */}
                              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
                                <Star className="h-8 w-8 text-accent fill-accent" />
                              </div>

                              {/* Testimonial Text */}
                              <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-foreground">
                                "{testimonial.quote}"
                              </blockquote>

                              {/* Client Info */}
                              <div className="border-t border-border/50 pt-6">
                                <div className="font-bold text-lg text-foreground mb-1">
                                  {testimonial.name}
                                </div>
                                <div className="text-accent font-semibold mb-2">
                                  {testimonial.position}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {testimonial.company}
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-4">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                                  ))}
                                  <span className="text-sm text-muted-foreground ml-2">
                                    {testimonial.rating}/5 stars
                                  </span>
                                </div>
                              </div>
                            </Card>
                          </div>

                          {/* Image Side - Right */}
                          <div className="order-1 md:order-2 animate-slide-in-up delay-300" style={{ animationDelay: `${index * 200 + 100}ms` }}>
                            <div className="relative group">
                              {/* Main Image */}
                              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent"></div>
                              </div>

                              {/* Floating Stats */}
                              <div className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-xl">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-accent">{testimonial.eventType}</div>
                                  <div className="text-sm text-muted-foreground">Event Type</div>
                                </div>
                              </div>

                              {/* Decorative Elements */}
                              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl opacity-60"></div>
                              <div className="absolute top-1/2 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl opacity-40"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-12">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-accent scale-125'
                          : 'bg-border hover:bg-accent/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 right-auto">
                  <button
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 left-auto">
                  <button
                    onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced All Testimonials Grid */}
      <section className="py-32 bg-gradient-to-br from-muted via-muted to-background relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-8 py-4 mb-8 animate-fade-in">
              <MessageCircle className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Client Success Stories</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-slide-in-up">
              More Client Stories
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up delay-200 mb-12">
              Discover why families, businesses, and organizations continue to trust us with their most precious moments
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-8 flex-wrap mb-8 animate-fade-in delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-accent fill-current" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-accent" />
                <span>250+ Happy Clients</span>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-accent" />
                <span>98% Satisfaction</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No testimonials yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to share your experience!</p>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Share Your Experience
                </button>
              </div>
            ) : (
              allTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group animate-slide-in-up" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="relative h-full p-8 hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/30 overflow-hidden">
                  
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Quote Icon and Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Quote className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-muted-foreground mb-8 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 text-base">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div className="border-t border-border/50 pt-6">
                      <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-accent font-semibold mb-1 group-hover:text-accent/80 transition-colors duration-300">
                        {testimonial.position}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{testimonial.eventType}</p>
                        <div className="text-xs text-muted-foreground/60">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    ⭐ Verified
                  </div>
                </Card>
              </div>
              ))
            )}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-xl rounded-3xl p-12 max-w-5xl mx-auto border border-border/50 shadow-2xl relative overflow-hidden">
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-accent/8 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/8 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    Ready to Create Your Success Story?
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Join our growing family of satisfied clients and experience the Anjani Caters difference
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Personalized Service</div>
                    <div className="text-sm text-muted-foreground">Tailored to your vision</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <Star className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Award-Winning Quality</div>
                    <div className="text-sm text-muted-foreground">Industry-recognized excellence</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <Award className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Proven Results</div>
                    <div className="text-sm text-muted-foreground">98% client satisfaction</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                    Start Your Event
                  </button>
                  <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    Read More Reviews
                  </button>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-accent/30 rounded-tl-lg opacity-60"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-60"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-accent/30 rounded-br-lg opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Modal */}
      <FeedbackFormModal
        isOpen={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
      />
    </div>
  );
};

export default Testimonials;
