import React, { useState } from 'react';
import { MapPin, Flame, Eye, ChevronRight, Settings, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import { CalendarEvent } from '../types';
import { FadeIn } from './common/FadeIn';

interface EventCalendarSectionProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const MONTH_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'
];

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Helper to get exact current time in WIB (Western Indonesian Time / GMT+7)
const getWIBNow = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 7);
};

export const EventCalendarSection: React.FC<EventCalendarSectionProps> = ({
  events,
  onSelectEvent,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const wibNow = getWIBNow();
  const [activeYear, setActiveYear] = useState<number>(wibNow.getFullYear());
  const [activeMonth, setActiveMonth] = useState<number>(wibNow.getMonth()); // 0-indexed (8 = Sept)
  const [filterMode, setFilterMode] = useState<'ALL' | 'GIGS_ONLY' | 'WEEKENDS' | 'INTERNATIONAL'>('ALL');

  // Days in selected month (e.g. 30 in Sept, 31 in Oct)
  const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();

  // Map events by day number
  const eventsByDay: Record<number, CalendarEvent> = {};
  events.forEach((ev) => {
    eventsByDay[ev.day] = ev;
  });

  // Generate dynamic days array for active month
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const dateObj = new Date(activeYear, activeMonth, dayNumber);
    const dayOfWeek = DAY_NAMES[dateObj.getDay()];
    const event = eventsByDay[dayNumber] || null;
    const isWeekend = dayOfWeek === 'FRI' || dayOfWeek === 'SAT' || dayOfWeek === 'SUN';
    const isInternational = event ? event.country !== 'Indonesia' : false;
    const isToday =
      activeYear === wibNow.getFullYear() &&
      activeMonth === wibNow.getMonth() &&
      dayNumber === wibNow.getDate();

    return {
      day: dayNumber,
      dayOfWeek,
      event,
      isWeekend,
      isInternational,
      isToday,
    };
  });

  const filteredDays = calendarDays.filter((item) => {
    if (filterMode === 'GIGS_ONLY') return item.event !== null;
    if (filterMode === 'WEEKENDS') return item.isWeekend;
    if (filterMode === 'INTERNATIONAL') return item.isInternational && item.event !== null;
    return true;
  });

  const totalGigsCount = Object.keys(eventsByDay).length;

  const nextMonth = () => {
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear((prev) => prev + 1);
    } else {
      setActiveMonth((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear((prev) => prev - 1);
    } else {
      setActiveMonth((prev) => prev - 1);
    }
  };

  const resetToWIBCurrent = () => {
    const now = getWIBNow();
    setActiveYear(now.getFullYear());
    setActiveMonth(now.getMonth());
  };

  return (
    <section id="calendar" className="relative w-full py-24 sm:py-32 bg-[#0A0A0E] px-4 sm:px-8 md:px-12 border-b border-white/5">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-volt/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeIn delay={0}>
            {/* Live WIB Badge & Month Navigator */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase shadow-volt-sm">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>WIB LIVE AUTOMATED CALENDAR // {MONTH_NAMES[activeMonth]} {activeYear}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full p-1">
                <button
                  onClick={prevMonth}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous Month"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={resetToWIBCurrent}
                  className="px-2 py-0.5 text-[10px] font-mono text-slate-400 hover:text-volt uppercase font-bold"
                  title="Reset to current month in WIB"
                >
                  NOW (WIB)
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next Month"
                  title="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
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
              <span className="chrome-heading">{MONTH_NAMES[activeMonth]} TOUR CALENDAR</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Live automated schedule synchronized with Asia/Jakarta (WIB) real-time clock. Automatically transitions when the month flips. Click any date to inspect flyer poster and location map.
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
              FULL {daysInMonth} DAYS
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

        {/* Dynamic Days Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredDays.map((item, index) => {
            const hasEvent = item.event !== null;

            if (hasEvent && item.event) {
              const ev = item.event;
              return (
                <FadeIn
                  key={item.day}
                  delay={(index % 12) * 0.03}
                  className="h-full"
                >
                  <div
                    onClick={() => onSelectEvent(ev)}
                    className={`group relative h-full min-h-[170px] sm:min-h-[190px] rounded-2xl bg-[#111118] hover:bg-[#161622] border transition-all duration-300 p-4 flex flex-col justify-between cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-volt-sm hover:-translate-y-1 ${
                      item.isToday
                        ? 'border-volt shadow-[0_0_20px_rgba(212,255,0,0.25)] ring-1 ring-volt'
                        : 'border-volt/50 hover:border-volt'
                    }`}
                  >
                    {/* Top Glow bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-volt via-cyan-400 to-volt" />

                    {/* Header: Date Number, Month Tag & Today Indicator */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-kanit font-black text-2xl sm:text-3xl text-white group-hover:text-volt transition-colors">
                          {item.day < 10 ? `0${item.day}` : item.day}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                          {MONTH_SHORT[activeMonth]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.isToday && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-volt text-black font-black uppercase tracking-wider flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>TODAY</span>
                          </span>
                        )}
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                          item.isWeekend ? 'bg-volt/20 text-volt border border-volt/30' : 'bg-white/10 text-slate-300'
                        }`}>
                          {item.dayOfWeek}
                        </span>
                      </div>
                    </div>

                    {/* Middle: Club & City */}
                    <div className="my-2">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-volt mb-1 uppercase tracking-wider line-clamp-1">
                        <Flame className="w-3 h-3 shrink-0" />
                        <span className="truncate">{ev.eventTitle}</span>
                      </div>
                      <h4 className="font-kanit font-black text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-volt transition-colors line-clamp-1">
                        {ev.clubName}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{ev.city}</span>
                      </div>
                    </div>

                    {/* Bottom: Status & Quick Action */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-1.5 py-0.5 rounded uppercase font-bold ${
                        ev.ticketStatus === 'SOLD OUT'
                          ? 'text-red-400 bg-red-500/10'
                          : ev.ticketStatus === 'FEW TICKETS'
                          ? 'text-amber-400 bg-amber-500/10'
                          : 'text-emerald-400 bg-emerald-500/10'
                      }`}>
                        {ev.ticketStatus}
                      </span>

                      <div className="flex items-center gap-1 text-volt group-hover:translate-x-0.5 transition-transform font-bold">
                        <span>DETAIL</span>
                        <Eye className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            }

            // Open date / Available date
            return (
              <FadeIn
                key={item.day}
                delay={(index % 12) * 0.03}
                className="h-full"
              >
                <div
                  onClick={onOpenBooking}
                  className={`group relative h-full min-h-[170px] sm:min-h-[190px] rounded-2xl bg-[#09090D] hover:bg-[#0E0E14] border transition-all duration-300 p-4 flex flex-col justify-between cursor-pointer ${
                    item.isToday
                      ? 'border-volt/70 ring-1 ring-volt/40 shadow-[0_0_15px_rgba(212,255,0,0.15)]'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Header: Date Number, Month & Day */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-kanit font-bold text-xl sm:text-2xl text-slate-600 group-hover:text-slate-300 transition-colors">
                        {item.day < 10 ? `0${item.day}` : item.day}
                      </span>
                      <span className="text-[9px] font-mono text-slate-600 uppercase">
                        {MONTH_SHORT[activeMonth]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.isToday && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-volt font-bold uppercase">
                          TODAY
                        </span>
                      )}
                      <span className="text-[9px] font-mono text-slate-600 uppercase">
                        {item.dayOfWeek}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Open date text */}
                  <div className="my-2">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                      AVAILABLE DATE
                    </span>
                    <span className="text-xs font-kanit text-slate-400 group-hover:text-volt transition-colors font-medium">
                      Open for Booking
                    </span>
                  </div>

                  {/* Bottom: Inquire Action */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors">
                    <span>INQUIRE</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-volt" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Banner Note */}
        <FadeIn delay={0.2} className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <div className="w-2 h-2 rounded-full bg-volt animate-ping" />
            <span>Automated perpetual calendar synced with WIB (GMT+7). Confirmed gigs are highlighted; open dates are available for festival and club booking inquiries.</span>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-volt hover:bg-volt-hover text-black font-kanit font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-volt-sm"
          >
            REQUEST EVENT DATE
          </button>
        </FadeIn>
      </div>
    </section>
  );
};
