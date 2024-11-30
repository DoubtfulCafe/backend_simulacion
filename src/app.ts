import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

import userRoutes from "./routes/userRoutes";

app.use("/api/users", userRoutes);

export default app;
