export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/html')) return response;

  const html = await response.text();
  if (html.includes('/assets/js/analytics.js')) {
    return new Response(html, response);
  }

  const injected = html.replace(
    '</body>',
    '    <script src="/assets/js/analytics.js" defer></script>\n</body>'
  );

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(injected, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
