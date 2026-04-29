import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = ({ language }) => {
  const logos = [
    { name: 'LogistiTech', emoji: '🚚' },
    { name: 'FinanceHub', emoji: '💰' },
    { name: 'ManufacturePro', emoji: '🏭' },
    { name: 'CloudBusiness', emoji: '☁️' },
    { name: 'StartupAccel', emoji: '🚀' },
    { name: 'RealEstate', emoji: '🏢' }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.p
          className="text-center text-slate-400 text-sm md:text-base font-dm-sans mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {language === 'es' ? '😍 Confían en nosotros:' : '😍 Trusted by:'}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center p-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{logo.emoji}</div>
                <p className="text-xs font-dm-sans text-slate-300">{logo.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
