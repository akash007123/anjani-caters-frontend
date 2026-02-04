/**
 * Enhanced SEO Component - Comprehensive SEO Implementation
 * Implements all 14 SEO pillars for SERP dominance
 */
import { Helmet } from 'react-helmet-async';

// Brand Configuration
export const BRAND_CONFIG = {
  name: 'Anjani Events',
  legalName: 'Anjani Events & Catering',
  url: 'http://anjanievents.in/',
  logo: '/logo.png',
  ogImage: '/og-image.jpg',
  favicon: '/favicon.ico',
  email: 'info.anjanievents1@gmail.com',
  phone: '+91-9685533878',
  phoneFormatted: '+91-96855-33878',
  address: {
    street: 'Maharastra Marg, Rani ki Bagiya, Beniganj',
    city: 'Chhatarpur',
    region: 'Madhya Pradesh',
    postalCode: '471001',
    country: 'IN'
  },
  geo: {
    latitude: '24.9146',
    longitude: '79.8303'
  },
  priceRange: '₹₹₹',
  rating: 4.9,
  reviewCount: 500,
  yearsInBusiness: 15,
  foundingYear: 2009,
  socialLinks: {
    facebook: 'https://facebook.com/anjanievents',
    instagram: 'https://instagram.com/anjanievents',
    twitter: 'https://twitter.com/anjanievents',
    youtube: 'https://youtube.com/@anjanievents',
    linkedin: 'https://linkedin.com/company/anjanievents',
    pinterest: 'https://pinterest.com/anjanievents'
  },
  founder: {
    name: 'Raj Sharma',
    jobTitle: 'Founder & CEO',
    image: '/team/founder.jpg'
  },
  serviceAreas: ['Chhatarpur', 'Orchha', 'Jhansi', 'Gwalior', 'Bhopal', 'Indore', 'Sagar', 'Jabalpur']
};

// Service Types
export const SERVICE_TYPES = [
  { name: 'Wedding Catering', slug: 'wedding-catering', description: 'Grand wedding celebrations with authentic Indian cuisine' },
  { name: 'Corporate Events', slug: 'corporate-events', description: 'Professional corporate gatherings and conferences' },
  { name: 'Birthday Parties', slug: 'birthday-parties', description: 'Memorable birthday celebrations for all ages' },
  { name: 'Religious Ceremonies', slug: 'religious-ceremonies', description: 'Traditional rituals and sacred ceremonies' },
  { name: 'House Warmings', slug: 'house-warming', description: 'Graceful house warming and griha pravesh ceremonies' },
  { name: 'Social Gatherings', slug: 'social-gatherings', description: 'Engagements, anniversaries, and special occasions' }
];

// Location Pages Configuration
export const LOCATION_PAGES = [
  { name: 'Mumbai', slug: 'mumbai', region: 'Maharashtra', stateCode: 'IN-MH' },
  { name: 'Pune', slug: 'pune', region: 'Maharashtra', stateCode: 'IN-MH' },
  { name: 'Indore', slug: 'indore', region: 'Madhya Pradesh', stateCode: 'IN-MP' },
  { name: 'Ujjain', slug: 'ujjain', region: 'Madhya Pradesh', stateCode: 'IN-MP' },
  { name: 'Bhopal', slug: 'bhopal', region: 'Madhya Pradesh', stateCode: 'IN-MP' },
  { name: 'Nashik', slug: 'nashik', region: 'Maharashtra', stateCode: 'IN-MH' },
  { name: 'Ahmedabad', slug: 'ahmedabad', region: 'Gujarat', stateCode: 'IN-GJ' },
  { name: 'Surat', slug: 'surat', region: 'Gujarat', stateCode: 'IN-GJ' }
];

