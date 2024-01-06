import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const AdminModel = mongoose.model<Admin>("Admin", adminSchema);
