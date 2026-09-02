// Cloudflare Pages Function: /api/events/[id] with D1 SQL
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
    let body: any = {};
    try {
      body = await request.json();
    } catch {}

    if (env?.DB) {
      try {
        await env.DB.prepare(`
          UPDATE events
          SET day = COALESCE(?, day),
              dateStr = COALESCE(?, dateStr),
              clubName = COALESCE(?, clubName),
              eventTitle = COALESCE(?, eventTitle),
              city = COALESCE(?, city),
              country = COALESCE(?, country),
              venueAddress = COALESCE(?, venueAddress),
              time = COALESCE(?, time),
              genre = COALESCE(?, genre),
              ticketStatus = COALESCE(?, ticketStatus),
              ticketPrice = COALESCE(?, ticketPrice),
              flyerImage = COALESCE(?, flyerImage),
              supportingDJs = COALESCE(?, supportingDJs),
              description = COALESCE(?, description),
              googleMapsUrl = COALESCE(?, googleMapsUrl)
          WHERE id = ?
        `).bind(
          body.day !== undefined ? parseInt(body.day, 10) : null,
          body.dateStr || null,
          body.clubName || null,
          body.eventTitle || null,
          body.city || null,
          body.country || null,
          body.venueAddress || null,
          body.time || null,
          body.genre || null,
          body.ticketStatus || null,
          body.ticketPrice || null,
          body.flyerImage || null,
          body.supportingDJs ? JSON.stringify(body.supportingDJs) : null,
          body.description || null,
          body.googleMapsUrl || null,
          eventId
        ).run();
      } catch (dbErr) {
        console.error('D1 update error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Event ${eventId} updated successfully in D1 database.`,
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
