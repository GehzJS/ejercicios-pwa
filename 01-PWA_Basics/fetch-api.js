const usuario = {
  correo: 'usuario@mail.com',
  contrasena: 'c0ntr4s3n4'
};

let imagen = document.querySelector('img');

/*  GET   */
fetch('https://reqres.in/api/users')
  .then(respuesta => respuesta.json())
  .then(console.log);

/*  POST, PUT, DELETE   */
fetch('https://reqres.in/api/users', {
  method: 'POST',
  body: JSON.stringify(usuario),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(respuesta => respuesta.json())
  .then(console.log)
  .catch(console.log);

/*  MULTIMEDIA  */
fetch('user.png')
  .then(respuesta => respuesta.blob())
  .then(imagen => {
    const ruta = URL.createObjectURL(imagen);
    imagen.src = ruta;
  });

/*  CLONAR RESPUESTA    */
fetch('https://reqres.in/api/users/1').then(respuesta => {
  respuesta
    .clone()
    .json()
    .then(console.log);
  respuesta.json().then(console.log);
});

/*  MANEJO DE ERRORES    */
fetch('https://reqres.in/api/users/100')
  .then(respuesta => {
    if (respuesta.ok) {
      return respuesta.json();
    } else {
      throw new Error('No existe el usuario.');
    }
  })
  .then(console.log)
  .catch(console.log);

/*  LECTURA DE ARCHIVOS HTML    */
fetch('no-encontrado.html')
  .then(respuesta => respuesta.text())
  .then(html => {
    let body = document.querySelector('body');
    body.innerHTML = html;
  })
  .catch(console.log);
