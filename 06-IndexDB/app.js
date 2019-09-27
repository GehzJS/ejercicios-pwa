/**
 * Se crea una base de datos de IndexDB
 */
const peticion = window.indexedDB.open('prueba', 1);

/**
 * Se actualiza cuando se crea o se aumenta la version de la base de datos
 */
peticion.onupgradeneeded = evento => {
  /** Se obtiene la base de datos. */
  const base = event.target.result;
  /** Se crea una llave para poder realizar las consultas. */
  base.createObjectStore('personas', { keyPath: 'id' });
};

/**
 * Manejo de errores
 */
peticion.onerror = evento => {
  console.log('Ha ocurrido un error al crear la base de datos.');
};

/**
 * Inserción de datos
 */
peticion.onsuccess = evento => {
  /** Se obtiene la base de datos. */
  const base = event.target.result;
  /** Datos que se van a guardar. */
  const registros = [
    { id: '1', nombre: 'persona1', edad: '10' },
    { id: '2', nombre: 'persona2', edad: '20' }
  ];
  /** Se abre una transacción para poder manipular la base de datos. */
  const transaccion = base.transaction('personas', 'readwrite');
  /** Se maneja el error de la transacción. */
  transaccion.onerror = evento => {
    console.log('Ha ocurrido un error al crear la transacción.', evento);
  };
  /** Se notifica del éxito en la transacción. */
  transaccion.oncomplete = evento => {
    console.log('La transacción se realizó exitosamente.');
  };
  /** Se especifica que objeto de la base de datos será manipulado. */
  const store = transaccion.objectStore('personas');
  /** Se guardan los datos uno por uno. */
  registros.forEach(registro => {
    store.add(registro);
  });
  /** Se notifica del éxito al guardar cada registro. */
  store.onsuccess = evento => {
    console.log('Nuevo registro agregado.');
  };
};
