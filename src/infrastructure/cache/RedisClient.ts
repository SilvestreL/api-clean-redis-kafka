// src/infrastructure/cache/RedisClient.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
});

export async function get(key: string): Promise<string | null> {
  return redis.get(key);
}

export async function set(key: string, value: string, ttl = 60): Promise<'OK' | null> {
  return redis.set(key, value, 'EX', ttl);
}

export async function del(key: string): Promise<number> {
  return redis.del(key);
}

export async function quit(): Promise<void> {
  await redis.quit();
}