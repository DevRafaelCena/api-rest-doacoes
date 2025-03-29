import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes/index.routes';
import { setupSwagger } from './config/swagger';

const app = express();
dotenv.config();

setupSwagger(app);

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Documentação disponível em ${BASE_URL}/api-docs`);
});
