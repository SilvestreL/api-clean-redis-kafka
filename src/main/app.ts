import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import clienteRoutes from '../interfaces/routes/cliente.routes'; // ajuste o caminho se necessário

const app = express();

// Middleware para tratar JSON no corpo da requisição
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use('/', clienteRoutes); // ou use('/api', clienteRoutes) se quiser prefixo

export default app;