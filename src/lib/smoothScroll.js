import Lenis from 'lenis';

// Initialises Lenis smooth scrolling, driven by the native rAF loop.
// Returns the Lenis instance, or null when smooth scroll is skipped.
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Respect users who prefer reduced motion: keep native scrolling.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
    autoResize: true,
    // Prevent Lenis from intercepting anchor scrolls or scroll-to commands
    prevent: (node) => node.hasAttribute('data-lenis-prevent'),
  });

  // Prevent auto-scroll: ensure scroll position starts at top on load
  lenis.scrollTo(0, { immediate: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Expose for debugging / potential anchor-scroll helpers.
  window.__lenis = lenis;
  return lenis;
}
