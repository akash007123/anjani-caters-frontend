/**
 * E-E-A-T Signals Component
 * Implements Experience, Expertise, Authoritativeness, Trustworthiness for Google
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_CONFIG, SERVICE_TYPES } from '../EnhancedSEO';

// Author/Expert Information
export const EXPERT_TEAM = [
  {
    name: 'Raj Sharma',
    role: 'Founder & CEO',
    credentials: '15+ Years Experience in Event Management',
    bio: 'Former hospitality manager with expertise in luxury weddings and corporate events across India.',
    image: '/team/raj-sharma.jpg',
    specialization: ['Wedding Planning', 'Corporate Events'],
    linkedin: 'https://linkedin.com/in/rajsharma'
  },
  {
    name: 'Priya Sharma',
    role: 'Head Chef',
    credentials: 'Master Chef, Indian Cuisine',
    bio: 'Trained at prestigious culinary institutes, specializes in authentic Indian and fusion cuisines.',
    image: '/team/priya-sharma.jpg',
    specialization: ['Menu Planning', 'Live Counters', 'Vegetarian Cuisine'],
    linkedin: 'https://linkedin.com/in/priyasharma'
  },
  {
    name: 'Amit Kumar',
    role: 'Event Director',
    credentials: 'PMP Certified, Event Management',
    bio: '10+ years managing large-scale corporate events and conferences.',
    image: '/team/amit-kumar.jpg',
    specialization: ['Corporate Events', 'Venue Management'],
    linkedin: 'https://linkedin.com/in/amitkumar'
  },
  {
    name: 'Sonal Patel',
    role: 'Creative Director',
    credentials: 'Interior Designer, Event Stylist',
    bio: 'Award-winning designer specializing in wedding themes and decorations.',
    image: '/team/sonal-patel.jpg',
    specialization: ['Theme Decorations', 'Floral Design'],
    linkedin: 'https://linkedin.com/in/sonalpatel'
  }
];

// Experience Proof Data
export const EXPERIENCE_PROOF = {
  yearsInBusiness: BRAND_CONFIG.yearsInBusiness,
  eventsCompleted: BRAND_CONFIG.reviewCount,
  clientSatisfaction: 99,
  teamMembers: 50,
  citiesServed: BRAND_CONFIG.serviceAreas.length,
  awards: [
    { name: 'Best Catering Service', year: 2023, organization: 'Indian Hospitality Awards' },
    { name: 'Excellence in Wedding Planning', year: 2022, organization: 'Wedding Asia' },
    { name: 'Top Event Management', year: 2021, organization: 'Maharashtra Events Council' }
  ],
  certifications: [
    'ISO 9001:2015 Certified',
    'FSSAI Licensed',
    'HACCP Compliant',
    'Green Catering Certified'
  ],
  mediaFeatures: [
    { name: 'Times of India', article: 'Top Wedding Caterers in Mumbai' },
    { name: 'Wedding Sutra', feature: 'Real Wedding Showcase' },
    { name: 'India Today', article: 'Corporate Event Trends 2024' },
    { name: 'Zee News', interview: 'Festival Celebration Tips' }
  ]
};

// Author Bio Component
interface AuthorBioProps {
  author: typeof EXPERT_TEAM[0];
  showCredentials?: boolean;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({ 
  author, 
  showCredentials = true 
}) => {
  return (
    <div className="bg-amber-50 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img 
            src={author.image} 
            alt={author.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="font-bold text-lg text-amber-800">{author.name}</h4>
          <p className="text-amber-600 text-sm">{author.role}</p>
          {showCredentials && (
            <p className="text-gray-600 text-sm mt-1">{author.credentials}</p>
          )}
        </div>
      </div>
      <p className="text-gray-700 mt-4">{author.bio}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {author.specialization.map((spec, index) => (
          <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs">
            {spec}
          </span>
        ))}
      </div>
      <a 
        href={author.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-blue-600 text-sm mt-3 hover:underline"
      >
        View LinkedIn Profile →
      </a>
    </div>
  );
};

// Experience Proof Component
export const ExperienceProof: React.FC = () => {
  const stats = [
    { value: EXPERIENCE_PROOF.yearsInBusiness, label: 'Years of Experience', suffix: '+' },
    { value: EXPERIENCE_PROOF.eventsCompleted, label: 'Events Completed', suffix: '+' },
    { value: EXPERIENCE_PROOF.clientSatisfaction, label: 'Client Satisfaction', suffix: '%' },
    { value: EXPERIENCE_PROOF.teamMembers, label: 'Team Members', suffix: '+' },
    { value: EXPERIENCE_PROOF.citiesServed, label: 'Cities Served', suffix: '' }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Our Experience & Credentials</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-amber-600">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white mb-12">
        <h3 className="text-xl font-bold mb-4">Our Certifications</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {EXPERIENCE_PROOF.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <span className="text-xl">✓</span>
              <span className="text-sm font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {EXPERIENCE_PROOF.awards.map((award, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="text-amber-500 text-4xl mb-2">🏆</div>
            <h4 className="font-bold text-lg">{award.name}</h4>
            <p className="text-gray-600 text-sm">{award.organization}</p>
            <p className="text-amber-600 text-sm mt-1">{award.year}</p>
          </div>
        ))}
      </div>

      {/* Media Features */}
      <div>
        <h3 className="text-xl font-bold mb-4">As Seen In</h3>
        <div className="flex flex-wrap gap-4">
          {EXPERIENCE_PROOF.mediaFeatures.map((media, index) => (
            <a 
              key={index}
              href="#"
              className="bg-gray-100 hover:bg-amber-50 rounded-lg px-4 py-3 text-sm transition-colors"
            >
              <span className="font-semibold">{media.name}</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-amber-600">{media.article}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trust Signals Component
export const TrustSignals: React.FC = () => {
  return (
    <div className="bg-amber-50 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-center mb-6">Trust & Transparency</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-4xl mb-2">🔒</div>
          <h4 className="font-semibold">Secure Booking</h4>
          <p className="text-sm text-gray-600">Safe & secure payment processing</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-2">📋</div>
          <h4 className="font-semibold">Transparent Pricing</h4>
          <p className="text-sm text-gray-600">No hidden charges, detailed quotes</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h4 className="font-semibold">Verified Reviews</h4>
          <p className="text-sm text-gray-600">Real feedback from real clients</p>
        </div>
      </div>
    </div>
  );
};

// Article E-E-A-T Schema Generator
export const generateArticleEeatSchema = (article: {
  title: string;
  description: string;
  author: typeof EXPERT_TEAM[0];
  datePublished: string;
  dateModified: string;
  publisher: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  author: {
    '@type': 'Person',
    name: article.author.name,
    jobTitle: article.author.role,
    url: article.author.linkedin,
    image: article.author.image,
    description: article.author.bio
  },
  publisher: {
    '@type': 'Organization',
    name: article.publisher,
    logo: {
      '@type': 'ImageObject',
      url: `${BRAND_CONFIG.url}/logo.png`
    }
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BRAND_CONFIG.url}/blogs/${article.title.toLowerCase().replace(/\s+/g, '-')}`
  },
  about: SERVICE_TYPES.map(s => ({
    '@type': 'Thing',
    name: s.name,
    description: s.description
  }))
});

// Main E-E-A-T Component
interface EeatContentProps {
  children: React.ReactNode;
  article?: {
    title: string;
    description: string;
    author: typeof EXPERT_TEAM[0];
    datePublished: string;
    dateModified?: string;
  };
}

export const EeatContent: React.FC<EeatContentProps> = ({ 
  children, 
  article 
}) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header with E-E-A-T signals */}
      {article && (
        <header className="mb-8 pb-8 border-b border-amber-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={article.author.image} 
                alt={article.author.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                By <span className="font-semibold text-amber-600">{article.author.name}</span>
              </p>
              <p className="text-sm text-gray-500">
                {article.author.role} • {article.author.credentials}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Published: {new Date(article.datePublished).toLocaleDateString('en-IN', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
            {article.dateModified && ` • Updated: ${new Date(article.dateModified).toLocaleDateString('en-IN', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}`}
          </p>
        </header>
      )}

      {/* Main Content */}
      <div className="prose prose-amber max-w-none">
        {children}
      </div>

      {/* Author Bio at end */}
      {article && (
        <footer className="mt-12 pt-8 border-t border-amber-200">
          <AuthorBio author={article.author} />
        </footer>
      )}
    </article>
  );
};

export default {
  EXPERT_TEAM,
  EXPERIENCE_PROOF,
  AuthorBio,
  ExperienceProof,
  TrustSignals,
  generateArticleEeatSchema,
  EeatContent
};
