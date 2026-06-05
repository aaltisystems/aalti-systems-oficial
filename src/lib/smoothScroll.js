import Lenis from 'lenis';

// Initialises Lenis smooth scrolling, driven by the native rAF loop.
// Previously GSAP's ticker was used for this, but GSAP is no longer a
// dependency (it was loaded from a CDN and never used by the app).
// Returns the Lenis instance, or null when smooth scroll is skipped.
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Respect users who prefer reduced motion: keep native scrolling.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.8,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Expose for debugging / potential anchor-scroll helpers.
  window.__lenis = lenis;
  return lenis;
}
