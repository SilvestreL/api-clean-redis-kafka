// src/application/use-cases/CreateCliente.ts

import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';
import { v4 as uuidv4 } from 'uuid';

export interface CreateClienteDTO {
  nome: string;
  email: string;
  telefone: string;
}

export class CreateCliente {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute(data: CreateClienteDTO): Promise<Cliente> {
    const cliente = new Cliente(
      uuidv4(), // ← Aqui usamos o UUID como id
      data.nome,
      data.email,
      data.telefone
    );

    const clienteCriado = await this.clienteRepository.criar(cliente);

    // Aqui depois você poderá chamar o KafkaProducer:
    // await this.kafkaProducer.send('cliente_criado', clienteCriado);

    return clienteCriado;
  }
}