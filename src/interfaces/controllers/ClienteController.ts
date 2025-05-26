// src/interfaces/controllers/ClienteController.ts

import { Request, Response } from 'express';
import { CreateCliente } from '../../application/use-cases/CreateCliente';
import { ClienteRepository } from '../../infrastructure/database/repositories/ClienteRepository';
import { z } from 'zod';
import { Cliente } from '../../domain/entities/Cliente';

const createClienteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().min(8),
});

// Inversão de dependência
const clienteRepository = new ClienteRepository();
const createClienteUseCase = new CreateCliente(clienteRepository);

export class ClienteController {
  static async criar(req: Request, res: Response): Promise<Response> {
    try {
      const data = createClienteSchema.parse(req.body);
      const clienteCriado = await createClienteUseCase.execute(data);
      return res.status(201).json(clienteCriado);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
      }

      console.error('Erro ao criar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  static async buscarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const cliente = await clienteRepository.buscarPorId(id);

      if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });

      return res.json(cliente);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  static async atualizar(req: Request, res: Response): Promise<Response> {
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
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
      }

      console.error('Erro ao atualizar cliente:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  static async listarTodos(_req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await clienteRepository.listarTodos();
      return res.json(clientes);
    } catch (err) {
      console.error('Erro ao listar clientes:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
   
static async excluir(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    await clienteRepository.excluir(id);
    return res.status(204).send();
  } catch (err) {
    if (err instanceof Error && err.message.includes('Cliente não encontrado')) {
      return res.status(404).json({ erro: err.message });
    }

    console.error('Erro ao excluir cliente:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
}