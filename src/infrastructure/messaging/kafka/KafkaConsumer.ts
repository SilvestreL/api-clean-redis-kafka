import { kafka } from './KafkaClient';
import { Consumer, EachMessagePayload } from 'kafkajs';

export class ClienteConsumer {
  private readonly consumer: Consumer;

  constructor(
    private readonly handler: (msg: any) => Promise<void>,
    private readonly groupId = 'clientes-group'
  ) {
    this.consumer = kafka.consumer({ groupId: this.groupId });
  }

  async connect(topic = 'cliente.criado'): Promise<void> {
    try {
      console.log(`[Kafka][Consumer] Conectando ao grupo ${this.groupId}...`);
      await this.consumer.connect();
      await this.consumer.subscribe({ topic, fromBeginning: true });
      console.log(`[Kafka][Consumer] Inscrito no tópico: ${topic}`);

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          const { message, topic } = payload;
          const data = message.value?.toString();

          if (data) {
            try {
              const parsed = JSON.parse(data);
              console.log(`[Kafka][Consumer] Mensagem recebida:`, parsed);
              await this.handler(parsed);
            } catch (err) {
              console.error(`[Kafka][Consumer] Erro ao processar mensagem no tópico ${topic}:`, err);
            }
          } else {
            console.warn(`[Kafka][Consumer] Mensagem vazia recebida no tópico ${topic}.`);
          }
        },
      });

      console.log(`[Kafka][Consumer] Consumidor rodando...`);
    } catch (error) {
      console.error(`[Kafka][Consumer] Erro ao conectar:`, error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log(`[Kafka][Consumer] Desconectado com sucesso.`);
    } catch (err) {
      console.error(`[Kafka][Consumer] Erro ao desconectar:`, err);
    }
  }
}