import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Ticket, Flame, Clock, ArrowUpRight } from 'lucide-react';
import { TOUR_DATES } from '../data/djData';
import { TourDate } from '../types';
import { FadeIn } from './common/FadeIn';

interface TourDatesSectionProps {
  onOpenBooking: () => void;
}

const StackingTourCard: React.FC<{
  tour: TourDate;
  index: number;
  totalCards: number;
  onOpenBooking: () => void;
}> = ({ tour, index, totalCards, onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1]);

  const statusColors = {
    'AVAILABLE': 'text-volt border-volt/40 bg-volt/10',
    'FEW TICKETS': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    'SOLD OUT': 'text-rose-500 border-rose-500/40 bg-rose-500/10',
    'VIP EXCLUSIVE': 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
  };

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
              0{index + 1}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${statusColors[tour.status]}`}>
                  {tour.status}
                </span>
                <span className="text-[10px] font-mono text-volt tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded">
                  {tour.badge}
                </span>
              </div>
              <h3 className="font-kanit font-black text-2xl sm:text-4xl text-white uppercase tracking-wider">
                {tour.city}, {tour.country}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4">
            <div className="flex flex-col text-left lg:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">DATE & VENUE</span>
              <span className="font-kanit font-bold text-sm sm:text-base text-white uppercase">
                {tour.date} // {tour.venue}
              </span>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-8 py-3 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-volt-hover transition-all shadow-volt-sm active:scale-95 shrink-0"
            >
              <Ticket className="w-4 h-4" />
              <span>GET PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Media and Stage Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Stage Image & Detail */}
          <div className="md:col-span-7 h-[220px] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 relative group">
            <img
              src={tour.image}
              alt={`${tour.city} show`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <p className="font-kanit font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  {tour.event}
                </p>
                <p className="text-xs font-mono text-volt tracking-widest uppercase flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {tour.venue}
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
                <span className="text-xs font-mono text-slate-400 uppercase">SET DURATION</span>
                <span className="text-xs font-mono text-white font-bold">90 MIN EXTENDED HEADLINE</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">AUDIO SETUP</span>
                <span className="text-xs font-mono text-white font-bold">FUNKTION-ONE / L-ACOUSTICS</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">VISUAL RIG</span>
                <span className="text-xs font-mono text-volt font-bold">4K LED WALL + 30W RGB LASERS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">SUPPORTING ACTS</span>
                <span className="text-xs font-mono text-white font-bold">CYBER ECHO & GUEST DJS</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-volt" />
                <span>DOORS: 21:00 // SHOW: 01:00</span>
              </div>
              <span className="text-volt font-bold uppercase">18+ ONLY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const TourDatesSection: React.FC<TourDatesSectionProps> = ({ onOpenBooking }) => {
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
              <span>Event Calendar</span>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">Tour September</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="max-w-md text-slate-400 font-mono text-xs sm:text-sm">
            Scroll down to inspect upcoming festival headline stages and exclusive club residencies. VIP tables and promoter bookings available.
          </FadeIn>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative w-full">
          {TOUR_DATES.map((tour, index) => (
            <StackingTourCard
              key={tour.id}
              tour={tour}
              index={index}
              totalCards={TOUR_DATES.length}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
