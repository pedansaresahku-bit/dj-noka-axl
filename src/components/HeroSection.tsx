import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Radio, Sparkles, Flame, ArrowDown } from 'lucide-react';
import { Magnet } from './common/Magnet';
import { ARTIST_INFO } from '../data/djData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTracks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreTracks }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#08080A] pt-28 pb-10 px-4 sm:px-8 md:px-12 select-none"
    >
      {/* Background Video Reel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/assets/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105 filter contrast-125"
        />
        {/* Radial Dark Vignette & Scanline Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-[#08080A]/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 scanlines opacity-40" />
        <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      </div>

      {/* Top HUD Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
          <span className="text-white font-bold tracking-widest">{ARTIST_INFO.origin}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-volt" />
            BPM RANGE: {ARTIST_INFO.bpmRange}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-volt font-bold">{ARTIST_INFO.status}</span>
        </div>
      </motion.div>

      {/* Center Cinematic Stage Hero */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 my-auto flex flex-col items-center text-center max-w-6xl w-full mx-auto py-6 sm:py-10 px-2"
      >
        {/* Floating Futuristic Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-volt/30 bg-volt/10 text-volt text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-volt-sm"
        >
          <Flame className="w-3.5 h-3.5 text-volt animate-pulse" />
          <span>INDONESIAN BREAKBEAT PIONEER</span>
          <Sparkles className="w-3.5 h-3.5 text-volt" />
        </motion.div>

        {/* Massive DJ Name (Responsive without cutoff) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center py-2"
        >
          <h1 className="font-kanit font-black uppercase tracking-tight sm:tracking-tight leading-none text-[11.5vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.2vw] xl:text-[6.2rem] 2xl:text-[7.2rem] text-white whitespace-nowrap drop-shadow-2xl">
            <span className="hero-heading inline-block hover:scale-[1.02] transition-transform duration-300">
              NOKA AXL
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg font-light tracking-wide uppercase mt-2 sm:mt-4 leading-relaxed px-4"
        >
          {ARTIST_INFO.tagline}
        </motion.p>

        {/* Hero Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Explore Tracks */}
          <Magnet padding={50} strength={4}>
            <button
              onClick={onExploreTracks}
              className="px-7 sm:px-9 py-3.5 rounded-full font-kanit font-semibold text-sm tracking-wider uppercase border border-white/20 text-slate-200 hover:text-white hover:border-white/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all shadow-sm active:scale-95"
            >
              EXPLORE DISCOGRAPHY
            </button>
          </Magnet>

          {/* Book Now */}
          <Magnet padding={50} strength={4}>
            <button
              onClick={onOpenBooking}
              className="px-7 sm:px-9 py-3.5 rounded-full font-kanit font-bold text-sm tracking-wider uppercase bg-volt text-black hover:bg-volt-hover transition-all shadow-volt-sm active:scale-95"
            >
              BOOK FOR FESTIVAL
            </button>
          </Magnet>
        </motion.div>
      </motion.div>

      {/* Bottom Telemetry & Scroll Anchor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 gap-4 text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">STREAM TRACTION</span>
            <span className="font-bold text-white tracking-wider">{ARTIST_INFO.totalStreams} PLAYS</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">MONTHLY LISTENERS</span>
            <span className="font-bold text-volt tracking-wider">{ARTIST_INFO.monthlyListeners}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">FESTIVALS</span>
            <span className="font-bold text-white tracking-wider">{ARTIST_INFO.festivalAppearances} SHOWS</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="flex items-center gap-2 text-slate-400 hover:text-volt transition-colors uppercase tracking-widest text-[11px] group"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3.5 h-3.5 text-volt group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
