"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClientes = void 0;
class ListClientes {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute() {
        return this.clienteRepository.listarTodos();
    }
}
exports.ListClientes = ListClientes;
