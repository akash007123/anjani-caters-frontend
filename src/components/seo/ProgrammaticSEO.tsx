/**
 * Programmatic SEO Pages Generator
 * Auto-generates Service × Location pages for SEO scale
 */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import EnhancedSEO, { 
  SERVICE_TYPES, 
  LOCATION_PAGES, 
  generateCTATitle, 
  generateMetaDescription,
  generateServiceSchema,
  BRAND_CONFIG 
} from '../EnhancedSEO';
import { MapPin, Star, Award, Clock, Phone, CheckCircle } from 'lucide-react';

// Main ServiceLocationPage Component with URL params
interface ServiceLocationPageProps {
  serviceSlug?: string;
}

const ServiceLocationPage: React.FC<ServiceLocationPageProps> = ({ serviceSlug }) => {
  const params = useParams();
  const locationSlug = params.location || 'mumbai';
  
  // Find the service and location
  const service = SERVICE_TYPES.find(s => s.slug === serviceSlug) || SERVICE_TYPES[0];
  const location = LOCATION_PAGES.find(l => l.slug === locationSlug) || LOCATION_PAGES[0];
  
  const pageTitle = generateCTATitle(service.name, location.name);
  const metaDesc = generateMetaDescription(service.name, location.name);
  const schema = generateServiceSchema(service, location.name);
  
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Services', url: `${BRAND_CONFIG.url}/services` },
    { name: service.name, url: `${BRAND_CONFIG.url}/services/${service.slug}` },
    { name: `${service.name} in ${location.name}`, url: `${BRAND_CONFIG.url}/services/${service.slug}/${location.slug}` }
  ];

  return (
    <>
      <EnhancedSEO
        title={pageTitle}
        description={metaDesc}
        url={`${BRAND_CONFIG.url}/services/${service.slug}/${location.slug}`}
        serviceSchema
        location={location.name}
        breadcrumbs={breadcrumbs}
        customSchema={[schema]}
      />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-amber-900/90 to-orange-900/90">
        <div className="absolute inset-0 bg-[url('/hero-catering.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{location.name}, {location.region}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {service.name} in {location.name}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-amber-100">
            {service.description}. Premium {service.name.toLowerCase()} services with {BRAND_CONFIG.yearsInBusiness}+ years of excellence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>{BRAND_CONFIG.rating}★ {BRAND_CONFIG.reviewCount}+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{BRAND_CONFIG.yearsInBusiness}+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>{BRAND_CONFIG.reviewCount}+ Events Served</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/get-quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
            >
              Get Free Quote
            </Link>
            <a 
              href={`tel:${BRAND_CONFIG.phone}`}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Premium {service.name} Services in {location.name}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-amber-800">Why Choose Us in {location.name}</h3>
            <ul className="space-y-3">
              {[
                `Local expertise in ${location.name} and ${location.region}`,
                'Authentic Indian cuisine prepared by master chefs',
                'Customized menus for your specific requirements',
                'Professional event staff and service team',
                'Stunning themed decorations and setups',
                'Competitive pricing with transparent quotes'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-amber-800">Our {service.name} Process</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Consultation', desc: 'Free discussion of your requirements' },
                { step: '2', title: 'Customization', desc: 'Tailored menu and decoration options' },
                { step: '3', title: 'Planning', desc: 'Detailed event timeline and coordination' },
                { step: '4', title: 'Execution', desc: 'Flawless on-day event management' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Serving {location.name} and Surrounding Areas
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-96">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.name},${location.region}&zoom=12`}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${service.name} in ${location.name}`}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say in {location.name}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: 'Priya Menon',
              event: 'Wedding Reception',
              rating: 5,
              text: `Anjani events made our wedding in ${location.name} truly special. The food was exceptional!`
            },
            {
              name: 'Amit Kumar',
              event: 'Corporate Event',
              rating: 5,
              text: `Professional team and stunning decorations. They transformed our ${location.name} event into a memorable experience.`
            }
          ].map((review, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-amber-600">{review.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.event}</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-amber-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions - {location.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `Do you provide ${service.name.toLowerCase()} services in ${location.name}?`,
                a: `Yes! We provide complete ${service.name.toLowerCase()} services throughout ${location.name} and surrounding areas.`
              },
              {
                q: 'How far in advance should I book?',
                a: 'We recommend booking at least 3-6 months in advance for weddings and 1-2 months for smaller events.'
              },
              {
                q: 'Do you offer customized menus?',
                a: 'Absolutely! We specialize in creating customized menus tailored to your preferences and dietary requirements.'
              },
              {
                q: `What areas in ${location.name} do you serve?`,
                a: `We serve all areas in and around ${location.name} including ${location.region}. Contact us for locations outside our primary service area.`
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between">
                  {faq.q}
                  <span className="text-2xl text-amber-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-4 text-gray-700">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your {service.name} in {location.name}?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Contact us today for a free consultation and customized quote
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/get-quote"
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Free Quote
            </Link>
            <a 
              href={`tel:${BRAND_CONFIG.phone}`}
              className="bg-amber-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-900 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call: {BRAND_CONFIG.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// Generate all Service × Location pages
export const generateAllServiceLocationPages = () => {
  const pages: Array<{ service: typeof SERVICE_TYPES[0]; location: typeof LOCATION_PAGES[0] }> = [];
  
  SERVICE_TYPES.forEach(service => {
    LOCATION_PAGES.forEach(location => {
      pages.push({ service, location });
    });
  });
  
  return pages;
};

// Export all services and locations for programmatic generation
export { SERVICE_TYPES, LOCATION_PAGES };

export default ServiceLocationPage;
