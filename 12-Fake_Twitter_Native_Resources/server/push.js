const vapid = require('./vapid.json');
const urlSafe = require('urlsafe-base64');
const webPush = require('web-push');
const fileSystem = require('fs');
var suscripciones = require('./suscripciones.json');
var enviadas = [];

webPush.setVapidDetails(
  'mailto:piratecorexd@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

module.exports.obtenerClave = () => {
  return urlSafe.decode(vapid.publicKey);
};

module.exports.agregarSuscripcion = suscripcion => {
  suscripciones.push(suscripcion);
  fileSystem.writeFileSync(
    `${__dirname}/suscripciones.json`,
    JSON.stringify(suscripciones)
  );
};

module.exports.enviarPush = notificacion => {
  suscripciones.forEach((suscripcion, indice) => {
    const push = webPush
      .sendNotification(suscripcion, JSON.stringify(notificacion))
      .catch(error => {
        if (error.statusCode === 410) {
          suscripciones[indice].borrar = true;
        }
      });
    enviadas.push(push);
  });
  Promise.all(enviadas).then(() => {
    suscripciones = suscripciones.filter(suscripcion => !suscripcion.borrar);
    fileSystem.writeFileSync(
      `${__dirname}/suscripciones.json`,
      JSON.stringify(suscripciones)
    );
  });
};
