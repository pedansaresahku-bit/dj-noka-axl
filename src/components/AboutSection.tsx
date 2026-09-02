import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Disc3, Zap, Activity, Cpu, ArrowRight } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';
import { Magnet } from './common/Magnet';
import { FadeIn } from './common/FadeIn';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenEPK: () => void;
}

// Character scroll reveal component
const CharacterScrollReveal: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const characters = text.split('');

  return (
    <p
      ref={containerRef}
      className="flex flex-wrap justify-center text-center max-w-4xl font-kanit text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight text-slate-100 select-none"
    >
      {characters.map((char, index) => {
        const start = index / characters.length;
        const end = start + 1 / characters.length;
        return (
          <CharacterSpan
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

const CharacterSpan: React.FC<{
  char: string;
  progress: any;
  range: [number, number];
}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ['#475569', '#FFFFFF']);

  if (char === ' ') {
    return <span className="inline-block w-2 sm:w-3">&nbsp;</span>;
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75"
    >
      {char}
    </motion.span>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onOpenEPK }) => {
  const manifestoText =
    "Forging heavy sub-frequencies, hyper-kinetic techno rhythms, and euphoric festival anthems. NOKA AXL commands the decks with surgical precision, uniting tens of thousands under laser-drenched skies across the world's most intense dancefloors.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#08080A] py-24 sm:py-32 px-4 sm:px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden border-b border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-volt/5 blur-[160px] rounded-full pointer-events-none" />

      {/* 4 Corner Studio Hardware Telemetry Widgets */}
      {/* Top Left: Deck Sync */}
      <FadeIn
        delay={0.1}
        x={-50}
        y={0}
        duration={0.8}
        className="hidden lg:block absolute top-12 left-10 p-5 rounded-2xl bg-[#0E0E14]/80 border border-white/10 backdrop-blur-md max-w-[240px]"
      >
        <div className="flex items-center gap-2 text-volt mb-2">
          <Disc3 className="w-4 h-4 animate-spin-slow" />
          <span className="text-[10px] font-mono tracking-widest uppercase">CDJ DECK MATRIX</span>
        </div>
        <div className="text-white font-kanit font-bold text-base leading-tight">
          QUAD CDJ-3000
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Pioneer DJM-V10 6-Channel Studio Bus
        </div>
      </FadeIn>

      {/* Top Right: Analog Synthesis */}
      <FadeIn
        delay={0.15}
        x={50}
        y={0}
        duration={0.8}
        className="hidden lg:block absolute top-12 right-10 p-5 rounded-2xl bg-[#0E0E14]/80 border border-white/10 backdrop-blur-md max-w-[240px]"
      >
        <div className="flex items-center gap-2 text-volt mb-2">
          <Cpu className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-widest uppercase">SOUND SYNTHESIS</span>
        </div>
        <div className="text-white font-kanit font-bold text-base leading-tight">
          ANALOG HYBRID LAB
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Moog Sub 37 & Virus TI2 Hardware
        </div>
      </FadeIn>

      {/* Bottom Left: Global Traction */}
      <FadeIn
        delay={0.25}
        x={-50}
        y={0}
        duration={0.8}
        className="hidden lg:block absolute bottom-12 left-10 p-5 rounded-2xl bg-[#0E0E14]/80 border border-white/10 backdrop-blur-md max-w-[240px]"
      >
        <div className="flex items-center gap-2 text-volt mb-2">
          <Activity className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-widest uppercase">GLOBAL IMPACT</span>
        </div>
        <div className="text-white font-kanit font-bold text-2xl leading-none">
          {ARTIST_INFO.totalStreams}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Total Plays on Spotify & Beatport
        </div>
      </FadeIn>

      {/* Bottom Right: Festival Mainstages */}
      <FadeIn
        delay={0.3}
        x={50}
        y={0}
        duration={0.8}
        className="hidden lg:block absolute bottom-12 right-10 p-5 rounded-2xl bg-[#0E0E14]/80 border border-white/10 backdrop-blur-md max-w-[240px]"
      >
        <div className="flex items-center gap-2 text-volt mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-widest uppercase">STAGE COMMAND</span>
        </div>
        <div className="text-white font-kanit font-bold text-2xl leading-none">
          {ARTIST_INFO.festivalAppearances}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Headline Festival & Club Shows
        </div>
      </FadeIn>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-volt" />
            <span>THE SONIC MANIFESTO</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-8 sm:mb-12">
            <span className="chrome-heading">SONIC IDENTITY</span>
          </h2>
        </FadeIn>

        {/* Character By Character Scroll-Driven Paragraph */}
        <div className="my-6 sm:my-10 px-2">
          <CharacterScrollReveal text={manifestoText} />
        </div>

        {/* Action CTAs */}
        <FadeIn delay={0.4} y={30} className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Magnet padding={50} strength={3}>
            <button
              onClick={onOpenBooking}
              className="px-8 sm:px-10 py-4 rounded-full bg-volt text-black font-kanit font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-volt-md hover:bg-volt-hover active:scale-95 transition-all"
            >
              <span>INQUIRE ARTIST BOOKING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Magnet>

          <Magnet padding={50} strength={4}>
            <button
              onClick={onOpenEPK}
              className="px-8 sm:px-10 py-4 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-volt font-kanit font-bold text-sm tracking-wider uppercase transition-all backdrop-blur-sm"
            >
              DOWNLOAD EPK & RIDER (.PDF)
            </button>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};
