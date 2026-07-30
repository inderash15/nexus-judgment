import { useState, useEffect } from 'react';

export function useSafeArea() {
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || !document.documentElement) return;
    
    const updateInsets = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseInt(style.getPropertyValue("--sat")) || 0,
        right: parseInt(style.getPropertyValue("--sar")) || 0,
        bottom: parseInt(style.getPropertyValue("--sab")) || 0,
        left: parseInt(style.getPropertyValue("--sal")) || 0,
      });
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    window.addEventListener('orientationchange', updateInsets);
    
    return () => {
      window.removeEventListener('resize', updateInsets);
      window.removeEventListener('orientationchange', updateInsets);
    };
  }, []);

  return insets;
}
