
import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';

export class GetClienteById {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(id: string): Promise<Cliente | null> {
    return this.clienteRepository.buscarPorId(id);
  }
}