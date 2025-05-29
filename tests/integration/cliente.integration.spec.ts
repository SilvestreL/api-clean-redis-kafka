// ✅ Variáveis de ambiente ANTES de qualquer import
process.env.MONGO_URI = 'mongodb://mongo:27017/testdb';
process.env.REDIS_HOST = 'localhost';
process.env.KAFKA_DISABLED = 'true';
import * as redisClient from '../../src/infrastructure/cache/RedisClient';

// ✅ Mocks de dependências (antes de qualquer import real)
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    quit: jest.fn(),
  }));
});

jest.mock('../../src/infrastructure/messaging/kafka/KafkaProducer', () => {
  return {
    KafkaProducerService: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      send: jest.fn(),
    })),
  };
});

// ✅ Imports reais só depois das variáveis e mocks
import request from 'supertest';
import app from '../../src/main/app';
import mongoose from 'mongoose';
import Redis from 'ioredis';

import { connectMongo } from '../../src/infrastructure/database/mongo.connection';

// Inicializa o mock do Redis
const redis = new Redis();

describe('ClienteController (integração)', () => {
  // ✅ Conecta ao Mongo uma vez
  beforeAll(async () => {
    await connectMongo();
  });

  // ✅ Limpa a coleção antes de cada teste
  beforeEach(async () => {
    await mongoose.connection.collection('clientes').deleteMany({});
  });

  // ✅ Desconecta ao final
afterAll(async () => {
  await mongoose.disconnect();
  await redisClient.quit(); 
  jest.resetAllMocks();
});

  // ✅ Teste principal
  it(
    'deve cadastrar um cliente com sucesso via POST /clientes',
    async () => {
      const uniqueEmail = `lucas+${Date.now()}@email.com`;

      const response = await request(app).post('/clientes').send({
        nome: 'Lucas',
        email: uniqueEmail,
        telefone: '11999999999',
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(uniqueEmail);
    },
    15000 // timeout extra por segurança
  );
});