import { Request, Response } from "express";

// Controlador para calcular el IMC y la TMB
export const calcularIMCyTMB = (req: Request, res: Response): void => {
  const { genero, peso, talla, edad, factor_estres } = req.body;

  // Validación básica
  if (!genero || !peso || !talla || !edad || !factor_estres) {
    res.status(400).json({ error: "Todos los campos son requeridos" });
    return;
  }

    // Validación del factor de estrés (opcional, si deseas verificar valores específicos)
    const factoresValidos = [1.2, 1.3, 1.5, 1.7, 2.0];
    if (!factoresValidos.includes(factor_estres)) {
      res.status(400).json({ error: "Factor de estrés no válido" });
      return;
    }



  // Cálculo del IMC
  const imc = peso / (talla ** 2);

   // Determinar clasificación del IMC según la tabla de la OMS
   let clasificacion_imc = "";
   if (imc < 18.5) {
     clasificacion_imc = "Bajo peso";
   } else if (imc < 25) {
     clasificacion_imc = "Peso normal";
   } else if (imc < 30) {
     clasificacion_imc = "Sobrepeso";
   } else if (imc < 35) {
     clasificacion_imc = "Obesidad grado 1";
   } else if (imc < 40) {
     clasificacion_imc = "Obesidad grado 2";
   } else {
     clasificacion_imc = "Obesidad grado 3 (mórbida)";
   }

  // Cálculo de la TMB
  let tmb;
  if (genero === "Masculino") {
    tmb = 10 * peso + 6.25 * (talla * 100) - 5 * edad + 5;
  } else if (genero === "Femenino") {
    tmb = 10 * peso + 6.25 * (talla * 100) - 5 * edad - 161;
  } else {
    res.status(400).json({ error: "Género no válido" });
    return;
  }

   // Cálculo de la TMB ajustada al factor de estrés
   const tmb_ajustada = tmb * factor_estres;


  // Respuesta con los resultados
  res.json({
    imc: imc.toFixed(2),
    clasificacion_imc,
    tmb: tmb.toFixed(2),
    tmb_ajustada: tmb_ajustada.toFixed(2)
  });
};
