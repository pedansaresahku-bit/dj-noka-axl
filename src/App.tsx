import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { DiscographySection } from './components/DiscographySection';
import { StageCarouselSection } from './components/StageCarouselSection';
import { EventCalendarSection } from './components/EventCalendarSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { EPKRiderModal } from './components/EPKRiderModal';
import { EventDetailModal } from './components/EventDetailModal';
import { AdminModal } from './components/admin/AdminModal';
import { CalendarEvent } from './types';
import { api } from './services/api';
import { scrollToTarget, pauseScroll, resumeScroll } from './utils/smoothScroll';
import { MessageCircle } from 'lucide-react';
import { ARTIST_INFO } from './data/djData';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [epkModalOpen, setEpkModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);

  const isAnyModalOpen = bookingModalOpen || epkModalOpen || adminModalOpen || selectedEvent !== null;

  useEffect(() => {
    if (isAnyModalOpen) {
      pauseScroll();
    } else {
      resumeScroll();
    }
  }, [isAnyModalOpen]);

  const fetchEventsData = async () => {
    const data = await api.fetchEvents();
    setEventsList(data);
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  // Keyboard shortcut (Alt + A or Ctrl + Shift + A) to open Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenBooking = () => setBookingModalOpen(true);
  const handleCloseBooking = () => setBookingModalOpen(false);

  const handleOpenEPK = () => setEpkModalOpen(true);
  const handleCloseEPK = () => setEpkModalOpen(false);

  const handleOpenAdmin = () => setAdminModalOpen(true);
  const handleCloseAdmin = () => setAdminModalOpen(false);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
  };

  const handleScrollToTracks = () => {
    scrollToTarget('#tracks', -40);
  };

  return (
    <div className="relative min-h-screen bg-[#08080A] text-white selection:bg-volt selection:text-black font-kanit overflow-x-clip">
      {/* HUD Floating Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenEPK={handleOpenEPK}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Kinetic Hero with Video Background */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExploreTracks={handleScrollToTracks}
        />

        {/* 2. Dual Stage & Sound Marquee */}
        <MarqueeSection />

        {/* 3. Sonic Manifesto & Artist About */}
        <AboutSection
          onOpenBooking={handleOpenBooking}
          onOpenEPK={handleOpenEPK}
        />

        {/* 4. Discography & Interactive Audio Player */}
        <DiscographySection />

        {/* 5. 3D Perspective Stage Carousel */}
        <StageCarouselSection />

        {/* 6. Interactive 30-Day Club & Festival Calendar */}
        <EventCalendarSection
          events={eventsList}
          onSelectEvent={handleSelectEvent}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={handleOpenAdmin}
        />
      </main>

      {/* 8. High-End Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenEPK={handleOpenEPK}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Event Details & Flyer Pop-up Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={handleCloseEventDetail}
        onOpenBooking={handleOpenBooking}
      />

      {/* Interactive Booking Inquiry Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
      />

      {/* EPK & Technical Rider Modal */}
      <EPKRiderModal
        isOpen={epkModalOpen}
        onClose={handleCloseEPK}
      />

      {/* Admin Event Management CMS Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdmin}
        onEventsUpdated={fetchEventsData}
      />

      {/* Floating Quick WhatsApp Contact Button */}
      <a
        href={ARTIST_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Manager DJ Dina via WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-kanit font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-black" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-volt rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-volt rounded-full" />
        </div>
        <span className="hidden sm:inline">HUBUNGI KAMI</span>
      </a>
    </div>
  );
};

export default App;
