import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';
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
Management Desk: ${ARTIST_INFO.managementEmail} | WA: ${ARTIST_INFO.whatsappNumber}
=====================================================

[ RATECARD ]
- JAKARTA     : 8 JT (Rp 8.000.000)
- BANDUNG     : 10 JT (Rp 10.000.000)
- LUAR KOTA   : 15 JT (Rp 15.000.000)

* NOTE: UNTUK RATE LUAR KOTA MENYESUAIKAN JARAK TEMPUH

-----------------------------------------------------
[ OFFICIAL RIDERS ]
- 2 TICKET ( GARUDA / CITYLINK )
- HOTEL 4 / 5 STARS 1 ROOMS NON SMOKING
- 1 Bottle Martel / Cordigo
- 5 Mineral Water
- Snack & Fruits
- MEAL ALLOWANCE 2 PACK ( 500 RB )
- DOWN PAYMENT 20 %
- FULL PAYMENT H - 1

-----------------------------------------------------
[ TECHNICAL DECK SETUP ]
- 4x Pioneer CDJ-3000 (Linked via LAN Hub)
- 1x Pioneer DJM-V10 or DJM-900NXS2 Mixer
- 2x Heavy-Duty Stereo Booth Monitors (L-Acoustics / d&b)

For booking confirmation & official contract:
WhatsApp: ${ARTIST_INFO.whatsappNumber}
Email   : ${ARTIST_INFO.managementEmail}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NOKA_AXL_Ratecard_Riders_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappInquiryUrl = `https://wa.me/${ARTIST_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
    'Halo Management DJ Noka AxL, saya ingin menanyakan booking jadwal event & konfirmasi riders.'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

            {/* Section 1: RATECARD */}
            <div className="mb-7">
              <div className="inline-block bg-black border-2 border-white px-3 py-1 mb-3.5 shadow-[3px_3px_0px_rgba(255,255,255,1)]">
                <h4 className="font-kanit font-black text-base sm:text-lg text-white uppercase tracking-wider">
                  RATECARD
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RATECARD_INFO.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative bg-black/70 border-2 border-white/80 rounded-xl p-4 flex flex-col justify-between hover:border-volt transition-all group shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-[4px_4px_0px_#D4FF00]"
                  >
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest">
                      {item.city}
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-kanit font-black text-2xl sm:text-3xl text-volt tracking-tight group-hover:scale-105 transition-transform">
                        {item.price}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
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

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>BOOK VIA WHATSAPP</span>
                </a>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-volt-hover transition-all active:scale-95"
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
