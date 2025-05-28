"use strict";
// src/application/use-cases/UpdateCliente.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCliente = void 0;
class UpdateCliente {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(data) {
        const cliente = await this.clienteRepository.buscarPorId(data.id);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        cliente.updateInfo(data.nome, data.email, data.telefone);
        return this.clienteRepository.atualizar(cliente);
    }
}
exports.UpdateCliente = UpdateCliente;
