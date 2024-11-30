import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

// Conecta a MongoDB antes de levantar el servidor
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
