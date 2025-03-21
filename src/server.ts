import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error';
import routes from './routes/index.routes';

const app = express();
dotenv.config();

app.use(express.json());
app.use(routes);

// Use o middleware como um manipulador global de erros
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

// iniviando o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
