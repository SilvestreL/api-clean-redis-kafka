import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { asyncHandler } from '../../utils/asyncHandler';


const router = Router();

router.post('/clientes', asyncHandler(ClienteController.criar));
router.get('/clientes/:id', asyncHandler(ClienteController.buscarPorId));
router.put('/clientes/:id', asyncHandler(ClienteController.atualizar));
router.delete('/clientes/:id', asyncHandler(ClienteController.excluir));
router.get('/clientes', asyncHandler(ClienteController.listarTodos));

export default router;