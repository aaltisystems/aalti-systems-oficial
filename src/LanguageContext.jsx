import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      }
    } catch (e) {
      // Private browsing mode or localStorage not available - use default language
      console.debug('localStorage unavailable, using default language');
    }
    setIsHydrated(true);
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem('selectedLanguage', lang);
    } catch (e) {
      // Private browsing mode or localStorage not available - continue without saving
      console.debug('localStorage unavailable, using in-memory storage');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    handleSetLanguage(newLang);
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage }}>
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
