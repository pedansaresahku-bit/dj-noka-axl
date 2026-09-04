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

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [epkModalOpen, setEpkModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);

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
    const el = document.getElementById('tracks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    </div>
  );
};

export default App;
