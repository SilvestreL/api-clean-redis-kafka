"use strict";
// src/interfaces/controllers/ClienteController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const zod_1 = require("zod");
const CreateCliente_1 = require("../../application/use-cases/CreateCliente");
const GetClienteById_1 = require("../../application/use-cases/GetClienteById");
const ListClientes_1 = require("../../application/use-cases/ListClientes");
const UpdateCliente_1 = require("../../application/use-cases/UpdateCliente");
const DeleteCliente_1 = require("../../application/use-cases/DeleteCliente");
const clienteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    telefone: zod_1.z.string().min(8),
});
class ClienteController {
    constructor(clienteRepository, kafkaProducer) {
        this.clienteRepository = clienteRepository;
        this.kafkaProducer = kafkaProducer;
        this.criar = async (req, res) => {
            try {
                const data = clienteSchema.parse(req.body);
                const useCase = new CreateCliente_1.CreateCliente(this.clienteRepository, this.kafkaProducer);
                const clienteCriado = await useCase.execute(data);
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
        this.buscarPorId = async (req, res) => {
            try {
                const { id } = req.params;
                const useCase = new GetClienteById_1.GetClienteById(this.clienteRepository);
                const cliente = await useCase.execute(id);
                if (!cliente)
                    return res.status(404).json({ erro: 'Cliente não encontrado' });
                return res.json(cliente);
            }
            catch (err) {
                console.error('Erro ao buscar cliente:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
        };
        this.atualizar = async (req, res) => {
            try {
                const { id } = req.params;
                const data = clienteSchema.parse(req.body);
                const useCase = new UpdateCliente_1.UpdateCliente(this.clienteRepository);
                const atualizado = await useCase.execute({ id, ...data });
                return res.json(atualizado);
            }
            catch (err) {
                if (err instanceof zod_1.z.ZodError) {
                    return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
                }
                if (err instanceof Error && err.message === 'Cliente não encontrado') {
                    return res.status(404).json({ erro: err.message });
                }
                console.error('Erro ao atualizar cliente:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
        };
        this.listarTodos = async (_req, res) => {
            try {
                const useCase = new ListClientes_1.ListClientes(this.clienteRepository);
                const clientes = await useCase.execute();
                return res.json(clientes);
            }
            catch (err) {
                console.error('Erro ao listar clientes:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
        };
        this.excluir = async (req, res) => {
            try {
                const { id } = req.params;
                const useCase = new DeleteCliente_1.DeleteCliente(this.clienteRepository);
                await useCase.execute(id);
                return res.status(204).send();
            }
            catch (err) {
                if (err instanceof Error && err.message === 'Cliente não encontrado') {
                    return res.status(404).json({ erro: err.message });
                }
                console.error('Erro ao excluir cliente:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
        };
    }
}
exports.ClienteController = ClienteController;
