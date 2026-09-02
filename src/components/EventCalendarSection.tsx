import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Flame, Eye, ShieldCheck, ChevronRight, Settings } from 'lucide-react';
import { CalendarEvent } from '../types';
import { FadeIn } from './common/FadeIn';

interface EventCalendarSectionProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const EventCalendarSection: React.FC<EventCalendarSectionProps> = ({
  events,
  onSelectEvent,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'GIGS_ONLY' | 'WEEKENDS' | 'INTERNATIONAL'>('ALL');

  // Map events by day number
  const eventsByDay: Record<number, CalendarEvent> = {};
  events.forEach((ev) => {
    eventsByDay[ev.day] = ev;
  });

  // Days in October: 31 days. Oct 1, 2026 is Thursday.
  const daysOfWeek = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
  
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNumber = i + 1;
    const dayOfWeekIndex = i % 7;
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    const event = eventsByDay[dayNumber] || null;
    const isWeekend = dayOfWeek === 'FRI' || dayOfWeek === 'SAT' || dayOfWeek === 'SUN';
    const isInternational = event ? event.country !== 'Indonesia' : false;

    return {
      day: dayNumber,
      dayOfWeek,
      event,
      isWeekend,
      isInternational
    };
  });

  const filteredDays = calendarDays.filter((item) => {
    if (filterMode === 'GIGS_ONLY') return item.event !== null;
    if (filterMode === 'WEEKENDS') return item.isWeekend;
    if (filterMode === 'INTERNATIONAL') return item.isInternational && item.event !== null;
    return true;
  });

  const totalGigsCount = Object.keys(eventsByDay).length;

  return (
    <section id="calendar" className="relative w-full py-24 sm:py-32 bg-[#0A0A0E] px-4 sm:px-8 md:px-12 border-b border-white/5">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-volt/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeIn delay={0}>
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>30-DAY MONTHLY SCHEDULE // OCTOBER 2026</span>
              </div>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-volt text-[11px] font-mono tracking-wider uppercase transition-colors"
                title="Management Event Editor"
              >
                <Settings className="w-3 h-3" />
                <span>MANAGE GIGS</span>
              </button>
            </div>
            <h2 className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              <span className="chrome-heading">CLUB & GIG CALENDAR</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Live database of verified headline gigs and festival dates. Click any column to inspect flyer poster and location map.
            </p>
          </FadeIn>

          {/* Filter Pills */}
          <FadeIn delay={0.1} className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                filterMode === 'ALL'
                  ? 'bg-volt text-black font-bold shadow-volt-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              FULL 31 DAYS
            </button>
            <button
              onClick={() => setFilterMode('GIGS_ONLY')}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                filterMode === 'GIGS_ONLY'
                  ? 'bg-volt text-black font-bold shadow-volt-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              CONFIRMED SHOWS ({totalGigsCount})
            </button>
            <button
              onClick={() => setFilterMode('WEEKENDS')}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                filterMode === 'WEEKENDS'
                  ? 'bg-volt text-black font-bold shadow-volt-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              WEEKEND PEAKS
            </button>
            <button
              onClick={() => setFilterMode('INTERNATIONAL')}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                filterMode === 'INTERNATIONAL'
                  ? 'bg-volt text-black font-bold shadow-volt-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              INTERNATIONAL ASIA
            </button>
          </FadeIn>
        </div>

        {/* 30/31-Day Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {filteredDays.map((item) => {
            const hasEvent = item.event !== null;
            const event = item.event;

            if (hasEvent && event) {
              return (
                <div
                  key={item.day}
                  onClick={() => onSelectEvent(event)}
                  className="group relative rounded-2xl border border-volt/50 bg-[#12121A] hover:bg-[#181824] p-3.5 sm:p-4 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(212,255,0,0.2)] hover:border-volt select-none"
                >
                  {/* Top Bar with Date & Live Radar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-kanit font-black text-2xl sm:text-3xl text-white group-hover:text-volt transition-colors">
                        {item.day < 10 ? `0${item.day}` : item.day}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-volt uppercase">
                        {item.dayOfWeek}
                      </span>
                    </div>

                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-volt" />
                    </span>
                  </div>

                  {/* Club & Event Info */}
                  <div className="my-2">
                    <span className="text-[9px] font-mono tracking-widest text-volt/80 uppercase block truncate">
                      {event.city}
                    </span>
                    <h4 className="font-kanit font-black text-sm sm:text-base text-white uppercase leading-tight line-clamp-2 group-hover:text-volt transition-colors">
                      {event.clubName}
                    </h4>
                  </div>

                  {/* Bottom Action / View Details hint */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-white">
                    <span className="truncate max-w-[100px]">{event.genre.split('/')[0]}</span>
                    <span className="text-volt font-bold flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      <span>FLYER</span>
                    </span>
                  </div>
                </div>
              );
            }

            // Off-tour / Studio session day
            return (
              <div
                key={item.day}
                className="rounded-2xl border border-white/5 bg-[#09090D] p-3.5 sm:p-4 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between opacity-50 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-kanit font-bold text-xl sm:text-2xl text-slate-600">
                      {item.day < 10 ? `0${item.day}` : item.day}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 uppercase">
                      {item.dayOfWeek}
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>

                <div className="my-2">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block">
                    HQ / LAB
                  </span>
                  <p className="text-xs font-mono text-slate-500 uppercase leading-tight">
                    Studio Session // ID Production
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[9px] font-mono text-slate-600">
                  PRIVATE LAB
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Calendar Summary Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-volt/10 border border-volt/30 text-volt">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">MONTHLY DATES</span>
                <span className="font-kanit font-black text-xl text-white">{totalGigsCount} CONFIRMED SHOWS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">ACTIVE CITIES</span>
                <span className="font-kanit font-black text-xl text-white">6 CITIES • 3 NATIONS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">TICKETING</span>
                <span className="font-kanit font-black text-xl text-white">100% VERIFIED VENUES</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-8 py-3.5 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-volt-hover shadow-volt-sm transition-all shrink-0"
          >
            <span>BOOK PROMOTER DATE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
