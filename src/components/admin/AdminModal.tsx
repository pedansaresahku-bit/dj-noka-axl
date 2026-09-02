import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { api } from '../../services/api';
import { CalendarEvent } from '../../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onEventsUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'events' | 'inquiries'>('events');

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State for Adding / Editing Event
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    day: 1,
    dateStr: '',
    clubName: '',
    eventTitle: '',
    city: 'Jakarta',
    country: 'Indonesia',
    venueAddress: '',
    time: '22:00 - 04:00 (Set: 01:00)',
    genre: 'Mainstage Techno',
    ticketStatus: 'AVAILABLE',
    ticketPrice: 'IDR 250,000',
    flyerImage: '/assets/image-1.jpeg',
    supportingDJs: [],
    description: '',
    googleMapsUrl: '',
  });

  useEffect(() => {
    if (api.isAuthenticated()) {
      setIsAuthenticated(true);
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    const eventList = await api.fetchEvents();
    setEvents(eventList);
    const bookingList = await api.fetchBookings();
    setInquiries(bookingList);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await api.loginAdmin(pinInput);
    if (res.success) {
      setIsAuthenticated(true);
      setPinInput('');
      loadData();
    } else {
      setAuthError(res.message || 'Incorrect PIN');
    }
  };

  const handleLogout = () => {
    api.removeToken();
    setIsAuthenticated(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const openCreateForm = () => {
    setEditingEventId(null);
    setSelectedFile(null);
    setFilePreview(null);
    setFormData({
      day: 15,
      dateStr: 'Tuesday, 15 September 2026',
      clubName: '',
      eventTitle: '',
      city: 'Jakarta',
      country: 'Indonesia',
      venueAddress: '',
      time: '22:00 - Late (Headline Set: 01:00)',
      genre: 'Hard Techno / Future Bass',
      ticketStatus: 'AVAILABLE',
      ticketPrice: 'IDR 300,000',
      flyerImage: '/assets/image-1.jpeg',
      supportingDJs: ['Cyber Echo'],
      description: '',
      googleMapsUrl: '',
    });
    setIsFormOpen(true);
  };

  const openEditForm = (ev: CalendarEvent) => {
    setEditingEventId(ev.id);
    setSelectedFile(null);
    setFilePreview(ev.flyerImage);
    setFormData({ ...ev });
    setIsFormOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('day', formData.day?.toString() || '1');
    data.append('dateStr', formData.dateStr || `Day ${formData.day} September 2026`);
    data.append('clubName', formData.clubName || 'Club Venue');
    data.append('eventTitle', formData.eventTitle || 'NOKA AXL LIVE');
    data.append('city', formData.city || 'Jakarta');
    data.append('country', formData.country || 'Indonesia');
    data.append('venueAddress', formData.venueAddress || '');
    data.append('time', formData.time || '22:00 - Late');
    data.append('genre', formData.genre || 'Mainstage Techno');
    data.append('ticketStatus', formData.ticketStatus || 'AVAILABLE');
    data.append('ticketPrice', formData.ticketPrice || 'IDR 250,000');
    data.append('description', formData.description || '');
    data.append('googleMapsUrl', formData.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(formData.clubName || '')}`);
    
    if (Array.isArray(formData.supportingDJs)) {
      data.append('supportingDJs', formData.supportingDJs.join(', '));
    } else if (typeof formData.supportingDJs === 'string') {
      data.append('supportingDJs', formData.supportingDJs);
    }

    if (selectedFile) {
      data.append('flyerFile', selectedFile);
    } else if (formData.flyerImage) {
      data.append('flyerImage', formData.flyerImage);
    }

    let res;
    if (editingEventId) {
      res = await api.updateEvent(editingEventId, data);
    } else {
      res = await api.createEvent(data);
    }

    setLoading(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsFormOpen(false);
      loadData();
      onEventsUpdated();
    } else {
      alert(res.message || 'Failed to save event');
    }
  };

  const handleDeleteEvent = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the event at "${name}"?`)) return;
    setLoading(true);
    const res = await api.deleteEvent(id);
    setLoading(false);
    if (res.success) {
      loadData();
      onEventsUpdated();
    } else {
      alert(res.message || 'Failed to delete event');
    }
  };

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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-5xl bg-[#0E0E14] border border-white/15 rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-kanit font-black text-lg sm:text-xl text-white uppercase tracking-wider">
                      NOKA AXL // MANAGEMENT CMS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-volt/10 text-volt text-[10px] font-mono border border-volt/30">
                      FULL STACK
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Live Event & Promoter Management Dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto p-5 sm:p-8 flex-1">
              {!isAuthenticated ? (
                /* Step 1: Security PIN Login */
                <div className="max-w-md mx-auto py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-volt/10 border border-volt/40 flex items-center justify-center text-volt mb-4">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-kanit font-black text-2xl text-white uppercase tracking-wider">
                    ENTER ADMIN PIN
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 mb-6">
                    Enter the management security code to manage 30-day events and promoter bookings.
                  </p>

                  <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                    <div>
                      <input
                        type="password"
                        required
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Enter PIN (Default: NOKA2026)"
                        className="w-full text-center px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white font-mono text-base tracking-widest focus:outline-none focus:border-volt transition-colors"
                      />
                      {authError && (
                        <p className="text-xs font-mono text-rose-400 mt-2 flex items-center justify-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{authError}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-volt text-black font-kanit font-bold text-sm tracking-wider uppercase hover:bg-volt-hover shadow-volt-sm transition-all"
                    >
                      AUTHENTICATE SESSION
                    </button>
                  </form>
                </div>
              ) : (
                /* Step 2: Full Admin Dashboard */
                <div>
                  {/* Dashboard Nav Tabs */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('events');
                          setIsFormOpen(false);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                          activeTab === 'events'
                            ? 'bg-volt text-black font-bold shadow-volt-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        CLUB & GIG CALENDAR ({events.length})
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('inquiries');
                          setIsFormOpen(false);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                          activeTab === 'inquiries'
                            ? 'bg-volt text-black font-bold shadow-volt-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        PROMOTER INQUIRIES ({inquiries.length})
                      </button>
                    </div>

                    {activeTab === 'events' && !isFormOpen && (
                      <button
                        onClick={openCreateForm}
                        className="px-4 py-2 rounded-xl bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-volt-hover shadow-volt-sm transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ADD NEW EVENT</span>
                      </button>
                    )}
                  </div>

                  {saveSuccess && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Changes successfully synchronized with backend database!</span>
                    </div>
                  )}

                  {/* Tab 1: Events Manager */}
                  {activeTab === 'events' && (
                    <>
                      {isFormOpen ? (
                        /* Create / Edit Event Form */
                        <form onSubmit={handleSaveEvent} className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h4 className="font-kanit font-black text-xl text-white uppercase tracking-wide">
                              {editingEventId ? 'EDIT EVENT DETAILS' : 'ADD NEW CLUB / FESTIVAL EVENT'}
                            </h4>
                            <button
                              type="button"
                              onClick={() => setIsFormOpen(false)}
                              className="text-xs font-mono text-slate-400 hover:text-white"
                            >
                              CANCEL
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                DAY OF MONTH (1 - 31) *
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="31"
                                required
                                value={formData.day || 1}
                                onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value, 10) })}
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                DATE STRING *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.dateStr || ''}
                                onChange={(e) => setFormData({ ...formData, dateStr: e.target.value })}
                                placeholder="e.g. Saturday, 12 September 2026"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                CLUB / FESTIVAL VENUE NAME *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.clubName || ''}
                                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                                placeholder="e.g. SAVAYA BALI / COLOSSEUM"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                EVENT HEADLINE TITLE *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.eventTitle || ''}
                                onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                                placeholder="e.g. NEO HORIZON SUNSET RESIDENCY"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                CITY
                              </label>
                              <input
                                type="text"
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="e.g. Uluwatu, Bali"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                COUNTRY
                              </label>
                              <input
                                type="text"
                                value={formData.country || ''}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                placeholder="e.g. Indonesia / Japan"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                DJ SET TIME / DOORS
                              </label>
                              <input
                                type="text"
                                value={formData.time || ''}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                placeholder="e.g. 21:00 - Late (Set: 01:30)"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                TICKET STATUS
                              </label>
                              <select
                                value={formData.ticketStatus}
                                onChange={(e) => setFormData({ ...formData, ticketStatus: e.target.value as any })}
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              >
                                <option value="AVAILABLE">AVAILABLE</option>
                                <option value="FEW TICKETS">FEW TICKETS</option>
                                <option value="SOLD OUT">SOLD OUT</option>
                                <option value="VIP EXCLUSIVE">VIP EXCLUSIVE</option>
                                <option value="GUESTLIST ONLY">GUESTLIST ONLY</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                TICKET PRICE / TIER
                              </label>
                              <input
                                type="text"
                                value={formData.ticketPrice || ''}
                                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                                placeholder="e.g. IDR 350,000 / VIP Sofa"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                                GENRE / VIBE
                              </label>
                              <input
                                type="text"
                                value={formData.genre || ''}
                                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                placeholder="e.g. Hard Techno / Future Bass"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                          </div>

                          {/* Flyer Upload & Preview */}
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-black border border-white/15 shrink-0 flex items-center justify-center">
                              {filePreview ? (
                                <img src={filePreview} alt="Flyer Preview" className="w-full h-full object-cover" />
                              ) : (
                                <Upload className="w-8 h-8 text-slate-500" />
                              )}
                            </div>

                            <div className="flex-1">
                              <span className="block text-[11px] font-mono text-volt uppercase tracking-wider mb-1">
                                UPLOAD EVENT FLYER POSTER IMAGE
                              </span>
                              <p className="text-xs font-mono text-slate-400 mb-3">
                                Upload a high-resolution festival flyer or stage photo (PNG, JPG, WebP up to 10MB).
                              </p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-volt hover:text-black border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
                              >
                                CHOOSE IMAGE FILE...
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                              VENUE ADDRESS & GOOGLE MAPS LINK
                            </label>
                            <input
                              type="text"
                              value={formData.venueAddress || ''}
                              onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                              placeholder="Full street address (e.g. Jl. Senopati No. 74, Jakarta Selatan)"
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt mb-2"
                            />
                            <input
                              type="url"
                              value={formData.googleMapsUrl || ''}
                              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                              placeholder="Google Maps URL (e.g. https://maps.google.com/?q=...)"
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                              EVENT DESCRIPTION & RAVE NOTES
                            </label>
                            <textarea
                              rows={3}
                              value={formData.description || ''}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder="Tell ravers what to expect (lasers, special IDs, duration, age limit...)"
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt resize-none"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => setIsFormOpen(false)}
                              className="px-6 py-3 rounded-full border border-white/20 text-slate-300 hover:text-white font-kanit font-bold text-xs uppercase tracking-wider"
                            >
                              CANCEL
                            </button>

                            <button
                              type="submit"
                              disabled={loading}
                              className="px-8 py-3 rounded-full bg-volt text-black font-kanit font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-volt-hover shadow-volt-sm flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              <span>{editingEventId ? 'UPDATE EVENT' : 'PUBLISH EVENT TO CALENDAR'}</span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* Events Table / List */
                        <div className="flex flex-col gap-3">
                          {events.map((ev) => (
                            <div
                              key={ev.id}
                              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-white/15 shrink-0">
                                  <img src={ev.flyerImage} alt={ev.clubName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-kanit font-bold text-sm text-volt uppercase bg-volt/10 px-2 py-0.5 rounded border border-volt/20">
                                      SEPT {ev.day < 10 ? `0${ev.day}` : ev.day}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                                      {ev.city}, {ev.country}
                                    </span>
                                  </div>
                                  <h5 className="font-kanit font-bold text-base text-white uppercase mt-0.5">
                                    {ev.clubName} — {ev.eventTitle}
                                  </h5>
                                  <p className="text-[11px] font-mono text-slate-400">
                                    {ev.time} • {ev.ticketStatus} ({ev.ticketPrice})
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  onClick={() => openEditForm(ev)}
                                  className="p-2.5 rounded-xl bg-white/5 hover:bg-volt hover:text-black border border-white/10 text-slate-300 transition-colors"
                                  title="Edit Event"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(ev.id, ev.clubName)}
                                  className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500 hover:text-white border border-white/10 text-rose-400 transition-colors"
                                  title="Delete Event"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Tab 2: Inquiries Manager */}
                  {activeTab === 'inquiries' && (
                    <div className="flex flex-col gap-4">
                      {inquiries.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 font-mono text-xs">
                          No promoter booking inquiries yet. Submissions from the booking modal will appear here.
                        </div>
                      ) : (
                        inquiries.map((inq) => (
                          <div key={inq.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 mb-3 gap-2">
                              <div>
                                <h5 className="font-kanit font-bold text-base text-white uppercase">
                                  {inq.promoterName}
                                </h5>
                                <p className="text-xs font-mono text-volt">
                                  {inq.email} • {inq.phone || 'No phone provided'}
                                </p>
                              </div>
                              <span className="px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-[10px] font-mono uppercase font-bold self-start sm:self-auto">
                                {inq.eventType} ({inq.budgetTier})
                              </span>
                            </div>

                            <div className="text-xs font-mono text-slate-300 mb-3">
                              <p><strong>Target Date:</strong> {inq.eventDate || 'TBD'}</p>
                              <p><strong>Location:</strong> {inq.venueLocation || 'TBD'}</p>
                              <p className="mt-2 text-slate-400 italic">"{inq.message}"</p>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                              <a
                                href={`mailto:${inq.email}?subject=NOKA%20AXL%20Booking%20Inquiry%20Confirmation`}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase"
                              >
                                REPLY VIA EMAIL
                              </a>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