// FAQ Data for Schema
export const FAQ_SCHEMA_DATA = [
  {
    question: 'What services does Anjani events offer?',
    answer: 'Anjani events offers comprehensive event management and catering services including wedding planning, corporate events, birthday celebrations, religious ceremonies, and custom catering packages tailored to your needs.'
  },
  {
    question: 'How far in advance should I book for my wedding?',
    answer: 'We recommend booking at least 3-6 months in advance for weddings and 1-2 months for smaller events. However, we also accommodate last-minute bookings depending on availability.'
  },
  {
    question: 'Do you provide vegetarian and non-vegetarian options?',
    answer: 'Yes! We offer a wide range of both vegetarian and non-vegetarian Indian cuisines. Our menu can be customized to accommodate dietary restrictions and preferences.'
  },
  {
    question: 'What is your service area?',
    answer: 'We primarily serve Mumbai, Pune, Nashik, Indore, Ujjain, Bhopal, Ahmedabad, and Surat. For events outside these regions, please contact us to discuss transportation arrangements.'
  },
  {
    question: 'Do you offer themed decorations?',
    answer: 'Absolutely! Our creative team specializes in creating stunning themed decorations that bring your vision to life. From traditional Indian themes to modern elegant styles, we do it all.'
  },
  {
    question: 'What is included in your catering packages?',
    answer: 'Our catering packages include food preparation, serving staff, tables, chairs, linens, and dinnerware. We also offer additional services like live counters, themed setups, and beverage service.'
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer: 'Yes, we specialize in Jain, vegan, gluten-free, and other special dietary requirements. Please inform us in advance so we can prepare accordingly.'
  },
  {
    question: 'Do you provide event staff and servers?',
    answer: 'Yes, all our packages include professional event staff including servers, supervisors, and cleanup crew. The number of staff depends on your event size.'
  }
];

// Organization Schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EventPlanner', 'FoodEstablishment'],
  name: BRAND_CONFIG.name,
  legalName: BRAND_CONFIG.legalName,
  url: BRAND_CONFIG.url,
  logo: `${BRAND_CONFIG.url}${BRAND_CONFIG.logo}`,
  image: `${BRAND_CONFIG.url}${BRAND_CONFIG.ogImage}`,
  description: 'Premium event management and catering services specializing in Indian weddings and celebrations across Maharashtra and Madhya Pradesh.',
  email: BRAND_CONFIG.email,
  telephone: BRAND_CONFIG.phone,
  foundingDate: `${BRAND_CONFIG.foundingYear}-01-01`,
  founder: {
    '@type': 'Person',
    name: BRAND_CONFIG.founder.name,
    jobTitle: BRAND_CONFIG.founder.jobTitle
  },
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
  areaServed: BRAND_CONFIG.serviceAreas.map(city => ({
    '@type': 'Place',
    name: city
  })),
  serviceType: SERVICE_TYPES.map(s => s.name),
  priceRange: BRAND_CONFIG.priceRange,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00'
  },
  sameAs: Object.values(BRAND_CONFIG.socialLinks),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Services',
    itemListElement: SERVICE_TYPES.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description
      }
    }))
  }
});

// LocalBusiness Schema
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BRAND_CONFIG.url}/#localbusiness`,
  name: BRAND_CONFIG.name,
  description: 'Premium event management and catering services in Mumbai and surrounding regions.',
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00'
  },
  priceRange: BRAND_CONFIG.priceRange,
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
  currenciesAccepted: 'INR',
  areaServed: {
    '@type': 'Place',
    name: 'Mumbai Metropolitan Region'
  }
});

// Review Schema
export const getReviewSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND_CONFIG.name,
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
      reviewBody: 'Anjani events made our wedding truly special. The food was exceptional and the service was impeccable. Highly recommend!'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Amit Kumar' },
      datePublished: '2024-11-20',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Professional team and stunning decorations. They transformed our corporate event into a memorable experience.'
    }
  ]
});

// FAQ Schema Generator
export const generateFAQSchema = (faqs: typeof FAQ_SCHEMA_DATA) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Service Schema Generator
export const generateServiceSchema = (service: typeof SERVICE_TYPES[0], location?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: location ? `${service.name} in ${location}` : service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: BRAND_CONFIG.name,
    url: BRAND_CONFIG.url
  },
  areaServed: location ? {
    '@type': 'Place',
    name: location
  } : BRAND_CONFIG.serviceAreas,
  serviceType: service.name,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: BRAND_CONFIG.priceRange
  }
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

