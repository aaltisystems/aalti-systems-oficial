import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ImprovedContactForm from '../components/ImprovedContactForm';
import { useLanguage } from '../LanguageContext';
import { translations } from '../i18n';

const ContactPage = ({ onBack }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isFormOpen, setIsFormOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'es' ? 'Volver' : 'Back'}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-space-grotesk font-bold">
            {language === 'es' ? '¿Listo para Transformar?' : 'Ready to Transform?'}
          </h1>
          <p className="text-xl text-slate-300 font-dm-sans">
            {language === 'es'
              ? 'Solicita tu auditoría gratuita hoy y descubre cómo AALTI SYSTEMS puede automatizar tus ventas 24/7.'
              : 'Request your free audit today and discover how AALTI SYSTEMS can automate your sales 24/7.'}
          </p>
        </motion.div>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          {[
            language === 'es'
              ? '✓ Auditoría 100% Gratuita - Sin Compromisos'
              : '✓ 100% Free Audit - No Commitments',
            language === 'es'
              ? '✓ Respuesta en 24h'
              : '✓ Response in 24h',
            language === 'es'
              ? '✓ Estrategia Personalizada'
              : '✓ Personalized Strategy',
            language === 'es'
              ? '✓ ROI Garantizado'
              : '✓ Guaranteed ROI'
          ].map((prop, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="font-dm-sans text-sm">{prop}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 rounded-2xl p-8 border border-indigo-500/20"
        >
          {isFormOpen ? (
            <ImprovedContactForm
              isOpen={true}
              onClose={() => setIsFormOpen(false)}
            />
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>
              <h2 className="text-2xl font-space-grotesk font-bold mb-2">
                {language === 'es' ? '¡Enviado!' : 'Sent!'}
              </h2>
              <p className="text-slate-400 mb-6">
                {language === 'es'
                  ? 'Gracias por tu solicitud. Nos pondremos en contacto en 24h.'
                  : 'Thank you for your request. We\'ll be in touch within 24 hours.'}
              </p>
              <button
                onClick={onBack}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                {language === 'es' ? 'Volver al sitio' : 'Back to site'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
