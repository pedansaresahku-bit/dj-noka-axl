import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';

interface EPKRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPKRiderModal: React.FC<EPKRiderModalProps> = ({ isOpen, onClose }) => {
  const technicalRequirements = [
    {
      category: 'DJ EQUIPMENT (DECK)',
      items: [
        '4x Pioneer CDJ-3000 (Latest Firmware, Linked via Ethernet Hub)',
        '1x Pioneer DJM-V10 or DJM-900NXS2 Mixer',
        '1x Pioneer RMX-1000 Remix Station (Send/Return Setup)',
        '2x Heavy-duty Booth Monitors (L-Acoustics / d&b audiotechnik, Stereo Split)'
      ]
    },
    {
      category: 'STAGE & VISUAL PRODUCTION',
      items: [
        'Live HDMI / SDI feed to Mainstage VJ console for synchronized visual pack',
        'Direct MIDI Clock / SMPTE Timecode sync for Laser & Pyrotechnics cues',
        'CO2 Jets and Stadium Confetti Cannons (Optional but Recommended on Drop)'
      ]
    },
    {
      category: 'HOSPITALITY & LOGISTICS',
      items: [
        '5-Star Hotel Accommodation (Suite room, 24-hour room service)',
        'Private VIP Airport & Venue Ground Transportation (Mercedes-Benz V-Class or equivalent)',
        'Secure Backstage Artist Dressing Room with high-speed Wi-Fi and premium refreshments'
      ]
    }
  ];

  const handleDownloadPDF = () => {
    // Generate a printable/downloadable summary
    const content = `NOKA AXL — OFFICIAL TECHNICAL & HOSPITALITY RIDER 2026\n\nArtist: ${ARTIST_INFO.name}\nGenre: ${ARTIST_INFO.genres.join(', ')}\nManagement: ${ARTIST_INFO.managementEmail}\n\nTECHNICAL SETUP:\n- 4x Pioneer CDJ-3000 Linked\n- 1x Pioneer DJM-V10 Mixer\n- 2x High-Power Stereo Booth Monitors\n\nFor full inquiries: ${ARTIST_INFO.managementEmail}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NOKA_AXL_Technical_Rider_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-3xl bg-[#0E0E14] border border-white/15 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-volt hover:border-volt transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-volt/10 border border-volt/30 text-volt">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-volt tracking-widest uppercase">
                  CONFIDENTIAL PROMOTER DOSSIER
                </span>
                <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  EPK & TECHNICAL RIDER 2026
                </h3>
              </div>
            </div>

            {/* Biography Quick Overview */}
            <div className="bg-black/40 rounded-2xl p-5 border border-white/5 mb-6">
              <h4 className="text-xs font-mono text-volt uppercase tracking-wider mb-2">
                ARTIST BIOGRAPHY SUMMARY
              </h4>
              <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                NOKA AXL is an Indonesian electronic music powerhouse delivering high-voltage festival headline sets spanning Mainstage Techno, Hardstyle Hybrid, and Future Bass. With over 18.4M+ streams and 120+ global festival appearances, NOKA AXL commands supreme dancefloor euphoria.
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="flex flex-col gap-5 mb-8">
              {technicalRequirements.map((req, i) => (
                <div key={i} className="border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
                  <h5 className="font-kanit font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-volt">0{i + 1}.</span>
                    {req.category}
                  </h5>
                  <ul className="flex flex-col gap-2">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Download & Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400">
                Official Document Version 4.2 • Updated 2026
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-volt-hover shadow-volt-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD FULL RIDER</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
