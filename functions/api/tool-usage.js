export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return Response.json({ error: 'D1 is not configured' }, { status: 503 });

  let body = {};
  try { body = await request.json(); } catch {}
  const tool = String(body.tool || 'unknown').slice(0, 160);
  const path = String(body.path || new URL(request.url).pathname).slice(0, 500);
  const country = request.cf?.country || null;

  await env.DB.prepare(
    'INSERT INTO tool_usage (tool, path, country) VALUES (?, ?, ?)'
  ).bind(tool, path, country).run();

  return Response.json({ ok: true });
}
