/**
 * User Engagement Signals Component
 * Tracks and optimizes for dwell time, scroll depth, and user signals
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';

// Global gtag interface
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Scroll Depth Tracker
export const useScrollDepth = (options?: {
  thresholds?: number[];
  callback?: (depth: number) => void;
}) => {
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollMilestones, setScrollMilestones] = useState<number[]>([]);
  const thresholds = options?.thresholds || [25, 50, 75, 100];
  const scrollHandler = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    
    setMaxScroll(prev => Math.max(prev, scrollPercent));
    
    // Track milestones
    const triggered = thresholds.filter(t => scrollPercent >= t && !scrollMilestones.includes(t));
    if (triggered.length > 0) {
      setScrollMilestones(prev => [...new Set([...prev, ...triggered])]);
      triggered.forEach(t => {
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            percent: t,
            page: window.location.pathname
          });
        }
      });
      options?.callback?.(scrollPercent);
    }
  }, [thresholds, scrollMilestones, options]);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);
  
  return { maxScroll, scrollMilestones };
};

// Time on Page Tracker
export const useTimeOnPage = () => {
  const startTime = useRef(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      setTimeSpent(seconds);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      // Send final time on page to analytics
      if (window.gtag) {
        window.gtag('event', 'time_on_page', {
          seconds: timeSpent,
          page: window.location.pathname
        });
      }
    };
  }, [timeSpent]);
  
  return timeSpent;
};

// Reading Progress Bar
interface ReadingProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export const ReadingProgressBar: React.FC<ReadingProgressProps> = ({
  color = 'bg-amber-500',
  height = 4,
  position = 'top'
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const positionStyles = position === 'top' 
    ? 'top-0 left-0 fixed' 
    : 'bottom-0 left-0 fixed';
  
  return (
    <div 
      className={`${positionStyles} w-full z-50`}
      style={{ height: `${height}px` }}
    >
      <div 
        className={`${color} h-full transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Table of Contents with Active State
interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );
    
    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [items]);
  
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <nav className="sticky top-24 max-h-[calc(100vh-120px)] overflow-auto p-4 bg-white rounded-xl shadow-lg">
      <h3 className="font-bold text-lg mb-4 text-amber-800">Table of Contents</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`text-left text-sm transition-colors duration-200 ${
                activeId === item.id 
                  ? 'text-amber-600 font-semibold' 
                  : 'text-gray-600 hover:text-amber-600'
              } ${item.level === 3 ? 'pl-4' : ''}`}
            >
              {index + 1}. {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Interactive FAQ Accordion
interface FAQItem {
  question: string;
  answer: string;
}

interface InteractiveFAQProps {
  items: FAQItem[];
  title?: string;
}

export const InteractiveFAQ: React.FC<InteractiveFAQProps> = ({ 
  items, 
  title = 'Frequently Asked Questions' 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
            open={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between list-none">
              {item.question}
              <span className="text-2xl text-amber-500 transform transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-4 text-gray-700 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

// Engagement Metrics Display
interface EngagementMetricsProps {
  readTime?: number;
  publishedDate?: string;
  updatedDate?: string;
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  readTime = 5,
  publishedDate,
  updatedDate
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
      {readTime && (
        <span className="flex items-center gap-1">
          📖 {readTime} min read
        </span>
      )}
      {publishedDate && (
        <span className="flex items-center gap-1">
          📅 Published: {formatDate(publishedDate)}
        </span>
      )}
      {updatedDate && (
        <span className="flex items-center gap-1">
          🔄 Updated: {formatDate(updatedDate)}
        </span>
      )}
    </div>
  );
};

// Exit Intent Popup
interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  title = "Wait! Don't miss out",
  description = "Get 10% off on your first booking with us!",
  ctaText = "Claim Offer",
  ctaLink = "/get-quote"
}) => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0 && !dismissed) {
        setShow(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [dismissed]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setShow(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-bounce-in">
        <button 
          onClick={() => { setShow(false); setDismissed(true); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold text-amber-600 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <a
          href={ctaLink}
          className="block w-full bg-amber-500 text-white text-center py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default {
  useScrollDepth,
  useTimeOnPage,
  ReadingProgressBar,
  TableOfContents,
  InteractiveFAQ,
  EngagementMetrics,
  ExitIntentPopup
};
