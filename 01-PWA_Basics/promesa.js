const sumar = numero => {
  return new Promise((resolve, reject) => {
    if (numero >= 7) {
      reject('Número muy grande.');
    }
    setTimeout(() => {
      resolve(numero + 1);
    }, 800);
  });
};

sumar(5)
  .then(sumar) // Cuando el valor que se recibe y el argumento de la siguiente
  .then(sumar) // promesa es el mismo, sólo se manda la función a ejecutar.
  .then(console.log)
  .catch(console.log);
