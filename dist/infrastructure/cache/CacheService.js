"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const RedisClient_1 = require("./RedisClient");
class CacheService {
    static async get(key) {
        const data = await RedisClient_1.redis.get(this.prefix + key);
        return data ? JSON.parse(data) : null;
    }
    static async set(key, value, ttl = 60) {
        await RedisClient_1.redis.set(this.prefix + key, JSON.stringify(value), 'EX', ttl);
    }
    static async del(key) {
        await RedisClient_1.redis.del(this.prefix + key);
    }
}
exports.CacheService = CacheService;
CacheService.prefix = 'cliente:';
