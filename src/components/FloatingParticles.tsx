'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Particle = {
  id: number;
  left: string;
  top: string;
  y: number[];
  x: number[];
  opacity: number[];
  duration: number;
  delay: number;
};

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.8, 0.2],
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: p.y,
            x: p.x,
            opacity: p.opacity,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}
