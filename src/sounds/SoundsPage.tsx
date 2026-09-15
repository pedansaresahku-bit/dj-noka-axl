import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Headphones, Flame, Youtube, Share2, Disc3, Sparkles, ExternalLink } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';
import { SpotifyEmbed } from './SpotifyEmbed';
import { SoundCloudEmbed } from './SoundCloudEmbed';
import { YouTubeEmbed } from './YouTubeEmbed';
import { SocialMediaHub } from './SocialMediaHub';

interface SoundsPageProps {
  onBackToHome: () => void;
  onNavigateToGallery?: () => void;
  onOpenBooking?: () => void;
  onOpenEPK?: () => void;
}

type TabType = 'all' | 'spotify' | 'soundcloud' | 'youtube' | 'social';

export const SoundsPage: React.FC<SoundsPageProps> = ({
  onBackToHome,
  onNavigateToGallery,
  onOpenBooking,
  onOpenEPK,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs = [
    { id: 'all' as TabType, label: 'SEMUA PLATFORM', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'youtube' as TabType, label: 'YOUTUBE', icon: <Youtube className="w-3.5 h-3.5" /> },
    { id: 'soundcloud' as TabType, label: 'SOUNDCLOUD', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'spotify' as TabType, label: 'SPOTIFY', icon: <Headphones className="w-3.5 h-3.5" /> },
    { id: 'social' as TabType, label: 'SOCIAL HUB', icon: <Share2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#08080A] text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 overflow-x-hidden">
      {/* Dynamic ambient backdrop lights */}
      <div className="absolute top-10 left-10 w-[600px] h-[500px] bg-volt/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#FF0000]/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-[#FF5500]/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#12121A] hover:bg-volt hover:text-black text-slate-300 border border-white/10 hover:border-volt font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          <div className="flex items-center gap-3">
            {onNavigateToGallery && (
              <button
                onClick={onNavigateToGallery}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-volt border border-volt/30 font-kanit font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Disc3 className="w-3.5 h-3.5" />
                <span>STAGE GALLERY</span>
              </button>
            )}

            {onOpenEPK && (
              <button
                onClick={onOpenEPK}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-kanit font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>EPK & RIDER</span>
              </button>
            )}

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,208,0,0.3)] hover:bg-volt-light active:scale-95"
              >
                <span>BOOKING SHOW</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h1 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white">
            SOUNDS <span className="text-volt">OF ME</span>
          </h1>
        </motion.div>

        {/* Platform Selection Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12 sm:mb-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-volt text-black shadow-[0_0_20px_rgba(255,208,0,0.4)] scale-105'
                    : 'bg-[#12121A] text-slate-300 hover:text-white border border-white/10 hover:border-volt/40 hover:bg-[#181824]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Embed Sections: 1. YouTube -> 2. SoundCloud -> 3. Spotify -> 4. Social Hub */}
        <div className="space-y-12 sm:space-y-16">
          {/* 1. YouTube Section */}
          {(activeTab === 'all' || activeTab === 'youtube') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <YouTubeEmbed />
            </motion.section>
          )}

          {/* 2. SoundCloud Section */}
          {(activeTab === 'all' || activeTab === 'soundcloud') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SoundCloudEmbed />
            </motion.section>
          )}

          {/* 3. Spotify Section */}
          {(activeTab === 'all' || activeTab === 'spotify') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SpotifyEmbed />
            </motion.section>
          )}

          {/* 4. Social Hub Section */}
          {(activeTab === 'all' || activeTab === 'social') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SocialMediaHub />
            </motion.section>
          )}
        </div>

        {/* Bottom Booking Prompt Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0E0E14] via-[#141420] to-[#0E0E14] border border-volt/20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-volt/5 pointer-events-none" />
          <h2 className="font-kanit font-black text-2xl sm:text-4xl uppercase tracking-wider text-white mb-3">
            INGIN MENAMPILKAN SET BASS DJ NOKA AXL DI KOTA ANDA?
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Dapatkan pengalaman festival & megaclub dengan hentakan Breakbeat Full Bass terbaik di Asia. Kirim penawaran event Anda sekarang.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-full bg-volt hover:bg-volt-light text-black font-kanit font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,208,0,0.4)] active:scale-95"
              >
                REQUEST JADWAL & RATE CARD
              </button>
            )}
            <a
              href={ARTIST_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>WHATSAPP MANAGEMENT</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
