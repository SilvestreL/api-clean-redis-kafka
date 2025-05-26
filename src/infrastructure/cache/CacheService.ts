import { redis } from './RedisClient'; 

export class CacheService {
  private static prefix = 'cliente:';

  static async get(key: string) {
    const data = await redis.get(this.prefix + key);
    return data ? JSON.parse(data) : null;
  }

  static async set(key: string, value: any, ttl = 60) {
    await redis.set(this.prefix + key, JSON.stringify(value), 'EX', ttl);
  }

  static async del(key: string) {
    await redis.del(this.prefix + key);
  }
}