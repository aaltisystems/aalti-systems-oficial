import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './LanguageContext.jsx';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

// Mark root as visible (removes FOUC guard from index.html)
requestAnimationFrame(() => {
  root.classList.add('ready');
});