// Article Schema Generator
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: {
    '@type': 'Organization',
    name: BRAND_CONFIG.name,
    logo: {
      '@type': 'ImageObject',
      url: `${BRAND_CONFIG.url}${BRAND_CONFIG.logo}`
    }
  },
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime
});

// Video Schema Generator
export const generateVideoSchema = (video: {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  embedUrl: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.uploadDate,
  duration: video.duration,
  embedUrl: video.embedUrl,
  publisher: {
    '@type': 'Organization',
    name: BRAND_CONFIG.name
  }
});

// CTA Title Generator
export const generateCTATitle = (service: string, location?: string) => {
  const templates = [
    `Best ${service} in ${location} | ${BRAND_CONFIG.reviewCount}+ Events Served`,
    `${service} in ${location} | Trusted by ${BRAND_CONFIG.rating}★ ${BRAND_CONFIG.reviewCount} Clients`,
    `Premium ${service} Services | ${BRAND_CONFIG.yearsInBusiness}+ Years Experience`,
    `Top-Rated ${service} in ${location} | Book Your Free Consultation`,
    `${service} in ${location} | ${BRAND_CONFIG.yearsInBusiness} Years of Excellence`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

// Meta Description Generator
export const generateMetaDescription = (service: string, location?: string) => {
  const descriptions = [
    `Looking for exceptional ${service.toLowerCase()} in ${location || 'Mumbai'}? Anjani events offers premium catering and event management with ${BRAND_CONFIG.reviewCount}+ happy clients. Book your consultation today!`,
    `${service} specialists in ${location || 'Mumbai'}. ${BRAND_CONFIG.yearsInBusiness}+ years of experience, ${BRAND_CONFIG.rating}★ rating, ${BRAND_CONFIG.reviewCount}+ events served. Get a free quote now!`,
    `Premium ${service.toLowerCase()} services in ${location || 'Mumbai'}. From intimate gatherings to grand celebrations, we create unforgettable experiences. Contact us!`,
    `Expert ${service.toLowerCase()} in ${location || 'Mumbai'}. Authentic cuisine, stunning decorations, professional service. ${BRAND_CONFIG.reviewCount}+ events successfully catered.`,
    `${service} in ${location || 'Mumbai'} that exceeds expectations. Award-winning team, customizable packages, exceptional reviews. Get your free quote today!`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Main SEO Component Props
interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'localbusiness';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  faq?: boolean;
  reviewSchema?: boolean;
  serviceSchema?: boolean;
  location?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noIndex?: boolean;
  noFollow?: boolean;
  customSchema?: object[];
}

// Enhanced SEO Component
const EnhancedSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  faq = true,
  reviewSchema = false,
  serviceSchema = false,
  location,
  breadcrumbs,
  noIndex = false,
  noFollow = false,
  customSchema = []
}: EnhancedSEOProps) => {
  const canonicalUrl = url || BRAND_CONFIG.url;
  const ogImage = image || `${BRAND_CONFIG.url}${BRAND_CONFIG.ogImage}`;
  const pageTitle = title 
    ? `${title} | ${BRAND_CONFIG.name}` 
    : BRAND_CONFIG.name;
  const metaDescription = description || generateMetaDescription('Event Catering', location);

  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1'
  ].join(', ');

  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    ...(faq ? [generateFAQSchema(FAQ_SCHEMA_DATA)] : []),
    ...(reviewSchema ? [getReviewSchema()] : []),
    ...(breadcrumbs && breadcrumbs.length > 0 ? [generateBreadcrumbSchema(breadcrumbs)] : []),
    ...customSchema
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en-IN" />
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords || `${SERVICE_TYPES.map(s => s.name).join(', ')}, catering services, event management, ${location || 'Mumbai'}`} />
      <meta name="author" content={author || BRAND_CONFIG.name} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Brand Identity */}
      <meta name="application-name" content={BRAND_CONFIG.name} />
      <meta name="msapplication-TileColor" content="#B45309" />
      <meta name="theme-color" content="#B45309" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={BRAND_CONFIG.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@anjanievents" />
      <meta name="twitter:creator" content="@anjanievents" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Structured Data - WebSite Search */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.url,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${BRAND_CONFIG.url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        })}
      </script>
    </Helmet>
  );
};

export default EnhancedSEO;
