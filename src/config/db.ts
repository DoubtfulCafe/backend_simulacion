import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Asegúrate de que esto esté presente.

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://hamjosue27:oeoKiORQmleJ9e9q@cluster0.wjt5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
};

export default connectDB;

