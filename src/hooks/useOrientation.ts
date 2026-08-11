export function getOrientation(width: number, height: number) {
  return {
    orientation: width >= height ? "landscape" : "portrait",
    aspectRatio: width / (height || 1),
  };
}
