import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { trackFormSubmission, trackWhatsAppClick } from '@/components/analytics/Analytics';

const steps = [
  { id: 1, title: 'Event Details' },
  { id: 2, title: 'Date & Time' },
  { id: 3, title: 'Contact Info' },
  { id: 4, title: 'Confirmation' },
];

const eventTypes = [
  { value: 'wedding', label: 'Wedding', description: 'Full wedding ceremony & reception' },
  { value: 'engagement', label: 'Engagement', description: 'Engagement ceremony' },
  { value: 'corporate', label: 'Corporate Event', description: 'Business conferences & meetings' },
  { value: 'birthday', label: 'Birthday', description: 'Birthday celebrations' },
  { value: 'religious', label: 'Religious Event', description: 'Pooja, Havan & rituals' },
  { value: 'anniversary', label: 'Anniversary', description: 'Anniversary celebrations' },
  { value: 'other', label: 'Other', description: 'Custom event type' },
];

const timeSlots = [
  { value: 'morning', label: 'Morning (9AM - 12PM)', description: 'Early morning events' },
  { value: 'afternoon', label: 'Afternoon (12PM - 4PM)', description: 'Lunch time events' },
  { value: 'evening', label: 'Evening (4PM - 8PM)', description: 'Tea time events' },
  { value: 'night', label: 'Night (6PM - 11PM)', description: 'Dinner & evening events' },
];

const budgetRanges = [
  { value: '1-3', label: '₹1 - 3 Lakhs', description: 'Intimate gatherings' },
  { value: '3-5', label: '₹3 - 5 Lakhs', description: 'Medium sized events' },
  { value: '5-10', label: '₹5 - 10 Lakhs', description: 'Large events' },
  { value: '10-20', label: '₹10 - 20 Lakhs', description: 'Grand celebrations' },
  { value: '20+', label: '₹20+ Lakhs', description: 'Luxury weddings' },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    budget: '',
    specialRequirements: '',
    preferredContact: 'whatsapp',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.eventType && formData.guestCount;
      case 2:
        return date && formData.timeSlot;
      case 3:
        return formData.name && formData.phone && formData.email;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Track form submission
    trackFormSubmission('Booking Form');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Send to WhatsApp
    const message = `
*New Booking Request*

*Event Details:*
- Type: ${eventTypes.find(e => e.value === formData.eventType)?.label}
- Date: ${date ? format(date, 'PPP') : 'Not specified'}
- Time: ${timeSlots.find(t => t.value === formData.timeSlot)?.label}
- Guests: ${formData.guestCount}
- Budget: ${budgetRanges.find(b => b.value === formData.budget)?.label || 'Not specified'}

*Contact Info:*
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email}

*Special Requirements:*
${formData.specialRequirements || 'None'}
    `.trim();

    const whatsappUrl = `https://wa.me/919685533878?text=${encodeURIComponent(message)}`;
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Booking submitted successfully!');
    
    // Open WhatsApp
    trackWhatsAppClick();
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <>
        <SEO 
          title="Booking Confirmed"
          description="Your event booking has been confirmed with Anjani Events"
          keywords="booking confirmed, event booking, Anjani Events confirmation"
          url="http://anjanievents.in/booking"
        />
        
        <section className="min-h-[70vh] flex items-center justify-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container-custom max-w-lg text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="heading-section mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for choosing Anjani events. Our team will contact you shortly to discuss your event details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-maroon-light">
                <a href="tel:+919685533878">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://wa.me/919685533878" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Book Your Event"
        description="Reserve your event date with Anjani Events. Choose your preferred time slot and let us create magic for your special celebration."
        keywords="book event, event booking, reserve wedding date, catering booking, event planner booking Mumbai"
        url="http://anjanievents.in/booking"
      />
      
      <section className="relative py-24 bg-primary">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="heading-display mb-4">Book Your Event</h1>
            <p className="text-lg text-primary-foreground/80">Reserve your date and let's create magic together</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      currentStep >= step.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-full h-1 mx-2 rounded transition-all duration-300",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <span 
                  key={step.id}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep < 4) {
                setCurrentStep(prev => prev + 1);
              } else {
                handleSubmit();
              }
            }}
            className="card-premium p-8 space-y-6"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Event Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="heading-card">Tell us about your event</h2>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Event Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {eventTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateFormData('eventType', type.value)}
                          className={cn(
                            "p-4 rounded-lg border-2 text-left transition-all",
                            formData.eventType === type.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <span className="font-medium block">{type.label}</span>
                          <span className="text-xs text-muted-foreground">{type.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Number of Guests *</label>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      value={formData.guestCount}
                      onChange={(e) => updateFormData('guestCount', e.target.value)}
                      min={1}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="heading-card">When is your event?</h2>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Event Date *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="pointer-events-auto"
                          disabled={(d) => d < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Preferred Time Slot *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => updateFormData('timeSlot', slot.value)}
                          className={cn(
                            "p-4 rounded-lg border-2 text-left transition-all",
                            formData.timeSlot === slot.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <span className="font-medium block">{slot.label}</span>
                          <span className="text-xs text-muted-foreground">{slot.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <Select value={formData.budget} onValueChange={(v) => updateFormData('budget', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label} - {range.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="heading-card">How can we reach you?</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Preferred Contact Method</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => updateFormData('preferredContact', 'whatsapp')}
                        className={cn(
                          "flex-1 p-4 rounded-lg border-2 flex items-center gap-3 transition-all",
                          formData.preferredContact === 'whatsapp'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData('preferredContact', 'phone')}
                        className={cn(
                          "flex-1 p-4 rounded-lg border-2 flex items-center gap-3 transition-all",
                          formData.preferredContact === 'phone'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-medium">Phone Call</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Requirements</label>
                    <Textarea
                      placeholder="Tell us about any special requirements or preferences..."
                      value={formData.specialRequirements}
                      onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="heading-card">Review Your Booking</h2>
                  
                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold">Event Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Event Type:</span>
                        <p className="font-medium">{eventTypes.find(e => e.value === formData.eventType)?.label}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Guests:</span>
                        <p className="font-medium">{formData.guestCount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p className="font-medium">{date ? format(date, 'PPP') : 'Not selected'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <p className="font-medium">{timeSlots.find(t => t.value === formData.timeSlot)?.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact via:</span>
                        <p className="font-medium capitalize">{formData.preferredContact}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to receive communication from Anjani events via WhatsApp or phone call.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className={currentStep === 1 ? 'invisible' : ''}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="bg-primary hover:bg-maroon-light"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : currentStep === 4 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Booking;
