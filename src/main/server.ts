import app from './app';
import { connectMongo } from '../infrastructure/database/mongo.connection';

const PORT = process.env.PORT || 3000;

(async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})();