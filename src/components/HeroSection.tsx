import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Disc3, Radio, Sparkles, Flame, ArrowDown } from 'lucide-react';
import { Magnet } from './common/Magnet';
import { ARTIST_INFO } from '../data/djData';
import { audioEngine } from '../utils/audioSynth';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTracks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreTracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0.2]);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stop();
    } else {
      audioEngine.playTrackPreview('hero-track', 138);
    }
  };

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
        className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] font-mono tracking-widest text-slate-400"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-volt" />
          </span>
          <span className="text-white font-bold tracking-wider">LIVE REZONATOR ENGINE</span>
          <span className="hidden sm:inline text-slate-600">//</span>
          <span className="hidden sm:inline text-volt">{ARTIST_INFO.bpmRange}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Radio className="w-3 h-3 text-volt animate-pulse" />
            <span className="text-slate-300 uppercase">{ARTIST_INFO.status}</span>
          </div>
          <span className="text-slate-500 font-mono">SYS-ONLINE</span>
        </div>
      </motion.div>

      {/* Central Kinetic Headline & Massive Typography */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-volt/40 bg-volt/10 text-volt text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 shadow-volt-sm"
        >
          <Flame className="w-3.5 h-3.5 text-volt" />
          <span>WORLD TOUR & FESTIVAL HEADLINER</span>
          <Sparkles className="w-3.5 h-3.5 text-volt" />
        </motion.div>

        {/* Massive DJ Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden"
        >
          <h1 className="font-kanit font-black uppercase tracking-tighter leading-none text-[15vw] sm:text-[14vw] md:text-[13.5vw] text-white whitespace-nowrap drop-shadow-2xl">
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

        {/* Hero Interactive Deck & Audio Preview Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Audio Preview Trigger Button */}
          <Magnet padding={50} strength={3}>
            <button
              onClick={handleTogglePlay}
              className={`group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-kanit font-bold text-sm tracking-wider uppercase transition-all duration-300 border ${
                isPlaying
                  ? 'bg-volt text-black border-volt shadow-volt-md'
                  : 'bg-white/10 text-white border-white/20 hover:border-volt hover:text-volt backdrop-blur-md'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-black" />
                  <span>PAUSE SONIC DROP</span>
                  <div className="flex items-center gap-1 h-3.5">
                    <span className="w-1 bg-black rounded animate-eq-1" />
                    <span className="w-1 bg-black rounded animate-eq-2" />
                    <span className="w-1 bg-black rounded animate-eq-3" />
                    <span className="w-1 bg-black rounded animate-eq-4" />
                  </div>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white group-hover:fill-volt transition-colors" />
                  <span>PLAY LIVE REEVAL 138 BPM</span>
                  <Disc3 className="w-4 h-4 animate-spin-slow group-hover:text-volt" />
                </>
              )}
            </button>
          </Magnet>

          {/* Explore Tracks */}
          <Magnet padding={50} strength={4}>
            <button
              onClick={onExploreTracks}
              className="px-6 sm:px-8 py-3.5 rounded-full font-kanit font-semibold text-sm tracking-wider uppercase border border-white/20 text-slate-300 hover:text-white hover:border-white/50 backdrop-blur-sm transition-all"
            >
              EXPLORE DISCOGRAPHY
            </button>
          </Magnet>

          {/* Book Now */}
          <Magnet padding={50} strength={4}>
            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-8 py-3.5 rounded-full font-kanit font-bold text-sm tracking-wider uppercase bg-volt text-black hover:bg-volt-hover transition-all shadow-volt-sm"
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
          <span className="text-white/20">|</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">SHOWS WORLDWIDE</span>
            <span className="font-bold text-white tracking-wider">{ARTIST_INFO.festivalAppearances} GIGS</span>
          </div>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-slate-400 hover:text-volt transition-colors py-1 group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">DISCOVER THE SONIC WORLD</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
