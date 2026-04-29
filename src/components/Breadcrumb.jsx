import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items, language }) => {
  return (
    <motion.nav
      className="max-w-7xl mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ol className="flex items-center gap-2 text-sm font-dm-sans text-slate-400">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight className="w-4 h-4 text-slate-600" />}
            <li>
              {item.href ? (
                <a
                  href={item.href}
                  className="hover:text-indigo-400 transition"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-slate-300">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;
