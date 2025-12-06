import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Building2, PartyPopper, Utensils, Camera, Sparkles, Star, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";

const Services = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Anjani Caters transformed our corporate gala into an unforgettable experience. The attention to detail, creative menu, and flawless execution exceeded all expectations.",
      name: "Neha Kapoor",
      position: "CEO",
      company: "TechVision Industries",
      rating: 5,
      eventType: "Corporate Gala",
      image: "/placeholder.svg"
    },
    {
      quote: "Our wedding day was absolutely perfect thanks to Anjani Caters. Every dish was crafted to perfection, and their team made sure everything ran smoothly. We couldn't have asked for better service.",
      name: "Rahul & Priya Sharma",
      position: "Wedding Couple",
      company: "Mumbai",
      rating: 5,
      eventType: "Wedding Reception",
      image: "/placeholder.svg"
    },
    {
      quote: "The anniversary party was a huge success! Anjani Caters's innovative menu and professional service impressed all our guests. The custom cake was the highlight of the evening.",
      name: "Amit Patel",
      position: "Event Host",
      company: "Surat",
      rating: 5,
      eventType: "Anniversary Party",
      image: "/placeholder.svg"
    },
    {
      quote: "Outstanding service from start to finish. Anjani Caters's team was professional, creative, and delivered beyond our expectations. The food quality and presentation were exceptional.",
      name: "Dr. Meera Joshi",
      position: "Hospital Administrator",
      company: "MediCare Hospital",
      rating: 5,
      eventType: "Medical Conference",
      image: "/placeholder.svg"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const services = [
    {
      icon: Heart,
      title: "Wedding Catering",
      description: "Make your special day unforgettable with our bespoke wedding catering services. From intimate ceremonies to grand celebrations, we create culinary experiences that match the magic of your moment.",
      features: [
        "Custom menu design",
        "Tastings and consultations",
        "Full-service setup and cleanup",
        "Professional serving staff",
        "Elegant presentation",
      ],
    },
    {
      icon: Building2,
      title: "Corporate Events",
      description: "Impress your colleagues and clients with professional catering that elevates your business gatherings. Perfect for conferences, meetings, product launches, and corporate celebrations.",
      features: [
        "Breakfast and lunch options",
        "Coffee and refreshment stations",
        "Formal dinner service",
        "Dietary accommodations",
        "On-time delivery guaranteed",
      ],
    },
    {
      icon: PartyPopper,
      title: "Private Parties",
      description: "Host unforgettable celebrations with our personalized party catering. Whether it's a milestone birthday, anniversary, or intimate gathering, we bring restaurant-quality cuisine to your venue.",
      features: [
        "Buffet or plated service",
        "Themed menus available",
        "Bar service options",
        "Dessert stations",
        "Flexible guest counts",
      ],
    },
    {
      icon: Utensils,
      title: "Custom Menus",
      description: "Work directly with our chefs to create a completely customized menu that reflects your tastes, dietary requirements, and event theme. We specialize in fusion cuisine and unique culinary experiences.",
      features: [
        "One-on-one chef consultation",
        "Unlimited menu iterations",
        "Seasonal ingredient sourcing",
        "International cuisines",
        "Allergy-friendly options",
      ],
    },
    {
      icon: Camera,
      title: "Event Styling",
      description: "Beyond food, we offer complete event styling services including table settings, centerpieces, and decorative elements that complement your culinary experience.",
      features: [
        "Table design and linens",
        "Centerpiece arrangements",
        "Lighting consultation",
        "Color scheme coordination",
        "Photo-worthy presentations",
      ],
    },
    {
      icon: Sparkles,
      title: "Specialty Services",
      description: "Unique offerings to make your event truly special, from live cooking stations to interactive culinary experiences that entertain your guests.",
      features: [
        "Live cooking demonstrations",
        "Chef's table experiences",
        "Mixology stations",
        "Dessert bars",
        "Food art presentations",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Event Setup"
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
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Complete Catering Solutions</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Our Services
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              Comprehensive catering solutions tailored to create unforgettable experiences for every occasion
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              From intimate gatherings to grand celebrations, we offer complete event catering with professional service, creative menus, and meticulous attention to detail.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                View All Services
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Get Custom Quote
              </button>
            </div>

            {/* Service Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">6</div>
                <div className="text-sm md:text-base opacity-80">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm md:text-base opacity-80">Event Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm md:text-base opacity-80">Custom Menus</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm md:text-base opacity-80">Satisfaction</div>
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

      {/* Enhanced Services Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-accent/3 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Utensils className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Expertise</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              Complete Catering Solutions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              From intimate gatherings to grand celebrations, we offer comprehensive catering services tailored to your unique vision
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="animate-slide-in-up group" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="p-10 h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                  
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Service Icon with Enhanced Design */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-accent/20 group-hover:border-accent/40 shadow-lg">
                      <service.icon className="h-10 w-10 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      Premium
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Enhanced Features List */}
                    <div className="space-y-4 mb-8">
                      <h4 className="text-sm font-semibold text-accent mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        What's Included
                      </h4>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                          <div className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Service CTA */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Learn More
                      </button>
                      <button className="px-4 py-3 border border-border hover:border-accent/50 text-foreground hover:text-accent rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        Get Quote
                      </button>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-sm rounded-3xl p-12 max-w-5xl mx-auto border border-border/50">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Ready to Create Something Amazing?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your event vision and create a customized catering package that exceeds your expectations. 
                Our team is ready to turn your dreams into delicious reality.
              </p>
              
              {/* Service Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30">
                  <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="font-semibold mb-1">Personalized Service</div>
                  <div className="text-sm text-muted-foreground">Tailored to your vision</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30">
                  <Star className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="font-semibold mb-1">Award-Winning Quality</div>
                  <div className="text-sm text-muted-foreground">Industry-recognized excellence</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30">
                  <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="font-semibold mb-1">Seamless Experience</div>
                  <div className="text-sm text-muted-foreground">From planning to execution</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                    Get Custom Quote
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    Schedule Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Service Add-ons Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Premium Add-ons</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              Enhance Your Experience
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Optional premium add-ons to make your event truly extraordinary and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Premium Bar Service",
                desc: "Professional mixologists crafting signature cocktails and premium beverages",
                icon: "🍸",
                color: "from-purple-500 to-pink-500",
                features: ["Signature cocktails", "Premium spirits", "Non-alcoholic options"]
              },
              {
                title: "Custom Cake Design",
                desc: "Artisan cakes and desserts tailored to your theme, taste, and style",
                icon: "🎂",
                color: "from-pink-500 to-rose-500",
                features: ["Custom designs", "Multiple flavors", "Dietary accommodations"]
              },
              {
                title: "Specialty Linens",
                desc: "Luxury table linens, napkins, and elegant table settings in your chosen colors",
                icon: "🧵",
                color: "from-blue-500 to-cyan-500",
                features: ["Premium fabrics", "Color coordination", "Custom sizing"]
              },
              {
                title: "Floral Arrangements",
                desc: "Fresh seasonal centerpieces and floral designs coordinated with your event decor",
                icon: "🌸",
                color: "from-green-500 to-emerald-500",
                features: ["Fresh flowers", "Seasonal blooms", "Custom arrangements"]
              },
              {
                title: "Audio/Visual Support",
                desc: "Professional AV setup including sound, lighting, and presentation equipment",
                icon: "🎤",
                color: "from-orange-500 to-red-500",
                features: ["Sound systems", "Lighting design", "Presentation equipment"]
              },
              {
                title: "Valet & Concierge",
                desc: "White-glove valet parking and concierge service from guest arrival to departure",
                icon: "🚗",
                color: "from-gray-600 to-gray-800",
                features: ["Valet parking", "Guest assistance", "Event coordination"]
              }
            ].map((addon, index) => (
              <div key={index} className="animate-slide-in-up group" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="p-8 h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                  
                  {/* Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${addon.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    Premium
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${addon.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      {addon.icon}
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {addon.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {addon.desc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {addon.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 100}ms` }}>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${addon.color} flex-shrink-0`}></div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full bg-gradient-to-r ${addon.color} hover:shadow-lg text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 group-hover:shadow-xl`}>
                      Add to Package
                    </button>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Add-on Benefits */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-sm rounded-3xl p-10 max-w-4xl mx-auto border border-border/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Why Choose Premium Add-ons?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Our premium add-ons are designed to elevate your event from great to extraordinary. 
                Each service is carefully curated to complement our catering excellence and create seamless, memorable experiences.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">Complete Experience</h4>
                  <p className="text-sm text-muted-foreground">Everything you need for a flawless event</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">Premium Quality</h4>
                  <p className="text-sm text-muted-foreground">Industry-leading standards and expertise</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">Personalized Service</h4>
                  <p className="text-sm text-muted-foreground">Tailored to your specific vision and needs</p>
                </div>
              </div>

              <div className="mt-8">
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                  Build Your Perfect Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Carousel Section */}
      <section className="py-24 bg-background relative overflow-hidden">
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
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
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
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-accent scale-125' 
                      : 'bg-border hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 right-auto">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 shadow-lg"
              >
                ←
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 left-auto">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 shadow-lg"
              >
                →
              </button>
            </div>
          </div>

          {/* Enhanced Bottom Stats */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="relative group">
              {/* Main Stats Card */}
              <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-xl rounded-3xl p-10 md:p-12 max-w-5xl mx-auto border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
                
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-accent/8 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/8 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-10 animate-slide-in-up">
                    <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-4">
                      <Heart className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Client Success</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
                      Join Our Happy Clients
                    </h3>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                      Experience the difference that thousands of satisfied clients already know
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        number: "4.9/5",
                        label: "Average Rating",
                        description: "Based on client reviews",
                        icon: "⭐",
                        color: "from-yellow-500 to-orange-500",
                        suffix: ""
                      },
                      {
                        number: "500",
                        label: "Happy Clients",
                        description: "Satisfied customers",
                        icon: "😊",
                        color: "from-green-500 to-emerald-500",
                        suffix: "+"
                      },
                      {
                        number: "98",
                        label: "Would Recommend",
                        description: "Client satisfaction",
                        icon: "👍",
                        color: "from-blue-500 to-cyan-500",
                        suffix: "%"
                      },
                      {
                        number: "24",
                        label: "Support Available",
                        description: "Hours per day",
                        icon: "🕐",
                        color: "from-purple-500 to-pink-500",
                        suffix: "/7"
                      }
                    ].map((stat, index) => (
                      <div 
                        key={index} 
                        className="group/stat animate-slide-in-up hover:scale-105 transition-all duration-500"
                        style={{ animationDelay: `${200 + (index * 150)}ms` }}
                      >
                        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-accent/30 hover:bg-background/70 transition-all duration-300 group-hover/stat:shadow-xl relative overflow-hidden">
                          
                          {/* Background Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover/stat:opacity-5 transition-opacity duration-500`}></div>
                          
                          {/* Icon */}
                          <div className="text-4xl mb-4 group-hover/stat:scale-110 transition-transform duration-300 relative z-10">
                            {stat.icon}
                          </div>
                          
                          {/* Number */}
                          <div className="text-2xl md:text-3xl font-bold text-accent mb-3 group-hover/stat:text-accent/90 transition-colors duration-300 relative z-10">
                            {stat.number}{stat.suffix}
                          </div>
                          
                          {/* Label */}
                          <div className="text-sm font-semibold text-foreground mb-2 group-hover/stat:text-accent transition-colors duration-300 relative z-10">
                            {stat.label}
                          </div>
                          
                          {/* Description */}
                          <div className="text-xs text-muted-foreground/80 relative z-10">
                            {stat.description}
                          </div>

                          {/* Progress Bar Animation */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30 rounded-b-2xl overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover/stat:scale-x-100 transition-transform duration-700 origin-left`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-10 pt-6 border-t border-border/50 animate-fade-in delay-1000">
                    <p className="text-muted-foreground mb-6">Ready to become our next success story?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Start Your Event
                      </button>
                      <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        Read Reviews
                      </button>
                    </div>
                  </div>
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

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Main CTA Card */}
          <div className="relative group max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>
              <div className="absolute top-1/2 right-8 w-12 h-12 bg-accent/8 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 delay-600"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Let's Create Magic Together</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent animate-slide-in-up">
                    Ready to Get Started?
                  </h2>

                  <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-in-up delay-200">
                    Let's discuss your event vision and create a customized service package that exceeds your expectations
                  </p>

                  <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto animate-slide-in-up delay-400">
                    From intimate gatherings to grand celebrations, we're here to turn your culinary dreams into delicious reality
                  </p>
                </div>

                {/* Value Propositions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-in-up delay-600">
                  {[
                    {
                      icon: Heart,
                      title: "Personalized Planning",
                      description: "Every event is unique, and so are our solutions"
                    },
                    {
                      icon: Star,
                      title: "Award-Winning Quality",
                      description: "Industry-recognized excellence in every detail"
                    },
                    {
                      icon: Sparkles,
                      title: "Seamless Experience",
                      description: "From consultation to cleanup, we've got you covered"
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                        <item.icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-scale-in delay-800">
                  <Link to="/quote" className="group/btn">
                    <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-accent/25 relative overflow-hidden min-w-[200px]">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Sparkles className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                        Request a Quote
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </Link>
                  
                  <Link to="/contact" className="group/btn">
                    <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm min-w-[200px]">
                      <span className="flex items-center justify-center gap-3">
                        <Heart className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                        Contact Us
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="text-center animate-fade-in delay-1000">
                  <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                    <p className="text-sm text-muted-foreground mb-4">
                      Trusted by 500+ clients • Free consultations • 24/7 event support
                    </p>
                    
                    {/* Trust Badges */}
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span>4.9/5 Rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="h-4 w-4 text-accent" />
                        <span>15+ Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-accent" />
                        <span>2500+ Events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-accent/30 rounded-tl-lg opacity-60"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br-lg opacity-60"></div>
          </div>

          {/* Bottom Contact Info */}
          <div className="text-center mt-16 animate-fade-in delay-1200">
            <p className="text-muted-foreground mb-4">Prefer to speak directly? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-accent">📞</span>
                <span className="font-semibold">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✉️</span>
                <span className="font-semibold">hello@elitecatering.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">🕒</span>
                <span className="font-semibold">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
