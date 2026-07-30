import { useState, useEffect } from 'react';

interface RatioMetrics {
  scale: number;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const MOBILE_BASE_WIDTH = 390; // iPhone 12/13/14 base
const MOBILE_BASE_HEIGHT = 844;

export function useRatioEngine(): RatioMetrics {
  const [metrics, setMetrics] = useState<RatioMetrics>({
    scale: 1,
    width: typeof window !== 'undefined' ? window.innerWidth : BASE_WIDTH,
    height: typeof window !== 'undefined' ? window.innerHeight : BASE_HEIGHT,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1200;
      const isDesktop = w >= 1200;

      let scale = 1;
      
      if (isMobile) {
        // Calculate scale based on mobile dimensions to fit height and width perfectly
        const widthScale = w / MOBILE_BASE_WIDTH;
        const heightScale = h / MOBILE_BASE_HEIGHT;
        // Use the smaller scale to ensure it fits the screen without cropping
        scale = Math.min(widthScale, heightScale);
      } else if (isTablet) {
        // Simple scaling for tablet
        scale = w / 1024;
      } else {
        // Desktop scaling
        const widthScale = w / BASE_WIDTH;
        const heightScale = h / BASE_HEIGHT;
        scale = Math.min(widthScale, heightScale);
      }

      setMetrics({
        scale,
        width: w,
        height: h,
        isMobile,
        isTablet,
        isDesktop
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return metrics;
}

export function applyRatio(value: number, scale: number): number {
  return value * scale;
}
