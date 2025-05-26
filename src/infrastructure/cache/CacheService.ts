import { redis } from './RedisClient';
import { Cliente } from '../../domain/entities/Cliente';

export class CacheService {
  private static prefix = 'cliente:';

  static async get(key: string): Promise<Cliente | null> {
    const data = await redis.get(this.prefix + key);
    return data ? JSON.parse(data) : null;
  }

  static async set(key: string, value: Cliente, ttl = 60): Promise<void> {
    await redis.set(this.prefix + key, JSON.stringify(value), 'EX', ttl);
  }

  static async del(key: string): Promise<void> {
    await redis.del(this.prefix + key);
  }
}