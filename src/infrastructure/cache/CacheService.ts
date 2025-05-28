

import * as redisClient from './RedisClient';

export class CacheService {
  private static prefix = 'cliente:';

  static async get(key: string) {
    const data = await redisClient.get(this.prefix + key);
    return data !== null ? JSON.parse(data) : null;
  }

  static async set(key: string, value: any, ttl = 60) {
    await redisClient.set(this.prefix + key, JSON.stringify(value), ttl);
  }

  static async del(key: string) {
    await redisClient.del(this.prefix + key);
  }
}