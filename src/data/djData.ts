import { Track, TourDate, StagePhoto, CalendarEvent } from '../types';

export const ARTIST_INFO = {
  name: "NOKA AXL",
  title: "INDONESIAN BREAKBEAT PIONEER & ELECTRONIC MUSIC PRODUCER",
  tagline: "ARCHITECT OF BREAKBEAT FULL BASS, JUNGLE DUTCH & VIRAL DANCEFLOOR ANTHEMS",
  bpmRange: "130 — 145 BPM",
  genres: ["BREAKBEAT FULL BASS", "JUNGLE DUTCH", "DISCO BREAKBEAT", "HYBRID EDM", "MAINSTAGE TECHNO"],
  origin: "JAKARTA, INDONESIA // ASIA TOUR",
  status: "NATIONAL & ASIA TOUR 2026 // ACCEPTING BOOKINGS",
  totalStreams: "150M+",
  monthlyListeners: "1.2M+",
  festivalAppearances: "350+",
  yearsActive: "10+ YEARS",
  bioSummary: "Pelopor utama ('Suhu') skena Breakbeat dan Jungle Dutch di Indonesia. Dikenal dengan bassline tebal berkarakter, groove syncopated berkecepatan 135-142 BPM, dan performa panggung legendaris dari Studio 2 MataLelaki hingga festival megaclub Asia.",
  managementEmail: "booking@nokaaxl.com",
  managerName: "Dina",
  managerPhone: "+62 819-0777-9998",
  whatsappNumber: "+6281907779998",
  whatsappFormatted: "+62 819-0777-9998",
  whatsappUrl: "https://wa.me/6281907779998?text=Halo%20Kak%20Dina,%20saya%20tertarik%20untuk%20booking%20DJ%20NOKA%20AXL.%20Mohon%20info%20ketersediaan%20jadwal%20dan%20rate.",
  socialLinks: {
    spotify: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloud: "https://soundcloud.com/nk-bounce",
    instagram: "https://www.instagram.com/nokaaxlofficial/",
    tiktok: "https://www.tiktok.com/@nokaaxlofficial",
    youtube: "https://www.youtube.com/@NokaAxL",
    beatport: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT"
  }
};

export const RATECARD_INFO = [
  { city: "JAKARTA", status: "TERSEDIA", detail: "Metropolitan Area Headline • Hubungi Management" },
  { city: "BANDUNG", status: "TERSEDIA", detail: "West Java Regional Event • Hubungi Management" },
  { city: "LUAR KOTA", status: "TERSEDIA", detail: "National & Asia Tour • Hubungi Management" },
];

export const RIDERS_INFO = {
  items: [
    { label: "FLIGHT & TRANSPORT", desc: "2 TICKET ( GARUDA / CITILINK )", highlight: true },
    { label: "ACCOMMODATION", desc: "HOTEL 4 / 5 STARS 1 ROOMS NON SMOKING", highlight: true },
    { label: "BEVERAGES", desc: "1 Bottle Martel / Cordigo", highlight: false },
    { label: "REFRESHMENTS", desc: "5 Mineral Water", highlight: false },
    { label: "SNACKS", desc: "Snack & Fruits", highlight: false },
    { label: "MEAL ALLOWANCE", desc: "MEAL ALLOWANCE 2 PACK", highlight: false },
    { label: "DOWN PAYMENT", desc: "DOWN PAYMENT 20 %", highlight: true },
    { label: "FINAL PAYMENT", desc: "FULL PAYMENT H - 1", highlight: true },
  ],
  note: "UNTUK INFORMASI RATE MENYESUAIKAN DENGAN SKALA ACARA & LOKASI"
};

export const TRACKS_DATA: Track[] = [
  {
    id: "track-1",
    title: "FUNGKY BEAT (ORIGINAL MIX)",
    featuredArtist: "NOKA AXL",
    bpm: 138,
    key: "F# Min",
    duration: "03:45",
    genre: "Breakbeat Full Bass",
    releaseYear: 2026,
    coverImage: "/assets/image-1.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-1.mp3",
    audioPreviewNote: "techno-drop",
    streams: "12.4M"
  },
  {
    id: "track-2",
    title: "J-TOWN BOUNCE (CLUB EDIT)",
    featuredArtist: "NOKA AXL ft. AXL Sound Crew",
    bpm: 135,
    key: "A Min",
    duration: "04:12",
    genre: "Jungle Dutch / Breakbeat",
    releaseYear: 2025,
    coverImage: "/assets/image-2.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-2.mp3",
    audioPreviewNote: "future-rave",
    streams: "18.8M"
  },
  {
    id: "track-3",
    title: "SMOKE IN THE GLASS (NOKA AXL REMIX)",
    featuredArtist: "VIP Special Edition",
    bpm: 140,
    key: "D Min",
    duration: "03:58",
    genre: "Breakbeat Full Bass",
    releaseYear: 2025,
    coverImage: "/assets/image-3.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-3.mp3",
    audioPreviewNote: "acid-synth",
    streams: "9.5M"
  },
  {
    id: "track-4",
    title: "ROULATTE (VIP BASS DROP)",
    featuredArtist: "Solo Production",
    bpm: 136,
    key: "C Maj",
    duration: "04:20",
    genre: "Disco Breakbeat",
    releaseYear: 2024,
    coverImage: "/assets/image-4.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-4.mp3",
    audioPreviewNote: "melodic-lead",
    streams: "14.1M"
  },
  {
    id: "track-5",
    title: "SPEAK YOUR BOUNCE",
    featuredArtist: "NOKA AXL x Do Bad Well",
    bpm: 142,
    key: "E Min",
    duration: "03:30",
    genre: "Viral Breakbeat Hybrid",
    releaseYear: 2024,
    coverImage: "/assets/image-5.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-5.mp3",
    audioPreviewNote: "hard-hybrid",
    streams: "24.6M"
  },
  {
    id: "track-6",
    title: "NEVER BACK DOWN (FESTIVAL ANTHEM)",
    featuredArtist: "ft. MC Liquid",
    bpm: 138,
    key: "G Min",
    duration: "04:05",
    genre: "Peak Time Breakbeat",
    releaseYear: 2024,
    coverImage: "/assets/image-6.jpeg",
    spotifyUrl: "https://open.spotify.com/artist/3a4uafjBPCy7JkOa9ikRVT",
    soundCloudUrl: "https://soundcloud.com/nk-bounce",
    youtubeUrl: "https://www.youtube.com/@NokaAxL",
    audioUrl: "/audio/track-6.mp3",
    audioPreviewNote: "industrial-bass",
    streams: "11.2M"
  }
];

