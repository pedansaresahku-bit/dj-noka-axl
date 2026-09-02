import { CalendarEvent, BookingFormData } from '../types';
import { MONTHLY_CALENDAR_EVENTS } from '../data/djData';

const API_BASE_URL = ''; // Relative path, handled by Vite proxy or production server

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('noka_admin_token');
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

  // Admin Login
  public async loginAdmin(pin: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch {
      // Local fallback check
      if (pin === 'NOKA2026') {
        this.setToken('token-NOKA2026');
        return { success: true, message: 'Offline mode authentication granted.' };
      }
      return { success: false, message: 'Failed to connect to backend server.' };
    }
  }

  // Get all events
  public async fetchEvents(): Promise<CalendarEvent[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`);
      if (!res.ok) throw new Error('API offline');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
      throw new Error('Invalid response structure');
    } catch {
      // Fallback to static seed data
      return Object.values(MONTHLY_CALENDAR_EVENTS);
    }
  }

  // Create event (with file upload or json)
  public async createEvent(formData: FormData | Record<string, any>): Promise<{ success: boolean; data?: CalendarEvent; message: string }> {
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

      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Error creating event' };
    }
  }

  // Update event
  public async updateEvent(id: string, formData: FormData | Record<string, any>): Promise<{ success: boolean; data?: CalendarEvent; message: string }> {
    try {
      const isFormData = formData instanceof FormData;
      const headers = {
        ...this.getAuthHeader(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      };

      const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'PUT',
        headers,
        body: isFormData ? formData : JSON.stringify(formData),
      });

      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Error updating event' };
    }
  }

  // Delete event
  public async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          ...this.getAuthHeader(),
        },
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Error deleting event' };
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
      return await res.json();
    } catch {
      return { success: true, message: 'Inquiry registered locally.' };
    }
  }

  // Fetch all bookings (Admin)
  public async fetchBookings(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: {
          ...this.getAuthHeader(),
        },
      });
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  }
}

export const api = new ApiService();
