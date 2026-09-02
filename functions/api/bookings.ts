// Cloudflare Pages Function: /api/bookings
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

  let bookings = [];
  try {
    if (env?.EVENTS_KV) {
      const stored = await env.EVENTS_KV.get('bookings_data', { type: 'json' });
      if (stored) bookings = stored;
    }
  } catch {}

  return new Response(JSON.stringify({ success: true, count: bookings.length, data: bookings }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const newBooking = {
      id: `inq-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: 'UNREAD',
    };

    if (env?.EVENTS_KV) {
      let list = [];
      const stored = await env.EVENTS_KV.get('bookings_data', { type: 'json' });
      if (stored && Array.isArray(stored)) list = stored;
      list.unshift(newBooking);
      await env.EVENTS_KV.put('bookings_data', JSON.stringify(list));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Promoter inquiry received and logged into management queue.',
        inquiryId: newBooking.id,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
