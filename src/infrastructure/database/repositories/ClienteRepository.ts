// src/infrastructure/database/repositories/ClienteRepository.ts

import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteModel } from '../models/ClienteModel';

export class ClienteRepository implements IClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const created = await ClienteModel.create({
      _id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
    });

    return new Cliente(
      created._id,
      created.nome,
      created.email,
      created.telefone,
      created.createdAt,
      created.updatedAt
    );
  }

  async atualizar(cliente: Cliente): Promise<Cliente> {
    const updated = await ClienteModel.findByIdAndUpdate(
      cliente.id,
      {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) throw new Error('Cliente não encontrado');

    return new Cliente(
      updated._id,
      updated.nome,
      updated.email,
      updated.telefone,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    const found = await ClienteModel.findById(id);
    if (!found) return null;

    return new Cliente(
      found._id,
      found.nome,
      found.email,
      found.telefone,
      found.createdAt,
      found.updatedAt
    );
  }

  async listarTodos(): Promise<Cliente[]> {
    const clientes = await ClienteModel.find();

    return clientes.map(
      (c) =>
        new Cliente(
          c._id,
          c.nome,
          c.email,
          c.telefone,
          c.createdAt,
          c.updatedAt
        )
    );
  }
}