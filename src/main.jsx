import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './LanguageContext.jsx';
import { initSmoothScroll } from './lib/smoothScroll';

const root = document.getElementById('root');

// Ensure scroll starts at top before rendering
if (typeof window !== 'undefined') {
  window.scrollTo(0, 0);
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

// Smooth scrolling (Lenis from npm, replaces the old CDN scripts).
initSmoothScroll();

// Mark root as visible (removes FOUC guard from index.html)
requestAnimationFrame(() => {
  root.classList.add('ready');
});
