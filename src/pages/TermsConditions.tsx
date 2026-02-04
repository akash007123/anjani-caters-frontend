import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const TermsConditions = () => (
  <>
    <SEO 
      title="Terms & Conditions"
      description="Read Anjani Events' terms and conditions for booking, payment, cancellation policies, and service guarantees. Clear and transparent terms for our clients."
      keywords="terms and conditions, booking policy, cancellation policy, payment terms, event planning terms"
      url="http://anjanievents.in/terms-conditions"
    />
    <section className="py-24 bg-primary"><div className="container-custom"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-primary-foreground"><h1 className="heading-display">Terms & Conditions</h1></motion.div></div></section>
    <section className="section-padding"><div className="container-custom max-w-3xl prose prose-lg"><h2>Booking & Payment</h2><p>A 30% advance is required to confirm booking. Balance payment is due 7 days before the event.</p><h2>Cancellation Policy</h2><p>Cancellations made 30+ days before: 80% refund. 15-30 days: 50% refund. Less than 15 days: No refund.</p><h2>Service Guarantee</h2><p>We guarantee quality service as per the agreed scope. Any changes must be communicated 48 hours in advance.</p><h2>Liability</h2><p>Anjani events is not liable for delays caused by circumstances beyond our control.</p></div></section>
  </>
);

export default TermsConditions;
