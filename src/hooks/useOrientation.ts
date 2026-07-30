import { useViewport } from './useViewport';

export function useOrientation() {
  const { width, height } = useViewport();
  
  return {
    orientation: width >= height ? 'landscape' : 'portrait',
    aspectRatio: width / (height || 1),
  };
}
