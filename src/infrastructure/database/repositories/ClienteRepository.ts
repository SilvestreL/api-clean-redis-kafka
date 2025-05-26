import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteModel } from '../models/ClienteModel';
import { CacheService } from '../../cache/CacheService';

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

    const clienteAtualizado = new Cliente(
      updated._id,
      updated.nome,
      updated.email,
      updated.telefone,
      updated.createdAt,
      updated.updatedAt
    );

    await CacheService.del(cliente.id); // Evita dados desatualizados no cache

    return clienteAtualizado;
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    // 1. Tenta pegar do cache
    const cacheHit = await CacheService.get(id);
    if (cacheHit) {
      return new Cliente(
        cacheHit.id,
        cacheHit.nome,
        cacheHit.email,
        cacheHit.telefone,
        cacheHit.createdAt,
        cacheHit.updatedAt
      );
    }

    // 2. Se não achar no cache, busca no banco
    const found = await ClienteModel.findById(id);
    if (!found) return null;

    const cliente = new Cliente(
      found._id,
      found.nome,
      found.email,
      found.telefone,
      found.createdAt,
      found.updatedAt
    );

    // 3. Salva no cache para próximas requisições
    await CacheService.set(id, cliente);

    return cliente;
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

  async excluir(id: string): Promise<void> {
    const cliente = await ClienteModel.findByIdAndDelete(id);
    if (!cliente) throw new Error('Cliente não encontrado');

    await CacheService.del(id); // Remove do cache após exclusão
  }
}