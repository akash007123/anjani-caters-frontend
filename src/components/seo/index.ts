/**
 * SEO Components Index
 * Centralized export of all SEO components
 */

// Re-export EnhancedSEO from root components folder
export { default as EnhancedSEO } from '../EnhancedSEO';
export * from '../EnhancedSEO';

export { default as ProgrammaticSEO } from './ProgrammaticSEO';
export { generateAllServiceLocationPages, SERVICE_TYPES, LOCATION_PAGES } from './ProgrammaticSEO';

export { OptimizedImage, SEOGallery, VideoSEO, generateSrcSet, IMAGE_SEO_CONFIG } from './ImageSEO';

export { 
  useScrollDepth, 
  useTimeOnPage, 
  ReadingProgressBar, 
  TableOfContents, 
  InteractiveFAQ, 
  EngagementMetrics, 
  ExitIntentPopup 
} from './UserEngagement';

export { 
  NAPConsistency, 
  ReviewSchema, 
  ServiceAreaMap, 
  DrivingDirectionsPage, 
  GoogleBusinessOptimizer,
  GOOGLE_BUSINESS_DATA,
  getEnhancedLocalSchema 
} from './LocalSEO';

export { 
  EXPERT_TEAM, 
  EXPERIENCE_PROOF, 
  AuthorBio, 
  ExperienceProof, 
  TrustSignals, 
  generateArticleEeatSchema, 
  EeatContent 
} from './EEATSignals';
