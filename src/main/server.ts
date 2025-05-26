import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// Rota de teste
app.get('/', (_req: Request, res: Response): Response => {
  return res.send('API rodando!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});