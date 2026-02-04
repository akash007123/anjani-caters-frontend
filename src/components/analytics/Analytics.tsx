import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Event tracking utility
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Console log for debugging
  console.log('Analytics Event:', { action, category, label, value });
};

// Page view tracking
export const trackPageView = (url: string, title: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
      page_title: title,
    });
  }
  
  console.log('Page View:', { url, title });
};

// Specific event tracking functions
export const trackButtonClick = (buttonName: string, location: string): void => {
  trackEvent('click', 'Button', `${buttonName} - ${location}`);
};

export const trackFormSubmission = (formName: string): void => {
  trackEvent('submit', 'Form', formName);
  trackEvent('generate_lead', 'Conversion', formName);
};

export const trackScrollDepth = (depth: number): void => {
  trackEvent('scroll', 'Engagement', `${depth}%`);
};

export const trackVideoPlay = (videoName: string): void => {
  trackEvent('play', 'Video', videoName);
};

export const trackDownload = (fileName: string): void => {
  trackEvent('download', 'Lead Magnet', fileName);
};

export const trackPhoneClick = (): void => {
  trackEvent('click', 'Contact', 'Phone Call');
};

export const trackWhatsAppClick = (): void => {
  trackEvent('click', 'Contact', 'WhatsApp');
};

// Analytics Provider Component
export function Analytics(): null {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const initGA = (): void => {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script1);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    };

    // Only load in production
    if (import.meta.env.PROD && !localStorage.getItem('analyticsDisabled')) {
      initGA();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView(window.location.pathname, document.title);
    }
  }, [location]);

  return null;
}

// Scroll depth tracker hook
export function useScrollTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const depths = [25, 50, 75, 100];
    const loggedDepths = new Set<number>();

    const handleScroll = (): void => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);

      depths.forEach((depth) => {
        if (scrollPercentage >= depth && !loggedDepths.has(depth)) {
          loggedDepths.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);
}

// Click tracking hook
export function useClickTracking(): void {
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonName = button?.getAttribute('aria-label') || button?.textContent || 'Unknown Button';
        trackButtonClick(buttonName.trim(), window.location.pathname);
      }
      
      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const href = link?.getAttribute('href') || '';
        
        if (href.startsWith('tel:')) {
          trackPhoneClick();
        } else if (href.includes('wa.me') || href.includes('whatsapp')) {
          trackWhatsAppClick();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
