/**
 * Ciclo de vida del Service Worker.
 */

/** Se ejecuta cuando se instala el Service Worker. */
self.addEventListener('install', evento => {
  /** Se descargan los assets. */
  /** Se crea el caché. */
  /** Omite la espera e instala el Service Worker inmediatamante. */
  //   self.skipWaiting();
  /** Espera hasta que la promesa se resuelva para continuar. */
  //   self.waitUntil();
});

/** Se ejecuta cuando se activa el Service Worker. */
self.addEventListener('activate', evento => {
  /** Se borra el caché existente. */
});

/** Se ejecuta cuando se realiza una petición de cualquier tipo. */
self.addEventListener('fetch', evento => {
  /** Se aplica el caché. */
});

/** Se ejecuta cuando se recupera la conexión a internet. */
self.addEventListener('sync', evento => {
  /** Se interceptan las peticiones. */
});

/** Se ejecuta cuando se envían notificaciones push. */
self.addEventListener('push', evento => {
  /** Se envían las notificaciones push. */
});
