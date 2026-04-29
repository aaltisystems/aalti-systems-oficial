import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = ({ language }) => {
  const logos = [
    {
      name: 'OpenAI',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg'
    },
    {
      name: 'Google',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
    },
    {
      name: 'Microsoft',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
    },
    {
      name: 'HubSpot',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg'
    },
    {
      name: 'Salesforce',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
    },
    {
      name: 'Zapier',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <style>{`
        @keyframes logoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-carousel {
          animation: logoScroll 30s linear infinite;
        }

        .logo-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-center text-slate-200 text-lg md:text-xl font-dm-sans font-semibold mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {language === 'es'
            ? 'Tecnología que impulsa a las mejores empresas del mundo'
            : 'Technology powering the world\'s best companies'}
        </motion.h2>

        <div className="overflow-hidden">
          <div className="logo-carousel flex gap-12 md:gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: (i % logos.length) * 0.05 }}
                className="flex items-center justify-center flex-shrink-0 h-16 md:h-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-full max-w-[120px] md:max-w-[140px] object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