export const TOUR_DATES: TourDate[] = [
  {
    id: "tour-1",
    date: "SEPT 04, 2026",
    city: "BALI",
    country: "INDONESIA",
    venue: "W BALI SEMINYAK",
    event: "WOOBAR SUNSET SONIC REZONANCE",
    status: "FEW TICKETS",
    ticketUrl: "#book",
    badge: "SUNSET RESIDENCY",
    image: "/assets/image-4.jpeg"
  },
  {
    id: "tour-2",
    date: "SEPT 10, 2026",
    city: "JAKARTA",
    country: "INDONESIA",
    venue: "COLOSSEUM JAKARTA",
    event: "MEGACLUB ARENA: NEO ECLIPSE",
    status: "FEW TICKETS",
    ticketUrl: "#book",
    badge: "MEGACLUB HEADLINE",
    image: "/assets/image-3.jpeg"
  },
  {
    id: "tour-3",
    date: "SEPT 18, 2026",
    city: "BALI",
    country: "INDONESIA",
    venue: "ATLAS BEACH CLUB",
    event: "ATLAS FEST: MEGA DAYCLUB SHOWCASE",
    status: "AVAILABLE",
    ticketUrl: "#book",
    badge: "BEACH FESTIVAL",
    image: "/assets/image-7.jpeg"
  },
  {
    id: "tour-4",
    date: "SEPT 24, 2026",
    city: "JAKARTA",
    country: "INDONESIA",
    venue: "JIEXPO STAGE ONE",
    event: "DJAKARTA WAREHOUSE PROJECT 2026",
    status: "FEW TICKETS",
    ticketUrl: "#book",
    badge: "FESTIVAL HEADLINER",
    image: "/assets/image-1.jpeg"
  }
];

export const STAGE_GALLERY: StagePhoto[] = [
  {
    id: "gallery-1",
    title: "DJ NOKA AXL - PRESS PHOTO 01",
    location: "Jakarta",
    image: "/assets/image-1.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-2",
    title: "DJ NOKA AXL - PRESS PHOTO 02",
    location: "Jakarta",
    image: "/assets/image-2.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-3",
    title: "DJ NOKA AXL - PRESS PHOTO 03",
    location: "Jakarta",
    image: "/assets/image-3.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-4",
    title: "DJ NOKA AXL - PRESS PHOTO 04",
    location: "Jakarta",
    image: "/assets/image-4.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-5",
    title: "DJ NOKA AXL - PRESS PHOTO 05",
    location: "Jakarta",
    image: "/assets/image-5.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-6",
    title: "DJ NOKA AXL - PRESS PHOTO 06",
    location: "Jakarta",
    image: "/assets/image-6.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2026"
  },
  {
    id: "gallery-7",
    title: "DJ NOKA AXL - PRESS PHOTO 07",
    location: "Jakarta",
    image: "/assets/image-7.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2025"
  },
  {
    id: "gallery-8",
    title: "DJ NOKA AXL - PRESS PHOTO 08",
    location: "Jakarta",
    image: "/assets/image-8.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2025"
  },
  {
    id: "gallery-9",
    title: "DJ NOKA AXL - PRESS PHOTO 09",
    location: "Jakarta",
    image: "/assets/image-9.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2025"
  },
  {
    id: "gallery-10",
    title: "DJ NOKA AXL - PRESS PHOTO 10",
    location: "Jakarta",
    image: "/assets/image-10.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2024"
  },
  {
    id: "gallery-11",
    title: "DJ NOKA AXL - PRESS PHOTO 11",
    location: "Jakarta",
    image: "/assets/image-11.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2024"
  },
  {
    id: "gallery-12",
    title: "DJ NOKA AXL - PRESS PHOTO 12",
    location: "Jakarta",
    image: "/assets/image-12.jpeg?v=2",
    caption: "Official DJ Noka AxL press portrait shoot.",
    year: "2024"
  }
];

export const FESTIVAL_BADGES = [
  "DWP FESTIVAL",
  "ULTRA WORLDWIDE",
  "TOMORROWLAND TALENT",
  "SAVAYA BALI",
  "AGEHA TOKYO",
  "ZOUK SINGAPORE",
  "COLOSSEUM JAKARTA",
  "CREAMFIELDS STAGE",
  "AMSTERDAM DANCE EVENT",
  "EDC REZONATOR"
];

// 30-Day Monthly Tour & Club Calendar Data (Initially Empty - Managed via CMS & D1 SQL)
export const MONTHLY_CALENDAR_EVENTS: Record<number, CalendarEvent> = {};

