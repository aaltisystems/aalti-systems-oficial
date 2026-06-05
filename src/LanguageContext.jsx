import React, { createContext, useState, useContext, useEffect } from 'react';

// ─── Available languages ───────────────────────────────────────
export const LANGUAGES = ['es', 'en', 'pl'];
export const DEFAULT_LANGUAGE = 'es';

// Maps a language to its URL prefix. Spanish (default) lives at the
// root; the others live under /en/ and /pl/ — matching the hreflang
// tags in index.html. These paths are served by the SPA rewrite in
// vercel.json, so a hard refresh on /en/ or /pl/ still works.
const pathForLang = (lang) => (lang === DEFAULT_LANGUAGE ? '/' : `/${lang}/`);

// Reads the language from the current URL path (first segment), or
// null when the path does not start with a known language prefix.
const getLangFromPath = () => {
  if (typeof window === 'undefined') return null;
  const segment = window.location.pathname.split('/').filter(Boolean)[0];
  return LANGUAGES.includes(segment) ? segment : null;
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  // Keep <html lang> in sync for accessibility / SEO.
  const applyHtmlLang = (lang) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // On mount, resolve the initial language: the URL path wins (shareable,
  // explicit), then localStorage, otherwise the default.
  useEffect(() => {
    const fromPath = getLangFromPath();
    if (fromPath) {
      setLanguage(fromPath);
      applyHtmlLang(fromPath);
      try {
        localStorage.setItem('selectedLanguage', fromPath);
      } catch (e) {
        console.debug('localStorage unavailable, using in-memory storage');
      }
      return;
    }

    try {
      const saved = localStorage.getItem('selectedLanguage');
      if (LANGUAGES.includes(saved)) {
        setLanguage(saved);
        applyHtmlLang(saved);
      }
    } catch (e) {
      // Private browsing mode or localStorage not available - use default language
      console.debug('localStorage unavailable, using default language');
    }
  }, []);

  // Sync language when the user navigates with the browser back/forward buttons.
  useEffect(() => {
    const handlePopState = () => {
      const fromPath = getLangFromPath() || DEFAULT_LANGUAGE;
      setLanguage(fromPath);
      applyHtmlLang(fromPath);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetLanguage = (lang) => {
    if (!LANGUAGES.includes(lang)) return;
    setLanguage(lang);
    applyHtmlLang(lang);

    try {
      localStorage.setItem('selectedLanguage', lang);
    } catch (e) {
      // Private browsing mode or localStorage not available - continue without saving
      console.debug('localStorage unavailable, using in-memory storage');
    }

    // Reflect the language in the URL without reloading the SPA.
    if (typeof window !== 'undefined') {
      const target = pathForLang(lang);
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
    }
  };

  // Cycles through the available languages (es → en → pl → es ...).
  // Kept for backwards compatibility; the navbar now uses a dropdown.
  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.indexOf(language);
    const nextLang = LANGUAGES[(currentIndex + 1) % LANGUAGES.length];
    handleSetLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};
