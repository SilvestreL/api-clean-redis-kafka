import { Router } from 'express';
import { ClienteRepository } from '../../infrastructure/database/repositories/ClienteRepository';
import { ClienteController } from '../controllers/ClienteController';
import { asyncHandler } from '../../utils/asyncHandler';
import { KafkaProducerService } from '../../infrastructure/messaging/kafka/KafkaProducer';
import { CacheService } from '../../application/services/CacheService'; // 

const router = Router();

// Injeta as dependências 
const kafkaProducer = new KafkaProducerService();
const cacheService = new CacheService(); // ✅ instancia do cache
const clienteRepository = new ClienteRepository(cacheService); // 
const clienteController = new ClienteController(clienteRepository, kafkaProducer);

// Rotas
router.post('/clientes', asyncHandler(clienteController.criar));
router.get('/clientes/:id', asyncHandler(clienteController.buscarPorId));
router.put('/clientes/:id', asyncHandler(clienteController.atualizar));
router.delete('/clientes/:id', asyncHandler(clienteController.excluir));
router.get('/clientes', asyncHandler(clienteController.listarTodos));

export default router;