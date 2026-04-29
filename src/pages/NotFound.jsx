import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function NotFound({ onNavigateHome }) {
  const { language } = useLanguage();

  const content = {
    es: {
      code: "404",
      preTitle: "Automatización Pendiente",
      title: "Esta ruta no ha sido automatizada todavía",
      description: "Parece que la página que buscas aún no está integrada en nuestro sistema de automatización.",
      subtitle: "Pero no te preocupes, podemos automatizar tu proceso de ventas.",
      cta: "Volver al Inicio",
      button1: "Auditoría Gratuita",
      button2: "Contactar Ahora",
      helpText: "¿Necesitas ayuda? Contáctanos a"
    },
    en: {
      code: "404",
      preTitle: "Automation Pending",
      title: "This route hasn't been automated yet",
      description: "It looks like the page you're looking for hasn't been integrated into our automation system.",
      subtitle: "But don't worry, we can automate your sales process.",
      cta: "Back to Home",
      button1: "Free Audit",
      button2: "Contact Now",
      helpText: "Need help? Contact us at"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-dm-sans { font-family: 'DM Sans', sans-serif; }
        .text-gradient { background: linear-gradient(135deg, #6366f1, #a855f7, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Floating 404 with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative z-10 mb-6"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-20"
        />
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-full w-48 h-48 md:w-56 md:h-56 flex items-center justify-center border border-indigo-500/30">
          <div className="text-7xl md:text-8xl font-space-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            {t.code}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        {/* Pre-title with icon */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-space-grotesk font-semibold text-sm uppercase tracking-widest">
            {t.preTitle}
          </span>
          <Zap className="w-5 h-5 text-cyan-400" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <span className="text-gradient">
            {t.title}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="space-y-4 mb-12"
        >
          <p className="text-xl text-slate-300 font-dm-sans">
            {t.description}
          </p>
          <p className="text-lg text-slate-400 font-dm-sans">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Animated pulse elements */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                delay: 0.15 * i,
                duration: 2,
                repeat: Infinity
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.button
          onClick={onNavigateHome}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full font-space-grotesk font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
        >
          <Home className="w-5 h-5" />
          {t.cta}
        </motion.button>

        <motion.button
          onClick={onNavigateHome}
          whileHover={{ scale: 1.05, borderColor: "#6366f1", backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white/5 hover:bg-white/10 border-2 border-indigo-500/30 rounded-full font-space-grotesk font-bold text-white flex items-center justify-center gap-2 transition-all duration-200"
        >
          {t.button1}
          <Zap className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Support text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center text-slate-400 font-dm-sans text-sm max-w-xl relative z-10"
      >
        <p>
          {t.helpText}{' '}
          <a
            href="mailto:aaltistudio@gmail.com"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200"
          >
            aaltistudio@gmail.com
          </a>
        </p>
      </motion.div>

      {/* Decorative animated line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />
    </div>
  );
}
