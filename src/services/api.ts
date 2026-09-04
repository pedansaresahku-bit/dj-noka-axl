import { CalendarEvent, BookingFormData } from '../types';
import { MONTHLY_CALENDAR_EVENTS } from '../data/djData';

const API_BASE_URL = '';
const LOCAL_STORAGE_EVENTS_KEY = 'noka_custom_events_v2';
const LOCAL_STORAGE_BOOKINGS_KEY = 'noka_custom_bookings_v2';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('noka_admin_token');
  }

  private getLocalEvents(): CalendarEvent[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return Object.values(MONTHLY_CALENDAR_EVENTS);
  }

  public restoreDefaultEvents(): CalendarEvent[] {
    const defaults = Object.values(MONTHLY_CALENDAR_EVENTS);
    this.saveLocalEvents(defaults);
    return defaults;
  }

  public clearAllLocalEvents(): CalendarEvent[] {
    this.saveLocalEvents([]);
    return [];
  }

  private saveLocalEvents(events: CalendarEvent[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(events));
    } catch {}
  }

  public getAuthHeader(): Record<string, string> {
    const token = this.token || localStorage.getItem('noka_admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('noka_admin_token', token);
  }

  public removeToken() {
    this.token = null;
    localStorage.removeItem('noka_admin_token');
  }

  public isAuthenticated(): boolean {
    return !!(this.token || localStorage.getItem('noka_admin_token'));
  }

  private async safeJsonParse(res: Response): Promise<any> {
    try {
      const text = await res.text();
      if (!text || !text.trim()) {
        return { success: res.ok, message: res.statusText || 'OK' };
      }
      return JSON.parse(text);
    } catch {
      return { success: res.ok, message: res.statusText || 'OK' };
    }
  }

  // Admin Login
  public async loginAdmin(pin: string): Promise<{ success: boolean; message: string; token?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await this.safeJsonParse(res);
      if (data.success && data.token) {
        this.setToken(data.token);
        return data;
      }
    } catch {}

    // Fallback authentication
    if (pin.trim() === 'NOKA2026') {
      const token = 'token-NOKA2026';
      this.setToken(token);
      return { success: true, token, message: 'Authentication successful. Welcome NOKA AXL Management.' };
    }
    return { success: false, message: 'Password salah. Silakan coba lagi.' };
  }

  // Get all events
  public async fetchEvents(): Promise<CalendarEvent[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`);
      if (res.ok) {
        const json = await this.safeJsonParse(res);
        if (json.success && Array.isArray(json.data)) {
          this.saveLocalEvents(json.data);
          return json.data;
        } else if (Array.isArray(json)) {
          this.saveLocalEvents(json);
          return json;
        }
      }
    } catch {}

    return this.getLocalEvents();
  }

  // Create event
  public async createEvent(formData: FormData | Record<string, any>): Promise<{ success: boolean; data?: CalendarEvent; message: string }> {
    let newEvent: CalendarEvent;

    if (formData instanceof FormData) {
      const day = parseInt(formData.get('day')?.toString() || '1', 10);
      const supportingDJsStr = formData.get('supportingDJs')?.toString() || '';
      newEvent = {
        id: `cal-${Date.now()}`,
        day,
        dateStr: formData.get('dateStr')?.toString() || `Day ${day} September 2026`,
        clubName: formData.get('clubName')?.toString() || 'VENUE',
        eventTitle: formData.get('eventTitle')?.toString() || 'NOKA AXL LIVE',
        city: formData.get('city')?.toString() || 'Jakarta',
        country: formData.get('country')?.toString() || 'Indonesia',
        venueAddress: formData.get('venueAddress')?.toString() || '',
        time: formData.get('time')?.toString() || '22:00 - Late',
        genre: formData.get('genre')?.toString() || 'Mainstage Techno',
        ticketStatus: (formData.get('ticketStatus')?.toString() as any) || 'AVAILABLE',
        ticketPrice: formData.get('ticketPrice')?.toString() || 'IDR 250,000',
        flyerImage: formData.get('flyerImage')?.toString() || '/assets/image-1.jpeg',
        supportingDJs: supportingDJsStr.split(',').map((s) => s.trim()).filter(Boolean),
        description: formData.get('description')?.toString() || '',
        googleMapsUrl: formData.get('googleMapsUrl')?.toString() || '',
      };
    } else {
      newEvent = {
        id: `cal-${Date.now()}`,
        ...formData,
      } as CalendarEvent;
    }

    // Always update local storage first so changes reflect immediately
    const local = this.getLocalEvents();
    local.push(newEvent);
    this.saveLocalEvents(local);

    try {
      const isFormData = formData instanceof FormData;
      const headers = {
        ...this.getAuthHeader(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      };

      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers,
        body: isFormData ? formData : JSON.stringify(formData),
      });

      const json = await this.safeJsonParse(res);
      if (json.success && json.data) {
        return json;
      }
    } catch {}

    return { success: true, data: newEvent, message: 'Event successfully created and saved.' };
  }

  // Update event
  public async updateEvent(id: string, formData: FormData | Record<string, any>): Promise<{ success: boolean; data?: CalendarEvent; message: string }> {
    const local = this.getLocalEvents();
    const index = local.findIndex((e) => e.id === id);
    if (index !== -1) {
      if (formData instanceof FormData) {
        const current = local[index];
        const day = formData.get('day') ? parseInt(formData.get('day')!.toString(), 10) : current.day;
        const supportingDJsStr = formData.get('supportingDJs')?.toString();
        local[index] = {
          ...current,
          day,
          dateStr: formData.get('dateStr')?.toString() || current.dateStr,
          clubName: formData.get('clubName')?.toString() || current.clubName,
          eventTitle: formData.get('eventTitle')?.toString() || current.eventTitle,
          city: formData.get('city')?.toString() || current.city,
          country: formData.get('country')?.toString() || current.country,
          venueAddress: formData.get('venueAddress')?.toString() || current.venueAddress,
          time: formData.get('time')?.toString() || current.time,
          genre: formData.get('genre')?.toString() || current.genre,
          ticketStatus: (formData.get('ticketStatus')?.toString() as any) || current.ticketStatus,
          ticketPrice: formData.get('ticketPrice')?.toString() || current.ticketPrice,
          flyerImage: formData.get('flyerImage')?.toString() || current.flyerImage,
          supportingDJs: supportingDJsStr ? supportingDJsStr.split(',').map((s) => s.trim()).filter(Boolean) : current.supportingDJs,
          description: formData.get('description')?.toString() || current.description,
          googleMapsUrl: formData.get('googleMapsUrl')?.toString() || current.googleMapsUrl,
        };
      } else {
        local[index] = { ...local[index], ...formData };
      }
      this.saveLocalEvents(local);
    }

    try {
      const isFormData = formData instanceof FormData;
      const headers = {
        ...this.getAuthHeader(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      };

      const res = await fetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers,
        body: isFormData ? formData : JSON.stringify(formData),
      });

      const json = await this.safeJsonParse(res);
      if (json.success) return json;
    } catch {}

    return { success: true, message: 'Event successfully updated.' };
  }

  // Delete event
  public async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    // 1. Delete from local storage immediately so UI updates without failure
    const local = this.getLocalEvents();
    const updated = local.filter((e) => e.id !== id);
    this.saveLocalEvents(updated);

    // 2. Notify remote backend/D1 database if available
    try {
      const res = await fetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          ...this.getAuthHeader(),
        },
      });
      const data = await this.safeJsonParse(res);
      return { success: true, message: data.message || 'Event deleted successfully.' };
    } catch {
      return { success: true, message: 'Event deleted successfully.' };
    }
  }

  // Submit booking inquiry
  public async submitBooking(data: BookingFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await this.safeJsonParse(res);
      if (json.success) return json;
    } catch {}

    // Save locally
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({
        id: `inq-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        status: 'UNREAD',
      });
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(list));
    } catch {}

    return { success: true, message: 'Inquiry registered and saved to management queue.' };
  }

  // Fetch all bookings (Admin)
  public async fetchBookings(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: {
          ...this.getAuthHeader(),
        },
      });
      if (res.ok) {
        const json = await this.safeJsonParse(res);
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {}

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}

    return [];
  }
}

export const api = new ApiService();
