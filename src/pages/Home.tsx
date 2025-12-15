import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  ChefHat,
  Users,
  Sparkles,
  Award,
  ArrowRight,
  Star,
  Clock,
  Heart,
  Camera,
  UtensilsCrossed,
  Trophy,
  BookOpen,
} from "lucide-react";
import { useAutoplay } from "@/hooks/use-autoplay";
import { blogApiService, type Blog } from "@/services/blogApi";
import heroImage from "@/assets/hero-image.jpg";
import chefTeamImage from "@/assets/chef-team.jpg";
import eventSetupImage from "@/assets/event-setup.jpg";

const Home = () => {
  // API reference for carousel
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Hero Carousel Data
  const heroSlides = [
    {
      id: 1,
      image: heroImage,
      alt: "Elegant fine dining presentation",
      title: "Exquisite Culinary Experiences",
      subtitle: "Elevate your events with our premium catering services",
      description:
        "From intimate gatherings to grand celebrations, we create unforgettable moments with exceptional cuisine and impeccable service.",
      ctaPrimary: {
        text: "Get a Quote",
        link: "/quote",
        variant: "hero" as const,
      },
      ctaSecondary: {
        text: "View Menu",
        link: "/menu",
        variant: "outline" as const,
      },
      gradient: "from-primary/90 to-primary/70",
    },
    {
      id: 2,
      image: chefTeamImage,
      alt: "Our master chefs at work",
      title: "Award-Winning Culinary Team",
      subtitle: "Expert chefs with passion for perfection",
      description:
        "Our team of award-winning chefs brings years of experience and culinary innovation to create extraordinary dining experiences that exceed expectations.",
      ctaPrimary: {
        text: "Meet Our Chefs",
        link: "/about",
        variant: "hero" as const,
      },
      ctaSecondary: {
        text: "View Services",
        link: "/services",
        variant: "outline" as const,
      },
      gradient: "from-accent/90 to-primary/80",
    },
    {
      id: 3,
      image: eventSetupImage,
      alt: "Wedding reception setup",
      title: "Unforgettable Wedding Catering",
      subtitle: "Make your special day truly magical",
      description:
        "Transform your wedding into an extraordinary celebration with our bespoke catering services, elegant presentations, and personalized menu creations.",
      ctaPrimary: {
        text: "Wedding Packages",
        link: "/services",
        variant: "hero" as const,
      },
      ctaSecondary: {
        text: "View Gallery",
        link: "/gallery",
        variant: "outline" as const,
      },
      gradient: "from-primary/85 to-accent/75",
    },
  ];

  // Initialize autoplay
  useAutoplay({ api, interval: 5000, enabled: true });

  // State for blogs
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApiService.getPublishedBlogs({ limit: 3 });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description:
        "Our team of award-winning chefs brings culinary excellence to every event",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description:
        "Tailored menus and dedicated event coordinators for your special day",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "Only the finest ingredients and impeccable presentation standards",
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "Over 15 years of creating memorable culinary experiences",
    },
  ];

  const services = [
    {
      title: "Wedding Catering",
      description: "Make your special day unforgettable",
    },
    {
      title: "Corporate Events",
      description: "Professional service for business gatherings",
    },
    {
      title: "Private Parties",
      description: "Intimate celebrations with exquisite cuisine",
    },
  ];

  const menuHighlights = [
    {
      title: "Signature appetizers",
      description:
        "Handcrafted starters that set the tone for an extraordinary dining experience",
      price: "₹800-₹1,200",
    },
    {
      title: "Gourmet main courses",
      description:
        "Expertly prepared entrees featuring premium ingredients and innovative techniques",
      price: "₹1,500-₹2,500",
    },
    {
      title: "Artisan desserts",
      description: "Decadent sweet endings crafted by our pastry specialists",
      price: "₹600-₹1,000",
    },
  ];

  const testimonials = [
    {
      name: "Priya & Arjun Sharma",
      event: "Wedding Reception",
      rating: 5,
      text: "Anjani Caters made our wedding absolutely magical. The food was exceptional, and their attention to detail was impeccable. Every guest raved about the experience!",
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Annual Gala",
      rating: 5,
      text: "Outstanding service and food quality. They transformed our corporate event into a memorable experience. Professional team, punctual delivery, and exceptional cuisine.",
    },
    {
      name: "Meera Patel",
      event: "Anniversary Celebration",
      rating: 5,
      text: "From planning to execution, everything was perfect. The custom menu they created for our anniversary was beyond our expectations. Highly recommended!",
    },
  ];

  const galleryImages = [
    {
      src: heroImage,
      title: "Elegant Dinner Setup",
      category: "Corporate Events",
    },
    { src: chefTeamImage, title: "Our Master Chefs", category: "Team" },
    { src: eventSetupImage, title: "Wedding Reception", category: "Weddings" },
  ];

  const teamMembers = [
    {
      name: "Umesh Raikwar",
      role: "Head Chef & Founder",
      experience: "15+ years",
      // specialty: "Fusion Indian Cuisine",
    },
    {
      name: "Akash Raikwar",
      role: "Managing Director & Co-founder",
      experience: "10+ years",
      // specialty: "International Continental",
    },
    {
      name: "Chef Priya Sharma",
      role: "Pastry Chef",
      experience: "8+ years",
      // specialty: "Artisan Desserts & Baking",
    },
  ];


  const awards = [
    { title: "Best Catering Service 2024", organization: "Mumbai Food Awards" },
    {
      title: "Excellence in Wedding Catering",
      organization: "Indian Wedding Awards",
    },
    {
      title: "Sustainable Food Practices",
      organization: "Green Chef Initiative",
    },
    {
      title: "Customer Choice Award",
      organization: "Event Planning Excellence",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        <Carousel
          className="w-full h-full"
          opts={{
            loop: true,
            skipSnaps: false,
          }}
          setApi={setApi}
        >
          <CarouselContent className=" ">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id} className="relative h-screen">
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} z-10`}
                  />
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105"
                  />

                  {/* Content */}
                  <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center text-primary-foreground">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                        {slide.title.split(" ").map((word, index) => (
                          <span
                            key={index}
                            className="inline-block mr-4 last:mr-0 animate-slide-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {word}
                          </span>
                        ))}
                      </h1>
                      <h2
                        className="text-lg sm:text-xl md:text-2xl mb-4 font-medium opacity-90 animate-fade-in"
                        style={{ animationDelay: "0.4s" }}
                      >
                        {slide.subtitle}
                      </h2>
                      <p
                        className="text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-95 animate-fade-in"
                        style={{ animationDelay: "0.6s" }}
                      >
                        {slide.description}
                      </p>
                      <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
                        style={{ animationDelay: "0.8s" }}
                      >
                        <Link to={slide.ctaPrimary.link}>
                          <Button
                            variant={slide.ctaPrimary.variant}
                            size="lg"
                            className="group"
                          >
                            {slide.ctaPrimary.text}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link to={slide.ctaSecondary.link}>
                          <Button
                            variant={slide.ctaSecondary.variant}
                            size="lg"
                            className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                          >
                            {slide.ctaSecondary.text}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Carousel Navigation */}
                  <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex space-x-2">
                      {heroSlides.map((_, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-2 sm:left-4 h-8 w-8 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm" />
          <CarouselNext className="right-2 sm:right-4 h-8 w-8 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm" />
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine culinary excellence with exceptional service to create
              memorable experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:scale-105 transition-smooth card-shadow"
              >
                <feature.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive catering solutions for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-10 hover:scale-105 transition-smooth card-shadow"
              >
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="text-accent font-medium inline-flex items-center gap-2 hover:gap-3 transition-smooth"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="cta" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      {/* <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Signature Menu Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our most popular dishes and culinary creations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuHighlights.map((item, index) => (
              <Card key={index} className="p-8 hover:scale-105 transition-smooth card-shadow">
                <UtensilsCrossed className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                <div className="text-accent font-bold text-lg">{item.price}</div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="outline" size="lg">
                View Complete Menu
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from families and businesses who trusted us with
              their special moments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:scale-105 transition-smooth card-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.event}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Work in Action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses of memorable events we've had the privilege to cater
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg card-shadow"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                <Camera className="mr-2 h-5 w-5" />
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From consultation to execution, we make planning effortless
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                desc: "Share your vision and requirements with our team",
              },
              {
                step: "02",
                title: "Custom Proposal",
                desc: "Receive a tailored menu and service plan",
              },
              {
                step: "03",
                title: "Tasting & Refinement",
                desc: "Sample dishes and perfect every detail",
              },
              {
                step: "04",
                title: "Event Execution",
                desc: "Sit back while we deliver excellence",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-accent/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Culinary Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate chefs and culinary experts dedicated to creating
              exceptional experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:scale-105 transition-smooth card-shadow"
              >
                <ChefHat className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-accent font-medium mb-2">{member.role}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{member.experience}</span>
                  </div>
                  {/* <div className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{member.specialty}</span>
                  </div> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "10,000+", label: "Events Catered" },
              { number: "50+", label: "Expert Team" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm opacity-90 px-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      {/* <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry recognition for our commitment to excellence and innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-smooth card-shadow">
                <Trophy className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-sm">{award.title}</h3>
                <p className="text-xs text-muted-foreground">{award.organization}</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Blog Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, trends, and insights from the world of premium catering
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Card
                key={blog._id}
                className="p-6 hover:scale-105 transition-smooth card-shadow"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readingTime || 5} min read</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-accent font-medium inline-flex items-center gap-2 hover:gap-3 transition-smooth"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Something Special?
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-95">
            Let's discuss your event and create a customized menu that exceeds
            your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button variant="hero" size="lg">
                Request a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
