'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 72;

export default function HeroSequence({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Cached watermark mask (created once, reused every frame)
  const maskRef = useRef<HTMLCanvasElement | null>(null);

  const getMask = useCallback(() => {
    if (maskRef.current) return maskRef.current;
    const mask = document.createElement('canvas');
    mask.width = 1280;
    mask.height = 720;
    const mctx = mask.getContext('2d')!;
    const gradient = mctx.createRadialGradient(1220, 680, 0, 1220, 680, 100);
    gradient.addColorStop(0, 'rgba(15, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(15, 0, 0, 0)');
    mctx.fillStyle = gradient;
    mctx.fillRect(1080, 580, 250, 180);
    maskRef.current = mask;
    return mask;
  }, []);

  const drawFrame = useCallback((img: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, 1280, 720);
    ctx.drawImage(getMask(), 0, 0);
  }, [getMask]);

  // Progressive frame loading
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    imagesRef.current = images;

    const getFrameSrc = (i: number) => `/hero-webp/frame_${i.toString().padStart(3, '0')}.webp`;

    const updateProgress = () => {
      if (progressRef.current) {
        const pct = Math.round((loadedCountRef.current / FRAME_COUNT) * 100);
        progressRef.current.style.width = `${pct}%`;
        if (pct >= 100) {
          progressRef.current.parentElement!.style.opacity = '0';
        }
      }
    };

    // Load first frame immediately for instant first paint
    const first = new Image();
    first.src = getFrameSrc(0);
    first.onload = () => {
      images[0] = first;
      loadedCountRef.current = 1;
      if (canvasRef.current) {
        canvasRef.current.width = 1280;
        canvasRef.current.height = 720;
        canvasRef.current.style.opacity = '1';
      }
      drawFrame(first);
      updateProgress();
    };

    // Then progressively batch-load remaining frames
    const BATCH_SIZE = 10;
    let currentBatch = 0;

    const loadBatch = () => {
      const start = currentBatch * BATCH_SIZE + 1;
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
      if (start >= FRAME_COUNT) return;

      let batchLoaded = 0;
      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          images[i] = img;
          loadedCountRef.current++;
          updateProgress();
          batchLoaded++;
          if (batchLoaded >= end - start) {
            currentBatch++;
            requestAnimationFrame(() => setTimeout(loadBatch, 30));
          }
        };
        img.onerror = () => {
          batchLoaded++;
          if (batchLoaded >= end - start) {
            currentBatch++;
            requestAnimationFrame(() => setTimeout(loadBatch, 30));
          }
        };
      }
    };

    // Prioritize first paint, then start loading rest
    setTimeout(loadBatch, 100);
  }, [drawFrame]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 1280;
      canvasRef.current.height = 720;
    }
  }, []);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const currentFrame = Math.floor(latest);
    const img = imagesRef.current[currentFrame];

    if (img && img.complete) {
      drawFrame(img);
    }
  });

  // Typography Opacity Animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a]">
      {/* Sticky container locks canvas to screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
        />
        
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none mix-blend-multiply" />

        {/* Minimal progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-32 transition-opacity duration-500">
          <div className="h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-neutral-500 rounded-full"
              style={{ width: '0%', transition: 'width 0.2s ease-out' }}
            />
          </div>
        </div>

        {/* Text Overlays */}
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

      {/* Spacer for scroll animation */}
      <div className="w-full h-[300vh] relative z-10 pointer-events-none" />

      {/* Content extending over the hero sequence */}
      <div className="relative z-20 w-full bg-gradient-to-b from-transparent to-black/80 backdrop-blur-[2px]">
        {children}
      </div>
    </div>
  );
}
