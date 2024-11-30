import { Request, Response } from "express";
import User from "../models/User";

export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
