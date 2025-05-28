import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';

export class ListClientes {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.listarTodos();
  }
}