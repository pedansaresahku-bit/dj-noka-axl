import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, MapPin, Calendar } from 'lucide-react';
import { STAGE_GALLERY } from '../data/djData';
import { FadeIn } from './common/FadeIn';

export const StageCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? STAGE_GALLERY.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === STAGE_GALLERY.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="relative w-full py-24 sm:py-32 bg-[#08080A] px-4 sm:px-8 md:px-12 overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-volt/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>STAGE VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">LIVE MOMENTS</span>
            </h2>
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

        {/* 3D Perspective Stage Carousel Container */}
        <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] flex items-center justify-center [perspective:1200px]">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
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

              // Compute transform values
              const xTranslate = offset * 260;
              const zTranslate = -Math.abs(offset) * 180;
              const rotateYAngle = offset * -25;
              const scaleValue = isCenter ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.15);
              const opacityValue = isCenter ? 1 : Math.max(0.2, 0.6 - Math.abs(offset) * 0.2);

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
                    damping: 20,
                  }}
                  className={`absolute w-[300px] sm:w-[480px] md:w-[640px] h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden border cursor-pointer select-none ${
                    isCenter
                      ? 'border-volt/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,255,0,0.25)] z-30'
                      : 'border-white/10 hover:border-white/30 z-10'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                  {/* Slide Content Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-[11px] font-mono text-volt bg-volt/10 border border-volt/30 px-2.5 py-0.5 rounded-full uppercase">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

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
