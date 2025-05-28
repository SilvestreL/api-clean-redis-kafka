"use strict";
// src/infrastructure/messaging/kafka/handlers/onClienteCriado.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClienteCriadoHandler = onClienteCriadoHandler;
async function onClienteCriadoHandler(data) {
    console.log('[HANDLER] Cliente criado:', data);
    // Aqui você pode fazer algo como:
    // await logRepository.save(data);
    // await analyticsService.track('cliente_criado', data);
}
