export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return Response.json({ error: 'D1 is not configured' }, { status: 503 });

  let body = {};
  try { body = await request.json(); } catch {}
  const path = String(body.path || '/').slice(0, 500);
  const country = request.cf?.country || null;
  const userAgent = request.headers.get('user-agent') || null;

  await env.DB.prepare(
    'INSERT INTO visits (path, country, user_agent) VALUES (?, ?, ?)'
  ).bind(path, country, userAgent).run();

  return Response.json({ ok: true });
}
