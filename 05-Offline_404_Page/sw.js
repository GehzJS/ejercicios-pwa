/**
 * Nombres de los distintos caches de la aplicación.
 */
const ESTATICO = 'estatico_v3';
const INMUTABLE = 'inmutable_v1';
const DINAMICO = 'dinamico_v1';

/**
 * Se crea el App Shell una vez instalado el Service Worker.
 */
self.addEventListener('install', evento => {
  /** Se guarda el cache estático. */
  const estatico = caches.open(ESTATICO).then(cache => {
    return cache.addAll([
      '/', // Se guarda el slash ya que se toma como una petición extra al inicio.
      '/index.html',
      '/css/style.css',
      '/js/app.js',
      '/img/main.jpg',
      '/img/no-img.jpg',
      'pages/offline.html'
    ]);
  });
  /** Se guarda el cache inmutable. */
  const inmutable = caches.open(INMUTABLE).then(cache => {
    return cache.add(
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
    );
  });
  /** Se espera a que terminen ambas operaciones. */
  evento.waitUntil(Promise.all([estatico, inmutable]));
});

/**
 * Se borran los caches anteriores.
 */
self.addEventListener('activate', evento => {
  const respuesta = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== ESTATICO && key.includes('estatico')) {
        return caches.delete(key);
      }
    });
  });
  evento.waitUntil(respuesta);
});
/**
 * Estrategia "Cache with Network Fallback"
 */
self.addEventListener('fetch', evento => {
  /** Se lee el archivo en el cache. */
  const respuesta = caches.match(evento.request).then(existente => {
    /** Si existe, se usa. */
    if (existente) return existente;
    /** Si no, se hace la petición para traerlo. */
    return fetch(evento.request)
      .then(archivo => {
        /** Se guarda el archivo en el cache. */
        caches.open(DINAMICO).then(cache => {
          cache.put(evento.request, archivo);
        });
        /** Se retorna el archivo clonado, debido a que ya se uso el original. */
        return archivo.clone();
      })
      .catch(error => {
        /** Se valida que el error sea en un archivo HTML. */
        if (evento.request.headers.get('accept').includes('text/html')) {
          /** Se retorna el archivo por defecto. */
          return caches.match('/pages/offline.html');
        }
      });
  });
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});
