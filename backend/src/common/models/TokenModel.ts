import mongoose, { Document, Schema } from "mongoose";

export interface Token extends Document {
  token: string;
  isActive: boolean;
  role: string;
}

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
});

export const TokenModel = mongoose.model<Token>("Token", tokenSchema);
