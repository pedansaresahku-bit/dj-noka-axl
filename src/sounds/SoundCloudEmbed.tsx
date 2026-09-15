import React from 'react';
import { ExternalLink, Flame, Disc3, Volume2 } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';

export const SoundCloudEmbed: React.FC = () => {
  return (
    <div className="w-full bg-[#0E0E14] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background orange neon tint for SoundCloud */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5500]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/15 border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.3)]">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
                SOUNDCLOUD LIVE MIXTAPES
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#FF5500]/20 text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#FF5500]/40">
                EXCLUSIVE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Official Profile: nk-bounce • Full Bass Extended Club Edits & Unreleased IDs
            </p>
          </div>
        </div>

        <a
          href={ARTIST_INFO.socialLinks.soundCloud}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#ff6a1f] text-white font-kanit font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] active:scale-95 shrink-0"
        >
          <Disc3 className="w-4 h-4 animate-spin-slow" />
          <span>Buka SoundCloud</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* Main Content Grid: SoundCloud Embed Player & Mixtape Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* SoundCloud Player Iframe (Multi-track list view) */}
        <div className="lg:col-span-7 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/80">
          <iframe
            width="100%"
            height="420"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/nk-bounce&color=%23ffd000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
            title="DJ Noka AxL SoundCloud Player"
            className="w-full"
          />
        </div>

        {/* Info & Sound Profile Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-volt text-xs font-mono uppercase tracking-widest mb-2">
              <Volume2 className="w-4 h-4" />
              <span>THE UNDERGROUND SOUND</span>
            </div>
            <h4 className="font-kanit font-bold text-lg text-white mb-2">
              BREAKBEAT FULL BASS & JUNGLE DUTCH ARCHIVE
            </h4>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              SoundCloud merupakan rumah bagi remix eksklusif, set live festival tanpa potongan, bootleg party anthems, dan rilisan unreleased club edition berkecepatan 138-142 BPM oleh DJ Noka AxL.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="block font-kanit font-black text-2xl text-volt">140 BPM</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Tempo</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="block font-kanit font-black text-2xl text-[#FF5500]">320 KBPS</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Master Audio</span>
            </div>
          </div>

          <a
            href={ARTIST_INFO.socialLinks.soundCloud}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl bg-[#FF5500]/10 hover:bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] hover:text-white font-kanit font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Dengarkan Seluruh Playlist di SoundCloud</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
