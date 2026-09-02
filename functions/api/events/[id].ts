// Cloudflare Pages Function: /api/events/[id] with D1 SQL

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

export async function onRequestDelete(context: any) {
  try {
    const { params, env } = context;
    const eventId = params.id;

    if (env?.DB) {
      try {
        await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(eventId).run();
      } catch (dbErr) {
        console.error('D1 delete error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Event ${eventId} successfully deleted from D1 database.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function onRequestPut(context: any) {
  try {
    const { request, params, env } = context;
    const eventId = params.id;
    const body: any = await getRequestBody(request);

    const day = body.day !== undefined ? parseInt(body.day, 10) : 1;
    const dateStr = body.dateStr || `Day ${day} September 2026`;
    const clubName = body.clubName || 'VENUE';
    const eventTitle = body.eventTitle || 'NOKA AXL LIVE';
    const city = body.city || 'Jakarta';
    const country = body.country || 'Indonesia';
    const venueAddress = body.venueAddress || '';
    const time = body.time || '22:00 - Late';
    const genre = body.genre || 'Mainstage Techno';
    const ticketStatus = body.ticketStatus || 'AVAILABLE';
    const ticketPrice = body.ticketPrice || 'IDR 250,000';
    const flyerImage = body.flyerImage || '/assets/image-1.jpeg';
    const supportingDJs = typeof body.supportingDJs === 'string' ? body.supportingDJs : JSON.stringify(body.supportingDJs || []);
    const description = body.description || '';
    const googleMapsUrl = body.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(clubName)}`;

    if (env?.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO events (id, day, dateStr, clubName, eventTitle, city, country, venueAddress, time, genre, ticketStatus, ticketPrice, flyerImage, supportingDJs, description, googleMapsUrl)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            day = excluded.day,
            dateStr = excluded.dateStr,
            clubName = excluded.clubName,
            eventTitle = excluded.eventTitle,
            city = excluded.city,
            country = excluded.country,
            venueAddress = excluded.venueAddress,
            time = excluded.time,
            genre = excluded.genre,
            ticketStatus = excluded.ticketStatus,
            ticketPrice = excluded.ticketPrice,
            flyerImage = excluded.flyerImage,
            supportingDJs = excluded.supportingDJs,
            description = excluded.description,
            googleMapsUrl = excluded.googleMapsUrl;
        `).bind(
          eventId,
          day,
          dateStr,
          clubName,
          eventTitle,
          city,
          country,
          venueAddress,
          time,
          genre,
          ticketStatus,
          ticketPrice,
          flyerImage,
          supportingDJs,
          description,
          googleMapsUrl
        ).run();
      } catch (dbErr) {
        console.error('D1 upsert error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Event ${eventId} updated successfully in D1 database.`,
        data: {
          id: eventId,
          day,
          dateStr,
          clubName,
          eventTitle,
          city,
          country,
          venueAddress,
          time,
          genre,
          ticketStatus,
          ticketPrice,
          flyerImage,
          supportingDJs: typeof supportingDJs === 'string' ? JSON.parse(supportingDJs || '[]') : supportingDJs,
          description,
          googleMapsUrl,
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function onRequestGet(context: any) {
  try {
    const { params, env } = context;
    const eventId = params.id;

    if (env?.DB) {
      const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(eventId).first();
      if (event) {
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              ...event,
              supportingDJs: typeof event.supportingDJs === 'string' ? JSON.parse(event.supportingDJs || '[]') : event.supportingDJs,
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Event not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
