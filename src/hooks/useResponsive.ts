import { useViewport } from './useViewport';
import { getOrientation } from './useOrientation';

export function useResponsive() {
  const { width, height } = useViewport();
  const { orientation } = getOrientation(width, height);
  
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);

  const isPhone = minDim < 768;
  const isTablet = minDim >= 768 && maxDim < 1366;
  const isDesktop = !isPhone && !isTablet;

  return {
    isPhoneLandscape: isPhone && orientation === 'landscape',
    isPhonePortrait: isPhone && orientation === 'portrait',
    isTablet,
    isDesktop,
    isMobile: isPhone || isTablet,
  };
}
