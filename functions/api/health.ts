// Cloudflare Pages Function: /api/health
export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      status: "ONLINE",
      provider: "Cloudflare Pages Edge Network",
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
