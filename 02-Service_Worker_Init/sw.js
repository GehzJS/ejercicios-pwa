/**
 * El Service Worker escucha los eventos de tipo fetch (peticiones).
 */
self.addEventListener('fetch', evento => {
  /** El Service Worker intercepta las peticiones. */
  evento.respondWith(
    fetch(evento.request).then(respuesta =>
      respuesta.ok ? respuesta : fetch('img/main.jpg')
    )
  );
});

/* Falsificación de información. */
//   if (evento.request.url.includes('main.jpg')) {
//     evento.respondWith(fetch('img/main-patas-arriba.jpg'));
//   }
