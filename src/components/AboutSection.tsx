import React from 'react';
import { Flame, Award, Activity, Zap, Radio, Sparkles, ArrowRight } from 'lucide-react';
import { Magnet } from './common/Magnet';
import { FadeIn } from './common/FadeIn';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenEPK: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onOpenEPK }) => {
  return (
    <section
      id="about"
      className="relative w-full bg-[#08080A] py-20 sm:py-28 px-4 sm:px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden border-b border-white/5"
    >
      {/* Lightweight GPU-accelerated background lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 255, 0, 0.18) 0%, rgba(8, 8, 10, 0) 70%)',
          willChange: 'transform'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <FadeIn delay={0} y={20} className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>INDONESIAN BREAKBEAT PIONEER & PRODUCER</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-4">
            <span className="chrome-heading">ABOUT NOKA AXL</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-2xl mx-auto uppercase tracking-wider">
            Meracik gelombang suara full bass berfrekuensi tebal, drop kinetik tanpa kompromi, dan energi dancefloor tanpa batas.
          </p>
        </FadeIn>

        {/* Lightweight Performant Manifesto Quote Box */}
        <FadeIn delay={0.15} y={20} className="my-8 sm:my-10 max-w-4xl text-center px-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative">
            <div className="text-volt font-mono text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SONIC MANIFESTO</span>
            </div>
            <blockquote className="font-kanit text-lg sm:text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-white select-none">
              "Pelopor sejati skena Breakbeat dan Jungle Dutch tanah air. NOKA AXL merevolusi panggung elektronik Indonesia lewat bassline berfrekuensi rendah yang tebal, ritme syncopated 138 BPM berenergi murni, dan performa panggung legendaris yang mempersatukan ratusan ribu ravers di panggung festival dan clubbing Asia."
            </blockquote>
          </div>
        </FadeIn>

        {/* Live Performance HUD Telemetry Stats */}
        <FadeIn delay={0.2} y={20} className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0E14] border border-white/10 hover:border-volt/40 transition-colors">
            <div className="flex items-center justify-between text-volt mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase">LEGACY</span>
              <Award className="w-4 h-4" />
            </div>
            <div className="text-white font-kanit font-black text-2xl sm:text-3xl tracking-tight">
              10+ TAHUN
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">
              Pionir Breakbeat Indonesia
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0E14] border border-white/10 hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center justify-between text-cyan-400 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase">DIGITAL REACH</span>
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-white font-kanit font-black text-2xl sm:text-3xl tracking-tight">
              150M+ PLAYS
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">
              TikTok, YouTube, Apple Music
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0E14] border border-white/10 hover:border-volt/40 transition-colors">
            <div className="flex items-center justify-between text-volt mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase">HEADLINE SHOWS</span>
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-white font-kanit font-black text-2xl sm:text-3xl tracking-tight">
              350+ GIGS
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">
              Megaclubs & Stadium Festivals
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0E14] border border-white/10 hover:border-purple-400/40 transition-colors">
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase">PULSE TEMPO</span>
              <Radio className="w-4 h-4" />
            </div>
            <div className="text-white font-kanit font-black text-2xl sm:text-3xl tracking-tight">
              138 BPM
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">
              Signature Sub-Bass Velocity
            </p>
          </div>
        </FadeIn>

        {/* Action CTAs */}
        <FadeIn delay={0.3} y={20} className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Magnet padding={50} strength={3}>
            <button
              onClick={onOpenBooking}
              className="px-8 sm:px-10 py-4 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-volt-md hover:bg-volt-hover active:scale-95 transition-all"
            >
              <span>INQUIRE ARTIST BOOKING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Magnet>

          <Magnet padding={50} strength={4}>
            <button
              onClick={onOpenEPK}
              className="px-8 sm:px-10 py-4 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-volt font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all backdrop-blur-sm"
            >
              DOWNLOAD EPK & RIDER (.PDF)
            </button>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
