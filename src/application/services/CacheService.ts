// src/application/services/CacheService.ts
import { ICacheService } from '../ports/ICacheService';
import * as redis from '../../infrastructure/cache/RedisClient';

export class CacheService implements ICacheService {
  private static prefix = 'cliente:';

  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(CacheService.prefix + key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttl = 60): Promise<void> {
    await redis.set(CacheService.prefix + key, JSON.stringify(value), ttl);
  }

  async del(key: string): Promise<void> {
    await redis.del(CacheService.prefix + key);
  }
}