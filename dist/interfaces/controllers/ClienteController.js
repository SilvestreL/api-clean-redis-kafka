"use strict";
// src/interfaces/controllers/ClienteController.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const CreateCliente_1 = require("../../application/use-cases/CreateCliente");
const ClienteRepository_1 = require("../../infrastructure/database/repositories/ClienteRepository");
const zod_1 = require("zod");
const createClienteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    telefone: zod_1.z.string().min(8),
});
// Inversão de dependência
const clienteRepository = new ClienteRepository_1.ClienteRepository();
const createClienteUseCase = new CreateCliente_1.CreateCliente(clienteRepository);
class ClienteController {
}
exports.ClienteController = ClienteController;
_a = ClienteController;
ClienteController.criar = async (req, res) => {
    try {
        const data = createClienteSchema.parse(req.body);
        const clienteCriado = await createClienteUseCase.execute(data);
        return res.status(201).json(clienteCriado);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
        }
        console.error('Erro ao criar cliente:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
ClienteController.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteRepository.buscarPorId(id);
        if (!cliente)
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        return res.json(cliente);
    }
    catch (err) {
        console.error('Erro ao buscar cliente:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
ClienteController.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const data = createClienteSchema.parse(req.body);
        const clienteExistente = await clienteRepository.buscarPorId(id);
        if (!clienteExistente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        clienteExistente.updateInfo(data.nome, data.email, data.telefone);
        const atualizado = await clienteRepository.atualizar(clienteExistente);
        return res.json(atualizado);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
        }
        console.error('Erro ao atualizar cliente:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
ClienteController.listarTodos = async (_req, res) => {
    try {
        const clientes = await clienteRepository.listarTodos();
        return res.json(clientes);
    }
    catch (err) {
        console.error('Erro ao listar clientes:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
ClienteController.excluir = async (req, res) => {
    try {
        const { id } = req.params;
        await clienteRepository.excluir(id);
        return res.status(204).send();
    }
    catch (err) {
        if (err instanceof Error && err.message.includes('Cliente não encontrado')) {
            return res.status(404).json({ erro: err.message });
        }
        console.error('Erro ao excluir cliente:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
