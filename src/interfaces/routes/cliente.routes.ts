// src/interfaces/routes/cliente.routes.ts

import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();

router.post('/clientes', ClienteController.criar);

// (mais rotas serão adicionadas aqui depois: GET, PUT, etc.)

export default router;