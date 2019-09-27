/**
 * Módulo de rutas
 */
const express = require('express');
const router = express.Router();
const push = require('./push');

/**
 * Mensajes
 */
var mensajes = [
  {
    _id: '1',
    usuario: 'boy-1',
    mensaje: 'Este es un mensaje.'
  },
  {
    _id: '2',
    usuario: 'girl-1',
    mensaje: 'Este es un mensaje.'
  }
];

/**
 * Almacena la suscripción del cliente
 */
router.post('/suscripcion', (peticion, respuesta) => {
  const suscripcion = peticion.body;
  push.agregarSuscripcion(suscripcion);
  respuesta.json('Suscripción');
});

/**
 * Se obtiene la clave pública
 */
router.get('/clave', (peticion, respuesta) => {
  const publica = push.obtenerClave();
  respuesta.send(publica);
});

/**
 * Envía notificaciones push
 */
router.post('/push', (peticion, respuesta) => {
  const notificacion = {
    titulo: peticion.body.titulo,
    contenido: peticion.body.contenido,
    usuario: peticion.body.usuario
  };
  push.enviarPush(notificacion);
  respuesta.json(notificacion);
});

/**
 * Obtener mensajes
 */
router.get('/', (peticion, respuesta) => {
  respuesta.json(mensajes);
});

/**
 * Guardar mensajes
 */
router.post('/', (peticion, respuesta) => {
  console.log(peticion.body.lat);
  console.log(peticion.body.lng);
  let mensaje = {
    usuario: peticion.body.usuario,
    mensaje: peticion.body.mensaje,
    lat: peticion.body.lat,
    lng: peticion.body.lng,
    foto: peticion.body.foto
  };
  let notificacion = {
    titulo: `${peticion.body.usuario} ha envíado un mensaje:`,
    contenido: peticion.body.mensaje,
    usuario: peticion.body.usuario
  };
  mensajes.push(mensaje);
  push.enviarPush(notificacion);
  respuesta.json({
    ok: true,
    mensaje
  });
});

module.exports = router;
