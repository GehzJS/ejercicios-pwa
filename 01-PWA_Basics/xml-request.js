const peticion = new XMLHttpRequest();

peticion.open('GET', 'https://reqres.in/api/users', true);
peticion.send(null);

peticion.onreadystatechange = state => {
  if (peticion.readyState === 4) {
    const respuesta = JSON.parse(peticion.response);
    console.log(respuesta);
  }
};
