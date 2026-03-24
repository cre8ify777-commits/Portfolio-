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

  // Progressive frame loading - load first frame immediately, then batch load rest
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    imagesRef.current = images;

    const getFrameSrc = (i: number) => {
      const num = i.toString().padStart(3, '0');
      return `/hero-frames/frame_${num}_delay-0.055s.png`;
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      canvasRef.current.width = 960;
      canvasRef.current.height = 540;
      ctx.drawImage(img, 0, 0, 960, 540);
      // Mask watermark
      const gradient = ctx.createRadialGradient(910, 510, 0, 910, 510, 70);
      gradient.addColorStop(0, 'rgba(15, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(15, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(800, 400, 200, 150);
    };

    // Load first frame instantly for fast first paint
    const first = new Image();
    first.src = getFrameSrc(0);
    first.onload = () => {
      images[0] = first;
      setImagesLoaded(1);
      drawFrame(first);
    };

    // Then progressively batch-load in groups of 8
    const BATCH_SIZE = 8;
    let currentBatch = 0;

    const loadBatch = () => {
      const start = currentBatch * BATCH_SIZE + 1; // skip frame 0
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
      if (start >= FRAME_COUNT) return;

      let batchLoaded = 0;
      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          images[i] = img;
          batchLoaded++;
          setImagesLoaded(prev => prev + 1);
          if (batchLoaded >= end - start) {
            currentBatch++;
            // Small delay between batches to avoid network congestion
            setTimeout(loadBatch, 50);
          }
        };
        img.onerror = () => {
          batchLoaded++;
          if (batchLoaded >= end - start) {
            currentBatch++;
            setTimeout(loadBatch, 50);
          }
        };
      }
    };

    // Start batch loading after a brief delay to prioritize first paint
    setTimeout(loadBatch, 200);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 960;
      canvasRef.current.height = 540;
    }
  }, []);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const currentFrame = Math.floor(latest);
    const img = imagesRef.current[currentFrame];

    if (img && img.complete) {
      ctx.clearRect(0, 0, 960, 540);
      ctx.drawImage(img, 0, 0, 960, 540);

      // Mask watermark
      const gradient = ctx.createRadialGradient(910, 510, 0, 910, 510, 70);
      gradient.addColorStop(0, 'rgba(15, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(15, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(800, 400, 200, 150);
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

        {imagesLoaded < FRAME_COUNT && imagesLoaded > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-32">
            <div className="h-[2px] bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${Math.round((imagesLoaded / FRAME_COUNT) * 100)}%` }}
              />
            </div>
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
