import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy"
      description="Read Anjani Events' privacy policy to understand how we collect, use, and protect your personal information. Your privacy is important to us."
      keywords="privacy policy, data protection, personal information, Anjani Events privacy"
      url="http://anjanievents.in/privacy-policy"
    />
    <section className="py-24 bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-primary-foreground"
        >
          <h1 className="heading-display">Privacy Policy</h1>
        </motion.div>
      </div>
    </section>
    <section className="section-padding">
      <div className="container-custom max-w-3xl prose prose-lg">
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly, including name, email,
          phone number, and event details when you contact us or request a
          quote.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your information to respond to inquiries, provide quotes, and
          deliver our services. We may also use it to send promotional materials
          with your consent.
        </p>
        <h2>Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share information
          with trusted partners who assist in delivering our services.
        </p>
        <h2>Contact Us</h2>
        <p>For privacy concerns, contact us at info.anjanievents1@gmail.com</p>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
