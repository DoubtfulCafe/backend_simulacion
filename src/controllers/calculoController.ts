import { Request, Response } from "express";

// Datos del suplemento explícitos en el código
const suplemento = {
  nombre: "Ensure Advance",
  calorias_100_gramos: 426,
  proteinas_100_gramos: 15.9,
  lipidos_100_gramos: 14,
  carbohidratos_100_gramos: 55.86,
  copas_porcion: 6,
  equivalente_gramos_procion: 54.1,
};

export const calcularIMCyTMB = (req: Request, res: Response): void => {
  try {
    const { genero, peso, talla, edad, factor_estres, dias_tratamiento } = req.body;

    // Validaciones
    if (!genero || !peso || !talla || !edad || !factor_estres || !dias_tratamiento) {
      res.status(400).json({ error: "Todos los campos son requeridos" });
      return;
    }

    const factorEstresNumerico = parseFloat(factor_estres);
const factoresValidos = [1.2, 1.3, 1.5, 1.7, 2.0];
if (!factoresValidos.includes(factorEstresNumerico)) {
  res.status(400).json({ error: "Factor de estrés no válido" });
  return;
}

const diasTratamiento = parseInt(dias_tratamiento, 10);

if (diasTratamiento <= 0 || !Number.isInteger(diasTratamiento)) {
  res.status(400).json({ error: "El número de días de tratamiento debe ser un entero positivo" });
  return;
}

    // Cálculo del IMC
    const imc = peso / (talla ** 2);
    let clasificacionIMC = "";
    if (imc < 18.5) clasificacionIMC = "Bajo peso";
    else if (imc < 25) clasificacionIMC = "Peso normal";
    else if (imc < 30) clasificacionIMC = "Sobrepeso";
    else if (imc < 35) clasificacionIMC = "Obesidad grado 1";
    else if (imc < 40) clasificacionIMC = "Obesidad grado 2";
    else clasificacionIMC = "Obesidad grado 3 (mórbida)";

    // Cálculo de la TMB ajustada
    let tmb: number;
    if (genero === "Masculino") {
      tmb = 10 * peso + 6.25 * (talla * 100) - 5 * edad + 5;
    } else if (genero === "Femenino") {
      tmb = 10 * peso + 6.25 * (talla * 100) - 5 * edad - 161;
    } else {
      res.status(400).json({ error: "Género no válido" });
      return;
    }

    const tmbAjustada = tmb * factor_estres;

    // Generar resultados por día
    let gramosTotales = 0;
    const resultadosPorDia = [];
    for (let dia = 1; dia <= dias_tratamiento; dia++) {
      // Factor de tolerancia: Día 1 = 50%, Resto aleatorio (50%, 75%, 100%)
      const tolerancia =
        dia === 1 ? 0.5 : [0.5, 0.75, 1.0][Math.floor(Math.random() * 3)];

      const caloriasDia = tmbAjustada * tolerancia;
      const caloriasPorGramo = suplemento.calorias_100_gramos / 100;
      const gramosSuplemento = caloriasDia / caloriasPorGramo;

      gramosTotales += gramosSuplemento;

      const copasNecesarias = Math.ceil(
        (gramosSuplemento / suplemento.equivalente_gramos_procion) *
          suplemento.copas_porcion
      );
      const preparaciones = Math.ceil(copasNecesarias / suplemento.copas_porcion);

      const intervaloHoras = 24 / preparaciones;
      const horas = Math.floor(intervaloHoras);
      const minutos = Math.round((intervaloHoras - horas) * 60);

      resultadosPorDia.push({
        dia,
        porcentajeTolerancia: tolerancia * 100,
        caloriasDia: caloriasDia.toFixed(2),
        suplementoGramos: gramosSuplemento.toFixed(2),
        preparaciones,
        intervaloPreparaciones: { horas, minutos },
      });
    }

    // Calcular latas necesarias
    const latas800g = Math.floor(gramosTotales / 800);
    const gramosRestantes = gramosTotales % 800;
    const latas400g = Math.ceil(gramosRestantes / 400);

    // Respuesta final
    res.json({
      imc: imc.toFixed(2),
      clasificacionIMC,
      tmbAjustada: tmbAjustada.toFixed(2),
      resultadosPorDia,
      resumenTotal: {
        gramosTotales: gramosTotales.toFixed(2),
        latas800g,
        latas400g,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
