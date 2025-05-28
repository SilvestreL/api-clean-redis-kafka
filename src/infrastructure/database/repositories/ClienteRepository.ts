import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteModel } from '../models/ClienteModel';
import { ICacheService } from '../../../application/ports/ICacheService';
import { v4 as uuidv4 } from 'uuid';

type CriarClienteDTO = {
  nome: string;
  email: string;
  telefone: string;
};

export class ClienteRepository implements IClienteRepository {
  constructor(private readonly cacheService: ICacheService) {}

  async criar(dados: CriarClienteDTO): Promise<Cliente> {
    const clienteCriado = await ClienteModel.create({
      _id: uuidv4(),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
    });

    return new Cliente(
      clienteCriado._id,
      clienteCriado.nome,
      clienteCriado.email,
      clienteCriado.telefone,
      clienteCriado.createdAt,
      clienteCriado.updatedAt
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

    await this.cacheService.del(cliente.id);
    return clienteAtualizado;
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    const cacheHit = await this.cacheService.get<Cliente>(id);
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

    await this.cacheService.set(id, cliente);
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
    await this.cacheService.del(id);
  }
}