import React from 'react';
import { motion } from 'framer-motion';

const PerspectiveMarquee = ({
  items = [
    'ChatGPT',
    'Claude',
    'Google Gemini',
    'OpenAI',
    'Anthropic',
    'Perplexity',
    'Hugging Face',
    'Cohere'
  ],
  fontSize = 48,
  color = '#fafafa',
  fontWeight = 700,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = '#030712',
  background = '#030712',
  speed = 1,
  className = ''
}) => {
  const itemPadding = fontSize * 0.9;
  const rendered = [...items, ...items, ...items];

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: `${perspective}px`,
      }}
    >
      <motion.div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          originX: '50%',
          originY: '50%',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              duration: 20 / speed,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {rendered.map((item, i) => (
            <motion.span
              key={i}
              style={{
                display: 'inline-block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize,
                fontWeight,
                color,
                letterSpacing: '-0.03em',
                paddingRight: itemPadding,
                minWidth: 'max-content',
              }}
              whileHover={{
                scale: 1.1,
                color: color === '#fafafa' ? '#6366f1' : '#a855f7',
              }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade gradient - left and right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 15%, transparent 85%, ${fadeColor} 100%)`,
        }}
      />

      {/* Fade gradient - top and bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 20%, transparent 80%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
};

export default PerspectiveMarquee;
