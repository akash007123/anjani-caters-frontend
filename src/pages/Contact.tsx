import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react";
import { useContact, useContactFormData, useContactValidation } from "@/contexts/ContactContext";

const Contact = () => {
  const {
    isSubmitting,
    error,
    submissionSuccess,
    submitContact,
    clearError,
    resetForm,
    checkApiHealth
  } = useContact();

  const { formData, updateField, loadFormData, clearFormData } = useContactFormData();
  const { validateForm } = useContactValidation();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Check API health on component mount
  useEffect(() => {
    let mounted = true;
    
    const checkHealth = async () => {
      try {
        const isOnline = await checkApiHealth();
        if (mounted) {
          setApiOnline(isOnline);
        }
      } catch (error) {
        if (mounted) {
          setApiOnline(false);
        }
      }
    };
    
    checkHealth();
    
    // Cleanup function to prevent setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array to run only once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError();
    setValidationErrors({});

    // Validate form
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Submit form
    const success = await submitContact(formData);
    
    if (success) {
      // Clear form data on success
      clearFormData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    updateField(name as keyof typeof formData, value);
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    // Clear global error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleReset = () => {
    clearFormData();
    resetForm();
    setValidationErrors({});
    clearError();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Culinary Street", "Food District", "Mumbai 400001, India"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 96855 33878", "+91 96855 33878"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["akashraikwar763@gmail.com", "akashraikwar763@gmail.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday: 9am - 8pm", "Sunday: 10am - 6pm"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
        {/* Floating communication elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-60 animate-pulse flex items-center justify-center">
            <Phone className="w-8 h-8 text-blue-500" />
          </div>
          <div className="absolute top-32 right-20 w-20 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg rotate-12 opacity-50 animate-bounce flex items-center justify-center">
            <Mail className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="absolute bottom-40 left-20 w-16 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-40 animate-pulse flex items-center justify-center" style={{animationDelay: '2s'}}>
            <MapPin className="w-6 h-6 text-purple-500" />
          </div>
          <div className="absolute top-40 left-1/3 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg -rotate-12 opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 right-32 w-28 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full opacity-35 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated title */}
            <div className="relative inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Subtitle with icon */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
                Let's Create Something Extraordinary
              </p>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to plan your perfect event? Our team of culinary experts and event specialists 
              is here to bring your vision to life. Contact us today for a personalized consultation.
            </p>

            {/* Contact methods */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { 
                  icon: Phone, 
                  title: "Call Now", 
                  action: "+91 96855 33878", 
                  color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
                  emoji: "📞"
                },
                { 
                  icon: Mail, 
                  title: "Email Us", 
                  action: "akashraikwar763@gmail.com", 
                  color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
                  emoji: "✉️"
                },
                { 
                  icon: MapPin, 
                  title: "Visit Us", 
                  action: "Mumbai, India", 
                  color: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
                  emoji: "📍"
                },
                { 
                  icon: Clock, 
                  title: "Business Hours", 
                  action: "Mon-Sat: 9am-8pm", 
                  color: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
                  emoji: "🕐"
                }
              ].map((contact, index) => (
                <div 
                  key={index}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium border ${contact.color} hover:scale-105 transition-all duration-200 cursor-pointer group`}
                >
                  <span className="text-lg">{contact.emoji}</span>
                  <div className="text-left">
                    <div className="text-xs opacity-70">{contact.title}</div>
                    <div className="font-semibold">{contact.action}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: "⚡", title: "Quick Response", desc: "We reply within 2 hours" },
                { icon: "🎯", title: "Free Consultation", desc: "No commitment required" },
                { icon: "✅", title: "Expert Team", desc: "15+ years experience" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{feature.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-background">
            <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-10 card-shadow">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className={`mt-2 ${validationErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.name && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className={`mt-2 ${validationErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                    disabled={isSubmitting}
                    className={`mt-2 ${validationErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.phone && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    rows={6}
                    disabled={isSubmitting}
                    className={`mt-2 ${validationErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.message && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.message}</p>
                  )}
                </div>
                
                {/* API Status Indicator */}
                {apiOnline === false && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700">
                      ⚠️ API is currently offline. Your message may not be sent.
                    </p>
                  </div>
                )}

                {/* Success Message */}
                {submissionSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-sm text-green-700">
                        ✅ Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    variant="cta" 
                    size="lg" 
                    className="flex-1"
                    disabled={isSubmitting || apiOnline === false}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                  
                  {(formData.name || formData.email || formData.phone || formData.message) && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={handleReset}
                      disabled={isSubmitting}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-8 card-shadow hover:scale-[1.02] transition-smooth">
                  <div className="flex items-start gap-4">
                    <info.icon className="h-8 w-8 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-32 bg-gradient-to-br from-muted via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-700 dark:to-blue-900/10 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100/60 dark:bg-blue-900/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-100/60 dark:bg-indigo-900/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-100/50 dark:bg-purple-900/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-cyan-100/40 dark:bg-cyan-900/30 rounded-full blur-lg animate-pulse delay-700"></div>
        
        {/* Floating Location Elements */}
        <div className="absolute top-16 left-16 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-24 right-24 w-4 h-4 bg-indigo-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-24 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '0.5s'}}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100/60 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full px-8 py-4 mb-8 animate-fade-in">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Visit Our Location</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 dark:from-gray-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-slide-in-up">
              Find Us
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Located in the heart of the city, we're easily accessible and ready to serve you
            </p>
          </div>

          {/* Enhanced Map Container */}
          <div className="max-w-6xl mx-auto">
            <div className="group animate-slide-in-up delay-400">
              <Card className="relative overflow-hidden bg-background/80 backdrop-blur-xl border-border/50 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-blue-500 to-blue-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-blue-400/50 rounded-tr-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-blue-400/50 rounded-bl-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Map Container */}
                  <div className="relative h-[500px] md:h-[600px] rounded-t-2xl overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.304213033943!2d75.79301277400515!3d23.148887211605103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d0a6d63a3dc719%3A0x512e53adaab1b1ff!2sSoSapient!5e1!3m2!1sen!2sin!4v1764699890701!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{border: 0}}
                      allowFullScreen
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    
                    {/* Overlay for interaction effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                  
                  {/* Bottom Info Panel */}
                  <div className="p-8 bg-gradient-to-r from-background via-blue-50/30 to-background dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-800">
                    {/* Location Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 rounded-xl bg-background/70 border border-border/30 hover:bg-background/90 transition-colors duration-300 group/location">
                        <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover/location:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Exact Location</div>
                        <div className="text-sm text-muted-foreground">SoSapient Office</div>
                      </div>
                      <div className="text-center p-6 rounded-xl bg-background/70 border border-border/30 hover:bg-background/90 transition-colors duration-300 group/location">
                        <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover/location:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Easy Access</div>
                        <div className="text-sm text-muted-foreground">Multiple transport options</div>
                      </div>
                      <div className="text-center p-6 rounded-xl bg-background/70 border border-border/30 hover:bg-background/90 transition-colors duration-300 group/location">
                        <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover/location:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Call Us</div>
                        <div className="text-sm text-muted-foreground">+91 12345 67890</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://www.google.com/maps/place/SoSapient/@23.1488872,75.7930128,17z" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden group/btn flex items-center justify-center gap-3"
                      >
                        <MapPin className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                        Open in Google Maps
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      </a>
                      <button className="border-2 border-blue-200 hover:border-blue-400 text-blue-600 dark:text-blue-400 bg-background/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-3">
                        <Phone className="h-5 w-5" />
                        Get Directions
                      </button>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="text-center mt-8 pt-6 border-t border-border/30">
                      <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>Central Location</span>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Easy Parking Available</span>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span>Call for Assistance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-blue-100/60 dark:bg-blue-900/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-indigo-100/60 dark:bg-indigo-900/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>
              </Card>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="text-center mt-16 animate-fade-in delay-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-6 bg-background/70 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/90 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Location Access</div>
              </div>
              <div className="text-center p-6 bg-background/70 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/90 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5min</div>
                <div className="text-sm text-muted-foreground">From Main Station</div>
              </div>
              <div className="text-center p-6 bg-background/70 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/90 transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Safe</div>
                <div className="text-sm text-muted-foreground">Secure Area</div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-blue-300/50 rounded-tl-lg opacity-60"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-blue-300/50 rounded-tr-lg opacity-60"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg opacity-60"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-blue-300/50 rounded-br-lg opacity-60"></div>
      </section>
    </div>
  );
};

export default Contact;
