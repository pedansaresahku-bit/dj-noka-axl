// Cloudflare Pages Function: /api/bookings with D1 SQL
export async function onRequestGet(context: any) {
  const { request, env } = context;
  const adminPin = env?.ADMIN_PIN || 'NOKA2026';
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (token !== adminPin && token !== `token-${adminPin}`) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let bookings: any[] = [];
  if (env?.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM bookings ORDER BY createdAt DESC').all();
      if (results) bookings = results;
    } catch (err) {
      console.error('D1 bookings error:', err);
    }
  }

  return new Response(JSON.stringify({ success: true, count: bookings.length, data: bookings }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const newBooking = {
      id: `inq-${Date.now()}`,
      promoterName: body.promoterName || 'Unknown Promoter',
      email: body.email || '',
      phone: body.phone || '',
      eventType: body.eventType || 'Club Headline',
      eventDate: body.eventDate || '',
      venueLocation: body.venueLocation || '',
      estimatedAttendance: body.estimatedAttendance || '',
      budgetTier: body.budgetTier || '',
      message: body.message || '',
      status: 'UNREAD',
    };

    if (env?.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO bookings (id, promoterName, email, phone, eventType, eventDate, venueLocation, estimatedAttendance, budgetTier, message, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newBooking.id,
          newBooking.promoterName,
          newBooking.email,
          newBooking.phone,
          newBooking.eventType,
          newBooking.eventDate,
          newBooking.venueLocation,
          newBooking.estimatedAttendance,
          newBooking.budgetTier,
          newBooking.message,
          newBooking.status
        ).run();
      } catch (dbErr) {
        console.error('D1 insert booking error:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Promoter inquiry registered in D1 database.',
        inquiryId: newBooking.id,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
