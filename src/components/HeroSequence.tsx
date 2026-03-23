'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 144;

export default function HeroSequence({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Track scroll progress within this entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Preload frames
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/hero-frames/frame_${num}_delay-0.055s.png`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            canvasRef.current.width = 1920;
            canvasRef.current.height = 1080;
            ctx.clearRect(0, 0, 1920, 1080);
            ctx.drawImage(img, 0, 0, 1920, 1080);

            // Cleanly mask the watermark logo
            const gradient = ctx.createRadialGradient(1820, 1020, 0, 1820, 1020, 140);
            gradient.addColorStop(0, 'rgba(15, 0, 0, 1)');
            gradient.addColorStop(1, 'rgba(15, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(1600, 800, 400, 300);
          }
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 1920;
      canvasRef.current.height = 1080;
    }
  }, []);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const currentFrame = Math.floor(latest);
    const img = imagesRef.current[currentFrame];

    if (img && img.complete) {
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.drawImage(img, 0, 0, 1920, 1080);

      // Cleanly mask the watermark logo
      const gradient = ctx.createRadialGradient(1820, 1020, 0, 1820, 1020, 140);
      gradient.addColorStop(0, 'rgba(15, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(15, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(1600, 800, 400, 300);
    }
  });

  // Typography Opacity Animations (accelerated to finish before About appears)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

  const subOpacity = useTransform(scrollYProgress,  [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a]">
      {/* Sticky container locks canvas to screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: imagesLoaded > 0 ? 1 : 0 }}
        />
        
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none mix-blend-multiply" />

        {imagesLoaded < Math.min(20, FRAME_COUNT) && (
          <div className="absolute bottom-10 z-50 text-neutral-400 font-mono text-sm tracking-widest animate-pulse">
            LOADING ASSETS...
          </div>
        )}

        {/* Text Overlays - Main title stays perfectly vertically centered while fading */}
        <div className="relative z-20 w-full px-6 flex flex-col items-center justify-center text-center">
          <motion.div style={{ opacity: titleOpacity }} className="absolute flex flex-col items-center">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl uppercase">
              Aditya Kanchan
            </h1>
            <h2 className="text-xl md:text-3xl font-semibold text-white tracking-[0.3em] md:tracking-[0.4em] mt-6 drop-shadow-2xl uppercase">
              Marketing professional
            </h2>
          </motion.div>

          <motion.div style={{ opacity: subOpacity, y: subY }} className="absolute">
            <h2 className="text-4xl md:text-7xl font-bold text-neutral-100 tracking-tight drop-shadow-2xl max-w-5xl leading-tight">
              AI-Driven Marketing & Sales
            </h2>
            <p className="text-neutral-300 mt-8 text-2xl tracking-widest font-light uppercase">
              Transforming traditional strategy
            </p>
          </motion.div>
        </div>
      </div>

      {/* Spacer allows time for scrolling through the hero animation BEFORE content appears */}
      <div className="w-full h-[300vh] relative z-10 pointer-events-none" />

      {/* Content extending over the hero sequence */}
      <div className="relative z-20 w-full bg-gradient-to-b from-transparent to-black/80 backdrop-blur-[2px]">
        {children}
      </div>
    </div>
  );
}
