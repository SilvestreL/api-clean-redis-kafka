
// Mocka RedisClient
jest.mock('../../src/infrastructure/cache/RedisClient', () => ({
  __esModule: true,
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
}));

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/main/app';
import { v4 as uuidv4 } from 'uuid';
import { ClienteModel } from '../../src/infrastructure/database/models/ClienteModel';



// Importa o mock para uso nos testes
import * as redisClient from '../../src/infrastructure/cache/RedisClient';

describe('GET /clientes/:id (com Redis)', () => {
  let clienteCriado: any;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      dbName: 'test-clientes',
    });
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await ClienteModel.deleteMany({});

    clienteCriado = await ClienteModel.create({
      _id: uuidv4(),
      nome: 'Lucas',
      email: `lucas+${Date.now()}@email.com`,
      telefone: '11999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('deve retornar cliente do MongoDB e setar no Redis (cache miss)', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    (redisClient.set as jest.Mock).mockResolvedValue('OK');

    const res = await request(app).get(`/clientes/${clienteCriado._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', clienteCriado._id);
    expect(redisClient.get).toHaveBeenCalledWith(`cliente:${clienteCriado._id}`);
expect(redisClient.set).toHaveBeenCalledWith(
  `cliente:${clienteCriado._id}`,
  expect.any(String),
  60
);
  });

  it('deve retornar cliente do Redis (cache hit)', async () => {
    const cachedData = {
      id: clienteCriado._id,
      nome: clienteCriado.nome,
      email: clienteCriado.email,
      telefone: clienteCriado.telefone,
      createdAt: clienteCriado.createdAt.toISOString(),
      updatedAt: clienteCriado.updatedAt.toISOString(),
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedData));

    const res = await request(app).get(`/clientes/${clienteCriado._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', clienteCriado._id);
    expect(redisClient.get).toHaveBeenCalledWith(`cliente:${clienteCriado._id}`);
    expect(redisClient.set).not.toHaveBeenCalled();
  });
});