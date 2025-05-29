import mongoose from 'mongoose';

export const connectMongo = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    const msg = '❌ MONGO_URI não definido.';
    if (process.env.NODE_ENV === 'test') throw new Error(msg);
    console.error(msg);
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'test-clientes', // ✅ Defina explicitamente o banco para testes
    });
    console.log(`✅ Conectado ao MongoDB em ${uri}`);
  } catch (error) {
    if (process.env.NODE_ENV === 'test') throw error;
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};