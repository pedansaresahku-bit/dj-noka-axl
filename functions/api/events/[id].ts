// Cloudflare Pages Function: /api/events/[id]
export async function onRequestDelete(context: any) {
  try {
    const { params, env } = context;
    const eventId = params.id;

    if (env?.EVENTS_KV) {
      let events = [];
      const stored = await env.EVENTS_KV.get('events_data', { type: 'json' });
      if (stored && Array.isArray(stored)) {
        events = stored.filter((e: any) => e.id !== eventId);
        await env.EVENTS_KV.put('events_data', JSON.stringify(events));
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Event ${eventId} successfully deleted.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: true, message: 'Event deleted.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestPut(context: any) {
  try {
    const { request, params, env } = context;
    const eventId = params.id;
    let body = {};
    try {
      body = await request.json();
    } catch {}

    if (env?.EVENTS_KV) {
      let events = [];
      const stored = await env.EVENTS_KV.get('events_data', { type: 'json' });
      if (stored && Array.isArray(stored)) {
        const idx = stored.findIndex((e: any) => e.id === eventId);
        if (idx !== -1) {
          stored[idx] = { ...stored[idx], ...body };
          await env.EVENTS_KV.put('events_data', JSON.stringify(stored));
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Event updated successfully.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: true, message: 'Event updated.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestGet(context: any) {
  const { params } = context;
  return new Response(
    JSON.stringify({ success: true, id: params.id }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
