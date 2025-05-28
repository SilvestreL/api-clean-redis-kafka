// src/infrastructure/messaging/kafka/handlers/onClienteCriado.ts

export async function onClienteCriadoHandler(data: any) {
  console.log('[HANDLER] Cliente criado:', data);

  // Aqui você pode fazer algo como:
  // await logRepository.save(data);
  // await analyticsService.track('cliente_criado', data);
}