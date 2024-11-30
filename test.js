const axios = require("axios");

// Prueba de método POST
axios.post("http://localhost:5000/api/calculo/calcular", {
  genero: "Masculino",
  peso: 70,
  talla: 1.75,
  edad: 25
})
  .then(response => {
    console.log("Respuesta del servidor:");
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error en la solicitud:");
    console.error(error.message);
  });
