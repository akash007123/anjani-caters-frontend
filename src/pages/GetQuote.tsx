import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', eventType: '', date: '', guests: '', budget: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Quote request submitted! We will contact you within 24 hours.');
  };

  return (
    <>
      <SEO 
        title="Get a Free Quote"
        description="Request a customized quote for your event or catering needs. Fill out our simple form and get a personalized proposal within 24 hours."
        keywords="event quote, catering quote, wedding quote Mumbai, event pricing, free consultation"
        url="http://anjanievents.in/get-quote"
      />
      
      <section className="relative py-24 bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-primary-foreground">
            <h1 className="heading-display mb-4">Get a Free Quote</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">Tell us about your event and we'll provide a customized quote</p>
          </motion.div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Full Name *</label><Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
              <div><label className="block text-sm font-medium mb-2">Phone *</label><Input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
            </div>
            <div><label className="block text-sm font-medium mb-2">Email *</label><Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Event Type *</label>
                <Select onValueChange={(v) => setFormData({...formData, eventType: v})}>
                  <SelectTrigger><SelectValue placeholder="Select event type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="religious">Religious Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><label className="block text-sm font-medium mb-2">Event Date</label><Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Number of Guests</label><Input type="number" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} /></div>
              <div><label className="block text-sm font-medium mb-2">Budget Range</label>
                <Select onValueChange={(v) => setFormData({...formData, budget: v})}>
                  <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">₹1-3 Lakhs</SelectItem>
                    <SelectItem value="3-5">₹3-5 Lakhs</SelectItem>
                    <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                    <SelectItem value="10+">₹10+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><label className="block text-sm font-medium mb-2">Additional Details</label><Textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} /></div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-maroon-light">Submit Quote Request</Button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default GetQuote;
