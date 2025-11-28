import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-neon-blue pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-neon-blue pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, hsl(180 100% 50% / 0.15), transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      />
    </>
  );
};
