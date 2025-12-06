import { FileText, Scale, AlertTriangle, CreditCard, Truck, Clock, XCircle, CheckCircle, Phone, Mail } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white" style={{marginTop:'80px'}}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-12 w-12 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Please read these terms carefully before using our catering services. By booking with Anjani Caters, you agree to these terms and conditions.
          </p>
          <p className="text-slate-400 mt-4">Last Updated: December 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Scale className="h-6 w-6 text-orange-500" />
              Agreement to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") and Anjani Caters ("Company," "we," "our," or "us"), a catering service provider registered in Madhya Pradesh, India. By placing an order, making a booking, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We reserve the right to modify these Terms at any time. Continued use of our services after any changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Services Offered */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              🍽️ Services We Offer
            </h2>
            <p className="text-slate-600 mb-4">
              Anjani Caters provides professional Indian food catering services including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Wedding Catering (Shaadi)</li>
                <li>Engagement Ceremonies (Sagai)</li>
                <li>Religious Functions (Puja, Jagran)</li>
                <li>Birthday Parties</li>
                <li>Corporate Events</li>
                <li>Private Parties</li>
              </ul>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Festival Celebrations</li>
                <li>Mundan & Naming Ceremonies</li>
                <li>Anniversary Celebrations</li>
                <li>Buffet Services</li>
                <li>Live Cooking Stations</li>
                <li>Custom Events & Parties</li>
              </ul>
            </div>
          </section>

          {/* Booking & Confirmation */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-orange-500" />
              Booking & Confirmation
            </h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Booking Process</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All bookings must be made at least 7 days in advance for regular events</li>
                  <li>Wedding and large events require minimum 15-30 days advance booking</li>
                  <li>Booking is confirmed only upon receipt of advance payment</li>
                  <li>A written confirmation will be provided via email or WhatsApp</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Guest Count</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Final guest count must be confirmed 3 days before the event</li>
                  <li>We prepare food for confirmed guest count plus 5% buffer</li>
                  <li>Additional guests beyond confirmed count may incur extra charges</li>
                  <li>Reduction in guest count after final confirmation is subject to our cancellation policy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing & Payment */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-orange-500" />
              Pricing & Payment Terms
            </h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Pricing</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All prices are quoted in Indian Rupees (INR)</li>
                  <li>Prices are inclusive of GST as applicable</li>
                  <li>Quoted prices are valid for 7 days from the date of quotation</li>
                  <li>Prices may vary based on menu selection, guest count, and venue location</li>
                  <li>Additional charges may apply for venues located more than 25 km from our kitchen to cover labour and helper transportation costs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Payment Schedule</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Advance Payment:</strong> 50% of total amount at the time of booking</li>
                  <li><strong>Balance Payment:</strong> Remaining 50% to be paid day after of event </li>
                  <li>For orders above ₹1,00,000: Payment schedule may be customized</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Payment Methods</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cash</li>
                  <li>Bank Transfer (NEFT/RTGS/IMPS)</li>
                  <li>UPI (Google Pay, PhonePe, Paytm)</li>
                  <li>Cheque (subject to clearance before event)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Menu & Food */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              🥘 Menu & Food Policy
            </h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Menu Selection</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Menu must be finalized at least 5 days before the event</li>
                  <li>We offer vegetarian, Jain, and non-vegetarian options</li>
                  <li>Custom dishes can be prepared with advance notice</li>
                  <li>Menu changes after finalization may incur additional charges</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Dietary Requirements</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Please inform us of any allergies or dietary restrictions in advance</li>
                  <li>We can accommodate Jain, Satvik, diabetic-friendly, and other special diets</li>
                  <li>Cross-contamination disclaimer: Our kitchen handles multiple ingredients</li>
                  <li>Guests with severe allergies should exercise caution</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Food Quality & Safety</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We are FSSAI registered and follow all food safety guidelines</li>
                  <li>All ingredients are fresh and sourced from trusted suppliers</li>
                  <li>Food is prepared in hygienic conditions by trained staff</li>
                  <li>We maintain proper temperature control during transport and service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery & Service */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Truck className="h-6 w-6 text-orange-500" />
              Delivery & Service
            </h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Delivery</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Food will be delivered at the agreed time and venue</li>
                  <li>Customer must ensure venue access and adequate space for setup</li>
                  <li>Delivery delays due to traffic or unforeseen circumstances will be communicated</li>
                  <li>Additional delivery charges apply for locations beyond service area</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Service Staff</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service staff charges are included as per quotation</li>
                  <li>Staff will be in proper uniform and maintain hygiene standards</li>
                  <li>Additional staff can be arranged at extra cost</li>
                  <li>Customer is responsible for staff meals if service exceeds 6 hours</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Equipment & Setup</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chafing dishes, serving utensils, and basic setup included</li>
                  <li>Crockery and cutlery available at additional cost</li>
                  <li>Decoration and special setup arrangements as per agreement</li>
                  <li>All equipment remains our property and must be returned undamaged</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <XCircle className="h-6 w-6 text-orange-500" />
              Cancellation & Refund Policy
            </h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Cancellation by Customer</h3>
                <div className="bg-orange-50 rounded-lg p-4 mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-200">
                        <th className="text-left py-2">Cancellation Period</th>
                        <th className="text-left py-2">Refund Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-orange-100">
                        <td className="py-2">More than 15 days before event</td>
                        <td className="py-2">80% of advance payment</td>
                      </tr>
                      <tr className="border-b border-orange-100">
                        <td className="py-2">7-15 days before event</td>
                        <td className="py-2">50% of advance payment</td>
                      </tr>
                      <tr className="border-b border-orange-100">
                        <td className="py-2">3-7 days before event</td>
                        <td className="py-2">25% of advance payment</td>
                      </tr>
                      <tr>
                        <td className="py-2">Less than 3 days before event</td>
                        <td className="py-2">No refund</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Cancellation by Company</h3>
                <p>
                  In rare circumstances where we must cancel (force majeure, natural disasters, government restrictions), we will provide a full refund or reschedule at no additional cost.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Date Changes</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Date changes are subject to availability</li>
                  <li>One date change allowed without penalty if requested 10+ days in advance</li>
                  <li>Subsequent changes may incur administrative charges</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Liability */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                While we take utmost care in food preparation and service, please note:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We are not liable for allergic reactions if allergen information was not disclosed</li>
                <li>Our liability is limited to the value of the order placed</li>
                <li>We are not responsible for delays caused by factors beyond our control</li>
                <li>Leftover food consumed after the event is at the customer's own risk</li>
                <li>We are not liable for venue-related issues or third-party service failures</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Food should be consumed within 4-7 hours of service for best quality and safety. We recommend not storing leftover catered food for later consumption.
                </p>
              </div>
            </div>
          </section>

          {/* Customer Responsibilities */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              📋 Customer Responsibilities
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
              <li>Provide accurate event details, guest count, and venue information</li>
              <li>Ensure venue has adequate space, electricity, and water supply</li>
              <li>Inform us of any access restrictions or special requirements</li>
              <li>Disclose all dietary restrictions and allergies of guests</li>
              <li>Make timely payments as per agreed schedule</li>
              <li>Provide a designated contact person on the event day</li>
              <li>Ensure safety of our staff and equipment at the venue</li>
              <li>Obtain necessary permissions for the event venue</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              📸 Photography & Testimonials
            </h2>
            <p className="text-slate-600 mb-4">
              By using our services, you grant us permission to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Take photographs of our food setup and presentation at your event</li>
              <li>Use these photographs for marketing and promotional purposes</li>
              <li>Request and publish your testimonials and reviews</li>
            </ul>
            <p className="text-slate-600 mt-4">
              If you do not wish to be included in our marketing materials, please inform us in writing before the event.
            </p>
          </section>

          {/* Dispute Resolution */}
          {/* <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Scale className="h-6 w-6 text-orange-500" />
              Dispute Resolution & Governing Law
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of India.
              </p>
              <p>
                <strong>Jurisdiction:</strong> Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Chhatarpur, Madhya Pradesh.
              </p>
              <p>
                <strong>Dispute Resolution:</strong> We encourage customers to first contact us directly to resolve any issues. Most concerns can be addressed through open communication.
              </p>
            </div>
          </section> */}

          {/* Force Majeure */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-500" />
              Force Majeure
            </h2>
            <p className="text-slate-600">
              We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mt-4">
              <li>Natural disasters (floods, earthquakes, storms)</li>
              <li>Epidemics or pandemics</li>
              <li>Government orders or restrictions</li>
              <li>Civil unrest, strikes, or lockouts</li>
              <li>Power failures or infrastructure breakdowns</li>
              <li>Road closures or transportation disruptions</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Phone className="h-6 w-6" />
              Contact Us
            </h2>
            <p className="mb-6 opacity-90">
              For any questions or concerns regarding these Terms of Service, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Anjani Caters</h3>
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
          </section>

          {/* Acceptance */}
          <section className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 text-center">
              By placing an order or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
