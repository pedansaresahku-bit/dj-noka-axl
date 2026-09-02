import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, MoveHorizontal } from 'lucide-react';
import { STAGE_GALLERY } from '../data/djData';
import { FadeIn } from './common/FadeIn';

export const StageCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % STAGE_GALLERY.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + STAGE_GALLERY.length) % STAGE_GALLERY.length);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <section id="gallery" className="relative w-full py-24 sm:py-32 bg-[#08080A] px-4 sm:px-8 md:px-12 border-b border-white/5 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-volt/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>STAGE VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">PRESS KIT // GALLERY</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 flex items-center gap-2">
              <MoveHorizontal className="w-4 h-4 text-volt animate-pulse" />
              <span>Drag / swipe with mouse to navigate vertical stage captures</span>
            </p>
          </FadeIn>

          {/* Navigation Controls */}
          <FadeIn delay={0.1} className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 sm:p-4 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-white transition-all active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400">
              <span className="text-volt font-bold text-sm">0{currentIndex + 1}</span> / 0{STAGE_GALLERY.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-3 sm:p-4 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-white transition-all active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>

        {/* 3D Perspective Vertical Stage Carousel with Mouse Drag */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          className="relative w-full h-[520px] sm:h-[620px] md:h-[700px] flex items-center justify-center [perspective:1400px] cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
            {STAGE_GALLERY.map((item, index) => {
              // Calculate offset relative to currentIndex
              let offset = index - currentIndex;
              if (offset < -Math.floor(STAGE_GALLERY.length / 2)) {
                offset += STAGE_GALLERY.length;
              } else if (offset > Math.floor(STAGE_GALLERY.length / 2)) {
                offset -= STAGE_GALLERY.length;
              }

              const isCenter = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Compute transform values for vertical portrait cards
              const xTranslate = offset * 280;
              const zTranslate = -Math.abs(offset) * 160;
              const rotateYAngle = offset * -20;
              const scaleValue = isCenter ? 1 : Math.max(0.78, 1 - Math.abs(offset) * 0.14);
              const opacityValue = isCenter ? 1 : Math.max(0.25, 0.65 - Math.abs(offset) * 0.2);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isPrev) prevSlide();
                    if (isNext) nextSlide();
                  }}
                  animate={{
                    x: xTranslate,
                    z: zTranslate,
                    rotateY: rotateYAngle,
                    scale: scaleValue,
                    opacity: opacityValue,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 22,
                  }}
                  className={`pointer-events-auto absolute w-[280px] sm:w-[350px] md:w-[410px] h-[460px] sm:h-[560px] md:h-[640px] rounded-[32px] overflow-hidden border select-none ${
                    isCenter
                      ? 'border-volt/80 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,255,0,0.3)] z-30'
                      : 'border-white/10 hover:border-white/30 z-10'
                  }`}
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none select-none"
                  />
                  {/* Subtle soft edge border lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {STAGE_GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-8 bg-volt shadow-volt-sm' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
