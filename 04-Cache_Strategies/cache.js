/**
 * Se verifica que se pueda utilizar el Cache en el navegador.
 */
if (window.caches) {
  /** Se verifica que exista el directorio en el cache, y si no, se crea. */
  caches.open('prueba');

  /** Se verifica que exista el directorio en el cache. */
  caches.has('prueba').then(console.log);

  /** Se borra el cache si existe. */
  caches.delete('prueba').then(console.log);

  /** Se crea el cache y se almacenan archivos. */
  caches.open('prueba').then(cache => {
    /** Almacenamiento individual. */
    cache.add('/index.html').then(() =>
      /** Se lee un archivo del cache. */
      cache.match('/index.html').then(index => index.text().then(console.log))
    );

    /** Almacenamiento grupal. */
    cache
      .addAll(['/js/app.js', '/css/style.css', '/img/main.jpg'])
      /** Eliminación específica. */
      .then(() => cache.delete('/img/main.jpg'));
  });
  /** Se obtiene una lista con todos los caches de la aplicación. */
  caches.keys().then(console.log);
}
