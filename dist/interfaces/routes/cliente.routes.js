"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClienteRepository_1 = require("../../infrastructure/database/repositories/ClienteRepository");
const ClienteController_1 = require("../controllers/ClienteController");
const asyncHandler_1 = require("../../utils/asyncHandler");
const KafkaProducer_1 = require("../../infrastructure/messaging/kafka/KafkaProducer");
const router = (0, express_1.Router)();
// Injeta as dependências 
const clienteRepository = new ClienteRepository_1.ClienteRepository();
const kafkaProducer = new KafkaProducer_1.KafkaProducerService();
const clienteController = new ClienteController_1.ClienteController(clienteRepository, kafkaProducer);
router.post('/clientes', (0, asyncHandler_1.asyncHandler)(clienteController.criar));
router.get('/clientes/:id', (0, asyncHandler_1.asyncHandler)(clienteController.buscarPorId));
router.put('/clientes/:id', (0, asyncHandler_1.asyncHandler)(clienteController.atualizar));
router.delete('/clientes/:id', (0, asyncHandler_1.asyncHandler)(clienteController.excluir));
router.get('/clientes', (0, asyncHandler_1.asyncHandler)(clienteController.listarTodos));
exports.default = router;
