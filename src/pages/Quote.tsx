import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Star, FileText, Calendar, Users, MapPin, DollarSign, MessageSquare, CheckCircle, Clock, Heart, Sparkles, Utensils } from "lucide-react";
import { quoteApiService, type QuoteFormData } from "@/services/quoteApi";

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    venue: "",
    budget: "",
    requirements: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.eventType || !formData.eventDate || !formData.guestCount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      const quoteData: QuoteFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guestCount: formData.guestCount,
        venue: formData.venue || undefined,
        budget: formData.budget || undefined,
        requirements: formData.requirements || undefined,
      };

      await quoteApiService.submitQuote(quoteData);
      
      toast.success("Quote request submitted successfully! We'll contact you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        venue: "",
        budget: "",
        requirements: "",
      });
      
    } catch (error) {
      console.error('Quote submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit quote request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Quote Request"
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
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Free Consultation</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Get a Quote
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              Tell us about your event and we'll create a customized proposal
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              From intimate gatherings to grand celebrations, we provide personalized catering solutions that match your vision and budget perfectly.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Your Quote
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                View Services
              </button>
            </div>

            {/* Quote Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24hr</div>
                <div className="text-sm md:text-base opacity-80">Quote Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Free</div>
                <div className="text-sm md:text-base opacity-80">Consultation</div>
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

      {/* Enhanced Quote Form */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-accent/3 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <FileText className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Get Started Today</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              Tell Us About Your Event
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Help us understand your vision so we can create the perfect catering experience for your special occasion
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-10 md:p-12 bg-background/50 backdrop-blur-sm border-border/50 card-shadow hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                {/* Personal Information */}
                <div className="animate-slide-in-up">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">Your Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                    <div className="md:col-span-2 group">
                      <Label htmlFor="phone" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 12345 67890"
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="animate-slide-in-up delay-200">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">Event Details</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <Label htmlFor="eventType" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Event Type *</Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) => handleSelectChange("eventType", value)}
                      >
                        <SelectTrigger className="mt-2 group-focus-within:border-accent transition-colors duration-300">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">💒 Wedding</SelectItem>
                          <SelectItem value="corporate">🏢 Corporate Event</SelectItem>
                          <SelectItem value="private">🎉 Private Party</SelectItem>
                          <SelectItem value="birthday">🎂 Birthday Celebration</SelectItem>
                          <SelectItem value="anniversary">💕 Anniversary</SelectItem>
                          <SelectItem value="other">✨ Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <Label htmlFor="eventDate" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Event Date *</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="guestCount" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Number of Guests *</Label>
                      <Input
                        id="guestCount"
                        name="guestCount"
                        type="number"
                        value={formData.guestCount}
                        onChange={handleChange}
                        placeholder="50"
                        required
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="budget" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Budget Range</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleSelectChange("budget", value)}
                      >
                        <SelectTrigger className="mt-2 group-focus-within:border-accent transition-colors duration-300">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50k-100k">💰 ₹50,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="100k-250k">💰 ₹1,00,000 - ₹2,50,000</SelectItem>
                          <SelectItem value="250k-500k">💰 ₹2,50,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="500k+">💰 ₹5,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 group">
                      <Label htmlFor="venue" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Venue Location</Label>
                      <Input
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="City or specific venue"
                        className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="animate-slide-in-up delay-400">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">Additional Information</h3>
                  </div>
                  <div className="group">
                    <Label htmlFor="requirements" className="text-sm font-semibold text-foreground group-focus-within:text-accent transition-colors duration-300">Special Requirements or Dietary Restrictions</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Please share any specific requirements, dietary restrictions, theme preferences, cultural considerations, or questions..."
                      rows={6}
                      className="mt-2 group-focus-within:border-accent transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Form CTA */}
                <div className="text-center space-y-6 animate-slide-in-up delay-600">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25 group/btn relative overflow-hidden min-w-[250px] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                          Submit Quote Request
                        </>
                      )}
                    </span>
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    🚀 We'll review your request and get back to you within 24 hours with a detailed proposal tailored to your needs
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex justify-center items-center gap-6 pt-4 border-t border-border/30 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>24hr Response</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4 text-accent" />
                      <span>Personalized Service</span>
                    </div>
                  </div>
                </div>
              </form>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/20 opacity-0 hover:opacity-100 hover:scale-110 transition-all duration-500"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Process</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              What Happens Next?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              From your first inquiry to your special day, we ensure a seamless and personalized experience every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                step: "01",
                title: "We Review",
                description: "Our team reviews your requirements and prepares a customized proposal tailored to your vision, budget, and preferences",
                icon: FileText,
                color: "from-blue-500 to-cyan-500",
                features: ["Menu customization", "Budget planning", "Timeline creation"]
              },
              {
                step: "02",
                title: "We Consult",
                description: "Schedule a detailed consultation to discuss your vision, finalize menu options, and plan every detail of your perfect event",
                icon: MessageSquare,
                color: "from-purple-500 to-pink-500",
                features: ["Menu tasting", "Venue coordination", "Service planning"]
              },
              {
                step: "03",
                title: "We Deliver",
                description: "On your event day, we bring your culinary vision to life flawlessly with exceptional service and attention to detail",
                icon: Utensils,
                color: "from-green-500 to-emerald-500",
                features: ["Flawless execution", "Premium service", "Memorable experience"]
              }
            ].map((process, index) => (
              <div key={index} className="animate-slide-in-up group" style={{ animationDelay: `${index * 200}ms` }}>
                <Card className="p-8 h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                  
                  {/* Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors duration-500">
                    {process.step}
                  </div>

                  {/* Process Icon */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <process.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Step Number Circle */}
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-lg font-bold border-4 border-background shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                      {process.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {process.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {process.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 100}ms` }}>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${process.color} flex-shrink-0`}></div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Process Benefits */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-sm rounded-3xl p-12 max-w-5xl mx-auto border border-border/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Why Our Process Works
              </h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                Our proven three-step process ensures that every detail is perfect, every preference is considered, and every expectation is exceeded. 
                From the first conversation to the final bite, we're committed to making your event extraordinary.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                  {
                    icon: Clock,
                    title: "Fast Response",
                    desc: "24-hour quote turnaround"
                  },
                  {
                    icon: Heart,
                    title: "Personal Touch",
                    desc: "Dedicated event coordinator"
                  },
                  {
                    icon: Star,
                    title: "Premium Quality",
                    desc: "Award-winning culinary excellence"
                  },
                  {
                    icon: CheckCircle,
                    title: "Guaranteed Satisfaction",
                    desc: "100% client satisfaction promise"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-background/50 border border-border/30 group hover:scale-105 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-bold mb-2 group-hover:text-accent transition-colors duration-300">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                  Start Your Journey
                </button>
                <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  View Success Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
