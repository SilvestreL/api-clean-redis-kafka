"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const Cliente_1 = require("../../../domain/entities/Cliente");
const ClienteModel_1 = require("../models/ClienteModel");
const CacheService_1 = require("../../cache/CacheService");
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
        const clienteAtualizado = new Cliente_1.Cliente(updated._id, updated.nome, updated.email, updated.telefone, updated.createdAt, updated.updatedAt);
        await CacheService_1.CacheService.del(cliente.id); // Evita dados desatualizados no cache
        return clienteAtualizado;
    }
    async buscarPorId(id) {
        // 1. Tenta pegar do cache
        const cacheHit = await CacheService_1.CacheService.get(id);
        if (cacheHit) {
            console.log(`[CACHE] Cliente ${id} encontrado no Redis`);
            return new Cliente_1.Cliente(cacheHit.id, cacheHit.nome, cacheHit.email, cacheHit.telefone, cacheHit.createdAt, cacheHit.updatedAt);
        }
        // 2. Se não achar no cache, busca no banco
        console.log(`[CACHE] Cliente ${id} encontrado no Redis`);
        const found = await ClienteModel_1.ClienteModel.findById(id);
        if (!found)
            return null;
        const cliente = new Cliente_1.Cliente(found._id, found.nome, found.email, found.telefone, found.createdAt, found.updatedAt);
        // 3. Salva no cache para próximas requisições
        await CacheService_1.CacheService.set(id, cliente);
        return cliente;
    }
    async listarTodos() {
        const clientes = await ClienteModel_1.ClienteModel.find();
        return clientes.map((c) => new Cliente_1.Cliente(c._id, c.nome, c.email, c.telefone, c.createdAt, c.updatedAt));
    }
    async excluir(id) {
        const cliente = await ClienteModel_1.ClienteModel.findByIdAndDelete(id);
        if (!cliente)
            throw new Error('Cliente não encontrado');
        await CacheService_1.CacheService.del(id); // Remove do cache após exclusão
    }
}
exports.ClienteRepository = ClienteRepository;
