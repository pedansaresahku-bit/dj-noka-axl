import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Lock,
  Upload,
  Calendar,
  CheckCircle2,
  LogOut,
  Mail,
  Clock,
  Sparkles,
  Building,
  Radio,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { CalendarEvent } from '../../types';
import { api } from '../../services/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventsUpdated: () => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onEventsUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'events' | 'inquiries'>('events');

  // Events Management State
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Minimalist Form State
  const [formDay, setFormDay] = useState<number>(2);
  const [formDateStr, setFormDateStr] = useState<string>('Wednesday, 02 September 2026');
  const [formRawDate, setFormRawDate] = useState<string>('2026-09-02');
  const [formClubName, setFormClubName] = useState<string>('');
  const [formEventTitle, setFormEventTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (api.isAuthenticated()) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setIsAuthenticated(false);
      }
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

  // Helper to handle date picker changes and auto-calculate day & date string
  const handleDateChange = (dateVal: string) => {
    setFormRawDate(dateVal);
    if (!dateVal) return;
    try {
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);

        const dayName = DAY_NAMES[dateObj.getDay()] || 'Day';
        const monthName = MONTH_NAMES[month] || 'September';
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        
        setFormDay(day);
        setFormDateStr(`${dayName}, ${formattedDay} ${monthName} ${year}`);
      }
    } catch {}
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
    setFilePreview('/assets/image-1.jpeg');
    setFormDay(2);
    setFormRawDate('2026-09-02');
    setFormDateStr('Wednesday, 02 September 2026');
    setFormClubName('');
    setFormEventTitle('');
    setFormDescription('');
    setIsFormOpen(true);
  };

  const openEditForm = (ev: CalendarEvent) => {
    setEditingEventId(ev.id);
    setSelectedFile(null);
    setFilePreview(ev.flyerImage || '/assets/image-1.jpeg');
    setFormDay(ev.day || 1);
    setFormDateStr(ev.dateStr || `Day ${ev.day} September 2026`);
    setFormClubName(ev.clubName || '');
    setFormEventTitle(ev.eventTitle || '');
    setFormDescription(ev.description || '');

    // Try to infer raw date from dateStr or default to September 2026
    const dayStr = (ev.day || 1) < 10 ? `0${ev.day || 1}` : `${ev.day || 1}`;
    setFormRawDate(`2026-09-${dayStr}`);
    setIsFormOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let flyerImageUrl = filePreview || '/assets/image-1.jpeg';
    if (selectedFile) {
      try {
        flyerImageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(selectedFile);
        });
      } catch {}
    }

    const payload = {
      day: formDay || 1,
      dateStr: formDateStr || `Day ${formDay || 1} September 2026`,
      clubName: formClubName.trim() || 'CLUB VENUE',
      eventTitle: formEventTitle.trim() || 'NOKA AXL LIVE',
      city: 'Indonesia',
      country: 'Indonesia',
      venueAddress: formClubName.trim(),
      time: '22:00 - Late',
      genre: 'Breakbeat / Mainstage Techno',
      ticketStatus: 'AVAILABLE' as const,
      ticketPrice: 'IDR 250,000',
      description: formDescription.trim(),
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(formClubName || '')}`,
      flyerImage: flyerImageUrl,
      supportingDJs: [],
    };

    let res;
    if (editingEventId) {
      res = await api.updateEvent(editingEventId, payload);
    } else {
      res = await api.createEvent(payload);
    }

    setLoading(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsFormOpen(false);
      setSelectedFile(null);
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
          {/* Modal Backdrop (Locked focus - does not close on accidental outside click when logged in) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isAuthenticated) onClose();
            }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-default"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-4xl bg-[#0E0E14] border border-white/15 rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors font-mono text-xs uppercase"
                    title="Logout & Close CMS"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>LOG OUT</span>
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
                /* Admin PIN Authentication Screen */
                <div className="max-w-md mx-auto py-12 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt mx-auto mb-6 shadow-volt-sm">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-kanit font-black text-2xl sm:text-3xl uppercase tracking-wide text-white mb-2">
                    MANAGEMENT ACCESS ONLY
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mb-8">
                    Masukan password manajemen untuk mengakses panel kelola event & jadwal DJ Noka AxL.
                  </p>

                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="masukan password anda disini"
                      className="w-full text-center px-6 py-4 rounded-2xl bg-black/60 border border-white/20 text-white font-mono text-base sm:text-lg tracking-widest focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-all placeholder:text-slate-500 placeholder:text-sm placeholder:tracking-normal"
                      autoFocus
                    />
                    {authError && (
                      <p className="text-rose-400 font-mono text-xs">{authError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-volt text-black font-kanit font-bold text-sm tracking-wider uppercase hover:bg-volt-hover transition-all shadow-volt-sm active:scale-98"
                    >
                      LOGIN CMS
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated CMS Dashboard */
                <div>
                  {/* Top Bar Tabs & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
                      <span>Changes successfully synchronized with Cloudflare D1 SQL database!</span>
                    </div>
                  )}

                  {/* Tab 1: Events Manager */}
                  {activeTab === 'events' && (
                    <>
                      {isFormOpen ? (
                        /* Minimalist Create / Edit Event Form */
                        <form onSubmit={handleSaveEvent} className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h4 className="font-kanit font-black text-xl text-white uppercase tracking-wide flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-volt" />
                              <span>{editingEventId ? 'EDIT EVENT DETAILS' : 'ADD NEW EVENT'}</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => setIsFormOpen(false)}
                              className="text-xs font-mono text-slate-400 hover:text-white"
                            >
                              CANCEL
                            </button>
                          </div>

                          {/* Row 1: Day of Month & Date Picker Combobox */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            <div className="sm:col-span-4">
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-volt" />
                                <span>DAY OF MONTH (1 - 31) *</span>
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="31"
                                required
                                value={formDay}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value, 10) || 1;
                                  setFormDay(val);
                                  const dStr = val < 10 ? `0${val}` : `${val}`;
                                  setFormRawDate(`2026-09-${dStr}`);
                                  setFormDateStr(`Day ${val} September 2026`);
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>

                            <div className="sm:col-span-8">
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-volt" />
                                  <span>DATE PICKER / COMBOBOX *</span>
                                </span>
                                <span className="text-[10px] text-volt">Auto-Calculates Day</span>
                              </label>
                              <div className="relative flex items-center">
                                <input
                                  type="date"
                                  value={formRawDate}
                                  onChange={(e) => handleDateChange(e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt [color-scheme:dark]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Formatted Date String Preview */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                              DISPLAY DATE STRING (FORMATTED)
                            </label>
                            <input
                              type="text"
                              required
                              value={formDateStr}
                              onChange={(e) => setFormDateStr(e.target.value)}
                              placeholder="e.g. Wednesday, 02 September 2026"
                              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                            />
                          </div>

                          {/* Row 3: Club Name & Event Head Title */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                                <Building className="w-3.5 h-3.5 text-volt" />
                                <span>CLUB / VENUE NAME *</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formClubName}
                                onChange={(e) => setFormClubName(e.target.value)}
                                placeholder="e.g. W CLUB SAMARINDA"
                                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                                <Radio className="w-3.5 h-3.5 text-volt" />
                                <span>EVENT HEADLINE TITLE *</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formEventTitle}
                                onChange={(e) => setFormEventTitle(e.target.value)}
                                placeholder="e.g. Breaks Dealer"
                                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt"
                              />
                            </div>
                          </div>

                          {/* Row 4: Flyer Poster Upload & Preview */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center gap-5">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black border border-white/15 shrink-0 flex items-center justify-center relative group">
                              {filePreview ? (
                                <img src={filePreview} alt="Flyer Preview" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-500" />
                              )}
                            </div>

                            <div className="flex-1 w-full text-center sm:text-left">
                              <span className="block text-[11px] font-mono text-volt uppercase tracking-wider mb-1">
                                UPLOAD EVENT FLYER POSTER IMAGE
                              </span>
                              <p className="text-xs font-mono text-slate-400 mb-3">
                                Upload a high-resolution festival flyer or stage photo (PNG, JPG, WebP).
                              </p>

                              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-volt hover:text-black text-white font-kanit font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border border-white/10">
                                <Upload className="w-3.5 h-3.5" />
                                <span>CHOOSE IMAGE FILE...</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>
                              {selectedFile && (
                                <span className="ml-3 text-xs font-mono text-slate-300">
                                  {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Row 5: Description (Optional) */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              <span>DESCRIPTION (OPTIONAL)</span>
                            </label>
                            <textarea
                              rows={2}
                              value={formDescription}
                              onChange={(e) => setFormDescription(e.target.value)}
                              placeholder="Add special notes, guest details, or event highlights..."
                              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-volt resize-none"
                            />
                          </div>

                          {/* Submit Actions */}
                          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => setIsFormOpen(false)}
                              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-kanit text-xs font-bold uppercase tracking-wider"
                            >
                              CANCEL
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className="px-6 py-2.5 rounded-xl bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider hover:bg-volt-hover shadow-volt-sm transition-all disabled:opacity-50"
                            >
                              {loading ? 'SAVING TO D1 SQL...' : editingEventId ? 'UPDATE EVENT' : 'PUBLISH EVENT'}
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* Events List Cards */
                        <div className="flex flex-col gap-3">
                          {events.length === 0 ? (
                            <div className="p-12 text-center rounded-2xl bg-black/30 border border-white/10">
                              <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                              <p className="text-slate-400 font-mono text-sm mb-4">No events registered yet.</p>
                              <button
                                onClick={openCreateForm}
                                className="px-5 py-2 rounded-xl bg-volt text-black font-kanit font-bold text-xs uppercase tracking-wider shadow-volt-sm"
                              >
                                CREATE FIRST EVENT
                              </button>
                            </div>
                          ) : (
                            events.map((ev) => (
                              <div
                                key={ev.id}
                                className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-white/20 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-white/15 shrink-0">
                                    <img src={ev.flyerImage || '/assets/image-1.jpeg'} alt={ev.clubName} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="px-2 py-0.5 rounded bg-volt/10 text-volt text-[10px] font-mono font-bold">
                                        DAY {ev.day < 10 ? `0${ev.day}` : ev.day}
                                      </span>
                                      <span className="text-[11px] font-mono text-slate-400">
                                        {ev.dateStr}
                                      </span>
                                    </div>
                                    <h5 className="font-kanit font-black text-sm sm:text-base text-white uppercase">
                                      {ev.clubName} — <span className="text-volt">{ev.eventTitle}</span>
                                    </h5>
                                    {ev.description && (
                                      <p className="text-[11px] font-mono text-slate-400 line-clamp-1 mt-0.5">
                                        {ev.description}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => openEditForm(ev)}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-volt border border-white/10 transition-colors"
                                    title="Edit Event"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(ev.id, ev.clubName)}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors"
                                    title="Delete Event"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Tab 2: Promoter Inquiries */}
                  {activeTab === 'inquiries' && (
                    <div className="flex flex-col gap-3">
                      {inquiries.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-black/30 border border-white/10">
                          <Mail className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 font-mono text-sm">No promoter booking inquiries received yet.</p>
                        </div>
                      ) : (
                        inquiries.map((inq: any) => (
                          <div
                            key={inq.id}
                            className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-kanit font-black text-sm text-white uppercase">
                                  {inq.promoterName}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-volt/10 text-volt text-[10px] font-mono">
                                  {inq.eventType}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">
                                {new Date(inq.createdAt || Date.now()).toLocaleDateString('id-ID')}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
                              <div><span className="text-slate-400 block text-[10px]">EMAIL:</span> {inq.email}</div>
                              <div><span className="text-slate-400 block text-[10px]">PHONE/WA:</span> {inq.phone}</div>
                              <div><span className="text-slate-400 block text-[10px]">DATE:</span> {inq.eventDate}</div>
                              <div><span className="text-slate-400 block text-[10px]">BUDGET:</span> {inq.budgetTier}</div>
                            </div>

                            {inq.message && (
                              <p className="text-xs font-mono text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                "{inq.message}"
                              </p>
                            )}
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
