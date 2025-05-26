"use strict";
// src/application/use-cases/CreateCliente.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCliente = void 0;
const Cliente_1 = require("../../domain/entities/Cliente");
const uuid_1 = require("uuid");
class CreateCliente {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(data) {
        const cliente = new Cliente_1.Cliente((0, uuid_1.v4)(), // ← Aqui usamos o UUID como id
        data.nome, data.email, data.telefone);
        const clienteCriado = await this.clienteRepository.criar(cliente);
        // Aqui depois você poderá chamar o KafkaProducer:
        // await this.kafkaProducer.send('cliente_criado', clienteCriado);
        return clienteCriado;
    }
}
exports.CreateCliente = CreateCliente;
