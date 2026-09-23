import React from 'react';
import { ExternalLink, Play, Radio, Headphones } from 'lucide-react';
import { ARTIST_INFO, TRACKS_DATA } from '../data/djData';

export const SpotifyEmbed: React.FC = () => {
  return (
    <div className="w-full bg-[#0E0E14] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background neon tint */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1DB954]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/15 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.3)]">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
                SPOTIFY OFFICIAL ARTIST
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#1DB954]/40">
                VERIFIED
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              {ARTIST_INFO.totalStreams} Streams • {ARTIST_INFO.monthlyListeners} Monthly Listeners
            </p>
          </div>
        </div>

        <a
          href={ARTIST_INFO.socialLinks.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-kanit font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(29,185,84,0.4)] active:scale-95 shrink-0"
        >
          <Headphones className="w-4 h-4" />
          <span>Follow di Spotify</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* Grid: Official Iframe Player on Left + Top Tracks on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Spotify Player Embed */}
        <div className="lg:col-span-6 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 min-h-[352px]">
          <iframe
            style={{ borderRadius: '16px' }}
            src="https://open.spotify.com/embed/artist/6fPkynXVm133hWFeoHgQGv?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="DJ Noka AxL Spotify Artist Player"
            className="w-full"
          />
        </div>

        {/* Featured Spotify Releases List */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-volt flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-volt animate-pulse" />
              TOP STREAMED TRACKS
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Breakbeat & Jungle Dutch
            </span>
          </div>

          {TRACKS_DATA.slice(0, 4).map((track, idx) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#1DB954]/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono text-slate-500 w-4 text-center">
                  {idx + 1}
                </span>
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 shrink-0 relative">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-volt fill-volt" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="font-kanit font-bold text-sm text-white uppercase tracking-wide truncate group-hover:text-[#1DB954] transition-colors">
                    {track.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 truncate">
                    <span>{track.genre}</span>
                    <span>•</span>
                    <span className="text-volt">{track.bpm} BPM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {track.streams}
                </span>
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Dengarkan ${track.title} di Spotify`}
                  className="p-2 rounded-full bg-white/5 group-hover:bg-[#1DB954] text-slate-300 group-hover:text-black transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
