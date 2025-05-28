// src/application/use-cases/UpdateCliente.ts

import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';

export interface UpdateClienteDTO {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export class UpdateCliente {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(data: UpdateClienteDTO): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(data.id);

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    cliente.updateInfo(data.nome, data.email, data.telefone);
    return this.clienteRepository.atualizar(cliente);
  }
}