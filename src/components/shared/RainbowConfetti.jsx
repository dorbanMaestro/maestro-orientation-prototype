// RainbowConfetti — 🌈 emojis fly up from bottom corners toward center
//
// Spawns rainbow emojis at the bottom-left and bottom-right edges of the screen.
// They fly upward in a fan pattern toward the center, then fade out.
// Matches the Figma "Lesson complete" design with confetti at bottom corners.

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// How many rainbows to spawn per side
const COUNT_PER_SIDE = 12;

export default function RainbowConfetti({ isActive }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const newParticles = [];

    // Left side: rainbows fly from bottom-left toward center-up
    for (let i = 0; i < COUNT_PER_SIDE; i++) {
      newParticles.push({
        id: `left-${i}`,
        // Start position: bottom-left area
        startX: Math.random() * 200 - 50,
        startY: window.innerHeight + 20 + Math.random() * 60,
        // End position: fly upward and toward center
        endX: 150 + Math.random() * 400,
        endY: 100 + Math.random() * 400,
        // Random rotation for organic feel
        rotation: -30 + Math.random() * 200,
        // Stagger
        delay: Math.random() * 0.5,
        // Duration
        duration: 1.2 + Math.random() * 0.8,
        // Size variation
        size: 24 + Math.random() * 20,
      });
    }

    // Right side: rainbows fly from bottom-right toward center-up
    for (let i = 0; i < COUNT_PER_SIDE; i++) {
      newParticles.push({
        id: `right-${i}`,
        startX: window.innerWidth - 200 + Math.random() * 200 + 50,
        startY: window.innerHeight + 20 + Math.random() * 60,
        endX: window.innerWidth - 150 - Math.random() * 400,
        endY: 100 + Math.random() * 400,
        rotation: -30 + Math.random() * 200,
        delay: Math.random() * 0.5,
        duration: 1.2 + Math.random() * 0.8,
        size: 24 + Math.random() * 20,
      });
    }

    setParticles(newParticles);

    // Clean up after animation completes
    const cleanup = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [isActive]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.startX,
            top: p.startY,
            zIndex: 9990,
            pointerEvents: 'none',
            fontSize: p.size,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.endX - p.startX,
            y: p.endY - p.startY,
            opacity: [1, 1, 0.8, 0],
            rotate: p.rotation,
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: [0.2, 0, 0.6, 1],
            opacity: { duration: p.duration, times: [0, 0.4, 0.7, 1] },
          }}
        >
          🌈
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
