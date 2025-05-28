import { Cliente } from '../entities/Cliente';

export interface IClienteRepository {
  criar(data: { nome: string; email: string; telefone: string }): Promise<Cliente>;
  atualizar(cliente: Cliente): Promise<Cliente>;
  buscarPorId(id: string): Promise<Cliente | null>;
  listarTodos(): Promise<Cliente[]>;
  excluir(id: string): Promise<void>;
}