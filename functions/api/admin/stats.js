export async function onRequestGet(context) {
  const { env } = context;
  if (!env.DB) return Response.json({ error: 'D1 is not configured' }, { status: 503 });

  const [total, today, paths, countries, tools, toolToday] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS count FROM visits').first(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM visits WHERE created_at >= datetime('now','start of day')").first(),
    env.DB.prepare('SELECT path, COUNT(*) AS count FROM visits GROUP BY path ORDER BY count DESC LIMIT 10').all(),
    env.DB.prepare("SELECT COALESCE(country, 'Unknown') AS country, COUNT(*) AS count FROM visits GROUP BY country ORDER BY count DESC LIMIT 10").all(),
    env.DB.prepare('SELECT tool, COUNT(*) AS count FROM tool_usage GROUP BY tool ORDER BY count DESC LIMIT 10').all(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM tool_usage WHERE created_at >= datetime('now','start of day')").first()
  ]);

  return Response.json({
    owner: 'عماد الدين لمراني',
    site: 'World PDF',
    totalVisits: total?.count || 0,
    todayVisits: today?.count || 0,
    todayToolUsage: toolToday?.count || 0,
    topPaths: paths?.results || [],
    topCountries: countries?.results || [],
    topTools: tools?.results || []
  }, { headers: { 'Cache-Control': 'no-store' } });
}
