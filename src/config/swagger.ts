import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Clientes',
    version: '1.0.0',
    description: 'Documentação da API de cadastro e consulta de clientes',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/interfaces/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);