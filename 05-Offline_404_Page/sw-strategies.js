/**
 * Se crea el App Shell una vez instalado el Service Worker.
 */
self.addEventListener('install', evento => {
  /** Se guarda el cache estático. */
  const estatico = caches.open('estatico').then(cache => {
    return cache.addAll([
      '/', // Se guarda el slash ya que se toma como una petición extra al inicio.
      '/index.html',
      '/css/style.css',
      '/js/app.js',
      '/img/main.jpg',
      '/img/no-img.jpg'
    ]);
  });
  /** Se guarda el cache inmutable. */
  const inmutable = caches.open('inmutable').then(cache => {
    return cache.add(
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
    );
  });
  /** Se espera a que terminen ambas operaciones. */
  evento.waitUntil(Promise.all([estatico, inmutable]));
});

/**
 * Función para eliminar los elementos antiguos del cache dinámico.
 */
const limpiarCache = () => {
  /** Se lee el cache dinámico. */
  caches.open('dinamico').then(cache => {
    /** Se recorre el arreglo de elementos del cache dinámico. */
    return cache.keys().then(keys => {
      /** Si se excede el tamaño máximo permitido del cache dinámico */
      if (keys.length >= 5) {
        /** Se elimina el elemento más antiguo del cache dinámico... */
        /** Y se ejecuta de nuevo la función para continuar eliminando si es necesario. */
        cache.delete(keys[0]).then(limpiarCache());
      }
    });
  });
};

/**
 * Estrategia "Cache Only"
 */
self.addEventListener('fetch', evento => {
  /** Se responde únicamente con los archivos que estan en el cache. */
  evento.respondWith(caches.match(evento.request));
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
    return fetch(evento.request).then(archivo => {
      /** Se guarda el archivo en el cache. */
      caches.open('estatico').then(cache => {
        cache.put(evento.request, archivo);
      });
      /** Se retorna el archivo clonado, debido a que ya se uso el original. */
      return archivo.clone();
    });
  });
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});

/**
 * Estrategia "Dynamic Cache"
 */
self.addEventListener('fetch', evento => {
  /** Se lee el archivo en el cache. */
  const respuesta = caches.match(evento.request).then(existente => {
    /** Si existe, se usa. */
    if (existente) return existente;
    /** Si no, se hace la petición para traerlo. */
    return fetch(evento.request).then(archivo => {
      /** Se guarda el archivo en el cache. */
      caches.open('dinamico').then(cache => {
        cache.put(evento.request, archivo);
        limpiarCache();
      });
      /** Se retorna el archivo clonado, debido a que ya se uso el original. */
      return archivo.clone();
    });
  });
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});

/**
 * Estrategia "Network with Cache Callback"
 */
self.addEventListener('fetch', evento => {
  /** Se realiza la petición al recurso en línea. */
  const respuesta = fetch(evento.request)
    .then(disponible => {
      /** Si el recuerso no existe, se inetnta cargar un archivo del cache. */
      if (!disponible) return caches.match(evento.request);
      /** Se almacena el recurso en el cache. */
      caches.open('dinamico').then(cache => {
        cache.put(evento.request, disponible);
        limpiarCache();
      });
      /** Se retorna la respuesta que se obtuvo clonada, debido a que ya se uso. */
      return disponible.clone();
    })
    /** Se maneja el error. */
    .catch(() => caches.match(evento.request));
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});

/**
 * Estrategia "Cache with Network Update"
 */
self.addEventListener('fetch', evento => {
  /** Se maneja el error de los archivos del cache inmutable. */
  if (evento.request.url.includes('bootstrap'))
    return evento.respondWith(caches.match(evento.request));
  /** Se actualiza el archivo requerido que esta en el cache por el de la red. */
  const respuesta = caches.open('estatico').then(cache => {
    fetch(evento.request).then(nuevo => cache.put(evento.request, nuevo));
    /** Se retorna el archivo anterior. */
    return cache.match(evento.request);
  });
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});

/**
 * Estrategia "Cache and Network Race"
 */
self.addEventListener('fetch', evento => {
  /** Se realizan ambas peticiones para ver cual es la más óptima. */
  const respuesta = new Promise((resolve, reject) => {
    /** Se usa para indicar cual de las dos peticiones fue rechazada. */
    let rechazada = false;
    /** Se ejecuta cuando ocurre un error en cualquier petición. */
    const fallo = () => {
      if (rechazada) {
        /** Se verifica si el error se dió con una imagen. */
        if (/\.(png|jpg)$/i.test(evento.request.url)) {
          resolve(caches.match('/img/no-img.jpg'));
        } else {
          /** Se manda si no hay nada por hacer. */
          reject('No se pudo conectar con el servidor.');
        }
      } else {
        /** Se rechaza la petición en cuestión. */
        rechazada = true;
      }
    };
    /** Se realiza la petición a la red. */
    fetch(evento.request)
      .then(archivo => (archivo.ok ? resolve(archivo) : fallo()))
      .catch(fallo);
    /** Se realiza la petición al cache. */
    caches
      .match(evento.request)
      .then(cache => (cache ? resolve(cache) : fallo()))
      .catch(fallo);
  });
  /** Se envía la respuesta. */
  evento.respondWith(respuesta);
});
