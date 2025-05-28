// src/main/server.ts

import app from './app';
import { connectMongo } from '../infrastructure/database/mongo.connection';
import { KafkaProducerService } from '../infrastructure/messaging/kafka/KafkaProducer';
import { ClienteConsumer } from '../infrastructure/messaging/kafka/KafkaConsumer';
import { onClienteCriadoHandler } from '../infrastructure/messaging/kafka/handlers/onClienteCriado';

const PORT = process.env.PORT || 3000;

// Instâncias compartilhadas de Kafka (Producer e Consumer)
export const kafkaProducer = new KafkaProducerService();
export const kafkaConsumer = new ClienteConsumer(onClienteCriadoHandler);

async function bootstrap(): Promise<void> {
  try {
    // 1. Conexão com MongoDB
    await connectMongo();
    console.log('✅ Conectado ao MongoDB');

    // 2. Conexão com Kafka
    await kafkaProducer.connect();
    await kafkaConsumer.connect();
    console.log('✅ Kafka conectado');

    // 3. Inicialização do servidor HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro na inicialização:', err);
    process.exit(1); // encerra com erro
  }
}

bootstrap();