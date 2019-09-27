// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
const base = new PouchDB('mensajes');

// Objeto a grabar en base de datos
let mensajes = [
  {
    _id: '3',
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
  },
  {
    _id: '4',
    user: 'tía may',
    mensaje: 'Yo hice unos panqueques muy buenos',
    sincronizado: false
  }
];

// 2- Insertar en la base de datos
mensajes.forEach(mensaje => {
  base
    .put(mensaje)
    .then(console.log('ok'))
    .catch(console.log);
});

// 3- Leer todos los mensajes offline
base
  .allDocs({ include_docs: true, descending: false })
  .then(docs => {
    docs.rows.forEach(row => {
      console.log(row.doc);
    });
  })
  .catch(console.log);

// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
base
  .allDocs({ include_docs: true, descending: true })
  .then(docs => {
    docs.rows.forEach(row => {
      row.doc.sincronizado = true;
      base.put(row.doc);
    });
  })
  .catch(console.log);

// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización
base
  .allDocs({ include_docs: true, descending: true })
  .then(docs => {
    docs.rows.forEach(row => {
      if (row.doc.sincronizado) base.remove(row.doc);
    });
  })
  .catch(console.log);
