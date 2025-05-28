"use strict";
// src/application/use-cases/CreateCliente.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCliente = void 0;
const Cliente_1 = require("../../domain/entities/Cliente");
const uuid_1 = require("uuid");
class CreateCliente {
    constructor(clienteRepository, kafkaProducer) {
        this.clienteRepository = clienteRepository;
        this.kafkaProducer = kafkaProducer;
    }
    async execute(data) {
        const cliente = new Cliente_1.Cliente((0, uuid_1.v4)(), data.nome, data.email, data.telefone);
        const clienteCriado = await this.clienteRepository.criar(cliente);
        // Publish no Kafka via porta
        await this.kafkaProducer.send('cliente.criado', clienteCriado);
        return clienteCriado;
    }
}
exports.CreateCliente = CreateCliente;
