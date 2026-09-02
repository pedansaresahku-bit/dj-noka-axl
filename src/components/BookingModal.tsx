import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARTIST_INFO } from '../data/djData';
import { BookingFormData } from '../types';
import { api } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    promoterName: '',
    email: '',
    phone: '',
    eventType: 'Festival Mainstage',
    eventDate: '',
    venueLocation: '',
    estimatedAttendance: '5,000 - 15,000',
    budgetTier: '$10k - $25k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4FF00', '#FFFFFF', '#00F0FF', '#7928CA'],
    });

    // Submit to backend
    await api.submitBooking(formData);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi NOKA AXL Management, I would like to inquire about booking DJ Noka AxL for an upcoming event:\n\nType: ${formData.eventType}\nDate: ${formData.eventDate || 'TBD'}\nLocation: ${formData.venueLocation || 'TBD'}`
    );
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-2xl bg-[#0E0E14] border border-white/15 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-volt hover:border-volt transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-volt/20 border border-volt flex items-center justify-center text-volt mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
                  BOOKING REQUEST DISPATCHED
                </h3>
                <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-md">
                  Thank you! NOKA AXL Management has received your inquiry. We will review availability and respond within 24 hours.
                </p>
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-volt-hover transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>CONNECT VIA WHATSAPP</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-3 rounded-full border border-white/20 text-slate-300 hover:text-white font-kanit font-semibold text-xs sm:text-sm tracking-wider uppercase"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-[10px] font-mono tracking-widest uppercase mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>OFFICIAL ARTIST BOOKING 2026</span>
                  </div>
                  <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    BOOK DJ NOKA AXL
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Direct festival bookings, club headlines, private VIP sets, and international tours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        PROMOTER / AGENCY NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.promoterName}
                        onChange={(e) => setFormData({ ...formData, promoterName: e.target.value })}
                        placeholder="e.g. Ultra Worldwide / LiveNation"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="promoter@agency.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        EVENT TYPE
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      >
                        <option value="Festival Mainstage">Festival Mainstage</option>
                        <option value="Club Headline">Club Headline</option>
                        <option value="International Tour">International Tour</option>
                        <option value="Private VIP">Private VIP / Exclusive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        EVENT DATE (ESTIMATED)
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        CITY & VENUE LOCATION
                      </label>
                      <input
                        type="text"
                        value={formData.venueLocation}
                        onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                        placeholder="e.g. Jakarta, JIExpo Arena"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        BUDGET BRACKET
                      </label>
                      <select
                        value={formData.budgetTier}
                        onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors"
                      >
                        <option value="Under $10k">Regional Club ($5k - $10k)</option>
                        <option value="$10k - $25k">Standard Festival ($10k - $25k)</option>
                        <option value="$25k - $50k">Headline Arena ($25k - $50k)</option>
                        <option value="$50k+">Full World Tour Package ($50k+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      ADDITIONAL TECHNICAL / RIDER NOTES
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify stage setup, expected set time, guest count, or special requirements..."
                      className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-volt transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/15 hover:border-volt text-slate-300 hover:text-white font-kanit font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>FAST WHATSAPP CHAT</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-volt-hover shadow-volt-md active:scale-95 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
