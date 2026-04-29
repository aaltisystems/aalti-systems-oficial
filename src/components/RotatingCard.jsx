import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RotatingCard({ company, before, after, roi, metric }) {
  const [isRotated, setIsRotated] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isRotated ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={() => setIsRotated(!isRotated)}
        className="w-full h-full cursor-pointer perspective"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <motion.div
          style={{ backfaceVisibility: 'hidden' }}
          className="glass-dark p-8 rounded-2xl border border-cyan-400/30 h-full flex flex-col justify-between"
        >
          <h3 className="font-space-grotesk text-2xl font-bold text-white mb-4">{company}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-dm-sans">Antes:</span>
              <span className="text-red-400 font-dm-sans font-bold">{before}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-dm-sans">Después:</span>
              <span className="text-green-400 font-dm-sans font-bold">{after}</span>
            </div>
          </div>
          <div className="text-center text-xs text-slate-400 font-dm-sans mt-4">
            ↻ Girar para ver detalles
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="glass-dark p-8 rounded-2xl border border-cyan-400/30 h-full flex flex-col justify-between absolute inset-0"
        >
          <div>
            <p className="text-lg gradient-text font-bold font-space-grotesk mb-2">{roi}</p>
            <p className="text-sm text-slate-400 font-dm-sans">{metric}</p>
          </div>
          <div className="text-center text-xs text-slate-400 font-dm-sans">
            ↻ Girar para volver
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
