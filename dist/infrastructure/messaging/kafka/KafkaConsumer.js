"use strict";
// src/infrastructure/messaging/kafka/ClienteConsumer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteConsumer = void 0;
const KafkaClient_1 = require("./KafkaClient");
class ClienteConsumer {
    constructor(handler, groupId = 'clientes-group') {
        this.handler = handler;
        this.groupId = groupId;
        this.consumer = KafkaClient_1.kafka.consumer({ groupId: this.groupId });
    }
    async connect(topic = 'cliente.criado') {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const data = message.value?.toString();
                if (data) {
                    try {
                        await this.handler(JSON.parse(data));
                    }
                    catch (err) {
                        console.error(`[KAFKA][CONSUMER] Erro no handler: ${err}`);
                    }
                }
            },
        });
    }
    async disconnect() {
        await this.consumer.disconnect();
    }
}
exports.ClienteConsumer = ClienteConsumer;
