import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { translations } from '../i18n';

export default function CookieBanner({ onShowPrivacy }) {
  const { language } = useLanguage();
  const c = translations[language].cookies;
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    } else {
      setHasConsent(true);
      loadAnalyticsCookies();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setHasConsent(true);
    setIsVisible(false);
    loadAnalyticsCookies();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  const loadAnalyticsCookies = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <h3 className="text-white font-dm-sans font-semibold">{c.title}</h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {c.text}{' '}
                {onShowPrivacy && (
                  <button
                    onClick={onShowPrivacy}
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    {c.privacyLink}
                  </button>
                )}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all duration-200"
                >
                  {c.accept}
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition-all duration-200"
                >
                  {c.reject}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
