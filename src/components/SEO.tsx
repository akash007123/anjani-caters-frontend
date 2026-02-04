import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: FAQItem[];
}

const defaultMeta = {
  title: 'Anjani Events - Premium Event Management & Catering Services',
  description: 'Anjani Events offers exceptional event management and catering services. From dream weddings to corporate events, we create unforgettable celebrations with premium catering, expert planning, and personalized service.',
  keywords: 'event management, catering services, wedding planning, corporate events, Indian cuisine, Mumbai catering, wedding catering, event decoration, party planning, wedding planner, best catering, event management company',
  image: '/og-image.jpg',
  url: 'http://anjanievents.in/',
};

const SEO = ({
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
  faq,
}: SEOProps) => {
  const seo = {
    title: title ? `${title} | Anjani events` : defaultMeta.title,
    description: description || defaultMeta.description,
    keywords: keywords || defaultMeta.keywords,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
  };

  // Build FAQ schema if provided
  const buildFAQSchema = (): FAQSchema | null => {
    if (!faq || faq.length === 0) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question' as const,
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: item.answer,
        },
      })),
    };
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Anjani events Events & Catering',
    description: seo.description,
    url: seo.url,
    logo: `${seo.url}/logo.png`,
    image: seo.image,
    telephone: '+91-9685533878',
    email: 'info.anjanievents1@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Maharastra Marg, Rani ki Bagiya, Beniganj',
      addressLocality: 'Chhatarpur',
      addressRegion: 'Madhya Pradesh',
      postalCode: '400058',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.1197',
      longitude: '72.8464',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
    priceRange: '₹₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
    },
    sameAs: [
      'https://facebook.com/anjanievents',
      'https://instagram.com/anjanievents',
      'https://twitter.com/anjanievents',
      'https://youtube.com/anjanievents',
      'https://linkedin.com/company/anjanievents',
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Mumbai, Maharashtra, India',
    },
    serviceType: [
      'Wedding Planning',
      'Corporate Events',
      'Catering Services',
      'Religious Ceremonies',
      'Birthday Celebrations',
    ],
  };

  const faqSchema = buildFAQSchema();

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={author || 'Anjani events'} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="Anjani events" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content="@shubhutsav" />

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

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'http://anjanievents.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: seo.title.split(' | ')[0],
              item: seo.url,
            },
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

// FAQ Component for pages
export const faqData = [
  {
    question: 'What services does Anjani events offer?',
    answer: 'Anjani events offers comprehensive event management and catering services including wedding planning, corporate events, birthday celebrations, religious ceremonies, and custom catering packages tailored to your needs.',
  },
  {
    question: 'How far in advance should I book for my wedding?',
    answer: 'We recommend booking at least 3-6 months in advance for weddings and 1-2 months for smaller events. However, we also accommodate last-minute bookings depending on availability.',
  },
  {
    question: 'Do you provide vegetarian and non-vegetarian options?',
    answer: 'Yes! We offer a wide range of both vegetarian and non-vegetarian Indian cuisines. Our menu can be customized to accommodate dietary restrictions and preferences.',
  },
  {
    question: 'What is your service area?',
    answer: 'We primarily serve Mumbai and surrounding areas in Maharashtra. For events outside this region, please contact us to discuss transportation and accommodation arrangements.',
  },
  {
    question: 'Do you offer themed decorations?',
    answer: 'Absolutely! Our creative team specializes in creating stunning themed decorations that bring your vision to life. From traditional Indian themes to modern elegant styles, we do it all.',
  },
  {
    question: 'What is included in your catering packages?',
    answer: 'Our catering packages include food preparation, serving staff, tables, chairs, linens, and dinnerware. We also offer additional services like live counters, themed setups, and beverage service.',
  },
];

export { SEO };
