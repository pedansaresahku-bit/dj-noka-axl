import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Ticket, Navigation, MessageSquare, Sparkles, Disc3, Share2 } from 'lucide-react';
import { CalendarEvent } from '../types';
import { ARTIST_INFO } from '../data/djData';

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!event) return null;

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      `Hi NOKA AXL Management, I would like to reserve VIP tickets / inquiry about: ${event.eventTitle} at ${event.clubName} on ${event.dateStr}.`
    );
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.eventTitle} - DJ NOKA AXL`,
        text: `Catch NOKA AXL Live at ${event.clubName} (${event.city}) on ${event.dateStr}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Catch NOKA AXL Live at ${event.clubName} (${event.city}) on ${event.dateStr}! Location: ${event.googleMapsUrl}`
      );
      alert('Event details copied to clipboard!');
    }
  };

  const statusColors = {
    'AVAILABLE': 'text-volt border-volt/40 bg-volt/10',
    'FEW TICKETS': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    'SOLD OUT': 'text-rose-500 border-rose-500/40 bg-rose-500/10',
    'GUESTLIST ONLY': 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    'VIP EXCLUSIVE': 'text-purple-400 border-purple-400/40 bg-purple-400/10',
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
            className="relative w-full max-w-4xl bg-[#0E0E14] border border-white/15 rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 max-h-[92vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-volt hover:border-volt transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Event Flyer Poster with Badges */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
                    <img
                      src={event.flyerImage}
                      alt={`${event.clubName} Event Flyer`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Top Overlay Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md font-bold ${statusColors[event.ticketStatus]}`}>
                        {event.ticketStatus}
                      </span>
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[10px] font-mono text-volt tracking-widest uppercase">
                        OFFICIAL TOUR FLYER
                      </p>
                      <h4 className="font-kanit font-black text-xl sm:text-2xl text-white uppercase leading-tight mt-0.5">
                        {event.clubName}
                      </h4>
                    </div>
                  </div>

                  {/* Pricing / Pass Bar */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">ENTRY / TICKET TIER</span>
                      <span className="font-kanit font-bold text-sm sm:text-base text-volt">{event.ticketPrice}</span>
                    </div>
                    <button
                      onClick={handleShare}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="Share Event"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Full Event & Venue Dossier */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Header Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{event.genre}</span>
                    </div>

                    <h3 className="font-kanit font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight mb-2">
                      {event.eventTitle}
                    </h3>

                    <p className="text-sm font-mono text-slate-300 leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Metadata Key Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">DATE</span>
                          <span className="font-kanit font-bold text-sm text-white">{event.dateStr}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">TIME & SET SCHEDULE</span>
                          <span className="font-kanit font-bold text-sm text-white">{event.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Address with Google Maps Button */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">VENUE & LOCATION</span>
                          <span className="font-kanit font-bold text-sm sm:text-base text-white">{event.clubName}</span>
                          <p className="text-xs font-mono text-slate-400 mt-0.5">{event.venueAddress}, {event.city}, {event.country}</p>
                        </div>
                      </div>

                      <a
                        href={event.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-volt hover:text-black border border-white/15 text-slate-200 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shrink-0"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>OPEN MAPS</span>
                      </a>
                    </div>

                    {/* Supporting Lineup */}
                    {event.supportingDJs && event.supportingDJs.length > 0 && (
                      <div className="mb-6">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                          LINEUP & SUPPORTING DJS
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-volt text-black font-kanit font-bold text-xs uppercase flex items-center gap-1">
                            <Disc3 className="w-3.5 h-3.5 animate-spin-slow" />
                            NOKA AXL (HEADLINER)
                          </span>
                          {event.supportingDJs.map((dj, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs uppercase">
                              {dj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={handleWhatsAppBooking}
                      className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-volt-hover shadow-volt-sm transition-all"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>RESERVE VIP TABLE / PASS</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-volt font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400 inline mr-1.5" />
                      <span>INQUIRE BOOKING</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
