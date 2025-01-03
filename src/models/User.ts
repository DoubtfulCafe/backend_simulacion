import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
