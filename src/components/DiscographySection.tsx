import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc, Headphones, Music2 } from 'lucide-react';
import { TRACKS_DATA } from '../data/djData';
import { audioEngine } from '../utils/audioSynth';
import { FadeIn } from './common/FadeIn';

export const DiscographySection: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing, currentId) => {
      setIsPlaying(playing);
      setActiveTrackId(currentId);
    });
    return () => unsubscribe();
  }, []);

  const handleTrackPlay = (trackId: string, bpm: number) => {
    if (activeTrackId === trackId && isPlaying) {
      audioEngine.stop();
    } else {
      audioEngine.playTrackPreview(trackId, bpm);
    }
  };

  return (
    <section id="tracks" className="relative w-full py-24 sm:py-32 bg-[#0A0A0E] px-4 sm:px-8 md:px-12 border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-volt/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>DISCOGRAPHY & RELEASES</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">SONIC ARSENAL</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="max-w-md text-slate-400 font-mono text-xs sm:text-sm">
            High-octane festival anthems and peak-time club weapons produced by NOKA AXL. Click preview to trigger live analog synthesizers.
          </FadeIn>
        </div>

        {/* Tracklist Container */}
        <div className="flex flex-col gap-4">
          {TRACKS_DATA.map((track, idx) => {
            const isThisPlaying = isPlaying && activeTrackId === track.id;

            return (
              <FadeIn
                key={track.id}
                delay={idx * 0.08}
                className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 p-4 sm:p-6 ${
                  isThisPlaying
                    ? 'bg-[#14141E] border-volt shadow-volt-sm'
                    : 'bg-[#0E0E14]/80 border-white/10 hover:border-white/30 hover:bg-[#12121A]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Track Cover & Details */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Track Number */}
                    <span className="font-kanit font-black text-2xl sm:text-4xl text-slate-600 group-hover:text-volt transition-colors w-8">
                      0{idx + 1}
                    </span>

                    {/* Album Art / Cover Thumbnail with Play Overlay */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                      <img
                        src={track.coverImage}
                        alt={track.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isThisPlaying ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                      />
                      <button
                        onClick={() => handleTrackPlay(track.id, track.bpm)}
                        className={`absolute inset-0 flex items-center justify-center transition-all ${
                          isThisPlaying
                            ? 'bg-volt/80 text-black opacity-100'
                            : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
                        }`}
                        title={isThisPlaying ? 'Pause sound' : 'Preview track'}
                      >
                        {isThisPlaying ? (
                          <Pause className="w-6 h-6 fill-black" />
                        ) : (
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Title & Artist */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-volt uppercase bg-volt/10 px-2 py-0.5 rounded border border-volt/20">
                          {track.genre}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {track.releaseYear}
                        </span>
                      </div>
                      <h3 className="font-kanit font-bold text-lg sm:text-2xl text-white tracking-wide uppercase group-hover:text-volt transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">
                        {track.featuredArtist} • {track.streams} streams
                      </p>
                    </div>
                  </div>

                  {/* Center: Live Waveform / Audio Visualizer Bars */}
                  <div className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/40 border border-white/5 w-[220px] lg:w-[280px] h-12 justify-center">
                    {isThisPlaying ? (
                      <div className="flex items-end gap-1 h-7">
                        {[...Array(24)].map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              height: ['20%', '100%', '35%', '85%', '15%'],
                            }}
                            transition={{
                              duration: 0.5 + (i % 5) * 0.15,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                              delay: (i % 6) * 0.05,
                            }}
                            className="w-1 bg-volt rounded-full"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 h-3 opacity-30">
                        {[...Array(24)].map((_, i) => (
                          <span
                            key={i}
                            className="w-1 bg-slate-400 rounded-full"
                            style={{ height: `${20 + ((i * 7) % 60)}%` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: BPM / Key / Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 sm:gap-6 border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase">TEMPO</span>
                        <span className="font-bold text-white">{track.bpm} BPM</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase">KEY</span>
                        <span className="font-bold text-volt">{track.key}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase">TIME</span>
                        <span className="font-bold text-slate-300">{track.duration}</span>
                      </div>
                    </div>

                    {/* Preview Button */}
                    <button
                      onClick={() => handleTrackPlay(track.id, track.bpm)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-kanit font-bold tracking-wider uppercase transition-all ${
                        isThisPlaying
                          ? 'bg-volt text-black shadow-volt-sm'
                          : 'bg-white/10 text-white hover:bg-volt hover:text-black'
                      }`}
                    >
                      {isThisPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>PREVIEW</span>
                        </>
                      )}
                    </button>

                    {/* Streaming Links */}
                    <div className="flex items-center gap-2">
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-volt/20 hover:text-volt text-slate-300 border border-white/10 transition-colors"
                        title="Listen on Spotify"
                      >
                        <Disc className="w-4 h-4" />
                      </a>
                      <a
                        href={track.soundCloudUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-volt/20 hover:text-volt text-slate-300 border border-white/10 transition-colors"
                        title="Listen on SoundCloud"
                      >
                        <Music2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
