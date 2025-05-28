import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

process.env.MONGO_URI = 'mongodb://localhost:27017/clientes_test';
process.env.REDIS_HOST = 'localhost';
process.env.KAFKA_DISABLED = 'true';