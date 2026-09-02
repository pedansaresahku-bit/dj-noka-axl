// Cloudflare Pages Function - /api/events with D1 SQL & Fallback
export async function onRequestGet(context: any) {
  const { env } = context;

  // 1. Try D1 SQL Database
  if (env?.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY day ASC').all();
      if (results && results.length > 0) {
        const parsed = results.map((row: any) => ({
          ...row,
          supportingDJs: typeof row.supportingDJs === 'string' ? JSON.parse(row.supportingDJs || '[]') : (row.supportingDJs || []),
        }));
        return new Response(
          JSON.stringify({
            success: true,
            count: parsed.length,
            data: parsed,
            source: 'd1_sql',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    } catch (err: any) {
      console.error('D1 query error:', err);
    }
  }

  // 2. Default Seed Events Fallback
  const events = [
    {
      id: "cal-2",
      day: 2,
      dateStr: "Wednesday, 02 September 2026",
      clubName: "VALHALLA JAKARTA",
      eventTitle: "UNDERGROUND TECHNO PROTOCOL",
      city: "Senopati, South Jakarta",
      country: "Indonesia",
      venueAddress: "Jl. Senopati No. 74, Kebayoran Baru, Jakarta Selatan",
      time: "22:00 - 04:00 (Set: 01:00)",
      genre: "Peak Time Hard Techno / Industrial",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 250,000 (Incl. 1 Drink)",
      flyerImage: "/assets/image-5.jpeg",
      supportingDJs: ["Cyber Echo", "Dexter Raw", "Luna V"],
      description: "Intense raw underground bass resonance. 4 hours of relentless 142 BPM driving techno beats in Jakarta's darkest warehouse setting.",
      googleMapsUrl: "https://maps.google.com/?q=Valhalla+Jakarta"
    },
    {
      id: "cal-4",
      day: 4,
      dateStr: "Friday, 04 September 2026",
      clubName: "W BALI SEMINYAK",
      eventTitle: "WOOBAR SUNSET SONIC REZONANCE",
      city: "Seminyak, Bali",
      country: "Indonesia",
      venueAddress: "Jl. Petitenget, Seminyak, Kerobokan Kelod, Bali",
      time: "17:00 - 01:00 (Sunset Set: 18:30)",
      genre: "Melodic Techno / Cyber Trance",
      ticketStatus: "AVAILABLE",
      ticketPrice: "FREE ENTRY (F&B Min. Spend applies)",
      flyerImage: "/assets/image-2.jpeg",
      supportingDJs: ["Sunset Pulse", "Damian Cruz"],
      description: "Panoramic ocean-view sunset soundscape transitioning from warm hypnotic deep melodic grooves into high-voltage festival energy as darkness falls.",
      googleMapsUrl: "https://maps.google.com/?q=Woobar+W+Bali+Seminyak"
    },
    {
      id: "cal-7",
      day: 7,
      dateStr: "Monday, 07 September 2026",
      clubName: "DRAGONFLY JAKARTA",
      eventTitle: "TITANIUM MONDAY NIGHT CLUB RESIDENCY",
      city: "Gatot Subroto, Jakarta",
      country: "Indonesia",
      venueAddress: "Graha BIP, Jl. Jend. Gatot Subroto Kav. 23, Jakarta",
      time: "23:00 - 04:00 (Set: 01:30)",
      genre: "Electro Hard Bounce / Mainstage",
      ticketStatus: "FEW TICKETS",
      ticketPrice: "IDR 300,000 (Presale 2)",
      flyerImage: "/assets/image-3.jpeg",
      supportingDJs: ["DF All-Star Collective", "MC Liquid Voice"],
      description: "Jakarta's most iconic luxury mega-club unleashes NOKA AXL for high-velocity club dynamics and laser-synchronized drop anthems.",
      googleMapsUrl: "https://maps.google.com/?q=Dragonfly+Jakarta"
    },
    {
      id: "cal-10",
      day: 10,
      dateStr: "Thursday, 10 September 2026",
      clubName: "COLOSSEUM CLUB JAKARTA",
      eventTitle: "THE 1001 HEARTS OF TECHNO FESTIVAL",
      city: "Kota Tua, West Jakarta",
      country: "Indonesia",
      venueAddress: "Jl. Kunir No. 7, Pinangsia, Taman Sari, Jakarta Barat",
      time: "21:00 - 05:00 (Set: 02:00)",
      genre: "Hard Techno / Psy-Trance Drive",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 350,000 (Early Entry 22:00)",
      flyerImage: "/assets/image-4.jpeg",
      supportingDJs: ["Colosseum resident crew", "VJ Neon Hexagon"],
      description: "Massive kinetic kinetic ceiling visuals and Void Acoustics sonic pressure engulfing 3,000+ ravers under NOKA AXL's midnight orchestration.",
      googleMapsUrl: "https://maps.google.com/?q=Colosseum+Club+Jakarta"
    },
    {
      id: "cal-12",
      day: 12,
      dateStr: "Saturday, 12 September 2026",
      clubName: "SAVAYA BALI",
      eventTitle: "CLIFFTOP TEMPLE OF BASS",
      city: "Uluwatu, Bali",
      country: "Indonesia",
      venueAddress: "Jl. Belimbing Sari, Banjar Tambiyak, Pecatu, Uluwatu, Bali",
      time: "16:00 - 00:00 (Headline Set: 21:00)",
      genre: "Festival Big Room / Hard Techno",
      ticketStatus: "SOLD OUT",
      ticketPrice: "IDR 750,000 (Sold Out)",
      flyerImage: "/assets/image-1.jpeg",
      supportingDJs: ["Arya B2B Kazz", "Noxious DJ", "Bali Fire Performers"],
      description: "Suspended 100 meters above the Indian Ocean on Uluwatu's limestone cliffs. The flagship weekend headline set featuring brand-new unreleased ID anthems.",
      googleMapsUrl: "https://maps.google.com/?q=Savaya+Bali"
    },
    {
      id: "cal-16",
      day: 16,
      dateStr: "Wednesday, 16 September 2026",
      clubName: "ZOUK SINGAPORE",
      eventTitle: "SOUTHEAST ASIA INVASION TOUR: LEG 1",
      city: "Clarke Quay",
      country: "Singapore",
      venueAddress: "3C River Valley Road, #01-05 The Cannery, Singapore",
      time: "22:00 - 04:00 (Set: 01:00)",
      genre: "Mainstage Cyber Bounce",
      ticketStatus: "FEW TICKETS",
      ticketPrice: "SGD $60 (Includes 2 Drink Coupons)",
      flyerImage: "/assets/image-2.jpeg",
      supportingDJs: ["Zouk Resident Crew", "DJ Jeremy Boon", "MC Fast6"],
      description: "NOKA AXL commands the world-famous mainroom at Clarke Quay. Hypnotic futuristic lead synths meets relentless bass drops.",
      googleMapsUrl: "https://maps.google.com/?q=Zouk+Singapore"
    },
    {
      id: "cal-18",
      day: 18,
      dateStr: "Friday, 18 September 2026",
      clubName: "ATLAS BEACH CLUB BALI",
      eventTitle: "HOLYWINGS BIGGEST BASS CARNIVAL",
      city: "Canggu, Bali",
      country: "Indonesia",
      venueAddress: "Jl. Pantai Berawa No. 88, Canggu, Bali",
      time: "19:00 - 02:00 (Headline Set: 23:30)",
      genre: "Industrial Rave / Electro Bounce",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 350,000 (General Admission)",
      flyerImage: "/assets/image-3.jpeg",
      supportingDJs: ["Atlas Resident DJs", "Laser Fireworks Crew"],
      description: "World's biggest beach club turns into a monolithic hard electronic dance floor with pyro cannons, CO2 blasters, and 10,000+ partygoers.",
      googleMapsUrl: "https://maps.google.com/?q=Atlas+Beach+Club+Bali"
    },
    {
      id: "cal-21",
      day: 21,
      dateStr: "Monday, 21 September 2026",
      clubName: "HW TIGER SURABAYA",
      eventTitle: "MID-EAST JAVA SONIC OVERLOAD",
      city: "Surabaya, East Java",
      country: "Indonesia",
      venueAddress: "Jl. Mayjen Sungkono No. 88, Dukuh Pakis, Surabaya",
      time: "22:00 - 03:30 (Set: 00:30)",
      genre: "Peak Time Club Anthem",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 200,000",
      flyerImage: "/assets/image-4.jpeg",
      supportingDJs: ["Tiger Resident Crew", "DJ Vania"],
      description: "East Java ravers unite for an earth-shattering session of high BPM raw club music.",
      googleMapsUrl: "https://maps.google.com/?q=Tiger+Club+Surabaya"
    },
    {
      id: "cal-24",
      day: 24,
      dateStr: "Thursday, 24 September 2026",
      clubName: "JIEXPO KEMAYORAN JAKARTA",
      eventTitle: "DWP PRE-PARTY ARENA // ROAD TO DEC 2026",
      city: "Kemayoran, Jakarta",
      country: "Indonesia",
      venueAddress: "Gedung Pusat Niaga Arena JIEXPO Kemayoran, Jakarta",
      time: "18:00 - 02:00 (Set: 22:30)",
      genre: "Mainstage Big Room Techno",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 550,000 (Official Festival Presale)",
      flyerImage: "/assets/image-5.jpeg",
      supportingDJs: ["International Guests", "Dipha Barus", "Whisnu Santika"],
      description: "Indonesia's most prestigious dance music festival gathering. NOKA AXL dominates the indoor hangar arena.",
      googleMapsUrl: "https://maps.google.com/?q=JIEXPO+Kemayoran"
    },
    {
      id: "cal-27",
      day: 27,
      dateStr: "Sunday, 27 September 2026",
      clubName: "SHIKU CLUB BANDUNG",
      eventTitle: "PARIS VAN JAVA INTENSE NIGHT",
      city: "Bandung, West Java",
      country: "Indonesia",
      venueAddress: "Jl. LLRE Martadinata No. 205, Cihapit, Bandung",
      time: "22:00 - 04:00 (Set: 01:00)",
      genre: "High Octane Tech-House & Bounce",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 175,000 (Incl. 1 Cocktail)",
      flyerImage: "/assets/image-1.jpeg",
      supportingDJs: ["DJ Ryan B", "Bandung Underground Syndicate"],
      description: "Cool mountain breeze outside, pure volcanic fire inside as NOKA AXL tears through Bandung with thunderous kickdrums.",
      googleMapsUrl: "https://maps.google.com/?q=Shiku+Bandung"
    },
    {
      id: "cal-30",
      day: 30,
      dateStr: "Wednesday, 30 September 2026",
      clubName: "AGEHA TOKYO (SPECIAL RESURRECTION EVENT)",
      eventTitle: "TOKYO CYBER RAVE 2026",
      city: "Shin-Kiba, Tokyo",
      country: "Japan",
      venueAddress: "Shin-Kiba, Koto City, Tokyo, Japan",
      time: "22:00 - 06:00 (Midnight Countdown Set: 00:00)",
      genre: "Hard Dance / Cyber Techno / J-Core",
      ticketStatus: "VIP EXCLUSIVE",
      ticketPrice: "¥ 5,500 (Early Bird Sold Out)",
      flyerImage: "/assets/image-5.jpeg",
      supportingDJs: ["DJ Taku Takahashi", "Ken Ishii", "Vexen"],
      description: "Japan's legendary clubbing landmark hosts NOKA AXL for a midnight-to-dawn auditory storm as NOKA AXL caps off September with an unforgettable show.",
      googleMapsUrl: "https://maps.google.com/?q=ageHa+Tokyo"
    }
  ];

  return new Response(
    JSON.stringify({
      success: true,
      count: events.length,
      data: events,
      source: 'static_fallback',
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    let body: any = {};
    try {
      body = await request.json();
    } catch {}

    const newEvent = {
      id: body.id || `cal-${Date.now()}`,
      day: parseInt(body.day || '1', 10),
      dateStr: body.dateStr || 'September 2026',
      clubName: body.clubName || 'VENUE',
      eventTitle: body.eventTitle || 'NOKA AXL LIVE',
      city: body.city || 'Jakarta',
      country: body.country || 'Indonesia',
      venueAddress: body.venueAddress || '',
      time: body.time || '22:00 - Late',
      genre: body.genre || 'Mainstage Techno',
      ticketStatus: body.ticketStatus || 'AVAILABLE',
      ticketPrice: body.ticketPrice || 'IDR 250,000',
      flyerImage: body.flyerImage || '/assets/image-1.jpeg',
      supportingDJs: Array.isArray(body.supportingDJs) ? body.supportingDJs : [],
      description: body.description || '',
      googleMapsUrl: body.googleMapsUrl || '',
    };

    // Insert to D1 SQL database
    if (env?.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO events (id, day, dateStr, clubName, eventTitle, city, country, venueAddress, time, genre, ticketStatus, ticketPrice, flyerImage, supportingDJs, description, googleMapsUrl)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newEvent.id,
          newEvent.day,
          newEvent.dateStr,
          newEvent.clubName,
          newEvent.eventTitle,
          newEvent.city,
          newEvent.country,
          newEvent.venueAddress,
          newEvent.time,
          newEvent.genre,
          newEvent.ticketStatus,
          newEvent.ticketPrice,
          newEvent.flyerImage,
          JSON.stringify(newEvent.supportingDJs),
          newEvent.description,
          newEvent.googleMapsUrl
        ).run();
      } catch (dbErr) {
        console.error('D1 insert error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Event created and saved to D1 SQL database.',
        data: newEvent,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
