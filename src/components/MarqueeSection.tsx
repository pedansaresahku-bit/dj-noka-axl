import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Radio } from 'lucide-react';
import { FESTIVAL_BADGES } from '../data/djData';

export const MarqueeSection: React.FC = () => {
  const row1Items = [
    { type: 'image', src: '/assets/image-1.jpeg', label: 'MAIN STAGE ARENA', loc: 'JAKARTA DWP' },
    { type: 'badge', title: FESTIVAL_BADGES[0], sub: 'HEADLINE STAGE' },
    { type: 'image', src: '/assets/image-8.jpeg', label: 'HYBRID DROP WAVE', loc: 'COLOSSEUM' },
    { type: 'badge', title: FESTIVAL_BADGES[1], sub: 'WORLDWIDE TOUR' },
    { type: 'image', src: '/assets/image-3.jpeg', label: 'LASER MATRIX 400', loc: 'AGEHA TOKYO' },
    { type: 'badge', title: FESTIVAL_BADGES[2], sub: 'SPECIAL GUEST' },
    { type: 'image', src: '/assets/image-10.jpeg', label: 'SYNCHRONIZED RAVE', loc: 'MEGA ARENA' },
  ];

  const row2Items = [
    { type: 'image', src: '/assets/image-5.jpeg', label: '145 BPM PEAK HOUR', loc: 'UNDERGROUND' },
    { type: 'badge', title: FESTIVAL_BADGES[3], sub: 'CLIFFTOP SUNSET' },
    { type: 'image', src: '/assets/image-11.jpeg', label: 'MIDNIGHT PROTOCOL', loc: 'WAREHOUSE STAGE' },
    { type: 'badge', title: FESTIVAL_BADGES[4], sub: 'MIDNIGHT RAVE' },
    { type: 'image', src: '/assets/image-7.jpeg', label: 'TOUR FINALE ENCORE', loc: 'SOLD OUT ARENA' },
    { type: 'badge', title: FESTIVAL_BADGES[5], sub: 'CLUB RESIDENCY' },
    { type: 'image', src: '/assets/image-12.jpeg', label: 'CROWD SYNERGY', loc: 'ASIA SHOWCASE' },
  ];

  // Duplicated once for infinite seamless loop with minimum DOM nodes
  const marqueeRow1 = [...row1Items, ...row1Items];
  const marqueeRow2 = [...row2Items, ...row2Items];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#08080A] overflow-hidden border-y border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-volt/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-volt/10 border border-volt/30 text-volt">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-kanit font-black text-xl sm:text-2xl uppercase tracking-wider text-white">
              LIVE STAGE EXPERIENCE
            </h3>
            <p className="text-xs font-mono text-slate-400">GLOBAL FESTIVAL RUNS & STADIUM HEADLINES</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-volt bg-volt/10 border border-volt/20 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME STAGE TELEMETRY</span>
        </div>
      </div>

      {/* Marquee Row 1 (Left to Right Movement) */}
      <div className="relative w-full overflow-hidden flex gap-4 py-2 group">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
          style={{ willChange: 'transform' }}
          className="flex gap-4 items-center shrink-0 group-hover:[animation-play-state:paused]"
        >
          {marqueeRow1.map((item, idx) => (
            <div key={`r1-${idx}`} className="shrink-0">
              {item.type === 'image' ? (
                <div className="relative w-[320px] sm:w-[380px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden border border-white/10 bg-[#121218] group/card hover:border-volt/50 transition-all duration-300">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="font-kanit font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-mono text-volt tracking-widest uppercase">
                        {item.loc}
                      </p>
                    </div>
                    <span className="p-1.5 rounded-full bg-volt/20 border border-volt/40 text-volt">
                      <Flame className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-[240px] sm:w-[280px] h-[220px] sm:h-[250px] rounded-2xl border border-white/10 bg-[#0E0E14]/80 p-6 flex flex-col justify-between hover:border-volt/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      OFFICIAL STAGE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-kanit font-black text-2xl sm:text-3xl text-white tracking-wider uppercase leading-none">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-volt tracking-widest mt-2 uppercase">
                      {item.sub}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    STATUS: SOLD OUT // VERIFIED
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Right to Left Movement) */}
      <div className="relative w-full overflow-hidden flex gap-4 py-2 mt-2 group">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
          style={{ willChange: 'transform' }}
          className="flex gap-4 items-center shrink-0 group-hover:[animation-play-state:paused]"
        >
          {marqueeRow2.map((item, idx) => (
            <div key={`r2-${idx}`} className="shrink-0">
              {item.type === 'image' ? (
                <div className="relative w-[320px] sm:w-[380px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden border border-white/10 bg-[#121218] group/card hover:border-volt/50 transition-all duration-300">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="font-kanit font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-mono text-volt tracking-widest uppercase">
                        {item.loc}
                      </p>
                    </div>
                    <span className="p-1.5 rounded-full bg-volt/20 border border-volt/40 text-volt">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-[240px] sm:w-[280px] h-[220px] sm:h-[250px] rounded-2xl border border-volt/20 bg-[#121218] p-6 flex flex-col justify-between hover:border-volt transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-volt uppercase tracking-widest">
                      AUDIO HARDWARE
                    </span>
                    <Radio className="w-3.5 h-3.5 text-volt" />
                  </div>
                  <div>
                    <h4 className="font-kanit font-black text-2xl sm:text-3xl text-white tracking-wider uppercase leading-none">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 tracking-widest mt-2 uppercase">
                      {item.sub}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    MASTER CLOCK: 138.00 BPM
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
