import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight, MapPin, Calendar, Camera } from 'lucide-react';
import { StagePhoto } from '../types';

interface LightboxModalProps {
  photo: StagePhoto | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  hasPrev = true,
  hasNext = true,
}) => {
  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onNext, onPrev, onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative max-w-5xl w-full max-h-[92vh] bg-[#0E0E14] border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with title and Close Button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#08080A]/90 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5A83B]/10 border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B]">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-kanit font-bold text-sm sm:text-base text-white tracking-wide uppercase">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E5A83B]" />
                    {photo.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#E5A83B]" />
                    {photo.year}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#E5A83B] text-slate-300 hover:text-black transition-all border border-white/10 active:scale-90"
              aria-label="Tutup preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Showcase Area */}
          <div className="relative flex-1 w-full min-h-[300px] max-h-[70vh] bg-black/80 flex items-center justify-center overflow-hidden p-2 sm:p-4">
            <img
              src={photo.image}
              alt={photo.title}
              className="max-h-[66vh] max-w-full w-auto object-contain rounded-xl shadow-2xl transition-all select-none"
            />

            {/* Left Nav Arrow */}
            {hasPrev && onPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#E5A83B] text-white hover:text-black transition-all border border-white/20 shadow-lg active:scale-90"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav Arrow */}
            {hasNext && onNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#E5A83B] text-white hover:text-black transition-all border border-white/20 shadow-lg active:scale-90"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-[#08080A]">
            <p className="text-xs text-slate-400 font-mono tracking-wide text-center sm:text-left line-clamp-1">
              {photo.caption || 'Official DJ Noka AxL Press & Stage Visual Archive'}
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={photo.image}
                download={`${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpeg`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5A83B] hover:bg-[#f8be52] text-black font-kanit font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(229,168,59,0.3)] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Foto Resolusi Tinggi</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
