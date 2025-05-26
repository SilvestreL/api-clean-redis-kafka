import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();

router.post('/clientes', ClienteController.criar);
router.get('/clientes/:id', ClienteController.buscarPorId);
router.put('/clientes/:id', ClienteController.atualizar);
router.delete('/clientes/:id', ClienteController.excluir); 
router.get('/clientes', ClienteController.listarTodos);

export default router;