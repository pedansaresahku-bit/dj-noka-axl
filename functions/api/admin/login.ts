// Cloudflare Pages Function: /api/admin/login
export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const adminPin = env?.ADMIN_PIN || 'NOKA2026';

    if (!body?.pin || body.pin.toString().trim() !== adminPin) {
      return new Response(
        JSON.stringify({ success: false, message: 'Incorrect Admin PIN.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        token: `token-${adminPin}`,
        message: 'Authentication successful. Welcome NOKA AXL Management.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
