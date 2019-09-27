const obtener = () => {
  fetch('https://swapi.co/api/people/1')
    .then(respuesta => respuesta.json())
    .then(guardar)
    .then(respuesta => respuesta.json())
    .then(console.log)
    .catch(console.log);
};

const guardar = heroe => {
  return fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify({ nombre: heroe.name, genero: heroe.gender }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

obtener();
