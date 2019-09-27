/**
 * Se verifica si se puede utilizar el Service Worker en el navegador.
 */
if (navigator.serviceWorker) {
  /** Se crea el Service Worker. */
  navigator.serviceWorker.register('/sw.js');
}
