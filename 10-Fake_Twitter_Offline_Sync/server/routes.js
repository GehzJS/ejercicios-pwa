/**
 * Módulo de rutas
 */
var express = require('express');
var router = express.Router();

/**
 * Mensajes
 */
var mensajes = [
  {
    _id: '1',
    usuario: 'boy-1',
    mensaje: 'Este es un mensaje.'
  }
  // {
  //   _id: '2',
  //   usuario: 'girl-1',
  //   mensaje: 'Este es un mensaje.'
  // }
];

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
  let mensaje = {
    usuario: peticion.body.usuario,
    mensaje: peticion.body.mensaje
  };
  mensajes.push(mensaje);
  console.log(mensajes);
  respuesta.json({
    ok: true,
    mensaje
  });
});

module.exports = router;
