import React from 'react';
import { Headphones, Music2, ArrowUpRight } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';
import { FadeIn } from './common/FadeIn';

export const DiscographySection: React.FC = () => {
  return (
    <section id="tracks" className="relative w-full py-24 sm:py-32 bg-[#0A0A0E] px-4 sm:px-8 md:px-12 border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-volt/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3 shadow-volt-sm">
              <Headphones className="w-3.5 h-3.5" />
              <span>DISCOGRAPHY & SOUNDCLOUD VAULT</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">SOUNDS OF ME</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="max-w-md text-slate-400 font-mono text-xs sm:text-sm">
            High-octane festival anthems, club mixtapes, and live Breakbeat & Jungle Dutch weapons produced by NOKA AXL. Stream the full playlist directly below.
          </FadeIn>
        </div>

        {/* Featured SoundCloud Official Playlist Player (Full Scrollable Multi-Track List) */}
        <FadeIn delay={0.1}>
          <div className="w-full rounded-2xl sm:rounded-3xl bg-[#0E0E15] border border-white/10 p-4 sm:p-7 shadow-2xl relative overflow-hidden group hover:border-[#ff5500]/50 transition-all duration-300">
            {/* Subtle SoundCloud orange ambient glow */}
            <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#ff5500]/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Header Control Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center text-[#ff5500] shrink-0 shadow-sm">
                  <Music2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-wide">
                      SOUNDCLOUD PLAYLIST & AUDIO VAULT
                    </h3>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 text-[#ff5500] font-bold">
                      @nk-bounce
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      PLAYLIST / MULTI-TRACK ACTIVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mt-0.5">
                    Daftar lengkap Mixtape, Breakbeat Full Bass & Jungle Dutch Set NOKA AXL (Klik & Scroll daftar lagu di bawah)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <a
                  href={ARTIST_INFO.socialLinks.soundCloud}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#ff5500] hover:bg-[#ff6611] text-white font-kanit font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>BUKA SOUNDCLOUD RESMI</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Multi-Track Playlist Embed (Scrollable Tracklist Mode) */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/90 shadow-inner">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/nk-bounce&color=%23d4ff00&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
                className="w-full block"
                title="NOKA AXL Official SoundCloud Playlist & Tracklist"
              />
            </div>

            {/* Bottom Playlist Instructions & Telemetry */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
                  NOKA AXL OFFICIAL CLOUD VAULT
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">💡 Klik judul lagu apa saja di dalam pemutar untuk ganti lagu</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-volt font-bold uppercase tracking-wider">
                  FULL PLAYLIST / SETS VIEW
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
