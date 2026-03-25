'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const isVisibleRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tight spring physics for instant response
  const springConfig = { damping: 40, stiffness: 1500, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        el.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      el.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      el.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: 0,
      }}
      className="fixed pointer-events-none z-[9999] w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-xl transition-opacity duration-300 flex items-center justify-center overflow-hidden"
    >
      {/* Liquid interior detail */}
      <div className="w-1 h-1 rounded-full bg-white/40 blur-[1px]" />
      
      {/* Subtle glass reflection */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
    </motion.div>
  );
}
