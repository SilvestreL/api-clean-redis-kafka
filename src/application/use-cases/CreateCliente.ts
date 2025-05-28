import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';
import { IKafkaProducerService } from '../ports/IKafkaProducerService';
import { z } from 'zod';

type CriarClienteDTO = {
  nome: string;
  email: string;
  telefone: string;
};
export class CreateCliente {
  constructor(
    private readonly clienteRepository: IClienteRepository,
    private readonly kafkaProducer: IKafkaProducerService
  ) {}

  async execute(data: { nome: string; email: string; telefone: string }): Promise<Cliente> {
    const schema = z.object({
      nome: z.string().min(1, 'Nome é obrigatório'),
      email: z.string().email('Email inválido'),
      telefone: z.string().min(1, 'Telefone é obrigatório'),
    });

    const parsed = schema.parse(data);

    console.log('[MongoDB] Criando cliente...');
    
    const clienteCriado = await this.clienteRepository.criar({
      nome: parsed.nome,
      email: parsed.email,
      telefone: parsed.telefone,
    });

    console.log('[MongoDB] Cliente criado com sucesso:', clienteCriado);

    try {
      console.log('[Kafka] Enviando mensagem para tópico cliente.criado...');
      await this.kafkaProducer.send('cliente.criado', clienteCriado);
      console.log('[Kafka] Mensagem enviada com sucesso');
    } catch (err) {
      console.error('[Kafka] Erro ao enviar mensagem:', err);
    }

    return clienteCriado;
  }
}