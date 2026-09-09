import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
  Download,
  Maximize2,
  Camera
} from 'lucide-react';
import { STAGE_GALLERY } from '../data/djData';
import { StagePhoto } from '../types';
import { scrollToTarget } from '../utils/smoothScroll';

const SLIDE_DURATION_SECONDS = 5;

export const StageCarouselSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'gallery'>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<StagePhoto | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % STAGE_GALLERY.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + STAGE_GALLERY.length) % STAGE_GALLERY.length);
  };

  // Continuous automatic slide rotation every 5 seconds (runs nonstop like before)
  useEffect(() => {
    if (viewMode !== 'carousel') return;

    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_SECONDS * 1000);

    return () => clearInterval(interval);
  }, [currentIndex, viewMode]);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const handleOpenGallery = () => {
    setViewMode('gallery');
    scrollToTarget('#gallery', -30);
  };

  const handleBackToCarousel = () => {
    setViewMode('carousel');
    scrollToTarget('#gallery', -30);
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-20 sm:py-28 bg-[#08080A] px-4 sm:px-8 md:px-12 border-b border-white/5 overflow-hidden select-none content-visibility-auto"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E5A83B]/5 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {viewMode === 'carousel' ? (
            /* ================================================================
               LAYAR 1: 3D COVERFLOW CAROUSEL VIEW (EXACTLY 3 CARDS ONLY)
               ================================================================ */
            <motion.div
              key="carousel-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header Bar: H2 = "Press Kit Gallery", Right = "LIHAT SEMUA" */}
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3 shadow-volt-sm">
                    <Camera className="w-3.5 h-3.5" />
                    <span>STAGE VISUAL ARCHIVE</span>
                  </div>
                  <h2 className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white">
                    Press Kit Gallery
                  </h2>
                </div>

                {/* "LIHAT SEMUA" Navigation Link */}
                <button
                  onClick={handleOpenGallery}
                  className="font-kanit font-bold text-sm sm:text-base tracking-widest text-[#E5A83B] hover:text-[#f8be52] hover:underline uppercase transition-all duration-300 flex items-center gap-1.5 active:scale-95"
                >
                  <span>LIHAT SEMUA</span>
                </button>
              </div>

              {/* 3D Carousel Stage */}
              <div className="relative w-full h-[500px] sm:h-[600px] md:h-[680px] flex items-center justify-center [perspective:1400px] touch-pan-y">
                {/* Side Navigation Buttons (Circular with Gold Border) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-1 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 backdrop-blur-sm border border-[#E5A83B]/80 text-[#E5A83B] hover:bg-[#E5A83B] hover:text-black transition-all duration-300 flex items-center justify-center shadow-[0_0_18px_rgba(229,168,59,0.3)] active:scale-90"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-1 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 backdrop-blur-sm border border-[#E5A83B]/80 text-[#E5A83B] hover:bg-[#E5A83B] hover:text-black transition-all duration-300 flex items-center justify-center shadow-[0_0_18px_rgba(229,168,59,0.3)] active:scale-90"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* 3D Interactive Cards Track: ONLY 3 CARDS RENDERED (-1, 0, 1) */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  className="relative w-full max-w-5xl h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  {STAGE_GALLERY.map((item, index) => {
                    let offset = index - currentIndex;
                    if (offset < -Math.floor(STAGE_GALLERY.length / 2)) {
                      offset += STAGE_GALLERY.length;
                    } else if (offset > Math.floor(STAGE_GALLERY.length / 2)) {
                      offset -= STAGE_GALLERY.length;
                    }

                    const isCenter = offset === 0;
                    const isPrev = offset === -1;
                    const isNext = offset === 1;
                    // Strict 3-Card Coverflow: Only show -1, 0, 1 (no unwanted extra side cards)
                    const isVisible = Math.abs(offset) <= 1;

                    if (!isVisible) return null;

                    // 3D Coverflow geometry: Center upright, Left tilted inwards +26deg, Right tilted inwards -26deg
                    const xTranslate = offset * 330;
                    const zTranslate = isCenter ? 30 : -90;
                    const rotateYAngle = offset * -26;
                    const scaleValue = isCenter ? 1 : 0.85;
                    const opacityValue = isCenter ? 1 : 0.72;

                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => {
                          if (isPrev) prevSlide();
                          if (isNext) nextSlide();
                          if (isCenter) setSelectedPhoto(item);
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
                          stiffness: 190,
                          damping: 24,
                        }}
                        className={`pointer-events-auto absolute w-[280px] sm:w-[350px] md:w-[410px] h-[450px] sm:h-[550px] md:h-[620px] rounded-[28px] sm:rounded-[32px] overflow-hidden border select-none transition-shadow ${
                          isCenter
                            ? 'border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(229,168,59,0.25)] z-30 cursor-pointer'
                            : 'border-white/10 hover:border-white/30 z-10 cursor-pointer'
                        }`}
                        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                      >
                        {/* Background Image */}
                        <img
                          src={item.image}
                          alt={item.title}
                          width="410"
                          height="620"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 pointer-events-none select-none"
                        />

                        {/* Soft edge ambient lighting gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Continuous 5-Second Animated Progress Fill Bar (seperti sebelumnya) */}
              <div className="flex items-center justify-center gap-2.5 mt-8">
                {STAGE_GALLERY.map((_, i) => {
                  const isActive = currentIndex === i;

                  if (isActive) {
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className="relative w-12 sm:w-16 h-2 rounded-full bg-white/15 overflow-hidden transition-all duration-300"
                        aria-label={`Current slide ${i + 1}`}
                      >
                        <motion.div
                          key={currentIndex}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{
                            duration: SLIDE_DURATION_SECONDS,
                            ease: 'linear',
                          }}
                          className="absolute top-0 left-0 bottom-0 bg-[#E5A83B] shadow-[0_0_12px_rgba(229,168,59,0.8)] rounded-full"
                        />
                      </button>
                    );
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/45 transition-all duration-300"
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ================================================================
               LAYAR 2: FULL IMAGE GALLERY VIEW (CLEAN - NO SUBTITLE & NO CATEGORY PILLS)
               ================================================================ */
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header: H2 = "Press Kit Gallery" & Back Button */}
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3 shadow-volt-sm">
                    <Camera className="w-3.5 h-3.5" />
                    <span>STAGE VISUAL ARCHIVE</span>
                  </div>
                  <h2 className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white">
                    Press Kit Gallery
                  </h2>
                </div>

                {/* Back to Carousel button */}
                <button
                  onClick={handleBackToCarousel}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5A83B]/60 text-[#E5A83B] hover:bg-[#E5A83B] hover:text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(229,168,59,0.2)] active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>KEMBALI KE CAROUSEL</span>
                </button>
              </div>

              {/* Responsive 3-Column Grid of All Photos (Directly without subtitle or category pills) */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {STAGE_GALLERY.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative aspect-[3/4] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-white/10 hover:border-[#E5A83B]/80 bg-[#0E0E14] cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(229,168,59,0.2)]"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle gradient overlay and expand icon on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Expand Icon Badge on Hover */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4 text-[#E5A83B]" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================================================================
          LIGHTBOX MODAL FOR FULL RESOLUTION IMAGE INSPECTION
          ================================================================ */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#0E0E14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#E5A83B] text-white hover:text-black transition-all border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image View */}
              <div className="relative w-full max-h-[75vh] bg-black/60 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt="DJ Noka AxL Press Photo"
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              {/* Clean Minimal Footer */}
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4 border-t border-white/10 bg-[#08080A]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E5A83B]">
                    DJ NOKA AXL // OFFICIAL PRESS KIT
                  </span>
                </div>

                {/* Download Button */}
                <a
                  href={selectedPhoto.image}
                  download="DJ-Noka-AxL-Press-Photo.jpeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#E5A83B] hover:bg-[#f8be52] text-black font-kanit font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(229,168,59,0.3)] active:scale-95 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Press Image</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StageCarouselSection;
