/** Respuesta con texto plano. */
self.addEventListener('fetch', evento => {
  const offline = new Response('Se necesita internet para usar el sitio.');
  const respuesta = fetch(evento.request).catch(() => offline);
  evento.respondWith(respuesta);
});

/** Respuesta con HTML. */
self.addEventListener('fetch', evento => {
  const offline = new Response(
    `<h1>Se necesita internet para usar el sitio.</h1>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
  const respuesta = fetch(evento.request).catch(() => offline);
  evento.respondWith(respuesta);
});
