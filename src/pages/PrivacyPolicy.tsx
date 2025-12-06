import { Shield, Lock, Eye, Database, UserCheck, Bell, Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white" style={{marginTop:'80px'}}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Your privacy is important to us. This policy explains how Anjani Caters collects, uses, and protects your personal information.
          </p>
          <p className="text-slate-400 mt-4">Last Updated: December 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Lock className="h-6 w-6 text-orange-500" />
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Anjani Caters ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our catering services, visit our website, or interact with us in any way. By using our services, you consent to the practices described in this policy.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We comply with the Information Technology Act, 2000, Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian data protection laws.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Database className="h-6 w-6 text-orange-500" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>Full name and contact details (phone number, email address)</li>
                  <li>Residential or event venue address</li>
                  <li>Event details (date, time, type of function, guest count)</li>
                  <li>Dietary preferences, allergies, and food restrictions</li>
                  <li>Payment information (processed securely through payment gateways)</li>
                  <li>Communication history with our team</li>
                </ul>
              </div>

              {/* <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div> */}

              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Sensitive Personal Data</h3>
                <p className="text-slate-600">
                  We may collect sensitive information such as dietary restrictions related to religious beliefs (Jain, Hindu vegetarian, Halal requirements) or medical conditions (allergies, diabetes-friendly options). This information is collected only with your explicit consent and is used solely to provide appropriate food services.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text-orange-500" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
              <li>To process and fulfill your catering orders and service requests</li>
              <li>To customize menus based on your dietary preferences and requirements</li>
              <li>To communicate about your bookings, confirmations, and updates</li>
              <li>To process payments and maintain financial records</li>
              <li>To send promotional offers, newsletters, and updates (with your consent)</li>
              <li>To improve our services and customer experience</li>
              <li>To comply with legal obligations under Indian law</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To maintain food safety records as required by FSSAI regulations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-orange-500" />
              Data Sharing and Disclosure
            </h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
              <li><strong>Service Providers:</strong> With trusted vendors who assist in our operations (payment processors, delivery partners)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authorities</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of business assets</li>
              <li><strong>Venue Coordination:</strong> With event venues for service delivery coordination</li>
              <li><strong>Emergency Situations:</strong> To protect the safety of our customers or staff</li>
            </ul>
          </section>

          {/* Food Safety Compliance */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              🍽️ Food Safety & FSSAI Compliance
            </h2>
            <p className="text-slate-600 mb-4">
              As a registered food business under the Food Safety and Standards Authority of India (FSSAI), we maintain certain records as required by law:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Customer order details for food traceability purposes</li>
              <li>Allergy and dietary restriction information for food safety</li>
              <li>Delivery records and batch information</li>
              <li>Quality control and hygiene compliance records</li>
            </ul>
            <p className="text-slate-600 mt-4">
              These records are maintained as per FSSAI guidelines and are used solely for food safety and quality assurance purposes.
            </p>
          </section>

          {/* Data Security */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Lock className="h-6 w-6 text-orange-500" />
              Data Security
            </h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through certified gateways</li>
              <li>Access controls and authentication measures</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection practices</li>
              <li>Physical security measures for paper records</li>
            </ul>
          </section>

          {/* Your Rights */}
          {/* <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              📋 Your Rights
            </h2>
            <p className="text-slate-600 mb-4">
              Under Indian data protection laws, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Right to Access:</strong> Request a copy of your personal data we hold</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              <li><strong>Right to Grievance Redressal:</strong> File complaints regarding data handling</li>
            </ul>
            <p className="text-slate-600 mt-4">
              To exercise these rights, please contact our Grievance Officer using the contact details provided below.
            </p>
          </section> */}

          {/* Cookies */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              🍪 Cookies Policy
            </h2>
            <p className="text-slate-600 mb-4">
              Our website uses cookies to enhance your browsing experience:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-slate-600 mt-4">
              You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.
            </p>
          </section>

          {/* Data Retention */}
          {/* <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              ⏱️ Data Retention
            </h2>
            <p className="text-slate-600">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Typically:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mt-4">
              <li>Order and transaction records: 7 years (as per Indian tax laws)</li>
              <li>Food safety records: 2 years (as per FSSAI requirements)</li>
              <li>Marketing preferences: Until you withdraw consent</li>
              <li>Website analytics: 26 months</li>
            </ul>
          </section> */}

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Bell className="h-6 w-6" />
              Contact Us & Grievance Officer
            </h2>
            <p className="mb-6 opacity-90">
              For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Grievance Officer</h3>
                <p className="text-sm opacity-90">Anjani Caters</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:akashraikwar763@gmail.com" className="text-sm hover:underline">
                    akashraikwar763@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+919685533878" className="text-sm hover:underline">
                    +91 96855 33878
                  </a>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-sm opacity-90">
                  43, Rani Ki Bagiya, Beniganj<br />
                  Chhatarpur 456010<br />
                  Madhya Pradesh, India
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm opacity-80">
              We will respond to your request within 30 days as required under Indian law.
            </p>
          </section>

          {/* Updates */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              📝 Policy Updates
            </h2>
            <p className="text-slate-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
