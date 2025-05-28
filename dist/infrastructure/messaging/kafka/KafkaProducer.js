"use strict";
// src/infrastructure/messaging/kafka/KafkaProducerService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerService = void 0;
const KafkaClient_1 = require("./KafkaClient");
class KafkaProducerService {
    constructor() {
        this.producer = KafkaClient_1.kafka.producer();
    }
    async connect() {
        await this.producer.connect();
    }
    async disconnect() {
        await this.producer.disconnect();
    }
    async send(topic, message) {
        await this.producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });
    }
}
exports.KafkaProducerService = KafkaProducerService;
