let prefersReducedMotion = null;

function updatePrefersReducedMotion(mediaQueryList) {
  prefersReducedMotion = mediaQueryList.matches;
}

export const getPrefersReducedMotion = () => {
  if (prefersReducedMotion === null) {
    if (typeof window.matchMedia === 'function') {
      const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQueryList.addListener(updatePrefersReducedMotion);
      prefersReducedMotion = mediaQueryList.matches;
    } else {
      prefersReducedMotion = false;
    }
  }
  return prefersReducedMotion;
};
