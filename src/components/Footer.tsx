import React from 'react';
import { ArrowUp, Disc, Music2, Instagram, Youtube, Sparkles, Mail, MessageSquare } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';
import { Magnet } from './common/Magnet';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEPK: () => void;
  onOpenAdmin?: () => void;
}

// Custom TikTok SVG Icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.04.87.12V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.9-4.5V8.65a8.33 8.33 0 0 0 4.77 1.52V6.69h-1z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenEPK, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050507] text-white pt-20 pb-12 px-4 sm:px-8 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-volt/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Call to Action Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-16 mb-16 gap-8">
          <div>
            <span className="text-xs font-mono text-volt tracking-widest uppercase mb-2 block">
              WORLDWIDE FESTIVAL & CLUB BOOKINGS
            </span>
            <h2 className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              LET'S IGNITE YOUR NEXT STAGE
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Magnet padding={40} strength={3}>
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-full bg-volt text-black font-kanit font-bold text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-volt-hover transition-all shadow-volt-md active:scale-95"
              >
                <span>BOOK DJ NOKA AXL</span>
                <Sparkles className="w-4 h-4 text-black/70" />
              </button>
            </Magnet>

            <Magnet padding={40} strength={4}>
              <button
                onClick={onOpenEPK}
                className="px-8 py-4 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-white/50 font-kanit font-bold text-sm tracking-wider uppercase transition-all backdrop-blur-sm"
              >
                TECHNICAL RIDER
              </button>
            </Magnet>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-volt/50 p-0.5 bg-black">
                <img src="/assets/icon.png" alt="NOKA AXL Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="font-kanit font-black text-2xl tracking-wider text-white">
                NOKA AXL
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm leading-relaxed mb-6">
              Indonesian Breakbeat & Jungle Dutch Pioneer. Crafting unyielding bass frequencies, stadium anthems, and peak-time rave euphoria worldwide.
            </p>
            {/* 5 Verified Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={ARTIST_INFO.socialLinks.spotify}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                title="Spotify: NOKA AXL"
              >
                <Disc className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.socialLinks.soundCloud}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                title="SoundCloud: NK BOUNCE"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                title="Instagram: @nokaaxlofficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                title="TikTok: @nokaaxlofficial"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                title="YouTube: @NokaAxL"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-mono text-volt uppercase tracking-widest mb-4">NAVIGATION</h4>
            <ul className="flex flex-col gap-2 text-xs font-kanit font-medium text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors uppercase">Sonic Manifesto</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors uppercase">Discography Releases</a></li>
              <li><a href="#tour" className="hover:text-white transition-colors uppercase">World Tour Itinerary</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors uppercase">30-Day Club Calendar</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors uppercase">Press Kit Gallery</a></li>
            </ul>
          </div>

          {/* Management Col */}
          <div>
            <h4 className="text-xs font-mono text-volt uppercase tracking-widest mb-4">DIRECT MANAGEMENT</h4>
            <div className="flex flex-col gap-3 text-xs font-mono text-slate-300">
              <a
                href={`mailto:${ARTIST_INFO.managementEmail}`}
                className="flex items-center gap-2 hover:text-volt transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-volt" />
                <span>{ARTIST_INFO.managementEmail}</span>
              </a>
              <a
                href={`https://wa.me/${ARTIST_INFO.whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-volt transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Management Desk</span>
              </a>
              <span className="text-[10px] text-slate-500 mt-2">
                Timezone: GMT+7 (Jakarta / Bali)
              </span>
            </div>
          </div>
        </div>

        {/* Giant Bottom Headline & Copyright */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500 uppercase">
            <span>© 2026 NOKA AXL. ALL RIGHTS RESERVED. RECORDINGS PRODUCED BY AXL SOUND LABS.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-volt transition-colors flex items-center gap-1 underline underline-offset-4 decoration-white/20 hover:decoration-volt"
            >
              MANAGEMENT CMS LOGIN (ALT + A)
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-volt transition-colors group p-2 rounded-full border border-white/5 hover:border-volt/30"
          >
            <span className="uppercase tracking-widest text-[10px]">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
