"use strict";
// src/infrastructure/database/repositories/ClienteRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const Cliente_1 = require("../../../domain/entities/Cliente");
const ClienteModel_1 = require("../models/ClienteModel");
class ClienteRepository {
    async criar(cliente) {
        const created = await ClienteModel_1.ClienteModel.create({
            _id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
        });
        return new Cliente_1.Cliente(created._id, created.nome, created.email, created.telefone, created.createdAt, created.updatedAt);
    }
    async atualizar(cliente) {
        const updated = await ClienteModel_1.ClienteModel.findByIdAndUpdate(cliente.id, {
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            updatedAt: new Date(),
        }, { new: true });
        if (!updated)
            throw new Error('Cliente não encontrado');
        return new Cliente_1.Cliente(updated._id, updated.nome, updated.email, updated.telefone, updated.createdAt, updated.updatedAt);
    }
    async buscarPorId(id) {
        const found = await ClienteModel_1.ClienteModel.findById(id);
        if (!found)
            return null;
        return new Cliente_1.Cliente(found._id, found.nome, found.email, found.telefone, found.createdAt, found.updatedAt);
    }
    async listarTodos() {
        const clientes = await ClienteModel_1.ClienteModel.find();
        return clientes.map((c) => new Cliente_1.Cliente(c._id, c.nome, c.email, c.telefone, c.createdAt, c.updatedAt));
    }
    async excluir(id) {
        const cliente = await ClienteModel_1.ClienteModel.findByIdAndDelete(id);
        if (!cliente)
            throw new Error('Cliente não encontrado');
    }
}
exports.ClienteRepository = ClienteRepository;
