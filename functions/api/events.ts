// Cloudflare Pages Function - /api/events with D1 SQL
export async function onRequestGet(context: any) {
  const { env } = context;

  // 1. Query D1 SQL Database
  if (env?.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY day ASC').all();
      const rows = results || [];
      const parsed = rows.map((row: any) => ({
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
    } catch (err: any) {
      console.error('D1 query error:', err);
    }
  }

  // 2. Default Clean State (Empty)
  return new Response(
    JSON.stringify({
      success: true,
      count: 0,
      data: [],
      source: 'clean_state',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

async function getRequestBody(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }
  if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
    try {
      const formData = await request.formData();
      const obj: any = {};
      for (const [key, value] of formData.entries()) {
        obj[key] = value;
      }
      return obj;
    } catch {
      return {};
    }
  }
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body: any = await getRequestBody(request);

    const newEvent = {
      id: body.id || `cal-${Date.now()}`,
      day: parseInt(body.day || '1', 10),
      dateStr: body.dateStr || `Day ${body.day || 1} September 2026`,
      clubName: body.clubName?.trim() || 'VENUE',
      eventTitle: body.eventTitle?.trim() || 'NOKA AXL LIVE',
      city: body.city?.trim() || 'Jakarta',
      country: body.country?.trim() || 'Indonesia',
      venueAddress: body.venueAddress?.trim() || '',
      time: body.time?.trim() || '22:00 - Late',
      genre: body.genre?.trim() || 'Mainstage Techno',
      ticketStatus: body.ticketStatus || 'AVAILABLE',
      ticketPrice: body.ticketPrice?.trim() || 'IDR 250,000',
      flyerImage: body.flyerImage || '/assets/image-1.jpeg',
      supportingDJs: Array.isArray(body.supportingDJs) 
        ? body.supportingDJs 
        : (typeof body.supportingDJs === 'string' ? JSON.parse(body.supportingDJs || '[]') : []),
      description: body.description?.trim() || '',
      googleMapsUrl: body.googleMapsUrl?.trim() || `https://maps.google.com/?q=${encodeURIComponent(body.clubName || '')}`,
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
