"use strict";
// src/main/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongo_connection_1 = require("../infrastructure/database/mongo.connection");
// Handlers e serviços de mensageria
const onClienteCriado_1 = require("../infrastructure/messaging/kafka/handlers/onClienteCriado");
const KafkaConsumer_1 = require("../infrastructure/messaging/kafka/KafkaConsumer");
const KafkaProducer_1 = require("../infrastructure/messaging/kafka/KafkaProducer");
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        // 1. Conexão com MongoDB
        await (0, mongo_connection_1.connectMongo)();
        // 2. Inicializa serviços Kafka
        const kafkaProducer = new KafkaProducer_1.KafkaProducerService(); // implementa IKafkaProducerService
        const kafkaConsumer = new KafkaConsumer_1.ClienteConsumer(onClienteCriado_1.onClienteCriadoHandler);
        await kafkaProducer.connect();
        await kafkaConsumer.connect();
        console.log('✅ Kafka conectado');
        // 3. Inicializa servidor HTTP
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
        // DICA: você pode exportar os producers/consumers se quiser acesso em outros pontos
        // export { kafkaProducer, kafkaConsumer };
    }
    catch (err) {
        console.error('❌ Erro na inicialização:', err);
    }
})();
