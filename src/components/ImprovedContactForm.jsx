import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../i18n';

export const ImprovedContactForm = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
    acceptPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.contactForm.required;
    if (!formData.email.trim()) newErrors.email = t.contactForm.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.problem.trim()) newErrors.problem = t.contactForm.required;
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', problem: '', acceptPrivacy: false });

      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 3000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-indigo-500/20 rounded-2xl shadow-2xl p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-indigo-500/20 rounded-full transition text-slate-400 hover:text-white"
          aria-label={t.contactForm.closeForm}
        >
          <X className="w-5 h-5" />
        </button>

        {!submitSuccess ? (
          <>
            <h3 className="text-2xl font-space-grotesk font-bold text-white mb-6">
              {t.contactForm.title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-dm-sans text-slate-300 mb-2">
                  {t.contactForm.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder={t.contactForm.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    errors.name ? 'border-red-500/50' : 'border-indigo-500/30'
                  } text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-dm-sans text-slate-300 mb-2">
                  {t.contactForm.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder={t.contactForm.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    errors.email ? 'border-red-500/50' : 'border-indigo-500/30'
                  } text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Problem/Comments Field */}
              <div>
                <label className="block text-sm font-dm-sans text-slate-300 mb-2">
                  {t.contactForm.problem}
                </label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => {
                    setFormData({ ...formData, problem: e.target.value });
                    if (errors.problem) setErrors({ ...errors, problem: '' });
                  }}
                  placeholder={t.contactForm.problemPlaceholder}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    errors.problem ? 'border-red-500/50' : 'border-indigo-500/30'
                  } text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition resize-none`}
                />
                {errors.problem && (
                  <p className="text-red-400 text-sm mt-1">{errors.problem}</p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => {
                    setFormData({ ...formData, acceptPrivacy: e.target.checked });
                    if (errors.acceptPrivacy) setErrors({ ...errors, acceptPrivacy: '' });
                  }}
                  className="mt-1 w-4 h-4 rounded border-indigo-500/30 bg-slate-800/50 text-indigo-500 focus:ring-indigo-400 cursor-pointer"
                />
                <label htmlFor="acceptPrivacy" className="text-xs text-slate-300 cursor-pointer">
                  Acepto la <span className="text-indigo-400 hover:text-indigo-300">política de privacidad</span> y entiendo que mis datos se utilizarán solo para contacto comercial.
                </label>
              </div>
              {errors.acceptPrivacy && (
                <p className="text-red-400 text-sm">{errors.acceptPrivacy}</p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-space-grotesk font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? t.contactForm.sending : t.contactForm.submit}
              </motion.button>
            </form>
          </>
        ) : (
          // Success Message
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center py-4"
          >
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <p className="text-green-400 font-space-grotesk font-bold text-lg mb-2">
                {t.contactForm.success}
              </p>
              <p className="text-slate-400 text-sm">
                {t.contactForm.connectNow}
              </p>
            </div>

            <div className="space-y-3">
              <motion.a
                href="https://wa.me/34647119040?text=Solicité%20consulta%20gratuita%20desde%20aalti.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-dm-sans text-sm hover:bg-green-500/30 transition"
              >
                💬 WhatsApp
              </motion.a>
              <motion.a
                href="https://instagram.com/aaltisystems"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 font-dm-sans text-sm hover:bg-pink-500/30 transition"
              >
                📸 Instagram
              </motion.a>
              <motion.a
                href="mailto:aaltistudio@gmail.com?subject=Solicitud%20de%20Consulta%20Gratuita"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-dm-sans text-sm hover:bg-indigo-500/30 transition"
              >
                ✉️ Email
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImprovedContactForm;
