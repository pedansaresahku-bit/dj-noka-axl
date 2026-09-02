import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { db } from './database';

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PIN = process.env.ADMIN_PIN || 'NOKA2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload directory configuration
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded flyers statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `flyer-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Admin Auth Verification
const verifyAdminAuth = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== ADMIN_PIN && token !== `token-${ADMIN_PIN}`) {
    res.status(403).json({ success: false, message: 'Invalid Admin PIN/Token' });
    return;
  }

  next();
};

/* =========================================================================
   API ROUTES
========================================================================= */

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    service: 'NOKA AXL Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 2. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { pin } = req.body;
  if (!pin || pin.toString().trim() !== ADMIN_PIN) {
    res.status(401).json({ success: false, message: 'Incorrect Admin PIN. Default is NOKA2026' });
    return;
  }

  res.json({
    success: true,
    token: `token-${ADMIN_PIN}`,
    message: 'Authentication successful. Welcome NOKA AXL Management.',
  });
});

// 3. Upload Flyer Image
app.post('/api/upload-flyer', verifyAdminAuth, upload.single('flyer'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No image file uploaded' });
    return;
  }

  const relativeUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: relativeUrl,
    filename: req.file.filename,
  });
});

// 4. Get all events
app.get('/api/events', (_req: Request, res: Response) => {
  const events = db.getAllEvents();
  res.json({
    success: true,
    count: events.length,
    data: events,
  });
});

// 5. Get event by ID
app.get('/api/events/:id', (req: Request, res: Response) => {
  const event = db.getEventById(req.params.id);
  if (!event) {
    res.status(404).json({ success: false, message: 'Event not found' });
    return;
  }
  res.json({ success: true, data: event });
});

// 6. Create event (Admin)
app.post('/api/events', verifyAdminAuth, upload.single('flyerFile'), (req: Request, res: Response) => {
  try {
    const body = req.body;
    let flyerImage = body.flyerImage || '/assets/image-1.jpeg';

    if (req.file) {
      flyerImage = `/uploads/${req.file.filename}`;
    }

    const day = parseInt(body.day, 10);
    if (isNaN(day) || day < 1 || day > 31) {
      res.status(400).json({ success: false, message: 'Day must be a number between 1 and 31' });
      return;
    }

    let supportingDJs: string[] = [];
    if (body.supportingDJs) {
      if (typeof body.supportingDJs === 'string') {
        supportingDJs = body.supportingDJs.split(',').map((s: string) => s.trim()).filter(Boolean);
      } else if (Array.isArray(body.supportingDJs)) {
        supportingDJs = body.supportingDJs;
      }
    }

    const newEvent = db.createEvent({
      day,
      dateStr: body.dateStr || `Day ${day} October 2026`,
      clubName: body.clubName,
      eventTitle: body.eventTitle,
      city: body.city || 'Jakarta',
      country: body.country || 'Indonesia',
      venueAddress: body.venueAddress || '',
      time: body.time || '22:00 - Late',
      genre: body.genre || 'Mainstage Techno',
      ticketStatus: body.ticketStatus || 'AVAILABLE',
      ticketPrice: body.ticketPrice || 'IDR 250,000',
      flyerImage,
      supportingDJs,
      description: body.description || '',
      googleMapsUrl: body.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(body.clubName)}`,
    });

    res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Update event (Admin)
app.put('/api/events/:id', verifyAdminAuth, upload.single('flyerFile'), (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updates: any = { ...body };

    if (body.day) {
      updates.day = parseInt(body.day, 10);
    }

    if (req.file) {
      updates.flyerImage = `/uploads/${req.file.filename}`;
    }

    if (body.supportingDJs && typeof body.supportingDJs === 'string') {
      updates.supportingDJs = body.supportingDJs.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const updated = db.updateEvent(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    res.json({ success: true, message: 'Event updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. Delete event (Admin)
app.delete('/api/events/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const deleted = db.deleteEvent(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Event not found' });
    return;
  }
  res.json({ success: true, message: 'Event deleted successfully' });
});

// 9. Bookings - Save Inquiry (Public)
app.post('/api/bookings', (req: Request, res: Response) => {
  try {
    const { promoterName, email, phone, eventType, eventDate, venueLocation, estimatedAttendance, budgetTier, message } = req.body;
    if (!promoterName || !email) {
      res.status(400).json({ success: false, message: 'Promoter name and email are required' });
      return;
    }

    const booking = db.createBooking({
      promoterName,
      email,
      phone: phone || '',
      eventType: eventType || 'Festival Mainstage',
      eventDate: eventDate || '',
      venueLocation: venueLocation || '',
      estimatedAttendance: estimatedAttendance || '',
      budgetTier: budgetTier || '',
      message: message || '',
    });

    res.status(201).json({ success: true, message: 'Booking inquiry submitted', data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 10. Bookings - Get all inquiries (Admin)
app.get('/api/bookings', verifyAdminAuth, (_req: Request, res: Response) => {
  const bookings = db.getAllBookings();
  res.json({ success: true, count: bookings.length, data: bookings });
});

// 11. Bookings - Update status (Admin)
app.patch('/api/bookings/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = db.updateBookingStatus(req.params.id, status);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }
  res.json({ success: true, message: 'Booking status updated' });
});

app.listen(PORT, () => {
  console.log(`⚡ NOKA AXL Backend API Server running on http://localhost:${PORT}`);
});
