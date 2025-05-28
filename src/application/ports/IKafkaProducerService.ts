export interface IKafkaProducerService {
  send(topic: string, message: unknown): Promise<void>;
}