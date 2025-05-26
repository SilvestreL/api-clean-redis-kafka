"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clientes_db';
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('✅ Conectado ao MongoDB');
    }
    catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error);
        process.exit(1); // encerra o processo se falhar
    }
};
exports.connectMongo = connectMongo;
