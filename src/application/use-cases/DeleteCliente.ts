// src/application/use-cases/DeleteCliente.ts

import { IClienteRepository } from '../../domain/repositories/IClienteRepository';

export class DeleteCliente {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(id: string): Promise<void> {
    await this.clienteRepository.excluir(id);
  }
}