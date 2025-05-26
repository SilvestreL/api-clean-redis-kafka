import app from './app';
import { connectMongo } from '../infrastructure/database/mongo.connection';
import { ClienteProducer } from '../infrastructure/messaging/KafkaProducer';
import { ClienteConsumer } from '../infrastructure/messaging/KafkaConsumer';


const PORT = process.env.PORT || 3000;

(async () => {
  await connectMongo();

  try {
    await ClienteProducer.connect();
    await ClienteConsumer.connect();
    console.log('✅ Kafka conectado');
  } catch (err) {
    console.error('❌ Erro ao conectar Kafka:', err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})();