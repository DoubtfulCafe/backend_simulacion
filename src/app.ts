import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importa rutas
import calculoRoutes from "./routes/calculoRoutes";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/calculo", calculoRoutes);

app.use("/api/calculo", (req, res) => {
  res.send("Ruta de cálculo conectada");
});


export default app;
