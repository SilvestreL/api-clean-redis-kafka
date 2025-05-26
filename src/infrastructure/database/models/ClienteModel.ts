// src/infrastructure/database/models/ClienteModel.ts

import { Schema, model, Document } from 'mongoose';

export interface ClienteDocument extends Document {
  _id: string; // UUID
  nome: string;
  email: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClienteSchema = new Schema<ClienteDocument>(
  {
    _id: {
      type: String, // ← UUID como ID principal
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //  createdAt + updatedAt
    versionKey: false,
  }
);

export const ClienteModel = model<ClienteDocument>('Cliente', ClienteSchema);