import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Particle = ({ scrollY, particle }) => {
  // Compute drift values once per particle instance
  const randomXDiff = useRef(Math.random() * 100 - 50).current;
  const randomYDiff = useRef(Math.random() * 100 - 50).current;

  const x = useTransform(scrollY, [0, 2000], [0, randomXDiff]);
  const y = useTransform(scrollY, [0, 2000], [0, randomYDiff]);

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        x,
        y
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.5, 1]
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

export default function ParticleEffect() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0.2, 0.5]);

  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    }))
  ).current;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {particles.map(particle => (
        <Particle
          key={particle.id}
          scrollY={scrollY}
          particle={particle}
        />
      ))}
    </motion.div>
  );
}

