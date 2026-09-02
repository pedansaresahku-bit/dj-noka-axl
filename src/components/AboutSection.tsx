import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, Activity, Zap, Radio, Music2, ShieldCheck, Sparkles, Disc3, Cpu, ArrowRight } from 'lucide-react';
import { Magnet } from './common/Magnet';
import { FadeIn } from './common/FadeIn';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenEPK: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onOpenEPK }) => {
  const [activeEra, setActiveEra] = useState<number>(0);

  const milestones = [
    {
      period: "2015 — 2019",
      badge: "ROOTS & UNDERGROUND ORIGINS",
      title: "Kelahiran Signature Breakbeat & Full Bass",
      desc: "Menempa identitas suara khas di Jakarta dengan memadukan tempo 138 BPM, syncopated drum breaks, dan low-end rumble tebal yang menjadi standar baru skena remixer tanah air."
    },
    {
      period: "2020 — 2023",
      badge: "MATALELAKI STUDIO 2 & VIRAL ERA",
      title: "Residensi Legendaris & Ledakan Viral Digital",
      desc: "Sesi live performance ikonik di MataLelaki Studio 2 ditonton jutaan penikmat musik dugem. Rilis lagu Fungky Beat, J-Town, dan kolaborasi viral merajai tangga lagu TikTok, YouTube, dan Apple Music."
    },
    {
      period: "2024 — 2026",
      badge: "MEGACLUBS & ASIA EXPANSION",
      title: "Invasi Panggung Megaclubs & Tur Asia",
      desc: "Memimpin arena festival terbesar dari DWP Jakarta, Colosseum, Savaya Bali, Valhalla, hingga ekspansi panggung internasional di Zouk Singapore dan Ageha Tokyo."
    }
  ];

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

        {/* 4 Bento Grid Pillars of Sound */}
        <FadeIn delay={0.25} y={20} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-4">
          {/* Bento Card 1: Breakbeat Mastery */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0C0C12] border border-white/10 hover:border-volt/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt mb-5 group-hover:scale-105 transition-transform">
                <Music2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-volt uppercase block mb-1">
                GENRE MASTERY
              </span>
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3">
                Pelopor Breakbeat & Jungle Dutch
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
                NOKA AXL adalah figur sentral yang membentuk lanskap musik Breakbeat tanah air. Dengan kombinasi kick bertenaga, synths funky yang memikat, dan groove syncopated khas, setiap set menghipnotis penonton dari detik pertama.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-volt shrink-0" />
              <span>Diakui sebagai Suhu & Inspirasi Komunitas Remixer Indonesia</span>
            </div>
          </div>

          {/* Bento Card 2: Viral Anthem Architecture */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0C0C12] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block mb-1">
                DISCOGRAPHY & VIRAL HITS
              </span>
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3">
                Karya Hits & Jutaan Pendengar Digital
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
                Deretan karya orisinal dan remix seperti <em>Fungky Beat</em>, <em>J-Town Bounce</em>, <em>Smoke in the Glass</em>, <em>Roulatte</em>, serta kolaborasi viral dengan Do Bad Well terus mendominasi jutaan konten video dan playlist dugem tanah air.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Kanal Resmi: YouTube Noka AxL OFFICIAL & Apple Music</span>
            </div>
          </div>

          {/* Bento Card 3: Stage Command */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0C0C12] border border-white/10 hover:border-volt/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt mb-5 group-hover:scale-105 transition-transform">
                <Disc3 className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-volt uppercase block mb-1">
                STAGE COMMAND
              </span>
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3">
                Dari Studio 2 MataLelaki ke Megastages
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
                Memulai momentum ikonik dari sesi residensi Studio 2 MataLelaki, NOKA AXL kini secara rutin menggetarkan panggung megaclub terdepan: Colosseum Jakarta, Savaya Bali, Valhalla, Atlas Beach Club, hingga panggung festival internasional.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Zap className="w-3.5 h-3.5 text-volt shrink-0" />
              <span>Headline Festival DWP, Zouk Singapore, Ageha Tokyo</span>
            </div>
          </div>

          {/* Bento Card 4: Hardware & Live Craft */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0C0C12] border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block mb-1">
                LIVE GEAR RIG
              </span>
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3">
                Surgical Drop Engineering
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
                Memadukan setup Quad Pioneer CDJ-3000 + DJM-V10 mixer dengan kontrol analog hardware Moog Sub 37. Setiap transisi dieksekusi secara live dengan live looping, isolator filter sweep, dan impact drop tanpa cacat.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Full Technical Rider & Stage Specification Ready</span>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Career Timeline / Highlights */}
        <FadeIn delay={0.3} y={20} className="w-full my-6 p-6 sm:p-8 rounded-3xl bg-[#0A0A10] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
            <div>
              <span className="text-[10px] font-mono text-volt uppercase tracking-widest block">
                CAREER CHRONICLES
              </span>
              <h4 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase">
                PERJALANAN MUSIK & REKAM JEJAK
              </h4>
            </div>

            {/* Timeline Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {milestones.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEra(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                    activeEra === idx
                      ? 'bg-volt text-black font-bold shadow-volt-sm'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {item.period}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5"
          >
            <span className="px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-[10px] font-mono uppercase font-bold inline-block mb-3">
              {milestones[activeEra].badge}
            </span>
            <h5 className="font-kanit font-bold text-lg sm:text-xl text-white uppercase mb-2">
              {milestones[activeEra].title}
            </h5>
            <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
              {milestones[activeEra].desc}
            </p>
          </motion.div>
        </FadeIn>

        {/* Action CTAs */}
        <FadeIn delay={0.35} y={20} className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
