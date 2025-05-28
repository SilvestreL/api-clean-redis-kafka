"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClienteById = void 0;
class GetClienteById {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(id) {
        return this.clienteRepository.buscarPorId(id);
    }
}
exports.GetClienteById = GetClienteById;
