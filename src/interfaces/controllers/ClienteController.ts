// src/interfaces/controllers/ClienteController.ts

import { Request, Response } from 'express';
import { CreateCliente } from '../../application/use-cases/CreateCliente';
import { ClienteRepository } from '../../infrastructure/database/repositories/ClienteRepository';
import { z } from 'zod';

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
}