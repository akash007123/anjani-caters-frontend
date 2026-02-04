/**
 * Local SEO Component
 * Optimizes for Google Business Profile and Map Pack domination
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Star, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG } from '../EnhancedSEO';

// Google Business Profile Optimized Data
export const GOOGLE_BUSINESS_DATA = {
  name: BRAND_CONFIG.name,
  address: `${BRAND_CONFIG.address.street}, ${BRAND_CONFIG.address.city}, ${BRAND_CONFIG.address.region} ${BRAND_CONFIG.address.postalCode}`,
  phone: BRAND_CONFIG.phone,
  website: BRAND_CONFIG.url,
  rating: BRAND_CONFIG.rating,
  reviewCount: BRAND_CONFIG.reviewCount,
  categories: [
    'Catering',
    'Event Planning',
    'Wedding Venue',
    'Corporate Event Planner'
  ],
  services: [
    'Wedding Catering',
    'Corporate Events',
    'Birthday Parties',
    'Religious Ceremonies',
    'House Warmings',
    'Buffet Setup',
    'Live Counters',
    'Theme Decorations'
  ],
  hours: {
    Monday: '09:00-21:00',
    Tuesday: '09:00-21:00',
    Wednesday: '09:00-21:00',
    Thursday: '09:00-21:00',
    Friday: '09:00-21:00',
    Saturday: '09:00-21:00',
    Sunday: '09:00-21:00'
  },
  priceRange: '₹₹₹',
  photos: [
    '/gallery/wedding-1.jpg',
    '/gallery/corporate-1.jpg',
    '/gallery/buffet-1.jpg',
    '/gallery/decoration-1.jpg'
  ]
};

// LocalBusiness Schema with enhanced fields
export const getEnhancedLocalSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FoodEstablishment', 'EventPlanner'],
  '@id': `${BRAND_CONFIG.url}/#localbusiness`,
  name: BRAND_CONFIG.name,
  description: 'Premium event management and catering services specializing in Indian weddings and celebrations.',
  url: BRAND_CONFIG.url,
  telephone: BRAND_CONFIG.phone,
  email: BRAND_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND_CONFIG.address.street,
    addressLocality: BRAND_CONFIG.address.city,
    addressRegion: BRAND_CONFIG.address.region,
    postalCode: BRAND_CONFIG.address.postalCode,
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BRAND_CONFIG.geo.latitude,
    longitude: BRAND_CONFIG.geo.longitude
  },
  openingHoursSpecification: Object.entries(GOOGLE_BUSINESS_DATA.hours).map(([day, hours]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: day,
    opens: hours.split('-')[0],
    closes: hours.split('-')[1]
  })),
  priceRange: BRAND_CONFIG.priceRange,
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI, Net Banking',
  currenciesAccepted: 'INR',
  areaServed: {
    '@type': 'Place',
    name: 'Mumbai Metropolitan Region',
    containsPlace: BRAND_CONFIG.serviceAreas.map(city => ({
      '@type': 'Place',
      name: city
    }))
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Services',
    itemListElement: GOOGLE_BUSINESS_DATA.services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service
      }
    }))
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BRAND_CONFIG.rating,
    reviewCount: BRAND_CONFIG.reviewCount,
    bestRating: '5'
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Priya Menon' },
      datePublished: '2024-12-15',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Exceptional wedding catering service! The food was delicious and presentation was stunning.'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Rahul Sharma' },
      datePublished: '2024-11-20',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Professional team and beautiful decorations. Made our corporate event a huge success!'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Anita Desai' },
      datePublished: '2024-10-05',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Best catering service in Mumbai! Highly recommend for wedding events.'
    }
  ],
  photo: GOOGLE_BUSINESS_DATA.photos,
  sameAs: Object.values(BRAND_CONFIG.socialLinks)
});

// NAP Consistency Display Component
export const NAPConsistency = () => {
  const napItems = [
    { 
      icon: MapPin, 
      label: 'Address', 
      value: GOOGLE_BUSINESS_DATA.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(GOOGLE_BUSINESS_DATA.address)}`
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: GOOGLE_BUSINESS_DATA.phone,
      link: `tel:${GOOGLE_BUSINESS_DATA.phone}`
    },
    { 
      icon: Clock, 
      label: 'Hours', 
      value: 'Mon-Sun: 9:00 AM - 9:00 PM'
    }
  ];

  return (
    <div className="bg-amber-50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-amber-800 mb-4">Contact Information</h3>
      <div className="space-y-3">
        {napItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <item.icon className="w-5 h-5 text-amber-600" />
            {item.link ? (
              <a href={item.link} className="text-gray-700 hover:text-amber-600 flex items-center gap-1">
                {item.value}
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-gray-700">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Review Schema Component
export const ReviewSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getEnhancedLocalSchema())
      }}
    />
  );
};

// Map Component with Schema
interface ServiceAreaMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  center = { lat: 19.0760, lng: 72.8777 }, // Mumbai
  zoom = 10
}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&center=${center.lat},${center.lng}&zoom=${zoom}&q=${encodeURIComponent(GOOGLE_BUSINESS_DATA.address)}`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Our Location"
      />
    </div>
  );
};

// Directions Page Component
export const DrivingDirectionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Get Directions | {BRAND_CONFIG.name}</title>
        <meta name="description" content={`Visit us at our office in ${BRAND_CONFIG.address.city}. Get driving directions to ${GOOGLE_BUSINESS_DATA.address}.`} />
      </Helmet>
      
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Visit Our Office</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Address</h2>
            <NAPConsistency />
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {BRAND_CONFIG.serviceAreas.map((area, index) => (
                  <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Get Directions</h2>
            <ServiceAreaMap />
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(GOOGLE_BUSINESS_DATA.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-amber-600 hover:text-amber-700"
            >
              <ExternalLink className="w-5 h-5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// Google Business Profile Optimizer
export const GoogleBusinessOptimizer = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Google Business Profile Tips</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          'Add high-quality photos of your events',
          'Respond to all reviews promptly',
          'Post weekly updates and offers',
          'Keep business hours accurate',
          'Add all your services with descriptions',
          'Use relevant categories'
        ].map((tip, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
              {index + 1}
            </span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  GOOGLE_BUSINESS_DATA,
  getEnhancedLocalSchema,
  NAPConsistency,
  ReviewSchema,
  ServiceAreaMap,
  DrivingDirectionsPage,
  GoogleBusinessOptimizer
};
