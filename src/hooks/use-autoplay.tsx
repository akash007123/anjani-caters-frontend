import { useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseAutoplayProps {
  api: CarouselApi | undefined;
  interval?: number;
  enabled?: boolean;
}

export const useAutoplay = ({ 
  api, 
  interval = 5000, 
  enabled = true 
}: UseAutoplayProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api || !enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const resetAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, interval);
    };

    // Set up autoplay
    resetAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, interval, enabled]);

  return null;
};