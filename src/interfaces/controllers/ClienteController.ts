import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateCliente } from '../../application/use-cases/CreateCliente';
import { GetClienteById } from '../../application/use-cases/GetClienteById';
import { ListClientes } from '../../application/use-cases/ListClientes';
import { UpdateCliente } from '../../application/use-cases/UpdateCliente';
import { DeleteCliente } from '../../application/use-cases/DeleteCliente';
import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { IKafkaProducerService } from '../../application/ports/IKafkaProducerService';

const clienteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().min(8),
});

export class ClienteController {
  constructor(
    private readonly clienteRepository: IClienteRepository,
    private readonly kafkaProducer: IKafkaProducerService
  ) {}

  /**
   * @swagger
   * /clientes:
   *   post:
   *     summary: Cadastra um novo cliente
   *     tags: [Clientes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - telefone
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João da Silva
   *               email:
   *                 type: string
   *                 example: joao@email.com
   *               telefone:
   *                 type: string
   *                 example: "11999999999"
   *     responses:
   *       201:
   *         description: Cliente criado com sucesso
   *       400:
   *         description: Dados inválidos
   *       500:
   *         description: Erro interno do servidor
   */
  criar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = clienteSchema.parse(req.body);
      const useCase = new CreateCliente(this.clienteRepository, this.kafkaProducer);
      const clienteCriado = await useCase.execute(data);
      return res.status(201).json(clienteCriado);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
      }
      console.error('Erro ao criar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  /**
   * @swagger
   * /clientes/{id}:
   *   get:
   *     summary: Busca um cliente pelo ID
   *     tags: [Clientes]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do cliente
   *     responses:
   *       200:
   *         description: Cliente encontrado
   *       404:
   *         description: Cliente não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  buscarPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const useCase = new GetClienteById(this.clienteRepository);
      const cliente = await useCase.execute(id);

      if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });

      return res.json(cliente);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  /**
   * @swagger
   * /clientes/{id}:
   *   put:
   *     summary: Atualiza os dados de um cliente existente
   *     tags: [Clientes]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do cliente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - telefone
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               telefone:
   *                 type: string
   *     responses:
   *       200:
   *         description: Cliente atualizado com sucesso
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Cliente não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  atualizar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data = clienteSchema.parse(req.body);
      const useCase = new UpdateCliente(this.clienteRepository);
      const atualizado = await useCase.execute({ id, ...data });
      return res.json(atualizado);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
      }
      if (err instanceof Error && err.message === 'Cliente não encontrado') {
        return res.status(404).json({ erro: err.message });
      }
      console.error('Erro ao atualizar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  /**
   * @swagger
   * /clientes:
   *   get:
   *     summary: Lista todos os clientes
   *     tags: [Clientes]
   *     responses:
   *       200:
   *         description: Lista de clientes
   *       500:
   *         description: Erro interno do servidor
   */
  listarTodos = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const useCase = new ListClientes(this.clienteRepository);
      const clientes = await useCase.execute();
      return res.json(clientes);
    } catch (err) {
      console.error('Erro ao listar clientes:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  /**
   * @swagger
   * /clientes/{id}:
   *   delete:
   *     summary: Remove um cliente pelo ID
   *     tags: [Clientes]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do cliente
   *     responses:
   *       204:
   *         description: Cliente removido com sucesso
   *       404:
   *         description: Cliente não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  excluir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const useCase = new DeleteCliente(this.clienteRepository);
      await useCase.execute(id);
      return res.status(204).send();
    } catch (err) {
      if (err instanceof Error && err.message === 'Cliente não encontrado') {
        return res.status(404).json({ erro: err.message });
      }
      console.error('Erro ao excluir cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };
}