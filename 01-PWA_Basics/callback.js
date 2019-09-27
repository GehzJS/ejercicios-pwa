const sumar = (numero, callback) => {
  if (numero >= 7) {
    console.log('Número muy grande.');
    return;
  }
  setTimeout(() => {
    callback(null, numero + 1);
  }, 800);
};

sumar(5, (error, nuevo) => {
  if (error) {
    console.log(error);
  }
  sumar(nuevo, (error, masNuevo) => {
    if (error) {
      console.log(error);
    }
    sumar(masNuevo, (error, aunMasNuevo) => {
      if (error) {
        console.log(error);
      }
      console.log(aunMasNuevo);
    });
  });
});
