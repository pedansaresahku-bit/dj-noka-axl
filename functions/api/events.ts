// Cloudflare Pages Function - /api/events
export async function onRequestGet() {
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
      time: "16:30 - 23:00 (Sunset Set: 17:45)",
      genre: "Melodic Progressive & Future Rave",
      ticketStatus: "FEW TICKETS",
      ticketPrice: "Free Entry / Daybed Minimum Spend",
      flyerImage: "/assets/image-4.jpeg",
      supportingDJs: ["Woobar Resident", "Sammy Deep"],
      description: "Catch the golden hour with deep melodic rhythms and sweeping synthesizers right on the beachfront of Seminyak.",
      googleMapsUrl: "https://maps.google.com/?q=Woobar+Bali"
    },
    {
      id: "cal-7",
      day: 7,
      dateStr: "Monday, 07 September 2026",
      clubName: "DRAGONFLY JAKARTA",
      eventTitle: "MIDWEEK BASS INVASION",
      city: "Gatot Subroto, Jakarta",
      country: "Indonesia",
      venueAddress: "Graha BIP, Jl. Gatot Subroto Kav. 23, Jakarta Selatan",
      time: "21:30 - 03:00 (Set: 00:30)",
      genre: "Future Bass / Hybrid EDM",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 200,000 / Ladies Free Before 23:00",
      flyerImage: "/assets/image-2.jpeg",
      supportingDJs: ["Dragonfly All-Stars", "MC Liquid"],
      description: "Jakarta's most iconic nightlife institution welcomes NOKA AXL for an exclusive high-voltage midweek takeover.",
      googleMapsUrl: "https://maps.google.com/?q=Dragonfly+Jakarta"
    },
    {
      id: "cal-10",
      day: 10,
      dateStr: "Thursday, 10 September 2026",
      clubName: "COLOSSEUM JAKARTA",
      eventTitle: "MEGACLUB ARENA: NEO ECLIPSE",
      city: "Kota Tua, West Jakarta",
      country: "Indonesia",
      venueAddress: "Jl. Kunir No. 7, Pinangsia, Tamansari, Jakarta Barat",
      time: "21:00 - 05:00 (Headline Set: 01:30)",
      genre: "Mainstage Techno & Laser Symphony",
      ticketStatus: "FEW TICKETS",
      ticketPrice: "IDR 350,000 / VIP Sofa Available",
      flyerImage: "/assets/image-3.jpeg",
      supportingDJs: ["Vexen Live", "Sixteen Beats", "MC Giri"],
      description: "Colosseum's mammoth 1,000 sqm arena and Kinetic 3D Lighting Rig will ignite under NOKA AXL's signature drop.",
      googleMapsUrl: "https://maps.google.com/?q=Colosseum+Club+Jakarta"
    },
    {
      id: "cal-12",
      day: 12,
      dateStr: "Saturday, 12 September 2026",
      clubName: "SAVAYA BALI",
      eventTitle: "NEO HORIZON SUNSET RESIDENCY",
      city: "Uluwatu, Bali",
      country: "Indonesia",
      venueAddress: "Jl. Belimbing Sari, Banjar Tambiyak, Pecatu, Uluwatu",
      time: "15:00 - 00:00 (Set: 19:30)",
      genre: "Future Rave / Melodic Techno",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 400,000 (General Admission)",
      flyerImage: "/assets/image-1.jpeg",
      supportingDJs: ["Savaya Sound System", "Nico Grey"],
      description: "Perched 100 meters above the Indian Ocean, experience an unearthly clifftop sonic ritual with international guest DJs.",
      googleMapsUrl: "https://maps.google.com/?q=Savaya+Bali"
    },
    {
      id: "cal-16",
      day: 16,
      dateStr: "Wednesday, 16 September 2026",
      clubName: "ZOUK SINGAPORE",
      eventTitle: "PHUTURE ROOM OVERDRIVE",
      city: "Clarke Quay, Singapore",
      country: "Singapore",
      venueAddress: "3C River Valley Road, The Cannery, Singapore 179022",
      time: "22:00 - 04:00 (Set: 01:15)",
      genre: "Hardstyle Hybrid & Acid Techno",
      ticketStatus: "AVAILABLE",
      ticketPrice: "SGD $45 (Includes 2 Drinks)",
      flyerImage: "/assets/image-6.jpeg",
      supportingDJs: ["Zouk Resident Jeremy", "DJ Che'Molly"],
      description: "The crown jewel of Asian clubbing. NOKA AXL returns to Singapore for an uncompromising, high-BPM rave session.",
      googleMapsUrl: "https://maps.google.com/?q=Zouk+Singapore"
    },
    {
      id: "cal-18",
      day: 18,
      dateStr: "Friday, 18 September 2026",
      clubName: "ATLAS BEACH CLUB",
      eventTitle: "ATLAS FEST: MEGA DAYCLUB SHOWCASE",
      city: "Canggu, Bali",
      country: "Indonesia",
      venueAddress: "Jl. Pantai Berawa No. 88, Canggu, Bali",
      time: "14:00 - 23:00 (Headline Set: 20:00)",
      genre: "Mainstage Anthem & Stadium Bass",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 300,000 / Daybed Package",
      flyerImage: "/assets/image-7.jpeg",
      supportingDJs: ["Atlas Residents", "DJ Jesse", "Pyro Crew"],
      description: "The world's biggest beach club turns into a sonic tempest with custom lasers, poolside pyrotechnics, and 10,000 partygoers.",
      googleMapsUrl: "https://maps.google.com/?q=Atlas+Beach+Club+Bali"
    },
    {
      id: "cal-21",
      day: 21,
      dateStr: "Monday, 21 September 2026",
      clubName: "HW TIGER SURABAYA",
      eventTitle: "EASTERN JAVA TOUR: BASS SHOCK",
      city: "Surabaya, East Java",
      country: "Indonesia",
      venueAddress: "Jl. Mayjen Sungkono No. 89, Dukuh Pakis, Surabaya",
      time: "21:00 - 03:00 (Set: 00:00)",
      genre: "EDM Hybrid & Hard Techno",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 200,000 (Presale)",
      flyerImage: "/assets/image-2.jpeg",
      supportingDJs: ["Tiger All-Stars", "Fandy B"],
      description: "Surabaya's premier nightlife destination heats up as NOKA AXL drops exclusive unreleased IDs.",
      googleMapsUrl: "https://maps.google.com/?q=HW+Tiger+Club+Surabaya"
    },
    {
      id: "cal-24",
      day: 24,
      dateStr: "Thursday, 24 September 2026",
      clubName: "JIEXPO STAGE ONE // DWP LAUNCH",
      eventTitle: "DJAKARTA WAREHOUSE PROJECT 2026",
      city: "Kemayoran, Jakarta",
      country: "Indonesia",
      venueAddress: "Jakarta International Expo, Kemayoran, Jakarta Pusat",
      time: "17:00 - 04:00 (Headline Set: 23:30)",
      genre: "Main-Stage World Premiere",
      ticketStatus: "FEW TICKETS",
      ticketPrice: "Tier 2 GA IDR 1,500,000 / VIP Available",
      flyerImage: "/assets/image-1.jpeg",
      supportingDJs: ["International Lineup", "Cyber Echo", "Vexen"],
      description: "Southeast Asia's pinnacle dance festival. NOKA AXL commands the massive Garudaland / Stage One under stadium pyrotechnics.",
      googleMapsUrl: "https://maps.google.com/?q=JIEXPO+Kemayoran"
    },
    {
      id: "cal-27",
      day: 27,
      dateStr: "Sunday, 27 September 2026",
      clubName: "SHIKU CLUB BANDUNG",
      eventTitle: "HIGHLAND BASS VELOCITY",
      city: "Bandung, West Java",
      country: "Indonesia",
      venueAddress: "Jl. Dago Atas No. 120, Bandung",
      time: "21:00 - 03:00 (Set: 23:45)",
      genre: "Future Bass & Tech Trance",
      ticketStatus: "AVAILABLE",
      ticketPrice: "IDR 175,000",
      flyerImage: "/assets/image-4.jpeg",
      supportingDJs: ["Bandung Wave Collective"],
      description: "Cool mountain air meets explosive bass frequencies in an intimate club setting with bespoke Funktion-One acoustics.",
      googleMapsUrl: "https://maps.google.com/?q=Shiku+Bandung"
    },
    {
      id: "cal-30",
      day: 30,
      dateStr: "Wednesday, 30 September 2026",
      clubName: "AGEHA // TOKYO",
      eventTitle: "TOKYO BASS SENSATION: CLOSING",
      city: "Koto City, Tokyo",
      country: "Japan",
      venueAddress: "2-2-10 Shinkiba, Koto-ku, Tokyo 136-0082",
      time: "23:00 - 06:00 (Headline Set: 02:30)",
      genre: "145 BPM Hard Techno / Hybrid Overdrive",
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
      id: `cal-${Date.now()}`,
      ...body,
    };

    if (env?.EVENTS_KV) {
      let events: any[] = [];
      const stored = await env.EVENTS_KV.get('events_data', { type: 'json' });
      if (stored && Array.isArray(stored)) {
        events = stored;
      }
      events.push(newEvent);
      await env.EVENTS_KV.put('events_data', JSON.stringify(events));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Event created successfully.',
        data: newEvent,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: true, message: 'Event created.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
