const sumarLento = numero => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('Hubo un fallo.'), 800);
  });
};

const sumarRapido = numero => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(numero + 1), 300);
  });
};

Promise.all([sumarLento(5), sumarRapido(10)])
  .then(console.log)
  .catch(console.log);
