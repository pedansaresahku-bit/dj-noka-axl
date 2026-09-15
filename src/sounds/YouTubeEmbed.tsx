import React, { useState } from 'react';
import { ExternalLink, Youtube, Play, Tv, Sparkles } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  category: string;
  embedUrl: string;
  thumbnail: string;
  youtubeUrl: string;
}

export const YouTubeEmbed: React.FC = () => {
  const featuredVideos: YouTubeVideo[] = [
    {
      id: 'video-1',
      videoId: 'L696eMmxeGQ',
      title: 'NOKA AXL MIXTAPE - LATEST BREAKBEAT VOL. 1',
      category: 'LATEST MIXTAPE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/L696eMmxeGQ',
      thumbnail: 'https://img.youtube.com/vi/L696eMmxeGQ/hqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=L696eMmxeGQ',
    },
    {
      id: 'video-2',
      videoId: 'qg_48RlVhvg',
      title: 'NOKA AXL MIXTAPE - EXCLUSIVE BREAKBEAT FULL BASS',
      category: 'EXCLUSIVE MIXTAPE',
      embedUrl: 'https://www.youtube-nocookie.com/embed/qg_48RlVhvg',
      thumbnail: 'https://img.youtube.com/vi/qg_48RlVhvg/hqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=qg_48RlVhvg',
    },
    {
      id: 'video-3',
      videoId: 'TncMXhnTdGc',
      title: 'NOKA AXL MIXTAPE - CLUB & FESTIVAL REMIX SET',
      category: 'FESTIVAL ANTHEM',
      embedUrl: 'https://www.youtube-nocookie.com/embed/TncMXhnTdGc',
      thumbnail: 'https://img.youtube.com/vi/TncMXhnTdGc/hqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=TncMXhnTdGc',
    },
  ];

  const [activeVideo, setActiveVideo] = useState<YouTubeVideo>(featuredVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (video: YouTubeVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const channelUrl = 'https://www.youtube.com/@NokaAxLMixtape';

  return (
    <div className="w-full bg-[#0E0E14] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background red neon tint for YouTube */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF0000]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FF0000]/15 border border-[#FF0000]/40 flex items-center justify-center text-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.3)]">
            <Youtube className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
                YOUTUBE OFFICIAL MIXTAPE
              </h3>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000] hover:text-white text-[#FF0000] text-[11px] font-mono font-bold uppercase tracking-wider border border-[#FF0000]/40 transition-colors"
              >
                @NokaAxLMixtape
              </a>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Mixtape Resmi • 3 Video Terbaru • Putar Langsung di Sini Tanpa Pindah Halaman
            </p>
          </div>
        </div>

        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#e60000] text-white font-kanit font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)] active:scale-95 shrink-0"
        >
          <Tv className="w-4 h-4" />
          <span>Buka Channel Mixtape</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* YouTube Featured Video Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Main Video Display / In-Page Player */}
        <div className="lg:col-span-8 w-full">
          {isPlaying ? (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-volt/40 bg-black shadow-[0_0_30px_rgba(255,0,0,0.3)]">
              <iframe
                src={`${activeVideo.embedUrl}${activeVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1&enablejsapi=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 right-3 z-30 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-volt hover:text-black text-white text-xs font-mono tracking-wider transition-all border border-white/20 backdrop-blur-md shadow-lg"
              >
                ✕ Tutup Video
              </button>
            </div>
          ) : (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl group">
              {/* Background Image / Video Poster */}
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Floating Live Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-ping" />
                <span className="text-white font-bold">{activeVideo.category}</span>
              </div>

              {/* Center Play Button - Plays Immediately In-Page */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#FF0000] hover:bg-white text-white hover:text-[#FF0000] flex items-center justify-center transition-all duration-300 shadow-[0_0_35px_rgba(255,0,0,0.6)] hover:scale-110 active:scale-90 cursor-pointer"
                aria-label="Putar video di halaman ini"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              {/* Bottom Info Banner */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-volt uppercase tracking-wider block mb-1">
                    KLIK PLAY UNTUK MEMUTAR LANGSUNG
                  </span>
                  <h4 className="font-kanit font-black text-base sm:text-xl text-white uppercase tracking-wide line-clamp-1">
                    {activeVideo.title}
                  </h4>
                </div>

                <button
                  onClick={() => setIsPlaying(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-volt text-black text-xs font-kanit font-bold tracking-wider uppercase transition-all shadow-md shrink-0 hover:bg-volt-light"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar di Sini</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Playlist & Set Selection Column */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-volt flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-volt" />
              PILIH LIVE SET (LANGSUNG PUTAR)
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              3 Video
            </span>
          </div>

          {featuredVideos.map((item) => {
            const isSelected = activeVideo.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectVideo(item)}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#FF0000]/60 shadow-[0_0_15px_rgba(255,0,0,0.2)]'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <div className="w-20 h-14 rounded-xl overflow-hidden relative shrink-0 border border-white/10 bg-black">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h5 className="font-kanit font-bold text-xs sm:text-sm text-white uppercase tracking-wide truncate mt-0.5">
                    {item.title}
                  </h5>
                </div>
              </button>
            );
          })}

          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-3 rounded-2xl bg-white/5 hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/40 text-slate-200 hover:text-white font-kanit font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Kunjungi Channel Resmi @NokaAxLMixtape</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
