/**
 * Image SEO Component
 * Optimizes images for Google Images search and Core Web Vitals
 */
import React, { useState } from 'react';

// Image SEO Configuration
export const IMAGE_SEO_CONFIG = {
  formats: ['webp', 'avif', 'jpeg'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  quality: 85,
  placeholderQuality: 10
};

// Generate srcset for responsive images
export const generateSrcSet = (basePath: string, sizes: number[] = IMAGE_SEO_CONFIG.sizes) => {
  return sizes
    .map(size => `${basePath}?w=${size} ${size}w`)
    .join(', ');
};

// Optimized Image Component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  caption?: string;
  sizes?: string;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  caption,
  sizes = '(max-width: 768px) 100vw, 50vw',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  const basePath = src.replace(/\.[^/.]+$/, '');
  
  return (
    <figure className="relative overflow-hidden" style={{ aspectRatio: `${width}/${height}` }}>
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${src}?w=20&q=${IMAGE_SEO_CONFIG.placeholderQuality})`,
            backgroundSize: 'cover'
          }}
        />
      )}
      
      <picture>
        <source
          srcSet={`${basePath}.avif 1x, ${basePath}@2x.avif 2x`}
          type="image/avif"
          sizes={sizes}
        />
        <source
          srcSet={`${basePath}.webp 1x, ${basePath}@2x.webp 2x`}
          type="image/webp"
          sizes={sizes}
        />
        <img
          src={`${src}?w=${width}`}
          srcSet={`${src}?w=${width} 1x, ${src}?w=${width * 2} 2x`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding="async"
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>

      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm p-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// Image Gallery with SEO
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  eventType?: string;
  location?: string;
  date?: string;
}

interface SEOGalleryProps {
  images: GalleryImage[];
  title: string;
  columns?: 2 | 3 | 4;
}

export const SEOGallery: React.FC<SEOGalleryProps> = ({ 
  images, 
  title,
  columns = 3 
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {images.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              caption={image.caption}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay with event details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {image.eventType && (
                  <span className="inline-block bg-amber-500 text-xs px-2 py-1 rounded-full mb-2">
                    {image.eventType}
                  </span>
                )}
                {image.caption && (
                  <p className="text-sm font-medium">{image.caption}</p>
                )}
                {image.location && (
                  <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                    📍 {image.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Video SEO Component
interface VideoSEOProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  embedUrl: string;
  transcriptUrl?: string;
}

export const VideoSEO: React.FC<VideoSEOProps> = ({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
  transcriptUrl
}) => {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: title,
            description: description,
            thumbnailUrl: thumbnailUrl,
            uploadDate: uploadDate,
            duration: duration,
            embedUrl: embedUrl,
            transcript: transcriptUrl,
            publisher: {
              '@type': 'Organization',
              name: 'Anjani events'
            }
          })
        }}
      />
    </div>
  );
};
