import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, AlertCircle, Instagram, Sparkles, MessageCircle } from 'lucide-react';
import { ARTIST_INFO, RATECARD_INFO, RIDERS_INFO } from '../data/djData';

interface EPKRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPKRiderModal: React.FC<EPKRiderModalProps> = ({ isOpen, onClose }) => {
  const handleDownloadPDF = () => {
    const content = `=====================================================
NOKA AXL — OFFICIAL RATECARD & RIDERS 2026
Artist: ${ARTIST_INFO.name}
Title: ${ARTIST_INFO.title}
Manager: ${ARTIST_INFO.managerName} (${ARTIST_INFO.managerPhone})
WhatsApp: ${ARTIST_INFO.whatsappFormatted}
Instagram DM: ${ARTIST_INFO.socialLinks.instagram}
Management Desk: ${ARTIST_INFO.managementEmail}
=====================================================

[ BOOKING & PERFORMANCE SCOPE ]
- JAKARTA & METROPOLITAN AREA
- BANDUNG & REGIONAL EVENT
- LUAR KOTA / NATIONAL & ASIA FESTIVAL TOUR

* Rate resmi disesuaikan dengan skala acara, lokasi, dan tanggal penampilan.
* Hubungi Manager DJ Noka AxL (+62 819-0777-9998 - Dina) untuk penawaran resmi.

-----------------------------------------------------
[ OFFICIAL RIDERS ]
- 2 TICKET ( GARUDA / CITILINK )
- HOTEL 4 / 5 STARS 1 ROOMS NON SMOKING
- 1 Bottle Martel / Cordigo
- 5 Mineral Water
- Snack & Fruits
- MEAL ALLOWANCE 2 PACK
- DOWN PAYMENT 20 %
- FULL PAYMENT H - 1

-----------------------------------------------------
[ TECHNICAL DECK SETUP ]
- 4x Pioneer CDJ-3000 (Linked via LAN Hub)
- 1x Pioneer DJM-V10 or DJM-900NXS2 Mixer
- 2x Heavy-Duty Stereo Booth Monitors (L-Acoustics / d&b)

For booking confirmation & official contract:
Manager Contact: +62 819-0777-9998 (Dina)
WhatsApp Link  : ${ARTIST_INFO.whatsappUrl}
Instagram DM   : ${ARTIST_INFO.socialLinks.instagram}
Email          : ${ARTIST_INFO.managementEmail}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NOKA_AXL_Riders_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-2xl bg-[#0E0E14] border border-volt/30 rounded-3xl sm:rounded-[36px] p-5 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,255,0,0.15)] z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-volt hover:border-volt transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6 pr-10">
              <div className="p-3 rounded-2xl bg-volt/10 border border-volt/30 text-volt shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-volt tracking-widest uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-volt" />
                  CONFIDENTIAL PROMOTER DOSSIER 2026
                </span>
                <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  RATECARD & RIDERS
                </h3>
              </div>
            </div>

            {/* Direct DJ Manager Official Contact Card */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#09090D] via-[#101018] to-[#09090D] border border-emerald-500/40 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.12)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                        OFFICIAL DJ MANAGER CONTACT
                      </span>
                    </div>
                    <h4 className="font-kanit font-black text-xl text-white uppercase">
                      {ARTIST_INFO.managerName} <span className="text-xs font-mono text-slate-400 font-normal">(Manager DJ Noka AxL)</span>
                    </h4>
                    <p className="text-xs font-mono text-slate-300">
                      WhatsApp: <a href={ARTIST_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">{ARTIST_INFO.managerPhone}</a>
                    </p>
                  </div>
                </div>

                <a
                  href={ARTIST_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>HUBUNGI VIA WA</span>
                </a>
              </div>
            </div>

            {/* Section 1: PERFORMANCE SCOPE */}
            <div className="mb-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
                <div className="inline-block bg-black border-2 border-white px-3 py-1 shadow-[3px_3px_0px_rgba(255,255,255,1)]">
                  <h4 className="font-kanit font-black text-base sm:text-lg text-white uppercase tracking-wider">
                    JANGKAUAN EVENT & PENAMPILAN
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-volt uppercase font-bold tracking-wider">
                  RATE : HUBUNGI MANAGEMENT
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RATECARD_INFO.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative bg-black/70 border-2 border-white/80 rounded-xl p-4 flex flex-col justify-between hover:border-volt transition-all group shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-[4px_4px_0px_#D4FF00]"
                  >
                    <div>
                      <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest">
                        {item.city}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="font-kanit font-bold text-base sm:text-lg text-volt tracking-tight group-hover:scale-105 transition-transform">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 uppercase">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: RIDERS */}
            <div className="mb-6">
              <div className="inline-block bg-black border-2 border-white px-3 py-1 mb-3.5 shadow-[3px_3px_0px_rgba(255,255,255,1)]">
                <h4 className="font-kanit font-black text-base sm:text-lg text-white uppercase tracking-wider">
                  RIDERS
                </h4>
              </div>

              <div className="bg-black/50 border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col gap-2.5">
                {RIDERS_INFO.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start sm:items-center justify-between gap-3 p-2.5 rounded-xl border transition-colors ${
                      item.highlight
                        ? 'bg-volt/[0.04] border-volt/30 text-white'
                        : 'bg-white/[0.02] border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          item.highlight ? 'text-volt' : 'text-slate-400'
                        }`}
                      />
                      <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wide text-white">
                        {item.desc}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 shrink-0">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlighted Note Banner */}
            <div className="mb-6 border-2 border-red-500/80 bg-red-950/30 rounded-xl p-3.5 flex items-center gap-3 shadow-[3px_3px_0px_rgba(239,68,68,0.3)]">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="font-mono font-bold text-xs sm:text-sm text-red-200 uppercase tracking-wide">
                NOTE : {RIDERS_INFO.note}
              </p>
            </div>

            {/* Technical Deck Hardware Note */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3.5 mb-6 text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-volt font-bold uppercase">STANDARD DECK HARDWARE:</span> 4x Pioneer CDJ-3000 + 1x DJM-V10 / 900NXS2 + 2x Stereo Booth Monitors.
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
                Official Document • DJ Noka AxL Management 2026
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={ARTIST_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>WA DINA</span>
                </a>

                <a
                  href={ARTIST_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <Instagram className="w-4 h-4" />
                  <span>DM IG</span>
                </a>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-volt-hover transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD TXT</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
