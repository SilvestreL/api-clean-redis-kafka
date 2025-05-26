import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clientes_db';

export const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1); // encerra o processo se falhar
  }
};