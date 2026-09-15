import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera } from 'lucide-react';
import { STAGE_GALLERY, ARTIST_INFO } from '../data/djData';
import { StagePhoto } from '../types';
import { GalleryGrid } from './GalleryGrid';
import { LightboxModal } from './LightboxModal';

interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenBooking?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
  onOpenBooking,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<StagePhoto | null>(null);

  const currentIndex = selectedPhoto
    ? STAGE_GALLERY.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNextPhoto = () => {
    if (currentIndex >= 0 && currentIndex < STAGE_GALLERY.length - 1) {
      setSelectedPhoto(STAGE_GALLERY[currentIndex + 1]);
    } else {
      setSelectedPhoto(STAGE_GALLERY[0]);
    }
  };

  const handlePrevPhoto = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(STAGE_GALLERY[currentIndex - 1]);
    } else {
      setSelectedPhoto(STAGE_GALLERY[STAGE_GALLERY.length - 1]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080A] text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[500px] bg-volt/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#E5A83B]/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#12121A] hover:bg-volt hover:text-black text-slate-300 border border-white/10 hover:border-volt font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>KEMBALI KE BERANDA</span>
          </button>
        </div>

        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-4 shadow-volt-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>OFFICIAL PRESS KIT & STAGE ARCHIVE</span>
          </div>

          <h1 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white mb-4">
            STAGE <span className="text-volt">GALLERY</span>
          </h1>

          <p className="font-mono text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Kumpulan dokumentasi panggung, foto resmi promotor, festival headline, dan visual aset beresolusi tinggi DJ Noka AxL untuk keperluan media, flyer event, dan publikasi.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 max-w-xl mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0E0E14] border border-white/5">
              <span className="block font-kanit font-black text-xl sm:text-2xl text-volt">
                {STAGE_GALLERY.length}+
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                Foto Resmi
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0E0E14] border border-white/5">
              <span className="block font-kanit font-black text-xl sm:text-2xl text-white">
                4K UHD
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                Resolusi Media
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0E0E14] border border-white/5">
              <span className="block font-kanit font-black text-xl sm:text-2xl text-[#E5A83B]">
                2026
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                Asia Tour
              </span>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery Grid with Filter */}
        <GalleryGrid
          photos={STAGE_GALLERY}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Bottom Booking Prompt Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0E0E14] via-[#141420] to-[#0E0E14] border border-volt/20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-volt/5 pointer-events-none" />
          <h2 className="font-kanit font-black text-2xl sm:text-4xl uppercase tracking-wider text-white mb-3">
            BUTUH MATERI PROMOSI ATAU BOOKING SHOW?
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Hubungi langsung manajemen resmi DJ Noka AxL untuk ketersediaan jadwal tour, rider teknis, atau custom flyer aset.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-full bg-volt hover:bg-volt-light text-black font-kanit font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,208,0,0.4)] active:scale-95"
              >
                KIRIM INQUIRY BOOKING
              </button>
            )}
            <a
              href={ARTIST_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              CHAT WHATSAPP (+62 819-0777-9998)
            </a>
          </div>
        </div>
      </div>

      {/* Full Resolution Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        hasNext={STAGE_GALLERY.length > 1}
        hasPrev={STAGE_GALLERY.length > 1}
      />
    </div>
  );
};
