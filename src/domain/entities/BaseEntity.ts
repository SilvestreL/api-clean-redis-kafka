// src/domain/entities/Cliente.ts

import { BaseEntity } from './BaseEntity';

export class Cliente extends BaseEntity {
  public nome: string;
  public email: string;
  public telefone: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  updateInfo(nome: string, email: string, telefone: string) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.updateTimestamp();
  }
}