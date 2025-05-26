
import express from 'express';
import clienteRoutes from '../interfaces/routes/cliente.routes';

const app = express();

app.use(express.json());
app.use(clienteRoutes); // ← importantíssimo

export default app;