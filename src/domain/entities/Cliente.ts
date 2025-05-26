// src/domain/repositories/IClienteRepository.ts

import { Cliente } from '../entities/Cliente';

export interface IClienteRepository {
  criar(cliente: Cliente): Promise<Cliente>;
  atualizar(cliente: Cliente): Promise<Cliente>;
  buscarPorId(id: string): Promise<Cliente | null>;
  listarTodos(): Promise<Cliente[]>;
}