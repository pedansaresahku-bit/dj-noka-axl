import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Flame, Clock, Sparkles } from 'lucide-react';
import { CalendarEvent } from '../types';
import { FadeIn } from './common/FadeIn';

interface TourDatesSectionProps {
  events?: CalendarEvent[];
  onOpenBooking: () => void;
  onSelectEvent?: (event: CalendarEvent) => void;
}

const StackingTourCard: React.FC<{
  event: CalendarEvent;
  index: number;
  totalCards: number;
  onSelectEvent?: (event: CalendarEvent) => void;
}> = ({ event, index, totalCards, onSelectEvent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1]);

  const statusColors: Record<string, string> = {
    'AVAILABLE': 'text-volt border-volt/40 bg-volt/10',
    'FEW TICKETS': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    'SOLD OUT': 'text-rose-500 border-rose-500/40 bg-rose-500/10',
    'VIP EXCLUSIVE': 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    'GUESTLIST ONLY': 'text-purple-400 border-purple-400/40 bg-purple-400/10',
  };

  const statusColorClass = statusColors[event.ticketStatus] || statusColors['AVAILABLE'];

  return (
    <div
      ref={containerRef}
      className="sticky top-28 sm:top-32 w-full flex justify-center mb-12 sm:mb-16"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `${index * 24}px`,
        }}
        className="w-full max-w-6xl rounded-[32px] sm:rounded-[44px] border-2 border-white/15 bg-[#0E0E14] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl relative overflow-hidden"
      >
        {/* Subtle interior glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-volt/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Info Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-kanit font-black text-4xl sm:text-6xl text-slate-600">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${statusColorClass}`}>
                  {event.ticketStatus}
                </span>
                <span className="text-[10px] font-mono text-volt tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded">
                  {event.genre || 'HEADLINE SHOW'}
                </span>
              </div>
              <h3 className="font-kanit font-black text-2xl sm:text-4xl text-white uppercase tracking-wider">
                {event.city}{event.country ? `, ${event.country}` : ''}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4">
            <div className="flex flex-col text-left lg:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">DATE & VENUE</span>
              <span className="font-kanit font-bold text-sm sm:text-base text-white uppercase">
                {event.dateStr} // {event.clubName}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Media and Stage Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Stage Image & Detail */}
          <div
            onClick={() => onSelectEvent && onSelectEvent(event)}
            className="md:col-span-7 h-[220px] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 relative group cursor-pointer"
          >
            <img
              src={event.flyerImage || '/assets/image-1.jpeg'}
              alt={`${event.clubName} show`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <p className="font-kanit font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  {event.eventTitle}
                </p>
                <p className="text-xs font-mono text-volt tracking-widest uppercase flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {event.clubName}
                </p>
              </div>
              <span className="p-2 rounded-full bg-black/60 border border-white/20 text-volt">
                <Flame className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Right Column: Event Telemetry & Set Details */}
          <div className="md:col-span-5 flex flex-col justify-between h-full gap-4 bg-white/[0.03] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">TICKET PRICE</span>
                <span className="text-xs font-mono text-white font-bold">{event.ticketPrice || 'IDR 250,000'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">VENUE / ADDRESS</span>
                <span className="text-xs font-mono text-white font-bold truncate max-w-[200px]">{event.venueAddress || event.clubName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">GENRE / VIBE</span>
                <span className="text-xs font-mono text-volt font-bold">{event.genre || 'Mainstage Techno'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">LINEUP / GUESTS</span>
                <span className="text-xs font-mono text-white font-bold truncate max-w-[200px]">
                  {event.supportingDJs && event.supportingDJs.length > 0 ? event.supportingDJs.join(', ') : 'NOKA AXL & Resident DJs'}
                </span>
              </div>
            </div>

            {/* Mandatory bottom telemetry: 22:00 - Late & 18+ ONLY */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <Clock className="w-3.5 h-3.5 text-volt" />
                <span>22:00 - Late</span>
              </div>
              <span className="text-volt font-bold uppercase tracking-wider">18+ ONLY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const TourDatesSection: React.FC<TourDatesSectionProps> = ({ events = [], onOpenBooking, onSelectEvent }) => {
  return (
    <section id="tour" className="relative w-full py-24 sm:py-32 bg-[#08080A] px-4 sm:px-8 md:px-12 border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-volt/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>LIVE TOUR SCHEDULE</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">CONFIRMED DATES</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="max-w-md text-slate-400 font-mono text-xs sm:text-sm">
            Synchronized live from NOKA AXL Cloud Database. Scroll down to inspect upcoming headline stages and exclusive club residencies.
          </FadeIn>
        </div>

        {/* Stacking Cards Container */}
        {events.length > 0 ? (
          <div className="relative w-full">
            {events.map((event, index) => (
              <StackingTourCard
                key={event.id || index}
                event={event}
                index={index}
                totalCards={events.length}
                onSelectEvent={onSelectEvent}
              />
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0E0E14]/80 p-8 sm:p-12 text-center backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt mx-auto mb-4">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-kanit font-black text-2xl sm:text-3xl text-white uppercase tracking-wider mb-2">
                ACCEPTING FESTIVAL & CLUB BOOKINGS
              </h3>
              <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-lg mx-auto mb-6">
                All upcoming tour dates are actively being scheduled. Promoters and event organizers can submit date requests directly to management.
              </p>
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-full bg-volt hover:bg-volt-hover text-black font-kanit font-bold text-sm uppercase tracking-wider shadow-volt-sm transition-all"
              >
                REQUEST BOOKING INQUIRY
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
