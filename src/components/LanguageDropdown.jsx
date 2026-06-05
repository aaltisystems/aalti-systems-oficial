import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { LANGUAGES } from '../LanguageContext';

// Visual metadata for each supported language. Order follows LANGUAGES.
const FLAGS = { es: '🇪🇸', en: '🇬🇧', pl: '🇵🇱' };
export const LANGUAGE_OPTIONS = LANGUAGES.map((code) => ({
  code,
  flag: FLAGS[code],
  label: code.toUpperCase(),
}));

const LanguageDropdown = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the menu when clicking outside of it.
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const active = LANGUAGE_OPTIONS.find((o) => o.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-indigo-500/30 bg-slate-950/60 hover:bg-indigo-500/20 transition-colors duration-200 text-white text-sm font-dm-sans font-semibold"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Seleccionar idioma / Select language"
      >
        <span className="text-base leading-none">{active.flag}</span>
        <span>{active.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-32 max-w-[calc(100vw-2rem)] rounded-xl border border-indigo-500/30 bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-black/40 overflow-hidden z-50"
          role="listbox"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLanguage(opt.code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={opt.code === language}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-dm-sans transition-colors duration-200 hover:bg-indigo-500/20 ${
                opt.code === language ? 'text-white bg-indigo-500/10' : 'text-slate-300'
              }`}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              <span>{opt.label}</span>
              {opt.code === language && <Check className="w-4 h-4 ml-auto text-indigo-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
