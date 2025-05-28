"use strict";
// src/application/use-cases/DeleteCliente.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCliente = void 0;
class DeleteCliente {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(id) {
        await this.clienteRepository.excluir(id);
    }
}
exports.DeleteCliente = DeleteCliente;
