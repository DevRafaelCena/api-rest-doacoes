import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { healthDocs } from '../docs/healthDocs';
import { authDocs } from '../docs/authDocs';
import { userDocs } from '@/docs/userDocs';
import { productDocs } from '@/docs/productDocs';
import { donationDocs } from '@/docs/donationDocs';
import dotenv from 'dotenv';
dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentação',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    paths: {
      ...healthDocs,
      ...authDocs,
      ...userDocs,
      ...productDocs,
      ...donationDocs,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
