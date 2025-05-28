// src/infrastructure/messaging/kafka/KafkaProducerService.ts

import { kafka } from './KafkaClient';
import { IKafkaProducerService } from '../../../application/ports/IKafkaProducerService';
import { Producer } from 'kafkajs';

export class KafkaProducerService implements IKafkaProducerService {
  private readonly producer: Producer;
  private isConnected: boolean = false;

  constructor() {
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.producer.connect();
        this.isConnected = true;
        console.log('[Kafka] Producer conectado com sucesso.');
      } catch (error) {
        console.error('[Kafka] Falha ao conectar producer:', error);
        throw error;
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log('[Kafka] Producer desconectado.');
    }
  }

  async send(topic: string, message: unknown): Promise<void> {
    if (!this.isConnected) {
      console.warn('[Kafka] Producer não conectado. Tentando conectar automaticamente...');
      await this.connect(); // cuidado: remove se preferir conectar apenas no bootstrap
    }

    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`[Kafka] Mensagem enviada para o tópico "${topic}" com sucesso.`);
    } catch (error) {
      console.error('[Kafka] Erro ao enviar mensagem:', error);
      throw error;
    }
  }
}