export interface Track {
  id: string;
  title: string;
  featuredArtist?: string;
  bpm: number;
  key: string;
  duration: string;
  genre: string;
  releaseYear: number;
  coverImage: string;
  spotifyUrl: string;
  soundCloudUrl: string;
  beatportUrl: string;
  audioPreviewNote: string; // Frequency pattern or synth preset
  streams: string;
}

export interface TourDate {
  id: string;
  date: string;
  city: string;
  country: string;
  venue: string;
  event: string;
  status: 'AVAILABLE' | 'FEW TICKETS' | 'SOLD OUT' | 'VIP EXCLUSIVE';
  ticketUrl: string;
  badge: string;
  image: string;
}

export interface StagePhoto {
  id: string;
  title: string;
  location: string;
  image: string;
  caption: string;
  year: string;
}

export interface CalendarEvent {
  id: string;
  day: number;
  dateStr: string;
  clubName: string;
  eventTitle: string;
  city: string;
  country: string;
  venueAddress: string;
  time: string;
  genre: string;
  ticketStatus: 'AVAILABLE' | 'FEW TICKETS' | 'SOLD OUT' | 'GUESTLIST ONLY' | 'VIP EXCLUSIVE';
  ticketPrice: string;
  flyerImage: string;
  supportingDJs?: string[];
  description: string;
  googleMapsUrl: string;
}

export interface BookingFormData {
  promoterName: string;
  email: string;
  phone: string;
  eventType: 'Festival Mainstage' | 'Club Headline' | 'Private VIP' | 'Corporate' | 'International Tour';
  eventDate: string;
  venueLocation: string;
  estimatedAttendance: string;
  budgetTier: string;
  message: string;
}
